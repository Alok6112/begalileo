import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import {COLOR, CommonStyles} from '../../config/styles';
import {
  IC_PROFILE_PIC,
  IMG_SHAKSHI,
  IMG_SARTHAK,
  IC_RIGHT_ENTER,
  IC_MORE_PROFILE,
  IC_MORE_SUBSCRIPTIONS,
  IC_MORE_MY_KIDS,
  IC_MORE_LIVE_CLASS_BATCH,
  IC_MORE_CARD_DETAILS,
  IC_MORE_LOGOUT,
  ICON_HELP,
  DELETE_ACCOUNT,
} from '../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import {logOutUser, deleteUserAccount} from '../../actions/authenticate';
import Icon from 'react-native-vector-icons/FontAwesome';
import {normalize, Card} from 'react-native-elements';
import SvgUri from 'react-native-svg-uri';
import {
  getLocalData,
  storeLocalData,
} from '../../components/helpers/AsyncMethods';
import DashboardHeader from '../../components/DashboardHeader';

import AsyncStorage from '@react-native-community/async-storage';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {DeleteFcmToken} from '../SmScreen/AppChat/Firebase/Users';
import {CommonActions} from '@react-navigation/native';

class HomeMoreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allKidsList: [
        {
          name: 'SHAKSHI',
          avatar: IMG_SHAKSHI,
          grade: 'Kindergarten',
        },
        {
          name: 'SARTHAK',
          avatar: IMG_SARTHAK,
          grade: 'Grade 2',
        },
      ],
    };
  }

  onProfileClick = () => {
    this.props.navigation.navigate(Constants.MoreProfileScreen);
  };

  onLiveClassBatchClick = () => {
    this.props.navigation.navigate(Constants.MoreLiveClassBatchScreens);
  };

  onMyAddressClick = () => {
    this.props.navigation.navigate(Constants.MoreMyAddressScreen);
    //this.props.navigation.navigate(Constants.MIDAS_HOME_SCREEN);
  };

  onMoreHelpScreen = () => {
    this.props.navigation.navigate(Constants.MoreHelpScreen);
  };
  onNoificationClick = () => {
    this.props.navigation.navigate(Constants.MoreNotificationScreen);
  };

  onMoreMySubcriptionsClick = () => {
    this.props.navigation.navigate(Constants.MoreMySubscriptions);
  };

  onClickMykids = () => {
    getLocalData(Constants.ParentUserId).then(parentId => {
      this.props.navigation.navigate(Constants.AddKidDetail, {
        user_id: parentId,
        isFrom: Constants.ExistingUser,
      });
    });
  };

  onClickLogOut = () => {
    Alert.alert(
      'Are you sure want to Log out?',
      '',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Presseddddd'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => this.onLogOutConfirmation()},
      ],
      {cancelable: false},
    );
  };

  onClickDeleteAccount = () => {
    Alert.alert(
      'Deleting the account will remove your account and delete all your datas stored with us. Are you sure want to delete account?',
      '',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => this.onDeleteConfirmation()},
      ],
      {cancelable: false},
    );
  };

  onDeleteConfirmation = async () => {
    console.log('On Click delete');
    getLocalData(Constants.ParentUserId).then(parentId => {
      console.log('Parent ID ', parentId);
      this.props
        .deleteUserAccount(parentId)
        .then(response => {
          const dataResponse = response.payload.data;
          if (dataResponse.status) {
            this.onDeleteAccountSuccess();
          } else {
            showMessage({
              message: 'Unable to delete account please try later',
              type: 'danger',
            });
          }
        })
        .catch(err => {
          showMessage({
            message: 'Unable to delete account please try later',
            type: 'danger',
          });
        });
    });
  };

  onDeleteAccountSuccess = () => {
    console.log('delete account success');
    // const items = [[Constants.IS_LOGGED_IN, JSON.stringify(false)], [Constants.IsParentRegistered, JSON.stringify(false)],[Constants.ParentUserId, JSON.stringify("")]]
    // AsyncStorage.multiSet(items).then(() => {
    //     this.props.logOutUser();
    //     this.goToLogin();
    // })
  };

  onLogOutConfirmation = async () => {
    getLocalData(Constants.ParentUserId).then(res => {
      DeleteFcmToken(res);
    });
    const items = [
      [Constants.IS_LOGGED_IN, JSON.stringify(false)],
      [Constants.IsParentRegistered, JSON.stringify(false)],
    ];
    AsyncStorage.multiSet(items).then(() => {
      this.props.logOutUser();
      this.goToLogin();
    });
  };
  goToLogin = () => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{name: Constants.Splash}],
    });

    this.props.navigation.dispatch(resetAction);
  };

  render() {
    const kidList = this.state.allKidsList.map((kid, index) => {
      return (
        <View
          key={index}
          style={{marginTop: normalize(12), marginStart: normalize(12)}}>
          <Image
            style={{
              borderRadius: 100,
              height: normalize(76),
              width: normalize(76),
              alignSelf: 'center',
              resizeMode: 'stretch',
            }}
            source={kid.avatar == null ? IC_PROFILE_PIC : kid.avatar}
          />
          <Text
            style={[
              CommonStyles.text_14_bold,
              {alignSelf: 'center', marginTop: normalize(10)},
            ]}>
            {kid.name}
          </Text>
          <Text
            style={[
              CommonStyles.text_12_Regular,
              {
                alignSelf: 'center',
                marginTop: normalize(2),
                color: COLOR.TEXT_ALPHA_GREY,
              },
            ]}>
            {kid.grade}
          </Text>
        </View>
      );
    });
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLOR.WHITE,
          paddingStart: normalize(10),
          paddingEnd: normalize(10),
        }}>
        <ScrollView>
          <View style={{flex: 1, justifyContent: 'flex-start'}}>
            {/* <View style={{ flexDirection: 'row' }}>
                            <Image style={{ height: normalize(16), width: normalize(16), resizeMode: "stretch" }} source={IC_SWITCH_PROFILE} />
                            <Text style={[CommonStyles.text_12__semi_bold, { marginStart: normalize(16) }]}>Switch to</Text>
                        </View> */}
            {/* <DashboardHeader headerTitle="More" headerDescription="Configure your account" /> */}
            {/* <View style={{ flexDirection: 'row', marginBottom: normalize(10), marginTop: normalize(20) }}>
                            {kidList}
                        </View> */}
            <View style={{marginTop: normalize(32)}}>
              <TouchableOpacity
                onPress={this.onProfileClick}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: normalize(19),
                  paddingBottom: normalize(19),
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{
                      height: normalize(16),
                      width: normalize(16),
                      resizeMode: 'stretch',
                    }}
                    source={IC_MORE_MY_KIDS}
                  />
                  <Text
                    style={[
                      CommonStyles.text_12__semi_bold,
                      {marginStart: normalize(16)},
                    ]}>
                    Profile
                  </Text>
                </View>
                <Image
                  style={{
                    height: normalize(8),
                    width: normalize(4),
                    marginEnd: normalize(2),
                    resizeMode: 'stretch',
                  }}
                  source={IC_RIGHT_ENTER}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.onClickMykids}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: normalize(19),
                  paddingBottom: normalize(19),
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{
                      height: normalize(16),
                      width: normalize(16),
                      resizeMode: 'stretch',
                    }}
                    source={IC_MORE_MY_KIDS}
                  />
                  <Text
                    style={[
                      CommonStyles.text_12__semi_bold,
                      {marginStart: normalize(16)},
                    ]}>
                    My Kids
                  </Text>
                </View>
                <Image
                  style={{
                    height: normalize(8),
                    width: normalize(4),
                    marginEnd: normalize(2),
                    resizeMode: 'stretch',
                  }}
                  source={IC_RIGHT_ENTER}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={this.onLiveClassBatchClick}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: normalize(19),
                  paddingBottom: normalize(19),
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{
                      height: normalize(16),
                      width: normalize(16),
                      resizeMode: 'stretch',
                    }}
                    source={IC_MORE_LIVE_CLASS_BATCH}
                  />
                  <Text
                    style={[
                      CommonStyles.text_12__semi_bold,
                      {marginStart: normalize(16)},
                    ]}>
                    Live Class Schedule
                  </Text>
                </View>
                <Image
                  style={{
                    height: normalize(8),
                    width: normalize(4),
                    marginEnd: normalize(2),
                    resizeMode: 'stretch',
                  }}
                  source={IC_RIGHT_ENTER}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={this.onMoreMySubcriptionsClick}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: normalize(19),
                  paddingBottom: normalize(19),
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{
                      height: normalize(16),
                      width: normalize(16),
                      resizeMode: 'stretch',
                    }}
                    source={IC_MORE_SUBSCRIPTIONS}
                  />
                  <Text
                    style={[
                      CommonStyles.text_12__semi_bold,
                      {marginStart: normalize(16)},
                    ]}>
                    My Subscriptions
                  </Text>
                  {/* <Text style={[CommonStyles.text_12_regular, { color: COLOR.TEXT_COLOR_ORANGE, marginStart: normalize(15) }]}>Renew</Text> */}
                </View>
                <Image
                  style={{
                    height: normalize(8),
                    width: normalize(4),
                    marginEnd: normalize(2),
                    resizeMode: 'stretch',
                  }}
                  source={IC_RIGHT_ENTER}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={this.onMyAddressClick}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: normalize(19),
                  paddingBottom: normalize(19),
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{
                      height: normalize(16),
                      width: normalize(16),
                      resizeMode: 'stretch',
                    }}
                    source={IC_MORE_CARD_DETAILS}
                  />
                  <Text
                    style={[
                      CommonStyles.text_12__semi_bold,
                      {marginStart: normalize(16)},
                    ]}>
                    My Addresses
                  </Text>
                </View>
                <Image
                  style={{
                    height: normalize(8),
                    width: normalize(4),
                    marginEnd: normalize(2),
                    resizeMode: 'stretch',
                  }}
                  source={IC_RIGHT_ENTER}
                />
              </TouchableOpacity>

              {/* <TouchableOpacity onPress={this.onNoificationClick} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: normalize(19), paddingBottom: normalize(19) }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ height: normalize(16), width: normalize(16), resizeMode: "stretch" }} source={IC_MORE_NOTIFICATIONS} />
                                    <Text style={[CommonStyles.text_12__semi_bold, { marginStart: normalize(16) }]}>Notifications</Text>
                                </View>
                                <Image style={{ height: normalize(8), width: normalize(4), marginEnd: normalize(2), resizeMode: "stretch" }} source={IC_RIGHT_ENTER} />
                            </TouchableOpacity> */}
              <TouchableOpacity
                onPress={this.onMoreHelpScreen}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: normalize(19),
                  paddingBottom: normalize(19),
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{
                      height: normalize(16),
                      width: normalize(16),
                      resizeMode: 'stretch',
                    }}
                    source={ICON_HELP}
                  />
                  <Text
                    style={[
                      CommonStyles.text_12__semi_bold,
                      {marginStart: normalize(16)},
                    ]}>
                    Help
                  </Text>
                </View>
                <Image
                  style={{
                    height: normalize(8),
                    width: normalize(4),
                    marginEnd: normalize(2),
                    resizeMode: 'stretch',
                  }}
                  source={IC_RIGHT_ENTER}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.onClickLogOut}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: normalize(19),
                  paddingBottom: normalize(19),
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{
                      height: normalize(16),
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
              {/* <TouchableOpacity onPress={this.onClickDeleteAccount} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: normalize(19), paddingBottom: normalize(19) }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ height: normalize(16), width: normalize(16), resizeMode: "stretch" }} source={DELETE_ACCOUNT} />
                                    <Text style={[CommonStyles.text_12__semi_bold, { marginStart: normalize(16) }]}>Delete Account</Text>
                                </View>
                            </TouchableOpacity> */}

              {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between',paddingTop : normalize(19),paddingBottom : normalize(19) }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ height: normalize(16), width: normalize(16), resizeMode: "stretch" }} source={IC_MORE_HELP} />
                                    <Text style={[CommonStyles.text_12__semi_bold, { marginStart: normalize(16) }]}>Help</Text>
                                </View>
                                <Image style={{ height: normalize(8), width: normalize(4), marginEnd: normalize(2), resizeMode: "stretch" }} source={IC_RIGHT_ENTER} />
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between',paddingTop : normalize(19),paddingBottom : normalize(19) }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image style={{ height: normalize(16), width: normalize(16), resizeMode: "stretch" }} source={IC_MORE_NOTIFICATIONS} />
                                    <Text style={[CommonStyles.text_12__semi_bold, { marginStart: normalize(16) }]}>Notifications</Text>
                                </View>
                                <Image style={{ height: normalize(8), width: normalize(4), marginEnd: normalize(2), resizeMode: "stretch" }} source={IC_RIGHT_ENTER} />
                            </View> */}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

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

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 15,
    textAlign: 'left',
    color: COLOR.TEXT_COLOR_BLUE,
    marginTop: 10,
    marginBottom: 5,
    fontFamily: 'Montserrat-SemiBold',
  },
  textLighter: {
    fontSize: 13,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 5,
    color: COLOR.TEXT_COLOR_BLUE,
    fontFamily: 'Montserrat-Regular',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeMoreScreen);
