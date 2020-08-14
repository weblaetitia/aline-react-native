import React from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

// fonts
import { Ionicons } from '@expo/vector-icons';


function PlaceModalScreen({ route, navigation }) {
  console.log(route.params)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor:'#fff'}}>
        <View style={styles.head}>
          <TouchableOpacity onPress={() => navigation.goBack()} title="Dismiss" >
            <Ionicons name="md-close" size={34} color={grayMedium} style={{textAlign: 'right'}} />
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 30 }}>{route.params.title}</Text>
        <Text style={{ fontSize: 20 }}>{route.params.description}</Text>
      </View>
    );
  }

  function ProductModalScreen({navigation }) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor:'#fff'}}>
          <View style={styles.head}>
            <TouchableOpacity onPress={() => navigation.goBack()} title="Dismiss" >
              <Ionicons name="md-close" size={34} color={grayMedium} style={{textAlign: 'right'}} />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 30 }}>This is a product modal</Text>
        </View>
      );
    }
  
  function AccountModalScreen({navigation }) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor:'#fff'}}>
          <View style={styles.head}>
            <TouchableOpacity onPress={() => navigation.goBack()} title="Dismiss" >
              <Ionicons name="md-close" size={34} color={grayMedium} style={{textAlign: 'right'}} />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 30 }}>This is My Account modal</Text>
        </View>
      );
    }

// NE PAS UTILISER flexStart dans justifyContent  


// colors vars
var blueDark = '#033C47'
var mintLight = '#D5EFE8'
var mint = '#2DB08C'
var grayMedium = '#879299'
var graySuperLight = '#f4f4f4'
var greyLight = '#d8d8d8'


const styles = StyleSheet.create({
  head: {
    backgroundColor: '#fff',
    width: '100%',
    marginTop: 50,
    marginBottom: 50,
    paddingHorizontal: 25,
    paddingVertical: 10,
    margin: 0,
    borderBottomColor: grayMedium,
    borderBottomWidth: 1,
    height: 50,
  },
})


// keep this line at the end
export {PlaceModalScreen, ProductModalScreen, AccountModalScreen}