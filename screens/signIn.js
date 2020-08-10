import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, ImageBackground, AsyncStorage } from 'react-native';
import { StatusBar } from 'expo-status-bar';


// custom fonts
import { AppLoading } from 'expo';
import { useFonts, Capriola_400Regular } from '@expo-google-fonts/capriola';

// custom button
import {AlineButton, AlineInputCenter, AlineSeparator, AlineButtonOutline} from '../components/aline-lib';

// colors vars
var blueDark = '#033C47'
var mint = '#2DB08C'



function signInScreen(props) {

  // replace you baseurl here 
  var baseurl = 'http://10.2.3.55:3000'

  const [tokenExist, setTokenExist] = useState(false)
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [alert, setAlert] = useState(false)

  let [fontsLoaded] = useFonts({Capriola_400Regular,}) 

  // check if token is in local storage
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@token')
        if(value !== null) {
          console.log('ok token exist in localstorage: ', value)
          // check if it exists in db
          var rawResponse = await fetch(`${baseurl}/users/mobile/check-token?token=value`)
          var response = await rawResponse.json()
          if (response) {
            setTokenExist(true)
          } else {
            setTokenExist(false)
          }
        } else {
          console.log('no token in ls')
          setTokenExist(false)
        }
      } catch(e) {
        // error reading value
        console.log(e)
      }
    }
    getData()
  }, [])

  // check user at connection btn pressed
  const getUserInfo = async () => {
    var rawResponse = await fetch(`${baseurl}/users/mobile/sign-in`, {
      method: 'POST',
      headers: {'Content-type': 'application/x-www-form-urlencoded'},
      body: `email=${emailInput}&password=${passwordInput}`
    })
    var response = await rawResponse.json()
    console.log(response)
    if (response.succes == true) {
      // redirige vers 'Explorer
      props.navigation.navigate('Explore')
    } else {
      console.log('je passe dans le unsucces')
      setAlert(true)
    }
  }

    if (!fontsLoaded) {
      return <AppLoading />
    } else {
      // if @token exist -> redirect to Explore
      if (tokenExist) {
        props.navigation.navigate('Explore')
        return <AppLoading />
      } else {
        return (
          <ScrollView style={styles.scrollview}>
            <SafeAreaView style={styles.container}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <ImageBackground source={require('../assets/images/patatemintlight.png')} style={{ width: 250, height: 145, marginBottom: 60, marginTop: 30 }} >
                    <Text style={styles.h1}>Connexion</Text>
                  </ImageBackground>
                  <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                      <View>

                      <AlineInputCenter onChange={(e) => setEmailInput(e) } label="Votre email" placeholder='ex: exemple@email.com'style={{ flex: 1 }}/>

                      <AlineInputCenter onChange={(e) => setPasswordInput(e)} label="Votre mot de passe" placeholder='••••••••••'style={{ flex: 1 }}/>

                      </View>

                    </TouchableWithoutFeedback>
                    <AlineButton title="Connexion" onPress={() => getUserInfo()} />
                  </KeyboardAvoidingView>
                    <AlineSeparator text='ou' />
                    <Text style={styles.h2}>Vous êtes nouveau ici ?</Text>
                    <AlineButtonOutline title="S'enregistrer" onPress={() => props.navigation.navigate('SignUp')}/>
                    <AlineSeparator text='ou' />
                    <AlineButton title="Utiliser l'app sans s'enregistrer" backgroundColor='#879299' onPress={() => props.navigation.navigate('Explore')}/>
                </View>
              </TouchableWithoutFeedback>
            </SafeAreaView>
            <StatusBar style="dark" />
          </ScrollView>
          )
      }      
    }
  }
  
  const styles = StyleSheet.create({
    scrollview: {
      backgroundColor: '#fff'
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: "center",
      alignItems: 'center'
    },
    inner: {
      flex: 1,
      justifyContent: "center",
      alignItems: 'center'
    },
    h1: {
        color: blueDark,
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'Capriola_400Regular',
        marginTop: 50,
    },
    h2: {
      fontSize: 16,
      color: blueDark,
      textAlign: 'center'
    }
  })


// keep this line at the end
export default signInScreen  