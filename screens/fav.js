import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { AppLoading } from 'expo'
import { useFonts, Capriola_400Regular } from '@expo-google-fonts/capriola'
import { StatusBar } from 'expo-status-bar';
import {AlineButton} from '../components/aline-lib'
import FavCard from '../components/favCard'

import {BASE_URL} from '../components/environment'
import {connect} from 'react-redux'

function FavScreen(props) {
  const [status, setStatus] = useState('nofav')

  // check display
  useEffect(() => {
    console.log(props.token)
    if (props.token) {
      if (props.favs.length > 0) {
        setStatus('favlist')
      } else {
        setStatus('nofav')
      }
    } else {
      setStatus('nolog')
    }
  }, [props.favs])

  // message si pas de favoris
  var nofav = <View style={{paddingHorizontal: 40}}>
              <Text style={{fontFamily: 'Capriola_400Regular', fontSize: 16}}>Vous n'avez pas encore de favoris</Text>
            </View>

  // message d'option si utilisateur non logué
  var nolog =  <View style={{paddingHorizontal: 40}}>
                  <Text style={{...styles.current16}}>Vous devez être connecté pour ajouter des lieux à vos favoris</Text>
                  <AlineButton title="Se connecter" onPress={() => props.navigation.navigate('SignIn')} />
                </View>

  if(props.favs.length>0) {
    // Boucle des favoris
    var favlist = props.favs.map((fav, i) => {
      return (
        <TouchableOpacity key= {i} onPress={() => props.navigation.navigate('Place', {place: fav})} >
          <FavCard type={fav.type} name={fav.name} id={fav._id} services={fav.services} adress={fav.adress} />
        </TouchableOpacity>
      )
    })
  }
  

  let [fontsLoaded] = useFonts({Capriola_400Regular,})

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

    return (
      <View style={{...styles.container}}>
        {status == 'nolog' ? nolog : status == 'favlist' ? <ScrollView showsVerticalScrollIndicator={false}>{favlist}</ScrollView> : status == 'nofav' ? nofav : nofav}
        <StatusBar style = "auto" />
      </View>
    );

  }
}
// colors vars
var blueDark = '#033C47'
var mintLight = '#D5EFE8'
var mint = '#2DB08C'
var grayMedium = '#879299'
var graySuperLight = '#f4f4f4'
var greyLight = '#d8d8d8'
var gold = "#E8BA00"
var goldLight = '#faf1cb'
var tomato = '#ec333b'
var peach = '#ef7e67'
var peachLight = '#FED4CB'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 10,
    margin: 0 
  },
  current16: {
  fontSize: 16,
  color: blueDark
  },
})

  

function mapStateToProps(state) {
return{ token: state.token, favs: state.favs }
}

// keep this line at the end
export default connect(
mapStateToProps,
null, 
)(FavScreen)