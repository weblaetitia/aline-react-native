import React from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// custom fonts
import { AppLoading } from 'expo';
import { useFonts, Capriola_400Regular } from '@expo-google-fonts/capriola';


// colors vars
var blueDark = '#033C47'
var mintLight = '#D5EFE8'

function signInScreen(props) {
    let [fontsLoaded] = useFonts({Capriola_400Regular,}) 
      if (!fontsLoaded) {
        return <AppLoading />;
      } else {
        return (
            <View style={styles.container}>
                <Image
                      source={ require('../assets/images/patatemintlight.png') }
                      style={{ width: 184, height: 156 }}
                      />
                  <Text style={styles.h1patate}>Connexion</Text>
                  <Text style={styles.current20center}>Votre email</Text>

              <Button
              title="Go to sign-up"
              onPress={() => props.navigation.navigate('SignUp')}
              />
              <StatusBar style="auto" />
            </View>
          )
      }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    h1: {
        color: blueDark,
        fontSize: 30,
        fontFamily: 'Capriola_400Regular',
    },
    h1patate: {
        color: blueDark,
        fontSize: 30,
        fontFamily: 'Capriola_400Regular',
        marginTop: -92,
        marginBottom: 92
    },
    current20center: {
        fontSize: 20,
        color: blueDark
    }
  })


// keep this line at the end
export default signInScreen  