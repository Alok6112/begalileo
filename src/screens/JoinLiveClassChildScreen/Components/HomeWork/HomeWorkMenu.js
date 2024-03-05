import React from "react";

import { View, Text } from "react-native";

import { useEffect, useState } from "react";

import { normalize } from "react-native-elements";
import { CommonStyles } from "../../../../config/styles";
import { BASE_URL } from "../../../../config/configs";

import HomeWorkMathZone from "./HomeWorkMathZone";

export default function HomeWorkMenu(props) {
  const [showQuestion, setShowQuestion] = useState(false);
  const [data, setData] = useState(new Array(0).fill(0).map((_) => {}));

  useEffect(() => {
    if (props?.identity === "tutor") return;
  }, [props?.showFlagQuestion]);

  const getStudentSHomeWorkDetail = async (liveClassId) => {
    let url = `${BASE_URL}/app_teachers/view_homeworks?live_class_id=
      ${liveClassId}`;

    const response = await fetch(url).catch((ae) => {
      console.log("Fetch Error ", ae);
    });

    const json = await response.json();

    if (json != undefined) {
      return json;
    }
  };

  const fetchStudentDetais = async () => {
    let liveClassID = props?.liveClassId;

    let data = await getStudentSHomeWorkDetail(liveClassID);

    data = groupingData(data?.homework_data);

    if (typeof data != undefined && data && data.length) {
      setData(data);
    }
  };
  useEffect(() => {
    fetchStudentDetais();
  }, []);

  const groupingData = (data) => {
    // data = data.homework_data;
    data = data || [];

    data?.sort((a, b) => a.student_id - b.student_id);
    let arr = [];
    for (let item of data) {
      if (arr.length < 1) arr.push({ ...item });
      else {
        if (arr[arr?.length - 1]?.student_id === item?.student_id) {
          arr[arr.length - 1].mathzone = [
            ...arr[arr.length - 1].mathzone,
            ...item.mathzone,
          ];
          // arr[arr.length - 1].workbook = [
          //   ...arr[arr.length - 1].workbook,
          //   ...item.workbook,
          // ];
          arr[arr.length - 1].coding = [
            ...arr[arr.length - 1].coding,
            ...item.coding,
          ];
        } else {
          arr.push({ ...item });
        }
      }
    }

    return [...arr];
  };

  useEffect(() => {
    if (props?.homeWorkCurrentQuestion == undefined) {
    } else {
    }
  }, [props?.homeWorkCurrentQuestion, props?.homeWorkId, props?.liveClassId]);

  return (
    <View>
      <>
        {props?.displayHomeWorkQuestion ? (
          <HomeWorkMathZone
            liveClassId={props?.liveClassId}
            identity={props?.identity}
            homeWorkId={props?.homeWorkId}
            tagQuizId={props?.tagQuizId}
            homeWorkCurrentQuestion={props.homeWorkCurrentQuestion}
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
                    Home Work Questions
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
                      padding: normalize(10),
                      marginLeft: normalize(10),
                    }}
                  >
                    {data?.length > 0 ? (
                      <>
                        {data?.map((item, i) => {
                          return (
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                              key={item?.student_id || i}
                            >
                              <View>
                                <Text
                                  style={[
                                    CommonStyles.text_14_bold,
                                    { color: "indigo" },
                                  ]}
                                >
                                  {item?.name}
                                </Text>
                              </View>
                              <View
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  width: 800,
                                  height: 500,
                                  borderColor: "black",
                                  borderRadius: 10,
                                }}
                              >
                                <View>
                                  {item.mathzone?.length > 0 && (
                                    <>
                                      <Text style={{ padding: normalize(10) }}>
                                        Math Zone
                                      </Text>
                                      {item?.mathzone?.map((mathzone, id) => {
                                        return (
                                          <View
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                              justifyContent: "space-between",
                                              alignItems: "center",
                                              padding: normalize(10),
                                            }}
                                          >
                                            <View style={{ flexBasis: "25%" }}>
                                              <Text>Topic</Text>
                                              <Text>{mathzone?.topic}</Text>
                                            </View>
                                            <View style={{ flexBasis: "25%" }}>
                                              <Text>Sub Topic</Text>
                                              <Text>{mathzone?.sub_topic}</Text>
                                            </View>
                                            <View style={{ flexBasis: "25%" }}>
                                              <Text>Score</Text>
                                              <Text>
                                                {mathzone?.score ?? "N/A"}
                                              </Text>
                                            </View>
                                            <View style={{ flexBasis: "25%" }}>
                                              <Text>Status</Text>
                                              <Text>{mathzone?.status}</Text>
                                            </View>
                                          </View>
                                        );
                                      })}
                                    </>
                                  )}
                                </View>
                                <View>
                                  {item?.workbook?.length > 0 && (
                                    <>
                                      <Text style={{ padding: normalize(10) }}>
                                        WorkBook
                                      </Text>
                                      {item?.workbook?.map((workbook, id) => {
                                        return (
                                          <View
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                              justifyContent: "space-between",
                                              alignItems: "center",
                                              padding: normalize(10),
                                            }}
                                          >
                                            <View style={{ flexBasis: "25%" }}>
                                              <Text>Chapter</Text>
                                              <Text>{workbook?.chapter}</Text>
                                            </View>
                                            <View style={{ flexBasis: "25%" }}>
                                              <Text>From</Text>
                                              <Text>{workbook?.from_page}</Text>
                                            </View>
                                            <View style={{ flexBasis: "25%" }}>
                                              <Text>To</Text>
                                              <Text>
                                                {workbook?.to_page ?? "N/A"}
                                              </Text>
                                            </View>
                                            <View style={{ flexBasis: "25%" }}>
                                              <Text>Due Date</Text>
                                              <Text>{workbook?.due_date}</Text>
                                            </View>
                                          </View>
                                        );
                                      })}
                                    </>
                                  )}
                                </View>

                                <View>
                                  {item?.coding?.length > 0 && (
                                    <>
                                      <Text style={{ padding: normalize(10) }}>
                                        Coding
                                      </Text>
                                      {item?.coding?.map((coding, id) => {
                                        return (
                                          <View
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                              justifyContent: "space-between",
                                              alignItems: "center",
                                              padding: normalize(10),
                                            }}
                                          >
                                            <View style={{ flexBasis: "25%" }}>
                                              <Text>Coding</Text>
                                              <Text>{coding?.coding}</Text>
                                            </View>
                                            <View style={{ flexBasis: "25%" }}>
                                              <Text>Class Title</Text>
                                              <Text>{coding?.class_title}</Text>
                                            </View>
                                            <View style={{ flexBasis: "25%" }}>
                                              <Text>Due Date</Text>
                                              <Text>{coding?.class_title}</Text>
                                            </View>
                                          </View>
                                        );
                                      })}
                                    </>
                                  )}
                                </View>
                              </View>
                            </View>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        <View>
                          <Text>No HomeWork found...</Text>
                        </View>
                      </>
                    )}
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
