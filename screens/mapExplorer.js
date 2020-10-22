import React, { useEffect, useState } from 'react';

import { StyleSheet, Dimensions, Text, View, Image} from 'react-native';
import MapView, { Marker, fitToSuppliedMarkers } from 'react-native-maps';

import MapModal from './mapModal'; 

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import * as geolib from 'geolib';

import {connect} from 'react-redux';

// import BASE URL
import {BASE_URL} from '../components/environment';

/* Color ref */
var greyLight = '#d8d8d8';
var graySuperLight = '#f4f4f4'


function MapScreen(props) {

  const [placesMarkers, setPlacesMarkers] = useState([]);
  const [currentLat, setCurrentLat] = useState(48.8648758);
  const [currentLong, setCurrentLong] = useState(2.3501831);
  const [region, setRegion] = useState({
    latitude: 46.7272732,
    longitude: -0.5904226,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  })
  const [modalVisibility, setModalVisibility] = useState(false);
  const [markerSelected, setMarkerSelected] = useState(null);
  const [distanceFilter, setDistanceFilter] = useState();


  useEffect(() => {   
    // ask permissions for user position, then display the map and store user position
    async function askPermissions() {
      var { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
        Location.watchPositionAsync({distanceInterval: 2},
          (location) => {
            setCurrentLat(location.coords.latitude)
            setCurrentLong(location.coords.longitude)
            setRegion({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            })
            // and store location in redux
            var userLocation = {
              userLat: location.coords.latitude,
              userLong: location.coords.longitude
            }
            props.storeUserLocation(userLocation)
          }
        );
      }
    }
    askPermissions();

    // get Places 
    async function getPlaces() {
      if (props.filter.length == undefined) {
        // no filter (first load)
        console.log('get all places (front)')
        var rawResponse = await fetch(`${BASE_URL}/map/get-all-places`)
        var response = await rawResponse.json()
        setPlacesMarkers(response)
        setDistanceFilter(5000) // distance de base = 5km
      } else {
        //if user set some filters
        var rawResponse = await fetch(`${BASE_URL}/map/getPlaces`, {
          method: 'POST',
          headers: {'Content-type': 'application/x-www-form-urlencoded'},
          body: `name=${props.filter.name}&network=${props.filter.network}&type=${props.filter.type}`,
        })
        var response = await rawResponse.json();  
        setPlacesMarkers(response)
        setDistanceFilter(props.filter.distance)
      }
    }
    getPlaces()

  }, [props.filter]);
    


  const displayModal = (datas) => {
    props.storeData(datas)
    setModalVisibility(true)
  }

  const hideModal = () => {
    setModalVisibility(false)
  }

  
  var placesMarkersList = placesMarkers.map((place,i)=> {

    
    var userDistance = geolib.getDistance(
      {latitude: place.latitude, longitude: place.longitude},
      {latitude: currentLat, longitude: currentLong}
      )
      

    if(userDistance < distanceFilter){

      markerSelected === i ? markerSize = {width: 30} : markerSize = {width: 17}

      return(
            <Marker
              key={`marker${i}`}
              coordinate={{latitude: place.latitude, longitude: place.longitude}}
              onSelect={ ()=> { displayModal(place), setMarkerSelected(i) } }
              onDeselect={ () => { hideModal(), setMarkerSelected('') } }
            >
                <Image
                  source={place.type == 'shop' ? require('../assets/icons/markerBoutique.png') : require('../assets/icons/markerRestaurant.png')}
                  style={markerSize}
                  resizeMode='contain'
                />
            </Marker>
      )

    }

  })

  var currentLocation = <Marker 
                        coordinate={{latitude:currentLat, longitude:currentLong}}
                        title='Ton place'
                        description="Coucou c'est moi !"
                        image={require('../assets/icons/position.png')}
                        />  


                          
  return (
         <View style={{flex:1}}>
            <MapView style = {styles.mapStyle}
              rotateEnabled= {false}
              region={region}
            >
    
                {placesMarkersList}
    
                {currentLocation}

             </MapView>
             
             {modalVisibility == true ? <MapModal /> : null}

            
        </View>
  
      );

  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    },
  });

  function mapDispatchToProps(dispatch) {
    return{
      storeData: function(data) {
        dispatch( {type: 'saveModalData', data})
      },
      storeUserLocation: function(userLocation) {
        dispatch( {type: 'saveUserLocation', userLocation})
      }
    }
  }

  function mapStateToProps(state) {
    return{ filter: state.filter }
    }

// keep this line at the end
export default connect(
  mapStateToProps,
  mapDispatchToProps, 
)(MapScreen)
