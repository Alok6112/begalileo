import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import MatchObjectsVerticalDragDropType from '../QuestionSubTypes/matchobjectsvertical_dragdrop_type';
import MatchObjectsVerticalKeyingType from '../QuestionSubTypes/matchobjectsvertical_keying_type';

const MatchObjectsVerticalQuestions = ({data, submitResponse, screenType, isResponse,handleStudentAnswerCorrect}) => {
 // data = {"operation":"addition","type":"matchobjectsvertical","rows":"3","cols":"1","questionName":"\u003cdiv\u003eDrag and match\u003c/div\u003e\u003cdiv\u003e\u003cbr\u003e\u003c/div\u003e","questionContent":[[{"row":0,"col":0,"imgvalue":"6 l","numvalue":"6000 ml","isMissed":"true"}],[{"row":1,"col":0,"imgvalue":"4 l","numvalue":"4000 ml","isMissed":"true"}],[{"row":2,"col":0,"imgvalue":"9 l","numvalue":"9000 ml","isMissed":"true"}]],"solution":{"model":[{"val":"\u003cdiv style=\"font-size: 20px;\"\u003e6 l = 6000 ml\u003c/div\u003e\u003cdiv style=\"font-size: 20px;\"\u003e\u003cbr\u003e\u003c/div\u003e"},{"val":"\u003cdiv style=\"font-size: 20px;\"\u003e4 l = 4000 ml\u003c/div\u003e\u003cdiv style=\"font-size: 20px;\"\u003e\u003cbr\u003e\u003c/div\u003e"},{"val":"\u003cspan style=\"font-size: 20px;\"\u003e9 l = 9000 ml\u003c/span\u003e"}],"sidebyside":[],"srows":null,"scols":null},"choices":["400 ml","6000 ml","4000 ml","9000 ml","60000 ml"],"choiceType":"dragdrop","choiceCount":5}
 console.log("MatchObjectsVerticalQuestions",data);
 const question = JSON.parse(data.question_data[0].question_text)
 return (
    <View>
      {question.choiceType == 'dragdrop' ? (
        <MatchObjectsVerticalDragDropType
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
        <MatchObjectsVerticalKeyingType
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

export default MatchObjectsVerticalQuestions;
