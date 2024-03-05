import React, { useEffect, useState } from "react";
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
import firebase from "../screens/SmScreen/AppChat/Firebase/firebaseConfig";
import { COLOR } from "../config/styles";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/AntDesign";
import { normalize, Card } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";
import * as Constants from "../components/helpers/Constants";

function ChatFloatingButton(props) {
  onClickChatButton = (props) => {
    props.onClickChat();
  };

  return (
    <View style={styles.container}>
      {props?.count > 0 && (
        <View
          style={{
            alignSelf: "flex-end",
            position: "absolute",
            zIndex: 1,
            top: -2,
            backgroundColor: "white",

            borderRadius: 8,

            height: 16,
            width: 16,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 0.5,
            borderColor: "green",
          }}
        >
          <Text
            style={{
              fontSize: 7,
              fontFamily: Constants.Montserrat_Bold,
            }}
          >
            {props?.count}
          </Text>
        </View>
      )}

      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#97DA92", "#2FB8BB"]}
        style={styles.floatingActionStyle}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            this.onClickChatButton(props);
          }}
        >
          <Icon
            style={styles.FloatingButtonStyle}
            size={20}
            name="wechat"
            color={COLOR.WHITE}
          />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  floatingActionStyle: {
    //Here is the trick

    width: normalize(30),
    height: normalize(30),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: normalize(100),
  },
  FloatingButtonStyle: {
    resizeMode: "contain",

    borderRadius: normalize(100),
    //backgroundColor:'black'
  },
  notificationStyle: {
    flex: 1,
    height: normalize(16),
    width: normalize(16),
    position: "absolute",
    backgroundColor: COLOR.WHITE,
    borderRadius: normalize(100),
    justifyContent: "center",
    alignSelf: "flex-end",
    bottom: normalize(35),
  },
});

const mapStateToProps = (state) => {
  return {
    studentDetails: state.dashboard.current_selected_kid,
  };
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChatFloatingButton);
