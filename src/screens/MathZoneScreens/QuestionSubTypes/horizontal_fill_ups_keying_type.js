import React, { useEffect , useState ,useContext} from 'react';
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
import {commonKeyingTypeStudentResponse1D,convertHTML} from '../QuestionAsserts/commonFileForStudentResponses'
import {MATH_ZONE_QUESTION, MATH_ZONE_LIVE_CLASS_QUESTION , MATH_ZONE_FLAGGED_QUESTION, MATH_ZONE_HOME_WORK_QUESTION} from '../../../components/helpers/Constants'
import SolutionComponent from '../QuestionAsserts/outputResponseComponent';
import MathQuillHtmlRender from "../QuestionAsserts/MathQuillHtmlRender";
import QuestionPartBuilder from '../QuestionAsserts/questionPartBuilder';
import OwnTextInput from '../../MathZoneScreensForTesting/OwnTextInput';
import { getLatexFromHtmlString } from '../QuestionAsserts/commonFunctions';

const windowHeight = Dimensions.get('window').height;

const MyInput = ({handleInputs,val, isValidated}) =>{
  const [presentValue, setPresentValue] = useState("")
    return<View  style={{height:30,minWidth:50,borderWidth:1,paddingLeft:8,paddingRight:8,borderRadius: 6}}>
        <TextInput
          style={{height: 30,minWidth:30,textAlign:"center",fontSize: 20, fontWeight: "bold"}}
          // placeholder="Type here!"
          editable={ isValidated ? false : true}
          value={presentValue}
          keyboardType="numeric"
          onChangeText={(next)=>{
            // handleInputs(next,val)
            console.log("",next);
            if(next[next.length-1] >= 0 || next[next.length-1] <= 9){
              handleInputs(next,val)
              setPresentValue(next)
            }else{
              if(next.length >= 2){
                setPresentValue((prev) =>prev)
              }else{
                setPresentValue("")
              }
              
            }
          }}
          //defaultValue={text}
        />
    </View>
}


const HorizontalFillUpsKeyingType = ({data, submitResponse, screenType, isResponse, handleStudentAnswerCorrect}) => {
  
  let temp1 = false;
  const [question,setQuestion] = useState(JSON.parse(data.question_data[0].question_text))
  const [student_response,setStudentResponse] = useState(JSON.parse(data.question_data[0].question_text))
  const question_id = data.question_data[0].question_id
  
  //   question = {
  //     operation: 'addition',
  //     type: 'compare_drag_operator',
  //     rows: '1',
  //     cols: '3',
  //     questionName: 'Which words make this statement correct?',
  //     questionContent: [
  //       {row: 0, col: 0, value: '29', isMissed: 'false'},
  //       {row: 0, col: 1, value: 'is less than', isMissed: 'true'},
  //       {row: 0, col: 2, value: '33', isMissed: 'false'},
  //     ],
  //     solution: {
  //       model: [{val: '29 is less than 33'}],
  //       sidebyside: [],
  //       srows: null,
  //       scols: null,
  //     },
  //     choices: [
  //       {selected: 'false', value: 'is equal to'},
  //       {selected: 'false', value: 'is more than'},
  //       {selected: 'true', value: 'is less than'},
  //     ],
  //     choiceType: 'dragdrop',
  //     choiceCount: 3,
  //   };

  //const student_response = question;
  const validate = () => {
    console.log("typedValues",typedValues);
    console.log('Validate');
    const answerValues = []

    for(let i=0;i< question.questionContent.length;i++){
  
        if(question.questionContent[i].isMissed == "true"){
          answerValues.push(question.questionContent[i])
        }
    
    }

    console.log(typedValues);
    if (typedValues.length != answerValues.length) {
      alert('Please enter all the values');
      return;
    }

    console.log(answerValues);

    for (let i = 0; i < typedValues.length; i++) {
    
      let temp = answerValues.filter((e)=> 
      e.row==typedValues[i].row && e.col==typedValues[i].col ? 1:0)

    // console.log("temp",temp);
    // console.log("typedValues", typedValues,typedValues[i].value.toLowerCase());
      
    if(typedValues[i].value == ""){
      alert('Please enter all the values');
      return;
    }

    console.log(temp[0]?.value.trim().toLowerCase(), typedValues[i].value.trim().toLowerCase());
      if(convertHTML(temp[0]?.value.trim().toLowerCase()) == typedValues[i].value.trim().toLowerCase()){
        temp1  = true
        setIsCorrect(true)
      }else{
        temp1 = false;
        setIsCorrect(false)
        break;
      }
    
    }
    let sln = question.solution.model?.map((item)=> `${item.val}`+'</br>')
    setSolution(sln.join(" "))
   // setSolution(question.solution.model[0].val);

    //student response to send back
     let finalResponse = commonKeyingTypeStudentResponse1D(student_response,typedValues)
     setStudentResponse(finalResponse)
    // student_response.studentAnswer = droppedValues;
    // if (typedValues.length <= 1) {
    //   student_response.studentAnswer = typedValues[0];
    // } else {
    //   student_response.studentAnswer = typedValues;
    // }
    // console.log('student_response', student_response);


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
  const [rows,setRows] = useState([])


  useEffect(()=>{
    let arr = []

    for(let i=0;i<parseInt(question.rows);i++){
        arr.push(i+1)
    }

    setRows(arr);
    // console.log("Array",arr);
  },[])


  useEffect(()=>{
    for(let i=0;i<question.questionContent.length;i++){
      if(question.questionContent[i].isMissed == "true"){
        if(question.questionContent[i].value.includes("mq-selectable")){
          let str_data = question.questionContent[i].value
          question.questionContent[i].value = getLatexFromHtmlString(str_data)
        } 
      }
    }
  },[])

  
  const handleInputs = (val,missedObj) =>{
    console.log("handleInputs",val,missedObj);
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
            <View style={{marginTop: 10}}>
              {/* <HtmlViwer source={{html: question.questionName}} isQuestion={true} /> */}
              {/* <MathQuillHtmlRender
                  content={question.questionName}
                  isQuestion={true}
                /> */}

                <QuestionPartBuilder data={question.questionName} imgSize={250} aspectRatio={2}/>
            </View>

            <View style={{display:"flex",flexDirection:"column",height:"auto",marginTop:10}}>
                {
                    rows.map((row)=>{
                        return<View  style={{display:"flex",flexDirection:"row",  flexWrap:"wrap"}}>
                            {
                                 question.questionContent.map((val,index)=>{
                                   
                                  if(parseInt(row-1) == parseInt(val.row) ){
                                        if(val.isMissed == 'false'){
                                            return  <View style={[{display:"flex",justifyContent:"center",alignItems:"center"}]}>
                                              {/* <HtmlViwer source={{html: val.value}}  isQuestion={true} isBlack={true} /> */}
                                              <QuestionPartBuilder data={val.value} imgSize={150}/>
                                            </View>
                                        }else{
                                            return<View style={[styles.row,{display:"flex",justifyContent:"center",alignItems:"center",flexWrap:"wrap",height:"auto"}]}>
                                            { isResponse == true ? <View  style={{height:30,minWidth:50,borderWidth:1}}><TextInput
                                              style={{height: 30,minWidth:30,textAlign:"center",fontSize: 20, fontWeight: "bold"}}
                                              defaultValue={val.studentAnswer}
                                              editable={false}
                                           /></View> 
                                          //  :<MyInput handleInputs={handleInputs} val={val} isValidated={isValidated}/>
                                          :<View style={{margin:2}}>
                                            <OwnTextInput myId={row+""+index} handleInputs={handleInputs} val={val} isValidated={isValidated}/>
                                            </View>
                                            }</View>                            
                                        }
                                    }
                                 })
                            }
                            </View>
                    })
                }
            
            </View>
             
        </View>

        { screenType == MATH_ZONE_QUESTION ?
          <View style={styles.submitButtonSection}>
            {isValidated ? (
              <Pressable
                style={styles.buttonStyle}
                onPress={() => {
                  // var formData = new FormData();
                  // formData.append('student_response', student_response);
                  // //  formData.append("student_answer", isClickedYesNo)
                  // submitResponse(question_id, formData)
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
                //setSolution(question.solution.model[0].val);
                setIsValidated(true)
                setIsCorrect(true)
              }}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>Solve</Text>
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
                //setSolution(question.solution.model[0].val);
                setIsValidated(true)
                setIsCorrect(true)
              }}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>Show Soln</Text>
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
          // <SolutionComponent isCorrect={isCorrect} solution={solution} isMathquill={true} screenType={screenType}/>
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
    //borderWidth:1
  },

  row:{
    height:40,
    minWidth:50,
    // flex:1,
    // borderWidth:1,
    // borderColor:"orange",
    backgroundColor:"#ffffff",
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
  },
  column:{
    minWidth:40,
  }
});

export default HorizontalFillUpsKeyingType;