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
  IC_REMOVE_ITEM,
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
} from "../../assets/images";
import { CustomBackButton, CustomGradientButton } from "../../components";
import Icon from "react-native-vector-icons/FontAwesome";
import { normalize, Card } from "react-native-elements";

class SubscriptonOrderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartProducts: [
        {
          months: "12 Months",
          final_price: "Rs. 29,988",
          discount: "24% off",
        },
        {
          months: "6 Months",
          final_price: "Rs. 16,194",
          discount: "18% off",
        },
        {
          months: "3 Months",
          final_price: "Rs. 8,697",
          discount: "12% off",
        },
      ],
    };
  }

  onPressBack = () => {
    const { goBack } = this.props.navigation;

    goBack();
  };

  renderOrderList() {
    return this.state.cartProducts.map((item, index) => (
      <View key={index} style={{ marginTop: normalize(20) }}>
        <View
          style={{
            borderColor: COLOR.BORDER_COLOR_GREY,
            borderWidth: normalize(1),
            borderRadius: normalize(24),
          }}
        >
          <View
            style={{
              marginStart: normalize(16),
              marginTop: normalize(15),
              marginBottom: normalize(15),
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{
                  borderRadius: 100,
                  height: normalize(30),
                  width: normalize(30),
                  resizeMode: "stretch",
                }}
                source={IMG_SHAKSHI}
              />
              <Text
                style={[
                  CommonStyles.text_12__semi_bold,
                  { alignSelf: "center", marginStart: normalize(8) },
                ]}
              >
                ***
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                marginEnd: normalize(16),
              }}
            >
              <Text
                style={[
                  CommonStyles.text_12_regular,
                  { color: COLOR.TEXT_ALPHA_GREY },
                ]}
              >
                Group Class |{" "}
              </Text>
              <Text
                style={[
                  CommonStyles.text_12_regular,
                  { color: COLOR.TEXT_ALPHA_GREY },
                ]}
              >
                Kindergarten
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: COLOR.BORDER_COLOR_GREY,
              height: normalize(1),
            }}
          />
          <View
            style={{
              marginTop: normalize(12),
              marginStart: normalize(16),
              flexDirection: "row",
              justifyContent: "space-between",
              marginEnd: normalize(16),
              marginBottom: normalize(32),
            }}
          >
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text style={[CommonStyles.text_18_bold]}>12 Months</Text>
                <Text
                  style={[
                    CommonStyles.text_12_bold,
                    {
                      color: COLOR.TEXT_COLOR_PURPLE,
                      alignSelf: "center",
                      marginStart: normalize(8),
                    },
                  ]}
                >
                  24% off
                </Text>
              </View>
              <View
                style={{ marginTop: normalize(4), marginTop: normalize(4) }}
              >
                <Text style={[CommonStyles.text_12_regular]}>
                  With 12 Math boxes{"\n"}for 12 months
                </Text>
              </View>
            </View>
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text style={[CommonStyles.text_18_bold]}>Rs. 29,988</Text>
              </View>
              <View
                style={{ marginTop: normalize(4), marginTop: normalize(4) }}
              >
                <Text style={[CommonStyles.text_12_regular]}>Rs. 39,588</Text>
              </View>
            </View>
          </View>
        </View>
        <Text
          style={[
            CommonStyles.text_12_Regular,
            { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(8) },
          ]}
        >
          Order ID - ODI123456565456
        </Text>
      </View>
    ));
  }

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
              Order Details
            </Text>

            <View style={{ marginTop: normalize(20) }}>
              <Text style={[CommonStyles.text_12_bold]}>Subscription Date</Text>
              <Text
                style={[
                  CommonStyles.text_9_regular,
                  { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) },
                ]}
              >
                Mon, 08 May, 2020
              </Text>
            </View>

            {this.renderOrderList()}
            <View>
              <View>
                <Text
                  style={[
                    CommonStyles.text_14_bold,
                    { marginTop: normalize(24) },
                  ]}
                >
                  Price Details
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: normalize(24),
                  }}
                >
                  <Text
                    style={[
                      CommonStyles.text_12_Regular,
                      { color: COLOR.TEXT_ALPHA_GREY },
                    ]}
                  >
                    Cart Total
                  </Text>
                  <Text
                    style={[
                      CommonStyles.text_12_Regular,
                      { color: COLOR.TEXT_ALPHA_GREY },
                    ]}
                  >
                    Rs 45224
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: normalize(12),
                  }}
                >
                  <Text
                    style={[
                      CommonStyles.text_12_Regular,
                      { color: COLOR.TEXT_ALPHA_GREY },
                    ]}
                  >
                    Cart Discount
                  </Text>
                  <Text
                    style={[
                      CommonStyles.text_12_Regular,
                      { color: COLOR.TEXT_COLOR_PURPLE },
                    ]}
                  >
                    - Rs 45224
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: normalize(12),
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={[
                        CommonStyles.text_12_Regular,
                        { color: COLOR.TEXT_ALPHA_GREY },
                      ]}
                    >
                      Coupon Discount
                    </Text>
                    {/* <TouchableOpacity onPress={this.openApplyCoupon}>
                      <Text style={[CommonStyles.text_12_bold, { color: COLOR.TEXT_COLOR_GREEN, marginStart: normalize(12) }]}>Apply Coupon</Text>
                    </TouchableOpacity> */}
                  </View>

                  <Text
                    style={[
                      CommonStyles.text_12_Regular,
                      { color: COLOR.TEXT_COLOR_PURPLE },
                    ]}
                  >
                    - Rs. 0
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: normalize(12),
                  }}
                >
                  <Text
                    style={[
                      CommonStyles.text_12_Regular,
                      { color: COLOR.TEXT_ALPHA_GREY },
                    ]}
                  >
                    Mathbox Delivery
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={[
                        CommonStyles.text_12_Regular,
                        { color: COLOR.TEXT_COLOR_PURPLE },
                      ]}
                    >
                      FREE
                    </Text>
                    <Text
                      style={[
                        CommonStyles.text_12_Regular,
                        {
                          color: COLOR.TEXT_ALPHA_GREY,
                          marginStart: normalize(10),
                        },
                      ]}
                    >
                      Rs 45224
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    borderColor: COLOR.BORDER_COLOR_GREY,
                    borderWidth: normalize(1),
                    marginTop: normalize(12),
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: normalize(12),
                  }}
                >
                  <Text style={[CommonStyles.text_12_bold]}>Total</Text>
                  <Text style={[CommonStyles.text_12_bold]}>Rs 33,100</Text>
                </View>

                <View>
                  <Text
                    style={[
                      CommonStyles.text_12__semi_bold,
                      {
                        color: COLOR.TEXT_COLOR_GREEN,
                        marginTop: normalize(24),
                      },
                    ]}
                  >
                    Download Invoice
                  </Text>
                </View>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptonOrderDetails);
