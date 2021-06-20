// eslint-disable-next-line camelcase
import { Capriola_400Regular, useFonts } from '@expo-google-fonts/capriola'
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { AsyncStorage, ImageBackground, Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { connect } from 'react-redux'
import {
  AlineButton,
  AlineButtonOutline,
  AlineInputCenter,
  AlineInputEmail,
  AlineInputPassword,
  AlineSeparator,
} from '../components/aline-lib'
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

function signUpScreen(props) {
  const [fontsLoaded] = useFonts({ Capriola_400Regular })
  const [firstNameInput, setFirstNameInput] = useState('')
  const [lastNameInput, setLastNameInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordConfirmInput, setPasswordConfirmInput] = useState('')

  const [alert, setAlert] = useState('')

  // add user to DB
  const addUserOnClick = async () => {
    // check if all inputs are field
    if (firstNameInput === '' || lastNameInput === '' || emailInput === '' || passwordInput === '' || passwordConfirmInput === '') {
      setAlert('requireAll')
      return
    }

    // check if passwords match
    if (passwordInput !== passwordConfirmInput) {
      setAlert('passwordsNotMatch')
      return
    }

    // add to db
    const rawResponse = await fetch(`${BASE_URL}/users/mobile/sign-up`, {
      method: 'POST',
      headers: { 'Content-type': 'application/x-www-form-urlencoded' },
      body: `firstname=${firstNameInput}&lastname=${lastNameInput}&email=${emailInput}&password=${passwordInput}`,
    })
    const response = await rawResponse.json()
    if (response.succes === true) {
      // store token in redux
      props.storeData(response.token)
      // store users-info in redux
      props.storeUserInfo({
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        token: response.token,
      })
      // then to localstorage
      try {
        // TODO deprecated
        await AsyncStorage.setItem('@token', response.token)
      } catch (e) {
        // saving error
      }
      // redirige vers 'Explorer
      props.navigation.navigate('Explore')
    } else {
      setAlert(true)
    }
  }

  // alert message
  let alertMessage
  switch (alert) {
    case '':
      alertMessage = <Text />
      break
    case 'requireAll':
      alertMessage = <Text style={styles.alert}>Tous les champs sont obligatoires</Text>
      break
    case 'passwordsNotMatch':
      alertMessage = <Text style={styles.alert}>Les mots de passe ne correspondent pas</Text>
      break
    default:
      alertMessage = <Text />
  }

  // returns
  if (!fontsLoaded) {
    return <AppLoading />
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <ImageBackground source={patateImage} style={{ width: 250, height: 145, marginBottom: 60, marginTop: 30 }}>
            <Text style={styles.h1}>S&apos;enregistrer</Text>
          </ImageBackground>
          <View>
            <AlineInputCenter label="Votre prénom" onChange={(e) => setFirstNameInput(e)} placeholder="ex: John" style={{ flex: 1 }} />
            <AlineInputCenter label="Votre nom" onChange={(e) => setLastNameInput(e)} placeholder="ex: Doe" style={{ flex: 1 }} />
            <AlineInputEmail
              label="Votre email"
              onChange={(e) => setEmailInput(e)}
              placeholder="ex: exemple@email.com"
              style={{ flex: 1 }}
            />
            <AlineInputPassword
              label="Choisissez un mot de passe"
              onChange={(e) => setPasswordInput(e)}
              placeholder="••••••••••"
              style={{ flex: 1 }}
            />
            <AlineInputPassword
              label="Confirmez votre mot de passe"
              onChange={(e) => setPasswordConfirmInput(e)}
              placeholder="••••••••••"
              style={{ flex: 1 }}
            />
            {alertMessage}
          </View>
          <AlineButton title="S'enregistrer" onPress={() => addUserOnClick()} />
          <AlineSeparator text="ou" />
          <Text style={styles.h2}>Déjà inscrit sur Aline ?</Text>
          <AlineButtonOutline title="Se connecter" onPress={() => props.navigation.navigate('SignIn')} />
          <AlineSeparator text="ou" />
          <AlineButton
            title="Utiliser l'app sans s'enregistrer"
            backgroundColor="#879299"
            onPress={() => props.navigation.navigate('Explore')}
          />
        </View>
        <StatusBar />
      </ScrollView>
    </TouchableWithoutFeedback>
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
// function mapStateToProps(state) {
//   return { token: state.token }
// }

/* REDUX */

// keep this line at the end
export default connect(null, mapDispatchToProps)(signUpScreen)
