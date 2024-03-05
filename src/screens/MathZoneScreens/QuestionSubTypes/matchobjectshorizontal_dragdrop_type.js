import * as React from "react";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DraxProvider, DraxView, DraxList } from "react-native-drax";
import HtmlViwer from "../QuestionAsserts/HtmlRender";
import ModalTester from "../QuestionAsserts/outputResponseModal";
import { convertHTML } from "../QuestionAsserts/commonFileForStudentResponses";
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

export default MatchObjectsHorizontalDargDropType = ({
  data,
  submitResponse,
  screenType,
  isResponse,
  handleStudentAnswerCorrect
}) => {
  let temp1 = false;
  const question_id = data.question_data[0].question_id;
  const [question, setQuestion] = useState(
    JSON.parse(data.question_data[0].question_text)
  );
  const columnWidth = windowWidth / parseInt(question.cols);

  const [isValidated, setIsValidated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [student_response, setStudentResponse] = useState();
  const [solution, setSolution] = useState("");
  
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
    question?.questionContent[0]?.map((item, i) => {
      if(item.isMissed == "true"){
        return { id: i, val: "" }
      }else{
        return { id: i, val: item.numvalue }
      }  
    })
  );

  const validate = () => {
    let actualAnswers = question.questionContent[0].map(
      (item) => item.numvalue
    );

    let isEmpty = false;
    let isItTrue = true;

    let studentAnswers = droppedValues?.map((item) => {
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

    response = response?.map((item, i) => {
      console.log("qnt content", item);
      item["studentAnswer"] = studentAnswers[i];
      return item;
    });

    finalres.questionContent[0] = response;
    setStudentResponse(finalres);
    //console.log("After",response);
    //console.log(finalres.questionContent[0]);

    console.log("studentAnswers",studentAnswers);
    console.log("actualAnswers",actualAnswers);
    actualAnswers.map((item, i) => {
      if (item != studentAnswers[i]) {
        isItTrue = false;
      }
    });

    let sln = question.solution.model?.map((item)=> `${item.val}`+'</br>')
    setSolution(sln.join(" "))

    if (isItTrue) {
      console.log("Yayya!,u r Correct");
      temp1 = true;
      setIsCorrect(true);
    } else {
      console.log("Sorry!,u r wrong");
      temp1 = false;
      setIsCorrect(false);
    }
    setIsValidated(true);
   
    if( screenType == MATH_ZONE_QUESTION){
      handleStudentAnswerCorrect(temp1)
    }
    
  };

  useEffect(()=>{
   
    console.log("droppedValues",droppedValues);
    console.log("draggableValues",draggableValues);

  },[])

  return (
    <GestureHandlerRootView>
      <View style={{ flexDirection: "column", backgroundColor: ""}}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ margin: 10 ,width:"80%" }}>
            {/* <HtmlViwer source={source} isQuestion={true}/> */}
            {/* <HtmlViwer
              source={{ html: question.questionName }}
              isQuestion={true}
            /> */}
            <QuestionPartBuilder data={question.questionName}/>
          </View>

          {screenType == MATH_ZONE_QUESTION ? (
            <View style={{ margin: 10 }}>
              {isValidated ? (
                <Pressable
                  style={styles.buttonStyle}
                  onPress={() => {
                    //   var formData = new FormData();
                    //   formData.append("student_response", student_response);
                    //   formData.append("student_answer", isCorrect);
                    //   submitResponse(question_id, formData);
                    submitResponse(question_id, student_response, isCorrect);
                    setIsValidated(false);
                    setDroppedValues([]);
                    setDraggableValues([]);
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
        <DraxProvider style={{ flexDirection: "column", backgroundColor: ""}}>
          <View
            style={{ display:"flex",flexDirection: "row",flexWrap:"wrap",width:'100%', backgroundColor: ""}}
          >
            {question?.questionContent[0]?.map((item, i) => {
              return (
                <View key={i}>
                  <View
                    style={{
                      backgroundColor: "",
                      flexDirection: "column",
                      minWidth: 10,
                      // alignSelf: "center",
                      marginBottom: 5,
                      marginLeft:10,
                      alignItems:"center",
                    }}
                  >
                    <View style={{ backgroundColor: "" , minWidth:"10%", maxWidth:"100%",alignItems:"center"}}>
                      {/* <HtmlViwer
                        source={{ html: item.imgvalue }}
                        widthOfPIc={100}
                      /> */}
                      <QuestionPartBuilder data={item.imgvalue} imgSize={100} aspectRatio={1} type={"matchobjectshorizontal"}/>
                    </View>
                      {
                        item.isMissed == "false"?
                        <View style={[
                          styles.draggableBox,
                          { margin: 5, alignItems:"center" ,justifyContent:"center",borderWidth:0},
                        ]}>
                        {/* <HtmlViwer
                          source={{ html: item.imgvalue }}
                          widthOfPIc={100}
                        /> */}
                        <QuestionPartBuilder data={item.numvalue} imgSize={100} aspectRatio={1} type={"matchobjectshorizontal"}/>
                      </View>:
                     
                    <View
                      style={[
                        styles.draggableBox,
                        { borderWidth: 1, margin: 5, alignSelf: "center" },
                      ]}
                    >
                    { isResponse == true ? 
                      <View  style={
                        item.studentAnswer == "" || item.studentAnswer == null
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
                      }>
                        {
                            item.studentAnswer.includes("mq-selectable") ?  <QuestionPartBuilder data= {convertHTML(item.studentAnswer)} isWhite={true}/> :
                             <Text style={{ color: "#fff", fontWeight: "bold" }}>
                          {convertHTML(item.studentAnswer)}
                        </Text>
                        }
                        {/* <Text style={{ color: "#fff", fontWeight: "bold" }}>
                          {convertHTML(item.studentAnswer)}
                        </Text> */}
                      </View> :
                      <DraxView
                        style={
                          droppedValues[i]?.val.length == 0
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
                          console.log("Event", event.dragged.payload);
                          let arr = [...droppedValues];

                          let flag = false;
                          let valueIndex = -1;
                          let placeValues= arr[i];

                          arr.map((item, i) => {
                            if (item?.val == event.dragged.payload.val) {
                              flag = true;
                              valueIndex = i;
                            }
                          });
                          
                          console.log("arr[i]",arr[i]);
                          console.log("event.dragged.payload",event.dragged.payload);

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
                              console.log("item.val == event.dragged.payload.val",item.val == event.dragged.payload.val,item.val);
                              let obj = {
                                id: item.id,
                                // val: "",
                                val:placeValues.val
                              };
                            
                              return obj;
                            } else {
                              return item;
                            }
                          });
                          
                          console.log("update",update);

                          // arr[i] = event.dragged.payload;
                          setDroppedValues([...arr]);
                          setDraggableValues([...update]);
                        }}
                      >
                        {
                          droppedValues[i]?.val.includes("mq-selectable") ?  <QuestionPartBuilder data= {convertHTML(droppedValues[i]?.val)} isWhite={true}/> :
                          <Text style={{ color: "#fff", fontWeight: "bold" }}>
                          {convertHTML(droppedValues[i]?.val)}
                        </Text>
                        }
                        {/* <Text style={{ color: "#fff", fontWeight: "bold" }}>
                          {convertHTML(droppedValues[i]?.val)}
                        </Text> */}
                      </DraxView>
                    }

                    </View>
                     }
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
                  { isResponse == true ? 
                    <View  style={
                      [
                            styles.centeredContent,
                            styles.draggableBox,
                            { margin: 0, backgroundColor: "blue" },
                          ]
                    }>
                      {
                        item.val.includes("mq-selectable") ?  <QuestionPartBuilder data= {convertHTML(item.val)} isWhite={true}/> :
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>
                        {convertHTML(item.val)}
                        </Text>
                      }
                       {/* <Text style={{ color: "#fff", fontWeight: "bold" }}>
                        {convertHTML(item.val)}
                      </Text> */}
                    </View> :
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
                      {
                        item.val.includes("mq-selectable") ?  <QuestionPartBuilder data= {convertHTML(item.val)} isWhite={true}/> :
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>
                        {convertHTML(item.val)}
                        </Text>
                      }
                      {/* <Text style={{ color: "#fff", fontWeight: "bold" }}>
                        {convertHTML(item.val)}
                      </Text> */}
                    </DraxView>
                  }
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
       
        { screenType == MATH_ZONE_QUESTION && isValidated &&
          <ModalTester
            deviceHeight={windowHeight}
            isCorrect={isCorrect}
            solution={solution}
          />
        }

      { ( screenType == MATH_ZONE_LIVE_CLASS_QUESTION || screenType == MATH_ZONE_FLAGGED_QUESTION ) && isValidated && <SolutionComponent isCorrect={isCorrect} solution={solution} isMathquill={true} screenType={screenType}/>}
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
