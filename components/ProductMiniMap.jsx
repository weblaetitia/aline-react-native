import React, { useEffect, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { StyleSheet, Dimensions, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { BASE_URL } from '../functions/environment'
import MarkerRestaurant from './MarkerRestaurant'
import MarkerShop from './MarkerShop'
import { getRegionForCoordinates } from '../functions/functionFile'

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

function ProductsMiniMap(props) {
  const navigation = useNavigation()

  // set markers size
  const smallSize = { width: 22, height: 30, translateX: 5, translateY: 14 }

  const [placesList, setPlacesList] = useState([])
  const [region, setRegion] = useState()

  useEffect(() => {
    const getNetworksPlaces = async (network) => {
      const rawResponse = await fetch(`${BASE_URL}/map/get-places-list?network=${network}`)
      const response = await rawResponse.json()
      setPlacesList(response)
      const tempsPoints = response.map((place) => ({
        latitude: place.latitude,
        longitude: place.longitude,
      }))
      setRegion(getRegionForCoordinates(tempsPoints))
    }
    getNetworksPlaces(props.network)

    const getRegion = () => {}
    // TODO documenter appel à un methode vide
    getRegion()
  }, [])

  // store Filter
  const handleClick = () => {
    props.storeFilterDatas({
      placeDistance: 10000,
      placeName: '',
      networkName: props.network,
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
          region={region}
        >
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

export default connect(null, mapDispatchToProps)(ProductsMiniMap)
