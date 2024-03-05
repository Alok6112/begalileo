import React from "react";

import { View, Text } from "react-native";

import { useEffect, useState } from "react";

import { BASE_URL } from "../../../../config/configs";

import FlagQuestionMathZone from "./FlagQuestionMathZone";
import { normalize } from "react-native-elements";
import { CommonStyles } from "../../../../config/styles";

export default function FlagQuestionMenu(props) {
  const [selectedTagId, setSelectedTagId] = useState("");
  const [selectedConceptId, setSelectedConceptId] = useState("");
  const [selectedTagName, setSelectedTagName] = useState("");
  const [selectedConceptName, setSelectedConceptName] = useState("");
  const [showQuestion, setShowQuestion] = useState(false);

  useEffect(() => {
    if (props?.identity === "tutor") return;
    setShowQuestion(props?.showFlagQuestion || false);
    setSelectedConceptId(props?.conceptId || "");
    setSelectedTagId(props?.flagTagId || "");
    setSelectedTagName(props?.flagTagName);
    setSelectedConceptName(props?.conceptName);
  }, [props?.showFlagQuestion]);

  // useEffect(() => {
  //   if (props?.flagQuestionMarksAsCompleted) {
  //     getFlagQuestionConceptList();
  //   }
  // }, [props?.flagQuestionMarksAsCompleted]);

  // const getFlagQuestionConceptListApi = async (liveClassID) => {
  //   let url = `${BASE_URL}/app_teachers/flagged_concepts?live_class_id=
  //   ${liveClassID}`;

  //   const response = await fetch(url).catch((ae) => {});

  //   const json = await response.json();

  //   if (json != undefined) {
  //     return json;
  //   }
  // };

  // const getFlagQuestionConceptList = async () => {
  //   let liveId = props?.liveClassId;
  //   const data = await getFlagQuestionConceptListApi(liveId);

  //   setFlagQuestionConceptList(data?.flagged_concepts_data || []);
  // };

  return (
    <View>
      <>
        {showQuestion ? (
          <FlagQuestionMathZone
            {...props}
            conceptId={selectedConceptId}
            flagTagId={selectedTagId}
            flagTagName={selectedTagName}
            conceptName={selectedConceptName}
            liveClassId={props?.liveClassId}
            identity={props?.identity}
            currentFlagQuestion={props?.currentFlagQuestion}
            flagQuestionMarksAsCompleted={props?.flagQuestionMarksAsCompleted}
            fetchFlaggedQuestionList={props?.fetchFlaggedQuestionList}
          />
        ) : (
          <>
            <View>
              <>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBlock: "1rem",
                    fontSize: 22,
                    color: "indigo",
                    alignItems: "center",
                    marginTop: normalize(10),
                  }}
                >
                  <Text
                    style={[CommonStyles.text_16_bold, { color: "indigo" }]}
                  >
                    Flagged Question
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    gap: "1rem",
                    flexWrap: "wrap",
                    marginTop: normalize(30),
                  }}
                >
                  <View
                    style={{
                      borderRadius: 10,
                      padding: normalize(10),
                      marginLeft: normalize(10),
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: 10,
                      flexWrap: "wrap",
                    }}
                  >
                    {props?.flaggedConceptList?.map((concept, i) => (
                      <View
                        style={{
                          borderColor: "black",
                          borderWidth: 1,
                          borderRadius: 10,
                          marginLeft: normalize(20),
                          width: 200,
                          maxWidth: 200,
                          flexWrap: "wrap",
                          height: "auto",
                          padding: normalize(20),
                        }}
                        key={i}
                      >
                        <Text style={[CommonStyles.text_12_bold]}>
                          {concept?.name}
                        </Text>
                        <View>
                          {concept?.tags?.map((tag, i) => (
                            <View key={i}>
                              {props?.identity === "tutor" ? (
                                <Text
                                  style={{ fontWeight: "normal", fontSize: 18 }}
                                  onClick={() =>
                                    handleViewQuestion(
                                      tag?.tag_id,
                                      concept?.sub_concept_id,
                                      tag?.name,
                                      concept?.name
                                    )
                                  }
                                >
                                  {tag?.name}
                                </Text>
                              ) : (
                                <Text style={{ fontWeight: "normal" }}>
                                  {`\u2022 ${tag?.name}`}
                                </Text>
                              )}
                            </View>
                          ))}
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </>
            </View>
          </>
        )}
      </>
    </View>
  );
}
