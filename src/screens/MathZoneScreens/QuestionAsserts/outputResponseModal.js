import React, { useState, useRef, useEffect } from 'react';
import { Button, Pressable, Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import HtmlViwer from './HtmlRender';
import { WebView } from 'react-native-webview';
import LottieView from "lottie-react-native";
import QuestionPartBuilder from './questionPartBuilder';

import { SCREEN_WIDTH } from '../../../config/configs'
const deviceHeight = Dimensions.get("window").height

import {
  correctStudentAnswer,
  lossingEmotion,
} from "../../../assets/lottieAssets";


function ModalTester({isCorrect, solution, isMathquill }) {
 
 
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    console.log("isModalVisible",isModalVisible)
    setModalVisible(!isModalVisible);
  };

  const question = {
    html: `
<span style='font-size: 20px; font-weight: bold'>
  ${solution}
</span>
`
  }

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



  return <View style={{width:"100%"}}>
        
       
        { <View>
          <Button title="Show Solution" onPress={toggleModal} />

          <Modal
            isVisible={isModalVisible}>
            <View 
            style={[
               {
                  backgroundColor: 'white',
                  borderWidth: 3,
                  borderColor: 'black',
                
                },styles.modalContainer]
            }
            
            >
              
              <View style={{position:"absolute",zIndex:9,right:0}}>
                  <View style={{display:"flex", flexDirection: 'row-reverse',
                     width:25}}>
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
                    
                     <QuestionPartBuilder data={solution} isOutputModel={true} />
                  </View>
                  
                </View>
              </ScrollView>
            </View>
          </Modal>
          </View>
        }
  </View>
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
    maxHeight: 300
  }
});

export default ModalTester;
