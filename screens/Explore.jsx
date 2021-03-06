import SegmentedControl from '@react-native-community/segmented-control'
import { useNavigation } from '@react-navigation/native'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions' // TODO: test whih hooks https://docs.expo.io/versions/v40.0.0/sdk/permissions/#usepermissions
import { StatusBar } from 'expo-status-bar'
import * as geolib from 'geolib'
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { BASE_URL } from '../functions/environment'
import List from '../components/ListExplore'
import Map from '../components/Map'
import locationArrow from '../assets/icons/location-arrow.png'

// colors vars
const blueDark = '#033C47'
const grayMedium = '#879299'
const graySuperLight = '#f4f4f4'
const mint = '#2DB08C'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  current: {
    fontSize: 16,
    color: blueDark,
    textAlign: 'left',
    lineHeight: 26,
  },
  currentBold: {
    fontSize: 16,
    color: blueDark,
    textAlign: 'left',
    lineHeight: 26,
    fontWeight: 'bold',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  inputBadge: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 32,
    width: '140%',
    backgroundColor: graySuperLight,
    borderRadius: 16,
    borderColor: grayMedium,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 0,
    margin: 10,
  },
  textBadge: {
    color: grayMedium,
  },
})

const ExploreScreen = (props) => {
  const navigation = useNavigation()

  const [mapListIndex, setMapListIndex] = useState(0) // O = 'Carte'  -   1 = 'Liste'
  const [currentLat, setCurrentLat] = useState(48.8648758)
  const [currentLong, setCurrentLong] = useState(2.3501831)
  const [region, setRegion] = useState({
    latitude: 46.7272732,
    longitude: -0.5904226,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  })

  const [allPlacesList, setAllPlacesList] = useState({})
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [placesReady, setPlacesReady] = useState(false)
  const [permissionsReady, setPermissionsReady] = useState(false)
  const [filteredPlacesReady, setFilteredPlacesReady] = useState(false)

  // get places
  const getPlaces = async () => {
    const rawResponse = await fetch(`${BASE_URL}/map/get-all-places`)
    const allPlaces = await rawResponse.json() // response is an object
    setAllPlacesList(allPlaces)
    setPlacesReady(true)
  }

  // check if user have fav and store them in redux
  const checkUserFav = async () => {
    if (props.token) {
      const rawResponse = await fetch(`${BASE_URL}/users/mobile/get-user-fav?token=${props.token}`)
      const response = await rawResponse.json()
      if (response) {
        props.storeFav(response)
      } else {
        props.storeFav('')
      }
    } else {
      // console.log('no token in redux')
    }
  }

  // ask permissions for user position
  async function askPermissions() {
    const response = await Permissions.askAsync(Permissions.LOCATION)
    if (response.status === 'granted') {
      Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
        setCurrentLat(location.coords.latitude)
        setCurrentLong(location.coords.longitude)
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        })
        setPermissionsReady(true)
      })
    }
  }

  // filter places
  const filterPlaces = (places, filterValue) => {
    const tempPlaces = []

    let filterdistance = 10000 // default 10km
    if (filterValue.placeDistance !== '') {
      filterdistance = filterValue.placeDistance
    }
    const tempArray = Object.values(places)
    tempArray.forEach((place) => {
      // get distance between user and the place
      // geolib.getDistance({placeLat, placeLong}, {userLat, userLong})
      const distanceFromUser = geolib.getDistance(
        { latitude: place.latitude, longitude: place.longitude },
        { latitude: currentLat, longitude: currentLong }
      )
      if (distanceFromUser < filterdistance) {
        if (filterValue.networkName === '') {
          if (filterValue.restaurant === true && place.type === 'restaurant') {
            tempPlaces.push(place)
          }
          if (filterValue.shop === true && place.type === 'shop') {
            tempPlaces.push(place)
          }
          if (filterValue.shop === false && filterValue.restaurant === false) {
            tempPlaces.push(place)
          }
        } else if (filterValue.networkName === place.network) {
          tempPlaces.push(place)
        }
        setFilteredPlacesReady(true)
      } else {
        // Utilisateur trop loin
        setFilteredPlacesReady(true)
        // TODO
        // afficher un msg pour dire qu'il n'existe pas de lieu allentour
        // inviter l'utilisateur à changer son rayon de recherche
      }
    })

    // randomize places in array
    const shuffled = tempPlaces
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)

    setFilteredPlaces(shuffled)
  }

  useEffect(() => {
    // store default filter
    props.storeFilterDatas({
      placeDistance: 30000, // in meters
      placeName: '',
      networkName: '',
      restaurant: true,
      shop: true,
    })

    getPlaces()
    checkUserFav()
    askPermissions()
  }, [])

  const { filter } = props
  useEffect(() => {
    if (permissionsReady) {
      filterPlaces(allPlacesList, filter)
    }
  }, [allPlacesList, filter, permissionsReady])

  if (!(placesReady && permissionsReady && filteredPlacesReady)) {
    return (
      <View style={{ ...styles.loadingContainer }}>
        <Text style={{ ...styles.current }}>Chargement des données en attente.</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        {mapListIndex === 0 ? (
          <Map filteredPlaces={filteredPlaces} userPosition={{ currentLat, currentLong }} region={region} />
        ) : (
          <List filteredPlaces={filteredPlaces} />
        )}

        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            marginTop: '2%',
            position: 'absolute',
          }}
        >
          <View style={{ marginTop: 10 }}>
            <SegmentedControl
              appearance="light" // 'dark', 'light'
              fontStyle={{ color: mint }} // An object container with color, fontSize, fontFamily   // NOT WORKING ON iOS13+
              activeFontStyle={{ color: 'white' }} // An object container with color, fontSize, fontFamily  // NOT WORKING ON iOS13+
              tintColor={mint} // Accent color of the control
              backgroundColor="white" // Background color color of the control // NOT WORKING ON iOS13+
              values={['Carte', 'Liste']}
              selectedIndex={mapListIndex}
              onChange={(event) => {
                setMapListIndex(event.nativeEvent.selectedSegmentIndex)
              }}
            />
          </View>
          <TouchableOpacity style={{ flex: 1, alignItems: 'center' }} onPress={() => navigation.navigate('Filter', { filtre: 'fiiiltre' })}>
            <View style={styles.inputBadge}>
              <Image style={{ width: '6%', marginRight: 5 }} resizeMode="contain" source={locationArrow} />
              <Text style={styles.textBadge}>Que cherchez-vous ?</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar />
    </SafeAreaView>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    storeFilterDatas(filterDatas) {
      dispatch({ type: 'saveFilterData', filterDatas })
    },
    storeFav(favs) {
      dispatch({ type: 'saveFavs', favs })
    },
  }
}

function mapStateToProps(state) {
  return { token: state.token, filter: state.filter }
}

// keep this line at the end
export default connect(mapStateToProps, mapDispatchToProps)(ExploreScreen)
