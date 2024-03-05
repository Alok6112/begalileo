import React, { useState } from "react";
import { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import CustomBackButton from "../../../../components/CustomBackButton";
import WebView from "react-native-webview";

import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../config/configs";
function ScratchWebView(props) {
  const [projectLink, setLink] = useState("");
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    let link = props?.navigation?.getParam("link", null);

    if (link != undefined) {
      setLink(link);
    }
  }, []);

  console.log("Project link check", projectLink);

  const onPressBack = () => {
    const { goBack } = props.navigation;
    console.log("Go Back From Renew");
    goBack();
  };

  const hideSpinner = () => {
    setVisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <CustomBackButton onPress={onPressBack} />
      </View>
      <View style={{ flex: 1 }}>
        <WebView
          onLoad={() => hideSpinner()}
          originWhitelist={["*"]}
          source={{ uri: projectLink }}
          containerStyle={{ alignContent: "center" }}
        />
        {visible && (
          <ActivityIndicator
            style={{
              position: "absolute",
              top: SCREEN_HEIGHT / 2.5,
              left: SCREEN_WIDTH / 2.2,
            }}
            size="large"
          />
        )}
      </View>
    </View>
  );
}

export default ScratchWebView;
