import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Dimensions,
  TextInput,
} from "react-native";
import HtmlViwer from "../QuestionAsserts/HtmlRender";
import ModalTester from "../QuestionAsserts/outputResponseModal";
import {commonKeyingTypeStudentResponse,convertHTML} from '../QuestionAsserts/commonFileForStudentResponses'
import {MATH_ZONE_QUESTION, MATH_ZONE_LIVE_CLASS_QUESTION , MATH_ZONE_FLAGGED_QUESTION, MATH_ZONE_HOME_WORK_QUESTION} from '../../../components/helpers/Constants'
import SolutionComponent from "../QuestionAsserts/outputResponseComponent";
import MathQuillHtmlRender from "../QuestionAsserts/MathQuillHtmlRender";
import QuestionPartBuilder from "../QuestionAsserts/questionPartBuilder";
import OwnTextInput from "../../MathZoneScreensForTesting/OwnTextInput";

const windowHeight = Dimensions.get("window").height;

const MyInput = ({ handleInputs, val, isValidated }) => {
  console.log("Horizontal keying");
  const [presentValue, setPresentValue] = useState("")
  return (
    <View style={{ height: 30, minWidth: 50, borderWidth: 1 ,paddingLeft:8,paddingRight:8,borderRadius: 6}}>
      <TextInput
        style={{ height: 30, minWidth: 30 ,textAlign:"center",fontSize: 20, fontWeight: "bold",padding:3}}
        // placeholder="Type here!"
        editable={ isValidated ? false : true}
        value={presentValue}
        keyboardType="numeric"
        onChangeText={(next) => {
          if(next >= 0 || next <= 9){
            handleInputs(next,val)
            setPresentValue(next)
          }else{
            if(next.length >= 2){
              setPresentValue((prev) =>prev)
            }else{
              setPresentValue("")
            }
          }
        }}
        //defaultValue={text}
      />
    </View>
  );
};

const HorizontalKeyingType = ({ data, submitResponse, screenType, isResponse, handleStudentAnswerCorrect }) => {
  
  let temp1 = false;
  const question = JSON.parse(data.question_data[0].question_text);
  const [student_response,setStudentResponse] = useState(JSON.parse(data.question_data[0].question_text))
  const question_id = data.question_data[0].question_id;

  const validate = () => {
    console.log("Validate");

    const answerValues = [];

    for (let i = 0; i < question.questionContent.length; i++) {
      for (let j = 0; j < question.questionContent[i].length; j++) {
        if (question.questionContent[i][j].isMissed == "true") {
          answerValues.push(question.questionContent[i][j]);
        }
      }
    }

    if (typedValues.length != answerValues.length) {
      alert('Please enter all the values');
      return;
    }
    
    console.log(answerValues);

    for (let i = 0; i < typedValues.length; i++) {
      let temp = answerValues.filter((e) =>
        e.row == typedValues[i].row && e.col == typedValues[i].col ? 1 : 0
      );

      // console.log("temp",temp);
      // console.log("typedValues", typedValues,typedValues[i].value.toLowerCase());

      if(typedValues[i].value == ""){
        alert('Please enter all the values');
        return;
      }

      if (convertHTML(temp[0].value.trim().toLowerCase()) == typedValues[i].value.trim().toLowerCase()) {
        temp1 = true
        setIsCorrect(true);
      } else {
        temp1 = false
        setIsCorrect(false);
        break;
      }
    }

    let sln = question.solution.model?.map((item)=> `${item.val}`+'</br>')
    setSolution(sln.join(" "))
    // setSolution(question.solution.model[0].val);
    //student response to send back
    let finalResponse = commonKeyingTypeStudentResponse(student_response,typedValues)
    setStudentResponse(finalResponse)
    // student_response.studentAnswer = droppedValues;
    // if (typedValues.length <= 1) {
    //   student_response.studentAnswer = typedValues[0];
    // } else {
    //   student_response.studentAnswer = typedValues;
    // }
    // console.log("student_response", student_response);

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

  const handleInputs = (val, missedObj) => {
    let obj = { ...missedObj };
    obj.value = val;

    let updatedArr = [...typedValues];
    let flag = false;

    updatedArr = updatedArr.map((ele) => {
      if (ele.row == obj.row && ele.col == obj.col) {
        flag = true;
        return obj;
      } else {
        return ele;
      }
    });

    if (flag == false) {
      updatedArr.push(obj);
    }

    setTypedValues([...updatedArr]);
  };

  return (
    <View>
      <View style={styles.outterSection}>
        <View style={{ width: "80%" }}>
          <View style={{ marginTop: 10 }}>
            {/* <HtmlViwer
              source={{ html: question.questionName }}
              isQuestion={true}
            /> */}
             {/* <MathQuillHtmlRender
                  content={question.questionName}
                  isQuestion={true}
                /> */}
                <QuestionPartBuilder data={question.questionName}/>
          </View>

          <View style={{minHeight:10,height:"auto"}}>
            {question.questionContent.map((item,outerIndex) => {
              return (
                <View style={[styles.row,{ marginRight:5,minHeight:10,height:"auto",margin:10}]}>
                  {item.map((val,index) => {
                    if (val.isMissed == "false") {
                      return (
                        <View
                          style={[
                            styles.row,
                            {
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              // borderWidth:1,
                              // marginRight:5,
                              minWidth:50,
                              // justifyContent:"space-between"
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
                      return<View style={[styles.row,{display:"flex",justifyContent:"center",alignItems:"center",marginRight:5,height:"auto"}]}>
                          { isResponse == true ? <View  style={{height:30,minWidth:50,borderWidth:1}}><TextInput
                              style={{height: 30,minWidth:30,textAlign:"center",fontSize: 20, fontWeight: "bold"}}
                              defaultValue={val.studentAnswer}
                              editable={false}
                              /></View> :
                              <View style={{height:"auto"}}>
                              {/* <MyInput handleInputs={handleInputs} val={val} isValidated={isValidated}/> */}
                              <OwnTextInput myId={outerIndex+""+index} handleInputs={handleInputs} val={val} isValidated={isValidated}/>
                              </View>
                          }</View> 
                      // return (
                      //   <View
                      //     style={[
                      //       styles.row,
                      //       {
                      //         display: "flex",
                      //         justifyContent: "center",
                      //         alignItems: "center",
                      //       },
                      //     ]}
                      //   >
                      //     <MyInput handleInputs={handleInputs} val={val} />
                      //   </View>
                      // );
                    }
                  })}
                </View>
              );
            })}
          </View>
        </View>

      { screenType == MATH_ZONE_QUESTION ?
        <View style={styles.submitButtonSection}>
          {isValidated ? (
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {
                submitResponse(question_id, student_response, isCorrect)
                setIsValidated(false);
                setIsCorrect(false);
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
              <Text style={{ fontWeight: "bold", color: "white" }}>Show Soln</Text>
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
    // minWidth: 50,
    // flex:1,
    // borderWidth:1,
    // borderColor:"orange",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "row",
  // justifyContent: "space-evenly",
    alignItems: "center",
  },
  column: {
    minWidth: 40,
  },
});

export default HorizontalKeyingType;
