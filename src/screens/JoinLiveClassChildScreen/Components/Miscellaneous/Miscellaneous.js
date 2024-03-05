import React from "react";
import { View, Text } from "react-native";
import FlagQuestionMenu from "../FlagQuestion/FlagQuestionMenu";
import FlagQuestion from "../FlagQuestion/FlagQuestionMenu";
import HomeWorkMenu from "../HomeWork/HomeWorkMenu";
function Miscellaneous(props) {
  const {
    miscellaneousId,
    flagQuestionLevel,
    identity,
    selectedTagId,
    selectedConceptId,
    conceptTag,
    conceptName,
    flagQuestionConceptList,
    showFlagQuestion,
    liveClassId,
    currentFlagQuestion,
    currentHomeWorkQuestion,
    homeworkTagQuizId,
    homeWorkId,
    displayHomeWorkQuestion,
    userId,
    quizId,
    homeWorkCurrentQuestion,
    flagQuestionMarksAsCompleted,
    fetchFlaggedQuestionList,
  } = props;

  return (
    <>
      {miscellaneousId === 0 ? (
        <FlagQuestionMenu
          level={flagQuestionLevel}
          conceptName={conceptName}
          conceptId={selectedConceptId}
          identity={identity}
          flagTagName={conceptTag}
          flagTagId={selectedTagId}
          flaggedConceptList={flagQuestionConceptList}
          showFlagQuestion={showFlagQuestion}
          liveClassId={liveClassId}
          currentFlagQuestion={currentFlagQuestion}
          flagQuestionMarksAsCompleted={flagQuestionMarksAsCompleted}
          fetchFlaggedQuestionList={fetchFlaggedQuestionList}
        />
      ) : miscellaneousId === 1 ? (
        <HomeWorkMenu
          identity={identity}
          displayHomeWorkQuestion={displayHomeWorkQuestion}
          homeWorkCurrentQuestion={homeWorkCurrentQuestion}
          quizId={homeworkTagQuizId}
          liveClassId={liveClassId}
          userId={userId}
          studentHomeWorkId={homeWorkId}
          homeWorkId={homeWorkId}
          tagQuizId={quizId}
        />
      ) : (
        <></>
      )}
    </>
  );
}

export default Miscellaneous;
