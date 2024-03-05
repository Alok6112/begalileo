import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

import { normalize } from "react-native-elements";

import close2 from "../../../../assets/Images/Closedicon/close2.png";

export default function AffirmationMiddleScreen({ selectedImage }) {
  return (
    <>
      <View style={styles.mainContainer}>
        <Image
          style={{ width: 300, height: 300 }}
          source={{ uri: selectedImage }}
        ></Image>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 10,
    width: "100%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    margin: "auto",
    marginLeft: normalize(10),
    flexDirection: "column",
    flex: 1,
    position: "relative",
  },

  imagestyle2: {
    height: 50,
    width: 75,
    position: "absolute",
    top: 0,
    right: 0,
  },
});
