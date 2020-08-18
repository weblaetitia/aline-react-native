import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Dimensions, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

import { AppLoading } from 'expo';
import { useFonts, Capriola_400Regular } from '@expo-google-fonts/capriola';
import { FontAwesome } from '@expo/vector-icons';


import {connect} from 'react-redux';

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
      placeImg: "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAsP6fT1G8oAseRIIkDmygyD3TobV9wyedS-EeJ3yJmgUKMHFfVND2yoS4ZjTqyzY5pzE26bUUjhAdb5wfX6a3gsKkYO1iPJIZ1CAnPHb7ZlxsdkANpjzGIn0Chbok-4ztEhAK0TtTw-VPO8ZFbM9STOj7GhSxYOuVfcMpk73iwyJRYDtT5q31HA&3u4032&5m1&2e1&callback=none&key=AIzaSyBE9M-y5UbxB_Pbgx-ZBd-aeVnJkIOjFPE&token=4716",
      openingHours:"lundi: 08:30 – 19:50,mardi: 08:30 – 19:50,mercredi: 08:30 – 19:50,jeudi: 08:30 – 19:50,vendredi: 08:30 – 19:50,samedi: 08:30 – 19:50,dimanche: 09:00 – 18:50",
    }


    var placeListGroup = placesList.map((placeItem,i)=> {      
            return (

                <TouchableOpacity key= {i} onPress={() => navigation.navigate('Place', {place})} >

                  <View style={{width: '100%', marginHorizontal: 0, marginBottom: 30, paddingBottom: 30, borderBottomColor: greyLight, borderBottomWidth: 1, display: 'flex', alignItems: 'center'}}>

                    <View style={{...styles.myCard, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                      <Image source={{ uri: placeItem.placeImg && placeItem.placeImg != '' && placeItem.placeImg != undefined ? placeItem.placeImg : 'https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAsP6fT1G8oAseRIIkDmygyD3TobV9wyedS-EeJ3yJmgUKMHFfVND2yoS4ZjTqyzY5pzE26bUUjhAdb5wfX6a3gsKkYO1iPJIZ1CAnPHb7ZlxsdkANpjzGIn0Chbok-4ztEhAK0TtTw-VPO8ZFbM9STOj7GhSxYOuVfcMpk73iwyJRYDtT5q31HA&3u4032&5m1&2e1&callback=none&key=AIzaSyBE9M-y5UbxB_Pbgx-ZBd-aeVnJkIOjFPE&token=4716' }} style={{width: 90, height: 90}} />
                      <View style={{...styles.myTitle, marginLeft: 10, marginRight: 10}}>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                        <Image style={{width: 18, height: 18, marginTop: 3}} source = {
                                placeItem.type == 'shop' ? require('../assets/icons/boutique.png') :
                                require('../assets/icons/restaurant.png')
                              } 
                              />        
                          <Text style={{...styles.h3blue, paddingBottom: 4, marginLeft: 8}}>{placeItem.name}</Text>
                        </View>
                        {placeItem.type == "restaurant" ?<Text style={{...styles.current16}}>Restaurant</Text> : placeItem.type == "shop" ? <Text>Restaurant</Text> : <Text>–</Text>}
                      </View>
                      <View style={{width: 30, marginHorizontal: 5}}>
                        <TouchableOpacity>
                          <FontAwesome name="heart" size={24} color={tomato} />
                        </TouchableOpacity>
                      </View>
                    </View>
                    
                    
                    { placeItem.services && placeItem.services != ',' ?  
                     <View>
                       <Text>Service de consigne proposées</Text>
                      <Text>{placeItem.services}</Text>
                     </View> 
                     : 
                    <View></View> }
                      
                  </View>
                
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
    return{ filter: state.filter }
    }

// keep this line at the end
export default connect(
  mapStateToProps,
  null, 
)(ListScreen)