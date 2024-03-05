import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Styles, { CommonStyles } from "../config/styles";
import * as Constants from "./helpers/Constants";
import { normalize } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";

const CustomButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          alignItems: "center",
          paddingTop: normalize(15),
          paddingBottom: normalize(15),
          borderRadius: 50,
          ...props.containerStyle,
        }}
      >
        <Text style={props.textStyle}>{props.children}</Text>
      </View>
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
export default CustomButton;
