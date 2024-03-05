import React, {Component} from 'react';
import firebase from '../SmScreen/AppChat/Firebase/firebaseConfig';
import checkVersion from 'react-native-store-version';
import {AsyncStorage} from 'react-native';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  BackHandler,
  AppState,
  Modal,
  Pressable,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import {connect} from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {normalize} from 'react-native-elements';
import * as Progress from 'react-native-progress';
import messaging from '@react-native-firebase/messaging';
import LottieView from 'lottie-react-native';
import * as Constants from '../../components/helpers/Constants';
import {COLOR, CommonStyles} from '../../config/styles';
import {
  IC_MIDAS_SELECTION,
  IC_NUMERO,
  CARD_BTN_ARROW,
  LIVE_CLASS_TODAY,
  AVATAR_TEACHER,
  IC_ACCURACY,
  IC_TIME_SPENT,
  IC_ACTIVITY,
  IC_BANNER_3,
  SEAN_SWARNER_PIC,
} from '../../assets/images';
import {timeInHourFormat} from '../../components/helpers/CustomUtilMethods';
import {
  getDifferenceFromTodayDate,
  getDisplayFormattedDate,
  checkCurrentTimeIsValidToPeak,
} from '../../components/helpers';
import ComponentSpeedMathListItem from '../../components/ComponentSpeedMathListItem';
import {
  lottie_rocket,
  lottie_emotion,
  lottie_speed_math_icon,
  lottie_math_zone,
} from '../../assets/lottieAssets';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../config/configs';
import axios from 'axios';
import {BASE_URL} from '../../config/configs';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {showNotification} from '../../components/helpers/AndroidNotificationHandler';
import {AddUser} from '../SmScreen/AppChat/Firebase/Users';

class PaidUserScreen extends Component {
  constructor(props) {
    super(props);
    this.firebaseListenerRef = React.createRef();
    this.state = {
      currentKidDetails: null,
      liveClassId: 0,
      notificationDataPresent: false,
      appState: AppState.currentState,
      checkforNotification: false,
      skill_data: [],
      notificationVideoUrl: '',
      showLocalNotification: true,
      modalVisible: false,
      appVersionValue: '',
      student_id_notification: '',
      shareLifeSkills: false,
      coachResponse: false,
      videoNotification: false,
      chatNotification: false,
      notificationContent: [],
      mountingState: false,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('appVersionKey');
      if (value !== null) {
        this.setState({
          appVersionValue: value,
        });
      }
    } catch (error) {}
  };

  redirectToAppStore = async () => {
    if (Platform.OS == 'ios') {
      await Linking.openURL(
        'https://apps.apple.com/us/app/begalileo/id1537982021',
      );
    } else {
      await Linking.openURL(
        'https://play.google.com/store/apps/details?id=com.begalileorndev',
      );
    }

    console.log('update app now');
  };

  cancelUpdateAppPrompt = () => {
    console.log('dont update app now');
  };

  checkAppVersion = async () => {
    try {
      if (this.state.appVersionValue != '') {
        const check = await checkVersion({
          version: this.state.appVersionValue, // app local version
          iosStoreURL: 'https://apps.apple.com/us/app/begalileo/id1537982021',
          androidStoreURL:
            'https://play.google.com/store/apps/details?id=com.begalileorndev',
          country: 'jp', // default value is 'jp'
        });

        if (check.result === 'new') {
          Alert.alert('New version is available', '', [
            {
              text: 'Update now',
              onPress: () => this.redirectToAppStore(),
            },
            {
              text: 'Cancel',
              onPress: () => this.cancelUpdateAppPrompt(),
            },
          ]);
          // if app store version is new
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  openFirebseChatNotification = notificationData => {
    this.props.navigation.navigate(Constants.ChatScreen, {
      UserName: notificationData['sm_name'],
      guestUid: notificationData['sm_id'],
      fcmTokenId: notificationData['sm_id'],
      currentUid: notificationData['student_id'],
      role: 'Student',
    });
  };

  checkingStudentDataInFirebase = studentData => {
    let result = false;
    firebase
      .database()
      .ref('users')
      .on('value', datasnapshot => {
        datasnapshot.forEach(child => {
          if (child.val().UserId == studentData.student_id) {
            result = true;
          }
        });
      });

    return result;
  };
  checkingSmDataInFirebase = studentData => {
    let result = false;
    firebase
      .database()
      .ref('users')
      .on('value', datasnapshot => {
        datasnapshot.forEach(child => {
          if (child.val().UserId == studentData.sm_id) {
            result = true;
          }
        });
      });

    return result;
  };
  onClickFloatingButton = async studentData => {
    let result = this.checkingStudentDataInFirebase(studentData);
    let result2 = this.checkingSmDataInFirebase(studentData);
    if (result && result2) {
      this.props.navigation.navigate(Constants.ChatScreen, {
        currentUid: studentData.student_id,
        guestUid: studentData.sm_id,
        UserName: studentData.sm_name,
        role: 'Student',
      });
    } else {
      AddUser(studentData.first_name, '', '', studentData.student_id);
      AddUser(studentData.sm_name, '', '', studentData.sm_id);
      this.props.navigation.navigate(Constants.ChatScreen, {
        currentUid: studentData.student_id,
        guestUid: studentData.sm_id,
        UserName: studentData.sm_name,
        role: 'Student',
      });
    }
  };
  checkAppCurrentState = () => {
    this.appStateSubscription = AppState.addEventListener(
      'change',
      nextAppState => {
        if (
          this.state.appState.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          this.setState({
            checkforNotification: !this.state.checkforNotification,
          });
        }
        this.setState({appState: nextAppState});
      },
    );
  };
  //localNotification function when localNotification recieved
  localNotification = () => {
    this.firebaseListenerRef = messaging().onMessage(async remoteMessage => {
      const {data, notification} = remoteMessage;
      const isAndroid = Platform.OS === 'android';

      const setStateBasedOnMessageType = type => {
        switch (type) {
          case 'share_stories':
            this.setState({shareLifeSkills: true});
            break;
          case 'coach_response':
            this.setState({coachResponse: true});
            break;
          case 'video':
            this.setState({videoNotification: true});
            break;

          default:
            this.setState({
              shareLifeSkills: false,
              coachResponse: false,
              videoNotification: false,
            });
        }
      };

      const handleNotification = () => {
        if (isAndroid) {
          if (data.video_url) {
            this.setState({notificationVideoUrl: data.video_url});
            showNotification(notification.title, notification.body);
          }

          if (data.type === 'ChatNotifications') {
            this.setState({
              chatNotification: true,
              notificationContent: data,
            });
            showNotification(notification.title, notification.body);
          }

          if (data.student_id) {
            this.setState({student_id_notification: data.student_id});
            showNotification(notification.title, notification.body);
          }
        } else if (Platform.OS === 'ios') {
          if (data.type === 'ChatNotifications') {
            console.log('inside whne paid user screen');
            this.setState({
              chatNotification: true,
              notificationContent: data,
            });

            PushNotificationIOS.presentLocalNotification({
              alertBody: notification?.body,
              alertTitle: notification?.title,
            });
          }

          if (data.video_url) {
            this.setState({notificationVideoUrl: data.video_url});
            PushNotificationIOS.presentLocalNotification({
              alertBody: 'Training Video',
              alertTitle: 'Watch Now',
              alertAction: 'undefined',
            });
          }

          if (data.student_id && data.type !== 'ChatNotifications') {
            console.log('paid user screen data student id');
            this.setState({
              student_id_notification: data.student_id,
            });
            PushNotificationIOS.presentLocalNotification({
              alertBody: notification?.body,
              alertTitle: notification?.title,
            });
          }
        }
      };

      setStateBasedOnMessageType(data.type);
      handleNotification();
    });

    return this.firebaseListenerRef;
  };
  //onNotificationReceived function called when notification clicked
  onNotificationReceived = notification => {
    const {
      chatNotification,
      notificationVideoUrl,
      student_id_notification,
      shareLifeSkills,
      notificationContent,
    } = this.state;
    const isAndroid = Platform.OS === 'android';

    const isClicked = isAndroid
      ? notification.userInteraction
      : notification?.getData()['userInteraction'] === 1;

    if (isClicked) {
      if (isAndroid) {
        console.log('trigger inside android');
        if (chatNotification) {
          this.openFirebseChatNotification(notificationContent);
        }

        if (notificationVideoUrl) {
          this.openTheVideoNotification(notificationVideoUrl);
        }

        if (student_id_notification && !shareLifeSkills) {
          this.openChatWindowOnNotification(student_id_notification);
        }

        if (student_id_notification && shareLifeSkills) {
          this.openShareLifeSkillsOnNotification(student_id_notification);
        }
      } else {
        console.log('inside main else');
        if (chatNotification) {
          console.log('inside else condition ios');
          this.openFirebseChatNotification(notificationContent);
        }
        if (notificationVideoUrl) {
          this.openTheVideoNotification(notificationVideoUrl);
        }

        if (student_id_notification && !shareLifeSkills) {
          this.openChatWindowOnNotification(student_id_notification);
        }

        if (student_id_notification && shareLifeSkills) {
          this.openShareLifeSkillsOnNotification(student_id_notification);
        }
      }
    }
  };

  handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }
  componentDidMount() {
    console.log(' componentDidMount paid user screen');

    this.renderDashboardData();
    this.checkAppCurrentState();

    this.localNotification();

    PushNotificationIOS.addEventListener(
      'localNotification',
      this.onNotificationReceived,
    );

    // PushNotification.configure({
    //   onNotification: (notification) => {
    //     console.log("notificationssssss", notification);

    //     this.onNotificationReceived(notification);
    //   },
    // });

    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    const id = setTimeout(() => {
      if (this?.props?.currentSelectedKid.life_skill_program) {
        this.getSkillsData();
      }

      clearTimeout(id);
    }, 1000);

    this._retrieveData();
  }
  componentWillUnmount() {
    if (this.firebaseListenerRef) {
      this.firebaseListenerRef();
    }
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    PushNotificationIOS.removeEventListener(
      'localNotification',
      this.onNotificationReceived,
    );

    this.appStateSubscription.remove();
  }

  goToViewCurriculum = () => {
    this.props.navigation.navigate(Constants.ViewCurriculum);
  };

  checkForNotification() {
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          this.setState({
            notificationDataPresent: true,
            videoNotification: false,
            shareLifeSkills: false,
            coachResponse: false,
          });

          if (remoteMessage.data) {
            if (remoteMessage.data.type == 'join') {
              this.peakTheLiveClass(remoteMessage.data.live_class_id);
            }
            if (remoteMessage.data.type == 'video') {
              if (remoteMessage.data.video_url != '') {
                this.openTheVideoNotification(remoteMessage.data.video_url);
                this.setState({
                  videoNotification: true,
                });
              }
            }

            if (remoteMessage.data.type == 'coach_response') {
              if (remoteMessage.data.student_id != '') {
                this.openChatWindowOnNotification(
                  remoteMessage.data.student_id,
                );
                this.setState({
                  coachResponse: true,
                });
              }
            }
            if (remoteMessage.data.type == 'share_stories') {
              if (remoteMessage.data.student_id != '') {
                this.openShareLifeSkillsOnNotification(
                  remoteMessage.data.student_id,
                );

                this.setState({
                  shareLifeSkills: true,
                });
              }
            }

            if (remoteMessage.data.type == 'ChatNotifications') {
              if (remoteMessage.data.student_id != '') {
                this.openFirebseChatNotification(remoteMessage.data);
              }
            }
          }
        }
      });
  }

  setCurrentSessionKid = () => {
    this.props.dashboardResponse.students.map(item => {
      if (item.selected_student) {
        this.setState({
          currentSessionKid: item,
        });
      }
    });
  };

  onChooseBatchClick = () => {
    this.props.navigation.navigate(Constants.PreferLiveBatchScreen);
  };

  renderDashboardData = () => {
    let selectedStudent = null;
    if (this.props.dashboardStatus) {
      this.props.dashboardResponse.students.map(item => {
        if (item.selected_student) {
          selectedStudent = item;
        }
      });
    }

    if (selectedStudent != null) {
      this.setState({
        currentKidDetails: selectedStudent,
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.currentSelectedKid != undefined &&
      this.props.dashboardResponse.students != undefined
    ) {
      if (this.props.dashboardResponse !== prevProps.dashboardResponse) {
        this.checkForNotification();
        this.props.dashboardResponse.students.map(item => {
          if (item.student_id == this.props.currentSelectedKid.student_id) {
            // this.setState({
            //     currentKidDetails: item
            // })
          }
        });
      }
    }

    if (prevProps.dashboardStatus != this.props.dashboardStatus) {
      this.renderDashboardData();
    }

    if (
      prevState.notificationDataPresent != this.state.notificationDataPresent
    ) {
      this.checkForNotification();
    }

    if (prevState.checkforNotification != this.state.checkforNotification) {
      this.checkForNotification();
    }

    if (prevState.appVersionValue != this.state.appVersionValue) {
      this.checkAppVersion();
    }
  }

  mathZone = mathZoneData => (
    <View style={{marginTop: 12}}>
      <Text
        style={[CommonStyles.text_8_regular, {color: COLOR.TEXT_ALPHA_GREY}]}>
        Math Zone
      </Text>
      <View
        style={[
          CommonStyles.shadowContainer_border_20,
          {backgroundColor: COLOR.WHITE, marginTop: normalize(8)},
        ]}>
        {mathZoneData.map((item, index) => (
          <View key={`MATH_${index}`} style={{margin: normalize(16)}}>
            <Text style={[CommonStyles.text_14_bold]}>{item.tag}</Text>
            <Text
              style={[
                CommonStyles.text_12_Regular,
                {color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2)},
              ]}>
              {item.sub_concept}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: normalize(8),
                alignItems: 'center',
              }}>
              <Icon
                style={{marginStart: normalize(8)}}
                size={15}
                name="check"
                color={COLOR.TEXT_COLOR_GREEN}
              />
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  {
                    color: COLOR.TEXT_ALPHA_GREY,
                    marginStart: normalize(5),
                  },
                ]}>
                {item.correct}
              </Text>
              <Icon
                style={{marginStart: normalize(8)}}
                size={15}
                name="times"
                color={COLOR.RED}
              />

              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  {
                    color: COLOR.TEXT_ALPHA_GREY,
                    marginStart: normalize(5),
                  },
                ]}>
                {item.incorrect}
              </Text>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  {
                    color: COLOR.TEXT_ALPHA_GREY,
                    marginStart: normalize(10),
                  },
                ]}>
                {item.timespent} hrs
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  logicZone = logicZoneData => (
    <View style={{marginTop: 12}}>
      <Text
        style={[CommonStyles.text_8_regular, {color: COLOR.TEXT_ALPHA_GREY}]}>
        Logic Zone
      </Text>
      <View
        style={[
          CommonStyles.shadowContainer_border_20,
          {backgroundColor: COLOR.WHITE, marginTop: normalize(8)},
        ]}>
        {logicZoneData.map(item => (
          <View style={{margin: normalize(16)}}>
            <Text style={[CommonStyles.text_14_bold]}>{item.tag}</Text>
            <Text
              style={[
                CommonStyles.text_12_Regular,
                {color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2)},
              ]}>
              {item.sub_concept}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: normalize(8),
                alignItems: 'center',
              }}>
              <Icon
                style={{marginStart: normalize(8)}}
                size={15}
                name="check"
                color={COLOR.TEXT_COLOR_GREEN}
              />
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  {
                    color: COLOR.TEXT_ALPHA_GREY,
                    marginStart: normalize(5),
                  },
                ]}>
                {item.correct}
              </Text>
              <Icon
                style={{marginStart: normalize(8)}}
                size={15}
                name="times"
                color={COLOR.RED}
              />

              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  {
                    color: COLOR.TEXT_ALPHA_GREY,
                    marginStart: normalize(5),
                  },
                ]}>
                {item.incorrect}
              </Text>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  {
                    color: COLOR.TEXT_ALPHA_GREY,
                    marginStart: normalize(10),
                  },
                ]}>
                {item.timespent} hrs
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  lastPracticeDetails = lastPracticeData => (
    <View
      style={{
        backgroundColor: COLOR.WHITE,
        paddingVertical: 20,
        borderRadius: normalize(10),
      }}>
      <View
        style={{marginHorizontal: normalize(5), marginBottom: normalize(5)}}>
        <Text style={[CommonStyles.text_14_bold]}>Recent Activity</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, marginHorizontal: normalize(5)}}>
          {lastPracticeData.home_practice_details.length > 0 && (
            <View style={{marginTop: normalize(2)}}>
              <View>
                <Text
                  style={[
                    CommonStyles.text_8_regular,
                    {
                      color: COLOR.TEXT_ALPHA_GREY,
                      marginStart: normalize(15),
                      marginTop: normalize(10),
                    },
                  ]}>
                  Home Practice
                </Text>
                <View
                  style={[
                    CommonStyles.boxShadow,
                    {
                      backgroundColor: COLOR.WHITE,
                      marginTop: normalize(8),
                      marginHorizontal: 20,
                      flex: 1,
                      borderRadius: 20,
                    },
                  ]}>
                  {lastPracticeData.home_practice_details.map(item => (
                    <View style={{flex: 1, margin: normalize(16)}}>
                      <Text style={[CommonStyles.text_14_bold]}>
                        {item.tag_name}
                      </Text>
                      <Text
                        style={[
                          CommonStyles.text_12_Regular,
                          {
                            color: COLOR.TEXT_ALPHA_GREY,
                            marginTop: normalize(2),
                          },
                        ]}>
                        {item.sub_concept_name}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: normalize(8),
                          alignItems: 'center',
                        }}>
                        <Icon
                          style={{marginStart: normalize(8)}}
                          size={15}
                          name="check"
                          color={COLOR.TEXT_COLOR_GREEN}
                        />
                        <Text
                          style={[
                            CommonStyles.text_12_Regular,
                            {
                              color: COLOR.TEXT_ALPHA_GREY,
                              marginStart: normalize(5),
                            },
                          ]}>
                          {item.correct}
                        </Text>
                        <Icon
                          style={{marginStart: normalize(8)}}
                          size={15}
                          name="times"
                          color={COLOR.RED}
                        />

                        <Text
                          style={[
                            CommonStyles.text_12_Regular,
                            {
                              color: COLOR.TEXT_ALPHA_GREY,
                              marginStart: normalize(5),
                            },
                          ]}>
                          {item.total - item.correct}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}

          {lastPracticeData.class_practice_details.length > 0 && (
            <View>
              <Text
                style={[
                  CommonStyles.text_8_regular,
                  {
                    color: COLOR.TEXT_ALPHA_GREY,
                    marginStart: normalize(15),
                    marginTop: normalize(10),
                  },
                ]}>
                Class Practice
              </Text>
              <View
                style={[
                  CommonStyles.boxShadow,
                  {
                    backgroundColor: COLOR.WHITE,
                    marginTop: normalize(8),
                    borderRadius: 20,
                    marginHorizontal: normalize(20),
                  },
                ]}>
                {lastPracticeData.class_practice_details.map(item => (
                  <View style={{margin: normalize(16)}}>
                    <Text style={[CommonStyles.text_14_bold]}>
                      {item.tag_name}
                    </Text>
                    <Text
                      style={[
                        CommonStyles.text_12_Regular,
                        {
                          color: COLOR.TEXT_ALPHA_GREY,
                          marginTop: normalize(2),
                        },
                      ]}>
                      {item.sub_concept_name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: normalize(8),
                        alignItems: 'center',
                      }}>
                      <Icon
                        style={{marginStart: normalize(8)}}
                        size={15}
                        name="check"
                        color={COLOR.TEXT_COLOR_GREEN}
                      />
                      <Text
                        style={[
                          CommonStyles.text_12_Regular,
                          {
                            color: COLOR.TEXT_ALPHA_GREY,
                            marginStart: normalize(5),
                          },
                        ]}>
                        {item.correct}
                      </Text>
                      <Icon
                        style={{marginStart: normalize(8)}}
                        size={15}
                        name="times"
                        color={COLOR.RED}
                      />

                      <Text
                        style={[
                          CommonStyles.text_12_Regular,
                          {
                            color: COLOR.TEXT_ALPHA_GREY,
                            marginStart: normalize(5),
                          },
                        ]}>
                        {item.total - item.correct}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {lastPracticeData.pre_test.length > 0 && (
            <View>
              <Text
                style={[
                  CommonStyles.text_8_regular,
                  {
                    color: COLOR.TEXT_ALPHA_GREY,
                    marginStart: normalize(15),
                    marginTop: normalize(10),
                  },
                ]}>
                Pre Test
              </Text>
              <View
                style={[
                  CommonStyles.boxShadow,
                  {
                    backgroundColor: COLOR.WHITE,
                    marginTop: normalize(8),
                    marginHorizontal: normalize(20),
                    borderRadius: 20,
                  },
                ]}>
                {lastPracticeData.pre_test.map(item => (
                  <View style={{margin: normalize(16)}}>
                    <Text style={[CommonStyles.text_14_bold]}>
                      {item.sub_concept_name}
                    </Text>
                    <Text
                      style={[
                        CommonStyles.text_12_Regular,
                        {
                          color: COLOR.TEXT_ALPHA_GREY,
                          marginTop: normalize(2),
                        },
                      ]}>
                      {item.status}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: normalize(8),
                        alignItems: 'center',
                      }}>
                      <Icon
                        style={{marginStart: normalize(8)}}
                        size={15}
                        name="check"
                        color={COLOR.TEXT_COLOR_GREEN}
                      />
                      <Text
                        style={[
                          CommonStyles.text_12_Regular,
                          {
                            color: COLOR.TEXT_ALPHA_GREY,
                            marginStart: normalize(5),
                          },
                        ]}>
                        {item.correct}
                      </Text>
                      <Icon
                        style={{marginStart: normalize(8)}}
                        size={15}
                        name="times"
                        color={COLOR.RED}
                      />

                      <Text
                        style={[
                          CommonStyles.text_12_Regular,
                          {
                            color: COLOR.TEXT_ALPHA_GREY,
                            marginStart: normalize(5),
                          },
                        ]}>
                        {item.total - item.correct}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {lastPracticeData.concept_test.length > 0 && (
            <View>
              <Text
                style={[
                  CommonStyles.text_8_regular,
                  {
                    color: COLOR.TEXT_ALPHA_GREY,
                    marginStart: normalize(15),
                    marginTop: normalize(10),
                  },
                ]}>
                Concept Test
              </Text>
              <View
                style={[
                  CommonStyles.boxShadow,
                  {
                    backgroundColor: COLOR.WHITE,
                    marginTop: normalize(8),
                    marginHorizontal: normalize(20),
                    borderRadius: 20,
                  },
                ]}>
                {lastPracticeData.concept_test.map(item => (
                  <View style={{margin: normalize(16)}}>
                    <Text style={[CommonStyles.text_14_bold]}>
                      {item.test_name}
                    </Text>
                    <Text
                      style={[
                        CommonStyles.text_12_Regular,
                        {
                          color: COLOR.TEXT_ALPHA_GREY,
                          marginTop: normalize(2),
                        },
                      ]}>
                      {item.status}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: normalize(8),
                        alignItems: 'center',
                      }}>
                      <Icon
                        style={{marginStart: normalize(8)}}
                        size={15}
                        name="check"
                        color={COLOR.TEXT_COLOR_GREEN}
                      />
                      <Text
                        style={[
                          CommonStyles.text_12_Regular,
                          {
                            color: COLOR.TEXT_ALPHA_GREY,
                            marginStart: normalize(5),
                          },
                        ]}>
                        {item.correct}
                      </Text>
                      <Icon
                        style={{marginStart: normalize(8)}}
                        size={15}
                        name="times"
                        color={COLOR.RED}
                      />

                      <Text
                        style={[
                          CommonStyles.text_12_Regular,
                          {
                            color: COLOR.TEXT_ALPHA_GREY,
                            marginStart: normalize(5),
                          },
                        ]}>
                        {item.total - item.correct}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {lastPracticeData.checkpont.length > 0 && (
            <View>
              <Text
                style={[
                  CommonStyles.text_8_regular,
                  {
                    color: COLOR.TEXT_ALPHA_GREY,
                    marginStart: normalize(15),
                    marginTop: normalize(10),
                  },
                ]}>
                Check Point
              </Text>
              <View
                style={[
                  CommonStyles.boxShadow,
                  {
                    backgroundColor: COLOR.WHITE,
                    marginTop: normalize(8),
                    marginHorizontal: normalize(20),
                    borderRadius: 20,
                  },
                ]}>
                {lastPracticeData.checkpont.map(item => (
                  <View style={{margin: normalize(16)}}>
                    <Text style={[CommonStyles.text_14_bold]}>
                      {item.sub_concept_name}
                    </Text>
                    <Text
                      style={[
                        CommonStyles.text_12_Regular,
                        {
                          color: COLOR.TEXT_ALPHA_GREY,
                          marginTop: normalize(2),
                        },
                      ]}>
                      {item.status}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: normalize(8),
                        alignItems: 'center',
                      }}>
                      <Icon
                        style={{marginStart: normalize(8)}}
                        size={15}
                        name="check"
                        color={COLOR.TEXT_COLOR_GREEN}
                      />
                      <Text
                        style={[
                          CommonStyles.text_12_Regular,
                          {
                            color: COLOR.TEXT_ALPHA_GREY,
                            marginStart: normalize(5),
                          },
                        ]}>
                        {item.correct}
                      </Text>
                      <Icon
                        style={{marginStart: normalize(8)}}
                        size={15}
                        name="times"
                        color={COLOR.RED}
                      />

                      <Text
                        style={[
                          CommonStyles.text_12_Regular,
                          {
                            color: COLOR.TEXT_ALPHA_GREY,
                            marginStart: normalize(5),
                          },
                        ]}>
                        {item.total - item.correct}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}

          {lastPracticeData.speed_math_details.length > 0 && (
            <Text
              style={[
                CommonStyles.text_8_regular,
                {color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(5)},
              ]}>
              Speed Math
            </Text>
          )}
          {
            <View style={{marginHorizontal: normalize(5)}}>
              {lastPracticeData.speed_math_details.map(itemSpeedMath => (
                <ComponentSpeedMathListItem conceptData={itemSpeedMath} />
              ))}
            </View>
          }
          <TouchableOpacity
            onPress={this.onPressViewAllActivity}
            style={{
              flexDirection: 'row',
              marginTop: normalize(20),
              marginBottom: normalize(10),
              alignSelf: 'center',
            }}>
            <Image
              style={{
                height: normalize(16),
                width: normalize(16),
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
              source={IC_ACTIVITY}
            />
            <Text
              style={[
                CommonStyles.text_12_bold,
                {color: COLOR.TEXT_COLOR_GREEN, marginStart: normalize(8)},
              ]}>
              View All Activites
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.goToViewCurriculum}
            style={{
              flexDirection: 'row',
              marginTop: normalize(10),
              marginBottom: normalize(20),
              alignSelf: 'center',
            }}>
            <Icon size={20} name="book" color={COLOR.TEXT_COLOR_GREEN} />
            <Text
              style={[
                CommonStyles.text_12_bold,
                {color: COLOR.TEXT_COLOR_GREEN, marginStart: normalize(8)},
              ]}>
              View full curriculum
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  currentlyLearning = () => (
    <View
      style={{
        backgroundColor: COLOR.WHITE,
        marginVertical: normalize(20),
        borderRadius: normalize(15),
      }}>
      <Text style={[CommonStyles.text_14_bold]}>Currently Learning</Text>
      <View
        style={[
          CommonStyles.shadowContainer_border_20,
          {
            marginTop: normalize(5),
            marginStart: normalize(1),
            marginEnd: normalize(1),
          },
        ]}>
        <View style={{margin: normalize(16)}}>
          <Text
            style={[CommonStyles.text_8_bold, {color: COLOR.TEXT_ALPHA_GREY}]}>
            MATH CONCEPT
          </Text>
          <Text style={[CommonStyles.text_14_bold, {marginTop: normalize(2)}]}>
            Numbers upto 10
          </Text>

          <View
            style={{
              flexDirection: 'row',
              marginTop: normalize(8),
              justifyContent: 'space-evenly',
            }}>
            <Text
              style={[
                CommonStyles.text_12_Regular,
                {color: COLOR.TEXT_ALPHA_GREY},
              ]}>
              6 Sub Concepts
            </Text>
            <Text
              style={[
                CommonStyles.text_12_Regular,
                {color: COLOR.TEXT_ALPHA_GREY},
              ]}>
              1 Concept Test
            </Text>
          </View>
          <View style={{marginTop: normalize(20)}}>
            <Progress.Bar
              progress={0.5}
              width={normalize(230)}
              color={COLOR.TEXT_COLOR_GREEN}
            />
            <Text
              style={[
                CommonStyles.text_9_regular,
                {color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(8)},
              ]}>
              50% Completed
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  onPressViewAllActivity = () => {
    this.props.navigation.navigate(Constants.OverallActivitiesScreen);
  };

  recentActivity = () => {
    const {currentKidDetails} = this.state;
    return (
      <View>
        <View style={{flex: 1, marginTop: normalize(16)}}>
          {currentKidDetails.activity_details.recent_activity_data.length > 0 &&
            this.lastPracticeDetails(
              currentKidDetails.activity_details.recent_activity_data[0],
            )}
        </View>
      </View>
    );
  };

  onPressAccuracyTimeSpent = () => {
    this.props.navigation.navigate('Report');
  };

  handleViewEmotions = () => {
    this.props.navigation.navigate(Constants.EMOTION_DISPLAY);
  };

  speedMathDisplayCard = () => (
    <TouchableOpacity
      onPress={this.goToSpeedMath}
      style={[
        CommonStyles.boxShadow,
        {
          flexDirection: 'row',
          backgroundColor: COLOR.WHITE,
          marginHorizontal: 20,
          marginVertical: 20,
          borderRadius: 20,
        },
      ]}>
      <View style={{flex: 1}}>
        <View style={{height: 100, flex: 1, justifyContent: 'center'}}>
          <LottieView source={lottie_speed_math_icon} autoPlay loop />
        </View>
      </View>
      <View style={{flex: 1, marginEnd: 20, marginVertical: 20}}>
        <Text style={[CommonStyles.text_14_bold]}>Speed Math</Text>
        <Text style={[CommonStyles.text_12_Regular, {marginTop: normalize(5)}]}>
          Play speed math game now...
        </Text>
      </View>
    </TouchableOpacity>
  );

  emotionDisplayCard = () => (
    <TouchableOpacity
      onPress={this.handleViewEmotions}
      style={[
        CommonStyles.boxShadow,
        {
          flexDirection: 'row',
          backgroundColor: COLOR.WHITE,
          marginHorizontal: 20,
          borderRadius: 20,
        },
      ]}>
      <View style={{flex: 1}}>
        <View style={{height: 100, flex: 1, justifyContent: 'center'}}>
          <LottieView source={lottie_emotion} autoPlay loop />
        </View>
      </View>
      <View style={{flex: 1, marginEnd: 20, marginVertical: 20}}>
        <Text style={[CommonStyles.text_14_bold]}>Emotions</Text>
        <Text style={[CommonStyles.text_12_Regular, {marginTop: normalize(5)}]}>
          View Child Emotions
        </Text>
      </View>
    </TouchableOpacity>
  );

  handleMathZone = () => {
    this.props.navigation.navigate(Constants.MATH_ZONE_HOME_SCREEN, {
      student_id: this.props.currentSelectedKid.student_id,
    });
  };

  handleMathZoneTest = () => {
    this.props.navigation.navigate(Constants.MATH_ZONE_HOME_SCREEN_TESTING, {
      student_id: this.props.currentSelectedKid.student_id,
    });
  };

  getSkillsData = async () => {
    axios
      .get(`${BASE_URL}app_mathbox/core_skills`, {
        params: {student_id: this?.props?.currentSelectedKid?.student_id},
      })
      .then(res => {
        if (res.data.status) {
          this.setState(
            {
              skill_data: res.data.skill_data,
            },
            () => {},
          );
        }
      })
      .catch(error => {
        console.log(error.message, 'error');
      });
  };

  mathZoneDisplayCard = () => (
    <TouchableOpacity
      onPress={this.handleMathZone}
      style={[
        CommonStyles.boxShadow,
        {
          flexDirection: 'row',
          backgroundColor: COLOR.WHITE,
          marginHorizontal: 20,
          marginTop: 20,
          borderRadius: 20,
        },
      ]}>
      <View style={{flex: 1}}>
        <View style={{height: 100, flex: 1, justifyContent: 'center'}}>
          <LottieView source={lottie_math_zone} autoPlay loop />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          marginEnd: 20,
          marginVertical: 20,
          justifyContent: 'center',
        }}>
        <Text style={[CommonStyles.text_14_bold, {}]}>Math Zone</Text>
      </View>
    </TouchableOpacity>
  );

  accuracyAndTimeSpent = () => {
    const {currentKidDetails} = this.state;

    if (currentKidDetails.activity_details != '') {
      return (
        <View
          style={{
            marginBottom: normalize(20),
            marginHorizontal: normalize(5),
          }}>
          {currentKidDetails.activity_details.accuracy > 0 ? (
            <View>
              <TouchableOpacity
                onPress={this.onPressAccuracyTimeSpent}
                style={[
                  CommonStyles.boxShadow,
                  {
                    backgroundColor: COLOR.WHITE,
                    marginTop: normalize(20),
                    marginHorizontal: 20,
                    borderRadius: 20,
                  },
                ]}>
                <Image
                  style={{
                    height: normalize(32),
                    width: normalize(32),
                    marginTop: normalize(16),
                    marginStart: normalize(16),
                    resizeMode: 'contain',
                  }}
                  source={IC_ACCURACY}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'flex-start',
                    marginTop: normalize(12),
                    marginBottom: normalize(16),
                    marginStart: normalize(16),
                  }}>
                  <View style={{flex: 1}}>
                    <Text style={[CommonStyles.text_14_bold]}>Accuracy</Text>
                    <Text
                      style={[
                        CommonStyles.text_12_Regular,
                        {marginTop: normalize(2)},
                      ]}>
                      Average of correct answers given by kid
                    </Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <View
                      style={{flexDirection: 'row', alignItems: 'baseline'}}>
                      <Text style={[CommonStyles.text_14_Regular]}>
                        {currentKidDetails.activity_details.accuracy.toFixed(2)}
                      </Text>
                      <Text style={[CommonStyles.text_12_Regular, {}]}> %</Text>
                    </View>
                    <Text
                      style={[
                        CommonStyles.text_12_Regular,
                        {marginTop: normalize(2)},
                      ]}>
                      Last 7 days
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.onPressAccuracyTimeSpent}
                style={[
                  CommonStyles.boxShadow,
                  {
                    backgroundColor: COLOR.WHITE,
                    marginTop: 20,
                    marginHorizontal: 20,
                    borderRadius: 20,
                  },
                ]}>
                <Image
                  style={{
                    height: normalize(32),
                    width: normalize(32),
                    marginTop: normalize(16),
                    marginStart: normalize(16),
                    resizeMode: 'contain',
                  }}
                  source={IC_TIME_SPENT}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    alignItems: 'flex-start',
                    marginTop: normalize(8),
                    marginBottom: normalize(16),
                    marginStart: normalize(16),
                  }}>
                  <View style={{flex: 1}}>
                    <Text style={[CommonStyles.text_14_bold]}>Time Spent</Text>
                    <Text
                      style={[
                        CommonStyles.text_12_Regular,
                        {marginTop: normalize(2)},
                      ]}>
                      Total time spend by kid
                    </Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <View
                      style={{flexDirection: 'row', alignItems: 'baseline'}}>
                      <Text style={[CommonStyles.text_14_Regular]}>
                        {timeInHourFormat(
                          currentKidDetails.activity_details.timespent,
                        )}
                      </Text>
                    </View>
                    <Text
                      style={[
                        CommonStyles.text_11_Regular,
                        {marginTop: normalize(2)},
                      ]}>
                      Last 7 days
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={[
                CommonStyles.boxShadow,
                {
                  backgroundColor: COLOR.BLUE_LINk,
                  marginTop: normalize(20),
                  marginHorizontal: 20,
                  borderRadius: 20,
                  flexDirection: 'row',
                },
              ]}>
              <View style={{height: 200, flex: 1, justifyContent: 'center'}}>
                <LottieView source={lottie_rocket} autoPlay loop />
              </View>
              <View style={{flex: 1, justifyContent: 'center', marginEnd: 5}}>
                <Text style={[CommonStyles.text_12_bold, {color: COLOR.WHITE}]}>
                  The learning jet is yet to blast off
                </Text>
                <Text
                  style={[
                    CommonStyles.text_12_bold,
                    {color: COLOR.WHITE, marginTop: 10},
                  ]}>
                  Fasten the belts
                </Text>
              </View>
            </View>
          )}
        </View>
      );
    }
  };

  goToTraingDetails = () => {
    console.log('Skill data', this.props.currentSelectedKid.student_id);
    this.props.navigation.navigate(Constants.TRAINING_PROGRAM_SCREEN, {
      skillData: this.state.skill_data,
      student_id: this.props.currentSelectedKid.student_id,
    });
  };

  showTrainingProgram = () => {
    return (
      <View style={{marginTop: normalize(10)}}>
        <View
          style={[
            CommonStyles.boxShadow,
            {
              backgroundColor: COLOR.WHITE,
              margin: normalize(10),
              borderRadius: normalize(24),
            },
          ]}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                height: normalize(110),
                marginStart: normalize(5),
                marginTop: normalize(5),
              }}>
              <View
                style={{
                  height: normalize(102),
                  width: normalize(102),
                  borderRadius: 20,
                  backgroundColor: COLOR.LOGIN_BANNER_BG,
                  overflow: 'hidden',
                }}>
                <Image
                  style={{
                    height: normalize(78),
                    width: normalize(100),
                    resizeMode: 'contain',
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                  }}
                  source={SEAN_SWARNER_PIC}
                />
              </View>
            </View>
            <View style={{flex: 1, marginStart: normalize(16)}}>
              <Text
                style={[
                  CommonStyles.text_12_bold,
                  {
                    flexShrink: 1,
                    color: COLOR.TEXT_COLOR_BLACK,
                    marginTop: normalize(8),
                  },
                ]}>
                Life-Skill Program
              </Text>
              <Text
                style={[
                  CommonStyles.text_12_bold,
                  {
                    flexShrink: 1,
                    color: COLOR.TEXT_COLOR_BLACK,
                    marginTop: normalize(8),
                  },
                ]}>
                {this.props?.currentSelectedKid?.life_skill_program_name}
              </Text>

              <TouchableOpacity
                onPress={() => this.goToTraingDetails()}
                style={{
                  flexDirection: 'row',
                  marginTop: normalize(24),
                  marginEnd: normalize(10),
                  marginBottom: normalize(10),
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={[
                    CommonStyles.text_12_bold,
                    {
                      color: COLOR.TEXT_COLOR_BLUE,
                      marginStart: normalize(8),
                      alignSelf: 'center',
                    },
                  ]}>
                  View Details
                </Text>
                <Image
                  style={{
                    height: normalize(28),
                    width: normalize(28),
                    resizeMode: 'contain',
                  }}
                  source={CARD_BTN_ARROW}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  peakTheLiveClass = liveId => {
    this.props.navigation.navigate(Constants.ParentConnect, {
      navigation: this.props.navigation,
      live_class_id: liveId,
      student_id: this.props.currentSelectedKid.student_id,
      student_name: this.props.currentSelectedKid.first_name,
      parent_id: this.props.dashboardResponse.parent_id,
      triggerfn: this.props?.triggerfn,
    });
  };

  openTheVideoNotification = videoUrl => {
    this.props.navigation.navigate(
      Constants.TRAINING_PROGRAM_NOTIFICATION_VIDEO,
      {
        navigation: this.props.navigation,
        video_url: videoUrl,
      },
    );
  };

  openChatWindowOnNotification = student_id => {
    if (this.state.skill_data.length == 0) {
      const testingDataIsPresent = setTimeout(() => {
        if (
          this?.props?.currentSelectedKid.life_skill_program &&
          this.props.currentSelectedKid.student_id == student_id
        ) {
          this.props.navigation.navigate(Constants.TRAINING_PROGRAM_SCREEN, {
            skillData: this.state.skill_data,
            student_id: this.props.currentSelectedKid.student_id,
            openChat: true,
            shareLifeSkills: false,
          });
        }

        clearTimeout(testingDataIsPresent);
        return;
      }, 1200);
    } else {
      if (
        this?.props?.currentSelectedKid.life_skill_program &&
        this.props.currentSelectedKid.student_id == student_id
      ) {
        this.props.navigation.navigate(Constants.TRAINING_PROGRAM_SCREEN, {
          skillData: this.state.skill_data,
          student_id: this.props.currentSelectedKid.student_id,
          openChat: true,
          shareLifeSkills: false,
        });
      }
    }
  };

  openShareLifeSkillsOnNotification = student_id => {
    if (this.state.skill_data.length == 0) {
      const testingDataIsPresent = setTimeout(() => {
        if (
          this?.props?.currentSelectedKid.life_skill_program &&
          this.props.currentSelectedKid.student_id == student_id
        ) {
          this.props.navigation.navigate(Constants.TRAINING_PROGRAM_SCREEN, {
            skillData: this.state.skill_data,
            student_id: this.props.currentSelectedKid.student_id,
            openChat: false,
            shareLifeSkills: true,
          });
        }
        clearTimeout(testingDataIsPresent);
        return;
      }, 1200);
    } else {
      if (
        this?.props?.currentSelectedKid.life_skill_program &&
        this.props.currentSelectedKid.student_id == student_id
      ) {
        this.props.navigation.navigate(Constants.TRAINING_PROGRAM_SCREEN, {
          skillData: this.state.skill_data,
          student_id: this.props.currentSelectedKid.student_id,
          openChat: false,
          shareLifeSkills: true,
        });
      }
    }
  };

  joinLiveClassChildScreen = liveId => {
    this.props.navigation.navigate(Constants.JoinLiveClassButton, {
      navigation: this.props.navigation,
      live_class_id: liveId,
      student_id: this.props.currentSelectedKid.student_id,
      student_name: this.props.currentSelectedKid.first_name,
      parent_id: this.props.dashboardResponse.parent_id,
    });
  };

  checkLiveClassStatusForParentPeek = liveClassDetails => (
    <View
      style={[
        CommonStyles.boxShadow,
        {
          marginTop: normalize(20),
          marginHorizontal: 20,
          backgroundColor: COLOR.WHITE,
          borderRadius: 20,
        },
      ]}>
      <Text
        style={[
          CommonStyles.text_18_semi_bold,
          {marginHorizontal: 20, marginTop: 32},
        ]}>
        Live Class
      </Text>
      {liveClassDetails.todays_class ? (
        <Text
          style={[
            CommonStyles.text_14_Regular,
            {
              color: COLOR.TEXT_ALPHA_GREY,
              marginTop: normalize(1),
              marginStart: 20,
            },
          ]}>
          Today
        </Text>
      ) : (
        <Text
          style={[
            CommonStyles.text_14_Regular,
            {
              color: COLOR.TEXT_ALPHA_GREY,
              marginTop: normalize(1),
              marginStart: 20,
            },
          ]}>
          {getDifferenceFromTodayDate(
            liveClassDetails.start_date,
            liveClassDetails.time,
          )}{' '}
          Ago
        </Text>
      )}

      <View
        style={[
          CommonStyles.boxShadow,
          {
            backgroundColor: COLOR.WHITE,
            marginTop: normalize(20),
            marginHorizontal: normalize(20),
            marginBottom: 20,
            borderRadius: 20,
          },
        ]}>
        <View
          style={{
            flex: 1,
            height: 150,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,

            overflow: 'hidden',
          }}>
          <Image
            style={{
              height: normalize(150),
              alignSelf: 'center',
              resizeMode: 'contain',
            }}
            source={LIVE_CLASS_TODAY}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
            marginTop: normalize(16),
            marginStart: normalize(16),
            marginBottom: 16,
          }}>
          <View style={{flex: 1}}>
            <Text
              style={[CommonStyles.text_14_bold, {marginTop: normalize(2)}]}>
              {getDisplayFormattedDate(liveClassDetails.start_date)}
            </Text>
            <Text
              style={[CommonStyles.text_14_bold, {marginTop: normalize(2)}]}>
              {liveClassDetails.time}
            </Text>
          </View>
        </View>

        {checkCurrentTimeIsValidToPeak(
          liveClassDetails.start_date,
          liveClassDetails.time,
        ) && (
          <TouchableOpacity
            onPress={() =>
              this.peakTheLiveClass(liveClassDetails.live_class_id)
            }>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: normalize(16),
                marginTop: normalize(25),
                marginStart: normalize(16),
              }}>
              <Text
                style={[
                  CommonStyles.text_12_bold,
                  {
                    flex: 1,
                    color: COLOR.TEXT_COLOR_BLUE,
                    alignSelf: 'center',
                  },
                ]}>
                Join Class to Peek
              </Text>
              <Image
                style={{
                  height: normalize(28),
                  alignSelf: 'center',
                  width: normalize(28),
                  marginEnd: normalize(16),
                  resizeMode: 'contain',
                }}
                source={CARD_BTN_ARROW}
              />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  checkChildJoinClassStatusForLiveClass = liveClassDetails => (
    <View
      style={[
        CommonStyles.boxShadow,
        {
          marginTop: normalize(20),
          marginHorizontal: 20,
          backgroundColor: COLOR.WHITE,
          borderRadius: 20,
        },
      ]}>
      <TouchableOpacity
        onPress={() =>
          this.joinLiveClassChildScreen(liveClassDetails.live_class_id)
        }>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: normalize(16),
            marginTop: normalize(25),
            marginStart: normalize(16),
          }}>
          <Text
            style={[
              CommonStyles.text_12_bold,
              {
                flex: 1,
                color: COLOR.TEXT_COLOR_BLUE,
                alignSelf: 'center',
              },
            ]}>
            Join Live Class
          </Text>
          <Image
            style={{
              height: normalize(28),
              alignSelf: 'center',
              width: normalize(28),
              marginEnd: normalize(16),
              resizeMode: 'contain',
            }}
            source={CARD_BTN_ARROW}
          />
        </View>
      </TouchableOpacity>
    </View>
  );

  pendingClassStatus = (totalClass, availableClass) => (
    <View
      style={[
        CommonStyles.boxShadow,
        {
          backgroundColor: COLOR.WHITE,
          marginHorizontal: normalize(10),
          marginTop: normalize(7),
          borderRadius: normalize(20),
        },
      ]}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: normalize(10),
          marginBottom: normalize(10),
          marginEnd: normalize(5),
          marginStart: normalize(10),
        }}>
        <View
          style={{
            flex: 1,
            marginTop: normalize(10),
            marginStart: normalize(10),
          }}>
          {totalClass > 1 ? (
            <Text style={[CommonStyles.text_12_bold]}>
              {totalClass} Classes
            </Text>
          ) : (
            <Text style={[CommonStyles.text_12_bold]}>{totalClass} Class</Text>
          )}

          <View style={{justifyContent: 'center'}}>
            <Text style={[CommonStyles.text_12__semi_bold]}>Available : </Text>
            <Text style={[CommonStyles.text_16_bold]}>
              {availableClass} out of {totalClass}
            </Text>
          </View>
        </View>

        <Image
          style={{
            flex: 1,
            height: normalize(100),
            alignSelf: 'center',
            width: normalize(100),
            marginEnd: normalize(20),
            resizeMode: 'contain',
          }}
          source={IC_BANNER_3}
        />
      </View>
    </View>
  );

  renewSubscriptionCard = expiringDetails => {
    const nextSubscription = expiringDetails[0]?.next_subscription_to_show[0];

    return (
      <LinearGradient
        colors={['#F2E2FF', '#FFFFFF']}
        style={[
          CommonStyles.shadowContainer_border_20,
          {
            marginTop: normalize(20),
            marginBottom: normalize(10),
            marginStart: normalize(5),
            marginEnd: normalize(5),
          },
        ]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginEnd: normalize(5),
            marginStart: normalize(10),
          }}>
          <Text
            style={[
              CommonStyles.text_16_semi_bold,
              {flex: 3, marginStart: normalize(10), alignSelf: 'center'},
            ]}>
            Get {nextSubscription?.discount}% off on{' '}
            {nextSubscription?.display_name || ''} renewal
          </Text>
          <Image
            style={{
              flex: 1,
              height: normalize(50),
              width: normalize(100),
              marginTop: 10,
              marginEnd: 10,
              resizeMode: 'contain',
            }}
            source={IC_NUMERO}
          />
        </View>
        <View
          style={{
            marginStart: normalize(20),
            marginEnd: normalize(20),
            marginBottom: normalize(10),
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                CommonStyles.text_8_regular,
                {
                  backgroundColor: COLOR.TEXT_COLOR_YELLOW,
                  paddingStart: 10,
                  paddingEnd: 10,
                  paddingTop: 5,
                  paddingBottom: 5,
                  borderRadius: 20,
                  overflow: 'hidden',
                },
              ]}>
              Alert
            </Text>
          </View>

          <Text
            style={[
              CommonStyles.text_12_regular,
              {
                color: COLOR.TEXT_ALPHA_GREY,
                lineHeight: 18,
                marginTop: normalize(5),
              },
            ]}>
            {nextSubscription?.student_name}
            ’s online learning
            {'\n'}
            subscription is about to over
          </Text>
          {expiringDetails[0]?.expiring_in_days > 0 ? (
            <Text
              style={[
                CommonStyles.text_12_regular,
                {marginTop: normalize(4), color: COLOR.TEXT_COLOR_ORANGE},
              ]}>
              Expiring on - {expiringDetails[0]?.current_subscription_end_date}{' '}
              | {expiringDetails[0]?.expiring_in_days} Days to go
            </Text>
          ) : (
            <Text
              style={[
                CommonStyles.text_12_regular,
                {marginTop: normalize(4), color: COLOR.TEXT_COLOR_ORANGE},
              ]}>
              Subscription Expired
            </Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() =>
            this.onClickRenewSubscription(nextSubscription?.duration)
          }
          style={{
            flexDirection: 'row',
            marginStart: normalize(20),
            marginEnd: normalize(20),
            marginBottom: normalize(20),
            justifyContent: 'space-between',
          }}>
          <Text
            style={[
              CommonStyles.text_12_bold,
              {color: COLOR.TEXT_COLOR_BLUE, alignSelf: 'center'},
            ]}>
            Renew
          </Text>
          <Image
            style={{
              height: normalize(28),
              alignSelf: 'center',
              width: normalize(28),
              resizeMode: 'stretch',
            }}
            source={CARD_BTN_ARROW}
          />
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  openSeanVideo = () => {
    this.setState({
      modalVisible: true,
    });
  };

  onClickRenewSubscription = mDuration => {
    this.props.navigation.navigate(Constants.RenewSubscriptionChildPreview, {
      duration: mDuration,
    });
  };

  midasTestStatus = details => {
    const {currentKidDetails} = this.state;

    if (details.midas_status) {
      return (
        <View
          style={[
            CommonStyles.boxShadow,
            {
              backgroundColor: COLOR.WHITE,
              marginHorizontal: 20,
              marginTop: normalize(20),
              borderRadius: normalize(20),
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              marginStart: normalize(5),
              marginTop: normalize(16),
              marginBottom: normalize(2),
            }}>
            <Image
              style={{
                height: normalize(100),
                margin: normalize(5),
                width: normalize(100),
                resizeMode: 'stretch',
              }}
              source={IC_MIDAS_SELECTION}
            />

            <View
              style={{
                flex: 1,
                marginTop: normalize(20),
                marginBottom: normalize(20),
                marginEnd: normalize(5),
                marginStart: normalize(10),
              }}>
              <Text
                style={[
                  CommonStyles.text_8_regular,
                  {color: COLOR.TEXT_ALPHA_GREY},
                ]}>
                Midas Test Completed
              </Text>

              <Text
                style={[CommonStyles.text_12_bold, {marginTop: normalize(8)}]}>
                Result :{' '}
              </Text>
              <Text
                style={[
                  CommonStyles.text_16_regular,
                  {marginTop: normalize(8)},
                ]}>
                {details.midas_details[0].correct} /{' '}
                {details.midas_details[0].total}
              </Text>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View
        style={[
          CommonStyles.boxShadow,
          {
            backgroundColor: COLOR.WHITE,
            marginStart: normalize(20),
            marginEnd: normalize(20),
            marginTop: normalize(20),
            borderRadius: normalize(20),
          },
        ]}>
        <View
          style={{
            flexDirection: 'row',
            marginStart: normalize(5),
            marginTop: normalize(16),
            marginBottom: normalize(2),
          }}>
          <Image
            style={{
              height: normalize(100),
              margin: normalize(5),
              width: normalize(100),
              resizeMode: 'stretch',
            }}
            source={IC_MIDAS_SELECTION}
          />

          <View
            style={{
              flex: 1,
              marginTop: normalize(20),
              marginBottom: normalize(20),
              marginEnd: normalize(5),
              marginStart: normalize(10),
            }}>
            <Text
              style={[
                CommonStyles.text_8_regular,
                {color: COLOR.TEXT_ALPHA_GREY},
              ]}>
              Midas
            </Text>
            <Text
              style={[CommonStyles.text_12_bold, {marginTop: normalize(8)}]}>
              {currentKidDetails.name} needs to give MIDAS test to begin
            </Text>
            <Text
              style={[
                CommonStyles.text_12_Regular,
                {color: COLOR.TEXT_COLOR_ORANGE, marginTop: normalize(8)},
              ]}>
              This is a mandatory test to be taken on the web portal
            </Text>
          </View>
        </View>
      </View>
    );
  };

  onTeacherProfile = () => {
    this.props.navigation.navigate(Constants.TeacherProfile);
  };

  teacherCard = data => (
    <View
      style={{
        marginTop: normalize(10),
        marginBottom: normalize(80),
        backgroundColor: COLOR.WHITE,
        padding: normalize(10),
        borderRadius: normalize(15),
      }}>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{
            height: normalize(70),
            width: normalize(70),
            alignSelf: 'center',
            resizeMode: 'contain',
            marginStart: normalize(8),
            marginTop: normalize(8),
          }}
          source={AVATAR_TEACHER}
        />
        <View
          style={{
            marginTop: normalize(8),
            marginStart: normalize(10),
            justifyContent: 'center',
          }}>
          <Text
            style={[CommonStyles.text_8_bold, {color: COLOR.TEXT_ALPHA_GREY}]}>
            Teacher
          </Text>
          <Text style={[CommonStyles.text_14_Regular, {color: COLOR.BLACK}]}>
            {data == '' ? 'Name not found' : data}
          </Text>
          <TouchableOpacity onPress={this.onTeacherProfile}>
            <Text
              style={[
                CommonStyles.text_12__semi_bold,
                {
                  color: COLOR.TEXT_COLOR_BLUE,
                  paddingVertical: normalize(14),
                },
              ]}>
              View Tutor's Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  goToSpeedMath = () => {
    this.props.navigation.navigate(Constants.SPEED_MATH_HOME);
  };

  render() {
    const {currentKidDetails} = this.state;
    const {current_selected_role} = this.props;

    return (
      <View>
        <View
          style={{
            backgroundColor: COLOR.BG_FAQ_GRERY,
            paddingBottom: 100,
            flex: 1,
          }}>
          {current_selected_role == Constants.PARENT && (
            <>
              <View>
                {currentKidDetails &&
                  currentKidDetails.total_classes > 0 &&
                  this.pendingClassStatus(
                    currentKidDetails.total_classes,
                    currentKidDetails.available_classes,
                  )}

                {currentKidDetails &&
                  currentKidDetails.life_skill_program &&
                  this.showTrainingProgram()}
                {currentKidDetails &&
                  currentKidDetails.subscription_about_to_expire &&
                  this.renewSubscriptionCard(
                    currentKidDetails.expiring_subscription_details,
                  )}

                {currentKidDetails &&
                  currentKidDetails.last_class_details != '' &&
                  this.checkLiveClassStatusForParentPeek(
                    currentKidDetails.last_class_details,
                  )}

                {currentKidDetails &&
                  currentKidDetails.activity_details != '' &&
                  this.midasTestStatus(currentKidDetails.activity_details)}

                {currentKidDetails && this.accuracyAndTimeSpent()}
              </View>
            </>
          )}

          {Platform.OS == 'ios' &&
            currentKidDetails &&
            currentKidDetails.last_class_details != '' &&
            currentKidDetails.last_class_details?.todays_class &&
            current_selected_role == Constants.CHILD &&
            this.checkChildJoinClassStatusForLiveClass(
              currentKidDetails.last_class_details,
            )}

          {currentKidDetails &&
            current_selected_role == Constants.CHILD &&
            this.speedMathDisplayCard()}

          {currentKidDetails &&
            current_selected_role == Constants.CHILD &&
            this.emotionDisplayCard()}

          {currentKidDetails &&
            current_selected_role == Constants.CHILD &&
            this.mathZoneDisplayCard()}

          {currentKidDetails &&
            current_selected_role == Constants.PARENT &&
            currentKidDetails.activity_details != '' &&
            this.recentActivity()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  state: state.dashboard,
  addCartStatus: state.dashboard.add_cart_status,
  get_cart_list_response: state.dashboard.get_cart_list_response,
  get_cart_list_status: state.dashboard.get_cart_list_status,
  dashboardResponse: state.dashboard.dashboard_response,
  dashboardStatus: state.dashboard.dashboard_status,
  currentSelectedKid: state.dashboard.current_selected_kid,
  current_selected_role: state.dashboard.current_selected_role,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PaidUserScreen);
