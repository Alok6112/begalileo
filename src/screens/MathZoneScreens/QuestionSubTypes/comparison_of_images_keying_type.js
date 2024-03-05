import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Dimensions,
  TextInput
} from 'react-native';
import HtmlViwer from '../QuestionAsserts/HtmlRender';
import ModalTester from '../QuestionAsserts/outputResponseModal';
import {commonKeyingTypeStudentResponse, convertHTML} from '../QuestionAsserts/commonFileForStudentResponses'
import {MATH_ZONE_QUESTION, MATH_ZONE_LIVE_CLASS_QUESTION , MATH_ZONE_FLAGGED_QUESTION, MATH_ZONE_HOME_WORK_QUESTION} from '../../../components/helpers/Constants'
import SolutionComponent from '../QuestionAsserts/outputResponseComponent';
import QuestionPartBuilder from '../QuestionAsserts/questionPartBuilder';
import OwnTextInput from '../../MathZoneScreensForTesting/OwnTextInput';


const windowHeight = Dimensions.get('window').height;
const ComparisonOfImagesKeyingType = ({data, submitResponse, screenType, isResponse,handleStudentAnswerCorrect}) => {
  
  let temp1 = false;
  const question = JSON.parse(data.question_data[0].question_text)
  const [student_response,setStudentResponse] = useState(JSON.parse(data.question_data[0].question_text))
  const question_id = data.question_data[0].question_id

  
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

    if (typedValues.length != answerValues.length) {
      alert('Please enter all the values');
      return;
    }

    console.log(answerValues);

    for (let i = 0; i < typedValues.length; i++) {
    
      let temp = answerValues.filter((e)=> 
      e.row==typedValues[i].row && e.col==typedValues[i].col ? 1:0)
      
      if(typedValues[i].value == ""){
        alert('Please enter all the values');
        return;
      }

      if(convertHTML(temp[0].value.trim().toLowerCase()) == typedValues[i].value.trim().toLowerCase() ){
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
    let finalResponse = commonKeyingTypeStudentResponse(student_response,typedValues)
    setStudentResponse(finalResponse)

    setIsValidated(true);
    
    if( screenType == MATH_ZONE_QUESTION){
      handleStudentAnswerCorrect(temp1)
    }
    
  };

  const [isValidated, setIsValidated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [solution, setSolution] = useState('');
  const [typedValues, setTypedValues] = useState([])

 

  const handleInputs = (val,missedObj) =>{
    
    let obj = {...missedObj};
    obj.value = val;

    let updatedArr = [...typedValues];
    let flag = false;

    updatedArr = updatedArr.map(ele => {
      if (
        ele.row == obj.row &&
        ele.col == obj.col
      ) {
        flag = true;
        return obj;
      } else {
        return ele;
      }
    });

    if (flag == false) {
      updatedArr.push(obj);
    }

    setTypedValues([...updatedArr]);

  }



  return (
      <View>
        <View style={styles.outterSection}>
          <View style={{width: '80%'}}>
            <View style={{marginTop: 10,marginBottom:10}}>
              {/* <HtmlViwer source={{html: question.questionName}} isQuestion={true} /> */}
              <QuestionPartBuilder data={ question.questionName }/>
            </View>

            {
                question.upload_file_name != null ?
                <View  style={{minWidth: 300, height: 200,margin:10}}>
                <Image source={{uri: question.upload_file_name}}
                    style={{aspectRatio: 2,alignSelf: 'center',height:"100%",width:"100%"}} />
                </View>:<></>
            }

            <View>
                {
                    question.questionContent.map((item,outerIndex)=>{
                      return  <View style={{display:"flex",flexDirection:"row",flexWrap:"wrap",alignItems:"center"}}> 
                        {
                        item.map((val,index)=>{
                            if(val.isMissed == 'false'){
                                // return <View style={{margin:10}}><HtmlViwer source={{html: val.value}} isColumnView={true} /></View>
                                return <View style={{display:"flex",flexDirection:"row",flexWrap:"wrap" ,minWidth:200,width:"auto"}}> 
                                          <QuestionPartBuilder data={ val.value } imgSize={50}/> 
                                      </View>
                            }else{
                                return <View style={{margin:10}}>
                                         { isResponse == true ? <TextInput
                                               style={{height: 30,minWidth:30,textAlign:"center",fontSize: 20, fontWeight: "bold"}}
                                               defaultValue={val.studentAnswer}
                                               editable={false}
                                            /> : 
                                            // <View style={{borderWidth:1}}>
                                            // <TextInput
                                            //     style={{height: 30,minWidth:30,textAlign:"center",fontSize: 20, fontWeight: "bold"}}
                                            //     placeholder="Type here!"
                                            //     onChangeText={(next)=>{
                                            //        handleInputs(next,val)
                                            //     }}
                                            // // defaultValue={text}
                                            // />
                                            // </View>
                                            <OwnTextInput myId={outerIndex+""+index} handleInputs={handleInputs} val={val} isValidated={isValidated}/>
                                          }

                                </View>
                            }
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
                  setTypedValues([])
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

        { screenType == MATH_ZONE_QUESTION && isValidated &&  
          <ModalTester
            deviceHeight={windowHeight}
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
});

export default ComparisonOfImagesKeyingType;
