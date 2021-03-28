import { Capriola_400Regular, useFonts } from "@expo-google-fonts/capriola";
import { useNavigation } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import { AlineButton } from "../components/aline-lib";
import FavCard from "../components/favCard";

function FavScreen(props) {
  const [status, setStatus] = useState("nofav");

  const navigation = useNavigation();
  // check display
  useEffect(() => {
    if (props.token) {
      if (props.favs.length > 0) {
        setStatus("favlist");
      } else {
        setStatus("nofav");
      }
    } else {
      setStatus("nolog");
    }
  });

  // message si pas de favoris
  const nofav = (
    <View style={{ paddingHorizontal: 40 }}>
      <Text
        style={{
          fontFamily: "Capriola_400Regular",
          fontSize: 16,
          color: blueDark,
        }}
      >
        Vous n&apos;avez pas encore de favoris
      </Text>
    </View>
  );

  // message d'option si utilisateur non logué
  const nolog = (
    <View style={{ paddingHorizontal: 40 }}>
      <Text style={{ ...styles.current16 }}>
        Vous devez être connecté pour ajouter des lieux à vos favoris
      </Text>
      <AlineButton
        title="Se connecter"
        onPress={() => navigation.navigate("SignIn")}
      />
    </View>
  );
  const { favs } = props;
  const favlist =
    favs.length > 0
      ? favs.map((fav) => {
          return (
            <TouchableOpacity
              key={fav._id}
              onPress={() => navigation.navigate("Place", { place: fav })}
            >
              <FavCard
                type={fav.type}
                name={fav.name}
                id={fav._id}
                services={fav.services}
                adress={fav.adress}
              />
            </TouchableOpacity>
          );
        })
      : {};

  const [fontsLoaded] = useFonts({ Capriola_400Regular });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const favsViewWhenLogged =
    status === "favlist" ? (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={{ ...styles.h1blueDark }}>Mes favoris</Text>
        {favlist}
      </ScrollView>
    ) : (
      nofav
    );

  return (
    <View style={{ ...styles.container }}>
      {status === "nolog" ? nolog : favsViewWhenLogged}
      <StatusBar />
    </View>
  );
}
// colors vars
const blueDark = "#033C47";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "white",
    paddingLeft: 25,
  },
  card: {
    width: "100%",
    paddingHorizontal: 25,
    paddingVertical: 10,
    margin: 0,
  },
  current16: {
    fontSize: 16,
    color: blueDark,
  },
  h1blueDark: {
    fontFamily: "Capriola_400Regular",
    fontSize: 26,
    color: blueDark,
    letterSpacing: -0.7,
    marginTop: 20,
    marginBottom: 20,
  },
});

function mapStateToProps(state) {
  return { token: state.token, favs: state.favs };
}

// keep this line at the end
export default connect(mapStateToProps, null)(FavScreen);
