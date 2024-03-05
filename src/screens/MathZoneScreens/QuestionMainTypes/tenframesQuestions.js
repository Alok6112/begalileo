import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
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
import QuestionPartBuilder from "../QuestionAsserts/questionPartBuilder";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//console.log(res.data.question_data[0].question_type);
// let qus = res.data.question_data[0].question_text
// let finalData = JSON.parse(qus)
// console.log(finalData);
// console.log(windowWidth/ parseInt(finalData.cols));
// setColumnWidth((windowWidth/ parseInt(finalData.cols)))
// setQuestion(finalData)

const TenFramesQuestions = ({
  data,
  submitResponse,
  screenType,
  isResponse,
  handleStudentAnswerCorrect
}) => {
  //const question_id = data.question_data[0].question_id
  //data = {"operation":"addition","type":"tenframes","questionName":"Add counters in the frame to make 10\u003cdiv\u003e\u003cbr\u003e\u003c/div\u003e","questionContent":"\u003cimg src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/GS-110.png\"\u003e","answerCount":"10","rows":2,"columns":5}

  console.log("TenFramesQuestions", data);
  let temp1 = false;
  const question = JSON.parse(data.question_data[0].question_text);
  const [student_response, setStudentResponse] = useState(
    JSON.parse(data.question_data[0].question_text)
  );
  const question_id = data.question_data[0].question_id;

  const [isValidated, setIsValidated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [solution, setSolution] = useState("");

  const picSource = {
    html: `
<div style='text-align:center;'>
${question.questionContent}
</div>`,
  };

  const [counter, setCounter] = useState(0);
  const handleCounterInc = () => {
    setCounter((prev) => {
      if (prev < 10) {
        return prev + 1;
      }
      return prev;
    });
  };

  const handleCounterDec = () => {
    setCounter((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  };

  // const student_response = data;
  const validate = () => {
    if (counter == 0) {
      console.log("please incrememnt the counter");
      alert("please incrememnt the counter")
      return;
    }

    if (counter == question.answerCount) {
      temp1 = true;
      setIsCorrect(true);
    } else {
      temp1 = false;
      setIsCorrect(false);
    }

    setSolution(`Correct count is ${question.answerCount}`);
    //student response to send back
    student_response.studentAnswer = counter;
    setStudentResponse(student_response);

    setIsValidated(true);
    
    if( screenType == MATH_ZONE_QUESTION){
      handleStudentAnswerCorrect(temp1)
    }
    
  };

  return (
    <View>
      <View style={[styles.outterSection]}>
        <View style={{ width: "80%"}}>
          <View style={{ display: "flex", marginTop: 10, marginBottom: 10}}>
            {/* <HtmlViwer
              source={{ html: question.questionName }}
              isQuestion={true}
            /> */}
            <QuestionPartBuilder data={ question.questionName }/>
          </View>

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
          <View>

          <View style={{ flexDirection: "row" }}>
            <View style={styles.imgBox}>
              {/* <HtmlViwer
                source={
                  counter >= 1 || question.studentAnswer >= 1 ? picSource : ""
                }
              /> */}
              {
               (counter >= 1 || question.studentAnswer >= 1) && <QuestionPartBuilder data={question.questionContent} imgSize={50}/>
              }
            </View>
            <View style={styles.imgBox}>
              {/* <HtmlViwer
                source={
                  counter >= 2 || question.studentAnswer >= 2 ? picSource : ""
                }
              /> */}
              {
               (counter >= 2 || question.studentAnswer >= 2) && <QuestionPartBuilder data={question.questionContent} imgSize={50}/>
              }
            </View>
            <View style={styles.imgBox}>
              {/* <HtmlViwer
                source={
                  counter >= 3 || question.studentAnswer >= 3 ? picSource : ""
                }
              /> */}
              {
               (counter >= 3 || question.studentAnswer >= 3) && <QuestionPartBuilder data={question.questionContent} imgSize={50}/>
              }
            </View>
            <View style={styles.imgBox}>
              {/* <HtmlViwer
                source={
                  counter >= 4 || question.studentAnswer >= 4 ? picSource : ""
                }
              /> */}
              {
               (counter >= 4 || question.studentAnswer >= 4) && <QuestionPartBuilder data={question.questionContent} imgSize={50}/>
              }
            </View>
            <View style={styles.imgBox}>
              {/* <HtmlViwer
                source={
                  counter >= 5 || question.studentAnswer >= 5 ? picSource : ""
                }
              /> */}
              {
               (counter >= 5 || question.studentAnswer >= 5) && <QuestionPartBuilder data={question.questionContent} imgSize={50}/>
              }
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={styles.imgBox}>
              {/* <HtmlViwer
                source={
                  counter >= 6 || question.studentAnswer >= 6 ? picSource : ""
                }
              /> */}
              {
               (counter >= 6 || question.studentAnswer >= 6) && <QuestionPartBuilder data={question.questionContent} imgSize={50}/>
              }
            </View>
            <View style={styles.imgBox}>
              {/* <HtmlViwer
                source={
                  counter >= 7 || question.studentAnswer >= 7 ? picSource : ""
                }
              /> */}
              {
               (counter >= 7 || question.studentAnswer >= 7) && <QuestionPartBuilder data={question.questionContent} imgSize={50}/>
              }
            </View>
            <View style={styles.imgBox}>
              {/* <HtmlViwer
                source={
                  counter >= 8 || question.studentAnswer >= 8 ? picSource : ""
                }
              /> */}
              {
               (counter >= 8 || question.studentAnswer >= 8) && <QuestionPartBuilder data={question.questionContent} imgSize={50}/>
              }
            </View>
            <View style={styles.imgBox}>
              {/* <HtmlViwer
                source={
                  counter >= 9 || question.studentAnswer >= 9 ? picSource : ""
                }
              /> */}
              {
               (counter >= 9 || question.studentAnswer >= 9) && <QuestionPartBuilder data={question.questionContent} imgSize={50}/>
              }
            </View>
            <View style={styles.imgBox}>
              {/* <HtmlViwer
                source={
                  counter >= 10 || question.studentAnswer >= 10 ? picSource : ""
                }
              /> */}
              {
               (counter >= 10 || question.studentAnswer >= 10) && <QuestionPartBuilder data={question.questionContent} imgSize={50}/>
              }
            </View>
          </View>

          {question.after_question_text != null ? (
            <View style={{ marginTop: 10 }}>
              {/* <HtmlViwer
                source={{ html: question.after_question_text }}
                isQuestion={true}
              /> */}
              <QuestionPartBuilder data={ question.after_question_text }/>
            </View>
          ) : (
            <></>
          )}

          {isResponse == true ? (
            <></>
          ) : (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 10,
                marginLeft: "17.5%",
                marginBottom:0
              }}
            >
              <Pressable
                onPress={handleCounterInc}
                style={{
                  borderWidth: 1,
                  width: 100,
                  backgroundColor: "lightgreen",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 1,
                  }}
                >
                  <Text style={{ fontSize: 30 }}>+1</Text>
                  <HtmlViwer source={{ html: question.questionContent }} />
                </View>
              </Pressable>

              <Pressable
                onPress={handleCounterDec}
                style={{ borderWidth: 1, width: 100, backgroundColor: "red" }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 1,
                  }}
                >
                  <Text style={{ fontSize: 30 }}>-1</Text>
                  <HtmlViwer source={{ html: question.questionContent }} />
                </View>
              </Pressable>
            </View>
          )}
          </View>
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
                setSolution(`Correct count is ${question.answerCount}`);
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
                setSolution(`Correct count is ${question.answerCount}`);
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
    // minHeight: windowHeight / 1.2,
  },
  imgBox:{
    minWidth: 60,
    minHeight: 50,
    borderWidth: 1 ,
    width:"auto",
    height:"auto",
    alignItems:"center",
    padding:2
  }
});

export default TenFramesQuestions;
