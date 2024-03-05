import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import PlaceValueTableSelectKeyingType from "../QuestionSubTypes/place_value_table_select_keying_type";
import PlaceValueTableSelectSelectChoiceType from "../QuestionSubTypes/place_value_table_select_selectchoice_type";

const PlaceValueTableSelectQuestions = ({ data, submitResponse, screenType, isResponse , handleStudentAnswerCorrect}) => {
  
  const question = JSON.parse(data.question_data[0].question_text);
  console.log("PlaceValueTableSelectQuestions", question);
  return (
    <View>
      {question.choiceType == "selectchoice" ? (
        <PlaceValueTableSelectSelectChoiceType
          data={data}
          submitResponse={submitResponse}
          screenType={screenType}
          isResponse={isResponse}
          handleStudentAnswerCorrect={handleStudentAnswerCorrect}
        />
      ) : (
        <></>
      )}
      {question.choiceType == "keying" ? (
        <PlaceValueTableSelectKeyingType
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

export default PlaceValueTableSelectQuestions;
