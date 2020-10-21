import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Capriola_400Regular } from '@expo-google-fonts/capriola';
import {connect} from 'react-redux';
import ListCard from '../components/listCard'

import * as geolib from 'geolib';

// import BASE URL
import {BASE_URL} from '../components/environment'

import { useNavigation } from '@react-navigation/native';


/* Color ref */
var blueDark = '#033C47';
var mint = '#2DB08C';


function ListScreen(props) {

  const navigation = useNavigation();

  const [placesList, setPlacesList] = useState([]);
  const [placesListGroup, setPlacesListGroup] = useState([]);

  const [distanceFilter, setDistanceFilter] = useState();


  useEffect(() => {

    async function getPlaces () {
      var response = await fetch(`${BASE_URL}/map/getPlaces`, {
        method: 'POST',
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body: `name=&network=&type=shop`,
      })
      var rawResponse = await response.json();
      setPlacesList(rawResponse)

      }
      getPlaces()

      // ------ boucler les places ------ //
    var group = placesList.map((placeItem,i)=> {   
      var isFav = false
      if (props.favs) {
        props.favs.forEach(fav => {
          if(fav._id == placeItem._id) {
            isFav = true
          }
        })
      }
      // get distance between user and the place
      var userDistance = geolib.getDistance(
        {latitude: placeItem.latitude, longitude: placeItem.longitude},
        {latitude: props.userLocation.userLat, longitude: props.userLocation.userLong}
        )        
        // set distance from filter (redux)
        setDistanceFilter(props.filter.distance)
        
        // if distance from user and the place is < than filterd distance: display place
        if(userDistance < distanceFilter){ 
        return (
          <TouchableOpacity key={placeItem._id} onPress={() => navigation.navigate('Place', {place: placeItem})} >
              <ListCard place={placeItem} isFav={isFav} />
          </TouchableOpacity>
            )
        } else {
          // console.log('trop loin (list)', placeItem.name, userDistance, '>', distanceFilter)
        }

      
    })
    setPlacesListGroup(group)

  },[])

  // ------------ lores de la maj du filtre --------------- //
  useEffect(() => {       
    async function getPlaces () {
        var response = await fetch(`${BASE_URL}/map/getPlaces`, {
          method: 'POST',
          headers: {'Content-type': 'application/x-www-form-urlencoded'},
          body: `name=${props.filter.name}&network=${props.filter.network}&type=${props.filter.type}`,
        })
        var rawResponse = await response.json();  
        setPlacesList(rawResponse)
    }
    getPlaces()


    // ------ boucler les places ------ //
    var group = placesList.map((placeItem,i)=> {   
      var isFav = false
      if (props.favs) {
        props.favs.forEach(fav => {
          if(fav._id == placeItem._id) {
            isFav = true
          }
        })
      }
      // get distance between user and the place
      var userDistance = geolib.getDistance(
        {latitude: placeItem.latitude, longitude: placeItem.longitude},
        {latitude: props.userLocation.userLat, longitude: props.userLocation.userLong}
        )        
        // set distance from filter (redux)
        setDistanceFilter(props.filter.distance)
        
        // if distance from user and the place is < than filterd distance: display place
        if(userDistance < distanceFilter){ 
        return (
          <TouchableOpacity key={placeItem._id} onPress={() => navigation.navigate('Place', {place: placeItem})} >
              <ListCard place={placeItem} isFav={isFav} />
          </TouchableOpacity>
            )
        } else {
          // console.log('trop loin (list)', placeItem.name, userDistance, '>', distanceFilter)
        }

      
    })
    setPlacesListGroup(group)

}, [props.filter]);
 



let [fontsLoaded] = useFonts({Capriola_400Regular,})

if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
        <ScrollView style={{marginTop:'22%'}}>
              {placesListGroup}
        </ScrollView>
    );
  }
}
  





  function mapStateToProps(state) {
    return{ filter: state.filter, token: state.token, favs: state.favs, userLocation: state.userLocation }
    }

// keep this line at the end
export default connect(
  mapStateToProps,
  null, 
)(ListScreen)