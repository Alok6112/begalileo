import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Styles, { COLOR } from "../config/styles";
import * as Constants from "./helpers/Constants";
import { IC_GO_BACK } from "../assets/images";
import { normalize } from "react-native-elements";
import { timeInHourFormat } from "./helpers/CustomUtilMethods";
import { CommonStyles } from "../config/styles";
import { IMG_SARTHAK, IMG_SHAKSHI, ICON_CLOCK } from "../assets/images";
import Icon from "react-native-vector-icons/FontAwesome";

const ComponentSpeedMathListItem = (props) => {
  return (
    <View style={{ marginTop: normalize(5) }}>
      <View
        style={[
          CommonStyles.boxShadow,
          {
            flexDirection: "row",
            justifyContent: "space-evenly",
            backgroundColor: COLOR.LIGHT_BLUE,
            marginTop: normalize(8),
            marginHorizontal: 20,
            borderRadius: 20,
          },
        ]}
      >
        <View style={{ marginTop: normalize(12), marginBottom: normalize(12) }}>
          <Image
            style={{
              height: normalize(32),
              width: normalize(32),
              resizeMode: "contain",
              position: "absolute",
            }}
            source={IMG_SHAKSHI}
          />
          <Image
            style={{
              height: normalize(32),
              width: normalize(32),
              resizeMode: "contain",
              marginStart: normalize(20),
            }}
            source={IMG_SARTHAK}
          />
        </View>
        <View style={{ alignSelf: "center", alignItems: "center" }}>
          {/* <Text style={[CommonStyles.text_9_regular, { color: COLOR.TEXT_ALPHA_GREY }]}>{props.conceptData.status}</Text> */}
          <Text style={[CommonStyles.text_14_bold]}>
            {props.conceptData.status}
          </Text>
        </View>
        {/* <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <Image style={{ height: normalize(13), width: normalize(13), resizeMode: 'contain' }} source={ICON_CLOCK} />
                <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(8) }]}>00:21 hrs</Text>
            </View> */}
        <View
          style={{
            flexDirection: "row",
            marginTop: normalize(10),
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
          {/* <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(10) }]}>{timeInHourFormat(props.conceptData.time_spent)}</Text> */}
        </View>
      </View>
    </View>

    // <View style={[CommonStyles.shadowContainer_border_20, { backgroundColor: COLOR.LIGHT_BLUE, marginTop: normalize(8) }]}>
    //     <View style={{ margin: normalize(16) }}>
    //         <Text style={[CommonStyles.text_14_bold]}>{props.conceptData.status}</Text>
    //         {/* <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>{props.conceptData.status}</Text> */}
    //         <View style={{ flexDirection: 'row', marginTop: normalize(10), alignItems: 'center' }}>
    //             <Icon
    //                 style={{ marginStart: normalize(8) }}
    //                 size={15}
    //                 name='check'
    //                 color={COLOR.TEXT_COLOR_GREEN} />
    //             <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>{props.conceptData.correct}</Text>
    //             <Icon
    //                 style={{ marginStart: normalize(8) }}
    //                 size={15}
    //                 name='times'
    //                 color={COLOR.RED} />

    //             <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>{props.conceptData.incorrect}</Text>
    //             {/* <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(10) }]}>{timeInHourFormat(props.conceptData.time_spent)}</Text> */}
    //         </View>
    //     </View>
    // </View>
  );
};

export default ComponentSpeedMathListItem;
