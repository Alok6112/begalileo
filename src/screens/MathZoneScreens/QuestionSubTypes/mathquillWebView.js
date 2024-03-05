import React, { useState, useRef, useEffect } from "react";
import {
    useWindowDimensions,
    Text,
    View,
    ScrollView,
    StyleSheet,
    Pressable,
    Dimensions,
    Platform
} from "react-native";
import { WebView } from "react-native-webview";
import DOMParser from "react-native-html-parser";
import HtmlViwer from "../QuestionAsserts/HtmlRender";
import ModalTester from "../QuestionAsserts/outputResponseModal";
import {MATH_ZONE_QUESTION, MATH_ZONE_LIVE_CLASS_QUESTION , MATH_ZONE_FLAGGED_QUESTION, MATH_ZONE_HOME_WORK_QUESTION} from '../../../components/helpers/Constants'

const windowHeight = Dimensions.get("window").height;

const MyWebViewMathquill = ({ content, question_id, submitResponse, data, screenType }) => {
    const parser = new DOMParser.DOMParser();
    const parsed = parser.parseFromString(content, "text/html");

    const html = `<!DOCTYPE html>
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

     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/simple-keyboard@latest/build/css/index.css">
    <script src="https://cdn.jsdelivr.net/npm/simple-keyboard@latest/build/index.js"></script>
  <script src="src/index.js"></script>

     <style>
     #mathToolbarContainer {
         width: 300px;
         height: auto;
         padding-bottom: 1rem;
         display: flex;
         flex-direction: column;
         background-color: gray;
         border-radius: 7px;
         /* position: fixed; */
         position: absolute;
         /* top: 0px; */
         z-index: 1;
     }

     /* mathToolbarContainer */
     #mathToolbar {
         width: 300px;
         margin: 0 1rem;
         display: grid;
         position: relative;
         gap: 1rem;
         grid-template-columns: repeat(6, 31px);
         clear: both;
     }

     #mathToolbar>div {
         word-break: break;
         ;
         height: 30px;
         font-size: 10px;
         display: flex;
         justify-content: center;
         align-items: center;


         cursor: pointer;

     }

     .testing {
         color: none;
     }

     #tooltipTopBar {
         color: white;
         font-size: large;
         font-weight: bold;
         float: right;
         margin-right: 10px;
         margin-bottom: 5px;
         cursor: pointer;
     }

     #symbolsWidthHeight {
         min-width: 30px;
         min-height: 31px;
     }
 </style>
 </head>
 <body>
     <div id="check">${parsed}</div>
     <div id="mathToolbarContainer">
     <div className="tooltip-wrapper">
         <div className="tooltip-top-bar" id="tooltipTopBar">
             <span className="tooltip-handle">&nbsp;</span>
             <span onclick="Close()">
                 X
             </span>
         </div>
         <div id="mathToolbar"> 

             <div className="btn mathsign fractions_cls" title="\frac{ }{ }" onclick="getLatex(event,'\\frac{ }{ }',0)">
                 <img src="https://begalileo-assets.s3.ap-south-1.amazonaws.com/Madhu-mathzone-pics/5.png" className="fraction"
                     id="symbolsWidthHeight" />
             </div>

             <div className="btn mathsign" title="\cdot" onclick="getLatex(event,'\\cdot',1)">
                 <img src="https://begalileo-assets.s3.ap-south-1.amazonaws.com/Madhu-mathzone-pics/1.png" className="dot1" id="symbolsWidthHeight" />
             </div>

             <div className="btn mathsign" title="\div" onclick="getLatex(event,'\\div',2)">
                 <img src="https://begalileo-assets.s3.ap-south-1.amazonaws.com/Madhu-mathzone-pics/4.png" className="divide" id="symbolsWidthHeight" />

             </div>
             <div className="btn mathsign" title="\times" onclick="getLatex(event,'\\times',3)">
                 <img src="https://begalileo-assets.s3.ap-south-1.amazonaws.com/Madhu-mathzone-pics/11.png" id="symbolsWidthHeight" />

             </div>
             <div className="btn mathsign mathquill_cursor_cls" title="\sqrt{}" onclick="getLatex(event,'\\sqrt{}',4)">
                 <img src="https://begalileo-assets.s3.ap-south-1.amazonaws.com/Madhu-mathzone-pics/10.png" className="sqroot"
                 id="symbolsWidthHeight" />

             </div>
             <div className="btn mathsign mathquill_cursor_cls" title="^{ }" onclick="getLatex(event,'^{ }',5)">
                 <img src="https://begalileo-assets.s3.ap-south-1.amazonaws.com/Madhu-mathzone-pics/12.png" className="exponent"
                 id="symbolsWidthHeight" />

             </div>
             <div className="btn mathsign" title="\le" onclick="getLatex(event,'\\le',6)">
                 <img src="https://begalileo-assets.s3.ap-south-1.amazonaws.com/Madhu-mathzone-pics/6.png" className="lessthanequal"
                 id="symbolsWidthHeight" />

             </div>
             <div className="btn mathsign" title="\ge" onclick="getLatex(event,'\\ge',7)">
                 <img src="https://begalileo-assets.s3.ap-south-1.amazonaws.com/Madhu-mathzone-pics/7.png" className="greaterthanequal"
                 id="symbolsWidthHeight" />

             </div>
             <div className="btn mathsign mathquill_cursor_cls" title="\left|\right|" onclick="getLatex(event,'\\left|\\right|',8)">
                 <img src="https://begalileo-assets.s3.ap-south-1.amazonaws.com/Madhu-mathzone-pics/3.png" className="absolute"
                 id="symbolsWidthHeight" />

             </div>
             <div className="btn mathsign" title="\prod" onclick="getLatex(event,'\\prod',9)">
                 <img src="https://begalileo-assets.s3.ap-south-1.amazonaws.com/Madhu-mathzone-pics/9.png" className="pi" id="symbolsWidthHeight" />

             </div>
             <div className="btn mathsign mathquill_cursor_cls" title="\nthroot{}{}" onclick="getLatex(event,'\\nthroot{}{}',10)">
                 <img src="https://begalileo-assets.s3.ap-south-1.amazonaws.com/Madhu-mathzone-pics/8.png" className="nthroot"
                 id="symbolsWidthHeight" />

             </div>
             <div className="btn mathsign mathquill_cursor_cls" title="_{ }" onclick="getLatex(event,'_{ }',11)">
                 <img src="https://begalileo-assets.s3.ap-south-1.amazonaws.com/Madhu-mathzone-pics/2.png" className="xbase" id="symbolsWidthHeight" />
                 
             </div>
         </div>
     </div>
 </div>

 <div class="simple-keyboard"></div>
 

 </body>
 </html>
 
 
 <script type="text/javascript">


    
 const Keyboard = window.SimpleKeyboard.default;

const myKeyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button)
});


function onKeyPress(button) {
  addOnTOGetLatex(button)
}
 
     let typeRadioOut = [], typeCheckboxOut = [], typeInputOut = [], typeSlectOut = [];
     let typeRadioIn = [], typeCheckboxIn = [], typeInputIn = [], typeSlectIn = [];
 
     var MQ = MathQuill.getInterface(2);
     var Mfd;
     let symbolsArray = [
         "\\\\frac",
         "\\cdot",
         "\\div",
         "\\\\times",
         "\\sqrt",
         "^",
         "\\le",
         "\\ge",
         "|",
         "prod",
         "\\\\nthroot",
         "_",
     ];
 
     let arr = document.getElementsByClassName('mathquill-rendered-math')
 
     //console.log("Check",arr);
 
     for (let i = 0; i < arr.length; i++) {
         // console.log(arr[i].className.includes('mathquill-editable'));
         if (arr[i].className.includes('mathquill-editable')) {
             arr[i].innerHTML = insertDyanamicMathMl(arr[i].innerHTML).outerHTML
             arr[i].addEventListener('click', setClickedDiv)
         } else {
             arr[i].innerHTML = insertStaticMathMl(arr[i].innerHTML).outerHTML
         }
 
     }
 
 
     document.getElementById('mathToolbarContainer').style.visibility = "hidden";
     document.getElementsByClassName('simple-keyboard')[0].style.visibility = "hidden"
 
     let elementClicked;

     function addOnTOGetLatex(key) {

      var specialKeys = {
          right: "Right",
          left: "Left",
          Down: "Down",
          Up: "Up",
          bksp: "Backspace",
          tab: "Tab",
          enter: "Enter",
          shift: "Shift"

      }

      Mfd = MQ.MathField(elementClicked)
      if (key == '{space}') {
          Mfd.cmd('&nbsp;')
      }
      else if (specialKeys[key.slice(1, key.length - 1)]) {
          Mfd.keystroke(specialKeys[key.slice(1, key.length - 1)]);
      }
      else {
          if (key == '{lock}') {
              capslock = !capslock;
              
          }
          else if(capslock == true){
              Mfd.cmd(key.toUpperCase())
          }
          else{
              Mfd.cmd(key)
          }
         
      }

      //Mfd.moveToRightEnd()
      //Mfd.focus()
  }

 
     function getLatex(e, latex, i) {
         e.preventDefault()
         console.log("yes", latex);
         // mathField.cmd(symbolsArray[i])
         // mathField.focus()
         // Mfd.latex(latex)
         Mfd = MQ.MathField(elementClicked)
         Mfd.cmd(symbolsArray[i])
         Mfd.moveToRightEnd()
         Mfd.focus()
 
     }
 
 
     function setClickedDiv(event) {
         event.preventDefault();
         var e = event.target;
         while (!e.classList.contains('mathquill-editable')) {
             e = e.parentElement;
         }
         elementClicked = e;
         let toolTipElement = document.getElementById('mathToolbarContainer');
 
 
         toolTipElement.style.visibility = "visible";
         document.getElementsByClassName('simple-keyboard')[0].style.visibility = "visible"
 
 
         var rect = elementClicked.getBoundingClientRect();
         var heightOfToolTip = toolTipElement.getBoundingClientRect().height;
         var widthOfToolTip = toolTipElement.getBoundingClientRect().width;
 
         toolTipElement.style.top = rect.top - heightOfToolTip - 5 + "px";
         toolTipElement.style.left = rect.left - (widthOfToolTip / 8) + 'px';
 
 
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
 
 
     function insertDyanamicMathMl(data) {
 
         var problemSpan = document.createElement('span')
         problemSpan.id = Math.floor(Math.random() * 1000) + 1
         problemSpan.setAttribute('contenteditable', "true");
         problemSpan.style.minWidth = '20px';
         var mathField = MQ.MathField(problemSpan, {
             spaceBehavesLikeTab: true
         })
         return problemSpan;
     }
 
 
     function Close() {
         console.log("Close button is clicked");
         document.getElementById('mathToolbarContainer').style.visibility = "hidden";
         document.getElementsByClassName('simple-keyboard')[0].style.visibility = "hidden"
     }
 
     
     
 
 
     function finalResponses() {
         console.log("Final responses");
         let elements = document.getElementsByTagName("input")
         let selectElements = document.getElementsByTagName("select")

         typeRadioOut = [],typeInputOut=[],typeCheckboxOut=[],typeSlectOut=[]

         let i = 0;
         while (i < elements.length) {
             //console.log(elements[i]);
             if (elements[i].type == 'radio') {
                elements[i].disabled=true
                 typeRadioOut.push(elements[i].checked)
                 if(elements[i].checked == true){
                    elements[i].checked = "checked"
                }
             } else if (elements[i].type == 'text') {
                elements[i].disabled=true
                 typeInputOut.push(elements[i].value.trim())

             } else if (elements[i].type == 'checkbox') {
                elements[i].disabled=true
                 typeCheckboxOut.push(elements[i].checked)
                 if(elements[i].checked == true){
                    elements[i].checked = "checked"
                }
             }
 
             i++;
         }
 
 
         //to get selected input fileds
         i = 0;
         while (i < selectElements.length) {
 
             let j = 0;
 
             while (j < selectElements[i].options.length) {
                 if (selectElements[i].options[j].selected) {
                    selectElements[i].disabled = true
                     typeSlectOut.push(selectElements[i].options[j].innerHTML)
                     selectElements[i].options[j].selected = "selected"
                 }
                 j++;
             }
 
             i++;
         }
 
 
         let isCorrect = validate();
         //alert(isCorrect)
        
        return isCorrect
         
          
     }
 
     function validate() {
 
         let flagForValidation = true;
 
 
         
         for (let i = 0; i < arr.length; i++) {
 
             if (arr[i].className.includes('mathquill-editable')) {
                 Mfd = MQ.MathField(arr[i])
                 let defaultStr = arr[i].title
                 let studentStr =  Mfd.latex().slice()

//  let str = '\\\\';
//  let val1 = String(defaultStr);
//   let val2 = String(studentStr);
//   val1 = val1.split(str);
//   val2 = val2.split(str);
//   //trim from begginning
//   while (val1.length) {
//     if (val1[0] === str || val1[0]?.trim() == "") val1.shift();
//     else {
//       break;
//     }
//   }

//   while (val2.length) {
//     if (val2[0] === str || val2[0]?.trim() == "") val2.shift();
//     else {
//       break;
//     }
//   }
//   //trim from ending
//   while (val1.length) {
//     if (val1[val1.length - 1] === str || val1[val1.length - 1]?.trim() == "")
//       val1.pop();
//     else {
//       break;
//     }
//   }

//   while (val2.length) {
//     if (val2[val2.length - 1] === str || val2[val2.length - 1]?.trim() == "")
//       val2.pop();
//     else {
//       break;
//     }
//   }
//   alert(val1.join(str)?.trim())
//   alert(val2.join(str)?.trim())
 
                  let str1 =  defaultStr.replaceAll(/\\\\/g, '')
                  let str2 = studentStr.replaceAll(/\\\\/g, '')
                  str1 = str1.split(" ").join("").trim()
                  str2 = str2.split(" ").join("").trim()
                  alert(str1.split(" ").join("").trim())
                  alert(str2.split(" ").join("").trim())
                  alert(str1)
                  alert(str2)

                  alert(str1 !=  str2)
                 if(str1 !=  str2){
                     flagForValidation = false;
                     return flagForValidation;
                }
                 
             }
 
         }
 
 
         let i = 0;
         while (i < typeRadioOut.length) {
             if (typeRadioOut[i] !== typeRadioIn[i]) {
                 flagForValidation = false
                 return flagForValidation;
             }
 
             i++;
         }
 
         i = 0;
         while (i < typeCheckboxOut.length) {
             if (typeCheckboxOut[i] !== typeCheckboxIn[i]) {
                 flagForValidation = false
                 return flagForValidation;
             }
             i++;
         }
 
         i = 0;
         while (i < typeInputOut.length) {
             if (typeInputOut[i] !== typeInputIn[i]) {
                 flagForValidation = false
                 return flagForValidation;
             }
             i++;
         }
 
         i = 0;
         while (i < typeSlectOut.length) {
             if (typeSlectOut[i] !== typeSlectIn[i]) {
                 flagForValidation = false
                 return flagForValidation;
             }
             i++;
         }
 
 
         return flagForValidation;
 
     }
 
 
 
     let elements = document.getElementsByTagName("input")
         let selectElements = document.getElementsByTagName("select")
 
         //to reset selected input fileds
         let i = 0;
         while (i < selectElements.length) {
 
             let j = 0;
 
             while (j < selectElements[i].options.length) {
                 if (selectElements[i].options[j].selected) {
                     typeSlectIn.push(selectElements[i].options[j].innerHTML)
                    // selectElements[i].options[j].removeAttribute("selected")
                    selectElements[i].options[j].selected = ""
                 }
                 j++;
             }
 
             i++;
         }
 
         //to reset the radio, checkbox and input fileds 
         i = 0;
         while (i < elements.length) {
 
 
             if (elements[i].type == 'radio') {
 
                 typeRadioIn.push(elements[i].checked)
                 if (elements[i].checked) {
                     //elements[i].removeAttribute("checked")
                     elements[i].checked=""
                 }
 
             } else if (elements[i].type == 'text') {
 
                 typeInputIn.push(elements[i].value)
                 if (elements[i].value) {
                     elements[i].value = ""
                 }
 
             } else if (elements[i].type == 'checkbox') {
 
                 typeCheckboxIn.push(elements[i].checked)
                 if (elements[i].checked) {
                    // elements[i].removeAttribute("checked")
                    elements[i].checked=""
                 }
             }
 
             i++;
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


         window.addEventListener("message", message => {
    
            if(message.data == 'validate'){
                let isCorrect = finalResponses();
               
                let res = document.getElementById("check").innerHTML;
            
                const obj = {
                isCorrect:isCorrect,
                student_answer_response:JSON.stringify(res)
                }
    
                const data = JSON.stringify({obj, type:'check'})
                window.ReactNativeWebView.postMessage(data);
            }else{
              //  alert("No")
            }
            
            
            
          });
    
 </script>`;

    const runBeforeFirst = `
      window.isNativeApp = true;
      true; // note: this is required, or you'll sometimes get silent failures
  `;


  let temp1 = false;
  const question = data.question_data[0];
    const [student_response, setStudentResponse] = useState(data.question_data[0]);

    const [isValidated, setIsValidated] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [solution, setSolution] = useState("");
    const [studentAnswerResponse,setStudentAnswerResponse] =useState()
    const webviewRef = useRef();

    function sendDataToWebView() {
        webviewRef.current.postMessage('data');
    }

    function validateInWebView() {
        webviewRef.current.postMessage('validate');
    }

    const [webViewHeight, setWebViewHeight] = useState(0);
    const handleWebViewMessage = (event) => {
        console.log("Inside habdle");
        const postMessage = JSON.parse(event?.nativeEvent?.data);
        console.log("In handleWebViewMessage", postMessage);
        if (postMessage.type == "dimensions") {
            const { height } = postMessage;
            console.log("height", height);
            setWebViewHeight(height);
        } else {
            console.log("Start");
            console.log(JSON.parse(postMessage.obj.student_answer_response));
            console.log("End");
            setIsCorrect(postMessage.obj.isCorrect)
            temp1 = postMessage.obj.isCorrect
            setStudentAnswerResponse(JSON.parse(postMessage.obj.student_answer_response))
            setIsValidated(true);
            // var formData = new FormData();
            // formData.append("student_answer_Choice", "");
            // formData.append("student_answer_question", "");
            // submitResponse(question_id, formData);
        }
    };

    return (
        <ScrollView>
            <View style={styles.outterSection}>
                <View style={{ width: "80%" }}>
        
                    <View style={{ height: webViewHeight }}>
                        <WebView
                            originWhitelist={["*"]}
                            source={{ html: html }}
                            containerStyle={{ alignContent: "center" }}
                            javaScriptEnabled
                            nestedScrollEnabled
                            injectedJavaScriptBeforeContentLoaded={runBeforeFirst}
                            onMessage={handleWebViewMessage}
                            ref={webviewRef}
                        />
                    </View>

                    {question.after_question_text != null ?<View style={{ marginTop: 10 }}>
                        <HtmlViwer
                            source={{ html: question.after_question_text }}
                            isQuestion={true}
                        />
                    </View>:<></>}

                </View>

            { screenType ==  MATH_ZONE_QUESTION ?
                <View style={styles.submitButtonSection}>
                    {isValidated ? (
                        <Pressable
                            style={styles.buttonStyle}
                            onPress={() => {
                                //submitResponse(question_id, student_response, isCorrect);
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
                                //validate();
                                validateInWebView()
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
                    submitResponse(question_id,studentAnswerResponse, studentAnswerChoice, temp1);
                }}
                >
                <Text style={{ fontWeight: "bold", color: "white" }}>Solve</Text>
                </Pressable>
            )}
            </View>:<></>
            }

            </View>
            {isValidated ? (
                <ModalTester
                    deviceHeight={windowHeight}
                    isCorrect={isCorrect}
                    solution={"hehe!"}
                    isMathquill={true}
                />
            ) : (
                <></>
            )}
        </ScrollView>
        // <View style={{ height: webViewHeight, borderWidth: 1 }}>
        //   <WebView
        //     originWhitelist={["*"]}
        //     source={{ html: html }}
        //     containerStyle={{ alignContent: "center" }}
        //     javaScriptEnabled
        //     nestedScrollEnabled
        //     injectedJavaScriptBeforeContentLoaded={runBeforeFirst}
        //     onMessage={handleWebViewMessage}
        //   />
        // </View>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        height: 30,
        width: 65,
        backgroundColor: "green",
        borderWidth: 2,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
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
        // borderWidth: 1,
    },

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
});

export default MyWebViewMathquill;
