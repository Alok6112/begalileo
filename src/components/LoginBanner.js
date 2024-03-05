import { StyleSheet, View, Text, Image, Keyboard } from "react-native";
import React, { Component } from "react";

import Styles, { COLOR, CommonStyles } from "../config/styles";
import { normalize } from "../components/helpers";
import {
  LOGO_BANNER_1,
  IC_BANNER_1,
  IC_BANNER_2,
  IC_BANNER_3,
  BANNER_1_1,
  BANNER_1_2,
} from "../assets/images";
import Dots from "react-native-dots-pagination";
import Swiper from "react-native-swiper";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../config/configs";

const headerText = [
  "Track your learning and see what’s in store!",
  "All play here - learning just happens!",
  "Develop logic, imagination & problem-solving",
];
const subHeaderText = [
  "Get a view of how you did, excite yourself with what’s coming and plan achievements",
  "Play with your friends, challenge yourself, Quiz your day...or just learn something new",
  "Apply what you learn to solve problems, mazimize your brain potential",
];
const colorBg = ["#FFDEDE", "#C0E5F5", "#C0F5EC"];

export default class LoginBanner extends React.Component {
  constructor() {
    super();

    // Define the initial state:
    this.state = {
      showImage: true,
    };
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    this.props.onKeyboardOpen(true);
    this.setState({
      showImage: false,
    });
  }

  _keyboardDidHide() {
    this.props.onKeyboardOpen(false);
    this.setState({
      showImage: true,
    });
  }

  headerItem = (
    <View style={styles.headerContianer}>
      <Text style={styles.headerTextItem}>
        Online classroom session {"\n"} with expert teachers.
      </Text>
      <Text style={styles.subHeaderTextItem}>
        Copy on Classroom session {"\n"} will come here.
      </Text>
    </View>
  );

  render() {
    return (
      <Swiper style={styles.wrapper} showsButtons={false}>
        <View
          style={[styles.subItemContianer, { backgroundColor: colorBg[0] }]}
        >
          <View style={styles.headerContianer}>
            <Text style={[CommonStyles.text_18_bold, styles.headerTextItem]}>
              {headerText[0]}
            </Text>
            <Text
              style={[CommonStyles.text_18_regular, styles.subHeaderTextItem]}
            >
              {subHeaderText[0]}
            </Text>
          </View>
          {this.state.showImage && (
            <View style={styles.image_container}>
              <Image
                style={[
                  styles.bg_image,
                  { borderBottomLeftRadius: 50, bottom: 20 },
                ]}
                source={BANNER_1_2}
              />
              <Image
                style={[
                  styles.bg_image,
                  {
                    bottom: -15,
                    borderBottomLeftRadius: 50,
                    borderBottomRightRadius: 100,
                  },
                ]}
                source={BANNER_1_1}
              />
              <Image style={[styles.logo_image]} source={IC_BANNER_1} />
            </View>
          )}
        </View>
        <View
          style={[styles.subItemContianer, { backgroundColor: colorBg[1] }]}
        >
          <View style={styles.headerContianer}>
            <Text
              style={[CommonStyles.text_18_semi_bold, styles.headerTextItem]}
            >
              {headerText[1]}
            </Text>
            <Text
              style={[CommonStyles.text_14_Regular, styles.subHeaderTextItem]}
            >
              {subHeaderText[1]}
            </Text>
          </View>
          {this.state.showImage && (
            <Image style={[styles.logo_image]} source={IC_BANNER_2} />
          )}
        </View>
        <View
          style={[styles.subItemContianer, { backgroundColor: colorBg[2] }]}
        >
          <View style={styles.headerContianer}>
            <Text
              style={[CommonStyles.text_18_semi_bold, styles.headerTextItem]}
            >
              {headerText[2]}
            </Text>
            <Text
              style={[CommonStyles.text_14_Regular, styles.subHeaderTextItem]}
            >
              {subHeaderText[2]}
            </Text>
          </View>
          {this.state.showImage && (
            <Image style={[styles.logo_image]} source={IC_BANNER_3} />
          )}
        </View>
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  itemContianer: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  subItemContianer: {
    flex: 1,
    margin: "2%",
    borderRadius: 30,
  },
  headerContianer: {
    flexDirection: "column",
    marginStart: 10,
    marginEnd: 10,
  },
  headerTextItem: {
    marginTop: 20,
    marginStart: 10,
    marginEnd: 50,
    //fontSize: normalize(15),
    fontWeight: "bold",
    color: COLOR.TEXT_COLOR_BLUE,
  },
  subHeaderTextItem: {
    // fontSize: normalize(12),
    marginTop: 10,
    marginStart: 10,
    marginEnd: 50,
    color: "#353639",
    opacity: 0.7,
  },
  logo_image: {
    position: "absolute",
    resizeMode: "contain",
    width: SCREEN_WIDTH / 2,
    height: SCREEN_HEIGHT / 5,
    bottom: 20,
    right: 20,
  },
  bg_image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 4,
    position: "absolute",
    resizeMode: "contain",

    overflow: "hidden",
  },

  image_container: {
    flex: 1,
    overflow: "hidden",
  },

  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
});
