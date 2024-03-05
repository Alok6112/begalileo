import React from "react";

import { View, Text } from "react-native";

import WebView from "react-native-webview";

function Coding(props) {

  console.log("props coding url", props?.codeFrameUrl)
  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        source={{ uri: props?.codeFrameUrl }}
        containerStyle={{ alignContent: "center" }}
      />
    </View>
  );
}

export default Coding;
