import React, {useState, useEffect} from 'react';
import { View, ScrollView, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'
// my components
import { AlineH1 } from '../components/aline-lib'; 
// import BASE URL
import {BASE_URL} from '../components/environment'

// fonts
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

// styles
import { styles } from './styles/styles'


export default function PlaceModalScreen({ route, navigation }) {
  var response = route.params  
  const [networkImg, setNetworkImg] = useState('')
  
  // get image
  useEffect(() => {
    const getNetworkImg = async () => {
      var rawResponse = await fetch(`${BASE_URL}/search/get-network-img?network=${response.place.network}`)
      var resp = await rawResponse.json()
      console.log('response : ', resp.networkImg)
      setNetworkImg(resp.networkImg)
    }
    getNetworkImg()
  }, [])


  if (response.place.openingHours && response.place.openingHours != '') {
    var openingHours = response.place.openingHours.split(',')
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
            {response.place.services ? <Text style={styles.current}>
                                          - {response.place.services}
                                      </Text> :
                                      <Text></Text>
                                      } 


            {openingHours? <View>
              <View style={styles.line} />
              <Text style={styles.currentBold}>Horaires</Text>
              {openingHours? openingHours.map((listItem, i) =>{
                return(
                  <Text key={i} style={styles.current}>
                      - {listItem}
                  </Text>
                )
              }) : <Text></Text>} 
            </View> : <View></View>}

            <View style={styles.line} />

            { !response.place.priceRange ? 
            <Text></Text> :
            response.place.priceRange.length == 1 ? 
            <View>
            <Text style={{...styles.h3mint, textAlign: 'center'}}>Consignes à partir de {response.place.priceRange[0]}&nbsp;€</Text>
            <View style={styles.line} />
          </View>
            : 
            <View>
            <Text style={{...styles.h3mint, textAlign: 'center'}}>Consignes entre {response.place.priceRange[0]} et {response.place.priceRange[1]}&nbsp;€</Text>
            <View style={styles.line} />
          </View>
            }

            
            

            <Text style={{...styles.h3mint, textAlign: 'center'}}>
              {response.place.name} fait parti du réseau {response.place.network}
            </Text>

            {/* image du réseau */}
            <View style={{width: '100%', display: 'flex', alignItems:'center'}}>
              <Image source={{ uri: networkImg }} style={{marginHorizontal: 'auto', marginBottom:20, marginTop: 20, resizeMode:'contain', width: 200, height:100}} />
            </View>
            
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