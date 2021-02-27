import React from "react";

import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  Platform,
} from "react-native";
import { ListItem } from "react-native-elements";

import {
  FontAwesome,
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { AppLoading } from "expo";
// eslint-disable-next-line camelcase
import { useFonts, Capriola_400Regular } from "@expo-google-fonts/capriola";
import { connect } from "react-redux";

import Linking from "expo-linking";

/* Color ref */
const mint = "#2DB08C";

function MoreInfoScreen(props) {
  const [fontsLoaded] = useFonts({ Capriola_400Regular });

  /* Logout delete in  */
  function logout() {
    props.navigation.navigate("SignIn", { logout: "true" });
    // AsyncStorage.removeItem('@token')
  }

  /* Redirect to signUn */
  function signin() {
    props.navigation.navigate("SignIn");
  }

  /* Link to tipeee / aline support */
  const supportLink = () => {
    if (Platform.OS === "android") {
      // google play store doesn't allowed payment page direct link
      Linking.openURL("https://aline.app/support-app/");
    } else {
      Linking.openURL("https://fr.tipeee.com/alineconsigne/");
    }
  };
  const { token } = props;
  const lignes = token ? (
    <View>
      <TouchableOpacity onPress={() => props.navigation.navigate("Account")}>
        <ListItem
          rightIcon={<FontAwesome name="user" size={20} color={mint} />}
          titleStyle={{ color: "#033C47" }}
          title="Mon compte"
          bottomDivider
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={logout}>
        <ListItem
          rightIcon={<AntDesign name="logout" size={20} color={mint} />}
          titleStyle={{ color: "#033C47" }}
          title="Se déconnecter"
          bottomDivider
        />
      </TouchableOpacity>
    </View>
  ) : (
    <TouchableOpacity onPress={signin}>
      <ListItem
        rightIcon={<FontAwesome name="sign-in" size={20} color={mint} />}
        titleStyle={{ color: "#033C47" }}
        title="S'inscrire"
        bottomDivider
      />
    </TouchableOpacity>
  );

  return !fontsLoaded ? (
    <AppLoading />
  ) : (
    <ScrollView style={{ backgroundColor: "white" }}>
      {/* ALINE ET MOI */}
      <ListItem titleStyle={styles.h1} title="Aline et moi" bottomDivider />
      {/* mon compte || se connecter */}
      {lignes}

      {/* soutenir Aline */}
      <TouchableOpacity onPress={() => supportLink()}>
        <ListItem
          rightIcon={<FontAwesome5 name="coins" size={20} color={mint} />}
          titleStyle={{ color: "#033C47" }}
          title={
            Platform.OS === "android"
              ? "Soutenir Aline"
              : "Soutenir Aline avec tipee"
          }
          bottomDivider
        />
      </TouchableOpacity>

      {/* nourrir Aline */}
      <TouchableOpacity onPress={() => Linking.openURL("https://aline.app")}>
        <ListItem
          rightIcon={
            <MaterialCommunityIcons
              name="map-marker-plus"
              size={20}
              color={mint}
            />
          }
          titleStyle={{ color: "#033C47" }}
          title="Nourrir Aline"
          bottomDivider
        />
      </TouchableOpacity>

      {/* Nous écrire */}
      <TouchableOpacity
        onPress={() => Linking.openURL("mailto:contact@aline.app")}
      >
        <ListItem
          rightIcon={<FontAwesome5 name="envelope" size={20} color={mint} />}
          titleStyle={{ color: "#033C47" }}
          title="Nous écrire"
          bottomDivider
        />
      </TouchableOpacity>

      {/* RESTONS EN CONTACT */}
      <ListItem
        containerStyle={{ paddingTop: 30 }}
        titleStyle={styles.h1}
        title="Restons en contact"
        bottomDivider
      />

      {/* Facebook */}
      <TouchableOpacity
        onPress={() =>
          Linking.openURL("https://www.facebook.com/alineconsigne")
        }
      >
        <ListItem
          rightIcon={<FontAwesome name="facebook-f" size={20} color={mint} />}
          titleStyle={{ color: "#033C47" }}
          title="Facebook"
          bottomDivider
        />
      </TouchableOpacity>

      {/* instagram */}
      <TouchableOpacity
        onPress={() =>
          Linking.openURL("https://www.instagram.com/alineconsigne/")
        }
      >
        <ListItem
          rightIcon={<AntDesign name="instagram" size={20} color={mint} />}
          titleStyle={{ color: "#033C47" }}
          title="Instagram"
          bottomDivider
        />
      </TouchableOpacity>

      {/* twitter */}
      <TouchableOpacity
        onPress={() => Linking.openURL("https://twitter.com/aline_consigne")}
      >
        <ListItem
          rightIcon={<AntDesign name="twitter" size={20} color={mint} />}
          titleStyle={{ color: "#033C47" }}
          title="Twitter"
          bottomDivider
        />
      </TouchableOpacity>

      {/* web */}
      <TouchableOpacity onPress={() => Linking.openURL("https://aline.app")}>
        <ListItem
          rightIcon={<FontAwesome5 name="desktop" size={20} color={mint} />}
          titleStyle={{ color: "#033C47" }}
          title="Site internet"
          bottomDivider
        />
      </TouchableOpacity>

      <View
        style={{
          marginVertical: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ height: 38, width: 110, marginBottom: 20 }}
          source={require("../assets/images/logo.png")}
        />
        <Text style={{ color: "#033C47", marginBottom: 20 }}>
          Version 1.0.1
        </Text>
        <Text style={{ color: "#033C47", marginBottom: 20 }}>
          © Aline 2021 tout droits réservés
        </Text>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://aline.app/app-cgu")}
        >
          <Text
            style={{
              color: "#033C47",
              textDecorationLine: "underline",
              fontSize: 12,
            }}
          >
            Conditions générales d&apos;utilisation
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  h1: {
    fontFamily: "Capriola_400Regular",
    color: mint,
    fontSize: 18,
  },
});

function mapStateToProps(state) {
  return { token: state.token };
}

// keep this line at the end
export default connect(mapStateToProps, null)(MoreInfoScreen);
