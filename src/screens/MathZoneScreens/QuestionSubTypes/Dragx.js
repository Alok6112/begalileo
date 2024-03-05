import * as React from "react";
import { useState } from "react";
import { Text, View, StyleSheet, Pressable, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DraxProvider, DraxView, DraxList } from "react-native-drax";
import HtmlViwer from "../QuestionAsserts/HtmlRender";
import ModalTester from "../QuestionAsserts/outputResponseModal";
import {MATH_ZONE_QUESTION, MATH_ZONE_LIVE_CLASS_QUESTION , MATH_ZONE_FLAGGED_QUESTION, MATH_ZONE_HOME_WORK_QUESTION} from '../../../components/helpers/Constants'

export default Dragx = ({
  question,
  columnWidth,
  windowHeight,
  submitResponse,
  question_id,
  screenType,
  handleStudentAnswerCorrect
}) => {

  let temp1 = false;
  const [isValidated, setIsValidated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [student_response, setStudentResponse] = useState();

  const source = {
    html: `
    <div style='text-align:left;'>
    ${question.questionName}
    </div>`,
  };

  const [draggableValues, setDraggableValues] = useState(
    question.choices.map((item, i) => {
      return {
        id: i,
        val: item,
      };
    })
  );
  const [droppedValues, setDroppedValues] = useState(
    question.questionContent[0].map((item, i) => {
      return { id: i, val: "" };
    })
  );

  const validate = () => {
    let actualAnswers = question.questionContent[0].map(
      (item) => item.numvalue
    );

    let isEmpty = false;
    let isItTrue = true;

    let studentAnswers = droppedValues.map((item) => {
      if (item.val == "") {
        isEmpty = true;
      }
      return item.val;
    });

    if (isEmpty) {
      alert("Please drag all the answers!");
      return;
    }

    let response = question.questionContent[0];
    let finalres = question;
    //console.log("Before",response);

    response = response.map((item, i) => {
      console.log("qnt content", item);
      item["studentAnswer"] = studentAnswers[i];
      return item;
    });

    finalres.questionContent[0] = response;
    setStudentResponse(finalres);
    //console.log("After",response);
    //console.log(finalres.questionContent[0]);

    console.log(JSON.stringify(question));
    actualAnswers.map((item, i) => {
      if (item != studentAnswers[i]) {
        isItTrue = false;
      }
    });

    if (isItTrue) {
      console.log("Yayya!,u r Correct");
      temp1 = true
      setIsCorrect(true);
    } else {
      console.log("Sorry!,u r wrong");
      temp1 = false
      setIsCorrect(false);
    }
    setIsValidated(true);
    
    if( screenType == MATH_ZONE_QUESTION){
      handleStudentAnswerCorrect(temp1)
    }
    
  };

  return (
    <GestureHandlerRootView>
      <View style={{ flexDirection: "column", backgroundColor: "blue" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ margin: 10 }}>
            <HtmlViwer source={source} isQuestion={true}/>
          </View>

        {screenType == MATH_ZONE_QUESTION ?
          <View style={{ margin: 10 }}>
            {isValidated ? (
              <Pressable
                style={styles.buttonStyle}
                onPress={() => {
                  var formData = new FormData();
                  formData.append("student_response", student_response);
                  formData.append("student_answer", isCorrect);
                  submitResponse(question_id, formData);
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
                  let sln = question.solution.model?.map((item)=> `${item.val}`+'</br>')
                  setSolution(sln.join(" "))
                  validate();
                }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  Solve
                </Text>
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
              <Text style={{ fontWeight: "bold", color: "white" }}>Solve</Text>
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
        <DraxProvider
          style={{ flexDirection: "column", backgroundColor: "yellow" }}
        >
          <View
            style={{ flexDirection: "row", margin: 5, backgroundColor: "pink" }}
          >
            {question.questionContent[0].map((item, i) => {
              return (
                <View key={i}>
                  <View
                    style={{
                      backgroundColor: "yellow",
                      flexDirection: "column",
                      width: columnWidth,
                      alignSelf: "center",
                      margin: 5,
                    }}
                  >
                    <View style={{ backgroundColor: "red" }}>
                      <HtmlViwer
                        source={{ html: item.imgvalue }}
                        widthOfPIc={100}
                      />
                    </View>

                    <View
                      style={[
                        styles.draggableBox,
                        { borderWidth: 1, margin: 5, alignSelf: "center" },
                      ]}
                    >
                      <DraxView
                        style={
                          droppedValues[i].val.length == 0
                            ? [
                                styles.centeredContent,
                                styles.draggableBox,
                                { margin: 0 },
                              ]
                            : [
                                styles.centeredContent,
                                styles.draggableBox,
                                { margin: 0, backgroundColor: "blue" },
                              ]
                        }
                        draggingStyle={styles.dragging}
                        dragReleasedStyle={styles.dragging}
                        receivingStyle={styles.receiving}
                        //hoverDraggingStyle={styles.hoverDragging}
                        dragPayload={droppedValues[i]}
                        longPressDelay={0}
                        onReceiveDragDrop={(event) => {
                          let arr = [...droppedValues];

                          let flag = false;
                          let valueIndex = -1;
                          arr.map((item, i) => {
                            if (item.val == event.dragged.payload.val) {
                              flag = true;
                              valueIndex = i;
                            }
                          });

                          if (flag) {
                            let temp = arr[i];
                            arr[i] = event.dragged.payload;
                            arr[valueIndex] = temp;
                          } else {
                            arr[i] = event.dragged.payload;
                          }

                          let update = [...draggableValues];

                          update = update.map((item) => {
                            if (item.val == event.dragged.payload.val) {
                              let obj = {
                                id: item.id,
                                val: "",
                              };
                              return obj;
                            } else {
                              return item;
                            }
                          });

                          // arr[i] = event.dragged.payload;
                          setDroppedValues([...arr]);
                          setDraggableValues([...update]);
                        }}
                      >
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>
                          {droppedValues[i].val}
                        </Text>
                      </DraxView>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Options */}

          <View
            style={{ flexDirection: "column", marginLeft: 10, marginTop: 10 }}
          >
            <View>
              <Text style={{ fontWeight: "bold" }}>
                Drag and drop the answer
              </Text>
            </View>

            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {draggableValues.map((item, i) => (
                <View
                  key={i}
                  style={[styles.draggableBox, { borderWidth: 1, margin: 5 }]}
                >
                  <DraxView
                    style={
                      item.val.length == 0
                        ? [
                            styles.centeredContent,
                            styles.draggableBox,
                            { margin: 0 },
                          ]
                        : [
                            styles.centeredContent,
                            styles.draggableBox,
                            { margin: 0, backgroundColor: "blue" },
                          ]
                    }
                    draggingStyle={styles.dragging}
                    dragReleasedStyle={styles.dragging}
                    receivingStyle={styles.receiving}
                    //hoverDraggingStyle={styles.hoverDragging}
                    dragPayload={item}
                    longPressDelay={0}
                    onReceiveDragDrop={(event) => {
                      let arr = [...draggableValues];

                      let flag = false;
                      let valueIndex = -1;
                      arr.map((item, i) => {
                        if (item.val == event.dragged.payload.val) {
                          flag = true;
                          valueIndex = i;
                        }
                      });

                      if (flag) {
                        let temp = arr[i];
                        arr[i] = event.dragged.payload;
                        arr[valueIndex] = temp;
                      } else {
                        arr[i] = event.dragged.payload;
                      }

                      let update = [...droppedValues];
                      update = update.map((item) => {
                        if (item.val == event.dragged.payload.val) {
                          let obj = {
                            id: item.id,
                            val: "",
                          };
                          console.log("in", item);
                          return obj;
                        } else {
                          return item;
                        }
                      });

                      console.log(droppedValues);
                      console.log("check", update);

                      setDraggableValues([...arr]);
                      setDroppedValues([...update]);
                    }}
                  >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                      {item.val}
                    </Text>
                  </DraxView>
                </View>
              ))}
            </View>
          </View>
        </DraxProvider>

        {/* <Pressable style={styles.buttonStyle} onPress={() => {
                    validate()
                }}>
                    <Text style={{ fontWeight: "bold",color:"white" }}>Submit</Text>

                </Pressable> */}
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
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  centeredContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  palette: {
    flexDirection: "row",
    // justifyContent: 'space-evenly',
  },
  draggableBox: {
    width: 100,
    height: 50,
    borderRadius: 30,
    margin: 0,
  },
  receiving: {
    borderColor: "red",
    borderWidth: 5,
  },

  magenta: {
    backgroundColor: "#ffaaff",
  },
  dragging: {
    opacity: 0,
  },
  hoverDragging: {
    borderColor: "magenta",
    borderWidth: 2,
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
});
