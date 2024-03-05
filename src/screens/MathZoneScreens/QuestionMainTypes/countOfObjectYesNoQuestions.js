import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import HtmlViwer from "../QuestionAsserts/HtmlRender";
import ModalTester from "../QuestionAsserts/outputResponseModal";
import {
  MATH_ZONE_QUESTION,
  MATH_ZONE_LIVE_CLASS_QUESTION,
  MATH_ZONE_FLAGGED_QUESTION,
  MATH_ZONE_HOME_WORK_QUESTION,
} from "../../../components/helpers/Constants";
import SolutionComponent from "../QuestionAsserts/outputResponseComponent";
import MathQuillHtmlRender from "../QuestionAsserts/MathQuillHtmlRender";
import QuestionPartBuilder from "../QuestionAsserts/questionPartBuilder";

const windowHeight = Dimensions.get("window").height;

const CountOfObjectYesNoQuestions = ({
  data,
  submitResponse,
  screenType,
  isResponse,
  handleStudentAnswerCorrect
}) => {
  console.log("CountOfObjectYesNoQuestions", data);

  let temp1 = false;
  const question = JSON.parse(data.question_data[0].question_text);
  const [student_response, setStudentResponse] = useState(
    JSON.parse(data.question_data[0].question_text)
  );
  const question_id = data.question_data[0].question_id;

  const [isValidated, setIsValidated] = useState(false);
  const [isClickedYesNo, setIsClickedYesNo] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [solution, setSolution] = useState("");

  const Pattern = ({ item }) => {
    function findPattern(num) {
      let arr = [];
      if (num == 1 || num == 2) {
        arr[0] = num;
        return arr;
      }
      let val = num;
      let i = 1;
      let remaining = 0;
      while (val > 0) {
        val = val - i;
        if (val >= 0) {
          arr.push(i);
          i++;
        } else {
          remaining = i + val;
        }
      }
      addRemaining(arr, remaining);
      return arr;
    }

    function addRemaining(arr, rem) {
      if (rem == 0) {
        return;
      }
      if (rem === arr[arr.length - 1]) {
        arr.push(rem);
        return;
      }

      let index = arr.length - rem - 1;
      if (index == 0) {
        index = 1;
      }
      for (let i = index, j = 1; i < arr.length; i++, j++) {
        arr[i] = arr[i] + 1;
        rem = rem - 1;
        // arr[i] = arr[i]+j;
        // rem = rem - j;
        if (rem <= 0) {
          break;
        }
      }
      return;
    }

    let patternArr = findPattern(item.count);

    let patt = [];

    for (let i = 0; i < patternArr.length; i++) {
      let im = [];
      for (let j = 0; j < patternArr[i]; j++) {
        // im[j] = <HtmlViwer source={{ html: item.img }} />;
        im[j] = <QuestionPartBuilder data={item.img} imgSize={50}/>;
      }
      patt.push(im);
    }

    return (
      <View>
        {patt.map((arr) => {
          return (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              {arr.map((val, i) => val)}
            </View>
          );
        })}
      </View>
    );
  };

  const validate = () => {
    if (isClickedYesNo == "") {
      alert("Please click yes/no");
      return;
    }

    if (isClickedYesNo == question.answer) {
      temp1 = true;
      setIsCorrect(true);
    } else {
      temp1 = false;
      setIsCorrect(false);
    }

    setSolution(question.solution.model[0].val);

    //student response to send back
    student_response.studentAnswer = isClickedYesNo;
    setStudentResponse(student_response);
    if( screenType == MATH_ZONE_QUESTION){
      handleStudentAnswerCorrect(temp1)
    }
  };

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.mainContent}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
            }}
          >
            <View style={{ margin: 10 }}>
              {/* <Text style={{fontSize: 20, color: 'blue', fontWeight: 'bold'}}>
                  {question.questionName}
                </Text> */}
              {/* <MathQuillHtmlRender
                content={question.questionName}
                isQuestion={true}
              /> */}
              <QuestionPartBuilder data={question.questionName}/>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              {question.questionContent[0].map((item, index) => {
                return (
                  <View key={index} style={[styles.box,{minWidth:200,width:"auto"}]}>
                    <Pattern item={item} />
                  </View>
                );
              })}
            </View>
          </View>

          {isResponse == true ? (
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TouchableOpacity
                style={[
                  styles.buttonYesNo,
                  question.studentAnswer == "yes"
                    ? { backgroundColor: "blue" }
                    : {},
                ]}
              >
                <Text
                  style={[
                    {
                      textAlign: "center",
                      fontWeight: "bold",
                    },
                    isClickedYesNo == "yes" ? { color: "white" } : {},
                  ]}
                >
                  YES
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.buttonYesNo,
                  question.studentAnswer == "no"
                    ? { backgroundColor: "blue" }
                    : {},
                ]}
              >
                <Text
                  style={[
                    {
                      textAlign: "center",
                      fontWeight: "bold",
                    },
                    isClickedYesNo == "no" ? { color: "white" } : {},
                  ]}
                >
                  NO
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TouchableOpacity
                style={[
                  styles.buttonYesNo,
                  isClickedYesNo == "yes" ? { backgroundColor: "blue" } : {},
                ]}
                onPress={() => {
                  if (isValidated == false) {
                    setIsClickedYesNo("yes");
                  }
                }}
              >
                <Text
                  style={[
                    {
                      textAlign: "center",
                      fontWeight: "bold",
                    },
                    isClickedYesNo == "yes" ? { color: "white" } : {},
                  ]}
                >
                  YES
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.buttonYesNo,
                  isClickedYesNo == "no" ? { backgroundColor: "blue" } : {},
                ]}
                onPress={() => {
                  if (isValidated == false) {
                    setIsClickedYesNo("no");
                  }
                }}
              >
                <Text
                  style={[
                    {
                      textAlign: "center",
                      fontWeight: "bold",
                    },
                    isClickedYesNo == "no" ? { color: "white" } : {},
                  ]}
                >
                  NO
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {screenType == MATH_ZONE_QUESTION ? (
          <View style={styles.submitButtonSection}>
            {isValidated ? (
              <Pressable
                style={styles.buttonStyle}
                onPress={() => {
                  // var formData = new FormData();
                  // formData.append("student_response", student_response)
                  // //  formData.append("student_answer", isClickedYesNo)
                  // submitResponse(question_id, formData)
                  submitResponse(question_id, student_response, isCorrect);

                  setIsValidated(false);
                  setIsClickedYesNo("");
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
                  setIsValidated(true);
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
  box: {
    // borderWidth: 2,
    width: 200,
    minHeight: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  buttonStyle: {
    height: 30,
    width: 75,
    backgroundColor: "#3E46FF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  mainContent: {
    // display: 'flex',
    // flexDirection: 'row',
    width: "80%",
    // flexWrap: 'wrap',
  },
  submitButtonSection: {
    width: "20%",
  },
  buttonYesNo: {
    //backgroundColor: 'blue',
    borderRadius: 30,
    minHeight: 40,
    width: 80,
    borderWidth: 1,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CountOfObjectYesNoQuestions;
