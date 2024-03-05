import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Styles, { COLOR } from "../config/styles";
import * as Constants from "./helpers/Constants";
import { IC_GO_BACK } from "../assets/images";
import { normalize } from "react-native-elements";
import moment from "moment";
import { CommonStyles } from "../config/styles";

const ReportListDateItem = (props) => {
  var dbDate = new Date(props.itemDay) + 1;
  var dateSplitted = dbDate.split(" ");

  formattedDayOfWeek = () => {
    console.log(dateSplitted);
    return dateSplitted[0];
  };

  formattedDay = () => {
    return dateSplitted[2];
  };
  formattedYear = () => {
    return dateSplitted[1];
  };

  return (
    <View>
      <Text
        style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY }]}
      >
        {formattedDayOfWeek()}
      </Text>
      <Text style={[CommonStyles.text_12_bold]}>{formattedDay()}</Text>
      <Text style={[CommonStyles.text_12_bold]}>{formattedYear()}</Text>
    </View>
  );
};

export default ReportListDateItem;
