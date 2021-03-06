import React from 'react'
import { View, ScrollView, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { AlineH1 } from '../components/aline-lib'
import ProductsMiniMap from '../components/ProductMiniMap'
import { styles } from './styles/styles'
import patateImage from '../assets/images/patatemintlight.png'

// colors vars
const grayMedium = '#879299'

const ProductModalScreen = ({ route, navigation }) => {
  const response = route.params
  return (
    <View style={{ ...styles.container }}>
      {/* header */}
      <View style={{ ...styles.head }}>
        <TouchableOpacity onPress={() => navigation.goBack()} title="Dismiss">
          <Ionicons name="md-close" size={34} color={grayMedium} style={{ textAlign: 'right' }} />
        </TouchableOpacity>
      </View>
      {/* header */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* body */}
        <View style={{ width: '100%' }}>
          {/* product header */}
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Image
              source={{ uri: response.product.imageUrl }}
              style={{
                marginHorizontal: 'auto',
                marginBottom: 20,
                marginTop: 20,
                resizeMode: 'cover',
                width: 150,
                height: 280,
              }}
            />
            <AlineH1 text={response.product.name} />
            <Text
              style={{
                ...styles.currentBold,
                fontSize: 20,
                color: grayMedium,
                marginBottom: 30,
                marginTop: 8,
              }}
            >
              {response.product.brand.toUpperCase()}
            </Text>
          </View>
          {/* product header */}

          {/* place body */}
          <View style={{ marginHorizontal: 25, marginVertical: 30 }}>
            <Text
              style={{
                ...styles.h2mint,
                textAlign: 'center',
                marginBottom: 10,
              }}
            >
              Rapportez ce produit en magasin et récupérez
            </Text>

            <View style={{ flex: 1, alignItems: 'center', width: '100%' }}>
              <ImageBackground
                source={patateImage}
                style={{
                  marginTop: 0,
                  width: 120,
                  height: 100,
                  resizeMode: 'cover',
                  justifyContent: 'center',
                }}
              />
            </View>

            <Text
              style={{
                ...styles.bigprice,
                textAlign: 'center',
                marginTop: -75,
                marginBottom: 75,
              }}
            >
              {response.product.refoundPrice} €
            </Text>

            <Text style={{ ...styles.bigco2, textAlign: 'center' }}>-0,05 g de CO2</Text>
            <Text style={{ ...styles.h2mint, textAlign: 'center' }}>c&apos;est votre réduction sur votre impact environemental</Text>

            <View style={styles.line} />

            <Text style={{ ...styles.h3mint, textAlign: 'center' }}>
              {response.product.name} {response.product.brand} fait parti du réseau {response.product.network}
            </Text>

            {/* récupérer l'url du réseau */}
            <View style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <Image
                source={{ uri: response.product.networkImgUrl }}
                style={{
                  marginHorizontal: 'auto',
                  marginBottom: 20,
                  marginTop: 20,
                  resizeMode: 'contain',
                  width: 200,
                  height: 100,
                }}
              />
            </View>

            <Text style={{ ...styles.h3mint, textAlign: 'center', marginTop: 30 }}>
              Retrouvez tous les lieux de colecte sur la carte de ce réseau
            </Text>
          </View>
          {/* place body */}

          <ProductsMiniMap network={response.product.network} />
        </View>
        {/* body */}
      </ScrollView>
    </View>
  )
}

export default ProductModalScreen
