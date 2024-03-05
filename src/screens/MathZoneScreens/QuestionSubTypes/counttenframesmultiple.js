import React, { useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet, Dimensions, ScrollView } from "react-native";

import HtmlViwer from "../QuestionAsserts/HtmlRender";
import ModalTester from "../QuestionAsserts/outputResponseModal";
import ChoicesSection from '../QuestionAsserts/choicesComponent';
import {MATH_ZONE_QUESTION, MATH_ZONE_LIVE_CLASS_QUESTION , MATH_ZONE_FLAGGED_QUESTION, MATH_ZONE_HOME_WORK_QUESTION} from '../../../components/helpers/Constants'
import SolutionComponent from "../QuestionAsserts/outputResponseComponent";
import QuestionPartBuilder from "../QuestionAsserts/questionPartBuilder";

const CountTenFramesMultiple = ({data, submitResponse, screenType, isResponse,handleStudentAnswerCorrect}) => {
  const windowHeight = Dimensions.get("window").height;

  let temp1 = false;
  const question = JSON.parse(data.question_data[0].question_text);
  const [student_response,setStudentResponse] = useState(JSON.parse(data.question_data[0].question_text))
  const question_id = data.question_data[0].question_id;

  // let imgs = [];
  // for (let i = 0; i < 10; i++) {
  //   if (i < question.answerCount) {
  //     imgs[i] = 1;
  //   } else {
  //     imgs[i] = 0;
  //   }
  // }

  const source = {
    html: `
<div>
${question.questionName}
</div>`,
  };

  const questonContext = {
    html: `
    <div >
    ${question.questionContentText}
    </div>`,
  }

  const picSource = {
    html: `
<div style='text-align:center;'>
${question.questionContent[0].image}
</div>`,
  };


  const getPicSource = (src,index) =>{
    const picSource = {
        html: `
    <div style='text-align:center;'>
    ${src}
    </div>`,
      };
      return picSource
  }

  const [isValidated, setIsValidated] = useState(false);
  const [clickedOption, setClickedOption] = useState(-1);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [data2DArr, setData2DArr] = useState([])
  const [arrOfImgsPicSource,setArrOfImgsPicSource] = useState(new Array(10).fill(""))
 const [stateChange, setStateChange] = useState(-1)
 const [solution, setSolution] = useState('');

  const validate = () => {
    if (question.answerCount == selectedValue) {
      console.log("Correct");
      temp1 = true
      setIsCorrect(true);
    } else {
      temp1 = false
      setIsCorrect(false);
      console.log("No,it is not correct");
    }
    let sln = question.solution.model?.map((item)=> `${item.val}`+'</br>')
    setSolution(sln.join(" "))

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

  useEffect(()=>{
    let data = question.questionContent
    let arr = []
    let rows = question.questionContent[question.questionContent.length-1].row
    let cols = question.questionContent[question.questionContent.length-1].col
   
    for(let i=0;i<rows;i++){
        let temp=[]
        for(let j=i*cols;j< cols +(i*cols);j++){
            temp.push(data[j])
        }  
        arr.push(temp)  
    }
   
    setData2DArr([...arr])

  },[])


  // useEffect(()=>{
  //   let src = {
  //     html: `
  //       <div style='text-align:center;'>
  //       ${question.questionContent[0].image}
  //       </div>`,
  //   };
  //   arrOfImgsPicSource[stateChange] = src
  //   setArrOfImgsPicSource([...arrOfImgsPicSource])
  // },[stateChange])

  useEffect(()=>{
    let id;
    for(let i=0;i<question.questionContent.length;i++){
      let indexVal = i;
     id = setTimeout(()=>{
        setStateChange(indexVal)
      },1000*i)
    }

    return()=>{
      clearTimeout(id)
    }
  },[])
 
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
        <View style={{ margin: 10 ,width:"80%"}}>
          {/* <HtmlViwer source={source} isQuestion={true}/> */}
          {/* <HtmlViwer source={questonContext} isQuestion={true}/> */}
          <QuestionPartBuilder data={question.questionName}/>
          <QuestionPartBuilder data={question.questionContentText}/>
        </View>

        <View>
          {
                question.upload_file_name != null ?
                <View  style={{minWidth: 300, height: 200,margin:10}}>
                <Image source={{uri: question.upload_file_name}}
                    style={{aspectRatio: 2,alignSelf: 'center',height:"100%",width:"100%"}} />
                </View>:<></>
            }
        </View>

        {screenType == MATH_ZONE_QUESTION ?
          <View style={{ margin: 10 }}>
            {isValidated ? (
              <Pressable
                style={styles.buttonStyle}
                onPress={() => {
                  submitResponse(question_id, student_response, isCorrect)
                  setIsValidated(false);
                  setClickedOption(-1);
                }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>Submit</Text>
              </Pressable>
            ) : (
              <Pressable
                style={styles.buttonStyle}
                onPress={() => {
                  console.log("Validate");
                  validate();
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

      <View style={{ marginLeft: 10}}>
              {
                data2DArr.map((item,index)=>{
                
                return <View style={{ flexDirection: "row" }}>
                    {
                        item.map((val)=>{
                          {console.log("val",val);}
                            let j = ((val.row-1)* item.length +(val.col))-1
                            return(
                                <View style={styles.imgBox}>
                                    {/* <HtmlViwer source={imgs[index] == 1 ? getPicSource(val.image,index) : ""} /> */}
                                    {/* <HtmlViwer source={imgs[j] == 1 ? arrOfImgsPicSource[j] : ""} /> */}
                                    {
                                    stateChange >= j && <QuestionPartBuilder data={val.image} imgSize={50}/>
                                    }
                                    
                                </View>
                            )
                        })
                    }
                </View>
                })
              }
      </View>

      {question.after_question_text != null ?<View style={{ marginTop: 10 }}>
                        {/* <HtmlViwer
                            source={{ html: question.after_question_text }}
                            isQuestion={true}
                        /> */}
                        <QuestionPartBuilder data={ question.after_question_text }/>
                    </View>:<></>}
      <ChoicesSection choices={question.choices} handleChoices={handleChoices} isResponse={isResponse} studentAnswer={student_response.studentAnswer} isValidated={isValidated}/>
      
      { screenType == MATH_ZONE_QUESTION && isValidated &&
        <ModalTester
          deviceHeight={windowHeight}
          isCorrect={isCorrect}
          solution={solution}
        />
      }

      { ( screenType == MATH_ZONE_LIVE_CLASS_QUESTION || screenType == MATH_ZONE_FLAGGED_QUESTION ) && isValidated && <SolutionComponent isCorrect={isCorrect} solution={question.solution.model[0].val} isMathquill={true} screenType={screenType}/>}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredContent: {
    justifyContent: "center",
    alignItems: "center",
  },

  buttonStyle: {
    height: 30,
    width: 75,
    backgroundColor: "#3E46FF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop:10,
  },

  imgBox:{
    minWidth: 60,
    minHeight: 50,
    borderWidth: 1 ,
    width:"auto",
    height:"auto",
    alignItems:"center",
    padding:2
  }
});

export default CountTenFramesMultiple;
