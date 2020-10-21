import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, ImageBackground, AsyncStorage } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {connect} from 'react-redux';

// custom fonts
import { AppLoading } from 'expo';
import { useFonts, Capriola_400Regular } from '@expo-google-fonts/capriola';

// custom button
import {AlineButton, AlineInputCenter, AlineSeparator, AlineButtonOutline, AlineInputEmail, AlineInputPassword} from '../components/aline-lib';

// colors vars
var blueDark = '#033C47'
var mint = '#2DB08C'
var tomato = '#EC333B'

// import BASE URL
import {BASE_URL} from '../components/environment'


function signInScreen(props) {

  const [tokenExist, setTokenExist] = useState(false)
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [alert, setAlert] = useState(false)

  let [fontsLoaded] = useFonts({Capriola_400Regular,}) 

  useEffect(() => {
    // delete token from localstorage when redirect from logout info-screen
    const clearToken = async () => {
      if (props.route.params != undefined) {
        if (props.route.params.logout === 'true') {
          try {
            await AsyncStorage.removeItem('@token');
            await props.storeData('')
            return true;
          }
          catch(exception) {
            return false;
          }
        }
      }
    }
    clearToken()
  }, [props.route])


  useEffect(() => {
    // check if token is in local storage
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@token')
        if(value !== null) {
          // check if it exists in db
          var rawResponse = await fetch(`${BASE_URL}/users/mobile/check-token?token=${value}`)
          var response = await rawResponse.json()
          if (response.succes == true) {
            props.storeData(value)
            props.storeUserInfo({
              firstName: response.firstName,
              lastName: response.lastName,
              email: response.email,
              token: response.token,
            })
          } else {
            props.storeData('')
          }
        } else {
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
    var rawResponse = await fetch(`${BASE_URL}/users/mobile/sign-in`, {
      method: 'POST',
      headers: {'Content-type': 'application/x-www-form-urlencoded'},
      body: `email=${emailInput}&password=${passwordInput}`
    })
    var response = await rawResponse.json()
    if (response.succes == true) {
      // 1 -> store token in redux-store
      props.storeData(response.token)
      // 1b -> store name and email in redux-store
      props.storeUserInfo({
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        token: response.token,
      })
      // 2 -> then to localstorage
      try {
        await AsyncStorage.setItem('@token', response.token)
      } catch (e) {
        // saving error
        console.log(e)
      }
      // 3 -> redirige vers 'Explorer
      props.navigation.navigate('Explore')
    } else {
      setAlert(true)
    }
  } 


  // add alert message 
  var alertMessage
  
  if (alert) {
    alertMessage = <Text style={styles.alert}>Mauvais email ou mot de passe</Text>
  }
  if (alert == false) {
    alertMessage
  }

    if (!fontsLoaded) {
      return <AppLoading />
    } else {
      // if @token exist -> redirect to Explore
      if (props.token) {
        props.navigation.navigate('Explore')
        return <AppLoading />
      } else {
        return (
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollview}>
            <View style={{...styles.container}}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{width:'100%'}}>
                <View style={styles.container}>
                  <ImageBackground source={require('../assets/images/patatemintlight.png')} style={{ width: 250, height: 145, marginBottom: 60, marginTop: 30 }} >
                  <Text style={styles.h1}>Connexion</Text>
                </ImageBackground>
                    <AlineInputEmail onChange={(e) => setEmailInput(e) } label="Votre email" placeholder='ex: exemple@email.com' styles={{backgroundColor:'green', width:'100%'}}/>
                    <AlineInputPassword onChange={(e) => setPasswordInput(e)} label="Votre mot de passe" placeholder='••••••••••'style={{ flex: 1 }}/>
                    {alertMessage}
                  <AlineButton title="Connexion" onPress={() => getUserInfo()} />
                  <AlineSeparator text='ou' />
                  <Text style={styles.h2}>Vous êtes nouveau ici ?</Text>
                  <AlineButtonOutline title="S'enregistrer" onPress={() => props.navigation.navigate('SignUp')}/>
                  <AlineSeparator text='ou' />
                  <AlineButton title="Utiliser l'app sans s'enregistrer" backgroundColor='#879299' onPress={() => props.navigation.navigate('Explore')}/>
                  <StatusBar style="dark" />
                </View>
              </TouchableWithoutFeedback>
              </View>
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
      alignItems: 'center',
      paddingVertical: 30
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
    },
    alert: { 
      textAlign: 'center', color: tomato
    }
  })

/* REDUX */

// push token to store 
function mapDispatchToProps(dispatch) {
  return{
    storeData: function(token) {
      dispatch( {type: 'saveToken', token})
    },
    storeUserInfo: function(infos) {
      dispatch( {type: 'saveUserInfo', infos} )
    },
   
  }
}

// get data from store
function mapStateToProps(state) {
  return { token: state.token }
}

/* REDUX */



// keep this line at the end
export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(signInScreen)