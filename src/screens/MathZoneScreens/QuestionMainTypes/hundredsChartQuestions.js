import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import HtmlViwer from "../QuestionAsserts/HtmlRender";
import ModalTester from "../QuestionAsserts/outputResponseModal";
import ChoicesSection from "../QuestionAsserts/choicesComponent";
import {
  MATH_ZONE_QUESTION,
  MATH_ZONE_LIVE_CLASS_QUESTION,
  MATH_ZONE_FLAGGED_QUESTION,
  MATH_ZONE_HOME_WORK_QUESTION,
} from "../../../components/helpers/Constants";
import SolutionComponent from "../QuestionAsserts/outputResponseComponent";
import QuestionPartBuilder from "../QuestionAsserts/questionPartBuilder";

const windowHeight = Dimensions.get("window").height;
const HundredsChartQuestions = ({
  data,
  submitResponse,
  screenType,
  isResponse,
  handleStudentAnswerCorrect
}) => {
  console.log("HundredsChartQuestions", data);
  let temp1 = false;
  const question = JSON.parse(data.question_data[0].question_text);
  const [student_response, setStudentResponse] = useState(
    JSON.parse(data.question_data[0].question_text)
  );
  const question_id = data.question_data[0].question_id;

  useEffect(() => {
    let arr = [];
    let missed = [];

    for (let i = 0; i < question.questionContent.length; i++) {
      missed.push(parseInt(question.questionContent[i].value));
    }

    for (let i = 0; i < 10; i++) {
      let temp = [];
      let j = 1;
      while (j <= 10) {
        if (missed.includes(i * 10 + j)) {
          temp.push("?");
        } else {
          temp.push(i * 10 + j);
        }

        j++;
      }
      arr.push(temp);
    }
    setChartData([...arr]);
  }, []);

  // const student_response = question;
  const validate = () => {
    console.log("Validate");

    if (selectedValue == null) {
      alert("please select any one of the choice");
      return;
    }

    const answerValues = [];

    for (let i = 0; i < question.questionContent.length; i++) {
      if (question.questionContent[i].isMissed == "true") {
        answerValues.push(question.questionContent[i]);
      }
    }

    //console.log(answerValues);

    if (selectedValue == answerValues[0].value) {
      temp1 = true;
      setIsCorrect(true);
    } else {
      temp1 = false;
      setIsCorrect(false);
    }

    setSolution(question.solution.model[0].val);
    //student response to send back
    student_response.studentAnswer = selectedValue;
    setStudentResponse(student_response);

    setIsValidated(true);
    
    if( screenType == MATH_ZONE_QUESTION){
      handleStudentAnswerCorrect(temp1)
    }
    
  };

  const [isValidated, setIsValidated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [solution, setSolution] = useState("");
  const [chartData, setChartData] = useState([]);

  const handleChoices = (val) => {
    setSelectedValue(val);
  };

  return (
    <View>
      <View style={styles.outterSection}>
        <View style={{ width: "80%" }}>
          <View style={{ marginTop: 10,marginBottom:10}}>
            {/* <HtmlViwer
              source={{ html: question.questionName }}
              isQuestion={true}
            /> */}
            <QuestionPartBuilder data={question.questionName}/>
          </View>

          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                borderWidth: 1,
                backgroundColor: "lightgrey",
                width: 443,
              }}
            >
              {chartData.map((row) => {
                return (
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    {row.map((val) => {
                      return (
                        <View
                          style={[
                            {
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              height: 40,
                              width: 40,
                              borderWidth: 1,
                              margin: 2,
                            },
                            val == "?"
                              ? { backgroundColor: "gray" }
                              : { backgroundColor: "white" },
                          ]}
                        >
                          {val == "?" ? (
                            <Text
                              style={{
                                color: "white",
                                fontWeight: "bold",
                                fontSize: 30,
                              }}
                            >
                              {val}
                            </Text>
                          ) : (
                            <Text>{val}</Text>
                          )}
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            </View>
          </View>

          <ChoicesSection
            choices={question.choices}
            handleChoices={handleChoices}
            isResponse={isResponse}
            studentAnswer={student_response.studentAnswer}
          />
        </View>

        {screenType == MATH_ZONE_QUESTION ? (
          <View style={styles.submitButtonSection}>
            {isValidated ? (
              <Pressable
                style={styles.buttonStyle}
                onPress={() => {
                  submitResponse(question_id, student_response, isCorrect);
                  setIsValidated(false);
                  setIsCorrect(false);
                }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  Submit
                </Text>
              </Pressable>
            ) : (
              <Pressable
                style={styles.buttonStyle}
                onPress={() => {
                  validate();
                  // setIsValidated(true);
                }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  Solve
                </Text>
              </Pressable>
            )}
          </View>
        ) : (
          <></>
        )}

        {screenType == MATH_ZONE_LIVE_CLASS_QUESTION ? (
          <View style={styles.submitButtonSection}>
            {isValidated ? (
              <View
                style={{
                  height: 30,
                  width: 100,
                  borderWidth: 1,
                  borderColor: "white",
                  backgroundColor: "white",
                }}
              >
                <Text style={{ fontWeight: "bold", color: "black" }}>
                  please wait..
                </Text>
              </View>
            ) : (
              <Pressable
                style={styles.buttonStyle}
                onPress={() => {
                  validate();
                  setIsValidated(true);
                  // temp1 = isCorrect;
                  submitResponse(question_id, student_response, temp1);
                }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  Solve
                </Text>
              </Pressable>
            )}
          </View>
        ) : (
          <></>
        )}

        {screenType == MATH_ZONE_FLAGGED_QUESTION ? (
          <View style={styles.submitButtonSection}>
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {
                setSolution(question.solution.model[0].val);
                setIsValidated(true);
                setIsCorrect(true);
              }}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>
                Show Soln
              </Text>
            </Pressable>
          </View>
        ) : (
          <></>
        )}

        {screenType == MATH_ZONE_HOME_WORK_QUESTION ? (
          <View style={styles.submitButtonSection}>
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {
                setSolution(question.solution.model[0].val);
                setIsValidated(true);
                setIsCorrect(true);
              }}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>Solve</Text>
            </Pressable>
          </View>
        ) : (
          <></>
        )}
      </View>

      {screenType == MATH_ZONE_QUESTION && isValidated && (
        <ModalTester
          deviceHeight={windowHeight}
          isCorrect={isCorrect}
          solution={solution}
        />
      )}

      {(screenType == MATH_ZONE_LIVE_CLASS_QUESTION ||
        screenType == MATH_ZONE_FLAGGED_QUESTION) &&
        isValidated && (
          <SolutionComponent
            isCorrect={isCorrect}
            solution={solution}
            isMathquill={true}
            screenType={screenType}
          />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    height: 30,
    width: 75,
    backgroundColor: "#3E46FF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonSection: {
    width: "20%",
    // marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  outterSection: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
    minHeight: windowHeight / 1.2,
  },
  row: {
    height: 40,
    minWidth: 50,
    // flex:1,
    // borderWidth:1,
    // borderColor:"orange",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    minWidth: 40,
  },
});

export default HundredsChartQuestions;
