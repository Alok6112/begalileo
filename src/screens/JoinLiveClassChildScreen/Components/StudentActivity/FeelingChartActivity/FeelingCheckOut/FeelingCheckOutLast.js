import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

import { normalize } from "react-native-elements";

export default function FeelingCheckOutLast({ selectedGif, checkInresponse }) {
  return (
    <View style={styles.mainContainer}>
      {checkInresponse != "" && checkInresponse != undefined && (
        <Image
          style={styles.imageContainer}
          source={{ uri: checkInresponse }}
        ></Image>
      )}
      {selectedGif != "" && selectedGif != undefined && (
        <Image
          style={styles.imageContainer}
          source={{ uri: selectedGif }}
        ></Image>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "95%",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
    margin: "auto",
    marginLeft: normalize(10),
    flexDirection: "row",
  },

  imageContainer: {
    width: 300,
    height: 300,
    justifyContent: "center",
  },
});
