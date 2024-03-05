import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import CountTenFramesMultiple from "../QuestionSubTypes/counttenframesmultiple";
const CountTenFramesMultipleQuestions = ({ data, submitResponse ,screenType, isResponse,handleStudentAnswerCorrect}) => {
  console.log("Counttenframes multiple Questions",data);
  return (
    <View>
      <CountTenFramesMultiple data={data} submitResponse={submitResponse} screenType={screenType} isResponse={isResponse} handleStudentAnswerCorrect={handleStudentAnswerCorrect}/>
    </View>
  );
};

export default CountTenFramesMultipleQuestions;
