import React, { useState, useRef, useEffect } from 'react';
import { Button, Pressable, Text, View, StyleSheet, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import HtmlViwer from './HtmlRender';
import { WebView } from 'react-native-webview';
import LottieView from "lottie-react-native";

import {
  correctStudentAnswer,
  lossingEmotion,
} from "../../../assets/lottieAssets";
import { SCREEN_HEIGHT } from '../../../config/configs';


function ModalTesterForCkEditor({ isCorrect, solution }) {
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

// const [studentAnswerCorrect, setStudentAnswerCorrect] = useState(isCorrect);
// const [openAnimation, setOpenAnimation] = useState();
// const [startAnimation, setStartAnimation] = useState(false);


// const timer1 = useRef(null);
// const timer2 = useRef(null);

// useEffect(()=>{
//   setStartAnimation(true)
// },[])

// useEffect(() => {
 
//   if (studentAnswerCorrect != undefined) {
//     handleOpenAnimation();
//   }

//   return () => {
//     clearTimeout(timer1.current);
//     clearTimeout(timer2.current);
//   };
// }, [startAnimation]);

// const handleOpenAnimation = () => {
//   timer1.current = setTimeout(() => {
//     setOpenAnimation(true);
//     clearTimeout(timer1.current);
//     handleCloseAnimation();
//   }, 500);
// };
// const handleCloseAnimation = () => {
//   timer2.current = setTimeout(() => {
//     setOpenAnimation(false);
//     clearTimeout(timer2.current);
//   }, 5000);
// };


  return <>
   {/* { openAnimation == true && <View 
         style={{
          flex:1,
          height:"100%",
          width:"100%",
          position:'absolute',
          //left:"25%",
          // top:"0%",
          // bottom:"0%",
          }}>

            {
              studentAnswerCorrect && openAnimation &&  <LottieView
              style={{height:150,position:"relative",top:"20%",left:'25%'}}
              source={correctStudentAnswer}
              autoPlay
              loop
             />
            }
           
          {
            !studentAnswerCorrect && openAnimation &&  <LottieView
            style={{ height:100, position:"absolute",top:"25%",left:'30%' }}
            source={lossingEmotion}
            autoPlay
            loop
          /> 
          }
         
         </View>
         } */}
    {<View>
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
        // style={[
        //   isCorrect
        //     ? {
        //       backgroundColor: 'white',
        //       borderWidth: 3,
        //       borderColor: 'green',
        //     }
        //     : {
        //       backgroundColor: 'white',
        //       borderWidth: 3,
        //       borderColor: 'red',
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
                {
                  <View style={{ minHeight: 300 }}>
                    <WebView
                      originWhitelist={['*']}
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
      </Modal>
    </View>
  }
  </>
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

export default ModalTesterForCkEditor;
