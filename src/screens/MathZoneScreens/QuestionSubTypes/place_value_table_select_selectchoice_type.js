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
import {MATH_ZONE_QUESTION, MATH_ZONE_LIVE_CLASS_QUESTION , MATH_ZONE_FLAGGED_QUESTION, MATH_ZONE_HOME_WORK_QUESTION} from '../../../components/helpers/Constants'
import QuestionPartBuilder from "../QuestionAsserts/questionPartBuilder";

const windowHeight = Dimensions.get("window").height;
const PlaceValueTableSelectSelectChoiceType = ({ data, submitResponse , screenType, isResponse , handleStudentAnswerCorrect}) => {
  
  let temp1 = false;
  const question = JSON.parse(data.question_data[0].question_text);
  const [student_response,setStudentResponse] = useState(JSON.parse(data.question_data[0].question_text))
  const question_id = data.question_data[0].question_id;

  //const student_response = question;
  const validate = () => {
    console.log("Validate");

    if (selectedValue == null) {
      console.log("please select any one of the choice");
      return;
    }

    // const answerValues = [];

    // for (let i = 0; i < question.questionContent.length; i++) {
    //   for (let j = 0; j < question.questionContent[i].length; j++) {
    //     if (question.questionContent[i][j].isMissed == "true") {
    //       answerValues.push(question.questionContent[i][j]);
    //     }
    //   }
    // }

    // console.log(answerValues);
    //selectedValue == answerValues[0].value

    if (selectedValue == answer) {
      temp1 = true
      setIsCorrect(true);
    } else {
      temp1 = false
      setIsCorrect(false);
    }

    let sln = question.solution.model?.map((item)=> `${item.val}`+'</br>')
    setSolution(sln.join(" "))
    // setSolution(question.solution.model[0].val);

    //student response to send back
    student_response.studentAnswer = selectedValue
    setStudentResponse(student_response)
    
    // student_response.studentAnswer = droppedValues;
    // if (droppedValues.length <= 1) {
    //   student_response.studentAnswer = droppedValues[0];
    // } else {
    //   student_response.studentAnswer = droppedValues;
    // }
    //console.log("student_response", student_response);

    setIsValidated(true);
    
    if( screenType == MATH_ZONE_QUESTION){
      handleStudentAnswerCorrect(temp1)
    }
    
  };

  const [isValidated, setIsValidated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [solution, setSolution] = useState("");
  const [choices, setChoices] = useState([]);
  const [answer, setAnswer] = useState();

  const handleChoices = (val) => {
    setSelectedValue(val);
  };
  useEffect(() => {
    let arr = [];
    for (let i = 0; i < question.choices.length; i++) {
      arr.push(question.choices[i].value);
      if ((question.choices[i].option == "true")) {
        setAnswer(question.choices[i].value);
      }
    }
    setChoices([...arr]);
  }, []);

  return (
    <View>
      <View style={styles.outterSection}>
        <View style={{ width: "80%" }}>
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            {/* <HtmlViwer
              source={{ html: question.questionName }}
              isQuestion={true}
            /> */}
            <QuestionPartBuilder data={question.questionName}/>
          </View>

          <View>
            <View style={{ flex: 1, borderWidth: 1, borderColor: "orange"}}>
              <View style={[styles.row]}>
                {question.questiontbHead.map((val, i) => {
                  return (
                    <View
                      style={[
                        styles.row,
                        {
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "orange",
                        },
                      ]}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        {val.value}
                      </Text>
                    </View>
                  );
                })}
              </View>
              {question?.questionContent?.map((item) => {
                return (
                  <View style={[styles.row,{height:"auto"}]}>
                    {item.map((val) => {
                      if (val.isMissed == "false") {
                        return (
                          <View
                            style={[
                              styles.row,
                              {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              },
                            ]}
                          >
                            {/* <HtmlViwer
                              source={{ html: val.value }}
                              isQuestion={true}
                              isBlack={true}
                            /> */}
                            <QuestionPartBuilder data={ val.value }/>
                          </View>
                        );
                      } else {
                        return (
                          <View
                            style={[
                              styles.row,
                              {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height:"auto"
                              },
                            ]}
                          >
                            <View
                              style={{ height: 30, minWidth: 50,alignItems:"center",justifyContent:"center" ,height:"auto",minHeight:50}}
                            >
                             {/* <HtmlViwer
                              source={{ html: val.value }}
                              // isQuestion={true}
                              isBlack={true}
                            /> */}
                            <QuestionPartBuilder data={ val.value } imgSize={40}/>
                            </View>
                          </View>
                        );
                      }
                    })}
                  </View>
                );
              })}
            </View>
          </View>

          <ChoicesSection choices={choices} handleChoices={handleChoices} isResponse={isResponse} studentAnswer={student_response.studentAnswer} isValidated={isValidated}/>
        </View>

      { screenType == MATH_ZONE_QUESTION ?
        <View style={styles.submitButtonSection}>
          {isValidated ? (
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {
                // var formData = new FormData();
                // formData.append("student_response", student_response);
                // //  formData.append("student_answer", isClickedYesNo)
                // submitResponse(question_id, formData);
                submitResponse(question_id, student_response, isCorrect)
                setIsValidated(false);
                setIsCorrect(false);
                setSelectedValue(null)
                setSolution('')
              }}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>Submit</Text>
            </Pressable>
          ) : (
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {
                validate();
                // setIsValidated(true);
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

      { screenType == MATH_ZONE_QUESTION && isValidated &&
        <ModalTester
          deviceHeight={windowHeight}
          isCorrect={isCorrect}
          solution={solution}
        />
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
    marginTop:10
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
  row: {
    height: 40,
    flex: 1,
    borderWidth: 1,
    borderColor: "orange",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    minWidth: 40,
  },
});

export default PlaceValueTableSelectSelectChoiceType;
