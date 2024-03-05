import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Styles, { COLOR } from "../config/styles";
import * as Constants from "./helpers/Constants";
import { IC_GO_BACK } from "../assets/images";
import { normalize } from "react-native-elements";
import { timeInHourFormat } from "./helpers/CustomUtilMethods";
import { CommonStyles } from "../config/styles";
import Icon from "react-native-vector-icons/FontAwesome";

const ComponentActivityItem = (props) => {
  return (
    <View
      style={[
        CommonStyles.shadowContainer_border_20,
        { backgroundColor: COLOR.WHITE, marginTop: normalize(8) },
      ]}
    >
      <View style={{ margin: normalize(16) }}>
        <Text style={[CommonStyles.text_14_bold]}>
          {props.conceptData.exercise_name}
        </Text>
        <Text
          style={[
            CommonStyles.text_12_Regular,
            { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) },
          ]}
        >
          {props.conceptData.sub_concept_name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: normalize(8),
            alignItems: "center",
          }}
        >
          <Icon
            style={{ marginStart: normalize(8) }}
            size={15}
            name="check"
            color={COLOR.TEXT_COLOR_GREEN}
          />
          <Text
            style={[
              CommonStyles.text_12_Regular,
              { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) },
            ]}
          >
            {props.conceptData.correct}
          </Text>
          <Icon
            style={{ marginStart: normalize(8) }}
            size={15}
            name="times"
            color={COLOR.RED}
          />

          <Text
            style={[
              CommonStyles.text_12_Regular,
              { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) },
            ]}
          >
            {props.conceptData.incorrect}
          </Text>
          <Text
            style={[
              CommonStyles.text_12_Regular,
              { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(10) },
            ]}
          >
            {timeInHourFormat(props.conceptData.time_spent)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ComponentActivityItem;
