import React, { useEffect } from "react";
import { useState, useImperativeHandle } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";

import { normalize } from "react-native-elements";

import { COLOR, CommonStyles } from "../../../../config/styles";
import { SvgXml } from "react-native-svg";
import { MuteButton } from "../../assets/Images/Navbar/MuteButton.svg";
import { UnMuteButton } from "../../assets/Images/Navbar/MuteUnmute.svg";
import { EndCall } from "../../assets/Images/Navbar/End-call.svg";
import { RaiseHand } from "../../assets/Images/Navbar/RaiseHandRequest.svg";

// import {
//   MuteButton,
//   UnMuteButton,
//   EndCall,
//   RaiseHand,
// } from "../../assets/Images/index.js";

import {
  IC_MIDAS_SELECTION,
  IC_STUDENT_END_MENU,
} from "../../../../assets/images";

const NavbarLiveClass = (
  {
    _onEndButtonPress,
    isAudioEnabled,
    _onMuteButtonPress,
    setAudioState,
    onCallTechSupport,
    raiseHand,
    currentScreenName,
  },
  ref
) => {
  const [show, setShow] = useState(false);
  const [isMuted, setIsMuted] = useState(isAudioEnabled);

  useEffect(() => {
    setIsMuted(isAudioEnabled);
  }, [isAudioEnabled]);

  useImperativeHandle(ref, () => ({
    _onMutefn() {
      _onMuteIcon();
    },
    _onUnMute() {
      _onUnMuteIcon();
    },
  }));

  const _onCallTechSupport = () => {
    onCallTechSupport();
  };

  const _onOpenEndButtonHower = () => {
    setShow(!show);
  };

  const _onEndClass = () => {
    _onEndButtonPress();
  };

  const _onRaiseHand = () => {
    raiseHand();
  };

  const _onMuteIcon = () => {
    setIsMuted(true);
    setAudioState(true);
    _onMuteButtonPress();
  };

  const _onUnMuteIcon = () => {
    setIsMuted(false);
    setAudioState(false);
    _onMuteButtonPress();
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.logoAndTutorName}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                height: normalize(40),
                margin: normalize(5),
                width: normalize(40),
                resizeMode: "stretch",
              }}
              source={IC_MIDAS_SELECTION}
            />
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={[
                  CommonStyles.text_12_bold,
                  {
                    textAlign: "center",
                    color: "#233584",
                  },
                ]}
              >
                Mr Coach
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: normalize(20),
              }}
            >
              <Text
                style={[
                  CommonStyles.text_12_bold,
                  {
                    textAlign: "center",
                    color: "#233584",
                  },
                ]}
              >
                {/* {console.log("Hello")} */}
                We are on : {currentScreenName || "MyScreen"}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.callTechSupportAndEndSessionButtons}>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <TouchableOpacity
                style={styles.optionButton}
                onPress={_onCallTechSupport}
              >
                <Text
                  style={[CommonStyles.text_12_bold, { textAlign: "center" }]}
                >
                  Call Tech Support
                </Text>
              </TouchableOpacity> */}
              <Pressable
                onPress={_onCallTechSupport}
                style={{
                  backgroundColor: COLOR.BLUE_LINk,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 10,
                  marginRight: 15,
                }}
              >
                <Text
                  style={[CommonStyles.text_14_bold, { color: COLOR.WHITE }]}
                >
                  Call Tech Support
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                position: "relative",
                zIndex: 1,
              }}
            >
              <TouchableOpacity
                style={styles.optionButton}
                onPress={_onOpenEndButtonHower}
              >
                <Image
                  style={{
                    height: normalize(25),
                    margin: normalize(5),
                    width: normalize(25),
                    resizeMode: "stretch",
                  }}
                  source={IC_STUDENT_END_MENU}
                />
              </TouchableOpacity>
              {show ? (
                <View style={styles.howerDivStyle}>
                  <TouchableOpacity onPress={_onEndClass}>
                    <SvgXml width="65" height="65" xml={EndCall} />
                  </TouchableOpacity>

                  {isMuted ? (
                    <View>
                      <TouchableOpacity onPress={_onUnMuteIcon}>
                        <SvgXml width="85" height="85" xml={UnMuteButton} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View>
                      <TouchableOpacity onPress={_onMuteIcon}>
                        <SvgXml width="85" height="85" xml={MuteButton} />
                      </TouchableOpacity>
                    </View>
                  )}
                  <TouchableOpacity onPress={_onRaiseHand}>
                    <SvgXml width="45" height="45" xml={RaiseHand} />
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.forwardRef(NavbarLiveClass);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  navbar: {
    height: 80,
    borderWidth: 1,
    borderColor: COLOR.LIGHT_BORDER_COLOR,
    borderRadius: 20,
    flexDirection: "row",
    marginLeft: 5,
    marginBottom: 5,
  },
  logoAndTutorName: {
    flex: 2.7,
    justifyContent: "center",
  },

  callTechSupportAndEndSessionButtons: {
    flex: 1.3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  howerDivStyle: {
    position: "absolute",
    backgroundColor: "black",
    height: 200,
    width: 90,
    top: 50,
    left: -25,
    borderRadius: 20,
    textAlign: "center",
    backgroundColor: COLOR.WHITE,
    borderColor: COLOR.LIGHT_BORDER_COLOR,
    padding: 15,
    borderWidth: 1,
    zIndex: 999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
