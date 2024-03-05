import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";

// import FlipPage from "react-native-flip-page";
// import FlipPagePage from "react-native-flip-page";

export default function AffirmationStories({
  storyBook,
  affirmationStoryIndex,
}) {
  let arr = storyBook;

  return (
    <View>
      <Image
        style={{
          height: 650,
          width: 700,
          resizeMode: "contain",
        }}
        source={{ uri: arr[affirmationStoryIndex]?.story }}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({});
