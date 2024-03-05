import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Pressable,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import HtmlViwer from "./HtmlRender";
import { WebView } from "react-native-webview";

import { SCREEN_HEIGHT } from "../../../config/configs";
import {
  MATH_ZONE_QUESTION,
  MATH_ZONE_LIVE_CLASS_QUESTION,
  MATH_ZONE_FLAGGED_QUESTION,
  MATH_ZONE_HOME_WORK_QUESTION,
} from "../../../components/helpers/Constants";

function SolutionComponentForCkEditor({ isCorrect, solution, screenType }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
   ${solution}
</body>
</html>


<script type="text/javascript">

var MQ = MathQuill.getInterface(2);
var Mfd;

let arr = document.getElementsByClassName('mathquill-rendered-math')


for (let i = 0; i < arr.length; i++) {
    if (arr[i].className.includes('mathquill-editable')) {
        arr[i].innerHTML = insertStaticMathMl(arr[i].title).outerHTML
    } else {
        arr[i].innerHTML = insertStaticMathMl(arr[i].innerHTML).outerHTML
    }

}



function insertStaticMathMl(data) {
    var problemSpan = document.createElement('span')
    // problemSpan.innerHTML = data
    problemSpan.innerHTML = data
    problemSpan.className = "mq-replacable"
    problemSpan.id = Math.floor(Math.random() * 1000) + 1
    MQ.StaticMath(problemSpan)
    return problemSpan;
}




let elements = document.getElementsByTagName("input")
    let selectElements = document.getElementsByTagName("select")

    //to reset selected input fileds
    let i = 0;
    while (i < selectElements.length) {
        let j = 0;

        while (j < selectElements[i].options.length) {
           
            if (selectElements[i].options[j].selected) {
                selectElements[i].disabled = true

            }
            j++;
        }

        i++;
    }

    //to reset the radio, checkbox and input fileds 
    i = 0;
    while (i < elements.length) {

        
        if (elements[i].type == 'radio') {
            elements[i].disabled=true

        } else if (elements[i].type == 'text') {
            elements[i].disabled=true

        } else if (elements[i].type == 'checkbox') {
            elements[i].disabled=true
        }

        i++;
    }
     
   

</script>`;

  const runBeforeFirst = `
window.isNativeApp = true;
true; // note: this is required, or you'll sometimes get silent failures
`;

  return (
    <View style={{ marginLeft: 20 }}>
      {screenType == MATH_ZONE_LIVE_CLASS_QUESTION ? (
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
                      {
                        <View style={{ minHeight: 300 }}>
                          <WebView
                            originWhitelist={["*"]}
                            source={{ html: outputResponse }}
                            javaScriptEnabled
                            injectedJavaScriptBeforeContentLoaded={
                              runBeforeFirst
                            }
                          />
                        </View>
                      }
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

      {screenType == MATH_ZONE_FLAGGED_QUESTION ? (
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
                    {
                      <View style={{ minHeight: 300 }}>
                        <WebView
                          originWhitelist={["*"]}
                          source={{ html: outputResponse }}
                          javaScriptEnabled
                          injectedJavaScriptBeforeContentLoaded={runBeforeFirst}
                        />
                      </View>
                    }
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
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
  // description: {
  //   paddingHorizontal: 20,
  //   paddingVertical: 40,
  //   fontSize: 18
  // },
  //  button: {
  //   alignItems: "center",
  //   borderRadius: 4,
  //   margin: 12,
  //   width: "80%"
  // },
  // buttonLabel: {
  //   color: "white",
  //   fontSize: 20,
  //   fontWeight: "500",
  //   padding: 12
  // }
});

export default SolutionComponentForCkEditor;
