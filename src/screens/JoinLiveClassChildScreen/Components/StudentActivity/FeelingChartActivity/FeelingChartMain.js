import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import FeelingCheckInFirst from "./FeelingCheckIn/FeelingCheckInFirst";
import FeelingCheckOutFirst from "./FeelingCheckOut/FeelingCheckOutFirst";
import { normalize } from "react-native-elements";
import { CommonStyles } from "../../../../../config/styles";

export default function FeelingChartMain({
  identity,
  selectedCheckInFeeling,
  checkInActivityId,
  isCheckInActivity,
  apiData,
  liveClassId,
  studentId,
  onsendStudentImageIndex,
  selectedCheckInFeelingData,
  showAffirmationStories,
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
        Activity: Feeling Chart
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
          <FeelingCheckInFirst
            identity={identity}
            selectedCheckInFeeling={selectedCheckInFeeling}
            checkInActivityId={checkInActivityId}
            isCheckInActivity={isCheckInActivity}
            apiData={apiData}
            liveClassId={liveClassId}
            studentId={studentId}
            onsendStudentImageIndex={onsendStudentImageIndex}
            endActivity={endActivity}
          />
        ) : (
          <FeelingCheckOutFirst
            identity={identity}
            selectedCheckInFeeling={selectedCheckInFeeling}
            checkInActivityId={checkInActivityId}
            isCheckInActivity={isCheckInActivity}
            apiData={apiData}
            liveClassId={liveClassId}
            studentId={studentId}
            onsendStudentImageIndex={onsendStudentImageIndex}
            selectedCheckInFeelingData={selectedCheckInFeelingData}
            showAffirmationStories={showAffirmationStories}
            endActivity={endActivity}
          />
        )}
      </View>
    </View>
  );
}
