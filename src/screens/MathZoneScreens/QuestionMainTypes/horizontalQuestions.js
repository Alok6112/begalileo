import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import HorizontalDragDropType from '../QuestionSubTypes/horizontal_dragdrop_type';
import HorizontalKeyingType from '../QuestionSubTypes/horizontal_keying_type';
import HorizontalSelectChoiceType from '../QuestionSubTypes/horizontal_selectchoice_type';

const HorizontalQuestions = ({data, submitResponse, screenType, isResponse,handleStudentAnswerCorrect}) => {
  
  console.log("HorizontalQuestions",data);
  const question = JSON.parse(data.question_data[0].question_text)
  return (
    <View>
    { question.choiceType == 'dragdrop' ? <HorizontalDragDropType data={data} submitResponse={submitResponse} screenType={screenType} isResponse={isResponse} handleStudentAnswerCorrect={handleStudentAnswerCorrect}/> : <></> }

      { question.choiceType == 'selectchoice' ? <HorizontalSelectChoiceType data={data} submitResponse={submitResponse} screenType={screenType} isResponse={isResponse} handleStudentAnswerCorrect={handleStudentAnswerCorrect}/> : <></> }
      
      { question.choiceType == 'keying' ? <HorizontalKeyingType data={data} submitResponse={submitResponse} screenType={screenType} isResponse={isResponse} handleStudentAnswerCorrect={handleStudentAnswerCorrect}/> : <></> }
    </View>
  );
};

export default HorizontalQuestions;
