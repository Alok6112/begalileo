import React, { useState, useRef, useEffect } from "react";
import {
    useWindowDimensions,
    Text,
    View,
    ScrollView,
    StyleSheet,
    Pressable,
    Dimensions,
} from "react-native";
import { WebView } from "react-native-webview";
import DOMParser from "react-native-html-parser";
import HtmlViwer from "../../QuestionAsserts/HtmlRender";
import ModalTester from "../../QuestionAsserts/outputResponseModal";
import ModalTesterForOrcOprcOl from "../../QuestionAsserts/scrollableModalForOrcOprcOl";
import {MATH_ZONE_QUESTION, MATH_ZONE_LIVE_CLASS_QUESTION , MATH_ZONE_FLAGGED_QUESTION, MATH_ZONE_HOME_WORK_QUESTION} from '../../../../components/helpers/Constants'
import SolutionComponentForOrcOprcOl from "../../QuestionAsserts/outputResponseComponentForOrcOprcOl";

const windowHeight = Dimensions.get("window").height;
const OLHtmlCheck = ({ data, submitResponse, screenType, isResponse, handleStudentAnswerCorrect }) => {
    //  const parser = new DOMParser.DOMParser();
    //  const parsed = parser.parseFromString(content, "text/html");

    let temp1 = false
    let temp = JSON.stringify(data)

    let html;
    if(isResponse == false){
    
      html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
        <script src="http://code.jquery.com/jquery.min.js"></script>
        <script src="http://code.jquery.com/ui/1.8.17/jquery-ui.min.js"></script>
        <script src="jquery.ui.touch-punch.min.js"></script>
    
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.js"></script>

        <title>Document</title>
        <style>
         
          .container {
            width: 100%;
            border: 1px solid black;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 30px;
          }
          .draggable {
            min-height: 30px;
            min-width: 50px;
            border: 0.5px solid black;
          //  text-decoration:underline;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10px;
          }
        </style>
      </head>
      <body>
      <div id="content">
      <div id="before" style='font-size: 20px; color: blue; font-weight: bold; margin-top:10px'>${data.question_data[0].question_text}</div>
      </br>
      <div id="main-frame"></div>
      <div id="after" style='font-size: 20px; color: blue; font-weight: bold; margin-top:10px'>${data.question_data[0].after_question_text != null ?data.question_data[0].after_question_text:""}</div>
      </div>
        </body>
    </html>
    <script>

    let typeRadioOut = [], typeCheckboxOut = [], typeInputOut = [], typeSlectOut = [];
    let typeRadioIn = [], typeCheckboxIn = [], typeInputIn = [], typeSlectIn = [];

    let draggedId ;
    let data1 = ${temp}
    
    const olData = data1.question_data[0].ol_data[0];
  
    function drag(ev) {
        draggedId= ev.target.id
        ev.dataTransfer.setData("text", ev.target.id);
    }
  

    let options = []

    for (let i = 0; i < olData.response.length; i++) {
        options.push(olData.response[i]);
    }

    function shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    }

    shuffle(options);


    function generateOptions() {
      let optionsContainer = document.createElement("div");
      optionsContainer.className = "container";
     
      optionsContainer.style.width ='100%'
      optionsContainer.style.minHeight = '30px'
      optionsContainer.style.border = '1px solid black'
      optionsContainer.style.display='flex'
      optionsContainer.style.flexDirection = 'column'
     // optionsContainer.style.flexWrap = 'wrap'
      optionsContainer.style.justifyContent = 'center'
      optionsContainer.style.alignItems = 'center'
      optionsContainer.style.boxSizing = 'border-box'
   
      optionsContainer.ondragstart = function (event) {
        drag(event);
      };

      // document.body.appendChild(optionsContainer);
      document.getElementById("main-frame").appendChild(optionsContainer)
      
      for (let i = 0; i < options.length; i++) {
        let optionElement = document.createElement("div");
       
        optionElement.style.minWidth ='80%'
        optionElement.style.minHeight = '30px'
        //optionElement.style.textDecoration = 'underline'
        optionElement.style.border = '0.5px solid black'
        optionElement.style.display='flex'
        optionElement.style.justifyContent = 'center'
        optionElement.style.alignItems = 'center'
        optionElement.style.margin = '10px'
        optionElement.style.padding = '2px'
        optionElement.style.boxSizing = 'border-box'

        optionElement.className = "draggable";
        optionElement.id = options[i]+'_'+i;

        // if(options[i].includes('<img')){
         
        //   let str =  [options[i].slice(0, options[i].length-1), "draggable=false", options[i].slice(options[i].length-1)].join('')
        //    options[i] = str;
        //  }


        optionElement.innerHTML = options[i];
        optionElement.setAttribute("draggable", "true");
        optionsContainer.appendChild(optionElement);
      }
      // setHeight();
      setTimeout(()=>{
        setHeight()
      },500)
    }
  
    generateOptions();


    const draggables = document.querySelectorAll(".draggable");
    const containers = document.querySelectorAll(".container");

    draggables.forEach((draggable) => {
      draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
      });

      draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
      });
    });

    containers.forEach((container) => {
      container.addEventListener("dragover", (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector(".dragging");
        if (afterElement == null) {
          container.appendChild(draggable);
        } else {
          container.insertBefore(draggable, afterElement);
        }
      });
    });

    function getDragAfterElement(container, y) {
      const draggableElements = [
        ...container.querySelectorAll(".draggable:not(.dragging)"),
      ];

      return draggableElements.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        { offset: Number.NEGATIVE_INFINITY }
      ).element;
    }
    

    function validate(){
        let arr =  document.querySelectorAll(".draggable")
        let flagForValidation = true;
        for(let i=0;i<arr.length;i++){
            console.log(arr[i].id == olData.response[i] );
            let item; 

            if(arr[i].id[arr[i].id.length-2] == '_'){
              item = arr[i].id.slice(0,arr[i].id.length-2)
            }else if(arr[i].id[arr[i].id.length-3] == '_'){
              item = arr[i].id.slice(0,arr[i].id.length-3)
            }

            if(item != olData.response[i]){
                flagForValidation = false
                break;
            }
        }

        for(let i=0;i<arr.length;i++){
          arr[i].draggable= false
        }


        // if(flagForValidation){
        //     alert("Yahooo!");
        // }else{
        //     alert("Shitt!");
        // }


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

    function setHeight(){
        var body =  document.body,
        html = document.documentElement;

        var height = Math.max(
            body.scrollHeight, html.scrollHeight,
            body.offsetHeight, html.offsetHeight,
            body.clientHeight, html.clientHeight
        );
        const data = JSON.stringify({height, type:'dimensions'})
        window.ReactNativeWebView.postMessage(data);
    }
   

    window.addEventListener("message", message => {
    
        if(message.data == 'validate'){
            // let isCorrect = validate();
            let isCorrect = finalResponses();
            let res = document.getElementById("content").innerHTML;
        
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

     
      var MQ = MathQuill.getInterface(2);
      var Mfd;
      
      let arr = document.getElementsByClassName('mathImg')
      let arr1 = [...arr]
      for (let i = 0; i < arr1.length; i++) {
        
          arr[i].innerHTML = insertStaticMathMl(arr[i].innerHTML).outerHTML
      
      }
      
      
      function insertStaticMathMl(data) {
         var problemSpan = document.createElement('span')
         problemSpan.innerHTML = data
         problemSpan.id = Math.floor(Math.random() * 1000) + 1
         MQ.StaticMath(problemSpan)
         return problemSpan;
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
                
                typeRadioOut.push(elements[i].checked)
                if(elements[i].checked == true){
                    elements[i].checked = "checked"
                    document.getElementsByTagName("input")[i].setAttribute('checked',"checked");
                }
                elements[i].disabled=true
            } else if (elements[i].type == 'text') {
                elements[i].disabled=true
                document.getElementsByTagName("input")[i].setAttribute('value',elements[i].value.trim());
                typeInputOut.push(elements[i].value.trim())

            } else if (elements[i].type == 'checkbox') {
                
                typeCheckboxOut.push(elements[i].checked)
                if(elements[i].checked == true){
                    elements[i].checked = "checked"
                    document.getElementsByTagName("input")[i].setAttribute('checked',"checked");
                }
                elements[i].disabled=true
            }

            i++;
        }


        //to get selected input fileds
        i = 0;
        while (i < selectElements.length) {

            let j = 0;

            while (j < selectElements[i].options.length) {
                if (selectElements[i].options[j].selected) {
                
                    typeSlectOut.push(selectElements[i].options[j].innerHTML)
                    selectElements[i].options[j].selected = "selected"
                    document.getElementsByTagName("select")[i].options[j].setAttribute('selected',"selected");
                    selectElements[i].disabled = true
                }
                j++;
            }

            i++;
        }


        let isCorrect = validate();
        return isCorrect
        
        
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
    


    </script>
      `;

    }else{    
      html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
        <script src="http://code.jquery.com/jquery.min.js"></script>
        <script src="http://code.jquery.com/ui/1.8.17/jquery-ui.min.js"></script>
        <script src="jquery.ui.touch-punch.min.js"></script>
    
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.js"></script>

        <title>Document</title>
        <style>
         
          .container {
            width: 100%;
            border: 1px solid black;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 30px;
          }
          .draggable {
            min-height: 30px;
            min-width: 50px;
            border: 0.5px solid black;
          //  text-decoration:underline;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10px;
          }
        </style>
      </head>
      <body>
      <div id="content">
      <div id="before" style='font-size: 20px; color: '#233584'; font-weight: bold; margin-top:10px'>${data.question_data[0].question_text}</div>
      </br>
      <div id="main-frame"></div>
      <div id="after" style='font-size: 20px; color: '#233584'; font-weight: bold; margin-top:10px'>${data.question_data[0].after_question_text != null ?data.question_data[0].after_question_text:""}</div>
      </div>
        </body>
    </html>
    <script>

    let draggedId ;
    let data1 = ${temp}
    
    const olData = data1.question_data[0].ol_data[0];
  
    function drag(ev) {
        draggedId= ev.target.id
        ev.dataTransfer.setData("text", ev.target.id);
    }
  

    let options = []

    for (let i = 0; i < olData.response.length; i++) {
        options.push(olData.response[i]);
    }

    function shuffle(array) {
      let currentIndex = array.length,
        randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex],
          array[currentIndex],
        ];
      }

      return array;
    }

    shuffle(options);


    function generateOptions() {
      let optionsContainer = document.createElement("div");
      optionsContainer.className = "container";
     
      optionsContainer.style.width ='100%'
      optionsContainer.style.minHeight = '30px'
      optionsContainer.style.border = '1px solid black'
      optionsContainer.style.display='flex'
      optionsContainer.style.flexDirection = 'column'
     // optionsContainer.style.flexWrap = 'wrap'
      optionsContainer.style.justifyContent = 'center'
      optionsContainer.style.alignItems = 'center'
      optionsContainer.style.boxSizing = 'border-box'
   
      optionsContainer.ondragstart = function (event) {
        drag(event);
      };

      // document.body.appendChild(optionsContainer);
      document.getElementById("main-frame").appendChild(optionsContainer)
      
      for (let i = 0; i < options.length; i++) {
        let optionElement = document.createElement("div");
       
        optionElement.style.minWidth ='80%'
        optionElement.style.minHeight = '30px'
        //optionElement.style.textDecoration = 'underline'
        optionElement.style.border = '0.5px solid black'
        optionElement.style.display='flex'
        optionElement.style.justifyContent = 'center'
        optionElement.style.alignItems = 'center'
        optionElement.style.margin = '10px'
        optionElement.style.padding = '2px'
        optionElement.style.boxSizing = 'border-box'

        optionElement.className = "draggable";
        optionElement.id = options[i]+'_'+i;

        // if(options[i].includes('<img')){
         
        //   let str =  [options[i].slice(0, options[i].length-1), "draggable=false", options[i].slice(options[i].length-1)].join('')
        //    options[i] = str;
        //  }


        optionElement.innerHTML = options[i];
        optionElement.setAttribute("draggable", "true");
        optionsContainer.appendChild(optionElement);
      }
     // setHeight();
      setTimeout(()=>{
        setHeight()
      },500)
    }
  
    generateOptions();


    const draggables = document.querySelectorAll(".draggable");
    const containers = document.querySelectorAll(".container");

    draggables.forEach((draggable) => {
      draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
      });

      draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
      });
    });

    containers.forEach((container) => {
      container.addEventListener("dragover", (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector(".dragging");
        if (afterElement == null) {
          container.appendChild(draggable);
        } else {
          container.insertBefore(draggable, afterElement);
        }
      });
    });

    function getDragAfterElement(container, y) {
      const draggableElements = [
        ...container.querySelectorAll(".draggable:not(.dragging)"),
      ];

      return draggableElements.reduce(
        (closest, child) => {
          const box = child.getBoundingClientRect();
          const offset = y - box.top - box.height / 2;
          if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
          } else {
            return closest;
          }
        },
        { offset: Number.NEGATIVE_INFINITY }
      ).element;
    }
    

    
    function setHeight(){
        var body =  document.body,
        html = document.documentElement;

        var height = Math.max(
            body.scrollHeight, html.scrollHeight,
            body.offsetHeight, html.offsetHeight,
            body.clientHeight, html.clientHeight
        );
        const data = JSON.stringify({height, type:'dimensions'})
        window.ReactNativeWebView.postMessage(data);
    }
   

    window.addEventListener("message", message => {
    
        if(message.data == 'validate'){
         
            let isCorrect = validate();
           
            let res = document.getElementById("content").innerHTML;
            
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

     
      var MQ = MathQuill.getInterface(2);
      var Mfd;
      
      let arr = document.getElementsByClassName('mathImg')
      let arr1 = [...arr]
      for (let i = 0; i < arr1.length; i++) {
        
          arr[i].innerHTML = insertStaticMathMl(arr[i].innerHTML).outerHTML
      
      }
      
      
      function insertStaticMathMl(data) {
         var problemSpan = document.createElement('span')
         problemSpan.innerHTML = data
         problemSpan.id = Math.floor(Math.random() * 1000) + 1
         MQ.StaticMath(problemSpan)
         return problemSpan;
      }

    </script>
      `;
      
    }

    

    //console.log(html);
    const runBeforeFirst = `
        window.isNativeApp = true;// note: this is required, or you'll sometimes get silent failures
    `;

    const question = data.question_data[0];
    const [student_response, setStudentResponse] = useState(
        data.question_data[0]
    );
    const question_id = data.question_data[0].question_id;

    const [isValidated, setIsValidated] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [solution, setSolution] = useState("");
    const [studentAnswerResponse,setStudentAnswerResponse] =useState()
    const [studentAnswerChoice,setStudentAnswerChoice] = useState("")

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
       // console.log("In handleWebViewMessage", postMessage);
        if (postMessage.type == "dimensions") {
            const { height } = postMessage;
            console.log("height", height);
            setWebViewHeight(height);
        } else {
          console.log("Start");
          console.log(JSON.parse(postMessage.obj.student_answer_response));
          console.log("End");
          console.log(postMessage.obj.isCorrect);
            setIsCorrect(postMessage.obj.isCorrect)
            setStudentAnswerResponse(JSON.parse(postMessage.obj.student_answer_response))
            setIsValidated(true);
            temp1 = postMessage.obj.isCorrect
            // var formData = new FormData();
            // formData.append("student_answer_Choice", "");
            // formData.append("student_answer_question", "");
            // submitResponse(question_id, formData);
            if( screenType == MATH_ZONE_QUESTION){
              handleStudentAnswerCorrect(temp1)
            }
        }
    };

    return (
        <ScrollView>
            <View style={styles.outterSection}>
                <View style={{ width: "80%" }}>
                    {/* <View style={{ marginTop: 10 }}>
                        <HtmlViwer
                            source={{ html: question.question_text }}
                            isQuestion={true}
                        />
                    </View> */}
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

                    {/* <View style={{ marginTop: 10 }}>
                        <HtmlViwer
                            source={{ html: question.after_question_text }}
                            isQuestion={true}
                        />
                    </View> */}

                </View>

              { screenType == MATH_ZONE_QUESTION ?
                <View style={styles.submitButtonSection}>
                    {isValidated ? (
                        <Pressable
                            style={styles.buttonStyle}
                            onPress={() => {
                                submitResponse(question_id,studentAnswerResponse, studentAnswerChoice, isCorrect);
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
                                // alert("HEy")
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
                submitResponse(question_id, studentAnswerResponse, studentAnswerChoice, temp1);
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
          <ModalTesterForOrcOprcOl
            isCorrect={isCorrect}
            data={data}
            type={"ol"}
          />
       }

      { ( screenType == MATH_ZONE_LIVE_CLASS_QUESTION || screenType == MATH_ZONE_FLAGGED_QUESTION ) && isValidated && <SolutionComponentForOrcOprcOl isCorrect={isCorrect}  data={data} type={"ol"} screenType={screenType}/>}
            {/* {isValidated ? (
          <ModalTester
            deviceHeight={windowHeight}
            isCorrect={isCorrect}
            solution={"hehe!"}
            isMathquill={true}
          />
        ) : (
          <></>
        )} */}
        </ScrollView>
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

export default OLHtmlCheck;
