import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Dimensions, Text, View, Image} from 'react-native';

// import BASE URL
import {BASE_URL} from '../components/environment'

function MiniMap(props) {

    // const place = {
    //     _id: "5f352142b958eb0c9f0f6379",
    //     adress: "74 Rue des Poissonniers",
    //     city: "Paris",
    //     google_place_id: "",
    //     keywords: ["laiterie", "paris", "restaurant", "café", "traiteur",
    //     ],
    //     latitude: 48.890967,
    //     longitude: 2.35166,
    //     name: "La Laiterie de Paris",
    //     network: "Reconcil",
    //     openingHours: "lundi: 12:00 – 14:30, 17:30 – 22:00,mardi: 12:00 – 14:30, 17:30 – 22:00,mercredi: 12:00 – 14:30, 17:30 – 22:00,jeudi: 12:00 – 14:30, 17:30 – 22:00,vendredi: 12:00 – 14:30, 17:30 – 22:00,samedi: 12:00 – 14:30, 17:30 – 22:00,dimanche: 12:00 – 14:30, 17:30 – 22:00",
    //     phone: "+33 1 42 59 44 64",
    //     placeImg: "https://res.cloudinary.com/alineconsigne/image/upload/v1597751869/restaurants/restaurants-2_bk7pnq.jpg",
    //     products: [],
    //     services: "Boîtes repas et couverts consignés",
    //     type: "restaurant",
    //     webSite: "http://lalaiteriedeparis.blogspot.com/",
    // }
    
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
            >
                <Image
                  source={place.type == 'shop' ? require('../assets/icons/markerBoutique.png') : require('../assets/icons/markerRestaurant.png')}
                  style={{width: 18 }}
                  resizeMode='contain'
                />
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
                        title= {props.place.name}
                >
                    <Image
                        source={props.place.type == 'shop' ? require('../assets/icons/markerBoutique.png') : require('../assets/icons/markerRestaurant.png')}
                        style={{width: 32 }}
                        resizeMode='contain'
                        />
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
