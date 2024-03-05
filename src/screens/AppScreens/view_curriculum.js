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
import { COLOR, CommonStyles } from "../../config/styles";
import { IMG_SHAKSHI } from "../../assets/images";
import { viewCurriculam } from "../../actions/dashboard";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import { normalize, Card } from "react-native-elements";
import SvgUri from "react-native-svg-uri";
import { CustomBackButton } from "../../components";
import { BackHandler } from "react-native";

class ViewCurriculam extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  componentDidMount() {
    this.getCurriculamDatas(this.props.currentSelectedKid);
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  getCurriculamDatas = (currentKid) => {
    // if(currentKid.student_id !== undefined)
    console.log(currentKid);

    this.props.viewCurriculam(currentKid.student_id);
  };

  renderMathSkillDatas = () => {
    const { view_curriculam_response } = this.props;
    console.log(view_curriculam_response.math_skills.length);

    return view_curriculam_response.math_skills.map((item) => {
      return (
        <View
          style={{
            marginTop: normalize(16),
            borderColor: COLOR.BORDER_COLOR_GREY,
            borderRadius: 15,
            borderWidth: 2,
          }}
        >
          <Text
            style={[
              CommonStyles.text_14_bold,
              { marginStart: normalize(16), marginTop: normalize(16) },
            ]}
          >
            {item.name}
          </Text>
          {item.tags.map((tag) => {
            return (
              <View
                style={{
                  marginStart: normalize(16),
                  flexDirection: "row",
                  marginTop: 5,
                  marginBottom: 5,
                }}
              >
                <Text
                  style={{
                    color: COLOR.TEXT_COLOR_BLACK,
                    fontSize: normalize(6),
                    marginEnd: 5,
                    alignSelf: "center",
                    backgroundColor: COLOR.BG_ALPHA_BLUE,
                  }}
                >
                  {"\u2B24"}
                </Text>
                <Text
                  style={[
                    CommonStyles.text_12_Regular,
                    { color: COLOR.TEXT_ALPHA_GREY },
                  ]}
                >
                  {" "}
                  {tag.name}
                </Text>
              </View>
            );
          })}
        </View>
      );
    });
  };

  renderThinkingSkillDatas = () => {
    const { view_curriculam_response } = this.props;
    console.log(view_curriculam_response.thinking_skills.length);

    return view_curriculam_response.thinking_skills.map((item) => {
      return (
        <View
          style={{
            marginTop: normalize(8),
            borderColor: COLOR.BORDER_COLOR_GREY,
            borderRadius: 15,
            borderWidth: 2,
          }}
        >
          <Text
            style={[
              CommonStyles.text_14_bold,
              { marginStart: normalize(16), marginTop: normalize(16) },
            ]}
          >
            {item.name}
          </Text>
          {item.tags.map((tag) => {
            return (
              <View
                style={{
                  marginStart: normalize(16),
                  flexDirection: "row",
                  marginTop: 5,
                  marginBottom: 5,
                }}
              >
                <Text
                  style={{
                    color: COLOR.TEXT_COLOR_BLACK,
                    fontSize: normalize(6),
                    marginEnd: 5,
                    alignSelf: "center",
                    backgroundColor: COLOR.BG_ALPHA_BLUE,
                  }}
                >
                  {"\u2B24"}
                </Text>
                <Text
                  style={[
                    CommonStyles.text_12_Regular,
                    { color: COLOR.TEXT_ALPHA_GREY },
                  ]}
                >
                  {" "}
                  {tag.name}
                </Text>
              </View>
            );
          })}
        </View>
      );
    });
  };
  onPressBack = () => {
    const { goBack } = this.props.navigation;
    goBack();
  };

  render() {
    const { loading, currentSelectedKid } = this.props;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: COLOR.WHITE }}
      >
        {loading && (
          <ActivityIndicator
            size="large"
            color="black"
            style={CommonStyles.loadingIndicatior}
          />
        )}
        <View style={{ marginStart: 20 }}>
          <CustomBackButton onPress={this.onPressBack} />
        </View>

        <View
          style={{
            flex: 1,
            marginStart: normalize(20),
            marginEnd: normalize(20),
          }}
        >
          <Text
            style={[
              CommonStyles.text_18_bold,
              { color: COLOR.TEXT_COLOR_BLUE, marginTop: normalize(12) },
            ]}
          >
            Curriculum
          </Text>
          <View style={{ flexDirection: "row", marginTop: normalize(20) }}>
            <Image
              style={{
                borderRadius: 100,
                height: normalize(50),
                width: normalize(50),
                resizeMode: "stretch",
              }}
              source={{ uri: currentSelectedKid.photo }}
            />
            <View
              style={{ justifyContent: "center", marginStart: normalize(14) }}
            >
              <Text
                style={[
                  CommonStyles.text_14_bold,
                  { color: COLOR.TEXT_COLOR_BLACK },
                ]}
              >
                For {currentSelectedKid.name}
              </Text>
              <Text
                style={[
                  CommonStyles.text_14_Regular,
                  { color: COLOR.TEXT_COLOR_GREY, marginTop: normalize(2) },
                ]}
              >
                {currentSelectedKid.grade}
              </Text>
            </View>
          </View>

          <View style={{ marginTop: normalize(12) }}>
            <Text
              style={[
                CommonStyles.text_12_regular,
                { color: COLOR.TEXT_ALPHA_GREY, lineHeight: normalize(20) },
              ]}
            >
              Engage your child with the most comprehensive tech-enhanced
              adaptive curriculum in Mathematical Thinking to cultivate multiple
              thinking and problem solving skills
            </Text>
          </View>

          {this.props.view_curriculam_status &&
            this.props.view_curriculam_response.math_skills && (
              <View>
                <Text
                  style={[
                    CommonStyles.text_18_bold,
                    { marginStart: normalize(16), marginTop: normalize(16) },
                  ]}
                >
                  Math curriculum
                </Text>
                {this.renderMathSkillDatas()}
              </View>
            )}

          {this.props.view_curriculam_status &&
            this.props.view_curriculam_response.thinking_skills && (
              <View>
                <Text
                  style={[
                    CommonStyles.text_18_bold,
                    { marginStart: normalize(16), marginTop: normalize(16) },
                  ]}
                >
                  Thinking curriculum
                </Text>
                {this.renderThinkingSkillDatas()}
              </View>
            )}
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    state: state.dashboard,
    loading: state.dashboard.loading,
    view_curriculam_status: state.dashboard.view_curriculam_status,
    view_curriculam_response: state.dashboard.view_curriculam_response,
    currentSelectedKid: state.dashboard.current_selected_kid,
  };
};

const mapDispatchToProps = {
  viewCurriculam,
};

const styles = StyleSheet.create({});
export default connect(mapStateToProps, mapDispatchToProps)(ViewCurriculam);
