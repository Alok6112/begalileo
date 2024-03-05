import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import ChoicesSection from "../QuestionAsserts/choicesComponent";
import HtmlViwer from "../QuestionAsserts/HtmlRender";
import ModalTester from "../QuestionAsserts/outputResponseModal";
import {
  MATH_ZONE_QUESTION,
  MATH_ZONE_LIVE_CLASS_QUESTION,
  MATH_ZONE_FLAGGED_QUESTION,
  MATH_ZONE_HOME_WORK_QUESTION,
} from "../../../components/helpers/Constants";
import SolutionComponent from "../QuestionAsserts/outputResponseComponent";
import QuestionPartBuilder from "../QuestionAsserts/questionPartBuilder";

const windowHeight = Dimensions.get("window").height;

const HorizontalNotSymbolsQuestions = ({
  data,
  submitResponse,
  screenType,
  isResponse,
  handleStudentAnswerCorrect
}) => {
  let temp1 = false;
  const question = JSON.parse(data.question_data[0].question_text);
  const [student_response, setStudentResponse] = useState(
    JSON.parse(data.question_data[0].question_text)
  );
  const question_id = data.question_data[0].question_id;

  console.log("HorizontalNotSymbolsQuestions", data);
  const [isValidated, setIsValidated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [solution, setSolution] = useState("");
  // const student_response = data;

  // data = {
  //   operation: 'addition',
  //   type: 'horizontalnotsymbols',
  //   rows: '1',
  //   cols: '5',
  //   questionName:
  //     'The numbers are arranged from greatest to least. Find the missing number.',
  //   questionContentText: 'Greatest to least',
  //   questionContent: [
  //     [
  //       {
  //         row: 1,
  //         col: 1,
  //         value:
  //           '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/NumberCards/43.png"\u003e',
  //       },
  //       {
  //         row: 1,
  //         col: 2,
  //         value:
  //           '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/NumberCards/39.png"\u003e',
  //       },
  //       {
  //         row: 1,
  //         col: 3,
  //         value:
  //           '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/NumberCards/27.png"\u003e',
  //       },
  //       {
  //         row: 1,
  //         col: 4,
  //         value:
  //           '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/NumberCards/Question-mark.png"\u003e',
  //       },
  //       {
  //         row: 1,
  //         col: 5,
  //         value:
  //           '\u003cimg src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/NumberCards/21.png"\u003e',
  //       },
  //     ],
  //   ],
  //   solution: {
  //     model: [{val: 'The missing number is 26'}],
  //     sidebyside: [],
  //     srows: null,
  //     scols: null,
  //   },
  //   choices: ['19', '34', '29', '24'],
  //   choiceType: 'selectchoice',
  //   choiceCount: 4,
  //   answerValue: '24',
  // };

  const handleChoices = (val) => {
    console.log("choice selected", val);
    setSelectedValue(val);
  };

  const validate = () => {
    console.log("Validate");
    console.log(selectedValue == null);
    if (selectedValue == null) {
      console.log("Please choose the option");
      return;
    }

    if (question.answerValue == selectedValue) {
      temp1 = true;
      setIsCorrect(true);
    } else {
      temp1 = false;
      setIsCorrect(false);
    }

    setSolution(question.solution.model[0].val);

    //student response to send back
    //student_response.studentAnswer = selectedValue
    student_response.studentAnswer = selectedValue;
    setStudentResponse(student_response);
    if( screenType == MATH_ZONE_QUESTION){
      handleStudentAnswerCorrect(temp1)
    }
  };

  return (
    <ScrollView>
      <View style={styles.outterSection}>
        <View style={{ width: "80%" }}>
          <View style={{ marginTop: 10 }}>
            {/* <HtmlViwer
              source={{ html: question.questionName }}
              isQuestion={true}
            /> */}
            <QuestionPartBuilder data={question.questionName}/>
          </View>
          <View>
            {question.upload_file_name != null ? (
              <View style={{ minWidth: 300, height: 200, margin: 10 }}>
                <Image
                  source={{ uri: question.upload_file_name }}
                  style={{
                    aspectRatio: 2,
                    alignSelf: "center",
                    height: "100%",
                    width: "100%",
                  }}
                />
              </View>
            ) : (
              <></>
            )}
          </View>
          <View style={{ marginTop: 10 }}>
            {/* <HtmlViwer source={{ html: question.questionContentText }} /> */}
            <QuestionPartBuilder data={ question.questionContentText }/>
          </View>

          <View>
            {question.questionContent.map((item) => {
              return (
                <View style={{ display: "flex", flexDirection: "row" }}>
                  {item.map((val) => {
                    // return <HtmlViwer source={{ html: val.value }} />;
                    return <QuestionPartBuilder data={ val.value } imgSize={50}/>
                  })}
                </View>
              );
            })}
          </View>
          {question.after_question_text != null ? (
            <View style={{ marginTop: 10 }}>
              <HtmlViwer
                source={{ html: question.after_question_text }}
                isQuestion={true}
              />
            </View>
          ) : (
            <></>
          )}
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
    </ScrollView>
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
  },
});

export default HorizontalNotSymbolsQuestions;
