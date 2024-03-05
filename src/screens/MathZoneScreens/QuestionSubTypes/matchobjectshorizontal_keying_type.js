import React, { useEffect, useState, useRef } from "react";
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
import QuestionPartBuilder from "../QuestionAsserts/questionPartBuilder";
import OwnTextInput from "../../MathZoneScreensForTesting/OwnTextInput";

const windowHeight = Dimensions.get("window").height;

const MyInput = ({ handleInputs, val , input_refs,index, isValidated}) => {
  const [presentValue, setPresentValue] = useState("")
  return (
    <View style={{ height: 30, width: 30, borderWidth: 1,borderRadius: 5,marginRight:3}}>
      <TextInput
        style={{ height: 30, minWidth: 30 ,textAlign:"center",fontSize: 20, fontWeight: "bold"}}
        ref ={(element)=>input_refs.current[index]=element}
        //placeholder="Type here!"
        // maxLength={1}
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

        onSubmitEditing={() => {
          let nextIndex = null;
          for(let i=index+1;i<input_refs.current.length;i++){
            if(input_refs.current[i] != undefined){
              nextIndex = i;
              break;
            }

          }
          console.log(nextIndex);

          if(nextIndex != null){
            input_refs.current[nextIndex].focus()
          }
          
        }}
        //defaultValue={text}
      />
    </View>
  );
};

const MatchObjectHorizontalKeyingType = ({ data, submitResponse, screenType,  isResponse, handleStudentAnswerCorrect }) => {
  
  let temp1 = false;
  const question = JSON.parse(data.question_data[0].question_text);
  const [student_response,setStudentResponse] = useState(JSON.parse(data.question_data[0].question_text))
  const question_id = data.question_data[0].question_id;

  let length = 0
  
  for(let i=0;i<question.questionContent.length;i++){ 
    length += question.questionContent[i].length
      // for(let j=0;j<question.questionContent[i].length;j++){
      //   if(question.questionContent[i][j].isMissed == 'true'){
      //     length++;
      //   }
      //}
  }
  
  console.log(length)
  const input_refs = useRef(new Array(length))

  const [isValidated, setIsValidated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [solution, setSolution] = useState("");
  const [typedValues, setTypedValues] = useState([]);

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

    for (let i = 0; i < typedValues.length; i++) {
      let temp = answerValues.filter((e) =>
        e.row == typedValues[i].row && e.col == typedValues[i].col ? 1 : 0
      );

      if(typedValues[i].value == ""){
        alert('Please enter all the values');
        return;
      }
      
      if (convertHTML(temp[0].numvalue.trim().toLowerCase()) == typedValues[i].value.trim().toLowerCase() ) {
        temp1 = true
        setIsCorrect(true);
      } else {
        temp1 = false
        setIsCorrect(false);
        break;
      }
    }

    console.log("ISCORRECT",isCorrect);

    let sln = question.solution.model?.map((item)=> `${item.val}`+'</br>')
    setSolution(sln.join(" "))
    // setSolution(question.solution.model[0].val);
    let finalResponse = commonKeyingTypeStudentResponse(student_response,typedValues)
    setStudentResponse(finalResponse)

    setIsValidated(true);
   
    if( screenType == MATH_ZONE_QUESTION){
      handleStudentAnswerCorrect(temp1)
    }
    
  };

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
        <View style={{ width: "80%"}}>
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              alignItems: "flex-start",
            }}
          >
            {/* <HtmlViwer
              source={{ html: question.questionName }}
              isQuestion={true}
              isColumnView={true}
            /> */}
            <QuestionPartBuilder data={ question.questionName }/>
          </View>

          <View
            style={{
              display: "flex",
              // alignItems: "center",
              justifyContent: "center",
              minHeight:10,
              height:"auto",
              width:"100%",
              flexWrap:"wrap"
            }}
          >
            {question.questionContent.map((item, index) => {
              return (
                <>
                  <View style={[styles.row,{minHeight:10,height:"auto"}]}>
                    {item.map((val,i) => {
                     {console.log("val",val)}
                      if (val.isMissed == "false") {
                        return (<View>
                            <View >
                            <QuestionPartBuilder data={val.imgvalue} imgSize={30}/>
                            </View>
                        
                        <View style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                          <View
                            style={[  
                              {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                margin: 5,
                                borderWidth:1,
                                height: 30, 
                                width: 30,
                                borderRadius:5
                              },
                            ]}
                          >
                            {/* <HtmlViwer
                              source={{ html: val.numvalue }}
                              isQuestion={true}
                              isBlack={true}
                            /> */}
                             <QuestionPartBuilder data={val.numvalue} imgSize={20}/>
                          </View>
                        </View>

                        </View>
                        );
                      } else {
                        return (
                          <View style={{display:"flex",flexDirection:"column",minHeight:10,height:"auto",maxWidth:"100%",margin:2,alignItems:"center"}}>
                           <View>
                              {/* <Text>{val.imgvalue}</Text> */}
                              <QuestionPartBuilder data={val.imgvalue} imgSize={30}/>
                            </View>

                          <View
                            style={[
                              styles.row,
                              {
                                display: "flex",
                                justifyContent: "center",
                                // alignItems: "center",
                                // margin: 5,
                              },
                            ]}
                          >
                             { isResponse == true ? 
                             <View style={{ height: 30, width: 30, borderWidth: 1 }}>
                             <TextInput
                               style={{ height: 30, minWidth: 50 ,textAlign:"center",fontSize: 20, fontWeight: "bold"}}
                                defaultValue={val.studentAnswer}
                                editable={false}
                             />
                           </View> 
                            : 
                            <View>
                            <MyInput handleInputs={handleInputs} val={val} input_refs={input_refs} index={item.length*index+i} isValidated={isValidated}/>
                            </View>
                             }
                          </View>
                          </View>
                        );
                      }
                    })}
                  </View>
                </>
              );
            })}
          </View>
        </View>

      { screenType == MATH_ZONE_QUESTION?
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
                setTypedValues([])
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
    minWidth: 50,
    // flex:1,
    // borderWidth:1,
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


export default MatchObjectHorizontalKeyingType;