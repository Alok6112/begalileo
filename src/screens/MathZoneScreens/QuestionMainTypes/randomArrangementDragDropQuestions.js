import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import RandomArrangementDragDropType from '../QuestionSubTypes/randomarrangement_dragdrop_type';

const windowHeight = Dimensions.get('window').height;
const RandomArrangementDragDropQuestions = ({data, submitResponse,screenType, isResponse, handleStudentAnswerCorrect}) => {
  
console.log("RandomArrangementDragDropQuestions",data);
const question = JSON.parse(data.question_data[0].question_text)
  return (
    <View>
      {question.choiceType == 'dragdrop' ? <RandomArrangementDragDropType data={data} submitResponse={submitResponse} screenType={screenType} isResponse={isResponse} handleStudentAnswerCorrect={handleStudentAnswerCorrect}/> : <></> }
    </View>
  );
}
  export default RandomArrangementDragDropQuestions;
