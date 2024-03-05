import React, { useEffect, useState, useRef } from "react";
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
import MathQuillHtmlRender from "../QuestionAsserts/MathQuillHtmlRender";

import {
  MATH_ZONE_QUESTION,
  MATH_ZONE_LIVE_CLASS_QUESTION,
  MATH_ZONE_FLAGGED_QUESTION,
  MATH_ZONE_HOME_WORK_QUESTION,
} from "../../../components/helpers/Constants";
import SolutionComponent from "../QuestionAsserts/outputResponseComponent";
import QuestionPartBuilder from "../QuestionAsserts/questionPartBuilder";

const windowHeight = Dimensions.get("window").height;

const OptionMultiplePicturesQuestions = ({
  data,
  submitResponse,
  screenType,
  isResponse,
  handleStudentAnswerCorrect
}) => {
  console.log("screenType", screenType);
  console.log("OptionMultiplePicturesQuestions", data);
  // let temp1 = false;
  const [question, setQuestion] = useState(
    JSON.parse(data.question_data[0].question_text)
  );
  const [student_response, setStudentResponse] = useState(
    JSON.parse(data.question_data[0].question_text)
  );
  const question_id = data.question_data[0].question_id;

  const [isValidated, setIsValidated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [solution, setSolution] = useState("");

  const validate = () => {
    let sol = question?.solution?.model.map((e)=>{
      console.log(e);
      return e.val
    })

    if(selectedValue == null){
      alert("Please select any one of the choice")
      return -1;
    }
    //setSolution(question?.solution?.model[0]?.val);
    setSolution(sol)

    //student response to send back

    student_response.studentAnswer = selectedValue;
    setStudentResponse(student_response);
   
    if( screenType == MATH_ZONE_QUESTION){
      handleStudentAnswerCorrect(isCorrect)
    }

  };

  return (
    <View>
      <View style={styles.outterSection}>
        <View style={{ width: "80%" }}>
          <View style={{ marginTop: 10 ,marginBottom:10}}>
            {/* <HtmlViwer source={{html: question.questionName}} isQuestion={true} /> */}
            {/* <MathQuillHtmlRender
              content={question.questionName}
              isQuestion={true}
            /> */}
            <QuestionPartBuilder data={question.questionName} imgSize={200} aspectRatio={1}/>
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

          <View style={{ display: "flex", flexDirection: "row" }}>
            {question?.questionContent?.map((item) => {
              console.log("item", item);
              return (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    // justifyContent: "center",
                    // alignItems: "center",
                    // marginTop: 10,
                    flexWrap: "wrap",
                    // borderWidth:1
                  }}
                >
                  {isResponse == true
                    ? item?.map((val) => {
                        //return <View><HtmlViwer source={{html: val.value}} /></View>
                        return (
                          <Pressable
                            style={
                              val.value.length > 24
                                ? { width: "100%" }
                                : { width: "50%" }
                            }
                          >
                            {console.log("Checker", val.value)}
                            {/* <MathQuillHtmlRender
                              content={val.value}
                              clickedOption={
                                question?.studentAnswer == val.value
                                  ? true
                                  : false
                              }
                            /> */}

                            <View style={{borderWidth:2,borderColor:"#D0D4E1",borderRadius:8,padding:10,margin:5,backgroundColor: question?.studentAnswer == val.value ?"#EDEFFC":"white"}}>
                                 <QuestionPartBuilder data={val.value} />     
                            </View>

                          </Pressable>
                        );
                      })
                    : item?.map((val) => {
                        //return <View><HtmlViwer source={{html: val.value}} /></View>
                        return (
                          <Pressable
                            style={
                              val.value.length > 24
                                ? { width: "100%" }
                                : { width: "50%" }
                            }
                            onPress={() => {
                              if (!isValidated) {
                                setSelectedValue(val.value);
                                setIsCorrect(val.selected == "true");
                              }
                            }}
                          >
                            {console.log("Checker", val.value.length)}
                            {/* <MathQuillHtmlRender
                              content={val.value}
                              clickedOption={
                                selectedValue == val.value ? true : false
                              }
                            /> */}
                            
                              <View style={{borderWidth:2,borderColor:"#D0D4E1",borderRadius:8,padding:10,margin:5,marginLeft:0, backgroundColor:selectedValue == val.value ?"#EDEFFC":"white"}}>
                                 <QuestionPartBuilder data={val.value} imgSize={50} aspectRatio={1}/>     
                              </View>
                           
                          </Pressable>
                        );
                      })}
                </View>
              );
            })}
          </View>

          {question.after_question_text != null ? (
            <View style={{ marginTop: 10 }}>
              {/* <HtmlViwer
                source={{ html: question.after_question_text }}
                isQuestion={true}
              /> */}
              <QuestionPartBuilder data={question.after_question_text}/>
            </View>
          ) : (
            <></>
          )}
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
                <Text
                  style={{
                    fontFamily: "Montserrat",
                    fontStyle: "normal",
                    fontWeight: "700",
                    color: "white",
                  }}
                >
                  Submit
                </Text>
              </Pressable>
            ) : (
              <Pressable
                style={styles.buttonStyle}
                onPress={() => {
                 if( validate() != -1)
                  setIsValidated(true)
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

                  if( validate() != -1){
                    setIsValidated(true);
                    // temp1 = isCorrect;
                    submitResponse(
                      question_id,
                      student_response,
                      isCorrect,
                      true
                    );
                  }

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
                setSolution(question?.solution?.model[0]?.val);
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
                setSolution(question?.solution?.model[0]?.val);
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

      {/* {screenType == MATH_ZONE_QUESTION && isValidated && (
        <ModalTester
          deviceHeight={windowHeight}
          isCorrect={isCorrect}
          solution={solution}
          isMathquill={true}
        />
      )} */}

      {screenType == MATH_ZONE_QUESTION && isValidated &&
           <ModalTester
              deviceHeight={windowHeight}
              isCorrect={isCorrect}
              solution={solution}
              isMathquill={true}
            /> 
        //  <SolutionComponent isCorrect={isCorrect} solution={solution} isMathquill={true} screenType={screenType}/>
        }
      
       { ( screenType == MATH_ZONE_LIVE_CLASS_QUESTION || screenType == MATH_ZONE_FLAGGED_QUESTION ) && isValidated && <SolutionComponent isCorrect={isCorrect} solution={solution} isMathquill={true} screenType={screenType}/>}
    
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
  },
});

export default OptionMultiplePicturesQuestions;
