import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";

// fonts
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

function AccountModalScreen(props) {
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.head}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          title="Dismiss"
        >
          <Ionicons
            name="md-close"
            size={34}
            color={grayMedium}
            style={{ position: "absolute", alignSelf: "flex-end" }}
          />
        </TouchableOpacity>
      </View>

      <ImageBackground
        source={require("../assets/images/patatemintlight.png")}
        style={{
          width: 250,
          height: 145,
          marginBottom: 50,
          marginTop: -60,
          top: 40,
        }}
      >
        <Image
          source={require("../assets/icons/Mask.png")}
          style={{
            width: 80,
            height: 80,
            marginLeft: 80,
            marginTop: 25,
          }}
        />
      </ImageBackground>

      <View style={{ alignSelf: "center", marginBottom: 40 }}>
        <Text style={styles.h1blueDark}>
          {props.infos.firstName} {props.infos.lastName}
        </Text>
      </View>

      <View style={{ alignSelf: "flex-start", marginLeft: 30 }}>
        <Text style={{ ...styles.h3mint, marginBottom: 6, marginTop: 6 }}>
          Mon nom
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: graySuperLight,
          width: "100%",
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
          {props.infos.firstName} {props.infos.lastName}
        </Text>
        {/* <Entypo name="chevron-right" size={24} color={blueDark} style={{marginTop: 5, paddingTop: 6, paddingBottom: 8}} /> */}
      </View>

      <View style={{ alignSelf: "flex-start", marginLeft: 30 }}>
        <Text style={{ ...styles.h3mint, marginBottom: 6, marginTop: 6 }}>
          Mon email
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: graySuperLight,
          width: "100%",
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
          {props.infos.email}
        </Text>
        {/* <Entypo name="chevron-right" size={24} color={blueDark} style={{marginTop: 5, paddingTop: 6, paddingBottom: 8}} /> */}
      </View>

      <View style={{ alignSelf: "flex-start", marginLeft: 30 }}>
        <Text style={{ ...styles.h3mint, marginBottom: 6, marginTop: 6 }}>
          Mon mot de passe
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: graySuperLight,
          width: "100%",
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
          Changer mon mot de passe
        </Text>
        <Entypo
          name="chevron-right"
          size={24}
          color={blueDark}
          style={{ marginTop: 5, paddingTop: 6, paddingBottom: 8 }}
        />
      </View>
    </View>
  );
}

// colors vars
var blueDark = "#033C47";
const mintLight = "#D5EFE8";
const mint = "#2DB08C";
var grayMedium = "#879299";
var graySuperLight = "#f4f4f4";
var greyLight = "#d8d8d8";
const gold = "#E8BA00";
const goldLight = "#faf1cb";
const tomato = "#ec333b";
const peach = "#ef7e67";
const peachLight = "#FED4CB";

// STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  head: {
    backgroundColor: "#fff",
    width: "100%",
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 25,
  },
  placeheader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: goldLight,
    paddingBottom: 16,
    paddingHorizontal: 0,
    paddingTop: 60,
    width: "100%",
    marginTop: 0,
    zIndex: -2,
  },
  current: {
    fontSize: 16,
    color: blueDark,
    textAlign: "left",
    lineHeight: 26,
  },
  currentBold: {
    fontSize: 16,
    color: blueDark,
    textAlign: "left",
    lineHeight: 26,
    fontWeight: "bold",
  },
  line: {
    flex: 0.4,
    borderWidth: 1,
    borderColor: greyLight,
    marginHorizontal: 0,
    marginVertical: 30,
  },
  h3mint: {
    fontFamily: "Capriola_400Regular",
    fontSize: 18,
    color: mint,
    letterSpacing: -0.7,
  },
  bigprice: {
    fontFamily: "Capriola_400Regular",
    fontSize: 40,
    color: blueDark,
    letterSpacing: -0.7,
  },
  bigco2: {
    fontFamily: "Capriola_400Regular",
    fontSize: 28,
    color: blueDark,
    letterSpacing: -0.7,
  },
  h2mint: {
    fontFamily: "Capriola_400Regular",
    fontSize: 22,
    color: mint,
    letterSpacing: -0.7,
  },
  h4mint: {
    fontFamily: "Capriola_400Regular",
    fontSize: 14,
    color: mint,
    letterSpacing: -0.7,
  },
  h1blueDark: {
    fontFamily: "Capriola_400Regular",
    fontSize: 26,
    color: blueDark,
    letterSpacing: -0.7,
  },
});

function mapStateToProps(state) {
  return { infos: state.infos };
}

// keep this line at the end
export default connect(mapStateToProps, null)(AccountModalScreen);
