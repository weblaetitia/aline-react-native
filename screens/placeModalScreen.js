// my components
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Overlay } from "react-native-elements";
import { connect } from "react-redux";
import { AlineButton, AlineH1 } from "../components/aline-lib";
// import BASE URL
import { BASE_URL } from "../components/environment";
import MiniMap from "../components/miniMap";
// fonts
// styles
import { styles } from "./styles/styles";

function PlaceModalScreen(props) {
  const {
    route: { params },
  } = props;
  const navigation = useNavigation();

  const { place } = params;
  const [networkImg, setNetworkImg] = useState("");
  const [isFav, setIsFav] = useState(false);
  const [visible, setVisible] = useState(false);

  // get image
  useEffect(() => {
    const getNetworkImg = async () => {
      const rawResponse = await fetch(
        `${BASE_URL}/search/get-network-img?network=${place.network}`
      );
      const resp = await rawResponse.json();
      setNetworkImg(resp.networkImg);
    };
    getNetworkImg();

    const getFavStatus = () => {
      if (props.favs) {
        props.favs.forEach((fav) => {
          if (place._id === fav._id) {
            setIsFav(true);
          }
        });
      }
    };
    getFavStatus();
  }, []);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const changeFavStatus = async (placeID) => {
    if (!props.token || props.token === "" || props.token === undefined) {
      toggleOverlay();
    } else {
      // delete from db
      // change redux state
      // change heart color
      const verb = isFav === false ? "add-fav" : "delete-fav";
      const rawResponse = await fetch(
        `${BASE_URL}/users/mobile/${verb}?token=${props.token}&placeid=${placeID}`
      );
      const response = await rawResponse.json();
      if (response) {
        props.storeFav(response);
        setIsFav(!isFav);
      }
    }
  };

  // Display opening hours
  let hours;
  if (typeof place.openingHours === "string") {
    hours = <Text style={styles.current}>- {place.openingHours}</Text>;
  } else {
    hours = place.openingHours.map((listItem, idx) => {
      return (
        <Text key={idx} style={styles.current}>
          - {listItem}
        </Text>
      );
    });
  }
  const { priceRange = [] } = place;
  const diplayedPrice =
    priceRange.length === 1 ? (
      <View>
        <Text style={{ ...styles.h3mint, textAlign: "center" }}>
          Consignes à partir de {priceRange[0]}&nbsp;€
        </Text>
        <View style={styles.line} />
      </View>
    ) : (
      <View>
        <Text style={{ ...styles.h3mint, textAlign: "center" }}>
          Consignes entre {priceRange[0]} et&nbsp;
          {priceRange[1]}&nbsp;€
        </Text>
        <View style={styles.line} />
      </View>
    );
  return (
    <View style={{ ...styles.container }}>
      {/* header */}
      <View style={{ ...styles.head }}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          title="Dismiss"
        >
          <Ionicons
            name="md-close"
            size={34}
            color={grayMedium}
            style={{ textAlign: "right" }}
          />
        </TouchableOpacity>
      </View>
      {/* header */}
      <ScrollView showsVerticalScrollIndicator={false}>
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
        {/* body */}
        <View style={{ width: "100%" }}>
          {/* place header */}
          <View style={{ ...styles.row, marginBottom: -30, paddingTop: 30 }}>
            <Image
              source={{
                uri:
                  place.placeImg || place.placeImg !== ""
                    ? place.placeImg
                    : "https://res.cloudinary.com/alineconsigne/image/upload/v1597671122/website/placeholder-image_eoeppy.png",
              }}
              style={{ width: 150, height: 150 }}
            />
            <Image
              resizeMode="contain"
              source={
                place.type === "shop"
                  ? require("../assets/icons/boutique.png")
                  : require("../assets/icons/restaurant.png")
              }
            />
          </View>
          <View
            style={{
              ...styles.placeheader,
              backgroundColor: place.type === "shop" ? goldLight : peachLight,
            }}
          >
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <AlineH1 text={place.name} />
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    changeFavStatus(place._id);
                    props.storeFav(params);
                  }}
                >
                  {isFav ? (
                    <FontAwesome
                      name="heart"
                      size={24}
                      style={styles.favHeart}
                    />
                  ) : (
                    <FontAwesome
                      name="heart-o"
                      size={24}
                      style={styles.unFavHeart}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* place header */}

          {/* place body */}
          <View style={{ marginHorizontal: 25, marginVertical: 30 }}>
            <Text style={styles.currentBold}>{place.adress}</Text>

            <Text style={styles.currentBold}>{place.phone}</Text>

            <View style={styles.line} />

            <Text style={styles.currentBold}>
              Service de consigne proposées
            </Text>
            {place.services ? (
              <Text style={styles.current}>- {place.services}</Text>
            ) : (
              <Text />
            )}

            {place.openingHours ? (
              <View>
                <View style={styles.line} />
                <Text style={styles.currentBold}>Horaires</Text>
                {hours}
              </View>
            ) : (
              <View />
            )}

            <View style={styles.line} />

            {!place.priceRange ? <Text /> : diplayedPrice}

            <Text style={{ ...styles.h3mint, textAlign: "center" }}>
              {place.name} fait parti du réseau&nbsp;
              {place.network}
            </Text>

            {/* image du réseau */}
            <View
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <Image
                source={{
                  uri:
                    networkImg ||
                    "https://res.cloudinary.com/alineconsigne/image/upload/v1597671122/website/placeholder-image_eoeppy.png",
                }}
                style={{
                  marginHorizontal: "auto",
                  marginBottom: 20,
                  marginTop: 20,
                  resizeMode: "contain",
                  width: 200,
                  height: 100,
                }}
              />
            </View>

            <Text
              style={{ ...styles.h3mint, textAlign: "center", marginTop: 30 }}
            >
              Retrouvez tous les lieux de colecte sur la carte de ce réseau
            </Text>
          </View>
          {/* place body */}

          {/* MINI Map send a props to Child componenet */}
          <MiniMap place={place} />
          {/* MINI Map */}
        </View>
        {/* body */}
      </ScrollView>
    </View>
  );
}

// colors vars
const grayMedium = "#879299";
const goldLight = "#faf1cb";
const peachLight = "#FED4CB";

function mapDispatchToProps(dispatch) {
  return {
    storeFav(favs) {
      dispatch({ type: "updateFavs", favs });
    },
  };
}

function mapStateToProps(state) {
  return { favs: state.favs, token: state.token };
}

// keep this line at the end
export default connect(mapStateToProps, mapDispatchToProps)(PlaceModalScreen);
