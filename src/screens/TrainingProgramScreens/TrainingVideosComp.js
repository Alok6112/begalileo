import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";

import Video from "react-native-video";

import { normalize } from "react-native-elements";

import { COLOR, CommonStyles } from "../../config/styles";

export default function TrainingVideosComp({ data }) {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        {data?.length == 0 ? (
          <View>
            <Text style={[CommonStyles.text_12_bold, { textAlign: "center" }]}>
              No Videos Found at the moment
            </Text>
          </View>
        ) : (
          <View style={styles.videosMainContainer}>
            {data?.map((item) => {
              return (
                <Video
                  style={styles.videosGrid}
                  source={{ uri: item.url }}
                  controls
                  paused={true}
                ></Video>
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  videosGrid: {
    width: "95%",
    height: 300,
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 2,
    borderRadius: 10,
    marginTop: normalize(5),
    backgroundColor: "white",
  },

  videosMainContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: normalize(5),
  },
});
