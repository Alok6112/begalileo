import React, { useEffect, useState, useRef } from "react";
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
import { WebView } from "react-native-webview";
import {
  MATH_ZONE_QUESTION,
  MATH_ZONE_LIVE_CLASS_QUESTION,
  MATH_ZONE_FLAGGED_QUESTION,
  MATH_ZONE_HOME_WORK_QUESTION,
} from "../../../components/helpers/Constants";
import SolutionComponent from "../QuestionAsserts/outputResponseComponent";
import QuestionPartBuilder from "../QuestionAsserts/questionPartBuilder";

const windowHeight = Dimensions.get("window").height;
const HorizontalPictureSelectChoiceType = ({
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

    if (selectedValue == null) {
      console.log("please select any one of the choice");
      return;
    }

    const answerValues = [];

    for (let i = 0; i < question.questionContent.length; i++) {
      for (let j = 0; j < question.questionContent[i].length; j++) {
        if (question.questionContent[i][j].isMissed == "true") {
          answerValues.push(question.questionContent[i][j]);
        }
      }
    }

    console.log(answerValues);

    if (selectedValue == answerValues[0].value) {
      temp1 = true;
      setIsCorrect(true);
    } else {
      temp1 = false;
      setIsCorrect(false);
    }

    let sln = question.solution.model?.map((item)=> `${item.val}`+'</br>')
    setSolution(sln.join(" "))
    // setSolution(question.solution.model[0].val);
    //student response to send back
    student_response.studentAnswer = selectedValue;
    setStudentResponse(student_response);
    // student_response.studentAnswer = droppedValues;
    // if (droppedValues.length <= 1) {
    //   student_response.studentAnswer = droppedValues[0];
    // } else {
    //   student_response.studentAnswer = droppedValues;
    // }
    //console.log('student_response', student_response);

    setIsValidated(true);
    
    if( screenType == MATH_ZONE_QUESTION){
      handleStudentAnswerCorrect(temp1)
    }
    
  };

  const [isValidated, setIsValidated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [solution, setSolution] = useState("");

  const handleChoices = (val) => {
    console.log(val);
    setSelectedValue(val);
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
          {/* <View style={{ margin: 10, minHeight: 150 }}>
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
              <QuestionPartBuilder data={question.questionName} imgSize={150}/>
              {/* <HtmlViwer source={{html: question.questionName}} isQuestion={true} /> */}
            </View>
          </View>

          <View>
            <View>
              {question.questionContent.map((item) => {
                return (
                  <View style={[styles.row, { marginTop: 5, padding: 10 }]}>
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
                                marginRight: 20,
                              },
                            ]}
                          >
                            {/* <HtmlViwer
                              source={{ html: val.value }}
                              isQuestion={true}
                              isBlack={true}
                            /> */}
                            <QuestionPartBuilder data={ val.value } />
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
                              },
                            ]}
                          >
                            <View
                              style={{ height: 30, width: 50, borderWidth: 1 }}
                            ></View>
                          </View>
                        );
                      }
                    })}
                  </View>
                );
              })}
            </View>
          </View>

          <ChoicesSection
            choices={question.choices}
            handleChoices={handleChoices}
            isResponse={isResponse}
            isValidated={isValidated}
          />
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
                  setSelectedValue(null);
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

export default HorizontalPictureSelectChoiceType;
