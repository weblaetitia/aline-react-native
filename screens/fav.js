import React from 'react';

import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';

import { AppLoading } from 'expo';
import { useFonts, Capriola_400Regular } from '@expo-google-fonts/capriola';

import { StatusBar } from 'expo-status-bar';


/* Color ref */
var blueDark = '#033C47';
var mint = '#2DB08C';


function FavScreen(props) {

  const favList = [
    {
      title: "Bien l'épicerie",
      adress: '123 rue Réaumur -',
      zipCode: '75002',
      city: 'Paris',
      description: "Magasin d'alimentation bio",
      services: 'Bouteilles consignées',
      type: 'shop'
    },
    {
      title: "Bien le restaurant",
      adress: '321 rue Réaumur -',
      zipCode: '75002',
      city: 'Paris',
      description: "Restaurant veg freindly",
      services: 'Boites consignées',
      type: 'restaurant'
    },
  ]

  var product = {
    _id: '5f350f902b9fcc56501471e9',
    network: 'looper',
    name:"White IPA",
    brand:"La Manivelle",
    type:"Bière bio",
    refoundPrice:2,
    imageUrl:"https://res.cloudinary.com/alineconsigne/image/upload/v1597312872/69-blanche_ne296h.png",
  }

  var place = {
    name:"Bioburger",
    adress:"29 Rue de Vaugirard Paris",
    city:"Paris",
    phone:"01 42 22 12 22",
    webSite:"http://lepetitlux.eatbu.com/",
    google_place_id:"ChIJJe3qQtBx5kcREcjG33vJTZI",
    network:"Reconcil",
    networkImg: "https://res.cloudinary.com/alineconsigne/image/upload/v1597414611/acteurs/paris_-_repas_-_reconcil_dfp2uf.png",
    type:"restaurant",
    services: ["Boîtes repas consignées", "Couverts consignées"],
    priceRange: [2, 8],
    latitude:48.8481756,
    longitude:2.3312189,
  }

  var favListGroup = favList.map((fav,i)=> {
    
    return(
      <TouchableOpacity key= {i} onPress={() => props.navigation.navigate('Place', {place})} >
        <Card
          key={i}
          containerStyle = {styles.card} >
            <View style = {styles.cardHead} >
                <View style = {styles.cardTitle} >
                    <Image
                      style = {{width: '13%'}}
                      resizeMode ='contain'
                      source = {
                        fav.type == 'shop' ? require('../assets/icons/boutique.png') :
                        fav.type == 'restaurant' ? require('../assets/icons/restaurant.png') :
                        require('../assets/icons/heart.png')
                      } 
                      />
                    <Text style = {styles.h1Card}>
                      {fav.title}
                    </Text>
                </View>

                <Image
                      style = {{width: '9%'}}
                      resizeMode = 'contain'
                      source = {require('../assets/icons/heart.png')} />
            </View>

            <View style = {styles.cardAdress} >
                <Text style = {{color: blueDark, marginBottom: 10}} >
                  {fav.adress}
                </Text>
                <Text style = {{color: blueDark, marginBottom: 10, marginLeft: 5}} >
                  {fav.zipCode}
                </Text>
                <Text style = {{color: blueDark, marginBottom: 10, marginLeft: 5}} >
                  {fav.city}
                </Text>
            </View>
        
            <Text style = {{color: blueDark, marginBottom: 5}} >
              {fav.description}
            </Text>
            <Text style = {{color: blueDark, marginBottom: 10}} >
              {fav.services}
            </Text>
        </Card>
      </TouchableOpacity>
    )
  })

  let [fontsLoaded] = useFonts({Capriola_400Regular,})

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

    return (
      <ScrollView>
        {favListGroup}
        <StatusBar style = "auto" />
      </ScrollView>
    );

  }

}
  
  const styles = StyleSheet.create({

    card: {
      width: '100%',
      paddingHorizontal: 25,
      paddingVertical: 10,
      margin: 0 
    },
    cardHead: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    cardTitle: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    h1Card: {
      color: mint,
      fontFamily: 'Capriola_400Regular',
      fontSize: 18,
      marginLeft: 10
    },
    cardAdress: {
      flexDirection: 'row',
      marginBottom: 10
    }

  });


// keep this line at the end
export default FavScreen  