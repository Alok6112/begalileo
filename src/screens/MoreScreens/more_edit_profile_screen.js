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
import { IC_SWITCH_PROFILE, IC_EDIT_PEN } from "../../assets/images";
import { CustomBackButton } from "../../components";
import Icon from "react-native-vector-icons/FontAwesome";
import { normalize, Card } from "react-native-elements";

class MoreEditProfileScreen extends Component {
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
          backgroundColor: COLOR.PRIMARY_BG,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginStart: normalize(20),
              marginEnd: normalize(20),
              marginTop: normalize(10),
            }}
          >
            <CustomBackButton onPress={this.onPressBack} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: normalize(20),
              }}
            >
              <Text
                style={[
                  CommonStyles.text_18_bold,
                  { color: COLOR.TEXT_COLOR_BLUE },
                ]}
              >
                Profile
              </Text>
              <TouchableOpacity
                onPress={this.onEditProfileClick}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Image
                  style={{
                    height: normalize(16),
                    width: normalize(16),
                    resizeMode: "stretch",
                  }}
                  source={IC_EDIT_PEN}
                />
                <Text
                  style={[
                    CommonStyles.text_12_bold,
                    {
                      color: COLOR.TEXT_COLOR_GREEN,
                      marginStart: normalize(8),
                    },
                  ]}
                >
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: normalize(32) }}>
              <Text style={[CommonStyles.text_11_bold]}>Email Id</Text>
              <Text
                style={[
                  CommonStyles.text_14_Regular,
                  { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(8) },
                ]}
              ></Text>
            </View>
            <View style={{ marginTop: normalize(40) }}>
              <Text style={[CommonStyles.text_11_bold]}>Full Name</Text>
              <Text
                style={[
                  CommonStyles.text_14_Regular,
                  { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(8) },
                ]}
              ></Text>
            </View>
            <View style={{ marginTop: normalize(32) }}>
              <Text style={[CommonStyles.text_11_bold]}>Phone Number</Text>
              <Text
                style={[
                  CommonStyles.text_14_Regular,
                  { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(8) },
                ]}
              >
                +91 98734 51244
              </Text>
            </View>
            <View style={{ marginTop: normalize(32) }}>
              <Text style={[CommonStyles.text_11_bold]}>Pincode</Text>
              <View style={{ flexDirection: "row", marginTop: normalize(8) }}>
                <View style={[CommonStyles.circleRoundBlack]} />
                <View
                  style={[
                    CommonStyles.circleRoundBlack,
                    { marginStart: normalize(16) },
                  ]}
                />
                <View
                  style={[
                    CommonStyles.circleRoundBlack,
                    { marginStart: normalize(16) },
                  ]}
                />
                <View
                  style={[
                    CommonStyles.circleRoundBlack,
                    { marginStart: normalize(16) },
                  ]}
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
)(MoreEditProfileScreen);
