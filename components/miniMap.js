import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions, Text, View, Image} from 'react-native';

// import BASE URL
import {BASE_URL} from '../components/environment'

// my components
import MarkerRestaurant from '../components/markerRestaurant'
import MarkerShop from '../components/markerShop'

function MiniMap(props) {

    // set markers size
    const smallSize = {width: 22, height: 30, translateX: 5, translateY: 14}
    const mediumSize = {width: 28, height: 35, translateX: 2, translateY: 9}
    
    const [placesList, setPlacesList] = useState([])

    useEffect( () => {
        const getNetworksPlaces = async (network) => {
            const rawResponse = await fetch(`${BASE_URL}/map/get-places-list?network=${network}`)
            const response = await rawResponse.json()
            // console.log(response) // is an array []
            // delete this place from aray
            const filteredResponse = response.filter(item => (item.name != props.place.name))
            setPlacesList(filteredResponse)
        }
        getNetworksPlaces(props.place.network)
    }, [])

    let MarkerList = placesList.map( (place, i) => {
        return(
            <Marker
              key={`marker${i}`}
              coordinate={{latitude: place.latitude, longitude: place.longitude}}
            ><View style={{width: 32, height: 44}}>
                {
                place.type=='shop'?
                <MarkerShop size={smallSize} />
                :
                <MarkerRestaurant size={smallSize} />
                }
                </View>
            </Marker>
        )
    })

    return(
        <View style={styles.container}>
            <MapView style={styles.mapStyle}
                rotateEnabled={false}
                region={ {  latitude: (props.place.latitude + 0.008),
                            longitude: (props.place.longitude - 0.005),
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,} } 
            >
                <Marker 
                        coordinate={{latitude: props.place.latitude, longitude: props.place.longitude}}
                >
                    <View style={{width: 32, height: 44}}>
                        {
                            props.place.type=='shop'?
                            <MarkerShop size={smallSize} />
                            :
                            <MarkerRestaurant size={smallSize} />
                        }
                    </View>
                </Marker>  
                {MarkerList}
            </MapView>
        </View>
    )
}

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
  });

export default MiniMap
