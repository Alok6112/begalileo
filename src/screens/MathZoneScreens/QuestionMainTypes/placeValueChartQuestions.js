import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import PlaceValueChartDragDropType from '../QuestionSubTypes/place_value_chart_dragdrop_type';
import PlaceValueChartKeyingType from '../QuestionSubTypes/place_value_chart_keying_type';
import PlaceValueChartSelectChoiceType from '../QuestionSubTypes/place_value_chart_selectchoice_type';

const PlaceValueChartQuestions = ({data, submitResponse, screenType, isResponse, handleStudentAnswerCorrect}) => {
 
  console.log("PlaceValueChartQuestions",data);
  const question = JSON.parse(data.question_data[0].question_text)
  return (
    <View>
      {question.choiceType == 'dragdrop' ? (
        <PlaceValueChartDragDropType
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
        <PlaceValueChartSelectChoiceType
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
        <PlaceValueChartKeyingType
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

export default PlaceValueChartQuestions;
