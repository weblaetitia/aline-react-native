import { Entypo, Ionicons } from '@expo/vector-icons'
import * as Linking from 'expo-linking'
import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import patateImage from '../assets/images/patatemintlight.png'
import maskImage from '../assets/icons/Mask.png'

// colors vars
const blueDark = '#033C47'
const mint = '#2DB08C'
const grayMedium = '#879299'
const graySuperLight = '#f4f4f4'
const greyLight = '#d8d8d8'
const goldLight = '#faf1cb'

// STYLES
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
    // position: "absolute",
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
    zIndex: -2,
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
    letterSpacing: -0.7,
  },
  bigprice: {
    fontFamily: 'Capriola_400Regular',
    fontSize: 40,
    color: blueDark,
    letterSpacing: -0.7,
  },
  bigco2: {
    fontFamily: 'Capriola_400Regular',
    fontSize: 28,
    color: blueDark,
    letterSpacing: -0.7,
  },
  h2mint: {
    fontFamily: 'Capriola_400Regular',
    fontSize: 22,
    color: mint,
    letterSpacing: -0.7,
  },
  h4mint: {
    fontFamily: 'Capriola_400Regular',
    fontSize: 14,
    color: mint,
    letterSpacing: -0.7,
  },
  h1blueDark: {
    fontFamily: 'Capriola_400Regular',
    fontSize: 26,
    color: blueDark,
    letterSpacing: -0.7,
  },
})

const AccountModalScreen = (props) => {
  const {
    infos: { firstName, lastName, email },
  } = props

  const handleResetPassword = () => {
    Linking.openURL('https://aline.app/login/identify')
  }

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={{ ...styles.head }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()} title="Dismiss">
          <Ionicons name="md-close" size={34} color={grayMedium} style={{ textAlign: 'right' }} />
        </TouchableOpacity>
      </View>

      <ImageBackground
        source={patateImage}
        style={{
          width: 250,
          height: 145,
          marginBottom: 50,
          marginTop: -60,
          top: 40,
        }}
      >
        <Image
          source={maskImage}
          style={{
            width: 80,
            height: 80,
            marginLeft: 80,
            marginTop: 25,
          }}
        />
      </ImageBackground>

      <View style={{ alignSelf: 'center', marginBottom: 40 }}>
        <Text style={styles.h1blueDark}>
          {firstName} {lastName}
        </Text>
      </View>

      <View style={{ alignSelf: 'flex-start', marginLeft: 30 }}>
        <Text style={{ ...styles.h3mint, marginBottom: 6, marginTop: 6 }}>Mon nom</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: graySuperLight,
          width: '100%',
          borderWidth: 1,
          borderColor: greyLight,
          marginBottom: 20,
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        <Text
          style={{
            ...styles.current,
            marginTop: 5,
            paddingTop: 6,
            paddingBottom: 8,
          }}
        >
          {firstName} {lastName}
        </Text>
        {/* <Entypo name="chevron-right" size={24} color={blueDark} style={{marginTop: 5, paddingTop: 6, paddingBottom: 8}} /> */}
      </View>

      <View style={{ alignSelf: 'flex-start', marginLeft: 30 }}>
        <Text style={{ ...styles.h3mint, marginBottom: 6, marginTop: 6 }}>Mon email</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: graySuperLight,
          width: '100%',
          borderWidth: 1,
          borderColor: greyLight,
          marginBottom: 20,
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        <Text
          style={{
            ...styles.current,
            marginTop: 5,
            paddingTop: 6,
            paddingBottom: 8,
          }}
        >
          {email}
        </Text>
        {/* <Entypo name="chevron-right" size={24} color={blueDark} style={{marginTop: 5, paddingTop: 6, paddingBottom: 8}} /> */}
      </View>

      <View style={{ alignSelf: 'flex-start', marginLeft: 30 }}>
        <Text style={{ ...styles.h3mint, marginBottom: 6, marginTop: 6 }}>Mon mot de passe</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: graySuperLight,
          width: '100%',
          borderWidth: 1,
          borderColor: greyLight,
          marginBottom: 20,
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        <TouchableOpacity onPress={() => handleResetPassword()}>
          <Text
            style={{
              ...styles.current,
              marginTop: 5,
              paddingTop: 6,
              paddingBottom: 8,
            }}
          >
            Changer mon mot de passe
          </Text>
        </TouchableOpacity>
        <Entypo name="chevron-right" size={24} color={blueDark} style={{ marginTop: 5, paddingTop: 6, paddingBottom: 8 }} />
      </View>
    </View>
  )
}

function mapStateToProps(state) {
  return { infos: state.infos }
}

// keep this line at the end
export default connect(mapStateToProps, null)(AccountModalScreen)
