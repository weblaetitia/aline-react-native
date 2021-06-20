// eslint-disable-next-line camelcase
import { Capriola_400Regular, useFonts } from '@expo-google-fonts/capriola'
import React from 'react'
import { Text, View } from 'react-native'
import AppLoading from 'expo-app-loading'
import { styles } from './styles/styles'

// TODO: Add a button and restart app (see: react-native-restart)
const OfflineScreen = () => {
  const [fontsLoaded] = useFonts({ Capriola_400Regular })

  if (!fontsLoaded) {
    return <AppLoading />
  }
  return (
    <View style={{ ...styles.centered }}>
      <Text style={{ fontSize: 28 }}>😢</Text>
      <Text style={{ ...styles.currentBold }}>Problème de connexion à Internet</Text>
    </View>
  )
}

export default OfflineScreen
