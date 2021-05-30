import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import { Overlay } from 'react-native-elements'
import { styles } from '../screens/styles/styles'
import { AlineButton } from './aline-lib'

const MustBeLogged = ({ visible, toggleOverlay }) => {
  const navigation = useNavigation()

  return (
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
      <View style={{ width: '85%', padding: 10 }}>
        <Text style={{ ...styles.current, textAlign: 'center' }}>Vous devez être connecté pour ajouter ce lieu à vos favoris</Text>
        <AlineButton title="Se connecter" onPress={() => navigation.navigate('SignIn')} />
      </View>
    </Overlay>
  )
}

export default MustBeLogged
