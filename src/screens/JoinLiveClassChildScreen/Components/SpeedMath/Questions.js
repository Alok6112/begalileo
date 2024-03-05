import React, { useEffect, useState, useRef } from "react";

import { View, Text, StyleSheet, Pressable } from "react-native";

const level_1_seconds = [2, 2, 2, 3, 3, 3, 4, 3, 3, 2];
import { connect } from "react-redux";
import { COLOR, CommonStyles } from "../../../../config/styles";
import WebView from "react-native-webview";
import Header from "./Header";
import Icon from "react-native-vector-icons/FontAwesome";
import QuestionTimer from "./QuestionTimer";
import { SvgXml } from "react-native-svg";
import CorrectSvg from "../../assets/Images/Speedmath/Correct.svg";
import ComputerGame from "./ComputerGame";

import {
  getSpeedMathQuestionsLiveClass,
  submitSpeedMathAnswer,
} from "../../../../actions/dashboard";
import { normalize } from "react-native-elements";
const Questions = (props) => {
  let {
    setPageNo,
    levelId,
    liveClassId,
    gameId,
    userId,

    onGameTimerEnd,
    playMode,
    identity,
    onUpdateLiveSpeedMathScore,
    onGameTimerStartStop,
  } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionSet, setQuestionSet] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [userAnswerData, setUserAnswersData] = useState([]);

  useEffect(() => {
    // console.log("Question Started", gameId);
    // console.log("GameId", gameId);
    // console.log("userId", userId);
    // console.log("Play Mode", playMode);
    props.getSpeedMathQuestionsLiveClass(gameId, userId);
  }, []);

  useEffect(() => {
    if (playMode == "computer")
      setTimeout(function () {
        increaseComputerScore();
      }, level_1_seconds[getRandomIndex()] * 1000);
  }, [computerScore]);

  function getRandomIndex() {
    var randomItemIndex =
      level_1_seconds[Math.floor(Math.random() * level_1_seconds.length)];
    // console.log("Rand " + randomItemIndex);
    return randomItemIndex;
  }

  function increaseComputerScore() {
    setComputerScore(computerScore + 1);
  }

  // console.log("Computer Score", computerScore);

  useEffect(() => {
    let questionData = props?.gameQuestionliveClassResponse?.game_questions;
    setQuestionSet(questionData);
  }, []);

  const onCustomKeyboardNumberPress = (number) => {
    console.log("Number ", currentAnswer.length);
    var value = currentAnswer + number;
    if (currentAnswer.length < 6) setCurrentAnswer(value);
  };

  const onDeleteNumberPress = () => {
    var value = currentAnswer;
    var newValue = value.slice(0, -1);
    setCurrentAnswer(newValue);
  };

  const onPressEnter = () => {
    // var cQuestion = questionSet[currentIndex];
    var cQuestion =
      props?.gameQuestionliveClassResponse?.game_questions[currentIndex];
    var isUserCorrect = currentAnswer == cQuestion.answer;

    console.log("IsUserCorrect", isUserCorrect);
    if (isUserCorrect) {
      setUserScore(userScore + 1);
      setCompletionPercentage(Math.floor((userScore / 50) * 100));
      onUpdateLiveSpeedMathScore(userId, identity, userScore + 1);
    }

    props.submitSpeedMathAnswer(
      props?.gameQuestionliveClassResponse?.player_id,
      props?.gameQuestionliveClassResponse?.game_id,
      cQuestion.id,
      isUserCorrect,
      currentAnswer
    );
    updateNewQuestion();

    const userData = {
      question: cQuestion.question,
      correctAnswer: cQuestion.answer,
      studentAnswer: currentAnswer,
      status: isUserCorrect,
    };
    console.log("UserData app", userData);
    setUserAnswersData([...userAnswerData, userData]);
  };

  const updateNewQuestion = () => {
    let newIndex = currentIndex + 1;
    setCurrentAnswer("");
    setCurrentIndex(newIndex);
  };
  const onQuestionTimerEnd = () => {
    console.log("Time End");

    onGameTimerEnd(userAnswerData, computerScore, userScore, gameId);
  };

  const showQuestion = () => {
    const regex = /(<([^>]+)>)/gi;

    const question =
      props?.gameQuestionliveClassResponse?.game_questions[currentIndex];

    // console.log("New Question Data ", question);
    var innerHtml =
      '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="background-color:' +
      COLOR.SPEEDMATH_YELLLOW +
      ';"><h1 style="text-align: center;">' +
      question?.question +
      "</h1></body></html>";

    // console.log("InnerHtml", innerHtml);

    return (
      <View style={{ height: 50, marginVertical: 20, marginVertical: 10 }}>
        <WebView
          originWhitelist={["*"]}
          source={{ html: innerHtml }}
          containerStyle={{ alignContent: "center" }}
        />
      </View>
    );
  };

  return (
    <React.Fragment>
      <View style={styles.container}>
        <View>
          <Header mode={playMode} level={levelId} />
        </View>
        <View style={styles.questionAnswerTimer}>
          <View style={styles.questionAnswerView}>
            <View
              style={{
                backgroundColor: COLOR.SPEEDMATH_YELLLOW,
                borderRadius: 30,
                marginTop: 100,
                width: normalize(350),
                marginLeft: 20,
                height: 200,
              }}
            >
              <Text
                style={[
                  CommonStyles.text_14_bold,
                  { marginTop: 30, textAlign: "center" },
                ]}
              >
                Keep answering as quickly as you can
              </Text>
              {showQuestion()}
            </View>

            <View
              style={{
                backgroundColor: COLOR.SPEEDMATH_YELLLOW,
                borderRadius: 30,
                marginTop: 30,
                width: normalize(350),
                marginLeft: 20,
                height: 180,
              }}
            >
              <View
                style={{
                  width: 300,
                  height: 100,
                  backgroundColor: COLOR.WHITE,
                  borderRadius: 30,
                  marginVertical: 20,
                  marginTop: 20,
                  alignSelf: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={[
                    CommonStyles.text_18_bold,
                    { color: COLOR.BLACK, textAlign: "center" },
                  ]}
                >
                  {currentAnswer}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.keyboardTimerView}>
            <View style={{ display: "flex", flexDirection: "column" }}>
              <View style={styles.participantScoresView}>
                <View
                  style={{
                    width: completionPercentage,
                    borderRadius: 50,
                    backgroundColor: "#50CA95",
                    position: "absolute",
                    height: 52,
                    marginLeft: 5,
                  }}
                ></View>
                <View>
                  <SvgXml width="30" height="30" xml={CorrectSvg} />
                </View>
                <View>
                  <Text
                    style={{
                      alignItems: "center",
                      justifyContent: "flex-start",

                      color: "#233584",
                      fontWeight: "600",
                    }}
                  >
                    You
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",

                      color: "#233584",

                      fontWeight: "bold",
                    }}
                  >
                    {userScore}
                  </Text>
                </View>
              </View>
              {playMode == "computer" && (
                <View style={styles.participantScoresView}>
                  <ComputerGame computerScore={computerScore} />
                </View>
              )}
            </View>
            <View style={styles.questionTimerView}>
              <QuestionTimer
                identity={identity}
                callBack={onQuestionTimerEnd}
                onGameTimerStartStop={onGameTimerStartStop}
              />
            </View>
            <View style={styles.numpadStyleView}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <Pressable
                  onPress={() => onCustomKeyboardNumberPress(1)}
                  style={styles.keyboardButton}
                >
                  <Text
                    style={[
                      CommonStyles.text_18_bold,
                      { textAlign: "center", color: COLOR.WHITE },
                    ]}
                  >
                    1
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => onCustomKeyboardNumberPress(2)}
                  style={styles.keyboardButton}
                >
                  <Text
                    style={[
                      CommonStyles.text_18_bold,
                      { textAlign: "center", color: COLOR.WHITE },
                    ]}
                  >
                    2
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => onCustomKeyboardNumberPress(3)}
                  style={styles.keyboardButton}
                >
                  <Text
                    style={[
                      CommonStyles.text_18_bold,
                      { textAlign: "center", color: COLOR.WHITE },
                    ]}
                  >
                    3
                  </Text>
                </Pressable>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginTop: 20,
                }}
              >
                <Pressable
                  onPress={() => onCustomKeyboardNumberPress(4)}
                  style={styles.keyboardButton}
                >
                  <Text
                    style={[
                      CommonStyles.text_18_bold,
                      { textAlign: "center", color: COLOR.WHITE },
                    ]}
                  >
                    4
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => onCustomKeyboardNumberPress(5)}
                  style={styles.keyboardButton}
                >
                  <Text
                    style={[
                      CommonStyles.text_18_bold,
                      { textAlign: "center", color: COLOR.WHITE },
                    ]}
                  >
                    5
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => onCustomKeyboardNumberPress(6)}
                  style={styles.keyboardButton}
                >
                  <Text
                    style={[
                      CommonStyles.text_18_bold,
                      { textAlign: "center", color: COLOR.WHITE },
                    ]}
                  >
                    6
                  </Text>
                </Pressable>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginTop: 20,
                }}
              >
                <Pressable
                  onPress={() => onCustomKeyboardNumberPress(7)}
                  style={styles.keyboardButton}
                >
                  <Text
                    style={[
                      CommonStyles.text_18_bold,
                      { textAlign: "center", color: COLOR.WHITE },
                    ]}
                  >
                    7
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => onCustomKeyboardNumberPress(8)}
                  style={styles.keyboardButton}
                >
                  <Text
                    style={[
                      CommonStyles.text_18_bold,
                      { textAlign: "center", color: COLOR.WHITE },
                    ]}
                  >
                    8
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => onCustomKeyboardNumberPress(9)}
                  style={styles.keyboardButton}
                >
                  <Text
                    style={[
                      CommonStyles.text_18_bold,
                      { textAlign: "center", color: COLOR.WHITE },
                    ]}
                  >
                    9
                  </Text>
                </Pressable>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginTop: 20,
                }}
              >
                <Pressable
                  onPress={() => onCustomKeyboardNumberPress(0)}
                  style={styles.keyboardButton}
                >
                  <Text
                    style={[
                      CommonStyles.text_18_bold,
                      { textAlign: "center", color: COLOR.WHITE },
                    ]}
                  >
                    0
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => onDeleteNumberPress()}
                  style={styles.keyboardButton}
                >
                  <Icon
                    style={{ alignSelf: "center" }}
                    size={20}
                    name="arrow-left"
                    color={COLOR.WHITE}
                  />
                </Pressable>

                {currentAnswer.length > 0 ? (
                  <Pressable
                    onPress={onPressEnter}
                    style={{
                      backgroundColor: COLOR.BLUE_LINk,
                      width: 65,
                      height: 65,
                      borderRadius: 20,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={[
                        CommonStyles.text_12__semi_bold,
                        { textAlign: "center", color: COLOR.WHITE },
                      ]}
                    >
                      Enter
                    </Text>
                  </Pressable>
                ) : (
                  <View style={{ height: 65, width: 65 }}></View>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    state: state.dashboard,
    loading: state.dashboard.loading,
    gameQuestionliveClassStatus:
      state.dashboard.speed_math_game_start_live_status,
    gameQuestionliveClassResponse:
      state.dashboard.speed_math_game_start_live_response,
    currentSelectedKid: state.dashboard.current_selected_kid,
    speedMathGameStartStatus: state.dashboard.speed_math_game_start_status,
  };
};

const mapDispatchToProps = {
  getSpeedMathQuestionsLiveClass,
  submitSpeedMathAnswer,
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flex: 1,
    top: normalize(10),
    width: "100%",
    height: "100%",
  },

  questionAnswerTimer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",

    height: "100%",
  },

  questionAnswerView: {
    flexGrow: 2.3,
  },

  keyboardTimerView: {
    height: "80%",
    flexGrow: 1.7,

    display: "flex",
  },

  participantScoresView: {
    flexGrow: 0.2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderColor: "black",
    alignItems: "center",
    borderRadius: 30,
    marginRight: 15,
    height: 60,
    marginTop: 10,
    marginLeft: normalize(10),
    backgroundColor: COLOR.SPEEDMATH_YELLLOW,
  },

  questionTimerView: {
    flexGrow: 0.05,
    backgroundColor: COLOR.LIGHT_BLUE,
    width: 100,
    height: 100,
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLOR.BORDER_COLOR_GREEN,
    borderWidth: 5,
    marginLeft: normalize(50),
    marginTop: normalize(15),
    marginBottom: normalize(5),
  },

  numpadStyleView: {
    flexGrow: 0.6,
    justifyContent: "center",

    marginRight: normalize(20),
  },

  keyboardButton: {
    backgroundColor: COLOR.ORANGE,
    height: 65,
    width: 65,
    textAlign: "center",
    borderRadius: 20,
    justifyContent: "center",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
