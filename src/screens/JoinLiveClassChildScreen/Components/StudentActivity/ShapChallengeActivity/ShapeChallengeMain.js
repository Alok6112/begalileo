import { View, Text } from "react-native";
import React from "react";

import ShapeChekInFirst from "./ShapeChallengeCheckIn/ShapeChekInFirst";

import ShapeCheckOutFirst from "./ShapeChallengeCheckOut/ShapeCheckOutFirst";

import { CommonStyles } from "../../../../../config/styles";

export default function ShapeChallengeMain({
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
  sendShapeChallengeImage,
  teacherActivityResponseSave,
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
        Activity: Shape Challenge
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
          <ShapeChekInFirst
            identity={identity}
            selectedCheckInFeeling={selectedCheckInFeeling}
            checkInActivityId={checkInActivityId}
            isCheckInActivity={isCheckInActivity}
            apiData={apiData}
            liveClassId={liveClassId}
            studentId={studentId}
            sendRemoteWhiteboardActivity={sendRemoteWhiteboardActivity}
            showAffirmationStories={showAffirmationStories}
            whiteboardPoints={whiteboardPoints}
            renderShapeChallenge={renderShapeChallenge}
            sendShapeChallengeImage={sendShapeChallengeImage}
            teacherActivityResponseSave={teacherActivityResponseSave}
            endActivity={endActivity}
          />
        ) : (
          <ShapeCheckOutFirst
            identity={identity}
            selectedCheckInFeeling={selectedCheckInFeeling}
            checkInActivityId={checkInActivityId}
            isCheckInActivity={isCheckInActivity}
            apiData={apiData}
            liveClassId={liveClassId}
            studentId={studentId}
            sendRemoteWhiteboardActivity={sendRemoteWhiteboardActivity}
            showAffirmationStories={showAffirmationStories}
            whiteboardPoints={whiteboardPoints}
            renderShapeChallenge={renderShapeChallenge}
            teacherActivityResponseSave={teacherActivityResponseSave}
            endActivity={endActivity}
          />
        )}
      </View>
    </View>
  );
}
