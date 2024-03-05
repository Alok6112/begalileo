import React, { useEffect, useState } from "react";

import { View, Text, Pressable, ScrollView } from "react-native";

import Pdf from "react-native-pdf";

import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../config/configs";

import { COLOR, CommonStyles, cardBoxShadowStyle } from "../../config/styles";

import { normalize } from "react-native-elements";

function TrainingPdfsComp({ data }) {
  const [pdfCount, setPdfCount] = useState(0);
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    setPdfUrl(data[pdfCount]);
  }, [pdfCount]);

  const updatePdfCount = () => {
    setPdfCount(pdfCount + 1);
    console.log("I am clicked");
  };

  const decreamentPdfCount = () => {
    if (pdfCount == 0) {
      return;
    } else {
      setPdfCount(pdfCount - 1);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data?.length == 0 ? (
            <View>
              <Text
                style={[CommonStyles.text_12_bold, { textAlign: "center" }]}
              >
                No Pdfs found at the moment
              </Text>
            </View>
          ) : pdfUrl != "" ? (
            <>
              <View>
                <Pdf
                  trustAllCerts={false}
                  source={{
                    uri: pdfUrl,
                    cache: true,
                  }}
                  onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                  }}
                  onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                  }}
                  onError={(error) => {
                    console.log(error);
                  }}
                  onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                  }}
                  style={{
                    width: SCREEN_WIDTH,
                    height: SCREEN_HEIGHT,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </View>
              <View
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: 250,
                  flexDirection: "row",
                  marginTop: normalize(10),
                  bottom: 200,
                  position: "absolute",
                }}
              >
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: COLOR.COMPLETED_GREEN,
                    borderRadius: 10,
                    backgroundColor: COLOR.BG_PURPLE,
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
            </>
          ) : (
            <View></View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

export default TrainingPdfsComp;
