import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  Pressable,
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

const windowHeight = Dimensions.get("window").height;

const LogicalTableKgQuestions = ({
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

  
  const validate = () => {
    console.log("Validate");

    for (let i = 0; i < content.length; i++) {
      let flag = false;
      for (let j = 0; j < content[i].length; j++) {
        if (content[i][j].isMissed == true) {
          if (content[i][j].bgColor == "green") {
            temp1 = true;
            setIsCorrect(true);
          } else {
            temp1 = false;
            setIsCorrect(false);
            flag = true;
            break;
          }
        }
      }
      if (flag == true) {
        break;
      }
    }

    setSolution(question?.solution?.model[0]?.val);
    let temp = { ...student_response };
    temp.questionContent = [...content];
    setStudentResponse(temp);

    setIsValidated(true);
    
    if( screenType == MATH_ZONE_QUESTION){
      handleStudentAnswerCorrect(temp1)
    }
    
  };

  const [isValidated, setIsValidated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [solution, setSolution] = useState("");
  const [typedValues, setTypedValues] = useState([]);
  const [content, setContent] = useState(question.questionContent);

  useEffect(() => {
    for (let i = 0; i < content.length; i++) {
      for (let j = 0; j < content[i].length; j++) {
        content[i][j].bgColor = "";
      }
    }
  }, []);

  return (
    <View>
      <View style={styles.outterSection}>
        <View style={{ width: "80%" }}>
          <View
            style={{ marginTop: 10, display: "flex", alignItems: "flex-start" ,height:"auto"}}
          >
            {/* <HtmlViwer
              source={{ html: question.questionName }}
              isQuestion={true}
            /> */}
            <QuestionPartBuilder data={ question.questionName }/>
          </View>

          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isResponse == true
              ? content.map((item, index) => {
                  return (
                    <View style={[styles.row]}>
                      {item.map((val, i) => {
                        if (val.isMissed === false || val.isMissed == true) {
                          return (
                            <View
                              style={[
                                {
                                  height: 40,
                                  width: 50,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderWidth: 1,
                                },
                              ]}
                            >
                              <View>
                                <View
                                  style={
                                    val.studentAnswer == true
                                      ? {
                                          height: 20,
                                          width: 20,
                                          borderWidth: 1,
                                          borderRadius: 25,
                                          backgroundColor: "green",
                                        }
                                      : {
                                          height: 20,
                                          width: 20,
                                          borderWidth: 1,
                                          borderRadius: 25,
                                        }
                                  }
                                ></View>
                              </View>
                            </View>
                          );
                        }
                      })}
                    </View>
                  );
                })
              : content.map((item, index) => {
                  return (
                    <View style={[styles.row]}>
                      {item.map((val, i) => {
                        if (val.isMissed === false) {
                          return (
                            <View
                              style={[
                                {
                                  height: 40,
                                  width: 50,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderWidth: 1,
                                },
                              ]}
                            >
                              <Pressable
                                onPress={() => {
                                  console.log(
                                    "pressed",
                                    val.row,
                                    val.col,
                                    val.bgColor
                                  );
                                  let temp = [...content];
                                  if (content[index][i].bgColor === "green") {
                                    console.log("already green");
                                    temp[index][i].bgColor = null;
                                    temp[index][i].studentAnswer = false;
                                    setContent([...temp]);
                                  } else {
                                    temp.map((insideArr, ind) => {
                                      insideArr.map((ele, j) => {
                                        if (ele.col == val.col) {
                                          temp[ind][j].bgColor = null;
                                          console.log("insideee");
                                        }
                                      });
                                    });
                                    temp[index][i].bgColor = "green";
                                    temp[index][i].studentAnswer = true;
                                    setContent([...temp]);
                                  }
                                }}
                              >
                                <View
                                  style={{
                                    height: 20,
                                    width: 20,
                                    borderWidth: 1,
                                    borderRadius: 25,
                                    backgroundColor: val.bgColor,
                                  }}
                                ></View>
                              </Pressable>
                            </View>
                          );
                        }
                        if (val.isMissed == true) {
                          return (
                            <View
                              style={[
                                {
                                  height: 40,
                                  width: 50,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderWidth: 1,
                                },
                              ]}
                            >
                              <Pressable
                                onPress={() => {
                                  console.log("pressed", val.row, val.col);
                                  let temp = [...content];
                                  if (content[index][i].bgColor === "green") {
                                    console.log("already green");
                                    temp[index][i].bgColor = null;
                                    temp[index][i].studentAnswer = false;
                                    setContent([...temp]);
                                  } else {
                                    temp.map((insideArr, ind) => {
                                      insideArr.map((ele, j) => {
                                        if (ele.col == val.col) {
                                          temp[ind][j].bgColor = null;
                                          temp[ind][i].studentAnswer = false;
                                          console.log("insideee");
                                        }
                                      });
                                    });
                                    temp[index][i].bgColor = "green";
                                    temp[index][i].studentAnswer = true;
                                    setContent([...temp]);
                                  }
                                }}
                              >
                                <View
                                  style={{
                                    height: 20,
                                    width: 20,
                                    borderWidth: 1,
                                    borderRadius: 25,
                                    backgroundColor: val.bgColor,
                                  }}
                                ></View>
                              </Pressable>
                            </View>
                          );
                        }
                      })}
                    </View>
                  );
                })}
            {/* {content.map((item, index) => {
              return (
                  <View style={[styles.row]}>
                    {item.map((val,i) => {

                    if ( val.isMissed === false) {
                        return (
                          <View style={[{ height: 40, width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', borderWidth:1}]}>
                            <Pressable onPress={()=>{
                                console.log("pressed",val.row,val.col,val.bgColor);
                                let temp = [...content];
                                if(content[index][i].bgColor === 'green'){
                                    console.log("already green");
                                    temp[index][i].bgColor = null
                                    temp[index][i].studentAnswer = false
                                    setContent([...temp])
                                }else{
                                    temp.map((insideArr,ind)=>{
                                        insideArr.map((ele,j)=>{
                                           if(ele.col == val.col){
                                            temp[ind][j].bgColor = null
                                            console.log("insideee");
                                           }
                                        })
                                    })
                                    temp[index][i].bgColor = 'green'
                                    temp[index][i].studentAnswer = true
                                    setContent([...temp])
                                }
                              
                            }}>
                              <View style={{ height: 20, width: 20, borderWidth: 1, borderRadius: 25,backgroundColor:val.bgColor  }}></View>
                            </Pressable>
                          </View>
                        );
                      }
                      if ( val.isMissed == true ){
                        return (
                          <View
                            style={[{ height: 40, width: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', borderWidth: 1,},]}>
                            <Pressable onPress={()=>{
                                 console.log("pressed",val.row,val.col);
                                 let temp = [...content];
                                 if(content[index][i].bgColor === 'green'){
                                    console.log("already green");
                                     temp[index][i].bgColor = null
                                     temp[index][i].studentAnswer = false
                                     setContent([...temp])
                                 }else{
                                    temp.map((insideArr,ind)=>{
                                        insideArr.map((ele,j)=>{
                                           if(ele.col == val.col){
                                            temp[ind][j].bgColor = null
                                            temp[ind][i].studentAnswer = false
                                            console.log("insideee");
                                           }
                                        })
                                    })
                                     temp[index][i].bgColor = 'green'
                                     temp[index][i].studentAnswer = true
                                     setContent([...temp])
                                 }
                            }}>
                              <View style={{ height: 20, width: 20, borderWidth: 1, borderRadius: 25,backgroundColor:val.bgColor}}></View>
                            </Pressable>
                          </View>
                        );
                      }
                    })}
                  </View>
              );
            })} */}
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
    // height: 40,
    // minWidth: 50,
    // flex:1,
    //borderWidth: 1,
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

export default LogicalTableKgQuestions;
