import React from "react";

import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { normalize } from "react-native-elements";
import { WebView } from "react-native-webview";
import { COLOR, CommonStyles } from "../../config/styles";

export default function TrainingImagesComp({ data }) {
  console.log("data image", data);
  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        {data?.length == 0 ? (
          <View>
            <Text style={[CommonStyles.text_12_bold, { textAlign: "center" }]}>
              No Images Found at the moment
            </Text>
          </View>
        ) : (
          <View style={styles.imagesMainContainer}>
            {data?.map((item) => {
              return (
                <Image
                  style={styles.imagesGrid}
                  source={{ uri: item.url }}
                ></Image>
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imagesGrid: {
    width: "95%",
    height: 400,
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 2,
    borderRadius: 10,
    marginTop: normalize(5),
  },

  imagesMainContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: normalize(5),
  },
});
