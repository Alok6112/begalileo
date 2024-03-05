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
import {
  commonKeyingTypeStudentResponse,
  convertHTML,
} from "../QuestionAsserts/commonFileForStudentResponses";
import { WebView } from "react-native-webview";
import {
  MATH_ZONE_QUESTION,
  MATH_ZONE_LIVE_CLASS_QUESTION,
  MATH_ZONE_FLAGGED_QUESTION,
  MATH_ZONE_HOME_WORK_QUESTION,
} from "../../../components/helpers/Constants";
import SolutionComponent from "../QuestionAsserts/outputResponseComponent";
import QuestionPartBuilder from "../QuestionAsserts/questionPartBuilder";
import OwnTextInput from "../../MathZoneScreensForTesting/OwnTextInput";

const windowHeight = Dimensions.get("window").height;

const MyInput = ({ handleInputs, val , isValidated}) => {
  const [presentValue, setPresentValue] = useState("")
  return (
    <View style={{ height: 30, minWidth: 50, borderWidth: 1 ,paddingLeft:8,paddingRight:8,borderRadius: 5}}>
      <TextInput
        style={{
          height: 30,
          minWidth: 30,
          textAlign: "center",
          fontSize: 20,
          fontWeight: "bold",
        }}
        // placeholder="Type here!"
        editable={ isValidated ? false : true}
        value={presentValue}
        keyboardType="numeric"
        onChangeText={(next) => {
          // handleInputs(next, val);
          console.log("next",next.length);
          if(next[next.length-1] >= 0 || next[next.length-1] <= 9){
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

const HorizontalPictureKeyingType = ({
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

    const answerValues = [];

    for (let i = 0; i < question.questionContent.length; i++) {
      for (let j = 0; j < question.questionContent[i].length; j++) {
        if (question.questionContent[i][j].isMissed == "true") {
          answerValues.push(question.questionContent[i][j]);
        }
      }
    }

    if (typedValues.length != answerValues.length) {
      alert("Please enter all the values");
      return;
    }


    for (let i = 0; i < typedValues.length; i++) {
      let temp = answerValues.filter((e) =>
        e.row == typedValues[i].row && e.col == typedValues[i].col ? 1 : 0
      );

      if (typedValues[i].value == "") {
        alert("Please enter all the values");
        return;
      }

      if (
        convertHTML(temp[0]?.value.trim().toLowerCase()) ==
        typedValues[i]?.value.trim().toLowerCase()
      ) {
        temp1 = true;
        setIsCorrect(true);
      } else {
        temp1 = false;
        setIsCorrect(false);
        break;
      }
    }

    let sln = question.solution.model?.map((item)=> `${item.val}`+'</br>')
    setSolution(sln.join(" "))
    // setSolution(question.solution.model[0].val);
    //student response to send back
    // student_response.studentAnswer = droppedValues;
    // if (typedValues.length <= 1) {
    //   student_response.studentAnswer = typedValues[0];
    // } else {
    //   student_response.studentAnswer = typedValues;
    // }
    // console.log('student_response', student_response);
    let finalResponse = commonKeyingTypeStudentResponse(
      student_response,
      typedValues
    );
    setStudentResponse(finalResponse);

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

  const runBeforeFirst = `
window.isNativeApp = true;
true; // note: this is required, or you'll sometimes get silent failures
`;

  const outputResponse = `<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Document</title>
  
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.css" />
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.js"></script>
 
<script src="src/index.js"></script>

</head>
<body>
<div style='font-size: 20px; color: blue; font-weight: bold'> ${question.questionName}</div>
</body>
</html>


<script type="text/javascript">
var MQ = MathQuill.getInterface(2);
var Mfd;

let arr = document.getElementsByClassName('mq-selectable')
let arr1 = [...arr]
for (let i = 0; i < arr1.length; i++) {
  
    arr[i].innerHTML = insertStaticMathMl(arr[i].innerHTML).outerHTML

}


function insertStaticMathMl(data) {
    data = data.slice(1,data.length-1)
   var problemSpan = document.createElement('span')
   // problemSpan.innerHTML = data
   problemSpan.innerHTML = data
   //problemSpan.className = "mq-replacable"
   problemSpan.id = Math.floor(Math.random() * 1000) + 1
   MQ.StaticMath(problemSpan)
   return problemSpan;
}

(function(){
    var body =  document.body,
    html = document.documentElement;

    var height = Math.max(
        body.scrollHeight, html.scrollHeight,
        body.offsetHeight, html.offsetHeight,
        body.clientHeight, html.clientHeight
    );

    const data = JSON.stringify({height, type:'dimensions'})
    window.ReactNativeWebView.postMessage(data);
})()

</script>`;

  const [webViewHeight, setWebViewHeight] = useState(0);
  const webviewRef = useRef();
  const handleWebViewMessage = (event) => {
    const postMessage = JSON.parse(event?.nativeEvent?.data);
    //console.log("postMessage", postMessage);
    if (postMessage.type == "dimensions") {
      const { height } = postMessage;
      // console.log(postMessage);
      console.log("height1", height);
      setWebViewHeight(height);
    }
  };

  return (
    <View>
      <View style={styles.outterSection}>
        <View style={{ width: "80%" }}>
          {/* <View style={{ margin: 10, minHeight: 20 ,height:webViewHeight}}>
            <WebView
              originWhitelist={["*"]}
              source={{ html: outputResponse }}
              javaScriptEnabled
              injectedJavaScriptBeforeContentLoaded={runBeforeFirst}
              onMessage={handleWebViewMessage}
              ref={webviewRef}
            />
          </View> */}
          {/* <View style={{marginTop: 10}}>
              <HtmlViwer source={{html: question.questionName}} isQuestion={true} />
            </View> */}
            <View style={{marginTop: 10}}>
            <QuestionPartBuilder data={ question.questionName } imgSize={100} type={"horizontalPicture"}/>
            </View>

          <View style={{height:"auto"}}>
            {question.questionContent.map((item,outerIndex) => {
              return (
                <View style={[styles.row, { marginTop: 5, padding: 10,minHeight:50,maxHeight:"100%",height:"auto"}]}>
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
                              marginRight: 20,
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
                              marginRight: 20,
                              maxHeight:"100%",
                              height:"auto"
                            },
                          ]}
                        >
                          {isResponse == true ? (
                            <View
                              style={{
                                minHeight: 30,
                                minWidth: 50,
                                borderWidth: 1,
                                maxHeight:"100%",
                                height:"auto"
                              }}
                            >
                              <TextInput
                                style={{
                                  height: 30,
                                  minWidth: 30,
                                  textAlign: "center",
                                  fontSize: 20,
                                  fontWeight: "bold",
                                }}
                                defaultValue={val.studentAnswer}
                                editable={false}
                              />
                            </View>
                          ) : (
                            // <MyInput handleInputs={handleInputs} val={val} isValidated={isValidated} />
                            <View style={{margin:2}}>
                            <OwnTextInput myId={outerIndex+index}  handleInputs={handleInputs} val={val} isValidated={isValidated}/>
                            </View>
                          )}
                        </View>
                      );
                      //return <View style={[styles.row,{display:"flex",justifyContent:"center",alignItems:"center"}]}><MyInput handleInputs={handleInputs} val={val}/></View>
                    }
                  })}
                </View>
              );
            })}
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
                  setTypedValues([]);
                  setSolution("");
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
                setIsValidated(true)
                setIsCorrect(true)
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
                setIsValidated(true)
                setIsCorrect(true)
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

export default HorizontalPictureKeyingType;
