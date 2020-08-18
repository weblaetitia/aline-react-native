import React, { useEffect, useState } from 'react';

import { StyleSheet, Dimensions, View, Image, Text} from 'react-native';

import { AppLoading } from 'expo';
import { useFonts, Capriola_400Regular } from '@expo-google-fonts/capriola';

import { useNavigation } from '@react-navigation/native';

import {connect} from 'react-redux';


/* Color ref */
var greyLight = '#d8d8d8';
var graySuperLight = '#f4f4f4';
var mint = '#2DB08C'


function MapModal (props) {

  var place = {
    name:"Bioburger",
    adress:"29 Rue de Vaugirard Paris",
    city:"Paris",
    phone:"01 42 22 12 22",
    webSite:"http://lepetitlux.eatbu.com/",
    google_place_id:"ChIJJe3qQtBx5kcREcjG33vJTZI",
    network:"Reconcil",
    networkImg: "https://res.cloudinary.com/alineconsigne/image/upload/v1597414611/acteurs/paris_-_repas_-_reconcil_dfp2uf.png",
    type:"restaurant",
    services: ["Boîtes repas consignées", "Couverts consignées"],
    priceRange: [2, 8],
    latitude:48.8481756,
    longitude:2.3312189,
  }
  
  
    let [fontsLoaded] = useFonts({Capriola_400Regular,})

    if (!fontsLoaded) {
      return <AppLoading />;
    } else {

   
      return(

        // <TouchableOpacity key= {i} onPress={() => navigation.navigate('Place', {place})} >

            <View style={styles.modal}>

                    <Image
                    style = {{width: 85, marginRight:10}}
                    resizeMode = 'contain'
                    source = {require('../assets/images/plat.png')} />
                    <View>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Image
                            style = {{width: 15, marginRight:3}}
                            resizeMode = 'contain'
                            source = {require('../assets/icons/restaurant.png')} />
                            <Text style={{fontFamily:'Capriola_400Regular', fontSize:16}}>{props.modalDatas.name}</Text>
                        </View>
                        <View>
                            <Text>{props.modalDatas.adress}</Text>
                        </View>
                        <View>
                            <Text>{props.modalDatas.city}</Text>
                        </View>
                        <View>
                            <Text style={{fontFamily:'Capriola_400Regular', fontSize:13, color:mint, marginTop:5, width:'70%'}}>{props.modalDatas.services}</Text>
                        </View>
                    </View>

            </View>

        // </TouchableOpacity>

      )

    }
    
}


const styles = StyleSheet.create({
    modal: {
      width: Dimensions.get('window').width*(9/10),
      height: Dimensions.get('window').height*(3/17),
      flexDirection:'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      alignSelf: 'center',
      position:'absolute',
      paddingLeft: 15,
      backgroundColor: graySuperLight,
      borderColor: greyLight,
      borderWidth: 2,
      borderRadius:5,
      bottom : 20,
    }
  });


  function mapStateToProps(state) {
    console.log('STATE',state)
    return{ modalDatas: state.modal }
    }

// keep this line at the end
export default connect(
  mapStateToProps,
  null, 
)(MapModal)