/* eslint-disable */
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import { connect } from "react-redux";
import firebase from "../screens/SmScreen/AppChat/Firebase/firebaseConfig";
import * as Constants from "./helpers/Constants";
import { COLOR, CommonStyles } from "../config/styles";
import { IC_PROFILE_PIC, IMG_SARTHAK, IMG_SHAKSHI } from "../assets/images";
import { updateCurrentKid, updateCurrentUserRole } from "../actions/dashboard";
import * as Config from "../config/configs";
import Icon from "react-native-vector-icons/FontAwesome";
import { normalize, Card } from "react-native-elements";
import { showMessage } from "react-native-flash-message";
import LottieView from "lottie-react-native";
import { lottie_liquid_transition } from "../assets/lottieAssets";
import { AddUser } from "../screens/SmScreen/AppChat/Firebase/Users";
import ChatFloatingButton from "./ChatFloatingButton";
import { LoginUser } from "../screens/SmScreen/AppChat/Firebase/LoginUser";
import { getLocalData } from "./helpers/AsyncMethods";

class DashboardHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allKidsList: [],
      selectedKid: 0,
      isEnabled: false,
      unReadFireabaseMessageCount: {},
    };
  }

  componentDidMount() {
    this._isMounted = true;

    getLocalData(Constants.ParentEmail).then((res) => {
      let email = res.trim().split("");
      email.shift();
      email.pop();

      firebase
        .auth()
        .signInWithEmailAndPassword(email.join(""), email.join(""))
        .then(async (data) => {})
        .catch((err) => {
          console.log("error while login in firebase", err);
        });
    });

    if (this.props.state.dashboard_status) {
      this.toggleStatusUpdate();

      let studentsLength = this.props.state.dashboard_response.students.length;

      if (studentsLength >= 1) {
        let sm_id = this.props.state.dashboard_response.students[0]?.sm_id;
        let student_id =
          this.props.state.dashboard_response.students[0]?.student_id;
       
        this.listenForFirebaseMessagess(student_id, sm_id);
      }

      this.setState({
        allKidsList: this.props.state.dashboard_response.students,
      });
      if (this.props.currentSelectedKid == undefined) {
        this.props.updateCurrentKid(
          this.props.state.dashboard_response.students[0]
        );
      }

      if (this.props.current_selected_role == undefined) {
        this.props.updateCurrentUserRole(Constants.PARENT);
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
        if (prevProps.current_selected_role != this.props.current_selected_role) {
      this.toggleStatusUpdate();
    }

    if (prevProps.triggerToggle != this.props.triggerToggle) {
      if (this.props.triggerToggle) {
        this.toggleSwitch();
      }
    }

    if (
      prevState.kidIdForFirebase != this.state.kidIdForFirebase &&
      prevState.smIdForFirebase != this.state.smIdForFirebase
    ) {
      this.listenForFirebaseMessagess(
        this.state.kidIdForFirebase,
        this.state.smIdForFirebase
      );
    }
  }

  listenForFirebaseMessagess = (student_id, sm_id) => {
    let studentID = student_id;
  
    let smId = sm_id;



    if (studentID && smId) {

      firebase
        .database()
        .ref("messages")
        .child(smId)
        .child(studentID)
        .orderByKey()
        .on("value", (dataSnapshots) => {
          let count = 0;

          if (dataSnapshots != null) {
            if (dataSnapshots.val()) {
              dataSnapshots.forEach((child) => {
                if (
                  !child.val()?.messege?.read &&
                  child.val()?.messege?.reciever == studentID
                ) {
                  console.log("count increase");
                  count++;
                }
              });
            }
          }

          

          const updatedCounts = { ...this.state.unReadFireabaseMessageCount };

          if (updatedCounts.hasOwnProperty(studentID)) {
            updatedCounts[studentID] = count;
          } else {
            updatedCounts[studentID] = count;
          }

          this.setState({
            unReadFireabaseMessageCount: updatedCounts,
          });
        });
    }
  };

  toggleStatusUpdate = () => {
    if (this.props.current_selected_role == Constants.CHILD)
      this.setState({
        isEnabled: true,
      });
    else
      this.setState({
        isEnabled: false,
      });
  };

  toggleSwitch = () => {
    if (
      this.props.currentSelectedKid.paid_status ||
      this.props.currentSelectedKid.demo_confirmed
    ) {
      this.setState(
        {
          isEnabled: !this.state.isEnabled,
        },
        () => this.changeAppRole()
      );
    } else {
      showMessage({
        message: "Child view available only for paid subscription",
        type: "info",
      });
    }
  };

  changeAppRole = () => {
    if (this.state.isEnabled) this.props.updateCurrentUserRole(Constants.CHILD);
    else this.props.updateCurrentUserRole(Constants.PARENT);
  };

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.currentSelectedKid != undefined) {
      if (nextProps.currentSelectedKid.student_id !== state.selectedKid) {
        return {
          selectedKid: nextProps.currentSelectedKid.student_id,
        };
      }
    }

    return null;
  }

  changeCurrentKid = (kid) => {
   console.log("kid", kid);
    this.setState({
      kidIdForFirebase: kid.student_id,
      smIdForFirebase: kid.sm_id,
    });

    if (!kid.paid_status) {
      this.setState({
        isEnabled: false,
      });
      this.props.updateCurrentUserRole(Constants.PARENT);
    }

    if (kid.student_id == this.state.selectedKid) return;
    else this.props.updateCurrentKid(kid);
  };

  checkProfileCompleteness = () => {
    var profile_not_completed = false;

    let details = this.props.dashboardResponse.parent_details[0];
    if (details.first_name == "") profile_not_completed = true;
    // if (details.last_name == "")
    //     profile_not_completed = true;
    if (details.email == "") profile_not_completed = true;
    if (details.mobile == "") profile_not_completed = true;

    return profile_not_completed;
  };

  onPressCompleteProfile = () => {
    this.props.navigation.navigate(Constants.MoreProfileScreen, {
      updateNotify: true,
    });
  };

  checkingStudentDataInFirebase = (studentData) => {
    let result = false;
    firebase
      .database()
      .ref("users")
      .on("value", (datasnapshot) => {
        datasnapshot.forEach((child) => {
          if (child.val().UserId == studentData.student_id) {
            result = true;
          }
        });
      });

    return result;
  };
  checkingSmDataInFirebase = (studentData) => {
    let result = false;
    firebase
      .database()
      .ref("users")
      .on("value", (datasnapshot) => {
        datasnapshot.forEach((child) => {
          if (child.val().UserId == studentData.sm_id) {
            result = true;
          }
        });
      });

    return result;
  };
  onClickFloatingButton = async (studentData) => {
    let result = this.checkingStudentDataInFirebase(studentData);
    let result2 = this.checkingSmDataInFirebase(studentData);
    if (result && result2) {
      this.props.navigation.navigate(Constants.ChatScreen, {
        currentUid: studentData.student_id,
        guestUid: studentData.sm_id,
        UserName: studentData.sm_name,
        currentUserName: `${studentData.first_name} ${studentData.last_name}`,
        fcmTokenId: studentData.sm_id,
        role: "Student",
      });
    } else {
      AddUser(studentData.first_name, "", "", studentData.student_id);
      AddUser(studentData.sm_name, "", "", studentData.sm_id);
      this.props.navigation.navigate(Constants.ChatScreen, {
        currentUid: studentData.student_id,
        guestUid: studentData.sm_id,
        UserName: studentData.sm_name,
        currentUserName: `${studentData.first_name} ${studentData.last_name}`,
        fcmTokenId: studentData.sm_id,
        role: "Student",
      });
    }
  };

  render() {
    const {
      headerTitle,
      headerDescription,
      current_selected_role,
      currentSelectedKid,
    } = this.props;
    const { allKidsList, selectedKid, parentName, isEnabled } = this.state;

    const kidList = allKidsList.map((kid, index) => {
      return (
        <View
          style={{
            marginTop: normalize(20),
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
          key={kid.student_id}
        >
          <View
            style={{
              display: "flex",
              alignSelf: "flex-end",
              position: "absolute",
              top: -20,
              zIndex: 1,
            }}
          >
                       {this.props?.paidStudentName != "" &&
            this.props?.paidStudentName === kid.name ? (
              <ChatFloatingButton
                isVisible={true}
                onClickChat={() => this.onClickFloatingButton(kid)}
                count={
                  this.state.unReadFireabaseMessageCount.hasOwnProperty(kid.student_id.toString())
                    ? this.state.unReadFireabaseMessageCount[kid.student_id.toString()]
                    : 0
                }
              />
            ) : (
              <View style={{ opacity: 0 }}>
                {/* <ChatFloatingButton onClickChat={() => {}} /> */}
              </View>
            )}
          </View>
          <TouchableOpacity
            style={
              kid.student_id == selectedKid
                ? styles.kidContainerSelected
                : styles.kidContainer
            }
            onPress={() => this.changeCurrentKid(kid)}
          >
            <Image
              style={{
                borderRadius: 100,
                height: normalize(40),
                width: normalize(40),
                resizeMode: "stretch",
              }}
              source={{ uri: kid.photo }}
            />
            <Text
              style={[
                CommonStyles.text_14_bold,
                { alignSelf: "center", marginStart: 10, marginEnd: 20 },
              ]}
            >
              {kid.name}
              <View></View>
            </Text>
          </TouchableOpacity>
        </View>
      );
    });

    return (
      <View style={styles.container}>
        <View style={{ marginTop: normalize(10), marginStart: normalize(5) }}>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              flexDirection: "row",
              alignContent: "center",
            }}
          >
            <View style={{ justifyContent: "center" }}>
              <Text
                style={[
                  CommonStyles.text_18_semi_bold,
                  { color: COLOR.TEXT_COLOR_BLUE },
                ]}
              >
                {headerTitle}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={[CommonStyles.text_12_Regular, { marginEnd: 10 }]}>
                  {headerDescription}
                </Text>

                {this.props.dashboardStatus &&
                  this.checkProfileCompleteness() && (
                    <Pressable onPress={this.onPressCompleteProfile}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                        }}
                      >
                        <View
                          style={{
                            height: 30,
                            width: 30,
                            justifyContent: "center",
                            backgroundColor: COLOR.RED,
                            borderRadius: 20,
                          }}
                        >
                          <Icon
                            style={{ marginStart: 12 }}
                            size={15}
                            name="exclamation"
                            color={COLOR.WHITE}
                          />
                        </View>

                        {/* <Text style={[CommonStyles.text_11_semi_bold, { marginStart: 10, color: COLOR.BLACK, paddingVertical: 8 }]}>Complete your profile</Text> */}
                      </View>
                    </Pressable>
                  )}
              </View>
            </View>

            {this.props.dashboardStatus && currentSelectedKid && (
              <View style={{ marginEnd: 20 }}>
                <Text
                  style={[
                    CommonStyles.text_6_regular,
                    { textAlign: "center", marginBottom: 2 },
                  ]}
                >
                  Parent
                </Text>
                <Switch
                  style={{
                    transform: [
                      { scaleX: 0.7 },
                      { scaleY: 0.6 },
                      { rotate: "90deg" },
                    ],
                  }}
                  trackColor={{ false: COLOR.BLUE, true: COLOR.BLUE }}
                  thumbColor={isEnabled ? COLOR.WHITE : COLOR.WHITE}
                  ios_backgroundColor={COLOR.ORANGE}
                  onValueChange={this.toggleSwitch}
                  value={isEnabled}
                />
                <Text
                  style={[
                    CommonStyles.text_6_regular,
                    { textAlign: "center", marginTop: 2 },
                  ]}
                >
                  Child
                </Text>
              </View>
            )}
          </View>
        </View>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          style={{
            flexDirection: "row",
            marginBottom: normalize(10),
            marginStart: 10,
          }}
        >
          {kidList}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.dashboard,
    currentSelectedKid: state.dashboard.current_selected_kid,
    current_selected_role: state.dashboard.current_selected_role,
    dashboardStatus: state.dashboard.dashboard_status,
    dashboardResponse: state.dashboard.dashboard_response,
  };
};

const mapDispatchToProps = {
  updateCurrentKid,
  updateCurrentUserRole,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.WHITE,
  },

  textHeader: {
    fontSize: 15,
    textAlign: "left",
    color: COLOR.TEXT_COLOR_BLUE,
    marginTop: 10,
    marginBottom: 5,
    fontFamily: "Montserrat-SemiBold",
  },
  textLighter: {
    fontSize: 13,
    textAlign: "left",
    marginTop: 10,
    marginBottom: 5,
    color: COLOR.TEXT_COLOR_BLUE,
    fontFamily: "Montserrat-Regular",
  },
  kidContainer: {
    flexDirection: "row",

    borderRadius: 30,
    padding: normalize(3),
  },
  kidContainerSelected: {
    flexDirection: "row",

    backgroundColor: COLOR.KID_SELECTED,
    borderRadius: 30,
    padding: normalize(3),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader);
