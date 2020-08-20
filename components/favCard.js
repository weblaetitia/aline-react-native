import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import {connect} from 'react-redux';

// import BASE URL
import {BASE_URL} from '../components/environment'



function FavCard(props) {

const [liked, setLiked] = useState(true)

const addFav = async (id) => {
// if liked = true alors fetch pour supprimer
if (liked == false) {
    var rawResponse = await fetch(`${BASE_URL}/users/mobile/add-fav?token=${props.token}&placeid=${id}`)
    var response = await rawResponse.json()
    console.log(response)
    if(response) {
        setLiked(!liked)
    }
    } else {
    var rawResponse = await fetch(`${BASE_URL}/users/mobile/delete-fav?token=${props.token}&placeid=${id}`)
        var response = await rawResponse.json()
        console.log(response)
        if(response) {
        setLiked(!liked)
        }
    }
}

return (
    <View style={{width: '100%', marginHorizontal: 0, marginVertical: 15, paddingBottom: 30, borderBottomColor: greyLight, borderBottomWidth: 1, display: 'flex', alignItems: 'center'}}>

    <View style={{...styles.myCard, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{...styles.myTitle, marginLeft: 10, marginRight: 10}}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
        <Image style={{width: 18, height: 18, marginTop: 3}} source = {
                props.type == 'shop' ? require('../assets/icons/boutique.png') :
                require('../assets/icons/restaurant.png')
                } 
                />        
            <Text style={{...styles.h3blue, fontSize: 20, paddingBottom: 4, paddingRight: 10, marginLeft: 8}}>{props.name}</Text>
        </View>
        </View>
        <View style={{width: 30, marginHorizontal: 5}}>
        <TouchableOpacity onPress={() => addFav(props.id)}>
            <FontAwesome name="heart" size={24} color={liked==true?tomato:greyLight} />
        </TouchableOpacity>
        </View>
    </View>

    <View style={{...styles.myCard, marginTop: 6}}>
            <Text style={{...styles.current16}}>{props.adress}</Text>
    </View> 

    <View style={{...styles.myCard, marginTop: 18}}>
        <Text style={{...styles.current16, fontWeight: 'bold'}}>Restaurant</Text>
    </View> 
    
    { props.services && props.services != ',' ?  
        <View style={{...styles.myCard, marginTop: 6}}>
        <Text style={{...styles.current16}}>{props.services}</Text>
        </View> 
        : 
    <View></View> }

        
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



const styles = StyleSheet.create({
container: {
    flex: 1,
},
myCard: {
    width: Dimensions.get('window').width - 40,
},
myTitle: {
    width: Dimensions.get('window').width - 170,
},
current16: {
    fontSize: 16,
    color: blueDark
},
h3blue: {
    color: blueDark,
    fontFamily: 'Capriola_400Regular',
    fontSize: 16,
    letterSpacing: -0.7,
}
});


function mapStateToProps(state) {
return{ favs: state.favs }
}

// keep this line at the end
export default connect(
  mapStateToProps,
  null, 
)(FavCard)
