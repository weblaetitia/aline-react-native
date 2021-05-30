// eslint-disable-next-line camelcase
import { Capriola_400Regular, useFonts } from '@expo-google-fonts/capriola'
import AppLoading from 'expo-app-loading'
import * as Linking from 'expo-linking'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import {
  AsyncStorage,
  ImageBackground,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import { AlineButton, AlineButtonOutline, AlineInputEmail, AlineInputPassword, AlineSeparator } from '../components/aline-lib'
import { BASE_URL } from '../functions/environment'
import patateImage from '../assets/images/patatemintlight.png'

// colors vars
const blueDark = '#033C47'
const tomato = '#EC333B'

const styles = StyleSheet.create({
  scrollview: {
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    textAlign: 'center',
  },
  alert: {
    textAlign: 'center',
    color: tomato,
  },
})

const SignInScreen = ({ route, storeData, storeUserInfo, navigation, token }) => {
  // TODO idem ligne en dessous utile ? si oui documenter
  // const [] = useState(false);
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [alert, setAlert] = useState(false)

  const [fontsLoaded] = useFonts({ Capriola_400Regular })

  useEffect(() => {
    // delete token from localstorage when redirect from logout info-screen
    const clearToken = async () => {
      if (route.params !== undefined) {
        if (route.params.logout === 'true') {
          try {
            // TODO code déprécié
            await AsyncStorage.removeItem('@token')
            await storeData('')
            return true
          } catch (exception) {
            return false
          }
        }
      }
      return false
    }
    clearToken()
  }, [route])

  useEffect(() => {
    // check if token is in local storage
    const getData = async () => {
      try {
        // TODO code déprécié
        const value = await AsyncStorage.getItem('@token')
        if (value !== null) {
          // check if it exists in db
          const rawResponse = await fetch(`${BASE_URL}/users/mobile/check-token?token=${value}`)
          const response = await rawResponse.json()
          if (response.succes === true) {
            // store token
            storeData(value)
            // store user info in redux (name, email, token)
            storeUserInfo({
              firstName: response.firstName,
              lastName: response.lastName,
              email: response.email,
              token: response.token,
            })
          } else {
            storeData('')
          }
        }
      } catch (e) {
        // error reading value
      }
    }
    getData()
  }, [])

  // check user at connection btn pressed
  const getUserInfo = async () => {
    const rawResponse = await fetch(`${BASE_URL}/users/mobile/sign-in`, {
      method: 'POST',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      body: `email=${emailInput}&password=${passwordInput}`,
    })
    const response = await rawResponse.json()
    if (response.succes === true) {
      // 1 -> store token in redux-store
      storeData(response.token)
      // 1b -> store name and email in redux-store
      storeUserInfo({
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
      }
      // 3 -> redirige vers 'Explorer
      navigation.navigate('Explore')
    } else {
      setAlert(true)
    }
  }

  const handleResetPassword = () => {
    Linking.openURL('https://aline.app/login/identify')
  }

  // add alert message
  const alertMessage = alert ? <Text style={styles.alert}>Mauvais email ou mot de passe</Text> : <View />

  if (!fontsLoaded) {
    return <AppLoading />
  }
  // if @token exist -> redirect to Explore
  if (token) {
    navigation.navigate('Explore')
    return <AppLoading />
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollview}>
      <View style={{ ...styles.container }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ width: '100%' }}>
          <View style={styles.container}>
            <ImageBackground
              source={patateImage}
              style={{
                width: 250,
                height: 145,
                marginBottom: 60,
                marginTop: 30,
              }}
            >
              <Text style={styles.h1}>Connexion</Text>
            </ImageBackground>
            <AlineInputEmail
              onChange={(e) => setEmailInput(e)}
              label="Votre email"
              placeholder="ex: exemple@email.com"
              styles={{ backgroundColor: 'green', width: '100%' }}
            />
            <AlineInputPassword
              onChange={(e) => setPasswordInput(e)}
              label="Votre mot de passe"
              placeholder="••••••••••"
              style={{ flex: 1 }}
            />
            {alertMessage}
            <AlineButton title="Connexion" onPress={() => getUserInfo()} />
            <TouchableOpacity onPress={() => handleResetPassword()}>
              <Text style={{ ...styles.h2, fontSize: 14 }}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
            <AlineSeparator text="ou" />
            <Text style={styles.h2}>Vous êtes nouveau ici ?</Text>
            <AlineButtonOutline title="S'enregistrer" onPress={() => navigation.navigate('SignUp')} />
            <AlineSeparator text="ou" />
            <AlineButton
              title="Utiliser l'app sans s'enregistrer"
              backgroundColor="#879299"
              onPress={() => navigation.navigate('Explore')}
            />
            <StatusBar />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
  )
}

/* REDUX */

// push token to store
function mapDispatchToProps(dispatch) {
  return {
    storeData(token) {
      dispatch({ type: 'saveToken', token })
    },
    storeUserInfo(infos) {
      dispatch({ type: 'saveUserInfo', infos })
    },
  }
}

// get data from store
function mapStateToProps(state) {
  return { token: state.token }
}

/* REDUX */

// keep this line at the end
export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)
