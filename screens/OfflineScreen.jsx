import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { AlineButton } from '../components/aline-lib'

const OfflineScreen = () => {
  useEffect(() => {
    // do semething
  }, [])
  return (
    <View>
      <Text>Problème de connexion à Internet</Text>
      <AlineButton onPress={console.log('retry')} title="Réessayer" />
    </View>
  )
}

export default OfflineScreen
