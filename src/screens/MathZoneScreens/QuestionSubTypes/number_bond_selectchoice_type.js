import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Dimensions,
  TextInput
} from 'react-native';

import ChoicesSection from '../QuestionAsserts/choicesComponent';
import HtmlViwer from '../QuestionAsserts/HtmlRender';
import ModalTester from '../QuestionAsserts/outputResponseModal';
import { WebView } from "react-native-webview";
import {MATH_ZONE_QUESTION, MATH_ZONE_LIVE_CLASS_QUESTION , MATH_ZONE_FLAGGED_QUESTION, MATH_ZONE_HOME_WORK_QUESTION} from '../../../components/helpers/Constants'
import SolutionComponent from '../QuestionAsserts/outputResponseComponent';
import QuestionPartBuilder from '../QuestionAsserts/questionPartBuilder';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const NumberBondSelectChoiceType = ({data, submitResponse, screenType, isResponse, handleStudentAnswerCorrect}) => {
  
  let temp1 = false;
  const question = JSON.parse(data.question_data[0].question_text)
  const [student_response,setStudentResponse] = useState(JSON.parse(data.question_data[0].question_text))
  const question_id = data.question_data[0].question_id

  const [isValidated, setIsValidated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [solution, setSolution] = useState('');
  const [treeData,setTreeData] = useState([])
  
  let data1 = JSON.stringify(question.questionContent)
  console.log(data1);


  const validate = () => {
    console.log('Validate');
   
    if(selectedValue == null){
        console.log("please select any one of the choice");
        return;
    }

    const answerValues = []

    for(let i=0;i< question.questionContent.length;i++){

        if(question.questionContent[i].isMissed == "true"){
          answerValues.push(question.questionContent[i])
        }
    }

    console.log(answerValues);

    if(selectedValue == answerValues[0].value){
      temp1 = true
        setIsCorrect(true)
    }else{
      temp1 = false
        setIsCorrect(false)
    }

    let sln = question.solution.model?.map((item)=> `${item.val}`+'</br>')
    setSolution(sln.join(" "))
    // setSolution(question.solution.model[0].val);

    //student response to send back
    student_response.studentAnswer = selectedValue
    setStudentResponse(student_response)


    setIsValidated(true);
   
    if( screenType == MATH_ZONE_QUESTION){
      handleStudentAnswerCorrect(temp1)
    }
    
  };

  

  const handleChoices = (val) =>{
    console.log(val);
    setSelectedValue(val)
  }

  const html = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
      <title>Document</title>
      <style>
        .circle {
          border: 1px solid black;
          height: 50px;
          width: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index:999
        }
        #main-frame {
          //border: 1px solid black;
        }
        .row {
          display: flex;
          justify-content: space-around;
          position: relative;
          margin-bottom: 30px;
        }
        .point {
          height: 1px;
          width: 1px;
          /* border: 1px solid black;
          border-radius: 50%; */
          position: absolute;
        }
        .top {
          top: 0%;
        }
        .bottom {
          bottom: 0%;
        }
        #mycanvas {
          position: absolute;
          top: 0;
        }
        #container {
          position: relative;
        }
      </style>
    </head>
    <body>
      <div id="container">
        <div id="main-frame"></div>
      </div>
    </body>
    <script>
      let treeArr = [];
      let twodArr = [];
      let data = ${data1}
  
      let flag = false
      let layers = 0;
      function wholeDataFormat() {
        for (let i = 0; i < data.length; i++) {
          if (data[i].col % 2 == 0) {
              treeArr.push(data[i]);
          }
          if(flag == false && data[i].value == undefined){
            layers = i
            flag = true
          }
        }
  
        if(layers <= 5){
            layers = 2
        }else if(layers <= 11){
            layers = 3
        }else{
            layers = 4
        }
       
        let temp = treeArr[0];
        treeArr[0] = treeArr[2];
        treeArr[2] = temp;
  
        temp = treeArr[1];
        treeArr[1] = treeArr[2];
        treeArr[2] = temp;
        console.log(treeArr);
  
        let sIndex = 0;
        let eIndex = 1;
        for (let i = 1; i < layers+1; i++) {
          sIndex = Math.pow(2, i - 1) - 1;
          eIndex = Math.pow(2, i) - 1;
          twodArr.push(treeArr.slice(sIndex, eIndex));
          //console.log(treeArr.slice(sIndex,eIndex));
        }
        console.log(twodArr);
        treeStructure();
      }
  
      function treeStructure() {
        let main_frame = document.getElementById("main-frame");
  
        for (let i = 0; i < twodArr.length; i++) {
          let rowDiv = document.createElement("div");
          rowDiv.className = "row";
          rowDiv.id = "row_" + i;
          for (let j = 0; j < twodArr[i].length; j++) {
            let ele = document.createElement("div");
           
              ele.className = "circle";
              ele.title = twodArr[i][j].value;
              ele.innerText = twodArr[i][j].value;
             
              if(twodArr[i][j].isMissed == "true"){
                  ele.innerText = null
              }
           
              if(twodArr[i][j].value == undefined){
                  ele.style.visibility = "hidden"  
              }
  
            if (i != 0) {
              let up_point = document.createElement("div");
              up_point.classList.add("point", "top");
              up_point.id = "layer_" + i + "_node_" + j + "_up";
              ele.appendChild(up_point);
            }
  
            if (i != twodArr.length - 1) {
              let down_point = document.createElement("div");
              down_point.classList.add("point", "bottom");
              down_point.id = "layer_" + i + "_node_" + j + "_down";
              ele.appendChild(down_point);
            }
  
            rowDiv.appendChild(ele);
          }
  
          main_frame.appendChild(rowDiv);
        }
  
        console.log(main_frame.offsetHeight, main_frame.offsetWidth);
  
        var rect = main_frame.getBoundingClientRect();
        // console.log(rect.top, rect.right, rect.bottom, rect.left);
  
        makeBond();
      }
  
      function makeBond() {
        setHeight()
        let main_frame = document.getElementById("main-frame");
        let canvas = document.createElement("canvas");
        canvas.id = "mycanvas";
        canvas.height = main_frame.offsetHeight;
        canvas.width = main_frame.offsetWidth;
  
        document.getElementById("container").append(canvas);
  
        for (let i = 0; i < twodArr.length - 1; i++) {
          let parent_layer = document.getElementById("row_" + i);
          let child_layer = document.getElementById("row_" + (i + 1));
          ;
  
          for (let j = 0; j < parent_layer.childNodes.length; j++) {
            let parent_id = "layer_" + i + "_node_" + j + "_down";
            let child_id1 = "layer_" + (i + 1) + "_node_" + j * 2 + "_up";
            let child_id2 = "layer_" + (i + 1) + "_node_" + (j * 2 + 1) + "_up";
          
            let child1_ele =
            document.getElementById(child_id1).parentNode.title;
          let child2_ele =
            document.getElementById(child_id2).parentNode.title;
        
            if( (child1_ele != "undefined" && child2_ele != "undefined")){
            drawCanvas(parent_id, child_id1, child_id2);
            }
          }
        }
  
        
      }
  
      function drawCanvas(parent_id, child_id1, child_id2) {
        let point1 = document.getElementById(parent_id);
        let point2 = document.getElementById(child_id1);
        let point3 = document.getElementById(child_id2);
  
        point1 = point1?.getBoundingClientRect();
        point2 = point2?.getBoundingClientRect();
        point3 = point3?.getBoundingClientRect();
  
        let left1 = point1?.left;
        let top1 = point1?.top;
        let left2 = point2?.left;
        let top2 = point2?.top;
        let left3 = point3?.left;
        let top3 = point3?.top;
  
        let parent = document.getElementById("row_0");
        parent = parent?.getBoundingClientRect();
        let parentX = parent?.left;
        let parentY = parent?.top;
  
        var c = document.getElementById("mycanvas");
        var ctx = c.getContext("2d");
  
        ctx.beginPath();
        ctx.moveTo(left1 - parentX, top1 - parentY);
        ctx.lineTo(left2 - parentX, top2 - parentY);
        ctx.stroke();
  
        
          ctx.beginPath();
          ctx.moveTo(left1 - parentX, top1 - parentY);
          ctx.lineTo(left3 - parentX, top3 - parentY);
          ctx.stroke();
      }
      
      function remove() {}
  
      window.addEventListener("resize", () => {
        let ele = document.getElementById("mycanvas");
        ele.remove();
        makeBond();
      });
  
      wholeDataFormat();


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
    </script>
  </html>
  `
  const runBeforeFirst = `
  window.isNativeApp = true;// note: this is required, or you'll sometimes get silent failures
`;

const webviewRef = useRef();

function sendDataToWebView() {
    webviewRef.current.postMessage('data');
}

function validateInWebView() {
    webviewRef.current.postMessage('validate');
}



const [webViewHeight, setWebViewHeight] = useState(0);
const handleWebViewMessage = (event) => {
    console.log("Inside handle");
    const postMessage = JSON.parse(event?.nativeEvent?.data);
   // console.log("In handleWebViewMessage", postMessage);
    if (postMessage.type == "dimensions") {
        const { height } = postMessage;
        console.log("height", height);
        setWebViewHeight(height);
    } else {
        console.log(postMessage.obj);
        setIsCorrect(postMessage.obj.isCorrect)
        temp1 = postMessage.obj.isCorrect
        // var formData = new FormData();
        // formData.append("student_answer_Choice", "");
        // formData.append("student_answer_question", "");
        // submitResponse(question_id, formData);
    }
};

  return (
      <View>
        <View style={styles.outterSection}>
          <View style={{width: '80%'}}>
            <View style={{marginTop: 10,marginBottom:10}}>
              {/* <HtmlViwer source={{html: question.questionName}} isQuestion={true} /> */}
              <QuestionPartBuilder data={ question.questionName } />
            </View>
            {
                question.questionContentText != ""?<View>
                  {/* <HtmlViwer source={{html: question.questionContentText}} isQuestion={true} /> */}
                  <QuestionPartBuilder data={question.questionContentText}/>
                  </View> :<></>
            }

                    <View style={{ height: webViewHeight }}>
                        <WebView
                            originWhitelist={["*"]}
                            source={{ html: html }}
                            containerStyle={{ alignContent: "center" }}
                            javaScriptEnabled
                            nestedScrollEnabled
                            injectedJavaScriptBeforeContentLoaded={runBeforeFirst}
                            onMessage={handleWebViewMessage}
                            // ref={webviewRef}
                        />
                    </View>

            <ChoicesSection choices={question.choices} handleChoices={handleChoices} isResponse={isResponse} studentAnswer={student_response.studentAnswer} isValidated={isValidated}/>
        </View>

        { screenType == MATH_ZONE_QUESTION ? 
          <View style={styles.submitButtonSection}>
            {isValidated ? (
              <Pressable
                style={styles.buttonStyle}
                onPress={() => {
                  submitResponse(question_id, student_response, isCorrect)
                  setIsValidated(false);
                  setIsCorrect(false);
                  setSelectedValue(null)
                  setSolution('')
                }}>
                <Text style={{fontWeight: 'bold', color: 'white'}}>Submit</Text>
              </Pressable>
            ) : (
              <Pressable
                style={styles.buttonStyle}
                onPress={() => {
                  validate();
                  // setIsValidated(true);
                }}>
                <Text style={{fontWeight: 'bold', color: 'white'}}>Solve</Text>
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

        {screenType == MATH_ZONE_QUESTION && isValidated &&
          <ModalTester
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
    width: '20%',
    // marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  outterSection: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
    // minHeight: windowHeight / 1.2,
  },
  row:{
    height:40,
    flex:1,
    borderWidth:1,
    backgroundColor:"#C0C0C0",
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
  },
  column:{
    minWidth:40,
  }
});


export default NumberBondSelectChoiceType;



// import React, {useEffect, useState} from 'react';
// import {
//   Text,
//   View,
//   ScrollView,
//   StyleSheet,
//   Pressable,
//   Dimensions,
//   TextInput
// } from 'react-native';

// import ChoicesSection from '../QuestionAsserts/choicesComponent';
// import HtmlViwer from '../QuestionAsserts/HtmlRender';
// import Canvas from 'react-native-canvas';
// import ModalTester from '../QuestionAsserts/outputResponseModal';
// import Svg, {
//     Circle,
//     Ellipse,
//     G,
//     TSpan,
//     TextPath,
//     Path,
//     Polygon,
//     Polyline,
//     Line,
//     Rect,
//     Use,
//     Image,
//     Symbol,
//     Defs,
//     LinearGradient,
//     RadialGradient,
//     Stop,
//     ClipPath,
//     Pattern,
//     Mask,
//   } from 'react-native-svg';

  
// const windowHeight = Dimensions.get('window').height;
// const windowWidth = Dimensions.get('window').width;
// const NumberBondSelectChoiceType = ({data, submitResponse}) => {
  
//   const question = JSON.parse(data.question_data[0].question_text)
//   const [student_response,setStudentResponse] = useState(JSON.parse(data.question_data[0].question_text))
//   const question_id = data.question_data[0].question_id

  
//   const validate = () => {
//     console.log('Validate');
   
//     if(selectedValue == null){
//         console.log("please select any one of the choice");
//         return;
//     }

//     const answerValues = []

//     for(let i=0;i< question.questionContent.length;i++){

//       for(let j=0;j<question.questionContent[i].length;j++){
//         if(question.questionContent[i][j].isMissed == "true"){
//           answerValues.push(question.questionContent[i][j])
//         }
//       }
//     }

//     console.log(answerValues);

//     if(selectedValue == answerValues[0].value){
//         setIsCorrect(true)
//     }else{
//         setIsCorrect(false)
//     }

//     setSolution(question.solution.model[0].val);

//     //student response to send back
//     student_response.studentAnswer = selectedValue
//     setStudentResponse(student_response)


//     setIsValidated(true);
//   };

//   const [isValidated, setIsValidated] = useState(false);
//   const [isCorrect, setIsCorrect] = useState(false);
//   const [selectedValue, setSelectedValue] = useState(null);
//   const [solution, setSolution] = useState('');
//   const [treeData,setTreeData] = useState([])

//   const handleChoices = (val) =>{
//     console.log(val);
//     setSelectedValue(val)
//   }

  
// useEffect(()=>{
//     let treeArr= [];
//     let twodArr = []
//     let data =question.questionContent;
//     data = [
//         {
//         "row":0,
//         "col":0,
//         "value":"4",
//         "isMissed":"false"
//         },
//         {
//         "row":0,
//         "col":1,
//         "value":"+",
//         "isMissed":"false"
//         },
//         {
//         "row":0,
//         "col":2,
//         "value":"6",
//         "isMissed":"false"
//         },
//         {
//         "row":0,
//         "col":3,
//         "value":"=",
//         "isMissed":"false"
//         },
//         {
//         "row":0,
//         "col":4,
//         "value":"10",
//         "isMissed":"true"
//         },
//         {
//         "row":1,
//         "col":0,
//         "value":"1",
//         "isMissed":"true"
//         },
//         {
//         "row":1,
//         "col":1,
//         "value":"+",
//         "isMissed":"false"
//         },
//         {
//         "row":1,
//         "col":2,
//         "value":"3",
//         "isMissed":"false"
//         },
//         {
//         "row":2,
//         "col":0,
//         "value":"4",
//         "isMissed":"true"
//         },
//         {
//         "row":2,
//         "col":1,
//         "value":"+",
//         "isMissed":"false"
//         },
//         {
//         "row":2,
//         "col":2,
//         "value":"2",
//         "isMissed":"false"
//         },
//         {
//         "row":3,
//         "col":0,
//         "value":"1",
//         "isMissed":"false"
//         },
//         {
//         "row":3,
//         "col":1,
//         "value":"+",
//         "isMissed":"false"
//         },
//         {
//         "row":3,
//         "col":2,
//         "value":"0",
//         "isMissed":"true"
//         },
//         {
//         "row":4,
//         "col":0,
//         "value":"2",
//         "isMissed":"true"
//         },
//         {
//         "row":4,
//         "col":1,
//         "value":"+",
//         "isMissed":"false"
//         },
//         {
//         "row":4,
//         "col":2,
//         "value":"1",
//         "isMissed":"false"
//         },
//         {
//         "row":5,
//         "col":0
//         },
//         {
//         "row":5,
//         "col":1
//         },
//         {
//         "row":5,
//         "col":2
//         },
//         {
//         "row":6,
//         "col":0
//         },
//         {
//         "row":6,
//         "col":1
//         },
//         {
//         "row":6,
//         "col":2
//         }]
       
//     for(let i=0;i<data.length;i++){
//         if(data[i].col%2 == 0){
//             if(data[i].value){
//                 treeArr.push(data[i].value)
//             }else{
//                 treeArr.push(-99)
//             }
           

//         }
//     }

//     let temp= treeArr[0]
//     treeArr[0] = treeArr[2]
//     treeArr[2] = temp;

//     temp= treeArr[1]
//     treeArr[1] = treeArr[2]
//     treeArr[2] = temp;
//     console.log(treeArr);

//     let sIndex = 0;
//     let eIndex = 1;
//     for(let i=1;i<5;i++){
//         sIndex = Math.pow(2, i-1) - 1;
//         eIndex = Math.pow(2, i)-1;
//         twodArr.push(treeArr.slice(sIndex,eIndex))
//         //console.log(treeArr.slice(sIndex,eIndex));

//     }

//     setTreeData([...twodArr])
// },[])

// handleCanvas = (canvas) => {
//     const ctx = canvas.getContext('2d');
//     ctx.fillStyle = 'purple';
//     ctx.fillRect(0, 0, 100, 100);
//   }

//   return (
//       <ScrollView>
//         <View style={styles.outterSection}>
//           <View style={{width: '80%'}}>
//             <View style={{marginTop: 10,marginBottom:10}}>
//               <HtmlViwer source={{html: question.questionName}} isQuestion={true} />
//             </View>
//             {
//                 question.questionContentText != ""?<View><HtmlViwer source={{html: question.questionContentText}} isQuestion={true} /></View> :<></>
//             }

//             {/* <View style={{position:"absolute"}}>
//             <Svg height="100" width="100">
//                 <Line x1="0" y1="0" x2="500" y2="200" stroke="red" strokeWidth="2" />
//             </Svg>
//             <Svg height="100" width="100">
//                 <Line x1="40" y1="100" x2="250" y2="10" stroke="red" strokeWidth="2" />
//             </Svg>
//             </View> */}

//             {/* <View>
//                 <View style={{flex:1,borderWidth:1}}>
//                     {
//                         treeData.map((rowArr)=>{
//                             return<View style={{borderWidth:1,display:"flex",flexDirection:"row",justifyContent:"space-around",marginTop:10 }}>
//                                 {
//                                     rowArr.map((ele)=>{
//                                         if(ele == -99){
//                                             return <View>                            
//                                             <View style={{height:50,width:50,borderRadius:50,justifyContent:"center",alignItems:"center",marginLeft:2,marginRight:2}}>
                                            
//                                             </View>
//                                         </View>
//                                         }else{
//                                             return <View>
                                            
//                                             <View style={{borderWidth:1,height:50,width:50,borderRadius:50,justifyContent:"center",alignItems:"center",marginLeft:2,marginRight:2}}>
//                                                 <View onLayout={(event) => {
//                                                 const layout = event.nativeEvent.layout;
                                                

//                                                 console.log("up Point",event.nativeEvent.contentOffset);
//                                                 console.log("height:", layout.height);
//                                                 console.log("width:", layout.width);
//                                                 console.log("x:", layout.x);
//                                                 console.log("y:", layout.y);
//                                             }}style={{height:5,width:5,borderRadius:10,borderWidth:1,position:"absolute",top:0}}></View>
//                                                 <Text>{ele}</Text>
//                                                 <View onLayout={(event) => {
//                                                     const layout = event.nativeEvent.layout;
//                                                     console.log("down Point",ele);
//                                                     console.log("height:", layout.height);
//                                                     console.log("width:", layout.width);
//                                                     console.log("x:", layout.x);
//                                                     console.log("y:", layout.y);
//                                                 }}style={{height:5,width:5,borderRadius:10,borderWidth:1,position:"absolute",bottom:0}}></View>
//                                             </View>
//                                             <View>
                                           
//                                             </View>
//                                         </View>
//                                         }
                                        
//                                     }) 

//                                 }

//                             </View>
                            
                            
//                         })
//                     }
//                 </View>
//             </View> */}


//             <ChoicesSection choices={question.choices} handleChoices={handleChoices} />
//         </View>

//           <View style={styles.submitButtonSection}>
//             {isValidated ? (
//               <Pressable
//                 style={styles.buttonStyle}
//                 onPress={() => {
//                   submitResponse(question_id, student_response, isCorrect)
//                   setIsValidated(false);
//                   setIsCorrect(false);
//                 }}>
//                 <Text style={{fontWeight: 'bold', color: 'white'}}>Submit</Text>
//               </Pressable>
//             ) : (
//               <Pressable
//                 style={styles.buttonStyle}
//                 onPress={() => {
//                   validate();
//                   // setIsValidated(true);
//                 }}>
//                 <Text style={{fontWeight: 'bold', color: 'white'}}>Solve</Text>
//               </Pressable>
//             )}
//           </View>
//         </View>

//         {isValidated ? (
//           <ModalTester
//             deviceHeight={windowHeight}
//             isCorrect={isCorrect}
//             solution={solution}
//           />
//         ) : (
//           <></>
//         )}
//       </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   buttonStyle: {
//     height: 30,
//     width: 65,
//     backgroundColor: 'green',
//     borderWidth: 2,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   submitButtonSection: {
//     width: '20%',
//     // marginTop: 10,
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },

//   outterSection: {
//     display: 'flex',
//     flexDirection: 'row',
//     margin: 10,
//     justifyContent: 'space-between',
//     minHeight: windowHeight / 1.2,
//   },
//   row:{
//     height:40,
//     flex:1,
//     borderWidth:1,
//     backgroundColor:"#C0C0C0",
//     display:"flex",
//     flexDirection:"row",
//     alignItems:"center",
//   },
//   column:{
//     minWidth:40,
//   }
// });


// export default NumberBondSelectChoiceType;
