import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";

import { useState, useEffect } from "react";
import { BASE_URL } from "../../../../config/configs";

import ShapeChallengeMain from "./ShapChallengeActivity/ShapeChallengeMain";

import FeelingChartMain from "./FeelingChartActivity/FeelingChartMain";

import AffirmationActivityMain from "./AffirmationActivity/AffirmationActivityMain";

import { COLOR, CommonStyles } from "../../../../config/styles";
import { ActivityIndicator } from "react-native-paper";

import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../config/configs";

export default function MainActivity(props) {
  let {
    identity,
    isCheckInActivity,
    showActivityNotification,
    type,
    liveClassId,
    studentId,
    onsendStudentImageIndex,
    showAffirmationStories,
    sendRemoteWhiteboardActivity,
    shapeActivityTutorWhiteboardPoint,
    renderShapeChallenge,
    sendAffirmationIndex,
    affirmationStoryIndex,
    checkOutAffirmationNextBtn,
    isAudioEnabled,
    sendShapeChallengeImage,
    teacherActivityResponseSave,
    affirmationPagePreviewImage,
    endActivity,
    cicoApiData,
  } = props;

  const [apiData, setApiData] = useState({});
  const [loading, setLoading] = useState(false);
  const [checkInActivityId, setCheckinActivityId] = useState("");
  const [selectedCheckInFeeling, setSelectedCheckInFeeling] = useState({});

  const activityList = {
    Shape: (
      <ShapeChallengeMain
        identity={identity}
        isCheckInActivity={isCheckInActivity}
        notification={showActivityNotification}
        apiData={apiData}
        liveClassId={liveClassId}
        studentId={studentId}
        sendRemoteWhiteboardActivity={sendRemoteWhiteboardActivity}
        showAffirmationStories={showAffirmationStories}
        whiteboardPoints={shapeActivityTutorWhiteboardPoint}
        renderShapeChallenge={renderShapeChallenge}
        checkInActivityId={checkInActivityId}
        sendShapeChallengeImage={sendShapeChallengeImage}
        teacherActivityResponseSave={teacherActivityResponseSave}
        endActivity={endActivity}
      />
    ),
    Affirmation: (
      <AffirmationActivityMain
        identity={identity}
        isCheckInActivity={isCheckInActivity}
        notification={showActivityNotification}
        apiData={apiData}
        liveClassId={liveClassId}
        studentId={studentId}
        sendRemoteWhiteboardActivity={sendRemoteWhiteboardActivity}
        showAffirmationStories={showAffirmationStories}
        whiteboardPoints={shapeActivityTutorWhiteboardPoint}
        renderShapeChallenge={renderShapeChallenge}
        checkInActivityId={checkInActivityId}
        sendAffirmationIndex={sendAffirmationIndex}
        affirmationStoryIndex={affirmationStoryIndex}
        checkOutAffirmationNextBtn={checkOutAffirmationNextBtn}
        isAudioEnabled={isAudioEnabled}
        affirmationPagePreviewImage={affirmationPagePreviewImage}
        endActivity={endActivity}
      />
    ),
    Feeling: (
      <FeelingChartMain
        identity={identity}
        selectedCheckInFeeling={selectedCheckInFeeling}
        checkInActivityId={checkInActivityId}
        isCheckInActivity={isCheckInActivity}
        apiData={apiData}
        liveClassId={liveClassId}
        studentId={studentId}
        onsendStudentImageIndex={onsendStudentImageIndex}
        selectedCheckInFeelingData={selectedCheckInFeeling}
        showAffirmationStories={showAffirmationStories}
        endActivity={endActivity}
      />
    ),
  };

  useEffect(() => {
    fetchActivityApi();

    return () => {};
  }, []);

  const studentCheckInGetData = async (studentId, liveClassId) => {
    // let url = "http://localhost:5555/check-in";
    let url = `${BASE_URL}/live_class_checkinout_activities/checkin_activity?student_id=${studentId}&live_class_id=${liveClassId}`;

    const response = await fetch(url).catch((ae) => {});

    const json = await response.json();

    if (json != undefined) {
      return json;
    }
  };

  const studentCheckOutGetData = async () => {
    let url = `${BASE_URL}/live_class_checkinout_activities/checkout_activity?student_id=${studentId}&live_class_id=${liveClassId}`;
    // let url = "http://localhost:5555/check-out";
    const response = await fetch(url).catch((ae) => {});

    const json = await response.json();

    if (json != undefined) {
      return json;
    }
  };

  const fetchCheckoutApiData = async (liveClassID, student_id) => {
    try {
      setLoading(true);

      const data = cicoApiData;
      if (data?.status) {
        console.log("data", data);

        setLoading(false);
        setCheckinActivityId(data?.activity_id);
        setSelectedCheckInFeeling(data?.student_activity_data[0] || {});
        setApiData(data);
      } else {
        console.log("data status", data);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const fetchActivityApi = async () => {
    try {
      setLoading(true);

      if (!isCheckInActivity) {
        let student_id = studentId;
        let liveClassID = liveClassId;
        fetchCheckoutApiData(liveClassID, student_id);
        return;
      } else {
        let student_id = studentId;
        let liveClassID = liveClassId;

        const data = cicoApiData;

        if (data?.status) {
          setLoading(false);
          setCheckinActivityId(data?.activity_id);
          setApiData(data);
          // setError(false);
        } else {
          setLoading(false);

          // setError(true);
        }
      }
    } catch (e) {
      setLoading(false);
      //setNoStudentFound(false);
      //setError(true);
    }
  };

  return (
    <View style={styles.mainOuterBox}>
      {loading && (
        <ActivityIndicator
          style={{
            position: "absolute",
            top: SCREEN_HEIGHT / 2.5,
            left: SCREEN_WIDTH / 2.2,
          }}
          size="large"
        />
      )}

      {!loading && activityList[apiData?.name]}
    </View>
  );
}

const styles = StyleSheet.create({
  mainOuterBox: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
  },
});
