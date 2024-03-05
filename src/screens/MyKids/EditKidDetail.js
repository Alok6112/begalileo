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
  Pressable,
} from 'react-native';
import {connect} from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import {COLOR, CommonStyles} from '../../config/styles';
import {IC_DOWN_ENTER} from '../../assets/images';
import CustomGradientButton from '../../components/CustomGradientButton';
import {getLocalData} from '../../components/helpers/AsyncMethods';
import Icon from 'react-native-vector-icons/FontAwesome';
import {normalize, Card} from 'react-native-elements';
import ModalSelector from 'react-native-modal-selector';
import RadioForm, {RadioButton} from 'react-native-simple-radio-button';
import {allowOnlyAlphabets, isValidDate} from '../../components/helpers';
import {
  getGradeDatas,
  deleteStudent,
  editStudent,
} from '../../actions/authenticate';
import {CommonActions} from '@react-navigation/native';
import {DatePickerDialog} from 'react-native-datepicker-dialog';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import moment from 'moment';
import {
  getMaxDateForChildDOB,
  getMinDateForChildDOB,
} from '../../UTILS/CommonUtils';
import {CustomBackButton} from '../../components';
import {getParamNavigationV5} from '../../components/helpers/navigationV5Data';

const options = {
  title: 'Select Avatar',
  multiple: false,
  maxWidth: 300,
  maxHeight: 300,
  quality: 0.5,
  customButtons: [{name: 'fb', title: 'Choose Photo from Gallery'}],
  cropping: true,
  includeBase64: true,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
class EditKidDetail extends Component {
  constructor(props) {
    super(props);
    this.boardSelector = React.createRef();
    this.state = {
      kidDetails: null,
      mChildName: null,
      mChildLastName: null,
      avatarSource: null,
      mBirthDate: null,
      mBirthDay: null,
      mBirthdMonth: null,
      mBirthYear: null,
      mBirthDateDialog: false,
      mKidTimeZone: null,
      mKidGender: 'M',
      mChildGrade: null,
      mChildBoard: null,
      mChildNameError: null,
      mChildBirthDateError: null,
      mChildGenderError: null,
      mChildGradeError: null,
      mChildBoardError: null,
      totalKids: 0,
    };
  }

  componentDidMount() {
    var kidDetail = getParamNavigationV5(this.props, 'editKidItem', null);
    var totalKidLen = getParamNavigationV5(this.props, 'totalKids', 0);
    this.props.getGradeDatas();
    this.setState({
      kidDetails: kidDetail,
      mChildName: kidDetail.first_name,
      mChildLastName: kidDetail.last_name,
      mChildGrade: kidDetail.grade,
      mChildBoard: kidDetail.board,
      selectedDateText: kidDetail.dob,
      mBirthDate: kidDetail.dob,
      mKidGender: kidDetail.gender,
      totalKids: totalKidLen,
    });
    this.onGenderChange(kidDetail.gender);

    getLocalData(Constants.ParentTimeZone).then(timeZone => {
      this.setState({
        mKidTimeZone: JSON.parse(timeZone),
      });
    });
    console.log(kidDetail);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.edit_student_status != this.props.edit_student_status) {
      if (this.props.edit_student_status) {
        this.goBackToHome();
      }
    }

    if (prevProps.delete_student_status != this.props.delete_student_status) {
      console.log('Props delete students');
      if (this.props.delete_student_status) {
        this.goBackToHome();
      }
    }
  }

  goBackToHome = () => {
    const navigateAction = CommonActions.reset({
      index: 0,
      routes: [{name: Constants.MainScreen}],
    });

    this.props.navigation.dispatch(navigateAction);
  };

  onDOBDatePicked = date => {
    //Here you will get the selected date

    this.setState({
      dobDate: date,
      selectedDateText: moment(date).format('DD-MMM-YYYY'),
      mBirthDate: moment(date).format('YYYY-MM-DD'),
    });
    this.closeDatePicker();
  };

  closeDatePicker = () => {
    this.setState({
      mBirthDateDialog: false,
    });
  };

  addUserName = value => {
    if (!allowOnlyAlphabets(value)) return;
    this.setState({
      mChildName: value,
    });
  };
  onGradeChange = option => {
    if (this.state.kidDetails.account_type == 'paid') {
    }
    this.setState({
      mChildGrade: option.label,
    });
  };

  onGenderChange = value => {
    console.log('Gender Change value ' + value);
    if (value)
      this.setState({
        mKidGender: 'F',
      });
    else
      this.setState({
        mKidGender: 'M',
      });
  };

  onBoardChange = option => {
    this.setState({
      mChildBoard: option.label,
    });
  };

  gradeDataList = () => {
    var gradeData = [];

    if (this.props.gradeResponse !== undefined) {
      var grades = this.props.gradeResponse.grades;

      if (grades !== undefined) {
        grades.map(grade => {
          var gradeItem = {
            key: grade.id,
            label: grade.name,
          };
          gradeData.push(gradeItem);
        });
      }
    }

    return gradeData;
  };

  boardListData = () => {
    const boardData = [];

    if (this.props.gradeResponse !== undefined) {
      var boards = this.props.gradeResponse.boards;
      if (boards !== undefined) {
        boards.map(board => {
          var boardItem = {
            key: board.id,
            label: board.name,
          };
          boardData.push(boardItem);
        });
      }
    }

    return boardData;
  };

  onChooseImageClick = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.assets[0].uri};

        this.setState({
          avatarSource: source,
        });
      }
    });
  };

  addUserLastName = value => {
    if (!allowOnlyAlphabets(value)) return;
    this.setState({
      mChildLastName: value,
    });
  };

  onClickDeleteStudent = () => {
    Alert.alert(
      'Are you sure want remove ' + this.state.mChildName,
      '',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => this.onDeleteConfirmed()},
      ],
      {cancelable: false},
    );
  };

  onDeleteConfirmed = () => {
    console.log('Delete Confirmed ' + this.state.kidDetails.student_id);
    this.props.deleteStudent(this.state.kidDetails.student_id);
  };

  onClickSaveDetails = () => {
    let isValidationSuccess = true;
    if (this.state.mChildName == null) {
      this.setState({
        mChildNameError: true,
      });
      isValidationSuccess = false;
    }
    if (this.state.mChildLastName == null) {
      this.setState({
        mChildNameError: true,
      });
      isValidationSuccess = false;
    } else {
      this.setState({
        mChildNameError: false,
      });
    }

    if (this.state.mBirthDate == null) {
      this.setState({
        mChildBirthDateError: true,
      });
      isValidationSuccess = false;
    } else {
      this.setState({
        mChildBirthDateError: false,
      });
    }
    if (this.state.mChildGrade == null) {
      this.setState({
        mChildGradeError: true,
      });
      isValidationSuccess = false;
    } else {
      this.setState({
        mChildGradeError: false,
      });
    }
    if (this.state.mChildBoard == null) {
      this.setState({
        mChildBoardError: true,
      });
      isValidationSuccess = false;
    } else {
      this.setState({
        mChildBoardError: false,
      });
    }
    if (isValidationSuccess) {
      var kidDetail = {
        name: this.state.mChildName,
        last_name: this.state.mChildLastName,
        grade: this.state.mChildGrade,
        board: this.state.mChildBoard,
        dob: this.state.mBirthDate,
        gender: this.state.mKidGender,
        avatar: this.state.avatarSource,
        timeZone: this.state.mKidTimeZone,
      };
      this.setState({
        mChildName: null,
        mChildLastName: null,
        avatarSource: null,
        mBirthDay: null,
        mBirthdMonth: null,
        mBirthYear: null,
        mKidGender: 'M',
        mChildGrade: null,
        mChildBoard: null,
        mChildNameError: null,
        mChildBirthDateError: null,
        mChildGenderError: null,
        mChildGradeError: null,
        mChildBoardError: null,
      });

      //  console.log(kidDetail);

      this.uploadKidDetailToServer(kidDetail);
    } else {
    }
  };

  uploadKidDetailToServer = kidData => {
    this.setState({
      submitStudentSuccess: false,
    });
    console.log(kidData.avatar);

    this.props.editStudent(
      this.state.kidDetails.student_id,
      kidData.name,
      kidData.last_name,
      kidData.dob,
      kidData.grade,
      kidData.board,
      kidData.gender,
      kidData.avatar,
      kidData.timeZone,
    );
  };

  showDatePicker = () => {
    // let tommorow = moment(new Date).add(1, 'day')
    var maxDateValue = new Date();
    var pastYear = maxDateValue.getFullYear() - 1;
    maxDateValue.setFullYear(pastYear);

    this.setState({
      mBirthDateDialog: true,
    });
  };

  showBoardSelector = () => {
    this.boardSelector.current.open();
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
    var radio_props = [
      {label: 'Male', value: 0},
      {label: 'Female', value: 1},
    ];
    const {loading} = this.props;
    const {kidDetails, avatarSource, mBirthDateDialog} = this.state;

    return (
      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
            backgroundColor: COLOR.WHITE,
          }}>
          <View style={{marginStart: 20}}>
            <CustomBackButton onPress={this.onPressBack} />
          </View>
          {loading && (
            <ActivityIndicator
              size="large"
              color="black"
              style={CommonStyles.activityIndicatorStyle}
            />
          )}
          {kidDetails && (
            <View style={{justifyContent: 'center'}}>
              <View
                style={{
                  marginTop: 1,
                  marginStart: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={styles.textHeader}>{kidDetails.name}</Text>
                {/* {
                                        allKidsList && allKidsList.length ?
                                            <View style={{ alignSelf: 'center', marginEnd: 20 }}>
                                                <Icon
                                                    onPress={() => {
                                                        this.setState({
                                                            showAddkidForm: false
                                                        })
                                                    }}
                                                    size={20}
                                                    name='times'
                                                    color={COLOR.BLUE_LINk} />
                                            </View>
                                            : <View></View>
                                    } */}
              </View>

              <View style={{justifyContent: 'center', marginTop: 5}}>
                <View style={{alignSelf: 'center'}}>
                  {avatarSource ? (
                    <Image
                      style={{
                        borderRadius: 100,
                        height: 120,
                        width: 120,
                        resizeMode: 'stretch',
                      }}
                      source={avatarSource}
                    />
                  ) : (
                    <Image
                      style={{
                        borderRadius: 100,
                        height: 120,
                        width: 120,
                        resizeMode: 'stretch',
                      }}
                      source={{uri: kidDetails.photo}}
                    />
                  )}

                  <View style={styles.edit_profile_icon}>
                    <Icon
                      onPress={this.onChooseImageClick}
                      size={20}
                      name="edit"
                      color={COLOR.WHITE}
                    />
                  </View>
                </View>
              </View>

              <DateTimePickerModal
                isVisible={mBirthDateDialog}
                mode="date"
                minimumDate={getMinDateForChildDOB()}
                maximumDate={getMaxDateForChildDOB()}
                onConfirm={this.onDOBDatePicked}
                onCancel={this.closeDatePicker}
              />
              <View
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 2,
                  marginBottom: 2,
                }}>
                <Text style={styles.textSubHeader}>First name</Text>
                {this.state.mChildNameError && (
                  <Text style={styles.errorMessage}>
                    Please enter a valid name
                  </Text>
                )}
                <TextInput
                  ref={input => {
                    this.child_first_name_input = input;
                  }}
                  placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                  placeholder="First Name"
                  keyboardType="default"
                  style={styles.nametextInputBordered}
                  onChangeText={this.addUserName.bind(this)}
                  onFocus={() => this.onFocusIn(this.child_first_name_input)}
                  onBlur={() => this.onFocusOut(this.child_first_name_input)}
                  value={this.state.mChildName}
                  blurOnSubmit={false}
                />
              </View>
              <View
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 2,
                  marginBottom: 2,
                }}>
                <Text style={styles.textSubHeader}>Last name</Text>
                {this.state.mChildNameError && (
                  <Text style={styles.errorMessage}>
                    Please enter a valid name
                  </Text>
                )}
                <TextInput
                  ref={input => {
                    this.child_last_name_input = input;
                  }}
                  placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                  placeholder="Last Name"
                  keyboardType="default"
                  style={styles.nametextInputBordered}
                  onChangeText={this.addUserLastName.bind(this)}
                  value={this.state.mChildLastName}
                  onFocus={() => this.onFocusIn(this.child_last_name_input)}
                  onBlur={() => this.onFocusOut(this.child_last_name_input)}
                  blurOnSubmit={false}
                />
              </View>

              <View
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 2,
                  marginBottom: 2,
                }}>
                <Text style={styles.textSubHeader}>Birth Date</Text>
                {this.state.mChildBirthDateError && (
                  <Text style={styles.errorMessage}>
                    Please enter a valid Date
                  </Text>
                )}
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    borderColor: COLOR.BORDER_COLOR_GREY,
                    borderWidth: 2,
                    borderRadius: 15,
                    margin: 5,
                  }}
                  onPress={this.showDatePicker}>
                  <View style={{flexDirection: 'row', margin: 20}}>
                    <Text
                      style={[
                        CommonStyles.text_14_semi_bold,
                        {
                          alignSelf: 'center',
                          marginStart: 5,
                          color: COLOR.TEXT_ALPHA_GREY,
                          fontFamily: Constants.Montserrat_Regular,
                        },
                      ]}>
                      {this.state.selectedDateText == ''
                        ? 'Choose birth date'
                        : this.state.selectedDateText}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      marginEnd: 15,
                    }}>
                    <Image
                      style={{
                        height: 15,
                        width: 15,
                        alignSelf: 'flex-end',
                        marginRight: 20,
                      }}
                      source={IC_DOWN_ENTER}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity>
              </View>

              {/* <View style={{ marginLeft: 20, marginRight: 20, marginTop: 2, marginBottom: 2 }}>
                                    <Text style={styles.textSubHeader}>Birth Date</Text>
                                    {this.state.mChildBirthDateError && <Text style={styles.errorMessage}>Please enter a valid Date</Text>}
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                        <TextInput
                                            ref={(input) => { this.child_name_input = input; }}
                                            placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                                            keyboardType='number-pad'
                                            placeholder="Day"
                                            style={styles.dateInputBordered}
                                            onChangeText={(text) => this.setState({ mBirthDay: text })}
                                            value={this.state.mBirthDay} r
                                            blurOnSubmit={false}
                                        />
                                        <Text style={{ alignSelf: 'center', margin: 10 }}>-</Text>
                                        <TextInput
                                            ref={(input) => { this.child_name_input = input; }}
                                            placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                                            keyboardType='number-pad'
                                            placeholder="Month"
                                            style={styles.dateInputBordered}
                                            onChangeText={(text) => this.setState({ mBirthdMonth: text })}
                                            value={this.state.mBirthdMonth}
                                            blurOnSubmit={false}
                                        />
                                        <Text style={{ alignSelf: 'center', margin: 10 }}>-</Text>
                                        <TextInput
                                            ref={(input) => { this.child_name_input = input; }}
                                            placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                                            keyboardType='number-pad'
                                            placeholder="Year"
                                            style={styles.dateInputBordered}
                                            onChangeText={(text) => this.setState({ mBirthYear: text })}
                                            value={this.state.mBirthYear}
                                            blurOnSubmit={false}
                                        />
                                    </View>

                                </View> */}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 2,
                  marginBottom: 2,
                }}>
                <View style={{flex: 1, alignSelf: 'stretch', marginEnd: 5}}>
                  <Text style={styles.textSubHeader}>Grade</Text>
                  {this.state.mChildGradeError && (
                    <Text style={styles.errorMessage}>select Grade</Text>
                  )}
                  <View style={styles.modalListContainer}>
                    <ModalSelector
                      initValue="Select Grade"
                      style={{flex: 1}}
                      selectStyle={{
                        backgroundColor: 'white',
                        borderColor: 'white',
                      }}
                      data={this.gradeDataList()}
                      ref={selector => {
                        this.gradeSelector = selector;
                      }}
                      onChange={option => {
                        this.onGradeChange(option);
                      }}>
                      <Text
                        style={[
                          CommonStyles.text_14_semi_bold,
                          {
                            margin: 5,
                            fontSize: 12,
                            padding: 10,
                            color: COLOR.TEXT_ALPHA_GREY,
                          },
                        ]}>
                        {this.state.mChildGrade == null
                          ? 'Select Grade'
                          : this.state.mChildGrade}
                      </Text>
                    </ModalSelector>

                    <Image
                      style={{
                        height: 15,
                        width: 15,
                        alignSelf: 'center',
                        marginRight: 20,
                      }}
                      source={IC_DOWN_ENTER}
                      resizeMode="contain"
                    />
                  </View>
                </View>

                <View
                  onPress={this.showBoardSelector}
                  style={{flex: 1, alignSelf: 'stretch', marginStart: 5}}>
                  <Text style={styles.textSubHeader}>Curriculum</Text>
                  {this.state.mChildBoardError && (
                    <Text style={styles.errorMessage}>Select Board</Text>
                  )}
                  <View style={styles.modalListContainer}>
                    <ModalSelector
                      initValue="Select Board"
                      style={{flex: 1}}
                      selectStyle={{
                        backgroundColor: 'white',
                        borderColor: 'white',
                      }}
                      data={this.boardListData()}
                      ref={selector => {
                        this.boardSelector = selector;
                      }}
                      onChange={option => {
                        this.onBoardChange(option);
                      }}>
                      <Text
                        style={[
                          CommonStyles.text_14_semi_bold,
                          {
                            margin: 5,
                            fontSize: 12,
                            padding: 10,
                            color: COLOR.TEXT_ALPHA_GREY,
                          },
                        ]}>
                        {this.state.mChildBoard == null
                          ? 'Select Board'
                          : this.state.mChildBoard}
                      </Text>
                    </ModalSelector>

                    <Image
                      style={{
                        height: 15,
                        width: 15,
                        alignSelf: 'center',
                        marginRight: 20,
                      }}
                      source={IC_DOWN_ENTER}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 5,
                  marginBottom: 5,
                }}>
                <Text style={styles.textSubHeader}>Gender</Text>
                {this.state.mChildGenderError && (
                  <Text style={styles.errorMessage}>Please select gender</Text>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    marginStart: 30,
                    marginTop: 10,
                  }}>
                  <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    formHorizontal={true}
                    labelHorizontal={true}
                    buttonColor={COLOR.BORDER_COLOR_GREEN}
                    selectedButtonColor={COLOR.BORDER_COLOR_GREEN}
                    animation={true}
                    labelStyle={{
                      fontSize: 15,
                      color: COLOR.TEXT_COLOR_BLACK,
                      marginEnd: 30,
                      fontFamily: 'Montserrat-Regular',
                    }}
                    onPress={value => {
                      this.onGenderChange(value);
                      //this.setState({ value: value })
                    }}
                  />
                </View>
              </View>

              <View>
                <CustomGradientButton
                  myRef={input => {
                    this.btn_edit_student = input;
                  }}
                  style={styles.addKidButton}
                  children="Save Details"
                  onPress={this.onClickSaveDetails}
                />

                {this.state.totalKids > 1 && (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: 20,
                    }}>
                    <Text
                      onPress={() => this.onClickDeleteStudent(false)}
                      style={{
                        color: COLOR.TEXT_COLOR_GREEN,
                        fontSize: 15,
                        marginStart: 10,
                        padding: 15,
                        fontFamily: 'Montserrat-Regular',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}>
                      Remove Child
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state.authenticate,
    loading: state.authenticate.loading,
    gradeResponse: state.authenticate.response,
    delete_student_status: state.authenticate.delete_student_status,
    delete_student_response: state.authenticate.delete_student_response,
    edit_student_status: state.authenticate.edit_student_status,
    edit_student_response: state.authenticate.edit_student_response,
  };
};

const mapDispatchToProps = {
  getGradeDatas,
  deleteStudent,
  editStudent,
};

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 16,
    textAlign: 'left',
    marginTop: 15,
    marginBottom: 5,
    marginStart: 20,
    color: COLOR.TEXT_COLOR_BLUE,
    fontFamily: 'Montserrat-SemiBold',
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
  textInputBordered: {
    textAlign: 'center',
    width: '100%',
    padding: 8,
    alignSelf: 'stretch',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLOR.BORDER_COLOR_GREEN,
    backgroundColor: COLOR.WHITE,
  },
  nametextInputBordered: {
    justifyContent: 'flex-start',
    width: '100%',
    padding: 16,
    alignSelf: 'stretch',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLOR.BORDER_COLOR_GREY,
    backgroundColor: COLOR.WHITE,
  },
  dropDownBordered: {
    textAlign: 'center',
    width: '100%',
    alignSelf: 'stretch',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLOR.BORDER_COLOR_GREEN,
    backgroundColor: COLOR.WHITE,
  },
  footerButton: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  dateInputBordered: {
    flex: 1,
    textAlign: 'center',
    padding: 10,
    alignSelf: 'stretch',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLOR.BORDER_COLOR_GREEN,
    backgroundColor: COLOR.WHITE,
  },
  submitButton: {
    alignItems: 'center',
    marginStart: 20,
    marginEnd: 20,
    marginTop: 20,
    paddingTop: 12,
    fontFamily: 'Montserrat-Regular',
    paddingBottom: 12,
  },
  modalListContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLOR.BORDER_COLOR_GREY,
    backgroundColor: COLOR.WHITE,
  },
  errorMessage: {
    color: COLOR.RED,
  },
  edit_profile_icon: {
    backgroundColor: '#97DA92',
    borderRadius: 100,
    padding: 10,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },

  addKidButton: {
    alignItems: 'center',
    marginStart: 20,
    marginEnd: 20,
    marginTop: 20,
    paddingTop: 15,

    paddingBottom: 15,
  },
  myKidsListCenter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
  addKidButton: {
    alignItems: 'center',
    marginStart: 20,
    marginEnd: 20,
    marginTop: 20,
    paddingTop: 15,

    paddingBottom: 15,
  },
  myKidsListTop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditKidDetail);
