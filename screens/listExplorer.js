import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Capriola_400Regular } from '@expo-google-fonts/capriola';
import { FontAwesome } from '@expo/vector-icons';
import {connect} from 'react-redux';
import ListCard from '../components/listCard'

// import BASE URL
import {BASE_URL} from '../components/environment'

import { useNavigation } from '@react-navigation/native';


/* Color ref */
var blueDark = '#033C47';
var mint = '#2DB08C';


function ListScreen(props) {

  const navigation = useNavigation();

  const [placesList, setPlacesList] = useState([]);
  

  useEffect(() => {   
    
    async function getPlaces (data) {

        var response = await fetch(`${BASE_URL}/map/getPlaces`, {
          method: 'POST',
          headers: {'Content-type': 'application/x-www-form-urlencoded'},
          body: `name=${props.filter.name}&network=${props.filter.network}&type=${props.filter.type}`,
        })
        var rawResponse = await response.json();  
        setPlacesList(rawResponse)

    }
    getPlaces()

}, [props.filter]);



var placeListGroup = placesList.map((placeItem,i)=> {   
  var isFav = false
  props.favs.forEach(fav => {
    if(fav._id == placeItem._id) {
      console.log('its a match')
      isFav = true
    }    
  })
  
  return (

    <TouchableOpacity key= {i} onPress={() => navigation.navigate('Place', {place: placeItem})} >

        <ListCard isFav={isFav} placeImg={placeItem.placeImg} type={placeItem.type} name={placeItem.name} services={placeItem.services} id={placeItem._id} />
      
    </TouchableOpacity>

      );

})

let [fontsLoaded] = useFonts({Capriola_400Regular,})

if (!fontsLoaded) {
    return <AppLoading />;
  } else {

    return (

        <ScrollView style={{marginTop:'22%'}}>

              {placeListGroup}

        </ScrollView>

    );

  }

}
  





  function mapStateToProps(state) {
    return{ filter: state.filter, token: state.token, favs: state.favs }
    }

// keep this line at the end
export default connect(
  mapStateToProps,
  null, 
)(ListScreen)