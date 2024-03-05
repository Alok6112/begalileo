import React, { Component } from "react";
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
import { connect } from "react-redux";
import * as Constants from "../../components/helpers/Constants";
import {
  COLOR,
  CommonStyles,
  SCREEN_HEIGTH,
  SCREEN_WIDTH,
} from "../../config/styles";
import {
  IC_BOOK_DEMO_BG,
  ICON_CLOCK,
  CARD_BTN_ARROW,
  LIVE_CLASS_CARD_THUMB,
  IC_PARENT_MOM,
  IC_ALEXA_BOX,
  IC_MATH_BOXES,
  IC_MOBILE_HAND,
  MATH_CODING_CURRICULAM,
  ALEXA_DEVICES,
} from "../../assets/images";
import { normalize } from "react-native-elements";
import { getLocalData } from "../../components/helpers/AsyncMethods";

class MathBoxTabs extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  renderWhatWillYouGet = () => {
    return (
      <View
        style={{
          backgroundColor: COLOR.WHITE,
          width: "100%",
          borderRadius: normalize(15),
        }}
      >
        <View
          style={{
            backgroundColor: COLOR.BG_FAQ_GRERY,
            margin: normalize(8),
            justifyContent: "space-evenly",
            borderRadius: normalize(12),
            flexDirection: "row",
          }}
        >
          <Text
            style={[
              CommonStyles.text_12__semi_bold,
              { flex: 1, marginStart: normalize(12), marginTop: normalize(12) },
            ]}
          >
            Twice a week online classroom session with expert teachers
          </Text>

          <Image
            style={{
              flex: 1,
              height: normalize(100),
              marginTop: normalize(35),
              width: normalize(50),
              resizeMode: "stretch",
              borderBottomRightRadius: normalize(12),
            }}
            source={LIVE_CLASS_CARD_THUMB}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#BEE2F0",
              borderRadius: normalize(12),
              marginStart: normalize(8),
              marginEnd: normalize(4),
            }}
          >
            <Text
              style={[
                CommonStyles.text_12__semi_bold,
                {
                  flex: 1,
                  marginStart: normalize(12),
                  marginTop: normalize(12),
                },
              ]}
            >
              500+ Math Concepts with Vidoes and Brain Development Activities
            </Text>

            <Image
              style={{
                height: normalize(80),
                width: normalize(130),
                flexDirection: "row",
                flexWrap: "wrap",
                resizeMode: "contain",
                borderRadius: normalize(12),
              }}
              source={IC_PARENT_MOM}
            />
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "#C1D0F4",
              borderRadius: normalize(12),
              marginStart: normalize(4),
              marginEnd: normalize(8),
            }}
          >
            <Image
              style={{
                height: normalize(100),
                width: normalize(100),
                resizeMode: "contain",
                borderRadius: normalize(12),
                position: "absolute",
                bottom: 0,
                left: 0,
              }}
              source={IC_MOBILE_HAND}
            />
            <Text
              style={[
                CommonStyles.text_12__semi_bold,
                { marginStart: normalize(12), marginTop: normalize(12) },
              ]}
            >
              Track daily progress of your kid
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            height: 200,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#FCDCDC",
              borderRadius: normalize(12),
              marginStart: normalize(8),
              marginEnd: normalize(4),
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={[
                CommonStyles.text_12__semi_bold,
                {
                  flex: 1,
                  marginStart: normalize(12),
                  marginTop: normalize(12),
                  textAlign: "center",
                },
              ]}
            >
              Alexa enabled learning
            </Text>

            <Image
              style={{
                height: normalize(100),
                width: normalize(100),
                resizeMode: "contain",
                borderRadius: normalize(12),
                justifyContent: "center",
                alignSelf: "center",
              }}
              source={ALEXA_DEVICES}
            />
          </View>
          {this.props.country == Constants.INDIA && (
            <View
              style={{
                flex: 1,
                backgroundColor: "#C2F5EC",
                borderRadius: normalize(12),
                marginStart: normalize(4),
                marginEnd: normalize(8),
              }}
            >
              <Image
                style={{
                  height: normalize(80),
                  width: normalize(100),
                  resizeMode: "contain",
                  borderRadius: normalize(12),
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                }}
                source={MATH_CODING_CURRICULAM}
              />
              <Text
                style={[
                  CommonStyles.text_11_semi_bold,
                  { marginStart: normalize(12), marginTop: normalize(12) },
                ]}
              >
                Math and coding integrated curriculum
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  renderWhatsInsideMathBox = () => {
    return (
      <View
        style={{
          backgroundColor: COLOR.BLUE_LINk,
          marginStart: 10,
          width: "90%",
        }}
      >
        <Text>Whats {SCREEN_HEIGTH}</Text>
      </View>
    );
  };

  render() {
    return (
      <View>
        <Text
          style={[
            CommonStyles.text_12__semi_bold,
            {
              color: COLOR.TEXT_COLOR_BLACK,
              marginStart: normalize(25),
              marginTop: normalize(20),
            },
          ]}
        >
          What will you get
        </Text>
        <View style={{ margin: normalize(20), flexDirection: "row" }}>
          {this.renderWhatWillYouGet()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabItemSelected: {
    paddingBottom: normalize(8),
    borderBottomColor: COLOR.TAB_BOTTOM_BLUE,
    borderBottomWidth: 2,
  },
});

export default MathBoxTabs;
