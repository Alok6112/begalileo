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
import { COLOR, CommonStyles } from "../../config/styles";
import {
  IC_ARROW_RIGHT,
  IMG_SARTHAK,
  IC_RIGHT_ENTER,
  IC_MORE_PROFILE,
  IC_MORE_SUBSCRIPTIONS,
  IC_MORE_NOTIFICATIONS,
  IC_MORE_MY_KIDS,
  IC_MORE_LIVE_CLASS_BATCH,
  IC_MORE_CARD_DETAILS,
  IC_MORE_HELP,
  IMG_SHAKSHI,
  IC_MATH_BOX,
} from "../../assets/images";
import { CustomBackButton } from "../../components";
import Icon from "react-native-vector-icons/FontAwesome";
import { normalize, Card } from "react-native-elements";

class SubscriptonMathboxDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressBack = () => {
    const { goBack } = this.props.navigation;

    goBack();
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLOR.WHITE,
        }}
      >
        <ScrollView>
          <View
            style={{
              marginStart: normalize(20),
              marginEnd: normalize(20),
              marginTop: normalize(10),
              marginBottom: normalize(20),
            }}
          >
            <CustomBackButton onPress={this.onPressBack} />
            <Text
              style={[
                CommonStyles.text_18_semi_bold,
                { color: COLOR.TEXT_COLOR_BLUE, marginTop: normalize(12) },
              ]}
            >
              Mathbox Delivery Details
            </Text>
            <View style={{ flexDirection: "row", marginTop: normalize(20) }}>
              <Image
                style={{
                  borderRadius: 100,
                  height: normalize(16),
                  width: normalize(16),
                  resizeMode: "stretch",
                  alignSelf: "center",
                }}
                source={IC_MATH_BOX}
              />
              <Text
                style={[
                  CommonStyles.text_12__semi_bold,
                  { marginStart: normalize(16) },
                ]}
              >
                3 / 12
              </Text>
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: normalize(18),
                  marginBottom: normalize(16),
                  justifyContent: "space-between",
                }}
              >
                <Text style={[CommonStyles.text_14_semi_bold]}>
                  3rd Mathbox
                </Text>
                <Text
                  style={[
                    CommonStyles.text_18_bold,
                    { color: COLOR.TEXT_COLOR_BLUE },
                  ]}
                >
                  -
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View>
                  <View
                    style={[
                      CommonStyles.round_view_9,
                      { backgroundColor: COLOR.TRACKING_BLUE },
                    ]}
                  />
                  <View
                    style={{
                      flex: 1,
                      alignSelf: "center",
                      width: normalize(2),
                      backgroundColor: COLOR.TRACKING_BLUE,
                    }}
                  />
                </View>
                <View
                  style={{
                    justifyContent: "space-between",
                    marginStart: normalize(16),
                  }}
                >
                  <View>
                    <Text style={[CommonStyles.text_12_bold]}>
                      Math Box Packed
                    </Text>
                    <Text
                      style={[
                        CommonStyles.text_9_regular,
                        {
                          color: COLOR.TEXT_ALPHA_GREY,
                          marginTop: normalize(2),
                        },
                      ]}
                    >
                      Mon, 2 Jan, 2020
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: normalize(20),
                      marginBottom: normalize(20),
                    }}
                  >
                    <Text style={[CommonStyles.text_12_Regular]}>
                      Mathbox has been picked up by courier partner
                    </Text>
                    <Text
                      style={[
                        CommonStyles.text_9_regular,
                        {
                          color: COLOR.TEXT_ALPHA_GREY,
                          marginTop: normalize(4),
                        },
                      ]}
                    >
                      Mon, 2 Jan, 2020
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <View
                    style={[
                      CommonStyles.round_view_9,
                      { backgroundColor: COLOR.TRACKING_BLUE },
                    ]}
                  />
                  <View
                    style={{
                      flex: 1,
                      alignSelf: "center",
                      width: normalize(2),
                      backgroundColor: COLOR.TRACKING_BLUE,
                    }}
                  />
                  <View
                    style={[
                      CommonStyles.round_view_9,
                      { backgroundColor: COLOR.TRACKING_BLUE },
                    ]}
                  />
                </View>
                <View
                  style={{
                    justifyContent: "space-between",
                    marginStart: normalize(16),
                  }}
                >
                  <View>
                    <Text style={[CommonStyles.text_12_bold]}>Shipped</Text>
                    <Text
                      style={[
                        CommonStyles.text_9_regular,
                        {
                          color: COLOR.TEXT_ALPHA_GREY,
                          marginTop: normalize(2),
                        },
                      ]}
                    >
                      Mon, 2 Jan, 2020
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: normalize(20),
                      marginBottom: normalize(20),
                    }}
                  >
                    <Text style={[CommonStyles.text_12_Regular]}>
                      BlueDart Logistics - BDPP0420924050
                    </Text>
                    <Text
                      style={[
                        CommonStyles.text_9_regular,
                        {
                          color: COLOR.TEXT_ALPHA_GREY,
                          marginTop: normalize(4),
                        },
                      ]}
                    >
                      Sun, 2 Jan, 2020 - 10:04 am
                    </Text>
                  </View>
                  <View
                    style={{
                      marginTop: normalize(20),
                      marginBottom: normalize(20),
                    }}
                  >
                    <Text style={[CommonStyles.text_12_Regular]}>
                      Box is out for delivery
                    </Text>
                    <Text
                      style={[
                        CommonStyles.text_9_regular,
                        {
                          color: COLOR.TEXT_ALPHA_GREY,
                          marginTop: normalize(4),
                        },
                      ]}
                    >
                      Mon, 3 Jan, 2020 - 2:15 pm
                    </Text>
                  </View>
                  <View style={{ marginTop: normalize(12) }}>
                    <Text style={[CommonStyles.text_12_bold]}>Delivered</Text>
                    <Text
                      style={[
                        CommonStyles.text_9_regular,
                        {
                          color: COLOR.TEXT_ALPHA_GREY,
                          marginTop: normalize(2),
                        },
                      ]}
                    >
                      Mon, 2 Jan, 2020
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: normalize(18),
                marginBottom: normalize(16),
                justifyContent: "space-between",
              }}
            >
              <Text style={[CommonStyles.text_14_semi_bold]}>2nd Mathbox</Text>
              <Text
                style={[
                  CommonStyles.text_18_bold,
                  { color: COLOR.TEXT_COLOR_BLUE },
                ]}
              >
                +
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: normalize(18),
                marginBottom: normalize(16),
                justifyContent: "space-between",
              }}
            >
              <Text style={[CommonStyles.text_14_semi_bold]}>1st Mathbox</Text>
              <Text
                style={[
                  CommonStyles.text_18_bold,
                  { color: COLOR.TEXT_COLOR_BLUE },
                ]}
              >
                +
              </Text>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptonMathboxDetails);
