import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { COLOR, CommonStyles } from "../../config/styles";
import Orientation from "react-native-orientation";
import { connect } from "react-redux";
import { getEmotionData } from "../../actions/dashboard";
import { IC_NUMERO } from "../../assets/images";
import React, { Component } from "react";
import LottieView from "lottie-react-native";
import { lottie_number } from "../../assets/lottieAssets";
import { Pressable } from "react-native";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../config/configs";
import { showMessage } from "react-native-flash-message";
import * as Constants from "../../components/helpers/Constants";
import { CustomBackButton } from "../../components";
import { BackHandler } from "react-native";

const THEME_COLOR = "#285E29";
class EmotionDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLevelId: null,
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  handleBackButtonClick() {
    console.log("Back button pressed");

    this.props.navigation.goBack();
    return true;
  }

  componentDidMount() {
    // this.props.getEmotionData(65353)
    this.props.getEmotionData(this.props.currentSelectedKid.student_id);

    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  startNumberAnimation = () => {};

  goBackToHome = () => {
    this.props.navigation.goBack();
  };

  componentDidUpdate(prevProps) {
    // if (prevProps.speedMathGameStartStatus != this.props.speedMathGameStartStatus) {
    //   if (this.props.speedMathGameStartStatus) {
    //     this.props.navigation.navigate(Constants.SPEED_MATH_PLAY)
    //   }
    // }
  }

  onPressBack = () => {
    const { goBack } = this.props.navigation;

    goBack();
  };

  render() {
    const { emotionDataStatus, emotionDataResponse, loading } = this.props;
    return (
      <ScrollView
        style={{
          backgroundColor: COLOR.WHITE,
          flexDirection: "row",
        }}
      >
        <View>
          <View style={{ marginStart: 20 }}>
            <CustomBackButton onPress={this.onPressBack} />
          </View>
          {loading && (
            <ActivityIndicator
              size="large"
              color="black"
              style={CommonStyles.loadingIndicatior}
            />
          )}

          {emotionDataStatus ? (
            <View
              style={{
                width: SCREEN_WIDTH,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text style={[CommonStyles.text_14_bold]}>
                  Auto-Picked Images
                </Text>
                <Text style={[CommonStyles.text_12__semi_bold]}>
                  From our AI Engine
                </Text>
              </View>
              <View style={styles.container}>
                {emotionDataResponse.emotions.map((e, i) => {
                  let imagedata = e.emotions;
                  return (
                    <View
                      style={[
                        CommonStyles.boxShadow,
                        {
                          backgroundColor: COLOR.WHITE,
                          marginHorizontal: 10,
                          marginBottom: 20,
                          width: SCREEN_WIDTH - 20,
                          height: 200,
                          borderRadius: 10,
                        },
                      ]}
                      key={i}
                    >
                      <View style={styles.headingText}>
                        <Text
                          style={[
                            CommonStyles.text_11_semi_bold,
                            { textAlign: "center", marginVertical: 5 },
                          ]}
                        >
                          Week of {e.start_date} to {e.end_date}
                        </Text>
                      </View>
                      <View
                        style={{ flexDirection: "row", flex: 3, padding: 10 }}
                      >
                        {imagedata.map((elem, i) => {
                          {
                            console.log(elem, "imghg");
                          }
                          return (
                            <Image
                              source={{
                                uri: elem,
                              }}
                              style={styles.imageGridStyle}
                            />
                          );
                        })}
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          ) : (
            <View
              style={{
                //flex: 1,
                //position: "absolute",
                marginTop: 100,
                backgroundColor: COLOR.WHITE,
              }}
            >
              <Image
                style={{
                  resizeMode: "contain",
                  width: SCREEN_WIDTH,
                  height: SCREEN_HEIGHT / 2,
                  alignSelf: "center",
                }}
                source={IC_NUMERO}
              />

              <Text
                style={[
                  CommonStyles.text_14_bold,
                  {
                    color: COLOR.BLACK,
                    textAlign: "center",
                    position: "relative",
                  },
                ]}
              >
                No emotions recorded
              </Text>
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
    emotionDataStatus: state.dashboard.emotion_data_status,
    emotionDataResponse: state.dashboard.emotion_data_response,
    currentSelectedKid: state.dashboard.current_selected_kid,
  };
};

const mapDispatchToProps = {
  getEmotionData,
};

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
    backgroundColor: THEME_COLOR,
  },
  container: {
    flexDirection: "column",
    display: "flex",
  },
  bottomSafeArea: {
    flex: 1,
    backgroundColor: THEME_COLOR,
  },
  imageGridStyle: {
    width: 110,
    height: 110,
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 2,
    borderRadius: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmotionDisplay);
