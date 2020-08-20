import React, { useState, useEffect } from 'react';
import { Button, Overlay } from 'react-native-elements';
import { StyleSheet, View, Dimensions, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import {connect} from 'react-redux';

// import BASE URL
import {BASE_URL} from '../components/environment'
import { useNavigation } from '@react-navigation/native';
import { AlineButton } from './aline-lib';



function ListCard(props) {

  const navigation = useNavigation();

    const [liked, setLiked] = useState(false)
    const [visible, setVisible] = useState(false)
 

    // verifier si la place est dans les favoris (en fetch)
    useEffect(() => {
      const getLiked = async () => {
        setLiked(props.isFav) // ok fonctionne
      }
      getLiked()
    }, [])


    // afficher la modal
    const toggleOverlay = () => {
        setVisible(!visible);
      };

    const addFav = async (id) => {
    // si token n'existe pas
    if (!props.token || props.token == '' || props.token == undefined ) {
       console.log('veuillez vous enregistrer')
       toggleOverlay()
    } else {
      // if liked = false alors fetch pour ajouter
      if (liked == false) {
      var rawResponse = await fetch(`${BASE_URL}/users/mobile/add-fav?token=${props.token}&placeid=${id}`)
        var response = await rawResponse.json()
        if(response) {
          props.updateFavsRedux(response)
          setLiked(!liked)
        }
      } else if (liked == true) {
        // if liked = tru alors fetch pour supprime
        var rawResponse = await fetch(`${BASE_URL}/users/mobile/delete-fav?token=${props.token}&placeid=${id}`)
        var response = await rawResponse.json()
          if(response) {
            props.updateFavsRedux(response)
            setLiked(!liked)
          }
      }
    }
  }

    return (
        <View style={{width: '100%', marginHorizontal: 0, marginBottom: 30, paddingBottom: 30, borderBottomColor: greyLight, borderBottomWidth: 1, display: 'flex', alignItems: 'center'}}>

        <View style={{...styles.myCard, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Image source={{ uri: props.place.placeImg && props.place.placeImg != '' && props.place.placeImg != undefined ? props.place.placeImg : 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAsP6fT1G8oAseRIIkDmygyD3TobV9wyedS-EeJ3yJmgUKMHFfVND2yoS4ZjTqyzY5pzE26bUUjhAdb5wfX6a3gsKkYO1iPJIZ1CAnPHb7ZlxsdkANpjzGIn0Chbok-4ztEhAK0TtTw-VPO8ZFbM9STOj7GhSxYOuVfcMpk73iwyJRYDtT5q31HA&3u4032&5m1&2e1&callback=none&key=AIzaSyBE9M-y5UbxB_Pbgx-ZBd-aeVnJkIOjFPE&token=4716' }} style={{width: 90, height: 90}} />
          <View style={{...styles.myTitle, marginLeft: 10, marginRight: 10}}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
            <Image style={{width: 18, height: 18, marginTop: 3}} source = {
                    props.place.type == 'shop' ? require('../assets/icons/boutique.png') :
                    require('../assets/icons/restaurant.png')
                  } 
                  />        
              <Text style={{...styles.h3blue, fontSize: 20, paddingBottom: 4, paddingRight: 10, marginLeft: 8}}>{props.place.name}</Text>
            </View>
          </View>
          <View style={{width: 30, marginHorizontal: 5}}>
            <TouchableOpacity onPress={() => addFav(props.place._id)}>
              <FontAwesome name="heart" size={24} color={liked==true?tomato:greyLight} />
            </TouchableOpacity>
          </View>
        </View>
        
        { props.place.services && props.place.services != ',' ?  
          <View style={{...styles.myCard, marginTop: 18}}>
            <Text style={{...styles.current16, fontWeight: 'bold', marginBottom: 2}}>Service de consigne proposées: </Text>
          <Text style={{...styles.current16}}>– {props.place.services}</Text>
          <Text style={{...styles.h3blue, color: mint, marginTop: 8}}>Consignes proposées entre 3 et 5 €</Text>
          </View> 
          : 
        <View></View> }

        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
            <View style={{width:'75%'}}>
            <Text>Vous devez être loggé pour ajouter des lieux à vos favoris</Text>
            <AlineButton title="Se connecter" onPress={() => navigation.navigate('SignIn')} />

            </View>
        </Overlay>
          
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


function mapStateToProps(state) {
  return{ filter: state.filter, token: state.token, favs: state.favs }
  }

// apdate fav to store
function mapDispatchToProps(dispatch) {
  return{
    updateFavsRedux: function(favs) {
      dispatch( {type: 'updateFavs', favs})
    }
  }
}

// keep this line at the end
export default connect(
  mapStateToProps,
  mapDispatchToProps, 
)(ListCard)
