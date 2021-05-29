// custom fonts
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// colors vars
const blueDark = "#033C47";
const mint = "#2DB08C";
const grayMedium = "#879299";
const graySuperLight = "#f4f4f4";
const greyLight = "#d8d8d8";

const AlineButton = ({ onPress, title, backgroundColor, disabled = false }) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
    style={[
      styles.alineButtonContainer,
      backgroundColor && { backgroundColor },
    ]}
    activeOpacity={0.8}
  >
    <Text style={styles.alineButtonText}>{title}</Text>
  </TouchableOpacity>
);
const AlineButtonOutline = ({ onPress, title, borderColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.alineButtonContainerOutline, borderColor && { borderColor }]}
    activeOpacity={0.8}
  >
    <Text style={styles.alineButtonTextMint}>{title}</Text>
  </TouchableOpacity>
);

const BaseInputCenter = ({ children, label }) => (
  <View style={{}}>
    {/* LABEL */}
    <Text style={styles.alineInputLabel}>{label}</Text>
    {/* input */}
    {children}
  </View>
);

const AlineInputCenter = ({
  children,
  value,
  onChange,
  placeholder,
  ...props
}) => (
  <BaseInputCenter style={{ alignItems: "center" }} {...props}>
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      style={{
        ...styles.alineInput,
        width: Dimensions.get("window").width - 160,
      }}
    />
  </BaseInputCenter>
);

const AlineInputEmail = ({
  children,
  value,
  onChange,
  placeholder,
  ...props
}) => (
  <BaseInputCenter style={{ alignItems: "center" }} {...props}>
    <TextInput
      keyboardType="email-address"
      autoCapitalize="none"
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      style={{
        ...styles.alineInput,
        width: Dimensions.get("window").width - 160,
      }}
    />
  </BaseInputCenter>
);

const AlineInputPassword = ({
  children,
  value,
  onChange,
  placeholder,
  ...props
}) => (
  <BaseInputCenter style={{ alignItems: "center" }} {...props}>
    <TextInput
      secureTextEntry
      autoCapitalize="none"
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      style={{
        ...styles.alineInput,
        width: Dimensions.get("window").width - 160,
      }}
    />
  </BaseInputCenter>
);

const AlineInputCenterArrow = ({
  children,
  value,
  onChange,
  placeholder,
  ...props
}) => (
  <BaseInputCenter {...props}>
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        style={styles.alineInputArrow}
      />

      <FontAwesome name="filter" size={28} color={mint} />
    </View>
  </BaseInputCenter>
);

const AlineSeparator = ({ text }) => (
  <View
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "90%",
      marginHorizontal: 0,
      paddingHorizontal: 0,
      paddingVertical: 20,
    }}
  >
    <View style={styles.line} />
    <Text style={styles.alineInputLabel}>{text}</Text>
    <View style={styles.line} />
  </View>
);

/* ^^^^^^^^^^^^^^^^^^^ TITLES & P ^^^^^^^^^^^^^^^^^^^^^^ */

const AlineH1 = ({ text }) => (
  <Text
    style={{
      fontFamily: "Capriola_400Regular",
      fontSize: 30,
      color: blueDark,
      textAlign: "left",
      letterSpacing: -0.7,
    }}
  >
    {text}
  </Text>
);

/* ^^^^^^^^^^^^^^^^^^^ DIVIDER ^^^^^^^^^^^^^^^^^^^^^^^^^ */
const Divider = () => <View style={styles.line} />;

/* ^^^^^^^^^^^^^^^^^^^ POPIN ^^^^^^^^^^^^^^^^^^^^^^^^^ */
const AlinePopin = ({ text }) => (
  <View
    style={{
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 30,
    }}
  >
    <Text>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  alineButtonContainer: {
    // elevation: 8,
    backgroundColor: mint,
    borderRadius: 32,
    paddingVertical: 8,
    paddingHorizontal: 28,
    marginVertical: 14,
  },
  alineButtonContainerOutline: {
    // elevation: 8,
    borderWidth: 1,
    borderColor: mint,
    backgroundColor: "#fff",
    borderRadius: 32,
    paddingVertical: 8,
    paddingHorizontal: 28,
    marginVertical: 14,
  },
  alineButtonText: {
    fontFamily: "Capriola_400Regular",
    fontSize: 16,
    color: "#fff",
    alignSelf: "center",
    letterSpacing: -0.7,
  },
  alineButtonTextMint: {
    fontFamily: "Capriola_400Regular",
    fontSize: 16,
    color: mint,
    alignSelf: "center",
    letterSpacing: -0.7,
  },
  alineInput: {
    backgroundColor: graySuperLight,
    borderRadius: 32,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginVertical: 14,
    marginHorizontal: 36,
  },
  alineInputArrow: {
    backgroundColor: graySuperLight,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: grayMedium,
    borderLeftColor: grayMedium,
    borderRightColor: grayMedium,
    borderBottomColor: grayMedium,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
    borderBottomLeftRadius: 32,
    paddingVertical: 5,
    paddingHorizontal: 14,
    marginHorizontal: 5,
    width: "80%",
  },
  alineInputText: {
    fontSize: 28,
    color: grayMedium,
    textAlign: "left",
  },
  alineInputLabel: {
    fontSize: 16,
    color: blueDark,
    textAlign: "center",
  },
  line: {
    flex: 0.5,
    borderWidth: 1,
    borderColor: greyLight,
    marginHorizontal: 10,
  },
});

export {
  AlineButton,
  AlineInputCenter,
  AlineInputCenterArrow,
  AlineSeparator,
  AlineButtonOutline,
  AlinePopin,
  AlineH1,
  Divider,
  AlineInputEmail,
  AlineInputPassword,
};
