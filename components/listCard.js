import React, { useState, useEffect } from "react";
import { Overlay } from "react-native-elements";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";

// import BASE URL
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "./environment";
import { AlineButton } from "./aline-lib";

function ListCard(props) {
  const navigation = useNavigation();

  const [liked, setLiked] = useState(false);
  const [visible, setVisible] = useState(false);
  const {
    place: { _id, placeImg, type, name, services },
    favs,
  } = props;
  // verifier si la place est dans les favoris
  useEffect(() => {
    const getLiked = async () => {
      if (favs.length === 0 || favs === undefined) {
        setLiked(false);
      } else {
        favs.forEach((fav) => {
          if (fav._id === _id) {
            setLiked(true);
          }
        });
      }
    };
    getLiked();
  }, [favs]);

  // afficher la modal
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  // TODO code duplique en partie avec favCard
  const addFav = async (id) => {
    // si token n'existe pas
    if (!props.token || props.token === "" || props.token === undefined) {
      toggleOverlay();
    } else {
      // if liked = false alors fetch pour ajouter
      const verb = liked === false ? "add-fav" : "delete-fav";
      const rawResponse = await fetch(
        `${BASE_URL}/users/mobile/${verb}?token=${props.token}&placeid=${id}`
      );
      const response = await rawResponse.json();
      if (response) {
        props.updateFavsRedux(response);
        setLiked(!liked);
      }
    }
  };

  return (
    <View
      key={_id}
      style={{
        width: "100%",
        marginHorizontal: 0,
        marginBottom: 30,
        paddingBottom: 30,
        borderBottomColor: greyLight,
        borderBottomWidth: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      <View
        style={{
          ...styles.myCard,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Image
          source={{
            uri:
              placeImg && placeImg !== "" && placeImg !== undefined
                ? placeImg
                : "https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sCmRaAAAAsP6fT1G8oAseRIIkDmygyD3TobV9wyedS-EeJ3yJmgUKMHFfVND2yoS4ZjTqyzY5pzE26bUUjhAdb5wfX6a3gsKkYO1iPJIZ1CAnPHb7ZlxsdkANpjzGIn0Chbok-4ztEhAK0TtTw-VPO8ZFbM9STOj7GhSxYOuVfcMpk73iwyJRYDtT5q31HA&3u4032&5m1&2e1&callback=none&key=AIzaSyBE9M-y5UbxB_Pbgx-ZBd-aeVnJkIOjFPE&token=4716",
          }}
          style={{ width: 90, height: 90 }}
        />
        <View style={{ ...styles.myTitle, marginLeft: 10, marginRight: 10 }}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Image
              style={{ width: 18, height: 18, marginTop: 3 }}
              source={
                type === "shop"
                  ? require("../assets/icons/boutique.png")
                  : require("../assets/icons/restaurant.png")
              }
            />
            <Text
              style={{
                ...styles.h3blue,
                fontSize: 20,
                paddingBottom: 4,
                paddingRight: 10,
                marginLeft: 8,
              }}
            >
              {name}
            </Text>
          </View>
        </View>
        <View style={{ width: 30, marginHorizontal: 5 }}>
          <TouchableOpacity onPress={() => addFav(_id)}>
            {liked ? (
              <FontAwesome name="heart" size={24} color={tomato} />
            ) : (
              <FontAwesome name="heart-o" size={24} color={grayMedium} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {services && services !== "," ? (
        <View style={{ ...styles.myCard, marginTop: 18 }}>
          <Text
            style={{ ...styles.current16, fontWeight: "bold", marginBottom: 2 }}
          >
            Service de consigne proposées:{" "}
          </Text>
          <Text style={{ ...styles.current16 }}>– {services}</Text>
          <Text style={{ ...styles.h3blue, color: mint, marginTop: 8 }}>
            Consignes proposées entre 3 et 5 €
          </Text>
        </View>
      ) : (
        <View />
      )}

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={{ width: "75%" }}>
          <Text>
            Vous devez être loggé pour ajouter des lieux à vos favoris
          </Text>
          <AlineButton
            title="Se connecter"
            onPress={() => navigation.navigate("SignIn")}
          />
        </View>
      </Overlay>
    </View>
  );
}

// colors vars
const blueDark = "#033C47";
const mint = "#2DB08C";
const grayMedium = "#879299";
const greyLight = "#d8d8d8";
const tomato = "#ec333b";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  myCard: {
    width: Dimensions.get("window").width - 40,
  },
  myTitle: {
    width: Dimensions.get("window").width - 170,
  },
  current16: {
    fontSize: 16,
    color: blueDark,
  },
  h3blue: {
    color: blueDark,
    fontFamily: "Capriola_400Regular",
    fontSize: 16,
    letterSpacing: -0.7,
  },
});

function mapStateToProps(state) {
  return { token: state.token, favs: state.favs };
}

// apdate fav to store
function mapDispatchToProps(dispatch) {
  return {
    updateFavsRedux(favs) {
      dispatch({ type: "updateFavs", favs });
    },
  };
}

// keep this line at the end
export default connect(mapStateToProps, mapDispatchToProps)(ListCard);
