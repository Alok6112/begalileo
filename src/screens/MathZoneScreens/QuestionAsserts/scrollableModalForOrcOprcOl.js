import React, { useState, useRef, useEffect } from 'react';
import { Button, Pressable, Text, View, StyleSheet, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import HtmlViwer from './HtmlRender';
import { WebView } from 'react-native-webview';
import LottieView from "lottie-react-native";
import { SCREEN_HEIGHT } from "../../../config/configs"
import { SCREEN_WIDTH } from "../../../config/configs";

import {
  correctStudentAnswer,
  lossingEmotion,
} from "../../../assets/lottieAssets";


function ModalTesterForOrcOprcOl({ isCorrect, data ,type}) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  let temp = JSON.stringify(data)
  let html;

  if(type == 'orc'){
    html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="http://code.jquery.com/jquery.min.js"></script>
        <script src="http://code.jquery.com/ui/1.8.17/jquery-ui.min.js"></script>
        <script src="jquery.ui.touch-punch.min.js"></script>
    
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.js"></script>
        <title>Document</title>
        <style>
          table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }
          td,
          th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
            height: 30px;
          }
    
          .options {
            width: 100%;
            border: 1px solid black;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            min-height: 30px;
            margin:5px 0px;
            box-sizing: border-box;
          }
          .optionElement {
            min-height: 30px;
            min-width: 50px;
            border: 1px solid black;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10px;
          }
          .tdStylesForDrop{
            display: flex;
            flex-direction: column;
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
  
    let draggedId ;
  
          let data1 = ${temp}
   
  
  
    const orcData = data1.question_data[0].orc_oprc_data[0];
    let colHeaders = orcData.column_headers;
  
  
    let options = orcData.extra_options;
    let answers = orcData.response;
  
    // for (let i = 0; i < orcData.response.length; i++) {
    //     for(let j=0;j<orcData.response[i].length;j++){
    //       answers.push(orcData.response[i][j]);
    //     } 
    // }
  
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
  
    function generateTable() {
     
      // creates a <table> element and a <tbody> element
      const tbl = document.createElement("table");
      tbl.style.fontFamily = 'arial, sans-serif'
      tbl.style.borderCollapse = 'collapse'
      tbl.style.width = '100%'
  
      tbl.id="tbl"
      const tblBody = document.createElement("tbody");
  
      // creating all cells
      
      for (let i = 0; i < 2; i++) {
        // creates a table row
        const row = document.createElement("tr");
        
        for (let j = 0; j < colHeaders.length; j++) {
  
          const cell = document.createElement("td");
          cell.id = 'td_'+i+'_'+j
          
          let cellText;
          if (i == 0) {
            cellText = document.createElement("div");
            cellText.id = 'div_'+i+'_'+j
            cellText.innerHTML = colHeaders[j];
            cell.appendChild(cellText);
          } else{
            for(let i=0;i<answers[j].length;i++){
              cell.style = cell.className + "tdStylesForDrop"
              cellText = document.createElement("div");
              cellText.className = 'options'
              cellText.id = 'div_'+i+'_'+j
              cellText.innerHTML = answers[j][i];
              cell.appendChild(cellText);
            }
            // cell.style = cell.className + "tdStylesForDrop"
            // cellText = document.createElement("div");
            // cellText.className = 'options'
            // cellText.id = 'div_'+i+'_'+j
            // cellText.innerHTML = answers[j];
            // cell.appendChild(cellText);
          }
  
          row.appendChild(cell);
        }
  
        // add the row to the end of the table body
        tblBody.appendChild(row);
      }
  
      // put the <tbody> in the <table>
      tbl.appendChild(tblBody);
      // appends <table> into <body>
      //document.body.appendChild(tbl);
      document.getElementById("main-frame").appendChild(tbl)
      // sets the border attribute of tbl to '2'
      tbl.setAttribute("border", "2");
        generateOptions();
    }
  
    function generateOptions() {
      
      let optionsContainer = document.createElement("div");
      let width = document.getElementById('tbl').style.offsetWidth;
      optionsContainer.style.maxWidth =width
      optionsContainer.style.border = '1px solid black'
      optionsContainer.style.display='flex'
      optionsContainer.style.flexDirection = 'row'
      optionsContainer.style.justifyContent = 'center'
      optionsContainer.style.alignItems = 'center'
      optionsContainer.style.boxSizing = 'border-box'
      
     
      
      //document.body.appendChild(optionsContainer);
      document.getElementById("main-frame").appendChild(optionsContainer)
      for (let i = 0; i < options.length; i++) {
        let optionElement = document.createElement("div");
        optionElement.className='draggableElement'
        //optionElement.className = "optionElement";
        optionElement.style.minHeight='30px'
        optionElement.style.minWidth = '50px'
        optionElement.style.display='flex'
        optionElement.style.justifyContent = 'center'
        optionElement.style.alignItems = 'center'
        optionElement.style.margin = '10px'
        optionElement.style.border = '1px solid black'
  
        optionElement.id = options[i];
        optionElement.innerHTML = options[i];
        optionElement.setAttribute("draggable", "true");
        optionsContainer.appendChild(optionElement);
      }
  
    }
  
  
    generateTable();
    
    
   
  
    let studentOptions = []
    function validate(){
        console.log("validate");
        let draggableElements = document.querySelectorAll(".draggableElement");
    
        for(let i=0;i<draggableElements.length;i++){
          draggableElements[i].draggable= false
        }
  
        let elements = document.querySelector('tbody')
        let tablerows = elements.childNodes
        
        for(let i=1;i<tablerows.length;i++){
            let tableRowColumns = tablerows[i].childNodes
            
            for(let j=0;j<tableRowColumns.length;j++){
                let colElements = tableRowColumns[j].childNodes
                let temp =[]
                for(let k=0;k<colElements.length;k++){
                    temp.push(colElements[k].id)
                }
                studentOptions.push(temp)
            }
           
        }
  
  
        let originalResponses = orcData.response
        let flagForValidation = false;
        let isItBreaked = false;
        let notFilledAllFields = false
    
        for(let i=0;i<originalResponses.length;i++){
            console.log(studentOptions[i].length  , originalResponses[i].length );
            if(studentOptions[i].length  < originalResponses[i].length ){
                    notFilledAllFields = true
                    break;
            }
        }
  
        if(notFilledAllFields){
            
            flagForValidation = false;
            isItBreaked = false;
            notFilledAllFields = false
  
            alert("please fill all the responses");
        }else{
            
        for(let i=0;i<originalResponses.length;i++){
           
           for(let j=0;j<originalResponses[i].length;j++){
  
               if(studentOptions[i][j] != originalResponses[i][j] ){
                   isItBreaked = true;
                   break;
               }
           }   
           if(isItBreaked){
               break;
           }
        }
  
            if(isItBreaked){
                flagForValidation = false
             }else{
                flagForValidation = true
            }
        }
  
       
     return flagForValidation
       
    }
    
    window.addEventListener("message", message => {
        // alert(message.data) 
        if(message.data == 'validate'){
            let isCorrect = validate();
           // alert(isCorrect)
       
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
  }else if(type == 'oprc'){
    html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="http://code.jquery.com/jquery.min.js"></script>
        <script src="http://code.jquery.com/ui/1.8.17/jquery-ui.min.js"></script>
        <script src="jquery.ui.touch-punch.min.js"></script>
    
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.js"></script>
        
        <title>Document</title>
        <style>
          table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
          }
          td,
          th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
            height: 30px;
          }
    
          .options {
            width: 100%;
            border: 1px solid black;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            min-height: 30px;
          }
          .optionElement {
            min-height: 30px;
            min-width: 50px;
            border: 1px solid black;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10px;
            padding: 2px;
          }
          .tdStylesForDrop{
            display: flex;
            flex-direction: column;
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

    let draggedId ;
  
        let data1 = ${temp}
   
    const orcData = data1.question_data[0].orc_oprc_data[0];
    let colHeaders = ["",...orcData.column_headers];
    let rowHeaders = ["",...orcData.row_headers];

   


    let options = [];

    for (let i = 0; i < orcData.response.length; i++) {
        for(let j=0;j<orcData.response[i].length;j++){
            options.push(orcData.response[i][j]);
        } 
    }



    function generateTable() {
      // creates a <table> element and a <tbody> element
      const tbl = document.createElement("table");
      tbl.style.fontFamily = 'arial, sans-serif'
      tbl.style.borderCollapse = 'collapse'
      tbl.style.width = '100%'

      tbl.id="tbl"
      const tblBody = document.createElement("tbody");

      // creating all cells
      
      for (let i = 0; i < rowHeaders.length; i++) {
        // creates a table row
        const row = document.createElement("tr");
        
        for (let j = 0; j < colHeaders.length; j++) {

          const cell = document.createElement("td");
          cell.id = 'td_'+i+'_'+j
          
          let cellText;

          if(i > 0 && j == 0){
            cellText = document.createElement("div");
            cellText.id = 'div_'+i+'_'+j
            cellText.innerHTML = rowHeaders[i];
            cell.appendChild(cellText);
          }

          else if (i == 0) {
            cellText = document.createElement("div");
            cellText.id = 'div_'+i+'_'+j
            cellText.innerHTML = colHeaders[j];
            cell.appendChild(cellText);
          } else{
            cell.style = cell.className + "tdStylesForDrop"
            cellText = document.createElement("div");
            cellText.id = 'div_'+i+'_'+j
            cellText.innerHTML = options.shift();
            cell.appendChild(cellText);
          }

          row.appendChild(cell);
        }

        // add the row to the end of the table body
        tblBody.appendChild(row);
      }

      // put the <tbody> in the <table>
      tbl.appendChild(tblBody);
      // appends <table> into <body>
     
      //document.body.appendChild(tbl);
      document.getElementById("main-frame").appendChild(tbl)
      // sets the border attribute of tbl to '2'
      tbl.setAttribute("border", "2");
        generateOptions();
    }

    function generateOptions() {
      let optionsContainer = document.createElement("div");
      let width = document.getElementById('tbl').style.offsetWidth;
      optionsContainer.style.maxWidth =width
      optionsContainer.style.border = '1px solid black'
      optionsContainer.style.display='flex'
      optionsContainer.style.flexDirection = 'column'
      optionsContainer.style.justifyContent = 'center'
      optionsContainer.style.alignItems = 'center'
      optionsContainer.style.boxSizing = 'border-box'

      //optionsContainer.className = "options";
      optionsContainer.id = "optionsdrop";
      
      //document.body.appendChild(optionsContainer);
      document.getElementById("main-frame").appendChild(optionsContainer)
      
      for (let i = 0; i < options.length; i++) {
        let optionElement = document.createElement("div");
        optionElement.className='draggableElement'
        //optionElement.className = "optionElement";
        
        optionElement.style.minHeight='30px'
        optionElement.style.minWidth = '50px'
        optionElement.style.display='flex'
        optionElement.style.justifyContent = 'center'
        optionElement.style.alignItems = 'center'
        optionElement.style.margin = '10px'
        optionElement.style.padding = '2px'
        optionElement.style.border = '1px solid black'
        
        optionElement.id = options[i];
        optionElement.innerHTML = options[i];
        optionElement.setAttribute("draggable", "true");
        optionsContainer.appendChild(optionElement);
      }

    }
  
  
    generateTable();
    
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
  }else{
   html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
           // text-decoration:underline;
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
      <div id="after" style='font-size: 20px; color: blue; font-weight: bold; margin-top:10px'>${data.question_data[0].after_question_text != null?data.question_data[0].after_question_text:""}</div>
      </div>
        </body>
    </html>
    <script>

    let draggedId ;
    let data1 = ${temp}
    
    const olData = data1.question_data[0].ol_data[0];
  
    

    let options = []

    for (let i = 0; i < olData.response.length; i++) {
        options.push(olData.response[i]);
    }

    function generateOptions() {
      let optionsContainer = document.createElement("div");
      optionsContainer.className = "container";
     
      optionsContainer.style.width ='100%'
      optionsContainer.style.minHeight = '30px'
      optionsContainer.style.border = '1px solid black'
      optionsContainer.style.display='flex'
      optionsContainer.style.flexDirection = 'row'
      optionsContainer.style.flexWrap = 'wrap'
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
       
        optionElement.style.minWidth ='50px'
        optionElement.style.minHeight = '30px'
        //optionElement.style.textDecoration = 'underline'
        optionElement.style.border = '1px solid black'
        optionElement.style.display='flex'
        optionElement.style.justifyContent = 'center'
        optionElement.style.alignItems = 'center'
        optionElement.style.margin = '10px'
        optionElement.style.boxSizing = 'border-box'

        optionElement.className = "draggable";
        optionElement.id = options[i];
        optionElement.innerHTML = options[i];
        optionElement.setAttribute("draggable", "true");
        optionsContainer.appendChild(optionElement);
      }
    }
  
    generateOptions();

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

  const [studentAnswerCorrect, setStudentAnswerCorrect] = useState(isCorrect);
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

console.log("SCREEN_WIDTH",SCREEN_WIDTH, SCREEN_HEIGHT,Math.floor(390*0.50));
  return <View style={{width:"100%"}}>
  {/* { openAnimation == true && <View 
  style={{
   flex:1,
   height:"100%",
   width:"100%",
   position:'absolute',
   //left:"25%",
   //top:"0%",
  //  bottom:"0%",
   }}>

     {
       studentAnswerCorrect && openAnimation &&  <LottieView
       style={{height:150,position:"absolute",bottom:"-5%",left:'25%'}}
       source={correctStudentAnswer}
       autoPlay
       loop
      />
     }
    
   {
     !studentAnswerCorrect && openAnimation &&  <LottieView
     style={{ height:100, position:"absolute",bottom:"50%",left:'30%'}}
     source={lossingEmotion}
     autoPlay
     loop
   /> 
   }
  
  </View>
  } */}


   {/* { openAnimation == false && */}
   <View>
      <Button title="Show Solution" onPress={toggleModal} />

      <Modal
        isVisible={isModalVisible}>
        <View 
        style={[
          isCorrect
            ? {
              backgroundColor: 'white',
              borderWidth: 3,
              borderColor: 'green',
            }
            : {
              backgroundColor: 'white',
              borderWidth: 3,
              borderColor: 'red',
            },styles.modalContainer]
        }
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
              <View>
                {isCorrect ? (
                  <Text style={{ fontSize: 20 }}>Yes You are Correct!</Text>
                ) : (
                  <Text style={{ fontSize: 20 }}>No you are wrong!</Text>
                )}
              </View>

              <View style={{ marginTop: 10 }}>
                <Text style={{ fontSize: 20 }}>Explanation:</Text>
              </View>
              <View>
                {
                  <View style={{ minHeight: 300 }}>
                    <WebView
                      originWhitelist={['*']}
                      source={{ html: html }}
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
   {/* } */}
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

export default ModalTesterForOrcOprcOl;
