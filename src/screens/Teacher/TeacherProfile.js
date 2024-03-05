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
import { IC_BUY_NOW, IC_ADD_TO_CART } from "../../assets/images";
import * as Constants from "../../components/helpers/Constants";
import CustomGradientButtonIcon from "../../components/CustomGradientButtonIcon";
import { COLOR, CommonStyles } from "../../config/styles";
import { CustomBackButton } from "../../components";
import Icon from "react-native-vector-icons/FontAwesome";
import { normalize, Card } from "react-native-elements";

class TeacherProfile extends Component {
  render() {
    return (
      <View>
        <Text>Teacher Profile</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.dashboard.student_report_response);
  return {
    state: state.dashboard,
    loading: state.dashboard.loading,
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

export default connect(mapStateToProps, mapDispatchToProps)(TeacherProfile);
