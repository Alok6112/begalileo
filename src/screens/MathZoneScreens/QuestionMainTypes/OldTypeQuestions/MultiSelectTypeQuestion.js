import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet, Pressable, Dimensions, Image, Button, ScrollView} from 'react-native';
import HtmlViwer from '../../QuestionAsserts/HtmlRender';
import ModalTesterGeneric from '../../QuestionAsserts/scrollableModalForOutpuResponse';
import MathQuillHtmlRender from '../../QuestionAsserts/MathQuillHtmlRender';
import {MATH_ZONE_QUESTION, MATH_ZONE_LIVE_CLASS_QUESTION , MATH_ZONE_FLAGGED_QUESTION, MATH_ZONE_HOME_WORK_QUESTION} from '../../../../components/helpers/Constants'
import SolutionComponentOldTypes from '../../QuestionAsserts/outputResponseComponentForOldTypes';
import QuestionPartBuilder from '../../QuestionAsserts/questionPartBuilder';

const windowWidth = Dimensions.get('window').width;


const MultiSelectQuestions = ({data, submitResponse, screenType, isResponse,handleStudentAnswerCorrect}) => {

  // console.log("MultipleChoiceQuestions 789",data.question_data[0].question_text);
 
  let temp1 = false;
  const question = data.question_data[0]
  const [student_response,setStudentResponse] = useState(data.question_data[0])
  const question_id = data.question_data[0].question_id

  const [isValidated, setIsValidated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false)
  const [selectedValues , setSelectedValues] = useState([])
  const [correctChoices, setCorrectChoice] = useState([])

  const handleChoices = (selectedOptions,mapppedValues) =>{

    let arr = []
    for(let i=0;i<selectedOptions.length;i++){
      arr[i] = mapppedValues[selectedOptions[i]]
    }

    setSelectedValues([...arr])
  }

  useEffect(()=>{
    let arr = question.choice_data;
    let crctArr = []
    for(let i=0;i<arr.length;i++){
        if(arr[i].correct){
           // console.log(arr[i]);
           crctArr.push(arr[i])
        }
    }
    setCorrectChoice([...crctArr])
  },[])

  const validate = () =>{
    if(selectedValues.length == null){
        console.log("please select appropriate choices");
        return;
    }

    let arrIds = []
    for(let i=0;i<selectedValues.length;i++){
      arrIds.push(selectedValues[i].choice_id)
    }

    if(selectedValues.length != correctChoices.length){
      temp1 = false
      setIsCorrect(false);
    }else{

      for(let i=0;i<selectedValues.length;i++){
        if(selectedValues[i].correct){
          temp1 = true
          setIsCorrect(true)
        }else{
          temp1 = false
          setIsCorrect(false);
          break;
        }
      }
      
    }
    
    console.log("checker",arrIds);
    outputObject = {
      key:"choice",
      value:[...arrIds]
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
      
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        
        <View style={{display: 'flex', flexDirection: 'row',width: '80%', flexWrap:"wrap",marginTop:10}}>
           
            <View style={{width:'100%'}}>

            {
            question.html_type ?
              <MathQuillHtmlRender content={question.question_text} isQuestion={true}/>:
              <View style={{marginLeft:10}}>
                <QuestionPartBuilder data={question.question_text}/>
              </View>
            }
            </View>
            
            {
                question.upload_file_name != "" ?
                <View  style={{minWidth: 200, height: 200,margin:10}}>
                <Image source={{uri: question.upload_file_name}}
                    style={{aspectRatio: 2,height:"100%",width:"100%",resizeMode: 'contain',alignSelf: 'center'}} />
                </View>:<></>
            }
            <ChoicesSection choices={question.choice_data} handleChoices={handleChoices} isResponse={isResponse} studentAnswer={question.choice_id}/>
        </View> 

      { screenType == MATH_ZONE_QUESTION ? 
        <View style={{width: '20%', margin: 10}}>
          {isValidated ? (
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {
                submitResponse(question_id, student_response, isCorrect,true)
                setIsValidated(false)
                //setClickedOption(-1)
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
      { screenType == MATH_ZONE_QUESTION && isValidated && <ModalTesterGeneric  isCorrect={isCorrect} solution={correctChoices} isOldType={true} type={"multiselect"}/> }
      { ( screenType == MATH_ZONE_LIVE_CLASS_QUESTION || screenType == MATH_ZONE_FLAGGED_QUESTION ) && isValidated && <SolutionComponentOldTypes isCorrect={isCorrect} solution={correctChoices} isOldType={true} screenType={screenType}/>}
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
    // minWidth: windowWidth / 3,
    width:"100%",
    borderWidth:2,
    borderColor:"#D0D4E1",
    borderRadius: 12,
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


const ChoicesSection = ({choices, handleChoices, isResponse, studentAnswer}) =>{
    let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

    const [optionClicked, setOptionClicked] = useState('');
    const [multiSelectedOptions, setMultiSelectedOptions] = useState([])
    const [mappedValuesWithOptions, setMappedValuesWithOptions] = useState()

    const handleClickedOptions = (letter, value) =>{
      //console.log(letter, value);
      //setOptionClicked(letter);

      let updatedArr = [...multiSelectedOptions]
      if(updatedArr.includes(letter)){
        const index = updatedArr.indexOf(letter)
        updatedArr.splice(index,1)
        setMultiSelectedOptions([...updatedArr])
      }else{
        setMultiSelectedOptions([...multiSelectedOptions,letter])
      }

      // handleChoices(multiSelectedOptions,mappedValuesWithOptions);
    }

    useEffect(()=>{
      console.log("multiSelectedOptions",multiSelectedOptions);
      handleChoices(multiSelectedOptions,mappedValuesWithOptions);
    },[multiSelectedOptions])

    useEffect(()=>{
      let obj = {}
      for(let i=0;i<choices.length;i++){
        obj[letters[i]] = choices[i]
      }
      console.log(obj);
      setMappedValuesWithOptions({...obj})
    },[])

    return (
      <View >
        <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap',marginTop:10}}>
          {choices?.map((e, i) => {
            return <>
              {
                isResponse == true ?
                <View style={styles.option}>
                <View
                  style={
                    // optionClicked != letters[i]
                    studentAnswer.includes(e.choice_id) == false
                      ? styles.circle
                      : [styles.circle, {backgroundColor:"#2fb8bb"}]
                  }>
                  <Text
                    style={
                      // optionClicked != letters[i]
                      multiSelectedOptions.includes(letters[i]) == false
                        ? {fontWeight: 'bold'}
                        : {fontWeight: 'bold', color: 'white'}
                    }>
                    {letters[i]}
                  </Text>
                </View>
                {
               e.choice_image != "" ?<View style={{height:100,width:100}}>
                  <Image source={{uri: e.choice_image}}
                   style={{aspectRatio: 1,height:"100%",width:"100%",resizeMode: 'contain'}} />
                  </View> 
               :<View style={{margin: 5, padding: 5}}>
                  {/* <Text>{e.choices}</Text> */}
                  <HtmlViwer
                        source={{ html: e.choices }}
                        isQuestion={false}
                      />
                </View>
                }
                </View>
                :
                <Pressable
                style={[styles.option,{ width:e.choices.length > 20 ? "100%" : "45%"}]}
                onPress={() => {
                  handleClickedOptions(letters[i],e)
                  // setOptionClicked(letters[i]);
                  // handleChoices(e);
                }}>
                <View
                  style={
                    // optionClicked != letters[i]
                    multiSelectedOptions.includes(letters[i]) == false
                      ? styles.circle
                      : [styles.circle, {backgroundColor:"#2fb8bb"}]
                  }>
                  <Text
                    style={
                      // optionClicked != letters[i]
                      multiSelectedOptions.includes(letters[i]) == false
                        ? {fontWeight: 'bold'}
                        : {fontWeight: 'bold', color: 'white'}
                    }>
                    {letters[i]}
                  </Text>
                </View>
                {
               e.choice_image != "" ?<View style={{height:100,width:100}}>
                  <Image source={{uri: e.choice_image}}
                   style={{aspectRatio: 1,height:"100%",width:"100%",resizeMode: 'contain'}} />
                  </View> 
               :<View style={{margin: 5, padding: 5}}>
                  {/* <Text>{e.choices}</Text> */}
                  <HtmlViwer
                        source={{ html: e.choices }}
                        isQuestion={false}
                      />
                       {/* <QuestionPartBuilder data={ e.choices }/> */}
                </View>
                }
                </Pressable>
              }
            </>
            // return (
            //   <Pressable
            //     style={styles.option}
            //     onPress={() => {
            //       handleClickedOptions(letters[i],e)
            //       // setOptionClicked(letters[i]);
            //       // handleChoices(e);
            //     }}>
            //     <View
            //       style={
            //         // optionClicked != letters[i]
            //         multiSelectedOptions.includes(letters[i]) == false
            //           ? styles.circle
            //           : [styles.circle, {backgroundColor:"#2fb8bb"}]
            //       }>
            //       <Text
            //         style={
            //           // optionClicked != letters[i]
            //           multiSelectedOptions.includes(letters[i]) == false
            //             ? {fontWeight: 'bold'}
            //             : {fontWeight: 'bold', color: 'white'}
            //         }>
            //         {letters[i]}
            //       </Text>
            //     </View>
            //     {
            //    e.choice_image != "" ?<View style={{height:100,width:100}}>
            //       <Image source={{uri: e.choice_image}}
            //        style={{aspectRatio: 1,height:"100%",width:"100%",resizeMode: 'contain'}} />
            //       </View> 
            //    :<View style={{margin: 5, padding: 5}}>
            //       <Text>{e.choices}</Text>
            //     </View>
            //     }
            //   </Pressable>
            // );
          })}
        </View>
      </View>
    );
}



export default MultiSelectQuestions;
