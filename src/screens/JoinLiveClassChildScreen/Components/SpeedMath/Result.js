import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

import { getSpeedMathResult } from "../../../../actions/dashboard";
import { connect } from "react-redux";
import { SvgXml } from "react-native-svg";
import SpeedMathSummary from "../../assets/Images/Speedmath/Speedmath-summary.svg";
import { COLOR, CommonStyles } from "../../../../config/styles";
import Header from "./Header";
import WebView from "react-native-webview";
import trophyImage from "../../assets/Images/Speedmath/trophy-01.png";
import sadeemojiImage from "../../assets/Images/Speedmath/Sademoji.png";
import { normalize, Card } from "react-native-elements";
import LottieView from "lottie-react-native";
import {
  Childhappy,
  victoryEmotion,
  lossingEmotion,
} from "../../../../assets/lottieAssets";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../../../config/configs";

const Result = (props) => {
  let {
    questions,
    students,
    userAnswerData,
    computerScore,
    gameId,
    playerId,
    liveClassId,
    mode,
    identity,
    levelId,
  } = props;

  const [gameResultData, setGameResultData] = useState(null);
  const [counter, setCounter] = useState(10);
  const [playerIndex, setPlayerIndex] = useState(null);
  const [style, setStyle] = useState(false);
  const [studentScore, setStudentScore] = useState([]);
  const [studentWinOrLoss, setStudentWinOrLoss] = useState(false);
  const [showEmotion, setShowEmotion] = useState(false);

  async function extractGameResult() {
    await props.getSpeedMathResult(playerId, gameId, computerScore);
    // console.log("Result responce", props.speedMathResultStatus);
    // console.log("Data", props.speedMathResultResponse);

    setGameResultData(props?.speedMathResultResponse);
    setStudentScore(props?.speedMathResultResponse?.response_data);
  }

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      extractGameResult();
    }
  }, [counter]);

  useEffect(() => {
    findAverageForStudent();
  }, [studentScore]);

  function findAverageForStudent() {
    let finalStudentScore = props?.speedMathResultResponse?.response_data;
    //console.log("Final Student Score App", finalStudentScore);

    for (let i = 0; i < finalStudentScore?.length; i++) {
      if (identity != "tutor") {
        console.log("1st");
        let userIdentity = identity.split("-");
        console.log(finalStudentScore[i].player_id);

        if (finalStudentScore[i].player_id == userIdentity[0]) {
          console.log("2nd");
          if (finalStudentScore[i].game_result == "winner") {
            console.log("its a winner");
            setStudentWinOrLoss(true);
            setShowEmotion(true);
            let id = setTimeout(() => {
              setShowEmotion(false);
              clearTimeout(id);
            }, 5000);
          } else {
            console.log("its a losser");
            setStudentWinOrLoss(false);
            setShowEmotion(true);
            let id = setTimeout(() => {
              setShowEmotion(false);
              clearTimeout(id);
            }, 5000);
          }
        }
      }
    }
  }

  function showComputerScore() {
    return (
      <View
        style={{
          color: "#233584",
        }}
      >
        <Text
          style={[CommonStyles.text_12_bold, { color: "rgb(35, 53, 132)" }]}
        >
          Computer Score - {props?.speedMathResultResponse?.computer_score}
        </Text>
      </View>
    );
  }

  function showGameResultData() {
    return props?.speedMathResultResponse?.response_data.map((item) => {
      return (
        <>
          {console.log("ShowGameResult")}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                justifyContent: "flex-end",
                marginBottom: 10,
              }}
            >
              <Text
                style={[
                  CommonStyles.text_12_bold,
                  { color: "rgb(35, 53, 132)" },
                ]}
              >
                {item.name} - ({item.correct}/{item.total})
              </Text>
            </View>
            <View
              style={{
                justifyContent: "flex-end",
                marginBottom: 10,
              }}
            >
              {item.game_result == "winner" ? (
                <Image
                  style={{
                    height: normalize(30),
                    // margin: normalize(5),
                    width: normalize(30),
                    // resizeMode: "stretch",
                  }}
                  source={trophyImage}
                />
              ) : (
                <Image
                  style={{
                    height: normalize(30),
                    // margin: normalize(5),
                    width: normalize(30),
                    // resizeMode: "stretch",
                  }}
                  source={sadeemojiImage}
                />
              )}
            </View>
          </View>
        </>
      );
    });
  }

  function scoreBoard() {
    return (
      <React.Fragment>
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: 400,
            zIndex: 1,
            display: showEmotion ? "flex" : "none",
          }}
        >
          {studentWinOrLoss ? (
            <LottieView source={victoryEmotion} autoPlay loop />
          ) : (
            <LottieView source={lossingEmotion} autoPlay loop />
          )}
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              marginTop: 31,
              borderRadius: 44,
              backgroundColor: "#fff",
              height: 48,
              width: "80%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <View
              style={{
                height: "100%",
                margin: 0,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                padding: 10,
                marginLeft: 5,
                marginRight: 5,
                flexWrap: "wrap",
                flex: 1,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flex: 1,

                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>Questions</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flex: 1,

                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>Correct Answer</Text>
              </View>

              {props?.speedMathResultResponse?.response_data.map((item) => {
                return (
                  <View
                    style={{
                      display: "flex",
                      flex: 1,

                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text>{item.name}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {props?.speedMathResultResponse?.question_data.map((obj, index) => {
            return (
              <View
                key={obj.id}
                style={{
                  marginTop: obj.id == 1 ? 14 : 4,
                  borderRadius: 44,
                  backgroundColor: "#FEDD52",
                  height: 48,
                  width: "80%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  zIndex: -1,
                  display: "flex",
                  //   flexWrap: "wrap",
                }}
              >
                <View
                  style={{
                    height: "100%",
                    margin: 0,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    padding: 10,
                    marginLeft: 5,
                    marginRight: 5,
                    flexWrap: "wrap",
                    flex: 1,
                  }}
                >
                  <View
                    style={{
                      height: 30,

                      minWidth: 180,
                      marginLeft: 10,
                      marginTop: 3,
                    }}
                  >
                    <WebView
                      originWhitelist={["*"]}
                      source={{
                        html: `<html style="font-size:52px"><body style="background-color:#FEDD52;font-size:90px;">
                        ${obj.question}</body>`,
                      }}
                      containerStyle={{ alignContent: "center" }}
                    />
                  </View>

                  <View
                    style={{
                      display: "flex",
                      flex: 1,

                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text>{obj.answer}</Text>
                  </View>
                  {props?.speedMathResultResponse?.response_data.map(
                    (resItem) => {
                      //    console.log("Res",resItem.player_question_data[index].player_answer,index)
                      return (
                        <View
                          style={{
                            display: "flex",
                            flex: 1,

                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {resItem.player_question_data[index] != undefined ? (
                            <View>
                              {resItem.player_question_data[index].correct ? (
                                <View
                                  style={{
                                    width: 30,
                                    height: 30,
                                    backgroundColor: "green",
                                    borderRadius: 50,
                                    color: "white",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Text style={{ color: "white" }}>
                                    {
                                      resItem.player_question_data[index]
                                        .player_answer
                                    }
                                  </Text>
                                </View>
                              ) : (
                                <View
                                  style={{
                                    width: 30,
                                    height: 30,
                                    backgroundColor: "red",
                                    borderRadius: 50,
                                    color: "white",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Text style={{ color: "white" }}>
                                    {
                                      resItem.player_question_data[index]
                                        .player_answer
                                    }
                                  </Text>
                                </View>
                              )}
                            </View>
                          ) : (
                            <Text>NA</Text>
                          )}
                        </View>
                      );
                    }
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </React.Fragment>
    );
  }

  function resultView() {
    return (
      <React.Fragment>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View style={styles.resultView}>
            {props?.speedMathResultResponse != null && showGameResultData()}
            {props?.speedMathResultResponse != null &&
              mode == "computer" &&
              showComputerScore()}
          </View>
          <View style={{ flex: 1, height: 500 }}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "space-between",
              }}
            >
              <View>
                {props?.speedMathResultResponse != null && scoreBoard()}
              </View>
            </ScrollView>
          </View>
        </View>
      </React.Fragment>
    );
  }

  function resultPackingView() {
    console.log("Result Packing View");
    return (
      <>
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            // marginBottom: 200,
            marginTop: 200,
          }}
        >
          <Text
            style={[
              CommonStyles.text_18_bold,
              {
                color: "#233584",
                fontWeight: "bold",
                fontSize: 18,
                marginBottom: normalize(20),
              },
            ]}
          >
            {counter}
          </Text>
          <Text style={[CommonStyles.text_16_bold, { color: "#233584" }]}>
            Unlocking your result, be ready for the surprise!!
          </Text>
        </View>
        <View
          style={{
            height: 200,
            width: "100%",
            justifyContent: "center",

            alignItems: "center",
          }}
        >
          <LottieView source={Childhappy} autoPlay loop />
        </View>
      </>
    );
  }

  return (
    <React.Fragment>
      <View
        style={{
          position: "absolute",
          flex: 1,
          top: normalize(10),
          width: "100%",
          height: "100%",
          display: "flex",
        }}
      >
        <View style={{ display: "flex", flexDirection: "column" }}>
          <View>
            <Header mode={mode} level={levelId} />
          </View>
          <View style={{ marginTop: 80, marginLeft: 20 }}>
            <SvgXml xml={SpeedMathSummary} />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "space-between",
            position: "absolute",
          }}
        >
          <View></View>
          <View>{counter > 0 ? resultPackingView() : resultView()}</View>
        </View>
      </View>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    state: state.dashboard,
    loading: state.dashboard.loading,
    currentSelectedKid: state.dashboard.current_selected_kid,
    speedMathGameStartStatus: state.dashboard.speed_math_game_start_status,
    speedMathResultStatus: state.dashboard.speed_math_result_status,
    speedMathResultResponse: state.dashboard.speed_math_result_response,
  };
};

const mapDispatchToProps = {
  getSpeedMathResult,
};

const styles = StyleSheet.create({
  resultView: {
    height: 100,
    width: normalize(170),
    marginBottom: 10,
    marginLeft: normalize(390),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Result);
