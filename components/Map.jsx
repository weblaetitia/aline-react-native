import React, { useState } from 'react'
import { StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import MapModal from './MapModal'
import MarkerRestaurant from './MarkerRestaurant'
import MarkerShop from './MarkerShop'
import positionImage from '../assets/icons/position.png'

/* Color ref */
const mint = '#2DB08C'

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  centerMap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    backgroundColor: mint,
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
})

function Map(props) {
  const [modalVisibility, setModalVisibility] = useState(false)
  const [markerSelected, setMarkerSelected] = useState(null)
  const {
    region: { latitude, longitude, latitudeDelta, longitudeDelta },
    filteredPlaces,
    userPosition,
  } = props
  const [region, setRegion] = useState({
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  })

  const displayModal = () => {
    setModalVisibility(true)
  }
  const hideModal = () => {
    setModalVisibility(false)
  }

  const deselect = () => {
    if (markerSelected != null) {
      hideModal()
      setMarkerSelected(null)
    }
  }

  // set markers size
  const smallSize = { width: 22, height: 30, translateX: 5, translateY: 14 }
  const bigSize = { width: 32, height: 44, translateX: 0, translateY: 0 }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        rotateEnabled={false}
        region={region}
        onRegionChangeComplete={(regionChanged) => setRegion(regionChanged)}
        showsTraffic={false}
        loadingEnabled
        customMapStyle={mapStyle}
        onPress={() => deselect()}
      >
        {filteredPlaces.map((place, i) => (
          <Marker
            key={place._id}
            coordinate={{
              latitude: place.latitude,
              longitude: place.longitude,
            }}
            onPress={() => {
              displayModal(place)
              setMarkerSelected(i)
            }}
            // onDeselect={ () => { hideModal(), setMarkerSelected('') } }
          >
            <View style={{ width: 32, height: 44 }}>
              {place.type === 'shop' ? (
                <MarkerShop size={markerSelected === i ? bigSize : smallSize} />
              ) : (
                <MarkerRestaurant size={markerSelected === i ? bigSize : smallSize} />
              )}
            </View>
          </Marker>
        ))}
        <Marker
          coordinate={{
            latitude: userPosition.currentLat,
            longitude: userPosition.currentLong,
          }}
          title="Moi"
          description="Je suis là !"
          image={positionImage}
        />
      </MapView>

      <TouchableOpacity
        style={{ ...styles.centerMap }}
        onPress={() => {
          setRegion(props.region)
        }}
      >
        <MaterialCommunityIcons name="target" size={24} color="white" />
      </TouchableOpacity>

      {modalVisibility === true ? <MapModal place={filteredPlaces[markerSelected]} handleclickParent={deselect} /> : null}
    </View>
  )
}

export default Map
