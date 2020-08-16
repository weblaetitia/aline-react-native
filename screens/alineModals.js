import React from 'react';
import { SafeAreaView, View, ScrollView, Text, Button, StyleSheet, Image, ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

// my components
import { AlineH1 } from '../components/aline-lib'; 


// fonts
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts, Capriola_400Regular } from '@expo-google-fonts/capriola';


function PlaceModalScreen({ route, navigation }) {
  var response = route.params
  console.log(response.place.services)
  
  return (    
    <View style={{...styles.container}}>

    {/* header */}
    <View style={{...styles.head}}>
      <TouchableOpacity onPress={() => navigation.goBack()} title="Dismiss">
        <Ionicons name="md-close" size={34} color={grayMedium} style={{textAlign: 'right'}} />
      </TouchableOpacity>
    </View>
    {/* header */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* body */}
        <View style={{width:'100%'}}>

          {/* place header */}
          <View style={{...styles.row, marginBottom: -30, paddingTop: 30}}>
            <Image source={{ uri: 'https://res.cloudinary.com/alineconsigne/image/upload/v1597400477/bioburger-_-Marine-Brusson-43-835x600_zj83tv.jpg' }} style={{width: 150, height: 150}} />
            <Image resizeMode ='contain' source = {
              response.place.type == 'shop' ? require('../assets/icons/boutique.png') :
              require('../assets/icons/restaurant.png')
            } 
            />
          </View>
          <View style={styles.placeheader}>
            <View style={styles.row}>
              <View style={{flex:1}}>
              <AlineH1 text={response.place.name}/>
              </View>
              <View>
              <FontAwesome name="heart" size={24} color="tomato" />
              </View>
            </View>
          </View>
          {/* place header */}

          {/* place body */}
          <View style={{marginHorizontal:25, marginVertical:30}}>
            <Text style={styles.currentBold}>
              {response.place.adress}
            </Text>

            <Text style={styles.currentBold}>
              {response.place.phone}
            </Text>

            <View style={styles.line} />

            <Text style={styles.currentBold}>Service proposées</Text>
            {response.place.services.map((service, i) =>{
              return(
                <Text key={i} style={styles.current}>
                    - {service}
                </Text>
              )
            })} 

            <View style={styles.line} />

            {
            response.place.priceRange.length == 1 ? 
            <Text style={styles.h3mint}>Consignes à partir de {response.place.priceRange[0]}&nbsp;€</Text>
            : 
            <Text style={styles.h3mint}>Consignes entre {response.place.priceRange[0]} et {response.place.priceRange[1]}&nbsp;€</Text>
          }

            <View style={styles.line} />

            <Text style={{...styles.h3mint, textAlign: 'center'}}>
              {response.place.name} fait parti du réseau {response.place.network}
            </Text>

            <ImageBackground source={{uri: response.place.networkImg}} style={{
              marginTop: 30,
              width: '100%',
              height: 100,
              resizeMode: "cover",
              justifyContent: "center"
              }
              }></ImageBackground>
            
              <Text style={{...styles.h3mint, textAlign: 'center', marginTop:30}}>
                Retrouvez tous les lieux de colecte sur la carte de ce réseau
              </Text>
            

          </View>
          {/* place body */}

            <ImageBackground source={{uri: "https://res.cloudinary.com/alineconsigne/image/upload/v1597221942/exemple_map_doqipr.png"}} style={{
                marginTop: 0,
                width: '100%',
                height: 400,
                resizeMode: "cover",
                justifyContent: "center"
              }
              }></ImageBackground>

        </View>
        {/* body */} 
      </ScrollView> 
    </View>
  )
}

function ProductModalScreen({ route, navigation }) {
  var response = route.params
  console.log(response.product)
  
  return (    
    <View style={{...styles.container}}>

    {/* header */}
    <View style={{...styles.head}}>
      <TouchableOpacity onPress={() => navigation.goBack()} title="Dismiss">
        <Ionicons name="md-close" size={34} color={grayMedium} style={{textAlign: 'right'}} />
      </TouchableOpacity>
    </View>
    {/* header */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* body */}
        <View style={{width:'100%'}}>

          {/* place header */}
          <View style={{...styles.row, marginBottom: -30, paddingTop: 30}}>
            <Image source={{ uri: response.product.imageUrl }} style={{width: 150, height: 150}} />
          </View>
          <View style={styles.placeheader}>
            <View style={styles.row}>
              <View style={{flex:1}}>
              <AlineH1 text={response.product.brand}/>
              <AlineH1 text={response.product.name}/>
              <AlineH1 text={response.product.refoundPrice}/>
              </View>
              <View>
              <FontAwesome name="heart" size={24} color="tomato" />
              </View>
            </View>
          </View>
          {/* place header */}

          {/* place body */}
          <View style={{marginHorizontal:25, marginVertical:30}}>

            <View style={styles.line} />


            <View style={styles.line} />

            <Text style={{...styles.h3mint, textAlign: 'center'}}>
              {response.product.name} fait parti du réseau {response.product.network}
            </Text>

            <ImageBackground source={{uri: response.product.networkImg}} style={{
              marginTop: 30,
              width: '100%',
              height: 100,
              resizeMode: "cover",
              justifyContent: "center"
              }
              }></ImageBackground>
            
              <Text style={{...styles.h3mint, textAlign: 'center', marginTop:30}}>
                Retrouvez tous les lieux de colecte sur la carte de ce réseau
              </Text>
            

          </View>
          {/* place body */}

            <ImageBackground source={{uri: "https://res.cloudinary.com/alineconsigne/image/upload/v1597221942/exemple_map_doqipr.png"}} style={{
                marginTop: 0,
                width: '100%',
                height: 400,
                resizeMode: "cover",
                justifyContent: "center"
              }
              }></ImageBackground>

        </View>
        {/* body */} 
      </ScrollView> 
    </View>
  )
}

  
  function AccountModalScreen({navigation }) {
      return (
        <View style={styles.container}>
          <View style={styles.head}>
            <TouchableOpacity onPress={() => navigation.goBack()} title="Dismiss" >
              <Ionicons name="md-close" size={34} color={grayMedium} style={{textAlign: 'right'}} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    
    
// colors vars
var blueDark = '#033C47'
var mintLight = '#D5EFE8'
var mint = '#2DB08C'
var grayMedium = '#879299'
var graySuperLight = '#f4f4f4'
var greyLight = '#d8d8d8'
var gold = "#E8BA00"
var goldLight = '#faf1cb'
var tomato = '##ec333b'
    
    
// STYLES
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
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 25,
  },
  placeheader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: goldLight,
    paddingBottom: 16,
    paddingHorizontal: 0,
    paddingTop: 60,
    width: '100%',
    marginTop: 0,
    zIndex: -2
  },
  current: {
    fontSize: 16,
    color: blueDark,
    textAlign: 'left',
    lineHeight: 26,
  },
  currentBold: {
    fontSize: 16,
    color: blueDark,
    textAlign: 'left',
    lineHeight: 26,
    fontWeight: 'bold',
  },
  line: {
    flex: 0.4,
    borderWidth: 1,
    borderColor: greyLight,
    marginHorizontal: 0,
    marginVertical: 30,
  },
  h3mint: {
    fontFamily: 'Capriola_400Regular', 
    fontSize: 18,
    color: mint,
    letterSpacing: -0.7
  }
})


// keep this line at the end
export {PlaceModalScreen, ProductModalScreen, AccountModalScreen}