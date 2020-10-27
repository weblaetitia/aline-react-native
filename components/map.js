import React, { useState } from 'react';
import { StyleSheet, Dimensions, Text, View, Image} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// my components
import MapModal from '../components/mapModal';


function Map(props) {

    const [modalVisibility, setModalVisibility] = useState(false);
    const [markerSelected, setMarkerSelected] = useState(null);

    const displayModal = (place) => {
        setModalVisibility(true)
    }
    const hideModal = () => {
        setModalVisibility(false)
    }

    // set markers list
    let placesMarkersList = props.filteredPlaces.map((place,i) => {
        return(
            <Marker
              key={`marker${i}`}
              coordinate={{latitude: place.latitude, longitude: place.longitude}}
              onSelect={ ()=> { displayModal(place), setMarkerSelected(i) } }
              onDeselect={ () => { hideModal(), setMarkerSelected('') } }
            >
                <Image
                  source={place.type == 'shop' ? require('../assets/icons/markerBoutique.png') : require('../assets/icons/markerRestaurant.png')}
                  style={markerSelected === i ?{width: 30} : {width: 18} }
                  resizeMode='contain'
                />
            </Marker>
        )
    })

    return (
        <View style={{ flex: 1 }}>
            <MapView style={styles.mapStyle}
                rotateEnabled={false}
                region={props.region}
            >
                {placesMarkersList} 
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