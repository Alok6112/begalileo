import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import HtmlViwer from "../../QuestionAsserts/HtmlRender";
import ModalTesterGeneric from "../../QuestionAsserts/scrollableModalForOutpuResponse";
import MathQuillHtmlRender from "../../QuestionAsserts/MathQuillHtmlRender";
import {
  MATH_ZONE_QUESTION,
  MATH_ZONE_LIVE_CLASS_QUESTION,
  MATH_ZONE_FLAGGED_QUESTION,
  MATH_ZONE_HOME_WORK_QUESTION,
} from "../../../../components/helpers/Constants";
import SolutionComponentOldTypes from "../../QuestionAsserts/outputResponseComponentForOldTypes";
import InCorrectBox from "../../QuestionAsserts/IncorrectBox";
import QuestionPartBuilder from "../../QuestionAsserts/questionPartBuilder";
import ModalTester from "../../QuestionAsserts/outputResponseModal";

const windowWidth = Dimensions.get("window").width;

const MultipleChoiceQuestions = ({
  data,
  submitResponse,
  screenType,
  isResponse,
  handleStudentAnswerCorrect
}) => {
  console.log(
    "MultipleChoiceQuestions 789",
    data.question_data[0].question_text
  );

  let temp1 = false;
  const question = data.question_data[0];
  const [student_response, setStudentResponse] = useState();
  const question_id = data.question_data[0].question_id;

  const [isValidated, setIsValidated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [correctChoice, setCorrectChoice] = useState(null);

  const handleChoices = (val) => {
    console.log(val);
    setSelectedValue(val);
  };

  useEffect(() => {
    let arr = question.choice_data;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].correct) {
        console.log(arr[i]);
        setCorrectChoice(arr[i]);
      }
    }
  }, []);

  const validate = () => {
    if (selectedValue == null) {
      alert("please select any one of the choice");
      return;
    }

    if (selectedValue.correct) {
      temp1 = true;
      setIsCorrect(true);
    } else {
      temp1 = false;
      setIsCorrect(false);
    }

    let outputObject = {
      key: "choice",
      value: selectedValue.choice_id,
    };
    setStudentResponse({ ...outputObject });
    setIsValidated(true);

    if (screenType == MATH_ZONE_LIVE_CLASS_QUESTION) {
      submitResponse(question_id, outputObject, temp1, true);
    }

    if( screenType == MATH_ZONE_QUESTION){
      handleStudentAnswerCorrect(temp1)
    }
  };

  return (
    <ScrollView>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "80%",
            flexWrap: "wrap",
            marginTop: 10,
          }}
        >
          {/* <HtmlViwer source={{html: question.question_text}} isQuestion={true} /> */}
          <View style={{ width: "100%" }}>
         
          {
            question.html_type ?
            <MathQuillHtmlRender
              content={question.question_text}
              isQuestion={true}
            />
            :
            <View style={{marginLeft:10}}>
            <QuestionPartBuilder data={question.question_text}/>
            </View>
          }

          </View>
          {question.upload_file_name != "" ? (
            <View style={{ minWidth: 300, height: 200 }}>
              <Image
                source={{ uri: question.upload_file_name }}
                style={{
                  alignSelf: "center",
                  aspectRatio: 2,
                  height: "100%",
                  width: "100%",
                  resizeMode: "contain",
                }}
              />
            </View>
          ) : (
            <></>
          )}
          <ChoicesSection
            choices={question.choice_data}
            handleChoices={handleChoices}
            isResponse={isResponse}
            studentAnswer={question.choice_id}
          />
        </View>

        {screenType == MATH_ZONE_QUESTION ? (
          <View style={{ width: "20%", margin: 10 }}>
            {isValidated ? (
              <Pressable
                style={styles.buttonStyle}
                onPress={() => {
                  submitResponse(
                    question_id,
                    student_response,
                    isCorrect,
                    true
                  );
                  setIsValidated(false);
                  //setClickedOption(-1)
                  setIsCorrect(false);
                  console.log("Submit");
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
                  console.log("Validate");
                  validate();
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

        {/* { screenType == MATH_ZONE_HOME_WORK_QUESTION ?
          <View style={styles.submitButtonSection}> 
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {
                setIsValidated(true)
                setIsCorrect(true)
              }}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>Solve</Text>
            </Pressable>
          </View>:<></>
        } */}
      </View>
      {screenType == MATH_ZONE_QUESTION && isValidated && (
        <ModalTesterGeneric
          isCorrect={isCorrect}
          solution={correctChoice}
          isOldType={true}
        />
      )}

      {(screenType == MATH_ZONE_LIVE_CLASS_QUESTION ||
        screenType == MATH_ZONE_FLAGGED_QUESTION) &&
        isValidated && (
          <SolutionComponentOldTypes
            isCorrect={isCorrect}
            solution={correctChoice}
            isOldType={true}
            screenType={screenType}
          />
        )}

      {screenType == MATH_ZONE_HOME_WORK_QUESTION &&
        isResponse == false &&
        !isValidated &&
        correctChoice != null && (
          <>
            <SolutionComponentOldTypes
              isCorrect={false}
              solution={correctChoice}
              isOldType={true}
              screenType={screenType}
            />
            <InCorrectBox />
          </>
        )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  box: {
    borderWidth: 2,
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
  option: {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    margin: 5,
    padding: 5,
    // minWidth: windowWidth / 3,
    width: "100%",
    borderWidth: 2,
    borderColor: "#D0D4E1",
    borderRadius: 12,
  },
  circle: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    margin: 5,
    padding: 5,
    height: 30,
    width: 30,
    borderRadius: 15,
  },
});

const ChoicesSection = ({
  choices,
  handleChoices,
  isResponse,
  studentAnswer,
}) => {
  let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

  const [optionClicked, setOptionClicked] = useState("");

  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 10,
        }}
      >
        {choices?.map((e, i) => {
          return (
            <>
              {isResponse == true ? (
                <View style={[styles.option]}>
                  <View
                    style={
                      e.choice_id != studentAnswer
                        ? styles.circle
                        : [styles.circle, { backgroundColor: "#2fb8bb" }]
                    }
                  >
                    <Text
                      style={
                        optionClicked != letters[i]
                          ? { fontWeight: "bold" }
                          : { fontWeight: "bold", color: "white" }
                      }
                    >
                      {letters[i]}
                    </Text>
                  </View>
                  {e.choice_image != "" ? (
                    <View style={{ height: 100, width: 100 }}>
                      <Image
                        source={{ uri: e.choice_image }}
                        style={{
                          aspectRatio: 1,
                          height: "100%",
                          width: "100%",
                          resizeMode: "contain",
                        }}
                      />
                    </View>
                  ) : (
                    <View style={{ margin: 5, padding: 5,width:"90%" }}>
                      {/* <Text>{e.choices}</Text> */}
                      <HtmlViwer
                        source={{ html: e.choices }}
                        isQuestion={false}
                      />

                    </View>
                  )}
                </View>
              ) : (
                <Pressable
                  style={[styles.option,{alignItems:"center",width: e.choice_image != "" ?"100%": e.choices.length > 20 ? "100%":"45%"}]}
                  onPress={() => {
                    setOptionClicked(letters[i]);
                    handleChoices(e);
                  }}
                >
                  <View
                    style={
                      optionClicked != letters[i]
                        ? styles.circle
                        : [styles.circle, { backgroundColor: "#2fb8bb" }]
                    }
                  >
                    <Text
                      style={
                        optionClicked != letters[i]
                          ? { fontWeight: "bold" }
                          : { fontWeight: "bold", color: "white" }
                      }
                    >
                      {letters[i]}
                    </Text>
                  </View>
                  {e.choice_image != "" ? (
                    <View style={{ height: 100, width: "85%"}}>
                      <Image
                        source={{ uri: e.choice_image }}
                        style={{
                          aspectRatio: 2,
                          height: "100%",
                          width: "100%",
                          resizeMode: "contain",
                        }}
                      />
                    </View>
                  ) : (
                    <View style={{ margin: 5, padding: 5 ,width:"85%"}}>
                      {/* <Text>{e.choices}</Text> */}
                      <HtmlViwer
                        source={{ html: e.choices }}
                        isQuestion={false}
                      />
                      {/* <MathQuillHtmlRender
                        content={ e.choices}
                      /> */}
                       {/* <QuestionPartBuilder data={ e.choices }/> */}
                    </View>
                  )}
                </Pressable>
              )}
            </>
          );
          // return (
          //   <Pressable
          //     style={styles.option}
          //     onPress={() => {
          //       setOptionClicked(letters[i]);
          //       handleChoices(e);
          //     }}>
          //     <View
          //       style={
          //         optionClicked != letters[i]
          //           ? styles.circle
          //           : [styles.circle, {backgroundColor:"#2fb8bb"}]
          //       }>
          //       <Text
          //         style={
          //           optionClicked != letters[i]
          //             ? {fontWeight: 'bold'}
          //             : {fontWeight: 'bold', color: 'white'}
          //         }>
          //         {letters[i]}
          //       </Text>
          //     </View>
          //     {
          //    e.choice_image != "" ?<View style={{height:100,width:100}}>
          //       <Image source={{uri: e.choice_image}}
          //        style={{aspectRatio: 1,height:"100%",width:"100%",resizeMode: 'contain'}} />
          //       </View>
          //    :<View style={{margin: 5, padding: 5}}>
          //       {/* <Text>{e.choices}</Text> */}
          //       <HtmlViwer source={{html: e.choices}} isQuestion={false} />
          //     </View>
          //     }
          //   </Pressable>
          // );
        })}
      </View>
    </View>
  );
};

export default MultipleChoiceQuestions;
