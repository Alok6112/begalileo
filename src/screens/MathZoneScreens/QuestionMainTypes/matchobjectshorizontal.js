import React, { useEffect, useState } from "react";
import { Text, View, Dimensions } from "react-native";
import Dragx from "../QuestionSubTypes/Dragx";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//console.log(res.data.question_data[0].question_type);
// let qus = res.data.question_data[0].question_text
// let finalData = JSON.parse(qus)
// console.log(finalData);
// console.log(windowWidth/ parseInt(finalData.cols));
// setColumnWidth((windowWidth/ parseInt(finalData.cols)))
// setQuestion(finalData)

const MatchobjectshorizontalQuestions = ({ data, submitResponse, screenType, isResponse , handleStudentAnswerCorrect}) => {
  console.log("MatchobjectshorizontalQuestions",data);
  
  const question_id = data.question_data[0].question_id;
  const question = JSON.parse(data.question_data[0].question_text);
  const columnWidth = windowWidth / parseInt(question.cols);
  console.log(data);
  // res.data.question_data[0].question_text
  // const [question,setQuestion] = useState("")
  // setQuestion()
  return (
    <View>
      <Text>MatchobjectshorizontalQuestions1</Text>
      <Dragx
        question={question}
        columnWidth={columnWidth}
        windowHeight={windowHeight}
        submitResponse={submitResponse}
        question_id={question_id}

        screenType={screenType}
        isResponse={isResponse}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    </View>
  );
};

export default MatchobjectshorizontalQuestions;
