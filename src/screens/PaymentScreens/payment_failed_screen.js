import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  VirtualizedList,
  ColorPropType,
} from "react-native";
import { connect } from "react-redux";
import * as Constants from "../../components/helpers/Constants";
import { normalize, Card } from "react-native-elements";
import { COLOR, CommonStyles } from "../../config/styles";
import {
  IC_RESCHEDULE_DEMO,
  PAYMENT_SUCCESS,
  IC_TRACK_BOX,
} from "../../assets/images";
import { showMessage, hideMessage } from "react-native-flash-message";
import { removeFromCart } from "../../actions/dashboard";
import CustomGradientButton from "../../components/CustomGradientButton";
import Modal from "react-native-modal";

class PaymentFailedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  retryPayment = () => {
    this.props.navigation.navigate(Constants.CartListScreen);
  };

  goToHome = () => {
    this.props.navigation.replace(Constants.MainScreen);
  };

  render() {
    return (
      <ScrollView
        style={{
          flex: 1,

          backgroundColor: COLOR.WHITE,
        }}
      >
        <View style={{ margin: normalize(20) }}>
          <View>
            <Image
              style={{
                resizeMode: "contain",
                height: normalize(80),
                width: normalize(80),
                marginTop: normalize(20),
                marginBottom: normalize(20),
                height: normalize(40),
                alignSelf: "center",
              }}
              source={PAYMENT_SUCCESS}
            />
            <Text
              style={[
                CommonStyles.text_18_semi_bold,
                { color: COLOR.TEXT_COLOR_BLUE, alignSelf: "center" },
              ]}
            >
              Payment failed!
            </Text>

            <Text
              style={[
                CommonStyles.text_14_Regular,
                {
                  color: COLOR.TEXT_ALPHA_GREY,
                  marginStart: normalize(30),
                  marginEnd: normalize(30),
                  textAlign: "center",
                  marginTop: normalize(8),
                },
              ]}
            >
              Something went wrong. Incase your payment is debited, you will get
              refund by 8 working days.
            </Text>

            <View style={{ marginTop: normalize(32) }}>
              <CustomGradientButton
                myRef={(input) => {
                  this.btn_pay_now = input;
                }}
                style={styles.btn_proceed_payment}
                children={"Try to Pay Again"}
                onPress={this.retryPayment}
                textStyling={[
                  CommonStyles.text_12__semi_bold,
                  { color: COLOR.WHITE },
                ]}
              />
            </View>

            <TouchableOpacity
              onPress={this.goToHome}
              style={{
                marginTop: normalize(20),
                flexDirection: "row",
                alignSelf: "center",
              }}
            >
              <Image
                style={{
                  resizeMode: "contain",
                  height: normalize(14),
                  width: normalize(14),
                  alignSelf: "center",
                }}
                source={IC_RESCHEDULE_DEMO}
              />
              <Text
                style={[
                  CommonStyles.text_12__semi_bold,
                  { color: COLOR.TEXT_COLOR_GREEN, marginStart: normalize(9) },
                ]}
              >
                Back to Home
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  btn_proceed_payment: {
    alignItems: "center",
    paddingTop: normalize(15),
    paddingStart: normalize(20),
    paddingEnd: normalize(20),
    paddingBottom: normalize(15),
  },
});

export default PaymentFailedScreen;
