import React from 'react';
import { SafeAreaView, View, ScrollView, Text, Button, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'

// my components
import { AlineH1 } from '../components/aline-lib'; 


// fonts
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


function PlaceModalScreen({ route, navigation }) {
  var response = route.params  

  var openingHoursView

  if (response.place.openingHours && response.place.openingHours != '') {
    var openingHours = response.place.openingHours.split(',')

    // openingHoursView = <View style={styles.line} />
    //                       <Text style={styles.currentBold}>Horaires</Text>
    //                       {openingHours.map((service, i) =>{
    //                     return(
    //                       <Text key={i} style={styles.current}>
    //                           - {service}
    //                       </Text>
    //                         )
    //                       })} 
  }
  

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
            <Image source={{ uri: response.place.placeImg || response.place.placeImg != '' ? response.place.placeImg : 'https://res.cloudinary.com/alineconsigne/image/upload/v1597671122/website/placeholder-image_eoeppy.png' }} style={{width: 150, height: 150}} />
            <Image resizeMode ='contain' source = {
              response.place.type == 'shop' ? require('../assets/icons/boutique.png') :
              require('../assets/icons/restaurant.png')
            } 
            />
          </View>
          <View style={{...styles.placeheader, backgroundColor: response.place.type=='shop' ? goldLight : peachLight}}>
            <View style={styles.row}>
              <View style={{flex:1}}>
              <AlineH1 text={response.place.name}/>
              </View>
              <View>
                <TouchableOpacity>
                  <FontAwesome name="heart" size={24} color="tomato" />
                </TouchableOpacity>
              
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

            <Text style={styles.currentBold}>Service de consigne proposées</Text>
            {response.place.services.map((service, i) =>{
              return(
                <Text key={i} style={styles.current}>
                    - {service}
                </Text>
              )
            })} 


            {openingHours? <View>
              <View style={styles.line} />
              <Text style={styles.currentBold}>Horaires</Text>
              {openingHours.map((service, i) =>{
                return(
                  <Text key={i} style={styles.current}>
                      - {service}
                  </Text>
                )
              })} 
            </View> : <View></View>}

            <View style={styles.line} />

            {
            response.place.priceRange.length == 1 ? 
            <Text style={{...styles.h3mint, textAlign: 'center'}}>Consignes à partir de {response.place.priceRange[0]}&nbsp;€</Text>
            : 
            <Text style={{...styles.h3mint, textAlign: 'center'}}>Consignes entre {response.place.priceRange[0]} et {response.place.priceRange[1]}&nbsp;€</Text>
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
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginTop: 50}}>
              <Image source={{ uri: response.product.imageUrl }} style={{width: 250, height: 250, marginHorizontal: 'auto', marginBottom:20}} />
              <AlineH1 text={response.product.name}/>
              <AlineH1 text={response.product.brand} style={{marginBottom: 30}}/>
            </View>
          {/* place header */}

          {/* place body */}
          <View style={{marginHorizontal:25, marginVertical:30}}>

            <Text style={{...styles.h2mint, textAlign: 'center', marginBottom: 10}}>
              Rapportez ce produit en magasin et récupérez
            </Text>

            <View style={{flex: 1, alignItems: 'center', width: '100%'}}>
            <ImageBackground source={require('../assets/images/patatemintlight.png')} style={{
                marginTop: 0,
                width: 120,
                height: 100,
                resizeMode: "cover",
                justifyContent: "center"
              }
              }></ImageBackground>
            </View>
            
            <Text style={{...styles.bigprice, textAlign: 'center', marginTop: -75, marginBottom: 75}}>
              {response.product.refoundPrice} €
            </Text>
            
            <Text style={{...styles.bigco2, textAlign: 'center'}}>
              -0,05 g de CO2
            </Text>
            <Text style={{...styles.h2mint, textAlign: 'center'}}>
              c'est votre réduction sur votre impact environemental
            </Text>

            <View style={styles.line} />

            <Text style={{...styles.h3mint, textAlign: 'center'}}>
              {response.product.name} {response.product.brand} fait parti du réseau {response.product.network}
            </Text>

            {/* récupérer l'url du réseau */}
            <ImageBackground source={{uri: response.product.networkImgUrl}} style={{
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
var tomato = '#ec333b'
var peach = '#ef7e67'
var peachLight = '#FED4CB'
    
    
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
  },
  bigprice: {
    fontFamily: 'Capriola_400Regular', 
    fontSize: 40,
    color: blueDark,
    letterSpacing: -0.7
  },
  bigco2: {
    fontFamily: 'Capriola_400Regular', 
    fontSize: 32,
    color: blueDark,
    letterSpacing: -0.7
  },
  h2mint: {
    fontFamily: 'Capriola_400Regular', 
    fontSize: 22,
    color: mint,
    letterSpacing: -0.7
  }
})


// keep this line at the end
export {PlaceModalScreen, ProductModalScreen, AccountModalScreen}