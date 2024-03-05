import { View, Text, StyleSheet, Button, Image } from "react-native";
import React, { useEffect, useState } from "react";

import AffirmationCheckInFirst from "./AffirmationCheckIn/AffirmationCheckInFirst";
import AffirmationCheckOutFirst from "./AffirmationCheckOut/AffirmationCheckOutFirst";

import { CommonStyles } from "../../../../../config/styles";

export default function AffirmationActivityMain({
  identity,
  selectedCheckInFeeling,
  checkInActivityId,
  isCheckInActivity,
  apiData,
  liveClassId,
  studentId,
  sendRemoteWhiteboardActivity,
  showAffirmationStories,
  whiteboardPoints,
  renderShapeChallenge,
  sendAffirmationIndex,
  affirmationStoryIndex,
  checkOutAffirmationNextBtn,
  isAudioEnabled,
  affirmationPagePreviewImage,
  endActivity,
}) {
  return (
    <View style={{ backgroundColor: "#FFDD63" }}>
      <Text
        style={[
          CommonStyles.text_12_bold,
          { color: "indigo", marginLeft: 10, marginTop: 5 },
        ]}
      >
        Activity: Affirmation Activity
      </Text>
      <View
        style={{
          backgroundColor: "white",
          marginTop: 20,
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 20,
        }}
      >
        {isCheckInActivity ? (
          <AffirmationCheckInFirst
            identity={identity}
            selectedCheckInFeeling={selectedCheckInFeeling}
            checkInActivityId={checkInActivityId}
            isCheckInActivity={isCheckInActivity}
            apiData={apiData}
            liveClassId={liveClassId}
            studentId={studentId}
            showAffirmationStories={showAffirmationStories}
            renderShapeChallenge={renderShapeChallenge}
            sendAffirmationIndex={sendAffirmationIndex}
            affirmationStoryIndex={affirmationStoryIndex}
            affirmationPagePreviewImage={affirmationPagePreviewImage}
            endActivity={endActivity}
          />
        ) : (
          <AffirmationCheckOutFirst
            identity={identity}
            selectedCheckInFeeling={selectedCheckInFeeling}
            checkInActivityId={checkInActivityId}
            isCheckInActivity={isCheckInActivity}
            apiData={apiData}
            liveClassId={liveClassId}
            studentId={studentId}
            showAffirmationStories={showAffirmationStories}
            renderShapeChallenge={renderShapeChallenge}
            checkOutAffirmationNextBtn={checkOutAffirmationNextBtn}
            isAudioEnabled={isAudioEnabled}
            affirmationPagePreviewImage={affirmationPagePreviewImage}
            endActivity={endActivity}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
