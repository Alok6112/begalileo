import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { COLOR, CommonStyles } from "../config/styles";
import { IC_BANNER_1 } from "../assets/images";
import CustomGradientButton from "./CustomGradientButton";

const NoRecordDemoComponent = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        style={CommonStyles.img_no_record}
        source={IC_BANNER_1}
        resizeMode={"contain"}
      />
      <Text style={[CommonStyles.text_12_bold, { marginTop: 10 }]}>
        {props.title}
      </Text>
      <Text style={[CommonStyles.text_8_regular, { marginTop: 5 }]}>
        {props.sub_title}
      </Text>
      <CustomGradientButton
        myRef={(input) => {
          this.buySubscriptionButton = input;
        }}
        style={styles.buySubscriptionButton}
        children="Buy subscription"
        onPress={props.onBuySubscription}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buySubscriptionButton: {
    alignItems: "center",
    marginStart: 20,
    marginEnd: 20,
    marginTop: 20,
    paddingTop: 15,
    paddingStart: 20,
    paddingEnd: 20,
    paddingBottom: 15,
  },
});

export default NoRecordDemoComponent;
