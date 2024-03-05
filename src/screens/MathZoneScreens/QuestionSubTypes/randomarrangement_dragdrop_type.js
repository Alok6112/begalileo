import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DraxProvider, DraxView, DraxList} from 'react-native-drax';
import HtmlViwer from '../QuestionAsserts/HtmlRender';
import ModalTester from '../QuestionAsserts/outputResponseModal';
import {commonDragDropTypeStudentResponse2D,convertHTML} from '../QuestionAsserts/commonFileForStudentResponses'
import {MATH_ZONE_QUESTION, MATH_ZONE_LIVE_CLASS_QUESTION , MATH_ZONE_FLAGGED_QUESTION, MATH_ZONE_HOME_WORK_QUESTION} from '../../../components/helpers/Constants'
import SolutionComponent from '../QuestionAsserts/outputResponseComponent';
import QuestionPartBuilder from '../QuestionAsserts/questionPartBuilder';

const windowHeight = Dimensions.get('window').height;
const RandomArrangementDragDropType = ({data, submitResponse, screenType, isResponse, handleStudentAnswerCorrect}) => {
  
  let temp1 = false;
  const question = JSON.parse(data.question_data[0].question_text)
  const [student_response,setStudentResponse] = useState(JSON.parse(data.question_data[0].question_text))
  const question_id = data.question_data[0].question_id

  //const student_response = question;
 

  const [isValidated, setIsValidated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [solution, setSolution] = useState('');
  
  const [draggableValues, setDraggableValues] = useState(
    question.choices.map((item, i) => {
      return {
        id: i,
        value: item,
        item:{}
      };
    })
  );


  const [droppedValues, setDroppedValues] = useState([]);

  useEffect (() =>{
    let arr = []
     question?.questionContent?.map((item)=>{
        return item?.map((val)=>{
          if(val.isMissed == "true"){
            arr.push(val);
          }
        }) 
    })
    setDroppedValues( arr?.map((item, i) => {
      return { 
      id: i, 
      value: "" ,
      row:item.row,
      col:item.col,
      item:item
    };
    }))

  },[])
 
 
  const validate = () => {
    console.log('Validate');

    const answerValues = []

    for(let i=0;i< question.questionContent.length;i++){

      for(let j=0;j<question.questionContent[i].length;j++){
        if(question.questionContent[i][j].isMissed == "true"){
          answerValues.push(question.questionContent[i][j])
        }
      }
    }

    if (droppedValues.length != answerValues.length) {
      console.log('Please choose the option');
      return;
    }

   

    console.log(answerValues);

    console.log("droppedValues",droppedValues);
    for (let i = 0; i < droppedValues.length; i++) {

      if(droppedValues[i].value == ""){
        alert('Please drop all the options');
        return;
      }
    
      let temp = answerValues.filter((e)=> 
      e.row==droppedValues[i].row && e.col==droppedValues[i].col ? 1:0)

      //console.log("temp",temp);
      
      if(temp[0].count == droppedValues[i].value){
        temp1 = true
        setIsCorrect(true)
      }else{
        temp1 = false
        setIsCorrect(false)
        break;
      }
    
    }

    let sln = question.solution.model?.map((item)=> `${item.val}`+'</br>')
    setSolution(sln.join(" "))
    // setSolution(question.solution.model[0].val);
    //student response to send back
    let finalResponse = commonDragDropTypeStudentResponse2D(student_response,droppedValues)
    setStudentResponse(finalResponse)
    // student_response.studentAnswer = droppedValues;
    // if (droppedValues.length <= 1) {
    //   student_response.studentAnswer = droppedValues[0];
    // } else {
    //   student_response.studentAnswer = droppedValues;
    // }
    // console.log('student_response', student_response);


    setIsValidated(true);
   
    if( screenType == MATH_ZONE_QUESTION){
      handleStudentAnswerCorrect(temp1)
    }
    
  };

  return (
    <GestureHandlerRootView>
      <View>
        <View style={styles.outterSection}>
          <View style={{width: '80%'}}>
            <View style={{marginTop: 10,marginBottom:20}}>
              {/* <HtmlViwer source={{html: question.questionName}} isQuestion={true} /> */}
              <QuestionPartBuilder data={ question.questionName}/>
            </View>

            <DraxProvider>
              <View>
                {
                question.questionContent.map((item,index) => {
                  return (
                    <View style={[styles.row]}>
                      {item.map((val,i) => {
                        if (val.isMissed == 'false') {
                          return ( 
                            <View style={[styles.row,{display:"flex",flexDirection:"column"}]}>
                            <View style={[styles.draggableBox,{borderWidth:1,backgroundColor:"blue",alignItems:"center",justifyContent:"center"}]}>
                            {/* <HtmlViwer
                              source={{html: val.count}}
                              //isColumnView={true}
                              isQuestion={true}
                              isWhite={true}
                            /> */}
                            <QuestionPartBuilder data={val.count}/>
                            </View>
                            <Pattern item={val}/>
                            </View>
                          
                          );
                        } else {
                          
                          let dropped_index ;
                          for(let i=0;i<droppedValues.length;i++){
                            if(droppedValues[i].row == val.row && droppedValues[i].col == val.col){
                              dropped_index = i;
                              break;
                            }
                          }

                          return (
                            <View style={[styles.row,{display:"flex" ,flexDirection:"column-reverse",alignItems:"center",margin:5}]}>

                             
                                <View style={[styles.draggableBox,{borderWidth:1,width:60,margin:5}]}>
                                
                                {
                                  isResponse == true ?
                                  <View style={[
                                    styles.centeredContent,
                                    styles.draggableBox,
                                    {margin: 0, backgroundColor: 'blue'},
                                  ]}>
                                    <Text style={{color: '#fff', fontWeight: 'bold'}}>
                                      {convertHTML(val.studentAnswer)}
                                    </Text>
                                  </View>
                                  :
                                  // <DraxView
                                  //           style={
                                  //           selectedDropItem
                                  //               ? [
                                  //                   styles.centeredContent,
                                  //                   styles.draggableBox,
                                  //                   {margin: 0, backgroundColor: 'blue'},
                                  //               ]
                                  //               : [
                                  //                   styles.centeredContent,
                                  //                   styles.draggableBox,
                                  //                   {margin: 0},
                                  //               ]
                                  //           }
                                  //           // style={[
                                  //           //   styles.centeredContent,
                                  //           //   styles.draggableBox,
                                  //           //   {margin: 0},
                                  //           // ]}
                                  //           draggingStyle={styles.dragging}
                                  //           dragReleasedStyle={styles.dragging}
                                  //           receivingStyle={styles.receiving}
                                  //           //hoverDraggingStyle={styles.hoverDragging}
                                  //           dragPayload={droppedValues}
                                  //           longPressDelay={0}
                                  //           onReceiveDragDrop={event => {
                                            
                                  //           let obj = {
                                  //               value:event.dragged.payload,
                                  //               row: val.row,
                                  //               col: val.col,
                                  //           };

                                  //           let updatedArr = [...droppedValues];
                                  //           let flag = false;

                                  //           updatedArr = updatedArr.map(ele => {
                                  //               if (
                                  //               ele.row == val.row &&
                                  //               ele.col == val.col
                                  //               ) {
                                  //               flag = true;
                                  //               return obj;
                                  //               } else {
                                  //               return ele;
                                  //               }
                                  //           });

                                  //           if (flag == false) {
                                  //               updatedArr.push(obj);
                                  //           }

                                  //           console.log(updatedArr);
                                  //           setDroppedValues([...updatedArr]);
                                  //           }}>
                                  //           <Text
                                  //           style={{color: '#fff', fontWeight: 'bold'}}>
                                  //           {convertHTML(selectedDropItemValue)}
                                  //           </Text>
                                  // </DraxView>
                                  <DraxView
                                  style={
                                    droppedValues[dropped_index]?.value == ""
                                      ? [
                                          styles.centeredContent,
                                          styles.draggableBox,
                                          { margin: 0 },
                                        ]
                                      : [
                                          styles.centeredContent,
                                          styles.draggableBox,
                                          { margin: 0, backgroundColor: "blue" },
                                        ]
                                  }
                                  draggingStyle={styles.dragging}
                                  dragReleasedStyle={styles.dragging}
                                  receivingStyle={styles.receiving}
                                  dragPayload={ isValidated == false ?{item:droppedValues[dropped_index],from:"dropper"}:undefined}
                                  // dragPayload={{item:droppedValues[dropped_index],from:"dropper"}}
                                  longPressDelay={0}
                                  onReceiveDragDrop = {(event)=>{
                                    console.log("onReceiveDragDrop droppable",event.dragged.payload);
                                    let drags = [...draggableValues];
                                    let drops = [... droppedValues];
    
                                    if(event.dragged.payload.from == "dropper"){
                                      //swapping droppable values is enough
                                        for(let i=0;i<drops.length;i++){
                                          if(drops[i].row == val.row && drops[i].col == val.col){
                                            let temp_val = drops[i].value;
                                            drops[i].value = event.dragged.payload.item.value;
                                            drops[event.dragged.payload.item.id].value = temp_val
                                            break;
                                          }
                                        }
                                     setDroppedValues([...drops])
                                    }else{
                                      //need to swap both droppable and draggable values
                                      for(let i=0;i<drops.length;i++){
                                        if(drops[i].row == val.row && drops[i].col == val.col){
                                          let temp_val = drops[i].value;
                                          drops[i].value = event.dragged.payload.item.value;
                                          drags[event.dragged.payload.item.id].value = temp_val
                                          break;
                                        }
                                      }
    
                                      setDraggableValues([...drags])
                                      setDroppedValues([...drops])
                                      
                                    }
    
                                  }}
                                >
                                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                                    {convertHTML(droppedValues[dropped_index]?.value)}
                                  </Text>
                                  </DraxView>
                                }
                                </View>
                             

                                <View>
                                    <Pattern item={val}/>
                                </View>
                              
                            </View>
                          );
                        }
                      })}
                    </View>
                  );
                })}

                
              </View>

              <View
                style={{
                  flexDirection: 'column',
                  marginLeft: 10,
                  marginTop: 20,
                }}>
                <View>
                  <Text style={{fontWeight: 'bold'}}>
                    Drag and drop the answer
                  </Text>
                </View>

                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  {draggableValues.map((item, i) => (
                    <View
                      key={i}
                      style={[
                        styles.draggableBox,
                        {borderWidth: 1, margin: 5},
                      ]}>
                        {
                          isResponse == true ?
                          <View style={[
                            styles.centeredContent,
                            styles.draggableBox,
                            {margin: 0, backgroundColor: 'blue'},
                          ]}>
                            <Text style={{color: '#fff', fontWeight: 'bold'}}>
                              {convertHTML(item)}
                            </Text>
                          </View>
                          :
                        //   <DraxView
                        // //style={item.val.length == 0 ? [styles.centeredContent, styles.draggableBox, { margin: 0 }] : [styles.centeredContent, styles.draggableBox, { margin: 0, backgroundColor: "blue" }]}
                        // style={[
                        //   styles.centeredContent,
                        //   styles.draggableBox,
                        //   {margin: 0, backgroundColor: 'blue'},
                        // ]}
                        // draggingStyle={styles.dragging}
                        // dragReleasedStyle={styles.dragging}
                        // //hoverDraggingStyle={styles.hoverDragging}
                        // dragPayload={item}
                        // longPressDelay={0}>
                        //     <Text style={{color: '#fff', fontWeight: 'bold'}}>
                        //       {convertHTML(item)}
                        //     </Text>
                        //   </DraxView>
                        <DraxView
                        style={
                          item.value.length == 0
                            ? [
                                styles.centeredContent,
                                styles.draggableBox,
                                { margin: 0 },
                              ]
                            : [
                                styles.centeredContent,
                                styles.draggableBox,
                                { margin: 0, backgroundColor: "blue" },
                              ]
                        }
                        draggingStyle={styles.dragging}
                        dragReleasedStyle={styles.dragging}
                        receivingStyle={styles.receiving}
                        //hoverDraggingStyle={styles.hoverDragging}
                        dragPayload = {isValidated == false ? {item:item,from:"dragger"} :undefined}
                        // dragPayload={{item:item,from:"dragger"}}
                        longPressDelay={0}
                        onReceiveDragDrop = {(event)=>{
                        console.log("place index",i);
                        console.log("onReceiveDragDrop draggable",event.dragged.payload);
                        console.log("item",event.dragged.payload.item.value,event.dragged.payload.from);

                        let drags = [...draggableValues];
                        let drops = [... droppedValues];

                        if(event.dragged.payload.from == "dragger"){
                          //swapping droppable values is enough
                          let temp_val =  drags[i].value;
                          drags[i].value = event.dragged.payload.item.value;
                          drags[event.dragged.payload.item.id].value = temp_val 
                          setDraggableValues([...drags])
                        }else{
                          //need to swap both droppable and draggable values

                          let temp_val = drags[i].value;
                          drags[i].value = event.dragged.payload.item.value;

                          console.log("event.dragged.payload",event.dragged.payload);

                          for(let i=0;i<drops.length;i++){
                            if(drops[i].row == event.dragged.payload.item.row && drops[i].col == event.dragged.payload.item.col){
                              drops[i].value = temp_val;
                              break;
                            }
                          }

                          setDraggableValues([...drags])
                          setDroppedValues([...drops])
                
                        }

                      }}
                      >
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>
                          {convertHTML(item.value)}
                        </Text>
                        </DraxView>
                        }
                      
                    </View>
                  ))}
                </View>
              </View>
            </DraxProvider>
          </View>

        { screenType == MATH_ZONE_QUESTION ?
          <View style={styles.submitButtonSection}>
            {isValidated ? (
              <Pressable
                style={styles.buttonStyle}
                onPress={() => {
                  // var formData = new FormData();
                  // formData.append('student_response', student_response);
                  // submitResponse(question_id, formData)
                  submitResponse(question_id, student_response, isCorrect)
                  setIsValidated(false);
                  setIsCorrect(false);
                  setDroppedValues([])
                  setDraggableValues([])
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

        { screenType == MATH_ZONE_QUESTION && isValidated &&
          <ModalTester
            deviceHeight={windowHeight}
            isCorrect={isCorrect}
            solution={solution}
          />
        }

        { ( screenType == MATH_ZONE_LIVE_CLASS_QUESTION || screenType == MATH_ZONE_FLAGGED_QUESTION ) && isValidated && <SolutionComponent isCorrect={isCorrect} solution={solution} isMathquill={true} screenType={screenType}/>}
      </View>
    </GestureHandlerRootView>
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

  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  palette: {
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
  },
  draggableBox: {
    minWidth: 80,
    height: 50,
    borderRadius: 30,
    margin: 0,
  },
  receiving: {
    borderColor: 'red',
    borderWidth: 5,
  },

  magenta: {
    backgroundColor: '#ffaaff',
  },
  dragging: {
    opacity: 0,
  },
  hoverDragging: {
    borderColor: 'magenta',
    borderWidth: 2,
  },
  row:{
    // height:40,
    // minWidth:60,
    // flex:1,
    // borderWidth:1,
    // borderColor:"orange",
    backgroundColor:"#ffffff",
    display:"flex",
    flexDirection:"row",
    //alignItems:"center",
  },
  column:{
    minWidth:40,
  }
});

const Pattern = ({item}) => {
   
    function findPattern(num) {
      let arr = [];
      if (num == 1 || num == 2) {
        arr[0] = num;
        return arr;
      }
      let val = num;
      let i = 1;
      let remaining = 0;
      while (val > 0) {
        val = val - i;
        if (val >= 0) {
          arr.push(i);
          i++;
        } else {
          remaining = i + val;
        }
      }
      addRemaining(arr, remaining);
      return arr;
    }

    function addRemaining(arr, rem) {
      if (rem == 0) {
        return;
      }
      if (rem === arr[arr.length - 1]) {
        arr.push(rem);
        return;
      }

      let index = arr.length - rem - 1;
      if (index == 0) {
        index = 1;
      }
      for (let i = index, j = 1; i < arr.length; i++, j++) {
        arr[i] = arr[i] + 1;
        rem = rem - 1;
        // arr[i] = arr[i]+j;
        // rem = rem - j;
        if (rem <= 0) {
          break;
        }
      }
      return;
    }

    let patternArr = findPattern(item.count);

    let patt = [];

    for (let i = 0; i < patternArr.length; i++) {
      let im = [];
      for (let j = 0; j < patternArr[i]; j++) {
        // im[j] = <HtmlViwer source={{html: item.img}} />;
        im[j] = <QuestionPartBuilder data={ item.img } imgSize={50}/>
      }
      patt.push(im);
    }

    return (
      <View>
        {patt.map(arr => {
          return (
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              {arr.map((val, i) => val)}
            </View>
          );
        })}
      </View>
    );
  };


export default RandomArrangementDragDropType;



//old code which has draggable options and can't be hallow space
// import React, {useEffect, useState} from 'react';
// import {
//   Text,
//   View,
//   ScrollView,
//   StyleSheet,
//   Pressable,
//   Dimensions,
// } from 'react-native';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import {DraxProvider, DraxView, DraxList} from 'react-native-drax';
// import HtmlViwer from '../QuestionAsserts/HtmlRender';
// import ModalTester from '../QuestionAsserts/outputResponseModal';
// import {commonDragDropTypeStudentResponse2D,convertHTML} from '../QuestionAsserts/commonFileForStudentResponses'
// import {MATH_ZONE_QUESTION, MATH_ZONE_LIVE_CLASS_QUESTION , MATH_ZONE_FLAGGED_QUESTION, MATH_ZONE_HOME_WORK_QUESTION} from '../../../components/helpers/Constants'
// import SolutionComponent from '../QuestionAsserts/outputResponseComponent';

// const windowHeight = Dimensions.get('window').height;
// const RandomArrangementDragDropType = ({data, submitResponse, screenType, isResponse}) => {
  
//   let temp1 = false;
//   const question = JSON.parse(data.question_data[0].question_text)
//   const [student_response,setStudentResponse] = useState(JSON.parse(data.question_data[0].question_text))
//   const question_id = data.question_data[0].question_id

//   //const student_response = question;
//   const validate = () => {
//     console.log('Validate');

//     const answerValues = []

//     for(let i=0;i< question.questionContent.length;i++){

//       for(let j=0;j<question.questionContent[i].length;j++){
//         if(question.questionContent[i][j].isMissed == "true"){
//           answerValues.push(question.questionContent[i][j])
//         }
//       }
//     }

//     if (droppedValues.length != answerValues.length) {
//       console.log('Please choose the option');
//       return;
//     }

   

//     console.log(answerValues);

//     console.log("droppedValues",droppedValues);
//     for (let i = 0; i < droppedValues.length; i++) {
    
//       let temp = answerValues.filter((e)=> 
//       e.row==droppedValues[i].row && e.col==droppedValues[i].col ? 1:0)

//       //console.log("temp",temp);
      
//       if(temp[0].count == droppedValues[i].value){
//         temp1 = true
//         setIsCorrect(true)
//       }else{
//         temp1 = false
//         setIsCorrect(false)
//         break;
//       }
    
//     }

//     let sln = question.solution.model?.map((item)=> `${item.val}`+'</br>')
//     setSolution(sln.join(" "))
//     // setSolution(question.solution.model[0].val);
//     //student response to send back
//     let finalResponse = commonDragDropTypeStudentResponse2D(student_response,droppedValues)
//     setStudentResponse(finalResponse)
//     // student_response.studentAnswer = droppedValues;
//     // if (droppedValues.length <= 1) {
//     //   student_response.studentAnswer = droppedValues[0];
//     // } else {
//     //   student_response.studentAnswer = droppedValues;
//     // }
//     // console.log('student_response', student_response);


//     setIsValidated(true);
//   };

//   const [isValidated, setIsValidated] = useState(false);
//   const [isCorrect, setIsCorrect] = useState(false);
//   const [selectedValue, setSelectedValue] = useState(null);
//   const [solution, setSolution] = useState('');
//   const [draggableValues, setDraggableValues] = useState(question.choices);
//   const [droppedValues, setDroppedValues] = useState([]);
 

//   return (
//     <GestureHandlerRootView>
//       <View>
//         <View style={styles.outterSection}>
//           <View style={{width: '80%'}}>
//             <View style={{marginTop: 10,marginBottom:20}}>
//               <HtmlViwer source={{html: question.questionName}} isQuestion={true} />
//             </View>

//             <DraxProvider>
//               <View>
//                 {
//                 question.questionContent.map((item,index) => {
//                   return (
//                     <View style={[styles.row,{ustifyContent:"center"}]}>
//                       {item.map((val,i) => {
//                         if (val.isMissed == 'false') {
//                           return ( 
//                             <View style={[styles.row,{display:"flex",flexDirection:"column"}]}>
//                             <View style={[styles.draggableBox,{borderWidth:1,backgroundColor:"blue",alignItems:"center",justifyContent:"center"}]}>
//                             <HtmlViwer
//                               source={{html: val.count}}
//                               //isColumnView={true}
//                               isQuestion={true}
//                               isWhite={true}
//                             />
//                             </View>
//                             <Pattern item={val}/>
//                             </View>
                          
//                           );
//                         } else {
                          
//                             let selectedDropItem = null;
//                             let selectedDropItemValue = null;
//                             for (let i = 0; i < droppedValues.length; i++) {
//                               if (
//                                 droppedValues[i].row == val.row &&
//                                 droppedValues[i].col == val.col
//                               ) {
//                                 selectedDropItem = droppedValues[i];
//                                 selectedDropItemValue = droppedValues[i].value;
//                               }
//                             }
//                           return (
//                             <View style={[styles.row,{display:"flex" ,flexDirection:"column",alignItems:"center",margin:5}]}>
                                
//                                 <View style={[styles.draggableBox,{borderWidth:1,width:60,margin:5}]}>
                                
//                                 {
//                                   isResponse == true ?
//                                   <View style={[
//                                     styles.centeredContent,
//                                     styles.draggableBox,
//                                     {margin: 0, backgroundColor: 'blue'},
//                                   ]}>
//                                     <Text style={{color: '#fff', fontWeight: 'bold'}}>
//                                       {convertHTML(val.studentAnswer)}
//                                     </Text>
//                                   </View>
//                                   :
//                                   <DraxView
//                                             style={
//                                             selectedDropItem
//                                                 ? [
//                                                     styles.centeredContent,
//                                                     styles.draggableBox,
//                                                     {margin: 0, backgroundColor: 'blue'},
//                                                 ]
//                                                 : [
//                                                     styles.centeredContent,
//                                                     styles.draggableBox,
//                                                     {margin: 0},
//                                                 ]
//                                             }
//                                             // style={[
//                                             //   styles.centeredContent,
//                                             //   styles.draggableBox,
//                                             //   {margin: 0},
//                                             // ]}
//                                             draggingStyle={styles.dragging}
//                                             dragReleasedStyle={styles.dragging}
//                                             receivingStyle={styles.receiving}
//                                             //hoverDraggingStyle={styles.hoverDragging}
//                                             dragPayload={droppedValues}
//                                             longPressDelay={0}
//                                             onReceiveDragDrop={event => {
                                            
//                                             let obj = {
//                                                 value:event.dragged.payload,
//                                                 row: val.row,
//                                                 col: val.col,
//                                             };

//                                             let updatedArr = [...droppedValues];
//                                             let flag = false;

//                                             updatedArr = updatedArr.map(ele => {
//                                                 if (
//                                                 ele.row == val.row &&
//                                                 ele.col == val.col
//                                                 ) {
//                                                 flag = true;
//                                                 return obj;
//                                                 } else {
//                                                 return ele;
//                                                 }
//                                             });

//                                             if (flag == false) {
//                                                 updatedArr.push(obj);
//                                             }

//                                             console.log(updatedArr);
//                                             setDroppedValues([...updatedArr]);
//                                             }}>
//                                             <Text
//                                             style={{color: '#fff', fontWeight: 'bold'}}>
//                                             {convertHTML(selectedDropItemValue)}
//                                             </Text>
//                                   </DraxView>
//                                 }
//                                 </View>
                                
//                                 <View>
//                                     <Pattern item={val}/>
//                                 </View>
//                             </View>
//                           );
//                         }
//                       })}
//                     </View>
//                   );
//                 })}

                
//               </View>

//               <View
//                 style={{
//                   flexDirection: 'column',
//                   marginLeft: 10,
//                   marginTop: 20,
//                 }}>
//                 <View>
//                   <Text style={{fontWeight: 'bold'}}>
//                     Drag and drop the answer
//                   </Text>
//                 </View>

//                 <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
//                   {draggableValues.map((item, i) => (
//                     <View
//                       key={i}
//                       style={[
//                         styles.draggableBox,
//                         {borderWidth: 1, margin: 5},
//                       ]}>
//                         {
//                           isResponse == true ?
//                           <View style={[
//                             styles.centeredContent,
//                             styles.draggableBox,
//                             {margin: 0, backgroundColor: 'blue'},
//                           ]}>
//                             <Text style={{color: '#fff', fontWeight: 'bold'}}>
//                               {convertHTML(item)}
//                             </Text>
//                           </View>
//                           :
//                           <DraxView
//                         //style={item.val.length == 0 ? [styles.centeredContent, styles.draggableBox, { margin: 0 }] : [styles.centeredContent, styles.draggableBox, { margin: 0, backgroundColor: "blue" }]}
//                         style={[
//                           styles.centeredContent,
//                           styles.draggableBox,
//                           {margin: 0, backgroundColor: 'blue'},
//                         ]}
//                         draggingStyle={styles.dragging}
//                         dragReleasedStyle={styles.dragging}
//                         //hoverDraggingStyle={styles.hoverDragging}
//                         dragPayload={item}
//                         longPressDelay={0}>
//                             <Text style={{color: '#fff', fontWeight: 'bold'}}>
//                               {convertHTML(item)}
//                             </Text>
//                           </DraxView>
//                         }
                      
//                     </View>
//                   ))}
//                 </View>
//               </View>
//             </DraxProvider>
//           </View>

//         { screenType == MATH_ZONE_QUESTION ?
//           <View style={styles.submitButtonSection}>
//             {isValidated ? (
//               <Pressable
//                 style={styles.buttonStyle}
//                 onPress={() => {
//                   // var formData = new FormData();
//                   // formData.append('student_response', student_response);
//                   // submitResponse(question_id, formData)
//                   submitResponse(question_id, student_response, isCorrect)
//                   setIsValidated(false);
//                   setIsCorrect(false);
//                   setDroppedValues([])
//                   setDraggableValues([])
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
//           </View>:<></>
//         }

//         { screenType == MATH_ZONE_LIVE_CLASS_QUESTION ?
//           <View style={styles.submitButtonSection}>
//           {isValidated ? (
//             <View
//               style={{
//                 height: 30,
//                 width: 100,
//                 borderWidth: 1,
//                 borderColor: "white",
//                 backgroundColor: "white",
//               }}
//             >
//               <Text style={{ fontWeight: "bold", color: "black" }}>
//                 please wait..
//               </Text>
//             </View>
//           ) : (
//             <Pressable
//               style={styles.buttonStyle}
//               onPress={() => {
//                 validate();
//                 setIsValidated(true)
//                 submitResponse(question_id,student_response,temp1)
//               }}
//             >
//               <Text style={{ fontWeight: "bold", color: "white" }}>Solve</Text>
//             </Pressable>
//           )}
//           </View>:<></>
//         }

// { screenType == MATH_ZONE_FLAGGED_QUESTION ?
//           <View style={styles.submitButtonSection}> 
//             <Pressable
//               style={styles.buttonStyle}
//               onPress={() => {
//                 let sln = question.solution.model?.map((item)=> `${item.val}`+'</br>')
//                 setSolution(sln.join(" "))
//                 // setSolution(question.solution.model[0].val);
//                 setIsValidated(true)
//                 setIsCorrect(true)
//               }}
//             >
//               <Text style={{ fontWeight: "bold", color: "white" }}>Show Soln</Text>
//             </Pressable>
//           </View>:<></>
//         }

    
//         { screenType == MATH_ZONE_HOME_WORK_QUESTION ?
//           <View style={styles.submitButtonSection}> 
//             <Pressable
//               style={styles.buttonStyle}
//               onPress={() => {
//                 let sln = question.solution.model?.map((item)=> `${item.val}`+'</br>')
//                 setSolution(sln.join(" "))
//                 // setSolution(question.solution.model[0].val);
//                 setIsValidated(true)
//                 setIsCorrect(true)
//               }}
//             >
//               <Text style={{ fontWeight: "bold", color: "white" }}>Solve</Text>
//             </Pressable>
//           </View>:<></>
//         }


//         </View>

//         { screenType == MATH_ZONE_QUESTION && isValidated &&
//           <ModalTester
//             deviceHeight={windowHeight}
//             isCorrect={isCorrect}
//             solution={solution}
//           />
//         }

//         { ( screenType == MATH_ZONE_LIVE_CLASS_QUESTION || screenType == MATH_ZONE_FLAGGED_QUESTION ) && isValidated && <SolutionComponent isCorrect={isCorrect} solution={solution} isMathquill={true} screenType={screenType}/>}
//       </View>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   buttonStyle: {
//     height: 30,
//     width: 75,
//     backgroundColor: "#3E46FF",
//     borderRadius: 30,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop:10
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
//     // minHeight: windowHeight / 1.2,
//   },

//   centeredContent: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   palette: {
//     flexDirection: 'row',
//     // justifyContent: 'space-evenly',
//   },
//   draggableBox: {
//     minWidth: 80,
//     height: 50,
//     borderRadius: 30,
//     margin: 0,
//   },
//   receiving: {
//     borderColor: 'red',
//     borderWidth: 5,
//   },

//   magenta: {
//     backgroundColor: '#ffaaff',
//   },
//   dragging: {
//     opacity: 0,
//   },
//   hoverDragging: {
//     borderColor: 'magenta',
//     borderWidth: 2,
//   },
//   row:{
//     // height:40,
//     // minWidth:60,
//     // flex:1,
//     // borderWidth:1,
//     // borderColor:"orange",
//     backgroundColor:"#ffffff",
//     display:"flex",
//     flexDirection:"row",
//     //alignItems:"center",
//   },
//   column:{
//     minWidth:40,
//   }
// });

// const Pattern = ({item}) => {
   
//     function findPattern(num) {
//       let arr = [];
//       if (num == 1 || num == 2) {
//         arr[0] = num;
//         return arr;
//       }
//       let val = num;
//       let i = 1;
//       let remaining = 0;
//       while (val > 0) {
//         val = val - i;
//         if (val >= 0) {
//           arr.push(i);
//           i++;
//         } else {
//           remaining = i + val;
//         }
//       }
//       addRemaining(arr, remaining);
//       return arr;
//     }

//     function addRemaining(arr, rem) {
//       if (rem == 0) {
//         return;
//       }
//       if (rem === arr[arr.length - 1]) {
//         arr.push(rem);
//         return;
//       }

//       let index = arr.length - rem - 1;
//       if (index == 0) {
//         index = 1;
//       }
//       for (let i = index, j = 1; i < arr.length; i++, j++) {
//         arr[i] = arr[i] + 1;
//         rem = rem - 1;
//         // arr[i] = arr[i]+j;
//         // rem = rem - j;
//         if (rem <= 0) {
//           break;
//         }
//       }
//       return;
//     }

//     let patternArr = findPattern(item.count);

//     let patt = [];

//     for (let i = 0; i < patternArr.length; i++) {
//       let im = [];
//       for (let j = 0; j < patternArr[i]; j++) {
//         im[j] = <HtmlViwer source={{html: item.img}} />;
//       }
//       patt.push(im);
//     }

//     return (
//       <View>
//         {patt.map(arr => {
//           return (
//             <View
//               style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 flexDirection: 'row',
//               }}>
//               {arr.map((val, i) => val)}
//             </View>
//           );
//         })}
//       </View>
//     );
//   };


// export default RandomArrangementDragDropType;
