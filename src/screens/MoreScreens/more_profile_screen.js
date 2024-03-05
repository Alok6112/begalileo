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
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import {COLOR, CommonStyles} from '../../config/styles';
import {
  IC_SWITCH_PROFILE,
  IC_EDIT_PEN,
  IC_CLOSE_BLUE,
} from '../../assets/images';
import {CustomBackButton} from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import {normalize, Card} from 'react-native-elements';
import CustomGradientButton from '../../components/CustomGradientButton';
import {isValidEmail, allowOnlyAlphabets} from '../../components/helpers';
import {updateParentProfile, getDashboardItems} from '../../actions/dashboard';
import {deleteUserAccount, logOutUser} from '../../actions/authenticate';
import axios from 'axios';
import {BASE_URL} from '../../config/configs';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {CommonActions} from '@react-navigation/native';
import {getLocalData} from '../../components/helpers/AsyncMethods';
import AsyncStorage from '@react-native-community/async-storage';
import {BackHandler} from 'react-native';
import {getParamNavigationV5} from '../../components/helpers/navigationV5Data';

class MoreProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditScreen: false,
      emailError: false,
      firstNameError: false,
      mobileNumberError: false,
      mUserEmail: '',
      mUserFirstName: '',
      mUserLastName: '',
      mUserMobileNumber: '',
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    var updateNotify = getParamNavigationV5(this.props, 'updateNotify', false);
    if (updateNotify) {
      showMessage({
        message: 'Complete your profile',
        type: 'success',
      });
    }

    this.setState({
      mUserEmail: this.props.dashboardResponse.parent_details[0].email,
      mUserFirstName: this.props.dashboardResponse.parent_details[0].first_name,
      mUserLastName: this.props.dashboardResponse.parent_details[0].last_name,
      mUserMobileNumber: this.props.dashboardResponse.parent_details[0].mobile,
    });
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
  }
  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.updateProfileStatus !== this.props.updateProfileStatus) {
      if (this.props.updateProfileStatus) {
        showMessage({
          message: 'Profile updated successfully',
          type: 'success',
        });
        this.loadDashboardDatas();
      } else {
        if (this.props.updateProfileStatus != null) {
          showMessage({
            message: this.props.updateProfileResponse.message,
            type: 'danger',
          });
        }
      }
    }
  }

  loadDashboardDatas = () => {
    this.setState({
      isEditScreen: false,
    });

    this.props.getDashboardItems(
      this.props.dashboardResponse.parent_details[0].id,
      this.props.dashboardResponse.parent_details[0].country,
      this.props.currentSelectedKid.student_id,
    );
  };

  onPressBack = () => {
    const {goBack} = this.props.navigation;

    goBack();
  };

  onEditProfileClick = () => {
    this.setState({
      isEditScreen: true,
    });
    //  this.props.navigation.navigate(Constants.MoreEditProfileScreen);
  };

  onClickDe;

  onUpdateProfile = () => {
    let isValidationSuccess = true;
    if (isValidEmail(this.state.mUserEmail)) {
      this.setState({
        emailError: false,
      });
    } else {
      this.setState({
        emailError: true,
      });
      isValidationSuccess = false;
    }

    if (this.state.mUserFirstName == '') {
      this.setState({
        firstNameError: true,
      });
      isValidationSuccess = false;
    } else {
      this.setState({
        firstNameError: false,
      });
    }

    if (this.state.mUserMobileNumber !== '') {
      this.setState({
        mobileNumberError: false,
      });
    } else {
      this.setState({
        mobileNumberError: true,
      });
      isValidationSuccess = false;
    }

    if (isValidationSuccess) {
      this.props.updateParentProfile(
        this.props.dashboardResponse.parent_details[0].id,
        this.state.mUserMobileNumber,
        this.state.mUserEmail,
        this.state.mUserFirstName,
        this.state.mUserLastName,
      );
    }
  };

  getFullName = data => {
    return (
      data.parent_details[0].first_name + ' ' + data.parent_details[0].last_name
    );
  };
  addUserFirstName = value => {
    if (!allowOnlyAlphabets(value)) return;
    this.setState({
      mUserFirstName: value,
    });
  };
  addUserLastName = value => {
    if (!allowOnlyAlphabets(value)) return;
    this.setState({
      mUserLastName: value,
    });
  };
  onMobileNumberChanged(text) {
    let newText = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      }
    }
    this.setState({mUserMobileNumber: newText});
  }

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
    this.props
      .deleteUserAccount(this.props.dashboardResponse.parent_details[0].id)
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
  };

  onDeleteAccountSuccess = () => {
    console.log('delete account success');
    const items = [
      [Constants.IS_LOGGED_IN, JSON.stringify(false)],
      [Constants.IsParentRegistered, JSON.stringify(false)],
      [Constants.ParentUserId, JSON.stringify('')],
    ];
    AsyncStorage.multiSet(items).then(() => {
      this.props.logOutUser();
      this.goToLogin();
    });
  };

  goToLogin = () => {
    console.log('Deleting  Account');
    // this.props.navigation.replace(Constants.Splash);
    const navigateAction = CommonActions.reset({
      index: 0,
      routes: [{name: Constants.Splash}],
    });

    this.props.navigation.dispatch(navigateAction);
    // this.props.navigation.replace(Constants.MainScreen);
  };

  render() {
    const {isEditScreen} = this.state;
    const {dashboardResponse, loading} = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLOR.PRIMARY_BG,
        }}>
        <ScrollView>
          <View
            style={{
              marginStart: normalize(20),
              marginEnd: normalize(20),
              marginTop: normalize(10),
            }}>
            <CustomBackButton onPress={this.onPressBack} />
            {loading && (
              <ActivityIndicator
                size="large"
                color="black"
                style={CommonStyles.activityIndicatorStyle}
              />
            )}

            {this.props.dashboardStatus && (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: normalize(20),
                  }}>
                  <Text
                    style={[
                      CommonStyles.text_18_bold,
                      {color: COLOR.TEXT_COLOR_BLUE},
                    ]}>
                    {isEditScreen ? 'Edit Profile' : 'Profile'}
                  </Text>
                  {isEditScreen ? (
                    <TouchableOpacity
                      style={{flexDirection: 'row', alignItems: 'center'}}
                      onPress={() => {
                        this.setState({
                          isEditScreen: false,
                        });
                      }}>
                      <Image
                        source={IC_CLOSE_BLUE}
                        style={{
                          height: 40,
                          width: 40,
                          padding: 20,
                          resizeMode: 'cover',
                        }}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={this.onEditProfileClick}
                      style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        style={{
                          height: normalize(16),
                          width: normalize(16),
                          resizeMode: 'stretch',
                        }}
                        source={IC_EDIT_PEN}
                      />
                      <Text
                        style={[
                          CommonStyles.text_12_bold,
                          {
                            color: COLOR.TEXT_COLOR_GREEN,
                            marginStart: normalize(8),
                          },
                        ]}>
                        Edit Profile
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View style={{marginTop: normalize(10)}}>
                  <Text style={[CommonStyles.text_11_bold]}>Email Id</Text>
                  {isEditScreen &&
                  dashboardResponse.parent_details[0].email == '' ? (
                    <View
                      style={{
                        marginLeft: 5,
                        marginRight: 5,
                        marginTop: 12,
                        marginBottom: 2,
                      }}>
                      {this.state.emailError && (
                        <Text style={styles.errorMessage}>
                          Please enter a valid Email
                        </Text>
                      )}
                      <TextInput
                        ref={input => {
                          this.email_id_input = input;
                        }}
                        placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                        keyboardType="email-address"
                        style={styles.textInputBordered}
                        autoCapitalize="none"
                        onChangeText={text => this.setState({mUserEmail: text})}
                        value={this.state.mUserEmail}
                        blurOnSubmit={false}
                      />
                    </View>
                  ) : (
                    <Text
                      style={[
                        CommonStyles.text_14_Regular,
                        {
                          color: COLOR.TEXT_ALPHA_GREY,
                          marginTop: normalize(8),
                        },
                      ]}>
                      {dashboardResponse.parent_details[0].email == ''
                        ? '- - - - - - - -  -'
                        : dashboardResponse.parent_details[0].email}
                    </Text>
                  )}
                </View>
                <View style={{marginTop: normalize(10)}}>
                  <Text style={[CommonStyles.text_11_bold]}>First Name</Text>
                  {isEditScreen ? (
                    <View
                      style={{
                        marginLeft: 5,
                        marginRight: 5,
                        marginTop: 12,
                        marginBottom: 2,
                      }}>
                      {this.state.firstNameError && (
                        <Text style={styles.errorMessage}>
                          Please enter a valid name
                        </Text>
                      )}
                      <TextInput
                        placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                        style={styles.textInputBordered}
                        onChangeText={this.addUserFirstName.bind(this)}
                        value={this.state.mUserFirstName}
                        blurOnSubmit={false}
                      />
                    </View>
                  ) : (
                    <Text
                      style={[
                        CommonStyles.text_14_Regular,
                        {
                          color: COLOR.TEXT_ALPHA_GREY,
                          marginTop: normalize(8),
                        },
                      ]}>
                      {dashboardResponse.parent_details[0].first_name == ''
                        ? '- - - - - - - - '
                        : dashboardResponse.parent_details[0].first_name}
                    </Text>
                  )}
                </View>
                <View style={{marginTop: normalize(10)}}>
                  <Text style={[CommonStyles.text_11_bold]}>Last Name</Text>
                  {isEditScreen ? (
                    <View
                      style={{
                        marginLeft: 5,
                        marginRight: 5,
                        marginTop: 12,
                        marginBottom: 2,
                      }}>
                      {/* {this.state.firstNameError && <Text style={styles.errorMessage}>Please enter a valid name</Text>} */}
                      <TextInput
                        placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                        style={styles.textInputBordered}
                        onChangeText={this.addUserLastName.bind(this)}
                        value={this.state.mUserLastName}
                        blurOnSubmit={false}
                      />
                    </View>
                  ) : (
                    <Text
                      style={[
                        CommonStyles.text_14_Regular,
                        {
                          color: COLOR.TEXT_ALPHA_GREY,
                          marginTop: normalize(8),
                        },
                      ]}>
                      {dashboardResponse.parent_details[0].last_name == ''
                        ? '- - - - - - - - '
                        : dashboardResponse.parent_details[0].last_name}
                    </Text>
                  )}
                </View>
                <View style={{marginTop: normalize(10)}}>
                  <Text style={[CommonStyles.text_11_bold]}>Phone Number</Text>
                  {isEditScreen &&
                  dashboardResponse.parent_details[0].mobile == '' ? (
                    <View
                      style={{
                        marginLeft: 5,
                        marginRight: 5,
                        marginTop: 12,
                        marginBottom: 2,
                      }}>
                      {this.state.mobileNumberError && (
                        <Text style={styles.errorMessage}>
                          Please enter a valid mobile number
                        </Text>
                      )}
                      <TextInput
                        ref={input => {
                          this.email_id_input = input;
                        }}
                        placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                        keyboardType="number-pad"
                        style={styles.textInputBordered}
                        autoCapitalize="none"
                        onChangeText={text => this.onMobileNumberChanged(text)}
                        value={this.state.mUserMobileNumber}
                        blurOnSubmit={false}
                      />
                    </View>
                  ) : (
                    <Text
                      style={[
                        CommonStyles.text_14_Regular,
                        {
                          color: COLOR.TEXT_ALPHA_GREY,
                          marginTop: normalize(8),
                        },
                      ]}>
                      {dashboardResponse.parent_details[0].mobile == ''
                        ? '- - - - - - - - -'
                        : dashboardResponse.parent_details[0].mobile}
                    </Text>
                  )}
                </View>
              </>
            )}

            {isEditScreen && (
              <View style={{marginTop: normalize(20)}}>
                <CustomGradientButton
                  myRef={input => {
                    this.btn_pay_now = input;
                  }}
                  style={{
                    paddingTop: normalize(10),
                    paddingBottom: normalize(10),
                    alignItems: 'center',
                  }}
                  children={'Update'}
                  onPress={this.onUpdateProfile}
                />
              </View>
            )}

            {/* <View style={{ marginTop: normalize(32) }}>
                            <Text style={[CommonStyles.text_11_bold]}>Pincode</Text>
                            <View style={{ flexDirection: 'row', marginTop: normalize(8) }}>
                                <View style={[CommonStyles.circleRoundBlack]} />
                                <View style={[CommonStyles.circleRoundBlack, { marginStart: normalize(16) }]} />
                                <View style={[CommonStyles.circleRoundBlack, { marginStart: normalize(16) }]} />
                                <View style={[CommonStyles.circleRoundBlack, { marginStart: normalize(16) }]} />

                            </View>
                        </View> */}
          </View>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            start: 0,
            end: 0,
            marginBottom: 50,
          }}>
          <TouchableOpacity onPress={this.onClickDeleteAccount}>
            <Text
              style={[
                CommonStyles.text_14_bold,
                {color: COLOR.ORANGE, textAlign: 'center'},
              ]}>
              Delete Account
            </Text>
          </TouchableOpacity>
          {/* <CustomGradientButton
                                myRef={(input) => { this.btn_pay_now = input; }}
                                style={{ paddingTop: normalize(10), paddingBottom: normalize(10), alignItems: 'center' }}
                                children={"Delete Account"}
                                onPress={this.onClickDeleteAccount}

                            /> */}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state.authenticate,
    dashboardStatus: state.dashboard.dashboard_status,
    dashboardResponse: state.dashboard.dashboard_response,
    updateProfileStatus: state.dashboard.update_profile_status,
    updateProfileResponse: state.dashboard.update_profile_response,
    loading: state.authenticate.loading,
    currentSelectedKid: state.dashboard.current_selected_kid,
  };
};

const mapDispatchToProps = {
  updateParentProfile,
  getDashboardItems,
  deleteUserAccount,
  logOutUser,
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
  textInputBordered: {
    textAlign: 'left',
    padding: 20,
    alignSelf: 'stretch',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLOR.BORDER_COLOR_GREEN,
    backgroundColor: COLOR.WHITE,
  },
  errorMessage: {
    color: COLOR.RED,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MoreProfileScreen);
