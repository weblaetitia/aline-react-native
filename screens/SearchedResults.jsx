// eslint-disable-next-line camelcase
import { Capriola_400Regular, useFonts } from '@expo-google-fonts/capriola'
import { Ionicons } from '@expo/vector-icons'
import AppLoading from 'expo-app-loading'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

/* Colors ref */
const greyLight = '#d8d8d8'
const grayMedium = '#879299'
const mint = '#2DB08C'
const graySuperLight = '#f4f4f4'
const blueDark = '#033C47'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
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

const SearchPlacesScreen = ({ route, navigation }) => {
  const [type, setType] = useState('')
  const [datas, setDatas] = useState([])

  const [fontsLoaded] = useFonts({ Capriola_400Regular })

  useEffect(() => {
    const getType = () => {
      if (route.params.response.placesArray.length > 0) {
        setType('lieu de vente')
        setDatas(route.params.response.placesArray)
      } else if (route.params.response.productsArray.length > 0) {
        setType('produit')
        setDatas(route.params.response.productsArray)
      }
    }
    getType()
  }, [])

  // open place or product modal
  const openModal = (typeParam, data) => {
    navigation.navigate(typeParam === 'produit' ? 'Product' : 'Place', typeParam === 'produit' ? { product: data } : { place: data })
  }

  // boucle sur la liste des datas
  const productsList = datas.map((data) => (
    <TouchableOpacity
      style={styles.productsView}
      key={data._id}
      onPress={() => {
        openModal(type, data)
      }}
    >
      <Text
        style={{
          fontFamily: 'Capriola_400Regular',
          fontSize: 16,
          color: mint,
          margin: 5,
          marginVertical: 10,
        }}
      >
        {data.name}
      </Text>
    </TouchableOpacity>
  ))

  if (!fontsLoaded) {
    return <AppLoading />
  }
  return (
    <View style={styles.container}>
      <View style={{ ...styles.head }}>
        <TouchableOpacity onPress={() => navigation.goBack()} title="Dismiss">
          <Ionicons name="md-close" size={34} color={grayMedium} style={{ textAlign: 'right' }} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Choisissez un {type} dans la liste</Text>
      {productsList}
    </View>
  )
}

export default SearchPlacesScreen
