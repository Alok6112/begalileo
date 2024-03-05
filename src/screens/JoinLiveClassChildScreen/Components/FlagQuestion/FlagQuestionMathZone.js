import React from "react";

import { View, Text } from "react-native";

import { useEffect, useState } from "react";
import { BASE_URL } from "../../../../config/configs";
import FlagQuestionMathZoneHome from "./FlagQuestionMathZoneHome";

export default function FlagQuestionMathZone(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchFlagQuestion = async (conceptId, liveClassID, tagId) => {
    let url = `${BASE_URL}/app_teachers/flagged_questions?sub_concept_id=${conceptId}&tag_id=${tagId}&live_class_id=${liveClassID}`;

    const response = await fetch(url).catch((ae) => {
      console.log("Fetch Error ", ae);
    });

    const json = await response.json();

    if (json != undefined) {
      return json;
    }
  };

  const fetchData = async (conceptId, liveClassId, tagId) => {
    try {
      setLoading(true);
      const data = await fetchFlagQuestion(conceptId, liveClassId, tagId);
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
    if (props?.flagQuestionMarksAsCompleted) {
      console.log("calling");
      await fetchData(props?.conceptId, props?.liveClassId, props?.flagTagId);
    }
  };

  useEffect(() => {
    fetchData(props?.conceptId, props?.liveClassId, props?.flagTagId);

    //props?.getFlagQuestionConceptList;

    return () => {};
  }, [props?.flagQuestionMarksAsCompleted]);

  useEffect(() => {
    if (props.identity !== "tutor") {
      studentFetchingDatas();
    }
  }, [props?.currentFlagQuestion, props?.flagQuestionMarksAsCompleted]);

  return (
    <View>
      <Text>Flag question Math zone</Text>

      <FlagQuestionMathZoneHome
        obj={{
          obj: {
            ...data[props?.currentFlagQuestion],
            question_no: props?.currentFlagQuestion + 1,
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
