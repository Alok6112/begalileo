import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
} from "react-native";
import React from "react";

import b64toBlob from "./base64toBlob";

import { useEffect, useState, useRef } from "react";
import ViewShot from "react-native-view-shot";

import { BASE_URL } from "../../../../../../config/configs";

import axios from "axios";

import { normalize } from "react-native-elements";

import ShapeChallengeWhiteboard from "../ShapeWhiteboard/ShapeWhiteboard";
import { CommonStyles } from "../../../../../../config/styles";

import close1 from "../../../../assets/Images/Closedicon/close1.png";
import close2 from "../../../../assets/Images/Closedicon/close2.png";

import CompletedGif from "../../../../assets/Images/GifImages/ms.gif";
import CelebrationGif from "../../../../assets/Images/GifImages/celebration.gif";

export default function ShapeChekInFirst({
  identity,
  selectedCheckInFeeling,
  checkInActivityId,
  isCheckInActivity,
  apiData,
  liveClassId,
  studentId,
  sendRemoteWhiteboardActivity,
  sendShapeChallengeImage,
  endActivity,
}) {
  const ref = useRef();
  const [shapesDraw, setShapesDraw] = useState([]);
  const [isStudentResponseCaptured, setIsStudentResponseCaptured] =
    useState(false);

  const [checkInResponse, setCheckInResponse] = useState("");
  const [data, setData] = useState("");

  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);
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

  useEffect(() => {
    fetchRespones();
  }, []);

  useEffect(() => {
    if (!isCheckInActivity) {
      fetchRespones();
    }
  }, []);

  useEffect(() => {
    if (endActivity) {
      takeScreenShot();
    }
  }, [endActivity]);

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

      if (data?.status) {
        let checkInResponse = data?.checkin_responses?.student;

        let studentResponse = checkInResponse[0]?.response;

        console.log("CheckInResponse", studentResponse);
        if (studentResponse != "") {
          let finalStudentResponse = BASE_URL + studentResponse;
          setCheckInResponse(finalStudentResponse);
        }

        //setIsLoading(false);
      }
    } catch (e) {}
  };

  const StudentActivityResponseSave = async (data) => {
    let config = {
      method: "post",
      url: `${BASE_URL}/live_class_checkinout_activities/store_student_response`,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    };
    return axios(config);
  };

  const takeScreenShot = () => {
    console.log("I can take Screenshot");
    ref.current
      .capture()
      .then(async (uri) => {
        const response = await fetch(uri);
        const fileBlob = await response.blob();

        let obj = {
          uri: response.url,
          name: "image.png",
          type: "png",
        };

        console.log("obj", obj);

        // console.log("fileBlob", fileBlob);
        // let result = URL.createObjectURL(blob);
        // setData(result);

        let formData = new FormData();
        let student_id = String(identity)?.split("-")[0];
        let checkin_ativity_id = apiData?.activity_id;
        formData.append("student_id", student_id);
        formData.append("checkin_ativity_id", checkin_ativity_id);
        formData.append("live_class_id", liveClassId);
        formData.append("duration", time);

        formData.append("response", obj);

        setIsStudentResponseCaptured(true);

        await StudentActivityResponseSave(formData)
          .then((res) => {
            console.log("res", res);
          })
          .catch((err) => {
            console.log("err", err.message);
          });

        sendShapeChallengeImage();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    setData("");
  }, []);

  return (
    <View style={styles.mainContainer}>
      {checkInResponse != "" && !isStudentResponseCaptured ? (
        <View style={{ flex: 1, width: "100%", height: "100%" }}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{ uri: checkInResponse }}
          />
        </View>
      ) : (
        <View style={{ marginTop: normalize(20) }}>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View style={{ flexBasis: "95%" }}>
              <Text
                style={[
                  CommonStyles.text_12_bold,
                  { color: "#233584", textAlign: "center" },
                ]}
              >
                Here is a set of shapes. Using these shapes, draw anything that
                comes to your mind. Be as creative as you want!
              </Text>
            </View>
            <View style={{ flexBasis: "5%" }}>
              {!isStudentResponseCaptured ? (
                <TouchableHighlight onPress={() => takeScreenShot()}>
                  <Image style={styles.imagestyle} source={close1} />
                </TouchableHighlight>
              ) : (
                <TouchableHighlight>
                  <Image style={styles.imagestyle2} source={close2} />
                </TouchableHighlight>
              )}
            </View>
          </View>
          <ViewShot
            ref={ref}
            captureMode="mount"
            options={{
              fileName: "file-name", // screenshot image name
              format: "jpg", // image extention
              quality: 1, // image quality
            }}
            style={{
              position: "relative",
            }}
          >
            <View style={{ marginTop: 300, marginLeft: normalize(20) }}>
              <ShapeChallengeWhiteboard
                shapesDraw={shapesDraw}
                sendRemoteWhiteboardActivity={sendRemoteWhiteboardActivity}
                notWrite={true}
              />
            </View>
          </ViewShot>
        </View>
      )}

      {isStudentResponseCaptured && (
        <View style={{ position: "absolute", bottom: 0, right: 0 }}>
          <Image
            style={{ width: 250, height: 250 }}
            source={CompletedGif}
          ></Image>
        </View>
      )}

      {isStudentResponseCaptured && (
        <View style={{ position: "absolute" }}>
          <Image
            style={{ width: 550, height: 550, top: 0 }}
            source={CelebrationGif}
          ></Image>
        </View>
      )}

      {endActivity && (
        <View style={{ position: "absolute" }}>
          <Image
            style={{ width: 550, height: 550, top: 0 }}
            source={CelebrationGif}
          ></Image>
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

  imagestyle: {
    height: 50,
    width: 90,
  },

  imagestyle2: {
    height: 50,
    width: 75,
  },
});
