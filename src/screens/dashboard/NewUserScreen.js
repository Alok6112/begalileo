import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
  StyleSheet,
  AppState,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import {COLOR, CommonStyles, cardBoxShadowStyle} from '../../config/styles';
import {
  IC_BOOK_DEMO_BG,
  LIVE_CLASS_CARD_THUMB,
  ICON_CLOCK,
  CARD_BTN_ARROW,
  IC_CLOSE_BLUE,
  IC_STAR_LAYOUT,
  IC_BANNER_2,
  SEAN_SWARNER_PIC,
} from '../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import {normalize, Card} from 'react-native-elements';
import SubscriptionTabs from '../../components/subscription_tab';
import MathBoxTabs from '../dashboard/MathBoxTabs';
import VideoTestimonials from '../Testimonials/VideoTestimonials';
import {LIVE_CLASS_TODAY} from '../../assets/images';

import checkVersion from 'react-native-store-version';
import {AsyncStorage} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../config/configs';
import {
  getDifferenceFromTodayDate,
  getDisplayFormattedDate,
  checkCurrentTimeIsValidToPeak,
} from '../../components/helpers';
import axios from 'axios';
import {BASE_URL} from '../../config/configs';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {showNotification} from '../../components/helpers/AndroidNotificationHandler';
import messaging from '@react-native-firebase/messaging';

class NewUserScreen extends Component {
  constructor(props) {
    super(props);
    this.firebaseListenerRef = React.createRef();
    this.state = {
      currentSessionKid: null,
      demoVideo: false,
      skill_data: [],
      refresh: false,
      modalVisible: false,
      notificationVideoUrl: '',
      notificationDataPresent: false,
      checkforNotification: false,
      appState: AppState.currentState,
      appVersionValue: '',
      student_id_notification: '',
      shareLifeSkills: false,
      coachResponse: false,
      videoNotification: false,
      chatNotification: false,
      notificationContent: [],
      mountingState: false,
    };
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
            console.log('inside when new user screen');
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
            console.log('insidde when student id');
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
      : notification.getData()['userInteraction'] === 1;

    if (isClicked) {
      if (isAndroid) {
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
        if (chatNotification) {
          console.log('notification clicked');
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
    console.log('componentDidMount new user');
    this.checkAppCurrentState();

    this.localNotification();

    PushNotificationIOS.addEventListener(
      'localNotification',
      this.onNotificationReceived,
    );

    PushNotification.configure({
      onNotification: notification => {
        this.onNotificationReceived(notification);
      },
    });

    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );

    if (this.props.dashboardStatus) {
      this.setCurrentSessionKid();

      const id = setTimeout(() => {
        if (this?.props?.currentSelectedKid?.life_skill_program) {
          this.getSkillsData();
        }

        clearTimeout(id);
      }, 1000);
    }
    this._retrieveData();
  }

  componentWillUnmount() {
    console.log(' new user is unmounting');
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

  openTheVideoNotification = videoUrl => {
    this.props.navigation.navigate(
      Constants.TRAINING_PROGRAM_NOTIFICATION_VIDEO,
      {
        navigation: this.props.navigation,
        video_url: videoUrl,
      },
    );
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
          }
        }
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dashboardResponse != this.props.dashboardResponse) {
      this.checkForNotification();

      if (this.props.dashboardStatus) {
        this.setCurrentSessionKid();
      }
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
              refresh: !this.state.refresh,
            },
            () => {},
          );
        }
      })
      .catch(error => {
        console.log(error.message, 'error');
      });
  };

  setCurrentSessionKid = () => {
    this.props.dashboardResponse.students.map(item => {
      if (item.selected_student) {
        this.setState({
          currentSessionKid: item,
        });
      }
    });
  };
  goToFaq = () => {
    this.props.navigation.navigate(Constants.FaqScreen);
  };

  openSeanVideo = () => {
    this.setState({
      modalVisible: true,
    });
  };

  goToBookADemo = () => {
    this.props.navigation.push(Constants.BookDemoScreen);
  };
  goToDemoDetails = item => {
    this.props.navigation.navigate(Constants.DemoDetails, {
      demoDetail: item,
    });
  };

  goToTraingDetails = item => {
    this.props.navigation.navigate(Constants.TRAINING_PROGRAM_SCREEN, {
      demoDetail: item,
      skillData: this.state.skill_data,
      student_id: item?.student_id,
    });
  };

  goToRateDemoClass = () => {
    this.props.navigation.navigate(Constants.RateDemoClass);
  };

  goToDemoClassResults = () => {
    this.props.navigation.navigate(Constants.DemoClassResults);
  };

  peakTheLiveClass = liveId => {
    this.props.navigation.navigate(Constants.ParentConnect, {
      navigation: this.props.navigation,
      live_class_id: liveId,
      student_id: this.props.currentSelectedKid.student_id,
      student_name: this.props.currentSelectedKid.first_name,
      parent_id: this.props.dashboardResponse.parent_id,
    });
  };

  rateDemoClassView = () => {
    return (
      <TouchableOpacity onPress={this.goToRateDemoClass}>
        <View>
          <Card
            containerStyle={{
              margin: normalize(10),
              borderRadius: normalize(24),
            }}>
            <Text
              style={[
                CommonStyles.text_14_semi_bold,
                {color: COLOR.BLACK, marginTop: normalize(20)},
              ]}>
              Rate demo class
            </Text>
            <Text
              style={[CommonStyles.text_14_Regular, {marginTop: normalize(5)}]}>
              We’d like to know your view on the recent demo class your child
              attended.
            </Text>
            <Image
              style={{
                alignSelf: 'center',
                height: normalize(30),
                width: normalize(200),
                marginTop: normalize(24),
                borderRadius: 20,
                resizeMode: 'stretch',
              }}
              source={IC_STAR_LAYOUT}
            />
          </Card>
        </View>
      </TouchableOpacity>
    );
  };
  demoResultsView = () => {
    return (
      <View>
        <Card
          containerStyle={{
            margin: normalize(10),
            borderRadius: normalize(24),
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View style={{flex: 0.5}}>
              <Text
                style={[
                  CommonStyles.text_14_semi_bold,
                  {color: COLOR.BLACK, marginTop: normalize(20)},
                ]}>
                Demo class results are here!
              </Text>
              <Text
                style={[
                  CommonStyles.text_14_Regular,
                  {marginTop: normalize(5)},
                ]}>
                Know what teacher-coach have to say about{' '}
                {this.props.currentSelectedKid.first_name}
              </Text>
            </View>

            <Image
              style={{
                flex: 0.5,
                alignSelf: 'center',
                height: normalize(100),
                width: normalize(100),
                marginTop: normalize(24),
                borderRadius: 20,
                resizeMode: 'stretch',
              }}
              source={IC_BANNER_2}
            />
          </View>
          <TouchableOpacity
            onPress={this.goToDemoClassResults}
            style={[
              CommonStyles.shadowContainer_border_20,
              {
                width: normalize(120),
                marginTop: normalize(16),
                marginStart: normalize(24),
              },
            ]}>
            <Text
              style={[
                CommonStyles.text_12__semi_bold,
                {
                  color: COLOR.BLUE_LINk,
                  textAlign: 'center',
                  marginTop: normalize(9),
                  marginBottom: normalize(9),
                },
              ]}>
              View Results
            </Text>
          </TouchableOpacity>
        </Card>
      </View>
    );
  };

  checkDemoClassStatus = () => {
    const {currentSessionKid} = this.state;

    if (
      currentSessionKid.student_demos != null &&
      currentSessionKid.student_demos[0].status != 'Completed'
    )
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
                    source={LIVE_CLASS_CARD_THUMB}
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
                  Demo class for {currentSessionKid.name} is{' '}
                  {currentSessionKid.student_demos[0].status}
                </Text>

                <View style={{flexDirection: 'row', marginTop: normalize(8)}}>
                  <Image
                    style={{
                      height: normalize(16),
                      width: normalize(16),
                      resizeMode: 'contain',
                    }}
                    source={ICON_CLOCK}
                  />
                  <Text
                    style={[
                      CommonStyles.text_12_Regular,
                      {marginStart: normalize(8)},
                    ]}>
                    {currentSessionKid.student_demos[0].date} |{' '}
                    {currentSessionKid.student_demos[0].time}
                  </Text>
                </View>
                {currentSessionKid.student_demos[0].status != 'Cancelled' && (
                  <TouchableOpacity
                    onPress={() => this.goToDemoDetails(currentSessionKid)}
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
                )}

                {currentSessionKid.student_demos[0].status == 'booked' && (
                  <View>
                    <Text
                      style={[
                        CommonStyles.text_12_bold,
                        {
                          color: COLOR.TEXT_COLOR_ORANGE,
                          marginBottom: normalize(2),
                          marginTop: normalize(1),
                          marginEnd: normalize(10),
                          alignSelf: 'center',
                        },
                      ]}>
                      Waiting for confirmation
                    </Text>
                  </View>
                )}

                {currentSessionKid.student_demos[0].status == 'Cancelled' && (
                  <TouchableOpacity
                    onPress={() => this.goToBookADemo()}
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
                      Rebook demo
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
                )}
              </View>
            </View>
          </View>
        </View>
      );
  };

  showTrainingProgram = () => {
    const {currentSessionKid} = this.state;
    if (
      currentSessionKid.student_demos != null &&
      currentSessionKid.student_demos[0].status != 'Completed'
    )
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
                  onPress={() => this.goToTraingDetails(currentSessionKid)}
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
      {liveClassDetails?.todays_class ? (
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
            liveClassDetails?.date,
            liveClassDetails?.time,
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
              {getDisplayFormattedDate(liveClassDetails?.date)}
            </Text>
            <Text
              style={[CommonStyles.text_14_bold, {marginTop: normalize(2)}]}>
              {liveClassDetails?.time}
            </Text>
          </View>
        </View>
        {checkCurrentTimeIsValidToPeak(
          liveClassDetails?.date,
          liveClassDetails?.time,
        ) && (
          <TouchableOpacity
            onPress={() =>
              this.peakTheLiveClass(liveClassDetails?.demo_class_id)
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
        onPress={() => this.joinLiveClassChildScreen(liveClassDetails)}>
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

  goToViewCurriculum = () => {
    this.props.navigation.navigate(Constants.ViewCurriculum);
  };

  goToCartList = () => {
    this.props.navigation.navigate(Constants.CartListScreen);
  };

  goToMidasHome = () => {
    this.props.navigation.navigate(Constants.MIDAS_HOME_SCREEN);
  };

  render() {
    const B = props => (
      <Text style={{fontWeight: 'bold'}}>{props.children}</Text>
    );
    const {currentSessionKid} = this.state;
    const {current_selected_role} = this.props;
    return (
      <View style={{backgroundColor: COLOR.BG_FAQ_GRERY}}>
        {currentSessionKid &&
          currentSessionKid.demo_booked &&
          currentSessionKid.student_demos[0].status == 'scheduled' &&
          currentSessionKid.student_demos[0].todays_class &&
          current_selected_role == Constants.CHILD &&
          this.checkChildJoinClassStatusForLiveClass(
            currentSessionKid.student_demos[0]?.demo_class_id,
          )}
        {currentSessionKid &&
          currentSessionKid.demo_booked &&
          this.checkDemoClassStatus()}
        {currentSessionKid &&
          currentSessionKid.life_skill_program &&
          this.showTrainingProgram()}
        {currentSessionKid &&
          currentSessionKid.demo_booked &&
          currentSessionKid.student_demos[0].status == 'Completed' &&
          !currentSessionKid.student_demos[0].parent_feedback &&
          this.rateDemoClassView()}
        {currentSessionKid &&
          currentSessionKid.demo_booked &&
          currentSessionKid.student_demos[0].status == 'Completed' &&
          this.demoResultsView()}

        {currentSessionKid &&
          currentSessionKid.demo_booked &&
          currentSessionKid.student_demos[0].status == 'scheduled' &&
          currentSessionKid.student_demos[0].todays_class &&
          current_selected_role == Constants.PARENT &&
          this.checkLiveClassStatusForParentPeek(
            currentSessionKid.student_demos[0],
          )}
        <View
          style={{
            backgroundColor: COLOR.WHITE,
            marginTop: normalize(20),
            borderRadius: normalize(30),
          }}>
          <View
            style={{
              marginTop: normalize(32),
              marginStart: normalize(10),
              marginEnd: normalize(10),
            }}>
            {currentSessionKid && (
              <View>
                <Text
                  style={[
                    CommonStyles.text_18_semi_bold,
                    {
                      color: COLOR.TEXT_COLOR_LIGHT_BLACK,
                      alignSelf: 'center',
                    },
                  ]}>
                  Online learning for {currentSessionKid.name}
                </Text>
                <Text
                  style={[
                    CommonStyles.text_14_Regular,
                    {
                      color: COLOR.TEXT_ALPHA_GREY,
                      alignSelf: 'center',
                      marginTop: normalize(20),
                      marginStart: normalize(10),
                      marginEnd: normalize(10),
                      textAlign: 'center',
                    },
                  ]}>
                  A well designed<B> Program for {currentSessionKid.grade} </B>{' '}
                  Includes live classes, practice sessions, Mathboxes and much
                  more to help in develop learning ordered thinking, Analogical
                  thinking, Number Sense, Visual & abstract addition and
                  subtraction including number bonds..{' '}
                </Text>
                <TouchableOpacity onPress={this.goToViewCurriculum}>
                  <Text
                    style={[
                      CommonStyles.text_12__semi_bold,
                      {
                        color: COLOR.TEXT_COLOR_GREEN,
                        alignSelf: 'center',
                        marginTop: normalize(25),
                        marginBottom: normalize(16),
                      },
                    ]}>
                    View Full Curriculum
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          {this.props.dashboardStatus &&
            this.props.dashboardResponse.students.length > 0 && (
              <View
                style={{
                  marginStart: 5,
                  marginEnd: 5,
                  marginTop: normalize(16),
                }}>
                {}
                <Text
                  style={[
                    CommonStyles.text_14_semi_bold,
                    {alignSelf: 'center', color: COLOR.TEXT_TITLE_HEADLINE},
                  ]}>
                  Choose subscription
                </Text>

                <SubscriptionTabs
                  goToCartList={this.goToCartList}
                  navigation={this.props.navigation}
                />
              </View>
            )}
        </View>
        <View>
          {this.props.dashboardStatus && (
            <MathBoxTabs
              country={this.props.dashboardResponse.parent_details[0].country}
            />
          )}
        </View>

        {currentSessionKid && !currentSessionKid.demo_booked && (
          <LinearGradient
            colors={['#E9F2FF', '#FFE4F6']}
            style={{
              margin: 20,
              paddingTop: 10,
              paddingBottom: 10,
              borderRadius: 10,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View
              style={{
                flex: 1,
                marginStart: 20,
                marginEnd: 10,
                marginTop: 10,
                marginBottom: 10,
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={CommonStyles.text_14_semi_bold}>
                  Not sure about beGalileo Online based learning?
                </Text>
                <Text
                  style={{
                    marginTop: normalize(5),
                    fontStyle: 'italic',
                    color: COLOR.BLACK,
                    fontSize: 15,
                  }}>
                  * beGalileo kid is World’s youngest Tedx Speaker
                </Text>
                <Text
                  style={{
                    marginTop: normalize(5),
                    fontStyle: 'italic',
                    color: COLOR.BLACK,
                    fontSize: 15,
                  }}>
                  * beGalileo kid is IMO Math olympiad International Rank 1
                </Text>
                <Text
                  style={{
                    marginTop: normalize(5),
                    fontStyle: 'italic',
                    color: COLOR.BLACK,
                    fontSize: 15,
                  }}>
                  * beGalileo is globally the first to use Microsoft AI in
                  education
                </Text>
                <Text
                  style={{
                    marginTop: normalize(5),
                    fontStyle: 'italic',
                    color: COLOR.BLACK,
                    fontSize: 15,
                  }}>
                  * 93% of our students buy as again, over 97% rate us 5 on
                  likeability
                </Text>
                <Text
                  style={{
                    marginTop: normalize(5),
                    fontStyle: 'italic',
                    color: COLOR.BLACK,
                    fontSize: 15,
                  }}>
                  * We are globally the first program to have coding integrated
                  with math application
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={{justifyContent: 'center'}}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 50,
                      height: 50,
                      backgroundColor: 'white',
                    }}
                    onPress={this.goToBookADemo}>
                    <Text
                      style={[
                        CommonStyles.text_8_bold,
                        {
                          paddingTop: normalize(9),
                          paddingBottom: normalize(9),
                          paddingStart: normalize(18),
                          paddingEnd: normalize(10),
                        },
                      ]}>
                      Book a FREE Demo
                    </Text>
                  </TouchableOpacity>
                </View>

                <Image
                  style={{
                    height: normalize(75),
                    margin: 10,
                    width: normalize(75),
                    resizeMode: 'stretch',
                  }}
                  source={IC_BOOK_DEMO_BG}
                />
              </View>
            </View>
          </LinearGradient>
        )}
        <View
          style={{
            backgroundColor: COLOR.WHITE,
            borderTopLeftRadius: normalize(15),
            borderTopRightRadius: normalize(15),
          }}>
          <Text
            style={[
              CommonStyles.text_18_semi_bold,
              {
                color: COLOR.BLACK,
                alignSelf: 'center',
                marginTop: normalize(40),
              },
            ]}>
            Why beGalileo?
          </Text>
          <View
            style={{
              backgroundColor: '#EEF8FE',
              marginTop: normalize(32),
              borderRadius: normalize(12),
              marginStart: normalize(10),
              marginEnd: normalize(10),
            }}>
            <Text
              style={[
                CommonStyles.text_14_semi_bold,
                {
                  color: COLOR.TEXT_TITLE_HEADLINE,
                  marginTop: normalize(34),
                  marginStart: normalize(24),
                  lineHeight: normalize(25),
                },
              ]}>
              {'See what parents and students \nare saying about \nbeGalileo'}
            </Text>
            <Text
              style={[
                CommonStyles.text_14_Regular,
                {
                  color: COLOR.TEXT_ALPHA_GREY,
                  marginTop: normalize(16),
                  marginStart: normalize(24),
                  lineHeight: normalize(25),
                },
              ]}>
              {'Online learning experience \nwith kids and parents'}
            </Text>

            <VideoTestimonials />
          </View>
        </View>

        {this.state.demoVideo && (
          <View>
            <View
              style={{
                height: 400,
                position: 'absolute',
                left: 0,
                right: 0,
                justifyContent: 'center',
                backgroundColor: COLOR.RED,
              }}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  bottom: 30,
                  right: 30,
                  backgroundColor: COLOR.RED,
                }}
                onPress={() => {
                  this.setState({
                    demoVideo: false,
                  });
                }}>
                <Image
                  style={{
                    height: normalize(50),
                    width: normalize(50),
                    resizeMode: 'stretch',
                    borderRadius: normalize(50),
                  }}
                  source={IC_CLOSE_BLUE}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state.dashboard,
    addCartStatus: state.dashboard.add_cart_status,
    get_cart_list_response: state.dashboard.get_cart_list_response,
    get_cart_list_status: state.dashboard.get_cart_list_status,
    dashboardResponse: state.dashboard.dashboard_response,
    dashboardStatus: state.dashboard.dashboard_status,
    currentSelectedKid: state.dashboard.current_selected_kid,
    current_selected_role: state.dashboard.current_selected_role,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NewUserScreen);
