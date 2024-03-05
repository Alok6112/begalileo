import React, {Component, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  PermissionsAndroid,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo,
} from 'react-native-twilio-video-webrtc';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {normalize} from 'react-native-elements';
import {COLOR} from '../../config/styles';
import {CommonStyles} from '../../config/styles';
import * as Constants from '../../components/helpers/Constants';
import CustomGradientButton from '../../components/CustomGradientButton';
import Swiper from 'react-native-swiper';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../config/configs';
import {CustomBorderedTextInput, CustomButton} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import {showMessage, hideMessage} from 'react-native-flash-message';
import axios from 'axios';
import {IMG_PARENT_PEEK} from '../.././assets/images';

import {BASE_URL} from '../../config/configs';
import {getParamNavigationV5} from '../../components/helpers/navigationV5Data';

const ParentConnect = props => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [status, setStatus] = useState('disconnected');
  const [participants, setParticipants] = useState(new Map());
  const [videoTracks, setVideoTracks] = useState(new Map());
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [liveCLassId, setLiveClassId] = useState('');
  const [parentId, setParentId] = useState('');
  const [participantCount, setParticipantCount] = useState(0);

  const [token, setToken] = useState('');
  const [permissionDeniedMsg, setPermissionDeniedMsg] = useState(false);
  const twilioRef = useRef(null);

  const _onConnectButtonPress = async () => {
    if (Platform.OS === 'android') {
      console.log('Connect with android');
      const result = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      console.log('Chcek permission Result', result);
      if (!result) requestMicrophone();
      console.log('AXIOSSSSSS 4');
    }

    let url = `${BASE_URL}/app_students/video_call_token?user=
    ${parentId}&live_class_id=
    ${liveCLassId}`;
    console.log('Connecting URL', url);

    const response = await fetch(url).catch(ae => {
      console.log('Fetch Error ', ae);
    });

    const json = await response.json();

    let sampleToken = json.token;

    setStatus('connecting');

    if (sampleToken == undefined) {
      showMessage({
        message: 'Seems server too busy to connect now.please try later',
        type: 'danger',
      });
      setStatus('disconnected');
      return;
    }
    _onMuteButtonPress();
    twilioRef.current.connect({accessToken: sampleToken});
  };

  const _onEndButtonPress = () => {
    setStatus('disconnected');
    twilioRef.current.disconnect();
    goToHome();
  };

  useEffect(() => {
    let studid = getParamNavigationV5(props, 'student_id', null);
    let liveId = getParamNavigationV5(props, 'live_class_id', null);
    let parentId = getParamNavigationV5(props, 'parent_id', null);
    let studName = getParamNavigationV5(props, 'student_name', null);

    setLiveClassId(liveId);
    setStudentId(studid);
    setParentId(parentId);
    setStudentName(studName);
  }, []);

  const toggleParentScreen = () => {
    goToHome();

    let createTimeout = setTimeout(() => {
      let triggerfn = getParamNavigationV5(props, 'triggerfn', null);

      triggerfn(true);

      clearTimeout(createTimeout);
    }, 2000);
  };

  const cancelToggleParentScreen = () => {
    console.log('Cancel button pressed!');
  };

  useEffect(() => {
    Alert.alert(
      'You want to join as a parent or you want to join as child in live session?',
      '',
      [
        {
          text: 'Join as Parent',
          onPress: () => cancelToggleParentScreen(),
        },
        {
          text: 'Join as Child',
          onPress: () => toggleParentScreen(),
        },
      ],
    );
  }, []);

  const goToHome = () => {
    let navigation = getParamNavigationV5(props, 'navigation', null);

    console.log('Navigation ', navigation);
    navigation.navigate(Constants.Dashboard);
  };

  const requestMicrophone = async () => {
    //replace your function with this code.
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]).then(result => {
        console.log('result', result);
        if (
          result['android.permission.RECORD_AUDIO'] &&
          result['android.permission.CAMERA']
        ) {
          _onConnectButtonPress();
        } else {
          setPermissionDeniedMsg(true);
          setStatus('disconnected');
        }
      });
    }
  };

  const _onMuteButtonPress = () => {
    twilioRef.current
      .setLocalAudioEnabled(!isAudioEnabled)
      .then(isEnabled => setIsAudioEnabled(isEnabled));
  };

  const _onFlipButtonPress = () => {
    twilioRef.current.flipCamera();
  };

  const _onRoomDidConnect = ({roomName, error}) => {
    console.log('onRoomDidConnect: ', roomName);

    setStatus('connected');
  };

  const _onRoomDidDisconnect = ({roomName, error}) => {
    console.log('[Disconnect]ERROR: ', error);

    setStatus('disconnected');
  };

  const _onRoomDidFailToConnect = error => {
    console.log('[FailToConnect]ERROR: ', error);

    setStatus('disconnected');
  };

  const _onParticipantAddedVideoTrack = ({participant, track}) => {
    if (track?.trackName == 'screen_tutor') {
      console.log('returning from screen share fn');
      return;
    }
    let arr = participant.identity.split('-');
    if (arr[0] == 'tutor' || arr[0] == studentId) {
      setParticipantCount(participantCount + 1);
      setVideoTracks(
        new Map([
          ...videoTracks,
          [
            track.trackSid,
            {
              participantSid: participant.sid,
              videoTrackSid: track.trackSid,
              participantIdentity: participant.identity,
            },
          ],
        ]),
      );
    }
  };

  useEffect(() => {
    console.log('Video Tracks size', videoTracks.size);
    console.log('Video tracks checking', videoTracks);
  }, [videoTracks]);

  const _onParticipantRemovedVideoTrack = ({participant, track}) => {
    if (track?.trackName == 'screen_tutor') {
      console.log('returning from screen share fn');
      return;
    }

    let arr = participant.identity.split('-');

    if (arr[0] == 'tutor' || arr[0] == studentId) {
      const videoTracksLocal = videoTracks;
      videoTracksLocal.delete(track.trackSid);
      setParticipantCount(participantCount - 1);
      setVideoTracks(videoTracksLocal);
    }
  };

  const getNonConnectedParticipant = () => {
    let isTutorAvailable = false;
    Array.from(
      videoTracks,
      ([trackSid, trackIdentifier, participantIdentity]) => {
        if (videoTracks.get(trackSid).participantIdentity == 'tutor')
          isTutorAvailable = true;
      },
    );
    if (isTutorAvailable) return 'Waiting for ' + studentName + ' to connect';
    else return 'Waiting for teacher to connect';
  };

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        {status !== 'connected' && (
          <View style={{flex: 1}}>
            {status == 'connecting' && (
              <ActivityIndicator
                size="large"
                color="black"
                style={CommonStyles.loadingIndicatior}
              />
            )}
            {/* <View style={{ position :'absolute',bottom : 0,left : 0,right : 0,width : SCREEN_WIDTH }}>

              <Image style={{ resizeMode : 'contain',width: SCREEN_WIDTH, height: SCREEN_WIDTH / 2, alignSelf: 'center' }} source={IMG_PARENT_PEEK} />
            </View> */}

            <Text
              style={[
                CommonStyles.text_14_bold,
                {
                  alignSelf: 'center',
                  marginTop: 30,
                  color: COLOR.TEXT_COLOR_BLUE,
                },
              ]}>
              Peek Live Class
            </Text>
            {permissionDeniedMsg && (
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text
                  style={[
                    {alignSelf: 'center', marginTop: 30},
                    CommonStyles.text_12__semi_bold,
                  ]}>
                  Please allow the Video and Audio permission to join and peak
                  the Live class
                </Text>
                <CustomButton
                  myRef={input => {
                    this.btn_home = input;
                  }}
                  style={CommonStyles.green_button_gradient}
                  children="Allow Permission"
                  containerStyle={{
                    backgroundColor: COLOR.BORDER_COLOR_GREEN,
                    marginTop: 20,
                  }}
                  textStyle={[CommonStyles.text_14_bold, {color: COLOR.WHITE}]}
                  onPress={requestMicrophone}
                />
              </View>
            )}

            {!permissionDeniedMsg && (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  marginHorizontal: 30,
                }}>
                <Text
                  style={[
                    CommonStyles.text_12_bold,
                    {
                      alignSelf: 'center',
                      marginTop: 30,
                      textAlign: 'center',
                      color: COLOR.TEXT_BODY_COLOR,
                    },
                  ]}>
                  Want to take a glance at
                </Text>
                <Text
                  style={[
                    CommonStyles.text_12_bold,
                    {
                      alignSelf: 'center',
                      textAlign: 'center',
                      color: COLOR.TEXT_BODY_COLOR,
                    },
                  ]}>
                  {toTitleCase(studentName)}'s class
                </Text>
                <Text
                  style={[
                    CommonStyles.text_12_bold,
                    {
                      alignSelf: 'center',
                      marginTop: 20,
                      textAlign: 'center',
                      fontStyle: 'italic',
                      fontSize: 15,
                      fontWeight: '700',
                    },
                  ]}>
                  Your Video will not be shown to the teacher and student
                </Text>
                <Text
                  style={[
                    {
                      alignSelf: 'center',
                      marginTop: 2,
                      textAlign: 'center',
                      fontStyle: 'italic',
                      fontSize: 15,
                      fontWeight: '700',
                    },
                    CommonStyles.text_12_bold,
                  ]}>
                  Your Microphone will be muted
                </Text>
                <View style={{marginTop: 30}}>
                  <Image
                    style={{
                      resizeMode: 'contain',
                      width: SCREEN_WIDTH,
                      height: SCREEN_WIDTH / 2,
                      alignSelf: 'center',
                    }}
                    source={IMG_PARENT_PEEK}
                  />

                  <CustomGradientButton
                    myRef={input => {
                      this.btn_connect_now = input;
                    }}
                    style={CommonStyles.green_button_gradient}
                    children="Connect"
                    onPress={_onConnectButtonPress}
                  />
                </View>
              </View>
            )}
            <View
              style={{
                flex: 0.5,
                justifyContent: 'flex-end',
                marginBottom: 30,
                marginHorizontal: 20,
              }}>
              <CustomButton
                myRef={input => {
                  this.btn_home = input;
                }}
                style={CommonStyles.green_button_gradient}
                children="Home"
                containerStyle={{
                  backgroundColor: COLOR.LIGHT_BLUE,
                  marginHorizontal: 30,
                }}
                textStyle={[
                  CommonStyles.text_14_bold,
                  {color: COLOR.BLUE_LINk},
                ]}
                onPress={goToHome}
              />
            </View>
          </View>
        )}

        {status === 'connected' && (
          <View style={styles.callContainer}>
            {/* {participantCount < 2 && (
              <View
                style={{
                  width: SCREEN_WIDTH - 20,
                  height: SCREEN_HEIGHT / 2,
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 10,
                  elevation: 10,
                }}
              >
                <View
                  style={{
                    backgroundColor: COLOR.BG_ALPHA_BLACK,
                    width: 300,
                    height: 200,
                    borderRadius: 20,
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  {participantCount == 1 && (
                    <Text
                      style={[
                        CommonStyles.text_12__semi_bold,
                        {
                          color: COLOR.WHITE,
                          textAlign: "center",
                          justifyContent: "center",
                          alignContent: "center",
                          marginHorizontal: 20,
                        },
                      ]}
                    >
                      {getNonConnectedParticipant()}
                    </Text>
                  )}
                </View>
              </View>
            )} */}
            {status === 'connected' && (
              <View style={styles.remoteGrid}>
                {Array.from(
                  videoTracks,
                  ([trackSid, trackIdentifier, participantIdentity]) => {
                    console.log(
                      'Video Tracks',
                      videoTracks.get(trackSid).participantIdentity,
                    );

                    return (
                      <View style={{flex: 1}}>
                        {/* <Text style={[CommonStyles.text_12__semi_bold, { color: COLOR.BLACK, textAlign: 'center' }]}>{videoTracks.get(trackSid).participantIdentity}</Text> */}

                        <View style={styles.participantVideoContainer}>
                          <TwilioVideoParticipantView
                            style={styles.remoteVideo}
                            key={trackSid}
                            trackIdentifier={trackIdentifier}
                          />
                        </View>
                      </View>
                    );
                  },
                )}
              </View>
            )}

            <View style={styles.optionsContainer}>
              <CustomButton
                myRef={input => {
                  this.btn_home = input;
                }}
                children="Leave"
                containerStyle={{backgroundColor: COLOR.RED, width: 200}}
                textStyle={[CommonStyles.text_14_bold, {color: COLOR.WHITE}]}
                onPress={_onEndButtonPress}
              />

              {/* <TouchableOpacity
              style={styles.optionButton}
              onPress={_onMuteButtonPress}>
              <Text style={{ fontSize: 12 }}>{isAudioEnabled ? "Mute" : "Unmute"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={_onFlipButtonPress}>
              <Text style={{ fontSize: 12 }}>Flip</Text>
            </TouchableOpacity> */}
            </View>
          </View>
        )}

        <TwilioVideo
          ref={twilioRef}
          onRoomDidConnect={_onRoomDidConnect}
          onRoomDidDisconnect={_onRoomDidDisconnect}
          onRoomDidFailToConnect={_onRoomDidFailToConnect}
          onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
          onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
        />
      </View>
    </ScrollView>
  );
};

export default ParentConnect;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  callContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    minHeight: '100%',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 40,
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginRight: 70,
    marginLeft: 70,
    marginTop: 50,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  button: {
    marginTop: 100,
  },
  localVideoOnButtonEnabled: {
    bottom: '40%',
    width: '35%',
    left: '64%',
    height: '25%',
    zIndex: 2,
  },
  localVideoOnButtonDisabled: {
    bottom: '30%',
    width: '35%',
    left: '64%',
    height: '25%',
    zIndex: 2,
  },
  remoteGrid: {
    flex: 1,
    flexDirection: 'column',
  },
  participantVideoContainer: {
    width: SCREEN_WIDTH - 20,
    height: SCREEN_HEIGHT / 2.5,
    alignSelf: 'center',
    borderColor: COLOR.BORDER_COLOR_GREY,
    overflow: 'hidden',
    borderRadius: 20,
    borderWidth: 5,
    marginVertical: 10,
    zIndex: 1,
  },
  remoteVideo: {
    width: SCREEN_WIDTH - 20,
    height: SCREEN_HEIGHT / 2.5,
    overflow: 'hidden',
    zIndex: 1,
  },
  optionsContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    zIndex: 2,
  },
  optionButton: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100 / 2,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacing: {
    padding: 10,
  },
  inputLabel: {
    fontSize: 18,
  },
  buttonContainer: {
    height: normalize(45),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: wp('90%'),
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#1E3378',
    width: wp('90%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 10,
  },
  Buttontext: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
  },
  inputBox: {
    borderBottomColor: '#cccccc',
    fontSize: 16,
    width: wp('95%'),
    borderBottomWidth: 1,
  },
});
