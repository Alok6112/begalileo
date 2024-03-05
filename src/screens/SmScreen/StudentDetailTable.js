import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import * as Constants from "../../components/helpers/Constants";
const StudentDetailTable = ({ studentData }) => {
  return (
    <ScrollView
      style={{
        width: "100%",
        alignSelf: "center",
      }}
    >
      {studentData.map((item, index) => {
        return (
          <View>
            <View key={index}>
              <View style={styles.mainContainer}>
                <View >
                  <Text style={[styles.textStyle]}>Name:</Text>
                </View>
                <View>
                  <Text style={styles.rightSideStyle}>{item.student_name}</Text>
                </View>
              </View>
              <View style={styles.mainContainer}>
                <View>
                  <Text style={[styles.textStyle]}>Current Grade:</Text>
                </View>
                <View>
                  <Text style={styles.rightSideStyle}>{item.grade}</Text>
                </View>
              </View>
              <View style={styles.mainContainer}>
                <View>
                  <Text style={[styles.textStyle]}>Date Of Birth:</Text>
                </View>
                <View>
                  <Text style={styles.rightSideStyle}>{item.dob}</Text>
                </View>
              </View>
              <View style={styles.mainContainer}>
                <View>
                  <Text style={[styles.textStyle]}>Curriculum:</Text>
                </View>
                <View>
                  <Text style={styles.rightSideStyle}>{item.curriculum}</Text>
                </View>
              </View>
              <View style={styles.mainContainer}>
                <View>
                  <Text style={[styles.textStyle]}>Parent Name:</Text>
                </View>
                <View>
                  <Text style={styles.rightSideStyle}>{item.parent_name}</Text>
                </View>
              </View>
              <View style={styles.mainContainer}>
                <View>
                  <Text style={[styles.textStyle]}>Parent Email:</Text>
                </View>
                <View>
                  <Text style={styles.rightSideStyle}>{item.parent_email}</Text>
                </View>
              </View>
              <View style={styles.mainContainer}>
                <View>
                  <Text style={[styles.textStyle]}>Product Subscribed:</Text>
                </View>
                <View>
                  <Text style={styles.rightSideStyle}>
                    {item.product_subscribed}
                  </Text>
                </View>
              </View>
              <View style={styles.mainContainer}>
                <View>
                  <Text style={[styles.textStyle]}>Date Of Join:</Text>
                </View>
                <View>
                  <Text style={styles.rightSideStyle}>{item.date_of_join}</Text>
                </View>
              </View>
              <View style={styles.mainContainer}>
                <View>
                  <Text style={[styles.textStyle]}>Teacher's Name:</Text>
                </View>
                <View>
                  <Text style={styles.rightSideStyle}>{item.teacher_name}</Text>
                </View>
              </View>
              <View style={styles.mainContainer}>
                <View>
                  <Text style={[styles.textStyle]}>Time Zone:</Text>
                </View>
                <View>
                  <Text style={styles.rightSideStyle}>{item.tim_zone}</Text>
                </View>
              </View>
              <View style={styles.mainContainer}>
                <View>
                  <Text style={[styles.textStyle]}>Country:</Text>
                </View>
                <View>
                  <Text style={styles.rightSideStyle}>{item.country}</Text>
                </View>
              </View>
              <View style={styles.mainContainer}>
                <View>
                  <Text style={[styles.textStyle]}>Subcription:</Text>
                </View>
                <View>
                  <Text style={styles.rightSideStyle}>{item.subscription}</Text>
                </View>
              </View>
              <View style={styles.mainContainer}>
                <View>
                  <Text style={[styles.textStyle]}>Academic Manager:</Text>
                </View>
                <View>
                  <Text style={styles.rightSideStyle}>
                    {item.academic_manager}
                  </Text>
                </View>
              </View>
              <View style={styles.mainContainer}>
                <View>
                  <Text style={[styles.textStyle]}>Status:</Text>
                </View>
                <View>
                  <Text style={styles.rightSideStyle}>{item.status}</Text>
                </View>
              </View>
              <View style={styles.mainContainer}>
                <View>
                  <Text style={[styles.textStyle]}>Batch Type:</Text>
                </View>
                <View>
                  <Text style={styles.rightSideStyle}>{item.batch_type}</Text>
                </View>
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: Constants.Montserrat_Bold,
                  alignSelf: "center",
                  fontSize: 20,
                }}
              >
                LOGIN CREDENTIALS
              </Text>

              <View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={[styles.textStyle]}>User Name:</Text>
                  <Text style={styles.rightSideStyle}>{item.student_user_name}</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={[styles.textStyle]}>Password:</Text>
                  <Text style={styles.rightSideStyle}>{item.password}</Text>
                </View>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    
  },
  titleStyle: {
    color: "#4D4D4D",
    backgroundColor: "#EFEFEF",
  },
  textStyle: {
    fontFamily: Constants.Montserrat_Bold,
    fontSize: 14,
  },
  rightSideStyle: {
    fontFamily: Constants.Montserrat_Regular,
  },
});
export default StudentDetailTable;
