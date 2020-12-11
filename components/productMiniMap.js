import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Dimensions, TouchableOpacity, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

// import BASE URL
import {BASE_URL} from '../components/environment'

// my components
import MarkerRestaurant from '../components/markerRestaurant'
import MarkerShop from '../components/markerShop'

// my functions
import { getRegionForCoordinates } from '../functions/functionFile'

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

function ProductsMiniMap(props) {

    const navigation = useNavigation();

    // set markers size
    const smallSize = {width: 22, height: 30, translateX: 5, translateY: 14}
    
    const [placesList, setPlacesList] = useState([])
    const [region, setRegion] = useState()

    useEffect( () => {
        const getNetworksPlaces = async (network) => {
            const rawResponse = await fetch(`${BASE_URL}/map/get-places-list?network=${network}`)
            const response = await rawResponse.json()
            setPlacesList(response)
            const tempsPoints = response.map((place, i) => {
                return ({
                    latitude: place.latitude,
                    longitude: place.longitude
                })
            })
            setRegion(getRegionForCoordinates(tempsPoints))
        }
        getNetworksPlaces(props.network)
        
        const getRegion = () => {
        }
        getRegion
    }, [])




    // store Filter
    const handleClick = () => {
        props.storeFilterDatas({
            placeDistance: 10000,
            placeName: "",
            networkName: props.network,
            restaurant: true,
            shop: true,
        })
        navigation.navigate('Explore')
    }

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
            <TouchableOpacity onPress={() => handleClick() }>
            <MapView style={styles.mapStyle}
                onPress={() => handleClick() }
                rotateEnabled={false}
                provider={PROVIDER_GOOGLE}
                rotateEnabled={false}
                showsTraffic={false}
                loadingEnabled={true}
                customMapStyle={mapStyle}
                region={ region }
            >
                {MarkerList}
            </MapView>
            </TouchableOpacity>
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


function mapDispatchToProps(dispatch) {
return {
    storeFilterDatas: function (filterDatas) {
    dispatch({ type: 'saveFilterData', filterDatas })
    }
}
}

export default connect(
    null,
    mapDispatchToProps
  )(ProductsMiniMap)
