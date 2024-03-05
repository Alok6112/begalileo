import React from "react";
import { Text, View } from "react-native";

const InCorrectBox = () => {
  return (
    <View
      style={{
        borderWidth: 1,
        height: 50,
        width: 200,
        display: "flex",
        justifyContent: "center",
        borderRadius: 7,
        alignItems: "center",
        marginLeft: 10,
        backgroundColor: "#fae0e0",
      }}
    >
      <Text style={{ color: "#eb5953" }}>Incorrect Answer</Text>
    </View>
  );
};

export default InCorrectBox;
