import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";

import { useState, useEffect } from "react";
import React from "react";
import { normalize } from "react-native-elements";

import { BASE_URL } from "../../../../../../config/configs";

import axios from "axios";

import { CommonStyles } from "../../../../../../config/styles";

import close1 from "../../../../assets/Images/Closedicon/close1.png";
import close2 from "../../../../assets/Images/Closedicon/close2.png";

import AffirmationMiddleScreen from "./AffirmationMiddleScreen";
import AffirmationStories from "./AffirmationStories";

import CompletedGif from "../../../../assets/Images/GifImages/ms.gif";

import { AsyncStorage } from "react-native";
export default function AffirmationCheckInFirst({
  identity,
  selectedCheckInFeeling,
  checkInActivityId,
  isCheckInActivity,
  apiData,
  liveClassId,
  studentId,
  sendRemoteWhiteboardActivity,
  sendAffirmationIndex,
  showAffirmationStories,
  affirmationStoryIndex,
  endActivity,
}) {
  const [affirmationImages, setAffirmationImages] = useState([]);
  const [showMiddleScreen, setShowMiddleScreen] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [affirmationImageSelected, setSelectedAffirmationImage] = useState("");

  const [isStudentResponseCaptured, setIsStudentResponseCaptured] =
    useState(false);
  const [affirmationArray, setAffirmationArray] = useState([]);

  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(true);

  const [storyBook, setStoryBook] = useState([]);

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
    const images = [];
    activityData?.forEach((item) => {
      images.push(item.image);
      console.log("item images", item.image);
    });

    setAffirmationImages(images);
    setAffirmationArray(apiData?.activity_data || []);
  }, []);

  useEffect(() => {
    let activityData = apiData?.activity_data || [];
    const storyBook = [];

    activityData?.filter((item, i) => {
      if (i == selectedIndex) {
        storyBook.push(item.story_question_data);
      }
    });

    setStoryBook(storyBook);

    console.log("final storybook", storyBook);
  }, [showAffirmationStories]);

  useEffect(() => {
    fetchRespones();
  }, []);

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

      if (data?.status) {
        let checkInResponse = data?.checkin_responses?.student;

        let studentResponse =
          checkInResponse[0]?.checkin_activity_category_details[0]?.image;

        setSelectedAffirmationImage(studentResponse);
      }
    } catch (e) {}
  };

  const selectedImage = (event) => {
    if (event > -1) {
      // sendAffirmationIndex(selectedIndex);

      apiData?.activity_data?.filter((element, index) => {
        if (index == event) {
          setSelectedIndex(index);
          setSelectedAffirmationImage(element.image);

          return;
        }
      });
    }
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

  async function sendAffirmationCheckInResponse(
    data,
    identity,
    apiData,
    duration,
    liveClassId
  ) {
    var FormData = require("form-data");
    let formData = new FormData();
    let studentId = String(identity)?.split("-")[0];
    let checkin_ativity_id = apiData?.activity_id;
    formData.append("student_id", studentId);
    formData.append("live_class_id", liveClassId);
    formData.append("checkin_ativity_id", checkin_ativity_id);
    formData.append(
      "checkin_out_activity_category_id",
      data?.category_id || ""
    );
    formData.append("duration", duration);

    await StudentActivityResponseSave(formData)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log(err.message);
      });
    sendAffirmationIndex(selectedIndex);
    setShowMiddleScreen(true);
    setIsStudentResponseCaptured(true);
  }

  const takeScreenShot = () => {
    console.log("I can take Screenshot");

    sendAffirmationCheckInResponse(
      affirmationArray[selectedIndex],
      identity,
      apiData,
      time || 0,
      liveClassId
    );
    // ref.current
    //   .capture()
    //   .then(async (uri) => {
    //     const response = await fetch(uri);
    //     const blob = await response.blob();
    //     let result = URL.createObjectURL(blob);
    //     setData(result);
    //     let formData = new FormData();
    //     let student_id = studentId;
    //     let liveClass_Id = liveClassId;
    //     let checkInActivity_ID = checkInActivityId;
    //     formData.append("student_id", student_id);
    //     formData.append("checkin_activity_id", checkInActivity_ID);
    //     formData.append("live_class_id", liveClass_Id);
    //     formData.append("duration", time);
    //     formData.append("response", result, "image.png");
    //     console.log("formdata", formData);

    //     setIsStudentResponseCaptured(true);
    //     // await StudentActivityResponseSave(formData)
    //     // handleSendTeacherActivityResponse()

    //     // alert("Took screenshot");
    //   })
    //   .catch((err) => {
    //     console.log("err", err.message);
    //   });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{ display: "flex", justifyContent: "center" }}>
        {!showMiddleScreen && !showAffirmationStories ? (
          <View style={{ marginTop: normalize(30) }}>
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
                  Let us start our session with some positive thoughts. Here are
                  two options on your screen. Which positive thought would you
                  pick today?,
                </Text>
                <Text
                  style={[
                    CommonStyles.text_12_bold,
                    { color: "#233584", textAlign: "center" },
                  ]}
                >
                  After Picking please click on the close button.
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

            <View style={{ width: "95%", height: "85%" }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {affirmationImages?.map((item, i) => {
                  return (
                    <TouchableHighlight onPress={() => selectedImage(i)}>
                      <Image
                        style={{
                          width: 200,
                          height: 200,
                          borderWidth: 1,
                          borderRadius: 100,
                          marginLeft: normalize(30),
                          backgroundColor: selectedIndex == i ? "black" : null,
                        }}
                        source={{ uri: item }}
                      ></Image>
                    </TouchableHighlight>
                  );
                })}
              </View>
            </View>
          </View>
        ) : !showAffirmationStories ? (
          <View style={styles.mainContainer}>
            <AffirmationMiddleScreen selectedImage={affirmationImageSelected} />
          </View>
        ) : (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                flexBasis: "15%",
                display: "flex",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <View
                style={{
                  alignSelf: "flex-start",
                }}
              >
                <Image
                  style={{ width: 70, height: 70 }}
                  source={{
                    uri: affirmationImageSelected,
                  }}
                />
              </View>
              <View
                style={{
                  alignSelf: "flex-end",
                  position: "absolute",
                  marginTop: normalize(8),
                }}
              >
                <Image style={{ width: 75, height: 50 }} source={close2} />
              </View>
            </View>
            <View
              style={{
                flexBasis: "85%",
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AffirmationStories
                storyBook={storyBook[0] || []}
                affirmationStoryIndex={affirmationStoryIndex}
              />
            </View>
          </View>
        )}
      </View>

      {endActivity && (
        <View style={{ position: "absolute", bottom: 0, right: 0 }}>
          <Image
            style={{ width: 250, height: 250 }}
            source={CompletedGif}
          ></Image>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 10,
    width: "95%",
    height: "90%",
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

  imagestyleAbs: {
    height: 50,
    width: 75,
  },
});
