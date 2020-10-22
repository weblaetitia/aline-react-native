import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Dimensions, SafeAreaView, TouchableOpacity, Text, Image, KeyboardAvoidingView } from 'react-native';
import { Overlay, Slider } from 'react-native-elements';
import SegmentedControl from '@react-native-community/segmented-control';

import { AlineInputCenter, AlineButton } from '../components/aline-lib'

// fonts
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';


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
var mintDark = '#2BA282';
var graySuperLight = '#f4f4f4';
var grayMedium = '#879299';
var blueDark = '#033C47';


function ExploreScreen(props) {

  const [overlayVisibility, setOverlayVisibility] = useState(false);
  const [searchedName, setSearchedName] = useState('');
  const [searchedNetwork, setSearchedNetwork] = useState('');
  const [sliderValue, setSliderValue] = useState(10);
  const [searchedType, setSearchedType] = useState('');
  const [mapListIndex, setMapListIndex] = useState(0)
  const [placeIndex, setPlaceIndex] = useState(0)

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
    // setSearchedType('shop')
    setOverlayVisibility(true);
  };

  const closeOverlay = () => {
    setOverlayVisibility(false)
  }
  
  const switchType = (val) => {
    val === 0 ? setSearchedType('restaurant') :
    val === 1 ? setSearchedType('shop') :
    setSearchedType('restaurant')
  };

  return (
    
    
    <SafeAreaView style={styles.container}>

      <View style={{flex: 1}}>

          {/* Map or List component */}
          {mapListIndex === 0 ? <Map/> : <List/>}

          {/* switch btb and input/btn */}
          <View style={{ flex:1, alignSelf:'center', marginTop:'2%', position:'absolute' }}>

            {/* SEGMENT CONTROL BUTTON */}
            <View style={{ marginTop: 10}}>
            <SegmentedControl
              appearance='light'                      // 'dark', 'light'
              // fontStyle={{color:mint}}             // An object container with color, fontSize, fontFamily   // NOT WORKING ON iOS13+
              // activeFontStyle={{color:'white'}}     // An object container with color, fontSize, fontFamily  // NOT WORKING ON iOS13+
              // tintColor={mint}                      // Accent color of the control
              // backgroundColor='white'               // Background color color of the control // NOT WORKING ON iOS13+
              values={['Carte', 'Liste']}
              selectedIndex={mapListIndex}
              onChange={(event) => {
                setMapListIndex(event.nativeEvent.selectedSegmentIndex)
              }}
            />
          </View>

            {/* INPUT-LIKE BUTTON */}
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
          {/* END switch btb and input/btn */}

      </View>

        {/* Filter modal */}
        <KeyboardAvoidingView>

            <Overlay isVisible={overlayVisibility} onBackdropPress={closeOverlay}>
                <View style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height, paddingTop: 50, alignItems:'center'}}>

                    <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between', width: Dimensions.get('window').width, marginBottom: 20 }}>

                        <Text style={styles.overlayTitle}>Filtrer</Text>

                        <Ionicons name="md-close" 
                        size={34} 
                        color={grayMedium} 
                        style={{alignSelf:'flex-end', margin:10}} 
                        onPress={ ()=> closeOverlay()} />
                    
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

                    

                    <Text style={{ marginTop:30, fontFamily:'Capriola_400Regular', fontSize:16, color:blueDark }}>Type de lieu</Text>
                    <View style={{ marginTop: 30, width:'80%'}}>
                      <SegmentedControl
                        appearance='light'
                        values={['Restaurant', 'Magasin']}
                        selectedIndex={placeIndex}
                        onChange={(event) => {
                          setPlaceIndex(event.nativeEvent.selectedSegmentIndex), switchType(event.nativeEvent.selectedSegmentIndex)
                        }}
                      />
                    </View>

                    <View style={{marginTop:30}}>
                        <AlineButton title="Filtrer" onPress={()=> {props.storeData({name:searchedName, network:searchedNetwork, type:searchedType, distance:sliderValue*1000}), closeOverlay()}} />
                    </View>                

                </View>         
            </Overlay>

        </KeyboardAvoidingView>
        {/* END Filter modal */}

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
      height: 32,
      width:'140%',
      backgroundColor: graySuperLight,
      borderRadius: 16,
      borderColor: grayMedium,
      borderWidth: 1,
      paddingHorizontal: 15,
      paddingVertical: 0,
      margin: 10,
    },
    textBadge: {
      color: grayMedium
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