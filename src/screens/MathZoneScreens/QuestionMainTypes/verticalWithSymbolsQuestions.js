import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import VerticalWithSymbolsSelectChoiceType from '../QuestionSubTypes/verticalwithsymbols_selectchoice_type';

const VerticalWithSymbolsQuestions = ({data, submitResponse, screenType, isResponse, handleStudentAnswerCorrect}) => {
  console.log("VerticalWithSymbolsQuestions",data);
  const question = JSON.parse(data.question_data[0].question_text)
  return (
    <View>
      {question.choiceType == 'selectchoice' ? <VerticalWithSymbolsSelectChoiceType data={data} submitResponse={submitResponse} screenType={screenType} isResponse={isResponse} handleStudentAnswerCorrect={handleStudentAnswerCorrect}/> : <></> }
    </View>
  );
};

export default VerticalWithSymbolsQuestions;
