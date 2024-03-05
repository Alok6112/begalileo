import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Styles, { COLOR } from "../config/styles";
import * as Constants from "./helpers/Constants";
import { IC_GO_BACK } from "../assets/images";
import { normalize } from "react-native-elements";

const CustomBackButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        width: normalize(20),
        height: normalize(25),
        marginTop: normalize(10),
      }}
    >
      <Image
        style={{
          height: normalize(10),
          width: normalize(15),
          resizeMode: "cover",
          alignSelf: "center",
        }}
        source={IC_GO_BACK}
      />
    </TouchableOpacity>
  );
};

export default CustomBackButton;
