import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import { COLOR, CommonStyles } from "../../../../config/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import LottieView from "lottie-react-native";

import {
  Childhappy,
  victoryEmotion,
  lossingEmotion,
} from "../../../../assets/lottieAssets";

export default function ResultPage({ practiceId, userId }) {
  const [data, setData] = useState([]);

  const [openAnimation, setOpenAnimation] = useState(false);
  const [topScorer, setTopScorer] = useState(false);

  useEffect(() => {
    let url = `?live_class_practice_id=${practiceId}&user_id=${userId}`;
    getStudentResult(url);
  }, []);

  const StudentResultMathZone = async (url) => {
    return axios(`https://begalileo.com/app_teachers/result${url}`);
  };

  const getStudentResult = async (url) => {
    try {
      let result = await StudentResultMathZone(url);
      console.log(result?.data?.result_data);
      setData(result?.data?.result_data);
      findPerfectAnimation(result?.data?.result_data);
    } catch (e) {
      console.log("error in api", e);
    }
  };

  const findPerfectAnimation = (data) => {
    if (openAnimation || data?.length < 1) {
      return;
    }
    let temp = data[0] || {};
    let percentageCalc = (temp?.correct || 0) / (temp?.total || 1);
    if (percentageCalc >= 0.8) {
      setTopScorer(true);
    } else {
      setTopScorer(false);
    }
    handleOpenAnimation();
  };

  const handleOpenAnimation = () => {
    let id = setTimeout(() => {
      setOpenAnimation(true);
      clearTimeout(id);
      handleCloseAnimation();
    }, 500);
  };
  const handleCloseAnimation = () => {
    let id = setTimeout(() => {
      clearTimeout(id);
      setOpenAnimation();
    }, 5000);
  };

  return (
    <>
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: 400,
          zIndex: 1,
        }}
      >
        {openAnimation && !topScorer && (
          <LottieView source={Childhappy} autoPlay loop />
        )}
        {openAnimation && topScorer && (
          <LottieView source={victoryEmotion} autoPlay loop />
        )}
      </View>
      <View style={styles.container}>
        <View
          style={{
            width: "95%",
            height: 200,
            alignContent: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: COLOR.BORDER_COLOR_GREY,
          }}
        >
          <Text
            style={[
              CommonStyles.text_16_bold,
              { marginBottom: 20, textAlign: "center" },
            ]}
          >
            Result Status
          </Text>
          <DataTable>
            <View
              style={{
                justifyContent: "space-evenly",
                alignItems: "center",
                backgroundColor: "blue",
              }}
            >
              <DataTable.Header>
                <DataTable.Title style={{ justifyContent: "center" }}>
                  <Text style={[CommonStyles.text_14_bold, { color: "white" }]}>
                    Total Question
                  </Text>
                </DataTable.Title>
                <DataTable.Title style={{ justifyContent: "center" }}>
                  <Text style={[CommonStyles.text_14_bold, { color: "white" }]}>
                    Skipped
                  </Text>
                </DataTable.Title>
                <DataTable.Title style={{ justifyContent: "center" }}>
                  <Text style={[CommonStyles.text_14_bold, { color: "white" }]}>
                    Correct
                  </Text>
                </DataTable.Title>
                <DataTable.Title style={{ justifyContent: "center" }}>
                  <Text style={[CommonStyles.text_14_bold, { color: "white" }]}>
                    InCorrect
                  </Text>
                </DataTable.Title>
                <DataTable.Title style={{ justifyContent: "center" }}>
                  <Text style={[CommonStyles.text_14_bold, { color: "white" }]}>
                    Score
                  </Text>
                </DataTable.Title>
              </DataTable.Header>
            </View>

            <View>
              {data?.map((item, i) => {
                return (
                  <DataTable.Row>
                    <DataTable.Cell
                      numeric
                      style={{
                        justifyContent: "center",
                      }}
                    >
                      <Text style={[CommonStyles.text_14_bold]}>
                        {item?.total || 0}
                      </Text>
                    </DataTable.Cell>

                    <DataTable.Cell
                      numeric
                      style={{
                        justifyContent: "center",
                      }}
                    >
                      <Text style={[CommonStyles.text_14_bold]}>
                        {item?.skipped || 0}
                      </Text>
                    </DataTable.Cell>
                    <DataTable.Cell
                      numeric
                      style={{
                        justifyContent: "center",
                      }}
                    >
                      <Text style={[CommonStyles.text_14_bold]}>
                        {item?.correct}
                      </Text>
                    </DataTable.Cell>
                    <DataTable.Cell
                      numeric
                      style={{
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={[CommonStyles.text_14_bold, { color: "red" }]}
                      >
                        {item?.incorrect}
                      </Text>
                    </DataTable.Cell>
                    <DataTable.Cell
                      numeric
                      style={{
                        justifyContent: "center",
                      }}
                    >
                      <Text style={[CommonStyles.text_14_bold]}>
                        {item?.score}
                      </Text>
                    </DataTable.Cell>
                  </DataTable.Row>
                );
              })}
            </View>
          </DataTable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    marginTop: 30,
    // borderColor: COLOR.BORDER_COLOR_GREY,
  },
});
