import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import VerticalDragDropType from "../QuestionSubTypes/vertical_dragdrop_type";
import VerticalKeyingType from "../QuestionSubTypes/vertical_keying_type";
import VerticalSelectChoiceType from "../QuestionSubTypes/vertical_selectchoice_type";

const VerticalQuestions = ({ data, submitResponse, screenType, isResponse, handleStudentAnswerCorrect }) => {
  
  console.log("VerticalQuestions", data);
  const question = JSON.parse(data.question_data[0].question_text);
  return (
    <View>
      {question.choiceType == "dragdrop" ? (
        <VerticalDragDropType data={data} submitResponse={submitResponse} screenType={screenType} isResponse={isResponse} handleStudentAnswerCorrect={handleStudentAnswerCorrect}/>
      ) : (
        <></>
      )}

      {question.choiceType == "selectchoice" ? (
        <VerticalSelectChoiceType data={data} submitResponse={submitResponse} screenType={screenType} isResponse={isResponse} handleStudentAnswerCorrect={handleStudentAnswerCorrect}/>
      ) : (
        <></>
      )}

      {question.choiceType == "keying" ? (
        <VerticalKeyingType data={data} submitResponse={submitResponse} screenType={screenType} isResponse={isResponse} handleStudentAnswerCorrect={handleStudentAnswerCorrect}/>
      ) : (
        <></>
      )}
    </View>
  );
};

export default VerticalQuestions;
