import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import MyWebViewMathquill from "../QuestionSubTypes/mathquillWebView1.ios";

const CkeditorQuestions = ({ data, submitResponse ,screenType, isResponse, handleStudentAnswerCorrect}) => {
  console.log(data.question_data[0]);
  const question = data.question_data[0].question_text;
  const question_id = data.question_data[0].question_id;
  console.log("CkeditorQuestions",JSON.stringify(data));
  return (
    <View>
      <MyWebViewMathquill
        content={question}
        question_id={question_id}
        submitResponse={submitResponse}
        data = {data}
        screenType={screenType}
        isResponse={isResponse}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    </View>
  );
};

export default CkeditorQuestions;
