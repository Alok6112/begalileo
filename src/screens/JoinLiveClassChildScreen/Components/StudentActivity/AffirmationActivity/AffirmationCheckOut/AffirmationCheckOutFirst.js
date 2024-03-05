import { View, Text, StyleSheet, Image, Animated } from "react-native";
import React from "react";

import { useEffect, useState, useRef } from "react";

import { normalize } from "react-native-elements";

import { CommonStyles } from "../../../../../../config/styles";

import { BASE_URL } from "../../../../../../config/configs";
// import { mediaDevices } from "react-native-webrtc";

export default function AffirmationCheckOutFirst({
  isCheckInActivity,
  apiData,
  liveClassId,
  studentId,
  checkOutAffirmationNextBtn,
  isAudioEnabled,
  affirmationPagePreviewImage,
  endActivity,
}) {
  const [checkInResponse, setCheckInResponse] = useState({});
  const [checkOutImageResponse, setCheckOutImageResponse] = useState("");

  const [showMiddleScreen, setShowMiddleScreen] = useState(false);

  const [count, setCount] = useState(1);
  const [disableCount, setDisabledCount] = useState(true);

  const ref = useRef();
  useEffect(() => {
    ref.current = setInterval(() => {
      setCount((prev) => {
        prev++;
        if (prev > 3) {
          setDisabledCount(false);
          clearInterval(ref.current);
        }
        return prev;
      });
    }, 2000);
    return () => clearInterval(ref.current);
  }, [checkOutAffirmationNextBtn]);

  useEffect(() => {
    fetchRespones();
  }, []);

  useEffect(() => {
    if (!isCheckInActivity) {
      fetchRespones();
    }
  }, []);

  useEffect(() => {
    fetchRespones();
  }, [affirmationPagePreviewImage]);

  const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
    useEffect(() => {
      Animated.loop(
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start();
    }, [fadeAnim]);

    return (
      <Animated.View // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim, // Bind opacity to animated value
        }}
      >
        {props.children}
      </Animated.View>
    );
  };

  const getStudentActivityResponse = async (studentId, liveClassId) => {
    console.log("i am here", studentId, liveClassId);
    let url = `${BASE_URL}/live_class_checkinout_activities/checkin_out_activity_responses?student_id=${studentId}&live_class_id=${liveClassId}`;
    //let url = "http://localhost:5555/response-data";

    console.log("url", url);

    const response = await fetch(url).catch((ae) => {});

    const json = await response.json();

    console.log("json", json);

    if (json != undefined) {
      return json;
    }
  };

  const fetchRespones = async () => {
    try {
      let student_id = studentId;
      let liveClassID = liveClassId;

      let data = await getStudentActivityResponse(student_id, liveClassID);

      if (data?.status) {
        let checkInResponse = data?.checkin_responses?.student;
        let checkOutResponse = data?.checkout_responses?.teacher;

        let studentResponse =
          checkInResponse[0]?.checkin_activity_category_details[0];
        let studentResponseGif =
          checkInResponse[0]?.checkin_activity_category_details[0];

        let teacherImageCapture = checkOutResponse[0]?.response;

        if (teacherImageCapture != "") {
          let finalTeacherImageResponse = BASE_URL + teacherImageCapture;
          setCheckOutImageResponse(finalTeacherImageResponse);
        }

        setCheckInResponse(studentResponse);
      }
    } catch (e) {}
  };

  return (
    <>
      {!checkOutAffirmationNextBtn && checkOutImageResponse == "" ? (
        <View style={styles.mainContainer}>
          <View
            style={{
              position: "absolute",
              width: 100,
              height: 100,
              top: 0,
              left: 0,
            }}
          >
            <Image
              style={styles.imageContainerGif}
              source={{ uri: checkInResponse?.gif_image }}
            ></Image>
          </View>
          <View>
            <Text style={[CommonStyles.text_12_bold, { color: "#233584" }]}>
              This is your self-affirmation OR the positive thought.
            </Text>
          </View>

          <View style={{ marginTop: normalize(30) }}>
            <Image
              style={styles.imageContainer}
              source={{ uri: checkInResponse?.image }}
            ></Image>
          </View>
        </View>
      ) : checkOutAffirmationNextBtn &&
        checkOutImageResponse == "" &&
        !affirmationPagePreviewImage ? (
        <View style={styles.mainContainer}>
          <View
            style={{
              position: "absolute",
              width: 100,
              height: 100,
              top: 0,
              left: 0,
            }}
          >
            <Image
              style={styles.imageContainerGif}
              source={{ uri: checkInResponse?.gif_image }}
            ></Image>
          </View>

          <View
            style={{
              position: "absolute",
              width: "100%",
              height: 100,
              top: 20,
              left: 150,
            }}
          >
            <Text style={[CommonStyles.text_12_bold, { color: "#233584" }]}>
              This is your self-affirmation OR the positive thought.
            </Text>
          </View>

          <View
            style={{
              // marginTop: normalize(30),
              flexDirection: "row",
              width: 420,
              justifyContent: "space-between",
              position: "absolute",
              top: normalize(100),
              left: normalize(200),
            }}
          >
            {disableCount && (
              <View
                style={{
                  justifyContent: "center",
                  position: "absolute",
                  top: normalize(100),
                  right: normalize(350),
                }}
              >
                <Text style={[CommonStyles.text_14_bold, { color: "#233584" }]}>
                  Say it aloud {count}
                </Text>
              </View>
            )}
            {isAudioEnabled ? (
              <View>
                <FadeInView
                  style={{
                    borderRadius: 580,
                    backgroundColor: "#8f9df7",
                  }}
                >
                  <View
                    style={{
                      width: 290,
                      height: 290,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                </FadeInView>
                <View style={{ position: "absolute", left: 20, top: 20 }}>
                  <Image
                    style={styles.imageContainer}
                    source={{ uri: checkInResponse?.image }}
                  ></Image>
                </View>
              </View>
            ) : (
              <View
                style={{
                  position: "absolute",
                  left: 20,
                }}
              >
                <Image
                  style={styles.imageContainer}
                  source={{ uri: checkInResponse?.image }}
                ></Image>
              </View>
            )}
          </View>
        </View>
      ) : checkOutImageResponse != "" ? (
        <View style={styles.mainContainer}>
          <Image
            style={{
              width: 400,
              height: 300,
              justifyContent: "center",
              alignItems: "center",
            }}
            source={{ uri: checkOutImageResponse }}
          ></Image>
        </View>
      ) : (
        <View></View>
      )}
    </>
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

  imageContainer: {
    width: 250,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },

  imageContainerGif: {
    width: 100,
    height: 100,
  },
});
