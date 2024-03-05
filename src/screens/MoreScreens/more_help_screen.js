import * as RNLocalize from "react-native-localize";
import React, { Component } from "react";
import { useEffect } from "react";
import { Linking } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as Constants from "../../components/helpers/Constants";
import { COLOR, CommonStyles } from "../../config/styles";
import { ICON_HELP, ICON_APP, ICON_MESSAGE } from "../../assets/images";
import { CustomBackButton } from "../../components";
import { BackHandler } from "react-native";

import { normalize, Card } from "react-native-elements";

const MoreHelpScreen = (props) => {
  function onPressBack() {
    const { goBack } = props.navigation;

    goBack();
  }

  function handleBackButtonClick() {
    props.navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  function onChatSupport() {
    Linking.openURL("whatsapp://send?phone=+918050003793");
  }

  function onEmailSupport() {
    Linking.openURL("mailto:contact@begalileo.com");
  }

  function onCallSupport() {
    let phoneNumber = "";
    console.log(RNLocalize.getCountry());

    if (RNLocalize.getCountry() == "IN") phoneNumber = "+918884442958";
    else if (RNLocalize.getCountry() == "UAE") phoneNumber = "+971065985158";
    else phoneNumber = "+19726879056";

    Linking.openURL(`tel:${phoneNumber}`);
  }

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20, marginStart: 20 }}>
        <CustomBackButton onPress={onPressBack} />
      </View>
      <View
        style={[CommonStyles.text_18_bold, { marginTop: 35, marginStart: 20 }]}
      >
        <Text
          style={[
            CommonStyles.text_18_bold,
            { color: COLOR.TEXT_COLOR_BLUE, marginStart: normalize(8) },
          ]}
        >
          Help and support
        </Text>
      </View>
      <View style={{ marginTop: 20, marginStart: 20 }}>
        <TouchableOpacity
          onPress={onEmailSupport}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: normalize(19),
            paddingBottom: normalize(19),
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{
                height: normalize(16),
                width: normalize(16),
                resizeMode: "stretch",
              }}
              source={ICON_MESSAGE}
            />
            <Text
              style={[
                CommonStyles.text_12__semi_bold,
                { marginStart: normalize(16) },
              ]}
            >
              Email to us
            </Text>
          </View>
          {/* <Image style={{ height: normalize(8), width: normalize(4), marginEnd: normalize(2), resizeMode: "stretch" }} source={IC_RIGHT_ENTER} /> */}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onChatSupport}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: normalize(19),
            paddingBottom: normalize(19),
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{
                height: normalize(16),
                width: normalize(16),
                resizeMode: "stretch",
              }}
              source={ICON_MESSAGE}
            />
            <Text
              style={[
                CommonStyles.text_12__semi_bold,
                { marginStart: normalize(16) },
              ]}
            >
              Chat with us
            </Text>
          </View>
          {/* <Image style={{ height: normalize(8), width: normalize(4), marginEnd: normalize(2), resizeMode: "stretch" }} source={IC_RIGHT_ENTER} /> */}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onCallSupport}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: normalize(19),
            paddingBottom: normalize(19),
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              style={{
                height: normalize(16),
                width: normalize(16),
                resizeMode: "stretch",
              }}
              source={ICON_APP}
            />
            <Text
              style={[
                CommonStyles.text_12__semi_bold,
                { marginStart: normalize(16) },
              ]}
            >
              Call us
            </Text>
          </View>
          {/* <Image style={{ height: normalize(8), width: normalize(4), marginEnd: normalize(2), resizeMode: "stretch" }} source={IC_RIGHT_ENTER} /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.PRIMARY_BG,
  },
});

export default MoreHelpScreen;
