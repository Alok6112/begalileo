import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Pressable,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";

import HtmlViwer from "./HtmlRender";
import { WebView } from "react-native-webview";


const deviceHeight = Dimensions.get("window").height;

import {
  MATH_ZONE_QUESTION,
  MATH_ZONE_LIVE_CLASS_QUESTION,
  MATH_ZONE_FLAGGED_QUESTION,
  MATH_ZONE_HOME_WORK_QUESTION,
} from "../../../components/helpers/Constants";

function SolutionComponent({ isCorrect, solution, isMathquill, screenType }) {
  const [isModalVisible, setModalVisible] = useState(false);
  console.log("solution in SolutionComponent",solution)
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const question = {
    html: `
<span style='font-size: 20px; font-weight: bold'>
  ${solution}
</span>
`,
  };

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
<span style='font-size: 20px; font-weight: bold'>
${solution}
</span>  
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

  const runBeforeFirst = `
window.isNativeApp = true;
true; // note: this is required, or you'll sometimes get silent failures
`;

  return (
    <View style={{ marginLeft: 20 }}>
     
      {screenType == MATH_ZONE_LIVE_CLASS_QUESTION || screenType == MATH_ZONE_QUESTION? (
        <View
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <View style={{ position: "relative", left: "74.5%" }}>
            <Pressable onPress={toggleModal}>
              <View
                style={{
                  height: 30,
                  width: 95,
                  borderWidth: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {isModalVisible ? (
                  <Text>Hide Details</Text>
                ) : (
                  <Text>View Details</Text>
                )}
              </View>
            </Pressable>
          </View>
          <View style={{ borderWidth: 1, minHeight: 100, width: "90%" }}>
            {isCorrect ? (
              <View
                style={{
                  height: 100,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#CCEEA5",
                }}
              >
                <Text style={{ marginLeft: 5 }}>Well Done</Text>
              </View>
            ) : (
              <View
                style={{
                  height: 100,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#fae0e0",
                }}
              >
                <Text style={{ marginLeft: 5 }}>Incorrect</Text>
              </View>
            )}
            {isModalVisible ? (
              <View
                style={[
                  {
                    backgroundColor: "white",
                    borderColor: "black",
                    // minHeight: deviceHeight / 3,
                    // width : SCREEN_WIDTH/ 1.6
                  },
                  styles.modalContainer,
                ]}
              >
                <ScrollView>
                  <View>
                    <View style={{ marginTop: 10, marginLeft: 5 }}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#ff6447",
                          textDecorationLine: "underline",
                        }}
                      >
                        Solution:
                      </Text>
                    </View>
                    <View style={{ marginTop: 10, marginLeft: 5 }}>
                      {isMathquill ? (
                        <View style={{ minHeight: 100 }}>
                          <WebView
                            originWhitelist={["*"]}
                            source={{ html: outputResponse }}
                            javaScriptEnabled
                            injectedJavaScriptBeforeContentLoaded={
                              runBeforeFirst
                            }
                          />
                        </View>
                      ) : (
                        <HtmlViwer source={question} />
                      )}
                    </View>
                  </View>
                </ScrollView>
              </View>
            ) : (
              <></>
            )}
          </View>
        </View>
      ) : (
        <></>
      )}

      {screenType == MATH_ZONE_FLAGGED_QUESTION ||
      screenType == MATH_ZONE_HOME_WORK_QUESTION  ? (
        <View
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <View style={{ minHeight: 100, width: "90%" }}>
            <View
              style={[
                {
                  backgroundColor: "white",
                  borderColor: "black",
                  // minHeight: deviceHeight / 3,
                  // width : SCREEN_WIDTH/ 1.6
                },
                styles.modalContainer,
              ]}
            >
              <ScrollView>
                <View>
                  <View style={{ marginTop: 10, marginLeft: 5 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#ff6447",
                        textDecorationLine: "underline",
                      }}
                    >
                      Solution:
                    </Text>
                  </View>
                  <View style={{ marginTop: 10, marginLeft: 5 }}>
                    {isMathquill ? (
                      <View style={{ minHeight: 100 }}>
                        <WebView
                          originWhitelist={["*"]}
                          source={{ html: outputResponse }}
                          javaScriptEnabled
                          injectedJavaScriptBeforeContentLoaded={runBeforeFirst}
                        />
                      </View>
                    ) : (
                      <HtmlViwer source={question} />
                    )}
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}

      {/* <Modal
            isVisible={isModalVisible}>
            <View 
            style={[
               {
                  backgroundColor: 'white',
                  borderWidth: 3,
                  borderColor: 'black',
                  // minHeight: deviceHeight / 3,
                  // width : SCREEN_WIDTH/ 1.6
                },styles.modalContainer]
            }
            // style={[
            //   isCorrect
            //     ? {
            //       backgroundColor: 'white',
            //       borderWidth: 3,
            //       borderColor: 'green',
            //       // minHeight: deviceHeight / 3,
            //       // width : SCREEN_WIDTH/ 1.6
            //     }
            //     : {
            //       backgroundColor: 'white',
            //       borderWidth: 3,
            //       borderColor: 'red',
            //       // minHeight: deviceHeight / 3,
            //       // width : SCREEN_WIDTH/ 1.6
            //     },styles.modalContainer]
            // }
            >
              <View>
              <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row-reverse',
                      marginRight: 1,
                    }}>
                    <Pressable onPress={toggleModal}>
                      <Text style={{ fontSize: 25, fontWeight: 'bold' ,color:"red",marginRight:5}}>X</Text>
                    </Pressable>
                  </View>
              </View>
              <ScrollView>
                <View>

                  <View style={[ isCorrect ? {backgroundColor:"#CCEEA5"}:{backgroundColor:"#fae0e0"}]}>

                  <View style={{marginLeft:5 ,marginTop:20}}>
                    <Text style={{ fontSize: 20, color:"#ff6447" }}>Correct Solution:</Text>
                  </View> 

                  <View style={{marginLeft:5 ,marginBottom:10}}>
                    {isCorrect ? (
                      <Text style={{ fontSize: 20 ,fontWeight:"bold" }}>Yes</Text>
                    ) : (
                      <Text style={{ fontSize: 20 ,fontWeight:"bold"}}>No</Text>
                    )}
                  </View>

                  </View>
                 

                  <View style={{ marginTop: 10,marginLeft:5 }}>
                    <Text style={{ fontSize: 20, color:"#ff6447", textDecorationLine:"underline" }}>Solution:</Text>
                  </View>
                  <View style={{ marginTop: 10,marginLeft:5 }}>
                    {isMathquill ? (
                      <View style={{ minHeight: 100 }}>
                        <WebView
                          originWhitelist={['*']}
                          source={{ html: outputResponse }}
                          javaScriptEnabled
                          injectedJavaScriptBeforeContentLoaded={runBeforeFirst}
                        />
                      </View>
                    ) : (
                      <HtmlViwer source={question} />
                    )}
                  </View>
                </View>
              </ScrollView>
            </View>
          </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 4,
    // borderColor: "#C0C0C0",
    // borderWidth: 2,
    // marginHorizontal: 40,
    // marginVertical: 120,
    maxHeight: 300,
  },
});

export default SolutionComponent;
