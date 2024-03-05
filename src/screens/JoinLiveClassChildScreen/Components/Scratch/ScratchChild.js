import React from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import * as Constants from "../../../../components/helpers/Constants";

import { COLOR, CommonStyles } from "../../../../config/styles";

import { BASE_URL } from "../../../../config/configs";

import { ScratchWebView } from "./ScratchWebView";

import {
  View,
  Text,
  Modal,
  StyleSheet,
  Linking,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";

import Scratchlogo from "../../../../assets/images/Scratchlogo.png";
import Pythonlogo from "../../../../assets/images/PythonImage.png";
import thunkablelogo from "../../../../assets/images/thunkable-removebg-preview.png";
import { normalize } from "react-native-elements";

// import UpArrow from "../../assets/UpArrow.png";
// import Scratchdata from "./Scratch.json";

// import { forEach } from "lodash";

function ScratchChild(props) {
  const [jsondata, setJsonData] = useState([]);
  const [iden, setIdentity] = useState("");
  const [shownodata, setshowdata] = useState(false);
  const [thunkableLink, setThunkableLink] = useState("");
  const [env, setEnv] = useState("");
  const scrollElement = useRef(null);

  const studentIDScratch = (identity) => {
    const identityData = identity;
    const change = identityData.split("-");

    return change[0];
  };

  useEffect(() => {
    const identity = studentIDScratch(props?.identity);
    const env = props?.env;
    setEnv(env);
    setIdentity(identity);
    fetchdata();
    fetchThunkableData();
  }, []);

  const fetchThunkableData = async () => {
    let liveClassID = props?.liveClassIdOfStudent;

    let url = `${BASE_URL}/app_students/generate_thunkable_link?live_class_id=" +
      ${liveClassID}`;

    const response = await fetch(url).catch((ae) => {
      console.log("Fetch Error ", ae);
    });

    const json = await response.json();

    if (json.status) {
      setThunkableLink(json.url);
    }
  };

  const scroll = (scrollOffset) => {
    scrollElement.current.scrollTop += scrollOffset;
  };

  const showScratchWebView = (e) => {
    props.navigation.navigate(Constants.ScratchWebView, {
      navigation: props.navigation,
      link: e,
    });
  };

  const fetchdata = async () => {
    let liveClassID = props?.liveClassIdOfStudent;
    let user_id = props?.userIdOfStudent;

    let url = `${BASE_URL}/app_students/codings?live_class_id=
      ${liveClassID}
      &user_id=
      ${user_id}`;

    const response = await fetch(url).catch((ae) => {
      console.log("Fetch Error ", ae);
    });

    const json = await response.json();

    if (json.message == "No codings assigned to this class") {
      setshowdata(true);
    } else {
      setJsonData(json.activities);
    }
  };

  return (
    <>
      <View style={{ marginTop: 10 }}>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={[
              CommonStyles.text_14_bold,
              { color: "#233584", fontWeight: "normal" },
            ]}
            className="text-center"
          >
            Coding
          </Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        {jsondata?.length > 4 ? (
          <>
            <View className={styles.upanddownarrow}>
              <Button onClick={() => scroll(-50)}>
                {/* <Image src={UpArrow}></Image> */}
              </Button>
            </View>
            <View className={styles.upanddownarrowdown}>
              <Button onClick={() => scroll(50)}>
                {/* <Image src={UpArrow}></Image> */}
              </Button>
            </View>
          </>
        ) : null}

        {shownodata ? (
          <View style={{ flex: 1 }}>No Activities are found at the moment</View>
        ) : (
          <View ref={scrollElement} style={styles.scratch_upperdiv}>
            {jsondata?.map((elem) => {
              return (
                <View style={styles.scratch_seconddiv}>
                  <View style={styles.scratch_thirdinnerdiv}>
                    <View style={styles.scratch_showdate}>
                      <View style={styles.innerdatecircle}>
                        <Text style={[CommonStyles.text_14_Regular]}>
                          {elem.day}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.scratch_content}>
                      <View style={styles.scratch_contentupper}>
                        <View style={styles.scratch_contentupperspan}>
                          <Text
                            style={[
                              CommonStyles.text_14_bold,
                              { color: "#233584", fontWeight: "bold" },
                            ]}
                          >
                            {elem.class_title}
                          </Text>
                        </View>
                        <View style={styles.scratch_contentupperspansecond}>
                          <Text
                            style={[
                              CommonStyles.text_11_Regular,
                              { color: "#233584", fontWeight: "normal" },
                            ]}
                          >
                            {elem.learning_outcome}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.scratch_activeornot}>
                      {elem.students.map((student) => {
                        return (
                          <View style={styles.scratch_sliderandactivesecond}>
                            {elem.project_type == "python" ? (
                              <TouchableOpacity
                                onPress={() => {
                                  showScratchWebView(
                                    `https://www.python.begalileo.com/?user_id=${iden}&coding_activity_id=${elem.coding_activity_id}&student_activity_id=${student.student_activity_id}&coding_learning_outcome_id=${elem.coding_learning_outcome_id}&env=${env}`
                                  );
                                }}
                              >
                                <Image
                                  style={[
                                    styles.scratch_sliderandactivesecondlogo,
                                    { width: "100px", height: "50px" },
                                  ]}
                                  source={Pythonlogo}
                                />
                              </TouchableOpacity>
                            ) : elem.project_type == "scratch" ? (
                              <TouchableOpacity
                                onPress={() =>
                                  showScratchWebView(
                                    `https://www.coding.begalileo.com/?user_id=${iden}&project_id=${elem.coding_activity_id}&student_activity_id=${student.student_activity_id}&coding_learning_outcome_id=${elem.coding_learning_outcome_id}&env=${env}`
                                  )
                                }
                              >
                                <Image
                                  className={
                                    styles.scratch_sliderandactivesecondlogo
                                  }
                                  source={Scratchlogo}
                                />
                              </TouchableOpacity>
                            ) : (
                              <TouchableOpacity
                                onPress={() =>
                                  showScratchWebView(thunkableLink)
                                }
                              >
                                <Image
                                  style={{
                                    width: "50%",
                                    height: "50%",
                                    margin: "auto",
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                  source={thunkablelogo}
                                ></Image>
                              </TouchableOpacity>
                            )}
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  upanddownarrow: {
    left: "95.2%",
    top: "50%",
  },

  upanddownarrowdown: {
    left: "95.2%",
    top: "57%",
  },

  latestandoldest: {
    width: "100%",
    height: 4,
    display: "flex",
    justifyContent: "flex-end",
  },

  latestbutton: {
    fontFamily: "Montserrat",
    fontSize: 12,
    color: "#3f6fff",
  },

  oldestbutton: {
    fontFamily: "Montserrat",
    fontSize: 12,
    color: "#3f6fff",
  },

  scratch_upperdiv: {
    borderColor: "#e2e4ee",
    borderWidth: 1,
    height: "auto",
    borderRadius: 10,
    marginTop: normalize(10),
    marginBottom: normalize(10),
    padding: normalize(10),
    marginLeft: normalize(10),
    marginRight: normalize(10),
  },

  scratch_seconddiv: {
    width: "99%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#e2e4ee",
    marginTop: normalize(10),
  },

  scratch_thirdinnerdiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 90,
    padding: normalize(5),
  },

  scratch_showdate: {
    flexBasis: "18%",
    height: 20,
    marginLeft: 20,
    display: "flex",
    marginBottom: normalize(20),
  },

  innerdatecircle: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#ffffff",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    margin: "auto",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },

  scratch_content: {
    flexBasis: "55%",
    height: 60,
    marginTop: normalize(5),
    marginLeft: normalize(5),
  },

  scratch_contentupper: {
    height: 40,
    width: "100%",
  },

  scratch_contentupperspan: {
    width: "auto",
    height: 22,
    fontFamily: "Montserrat",
    fontSize: 16,
    color: "#233584",
  },

  scratch_contentupperspansecond: {
    width: "auto",
    height: 25,
    fontFamily: "Montserrat",
    fontSize: 16,
    color: "#233584",
    marginTop: normalize(5),
  },
});

export default ScratchChild;
