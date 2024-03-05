import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Styles from "../config/styles";
import * as Constants from "./helpers/Constants";
import { normalize } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";

const CustomGradientButtonIcon = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#97DA92", "#2FB8BB"]}
        style={{ ...styles.button, ...props.style }}
      >
        <Image style={props.iconStyle} source={props.icon} />
        <Text style={{ ...styles.buttonText, ...props.textStyling }}>
          {props.children}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "darkorange",
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontSize: normalize(12),
    fontWeight: "bold",
    fontFamily: Constants.Montserrat_Bold,
  },
});
export default CustomGradientButtonIcon;
