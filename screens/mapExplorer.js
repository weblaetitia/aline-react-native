import React, { useEffect, useState } from 'react';

import { StyleSheet, Dimensions} from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import * as geolib from 'geolib';

import {connect} from 'react-redux';

// import BASE URL
import {BASE_URL} from '../components/environment'

function MapScreen(props) {

  const [placesMarkers, setPlacesMarkers] = useState([]);
  const [currentLat, setCurrentLat] = useState(48.8648758);
  const [currentLong, setCurrentLong] = useState(2.3501831);

  useEffect(() => {   
    
      async function getPlaces (data) {

          var response = await fetch(`${BASE_URL}/map/getPlaces`, {
            method: 'POST',
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            body: `name=${props.filter.name}&network=${props.filter.network}&type=${props.filter.type}`,
          })
          var rawResponse = await response.json();  
          setPlacesMarkers(rawResponse)

      }
      getPlaces()

  }, [props.filter]);

  useEffect(() => {
    async function askPermissions() {
      var { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
        
        Location.watchPositionAsync({distanceInterval: 10},
          (location) => {
            setCurrentLat(location.coords.latitude)
            setCurrentLong(location.coords.longitude)
          }
        );
      }
    }
    askPermissions();
  }, []);



  var placesMarkersList = placesMarkers.map((place,i)=> {

    var userDistance = geolib.getDistance(
                        {latitude: place.latitude, longitude: place.longitude},
                        {latitude: currentLat, longitude: currentLong}
                      )


    if(userDistance < props.filter.distance){

      return(<Marker
              coordinate={{latitude: place.latitude, longitude: place.longitude}}
              title={place.name}
              description={place.type}
              image={
                place.type == 'shop' ? require('../assets/icons/markerBoutique.png') : require('../assets/icons/markerRestaurant.png')
              }
            />)

    }

    })

  var currentLocation = <Marker 
                        coordinate={{latitude:currentLat, longitude:currentLong}}
                        title='Ton place'
                        description="Coucou c'est moi !"
                        image={require('../assets/icons/position.png')}
                        />  


  return (
      
          <MapView style = {styles.mapStyle}>
  
              {placesMarkersList}
  
              {currentLocation}
  
          </MapView>
  
      );

  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });

  function mapStateToProps(state) {
    return{ filter: state.filter }
    }

// keep this line at the end
export default connect(
  mapStateToProps,
  null, 
)(MapScreen)
