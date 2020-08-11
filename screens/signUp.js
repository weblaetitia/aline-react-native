import React, {useState} from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, ImageBackground, AsyncStorage } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { connect } from 'react-redux'

// custom fonts
import { AppLoading } from 'expo';
import { useFonts, Capriola_400Regular } from '@expo-google-fonts/capriola';

// custom button
import {AlineButton, AlineInputCenter, AlineSeparator, AlineButtonOutline} from '../components/aline-lib';



// colors vars
var blueDark = '#033C47'
var mint = '#2DB08C'
var tomato = '#EC333B'


function signUpScreen(props) {

  // replace you baseurl here 
  var baseurl = 'http://10.2.3.55:3000'

  let [fontsLoaded] = useFonts({Capriola_400Regular,}) 
  let [firstNameInput, setFirstNameInput] = useState('')
  let [lastNameInput, setLastNameInput] = useState('')
  let [emailInput, setEmailInput] = useState('')
  let [passwordInput, setPasswordInput] = useState('')
  let [passwordConfirmInput, setPasswordConfirmInput] = useState('')

  let [alert, setAlert] = useState('')

  // add user to DB
  const addUserOnClick = async () => {
    // check if all inputs are field
    if (firstNameInput == '' || lastNameInput == '' || emailInput == '' || passwordInput == '' || passwordConfirmInput == '') {
      console.log('tous les inputs ne sont pas remplis')
      setAlert('requireAll')
    } else {
      // check if passwords match
      if (passwordInput !== passwordConfirmInput) {
        console.log('les mots de passes ne sont pas identiques')
        setAlert('passwordsNotMatch')
      } else {
        // add to db
        var rawResponse = await fetch(`${baseurl}/users/mobile/sign-up`, {
          method: 'POST',
          headers: {'Content-type': 'application/x-www-form-urlencoded'},
          body: `firstname=${firstNameInput}&lastname=${lastNameInput}&email=${emailInput}&password=${passwordInput}`
        })
        var response = await rawResponse.json()
        console.log(response)
        if (response.succes == true) {
          // store token in redux
          props.storeData(response.token)
          // then to localstorage
          try {
            await AsyncStorage.setItem('@token', response.token)
            console.log('ok pseudo store in localstorage')
          } catch (e) {
            // saving error
            console.log(e)
          }
          // redirige vers 'Explorer
          props.navigation.navigate('Explore')
        } else {
          console.log('unsucces')
          setAlert(true)
        }
      }
    }
  }

  // alert message 
  var alertMessage
  switch (alert) {
    case '':
      alertMessage = <Text></Text>
      break
    case 'requireAll':
      alertMessage = <Text style={styles.alert}>Tous les champs sont obligatoires</Text>
      break
    case 'passwordsNotMatch':
      alertMessage = <Text style={styles.alert}>Les mots de passe ne correspondent pas</Text>
      break;
    default:
      alertMessage = <Text></Text>
  }

  
  // returns
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
        <SafeAreaView style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
                <ImageBackground source={require('../assets/images/patatemintlight.png')} style={{ width: 250, height: 145, marginBottom: 60, marginTop: 30 }} >
                <Text style={styles.h1}>S'enregistrer</Text>
              </ImageBackground>
              <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <View>

                  <AlineInputCenter label="Votre prénom" onChange={(e) => setFirstNameInput(e)} placeholder='ex: John'style={{ flex: 1 }}/>

                  <AlineInputCenter label="Votre nom" onChange={(e) => setLastNameInput(e)} placeholder='ex: Doe'style={{ flex: 1 }}/>

                  <AlineInputCenter label="Votre email" onChange={(e) => setEmailInput(e)} placeholder='ex: exemple@email.com'style={{ flex: 1 }}/>

                  <AlineInputCenter label="Choisissez un mot de passe" onChange={(e) => setPasswordInput(e)} placeholder='••••••••••'style={{ flex: 1 }}/>

                  <AlineInputCenter label="Confirmez votre mot de passe" onChange={(e) => setPasswordConfirmInput(e)} placeholder='••••••••••'style={{ flex: 1 }}/>

                  {alertMessage}

                  </View>
                </TouchableWithoutFeedback>
                <AlineButton title="S'enregistrer" onPress={() => addUserOnClick()} />
                
              </KeyboardAvoidingView>
                <AlineSeparator text='ou' />
                <Text style={styles.h2}>Déjà inscrit sur Aline ?</Text>
                <AlineButtonOutline title="Se connecter" onPress={() => props.navigation.navigate('SignIn')}/>
                <AlineSeparator text='ou' />
                <AlineButton title="Utiliser l'app sans s'enregistrer" backgroundColor='#879299' onPress={() => props.navigation.navigate('Explore')}/>
            </View>
          </TouchableWithoutFeedback>
          <StatusBar style="dark" />
        </SafeAreaView>
      )
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
    }
  }
}

// get data from store
// function mapStateToProps(state) {
//   return { token: state.token }
// }

/* REDUX */

// keep this line at the end
export default connect(
  null, 
  mapDispatchToProps
)(signUpScreen)