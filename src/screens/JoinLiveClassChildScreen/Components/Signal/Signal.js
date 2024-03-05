import { FlatList, StyleSheet, View, Text } from "react-native";

import { useState, useEffect } from "react";

import React from "react";

function Signal({ signalLevel }) {
  const [networkStrength, setNetWorkStrength] = useState(2);

  const [third, setThird] = useState(false);
  const [fourth, setFourth] = useState(false);
  const [fifth, setFifth] = useState(false);

  useEffect(() => {
    const expr = signalLevel;
    switch (expr) {
      case 1:
        setNetWorkStrength(1);
        setThird(false);
        setFourth(false);
        setFifth(false);
        break;
      case 2:
        setNetWorkStrength(2);
        setThird(false);
        setFourth(false);
        setFifth(false);
        break;
      case 3:
        setNetWorkStrength(3);
        setThird(true);
        setFourth(false);
        setFifth(false);
        break;
      case 4:
        setNetWorkStrength(4);
        setThird(true);
        setFourth(true);
        setFifth(false);
        break;
      case 5:
        setNetWorkStrength(5);
        setThird(true);
        setFourth(true);
        setFifth(true);
        break;
      default:
        console.log(`Sorry, we are out of ${expr}.`);
    }

    console.log("jhasjhasjkhsajhsajahsjashjashj");
  }, [signalLevel]);

  return (
    <View style={styles.bars}>
      <View style={styles.networkBar1}></View>
      <View style={styles.networkBar2}></View>
      <View
        style={[
          styles.networkBar3,
          { backgroundColor: third ? "#233584" : "#cccccc" },
        ]}
      ></View>
      <View
        style={[
          styles.networkBar4,
          {
            backgroundColor: fourth ? "#233584" : "#cccccc",
          },
        ]}
      ></View>
      <View
        style={[
          styles.networkBar5,
          {
            backgroundColor: fifth ? "#233584" : "#cccccc",
          },
        ]}
      ></View>
    </View>
  );
}

export default Signal;

const styles = StyleSheet.create({
  bars: {
    width: 100,
    height: 40,
    marginRight: 2,
    marginBottom: 0,
    marginTop: 0,
    borderWidth: 1,
    position: "relative",

    flexDirection: "row",
  },

  networkBar1: {
    width: 5,
    height: 10,
    borderWidth: 1,
    marginLeft: 1,
    bottom: 0,
    position: "absolute",
    backgroundColor: "#233584",
  },
  networkBar2: {
    width: 5,
    height: 13,
    borderWidth: 1,
    marginLeft: 9,
    bottom: 0,
    position: "absolute",
    backgroundColor: "#233584",
  },
  networkBar3: {
    width: 5,
    height: 16,
    borderWidth: 1,
    marginLeft: 17,
    bottom: 0,
    position: "absolute",
  },
  networkBar4: {
    width: 5,
    height: 19,
    borderWidth: 1,
    marginLeft: 25,
    bottom: 0,
    position: "absolute",
  },
  networkBar5: {
    width: 5,
    height: 22,
    borderWidth: 1,
    marginLeft: 33,
    bottom: 0,
    position: "absolute",
  },
});

//#233584
