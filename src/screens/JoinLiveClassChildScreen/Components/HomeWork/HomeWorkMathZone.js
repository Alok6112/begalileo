import React from "react";

import { View, Text } from "react-native";

import { useEffect, useState } from "react";
import { BASE_URL } from "../../../../config/configs";
import HomeWorkMathZoneHome from "./HomeWorkMathZoneHome";

export default function HomeWorkMathZone(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFlagQuestion = async (liveClassID, tagQuizId, homeWorkId) => {
    let url = `${BASE_URL}/app_teachers/homework_review?live_class_id=${liveClassID}&tag_quiz_id=${tagQuizId}&homework_id=${homeWorkId}`;
    const response = await fetch(url).catch((ae) => {
      console.log("Fetch Error ", ae);
    });

    const json = await response.json();

    if (json != undefined) {
      return json;
    }
  };

  const fetchData = async (liveClassId, tagQuizId, homeWorkId) => {
    try {
      setLoading(true);
      const data = await fetchFlagQuestion(liveClassId, tagQuizId, homeWorkId);
      setLoading(false);

      if (data?.status) {
        setData(data?.result_data || []);

        return data?.result_data || [];
      } else {
        setData([]);
        typeof props?.fetchFlaggedQuestionList === "function" &&
          props.fetchFlaggedQuestionList();
      }
      return [];
    } catch (e) {
      setData([]);
      setLoading(false);
      console.log(e);
      typeof props?.fetchFlaggedQuestionList === "function" &&
        props.fetchFlaggedQuestionList();
      return [];
    }
  };

  const studentFetchingDatas = async () => {
    await fetchData(props?.liveClassId, props?.tagQuizId, props?.homeWorkId);
  };

  useEffect(() => {
    if (props.identity !== "tutor") {
      studentFetchingDatas(
        props?.liveClassId,
        props?.tagQuizId,
        props?.homeWorkId
      );
    }
  }, [
    props?.homeWorkCurrentQuestion,
    props?.liveClassId,
    props?.tagQuizId,
    props?.homeWorkId,
  ]);

  return (
    <View>
      <HomeWorkMathZoneHome
        obj={{
          obj: {
            ...data[props?.homeWorkCurrentQuestion],
            question_no: props?.homeWorkCurrentQuestion + 1,
          },
        }}
        loading={loading}
        noQuestionFound={data?.length > 0 ? false : true}
        props={props}
        identity={props?.identity}
      />
    </View>
  );
}
