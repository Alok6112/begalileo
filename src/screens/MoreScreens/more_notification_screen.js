import * as RNLocalize from "react-native-localize";
import React, { Component, useEffect, useState } from "react";
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
import {
  ICON_HELP,
  ICON_APP,
  ICON_MESSAGE,
  CHECKBOX_CHECKED,
  CHECKBOX_UNCHECKED,
} from "../../assets/images";
import { CustomBackButton } from "../../components";

import { normalize, Card } from "react-native-elements";

const MoreNotificationScreen = (props) => {
  listPushData = [
    {
      id: 0,
      name: "Daily Progress Summary",
      sub_item: [],
      is_checked: true,
    },
    {
      id: 1,
      name: "Live Class Reminder",
      is_checked: true,
      sub_item: [
        {
          sub_item_id: 0,
          name: "2 hours before",
          is_checked: true,
        },
        {
          sub_item_id: 1,
          name: "1 hour before",
          is_checked: false,
        },
        {
          sub_item_id: 1,
          name: "30 mins before",
          is_checked: false,
        },
      ],
    },
    {
      id: 2,
      name: "Renewal of Subscription",
      is_checked: false,
      sub_item: [],
    },
    {
      id: 3,
      name: "Make this my default delivery address",
      is_checked: false,
      sub_item: [],
    },
  ];

  inAppPushData = [
    {
      id: 0,
      name: "Achieving Learning Goals",
      sub_item: [],
      is_checked: true,
    },
    {
      id: 1,
      name: "Renewal of Subscription ",
      is_checked: true,
      sub_item: [],
    },
    {
      id: 2,
      name: "One More",
      is_checked: false,
      sub_item: [],
    },
  ];

  smsPushData = [
    {
      id: 0,
      name: "Achieving Learning Goals",
      sub_item: [],
      is_checked: true,
    },
    {
      id: 1,
      name: "Renewal of Subscription ",
      is_checked: true,
      sub_item: [],
    },
    {
      id: 2,
      name: "One More",
      is_checked: false,
      sub_item: [],
    },
  ];

  emailPushData = [
    {
      id: 0,
      name: "Achieving Learning Goals",
      sub_item: [],
      is_checked: true,
    },
    {
      id: 1,
      name: "Renewal of Subscription ",
      is_checked: true,
      sub_item: [],
    },
    {
      id: 2,
      name: "One More",
      is_checked: false,
      sub_item: [],
    },
  ];

  const [pushNotificationData, setPushNotificationData] = useState([]);
  const [appNotificationData, setAppNotificationData] = useState([]);
  const [smsNotificationData, setSmsNotificationData] = useState([]);
  const [emailNotificationData, setEmailNotificationData] = useState([]);

  onPressBack = () => {
    const { goBack } = props.navigation;

    goBack();
  };

  useEffect(() => {
    setPushNotificationData(listPushData);
    setAppNotificationData(inAppPushData);
    setEmailNotificationData(emailPushData);
    setSmsNotificationData(smsPushData);
  }, []);

  renderPushData = () => {
    return pushNotificationData.map((data) => {
      console.log(data);
      return (
        <View style={{ marginTop: 20, flexDirection: "row" }}>
          <Image
            style={{
              paddingVertical: 10,
              height: normalize(24),
              width: normalize(24),
              resizeMode: "contain",
              alignSelf: "center",
              backgroundColor: COLOR.WHITE,
            }}
            source={CHECKBOX_CHECKED}
          />
          <Text
            style={[
              CommonStyles.text_14_Regular,
              { color: COLOR.TEXT_ALPHA_GREY, marginStart: 8 },
            ]}
          >
            {data.name}
          </Text>
        </View>
      );
    });
  };

  renderInAppData = () => {
    return inAppPushData.map((data) => {
      console.log(data);
      return (
        <View style={{ marginTop: 20, flexDirection: "row" }}>
          <Image
            style={{
              paddingVertical: 10,
              height: normalize(24),
              width: normalize(24),
              resizeMode: "contain",
              alignSelf: "center",
              backgroundColor: COLOR.WHITE,
            }}
            source={CHECKBOX_CHECKED}
          />
          <Text
            style={[
              CommonStyles.text_14_Regular,
              { color: COLOR.TEXT_ALPHA_GREY, marginStart: 8 },
            ]}
          >
            {data.name}
          </Text>
        </View>
      );
    });
  };

  renderSMSData = () => {
    return smsNotificationData.map((data) => {
      console.log(data);
      return (
        <View style={{ marginTop: 20, flexDirection: "row" }}>
          <Image
            style={{
              paddingVertical: 10,
              height: normalize(24),
              width: normalize(24),
              resizeMode: "contain",
              alignSelf: "center",
              backgroundColor: COLOR.WHITE,
            }}
            source={CHECKBOX_CHECKED}
          />
          <Text
            style={[
              CommonStyles.text_14_Regular,
              { color: COLOR.TEXT_ALPHA_GREY, marginStart: 8 },
            ]}
          >
            {data.name}
          </Text>
        </View>
      );
    });
  };

  renderInEmailData = () => {
    return emailPushData.map((data) => {
      console.log(data);
      return (
        <View style={{ marginTop: 20, flexDirection: "row" }}>
          <Image
            style={{
              paddingVertical: 10,
              height: normalize(24),
              width: normalize(24),
              resizeMode: "contain",
              alignSelf: "center",
              backgroundColor: COLOR.WHITE,
            }}
            source={CHECKBOX_CHECKED}
          />
          <Text
            style={[
              CommonStyles.text_14_Regular,
              { color: COLOR.TEXT_ALPHA_GREY, marginStart: 8 },
            ]}
          >
            {data.name}
          </Text>
        </View>
      );
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginTop: 20, marginStart: 20 }}>
        <CustomBackButton onPress={this.onPressBack} />
      </View>
      <View
        style={[CommonStyles.text_18_bold, { marginTop: 10, marginStart: 20 }]}
      >
        <Text
          style={[CommonStyles.text_18_bold, { color: COLOR.TEXT_COLOR_BLUE }]}
        >
          Notifications
        </Text>
        <Text
          style={[
            CommonStyles.text_12__semi_bold,
            { color: COLOR.TEXT_ALPHA_GREY },
          ]}
        >
          Manage preferences
        </Text>
      </View>

      <View style={{ marginStart: 20, marginTop: 20 }}>
        <Text
          style={[
            CommonStyles.text_14_semi_bold,
            { color: COLOR.TEXT_COLOR_BLACK },
          ]}
        >
          Push
        </Text>
        {this.renderPushData()}
      </View>
      <View style={{ marginStart: 20, marginTop: 20 }}>
        <Text
          style={[
            CommonStyles.text_14_semi_bold,
            { color: COLOR.TEXT_COLOR_BLACK },
          ]}
        >
          In App
        </Text>
        {this.renderInAppData()}
      </View>
      <View style={{ marginStart: 20, marginTop: 20 }}>
        <Text
          style={[
            CommonStyles.text_14_semi_bold,
            { color: COLOR.TEXT_COLOR_BLACK },
          ]}
        >
          SMS
        </Text>
        {this.renderSMSData()}
      </View>
      <View style={{ marginStart: 20, marginTop: 20 }}>
        <Text
          style={[
            CommonStyles.text_14_semi_bold,
            { color: COLOR.TEXT_COLOR_BLACK },
          ]}
        >
          Email
        </Text>
        {this.renderInEmailData()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.PRIMARY_BG,
  },
});

export default MoreNotificationScreen;
