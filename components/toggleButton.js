import React from "react";
import { TouchableOpacity, Text } from "react-native";

// custom fonts

import { FontAwesome } from "@expo/vector-icons";

// colors vars
const mint = "#2DB08C";
const grayMedium = "#879299";

const ToggleButton = ({ onPress, title, checkedStatus }) => (
  <TouchableOpacity
    onPress={onPress}
    style={checkedStatus ? toggleBtnSelected : toggleBtn}
    activeOpacity={0.8}
  >
    <Text style={checkedStatus ? buttonTextSelected : buttonText}>
      {title}
      {checkedStatus ? (
        <Text>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <FontAwesome name="check" size={16} color="white" />
        </Text>
      ) : (
        <Text />
      )}
    </Text>
  </TouchableOpacity>
);

const toggleBtn = {
  backgroundColor: "white",
  borderRadius: 32,
  paddingVertical: 8,
  paddingHorizontal: 28,
  marginVertical: 14,
  borderWidth: 1,
  borderColor: grayMedium,
};
const toggleBtnSelected = {
  ...toggleBtn,
  backgroundColor: mint,
  borderColor: mint,
};
const buttonText = {
  fontSize: 16,
  color: grayMedium,
  alignSelf: "center",
  letterSpacing: -0.7,
};
const buttonTextSelected = {
  ...buttonText,
  color: "white",
};

// TODO refactorer les references
export { ToggleButton };
export default ToggleButton;
