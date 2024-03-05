import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { normalize } from "react-native-elements";

export default function FeelingCheckInLast({ selectedGif }) {
  return (
    <View style={styles.mainContainer}>
      <Image
        style={styles.imageContainer}
        source={{ uri: selectedGif }}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "95%",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    margin: "auto",
    marginLeft: normalize(10),
  },

  imageContainer: {
    width: 300,
    height: 300,
    justifyContent: "center",
  },
});
