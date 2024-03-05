import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import LongMultiplicationDropType from '../QuestionSubTypes/long_multiplication_dragdrop_type';
import LongMultiplicationKeyingType from '../QuestionSubTypes/long_multiplication_keying_type';
import LongMultiplicationSelectChoiceType from '../QuestionSubTypes/long_multiplication_selectchoice_type';

const LongMultiplicationQuestions = ({data, submitResponse, screenType, isResponse, handleStudentAnswerCorrect}) => {
  console.log("INSIDE THE LONGGGGGGG......");
  const question = JSON.parse(data.question_data[0].question_text)
  
  return (
    <View>
      { question.choiceType == 'dragdrop' ? <LongMultiplicationDropType data={data} submitResponse={submitResponse} screenType={screenType} isResponse={isResponse} handleStudentAnswerCorrect={handleStudentAnswerCorrect}/>  : <></> }

      { question.choiceType == 'selectchoice' ? <LongMultiplicationSelectChoiceType data={data} submitResponse={submitResponse} screenType={screenType} isResponse={isResponse} handleStudentAnswerCorrect={handleStudentAnswerCorrect}/> : <></> }

      { question.choiceType == 'keying' ? <LongMultiplicationKeyingType data={data} submitResponse={submitResponse} screenType={screenType} isResponse={isResponse} handleStudentAnswerCorrect={handleStudentAnswerCorrect}/> : <></> }
    </View>
  );
};

export default LongMultiplicationQuestions;
