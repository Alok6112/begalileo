import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {COLOR, CommonStyles} from '../../config/styles';
import Orientation from 'react-native-orientation';
import {connect} from 'react-redux';
import {} from '../../actions/dashboard';
import React, {Component} from 'react';
import LottieView from 'lottie-react-native';
import {
  lottie_countdown,
  lottie_game_won,
  lottie_game_lost,
  lottie_game_tie,
} from '../../assets/lottieAssets';
import {Pressable} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../config/configs';
import {showMessage} from 'react-native-flash-message';
import {SPEEDMATH_BG} from '../../assets/images';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {normalize} from 'react-native-elements';
import WebView from 'react-native-webview';
import CustomGradientButton from '../../components/CustomGradientButton';
import {
  submitSpeedMathAnswer,
  getSpeedMathResult,
} from '../../actions/dashboard';
import * as Constants from '../../components/helpers/Constants';

import {BackHandler} from 'react-native';
import {CustomBackButton} from '../../components';

const THEME_COLOR = '#285E29';
class SpeedMathPlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLevelId: null,
      questionSet: [],
      currentAnswer: '',
      currentIndex: 0,
      currentQuestion: '',
      correctAnswer: 0,
      gameTimer: 60,
      userScore: 0,
      computerScore: 0,
      showWelcomeAnimation: false,
      gameEnded: false,
      isUserWon: false,
    };

    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  handleBackButtonClick() {
    console.log('Back button pressed');
    this.props.navigation.goBack();
    return true;
  }
  componentDidMount() {
    const initial = Orientation.getInitialOrientation();
    Orientation.lockToLandscapeRight();
    console.log(this.props.speedMathGameStartResponse);
    var questionData = this.props.speedMathGameStartResponse.game_questions;

    console.log('Question Data SpeedMath', questionData);
    this.setState({
      questionSet: questionData,
    });
    this.startGameTimer();

    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );

    // setTimeout(() => { this.startGameTimer() }, 3000)
  }

  startGameTimer = () => {
    this.setState({showWelcomeAnimation: false});
    this.interval = setInterval(() => {
      this.setState(prevState => ({gameTimer: prevState.gameTimer - 1}));
      this.startComputerGame();
    }, 1000);
  };

  onGameEnd = () => {
    if (!this.state.gameEnded) {
      this.setState({
        gameEnded: true,
      });
      console.log('Game ENded');
      this.props.getSpeedMathResult(
        this.props.speedMathGameStartResponse.player_id,
        this.props.speedMathGameStartResponse.game_id,
        this.state.computerScore,
      );
    }

    return;
  };

  startComputerGame = () => {
    this.gameEndInterval = setTimeout(() => {
      this.onGameEnd();
    }, 1000 * this.state.gameTimer);
    var random_boolean = Math.random() < 0.3;
    if (random_boolean)
      this.setState(prevState => ({
        computerScore: prevState.computerScore + 1,
      }));
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('Game time ::: ', this.state.gameTimer);

    if (this.state.gameTimer === 0) {
      clearInterval(this.interval);
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);

    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );

    const initial = Orientation.getInitialOrientation();
    Orientation.lockToPortrait();
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
    if (this.state.selectedLevelId == null)
      showMessage({
        message: 'Choose Level to start',
        type: 'success',
      });
    else {
      console.log('Starting Game');
    }
  };

  onLevelSelected = level => {
    this.setState({
      selectedLevelId: level.id,
    });
  };

  onPressEnter = () => {
    var cQuestion = this.state.questionSet[this.state.currentIndex];

    var isUserCorrect = this.state.currentAnswer == cQuestion.answer;
    if (isUserCorrect)
      this.setState(prevState => ({userScore: prevState.userScore + 1}));

    this.props.submitSpeedMathAnswer(
      this.props.speedMathGameStartResponse.player_id,
      this.props.speedMathGameStartResponse.game_id,
      cQuestion.id,
      isUserCorrect,
      this.state.currentAnswer,
    );
    this.updateNewQuestion();
  };

  updateNewQuestion = () => {
    var newIndex = this.state.currentIndex + 1;
    this.setState({
      currentAnswer: '',
      currentIndex: newIndex,
    });
  };

  onChangedAnswer = text => {
    this.setState({
      currentAnswer: text.replace(/[^0-9]/g, ''),
    });
  };

  showQuestion = () => {
    const {currentIndex, questionSet} = this.state;
    const regex = /(<([^>]+)>)/gi;

    const question =
      this.props.speedMathGameStartResponse.game_questions[currentIndex];
    console.log('New Question Data ', question.question);
    // var testQuestion = '10 + 3 + <div class=\"fraction\">\r\n<span class=\"fup\">3</span>\r\n<span class=\"bar\">/</span>\r\n<span class=\"fdn\">10</span> \r\n</div> + <div class=\"fraction\">\r\n<span class=\"fup\">6</span>\r\n<span class=\"bar\">/</span>\r\n<span class=\"fdn\">100</span> \r\n</div> + <div class=\"fraction\">\r\n<span class=\"fup\">2</span>\r\n<span class=\"bar\">/</span>\r\n<span class=\"fdn\">1000</span> \r\n</div>'
    var innerHtml =
      '<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body style="background-color:' +
      COLOR.SPEEDMATH_YELLLOW +
      ';"><h1 style="text-align: center;">' +
      question.question +
      '</h1></body></html>';

    return (
      <View style={{height: 50, marginVertical: 20, marginVertical: 10}}>
        <WebView
          originWhitelist={['*']}
          source={{html: innerHtml}}
          containerStyle={{alignContent: 'center'}}
        />
      </View>
    );
  };

  onCustomKeyboardNumberPress = number => {
    console.log('Number ', this.state.currentAnswer.length);
    var value = this.state.currentAnswer + number;
    if (this.state.currentAnswer.length < 6)
      this.setState({
        currentAnswer: value,
      });
  };

  onDeleteNumberPress = () => {
    var value = this.state.currentAnswer;
    var newValue = value.slice(0, -1);
    this.setState({
      currentAnswer: newValue,
    });
  };

  goToDashboard = () => {
    const initial = Orientation.getInitialOrientation();
    Orientation.lockToPortrait();
    this.props.navigation.navigate(Constants.Dashboard);
  };

  getResultLottie = status => {
    console.log('Status', status);
    if (status == 'winner') return lottie_game_won;
    else if (status == 'just missed') return lottie_game_lost;
    else return lottie_game_tie;
  };

  getResultHeaderText = status => {
    if (status == 'winner') return 'You Won';
    else if (status == 'just missed') return 'You lost';
    else return 'Game tied';
  };

  onPressViewAnswers = () => {};

  onPressBack = () => {
    const {goBack} = this.props.navigation;

    goBack();
  };

  render() {
    const {
      questionSet,
      currentAnswer,
      currentIndex,
      gameTimer,
      gameEnded,
      showWelcomeAnimation,
    } = this.state;
    const {loading, speedMathResultStatus, speedMathResultResponse} =
      this.props;
    return (
      <View style={{flex: 1, backgroundColor: COLOR.WHITE}}>
        <View style={{marginStart: 20}}>
          <CustomBackButton onPress={this.onPressBack} />
        </View>

        {/* {
 <Modal transparent={false}>
 <View style={{ flex: 1, backgroundColor: COLOR.RED }}>
 <Text>dfsfsfsd</Text>
 </View>
 </Modal>
 } */}

        {loading && (
          <ActivityIndicator
            size="large"
            color="black"
            style={CommonStyles.loadingIndicatior}
          />
        )}

        {!showWelcomeAnimation && (
          <View style={{flex: 1}}>
            {gameEnded ? (
              <View style={{flex: 1, justifyContent: 'center'}}>
                {speedMathResultStatus && (
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <View
                      style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <View style={{height: 200, width: 200}}>
                        <LottieView
                          ref={animation => {
                            this.animation = animation;
                          }}
                          source={this.getResultLottie(
                            speedMathResultResponse.response_data[0]
                              .game_result,
                          )}
                          autoPlay
                          loop
                        />
                      </View>

                      <View style={{marginStart: 10, justifyContent: 'center'}}>
                        <Text style={[CommonStyles.text_18_semi_bold, {}]}>
                          {this.getResultHeaderText(
                            speedMathResultResponse.response_data[0]
                              .game_result,
                          )}
                        </Text>
                        <View style={{justifyContent: 'space-evenly'}}>
                          <Text
                            style={[
                              CommonStyles.text_14_semi_bold,
                              {color: COLOR.BLACK},
                            ]}>
                            Total :{' '}
                            {speedMathResultResponse.response_data[0].total}
                          </Text>
                          <Text
                            style={[
                              CommonStyles.text_14_semi_bold,
                              {color: COLOR.BLACK},
                            ]}>
                            correct :{' '}
                            {speedMathResultResponse.response_data[0].correct}
                          </Text>
                        </View>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            style={[
                              CommonStyles.text_14_semi_bold,
                              {color: COLOR.BLACK},
                            ]}>
                            Your Score :{' '}
                          </Text>
                          <Text
                            style={[
                              CommonStyles.text_14_semi_bold,
                              {color: COLOR.BLACK},
                            ]}>
                            {this.state.userScore}
                          </Text>
                        </View>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            style={[
                              CommonStyles.text_14_semi_bold,
                              {color: COLOR.BLACK},
                            ]}>
                            Computer Score :{' '}
                          </Text>
                          <Text
                            style={[
                              CommonStyles.text_14_semi_bold,
                              {color: COLOR.BLACK},
                            ]}>
                            {this.state.computerScore}
                          </Text>
                        </View>
                        {/* <Pressable style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLOR.ORANGE, borderRadius: 20, marginVertical: 2 }}>

 <Text style={[CommonStyles.text_12__semi_bold, { color: COLOR.WHITE, textAlign: 'center', flex: 1 }]}>View answers</Text>
 </Pressable> */}
                      </View>
                    </View>

                    <View
                      style={{justifyContent: 'center', alignItems: 'center'}}>
                      <CustomGradientButton
                        myRef={input => {
                          this.btn_apply_filter = input;
                        }}
                        style={{
                          height: 50,
                          width: 250,
                          marginTop: 10,
                          justifyContent: 'center',
                        }}
                        children={'Take me to Dashboard'}
                        textStyling={{textAlign: 'center'}}
                        onPress={() => this.goToDashboard()}
                      />
                    </View>
                  </View>
                )}
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <View style={{flex: 1, alignSelf: 'center'}}>
                  <View style={{flexDirection: 'row', marginStart: 20}}>
                    <View style={{flex: 2}}>
                      <Text style={[CommonStyles.text_14_semi_bold]}>
                        Your Score : {this.state.userScore}
                      </Text>
                      <Text style={[CommonStyles.text_14_semi_bold]}>
                        Computer Score : {this.state.computerScore}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: COLOR.TEXT_COLOR_PURPLE,
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        borderRadius: 20,
                      }}>
                      <Text
                        style={[
                          CommonStyles.text_18_bold,
                          {textAlign: 'center', color: COLOR.WHITE},
                        ]}>
                        {gameTimer}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      backgroundColor: COLOR.SPEEDMATH_YELLLOW,
                      borderRadius: 30,
                      marginTop: 10,
                    }}>
                    <Text
                      style={[
                        CommonStyles.text_14_bold,
                        {marginTop: 30, textAlign: 'center'},
                      ]}>
                      Keep answering as quickly as you can
                    </Text>
                    {this.showQuestion()}
                    <View
                      style={{
                        width: 200,
                        height: 60,
                        backgroundColor: COLOR.WHITE,
                        borderRadius: 30,
                        marginVertical: 20,
                        alignSelf: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={[
                          CommonStyles.text_18_bold,
                          {color: COLOR.BLACK, textAlign: 'center'},
                        ]}>
                        {this.state.currentAnswer}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{flex: 1, justifyContent: 'center'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <Pressable
                      onPress={() => this.onCustomKeyboardNumberPress(1)}
                      style={styles.keyboardButton}>
                      <Text
                        style={[
                          CommonStyles.text_18_bold,
                          {textAlign: 'center', color: COLOR.WHITE},
                        ]}>
                        1
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => this.onCustomKeyboardNumberPress(2)}
                      style={styles.keyboardButton}>
                      <Text
                        style={[
                          CommonStyles.text_18_bold,
                          {textAlign: 'center', color: COLOR.WHITE},
                        ]}>
                        2
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => this.onCustomKeyboardNumberPress(3)}
                      style={styles.keyboardButton}>
                      <Text
                        style={[
                          CommonStyles.text_18_bold,
                          {textAlign: 'center', color: COLOR.WHITE},
                        ]}>
                        3
                      </Text>
                    </Pressable>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      marginTop: 20,
                    }}>
                    <Pressable
                      onPress={() => this.onCustomKeyboardNumberPress(4)}
                      style={styles.keyboardButton}>
                      <Text
                        style={[
                          CommonStyles.text_18_bold,
                          {textAlign: 'center', color: COLOR.WHITE},
                        ]}>
                        4
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => this.onCustomKeyboardNumberPress(5)}
                      style={styles.keyboardButton}>
                      <Text
                        style={[
                          CommonStyles.text_18_bold,
                          {textAlign: 'center', color: COLOR.WHITE},
                        ]}>
                        5
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => this.onCustomKeyboardNumberPress(6)}
                      style={styles.keyboardButton}>
                      <Text
                        style={[
                          CommonStyles.text_18_bold,
                          {textAlign: 'center', color: COLOR.WHITE},
                        ]}>
                        6
                      </Text>
                    </Pressable>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      marginTop: 20,
                    }}>
                    <Pressable
                      onPress={() => this.onCustomKeyboardNumberPress(7)}
                      style={styles.keyboardButton}>
                      <Text
                        style={[
                          CommonStyles.text_18_bold,
                          {textAlign: 'center', color: COLOR.WHITE},
                        ]}>
                        7
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => this.onCustomKeyboardNumberPress(8)}
                      style={styles.keyboardButton}>
                      <Text
                        style={[
                          CommonStyles.text_18_bold,
                          {textAlign: 'center', color: COLOR.WHITE},
                        ]}>
                        8
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => this.onCustomKeyboardNumberPress(9)}
                      style={styles.keyboardButton}>
                      <Text
                        style={[
                          CommonStyles.text_18_bold,
                          {textAlign: 'center', color: COLOR.WHITE},
                        ]}>
                        9
                      </Text>
                    </Pressable>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      marginTop: 20,
                    }}>
                    <Pressable
                      onPress={() => this.onCustomKeyboardNumberPress(0)}
                      style={styles.keyboardButton}>
                      <Text
                        style={[
                          CommonStyles.text_18_bold,
                          {textAlign: 'center', color: COLOR.WHITE},
                        ]}>
                        0
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => this.onDeleteNumberPress()}
                      style={styles.keyboardButton}>
                      <Icon
                        style={{alignSelf: 'center'}}
                        size={20}
                        name="arrow-left"
                        color={COLOR.WHITE}
                      />
                    </Pressable>

                    {this.state.currentAnswer.length > 0 ? (
                      <Pressable
                        onPress={this.onPressEnter}
                        style={{
                          backgroundColor: COLOR.BLUE_LINk,
                          width: 65,
                          height: 65,
                          borderRadius: 20,
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={[
                            CommonStyles.text_12__semi_bold,
                            {textAlign: 'center', color: COLOR.WHITE},
                          ]}>
                          Enter
                        </Text>
                      </Pressable>
                    ) : (
                      <View style={{height: 65, width: 65}}></View>
                    )}
                  </View>
                </View>
              </View>
            )}
          </View>
        )}

        {this.state.showWelcomeAnimation && (
          <View
            style={{
              position: 'absolute',
              height: SCREEN_HEIGHT,
              width: SCREEN_WIDTH,
              backgroundColor: COLOR.WHITE,
            }}>
            <LottieView
              ref={animation => {
                this.animation = animation;
              }}
              source={lottie_countdown}
              autoPlay
              loop={false}
            />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state.dashboard,
    game: state.dashboard.speed_math_game_level_status,
    gameLevelResponse: state.dashboard.speed_math_game_level_response,
    currentSelectedKid: state.dashboard.current_selected_kid,
    speedMathGameStartStatus: state.dashboard.speed_math_game_start_status,
    speedMathGameStartResponse: state.dashboard.speed_math_game_start_response,
    speedMathResultStatus: state.dashboard.speed_math_result_status,
    speedMathResultResponse: state.dashboard.speed_math_result_response,
  };
};

const mapDispatchToProps = {
  submitSpeedMathAnswer,
  getSpeedMathResult,
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
  answerTextInput: {},
  textInputBordered: {
    width: 200,
    height: 100,
  },
  keyboardButton: {
    backgroundColor: COLOR.ORANGE,
    height: 65,
    width: 65,
    textAlign: 'center',
    borderRadius: 20,
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SpeedMathPlay);
