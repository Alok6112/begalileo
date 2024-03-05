import React, { useEffect, useState } from "react";
import { Text, View, Dimensions } from "react-native";
import Dragx from "../QuestionSubTypes/Dragx";
import MatchObjectsHorizontalDargDropType from '../QuestionSubTypes/matchobjectshorizontal_dragdrop_type'
import MatchObjectHorizontalKeyingType from "../QuestionSubTypes/matchobjectshorizontal_keying_type"

//console.log(res.data.question_data[0].question_type);
// let qus = res.data.question_data[0].question_text
// let finalData = JSON.parse(qus)
// console.log(finalData);
// console.log(windowWidth/ parseInt(finalData.cols));
// setColumnWidth((windowWidth/ parseInt(finalData.cols)))
// setQuestion(finalData)
const MatchobjectshorizontalQuestions = ({ data, submitResponse, screenType, isResponse , handleStudentAnswerCorrect}) => {
  console.log("MatchobjectshorizontalQuestions",data);
  
  const [question,setQuestion] = useState(JSON.parse(data.question_data[0].question_text))
  
  useEffect(()=>{
    setQuestion(JSON.parse(data.question_data[0].question_text))
  },[])
  return (
    <View>
       {
            question.choiceType == "dragdrop" ?<MatchObjectsHorizontalDargDropType data={data} submitResponse={submitResponse} screenType={screenType} isResponse={isResponse} handleStudentAnswerCorrect={handleStudentAnswerCorrect}/>:<></>
        }
        {
            question.choiceType == "keying" ? <MatchObjectHorizontalKeyingType data={data} submitResponse={submitResponse} screenType={screenType} isResponse={isResponse} handleStudentAnswerCorrect={handleStudentAnswerCorrect}/> :<></>
        }
      {/* <Dragx
        question={question}
        columnWidth={columnWidth}
        windowHeight={windowHeight}
        submitResponse={submitResponse}
        question_id={question_id}
      /> */}
    </View>
  );
};

export default MatchobjectshorizontalQuestions;
