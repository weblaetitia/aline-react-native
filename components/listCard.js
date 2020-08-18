import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Dimensions, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

import { AppLoading } from 'expo';
import { useFonts, Capriola_400Regular } from '@expo-google-fonts/capriola';
import { FontAwesome } from '@expo/vector-icons';


import {connect} from 'react-redux';

// import BASE URL
import {BASE_URL} from '../components/environment'

import { useNavigation } from '@react-navigation/native';




function ListCard(props) {

    const [color, setColor] = useState(false)
    const [liked, setLiked] = useState(false)

    const addFav = (id) => {
        // fetch sur le user
        // add l'id au tableau des fav
    }

    return (
        <View style={{width: '100%', marginHorizontal: 0, marginBottom: 30, paddingBottom: 30, borderBottomColor: greyLight, borderBottomWidth: 1, display: 'flex', alignItems: 'center'}}>

        <View style={{...styles.myCard, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Image source={{ uri: props.placeImg && props.placeImg != '' && props.placeImg != undefined ? props.placeImg : 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAsP6fT1G8oAseRIIkDmygyD3TobV9wyedS-EeJ3yJmgUKMHFfVND2yoS4ZjTqyzY5pzE26bUUjhAdb5wfX6a3gsKkYO1iPJIZ1CAnPHb7ZlxsdkANpjzGIn0Chbok-4ztEhAK0TtTw-VPO8ZFbM9STOj7GhSxYOuVfcMpk73iwyJRYDtT5q31HA&3u4032&5m1&2e1&callback=none&key=AIzaSyBE9M-y5UbxB_Pbgx-ZBd-aeVnJkIOjFPE&token=4716' }} style={{width: 90, height: 90}} />
          <View style={{...styles.myTitle, marginLeft: 10, marginRight: 10}}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
            <Image style={{width: 18, height: 18, marginTop: 3}} source = {
                    props.type == 'shop' ? require('../assets/icons/boutique.png') :
                    require('../assets/icons/restaurant.png')
                  } 
                  />        
              <Text style={{...styles.h3blue, paddingBottom: 4, marginLeft: 8}}>{props.name}</Text>
            </View>
            {/* {props.type == "restaurant" ? <Text style={{...styles.current16, fontWeight: 'bold'}}>Restaurant</Text> : props.type == "shop" ? 
                                            <Text style={{...styles.current16, fontWeight: 'bold'}}>Magasin</Text> : <Text>–</Text>} */}
          </View>
          <View style={{width: 30, marginHorizontal: 5}}>
            <TouchableOpacity onPress={() => setColor(!color)}>
              <FontAwesome name="heart" size={24} color={color==false?greyLight:tomato} />
            </TouchableOpacity>
          </View>
        </View>
        
        { props.services && props.services != ',' ?  
          <View style={{...styles.myCard, marginTop: 18}}>
            <Text style={{...styles.current16, fontWeight: 'bold', marginBottom: 2}}>Service de consigne proposées: </Text>
          <Text style={{...styles.current16}}>– {props.services}</Text>
          <Text style={{...styles.h3blue, color: mint, marginTop: 8}}>Consignes proposées entre 3 et 5 €</Text>
          </View> 
          : 
        <View></View> }
          
      </View>
    )
}

// colors vars
var blueDark = '#033C47'
var mintLight = '#D5EFE8'
var mint = '#2DB08C'
var grayMedium = '#879299'
var graySuperLight = '#f4f4f4'
var greyLight = '#d8d8d8'
var gold = "#E8BA00"
var goldLight = '#faf1cb'
var tomato = '#ec333b'
var peach = '#ef7e67'
var peachLight = '#FED4CB'



  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    myCard: {
      width: Dimensions.get('window').width - 40,
    },
    myTitle: {
      width: Dimensions.get('window').width - 170,
    },
    current16: {
      fontSize: 16,
      color: blueDark
    },
    h3blue: {
      color: blueDark,
      fontFamily: 'Capriola_400Regular',
      fontSize: 16,
      letterSpacing: -0.7,
    }
  });



  export default ListCard