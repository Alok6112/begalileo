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
import { CustomBackButton } from "../../components";
import { COLOR, CommonStyles } from "../../config/styles";
import {
  IC_CLAP_PLAIN,
  IC_STARS_EARN,
  IC_LIVE_CLASS_STATUS,
  IC_BADGES_EARNED_1,
  IC_BADGES_EARNED_2,
  IC_MESSAGE_BLUE,
  IC_TEACHER,
} from "../../assets/images";
import LinearGradient from "react-native-linear-gradient";
import { addToCart } from "../../actions/dashboard";
import Icon from "react-native-vector-icons/FontAwesome";
import { normalize, Card } from "react-native-elements";
class AcitivityReportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressBack = () => {
    const { goBack } = this.props.navigation;
    console.log("ON BACK PRESS");
    goBack();
  };

  onPressStarEarned = () => {
    this.props.navigation.navigate(Constants.StarBadgeReportScreen);
  };

  onPressBadgeEarned = () => {
    this.props.navigation.navigate(Constants.StarBadgeReportScreen);
  };

  render() {
    return (
      <View
        style={{
          flex: 1,

          marginStart: normalize(20),
          marginEnd: normalize(20),
        }}
      >
        <ScrollView>
          <View>
            <CustomBackButton onPress={this.onPressBack} />

            <Text
              style={[
                CommonStyles.text_18_semi_bold,
                { color: COLOR.TEXT_COLOR_BLUE, marginTop: normalize(15) },
              ]}
            >
              {" "}
              Activity Report{" "}
            </Text>
            <View style={{ marginTop: normalize(20) }}>
              <Text
                style={[
                  CommonStyles.text_8_regular,
                  { color: COLOR.TEXT_ALPHA_GREY },
                ]}
              >
                MATH CONCEPT
              </Text>
              <Text
                style={[CommonStyles.text_14_bold, { marginTop: normalize(2) }]}
              >
                Count with Counters within 10
              </Text>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) },
                ]}
              >
                From Numbers upto 10
              </Text>
            </View>

            <View style={{ flexDirection: "row", marginTop: normalize(15) }}>
              <Image
                style={{
                  height: normalize(13),
                  width: normalize(13),
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
                source={IC_LIVE_CLASS_STATUS}
              />
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  {
                    color: COLOR.TEXT_ALPHA_GREY,
                    marginStart: normalize(11),
                    alignSelf: "center",
                  },
                ]}
              >
                Live Class
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: normalize(40),
                justifyContent: "space-evenly",
              }}
            >
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={[CommonStyles.text_11_bold]}>Attended on</Text>
                <Text
                  style={[
                    CommonStyles.text_16_regular,
                    { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(4) },
                  ]}
                >
                  Mon, 12 May{"\n"}4 pm
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={[CommonStyles.text_11_bold]}>Time taken</Text>
                <Text
                  style={[
                    CommonStyles.text_16_regular,
                    { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(4) },
                  ]}
                >
                  11 mins
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={[CommonStyles.text_11_bold]}>Accuracy</Text>
                <Text
                  style={[
                    CommonStyles.text_16_regular,
                    { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(4) },
                  ]}
                >
                  85%
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: normalize(40),
                justifyContent: "space-evenly",
              }}
            >
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={[CommonStyles.text_16_bold]}>40</Text>
                <Text
                  style={[
                    CommonStyles.text_12_regular,
                    { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(4) },
                  ]}
                >
                  Problems
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={[CommonStyles.text_16_bold]}>17</Text>
                <Text
                  style={[
                    CommonStyles.text_12_regular,
                    { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(4) },
                  ]}
                >
                  Corrects
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={[CommonStyles.text_16_bold]}>3</Text>
                <Text
                  style={[
                    CommonStyles.text_12_regular,
                    { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(4) },
                  ]}
                >
                  Incorrect
                </Text>
              </View>
            </View>

            <View style={{ marginTop: normalize(40) }}>
              <View style={[CommonStyles.greyLineSeprator]} />
              <View
                style={{
                  flexDirection: "row",
                  marginTop: normalize(11),
                  marginBottom: normalize(11),
                  justifyContent: "space-evenly",
                }}
              >
                <TouchableOpacity
                  onPress={this.onPressStarEarned}
                  style={{ flexDirection: "row" }}
                >
                  <Image
                    style={{
                      height: normalize(20),
                      width: normalize(20),
                      resizeMode: "contain",
                      alignSelf: "center",
                    }}
                    source={IC_STARS_EARN}
                  />
                  <Text
                    style={[
                      CommonStyles.text_12_Regular,
                      {
                        color: COLOR.TEXT_ALPHA_GREY,
                        marginStart: normalize(8),
                        alignSelf: "center",
                      },
                    ]}
                  >
                    21 Stars
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.onPressBadgeEarned}
                  style={{ flexDirection: "row" }}
                >
                  <View
                    style={{
                      marginTop: normalize(12),
                      marginBottom: normalize(12),
                    }}
                  >
                    <Image
                      style={{
                        height: normalize(32),
                        width: normalize(32),
                        resizeMode: "contain",
                        position: "absolute",
                      }}
                      source={IC_BADGES_EARNED_1}
                    />
                    <Image
                      style={{
                        height: normalize(32),
                        width: normalize(32),
                        resizeMode: "contain",
                        marginStart: normalize(20),
                      }}
                      source={IC_BADGES_EARNED_2}
                    />
                  </View>
                  <Text
                    style={[
                      CommonStyles.text_12_Regular,
                      {
                        color: COLOR.TEXT_ALPHA_GREY,
                        marginStart: normalize(8),
                        alignSelf: "center",
                      },
                    ]}
                  >
                    4 Badges
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[CommonStyles.greyLineSeprator]} />
            </View>

            <View style={{ marginTop: normalize(40) }}>
              <Text style={[CommonStyles.text_12_bold]}>Feedback</Text>
              <Text
                style={[
                  CommonStyles.text_16_regular,
                  { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(4) },
                ]}
              >
                Students identified the correct choice, displaying an
                understanding of the properties of triangles.
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: normalize(20),
                borderRadius: normalize(50),
                backgroundColor: COLOR.BG_ALPHA_BLUE,
                alignSelf: "center",
                paddingStart: normalize(12),
                paddingEnd: normalize(12),
                paddingTop: normalize(9),
                paddingBottom: normalize(9),
              }}
            >
              <Image
                style={{
                  height: normalize(20),
                  width: normalize(23),
                  resizeMode: "contain",
                }}
                source={IC_CLAP_PLAIN}
              />
              <Text
                style={[
                  CommonStyles.text_12_bold,
                  {
                    color: COLOR.TAB_BOTTOM_BLUE,
                    marginStart: normalize(4),
                    alignSelf: "center",
                  },
                ]}
              >
                Clap
              </Text>
            </View>

            <View
              style={[
                CommonStyles.shadowContainer_border_20,
                {
                  flexDirection: "row",
                  marginTop: normalize(40),
                  padding: normalize(12),
                },
              ]}
            >
              <Image
                style={{
                  height: normalize(40),
                  width: normalize(40),
                  resizeMode: "contain",
                }}
                source={IC_TEACHER}
              />
              <View style={{ marginStart: normalize(16) }}>
                <Text
                  style={[
                    CommonStyles.text_8_regular,
                    {
                      color: COLOR.TEXT_ALPHA_GREY,
                      marginBottom: normalize(8),
                    },
                  ]}
                >
                  TUTOR
                </Text>
                <Text style={[CommonStyles.text_12_bold]}>Ananya Joshi</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{
                    height: normalize(13),
                    width: normalize(16),
                    resizeMode: "contain",
                  }}
                  source={IC_MESSAGE_BLUE}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.authenticate,
  };
};
const mapDispatchToProps = {};

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 15,
    textAlign: "left",
    color: COLOR.TEXT_COLOR_BLUE,
    marginTop: 10,
    marginBottom: 5,
    fontFamily: "Montserrat-SemiBold",
  },
  textLighter: {
    fontSize: 13,
    textAlign: "left",
    marginTop: 10,
    marginBottom: 5,
    color: COLOR.TEXT_COLOR_BLUE,
    fontFamily: "Montserrat-Regular",
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AcitivityReportScreen);
