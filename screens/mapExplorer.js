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
  const [modalVisibility, setModalVisibility] = useState(false);
  const [markerSelected, setMarkerSelected] = useState(null);
  const [distanceFilter, setDistanceFilter] = useState(5000)


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

    async function getPlaces (data) {

      var response = await fetch(`${BASE_URL}/map/getPlaces`, {
        method: 'POST',
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body: `name=&network=&type=shop`,
      })
      var rawResponse = await response.json();
      setPlacesMarkers(rawResponse)

  }
  getPlaces()

  }, []);

  useEffect(() => {   
    
      async function getPlaces (data) {

          var response = await fetch(`${BASE_URL}/map/getPlaces`, {
            method: 'POST',
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            body: `name=${props.filter.name}&network=${props.filter.network}&type=${props.filter.type}`,
          })
          var rawResponse = await response.json();  
          setPlacesMarkers(rawResponse)
          setDistanceFilter(props.filter.distance)

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
      
      console.log('USERDISTANCE', userDistance)
      console.log('DISTANCEFILTER', distanceFilter)

    if(userDistance < distanceFilter){

      markerSelected === i ? markerSize = {width: 30} : markerSize = {width: 17}

      return(
            <Marker
              key={`marker${i}`}
              coordinate={{latitude: place.latitude, longitude: place.longitude}}
              onSelect={ ()=> { displayModal(place), setMarkerSelected(i) } }
              onDeselect={ () => { hideModal() } }
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
              initialRegion={{
                latitude: currentLat,
                longitude: currentLong,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
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
