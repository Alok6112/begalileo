import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  VirtualizedList,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import * as Constants from "../../components/helpers/Constants";
import { COLOR, CommonStyles } from "../../config/styles";
import { CustomBackButton } from "../../components";
import RadioForm, { RadioButton } from "react-native-simple-radio-button";
import { IC_BANNER_2 } from "../../assets/images";

import { getDemoResults } from "../../actions/dashboard";
import CustomGradientButton from "../../components/CustomGradientButton";
import { normalize } from "react-native-elements";
import {
  secondsToHms,
  replaceAll,
} from "../../components/helpers/CustomUtilMethods";
import ReadMore from "react-native-read-more-text";

class DemoClassResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teacher_message: [
        "Aarav is a keen listener",
        "He enjoyed coding most today in class",
        "He shows good foundation triats of being a knowledgeable, observant and inquistive learner",
      ],
    };
  }

  componentDidMount() {
    console.log("Democ class results");
    console.log(this.props.currentSelectedKid);
    console.log(this.props.dashboardResponse.parent_id);
    this.props.getDemoResults(
      this.props.currentSelectedKid.student_demos[0].demo_class_id,
      this.props.dashboardResponse.parent_id,
      this.props.currentSelectedKid.student_id
    );
  }

  onPressBack = () => {
    const { goBack } = this.props.navigation;
    console.log("ON BACK PRESS");
    goBack();
  };

  onClickEnrollProgram = () => {
    this.props.navigation.navigate(Constants.ShowSubscriptions);
  };

  renderMathConcept = (mathConcept) => {
    return (
      <View>
        <Text
          style={[
            CommonStyles.text_12__semi_bold,
            { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(20) },
          ]}
        >
          Math Concept
        </Text>
        {mathConcept.map((item) => {
          return (
            <View>
              <Text style={[CommonStyles.text_14_bold, { color: COLOR.BLACK }]}>
                {item.sub_concept_name}
              </Text>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  { color: COLOR.TEXT_ALPHA_GREY },
                ]}
              >
                {item.tag_name}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  onCLickViewCurriculam = () => {
    this.props.navigation.navigate(Constants.ViewCurriculum);
  };

  renderLogicaloncept = (logicConcept) => {
    return (
      <View>
        <Text
          style={[
            CommonStyles.text_12__semi_bold,
            { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(20) },
          ]}
        >
          THINK and REASON
        </Text>
        {logicConcept.map((item) => {
          return (
            <View>
              <Text style={[CommonStyles.text_14_bold, { color: COLOR.BLACK }]}>
                {item.sub_concept_name}
              </Text>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  { color: COLOR.TEXT_ALPHA_GREY },
                ]}
              >
                {item.tag_name}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  getStructuredTimeFormat = (time) => {
    console.log("Time Structure", time);
    if (time == null || typeof time == "undefined") return "";
    else {
      var splitTime = time.split(", ");
      console.log("Time Split : ", splitTime);
      return splitTime[0] + "\n" + splitTime[1] + "\n" + splitTime[2];
    }
  };

  goToViewCurriculum = () => {
    this.props.navigation.navigate(Constants.ViewCurriculum);
  };

  renderResultView = () => {
    const { demo_result_status, demo_result_response } = this.props;
    return (
      <View>
        <Text
          style={[
            CommonStyles.text_18_semi_bold,
            { color: COLOR.TEXT_COLOR_BLUE, marginTop: normalize(10) },
          ]}
        >
          Results of Demo Class
        </Text>
        {demo_result_response.math_concepts != null &&
          demo_result_response.math_concepts.length > 0 &&
          this.renderMathConcept(demo_result_response.math_concepts)}
        {demo_result_response.math_concepts != null &&
          demo_result_response.math_concepts.length > 0 &&
          this.renderLogicaloncept(demo_result_response.math_concepts)}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: normalize(32),
          }}
        >
          <View>
            <Text
              style={[
                CommonStyles.text_11_bold,
                { color: COLOR.TEXT_COLOR_BLACK },
              ]}
            >
              Attended on
            </Text>
            <Text
              style={[
                CommonStyles.text_14_Regular,
                { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(4) },
              ]}
            >
              {this.getStructuredTimeFormat(demo_result_response.attended_on)}
            </Text>
          </View>
          <View>
            <Text
              style={[
                CommonStyles.text_11_bold,
                { color: COLOR.TEXT_COLOR_BLACK },
              ]}
            >
              Time taken
            </Text>
            <Text
              style={[
                CommonStyles.text_18_regular,
                { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(4) },
              ]}
            >
              {secondsToHms(demo_result_response.time_taken)}
            </Text>
          </View>
          <View>
            <Text
              style={[
                CommonStyles.text_11_bold,
                { color: COLOR.TEXT_COLOR_BLACK },
              ]}
            >
              Accuracy
            </Text>
            <Text
              style={[
                CommonStyles.text_18_regular,
                { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(4) },
              ]}
            >
              {demo_result_response.accuracy}%
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: normalize(40),
          }}
        >
          <View>
            <Text
              style={[
                CommonStyles.text_18_semi_bold,
                { color: COLOR.BLACK, textAlign: "center" },
              ]}
            >
              {demo_result_response.problems}
            </Text>
            <Text
              style={[
                CommonStyles.text_12_Regular,
                { color: COLOR.TEXT_ALPHA_GREY },
              ]}
            >
              Problems
            </Text>
          </View>
          <View>
            <Text
              style={[
                CommonStyles.text_18_semi_bold,
                { color: COLOR.BLACK, textAlign: "center" },
              ]}
            >
              {demo_result_response.correct}
            </Text>
            <Text
              style={[
                CommonStyles.text_12_Regular,
                { color: COLOR.TEXT_ALPHA_GREY },
              ]}
            >
              Corrects
            </Text>
          </View>
          <View>
            <Text
              style={[
                CommonStyles.text_18_semi_bold,
                { color: COLOR.BLACK, textAlign: "center" },
              ]}
            >
              {demo_result_response.incorrect}
            </Text>
            <Text
              style={[
                CommonStyles.text_12_Regular,
                { color: COLOR.TEXT_ALPHA_GREY },
              ]}
            >
              Incorrect
            </Text>
          </View>
        </View>
        <Image
          style={{
            alignSelf: "center",
            marginTop: normalize(20),
            height: normalize(180),
            width: normalize(200),
            marginTop: normalize(20),
            resizeMode: "contain",
          }}
          source={IC_BANNER_2}
        />
        {demo_result_response.teacher_mesages != null &&
          demo_result_response.teacher_mesages.length > 0 && (
            <View
              style={{ marginStart: normalize(10), marginEnd: normalize(10) }}
            >
              <Text
                style={[
                  CommonStyles.text_12__semi_bold,
                  { color: COLOR.BLACK },
                ]}
              >
                What teacher-coach has to say
              </Text>
              {demo_result_response.teacher_mesages.map((item, index) => {
                return (
                  <Text
                    style={[
                      CommonStyles.text_16_regular,
                      {
                        color: COLOR.TEXT_ALPHA_GREY,
                        marginTop: normalize(10),
                      },
                    ]}
                  >
                    {index + 1}. {item}
                  </Text>
                );
              })}
            </View>
          )}

        {demo_result_response.parent_messages != null &&
          demo_result_response.parent_messages.length > 0 && (
            <View
              style={{
                backgroundColor: COLOR.BG_FAQ_GRERY,
                marginStart: normalize(10),
                marginEnd: normalize(10),
                marginTop: normalize(20),
                marginBottom: normalize(20),
                borderRadius: normalize(15),
              }}
            >
              <Text
                style={[
                  CommonStyles.text_12__semi_bold,
                  {
                    color: COLOR.BLACK,
                    marginTop: normalize(16),
                    marginStart: normalize(16),
                    marginBottom: normalize(8),
                  },
                ]}
              >
                Dear Parent
              </Text>
              {this.getParentMessageStructure(
                demo_result_response.parent_messages
              )}
            </View>
          )}

        <View
          style={{
            marginTop: normalize(20),
            marginStart: normalize(30),
            marginEnd: normalize(30),
            marginBottom: normalize(30),
          }}
        >
          <CustomGradientButton
            myRef={(input) => {
              this.btn_add_kid = input;
            }}
            style={CommonStyles.green_button_gradient}
            children="Enroll for beGalileo Program"
            onPress={this.onClickEnrollProgram}
          />
        </View>

        <TouchableOpacity onPress={this.goToViewCurriculum}>
          <Text
            style={[
              CommonStyles.text_12__semi_bold,
              {
                color: COLOR.TEXT_COLOR_GREEN,
                textAlign: "center",
                marginBottom: normalize(40),
              },
            ]}
          >
            View Full Curriculum
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  _renderTruncatedFooter = (handlePress) => {
    return (
      <Text
        style={[
          CommonStyles.text_12__semi_bold,
          { color: COLOR.BLACK, margin: normalize(5) },
        ]}
        onPress={handlePress}
      >
        Read more
      </Text>
    );
  };

  _renderRevealedFooter = (handlePress) => {
    return (
      <Text
        style={[
          CommonStyles.text_12__semi_bold,
          { color: COLOR.BLACK, margin: normalize(5) },
        ]}
        onPress={handlePress}
      >
        Show less
      </Text>
    );
  };

  getParentMessageStructure = (messages) => {
    let parentMessage = "";
    messages.map((item) => {
      parentMessage += item + "\n\n";
    });
    return (
      <View style={{ marginStart: normalize(8), marginEnd: normalize(8) }}>
        <ReadMore
          numberOfLines={3}
          renderTruncatedFooter={this._renderTruncatedFooter}
          renderRevealedFooter={this._renderRevealedFooter}
        >
          <Text
            style={[
              CommonStyles.text_12_Regular,
              { color: COLOR.TEXT_ALPHA_GREY },
            ]}
          >
            {parentMessage}
          </Text>
        </ReadMore>
      </View>
    );
  };

  render() {
    const { loading, demo_result_status } = this.props;
    return (
      <View style={styles.mainContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginTop: 10,
            marginStart: 20,
            marginEnd: 20,
            marginBottom: 10,
          }}
        >
          {loading && (
            <ActivityIndicator
              size="large"
              color="black"
              style={CommonStyles.loadingIndicatior}
            />
          )}
          <CustomBackButton onPress={this.onPressBack} />
          {demo_result_status && this.renderResultView()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.dashboard,
    loading: state.dashboard.loading,
    demo_result_status: state.dashboard.demo_result_status,
    demo_result_response: state.dashboard.demo_result_response,
    currentSelectedKid: state.dashboard.current_selected_kid,
    dashboardResponse: state.dashboard.dashboard_response,
  };
};

const mapDispatchToProps = {
  getDemoResults,
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    justifyContent: "flex-start",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DemoClassResults);
