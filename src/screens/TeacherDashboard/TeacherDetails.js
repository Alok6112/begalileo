import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {connect} from 'react-redux';

import {getLocalData} from '../../components/helpers/AsyncMethods';

import * as Constants from '../../components/helpers/Constants';

import {CommonStyles, COLOR} from '../../config/styles';
import {normalize} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {IC_MORE_LOGOUT} from '../../assets/images';
import {CommonActions} from '@react-navigation/native';
import {logOutUser, deleteUserAccount} from '../../actions/authenticate';

import checkVersion from 'react-native-store-version';

const TeacherDetails = (props, {teacherName}) => {
  const [appVersionValue, setAppVersionState] = useState('');

  useEffect(() => {
    _retrieveData();
  }, []);

  useEffect(() => {
    checkAppVersion();
  }, [appVersionValue]);

  const onLogOutConfirmation = () => {
    const items = [
      [Constants.IS_LOGGED_IN, JSON.stringify(false)],
      [Constants.IsParentRegistered, JSON.stringify(false)],
      [Constants.UserLoginRole, JSON.stringify('')],
    ];
    AsyncStorage.multiSet(items).then(() => {
      props.logOutUser();
      goToLogin();
    });
  };

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('appVersionKey');

      console.log('appVersionKey from async storage', value);
      if (value !== null) {
        setAppVersionState(value);

        // We have data!!
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const redirectToAppStore = async () => {
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

  const cancelUpdateAppPrompt = () => {
    console.log('dont update app now');
  };

  const checkAppVersion = async () => {
    try {
      if (appVersionValue != '') {
        const check = await checkVersion({
          version: appVersionValue, // app local version
          iosStoreURL: 'https://apps.apple.com/us/app/begalileo/id1537982021',
          androidStoreURL:
            'https://play.google.com/store/apps/details?id=com.begalileorndev',
          country: 'jp', // default value is 'jp'
        });

        if (check.result === 'new') {
          Alert.alert('New version is available', '', [
            {
              text: 'Update now',
              onPress: () => redirectToAppStore(),
            },
            {
              text: 'Cancel',
              onPress: () => cancelUpdateAppPrompt(),
            },
          ]);
          // if app store version is new
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const goToLogin = () => {
    console.log('Logging Out');

    const navigateAction = CommonActions.reset({
      index: 0,
      routes: [{name: Constants.Splash}],
    });
    props.props.navigation.dispatch(navigateAction);
  };

  const onClickLogOut = () => {
    Alert.alert(
      'Are you sure want to Log out?',
      '',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => onLogOutConfirmation()},
      ],
      {cancelable: false},
    );
  };

  return (
    <View
      style={{
        borderColor: 'red',
        margin: 'auto',
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      }}>
      <View
        style={{
          marginLeft: normalize(10),
          marginTop: normalize(3),
        }}>
        <TouchableOpacity
          onPress={onClickLogOut}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: normalize(5),
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{
                height: normalize(20),
                width: normalize(16),
                resizeMode: 'stretch',
              }}
              source={IC_MORE_LOGOUT}
            />
            <Text
              style={[
                CommonStyles.text_12__semi_bold,
                {marginStart: normalize(16)},
              ]}>
              Log Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={[
            CommonStyles.text_12_bold,
            {
              marginRight: normalize(10),
              marginTop: normalize(5),
              color: COLOR.BLUE_LINk,
            },
          ]}>
          {'Hello' + ' ' + props.teacherName || ''}
        </Text>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    state: state.authenticate,
    requestRestore: state.authenticate.requestRestore,
  };
};

const mapDispatchToProps = {
  logOutUser,
  deleteUserAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDetails);
