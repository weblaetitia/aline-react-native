import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, TouchableOpacity} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

// my components
import MapModal from '../components/mapModal';
import MarkerRestaurant from '../components/markerRestaurant'
import MarkerShop from '../components/markerShop'

// icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

/* Color ref */
var greyLight = '#d8d8d8';
var graySuperLight = '#f4f4f4';
var mint = '#2DB08C';
var mintDark = '#2BA282';
var grayMedium = '#879299';
var blueDark = '#033C47';

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
        latitude: props.region.latitude,
        longitude: props.region.longitude,
        latitudeDelta: props.region.latitudeDelta,
        longitudeDelta: props.region.longitudeDelta,
    })

    const displayModal = (place) => {
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
    const smallSize = {width: 22, height: 30, translateX: 5, translateY: 14}
    const bigSize = {width: 32, height: 44, translateX: 0, translateY: 0}

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
                onPress={() => deselect() }
            >
                { props.filteredPlaces.map((place,i) => {
                        return(
                            <Marker
                              key={`marker${i}`}
                              coordinate={{latitude: place.latitude, longitude: place.longitude}}
                              onPress={ ()=> { displayModal(place), setMarkerSelected(i) } }
                              // onDeselect={ () => { hideModal(), setMarkerSelected('') } }
                            >
                               <View style={{width: 32, height: 44}}>
                                {
                                  place.type=='shop'?
                                  <MarkerShop size={markerSelected==i?bigSize:smallSize} />
                                  :
                                  <MarkerRestaurant size={markerSelected==i?bigSize:smallSize} />                              
                                }
                              </View>
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
            
            <TouchableOpacity style={{...styles.centerMap}} onPress={() => {setRegion(props.region)}}>
              <MaterialCommunityIcons name="target" size={24} color="white" />
            </TouchableOpacity>

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
    centerMap: {
      flexDirection:'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      alignSelf: 'center',
      padding: 10,
      backgroundColor: mint,
      position:'absolute',
      bottom : 15,
      right: 15,
    }
  })

export default Map;