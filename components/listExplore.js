import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

// my Components
import ListCard from "./listCard";

function ListScreen(props) {
  const navigation = useNavigation();
  const { filteredPlaces } = props;

  const group = filteredPlaces.map((placeItem) => {
    return (
      <TouchableOpacity
        key={placeItem._id}
        onPress={() => navigation.navigate("Place", { place: placeItem })}
      >
        <ListCard place={placeItem} />
      </TouchableOpacity>
    );
  });

  return <ScrollView style={{ marginTop: 120 }}>{group}</ScrollView>;
}

function mapStateToProps(state) {
  return { favs: state.favs };
}

// keep this line at the end
export default connect(mapStateToProps, null)(ListScreen);
