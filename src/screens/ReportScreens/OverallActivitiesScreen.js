import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import * as Constants from "../../components/helpers/Constants";
import { CustomBackButton } from "../../components";
import { COLOR, CommonStyles } from "../../config/styles";
import {
  getStudentActivity,
  getStudentActivityOnDates,
} from "../../actions/dashboard";
import { IC_FILTER } from "../../assets/images";
import LinearGradient from "react-native-linear-gradient";
import { addToCart } from "../../actions/dashboard";
import Icon from "react-native-vector-icons/FontAwesome";
import { normalize, Card } from "react-native-elements";
import AcitivityReportList from "./AcitivityReportList";
import ReportFilterBottomDialog from "../../components/ReportFilterBottomDialog";
import moment from "moment";
import { BackHandler } from "react-native";

class OverallActivitiesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classType: "",
      showFilter: false,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    this.props.getStudentActivity(
      this.props.dashboardResponse.parent_id,
      this.props.currentSelectedKid.student_id,
      30
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  onPressBack = () => {
    const { goBack } = this.props.navigation;

    goBack();
  };

  onPressActivityReport = () => {
    this.props.navigation.navigate(Constants.ActivityReportScreen);
  };

  onClickApplyFilter = (fromDate, tillDate) => {
    console.log("From Date " + fromDate);
    console.log("To Date : " + tillDate);
    var start_date = moment(fromDate).format("DD-MM-YYYY");
    var end_date = moment(tillDate).format("DD-MM-YYYY");
    this.props.getStudentActivityOnDates(
      this.props.dashboardResponse.parent_id,
      this.props.currentSelectedKid.student_id,
      start_date,
      end_date
    );

    this.onCloseFilter();
  };

  onClickFilterDays = (daysToFilter) => {
    this.props.getStudentActivity(
      this.props.dashboardResponse.parent_id,
      this.props.currentSelectedKid.student_id,
      daysToFilter
    );
    this.onCloseFilter();
  };

  resetFilters = () => {
    this.props.getStudentActivity(
      this.props.dashboardResponse.parent_id,
      this.props.currentSelectedKid.student_id,
      7
    );
    this.onCloseFilter();
  };

  onCloseFilter = () => {
    this.setState({
      showFilter: false,
    });
  };

  showFilterDialog = () => {
    this.setState({
      showFilter: true,
    });
  };

  render() {
    const { showFilter, classType } = this.state;
    const activityDatas = this.props.studentActivityReport;
    const { loading } = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLOR.WHITE,
        }}
      >
        {loading && (
          <ActivityIndicator
            size="large"
            color="black"
            style={CommonStyles.loadingIndicatior}
          />
        )}
        <ScrollView style={{ marginHorizontal: normalize(10) }}>
          <View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <CustomBackButton onPress={this.onPressBack} />

              <TouchableOpacity
                onPress={this.showFilterDialog}
                style={{ padding: 10 }}
              >
                <Image
                  style={{
                    height: normalize(20),
                    width: normalize(20),
                    resizeMode: "contain",
                    alignSelf: "center",
                  }}
                  source={IC_FILTER}
                />
              </TouchableOpacity>
            </View>

            {this.props.studentActivityStatus && (
              <View>
                <Text
                  style={[
                    CommonStyles.text_18_semi_bold,
                    { color: COLOR.TEXT_COLOR_BLUE, marginTop: normalize(15) },
                  ]}
                >
                  {" "}
                  Overall Activities{" "}
                </Text>
                <View
                  style={{ flexDirection: "row", marginTop: normalize(20) }}
                >
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={[CommonStyles.text_18_bold]}>
                      {activityDatas.problems_solved}
                    </Text>
                    <Text
                      style={[
                        CommonStyles.text_12_Regular,
                        {
                          color: COLOR.TEXT_ALPHA_GREY,
                          marginTop: normalize(2),
                        },
                      ]}
                    >
                      Problems Answered
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={[CommonStyles.text_18_bold]}>
                      {activityDatas.correct}
                    </Text>
                    <Text
                      style={[
                        CommonStyles.text_12_Regular,
                        {
                          color: COLOR.TEXT_ALPHA_GREY,
                          marginTop: normalize(2),
                        },
                      ]}
                    >
                      Correct Answers
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={[CommonStyles.text_18_bold]}>
                      {activityDatas.incorrect}
                    </Text>
                    <Text
                      style={[
                        CommonStyles.text_12_Regular,
                        {
                          color: COLOR.TEXT_ALPHA_GREY,
                          marginTop: normalize(2),
                        },
                      ]}
                    >
                      Incorrect Answers
                    </Text>
                  </View>
                </View>
                <AcitivityReportList />
              </View>
            )}
          </View>
        </ScrollView>
        {showFilter && (
          <ReportFilterBottomDialog
            classType={classType}
            onCloseFilter={this.onCloseFilter}
            onClickApplyFilter={this.onClickApplyFilter}
            onClickFilterDays={this.onClickFilterDays}
            resetFilters={this.resetFilters}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.authenticate,
    loading: state.dashboard.loading,
    currentSelectedKid: state.dashboard.current_selected_kid,
    studentActivityStatus: state.dashboard.student_activity_report_status,
    studentActivityReport: state.dashboard.student_activity_report_response,
    dashboardResponse: state.dashboard.dashboard_response,
  };
};
const mapDispatchToProps = {
  getStudentActivity,
  getStudentActivityOnDates,
};

const styles = StyleSheet.create({
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverallActivitiesScreen);
