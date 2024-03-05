import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {COLOR, CommonStyles} from '../config/styles';
import {CheckBox} from 'react-native-elements';
import {normalize} from '../components/helpers';
import {registerParent, pre_update_email} from '../actions/authenticate';
import {updateDeviceInfo} from '../actions/dashboard';
import {showMessage, hideMessage} from 'react-native-flash-message';
import CustomGradientButton from '../components/CustomGradientButton';
import * as Constants from '../components/helpers/Constants';
import {isValidEmail, allowOnlyAlphabets} from '../components/helpers';
import {storeLocalData} from '../components/helpers/AsyncMethods';
import {CustomBackButton} from '../components';
import {BackHandler} from 'react-native';
import {getParamNavigationV5} from '../components/helpers/navigationV5Data';

let parent_id = 0;

class ParentProfile extends Component {
  constructor() {
    super();
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      pinCode: [],
      confirmPinCode: [],
      emailAlertsCheck: true,
      isEmailEditable: true,
      mUserEmail: '',
      mUserName: '',
      mUserLastName: '',
      mUserTimeZone: '',
      emailError: false,
      mobileNumberError: false,
      fullNameError: false,
      lastNameError: false,
      pinCodeError: false,
      confirmPinCodeError: false,
      pinCodeMatchError: false,
      isGoogleLogin: false,
      myNumber: '',
    };

    this.onEmailAlertsPress = this.onEmailAlertsPress.bind(this);
    this.onPressSubmit = this.onPressSubmit.bind(this);
  }

  pinCodeTextInput = [];
  confirmPinCodeTextInput = [];

  componentWillMount() {
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

  componentDidMount() {
    const propParentMobile = getParamNavigationV5(
      this.props,
      'parentNumber',
      '',
    );

    const propParentEmail = getParamNavigationV5(this.props, 'parentEmail', '');
    const propParentFirstName = getParamNavigationV5(
      this.props,
      'parentFirstName',
      '',
    );
    const propParentLastName = getParamNavigationV5(
      this.props,
      'parentLastName',
      '',
    );
    const propParentTimeZone = getParamNavigationV5(
      this.props,
      'parentTimeZone',
      '',
    );

    console.log({
      propParentEmail,
      propParentMobile,
      propParentFirstName,
      propParentLastName,
      propParentTimeZone,
    });

    this.setState({
      myNumber: propParentMobile,
      mUserName: propParentFirstName,
      mUserLastName: propParentLastName,
      mUserEmail: propParentEmail,
      mUserTimeZone: propParentTimeZone,
      isEmailEditable: propParentEmail == '',
    });
    if (propParentMobile == '' || propParentMobile == null) {
      this.setState({
        isGoogleLogin: true,
      });
    }
  }

  onFocusIn = inputRef => {
    inputRef.setNativeProps({
      borderColor: COLOR.LIGHT_BORDER_GREEN,
    });
  };

  onFocusOut = inputRef => {
    inputRef.setNativeProps({
      borderColor: COLOR.LIGHT_BORDER_COLOR,
    });
  };

  goToAddKids = parent_id => {
    this.props.navigation.navigate(Constants.AddKidDetail, {
      user_id: parent_id,
      isFrom: Constants.ExistingUser,
    });
  };

  updateDeviceToken = () => {};
  componentDidUpdate(prevProps) {
    if (prevProps.submit_parent_status != this.props.submit_parent_status) {
      if (this.props.submit_parent_status == null) return;
      if (this.props.submit_parent_status) {
        const response = this.props.submit_parent_response;
        storeLocalData(Constants.IsParentRegistered, true);
        storeLocalData(Constants.ParentUserId, response.user_id);
        storeLocalData(Constants.ParentEmail, response.email);
        storeLocalData(Constants.ParentFirstName, response.first_name);
        storeLocalData(Constants.ParentLastName, response.last_name);
        storeLocalData(Constants.ParentMobileNumber, response.mobile);

        this.props.updateDeviceInfo(
          response.user_id,
          Date.now().toString(),
          '',
          Platform.OS,
        );
        this.props.navigation.navigate(Constants.AddKidDetail, {
          fromParent: true,
        });
      } else {
        console.log(
          'Parent submission failed',
          this.props.submit_parent_response,
        );
        showMessage({
          message: this.props.submit_parent_response.message,
          type: 'danger',
        });
      }
    }
  }

  focusPreviousConfirmCode(key, index) {
    if (key === 'Backspace' && index !== 0)
      this.confirmPinCodeTextInput[index - 1].focus();
  }
  focusNextConfirmCode(index, value) {
    if (index < this.confirmPinCodeTextInput.length - 1 && value) {
      this.confirmPinCodeTextInput[index + 1].focus();
    }
    if (index === this.confirmPinCodeTextInput.length - 1) {
      this.confirmPinCodeTextInput[index].blur();
    }
    const confirmCode = this.state.confirmPinCode;
    confirmCode[index] = value;
    this.setState({confirmCode});
    // this.props.getOtp(otp.join(''));
  }

  focusPrevious(key, index) {
    if (key === 'Backspace' && index !== 0)
      this.pinCodeTextInput[index - 1].focus();
  }
  focusNext(index, value) {
    if (index < this.pinCodeTextInput.length - 1 && value) {
      this.pinCodeTextInput[index + 1].focus();
    }
    if (index === this.pinCodeTextInput.length - 1) {
      this.pinCodeTextInput[index].blur();
    }
    const pinCode = this.state.pinCode;
    pinCode[index] = value;
    this.setState({pinCode});
    // this.props.getOtp(otp.join(''));
  }

  onFocus() {
    this.setState({
      backgroundColor: 'green',
    });
  }

  onBlur() {
    this.setState({
      backgroundColor: '#ededed',
    });
  }

  renderPinCodeInput() {
    const inputs = Array(4).fill(0);
    const txt = inputs.map((i, j) => (
      <View key={j} style={{flex: 1, marginLeft: 2, marginRight: 2}}>
        <TextInput
          ref={ref => (this.pinCodeTextInput[j] = ref)}
          placeholderTextColor={COLOR.TEXT_COLOR_HINT}
          keyboardType="numeric"
          secureTextEntry={true}
          style={styles.pinCodeBordered}
          onChangeText={v => this.focusNext(j, v)}
          onKeyPress={e => this.focusPrevious(e.nativeEvent.key, j)}
          blurOnSubmit={false}
          maxLength={1} //setting limit of input
        />
      </View>
    ));
    return txt;
  }

  renderConfirmPinCodeInput() {
    const inputs = Array(4).fill(0);
    const txt = inputs.map((i, j) => (
      <View key={j} style={{flex: 1, marginLeft: 2, marginRight: 2}}>
        <TextInput
          ref={ref => (this.confirmPinCodeTextInput[j] = ref)}
          placeholderTextColor={COLOR.TEXT_COLOR_HINT}
          keyboardType="numeric"
          secureTextEntry={true}
          style={styles.pinCodeBordered}
          onChangeText={v => this.focusNextConfirmCode(j, v)}
          onKeyPress={e => this.focusPreviousConfirmCode(e.nativeEvent.key, j)}
          blurOnSubmit={false}
          maxLength={1} //setting limit of input
        />
      </View>
    ));
    return txt;
  }

  onEmailAlertsPress = () => {
    this.setState({
      emailAlertsCheck: !this.state.emailAlertsCheck,
    });
  };
  onPressSubmit = () => {
    const {mUserEmail, mUserName, mUserLastName, myNumber} = this.state;
    // this.props.navigation.navigate('AddKidDetail',{
    //     user_id : "50115"
    //  });
    //  return;

    let isValidationSuccess = true;
    if (this.state.isGoogleLogin) {
      if (this.state.myNumber !== '') {
        this.setState({
          mobileNumberError: false,
        });
      } else {
        this.setState({
          mobileNumberError: true,
        });
        isValidationSuccess = false;
      }
    }

    if (isValidEmail(this.state.mUserEmail)) {
      console.debug('Email Vlid');
      this.setState({
        emailError: false,
      });
    } else {
      console.debug('Email Invalid');
      this.setState({
        emailError: true,
      });
      isValidationSuccess = false;
    }

    if (this.state.mUserName == '') {
      this.setState({
        fullNameError: true,
      });
      isValidationSuccess = false;
    } else {
      this.setState({
        fullNameError: false,
      });
    }

    if (this.state.mUserLastName == '') {
      this.setState({
        lastNameError: true,
      });
      isValidationSuccess = false;
    } else {
      this.setState({
        lastNameError: false,
      });
    }

    if (isValidationSuccess) {
      //this.props.navigation.navigate('AddKidDetail');
      this.props.pre_update_email(
        parent_id,
        mUserEmail,
        mUserName,
        mUserLastName,
        myNumber,
      );
    }
  };

  addUserName = value => {
    if (!allowOnlyAlphabets(value)) return;
    this.setState({
      mUserName: value,
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
    this.setState({myNumber: newText});
  }

  addUserLastName = value => {
    if (!allowOnlyAlphabets(value)) return;
    this.setState({
      mUserLastName: value,
    });
  };

  onFocusIn = inputRef => {
    inputRef.setNativeProps({
      borderColor: COLOR.LIGHT_BORDER_GREEN,
    });
  };

  onFocusOut = inputRef => {
    inputRef.setNativeProps({
      borderColor: COLOR.LIGHT_BORDER_COLOR,
    });
  };

  onPressBack = () => {
    const {goBack} = this.props.navigation;

    goBack();
  };

  render() {
    const {loading} = this.props;

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        style={{backgroundColor: COLOR.WHITE}}>
        <View style={{margin: 10, padding: 10}}>
          <CustomBackButton onPress={this.onPressBack} />
        </View>

        <View
          style={{
            backgroundColor: COLOR.WHITE,
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text style={[CommonStyles.text_16_semi_bold, styles.textHeader]}>
            Parent Profile
          </Text>

          {loading && (
            <ActivityIndicator
              size="large"
              color="black"
              style={CommonStyles.activityIndicatorStyle}
            />
          )}

          <View
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginTop: 2,
              marginBottom: 2,
            }}>
            <Text style={styles.textSubHeader}>Email Id</Text>
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
              editable={this.state.isEmailEditable}
              returnKeyType="next"
              autoCapitalize="none"
              onFocus={() => this.onFocusIn(this.email_id_input)}
              onBlur={() => this.onFocusOut(this.email_id_input)}
              onSubmitEditing={() => {
                this.first_name_input.focus();
              }}
              onChangeText={text => this.setState({mUserEmail: text})}
              value={this.state.mUserEmail}
              blurOnSubmit={false}
              //setting limit of input
            />
          </View>

          {this.state.isGoogleLogin && (
            <View
              style={{
                marginLeft: 20,
                marginRight: 20,
                marginTop: 2,
                marginBottom: 2,
              }}>
              <Text style={styles.textSubHeader}>Mobile Number</Text>
              {this.state.mobileNumberError && (
                <Text style={styles.errorMessage}>
                  Please enter a valid mobile number
                </Text>
              )}
              <TextInput
                ref={input => {
                  this.mobile_number_input = input;
                }}
                placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                keyboardType="number-pad"
                style={styles.textInputBordered}
                autoCapitalize="none"
                returnKeyType="next"
                onFocus={() => this.onFocusIn(this.mobile_number_input)}
                onBlur={() => this.onFocusOut(this.mobile_number_input)}
                onSubmitEditing={() => {
                  this.first_name_input.focus();
                }}
                onChangeText={text => this.onMobileNumberChanged(text)}
                value={this.state.myNumber}
                blurOnSubmit={false}
                //setting limit of input
              />
            </View>
          )}

          <View
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginTop: 10,
              marginBottom: 2,
            }}>
            <Text style={styles.textSubHeader}>First Name</Text>
            {this.state.fullNameError && (
              <Text style={styles.errorMessage}>Please enter a valid name</Text>
            )}
            <TextInput
              ref={input => {
                this.first_name_input = input;
              }}
              placeholderTextColor={COLOR.TEXT_COLOR_HINT}
              returnKeyType="next"
              style={styles.textInputBordered}
              onFocus={() => this.onFocusIn(this.first_name_input)}
              onBlur={() => this.onFocusOut(this.first_name_input)}
              onSubmitEditing={() => {
                this.last_name_input.focus();
              }}
              onChangeText={this.addUserName.bind(this)}
              value={this.state.mUserName}
              blurOnSubmit={false}
            />
          </View>
          <View
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginTop: 10,
              marginBottom: 2,
            }}>
            <Text style={styles.textSubHeader}>Last Name</Text>
            {this.state.fullNameError && (
              <Text style={styles.errorMessage}>Please enter a valid name</Text>
            )}
            <TextInput
              ref={input => {
                this.last_name_input = input;
              }}
              placeholderTextColor={COLOR.TEXT_COLOR_HINT}
              returnKeyType="done"
              onFocus={() => this.onFocusIn(this.last_name_input)}
              onBlur={() => this.onFocusOut(this.last_name_input)}
              style={styles.textInputBordered}
              onChangeText={this.addUserLastName.bind(this)}
              value={this.state.mUserLastName}
              blurOnSubmit={false}
            />
          </View>

          <View style={{marginBottom: 15, marginTop: normalize(20)}}>
            <CustomGradientButton
              style={styles.submitButton}
              children="Proceed to Add Kids"
              onPress={this.onPressSubmit}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.authenticate);
  return {
    state: state.authenticate,
    loading: state.authenticate.loading,
    submit_parent_status: state.authenticate.submit_parent_status,
    submit_parent_response: state.authenticate.submit_parent_response,
  };
};

const mapDispatchToProps = {
  registerParent,
  pre_update_email,
  updateDeviceInfo,
};
const styles = StyleSheet.create({
  textHeader: {
    textAlign: 'center',
    marginTop: 1,
    marginBottom: 15,
    marginStart: 0,
    color: COLOR.TEXT_COLOR_BLUE,
  },
  textSubHeader: {
    fontSize: 12,
    textAlign: 'left',
    margin: 5,
    color: COLOR.TEXT_COLOR_BLACK,
    fontFamily: 'Montserrat-SemiBold',
  },
  textSubFooter: {
    fontSize: 12,
    textAlign: 'left',
    margin: 5,
    color: COLOR.TEXT_COLOR_BLACK,
    fontFamily: 'Montserrat-Regular',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: COLOR.WHITE,
  },
  pinCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  textInputBordered: {
    textAlign: 'left',
    padding: 20,
    alignSelf: 'stretch',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLOR.LIGHT_BORDER_COLOR,
    backgroundColor: COLOR.WHITE,
  },

  pinCodeBordered: {
    textAlign: 'center',
    padding: 10,
    width: '100%',
    fontSize: 15,
    marginTop: 5,
    alignSelf: 'stretch',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLOR.BORDER_COLOR_GREEN,
    backgroundColor: COLOR.WHITE,
  },
  checkBoxStyle: {
    backgroundColor: COLOR.WHITE,
    marginStart: 10,
    marginEnd: 10,
    marginTop: 10,
    marginBottom: 2,
    borderRadius: 0,
    borderRightWidth: 0,
  },
  submitButton: {
    alignItems: 'center',
    marginStart: 20,
    marginEnd: 20,
    marginTop: 20,
    paddingTop: 15,
    fontFamily: 'Montserrat-Regular',
    paddingBottom: 15,
  },
  errorMessage: {
    color: COLOR.RED,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ParentProfile);
