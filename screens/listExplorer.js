import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Dimensions, Text, Image, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';

import { AppLoading } from 'expo';
import { useFonts, Capriola_400Regular } from '@expo-google-fonts/capriola';

import {connect} from 'react-redux';

// import BASE URL
import {BASE_URL} from '../components/environment'

/* Color ref */
var blueDark = '#033C47';
var mint = '#2DB08C';


function ListScreen(props) {

    const [placesList, setPlacesList] = useState([])


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

    var placeListGroup = placesList.map((place,i)=> {

            return (
                
                    <Card
                    key= {i}
                    containerStyle = {styles.card} >
                    <View style = {styles.cardHead} >
                        <View style = {styles.cardTitle} >
                            <Image
                                style = {{width: '13%'}}
                                resizeMode ='contain'
                                source = {
                                place.type == 'shop' ? require('../assets/icons/boutique.png') :
                                place.type == 'restaurant' ? require('../assets/icons/restaurant.png') :
                                require('../assets/icons/heart.png')
                                } 
                                />
                            <Text style = {styles.h1Card}>
                                {place.name}
                            </Text>
                        </View>

                        <Image
                                style = {{width: '9%'}}
                                resizeMode = 'contain'
                                source = {require('../assets/icons/heart.png')} />
                    </View>

                    <View style = {styles.cardAdress} >
                        <Text style = {{color: blueDark, marginBottom: 10}} >
                            {place.adress}
                        </Text>
                        {/* <Text style = {{color: blueDark, marginBottom: 10, marginLeft: 5}} >
                            {fav.zipCode}
                        </Text> */}
                        <Text style = {{color: blueDark, marginBottom: 10, marginLeft: 5}} >
                            {place.city}
                        </Text>
                    </View>
                
                    {/* <Text style = {{color: blueDark, marginBottom: 5}} >
                        {fav.description}
                    </Text> */}
                    <Text style = {{color: blueDark, marginBottom: 10}} >
                        {place.webSite}
                    </Text>

                </Card>
            
                );

    })

    let [fontsLoaded] = useFonts({Capriola_400Regular,})

    if (!fontsLoaded) {
        return <AppLoading />;
      } else {
    
        return (
          <View style={{ marginTop: '21%' }}>

              <ScrollView>

                  {placeListGroup}

              </ScrollView>

    
          </View>
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