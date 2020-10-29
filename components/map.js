import React, { useState } from 'react';
import { StyleSheet, Dimensions, Text, View, Image} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

// my components
import MapModal from '../components/mapModal';

// map style
const mapStyle = [
    {
      "featureType": "poi",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ]


function Map(props) {

    const [modalVisibility, setModalVisibility] = useState(false);
    const [markerSelected, setMarkerSelected] = useState(null);

    const [region, setRegion] = useState({
        latitude: 44.74925167481967,
        longitude: 5.3769888509293935,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    const displayModal = (place) => {
        setModalVisibility(true)
    }
    const hideModal = () => {
        setModalVisibility(false)
    }

    // set markers list
    const smallViewBox = '0 0 22 30'
    const largeViewBox = '0 0 30 41'

    return (
        <View style={{ flex: 1 }}>
            <MapView 
                provider={PROVIDER_GOOGLE}
                style={styles.mapStyle}
                rotateEnabled={false}
                region={region}
                onRegionChangeComplete={region => setRegion(region)}
                showsTraffic={false}
                loadingEnabled={true}
                customMapStyle={mapStyle}
            >
                { props.filteredPlaces.map((place,i) => {
                        return(
                            <Marker
                              key={`marker${i}`}
                              coordinate={{latitude: place.latitude, longitude: place.longitude}}
                              onPress={ ()=> { displayModal(place), setMarkerSelected(i) } }
                              onDeselect={ () => { hideModal(), setMarkerSelected('') } }
                            >
                              <Image
                                source={place.type == 'shop' ? require('../assets/icons/markerBoutique.png') : require('../assets/icons/markerRestaurant.png')}
                                style={markerSelected === i ?{width: 36} : {width: 24} }
                                resizeMode='contain'
                              />
                            </Marker>
                        )
                    })
                    } 
                <Marker 
                    coordinate={{latitude:props.userPosition.currentLat, longitude:props.userPosition.currentLong}}
                    title='Moi'
                    description="Je suis là !"
                    image={require('../assets/icons/position.png')}
                />  

            </MapView>

            {modalVisibility == true ? <MapModal place={props.filteredPlaces[markerSelected]} /> : null}


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    },
  })

export default Map;