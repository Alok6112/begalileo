import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import React, { useState } from "react";
import { DataTable } from "react-native-paper";
import { CommonStyles } from "../../config/styles";
import * as Constants from "../../components/helpers/Constants";
import firebase from "./AppChat/Firebase/firebaseConfig";
import { AddUser } from "./AppChat/Firebase/Users";
import { SignUpUser } from "./AppChat/Firebase/SignUp";
import axios from "axios";
import { BASE_URL } from "../../config/configs";
import StudentDetailTable from "./StudentDetailTable";
import { getLocalData } from "../../components/helpers/AsyncMethods";
export default function SmTable({ searchResponse, navigation }) {
  const [studentData, setStudentData] = useState([]);
  const [showStudentTable, setStudentTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handleChatWithStudent = async (student) => {
    let firstName = await getLocalData(Constants.SM_first_name);
    let lastName = await getLocalData(Constants.SM_last_name);
    const stringWithoutQuotes = firstName.replace(/^"|"$/g, "");

    let temp = false;
    firebase
      .database()
      .ref("users")
      .on("value", async (datasnapshot) => {
        datasnapshot.forEach((child) => {
          if (child.val().UserId == student.student_id) {
            temp = true;
          }
        });
      });

    if (temp) {
      navigation.navigate(Constants.ChatScreen, {
        guestUid: student.student_id,
        UserName: student.name,
        fcmTokenId: student.parent_id,
        currentUserName: stringWithoutQuotes,
        role:"SM Manager"
      });
    } else {
    
      AddUser(student.name, "", "", student.student_id, student.parent_id);
      navigation.navigate(Constants.ChatScreen, {
        guestUid: student.student_id,
        UserName: student.name,
        fcmTokenId: student.parent_id,
        currentUserName: stringWithoutQuotes,
        role:"SM Manager"
      });
    }
  };
  const handleSeeStudentDetails = (batchId, studentId) => {
    setLoading(true);
    gettingDataForTable(batchId, studentId);
  };
  const gettingDataForTable = (batch_id, student_id) => {
    axios
      .get(
        `${BASE_URL}app_mathbox/student_details?student_id=${Number(
          student_id
        )}&batch_id=${Number(batch_id)}`
      )
      .then((res) => {
        console.log("res of date of borth", res.data);
        setStudentData(res.data.student_data);
        setModalVisible(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message, "error");
        setLoading(false);
      });
  };
  return (
    <View style={{ width: "100%" }}>
      <DataTable style={{ width: "100%", borderWidth: 0 }}>
        <View style={{ width: "100%" }}>
          <DataTable.Header>
            <DataTable.Title
              style={{
                justifyContent: "center",
                width: "25%",
              }}
            >
              <Text style={[CommonStyles.text_12_bold]}>Name</Text>
            </DataTable.Title>

            <DataTable.Title
              style={{
                justifyContent: "center",
                width: "25%",
              }}
            >
              <Text style={[CommonStyles.text_12_bold]}>Type</Text>
            </DataTable.Title>
            <DataTable.Title
              style={{
                justifyContent: "center",
                width: "25%",
              }}
            >
              <Text style={[CommonStyles.text_12_bold]}>Teachers</Text>
            </DataTable.Title>
            <DataTable.Title
              style={{
                justifyContent: "center",
                width: "25%",
              }}
            >
              <Text style={[CommonStyles.text_12_bold]}>Students</Text>
            </DataTable.Title>
          </DataTable.Header>
        </View>

        <View style={{ height: "75%" }}>
          <ScrollView style={{ height: "100%" }}>
            {searchResponse.length > 0 &&
              searchResponse != null &&
              searchResponse?.map((student, index) => {
                // console.log("student in map", student);
                return (
                  <DataTable.Row style={{ width: "100%" }}>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",

                        padding: 5,

                        width: "25%",
                      }}
                    >
                      <Text style={{ color: "red" }}>{student.batch_name}</Text>
                      <Text>
                        (T:{student.total_classes},C:
                        {student.completed_classes}
                        ,D:{student.demo_classes})
                      </Text>
                    </View>

                    <View
                      style={{
                        display: "flex",

                        // borderWidth: 1,
                        borderColor: "lightgray",
                        width: "25%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ alignSelf: "center" }}>
                        {student.curriculum_type}
                      </Text>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        width: "25%",
                        // borderWidth: 1,
                        borderColor: "lightgray",
                      }}
                    >
                      <Text>{student.teachers}</Text>
                    </View>

                    <View
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        width: "25%",
                      }}
                    >
                      {student.student_data.map((item, index) => {
                      
                        return (
                          <View
                            key={index}
                            style={{
                              display: "flex",

                              width: "100%",
                              marginBottom: 10,
                              borderWidth: 1,
                              borderColor: "lightgray",
                            }}
                          >
                            <Text style={{ marginLeft: 5 }}>{item.name}</Text>
                            <TouchableOpacity
                              onPress={() => handleChatWithStudent(item)}
                            >
                              <Text style={{ color: "green", marginLeft: 5 }}>
                                Chat
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{ width: "100%" }}
                              onPress={() =>
                                handleSeeStudentDetails(
                                  student.batch_id,
                                  item.student_id
                                )
                              }
                            >
                              <Text style={{ color: "#0764A2", marginLeft: 5 }}>
                                Student Details
                              </Text>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                  </DataTable.Row>
                );
              })}
          </ScrollView>
        </View>
      </DataTable>
      {loading && <ActivityIndicator size={26} color="black" />}
      {!loading && modalVisible && (
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{ alignSelf: "flex-end", marginBottom: 20 }}>
                  <Pressable onPress={() => setModalVisible(!modalVisible)}>
                    <Icon name="close" size={40} />
                  </Pressable>
                </View>

                <StudentDetailTable studentData={studentData} />
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "100%",
    width: "100%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
