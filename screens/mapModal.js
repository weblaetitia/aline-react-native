import React, { useEffect, useState } from 'react';

import { StyleSheet, Dimensions, View, Image, Text, TouchableOpacity} from 'react-native';

import { AppLoading } from 'expo';
import { useFonts, Capriola_400Regular } from '@expo-google-fonts/capriola';

import { useNavigation } from '@react-navigation/native';

import {connect} from 'react-redux';


/* Color ref */
var greyLight = '#d8d8d8';
var graySuperLight = '#f4f4f4';
var mint = '#2DB08C';


function MapModal (props) {

  const navigation = useNavigation();
  
  
    let [fontsLoaded] = useFonts({Capriola_400Regular,})

    if (!fontsLoaded) {
      return <AppLoading />;
    } else {

   
      return(

        <TouchableOpacity style={styles.modal} onPress={() => navigation.navigate('Place', {place: props.modalDatas})} >

                    <Image
                    style = {{width: 85, marginRight:10}}
                    resizeMode = 'contain'
                    source = {require('../assets/images/plat.png')} />
                    <View>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Image
                            style = {{width: 15, marginRight:3}}
                            resizeMode = 'contain'
                            source =  {
                              props.modalDatas.type === 'shop' ? require('../assets/icons/markerBoutique.png') : require('../assets/icons/restaurant.png') 
                            } />
                            <Text style={{fontFamily:'Capriola_400Regular', fontSize:16, width:'70%'}}>{props.modalDatas.name}</Text>
                        </View>
                        <View style={{width:'70%'}}>
                            <Text>{props.modalDatas.adress}</Text>
                        </View>
                        {/* <View>
                            <Text>{props.modalDatas.city}</Text>
                        </View> */}
                        <View>
                            <Text style={{fontFamily:'Capriola_400Regular', fontSize:13, color:mint, marginTop:5, width:'70%'}}>{props.modalDatas.services}</Text>
                        </View>
                    </View>

        </TouchableOpacity>

      )

    }
    
}


const styles = StyleSheet.create({
    modal: {
      width: Dimensions.get('window').width*(9/10),
      height: Dimensions.get('window').height*(3/15),
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
    },
    insideModal: {

    }
  });


  function mapStateToProps(state) {
    return{ modalDatas: state.modal }
    }

// keep this line at the end
export default connect(
  mapStateToProps,
  null, 
)(MapModal)