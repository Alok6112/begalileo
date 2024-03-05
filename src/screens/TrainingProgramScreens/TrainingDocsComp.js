import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React from "react";

import { useState, useEffect } from "react";

import { WebView } from "react-native-webview";

import { COLOR, CommonStyles } from "../../config/styles";

import { normalize } from "react-native-elements";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../config/configs";

export default function TrainingDocsComp({ data }) {
  const [docsCount, setDocsCount] = useState(0);

  const [docsUrl, setDocsUrl] = useState("");

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let id = setTimeout(() => {
      setDocsUrl(data[docsCount]);
      clearTimeout(id);
    }, 1000);
  }, [docsCount]);

  const updatePdfCount = () => {
    setDocsCount(docsCount + 1);
    console.log("I am clicked");
  };

  const decreamentPdfCount = () => {
    if (docsCount == 0) {
      return;
    } else {
      setDocsCount(docsCount - 1);
    }
  };

  const hideSpinner = () => {
    setVisible(false);
  };

  console.log("docsUrl", docsUrl);

  return (
    <View>
      {data?.length == 0 ? (
        <View>
          <Text style={[CommonStyles.text_12_bold, { textAlign: "center" }]}>
            No Docs are present at the moment
          </Text>
        </View>
      ) : docsUrl != null && docsUrl != "" ? (
        <>
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ height: 650 }}>
              <WebView
                onLoad={() => hideSpinner()}
                originWhitelist={["*"]}
                source={{
                  uri: `https://docs.google.com/viewer?url=${docsUrl}&embedded=true#toolbar=0`,
                }}
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

            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: 250,
                flexDirection: "row",
                marginTop: normalize(10),
                marginLeft: normalize(50),
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderColor: COLOR.COMPLETED_GREEN,
                  borderRadius: 10,
                  backgroundColor: COLOR.BG_PURPLE,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Pressable
                  style={{
                    width: 100,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => decreamentPdfCount()}
                >
                  <Text style={[CommonStyles.text_12_bold]}>Previous</Text>
                </Pressable>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: COLOR.COMPLETED_GREEN,
                  borderRadius: 10,
                  backgroundColor: COLOR.BG_PURPLE,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Pressable
                  style={{
                    width: 100,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => updatePdfCount()}
                >
                  <Text style={[CommonStyles.text_12_bold]}>Next</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </>
      ) : (
        <View></View>
      )}
    </View>
  );
}
