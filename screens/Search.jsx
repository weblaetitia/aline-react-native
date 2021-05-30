import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { Button } from 'react-native-elements'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { BASE_URL } from '../functions/environment'
import { AlineInputCenter, AlineButton, AlineSeparator } from '../components/aline-lib'
import ScanSVG from '../components/ScanSVG'

/* Color ref */
const blueDark = '#033C47'
const mint = '#2DB08C'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    backgroundColor: '#FFFFFF',
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  current20: {
    color: blueDark,
    fontSize: 20,
  },
  scannerView: {
    height: windowHeight / 1.06,
    width: windowWidth,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
})

function SearchScreen(props) {
  const navigation = useNavigation()

  // isFocused
  const isFocused = useIsFocused()
  // console.log('focus? ', isFocused)

  /* Fetch to find products  */
  const [keyProducts, setKeyProducts] = useState('')
  const [scanMode, setScanMode] = useState(false)
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  const [loader, setLoader] = useState(false)
  const [noResultFound, setNoResultFound] = useState(false)

  // const [searchResult, setSearchResult] = useState();

  async function findProducts() {
    if (keyProducts !== '') {
      const rawResponse = await fetch(`${BASE_URL}/search/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `dataProducts=${keyProducts}`,
      })

      const response = await rawResponse.json()
      if (response.productsArray.length === 0 && response.placesArray.length === 0) {
        // nothing found
        setNoResultFound(true)
      } else {
        // found something!
        setNoResultFound(false)
        navigation.navigate('SearchedResults', { response })
      }
    }
  }

  if (scanMode === false && noResultFound === false) {
    return (
      // Page d'accueil Chercher - input - bouton - SCAN bouton
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ ...styles.container }}>
          <Text style={{ ...styles.current20 }}>Chercher par produit, par marque, ou par nom d&apos;établissement</Text>
          <KeyboardAvoidingView style={{ width: '100%', alignItems: 'center' }}>
            <AlineInputCenter onChange={(e) => setKeyProducts(e)} placeholder="ex: Bière Manivelle" style={{ width: '100%' }} />
          </KeyboardAvoidingView>
          <AlineButton
            onPress={() => {
              findProducts()
            }}
            title="Recherche"
            disabled={keyProducts === ''}
          />
          <View style={{ width: '100%', alignItems: 'center' }}>
            <AlineSeparator text="ou" style={{ width: '100%' }} />
          </View>

          <Button
            onPress={() => {
              setScanMode(true)
              setLoader(false)
              setScanned(false)
            }}
            buttonStyle={{
              backgroundColor: mint,
              borderRadius: 32,
              paddingVertical: 8,
              paddingHorizontal: 28,
              marginVertical: 14,
            }}
            icon={<MaterialCommunityIcons name="barcode-scan" size={24} color="white" style={{ marginRight: 8 }} />}
            title="Scannez votre produit"
          />
          <StatusBar />
        </View>
      </TouchableWithoutFeedback>
    )
  }
  if (noResultFound) {
    return (
      // page rien trouvé
      <View style={{ ...styles.container }}>
        <Text style={{ ...styles.current20, textAlign: 'center' }}>Ce produit ne semble pas être consigné.</Text>

        <AlineButton
          onPress={() => {
            setKeyProducts('')
            setNoResultFound(false)
          }}
          title="Refaire une recherche"
        />

        <StatusBar />
      </View>
    )
  }
  if (scanMode === true && isFocused) {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
      setScanned(false)
    })()

    const layerView = loader ? (
      <View style={styles.loadingView}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}> Loading...</Text>
      </View>
    ) : (
      <View
        style={{
          position: 'absolute',
          height: '100%',
          top: 0,
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            width: windowWidth,
            flexGrow: 1,
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setScanMode(false)
            }}
          >
            <Ionicons name="md-close" size={34} color={mint} style={{ textAlign: 'right', marginRight: 34 }} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: windowWidth,
            flexGrow: 12,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ScanSVG />
        </View>
        <View style={{ width: windowWidth, flexGrow: 1 }}>
          <Text style={{ height: 34 }} />
        </View>
      </View>
    )

    // successfully scan something
    const handleBarCodeScanned = async ({ data }) => {
      setScanned(true)
      setLoader(true)
      // console.log('Bar code with type: ', type)
      // console.log('data: ', data)
      // fetch in ddb if product exist
      const rawScannedProduct = await fetch(`${BASE_URL}/search/search-barcode?data=${data}`)
      const product = await rawScannedProduct.json()
      // console.log('SCAN PRODUCT ===',product)
      setScanMode(false)
      // ici renvoyer vers la page produit avec l'objet 'scannedProduct' en second arg
      if (product) {
        props.navigation.navigate('Product', { product })
      } else {
        // afficher le message d'erreur
        setScanned(true)
        setScanMode(false)
        setNoResultFound(true)
        // TODO ne fonctionne pas, voir comment le corriger
        // setErrMsg("Désolé, ce produit ne semble pas être consigné.");
      }
    }

    if (hasPermission === null) {
      return <Text style={styles.scannerView}>Demande d&apos;accès à l&apos;appareil photo...</Text>
    }
    if (hasPermission === false) {
      return <Text style={styles.scannerView}>Pas d&apos;accès à l&apos;appareil photo.</Text>
    }

    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={styles.scannerView} />
        {layerView}
        {/* <----- afficher un loader while on cherche dans la BDD */}

        {/* {scanned && <Button title={'Tap to Scan Again'} onPress={() => {setScanned(false); setLoader(false)} } />} */}
      </View>
    )
  }
  if (!isFocused) {
    return <Text>No acces to camera</Text>
  }
}

// keep this line at the end
export default SearchScreen
