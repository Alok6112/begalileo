import React, {useEffect, useState} from 'react';
import { Text, View } from 'react-native';
import ComparisonOfImagesDragDropType from '../QuestionSubTypes/comparison_of_images_dragdrop_type';
import ComparisonOfImagesKeyingType from '../QuestionSubTypes/comparison_of_images_keying_type';
import ComparisonOfImagesSelectChoiceType from '../QuestionSubTypes/comparison_of_images_selectchoice_type';
import {MATH_ZONE_QUESTION, MATH_ZONE_LIVE_CLASS_QUESTION , MATH_ZONE_FLAGGED_QUESTION, MATH_ZONE_HOME_WORK_QUESTION} from '../../../components/helpers/Constants'

const ComparisonOfImagesQuestions = ({data, submitResponse,screenType,isResponse ,handleStudentAnswerCorrect}) => {
  console.log("ComparisonOfImagesQuestions",data);

const [question,setQuestion] = useState(JSON.parse(data.question_data[0].question_text))
useEffect(()=>{
  setQuestion(JSON.parse(data.question_data[0].question_text))
},[])  
return (
    <View>
        {
            question.choiceType == "dragdrop" ?<ComparisonOfImagesDragDropType data={data} submitResponse={submitResponse} screenType={screenType} isResponse={isResponse} handleStudentAnswerCorrect={handleStudentAnswerCorrect}/>:<></>
        }
        {
            question.choiceType == "selectchoice"?<ComparisonOfImagesSelectChoiceType data={data} submitResponse={submitResponse} screenType={screenType} isResponse={isResponse} handleStudentAnswerCorrect={handleStudentAnswerCorrect}/>:<></>
        }
        {
            question.choiceType == "keying" ? <ComparisonOfImagesKeyingType data={data} submitResponse={submitResponse} screenType={screenType} isResponse={isResponse} handleStudentAnswerCorrect={handleStudentAnswerCorrect}/> :<></>
        }
    </View>
  );
};

export default ComparisonOfImagesQuestions;
