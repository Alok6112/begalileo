import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import QuestionTextImagesSelectChoiceType from '../QuestionSubTypes/questiontextimages_selectchoice_type';

const QuestionTextWithImagesQuestions = ({data, submitResponse, screenType, isResponse, handleStudentAnswerCorrect}) => {
 
  console.log("QuestionTextWithImagesQuestions",data);
  const question = JSON.parse(data.question_data[0].question_text)
  return (
    <View>
      {question.choiceType == 'selectchoice' ? (
        <QuestionTextImagesSelectChoiceType
          data={data}
          submitResponse={submitResponse}
          screenType={screenType}
          isResponse={isResponse}
          handleStudentAnswerCorrect={handleStudentAnswerCorrect}
        />
      ) : (
        <></>
      )}
    </View>
  );
};

export default QuestionTextWithImagesQuestions;
