import React, { Component, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { COLOR, CommonStyles } from "../config/styles";
import CustomGradientButton from "./CustomGradientButton";
import { normalize } from "react-native-elements";
import { isValidEmail, allowOnlyAlphabets } from "./helpers";

const UpdateNameMobileComponent = ({
  cancelMobileNumberUpdate,
  callBackMobileNumberUpdate,
  parent_details,
}) => {
  const [userNameError, setUserNameError] = useState(false);
  const [mUserName, setMuserName] = useState("");
  const [mMobileNumber, setMobileNUmber] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState(false);
  const [mUserEmail, setUserEmail] = useState("");
  const [mUserEmailError, setUserEmailError] = useState(false);

  onChanged = (text) => {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      }
    }
    setMobileNUmber(newText);
  };

  addUserFirstName = (value) => {
    if (!allowOnlyAlphabets(value)) return;
    else setMuserName(value);
  };

  onUpdateMobileNumber = () => {
    let isvalid = true;
    if (mMobileNumber == null || mMobileNumber.length <= 4) {
      if (parent_details.mobile == "") {
        isvalid = false;
        setMobileNumberError(true);
      }
    } else {
      setMobileNumberError(false);
    }
    if (mUserName == null || mUserName.length < 3) {
      if (parent_details.first_name == "") {
        isvalid = false;
        setUserNameError(true);
      }
    } else {
      setUserNameError(false);
    }

    if (!isValidEmail(mUserEmail)) {
      if (parent_details.email == "") {
        isvalid = false;
        setUserEmailError(true);
      }
    } else {
      setUserEmailError(false);
    }

    console.log("FGGG " + isvalid);

    if (isvalid)
      callBackMobileNumberUpdate(mUserName, mMobileNumber, mUserEmail);
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          marginHorizontal: normalize(10),
          borderRadius: normalize(10),
          backgroundColor: COLOR.WHITE,
        }}
      >
        <Text
          style={[
            CommonStyles.text_12__semi_bold,
            {
              marginTop: normalize(20),
              justifyContent: "center",
              alignSelf: "center",
            },
          ]}
        >
          Update details to book demo
        </Text>

        <View style={{ justifyContent: "center", marginBottom: 2 }}>
          {parent_details.first_name == "" && (
            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 25,
                marginBottom: 2,
              }}
            >
              {userNameError && (
                <Text
                  style={[CommonStyles.text_8_regular, { color: COLOR.RED }]}
                >
                  Please enter a valid Name
                </Text>
              )}
              <TextInput
                ref={(input) => {
                  this.Otp_4_TextInput = input;
                }}
                placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                placeholder="Enter Name"
                style={styles.textInputBordered}
                autoCapitalize="none"
                onChangeText={(text) => addUserFirstName(text)}
                value={mUserName}
                blurOnSubmit={false}
              />
            </View>
          )}
          {parent_details.mobile == "" && (
            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 15,
                marginBottom: 2,
              }}
            >
              {mobileNumberError && (
                <Text
                  style={[CommonStyles.text_8_regular, { color: COLOR.RED }]}
                >
                  Please enter a valid Mobile Number
                </Text>
              )}
              <TextInput
                keyboardType="numeric"
                placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                placeholder="Enter Mobile Number"
                style={styles.textInputBordered}
                onChangeText={(text) => setMobileNUmber(text)}
                autoCapitalize="none"
                value={mMobileNumber}
                blurOnSubmit={false}
              />
            </View>
          )}

          {parent_details.email == "" && (
            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 15,
                marginBottom: 2,
              }}
            >
              {mUserEmailError && (
                <Text
                  style={[CommonStyles.text_8_regular, { color: COLOR.RED }]}
                >
                  Please enter a valid Email
                </Text>
              )}
              <TextInput
                keyboardType="numeric"
                placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                placeholder="Enter Email"
                style={styles.textInputBordered}
                onChangeText={(text) => setUserEmail(text)}
                autoCapitalize="none"
                value={mUserEmail}
                blurOnSubmit={false}
              />
            </View>
          )}

          <View
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginTop: 5,
              marginBottom: 2,
            }}
          >
            <CustomGradientButton
              myRef={(input) => {
                this.btn_add_kid = input;
              }}
              style={styles.loginButton}
              children={"Update"}
              onPress={() => onUpdateMobileNumber()}
            />
          </View>
          <TouchableOpacity onPress={() => cancelMobileNumberUpdate()}>
            <Text
              style={[
                CommonStyles.text_12_Regular,
                {
                  alignSelf: "center",
                  marginVertical: normalize(15),
                  padding: normalize(5),
                },
              ]}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputBordered: {
    textAlign: "left",
    padding: 20,
    alignSelf: "stretch",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLOR.BORDER_COLOR_GREEN,
    backgroundColor: COLOR.WHITE,
  },
  loginButton: {
    alignItems: "center",
    marginStart: 20,
    marginEnd: 20,
    marginTop: 20,
    paddingTop: 15,

    paddingBottom: 15,
  },
});

export default UpdateNameMobileComponent;
