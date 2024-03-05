import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { normalize } from "react-native-elements";

import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo,
} from "react-native-twilio-video-webrtc";

export default function TeacherScreenShareView({ screenShareTracks }) {
  return (
    <View style={styles.container}>
      {Array.from(screenShareTracks, ([trackSid, trackIdentifier]) => {
        let identity = screenShareTracks.get(trackSid).participantIdentity;

        return identity == "tutor" ? (
          <View>
            <TwilioVideoParticipantView
              style={[
                styles.remoteVideoForAllScreen,
                {
                  width: 800,
                  height: 600,
                },
              ]}
              key={trackSid}
              trackIdentifier={trackIdentifier}
            />
          </View>
        ) : null;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    width: 800,
    height: 600,
    zIndex: 99,
    left: 100,
    top: 70,
    borderRadius: 10,
  },

  remoteVideoForAllScreen: {
    display: "flex",
    overflow: "hidden",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
    borderRadius: 20,
    marginBottom: normalize(5),
  },
});
