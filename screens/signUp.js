import React from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// custom fonts
import { AppLoading } from 'expo';
import { useFonts, Capriola_400Regular } from '@expo-google-fonts/capriola';

// custom button
import {AlineButton, AlineInputCenter, AlineSeparator, AlineButtonOutline} from '../components/aline-lib';



// colors vars
var blueDark = '#033C47'
var mint = '#2DB08C'


function signUpScreen(props) {
    let [fontsLoaded] = useFonts({Capriola_400Regular,}) 
      if (!fontsLoaded) {
        return <AppLoading />;
      } else {
        return (
          <ScrollView style={styles.scrollview}>
            <SafeAreaView style={styles.container}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <ImageBackground source={require('../assets/images/patatemintlight.png')} style={{ width: 250, height: 145, marginBottom: 60, marginTop: 30 }} >
                    <Text style={styles.h1}>S'enregistrer</Text>
                  </ImageBackground>
                  <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                      <View>
                      <AlineInputCenter label="Votre prénom" placeholder='ex: John'style={{ flex: 1 }}/>
                      <AlineInputCenter label="Votre nom" placeholder='ex: Doe'style={{ flex: 1 }}/>
                      <AlineInputCenter label="Votre email" placeholder='ex: exemple@email.com'style={{ flex: 1 }}/>
                      <AlineInputCenter label="Choisissez un mot de passe" placeholder='••••••••••'style={{ flex: 1 }}/>
                      <AlineInputCenter label="Confirmez votre mot de passe" placeholder='••••••••••'style={{ flex: 1 }}/>
                      </View>
                    </TouchableWithoutFeedback>
                    <AlineButton title="S'enregistrer" />
                  </KeyboardAvoidingView>
                    <AlineSeparator text='ou' />
                    <Text style={styles.h2}>Déjà inscrit sur Aline ?</Text>
                    <AlineButtonOutline title="Se connecter" onPress={() => props.navigation.navigate('SignIn')}/>
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
export default signUpScreen  