import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Keyboard, TextInput, StatusBar } from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import { Slider } from 'react-native-elements';
import {connect} from 'react-redux';
import { useHeaderHeight } from '@react-navigation/stack';

// my components
import { AlineButton } from '../components/aline-lib'
import {ToggleButton} from '../components/toggleButton'

// import BASE URL
import {BASE_URL} from '../components/environment'

// fonts
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

// styles
import { styles } from './styles/styles'


function FilterModalScreen(props) { 

    const [searchedName, setSearchedName] = useState('');
    const [sliderValue, setSliderValue] = useState(10);
    const [inputHasFocus, setInputHasFocus] = useState(false)
    const [restaurant, setRestaurant] = useState(true)
    const [shop, setShop] = useState(true)

    useEffect(() =>{
        // get filter info from store(redux)
        const setFilterInfo = () => {
            props.filter.placeName ? setSearchedName(props.filter.placeName) : setSearchedName('')
            props.filter.placeDistance ? setSliderValue(props.filter.placeDistance*0.001) : setSliderValue(10)
            props.filter.restaurant ? setRestaurant(true) : setRestaurant(false)
            props.filter.shop ? setShop(true) : setShop(false)
        }
        setFilterInfo()
        
    }, [props.filter])

    const handleFilterClick = () => {
        // A ajouter : si placeName != '' alors faire une requette fetch sur le nom et ouvrir une modalscreeen Place
        // send to store(redux)
        props.storeFilterDatas({
            placeName: searchedName,
            networkName: '',
            placeDistance: sliderValue*1000,
            restaurant: restaurant,
            shop: shop
        })
    }

    const clearFilter = () => {
        setSearchedName('');
        setSliderValue(10);
        setRestaurant(true)
        setShop(true)
    }

    return (    
    <View style={{...styles.container}}>

    {/* header */}
    <View style={{...styles.head}}>
    <TouchableOpacity onPress={() => props.navigation.goBack()} title="Dismiss">
        <Ionicons name="md-close" size={34} color={grayMedium} style={{textAlign: 'right'}} />
      </TouchableOpacity>
    </View>
    {/* header */}
    <TouchableWithoutFeedback style={{width: Dimensions.get('window').width}} onPress={Keyboard.dismiss} >
        <>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', paddingHorizontal:14}}>
            <Text style={{...filterStyles.mainTitle}}>Filtrer</Text>
            <TouchableOpacity onPress={() => clearFilter()}>
                <Text style={{...filterStyles.clearText}}>Effacer tous les filtres</Text>
            </TouchableOpacity>
        </View>


        <View style={{flexDirection: 'row', justifyContent: 'center', width: '100%', paddingHorizontal:14}}>
            <Text style={{...filterStyles.inputLabel, width: '100%'}}>Chercher par nom de lieu</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center', width: '100%', paddingHorizontal:14}}>
            <TextInput style={inputHasFocus ? customInputSelected : customInput} 
            onChangeText={ (e)=> setSearchedName(e) } placeholder='ex: Café de Paris' 
            autoCorrect={false}
            onFocus={() => setInputHasFocus(true)}
            onBlur={() => setInputHasFocus(false)}
            selectionColor={mint}
            value={searchedName}
            />
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center', width: '100%', paddingHorizontal:14}}>
            <Text style={{...filterStyles.inputLabel, width: '100%'}}>Rayon de recherche</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center', width: '100%', paddingHorizontal:14}}>
            <Slider
                style={filterStyles.slider}
                value={sliderValue}
                onValueChange={setSliderValue}
                maximumValue={80}
                minimumValue={1}
                step={1}
                trackStyle={{ height: 5, backgroundColor: 'red' }}
                thumbStyle={{ height: 20, width: 20, backgroundColor: mint }}
                thumbProps={{
                    children: (
                    <FontAwesome
                        name="heartbeat"
                        size={30}
                        containerStyle={{ bottom: 20, right: 20 }}
                        color="red"
                    />
                ),
                }}
            />  
        </View>

        
        <View style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
            <Text style={{textAlign: 'center'}}>{sliderValue} km</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center', width: '100%', marginBottom: 16}}>
            <Text style={{...filterStyles.inputLabel, width: '90%'}}>Type de lieu</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center', width: '100%', paddingHorizontal:14}}>
            <View style={{marginRight:16}}>
                <ToggleButton title='Restaurant' onPress={() => setRestaurant(!restaurant)} checkedStatus={restaurant} />
            </View>
            <View style={{marginRight:16}}>
                <ToggleButton title='Magasin' onPress={() => setShop(!shop)} checkedStatus={shop} />
            </View>
        </View>
            
        <View style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
            <AlineButton style={{width: '90%'}} title="Filtrer" onPress={()=> {handleFilterClick(), props.navigation.goBack()} } />
        </View>
            </>
        </TouchableWithoutFeedback> 
        <StatusBar style="auto" />
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

// styles
const filterStyles = {
    slider: {
        width:'100%',
        alignSelf:'center'
    },
    mainTitle: {
        fontFamily: 'Capriola_400Regular',
        letterSpacing: -0.7,
        fontSize:30,
        color: blueDark,
        marginTop: 30, 
        marginBottom: -4,
    },
    clearText: {
        fontSize: 14,
        color: mint,
        marginTop: 30, 
        letterSpacing: -0.4,
    },
    inputLabel: {
        fontFamily: 'Capriola_400Regular',
        letterSpacing: -0.7,
        fontSize: 16,
        color: blueDark,
        marginTop: 30
    },
    customInput: {
        backgroundColor: graySuperLight,
        borderRadius: 32,
        paddingVertical: 8,
        paddingHorizontal: 14,
        marginVertical: 14,
        width: '100%', 
        borderColor:greyLight, 
        borderWidth:1
    },
}
const customInput = {
    backgroundColor: graySuperLight,
    borderRadius: 32,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginVertical: 14,
    width: '100%', 
    borderWidth:1,
    borderColor:greyLight, 
    color: blueDark,
}    
const customInputSelected = {
    ...customInput,
    borderColor: mint, 
}



function mapDispatchToProps(dispatch) {
    return{
        storeFilterDatas: function(filterDatas) {
            dispatch({type: 'saveFilterData', filterDatas})
        }
    }
}
    
function mapStateToProps(state) {
    return{ filter: state.filter }
}
    
// keep this line at the end
export default connect(
    mapStateToProps,
    mapDispatchToProps, 
)(FilterModalScreen)