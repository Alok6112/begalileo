import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";

import HtmlViwer from "../QuestionAsserts/HtmlRender";
import ModalTester from "../QuestionAsserts/outputResponseModal";
import {MATH_ZONE_QUESTION, MATH_ZONE_LIVE_CLASS_QUESTION , MATH_ZONE_FLAGGED_QUESTION, MATH_ZONE_HOME_WORK_QUESTION} from '../../../components/helpers/Constants'
import QuestionPartBuilder from "../QuestionAsserts/questionPartBuilder";

const windowHeight = Dimensions.get("window").height;

const MemoryCardGame = ({ data, submitResponse, screenType, isResponse, handleStudentAnswerCorrect }) => {
 
  let temp1 = false;
  const question = JSON.parse(data.question_data[0].question_text);
  const [student_response,setStudentResponse] = useState(JSON.parse(data.question_data[0].question_text))
  const question_id = data.question_data[0].question_id;
  const [cardsData,setCardsData] = useState([])
  const [rowClicked, setRowClicked] = useState([])
  const [colClicked, setColClicked] = useState([])
  const [clickedType, setClickedType] = useState([])
  const [count,setCount] = useState(0)
  const [pairedCount,setPairedCount] = useState(0)
  const [dep,setDep] = useState(false)


  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  
  useEffect(()=>{
    let arr = [...question.questionContent]
    for(let i=0;i<question.questionContent.length;i++){
        arr.push(question.questionContent[i])
    }
        
    shuffle(arr);
    
    let arr2D = []
    let temp = []
    for(let i=0;i<arr.length;i++){
        temp.push(arr[i])
        if( (i+1)%4 == 0){
            arr2D.push(temp)
            temp = [];
        }
       
    }

    setCardsData([...arr2D])
  },[])

  const FrontCard = ({src}) =>{
    console.log("IN FrontCard",src);
    // return <HtmlViwer source={{html: src}}/>
    return <QuestionPartBuilder data={src} imgSize={50}/>
    
}

const BackCard = () =>{
    return<View style={{height:60,width:60,borderWidth:1,alignItems:"center", backgroundColor:"#FFFF8F", justifyContent:"center" }}></View>
}

useEffect(()=>{

    console.log("Count",count);
    console.log("PairedCount",pairedCount);

    if(clickedType.length == 2){
        setCount((prev)=>prev+1)
    if(clickedType[0] == clickedType[1]){
      
      for(let i=0;i<cardsData.length;i++){
        for(let j=0;j<cardsData[i].length;j++){
            if(cardsData[i][j].type == clickedType[0]){
                cardsData[i][j].type = ""
            }
        }
      }

      setPairedCount((prev)=>prev+1)
      setCardsData([...cardsData ])

    }

    }

    const id = setTimeout(()=>{

        if(rowClicked.length == 2){
            setRowClicked([])
            setColClicked([])
            setClickedType([])
        }

    },1000)

    return()=>{
        clearTimeout(id)
    }
},[dep])


useEffect(()=>{
if(pairedCount == 8){
    alert("Need to submit")
    student_response.studentAnswer = count
    submitResponse(question_id, student_response, true)
}
},[pairedCount])
  return (
   <View>
    {/* <HtmlViwer source={{html: question.questionName}} isQuestion={true} /> */}
    <QuestionPartBuilder data={question.questionName}/>
    <View style={{alignItems:"center"}}>
        {
            cardsData.map((item,index)=>{
                return<View style={{display:'flex',flexDirection:"row"}}>
                {
                    item.map((val,i)=>{
                        return<View style={{height:60,width:60,borderWidth:1,margin:5}}>
                            <Pressable  disabled={rowClicked.length == 2?true:false} onPress={()=>{
                                console.log("Pressed",index,i);
                               
                                setRowClicked([...rowClicked,index])
                                setColClicked([...colClicked,i])
                                setClickedType([...clickedType,val.type])
                                setDep(!dep)
                                
                            }} style={{height:60,width:60,borderWidth:1,alignItems:"center", justifyContent:"center" }}>
                                {/* {
                                    val.type == "" ? <></>: rowClicked.includes(index) && colClicked.includes(i) && clickedType.includes(val.type) ?<FrontCard src={val.image}/>: <BackCard/>
                                } */}

                                { val.type == "" ? <></>: rowClicked.length >= 1 && (rowClicked[0]==index && colClicked[0] == i && clickedType.includes(val.type) ) || (rowClicked[1]==index && colClicked[1] == i && clickedType.includes(val.type) )?<FrontCard src={val.image}/>: <BackCard/> }
                            </Pressable>
                        </View>
                    })
                }
                </View>
            })
        }
        {
            pairedCount == 8 ? <View><Text style={{fontSize:20,fontWeight:"bold"}}>Yahooo! You took {count} moves to complete</Text></View>:<></>
        }
    </View>
   </View>
  );
};


export default MemoryCardGame;
