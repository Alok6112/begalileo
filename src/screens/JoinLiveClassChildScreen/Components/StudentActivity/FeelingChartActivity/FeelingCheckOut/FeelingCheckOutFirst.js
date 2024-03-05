import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";
import React from "react";

import axios from "axios";

import { useEffect, useState } from "react";

import { normalize } from "react-native-elements";

import { CommonStyles } from "../../../../../../config/styles";

import { BASE_URL } from "../../../../../../config/configs";

import BorderImage from "../../../../assets/Images/Border.png";

import { DraxProvider, DraxView, DraxList } from "react-native-drax";

import FeelingCheckOutLast from "./FeelingCheckOutLast";

export default function FeelingCheckOutFirst({
  identity,
  selectedCheckInFeelingData,
  showAffirmationStories,
  isCheckInActivity,
  apiData,
  liveClassId,
  studentId,
  onsendStudentImageIndex,
  endActivity,
}) {
  const [loading, setIsLoading] = useState(true);
  const [droppedValues, setDroppedValues] = useState([]);
  const [gifImage, setGifImage] = useState([]);
  const [images, setImages] = useState([]);

  const [imagesLength, setImagesLength] = useState(0);
  const [selectedImage, setSelectedImage] = useState("");
  const [feelingsArray, setFeelingArray] = useState([]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showLastScreen, setShowLastScreen] = useState(false);
  const [selectedGif, setSelectedGif] = useState("");
  const [checkInResponse, setCheckInResponse] = useState({});
  const [checkOutResponse, setCheckOutResponse] = useState({});

  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(true);
  const [nextBtn, setNextBtn] = useState(false);

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
    let length = Math.floor(apiData?.activity_data?.length);
    setImagesLength(length);
    setFeelingArray(apiData?.activity_data || []);
  }, []);

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

    console.log("url", url);
    const response = await fetch(url).catch((ae) => {});

    const json = await response.json();

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
        console.log("data", JSON.stringify(data));
        let checkInResponse = data?.checkin_responses?.student;
        let checkOutResponse = data?.checkout_responses?.student;

        console.log("checkinresponce", JSON.stringify(checkInResponse));

        let studentResponse =
          checkInResponse[0]?.checkin_activity_category_details;
        let studentCheckOutResponse =
          checkOutResponse[0].checkout_activity_category_details;

        setCheckInResponse(studentResponse);

        setCheckOutResponse(studentCheckOutResponse);

        setIsLoading(false);
      }
    } catch (e) {}
  };

  const setStudentResponceImage = (event) => {
    apiData?.activity_data?.filter((element, index) => {
      if (index == event) {
        setSelectedIndex(index);
        setSelectedImage(element.image);
        setSelectedGif(element.gif_image);
        setNextBtn(true);

        return;
      }
    });
  };

  const submitStudentResponce = () => {
    if (selectedImage == "") {
      Alert.alert("Please select atleast one option");
      return;
    } else {
      if (selectedIndex > -1) {
        console.log("submit button clicked");
        onsendStudentImageIndex(selectedIndex);
        setShowLastScreen(true);
        sendFeelingChartCheckIn(
          feelingsArray[selectedIndex],
          identity,
          apiData,
          time || 0,
          liveClassId
        );
      }
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

  async function sendFeelingChartCheckIn(
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

    console.log("form data before sending", formData);
    await StudentActivityResponseSave(formData)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <>
      {!showAffirmationStories ? (
        <>
          {checkInResponse[0]?.gif_image != "" && (
            <View style={{ flex: 1, alignItems: "center", marginTop: 5 }}>
              <Text
                style={[
                  CommonStyles.text_14_bold,
                  { color: "#233584", justifyContent: "center" },
                ]}
              >
                You wear Feeling
              </Text>
            </View>
          )}

          <View>
            {checkInResponse[0]?.gif_image != "" && (
              <View style={styles.mainContainer}>
                <Image
                  style={styles.imageContainer}
                  source={{ uri: checkInResponse[0]?.gif_image }}
                ></Image>
              </View>
            )}
          </View>
        </>
      ) : showAffirmationStories && !showLastScreen ? (
        <>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: normalize(10),
            }}
          >
            <Text style={[CommonStyles.text_14_bold, { color: "#233584" }]}>
              Pick a feeling from the given feelings on your screen and drag it
              in the empty box
            </Text>
          </View>

          <View style={styles.mainImagesDiv}>
            <DraxProvider>
              <View style={styles.container}>
                <View style={styles.firstImagesContainer}>
                  {selectedImage == "" &&
                    apiData?.activity_data?.map((item, i) => {
                      return i < imagesLength / 2 ? (
                        <View
                          style={{
                            width: 140,
                            height: 140,
                            justifyContent: "center",
                          }}
                        >
                          <DraxView
                            style={styles.draggable}
                            onDragStart={() => {
                              console.log("start drag");
                            }}
                            payload={i}
                          >
                            <Image
                              style={{ width: 100, height: 100 }}
                              source={{ uri: item.image }}
                            />
                          </DraxView>
                        </View>
                      ) : (
                        <></>
                      );
                    })}
                </View>
                <View style={styles.droppingContainer}>
                  <ImageBackground
                    source={BorderImage}
                    style={{ width: 180, height: 180 }}
                  >
                    {selectedImage != "" ? (
                      <Image
                        style={styles.receiver}
                        source={{ uri: selectedImage }}
                      ></Image>
                    ) : (
                      <DraxView
                        style={styles.receiver}
                        dragPayload={droppedValues}
                        onReceiveDragEnter={({ dragged: { payload } }) => {
                          console.log(`hello ${payload}`);
                        }}
                        onReceiveDragExit={({ dragged: { payload } }) => {
                          console.log(`goodbye ${payload}`);
                        }}
                        onReceiveDragDrop={(event) => {
                          console.log("event", event);
                          setStudentResponceImage(event.dragged.payload);
                        }}
                      />
                    )}
                  </ImageBackground>

                  <Pressable
                    onPress={submitStudentResponce}
                    style={styles.submitbtn}
                  >
                    <Text
                      style={[CommonStyles.text_14_bold, { color: "white" }]}
                    >
                      Submit
                    </Text>
                  </Pressable>
                </View>

                <View style={styles.lastImagesContainer}>
                  {selectedImage == "" &&
                    apiData?.activity_data?.map((item, i) => {
                      return i >= imagesLength / 2 && i <= imagesLength ? (
                        <View
                          style={{
                            width: 150,
                            height: 150,
                            justifyContent: "center",
                          }}
                        >
                          <DraxView
                            style={styles.draggable}
                            onDragStart={() => {
                              console.log("start drag");
                            }}
                            payload={i}
                          >
                            <Image
                              style={{ width: 100, height: 100 }}
                              source={{ uri: item.image }}
                            />
                          </DraxView>
                        </View>
                      ) : (
                        <></>
                      );
                    })}
                </View>
              </View>
            </DraxProvider>
          </View>
        </>
      ) : !endActivity ? (
        <View>
          {selectedGif != "" && (
            <View style={styles.mainContainer}>
              <Image
                style={styles.imageContainer}
                source={{ uri: selectedGif }}
              ></Image>
            </View>
          )}
        </View>
      ) : (
        <View>
          <View>
            <FeelingCheckOutLast
              checkInresponse={checkInResponse[0]?.gif_image}
              selectedGif={selectedGif}
            />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  draggable: {
    width: 100,
    height: 100,
  },
  receiver: {
    width: 170,
    height: 170,
    justifyContent: "center",
    borderColor: "black",
    marginLeft: normalize(10),
    marginRight: normalize(10),
  },

  mainImagesDiv: {
    borderRadius: 10,
    width: "95%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    margin: "auto",
    marginLeft: normalize(10),
  },

  firstImagesContainer: {
    display: "flex",
    flexBasis: "30%",
    padding: normalize(10),
    flexWrap: "wrap",
    marginTop: normalize(20),
    marginRight: normalize(30),
  },

  droppingContainer: {
    flexBasis: "25%",
    // padding: normalize(10),
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },

  lastImagesContainer: {
    display: "flex",
    flexBasis: "30%",
    padding: normalize(10),
    flexWrap: "wrap",
    marginTop: normalize(20),
  },

  submitbtn: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "grey",
    width: 100,
    height: 50,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    marginTop: normalize(10),
    backgroundColor: "#007bff",
  },

  mainContainer: {
    height: "95%",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    margin: "auto",
    marginLeft: normalize(10),
  },

  imageContainer: {
    width: 300,
    height: 300,
    justifyContent: "center",
  },
});
