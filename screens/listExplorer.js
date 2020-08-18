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
  
  console.log('token ?', props.token)


  useEffect(() => {   
    
    async function getPlaces (data) {

        var response = await fetch(`${BASE_URL}/map/getPlaces`, {
          method: 'POST',
          headers: {'Content-type': 'application/x-www-form-urlencoded'},
          body: `name=${props.filter.name}&network=${props.filter.network}&type=${props.filter.type}`,
        })
        var rawResponse = await response.json();  

        console.log(rawResponse)
        setPlacesList(rawResponse)

    }
    getPlaces()

}, [props.filter]);



var placeListGroup = placesList.map((placeItem,i)=> {      
  return (

    <TouchableOpacity key= {i} onPress={() => navigation.navigate('Place', {place: placeItem})} >

        <ListCard placeImg={placeItem.placeImg} type={placeItem.type} name={placeItem.name} services={placeItem.services} id={placeItem._id} userToken={props.token} />
      
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
    return{ filter: state.filter, token: state.token }
    }

// keep this line at the end
export default connect(
  mapStateToProps,
  null, 
)(ListScreen)