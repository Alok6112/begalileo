import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { CheckBox } from "react-native-elements";
import * as Constants from "../components/helpers/Constants";
import { COLOR, CommonStyles } from "../config/styles";
import { IC_BUY_NOW, IC_ADD_TO_CART_WHITE } from "../assets/images";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { normalize, Card } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";

import CustomGradientButtonIcon from "../components/CustomGradientButtonIcon";

onClickCart = (props) => {
  console.log("On cart CLick addtoCard", props);


   
  props.onCartClick();
};

const AddCartFloatingButton = (props) => (
  <View style={styles.container}>
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={["#97DA92", "#2FB8BB"]}
      style={styles.floatingActionStyle}
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          this.onClickCart(props);
        }}
      >
        <Icon
          style={styles.FloatingButtonStyle}
          size={30}
          name="shopping-cart"
          color={COLOR.WHITE}
        />
        {/* <Image
                    source={IC_ADD_TO_CART_WHITE}
                    style={styles.FloatingButtonStyle}
                /> */}
      </TouchableOpacity>
    </LinearGradient>
    {props.cartItems && props.cartItems.length > 0 ? (
      <View style={styles.notificationStyle}>
        <Text
          style={{
            fontSize: normalize(8),
            alignSelf: "center",
            fontWeight: "600",
          }}
        >
          {props.cartItems.length}
        </Text>
      </View>
    ) : (
      <View />
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: normalize(50),
    width: normalize(50),
    right: normalize(15),
    bottom: normalize(10),
  },
  floatingActionStyle: {
    //Here is the trick

    width: normalize(44),
    height: normalize(44),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: normalize(100),
  },
  FloatingButtonStyle: {
    resizeMode: "contain",

    borderRadius: normalize(100),
    //backgroundColor:'black'
  },
  notificationStyle: {
    flex: 1,
    height: normalize(16),
    width: normalize(16),
    position: "absolute",
    backgroundColor: COLOR.WHITE,
    borderRadius: normalize(100),
    justifyContent: "center",
    alignSelf: "flex-end",
    bottom: normalize(35),
  },
});

const mapStateToProps = (state) => {
  return {
    cartItems: state.dashboard.cartItems,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCartFloatingButton);
