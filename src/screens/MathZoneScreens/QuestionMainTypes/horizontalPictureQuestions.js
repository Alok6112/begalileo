import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import HorizontalPictureDragDropType from '../QuestionSubTypes/horizontalpicture_dragdrop_type';
import HorizontalPictureKeyingType from '../QuestionSubTypes/horizontalpicture_keying_type';
import HorizontalPictureSelectChoiceType from '../QuestionSubTypes/horizontalpicture_selectchoice_type';
import {MATH_ZONE_QUESTION, MATH_ZONE_LIVE_CLASS_QUESTION , MATH_ZONE_FLAGGED_QUESTION, MATH_ZONE_HOME_WORK_QUESTION} from '../../../components/helpers/Constants'

const HorizontalPictureQuestions = ({data, submitResponse, screenType, isResponse,handleStudentAnswerCorrect}) => {
  
  const question = JSON.parse(data.question_data[0].question_text)
  return (
    <View>
      {question.choiceType == 'dragdrop' ? (
        <HorizontalPictureDragDropType
          data={data}
          submitResponse={submitResponse}
          screenType={screenType}
          isResponse={isResponse}
          handleStudentAnswerCorrect={handleStudentAnswerCorrect}
        />
      ) : (
        <></>
      )}

      {question.choiceType == 'selectchoice' ? (
        <HorizontalPictureSelectChoiceType
          data={data}
          submitResponse={submitResponse}
          screenType={screenType}
          isResponse={isResponse}
          handleStudentAnswerCorrect={handleStudentAnswerCorrect}
        />
      ) : (
        <></>
      )}

      {question.choiceType == 'keying' ? (
        <HorizontalPictureKeyingType
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

export default HorizontalPictureQuestions;
