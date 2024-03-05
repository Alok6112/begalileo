import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";
import CorrectSvg from "../../assets/Images/Speedmath/Correct.svg";

const ComputerGame = ({ computerScore }) => {
  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    setCompletionPercentage(Math.floor((computerScore / 50) * 100));
  }, [computerScore]);

  return (
    <React.Fragment>
      <View
        style={{
          width: completionPercentage,
          borderRadius: 50,
          backgroundColor: "#50CA95",
          position: "absolute",
          height: 52,
          marginLeft: 5,
        }}
      ></View>
      <View>
        <SvgXml width="30" height="30" xml={CorrectSvg} />
      </View>
      <View>
        <Text
          style={{
            alignItems: "center",
            justifyContent: "flex-start",

            color: "#233584",
            fontWeight: "600",
          }}
        >
          Computer
        </Text>
      </View>
      <View>
        <Text
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",

            color: "#233584",

            fontWeight: "bold",
          }}
        >
          {computerScore}
        </Text>
      </View>
    </React.Fragment>
  );
};

export default ComputerGame;
