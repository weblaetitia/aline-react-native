import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, Image, View, TouchableOpacity, Button, ImageBackground } from 'react-native';
import { AlineInputCenter, AlineButton, AlineSeparator } from '../components/aline-lib';

import { StatusBar } from 'expo-status-bar';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';

// import BASE URL
import {BASE_URL} from '../components/environment'

/* Color ref */
var blueDark = '#033C47';
var mint = '#2DB08C';


function SearchScreen(props) {
  // isFocused
  const isFocused = useIsFocused()
  console.log('focus? ', isFocused)

  /* Fetch to find products  */
  const [keyProducts, setKeyProducts] = useState('')
  const [scanMode, setScanMode] = useState(false)
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [loader, setLoader] = useState(false)
  const [noResultFound, setNoResultFound] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      setScanned(false)
    })()
  }, [])

  if ((scanMode == false) && (noResultFound == false)) {
    async function findProducts () {

      var rawResponse = await fetch(`${BASE_URL}/search/search`, {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `dataProducts=${keyProducts}`
      });
    
      var response = await rawResponse.json();  

      console.log('-------------------------------------')
      console.log(response)
      console.log('-------------------------------------')
      
      
    }
      return (
      <View style = {styles.container}>
        <Text style = {styles.current20}>Rechercher un produit, une marque, un point de collecte, un restaurant ou un réseau</Text>
        <AlineInputCenter onChange={(e) => setKeyProducts(e) } placeholder = 'ex: Bière Manivelle' style = {{ flex: 1 }}/>
        <AlineButton onPress={() => {findProducts()} } title = "Recherche" />
        <View style={{width: '100%', marginVertical: 30}}>
          <AlineSeparator text = 'ou'/>
        </View>
        <Text style = {styles.current20}>Scanner votre produit</Text>
        <TouchableOpacity onPress={() => {setScanMode(true); setLoader(false); setScanned(false)}}>
          <Image
            style = {{width: 150, padding: 0}}
            resizeMode = 'contain'
            source = {require('../assets/icons/barcode_Big.png')} />
        </TouchableOpacity>
        <StatusBar style = "auto" />
      </View>
    )
    } else if (noResultFound) {
      return (
        <View style={styles.container}>
          <Text style={{...styles.current20, textAlign: 'center'}}>
            {errMsg}
          </Text>
          
          <AlineButton onPress={() => {setNoResultFound(false)} } title = "Refaire une recherche" />
          
          <StatusBar style = "auto" />
      </View>
      )
    } else if (scanMode == true && isFocused) {
      if (loader) {
        var layerView = <View style={styles.loadingView}><Text style={{color: 'white', fontWeight: 'bold'}}>   Loading...</Text></View>
      }
      if (!loader) {
        var layerView = <ImageBackground source={require('../assets/images/scan-top-screen.png')} style={{
          position: 'absolute', 
          top: 0,
          width: '100%',
          height: '100%',
          resizeMode: "cover",
          justifyContent: "center"
        }
      } >
        <View style={{flex:1, alignItems: 'flex-end', justifyContent: 'flex-start', padding:20}}>
          <TouchableOpacity onPress={() => {setScanMode(false)}}>
            <View style={{width:40, height:40}}></View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      }

      // successfully scan something
      const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        setLoader(true)
        console.log('Bar code with type: ', type)
        console.log('data: ', data)
        // fetch in ddb if product exist
        var rawScannedProduct = await fetch(`${BASE_URL}/search/search-barcode?data=${data}`)
        var product = await rawScannedProduct.json()
        console.log(product)
        setScanMode(false)
        // ici renvoyer vers la page produit avec l'objet 'scannedProduct' en second arg
        if (product) {
          props.navigation.navigate('Product', {product})
        } else {
          console.log('je suis dans le false')
          // afficher le message d'erreur
          setScanned(true)
          setScanMode(false)
          setNoResultFound(true)
          setErrMsg('Désolé, ce produit ne semble pas être consigné.')
        }
      };

      if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }

      return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {layerView}{/* <----- afficher un loader while on cherche dans la BDD */}
    
    {/* {scanned && <Button title={'Tap to Scan Again'} onPress={() => {setScanned(false); setLoader(false)} } />} */}

    </View>
      );
    } else if (!isFocused) {
      return (
        <Text>No acces to camera</Text>
      )
    }
    
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 25,
      backgroundColor: '#FFFFFF'
    },
    loadingView : {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent'
    },
    current20: {
      color: blueDark,
      fontSize: 20,
    }
  });


// keep this line at the end
export default SearchScreen  