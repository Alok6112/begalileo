import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { COLOR, CommonStyles } from "../config/styles";
import { IC_NUMERO } from "../assets/images";

const SearchingRecordComponent = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        style={CommonStyles.img_no_record}
        source={IC_NUMERO}
        resizeMode={"contain"}
      />
      <Text style={[CommonStyles.text_12_bold, { marginTop: 10 }]}>
        {props.title}
      </Text>
      <Text style={[CommonStyles.text_8_regular, { marginTop: 5 }]}>
        {props.sub_title}
      </Text>
    </View>
  );
};

export default SearchingRecordComponent;
