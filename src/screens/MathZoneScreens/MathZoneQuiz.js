import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {SCREEN_HEIGHT} from '../../config/configs';
import {SCREEN_WIDTH} from '../../config/configs';
import Orientation from 'react-native-orientation';
import axios from 'axios';
import MatchobjectshorizontalQuestions from './QuestionMainTypes/matchobjectsHorizontalQuestions';
// import MatchobjectshorizontalQuestions from "./QuestionMainTypes/matchobjectshorizontal";
import CountontenframesQuestions from './QuestionMainTypes/countontenframesQuestions';
import CkeditorQuestions from './QuestionMainTypes/CkEditorQuestions';
import CountOfObjectYesNoQuestions from './QuestionMainTypes/countOfObjectYesNoQuestions';
import QuestionTextOptionsQuestions from './QuestionMainTypes/questionTextOptions';
import HorizontalNotSymbolsQuestions from './QuestionMainTypes/horizontalNotSymbolsQuestions';
import OptionMultiplePicturesQuestions from './QuestionMainTypes/optionsMultiplePictures';
import CompareDragOperatorQuestions from './QuestionMainTypes/compare_drag_operator';
import ComparisonOfImagesQuestions from './QuestionMainTypes/comparison_of_images';
import HorizontalPreviewClickQuestions from './QuestionMainTypes/horizontalpreviewclickQuestions';
import TenFramesQuestions from './QuestionMainTypes/tenframesQuestions';
import HundredsChartQuestions from './QuestionMainTypes/hundredsChartQuestions';
import MatchObjectsVerticalQuestions from './QuestionMainTypes/matchobjectsverticalQuestions';
import RandomArrangementDragDropQuestions from './QuestionMainTypes/randomArrangementDragDropQuestions';
import BaseBlockImagesQuestions from './QuestionMainTypes/baseBlockImagesQuestions';
import HorizontalFillUpsQuestions from './QuestionMainTypes/horizontalFillUpsQuestions';
import HorizontalQuestions from './QuestionMainTypes/horizontalQuestions';
import VerticalQuestions from './QuestionMainTypes/verticalQuestions';
import PlaceValueChartQuestions from './QuestionMainTypes/placeValueChartQuestions';
import PlaceValueTableSelectQuestions from './QuestionMainTypes/placeValueTableSelectQuestions';
import QuestionTextWithImagesQuestions from './QuestionMainTypes/questionTextImagesQuestions';
import VerticalWithSymbolsQuestions from './QuestionMainTypes/verticalWithSymbolsQuestions';
import LongMultiplicationQuestions from './QuestionMainTypes/longMultiplicationQuestions';
import LogicalTableKgQuestions from './QuestionMainTypes/LogicalTableKgQuestions';
import HorizontalPictureQuestions from './QuestionMainTypes/horizontalPictureQuestions';
import CountTenFramesMultipleQuestions from './QuestionMainTypes/counttenframesmultipleQuestions';
import MultiSelectQuestions from './QuestionMainTypes/OldTypeQuestions/MultiSelectTypeQuestion';
import FillInTheBlanksQuestions from './QuestionMainTypes/OldTypeQuestions/FillInTheBlanksTypeQuestion';
import TrueFalseQuestions from './QuestionMainTypes/OldTypeQuestions/TrueFalseTypeQuestion';
import MultipleChoiceQuestions from './QuestionMainTypes/OldTypeQuestions/MultipleChoiceTypeQuestion';
import MemoryCardGame from './QuestionMainTypes/MemoryCardGame';
import ORCHtmlCheck from './QuestionMainTypes/SpecialTypeQuestions/OrcHtmlRender';
import OPRCHtmlCheck from './QuestionMainTypes/SpecialTypeQuestions/OprcHtmlRender';
import OLHtmlCheck from './QuestionMainTypes/SpecialTypeQuestions/OlHtmlRender';
import NumberBondQuestions from './QuestionMainTypes/numberBondQuestions';
import LottieView from 'lottie-react-native';
import {
  level1Star,
  level2Star,
  level3Star,
  level4Star,
  victoryEmotion,
  correctStudentAnswer,
  lossingEmotion,
} from '../../assets/lottieAssets';

import {MATH_ZONE_QUESTION as ScreenType} from '../../components/helpers/Constants';
import {normalize} from 'react-native-elements';
import ownMathquillInputContext from '../../useContext/ownMathquillInputContext';
import {Portal} from 'react-native-paper';
import {getParamNavigationV5} from '../../components/helpers/navigationV5Data';

const MathZoneQuiz = props => {
  const [data, setData] = useState('');
  const [isHaveQuestionData, setIsHaveQuestionData] = useState(false);
  const [questionType, setQuestionType] = useState('');
  const [quiz_id, setQuiz_id] = useState(0);
  const [isLevelCompleted, setIsLevelCompleted] = useState(false);
  const [levelBasedAnimations, setLevelBasedAnimation] = useState();
  const [newData, setNewData] = useState(false);

  const [studentAnswerCorrect, setStudentAnswerCorrect] = useState();
  const [openAnimation, setOpenAnimation] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);

  const timer1 = useRef(null);
  const timer2 = useRef(null);

  useEffect(() => {
    const initial = Orientation.getInitialOrientation();
    Orientation.lockToLandscapeRight();

    let student_id = getParamNavigationV5(props, 'student_id', '');
    let tag_id = getParamNavigationV5(props, 'tag_id', '');

    axios
      .post(
        `https://www.begalileo.com/app_student_quizzes/start?student_id=${student_id}&exercise_id=${tag_id}&from=app`,
      )
      .then(res => {
        console.log('ejhjhewbhewhgbh', res.data, res.data.level_completed);
        setQuiz_id(res.data.quiz_id);
        if (res.data.question_data == undefined) {
          setIsHaveQuestionData(false);
          setData(res.data);
          setQuestionType('');
        } else {
          console.log('question_type', res.data.question_data[0].question_type);
          setIsHaveQuestionData(true);
          setData(res.data);
          setQuestionType(res.data.question_data[0].question_type);

          if (
            res.data.level_completed == 'true' ||
            res.data.level_completed == true
          )
            setCompletedAnimination(res.data.level);
        }
      })
      .catch(err => {
        console.log(err);
      });

    return () => {
      const initial = Orientation.getInitialOrientation();
      Orientation.lockToPortrait();
    };
  }, []);

  const handleAnimationTime = () => {
    setTimeout(() => {
      setIsLevelCompleted(false);
    }, 4000);
  };

  const setCompletedAnimination = level => {
    if (level == 'level1') {
      setLevelBasedAnimation(level1Star);
    } else if (level == 'level2') {
      setLevelBasedAnimation(level2Star);
    } else if (level == 'level3') {
      setLevelBasedAnimation(level3Star);
    } else if (level == 'level4') {
      setLevelBasedAnimation(level4Star);
    } else {
      setLevelBasedAnimation(victoryEmotion);
    }

    setIsLevelCompleted(true);
    handleAnimationTime();
  };

  const submitResponse = async (
    question_id,
    student_response,
    isCorrect,
    isOldType,
  ) => {
    var FormData2 = require('form-data');
    let formData = new FormData2();

    let finalValue;
    console.log(student_response);
    if (isOldType == true) {
      formData.append(
        `${student_response['key']}`,
        `${student_response['value']}`,
      );
      formData.append('student_answer', isCorrect);

      console.log('Yes Old Typed');
    } else {
      finalValue = JSON.stringify(student_response);
      console.log('final response', finalValue);
      formData.append('student_response', `${finalValue}`);
      formData.append('student_answer', isCorrect);
    }

    let queryParams = `?id=${quiz_id}&question_id=${question_id}&from=app`;

    console.log('Form data live Class', formData);

    let result = await StudentAnswerResponse(queryParams, formData)
      .then(res => res)
      .catch(err => {
        console.log('Error 0', err);
      });

    // console.log("Returned Result",result.data.question_data);

    // axios
    //   .post(
    //     `https://www.begalileo.com/app_student_quizzes/save_practice?id=${quiz_id}&question_id=${question_id}`,
    //     // {
    //     //   data: formData.student_response,
    //     // }
    //     {
    //       student_response:finalValue
    //     }
    //   )
    //   .then((res) => {
    //     console.log("Submit response", question_id);
    //     console.log("ejhjhewbhewhgbh", res.data.quiz_id);
    //     setQuiz_id(res.data.quiz_id);
    //     if (res.data.question_data == undefined) {
    //       setIsHaveQuestionData(false);
    //       setData(res.data);
    //     } else {
    //       setIsHaveQuestionData(true);
    //       setData(res.data);
    //       setQuestionType(res.data.question_data[0].question_type)

    //       if(res.data.level_completed == 'true' || res.data.level_completed == true)
    //       setCompletedAnimination(res.data.level)
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("Error in submit response", err);
    //   });
  };

  const submitResponseForSplTypesQuestions = async (
    question_id,
    student_answer_question,
    student_answer_Choice,
    isCorrect,
  ) => {
    var FormData2 = require('form-data');
    let formData = new FormData2();

    console.log('Submit response');

    formData.append('student_answer_question', `${student_answer_question}`);
    formData.append('student_answer_Choice', `${student_answer_Choice}`);
    formData.append('studentAnswer', isCorrect);
    formData.append('student_answer', isCorrect);
    console.log('special type', formData);

    let queryParams = `?id=${quiz_id}&question_id=${question_id}&from=app`;

    console.log('Form data live Class', formData);

    let result = await StudentAnswerResponse(queryParams, formData)
      .then(res => res)
      .catch(err => {
        console.log('Error1', err);
      });

    //console.log("Returned Result",result.data.question_data);
    // axios
    //   .post(
    //     `https://www.begalileo.com/app_student_quizzes/save_practice?id=${quiz_id}&question_id=${question_id}`,
    //     {
    //       data: formData,
    //     }
    //   )
    //   .then((res) => {
    //     console.log("Submit response", question_id);
    //     console.log("ejhjhewbhewhgbh", res.data.quiz_id);
    //     setQuiz_id(res.data.quiz_id);
    //     if (res.data.question_data == undefined) {
    //       setIsHaveQuestionData(false);
    //       setData(res.data);
    //     } else {
    //       setIsHaveQuestionData(true);
    //       setData(res.data);
    //       setQuestionType(res.data.question_data[0].question_type);

    //       if(res.data.level_completed == 'true' || res.data.level_completed == true)
    //       setCompletedAnimination(res.data.level)
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("Error in submit response", err);
    //   });
  };

  const [indexofElement, setIndexOfElement] = useState(-1);

  const StudentAnswerResponse = async (url, data) => {
    let config = {
      method: 'post',
      url: `https://www.begalileo.com/app_student_quizzes/save_practice${url}`,
      // url: `http://192.168.202.70:3000/app_student_quizzes/save_practice${url}`,
      data: data,
    };
    // let arr = [
    //   // 29661, 91073, 84693, 84624, 64936, 58282, 86977, 22664, 76052, 69494, 74852, 82157, 66845, 82278, 57667
    //   // 90070,90088,90343,90350,90428,90992,91139,91191,91228,91459,//Multiple Choice
    //   // 86002, 86006,86667, 86926, 86928,90409, 91140, 91141, 91142,  91322, 92642,//True/false
    //   // 62457,68399,80044,80280,82516,83661,86936,86680,91007,18583,30877,//fill in the blanks
    //   // 48139, 48213, 56632,  56639, 56662, 91541, 91542, 91543, 91544, 91615,// multi select
    //   //  18937, 19000, 19935, 20393, 20807, 21019, 23416, 39286, 42520,  91395,//orc
    //   // 19079, 19080, 20390, 21172, 23400, 39392, 44617, 44618,91215, 91389,//oprc
    //   // 19309, 19697,19744,9928, 21695, 37199, 37230,42898, 42925, 46166,//ol
    //   // 91223, 91382, 91396, 91475, 91518, 91522, 91534, 91682, 91706, 91776, 92294, 92371, 92493, 92544, 92565, 92575
    // ]
    // let id = arr[indexofElement+1]
    // setIndexOfElement((prev)=>prev+1)
    // let config = {
    //   method: "post",
    //   url: `https://www.begalileo.com//app_teachers/test_app_mathzone?question_id=${id}}`,
    //   // url: `http://192.168.202.70:3000/app_student_quizzes/save_practice${url}`,
    //   // data: data,
    // };

    setNewData(false);

    let res = await axios(config)
      .then(res => {
        setQuiz_id(res.data.quiz_id);
        if (res.data.question_data == undefined) {
          setIsHaveQuestionData(false);
          setData(res.data);
          setQuestionType('');
        } else {
          setIsHaveQuestionData(true);
          setData(res.data);
          setQuestionType(res.data.question_data[0].question_type);

          if (
            res.data.level_completed == 'true' ||
            res.data.level_completed == true
          )
            setCompletedAnimination(res.data.level);
        }
        return res;
      })
      .catch(err => {
        console.log('Error', err);
      });

    console.log('In StudentAnswerResponse', res.data);
    // setQuiz_id(res.data.quiz_id);
    // if (res.data.question_data == undefined) {
    //   setIsHaveQuestionData(false);
    //   setData(res.data);
    //   setQuestionType("")
    // } else {
    //   setIsHaveQuestionData(true);
    //   setData(res.data);
    //   setQuestionType(res.data.question_data[0].question_type);

    //   if(res.data.level_completed == 'true' || res.data.level_completed == true)
    //   setCompletedAnimination(res.data.level)
    // }

    //return axios(config);
  };

  useEffect(() => {
    console.log('In UseEffect', data.question_no);
    setNewData(true);
  }, [data]);

  useEffect(() => {
    console.log('Inside UseEffect', studentAnswerCorrect);
    if (studentAnswerCorrect != undefined) {
      handleOpenAnimation();
    }

    return () => {
      clearTimeout(timer1.current);
      clearTimeout(timer2.current);
    };
  }, [startAnimation, studentAnswerCorrect]);

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
      setStudentAnswerCorrect(null);
    }, 3000);
  };

  const handleStudentAnswerCorrect = val => {
    console.log('Inside handleStudentAnswerCorrect', val);
    // setStudentAnswerCorrect(null)
    setStudentAnswerCorrect(val);
  };

  const questionTypes = {
    matchobjectshorizontal: (
      <MatchobjectshorizontalQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ),

    countontenframes: (
      <CountontenframesQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ),

    ckeditor: (
      <CkeditorQuestions
        data={data}
        submitResponse={submitResponseForSplTypesQuestions}
        screenType={ScreenType}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ), //completed need to test virtual keyboard in andriod

    questiontextoptions: (
      <QuestionTextOptionsQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ),

    countofobjectsyesno: (
      <CountOfObjectYesNoQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ),

    horizontalnotsymbols: (
      <HorizontalNotSymbolsQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ),

    options_multiple_pictures: (
      <OptionMultiplePicturesQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ),

    comparison_of_images: (
      <ComparisonOfImagesQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ),

    compare_drag_operator: (
      <CompareDragOperatorQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ),

    horizontalpreviewclick: (
      <HorizontalPreviewClickQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ),

    tenframes: (
      <TenFramesQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ),

    base_block_images: (
      <BaseBlockImagesQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ),

    horizontal_fill_ups: (
      <HorizontalFillUpsQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ),

    horizontal_fill_ups_multi_row: (
      <HorizontalFillUpsQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ),

    place_value_chart: (
      <PlaceValueChartQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ),

    vertical: (
      <VerticalQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ),

    horizontal: (
      <HorizontalQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ),

    verticalwithsymbols: (
      <VerticalWithSymbolsQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ),

    questiontextimages: (
      <QuestionTextWithImagesQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ),

    place_value_table_select: (
      <PlaceValueTableSelectQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ),

    randomarrangementdragdrop: (
      <RandomArrangementDragDropQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ),

    matchobjectsvertical: (
      <MatchObjectsVerticalQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ),

    hundreds_chart: (
      <HundredsChartQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ),

    horizontalpicture: (
      <HorizontalPictureQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ),

    long_multiplication: (
      <LongMultiplicationQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ),

    logical_table_kg: (
      <LogicalTableKgQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ),

    count_tenframes_multiple: (
      <CountTenFramesMultipleQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ),

    'Multiple choice': (
      <MultipleChoiceQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ), //completed

    'True/False': (
      <TrueFalseQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ), //completed

    'Fill in the blanks': (
      <FillInTheBlanksQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ), //completed

    'multi select': (
      <MultiSelectQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ), //completed

    memory_card_game: (
      <MemoryCardGame
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ), // Not completed need to send response back

    orc: (
      <ORCHtmlCheck
        data={data}
        submitResponse={submitResponseForSplTypesQuestions}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ), //completed

    oprc: (
      <OPRCHtmlCheck
        data={data}
        submitResponse={submitResponseForSplTypesQuestions}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ), //completed

    ol: (
      <OLHtmlCheck
        data={data}
        submitResponse={submitResponseForSplTypesQuestions}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ), //completed

    number_bond: (
      <NumberBondQuestions
        data={data}
        submitResponse={submitResponse}
        screenType={ScreenType}
        isResponse={false}
        handleStudentAnswerCorrect={handleStudentAnswerCorrect}
      />
    ), //completed but check submit response
  };
  const [focusedElementIdForMathQuill, setFocusedElementIdForMathQuill] =
    useState(-1);

  return (
    <>
      <ownMathquillInputContext.Provider
        value={{
          focusedElementIdForMathQuill,
          setFocusedElementIdForMathQuill,
        }}>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            // height: 400,
            height: SCREEN_WIDTH,
            zIndex: openAnimation ? 1 : 0,
            // marginTop: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {studentAnswerCorrect && openAnimation && (
            <Portal>
              <View
                style={{
                  position: 'absolute',
                  top: '40%',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <LottieView
                  style={{height: 200}}
                  source={correctStudentAnswer}
                  autoPlay
                  loop
                />
              </View>
            </Portal>
          )}
          {!studentAnswerCorrect && openAnimation && (
            <Portal>
              <View
                style={{
                  position: 'absolute',
                  top: '40%',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <LottieView
                  style={{height: 150}}
                  source={lossingEmotion}
                  autoPlay
                  loop
                />
              </View>
            </Portal>
          )}
        </View>

        <ScrollView style={{backgroundColor: 'white', height: SCREEN_HEIGHT}}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#ffdd63',
              width: '100%',
              minHeight: SCREEN_HEIGHT,
              // minHeight:SCREEN_WIDTH,
              // height:SCREEN_WIDTH,
              borderRadius: 15,
              // height:"100%",
              // height:SCREEN_HEIGHT/2
              //height:SCREEN_WIDTH/2
            }}>
            <View style={{position: 'absolute', top: '5%'}}>
              <Image source={require('./Asserts/Images/Ellipse1.png')} />
            </View>

            <View style={{position: 'absolute', top: '50%', left: '2%'}}>
              <Image source={require('./Asserts/Images/Union1.png')} />
            </View>

            <View style={{position: 'absolute', top: '73%', left: '3%'}}>
              <Image source={require('./Asserts/Images/Ellipse2.png')} />
            </View>

            <View style={{position: 'absolute', top: '7%', right: '-3%'}}>
              <Image source={require('./Asserts/Images/Polygon.png')} />
            </View>

            <View style={{position: 'absolute', top: '50%', right: '-8%'}}>
              <Image source={require('./Asserts/Images/Vector.png')} />
            </View>

            <View style={{position: 'absolute', top: '90%', right: '40%'}}>
              <Image source={require('./Asserts/Images/Star.png')} />
            </View>

            <View
              style={{
                // margin: "auto",
                width: '85%',
                minHeight: '85%',
                marginTop: '4%',
                marginBottom: '5%',
                marginLeft: '7.5%',
                // marginTop: normalize(25),
                // marginLeft: normalize(25),
                backgroundColor: 'white',
                // backgroundColor: "blue",
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
                    {data.message}{' '}
                  </Text>
                </View>
              ) : isLevelCompleted ? (
                <View
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: 400,
                    zIndex: 1,
                    display: 'flex',
                  }}>
                  <LottieView source={levelBasedAnimations} autoPlay loop />
                </View>
              ) : newData ? (
                <KeyboardAvoidingView>
                  <View>
                    {questionTypes[questionType] ?? <Text>InProgress</Text>}
                    {focusedElementIdForMathQuill != -1 && (
                      <View style={{borderWidth: 0, height: 150}}></View>
                    )}
                    {/*this is for to work like keyboard avoiding view*/}
                  </View>
                </KeyboardAvoidingView>
              ) : (
                <></>
              )}
            </View>
          </View>
        </ScrollView>
      </ownMathquillInputContext.Provider>
    </>
  );
};

export default MathZoneQuiz;
