import React, { Component, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { COLOR, CommonStyles } from "../config/styles";
import CustomGradientButton from "./CustomGradientButton";
import { normalize } from "react-native-elements";
import { IC_CLOSE_BLUE } from "../assets/images";
import {
  getMaxDateFromToday,
  getValueDayOfTheWeek,
  getValueOfMonth,
} from "./helpers";

const ChooseGridDateComponent = ({
  onDOBDatePicked,
  closeDatePicker,
  currentIndex,
}) => {
  const [dateList, setDateList] = useState([]);
  const [selectedDay, setSelectedDay] = useState(currentIndex);
  const [selectedDate, setSelectedDate] = useState(new Date());

  onDaySelected = (index, current) => {
    console.log(index);
    setSelectedDay(index);
    onDOBDatePicked(current, index);
  };

  renderDateGrid = () => {
    return [...Array(7)].map((element, index) => {
      let currentDate = getMaxDateFromToday(index);
      let day = getValueDayOfTheWeek(currentDate.getDay());
      let month = getValueOfMonth(currentDate.getMonth());
      let datevalue = currentDate.getDate() + " " + month.substring(0, 3);
      return (
        <TouchableOpacity onPress={() => onDaySelected(index, currentDate)}>
          <View
            style={
              selectedDay == index
                ? styles.buttonSelected
                : styles.buttonBordered
            }
          >
            <Text
              style={[
                CommonStyles.text_14_bold,
                selectedDay == index
                  ? styles.selectedTitle
                  : styles.unSelectedTitle,
              ]}
            >
              {day.substring(0, 3)}
            </Text>
            <Text
              style={[
                CommonStyles.text_14_semi_bold,
                selectedDay == index
                  ? styles.selectedSubTitle
                  : styles.unSelectedSubTitle,
              ]}
            >
              {datevalue}
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLOR.TEXT_ALPHA_GREY }}>
      <View style={{ flex: 0.5 }}></View>
      <View
        style={{
          flex: 0.5,
          backgroundColor: COLOR.WHITE,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            backgroundColor: COLOR.WHITE,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={[
                CommonStyles.text_14_semi_bold,
                {
                  alignSelf: "center",
                  marginStart: normalize(16),
                  marginTop: 20,
                },
              ]}
            >
              Select day
            </Text>
            <TouchableOpacity
              style={{ marginStart: 20, marginTop: 20, marginEnd: 20 }}
              onPress={closeDatePicker}
            >
              <Image
                source={IC_CLOSE_BLUE}
                style={{
                  height: 32,
                  width: 32,
                  padding: 20,
                  resizeMode: "cover",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: "center" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              alignContent: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {renderDateGrid()}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonBordered: {
    width: normalize(100),
    height: normalize(66),
    justifyContent: "center",
    padding: 3,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1.5,
    marginTop: 20,
    borderColor: COLOR.BORDER_COLOR_GREY,
    backgroundColor: COLOR.WHITE,
  },
  buttonSelected: {
    width: normalize(100),
    height: normalize(66),
    justifyContent: "center",
    padding: 3,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1.5,
    marginTop: 20,
    borderColor: COLOR.BORDER_COLOR_GREY,
    backgroundColor: COLOR.BLUE_LINk,
  },
  selectedTitle: {
    color: COLOR.WHITE,
  },
  unSelectedTitle: {
    color: COLOR.TEXT_BODY_COLOR,
  },
  selectedSubTitle: {
    color: COLOR.WHITE,
  },
  unSelectedSubTitle: {
    color: COLOR.TEXT_COLOR_GREY,
  },
});
export default ChooseGridDateComponent;
