import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import HorizontalFillUpsDragDropType from '../QuestionSubTypes/horizontal_fill_ups_dragdrop_type';
import HorizontalFillUpsKeyingType from '../QuestionSubTypes/horizontal_fill_ups_keying_type';
import HorizontalFillUpsSelectChoiceType from '../QuestionSubTypes/horizontal_fill_ups_selectchoice_type';


const HorizontalFillUpsQuestions = ({data, submitResponse, screenType, isResponse,handleStudentAnswerCorrect}) => {
  // data = {
  //   operation: 'addition',
  //   type: 'horizontal_fill_ups',
  //   rows: '1',
  //   cols: '5',
  //   questionName: 'Solve:',
  //   questionContent: [
  //     {row: 0, col: 0, value: '8', isMissed: 'false'},
  //     {row: 0, col: 1, value: 'thousands', isMissed: 'false'},
  //     {row: 0, col: 2, value: '=', isMissed: 'false'},
  //     {row: 0, col: 3, value: '800', isMissed: 'true'},
  //     {row: 0, col: 4, value: 'tens', isMissed: 'false'}
  //   ],
  //   solution: {
  //     model: [{val: '8 thousands = 800 tens'}],
  //     sidebyside: [],
  //     srows: null,
  //     scols: null,
  //   },
  //   choices: ['800'],
  //   choiceType: 'keying',
  //   choiceCount: 1,
  // };
  console.log("HorizontalFillUpsQuestions",data.operation);

  console.log("checker",JSON.parse(data.question_data[0].question_text));
  const [question,setQuestion] = useState(JSON.parse(data.question_data[0].question_text))
  useEffect(()=>{
    setQuestion(JSON.parse(data.question_data[0].question_text))
  },[])
  return (
    <View>
      {question.choiceType == 'dragdrop' ? (
        <HorizontalFillUpsDragDropType data={data} submitResponse={submitResponse} screenType={screenType} isResponse={isResponse} handleStudentAnswerCorrect={handleStudentAnswerCorrect}/>
      ) : (
        <></>
      )}

      {question.choiceType == 'selectchoice' ? (
        <HorizontalFillUpsSelectChoiceType
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
        <HorizontalFillUpsKeyingType data={data} submitResponse={submitResponse} screenType={screenType} isResponse={isResponse} handleStudentAnswerCorrect={handleStudentAnswerCorrect}/>
      ) : (
        <></>
      )}
    </View>
  );
};

export default HorizontalFillUpsQuestions;
