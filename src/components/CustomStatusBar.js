import React, { Component } from "react";
import { Platform, StyleSheet, View, StatusBar } from "react-native";
import Constants from "expo-constants";
const STATUSBAR_HEIGHT = StatusBar.currentHeight;

class CustomStatusbar extends Component {
  render() {
    return (
      <View style={styles.StatusBar}>
        <StatusBar translucent barStyle={this.props.barStyle} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  StatusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: "rgba(22,7,92,1)",
  },
});

export default CustomStatusbar;
