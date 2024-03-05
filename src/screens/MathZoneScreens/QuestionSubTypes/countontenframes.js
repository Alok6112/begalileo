import React, { useState } from "react";
import { Pressable, Text, View, StyleSheet, Dimensions, ScrollView } from "react-native";

import HtmlViwer from "../QuestionAsserts/HtmlRender";
import ModalTester from "../QuestionAsserts/outputResponseModal";
import ChoicesSection from '../QuestionAsserts/choicesComponent';
import {MATH_ZONE_QUESTION, MATH_ZONE_LIVE_CLASS_QUESTION , MATH_ZONE_FLAGGED_QUESTION, MATH_ZONE_HOME_WORK_QUESTION} from '../../../components/helpers/Constants'
import SolutionComponent from "../QuestionAsserts/outputResponseComponent";
import QuestionPartBuilder from "../QuestionAsserts/questionPartBuilder";

const CountOnTenFrames = ({data, submitResponse, screenType, isResponse, handleStudentAnswerCorrect}) => {
  const windowHeight = Dimensions.get("window").height;

  const question = JSON.parse(data.question_data[0].question_text);
  const [student_response,setStudentResponse] = useState(JSON.parse(data.question_data[0].question_text))
  const question_id = data.question_data[0].question_id;
  const [solution, setSolution] = useState("");

  let imgs = [];
  for (let i = 0; i < 10; i++) {
    if (i < question.answerCount) {
      imgs[i] = 1;
    } else {
      imgs[i] = 0;
    }
  }

  const source = {
    html: `
<div style='text-align:center;'>
${question.questionName}
</div>`,
  };

  const picSource = {
    html: `
<div style='text-align:center;'>
${question.questionContent}
</div>`,
  };

  const [isValidated, setIsValidated] = useState(false);
  const [clickedOption, setClickedOption] = useState(-1);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const validate = () => {
    if (question.answerCount == selectedValue) {
      console.log("Correct");
      temp1 = true
      setIsCorrect(true);
    } else {
      temp1 = false
      setIsCorrect(false);
      console.log("No,it is not correct");
    }

    let sln = question.solution.model?.map((item)=> `${item.val}`+'</br>')
    setSolution(sln.join(" "))

    //student_response.studentAnswer = clickedOption;
    student_response.studentAnswer = selectedValue
    setStudentResponse(student_response)
  
    // console.log("question.question_id", question_id);
    // submitResponse(question_id,student_response)
    setIsValidated(true);
    
    if( screenType == MATH_ZONE_QUESTION){
      handleStudentAnswerCorrect(temp1)
    }

  };

  const handleChoices = (val) =>{
    console.log(val);
    setSelectedValue(val)
  }

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ margin: 10 }}>
          {/* <HtmlViwer source={source} isQuestion={true}/> */}
          <QuestionPartBuilder data={question.questionName}/>
        </View>
      
      {screenType == MATH_ZONE_QUESTION?
        <View style={{ margin: 10 }}>
          {isValidated ? (
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {
                // var formData = new FormData();
                // formData.append("student_response", student_response);
                // formData.append("student_answer", isCorrect);
                // submitResponse(question_id, formData);
                submitResponse(question_id, student_response, isCorrect)
                setIsValidated(false);
                setClickedOption(-1);
              }}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>Submit</Text>
            </Pressable>
          ) : (
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {
                console.log("Validate");
                validate();
              }}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>Solve</Text>
            </Pressable>
          )}
        </View>:<></>
      }

      { screenType == MATH_ZONE_LIVE_CLASS_QUESTION ?
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
                setIsValidated(true)
                submitResponse(question_id,student_response,temp1)
              }}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>Solve</Text>
            </Pressable>
          )}
          </View>:<></>
      }

      { screenType == MATH_ZONE_FLAGGED_QUESTION ?
          <View style={styles.submitButtonSection}> 
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {
                let sln = question.solution.model?.map((item)=> `${item.val}`+'</br>')
                setSolution(sln.join(" "))
                // setSolution(question.solution.model[0].val);
                setIsValidated(true)
                setIsCorrect(true)
              }}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>Show Soln</Text>
            </Pressable>
          </View>:<></>
      }

    
        { screenType == MATH_ZONE_HOME_WORK_QUESTION ?
          <View style={styles.submitButtonSection}> 
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {
                let sln = question.solution.model?.map((item)=> `${item.val}`+'</br>')
                setSolution(sln.join(" "))
                // setSolution(question.solution.model[0].val);
                setIsValidated(true)
                setIsCorrect(true)
              }}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>Solve</Text>
            </Pressable>
          </View>:<></>
        }


      </View>
      <View style={{ marginLeft: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.imgBox}>
            {/* <HtmlViwer source={imgs[0] == 1 ? picSource : ""} /> */}
            {
              imgs[0] == 1 && <QuestionPartBuilder data={question.questionContent} imgSize={50}/>
            }
          </View>
          <View style={styles.imgBox}>
            {/* <HtmlViwer source={imgs[1] == 1 ? picSource : ""} /> */}
            {
              imgs[1] == 1 && <QuestionPartBuilder data={question.questionContent} imgSize={50}/>
            }
          </View>
          <View style={styles.imgBox}>
            {/* <HtmlViwer source={imgs[2] == 1 ? picSource : ""} /> */}
            {
              imgs[2] == 1 && <QuestionPartBuilder data={question.questionContent} imgSize={50}/>
            }
          </View>
          <View style={styles.imgBox}>
            {/* <HtmlViwer source={imgs[3] == 1 ? picSource : ""} /> */}
            {
              imgs[3] == 1 && <QuestionPartBuilder data={question.questionContent} imgSize={50}/>
            }
          </View>
          <View style={styles.imgBox}>
            {/* <HtmlViwer source={imgs[4] == 1 ? picSource : ""} /> */}
            {
              imgs[4] == 1 && <QuestionPartBuilder data={question.questionContent} imgSize={50}/>
            }
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={styles.imgBox}>
            {/* <HtmlViwer source={imgs[5] == 1 ? picSource : ""} /> */}
            {
              imgs[5] == 1 && <QuestionPartBuilder data={question.questionContent} imgSize={50}/>
            }
          </View>
          <View style={styles.imgBox}>
            {/* <HtmlViwer source={imgs[6] == 1 ? picSource : ""} /> */}
            {
              imgs[6] == 1 && <QuestionPartBuilder data={question.questionContent} imgSize={50}/>
            }
          </View>
          <View style={styles.imgBox}>
            {/* <HtmlViwer source={imgs[7] == 1 ? picSource : ""} /> */}
            {
              imgs[7] == 1 && <QuestionPartBuilder data={question.questionContent} imgSize={50}/>
            }
          </View>
          <View style={styles.imgBox}>
            {/* <HtmlViwer source={imgs[8] == 1 ? picSource : ""} /> */}
            {
              imgs[8] == 1 && <QuestionPartBuilder data={question.questionContent} imgSize={50}/>
            }
          </View>
          <View style={styles.imgBox}>
            {/* <HtmlViwer source={imgs[9] == 1 ? picSource : ""} /> */}
            {
              imgs[9] == 1 && <QuestionPartBuilder data={question.questionContent} imgSize={50}/>
            }
          </View>
        </View>
      </View>

      {/* <View style={{ marginLeft: 10 }}>
        <Pressable
          onPress={() => {
            setClickedOption(question.choices[0]);
          }}
          style={
            clickedOption != question.choices[0]
              ? { height: 40, borderWidth: 1, marginTop: 10 }
              : {
                  height: 40,
                  borderWidth: 1,
                  marginTop: 10,
                  backgroundColor: "wheat",
                }
          }
        >
          <Text>{question.choices[0]}</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setClickedOption(question.choices[1]);
          }}
          style={
            clickedOption != question.choices[1]
              ? { height: 40, borderWidth: 1, marginTop: 10 }
              : {
                  height: 40,
                  borderWidth: 1,
                  marginTop: 10,
                  backgroundColor: "wheat",
                }
          }
        >
          <Text>{question.choices[1]}</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setClickedOption(question.choices[2]);
          }}
          style={
            clickedOption != question.choices[2]
              ? { height: 40, borderWidth: 1, marginTop: 10 }
              : {
                  height: 40,
                  borderWidth: 1,
                  marginTop: 10,
                  backgroundColor: "wheat",
                }
          }
        >
          <Text>{question.choices[2]}</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setClickedOption(question.choices[3]);
          }}
          style={
            clickedOption != question.choices[3]
              ? { height: 40, borderWidth: 1, marginTop: 10 }
              : {
                  height: 40,
                  borderWidth: 1,
                  marginTop: 10,
                  backgroundColor: "wheat",
                }
          }
        >
          <Text>{question.choices[3]}</Text>
        </Pressable>
      </View> */}

      <ChoicesSection choices={question.choices} handleChoices={handleChoices} isResponse={isResponse} studentAnswer={student_response.studentAnswer} isValidated={isValidated}/>
      { screenType == MATH_ZONE_QUESTION && isValidated &&
        <ModalTester
          deviceHeight={windowHeight}
          isCorrect={isCorrect}
          solution={solution}
        />
      }

      { ( screenType == MATH_ZONE_LIVE_CLASS_QUESTION || screenType == MATH_ZONE_FLAGGED_QUESTION ) && isValidated && <SolutionComponent isCorrect={isCorrect} solution={question.solution.model[0].val} isMathquill={true} screenType={screenType}/>}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredContent: {
    justifyContent: "center",
    alignItems: "center",
  },

  buttonStyle: {
    height: 30,
    width: 75,
    backgroundColor: "#3E46FF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop:10
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

export default CountOnTenFrames;
