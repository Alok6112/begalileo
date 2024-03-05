import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { connect } from "react-redux";

class MyKidsScreen extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <View>
        <Text>My Kids Screen</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyKidsScreen);
