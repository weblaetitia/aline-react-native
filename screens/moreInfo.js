import { Capriola_400Regular, useFonts } from "@expo-google-fonts/capriola";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import * as Linking from "expo-linking";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";

/* Color ref */
const mint = "#2DB08C";

function MoreInfoScreen(props) {
  const [fontsLoaded] = useFonts({ Capriola_400Regular });
  const { token } = props;

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
  const handleFacebookLink = () => {};
  const lignes = token ? (
    <View>
      <TouchableOpacity onPress={() => props.navigation.navigate("Account")}>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={{ color: "#033C47" }}>
              <FontAwesome name="user" size={20} color={mint} />
              Mon compte
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>

      <TouchableOpacity onPress={logout}>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={{ color: "#033C47" }}>
              <AntDesign name="logout" size={20} color={mint} />
              Se déconnecter
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
    </View>
  ) : (
    <TouchableOpacity onPress={signin}>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={{ color: "#033C47" }}>
            <FontAwesome name="sign-in" size={20} color={mint} />
            S'inscrire
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  );

  return !fontsLoaded ? (
    <AppLoading />
  ) : (
    <ScrollView style={{ backgroundColor: "white" }}>
      {/* ALINE ET MOI */}
      <ListItem bottomDivider style={{ paddingTop: 30 }}>
        <ListItem.Content>
          <ListItem.Title style={styles.h1}>Aline et moi</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      {/* mon compte || se connecter */}
      {lignes}
      {token && (
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Account")}
          >
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title style={{ color: "#033C47" }}>
                  <FontAwesome name="user" size={20} color={mint} />
                  Mon compte
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>

          <TouchableOpacity onPress={logout}>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title style={{ color: "#033C47" }}>
                  <AntDesign name="logout" size={20} color={mint} />
                  Se déconnecter
                </ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
        </View>
      )}
      {!token && (
        <TouchableOpacity onPress={signin}>
          <ListItem bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={{ color: "#033C47" }}>
                <FontAwesome name="sign-in" size={20} color={mint} />
                S'inscrire
              </ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </TouchableOpacity>
      )}

      {/* soutenir Aline */}
      <TouchableOpacity onPress={() => supportLink()}>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={{ color: "#033C47" }}>
              <FontAwesome5 name="coins" size={20} color={mint} />
              {Platform.OS === "android"
                ? "Soutenir Aline"
                : "Soutenir Aline avec tipee"}
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>

      {/* nourrir Aline */}
      <TouchableOpacity onPress={() => Linking.openURL("https://aline.app")}>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={{ color: "#033C47" }}>
              <MaterialCommunityIcons
                name="map-marker-plus"
                size={20}
                color={mint}
              />
              Nourrir Aline
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>

      {/* Nous écrire */}
      <TouchableOpacity
        onPress={() => Linking.openURL("mailto:contact@aline.app")}
      >
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={{ color: "#033C47" }}>
              <FontAwesome5 name="envelope" size={20} color={mint} />
              Nous écrire
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>

      {/* RESTONS EN CONTACT */}
      <ListItem bottomDivider style={{ paddingTop: 30 }}>
        <ListItem.Content>
          <ListItem.Title style={styles.h1}>Restons en contact</ListItem.Title>
        </ListItem.Content>
      </ListItem>

      {/* Facebook */}
      <TouchableOpacity
        onPress={() =>
          Linking.openURL("https://www.facebook.com/alineconsigne")
        }
      >
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={{ color: "#033C47" }}>
              <FontAwesome name="facebook-f" size={20} color={mint} />
              Facebook
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>

      {/* instagram */}
      <TouchableOpacity
        onPress={() =>
          Linking.openURL("https://www.instagram.com/alineconsigne/")
        }
      >
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={{ color: "#033C47" }}>
              <AntDesign name="instagram" size={20} color={mint} />
              Instagram
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>

      {/* twitter */}
      <TouchableOpacity
        onPress={() => Linking.openURL("https://twitter.com/aline_consigne")}
      >
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={{ color: "#033C47" }}>
              <AntDesign name="twitter" size={20} color={mint} />
              Twitter
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>

      {/* web */}
      <TouchableOpacity onPress={() => Linking.openURL("https://aline.app")}>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title style={{ color: "#033C47" }}>
              <FontAwesome5 name="desktop" size={20} color={mint} />
              Site internet
            </ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
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
