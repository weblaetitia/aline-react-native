import React, { useEffect, useState } from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { AppLoading } from 'expo';
import { useFonts, Capriola_400Regular } from '@expo-google-fonts/capriola';

import { Ionicons } from '@expo/vector-icons';


/* Colors ref */
var greyLight = '#d8d8d8';
var grayMedium = '#879299';
var mint = '#2DB08C';
var graySuperLight = '#f4f4f4';
var blueDark = '#033C47';


export default function SearchPlacesScreen( { props, route, navigation }) {


    var products = route.params.product.placesArray
    console.log('RESPONSE PLACE=====',products)

    var productsList = products.map((product, i) => {

        return(

            <TouchableOpacity style={styles.productsView}
                key={i}
                onPress={ () => navigation.navigate('Place', {place: product})}
            >

                    <Text style={{fontFamily: 'Capriola_400Regular', fontSize:16, color: mint, margin:5, marginVertical: 10}}>{product.name}</Text>

            </TouchableOpacity>

        )

    })

    let [fontsLoaded] = useFonts({Capriola_400Regular,})

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {

        return (

                <View style={styles.container}>

                        <View style={{...styles.head}}>
                                <TouchableOpacity onPress={() => navigation.goBack()} title="Dismiss">
                                        <Ionicons name="md-close" size={34} color={grayMedium} style={{textAlign: 'right'}} />
                                </TouchableOpacity>
                        </View>

                        <Text style={styles.title}>Choisissez un lieu dans la liste</Text>

                        {productsList}

                </View>

        )

    }

}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        backgroundColor:'#fff',
      },
    head: {
        backgroundColor: '#fff',
        width: '100%',
        marginTop: 50,
        marginBottom: 0,
        paddingHorizontal: 25,
        paddingVertical: 10,
        margin: 0,
        borderBottomColor: grayMedium,
        borderBottomWidth: 1,
        height: 50,
      },
      title: {
        fontFamily: 'Capriola_400Regular',
        fontSize: 17,
        color: blueDark,
        margin: 15,
      },
      productsView: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: graySuperLight,
        borderRadius: 5,
        borderColor: greyLight,
        borderWidth: 1,
        margin: 10,
        width: '80%',
      },
})