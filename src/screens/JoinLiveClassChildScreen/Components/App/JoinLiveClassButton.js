import React, {useEffect, useRef, useState} from 'react';

import {COLOR, CommonStyles} from '../../../../config/styles';
import * as Constants from '../../../../components/helpers/Constants';
import Orientation from 'react-native-orientation';
import {BASE_URL} from '../../../../config/configs';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {TwilioVideo} from 'react-native-twilio-video-webrtc';
import {showMessage} from 'react-native-flash-message';
import {Pressable} from 'react-native';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import {getParamNavigationV5} from '../../../../components/helpers/navigationV5Data';

function JoinLiveClassButton(props) {
  const [connected, setConnected] = useState(true);
  const [status, setStatus] = useState('disconnected');
  const [videoTracks, setVideoTracks] = useState(new Map());
  const [token, setToken] = useState('');
  const [participantCount, setParticipantCount] = useState(0);
  const [env, setEnv] = useState(null);
  const [classtype, setClassType] = useState(null);
  const [showNewCodings, setShowNewCodings] = useState(null);
  const [demoStatus, setDemoStatus] = useState(null);
  const [parent_country_code, setParentCountryCode] = useState('');
  const [newCodingPlan, setNewCodingPlan] = useState(null);
  const [noErrorProduced, setNoErrorProduced] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [liveClassID, setLiveClassID] = useState('');
  const [studentUserId, setStudentUserId] = useState('');
  const twilioRef = useRef(null);

  useEffect(() => {
    const initial = Orientation.getInitialOrientation();
    Orientation.lockToLandscapeRight();
    return () => {
      const initial = Orientation.getInitialOrientation();
      Orientation.lockToPortrait();
    };
  }, []);

  const _onBackToHome = () => {
    props.navigation.goBack();
  };

  const _onConnectButtonPress = async () => {
    setConnected(false);

    let studid = getParamNavigationV5(props, 'student_id', null);
    let liveId = getParamNavigationV5(props, 'live_class_id', null);

    setLiveClassID(liveId);
    setStudentUserId(studid);

    let url = `${BASE_URL}/app_students/join_class?student_id=
      ${studid}&live_class_id=
      ${liveId}`;

    const response = await fetch(url).catch(ae => {});

    const json = await response.json();

    if (json.status == true) {
      CreateAndJoinRoom(studid, liveId);
    } else {
      setNoErrorProduced(true);
      setErrorMessage(json?.message);
    }
  };

  const _onRoomDidDisconnect = ({roomName, error}) => {
    console.log('error', error);
    setStatus('disconnected');
  };

  const _onRoomDidFailToConnect = error => {
    console.log('error', error);
    setStatus('disconnected');
  };

  const connectWithCamera = async (
    token,
    demoStatus,
    env,
    class_type,
    show_new_codings,
    new_coding_plan,
  ) => {
    setToken(token);

    if (token != '') {
      let studid = getParamNavigationV5(props, 'student_id', null);
      let liveId = getParamNavigationV5(props, 'live_class_id', null);

      props.navigation.navigate(Constants.VideoTemp, {
        navigation: props.navigation,
        token: token,
        studid: studid,
        liveId: liveId,
        env: env,
        classtype: class_type,
        newCodingPlan: newCodingPlan,
        showNewCodings: show_new_codings,
        demoStatus: demoStatus,
        new_coding_plan: new_coding_plan,
      });
    }
  };

  const getToken = async (user, live_class_id) => {
    let url = `${BASE_URL}/app_students/video_call_token?user=
      ${user}&live_class_id=
      ${live_class_id}`;

    const response = await fetch(url).catch(ae => {});

    const json = await response.json();

    return json;
  };

  const createRoomToken = async (userId, liveClassId) => {
    const response = await getToken(userId, liveClassId);
    return response;
  };

  CreateAndJoinRoom = async (userID, liveClassID) => {
    try {
      const response = await createRoomToken(userID, liveClassID);

      setNewCodingPlan(response.new_coding_plan);
      setParentCountryCode(response.iso_code);
      setEnv(response.env);
      setClassType(response.class_type);
      setShowNewCodings(response.show_new_codings);
      setDemoStatus(response.demo);
      const demoStatus = response.demo;
      const env = response.env;
      const class_type = response.class_type;
      const show_new_codings = response.show_new_codings;
      const new_coding_plan = response.new_coding_plan;
      const token = response.token;
      const roomId = response.room_id;
      const whiteBoardUrl = response.white_board_url;
      const country_code = response.iso_code;

      await connectWithCamera(
        token,
        demoStatus,
        env,
        class_type,
        show_new_codings,
        new_coding_plan,
      );
    } catch (error) {}
  };

  return (
    <>
      {!noErrorProduced ? (
        <View style={styles.container}>
          {status === 'disconnected' && (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {connected && (
                <Pressable
                  onPress={_onConnectButtonPress}
                  style={{
                    backgroundColor: COLOR.BLUE_LINk,
                    paddingHorizontal: 40,
                    paddingVertical: 20,
                    borderRadius: 20,
                  }}>
                  <Text
                    style={[CommonStyles.text_18_bold, {color: COLOR.WHITE}]}>
                    Connect Now
                  </Text>
                </Pressable>
              )}

              <Pressable
                onPress={_onBackToHome}
                style={{
                  backgroundColor: COLOR.ORANGE,
                  paddingHorizontal: 40,
                  paddingVertical: 20,
                  borderRadius: 20,
                  marginTop: 20,
                }}>
                <Text style={[CommonStyles.text_18_bold, {color: COLOR.WHITE}]}>
                  Back to home
                </Text>
              </Pressable>
              {!connected && (
                <View style={{marginTop: 200}}>
                  <ActivityIndicator
                    size="large"
                    color="black"
                    style={CommonStyles.activityIndicatorStyle}
                  />
                </View>
              )}

              <TwilioVideo
                ref={twilioRef}
                // onRoomDidConnect={_onRoomDidConnect}
                onRoomDidDisconnect={_onRoomDidDisconnect}
                onRoomDidFailToConnect={_onRoomDidFailToConnect}
              />
            </View>
          )}
        </View>
      ) : (
        <View style={styles.container}>
          <ErrorBoundary
            navigation={props.navigation}
            error={errorMessage}
            liveClassID={liveClassID}
            studentID={studentUserId}
          />
        </View>
      )}
    </>
  );
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
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JoinLiveClassButton);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: 'coral',
  },
});
