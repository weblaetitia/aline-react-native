import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Dimensions, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';

import { AppLoading } from 'expo';
import { useFonts, Capriola_400Regular } from '@expo-google-fonts/capriola';

import {connect} from 'react-redux';

// import BASE URL
import {BASE_URL} from '../components/environment'

import { useNavigation } from '@react-navigation/native';


/* Color ref */
var blueDark = '#033C47';
var mint = '#2DB08C';


function ListScreen(props) {

    const navigation = useNavigation();

    const [placesList, setPlacesList] = useState([]);


    useEffect(() => {   
      
        async function getPlaces (data) {

            var response = await fetch(`${BASE_URL}/map/getPlaces`, {
              method: 'POST',
              headers: {'Content-type': 'application/x-www-form-urlencoded'},
              body: `name=${props.filter.name}&network=${props.filter.network}&type=${props.filter.type}`,
            })
            var rawResponse = await response.json();  
            setPlacesList(rawResponse)

        }
        getPlaces()

    }, [props.filter]);

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

    var placeListGroup = placesList.map((placeItem,i)=> {
      
            return (

                <TouchableOpacity key= {i} onPress={() => navigation.navigate('Place', {place})} >
                
                    <Card
                      key= {i}
                      containerStyle = {styles.card} >
                        <View style = {styles.cardHead} >
                            <View style = {styles.cardTitle} >
                                <Image
                                    style = {{width: 25}}
                                    resizeMode ='contain'
                                    source = {
                                    placeItem.type == 'shop' ? require('../assets/icons/boutique.png') :
                                    placeItem.type == 'restaurant' ? require('../assets/icons/restaurant.png') :
                                    require('../assets/icons/heart.png')
                                    } 
                                    />
                                <Text style = {styles.h1Card}>
                                    {placeItem.name}
                                </Text>
                            </View>

                            <Image
                                    style = {{width: '9%'}}
                                    resizeMode = 'contain'
                                    source = {require('../assets/icons/heart.png')} />
                        </View>

                        <View style = {styles.cardAdress} >
                            <Text style = {{color: blueDark, marginBottom: 10}} >
                                {placeItem.adress}
                            </Text>
                            {/* <Text style = {{color: blueDark, marginBottom: 10, marginLeft: 5}} >
                                {fav.zipCode}
                            </Text> */}
                            <Text style = {{color: blueDark, marginBottom: 10, marginLeft: 5}} >
                                {placeItem.city}
                            </Text>
                        </View>
                    
                        {/* <Text style = {{color: blueDark, marginBottom: 5}} >
                            {fav.description}
                        </Text> */}
                        <Text style = {{color: blueDark, marginBottom: 10}} >
                            {placeItem.webSite}
                        </Text>

                    </Card>

                </TouchableOpacity>

                );

    })

    let [fontsLoaded] = useFonts({Capriola_400Regular,})

    if (!fontsLoaded) {
        return <AppLoading />;
      } else {
    
        return (

            <ScrollView style={{marginTop:'22%'}}>

                  {placeListGroup}

            </ScrollView>
    
        );
    
      }

}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
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



  function mapStateToProps(state) {
    return{ filter: state.filter }
    }

// keep this line at the end
export default connect(
  mapStateToProps,
  null, 
)(ListScreen)