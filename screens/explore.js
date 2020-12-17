import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Dimensions, SafeAreaView, TouchableOpacity, Text, Image, PermissionsAndroid, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import SegmentedControl from '@react-native-community/segmented-control';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as geolib from 'geolib';
import { connect } from 'react-redux';

// my components
import Map from '../components/map';
import List from '../components/listExplore';


// import BASE URL
import { BASE_URL } from '../components/environment'



function ExploreScreen(props) {
  
  const navigation = useNavigation();
  
  const [mapListIndex, setMapListIndex] = useState(0)           // O = 'Carte'  -   1 = 'Liste'
  const [currentLat, setCurrentLat] = useState(48.8648758);
  const [currentLong, setCurrentLong] = useState(2.3501831);
  const [region, setRegion] = useState({
    latitude: 46.7272732,
    longitude: -0.5904226,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  })
  
  const [allPlacesList, setAllPlacesList] = useState({})
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [mapReady, setMapReady] = useState(false)
  
  
  useEffect(() => {    
    // get places
    const getPlaces = async () => {
      // get all places
      var rawResponse = await fetch(`${BASE_URL}/map/get-all-places`)
      var allPlaces = await rawResponse.json() // response is an object
      setAllPlacesList(allPlaces)
    }
    getPlaces()

    // store default filter
    props.storeFilterDatas({
      placeDistance: 10000,
      placeName: "",
      networkName: "",
      restaurant: true,
      shop: true,
    })

    // check if user have fav and store them in redux
    const checkUserFav = async () => {
      if (props.token) {
        var rawResponse = await fetch(`${BASE_URL}/users/mobile/get-user-fav?token=${props.token}`)
        var response = await rawResponse.json()
        if (response) {
          props.storeFav(response)
        } else {
          props.storeFav('')
        }
      } else {
        console.log('no token in redux')
      }
    }
    checkUserFav()

    // ask permissions for user position
    async function askPermissions() {
      var response = await Permissions.askAsync(Permissions.LOCATION);
      if (response.status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 },
          (location) => {
            setCurrentLat(location.coords.latitude)
            setCurrentLong(location.coords.longitude)
            setRegion({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            })
            setMapReady(true)
          }
        );
      }
    }

    // ask permisions for Android
    const askandroidPermissions = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Aline Location Permission",
            message:
              "Aline a besoin de connaitre votre position " +
              "pour trouver des services autour de vous.",
              // buttonNeutral: "Ask Me Later",
              // buttonNegative: "Cancel",
              buttonPositive: "OK"
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Location.watchPositionAsync({ distanceInterval: 10 },
            (location) => {
              setCurrentLat(location.coords.latitude)
              setCurrentLong(location.coords.longitude)
              setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              })
              setMapReady(true)
            }
          )
        } else {
          console.log("Location permission denied")
          setMapReady(false)
        }
      } catch (err) {
        console.warn(err);
      }
    };

    if (Platform.OS === 'android') {
      // if Android
      askandroidPermissions()

    } else  {
      // if IOS
      askPermissions()
    }
  }, [])

  useEffect(() => {
    // filter places
    const filterPlaces = (places, filter) => {

      let tempPlaces = []

      let filterdistance = 10000 // default 10km
      if (filter.placeDistance != '') {
        filterdistance = filter.placeDistance
      }
      let tempArray = Object.values(places)
      tempArray.forEach(place => {
        // get distance between user and the place
        // geolib.getDistance({placeLat, placeLong}, {userLat, userLong})
        var distanceFromUser = geolib.getDistance(
          { latitude: place.latitude, longitude: place.longitude },
          { latitude: currentLat, longitude: currentLong }
        )
        if (distanceFromUser < filterdistance) {
          if (filter.networkName == '') {
            if ((filter.restaurant == true) && (place.type == 'restaurant')) {
              tempPlaces.push(place)
            }
            if ((filter.shop == true) && (place.type == 'shop')) {
              tempPlaces.push(place)
            }
            if ((filter.shop == false) && (filter.restaurant == false)) {
              tempPlaces.push(place)
            }
          } else if (filter.networkName == place.network) {
            tempPlaces.push(place)
          }
        }
      })

      // randomize places in array
      let shuffled = tempPlaces
      .map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)
      
      setFilteredPlaces(shuffled)
    }
    filterPlaces(allPlacesList, props.filter)
  }, [allPlacesList, props.filter])

  if (mapReady == false) {
    return (
      <View style={{...styles.container}}>
        <Text style={{...styles.current}}>Chargement des données en attente.</Text>
      </View>
    ) }

  return (

    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        {
          mapListIndex === 0 ?
          <Map filteredPlaces={filteredPlaces} userPosition={{ currentLat, currentLong }} region={region} />
          :
          <List filteredPlaces={filteredPlaces} />
        }
        
        <View style={{ flex: 1, alignSelf: 'center', marginTop: '2%', position: 'absolute' }}>
          <View style={{ marginTop: 10 }}>
            <SegmentedControl
              appearance='light'                      // 'dark', 'light'
              // fontStyle={{color:mint}}             // An object container with color, fontSize, fontFamily   // NOT WORKING ON iOS13+
              // activeFontStyle={{color:'white'}}     // An object container with color, fontSize, fontFamily  // NOT WORKING ON iOS13+
              // tintColor={mint}                      // Accent color of the control
              // backgroundColor='white'               // Background color color of the control // NOT WORKING ON iOS13+
              values={['Carte', 'Liste']}
              selectedIndex={mapListIndex}
              onChange={(event) => {
                setMapListIndex(event.nativeEvent.selectedSegmentIndex)
              }}
            />
          </View>
          <TouchableOpacity
            style={{ flex: 1, alignItems: 'center' }}
            onPress={() => navigation.navigate('Filter', { filtre: 'fiiiltre' })}
          >
            <View style={styles.inputBadge} >
              <Image
                style={{ width: '6%', marginRight: 5 }}
                resizeMode='contain'
                source={require('../assets/icons/location-arrow.png')} />
              <Text style={styles.textBadge}>Que cherchez-vous ?</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />

    </SafeAreaView>
  );
}


// colors vars
var blueDark = '#033C47'
var mintLight = '#D5EFE8'
var mint = '#2DB08C'
var grayMedium = '#879299'
var graySuperLight = '#f4f4f4'
var greyLight = '#d8d8d8'
var gold = "#E8BA00"
var goldLight = '#faf1cb'
var tomato = '#ec333b'
var peach = '#ef7e67'
var peachLight = '#FED4CB'


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor:'#fff',
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
    color: grayMedium
  },
})


function mapDispatchToProps(dispatch) {
  return {
    storeFilterDatas: function (filterDatas) {
      dispatch({ type: 'saveFilterData', filterDatas })
    },
    storeFav: function (favs) {
      dispatch({ type: 'saveFavs', favs })
    }
  }
}

function mapStateToProps(state) {
  return { token: state.token, filter: state.filter }
}

// keep this line at the end
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExploreScreen)


