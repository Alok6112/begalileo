import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useState, useEffect } from "react";

import { normalize } from "react-native-elements";

import { BASE_URL } from "../../../../../../config/configs";

import axios from "axios";

import ShapeChallengeWhiteboard from "../ShapeWhiteboard/ShapeWhiteboard";

import CharacterGif from "../../../../assets/Images/GifImages/character.gif";

export default function ShapeCheckOutFirst({
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
  teacherActivityResponseSave,
  endActivity,
}) {
  const [shapesDraw, setShapesDraw] = useState([]);

  const [checkInResponse, setCheckInResponse] = useState("");

  const [checkOutTeacherResponse, setCheckOutTeacherResponse] = useState("");

  useEffect(() => {
    fetchRespones();
  }, [teacherActivityResponseSave]);

  useEffect(() => {
    if (!isCheckInActivity) {
      fetchRespones();
    }
  }, []);

  const getStudentActivityResponse = async (studentId, liveClassId) => {
    let url = `${BASE_URL}/live_class_checkinout_activities/checkin_out_activity_responses?student_id=${studentId}&live_class_id=${liveClassId}`;
    //let url = "http://localhost:5555/response-data";

    const response = await fetch(url).catch((ae) => {});

    const json = await response.json();

    if (json != undefined) {
      return json;
    }
  };

  const fetchRespones = async () => {
    //setIsLoading(true);
    try {
      let student_id = studentId;
      let liveClassID = liveClassId;

      let data = await getStudentActivityResponse(student_id, liveClassID);

      console.log("Data", JSON.stringify(data));

      if (data?.status) {
        let checkInResponse = data?.checkin_responses?.student;
        let checkOutResponseTeacher = data?.checkout_responses?.teacher;

        let studentResponse = checkInResponse[0]?.response;
        let teacherResponse = checkOutResponseTeacher[0]?.response;

        if (studentResponse != "") {
          let finalStudentResponse = BASE_URL + studentResponse;
          setCheckInResponse(finalStudentResponse);
        }

        if (teacherResponse != "") {
          let finalTeacherResponse = BASE_URL + teacherResponse;
          setCheckOutTeacherResponse(finalTeacherResponse);
        }

        //setIsLoading(false);
      }
    } catch (e) {}
  };
  useEffect(() => {
    let activityData = apiData?.activity_data || [];
    let temp = [];
    activityData?.forEach((item) => {
      let count = item?.count || 0;
      let name = item?.name || "";
      for (let i = 0; i < count; i++) {
        let obj = {
          name,
          path: item?.image || "",
        };
        temp.push(obj);
      }
    });
    setShapesDraw([...temp]);
  }, []);

  return (
    <View style={styles.mainContainer}>
      {checkInResponse != "" && !showAffirmationStories ? (
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
          }}
        >
          <Image
            style={{ width: 650, height: 500 }}
            source={{ uri: checkInResponse }}
          />
        </View>
      ) : checkInResponse != "" &&
        checkOutTeacherResponse == "" &&
        showAffirmationStories &&
        !teacherActivityResponseSave ? (
        <View style={{ marginTop: normalize(80), marginLeft: normalize(20) }}>
          <ShapeChallengeWhiteboard
            shapesDraw={shapesDraw}
            sendRemoteWhiteboardActivity={sendRemoteWhiteboardActivity}
            whiteboardPoints={whiteboardPoints}
            renderShapeChallenge={renderShapeChallenge}
            notWrite={false}
          />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 300, height: 230 }}
            source={{ uri: checkInResponse }}
          />
          <Image
            style={{ width: 300, height: 230, marginLeft: normalize(10) }}
            source={{ uri: checkOutTeacherResponse }}
          />

          <View style={{ position: "absolute", bottom: 0 }}>
            <Image
              style={{ width: 400, height: 200, bottom: 0 }}
              source={CharacterGif}
            ></Image>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "95%",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    margin: "auto",
    marginLeft: normalize(10),
  },
});
