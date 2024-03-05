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
import { submitParentFeedback } from "../../actions/dashboard";
import { COLOR, CommonStyles } from "../../config/styles";
import { CustomBackButton } from "../../components";
import RadioForm, { RadioButton } from "react-native-simple-radio-button";
import {
  FEEDBACK_VERY_GOOD,
  FEEDBACK_GOOD,
  FEEDBACK_BAD,
} from "../../assets/images";
import CustomGradientButton from "../../components/CustomGradientButton";
import { AirbnbRating, normalize } from "react-native-elements";
import { showMessage, hideMessage } from "react-native-flash-message";

class RateDemoClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecommended: "yes",
      userRating: 0,
      mAdditionalFeedback: "",
    };
  }

  onPressBack = () => {
    const { goBack } = this.props.navigation;
    console.log("ON BACK PRESS");
    goBack();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.parent_feedback_status != this.props.parent_feedback_status) {
      if (this.props.parent_feedback_status != null) {
        if (this.props.parent_feedback_status) {
          showMessage({
            message: "Feedback Submitted Successfully",
            type: "success",
          });
          this.props.navigation.navigate(Constants.Dashboard);
        } else {
          showMessage({
            message: "Feedback Not Submitted please try again",
            type: "danger",
          });
        }
      }
    }
  }

  ratingCompleted(rating) {
    console.log("Rating is: " + rating);

    this.setState({
      userRating: rating,
    });
  }

  onSubmitFeedback = () => {
    if (this.state.userRating == 0) {
      showMessage({
        message: "Please rate to submit the feedback",
        type: "danger",
      });
      return;
    }

    if (this.props.dashboardStatus) {
      console.log(this.props.dashboardResponse.parent_id);
      console.log(this.props.currentSelectedKid.student_demos[0].demo_class_id);
      console.log(this.state.mAdditionalFeedback);
      console.log(this.state.userRating);
      console.log(this.state.isRecommended);
      this.props.submitParentFeedback(
        this.props.currentSelectedKid.student_demos[0].demo_class_id,
        this.props.dashboardResponse.parent_id,
        this.state.userRating,
        this.state.isRecommended,
        this.state.mAdditionalFeedback
      );
    }
  };

  renderStudentFeedback = () => {
    const demoClass = this.props.currentSelectedKid.student_demos[0];
    if (demoClass.feedback == "Very Bad") {
      return (
        <View
          style={{
            backgroundColor: COLOR.BG_FAQ_GRERY,
            marginTop: normalize(12),
            borderRadius: normalize(15),
          }}
        >
          <Image
            style={{
              alignSelf: "center",
              height: normalize(60),
              width: normalize(60),
              marginTop: normalize(20),
              resizeMode: "contain",
            }}
            source={FEEDBACK_BAD}
          />
          <Text
            style={[
              CommonStyles.text_14_Regular,
              {
                color: COLOR.TEXT_ALPHA_GREY,
                marginTop: normalize(2),
                marginBottom: normalize(20),
                alignSelf: "center",
              },
            ]}
          >
            Very Bad!
          </Text>
        </View>
      );
    } else if (demoClass.feedback == "Good") {
      return (
        <View
          style={{
            backgroundColor: COLOR.BG_FAQ_GRERY,
            marginTop: normalize(12),
            borderRadius: normalize(15),
          }}
        >
          <Image
            style={{
              alignSelf: "center",
              height: normalize(60),
              width: normalize(60),
              marginTop: normalize(20),
              resizeMode: "contain",
            }}
            source={FEEDBACK_GOOD}
          />
          <Text
            style={[
              CommonStyles.text_14_Regular,
              {
                color: COLOR.TEXT_ALPHA_GREY,
                marginTop: normalize(2),
                marginBottom: normalize(20),
                alignSelf: "center",
              },
            ]}
          >
            Good
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            backgroundColor: COLOR.BG_FAQ_GRERY,
            marginTop: normalize(12),
            borderRadius: normalize(15),
          }}
        >
          <Image
            style={{
              alignSelf: "center",
              height: normalize(60),
              width: normalize(60),
              marginTop: normalize(20),
              resizeMode: "contain",
            }}
            source={FEEDBACK_VERY_GOOD}
          />
          <Text
            style={[
              CommonStyles.text_14_Regular,
              {
                color: COLOR.TEXT_ALPHA_GREY,
                marginTop: normalize(2),
                marginBottom: normalize(20),
                alignSelf: "center",
              },
            ]}
          >
            Very Good!
          </Text>
        </View>
      );
    }
  };

  handleFeedbackText = (text) => {
    this.setState({
      mAdditionalFeedback: text,
    });
  };

  render() {
    const { loading } = this.props;
    var radio_props = [
      { label: "Yes", value: 0 },
      { label: "No", value: 1 },
    ];
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
          <Text
            style={[
              CommonStyles.text_18_semi_bold,
              { color: COLOR.TEXT_COLOR_BLUE, marginTop: normalize(10) },
            ]}
          >
            Rate Demo Class
          </Text>
          <Text
            style={[
              CommonStyles.text_12_Regular,
              { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(4) },
            ]}
          >
            Your feedback is important for us to improve. We’d like to know your
            view on the recent demo class your child attended
          </Text>
          <View style={{ marginTop: normalize(20) }}>
            <AirbnbRating
              selectedColor={COLOR.BLACK}
              reviewColor={COLOR.GRAY}
              defaultRating={0}
              onFinishRating={this.ratingCompleted.bind(this)}
            />
          </View>
          <View>
            <Text
              style={[
                CommonStyles.text_12__semi_bold,
                { color: COLOR.TEXT_COLOR_BLACK, marginTop: normalize(40) },
              ]}
            >
              {this.props.currentSelectedKid.first_name}'s feedback
            </Text>
            {this.renderStudentFeedback()}
          </View>
          <View style={{ marginTop: normalize(40) }}>
            <Text
              style={[
                CommonStyles.text_14_semi_bold,
                { color: COLOR.TEXT_COLOR_BLACK },
              ]}
            >
              Would you recommend it your friends & relatives?
            </Text>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              formHorizontal={false}
              labelHorizontal={true}
              style={{ marginTop: 20 }}
              buttonColor={COLOR.BORDER_COLOR_GREEN}
              selectedButtonColor={COLOR.BORDER_COLOR_GREEN}
              animation={true}
              labelStyle={{
                fontSize: 15,
                color: COLOR.TEXT_COLOR_BLACK,
                marginEnd: 30,
                fontFamily: "Montserrat-Regular",
              }}
              onPress={(value) => {
                if (value) this.setState({ isRecommended: "no" });
                else this.setState({ isRecommended: "yes" });
              }}
            />
          </View>
          <View style={{ marginTop: normalize(40) }}>
            <Text
              style={[
                CommonStyles.text_12__semi_bold,
                { color: COLOR.TEXT_COLOR_BLACK },
              ]}
            >
              Additional Feedback
            </Text>
            <TextInput
              placeholder="Your Feedback"
              placeholderTextColor={COLOR.TEXT_ALPHA_GREY}
              multiline={true}
              onChangeText={this.handleFeedbackText}
              style={{
                paddingTop: 20,
                paddingStart: 10,
                paddingEnd: 10,
                paddingBottom: 20,
                height: 100,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: COLOR.TEXT_ALPHA_GREY,
              }}
            ></TextInput>
          </View>
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
              children="Submit"
              onPress={this.onSubmitFeedback}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.dashboard,
    loading: state.dashboard.loading,
    dashboardResponse: state.dashboard.dashboard_response,
    dashboardStatus: state.dashboard.dashboard_status,
    currentSelectedKid: state.dashboard.current_selected_kid,
    parent_feedback_status: state.dashboard.parent_feedback_status,
    parent_feedback_response: state.dashboard.parent_feedback_response,
  };
};

const mapDispatchToProps = {
  submitParentFeedback,
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    justifyContent: "flex-start",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RateDemoClass);
