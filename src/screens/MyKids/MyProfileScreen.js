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
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import * as Constants from "../../components/helpers/Constants";
import { COLOR, CommonStyles } from "../../config/styles";
import CustomGradientButton from "../../components/CustomGradientButton";
import {
  allowOnlyAlphabets,
  isValidDate,
  isValidEmail,
} from "../../components/helpers";
import { normalize } from "react-native-elements";
import { CustomBackButton } from "../../components";
import { updateProfile } from "../../actions/dashboard";

class MyProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      mParentId: "",
      mFirstName: "",
      mLastName: "",
      mMobileNumber: "",
      mUserEmail: "",
    };
  }

  componentDidMount() {
    console.log(this.props.dashboard_response.parent_details);
    if (this.props.dashboard_status) {
      const { email, mobile, first_name, last_name, id } =
        this.props.dashboard_response.parent_details[0];
      this.setState({
        mMobileNumber: mobile,
        mUserEmail: email,
        mFirstName: first_name,
        mLastName: last_name,
        mParentId: id,

        mFirstNameError: false,
        mLastNameError: false,
        mUserEmailError: false,
        mMobileNumberError: false,
      });
    }
  }

  onPressBack = () => {
    const { goBack } = this.props.navigation;

    goBack();
  };

  addUserFirstName = (value) => {
    if (!allowOnlyAlphabets(value)) return;
    this.setState({
      mFirstName: value,
    });
  };
  addUserLastName = (value) => {
    if (!allowOnlyAlphabets(value)) return;
    this.setState({
      mLastName: value,
    });
  };

  onMobileNumberChanged(text) {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      }
    }
    this.setState({ mMobileNumber: newText });
  }

  onUpdateClicked = () => {
    let isValidationSuccess = true;
    const { mFirstName, mLastName, mUserEmail, mMobileNumber, mParentId } =
      this.state;

    if (mFirstName == "") {
      isValidationSuccess = false;
      this.setState({
        mFirstNameError: true,
      });
    } else {
      this.setState({
        mFirstNameError: false,
      });
    }

    if (mLastName == "") {
      isValidationSuccess = false;
      this.setState({
        mLastNameError: true,
      });
    } else {
      this.setState({
        mLastNameError: false,
      });
    }

    if (!isValidEmail(mUserEmail)) {
      isValidationSuccess = false;
      this.setState({
        mUserEmailError: true,
      });
    } else {
      this.setState({
        mUserEmailError: false,
      });
    }

    if (mMobileNumber == "") {
      isValidationSuccess = false;
      this.setState({
        mMobileNumberError: true,
      });
    } else {
      this.setState({
        mMobileNumberError: false,
      });
    }

    if (isValidationSuccess) {
      this.props.updateProfile(
        mParentId,
        mMobileNumber,
        mUserEmail,
        mFirstName,
        mLastName
      );
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: COLOR.WHITE }}>
        <ScrollView
          contentContainerStyle={{
            justifyContent: "space-between",
            backgroundColor: COLOR.WHITE,
            marginStart: 10,
            marginEnd: 10,
          }}
        >
          <View style={{ margin: 5 }}>
            <CustomBackButton onPress={this.onPressBack} />
          </View>

          <Text
            style={[
              CommonStyles.text_18_semi_bold,
              { color: COLOR.TEXT_COLOR_BLUE },
            ]}
          >
            My Profile
          </Text>
          <View style={{ flex: 1 }}>
            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 20,
                marginBottom: 2,
              }}
            >
              <Text style={styles.textSubHeader}>First name</Text>
              {this.state.mFirstNameError && (
                <Text style={styles.errorMessage}>Enter First Name</Text>
              )}
              <TextInput
                ref={(input) => {
                  this.first_name_input = input;
                }}
                placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                placeholder="First Name"
                keyboardType="default"
                style={styles.nametextInputBordered}
                onChangeText={this.addUserFirstName.bind(this)}
                value={this.state.mFirstName}
                blurOnSubmit={false}
              />
            </View>

            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 20,
                marginBottom: 2,
              }}
            >
              <Text style={styles.textSubHeader}>Last name</Text>
              {this.state.mLastNameError && (
                <Text style={styles.errorMessage}>Enter Last Name</Text>
              )}
              <TextInput
                ref={(input) => {
                  this.first_name_input = input;
                }}
                placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                placeholder="Last Name"
                keyboardType="default"
                style={styles.nametextInputBordered}
                onChangeText={this.addUserLastName.bind(this)}
                value={this.state.mLastName}
                blurOnSubmit={false}
              />
            </View>

            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 20,
                marginBottom: 2,
              }}
            >
              <Text style={styles.textSubHeader}>Email Id</Text>
              {this.state.mUserEmailError && (
                <Text style={styles.errorMessage}>
                  Please enter a valid Email
                </Text>
              )}
              <TextInput
                ref={(input) => {
                  this.email_id_input = input;
                }}
                placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                placeholder="Enter email id"
                keyboardType="email-address"
                style={styles.nametextInputBordered}
                editable={this.state.isEmailEditable}
                autoCapitalize="none"
                onChangeText={(text) => this.setState({ mUserEmail: text })}
                value={this.state.mUserEmail}
                blurOnSubmit={false}
                //setting limit of input
              />
            </View>

            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 20,
                marginBottom: 2,
              }}
            >
              <Text style={styles.textSubHeader}>Mobile Number</Text>
              {this.state.mMobileNumberError && (
                <Text style={styles.errorMessage}>
                  Please enter a valid mobile number
                </Text>
              )}
              <TextInput
                ref={(input) => {
                  this.email_id_input = input;
                }}
                placeholder="Enter Mobile number"
                placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                keyboardType="number-pad"
                style={styles.nametextInputBordered}
                autoCapitalize="none"
                onChangeText={(text) => this.onMobileNumberChanged(text)}
                value={this.state.mMobileNumber}
                blurOnSubmit={false}
                //setting limit of input
              />
            </View>

            <CustomGradientButton
              myRef={(input) => {
                this.btn_edit_student = input;
              }}
              style={styles.addKidButton}
              children="Update"
              onPress={this.onUpdateClicked}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.dashboard,
    loading: state.dashboard.loading,
    dashboard_response: state.dashboard.dashboard_response,
    dashboard_status: state.dashboard.dashboard_status,
  };
};

const mapDispatchToProps = {
  updateProfile,
};

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 16,
    textAlign: "left",
    marginTop: 15,
    marginBottom: 5,
    marginStart: 20,
    color: COLOR.TEXT_COLOR_BLUE,
    fontFamily: "Montserrat-SemiBold",
  },
  textSubHeader: {
    fontSize: 12,
    textAlign: "left",
    margin: 5,
    color: COLOR.TEXT_COLOR_BLACK,
    fontFamily: "Montserrat-SemiBold",
  },
  textSubFooter: {
    fontSize: 12,
    textAlign: "left",
    margin: 5,
    color: COLOR.TEXT_COLOR_BLACK,
    fontFamily: "Montserrat-Regular",
  },
  textInputBordered: {
    textAlign: "center",
    width: "100%",
    padding: 8,
    alignSelf: "stretch",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLOR.BORDER_COLOR_GREEN,
    backgroundColor: COLOR.WHITE,
  },
  nametextInputBordered: {
    justifyContent: "flex-start",
    width: "100%",
    padding: 16,
    alignSelf: "stretch",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLOR.BORDER_COLOR_GREEN,
    backgroundColor: COLOR.WHITE,
  },
  dropDownBordered: {
    textAlign: "center",
    width: "100%",
    alignSelf: "stretch",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLOR.BORDER_COLOR_GREEN,
    backgroundColor: COLOR.WHITE,
  },
  footerButton: {
    flex: 1,
    justifyContent: "flex-end",
  },
  dateInputBordered: {
    flex: 1,
    textAlign: "center",
    padding: 10,
    alignSelf: "stretch",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLOR.BORDER_COLOR_GREEN,
    backgroundColor: COLOR.WHITE,
  },
  submitButton: {
    alignItems: "center",
    marginStart: 20,
    marginEnd: 20,
    marginTop: 20,
    paddingTop: 12,
    fontFamily: "Montserrat-Regular",
    paddingBottom: 12,
  },
  modalListContainer: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLOR.BORDER_COLOR_GREEN,
    backgroundColor: COLOR.WHITE,
  },
  errorMessage: {
    color: COLOR.RED,
  },
  edit_profile_icon: {
    backgroundColor: "#97DA92",
    borderRadius: 100,
    padding: 10,
    position: "absolute",
    bottom: 0,
    right: 0,
  },

  addKidButton: {
    alignItems: "center",
    marginStart: 20,
    marginEnd: 20,
    marginTop: 20,
    paddingTop: 15,

    paddingBottom: 15,
  },
  myKidsListCenter: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
  addKidButton: {
    alignItems: "center",
    marginStart: 20,
    marginEnd: 20,
    marginTop: 20,
    paddingTop: 15,

    paddingBottom: 15,
  },
  myKidsListTop: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileScreen);
