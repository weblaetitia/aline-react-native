import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { connect } from 'react-redux'
import { BASE_URL } from '../functions/environment'
import MarkerRestaurant from './MarkerRestaurant'
import MarkerShop from './MarkerShop'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: 275,
  },
})

// map style
const mapStyle = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
]

function MiniMap(props) {
  const navigation = useNavigation()

  // set markers size
  const smallSize = { width: 22, height: 30, translateX: 5, translateY: 14 }

  const [placesList, setPlacesList] = useState([])

  useEffect(() => {
    const getNetworksPlaces = async (network) => {
      const rawResponse = await fetch(`${BASE_URL}/map/get-places-list?network=${network}`)
      const response = await rawResponse.json()
      // console.log(response) // is an array []
      // delete this place from aray
      const filteredResponse = response.filter((item) => item.name !== props.place.name)
      setPlacesList(filteredResponse)
    }
    getNetworksPlaces(props.place.network)
  }, [])

  // store Filter
  const handleClick = () => {
    props.storeFilterDatas({
      placeDistance: 10000,
      placeName: '',
      networkName: props.place.network,
      restaurant: true,
      shop: true,
    })
    navigation.navigate('Explore')
  }

  const MarkerList = placesList.map((place) => (
    <Marker key={place._id} coordinate={{ latitude: place.latitude, longitude: place.longitude }}>
      <View style={{ width: 32, height: 44 }}>
        {place.type === 'shop' ? <MarkerShop size={smallSize} /> : <MarkerRestaurant size={smallSize} />}
      </View>
    </Marker>
  ))
  const {
    place: { latitude, longitude, type },
  } = props
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleClick()}>
        <MapView
          style={styles.mapStyle}
          onPress={() => handleClick()}
          rotateEnabled={false}
          provider={PROVIDER_GOOGLE}
          showsTraffic={false}
          loadingEnabled
          customMapStyle={mapStyle}
          region={{
            latitude: latitude + 0.008,
            longitude: longitude - 0.005,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{
              latitude,
              longitude,
            }}
          >
            <View style={{ width: 32, height: 44 }}>
              {type === 'shop' ? <MarkerShop size={smallSize} /> : <MarkerRestaurant size={smallSize} />}
            </View>
          </Marker>
          {MarkerList}
        </MapView>
      </TouchableOpacity>
    </View>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    storeFilterDatas(filterDatas) {
      dispatch({ type: 'saveFilterData', filterDatas })
    },
  }
}

export default connect(null, mapDispatchToProps)(MiniMap)
