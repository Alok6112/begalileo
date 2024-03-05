import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import {COLOR, CommonStyles} from '../../config/styles';
import Orientation from 'react-native-orientation';
import {connect} from 'react-redux';
import {
  getSpeedMathGameLevels,
  getSpeedMathQuestions,
} from '../../actions/dashboard';
import React, {Component} from 'react';
import LottieView from 'lottie-react-native';
import {lottie_number} from '../../assets/lottieAssets';
import {Pressable} from 'react-native';
import {SCREEN_WIDTH} from '../../config/configs';
import {showMessage} from 'react-native-flash-message';
import * as Constants from '../../components/helpers/Constants';

import {BackHandler} from 'react-native';
import {CustomBackButton} from '../../components';

const THEME_COLOR = '#285E29';
class SpeedMathHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLevelId: null,
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount() {
    const initial = Orientation.getInitialOrientation();

    Orientation.lockToLandscapeRight();
    this.props.getSpeedMathGameLevels();

    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    const initial = Orientation.getInitialOrientation();
    Orientation.lockToPortrait();
    //  this.startNumberAnimation()
  }

  onPressBack = () => {
    const {goBack} = this.props.navigation;

    goBack();
  };

  handleBackButtonClick() {
    console.log('Back button pressed');
    const initial = Orientation.getInitialOrientation();
    Orientation.lockToPortrait();
    this.props.navigation.goBack();
    return true;
  }

  startNumberAnimation = () => {
    this.animation.play();
  };

  goBackToHome = () => {
    const initial = Orientation.getInitialOrientation();
    Orientation.lockToPortrait();
    this.props.navigation.goBack();
  };

  onStartGame = () => {
    var {currentSelectedKid, getSpeedMathQuestions} = this.props;

    if (this.state.selectedLevelId == null)
      showMessage({
        message: 'Choose Level to start',
        type: 'success',
      });
    else {
      getSpeedMathQuestions(
        currentSelectedKid.student_id,
        this.state.selectedLevelId,
      );
      // this.props.navigation.navigate(Constants.SPEED_MATH_PLAY)
    }
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.speedMathGameStartStatus != this.props.speedMathGameStartStatus
    ) {
      if (this.props.speedMathGameStartStatus) {
        this.props.navigation.navigate(Constants.SPEED_MATH_PLAY);
      }
    }
  }

  onLevelSelected = level => {
    this.setState({
      selectedLevelId: level.id,
    });
  };

  renderGameLevel = () => {
    var levels = this.props.gameLevelResponse.levels;
    return (
      <>
        <View style={{marginStart: 20}}>
          <CustomBackButton onPress={this.onPressBack} />
        </View>
        <View style={{flexBasis: '33%', flexWrap: 'wrap'}}>
          {levels.map(data => {
            return (
              <Pressable
                onPress={() => this.onLevelSelected(data)}
                style={{
                  height: 40,
                  width: 100,
                  backgroundColor:
                    this.state.selectedLevelId == data.id
                      ? COLOR.TEXT_COLOR_PURPLE
                      : COLOR.BLUE_LINk,
                  margin: 5,
                  borderRadius: 20,
                  justifyContent: 'center',
                }}>
                <Text
                  style={[
                    CommonStyles.text_12_bold,
                    {color: COLOR.WHITE, textAlign: 'center'},
                  ]}>
                  Level {data.name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </>
    );
  };

  render() {
    return (
      <View
        style={{flex: 1, backgroundColor: COLOR.WHITE, flexDirection: 'row'}}>
        {this.props.loading && (
          <ActivityIndicator
            size="large"
            color="black"
            style={CommonStyles.activityIndicatorStyle}
          />
        )}
        <View style={{flex: 1, justifyContent: 'center'}}>
          <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            source={lottie_number}
            autoPlay
            loop={false}
          />
        </View>

        <View style={{flex: 1, justifyContent: 'space-evenly'}}>
          <Text style={[CommonStyles.text_18_bold, {textAlign: 'center'}]}>
            Speed Math
          </Text>
          {this.props.gameLevelStatus && <View>{this.renderGameLevel()}</View>}
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Pressable
              onPress={this.onStartGame}
              style={{
                backgroundColor:
                  this.state.selectedLevelId != null
                    ? COLOR.TEXT_COLOR_GREEN
                    : COLOR.COMPLETED_GREEN,
                borderRadius: 20,
              }}>
              <Text
                style={[
                  CommonStyles.text_14_bold,
                  {
                    color: COLOR.WHITE,
                    marginHorizontal: 40,
                    marginVertical: 10,
                  },
                ]}>
                Start Game
              </Text>
            </Pressable>
            <Pressable
              onPress={this.goBackToHome}
              style={{backgroundColor: COLOR.RED, borderRadius: 20}}>
              <Text
                style={[
                  CommonStyles.text_14_bold,
                  {
                    color: COLOR.WHITE,
                    marginHorizontal: 40,
                    marginVertical: 10,
                  },
                ]}>
                Exit
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state.dashboard,
    loading: state.dashboard.loading,
    gameLevelStatus: state.dashboard.speed_math_game_level_status,
    gameLevelResponse: state.dashboard.speed_math_game_level_response,
    currentSelectedKid: state.dashboard.current_selected_kid,
    speedMathGameStartStatus: state.dashboard.speed_math_game_start_status,
  };
};

const mapDispatchToProps = {
  getSpeedMathGameLevels,
  getSpeedMathQuestions,
};

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
    backgroundColor: THEME_COLOR,
  },
  bottomSafeArea: {
    flex: 1,
    backgroundColor: THEME_COLOR,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SpeedMathHome);
