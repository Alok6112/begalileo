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
  IC_ADD_TO_CART_BLUE,
  IMG_SARTHAK,
  IC_RIGHT_ENTER,
  IC_MORE_PROFILE,
  IC_MORE_SUBSCRIPTIONS,
  IC_MORE_NOTIFICATIONS,
  IC_MORE_MY_KIDS,
  IC_MORE_LIVE_CLASS_BATCH,
  IC_MORE_CARD_DETAILS,
  IC_MORE_HELP,
  IC_RENEW,
  IC_MATH_BOX,
} from "../../assets/images";
import { CustomBackButton } from "../../components";
import Icon from "react-native-vector-icons/FontAwesome";
import { normalize, Card } from "react-native-elements";

class SubscriptonDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressBack = () => {
    const { goBack } = this.props.navigation;

    goBack();
  };

  onPressMathBoxDetails = () => {
    this.props.navigation.navigate(Constants.SubscriptonMathboxDetails);
  };

  onPressOrderDetails = () => {
    this.props.navigation.navigate(Constants.SubscriptonOrderDetails);
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
              *** Subscription
            </Text>
            <View style={{ flexDirection: "row", marginTop: normalize(8) }}>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  { color: COLOR.TEXT_ALPHA_GREY },
                ]}
              >
                Group Class
              </Text>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  {
                    marginStart: normalize(8),
                    marginEnd: normalize(8),
                    color: COLOR.TEXT_ALPHA_GREY,
                  },
                ]}
              >
                |
              </Text>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  { color: COLOR.TEXT_ALPHA_GREY },
                ]}
              >
                Kindergarden
              </Text>
            </View>

            <Text
              style={[
                CommonStyles.text_12_regular,
                { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(12) },
              ]}
            >
              Order ID - ODI123456564233
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: normalize(12),
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={[CommonStyles.text_18_semi_bold]}>12 Months</Text>
                <Text
                  style={[
                    CommonStyles.text_12_Regular,
                    { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(8) },
                  ]}
                >
                  With 12 Math boxes for 12 months
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text style={[CommonStyles.text_18_semi_bold]}>Rs. 29,988</Text>
                <Text
                  style={[
                    CommonStyles.text_12_Regular,
                    { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(8) },
                  ]}
                >
                  Rs. 2499 /month
                </Text>
              </View>
            </View>
            <View
              style={[
                CommonStyles.greyLineSeprator,
                { marginTop: normalize(20) },
              ]}
            />

            <TouchableOpacity
              onPress={this.onPressMathBoxDetails}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: normalize(18),
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={{
                    borderRadius: 100,
                    height: normalize(16),
                    width: normalize(16),
                    resizeMode: "stretch",
                  }}
                  source={IC_MATH_BOX}
                />
                <Text
                  style={[
                    CommonStyles.text_12__semi_bold,
                    { marginStart: normalize(12) },
                  ]}
                >
                  Mathbox Delivery Details
                </Text>
              </View>
              <Image
                style={{
                  borderRadius: 100,
                  height: normalize(8),
                  width: normalize(4),
                  resizeMode: "stretch",
                  alignSelf: "center",
                }}
                source={IC_RIGHT_ENTER}
              />
            </TouchableOpacity>

            <View style={[CommonStyles.greyLineSeprator, { marginTop: 18 }]} />

            <View style={{ marginTop: normalize(20) }}>
              <Text style={[CommonStyles.text_12_bold]}>Subscribed On</Text>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) },
                ]}
              >
                12 May, 2020
              </Text>
            </View>

            <View style={{ marginTop: 20 }}>
              <Text style={[CommonStyles.text_12_bold]}>Renews On</Text>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) },
                ]}
              >
                12 May, 2020
              </Text>
            </View>

            <View style={{ flexDirection: "row", marginTop: normalize(20) }}>
              <Image
                style={{
                  borderRadius: 100,
                  height: normalize(16),
                  width: normalize(16),
                  resizeMode: "stretch",
                }}
                source={IC_RENEW}
              />
              <Text
                style={[
                  CommonStyles.text_12_bold,
                  { color: COLOR.TEXT_COLOR_GREEN, marginStart: 8 },
                ]}
              >
                Renew Subscription
              </Text>
            </View>

            <View
              style={[
                CommonStyles.greyLineSeprator,
                { marginTop: normalize(20) },
              ]}
            />

            <TouchableOpacity
              onPress={this.onPressOrderDetails}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: normalize(18),
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={{
                    borderRadius: 100,
                    height: normalize(16),
                    width: normalize(16),
                    resizeMode: "stretch",
                  }}
                  source={IC_ADD_TO_CART_BLUE}
                />
                <Text
                  style={[
                    CommonStyles.text_12__semi_bold,
                    { marginStart: normalize(12) },
                  ]}
                >
                  View Order Details
                </Text>
              </View>
              <Image
                style={{
                  borderRadius: 100,
                  height: normalize(8),
                  width: normalize(4),
                  resizeMode: "stretch",
                  alignSelf: "center",
                }}
                source={IC_RIGHT_ENTER}
              />
            </TouchableOpacity>

            <View style={[CommonStyles.greyLineSeprator, { marginTop: 18 }]} />

            <Text
              style={[
                CommonStyles.text_12_bold,
                {
                  color: COLOR.TEXT_COLOR_ORANGE,
                  marginTop: 20,
                  alignSelf: "center",
                },
              ]}
            >
              Cancel Subscription
            </Text>
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
)(SubscriptonDetailsScreen);
