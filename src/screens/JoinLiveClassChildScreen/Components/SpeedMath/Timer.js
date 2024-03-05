import React, { useState, useEffect } from "react";

import { View, Text, StyleSheet } from "react-native";

import { COLOR, CommonStyles } from "../../../../config/styles";
import { normalize } from "react-native-elements";

function Timer({ callBack }) {
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      callBack();
    }
  }, [counter]);

  return (
    <React.Fragment>
      <View style={[styles.container, { left: normalize(60) }]}>
        <Text style={[CommonStyles.text_18_bold]}>0{counter}</Text>
        <Text
          style={[
            CommonStyles.text_18_semi_bold,
            {
              marginTop: normalize(30),
              marginRight: 10,
              width: "100%",
            },
          ]}
        >
          You have 60 sec to answer as many question as you can.{"\n"} Dont miss
          the chance to get ahead of your teacher
          {/* <img
            style={{
              width: "30px",
              height: "30px",
              marginLeft: "6px",
              marginBottom: "4px",
            }}
            src={happyChild}
          ></img> */}
        </Text>
      </View>
    </React.Fragment>
  );
}

export default Timer;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    top: 30,
    left: normalize(150),
  },
});
