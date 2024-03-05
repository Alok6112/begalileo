import React, {useEffect, useState, useImperativeHandle, useRef} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
// import { SCREEN_HEIGHT } from "../../config/configs";
// import Orientation from "react-native-orientation";
import axios from 'axios';
import MatchobjectshorizontalQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/matchobjectsHorizontalQuestions';
import CountontenframesQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/countontenframesQuestions';
import CkeditorQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/CkEditorQuestions';
import CountOfObjectYesNoQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/countOfObjectYesNoQuestions';
import QuestionTextOptionsQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/questionTextOptions';
import HorizontalNotSymbolsQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/horizontalNotSymbolsQuestions';
import OptionMultiplePicturesQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/optionsMultiplePictures';
import CompareDragOperatorQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/compare_drag_operator';
import ComparisonOfImagesQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/comparison_of_images';
import HorizontalPreviewClickQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/horizontalpreviewclickQuestions';
import TenFramesQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/tenframesQuestions';
import HundredsChartQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/hundredsChartQuestions';
import MatchObjectsVerticalQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/matchobjectsverticalQuestions';
import RandomArrangementDragDropQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/randomArrangementDragDropQuestions';
import BaseBlockImagesQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/baseBlockImagesQuestions';
import HorizontalFillUpsQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/horizontalFillUpsQuestions';
import HorizontalQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/horizontalQuestions';
import VerticalQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/verticalQuestions';
import PlaceValueChartQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/placeValueChartQuestions';
import PlaceValueTableSelectQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/placeValueTableSelectQuestions';
import QuestionTextWithImagesQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/questionTextImagesQuestions';
import VerticalWithSymbolsQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/verticalWithSymbolsQuestions';
import LongMultiplicationQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/longMultiplicationQuestions';
import LogicalTableKgQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/LogicalTableKgQuestions';
import HorizontalPictureQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/horizontalPictureQuestions';
import CountTenFramesMultipleQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/counttenframesmultipleQuestions';
import MultiSelectQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/OldTypeQuestions/MultiSelectTypeQuestion';
import FillInTheBlanksQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/OldTypeQuestions/FillInTheBlanksTypeQuestion';
import TrueFalseQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/OldTypeQuestions/TrueFalseTypeQuestion';
import MultipleChoiceQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/OldTypeQuestions/MultipleChoiceTypeQuestion';
import MemoryCardGame from '../../../../screens/MathZoneScreens/QuestionMainTypes/MemoryCardGame';
import ORCHtmlCheck from '../../../../screens/MathZoneScreens/QuestionMainTypes/SpecialTypeQuestions/OrcHtmlRender';
import OPRCHtmlCheck from '../../../../screens/MathZoneScreens/QuestionMainTypes/SpecialTypeQuestions/OprcHtmlRender';
import OLHtmlCheck from '../../../../screens/MathZoneScreens/QuestionMainTypes/SpecialTypeQuestions/OlHtmlRender';
import NumberBondQuestions from '../../../../screens/MathZoneScreens/QuestionMainTypes/numberBondQuestions';

// import MatchobjectshorizontalQuestions from "./QuestionMainTypes/matchobjectsHorizontalQuestions";
// import CountontenframesQuestions from "./QuestionMainTypes/countontenframesQuestions";
// import CkeditorQuestions from "./QuestionMainTypes/CkEditorQuestions";
// import CountOfObjectYesNoQuestions from "./QuestionMainTypes/countOfObjectYesNoQuestions";
// import QuestionTextOptionsQuestions from "./QuestionMainTypes/questionTextOptions";
// import HorizontalNotSymbolsQuestions from "./QuestionMainTypes/horizontalNotSymbolsQuestions";
// import OptionMultiplePicturesQuestions from "./QuestionMainTypes/optionsMultiplePictures";
// import CompareDragOperatorQuestions from "./QuestionMainTypes/compare_drag_operator";
// import ComparisonOfImagesQuestions from "./QuestionMainTypes/comparison_of_images";
// import HorizontalPreviewClickQuestions from "./QuestionMainTypes/horizontalpreviewclickQuestions";
// import TenFramesQuestions from "./QuestionMainTypes/tenframesQuestions";
// import HundredsChartQuestions from "./QuestionMainTypes/hundredsChartQuestions";
// import MatchObjectsVerticalQuestions from "./QuestionMainTypes/matchobjectsverticalQuestions";
// import RandomArrangementDragDropQuestions from "./QuestionMainTypes/randomArrangementDragDropQuestions";
// import BaseBlockImagesQuestions from "./QuestionMainTypes/baseBlockImagesQuestions";
// import HorizontalFillUpsQuestions from "./QuestionMainTypes/horizontalFillUpsQuestions";
// import HorizontalQuestions from "./QuestionMainTypes/horizontalQuestions";
// import VerticalQuestions from "./QuestionMainTypes/verticalQuestions";
// import PlaceValueChartQuestions from "./QuestionMainTypes/placeValueChartQuestions";
// import PlaceValueTableSelectQuestions from "./QuestionMainTypes/placeValueTableSelectQuestions";
// import QuestionTextWithImagesQuestions from "./QuestionMainTypes/questionTextImagesQuestions";
// import VerticalWithSymbolsQuestions from "./QuestionMainTypes/verticalWithSymbolsQuestions";
// import LongMultiplicationQuestions from "./QuestionMainTypes/longMultiplicationQuestions";
// import LogicalTableKgQuestions from "./QuestionMainTypes/LogicalTableKgQuestions";
// import HorizontalPictureQuestions from "./QuestionMainTypes/horizontalPictureQuestions";
// import CountTenFramesMultipleQuestions from "./QuestionMainTypes/counttenframesmultipleQuestions";
// import MultiSelectQuestions from "./QuestionMainTypes/OldTypeQuestions/MultiSelectTypeQuestion";
// import FillInTheBlanksQuestions from "./QuestionMainTypes/OldTypeQuestions/FillInTheBlanksTypeQuestion";
// import TrueFalseQuestions from "./QuestionMainTypes/OldTypeQuestions/TrueFalseTypeQuestion";
// import MultipleChoiceQuestions from "./QuestionMainTypes/OldTypeQuestions/MultipleChoiceTypeQuestion";
// import MemoryCardGame from "./QuestionMainTypes/MemoryCardGame";
// import ORCHtmlCheck from "./QuestionMainTypes/SpecialTypeQuestions/OrcHtmlRender";
// import OPRCHtmlCheck from "./QuestionMainTypes/SpecialTypeQuestions/OprcHtmlRender";
// import OLHtmlCheck from "./QuestionMainTypes/SpecialTypeQuestions/OlHtmlRender";
// import NumberBondQuestions from "./QuestionMainTypes/numberBondQuestions";

import {COLOR, CommonStyles} from '../../../../config/styles';
import ResultPage from './ResultPage';
import {normalize} from 'react-native-elements';
import {forwardRef} from 'react';
import WhiteboardQuiz from './WhiteboardQuiz';
// import ListElement from "react-native-render-html/lib/typescript/elements/ListElement";

import LottieView from 'lottie-react-native';

import {
  correctStudentAnswer,
  lossingEmotion,
} from '../../../../assets/lottieAssets';

import {MATH_ZONE_LIVE_CLASS_QUESTION as ScreenType} from '../../../../components/helpers/Constants';
import OwnMathquillInputContext from '../../../../useContext/ownMathquillInputContext';

const MathZoneQuiz = forwardRef((props, ref) => {
  const [data, setData] = useState('');
  const [isHaveQuestionData, setIsHaveQuestionData] = useState(false);
  const [questionType, setQuestionType] = useState('');
  const [quiz_id, setQuiz_id] = useState(0);
  const [liveClassPracticeId, setLiveClassPracticeId] = useState(
    props?.quizQuestions?.quizObj?.live_class_practice_id,
  );
  const [liveClassId, setLiveClassId] = useState(props?.liveClassIdOfStudent);
  const [level, setLevel] = useState('');
  const [userId, setUserId] = useState(props?.userIdOfStudent);
  const [tagId, setTagId] = useState(0);
  const [questionId, setQuestionId] = useState(0);
  const [timeZone, setTimeZone] = useState(10);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [totalQuestionNumber, setTotalQuestionNumber] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [whiteboardOpen, setOpenWhiteBoard] = useState(false);
  const [whiteboardPoints, setWhiteboardPoints] = useState([]);
  const [studentAnswerCorrect, setStudentAnswerCorrect] = useState();
  const [openAnimation, setOpenAnimation] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const whiteboardQuizRef = useRef(null);

  const timer1 = useRef(null);
  const timer2 = useRef(null);

  console.log('userId in MathzoneQuiz', userId);
  console.log('liveClassId in ', liveClassId);

  useEffect(() => {
    if (props.quizCompleted) {
      // let liveClassPracticeIds =
      //   props?.quizQuestions?.quizObj?.live_class_practice_id;
      // setLiveClassPracticeId(liveClassPracticeIds);
      return;
    }
    let data = props?.quizQuestions?.quizObj;
    // let conceptName = props?.quizQuestions?.conceptTag;
    let quizLevel = props?.quizQuestions?.quizObj?.level;
    let questionIds =
      props?.quizQuestions?.quizObj?.question_data[0]?.question_id;
    // let liveClassPracticeIds =
    //   props?.quizQuestions?.quizObj?.live_class_practice_id;
    let liveClassIds = props?.quizQuestions?.quizObj?.lice_class_id;
    let tagIds = props?.quizQuestions?.quizObj?.tag_id;

    let questionNumber = props?.quizQuestions?.quizObj?.question_no;
    let totalNumberQuestion = props?.quizQuestions?.quizObj?.total;
    let QuizCompleted = props?.quizQuestions?.quizObj?.quiz_completed;

    if (props?.quizQuestions?.quizObj?.question_data[0] == undefined) {
      setIsHaveQuestionData(false);
    }

    setQuizCompleted(QuizCompleted);

    setQuestionNumber(questionNumber);
    setTotalQuestionNumber(totalNumberQuestion);

    // setLiveClassPracticeId(liveClassPracticeIds);

    setQuestionId(questionIds);
    setLevel(quizLevel);
    setTagId(tagIds);
    setNewData(false);
    setData(data);
    setQuestionType(
      props?.quizQuestions?.quizObj.question_data[0].question_type,
    );
    setIsHaveQuestionData(true);
  }, []);

  useEffect(() => {
    if (studentAnswerCorrect != undefined) {
      handleOpenAnimation();
    }

    return () => {
      clearTimeout(timer1.current);
      clearTimeout(timer2.current);
    };
  }, [startAnimation]);

  const handleOpenAnimation = () => {
    timer1.current = setTimeout(() => {
      setOpenAnimation(true);
      clearTimeout(timer1.current);
      handleCloseAnimation();
    }, 500);
  };
  const handleCloseAnimation = () => {
    timer2.current = setTimeout(() => {
      setOpenAnimation(false);
      clearTimeout(timer2.current);
    }, 5000);
  };

  const StudentAnswerResponse = async (url, data) => {
    let config = {
      method: 'post',
      url: `https://www.begalileo.com/app_teachers/save_practice${url}`,
      data: data,
    };
    return axios(config);
  };

  const submitResponse = async (
    question_id,
    student_response,
    isCorrect,
    isOldType,
  ) => {
    console.log('IsCorrect formdata', isCorrect, isOldType);

    console.log('userId', userId);

    setStudentAnswerCorrect(isCorrect);
    setStartAnimation(!startAnimation);

    var FormData2 = require('form-data');
    let formData = new FormData2();
    let queryParams;

    if (isOldType == true) {
      formData.append(
        `${student_response['key']}`,
        `${student_response['value']}`,
      );
      queryParams = `?user_id=${userId}&question_id=${question_id}&live_class_practice_id=${liveClassPracticeId}&live_class_id=${liveClassId}&tag_id=${tagId}&level=${level}&student_id=&student_answer=${isCorrect}&time_spent=${timeZone}&from=app`;
    } else {
      let finalValue = JSON.stringify(student_response);
      console.log('final response', finalValue);
      formData.append('student_answer_question', `${finalValue}`);
      queryParams = `?user_id=${userId}&question_id=${question_id}&live_class_practice_id=${liveClassPracticeId}&live_class_id=${liveClassId}&tag_id=${tagId}&level=${level}&student_id=&choice=&student_answer=${isCorrect}&time_spent=${timeZone}&from=app`;
    }

    let finalValue = JSON.stringify(student_response);
    //console.log("final response", finalValue);
    formData.append('student_answer_question', `${finalValue}`);
    console.log('FormData', formData);

    let result = await StudentAnswerResponse(queryParams, formData)
      .then(res => {
        console.log('res', res.data);
      })
      .catch(err => {
        console.log('err', err.message);
      });

    console.log('Result', result);
  };

  const submitResponseForSplTypesQuestions = async (
    question_id,
    student_answer_question,
    student_answer_Choice,
    isCorrect,
  ) => {
    console.log('IN for spl', isCorrect);
    setStudentAnswerCorrect(isCorrect);
    setStartAnimation(!startAnimation);
    var FormData2 = require('form-data');
    let formData = new FormData2();
    console.log('CheckM', student_answer_question);
    console.log('Submit response');

    formData.append('student_answer_question', `${student_answer_question}`);
    formData.append('student_answer_Choice', `${student_answer_Choice}`);
    formData.append('studentAnswer', isCorrect);
    //  console.log("special type",formData);

    let queryParams = `?user_id=${userId}&question_id=${question_id}&live_class_practice_id=${liveClassPracticeId}&live_class_id=${liveClassId}&tag_id=${tagId}&level=${level}&student_id=&choice=&student_answer=${isCorrect}&time_spent=${timeZone}&from=app`;

    //console.log("Form data live Class", formData);

    let result = await StudentAnswerResponse(queryParams, formData);
  };

  useImperativeHandle(ref, () => ({
    onRemoteShowRoughBoard(status) {
      let showBoardStat = status == 'true';
      setOpenWhiteBoard(showBoardStat);
    },

    onRemoteLineUpdate(whiteBoardLines) {
      if (whiteBoardLines.tool == 'text') {
        checkAndUpdateWriting(whiteBoardLines);
      } else {
        checkAndUpdateWriting(whiteBoardLines[whiteBoardLines.length - 1]);
      }
    },

    onClearCanvas() {
      handleClearCanvas();
    },
  }));

  function handleClearCanvas() {
    if (whiteboardQuizRef.current != null) {
      whiteboardQuizRef.current.onClearCanvas();
    }
  }

  function checkAndUpdateWriting(whiteBoardLines) {
    if (whiteboardQuizRef.current != null) {
      whiteboardQuizRef.current.onRemoteLineUpdate(whiteBoardLines);
    }
  }

  console.log('Data', data);
  console.log('question type', questionType);

  const questionTypes = {
    matchobjectshorizontal: (
      <MatchobjectshorizontalQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    countontenframes: (
      <CountontenframesQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    ckeditor: (
      <CkeditorQuestions
        data={data}
        submitResponse={submitResponseForSplTypesQuestions}
        screenType={ScreenType}
      />
    ), //completed need to test virtual keyboard in andriod

    questiontextoptions: (
      <QuestionTextOptionsQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    countofobjectsyesno: (
      <CountOfObjectYesNoQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    horizontalnotsymbols: (
      <HorizontalNotSymbolsQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    options_multiple_pictures: (
      <OptionMultiplePicturesQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    comparison_of_images: (
      <ComparisonOfImagesQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    compare_drag_operator: (
      <CompareDragOperatorQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    horizontalpreviewclick: (
      <HorizontalPreviewClickQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    tenframes: (
      <TenFramesQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    base_block_images: (
      <BaseBlockImagesQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    horizontal_fill_ups: (
      <HorizontalFillUpsQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    horizontal_fill_ups_multi_row: (
      <HorizontalFillUpsQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    place_value_chart: (
      <PlaceValueChartQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    vertical: (
      <VerticalQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    horizontal: (
      <HorizontalQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    verticalwithsymbols: (
      <VerticalWithSymbolsQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    questiontextimages: (
      <QuestionTextWithImagesQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    place_value_table_select: (
      <PlaceValueTableSelectQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    randomarrangementdragdrop: (
      <RandomArrangementDragDropQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    matchobjectsvertical: (
      <MatchObjectsVerticalQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    hundreds_chart: (
      <HundredsChartQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    horizontalpicture: (
      <HorizontalPictureQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    long_multiplication: (
      <LongMultiplicationQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    logical_table_kg: (
      <LogicalTableKgQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    count_tenframes_multiple: (
      <CountTenFramesMultipleQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    'Multiple choice': (
      <MultipleChoiceQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    'True/False': (
      <TrueFalseQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    'Fill in the blanks': (
      <FillInTheBlanksQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    'multi select': (
      <MultiSelectQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ),

    memory_card_game: (
      <MemoryCardGame
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ), // Not completed need to send response back

    orc: (
      <ORCHtmlCheck
        data={data}
        submitResponse={submitResponseForSplTypesQuestions}
        screenType={ScreenType}
      />
    ),

    oprc: (
      <OPRCHtmlCheck
        data={data}
        submitResponse={submitResponseForSplTypesQuestions}
        screenType={ScreenType}
      />
    ),

    ol: (
      <OLHtmlCheck
        data={data}
        submitResponse={submitResponseForSplTypesQuestions}
        screenType={ScreenType}
      />
    ),

    number_bond: (
      <NumberBondQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
      />
    ), //completed but check submit response
  };

  const [newData, setNewData] = useState(false);

  useEffect(() => {
    console.log('In UseEffect', data.question_no);
    setNewData(true);
  }, [data]);

  const [focusedElementIdForMathQuill, setFocusedElementIdForMathQuill] =
    useState(-1);

  return (
    <>
      <OwnMathquillInputContext.Provider
        value={{
          focusedElementIdForMathQuill,
          setFocusedElementIdForMathQuill,
        }}>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: 400,
            zIndex: openAnimation ? 1 : 0,
            marginTop: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {studentAnswerCorrect && openAnimation && (
            <LottieView
              style={{marginTop: 40}}
              source={correctStudentAnswer}
              autoPlay
              loop
            />
          )}
          {!studentAnswerCorrect && openAnimation && (
            <LottieView
              style={{marginTop: 40, width: 200}}
              source={lossingEmotion}
              autoPlay
              loop
            />
          )}
        </View>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: whiteboardOpen ? 99 : 0,
          }}>
          {whiteboardOpen && (
            <WhiteboardQuiz
              ref={whiteboardQuizRef}
              onSendWhiteBoardLines={props.onSendWhiteBoardLines}
              whiteboardPoints={whiteboardPoints}
            />
          )}
        </View>
        <ScrollView style={{backgroundColor: 'white'}}>
          {!props.quizCompleted ? (
            <View>
              <View
                style={{
                  flex: 1,
                  height: 50,
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    height: 50,
                    justifyContent: 'center',
                    alignContent: 'center',
                    flex: 0.2,
                    width: '100%',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'blue',
                      width: 100,
                      height: '100%',
                      alignContent: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                    }}>
                    <Text
                      style={[
                        CommonStyles.text_14_bold,
                        {marginLeft: 20, color: 'white'},
                      ]}>
                      {questionNumber} Of {totalQuestionNumber}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignContent: 'center',
                    height: 50,
                    width: '100%',
                    flex: 0.6,
                  }}>
                  <View
                    style={{
                      width: '100%',
                    }}>
                    <Text
                      style={[
                        CommonStyles.text_14_bold,
                        {marginLeft: 20, textAlign: 'center'},
                      ]}>
                      {props?.conceptName}&nbsp; - &nbsp;{props?.conceptTag}{' '}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 0.2,
                    justifyContent: 'center',
                    alignContent: 'center',
                    height: 50,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'blue',
                      width: 100,
                      height: '100%',
                      alignContent: 'center',
                      justifyContent: 'center',
                      alignSelf: 'flex-end',
                      borderRadius: 10,
                    }}>
                    <Text
                      style={[
                        CommonStyles.text_14_bold,
                        {marginLeft: 20, color: 'white'},
                      ]}>
                      Level-
                      {props?.quizQuestions?.quizObj?.level?.split('level')[1]}
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  backgroundColor: '#ffdd63',
                  width: '100%',
                  height: '100%',
                  minHeight: 700,
                }}>
                <View
                  style={{
                    margin: 'auto',
                    width: '90%',
                    height: '90%',
                    marginTop: normalize(20),
                    marginLeft: normalize(20),
                    backgroundColor: 'white',
                    borderRadius: 10,
                  }}>
                  {isHaveQuestionData == false && data == '' ? (
                    <View></View>
                  ) : isHaveQuestionData == false && data != '' ? (
                    <View
                      style={{
                        position: 'absolute',
                        top: SCREEN_HEIGHT / 3,
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          textAlign: 'center',
                          fontSize: 20,
                        }}>
                        {' '}
                        {data.message}
                      </Text>
                    </View>
                  ) : // <View>{questionTypes[questionType]}</View>
                  newData ? (
                    <View>{questionTypes[questionType]}</View>
                  ) : (
                    <></>
                  )}
                </View>
              </View>
            </View>
          ) : (
            <View>
              <ResultPage
                practiceId={liveClassPracticeId}
                questionText={'Your Score is'}
                conceptName={props?.conceptName}
                conceptTag={props?.conceptTag}
                userId={userId}
              />
            </View>
          )}
        </ScrollView>
      </OwnMathquillInputContext.Provider>
    </>
  );
});

export default MathZoneQuiz;
