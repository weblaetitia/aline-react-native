import React from 'react';

import { StyleSheet, Text, Image, View } from 'react-native';
import { AlineInputCenter, AlineButton, AlineSeparator } from '../components/aline-lib';

import { StatusBar } from 'expo-status-bar';


/* Color ref */
var blueDark = '#033C47';
var mint = '#2DB08C';


function SearchScreen() {
    return (
      <View style = {styles.container}>
  
            <Text style = {{color:blueDark}} >Rechercher un produit, une marque, un point de collecte, un restaurant ou un réseau ;</Text>
            <AlineInputCenter placeholder = 'ex: Bière Manivelle' style = {{ flex: 1 }}/>
            <AlineButton title = "Recherche" />
            <AlineSeparator text = 'ou scanner votre produit.' />
            <Image
              style = {{width: '40%', padding: 0}}
              resizeMode = 'contain'
              source = {require('../assets/icons/barcode_Big.png')} />

            <StatusBar style = "auto" />
      </View>

    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 25,
      paddingVertical: 70,
      backgroundColor: '#FFFFFF'
    },
  });


// keep this line at the end
export default SearchScreen  