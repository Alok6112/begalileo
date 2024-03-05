import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { COLOR, CommonStyles } from "../config/styles";
import { IC_BANNER_1 } from "../assets/images";

const NoRecordFoundComponent = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        style={CommonStyles.img_no_record}
        source={IC_BANNER_1}
        resizeMode={"contain"}
      />
      <Text
        style={[
          CommonStyles.text_12_bold,
          { marginTop: 10, marginHorizontal: 10, textAlign: "center" },
        ]}
      >
        {props.title}
      </Text>
      <Text
        style={[
          CommonStyles.text_8_regular,
          { marginTop: 5, marginHorizontal: 10 },
        ]}
      >
        {props.sub_title}
      </Text>
    </View>
  );
};

export default NoRecordFoundComponent;
