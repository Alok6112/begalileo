import React, { Component, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ActivityIndicator,
  Platform,
  Modal,
} from "react-native";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { COLOR, CommonStyles } from "../../config/styles";
import CustomGradientButton from "../../components/CustomGradientButton";
import { BorderedTextInput, CustomBorderedTextInput } from "../../components";
import { normalize } from "react-native-elements";
import { isValidEmail } from "../../components/helpers";
import { existingUserLogin } from "../../actions/authenticate";
import { showMessage, hideMessage } from "react-native-flash-message";
import { BASE_URL } from "../../config/configs";
import axios from "axios";

const EmailLogin = () => {
  const dispatch = useDispatch();
  const authenticate = useSelector((state) => state.authenticate);
  const [userNameError, setUserNameError] = useState(false);
  const [mUserName, setMuserName] = useState("");
  const [mPassword, setMpassword] = useState("");
  const [mResetEmail, setResetEmail] = useState("");
  const [resetEmailError, setResetEmailError] = useState(false);
  const [resetEmailErrorMsg, setResetEmailErrorMsg] = useState("");
  const [userPasswordError, setUserPasswordError] = useState(false);
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  const [forgotPasswordDialog, setForgotPasswordDialog] = useState(false);
  const loginStatus = useSelector(
    (state) => state.authenticate.user_login_status
  );
  const loginResponse = useSelector(
    (state) => state.authenticate.user_login_response
  );

  const client = axios.create({
    baseURL: BASE_URL,
    responseType: "json",
  });

  onUserLogin = () => {
    console.log(mUserName);
    var isValidCred = true;
    if (!isValidEmail(mUserName)) {
      setUserNameError(true);
      isValidCred = false;
    } else {
      setUserNameError(false);
    }
    if (mPassword == "") {
      setUserPasswordError(true);
      isValidCred = false;
    } else {
      setUserPasswordError(false);
    }
    if (isValidCred) {
      console.log(mUserName);
      dispatch(existingUserLogin(mUserName, mPassword));
      // this.props.existingUserLogin(this.state.mUserName, this.state.mPassword);
    }
  };

  onFocusIn = (inputRef) => {
    inputRef.setNativeProps({
      borderColor: COLOR.LIGHT_BORDER_GREEN,
    });
  };

  onFocusOut = (inputRef) => {
    inputRef.setNativeProps({
      borderColor: COLOR.LIGHT_BORDER_COLOR,
    });
  };

  onForgotPassword = () => {
    if (!isValidEmail(mResetEmail)) {
      setResetEmailError(true);
      setResetEmailErrorMsg("Please enter a valid email");
    } else {
      setResetEmailError(false);
      let url = BASE_URL + "/app_mathbox/forgot_password?email=" + mResetEmail;
      console.log(url);
      client
        .get(url)
        .then((res) => {
          console.log("Forgot Password Response", res.data);
          if (res.data.status) {
            onResetLinkSuccess(res.data);
          } else {
            setResetEmailErrorMsg(res.data.message);
            setResetEmailError(true);
          }
        })
        .catch((err) => {
          setResetEmailErrorMsg(err.message);
          setResetEmailError(true);
        });
    }
  };

  onResetLinkSuccess = (data) => {
    setForgotPasswordDialog(false);
    showMessage({
      message: data.message,
      type: "success",
    });
  };

  return (
    <View>
      <View style={{ justifyContent: "center", marginBottom: 2 }}>
        <View
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 25,
            marginBottom: 2,
          }}
        >
          {userNameError && (
            <Text style={[CommonStyles.text_8_regular, { color: COLOR.RED }]}>
              Please enter a valid Email
            </Text>
          )}
          <TextInput
            ref={(ref) => {
              this.inputEmail = ref;
            }}
            keyboardType="email-address"
            placeholderTextColor={COLOR.TEXT_COLOR_HINT}
            placeholder="Email"
            style={[styles.textInputBordered, {}]}
            autoCapitalize="none"
            onChangeText={(text) => setMuserName(text)}
            value={mUserName}
            onFocus={() => onFocusIn(this.inputEmail)}
            onBlur={() => onFocusOut(this.inputEmail)}
            blurOnSubmit={false}
          />
        </View>
        <View
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 5,
            marginBottom: 2,
          }}
        >
          {userPasswordError && (
            <Text style={[CommonStyles.text_8_regular, { color: COLOR.RED }]}>
              Please enter a valid Password
            </Text>
          )}
          <TextInput
            ref={(ref) => {
              this.inputPassword = ref;
            }}
            placeholderTextColor={COLOR.TEXT_COLOR_HINT}
            placeholder="Password"
            style={styles.textInputBordered}
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(value) => setMpassword(value)}
            value={mPassword}
            onFocus={() => onFocusIn(this.inputPassword)}
            onBlur={() => onFocusOut(this.inputPassword)}
            blurOnSubmit={false}
          />
        </View>

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
            children={"Login"}
            onPress={onUserLogin}
          />
        </View>
        <TouchableOpacity onPress={() => setForgotPasswordDialog(true)}>
          <Text
            style={[
              CommonStyles.text_12_Regular,
              {
                alignSelf: "center",
                marginVertical: normalize(5),
                padding: normalize(5),
              },
            ]}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>

      {forgotPasswordDialog && (
        <Modal transparent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignContent: "center",
              backgroundColor: COLOR.TEXT_ALPHA_GREY,
            }}
          >
            <View
              style={{
                height: 350,
                backgroundColor: COLOR.WHITE,
                marginHorizontal: 10,
                borderRadius: 10,
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  CommonStyles.text_14_semi_bold,
                  { alignSelf: "center" },
                ]}
              >
                Reset Password
              </Text>
              <View>
                <Text
                  style={[
                    CommonStyles.text_11_Regular,
                    { marginStart: 20, marginTop: 10 },
                  ]}
                >
                  Enter your email
                </Text>
                <Text
                  style={[CommonStyles.text_11_Regular, { marginStart: 20 }]}
                >
                  We will send password reset link
                </Text>
              </View>

              <View
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  marginBottom: 2,
                  marginTop: 10,
                }}
              >
                {resetEmailError && (
                  <Text
                    style={[CommonStyles.text_8_regular, { color: COLOR.RED }]}
                  >
                    {resetEmailErrorMsg}
                  </Text>
                )}
                <TextInput
                  ref={(input) => {
                    this.Otp_4_TextInput = input;
                  }}
                  placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                  placeholder="Enter User Email"
                  style={styles.textInputBordered}
                  autoCapitalize="none"
                  onChangeText={(value) => setResetEmail(value)}
                  value={mResetEmail}
                  blurOnSubmit={false}
                />
              </View>
              <View
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 2,
                  marginBottom: 12,
                }}
              >
                <CustomGradientButton
                  myRef={(input) => {
                    this.btn_add_kid = input;
                  }}
                  style={styles.loginButton}
                  children={"Submit"}
                  onPress={onForgotPassword}
                />
              </View>
              <TouchableOpacity
                onPress={() => setForgotPasswordDialog(false)}
                style={{ padding: 10 }}
              >
                <Text
                  style={[
                    CommonStyles.text_11_Regular,
                    {
                      marginTop: 10,
                      alignSelf: "center",
                      color: COLOR.BLUE_LINk,
                    },
                  ]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
    borderColor: COLOR.LIGHT_BORDER_COLOR,
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

export default EmailLogin;
