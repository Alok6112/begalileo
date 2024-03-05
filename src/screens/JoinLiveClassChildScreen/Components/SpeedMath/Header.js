import React from "react";

import { SvgXml } from "react-native-svg";
import { View, Text, ImageBackground, StyleSheet, Image } from "react-native";
import SpeedMathLevelImage from "../../assets/Images/Speedmath/SM-Level-Yellow.svg";
import { COLOR, CommonStyles } from "../../../../config/styles";
import levelbg from "../../assets/Images/Speedmath/SM-Level.svg";
import modebg from "../../assets/Images/Speedmath/SM-Play-mode.svg";

const Header = ({ mode, level }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerOther}>
        <SvgXml width="50" height="50" xml={SpeedMathLevelImage} />
        <Text
          style={[
            CommonStyles.text_14_bold,
            { position: "absolute", top: 12, left: 20, color: "coral" },
          ]}
        >
          {level - 1}
        </Text>
      </View>

      <View style={styles.leveltext}>
        <SvgXml xml={levelbg} />
        <Text
          style={[
            CommonStyles.text_14_bold,
            { position: "absolute", color: "white" },
          ]}
        >
          Level
          {/* Level {level - 1} */}
        </Text>
      </View>

      <View style={styles.playMode}>
        <SvgXml xml={modebg} />
        <Text
          style={[
            CommonStyles.text_14_bold,
            { position: "absolute", color: "white" },
          ]}
        >
          Play mode - With {mode == "globe" ? "Friends" : mode}
        </Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
  },

  containerOther: {
    marginLeft: 10,
  },

  leveltext: {
    marginLeft: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 55,
    justifyContent: "center",
    alignItems: "center",
  },

  playMode: {
    width: 300,
    marginLeft: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
