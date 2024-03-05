import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable, Dimensions } from "react-native";
import HtmlViwer from "../QuestionAsserts/HtmlRender";
import ModalTester from "../QuestionAsserts/outputResponseModal";
import {
  MATH_ZONE_QUESTION,
  MATH_ZONE_LIVE_CLASS_QUESTION,
  MATH_ZONE_FLAGGED_QUESTION,
  MATH_ZONE_HOME_WORK_QUESTION,
} from "../../../components/helpers/Constants";
import QuestionPartBuilder from "../QuestionAsserts/questionPartBuilder";

const windowHeight = Dimensions.get("window").height;

const QuestionTextOptionsQuestions = ({
  data,
  submitResponse,
  screenType,
  isResponse,
  handleStudentAnswerCorrect
}) => {
  console.log("QuestionTextOptionsQuestions", data);
  
  let temp1 = false;
  const question = JSON.parse(data.question_data[0].question_text);
  const [student_response, setStudentResponse] = useState(
    JSON.parse(data.question_data[0].question_text)
  );
  const question_id = data.question_data[0].question_id;

  //const student_response = data;
  const Pattern = ({ item }) => {
    let patternArr = [];
    let ImgArr = [];
    let quotient = Math.floor(item.count / 4);
    let remainder = item.count - 4 * quotient;

    for (let i = 0; i < 4; i++) {
      // ImgArr.push(<HtmlViwer source={{ html: item.value }} />);
      ImgArr.push( <QuestionPartBuilder data={item.value} imgSize={50} />);
     
    }

    for (let i = 0; i < quotient; i++) {
      patternArr.push(ImgArr);
    }

    ImgArr = [];
    for (let i = 0; i < remainder; i++) {
      // ImgArr.push(<HtmlViwer source={{ html: item.value }} />);
      ImgArr.push(<QuestionPartBuilder data={item.value} imgSize={50}/>);
    }

    patternArr.push(ImgArr);

    return (
      <View>
        {patternArr.map((e) => {
          return (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                minWidth:10,
                minHeight:10,
                height:"auto",
                width:"auto"
              }}
            >
              {e.map((val) => {
                return val;
              })}
            </View>
          );
        })}
      </View>
    );
  };

  const validate = () => {
    if (clickedOption < 0) {
      console.log("please click any one the option");
      return;
    }

    let optionSelectedData = question.questionContent[0][clickedOption];

    if (optionSelectedData.selected == "true") {
      temp1 = true;
      setIsCorrect(true);
    } else {
      temp1 = false;
      setIsCorrect(false);
    }

    if (question.solution.model[0] != undefined) {
      // setSolution(question.solution.model[0].val);
      let sln = question.solution.model?.map((item)=> `${item.val}`+'</br>')
      setSolution(sln.join(" "))
    } else {
      question.questionContent[0].map((val, index) => {
        if (val.selected == "true") {
          setSolution(`option ${index + 1} is correct`);
        }
      });
    }

    //student response to send back
    //student_response.studentAnswer = String(isCorrect)
    student_response.studentAnswer = optionSelectedData.count;
    setStudentResponse(student_response);
    
    if( screenType == MATH_ZONE_QUESTION){
      handleStudentAnswerCorrect(temp1)
    }
    
  };

  const [isValidated, setIsValidated] = useState(false);
  const [clickedOption, setClickedOption] = useState(-1);
  const [isCorrect, setIsCorrect] = useState(false);
  const [solution, setSolution] = useState("");

  return (
    <View style={styles.outterSection}>
    
    <View style={{ width:"80%" }}>
      <View>
      {/* <HtmlViwer source={{ html: question.questionName }} isQuestion={true} /> */}
      <QuestionPartBuilder data={question.questionName} imgSize={50}/>
      </View>

      <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {question.questionContent[0].map((item, index) => {
            return (
              <>
                {isResponse == true ? (
                  <View
                    key={index}
                    style={
                      item.count == question.studentAnswer
                        ? [styles.box, { backgroundColor: "blue" }]
                        : [styles.box]
                    }
                  >
                    <Pattern item={item} />
                  </View>
                ) : (
                  <Pressable
                    key={index}
                    style={
                      index == clickedOption
                        ? [styles.box, { backgroundColor: "blue" }]
                        : [styles.box]
                    }
                    onPress={() => {
                      if (!isValidated) {
                        setClickedOption(index);
                      }
                    }}
                  >
                    <Pattern item={item} />
                  </Pressable>
                )}
              </>
            );
          })}
      </View>
    </View>

      <View>

        {screenType == MATH_ZONE_QUESTION ? (
          <View style={{ width: "20%", margin: 10 }}>
            {isValidated ? (
              <Pressable
                style={styles.buttonStyle}
                onPress={() => {
                  //  var formData = new FormData();
                  //    formData.append("student_response", student_response)
                  // //   formData.append("student_answer", isCorrect)
                  // submitResponse(question_id, formData)
                  submitResponse(question_id, student_response, isCorrect);
                  setIsValidated(false);
                  setClickedOption(-1);
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
                  console.log("Validate");
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
                let sln = question.solution.model?.map((item)=> `${item.val}`+'</br>')
                setSolution(sln.join(" "))
                // setSolution(question.solution.model[0].val);
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
                let sln = question.solution.model?.map((item)=> `${item.val}`+'</br>')
                setSolution(sln.join(" "))
                // setSolution(question.solution.model[0].val);
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
      {isValidated ? (
        <ModalTester
          deviceHeight={windowHeight}
          isCorrect={isCorrect}
          solution={solution}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outterSection: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
    // minHeight: windowHeight / 1.2,
  },
  box: {
    borderWidth: 2,
    width: 200,
    // minHeight: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    minWidth:10,
    minHeight:150,
    width:"auto",
    height:"auto"
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
});

export default QuestionTextOptionsQuestions;
