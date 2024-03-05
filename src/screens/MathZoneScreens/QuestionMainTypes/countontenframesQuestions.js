import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import CountOnTenFrames from "../QuestionSubTypes/countontenframes";

const CountontenframesQuestions = ({ data, submitResponse ,screenType, isResponse,handleStudentAnswerCorrect}) => {
  console.log("CountontenframesQuestions",data);
  return (
    <View>
      <CountOnTenFrames data={data} submitResponse={submitResponse} screenType={screenType} isResponse={isResponse} handleStudentAnswerCorrect={handleStudentAnswerCorrect}/>
    </View>
  );
};

export default CountontenframesQuestions;
