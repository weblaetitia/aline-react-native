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

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }, [])

  if (scanMode == false) {
    async function findProducts () {

      var response = await fetch(`${BASE_URL}/search/search`, {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `dataProducts=${keyProducts}`
      });
    
      var rawResponse = await response.json();  
      console.log(rawResponse)
    }
      return (
      <View style = {styles.container}>
  
            <Text style = {{color:blueDark}} >Rechercher un produit, une marque, un point de collecte, un restaurant ou un réseau ;</Text>
            <AlineInputCenter onChange={(e) => setKeyProducts(e) } placeholder = 'ex: Bière Manivelle' style = {{ flex: 1 }}/>
            <AlineButton onPress={() => {findProducts()} } title = "Recherche" />
            <AlineSeparator text = 'ou scanner votre produit.' />
            <TouchableOpacity onPress={() => setScanMode(true)}>
              <Image
                style = {{width: 150, padding: 0}}
                resizeMode = 'contain'
                source = {require('../assets/icons/barcode_Big.png')} />
            </TouchableOpacity>
            
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
          <TouchableOpacity onPress={() => setScanMode(false)}>
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
          var rawScannedProduct = await fetch(`${BASE_URL}/search/search-barcode`, {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `data=${data}`
          })
        var product = await rawScannedProduct.json()
        console.log(product)
        // ici renvoyer vers la page produit avec l'objet 'scannedProduct' en second arg
        if (product) {
          props.navigation.navigate('Product', {product})
        } else {
          // do something
        }
      };

      if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      }
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }

      return (
        <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
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
      paddingVertical: 70,
      backgroundColor: '#FFFFFF'
    },
    loadingView : {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent'
    }
  });


// keep this line at the end
export default SearchScreen  