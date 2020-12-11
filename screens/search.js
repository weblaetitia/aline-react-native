import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, ImageBackground, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useIsFocused } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';

// import BASE URL
import {BASE_URL} from '../components/environment'

// my components
import { AlineInputCenter, AlineButton, AlineSeparator } from '../components/aline-lib';
import ScanSVG from '../components/ScanSVG';

// fonts
import { Ionicons } from '@expo/vector-icons';


/* Color ref */
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


function SearchScreen(props) {

  const navigation = useNavigation()


  // isFocused
  const isFocused = useIsFocused()
  // console.log('focus? ', isFocused)

  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const viewHeight = windowHeight - useHeaderHeight() - useHeaderHeight();

  /* Fetch to find products  */
  const [keyProducts, setKeyProducts] = useState('');
  const [scanMode, setScanMode] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loader, setLoader] = useState(false);
  const [noResultFound, setNoResultFound] = useState(false);
  // const [searchResult, setSearchResult] = useState();

  if ((scanMode == false) && (noResultFound == false)) {
    async function findProducts () {
      if (keyProducts != '') {
        var rawResponse = await fetch(`${BASE_URL}/search/search`, {
          method: 'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: `dataProducts=${keyProducts}`
        });
      
        var response = await rawResponse.json();
        if ((response.productsArray.length === 0) && (response.placesArray.length === 0)) {
            // nothing found
            setNoResultFound(true)
          }  else {
            // found something!
            setNoResultFound(false)
            navigation.navigate('SearchedResults', {response})
          }
      } 

      
    }

      return (
        // Page d'accueil Chercher - input - bouton - SCAN bouton
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style = {{...styles.container}}>
            <Text style = {{...styles.current20}}>Chercher par produit, par marque, ou par nom d'établissement</Text>
            <KeyboardAvoidingView style={{width: '100%', alignItems: 'center'}}>
              <AlineInputCenter onChange={ (e) => setKeyProducts(e) } placeholder = 'ex: Bière Manivelle' style={{width: '100%'}}/>
              
            </KeyboardAvoidingView>
            <AlineButton onPress={() => { findProducts() } } title = "Recherche" />
            <View style={{width: '100%', alignItems: 'center'}}>
              <AlineSeparator text = 'ou' style={{width: '100%'}}/>
            </View>

            <Button  onPress={() => {setScanMode(true); setLoader(false); setScanned(false)}}
              buttonStyle={{
              backgroundColor: mint,
              borderRadius: 32,
              paddingVertical: 8,
              paddingHorizontal: 28,
              marginVertical: 14
            }}
              icon={
                <MaterialCommunityIcons name="barcode-scan" size={24} color="white" style={{marginRight: 8}} />
              }
              title="Scannez votre produit"
            />
            <StatusBar style = "auto" />
          </View>
        </TouchableWithoutFeedback>
      )
    } else if (noResultFound) {
      return (
        // page rien trouvé
        <View style={{...styles.container}}>
          <Text style={{...styles.current20, textAlign: 'center'}}>
            Il semble n'y avoir aucun élément <Text style={{fontWeight: 'bold'}}>{keyProducts}</Text> dans notre base.
          </Text>
          
          <AlineButton onPress={() => {setNoResultFound(false)} } title = "Refaire une recherche" />
          
          <StatusBar style = "auto" />
      </View>
      )
    } else if (scanMode == true && isFocused) {


      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        setScanned(false)
      })()

      if (loader) {
        var layerView = <View style={styles.loadingView}><Text style={{color: 'white', fontWeight: 'bold'}}>   Loading...</Text></View>
      }
      if (!loader) {
        var layerView = (
          <View style={{position: 'absolute', height: '100%',  top: 0, flex: 1, flexDirection: "column", justifyContent: "space-between"}}>
            <View style={{width:windowWidth, flexGrow: 1, justifyContent: 'center'}}>
              <TouchableOpacity onPress={() => {setScanMode(false)}}>
                <Ionicons name="md-close" size={34} color={mint} style={{textAlign: 'right', marginRight: 34}} />
              </TouchableOpacity>
            </View>
            <View style={{width:windowWidth, flexGrow: 12, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ScanSVG />
            </View>
            <View style={{width:windowWidth, flexGrow: 1}}>
              <Text style={{height: 34}}></Text>
            </View>
          </View>
          )
        }

      // successfully scan something
      const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        setLoader(true)
        // console.log('Bar code with type: ', type)
        // console.log('data: ', data)
        // fetch in ddb if product exist
        var rawScannedProduct = await fetch(`${BASE_URL}/search/search-barcode?data=${data}`)
        var product = await rawScannedProduct.json()
        // console.log('SCAN PRODUCT ===',product)
        setScanMode(false)
        // ici renvoyer vers la page produit avec l'objet 'scannedProduct' en second arg
        if (product) {
          props.navigation.navigate('Product', {product})
        } else {
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