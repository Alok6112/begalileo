import React, { useEffect, useState, useImperativeHandle, useRef } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { SCREEN_HEIGHT } from "../../../../config/configs";
// import Orientation from "react-native-orientation";
import axios from "axios";

import { MATH_ZONE_FLAGGED_QUESTION as ScreenType } from "../../../../components/helpers/Constants";

import MatchobjectshorizontalQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/matchobjectsHorizontalQuestions";
import CountontenframesQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/countontenframesQuestions";
import CkeditorQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/CkEditorQuestions";
import CountOfObjectYesNoQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/countOfObjectYesNoQuestions";
import QuestionTextOptionsQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/questionTextOptions";
import HorizontalNotSymbolsQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/horizontalNotSymbolsQuestions";
import OptionMultiplePicturesQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/optionsMultiplePictures";
import CompareDragOperatorQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/compare_drag_operator";
import ComparisonOfImagesQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/comparison_of_images";
import HorizontalPreviewClickQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/horizontalpreviewclickQuestions";
import TenFramesQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/tenframesQuestions";
import HundredsChartQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/hundredsChartQuestions";
import MatchObjectsVerticalQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/matchobjectsverticalQuestions";
import RandomArrangementDragDropQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/randomArrangementDragDropQuestions";
import BaseBlockImagesQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/baseBlockImagesQuestions";
import HorizontalFillUpsQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/horizontalFillUpsQuestions";
import HorizontalQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/horizontalQuestions";
import VerticalQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/verticalQuestions";
import PlaceValueChartQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/placeValueChartQuestions";
import PlaceValueTableSelectQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/placeValueTableSelectQuestions";
import QuestionTextWithImagesQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/questionTextImagesQuestions";
import VerticalWithSymbolsQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/verticalWithSymbolsQuestions";
import LongMultiplicationQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/longMultiplicationQuestions";
import LogicalTableKgQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/LogicalTableKgQuestions";
import HorizontalPictureQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/horizontalPictureQuestions";
import CountTenFramesMultipleQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/counttenframesmultipleQuestions";
import MultiSelectQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/OldTypeQuestions/MultiSelectTypeQuestion";
import FillInTheBlanksQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/OldTypeQuestions/FillInTheBlanksTypeQuestion";
import TrueFalseQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/OldTypeQuestions/TrueFalseTypeQuestion";
import MultipleChoiceQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/OldTypeQuestions/MultipleChoiceTypeQuestion";
import MemoryCardGame from "../../../../screens/MathZoneScreens/QuestionMainTypes/MemoryCardGame";
import ORCHtmlCheck from "../../../../screens/MathZoneScreens/QuestionMainTypes/SpecialTypeQuestions/OrcHtmlRender";
import OPRCHtmlCheck from "../../../../screens/MathZoneScreens/QuestionMainTypes/SpecialTypeQuestions/OprcHtmlRender";
import OLHtmlCheck from "../../../../screens/MathZoneScreens/QuestionMainTypes/SpecialTypeQuestions/OlHtmlRender";
import NumberBondQuestions from "../../../../screens/MathZoneScreens/QuestionMainTypes/numberBondQuestions";

import { COLOR, CommonStyles } from "../../../../config/styles";
// import ResultPage from "./ResultPage";
import { normalize } from "react-native-elements";
import { forwardRef } from "react";
// import WhiteboardQuiz from "./WhiteboardQuiz";

import LottieView from "lottie-react-native";

// import {
//   correctStudentAnswer,
//   lossingEmotion,
// } from "../../../../assets/lottieAssets";
import FlagQuestionMathZone from "./FlagQuestionMathZone";

const FlagQuestionMathZoneHome = forwardRef((props, ref) => {
  const [data, setData] = useState("");
  const [isHaveQuestionData, setIsHaveQuestionData] = useState(false);
  const [questionType, setQuestionType] = useState("");
  const [quiz_id, setQuiz_id] = useState(0);
  const [liveClassPracticeId, setLiveClassPracticeId] = useState(
    props?.quizQuestions?.quizObj?.live_class_practice_id
  );
  const [liveClassId, setLiveClassId] = useState(props?.liveClassIdOfStudent);
  const [level, setLevel] = useState("");
  const [userId, setUserId] = useState(props?.userIdOfStudent);
  const [tagId, setTagId] = useState(0);
  const [questionId, setQuestionId] = useState(0);
  const [timeZone, setTimeZone] = useState(10);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [totalQuestionNumber, setTotalQuestionNumber] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [whiteboardOpen, setOpenWhiteBoard] = useState(false);
  const [whiteboardPoints, setWhiteboardPoints] = useState([]);

  const [propsValueChange, setPropsValueChange] = useState("");

  const whiteboardQuizRef = useRef(null);

  useEffect(() => {
    var data = props?.obj?.obj;
    if (
      typeof data != undefined &&
      data.question_data &&
      data.question_data.length
    ) {
      setNewData(false);
      setData(data);
      setQuestionType(data?.question_data[0]?.question_type);
    }
    setIsHaveQuestionData(true);
  }, [propsValueChange]);

  useEffect(() => {
    if (propsValueChange != props?.obj?.obj?.flagged_question_id) {
      setPropsValueChange(props?.obj?.obj?.flagged_question_id);
    }
  }, [props?.obj?.obj?.flagged_question_id]);

  // useEffect(() => {
  //   if (
  //     typeof data != undefined &&
  //     data.question_data &&
  //     data.question_data.length
  //   ) {
  //     setQuestionType(data?.question_data[0]?.question_type);
  //   }
  // }, [data]);

  useImperativeHandle(ref, () => ({
    onRemoteShowRoughBoard(status) {
      let showBoardStat = status == "true";
      setOpenWhiteBoard(showBoardStat);
    },

    onRemoteLineUpdate(whiteBoardLines) {
      checkAndUpdateWriting(whiteBoardLines[whiteBoardLines.length - 1]);
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

  const questionTypes = {
    matchobjectshorizontal: (
      <MatchobjectshorizontalQuestions
        data={data}
        screenType={ScreenType}
        //submitResponse={submitResponse}
      />
    ),

    countontenframes: (
      <CountontenframesQuestions
        data={data}
        screenType={ScreenType}
        // submitResponse={submitResponse}
      />
    ),

    ckeditor: (
      <CkeditorQuestions
        data={data}
        screenType={ScreenType}
        // submitResponse={submitResponseForSplTypesQuestions}
      />
    ), //completed need to test virtual keyboard in andriod

    questiontextoptions: (
      <QuestionTextOptionsQuestions
        data={data}
        screenType={ScreenType}
        // submitResponse={submitResponse}
      />
    ),

    countofobjectsyesno: (
      <CountOfObjectYesNoQuestions
        data={data}
        screenType={ScreenType}
        // submitResponse={submitResponse}
      />
    ),

    horizontalnotsymbols: (
      <HorizontalNotSymbolsQuestions
        data={data}
        screenType={ScreenType}
        // submitResponse={submitResponse}
      />
    ),

    options_multiple_pictures: (
      <OptionMultiplePicturesQuestions
        data={data}
        screenType={ScreenType}
        // submitResponse={submitResponse}
      />
    ),

    comparison_of_images: (
      <ComparisonOfImagesQuestions
        data={data}
        screenType={ScreenType}
        // submitResponse={submitResponse}
      />
    ),

    compare_drag_operator: (
      <CompareDragOperatorQuestions
        data={data}
        screenType={ScreenType}
        // submitResponse={submitResponse}
      />
    ),

    horizontalpreviewclick: (
      <HorizontalPreviewClickQuestions
        data={data}
        screenType={ScreenType}
        // submitResponse={submitResponse}
      />
    ),

    tenframes: (
      <TenFramesQuestions
        data={data}
        screenType={ScreenType}

        // submitResponse={submitResponse}
      />
    ),

    base_block_images: (
      <BaseBlockImagesQuestions
        data={data}
        screenType={ScreenType}
        // submitResponse={submitResponse}
      />
    ),

    horizontal_fill_ups: (
      <HorizontalFillUpsQuestions
        data={data}
        screenType={ScreenType}
        // submitResponse={submitResponse}
      />
    ),

    horizontal_fill_ups_multi_row: (
      <HorizontalFillUpsQuestions
        data={data}
        screenType={ScreenType}
        //  submitResponse={submitResponse}
      />
    ),

    place_value_chart: (
      <PlaceValueChartQuestions
        data={data}
        screenType={ScreenType}
        //  submitResponse={submitResponse}
      />
    ),

    vertical: (
      <VerticalQuestions
        data={data}
        screenType={ScreenType}
        //  submitResponse={submitResponse}
      />
    ),

    horizontal: (
      <HorizontalQuestions
        data={data}
        screenType={ScreenType}
        //  submitResponse={submitResponse}
      />
    ),

    verticalwithsymbols: (
      <VerticalWithSymbolsQuestions
        data={data}
        screenType={ScreenType}
        // submitResponse={submitResponse}
      />
    ),

    questiontextimages: (
      <QuestionTextWithImagesQuestions
        data={data}
        screenType={ScreenType}
        // submitResponse={submitResponse}
      />
    ),

    place_value_table_select: (
      <PlaceValueTableSelectQuestions
        data={data}
        screenType={ScreenType}
        // submitResponse={submitResponse}
      />
    ),

    randomarrangementdragdrop: (
      <RandomArrangementDragDropQuestions
        data={data}
        screenType={ScreenType}
        // submitResponse={submitResponse}
      />
    ),

    matchobjectsvertical: (
      <MatchObjectsVerticalQuestions
        data={data}
        screenType={ScreenType}
        // submitResponse={submitResponse}
      />
    ),

    hundreds_chart: (
      <HundredsChartQuestions
        data={data}
        screenType={ScreenType}
        // submitResponse={submitResponse}
      />
    ),

    horizontalpicture: (
      <HorizontalPictureQuestions
        data={data}
        screenType={ScreenType}
        //  submitResponse={submitResponse}
      />
    ),

    long_multiplication: (
      <LongMultiplicationQuestions
        data={data}
        screenType={ScreenType}
        // submitResponse={submitResponse}
      />
    ),

    logical_table_kg: (
      <LogicalTableKgQuestions
        data={data}
        screenType={ScreenType}
        //  submitResponse={submitResponse}
      />
    ),

    count_tenframes_multiple: (
      <CountTenFramesMultipleQuestions
        data={data}
        screenType={ScreenType}
        // submitResponse={submitResponse}
      />
    ),

    "Multiple choice": (
      <MultipleChoiceQuestions
        data={data}
        screenType={ScreenType}
        // submitResponse={submitResponse}
      />
    ),

    "True/False": (
      <TrueFalseQuestions
        data={data}
        screenType={ScreenType}
        //  submitResponse={submitResponse}
      />
    ),

    "Fill in the blanks": (
      <FillInTheBlanksQuestions
        data={data}
        screenType={ScreenType}
        //  submitResponse={submitResponse}
      />
    ),

    "multi select": (
      <MultiSelectQuestions
        data={data}
        screenType={ScreenType}
        //  submitResponse={submitResponse}
      />
    ),

    memory_card_game: (
      <MemoryCardGame
        data={data}
        screenType={ScreenType}
        //  submitResponse={submitResponse}
      />
    ), // Not completed need to send response back

    orc: (
      <ORCHtmlCheck
        data={data}
        screenType={ScreenType}

        // submitResponse={submitResponseForSplTypesQuestions}
      />
    ),

    oprc: (
      <OPRCHtmlCheck
        data={data}
        screenType={ScreenType}
        // submitResponse={submitResponseForSplTypesQuestions}
      />
    ),

    ol: (
      <OLHtmlCheck
        data={data}
        screenType={ScreenType}
        // submitResponse={submitResponseForSplTypesQuestions}
      />
    ),

    number_bond: (
      <NumberBondQuestions
        data={data}
        screenType={ScreenType}
        // submitResponse={submitResponse}
      />
    ), //completed but check submit response
  };

  const [newData, setNewData] = useState(false);

  useEffect(() => {
    setNewData(true);
  }, [data]);

  return (
    <>
      {/* <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: whiteboardOpen ? 99 : 0,
        }}
      >
        {whiteboardOpen && (
          <WhiteboardQuiz
            ref={whiteboardQuizRef}
            onSendWhiteBoardLines={props.onSendWhiteBoardLines}
            whiteboardPoints={whiteboardPoints}
          />
        )}
      </View> */}
      <ScrollView style={{ backgroundColor: "white" }}>
        {!props.quizCompleted ? (
          <View>
            <View
              style={{
                flex: 1,
                backgroundColor: "#ffdd63",
                width: "100%",
                height: "100%",
                minHeight: 700,
              }}
            >
              <View
                style={{
                  margin: "auto",
                  width: "90%",
                  height: "90%",
                  marginTop: normalize(20),
                  marginLeft: normalize(20),
                  backgroundColor: "white",
                  borderRadius: 10,
                }}
              >
                {isHaveQuestionData == false && data == "" ? (
                  <View></View>
                ) : isHaveQuestionData == false && data != "" ? (
                  <View
                    style={{
                      position: "absolute",
                      top: SCREEN_HEIGHT / 3,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: 20,
                      }}
                    >
                      {" "}
                      {data?.message}
                    </Text>
                  </View>
                ) : newData ? (
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
              questionText={"Your Score is"}
              conceptName={props?.conceptName}
              conceptTag={props?.conceptTag}
              userId={userId}
            />
          </View>
        )}
      </ScrollView>
    </>
  );
});

export default FlagQuestionMathZoneHome;
