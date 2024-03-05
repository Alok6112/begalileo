import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import { DataTable } from "react-native-paper";

import { getLocalData } from "../../components/helpers/AsyncMethods";

import * as Constants from "../../components/helpers/Constants";

import { CommonStyles, COLOR } from "../../config/styles";
import { normalize } from "react-native-elements";

import axios from "axios";

import { BASE_URL } from "../../config/configs";
import { showMessage } from "react-native-flash-message";

export default function StudentDetails({ props, teacherName }) {
  const [studentsData, setStudentsData] = useState([]);
  const [teacherId, setTeacherId] = useState();

  useEffect(() => {
    getTeacherUserId();
  }, [teacherId]);

  useEffect(() => {
    if (teacherId) {
      getInitialStudentsData(teacherId);
    }
  }, [teacherId]);

  const getTeacherUserId = async () => {
    let teacher_id = await getLocalData(Constants.ParentUserId);

    setTeacherId(JSON.parse(teacher_id));
  };

  const getInitialStudentsData = (teacherId) => {
    axios
      .get(`${BASE_URL}core_skills/list_core_skill_students`, {
        params: {
          teacher_id: teacherId,
        },
      })
      .then((res) => {
        if (res.data.status) {
          setStudentsData(res.data.core_skill_data);
        }
      })
      .catch((error) => {
        console.log(error.message, "error");
      });
  };

  const viewKidUploadFiles = (weekData) => {
    if (!weekData?.attachments) {
      showMessage({
        message: "No attachment found for this week",
        type: "danger",
      });
      return;
    }
    props.navigation.navigate(Constants.STUDENT_WEEK_DATA, {
      allData: weekData,
    });
  };

  const viewKidChatHistory = (student_id) => {
    props.navigation.navigate(Constants.STUDENT_CHAT_DATA, {
      student_id: student_id,
      teacher_id: teacherId,
    });
  };

  return (
    <View style={{ width: "100%", maxHeight: 700 }}>
      <ScrollView>
        <DataTable>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* <ScrollView horizontal={true}> */}
            <DataTable.Header>
              <DataTable.Title>
                <Text style={[CommonStyles.text_12_bold]}>Student</Text>
              </DataTable.Title>

              {studentsData[0]?.weeks_data?.map((week) => {
                return (
                  <DataTable.Title>
                    <Text style={[CommonStyles.text_12_bold]}>
                      W - {week?.week}
                    </Text>
                  </DataTable.Title>
                );
              })}

              <DataTable.Title
                style={{
                  justifyContent: "center",
                }}
              >
                <Text style={[CommonStyles.text_12_bold]}>Chats</Text>
              </DataTable.Title>
            </DataTable.Header>
            {/* </ScrollView> */}
          </View>

          {studentsData?.map((student) => {
            return (
              <View>
                <DataTable.Row>
                  <DataTable.Cell>
                    <Text>{student.name}</Text>
                  </DataTable.Cell>

                  {student?.weeks_data.map((item) => {
                    return (
                      <>
                        <DataTable.Cell
                          numeric
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => viewKidUploadFiles(item)}
                          >
                            <Text style={{ color: "blue" }}>
                              {item.attachments ? "View Details" : "-"}
                            </Text>
                          </TouchableOpacity>
                        </DataTable.Cell>
                      </>
                    );
                  })}

                  <DataTable.Cell
                    numeric
                    style={{
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => viewKidChatHistory(student.student_id)}
                    >
                      <Text style={{ color: student.chat ? "blue" : "black" }}>
                        {student.chat ? "View Chats" : "-"}
                      </Text>
                    </TouchableOpacity>
                  </DataTable.Cell>
                </DataTable.Row>
              </View>
            );
          })}
        </DataTable>
      </ScrollView>
    </View>
  );
}
