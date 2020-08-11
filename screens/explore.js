import React, { useState } from 'react';

import { StyleSheet, View, Dimensions, SafeAreaView, TouchableWithoutFeedback, Keyboard, Text } from 'react-native';
import MapView from 'react-native-maps';
import SwitchButton from 'switch-button-react-native';

import { AlineInputCenterArrow } from '../components/aline-lib';

import { StatusBar } from 'expo-status-bar';

var mint = '#2DB08C'


function ExploreScreen(props) {

  const [activeSwitch, setActiveSwitch] = useState(0)


  return (
    
    
    <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback
                      onPress={() => Keyboard.dismiss()} >

            <View>

                <View style={{ alignSelf:'center', marginTop:'2%' }}>
                    <SwitchButton
                        onValueChange={(val) => setActiveSwitch({ activeSwitch: val })}      // this is necessary for this component
                        text1 = 'Liste'                        // optional: first text in switch button --- default ON
                        text2 = 'Map'                       // optional: second text in switch button --- default OFF
                        switchWidth = {100}                 // optional: switch width --- default 44
                        switchHeight = {28}                 // optional: switch height --- default 100
                        switchdirection = 'rtl'             // optional: switch button direction ( ltr and rtl ) --- default ltr
                        switchBorderRadius = {100}          // optional: switch border radius --- default oval
                        switchSpeedChange = {200}           // optional: button change speed --- default 100
                        switchBorderColor = '#d4d4d4'       // optional: switch border color --- default #d4d4d4
                        switchBackgroundColor = '#fff'      // optional: switch background color --- default #fff
                        btnBorderColor = '#00a4b9'          // optional: button border color --- default #00a4b9
                        btnBackgroundColor = {mint}      // optional: button background color --- default #00bcd4
                        fontColor = '#b1b1b1'               // optional: text font color --- default #b1b1b1
                        activeFontColor = '#fff'            // optional: active font color --- default #fff
                    />
                </View>


                <AlineInputCenterArrow placeholder = 'Que cherchez-vous ?' style={{ flex: 1 }} />

                <MapView style = {styles.mapStyle} />

            </View>


        </TouchableWithoutFeedback>

        <StatusBar style="auto" />

    </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });


// keep this line at the end
export default ExploreScreen  