import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Dimensions, SafeAreaView, TouchableOpacity, Text, Image, KeyboardAvoidingView } from 'react-native';
import { Overlay, Slider } from 'react-native-elements';
import SwitchButton from 'switch-button-react-native';

import { AlineInputCenter, AlineButton } from '../components/aline-lib'

import { FontAwesome } from '@expo/vector-icons'; 

import { useFonts, Capriola_400Regular } from '@expo-google-fonts/capriola';

import {connect} from 'react-redux';

import Map from '../screens/mapExplorer';
import List from '../screens/listExplorer';
// import OverlayExplorer from '../components/overlayExplorer'

import { StatusBar } from 'expo-status-bar';

// import BASE URL
import {BASE_URL} from '../components/environment'

/* Color ref */
var mint = '#2DB08C';
var graySuperLight = '#f4f4f4';
var grayMedium = '#879299';
var blueDark = '#033C47';


function ExploreScreen(props) {


  const [activeSwitch, setActiveSwitch] = useState(1);
  const [overlayVisibility, setOverlayVisibility] = useState(false);
  const [searchedName, setSearchedName] = useState('');
  const [searchedNetwork, setSearchedNetwork] = useState('');
  const [sliderValue, setSliderValue] = useState(10);
  const [searchedType, setSearchedType] = useState('shop');
  const [activeSwitchDistance, setActiveSwitchDistance] = useState(1);
  const [activeSwitchPlace, setActiveSwitchPlace] = useState(1);

  // check if user have fav and store them in redux
  useEffect(() => {
    const checkUserFav = async () => {
      if (props.token) {
        var rawResponse = await fetch(`${BASE_URL}/users/mobile/get-user-fav?token=${props.token}`)
        var response = await rawResponse.json()
        if (response) {
          props.storeFav(response)
        } else {
        }
     } else {
       console.log('no token in redux')
     }
    }
    checkUserFav()
  }, [])



  const openOverlay = () => {
    setSearchedName('')
    setSearchedNetwork('');
    setSearchedType('shop')
    setOverlayVisibility(true);
  };

  const closeOverlay = () => {
    setOverlayVisibility(false)
  }
  
  const switchType = (val) => {
    val === 1 ? setSearchedType('shop') :
    val === 2 ? setSearchedType('restaurant') :
    setSearchedType('')
  };


  return (
    
    
    <SafeAreaView style={styles.container}>

            <View style={{flex: 1}}>
                {activeSwitch === 1 ? <Map/> : <List/>}

                <View style={{ flex:1, alignSelf:'center', marginTop:'2%', position:'absolute' }}>

                    <View style={{ alignSelf:'center' }}>

                        <SwitchButton
                            onValueChange={(val) => setActiveSwitch(val)}      // this is necessary for this component
                            text1 = 'Map'                        // optional: first text in switch button --- default ON
                            text2 = 'Liste'                       // optional: second text in switch button --- default OFF
                            switchWidth = {100}                 // optional: switch width --- default 44
                            switchHeight = {28}                 // optional: switch height --- default 100
                            switchdirection = 'rtl'             // optional: switch button direction ( ltr and rtl ) --- default ltr
                            switchBorderRadius = {100}          // optional: switch border radius --- default oval
                            switchSpeedChange = {200}           // optional: button change speed --- default 100
                            switchBorderColor = {grayMedium}       // optional: switch border color --- default #d4d4d4
                            switchBackgroundColor = {graySuperLight}      // optional: switch background color --- default #fff
                            btnBorderColor = '#00a4b9'          // optional: button border color --- default #00a4b9
                            btnBackgroundColor = {mint}      // optional: button background color --- default #00bcd4
                            fontColor = '#b1b1b1'               // optional: text font color --- default #b1b1b1
                            activeFontColor = '#fff'            // optional: active font color --- default #fff
                        />

                    </View>


                    <TouchableOpacity
                      style={{flex:1, alignItems:'center'}}
                      onPress={()=>{openOverlay()}}>
                        <View style={styles.inputBadge} >
                              <Image
                                style={{width:'6%', marginRight:5}}
                                resizeMode='contain'
                                source = {require('../assets/icons/location-arrow.png')} />
                              <Text style={styles.textBadge}>Que cherchez-vous ?</Text>
                        </View>

                     </TouchableOpacity>

                </View>


            </View>

        <KeyboardAvoidingView>

            <Overlay isVisible={overlayVisibility} onBackdropPress={closeOverlay}>
                <View style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height, paddingTop:'10%', alignItems:'center'}}>

                    <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between', width: Dimensions.get('window').width, marginBottom:20 }}>

                        <Text style={styles.overlayTitle}>Filtrer</Text>
                        
                        <FontAwesome 
                          style={{alignSelf:'flex-end', margin:10}}
                          onPress={ ()=> closeOverlay()} 
                          name="close" 
                          size={30} 
                          color={grayMedium} />
                    
                    </View>  

                    <AlineInputCenter onChange={ (e)=> setSearchedName(e) } label="Chercher par nom" placeholder='ex: café de Paris' style={{ flex: 1 }}/>
                    <AlineInputCenter onChange={ (e)=> setSearchedNetwork(e) } label="Chercher par Réseaux" placeholder='ex: JeanBouteille' style={{ flex: 1 }}/>

                    <Text style={{ marginTop:30, fontFamily:'Capriola_400Regular', fontSize:16, color:blueDark }}>Rayon de recherche</Text>
                    <Slider
                      style={styles.slider}
                      value={sliderValue}
                      onValueChange={setSliderValue}
                      maximumValue={80}
                      minimumValue={1}
                      step={1}
                      trackStyle={{ height: 5, backgroundColor: 'red' }}
                      thumbStyle={{ height: 20, width: 20, backgroundColor: mint }}
                      thumbProps={{
                        children: (
                          <FontAwesome
                            name="heartbeat"
                            size={30}
                            containerStyle={{ bottom: 20, right: 20 }}
                            color="red"
                          />
                      ),
                    }}
                    />
                    <Text style={styles.overlayText}>{sliderValue} km</Text>

                    <Text style={{ marginTop:30, fontFamily:'Capriola_400Regular', fontSize:16, color:blueDark }}>Classer par :</Text>
                    <View style={{ marginTop:10 }}>

                        <SwitchButton
                            onValueChange={(val) => setActiveSwitchDistance(val)}      // this is necessary for this component
                            text1 = 'Distance'                        // optional: first text in switch button --- default ON
                            text2 = 'Ordre alphabétique'                       // optional: second text in switch button --- default OFF
                            switchWidth = {300}                 // optional: switch width --- default 44
                            switchHeight = {40}                 // optional: switch height --- default 100
                            switchdirection = 'rtl'             // optional: switch button direction ( ltr and rtl ) --- default ltr
                            switchBorderRadius = {100}          // optional: switch border radius --- default oval
                            switchSpeedChange = {200}           // optional: button change speed --- default 100
                            switchBorderColor = {grayMedium}       // optional: switch border color --- default #d4d4d4
                            switchBackgroundColor = {graySuperLight}      // optional: switch background color --- default #fff
                            btnBorderColor = '#00a4b9'          // optional: button border color --- default #00a4b9
                            btnBackgroundColor = {mint}      // optional: button background color --- default #00bcd4
                            fontColor = '#b1b1b1'               // optional: text font color --- default #b1b1b1
                            activeFontColor = '#fff'            // optional: active font color --- default #fff
                        />

                    </View>

                    <Text style={{ marginTop:30, fontFamily:'Capriola_400Regular', fontSize:16, color:blueDark }}>Type de lieu :</Text>
                    <View style={{ marginTop: 10}}>
                    
                    <SwitchButton
                            style={{ marginTop:40 }}
                            onValueChange={(val) => {setActiveSwitchPlace(val), switchType(val)}}      // this is necessary for this component
                            text1 = 'Point de collecte'                        // optional: first text in switch button --- default ON
                            text2 = 'Restaurant'                       // optional: second text in switch button --- default OFF
                            switchWidth = {300}                 // optional: switch width --- default 44
                            switchHeight = {40}                 // optional: switch height --- default 100
                            switchdirection = 'rtl'             // optional: switch button direction ( ltr and rtl ) --- default ltr
                            switchBorderRadius = {100}          // optional: switch border radius --- default oval
                            switchSpeedChange = {200}           // optional: button change speed --- default 100
                            switchBorderColor = {grayMedium}       // optional: switch border color --- default #d4d4d4
                            switchBackgroundColor = {graySuperLight}      // optional: switch background color --- default #fff
                            btnBorderColor = '#00a4b9'          // optional: button border color --- default #00a4b9
                            btnBackgroundColor = {mint}      // optional: button background color --- default #00bcd4
                            fontColor = '#b1b1b1'               // optional: text font color --- default #b1b1b1
                            activeFontColor = '#fff'            // optional: active font color --- default #fff
                        />
                    
                    </View>

                    <View style={{marginTop:30}}>
                        <AlineButton title="Filtrer" onPress={()=> {props.storeData({name:searchedName, network:searchedNetwork, type:searchedType, distance:sliderValue*1000}), closeOverlay()}} />
                    </View>                

                </View>         
            </Overlay>

        </KeyboardAvoidingView>


        <StatusBar style="auto" />

    </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF'
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    inputBadge: {
      flexDirection: 'row',
      justifyContent:'flex-start',
      alignItems:'center',
      height:'45%',
      width:'140%',
      backgroundColor: graySuperLight,
      borderRadius: 50,
      borderColor: grayMedium,
      borderWidth: 1,
      paddingHorizontal: 15,
      paddingVertical: 0,
      margin: 10,
    },
    textBadge: {
      color: grayMedium
    },
    overlay: {
      width: 500,
      height: 500,
    },
    slider: {
      width:'80%',
      alignSelf:'center'
    },
    overlayTitle: {
      fontFamily: 'Capriola_400Regular',
      fontSize:30,
      color: blueDark,
      marginLeft:'10%'
    },
    overlayText: {
      fontFamily: 'Capriola_400Regular',
      fontSize: 16,
      color: blueDark
    }
  });


  function mapDispatchToProps(dispatch) {
    return{
      storeData: function(data) {
        dispatch( {type: 'saveData', data})
      },
      storeFav: function(favs) {
        dispatch({type: 'saveFavs', favs})
      }
    }
  }

function mapStateToProps(state) {
  return{ token: state.token }
  }

// keep this line at the end
export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ExploreScreen)