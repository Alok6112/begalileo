import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
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

const BaseBlockImagesQuestions = ({
  data,
  submitResponse,
  screenType,
  isResponse,
  handleStudentAnswerCorrect
}) => {
  console.log("BaseBlockImagesQuestions", data);
  let temp1 = false;
  const [isValidated, setIsValidated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [solution, setSolution] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);

  //const question = {"operation":"addition","type":"base_block_images","rows":"1","cols":"1","questionName":"Use the model to subtract\u0026nbsp;\u003cdiv\u003e800 - 300\u0026nbsp;\u003c/div\u003e","questionContent":[[{"row":0,"col":0,"value":"\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred_Cross.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred_Cross.png\"\u003e\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/BaseTenBlocks/Green-Hundred_Cross.png\"\u003e"}]],"solution":{"model":[{"val":"800 - 300 = 500\u0026nbsp;"}],"sidebyside":[],"srows":null,"scols":null},"choices":["50","500","40","400"],"choiceType":"selectchoice","choiceCount":4,"answer":"500"}

  const question = JSON.parse(data.question_data[0].question_text);
  const [student_response, setStudentResponse] = useState(
    JSON.parse(data.question_data[0].question_text)
  );
  const question_id = data.question_data[0].question_id;

  const validate = () => {
    if (selectedValue == "") {
      alert("Please select the choice");
      return;
    }

    if (
      selectedValue.trim().toLowerCase() == question.answer.trim().toLowerCase()
    ) {
      temp1 = true;
      setIsCorrect(true);
    } else {
      temp1 = false;
      setIsCorrect(false);
    }

    let sln = question.solution.model?.map((item)=> `${item.val}`+'</br>')
    setSolution(sln.join(" "))
    //setSolution(question.solution.model[0].val);

    //student response to send back
    student_response.studentAnswer = selectedValue;
    setStudentResponse(student_response);
    handleStudentAnswerCorrect(temp1)
  };

  const handleChoices = (val) => {
    console.log(val);
    setSelectedValue(val);
  };

  return (
    <View>
      <View style={styles.outterSection}>
        <View style={{ width: "80%" }}>
          <View style={{ marginTop: 10,marginBottom:10 }}>
            {/* <HtmlViwer
              source={{ html: question.questionName }}
              isQuestion={true}
            /> */}
            <QuestionPartBuilder data={ question.questionName }/>
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
          <View>
            {question.questionContent.map((item) => {
              return (
                <View style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
                  {item.map((val) => {
                    return (
                      // <HtmlViwer
                      //   source={{ html: val.value }}
                      //   isColumnView={true}
                      // />
                      <QuestionPartBuilder data={ val.value } imgSize={50}/>
                    );
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
            isValidated={isValidated}
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
    // width: '80%',
    // flexWrap: 'wrap',
  },
  submitButtonSection: {
    width: "20%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
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

  outterSection: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
  },
});

export default BaseBlockImagesQuestions;
