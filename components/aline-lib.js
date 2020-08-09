import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput } from "react-native";

// custom fonts
import { AppLoading } from 'expo';
import { useFonts, Capriola_400Regular } from '@expo-google-fonts/capriola';


// colors vars
var blueDark = '#033C47'
var mintLight = '#D5EFE8'
var mint = '#2DB08C'
var grayMedium = '#879299'
var graySuperLight = '#f4f4f4'
var greyLight = '#d8d8d8'

const AlineButton = ({ onPress, title, backgroundColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.alineButtonContainer, backgroundColor && {backgroundColor}]} activeOpacity={0.8} >
      <Text style={styles.alineButtonText}>{title}</Text>
    </TouchableOpacity>
  )
const AlineButtonOutline = ({ onPress, title, borderColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.alineButtonContainerOutline, borderColor && {borderColor}]} activeOpacity={0.8} >
      <Text style={styles.alineButtonTextMint}>{title}</Text>
    </TouchableOpacity>
  )

  
const BaseInputCenter = ({children, label}) => (
    <View style={{width:'100%'}}>
        {/* LABEL */}
        <Text style={styles.alineInputLabel}>{label}</Text>
        {/* input */}
        {children}
    </View>
)

const AlineInputCenter = ({ children, value, onChange, placeholder, ...props }) => (
    <BaseInputCenter {...props} >
      <TextInput value={value} onChangeText={onChange} placeholder={placeholder}  style={styles.alineInput} style={styles.alineInput}/>
    </BaseInputCenter>
  )

const AlineSeparator = ({text}) => (
    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 30}}>
        <View style={styles.line} />
        <Text style={styles.alineInputLabel}>{text}</Text>
        <View style={styles.line} />
    </View>
)




const styles = StyleSheet.create({
alineButtonContainer: {
    elevation: 8,
    backgroundColor: mint,
    borderRadius: 32,
    paddingVertical: 8,
    paddingHorizontal: 28,
    marginVertical: 14
},
alineButtonContainerOutline: {
    elevation: 8,
    borderWidth: 1,
    borderColor: mint,
    backgroundColor: '#fff',
    borderRadius: 32,
    paddingVertical: 8,
    paddingHorizontal: 28,
    marginVertical: 14
},
alineButtonText: {
    fontFamily: 'Capriola_400Regular', 
    fontSize: 16,
    color: "#fff",
    alignSelf: "center",
    letterSpacing: -0.7
},
alineButtonTextMint: {
    fontFamily: 'Capriola_400Regular', 
    fontSize: 16,
    color: mint,
    alignSelf: "center",
    letterSpacing: -0.7
},
alineInput: {
    backgroundColor: graySuperLight,
    borderRadius: 32,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginVertical: 14,
    marginHorizontal: 36
},
alineInputText: {
    fontSize: 28,
    color: grayMedium,
    textAlign: "left",
},
alineInputLabel: {
    fontSize: 16,
    color: blueDark,
    textAlign: 'center'
},
line: {
    flex: 0.4,
    borderWidth: 1,
    borderColor: greyLight,
    marginHorizontal: 10
  },
})

export {AlineButton, AlineInputCenter, AlineSeparator, AlineButtonOutline}