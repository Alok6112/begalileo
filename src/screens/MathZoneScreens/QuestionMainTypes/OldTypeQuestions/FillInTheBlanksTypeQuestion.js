import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet, Pressable, Dimensions, Image, Button, ScrollView,TextInput} from 'react-native';
import HtmlViwer from '../../QuestionAsserts/HtmlRender';
import ModalTesterGeneric from '../../QuestionAsserts/scrollableModalForOutpuResponse';
import {convertHTML} from '../../QuestionAsserts/commonFileForStudentResponses'
import MathQuillHtmlRender from '../../QuestionAsserts/MathQuillHtmlRender';
import {MATH_ZONE_QUESTION, MATH_ZONE_LIVE_CLASS_QUESTION , MATH_ZONE_FLAGGED_QUESTION, MATH_ZONE_HOME_WORK_QUESTION} from '../../../../components/helpers/Constants'
import SolutionComponentOldTypes from '../../QuestionAsserts/outputResponseComponentForOldTypes';
import QuestionPartBuilder from '../../QuestionAsserts/questionPartBuilder';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const MyInput = ({ handleInputs, val }) => {
  return (
    <View style={{ height: 30, width: 50, borderWidth: 1 }}>
      <TextInput
        style={{ height: 30, minWidth: 30 }}
        //placeholder="Type here!"
        onChangeText={(next) => {
          handleInputs(next, val);
        }}
        //defaultValue={text}
      />
    </View>
  );
};

const FillInTheBlanksQuestions = ({data, submitResponse, screenType, isResponse, handleStudentAnswerCorrect}) => {
 console.log("data",JSON.stringify(data) );
let temp1 = false;
 const question = data.question_data[0]
 const [student_response,setStudentResponse] = useState(data.question_data[0])
 const question_id = data.question_data[0].question_id

  const [isValidated, setIsValidated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false)
  const [selectedValue , setSelectedValue] = useState(null)
  const [correctChoice, setCorrectChoice] = useState()
  const [typedValue, setTypedValue] = useState("")

  const handleChoices = (val) =>{
    console.log(val);
    setSelectedValue(val)
  }

  useEffect(()=>{
    let arr = question.choice_data;
    setCorrectChoice(arr[0])
    // for(let i=0;i<arr.length;i++){
    //     if(arr[i].correct == false){
    //         console.log("correct choice",arr[i]);
    //         setCorrectChoice(arr[i])
    //     }
    // }

  },[])

  const validate = () =>{
    if(typedValue == ""){
        alert("please fill the blanks");
        return;
    }

    if(typedValue.trim().toLowerCase() == convertHTML(question.choice_data[0].choices.toLowerCase())){
      temp1 = true  
      setIsCorrect(true)
    }else{
      temp1 = false
        setIsCorrect(false)
    }

    let outputObject = {
      key:"choice",
      value:typedValue
    }
    setStudentResponse({...outputObject})
    setIsValidated(true)
    if(screenType == MATH_ZONE_LIVE_CLASS_QUESTION){
      submitResponse(question_id,outputObject,temp1, true)
    }

    if( screenType == MATH_ZONE_QUESTION){
      handleStudentAnswerCorrect(temp1)
    }
  }

  return (
    <ScrollView>
      
      <View style={{flexDirection: 'row', justifyContent: 'space-between',minHeight:150}}>
        
        <View style={{display: 'flex', flexDirection: 'row',width: '80%', flexWrap:"wrap",marginTop:10}}>
            {/* <View><HtmlViwer source={{html: question.question_text}} isQuestion={true} /></View> */}
            <View style={{width:'100%'}}>

            {
            question.html_type ?
              <MathQuillHtmlRender content={question.question_text} isQuestion={true}/>
            :
            <View style={{marginLeft:10}}>
              <QuestionPartBuilder data={question.question_text}/>
              </View>
            }

            </View>
            <View style={{width:'100%'}}>
              {
                  question.upload_file_name != "" ?
                  <View  style={{minWidth: 300, height: 200}}>
                  <Image source={{uri: question.upload_file_name}}
                      style={{aspectRatio:1,minWidth: 400, height: 200,margin:1}} />
                  </View>:<></>
              }

              <View style={{display:"flex",flexDirection:"row",width:'100%',flexWrap:'wrap',alignItems:"center"}}>
              {question.fib_before_text != null? <View style={{marginLeft:10}}>
                  {question.html_type ?
                    <HtmlViwer source={{html: question.fib_before_text}} isQuestion={true} />
                    :<QuestionPartBuilder  data={question.fib_before_text}/>
                  }
              </View>:<></>}
              
              {
                isResponse == true ?
                <View style={{borderColor:"black",marginRight:5,borderBottomWidth:1}}>
                <TextInput
                  style={{height: 35,minWidth:100,textAlign:"center",fontSize: 20, fontWeight: "bold"}}
                  editable={false}
                  defaultValue={question.choice_id}
                  />
                </View>
                :
                <View style={{borderWidth:1,borderColor:"black",marginRight:5,marginLeft:10,paddingLeft:8,paddingRight:8,borderRadius: 6}}>
                <TextInput
                  style={{height: 35,minWidth:90,textAlign:"center",fontSize: 20, fontWeight: "bold"}}
                  editable={ isValidated ? false : true}
                  onChangeText={(next)=>{
                      console.log(next);
                      setTypedValue(next)
                  }}
                  />
                </View>
              }
              {/* // <View style={{borderWidth:1,borderColor:"black",marginRight:5}}>
              //   <TextInput
              //     style={{height: 35,minWidth:100,textAlign:"center",fontSize: 20, fontWeight: "bold"}}
              //     onChangeText={(next)=>{
              //         console.log(next);
              //         setTypedValue(next)
              //     }}
              //     />
              // </View> */}

              {question.fib_text != null?<View>
                {question.html_type ?
                <HtmlViwer source={{html: question.fib_text}} isQuestion={true} />
                :<QuestionPartBuilder data={question.fib_text}/>
                }
              </View>:<></>}

              {question.after_question_text != null?<View>
                {question.html_type ?
                  <HtmlViwer source={{html: question.after_question_text}} isQuestion={true} />
                  :<QuestionPartBuilder data={question.after_question_text}/>
                }
              </View>:<></>}
              {/* <ChoicesSection choices={question.choice_data} handleChoices={handleChoices}/> */}
              </View>

            </View>
        </View> 

      { screenType == MATH_ZONE_QUESTION ?
        <View style={{width: '20%', margin: 10}}>
          {isValidated ? (
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {
                 submitResponse(question_id, student_response, isCorrect,true)
                 setIsValidated(false)
                 setIsCorrect(false)
                console.log('Submit');
              }}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>Submit</Text>
            </Pressable>
          ) : (
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {
                console.log('Validate');
                 validate()
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
      { screenType == MATH_ZONE_QUESTION && isValidated && <ModalTesterGeneric  isCorrect={isCorrect} solution={correctChoice} isOldType={true}/>}
      { ( screenType == MATH_ZONE_LIVE_CLASS_QUESTION || screenType == MATH_ZONE_FLAGGED_QUESTION ) && isValidated && <SolutionComponentOldTypes isCorrect={isCorrect} solution={correctChoice} isOldType={true} screenType={screenType}/>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  box: {
    borderWidth: 2,
    width: 200,
    minHeight: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonStyle: {
    height: 30,
    width: 75,
    backgroundColor: "#3E46FF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop:10
  },
  option: {
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    margin: 5,
    padding: 5,
    minWidth: windowWidth / 3,
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    margin: 5,
    padding: 5,
    height: 30,
    width: 30,
    borderRadius: 15,
  },
});


const ChoicesSection = ({choices, handleChoices}) =>{
    let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

    const [optionClicked, setOptionClicked] = useState('');
  
    return (
      <View >
        <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap',marginTop:10}}>
          {choices?.map((e, i) => {
            return (
              <Pressable
                style={styles.option}
                onPress={() => {
                  setOptionClicked(letters[i]);
                  handleChoices(e);
                }}>
                <View
                  style={
                    optionClicked != letters[i]
                      ? styles.circle
                      : [styles.circle, {backgroundColor:"#2fb8bb"}]
                  }>
                  <Text
                    style={
                      optionClicked != letters[i]
                        ? {fontWeight: 'bold'}
                        : {fontWeight: 'bold', color: 'white'}
                    }>
                    {letters[i]}
                  </Text>
                </View>
                <View style={{margin: 5, padding: 5}}>
                  <Text>{e.choices}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    );
}

export default FillInTheBlanksQuestions;
