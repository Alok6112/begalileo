import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  VirtualizedList,
  ActivityIndicator,
  Modal as EModal,
  Dimensions,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import {COLOR, CommonStyles} from '../../config/styles';
import {IC_PROFILE_PIC, IC_BOOK_DEMO_BG} from '../../assets/images';
import Icon from 'react-native-vector-icons/FontAwesome';
import {showMessage, hideMessage} from 'react-native-flash-message';
import CustomGradientButton from '../../components/CustomGradientButton';
import {CustomBackButton} from '../../components';
import {DatePickerDialog} from 'react-native-datepicker-dialog';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Modal from 'react-native-modal';
import {getGradeDatas} from '../../actions/authenticate';
import moment from 'moment';
import {lottie_success} from '../../assets/lottieAssets';
import LottieView from 'lottie-react-native';
import {
  getDemoSlots,
  doBookingDemo,
  doReScheduleDemo,
  registerWithBookDemo,
} from '../../actions/dashboard';
import {normalize} from 'react-native-elements';
import {getLocalData} from '../../components/helpers/AsyncMethods';
import * as Config from '../../config/configs';

import {
  UpdateNameMobileComponent,
  ChooseGridDateComponent,
} from '../../components';
import {getMaxDateFromToday} from '../../components/helpers/CustomUtilMethods';
import {isValidEmail} from '../../components/helpers';
import {Pressable} from 'react-native';

import {CommonActions} from '@react-navigation/native';
import {getParamNavigationV5} from '../../components/helpers/navigationV5Data';

class BookDemoScreenPostOtp extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      currentDate: new Date(),
      showDatePciker: false,
      selectedDateText: 'Choose Date',
      itemPressed: null,
      selectDateError: false,
      selectDateErrorMessage: '',
      currentSelectedDateIndex: 0,
      mBirthDateDialog: false,
      scheduledTime: '',
      timeSlotsList: [],
      mrngTimeSlotList: [],
      afternoonTimeSlotList: [],
      eveningTimeSlotList: [],
      nightTimeSlotList: [],
      allKidsList: [],
      updateMobileNumberDialog: false,
      currentKid: null,
      mUserEmail: '',
      mUserMobileNumber: '',
      emailError: false,
      mChildName: '',
      childNameError: '',
      onSelectedGrade: false,
      selectedGrade: 'Select Grade',
      mobileNumberError: false,
      selectDateError: false,
      childNameError: false,
      fromMobileNumber: false,
      mUserId: 0,
      demoConfirmed: false,
    };
  }

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
    console.log('Component mount book demo post otp');
    this.props.getGradeDatas();

    var isFrom = getParamNavigationV5(this.props, 'from', '');
    var propParentEmail = getParamNavigationV5(this.props, 'parentEmail', '');
    var propParentNumber = getParamNavigationV5(this.props, 'parentNumber', '');
    var propParentId = getParamNavigationV5(this.props, 'parentId', '');

    if (propParentNumber == '') this.setState({fromMobileNumber: false});
    else this.setState({fromMobileNumber: true});

    this.setState({
      mUserEmail: propParentEmail,
      mUserMobileNumber: propParentNumber,
      mUserId: propParentId,
    });
    if (isFrom == 'addKid') {
      var studentParam = getParamNavigationV5(this.props, 'studentData', '');

      console.log('From add Kid', studentParam);
      this.setState({
        currentKid: studentParam,
      });
    } else if (this.props.state.dashboard_status) {
      this.setState({
        allKidsList: this.props.state.dashboard_response.students,
        currentKid: this.props.state.current_selected_kid,
      });
    }
    let todayDate = new Date();

    const reScheduleDemo = getParamNavigationV5(
      this.props,
      'reScheduleDemo',
      false,
    );

    if (reScheduleDemo) {
      const scheduledDate = getParamNavigationV5(
        this.props,
        'scheduledDate',
        todayDate,
      );
      const scheduledTimeParam = getParamNavigationV5(
        this.props,
        'scheduledTime',
        '',
      );
      this.setState(
        {
          dobDate: scheduledDate,
          selectedDateText: moment(scheduledDate).format('DD-MMM-YYYY'),
          selectedDate: moment(scheduledDate).format('YYYY-MM-DD'),
          scheduledTime: scheduledTimeParam,
        },
        () => {
          this.getTimeSlotsFromDate();
        },
      );
    } else {
      this.setState(
        {
          dobDate: todayDate,
          selectedDateText: moment(todayDate).format('DD-MMM-YYYY'),
          selectedDate: moment(todayDate).format('YYYY-MM-DD'),
        },
        () => {
          this.getTimeSlotsFromDate();
        },
      );
    }
  }

  getTimeSlotsFromDate = () => {
    console.log('Selected Date', this.state.selectedDateText);
    this.setState({
      demoSlotStatus: false,
    });
    getLocalData(Constants.ParentUserId).then(parentId => {
      this.props.getDemoSlots(parentId, this.state.selectedDate);
    });
  };

  setTimeSlotList = slotList => {
    this.setState({
      mrngTimeSlotList: [],
      afternoonTimeSlotList: [],
      eveningTimeSlotList: [],
      nightTimeSlotList: [],
    });
    var mrngMatchString = ['6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM'];
    var afternoonMatchString = ['12 PM', '1 PM', '2 PM', '3 PM', '4 PM'];
    var evngMatchString = ['5 PM', '6 PM', '7 PM', '8 PM', '9 PM'];
    var nightMatchString = [
      '10 PM',
      '11 PM',
      '12 AM',
      '1 AM',
      '2 AM',
      '3 AM',
      '4 AM',
      '5 AM',
    ];

    var mrngDataList = [];
    var afternoonDataList = [];
    var eveningDataList = [];
    var nightDataList = [];

    slotList.map(item => {
      const reScheduleDemo = getParamNavigationV5(
        this.props,
        'reScheduleDemo',
        false,
      );

      if (reScheduleDemo) {
        const scheduledTimeParam = getParamNavigationV5(
          this.props,
          'scheduledTime',
          '',
        );
        const scheduledDateParam = getParamNavigationV5(
          this.props,
          'scheduledDate',
          '',
        );
        var dateRescheduled = moment(scheduledDateParam).format('YYYY-MM-DD');
        console.log('Mathch Chec :', this.state.selectedDate);
        console.log('Mathch Item :', dateRescheduled);
        if (
          (item.time == scheduledTimeParam.trim()) &
          (this.state.selectedDate === dateRescheduled)
        ) {
          this.onItemTimeSelected(item.slot_id);
          console.log('Mathch Found', scheduledTimeParam, item.time);
        }
      }

      if (mrngMatchString.includes(item.time)) {
        mrngDataList.push(item);
      } else if (afternoonMatchString.includes(item.time)) {
        afternoonDataList.push(item);
      } else if (evngMatchString.includes(item.time)) {
        eveningDataList.push(item);
      } else if (nightMatchString.includes(item.time)) {
        nightDataList.push(item);
      }
    });

    this.setState({
      timeSlotsList: slotList,
      mrngTimeSlotList: mrngDataList,
      afternoonTimeSlotList: afternoonDataList,
      eveningTimeSlotList: eveningDataList,
      nightTimeSlotList: nightDataList,
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.demoSlotStatus !== this.props.demoSlotStatus) {
      if (this.props.demoSlotStatus) {
        const response = this.props.state.response;
        this.setTimeSlotList(response.demo_slots);
      }
    }
    if (prevProps.bookDemoStatus !== this.props.bookDemoStatus) {
      console.log('inside book demo status', this.props.bookDemoStatus);
      if (this.props.bookDemoStatus != null) {
        if (this.props.bookDemoStatus) {
          this.setState({
            demoConfirmed: true,
          });
        } else {
          showMessage({
            message: this.props.bookDemoResponse.message,
            type: 'danger',
          });

          console.log('Repsone book demo ', this.props.bookDemoResponse);
        }
      }
    }
  }

  onItemTimeSelected(itemId) {
    console.log(itemId);
    this.setState({
      itemPressed: itemId,
    });
  }

  showDatePicker = () => {
    this.setState({
      mBirthDateDialog: true,
    });
  };

  renderMorningTime = item => (
    <View style={{flex: 0.4}}>
      {item.item.status == 'booked' ? (
        <TouchableOpacity
          disabled={true}
          style={styles.gridRowDisabled}
          onPress={() => {
            this.onItemTimeSelected(item.item.slot_id);
          }}>
          <Text style={styles.gridTextDisabled}>{item.item.time}</Text>
          <Text style={styles.gridLabelContainer}>Full</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={false}
          style={
            this.state.itemPressed == item.item.slot_id
              ? styles.gridRowSelected
              : styles.gridRow
          }
          onPress={() => {
            this.onItemTimeSelected(item.item.slot_id);
          }}>
          <Text
            style={
              this.state.itemPressed == item.item.slot_id
                ? styles.gridTextSelected
                : styles.gridText
            }>
            {item.item.time}
          </Text>
          {item.item.lable ? (
            <Text style={styles.gridLabelContainer}>{item.item.lable}</Text>
          ) : null}
        </TouchableOpacity>
      )}
    </View>
  );

  onDOBDatePicked = (date, currentIndex) => {
    //Here you will get the selected date

    this.setState(
      {
        dobDate: date,
        selectedDateText: moment(date).format('DD-MMM-YYYY'),
        selectedDate: moment(date).format('YYYY-MM-DD'),
        currentSelectedDateIndex: currentIndex,
      },
      () => {
        this.getTimeSlotsFromDate();
      },
    );
    this.closeDatePicker();
  };

  closeDatePicker = () => {
    this.setState({
      mBirthDateDialog: false,
    });
  };

  onDateChange = (event, selectedDate) => {
    console.log('Selected date ' + selectedDate);
  };

  callBackMobileNumberUpdate = (name, mobileNumber, email) => {
    this.scheduleDemo(name, mobileNumber, email);
  };

  cancelMobileNumberUpdate = () => {
    this.setState({
      updateMobileNumberDialog: false,
    });
  };

  onBookDemo = () => {
    var isValid = true;

    if (this.state.selectedDateText === 'Choose Date') {
      this.setState({
        selectDateError: true,
      });
      isValid = false;
    } else {
      this.setState({
        selectDateError: false,
      });
    }

    if (this.state.selectedGrade === 'Select Grade') {
      this.setState({
        selectGradeError: true,
      });
      isValid = false;
    } else {
      this.setState({
        selectGradeError: false,
      });
    }

    if (this.state.mChildName == '') {
      this.setState({
        childNameError: true,
      });
      isValid = false;
    } else {
      this.setState({
        childNameError: false,
      });
    }

    if (!isValidEmail(this.state.mUserEmail)) {
      this.setState({
        emailError: true,
      });
      isValid = false;
    } else {
      this.setState({
        emailError: false,
      });
    }

    if (this.state.mUserMobileNumber == '') {
      this.setState({
        mobileNumberError: true,
      });
      isValid = false;
    } else {
      this.setState({
        mobileNumberError: false,
      });
    }

    if (this.state.itemPressed == null) {
      showMessage({
        message: 'Please select time slot',
        type: 'danger',
      });
      isValid = false;
    }

    if (isValid) {
      const {
        mUserId,
        mUserEmail,
        mUserMobileNumber,
        mChildName,
        itemPressed,
        selectedDate,
        selectedGrade,
      } = this.state;
      this.props.registerWithBookDemo(
        mUserId,
        selectedGrade,
        itemPressed,
        selectedDate,
        mChildName,
        mUserMobileNumber,
        mUserEmail,
      );
      console.log('All valid');
    } else {
      this.refs._scrollView.scrollTo(0);
    }
  };

  reScheduleDemo = () => {
    const reScheduleDemoParam = getParamNavigationV5(
      this.props,
      'reScheduleDemo',
      false,
    );

    console.log('Reschedule param', reScheduleDemoParam);
    console.log('Book demo res', this.props.bookDemoResponse);

    let demoPreferredSlotId = 0;
    if (reScheduleDemoParam)
      demoPreferredSlotId = this.props.bookDemoResponse.preferred_slot_id;
    else
      demoPreferredSlotId =
        this.props.currentSelectedKid.student_demos[0].preferred_slot_id;

    this.props.doReScheduleDemo(
      this.props.dashboardResponse.parent_id,
      this.state.currentKid.student_id,
      demoPreferredSlotId,
      this.state.itemPressed,
      this.state.selectedDate,
    );
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

  scheduleDemo = (name, mobile, email) => {
    this.cancelMobileNumberUpdate();

    console.log('Booking a demo');
    this.props.doBookingDemo(
      333,
      this.state.itemPressed,
      this.state.selectedDate,
      name,
      mobile,
      email,
    );
  };

  onPressBack = () => {
    const {goBack} = this.props.navigation;

    goBack();
  };

  onPressGrade = () => {
    console.log('On Press Grade');
    this.setState({
      onSelectedGrade: true,
    });
  };

  onGradeItemSelected = grade => {
    this.setState({
      onSelectedGrade: false,
      selectedGrade: grade.name,
    });
  };

  _renderGradeDatas = () => {
    var grades = this.props.gradeResponse.grades;
    const selectedGrade = this.state.selectedGrade;

    return (
      <View style={{backgroundColor: COLOR.WHITE, paddingVertical: 30}}>
        {grades.map(grade => {
          return (
            <TouchableOpacity
              onPress={() => {
                this.onGradeItemSelected(grade);
              }}
              style={{
                paddingVertical: 10,
                backgroundColor: COLOR.WHITE,
                borderColor: COLOR.BORDER_COLOR_GREEN,
                borderRadius: 10,
                borderWidth: 2,
                marginHorizontal: 30,
                marginVertical: 4,
              }}>
              <Text
                style={[
                  CommonStyles.text_12__semi_bold,
                  {textAlign: 'center'},
                ]}>
                {grade.name}
              </Text>
            </TouchableOpacity>

            // <TouchableOpacity onPress={()=>{
            //     this.onGradeItemSelected(grade)
            // }} style={{ paddingVertical : 10,backgroundColor : COLOR.WHITE ,borderColor : COLOR.BORDER_COLOR_GREEN,borderRadius : 10,borderWidth : 2,marginHorizontal : 30,marginVertical : 4 }}>

            //     <Text style={[CommonStyles.text_12__semi_bold,{ textAlign : 'center' }]}>
            //         {grade.name}
            //     </Text>

            // </TouchableOpacity>
          );
        })}
      </View>
    );
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

  takeMeToHome = () => {
    // this.props.navigation.navigate(Constants.MainScreen)
    const navigateAction = CommonActions.reset({
      index: 0,
      routes: [{name: Constants.MainScreen}],
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    const {
      mrngTimeSlotList,
      afternoonTimeSlotList,
      eveningTimeSlotList,
      nightTimeSlotList,
      mBirthDateDialog,
      mUserEmail,
      mUserMobileNumber,
      fromMobileNumber,
    } = this.state;
    const {loading} = this.props;
    const {navigation} = this.props.navigation;

    const reScheduleDemo = getParamNavigationV5(
      this.props,
      'reScheduleDemo',
      false,
    );

    return (
      <View style={styles.mainContainer}>
        <ScrollView
          ref="_scrollView"
          removeClippedSubviews={false}
          style={{flex: 1}}>
          {loading && (
            <ActivityIndicator
              size="large"
              color="black"
              style={CommonStyles.loadingIndicatior}
            />
          )}

          <View style={{marginStart: 20}}>
            <CustomBackButton onPress={this.onPressBack} />
          </View>

          <View style={{flex: 1}}>
            <View style={{marginTop: 15}}>
              <Text
                style={[
                  CommonStyles.text_14_semi_bold,
                  {color: COLOR.TEXT_COLOR_BLUE},
                ]}>
                {reScheduleDemo ? 'Reschedule a demo' : 'Book a FREE Demo'}
              </Text>
            </View>

            {!fromMobileNumber ? (
              <View style={{marginTop: 2, marginBottom: 2}}>
                <Text style={[CommonStyles.text_11_bold, {marginStart: 15}]}>
                  Mobile Number
                </Text>
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
                  value={this.state.mUserMobileNumber}
                  blurOnSubmit={false}
                  //setting limit of input
                />
              </View>
            ) : (
              <View style={{marginTop: 2, marginBottom: 2}}>
                <Text style={[CommonStyles.text_11_bold, {marginStart: 15}]}>
                  Email Id
                </Text>
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
            )}

            <View style={{marginTop: 15}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1, marginEnd: 10}}>
                  <Text style={[CommonStyles.text_11_bold, {marginStart: 15}]}>
                    For
                  </Text>
                  {this.state.childNameError && (
                    <Text style={styles.errorMessage}>
                      Enter valid child name
                    </Text>
                  )}
                  <TextInput
                    ref={input => {
                      this.child_name_input = input;
                    }}
                    placeholder="Child name"
                    placeholderTextColor={COLOR.TEXT_COLOR_HINT}
                    keyboardType="email-address"
                    style={styles.textInputBordered}
                    editable={this.state.isEmailEditable}
                    returnKeyType="next"
                    autoCapitalize="none"
                    onFocus={() => this.onFocusIn(this.child_name_input)}
                    onBlur={() => this.onFocusOut(this.child_name_input)}
                    onSubmitEditing={() => {
                      this.first_name_input.focus();
                    }}
                    onChangeText={text => this.setState({mChildName: text})}
                    value={this.state.mChildName}
                    blurOnSubmit={false}
                    //setting limit of input
                  />
                </View>
                <Pressable
                  onPress={this.onPressGrade}
                  style={{flex: 1, marginStart: 10}}>
                  <Text style={[CommonStyles.text_11_bold, {marginStart: 15}]}>
                    Grade
                  </Text>
                  {this.state.selectGradeError && (
                    <Text style={styles.errorMessage}>Select grade</Text>
                  )}
                  <Text
                    style={[
                      CommonStyles.text_8_bold,
                      styles.textInputBordered,
                      {color: COLOR.BLACK},
                    ]}>
                    {this.state.selectedGrade}
                  </Text>
                </Pressable>
              </View>

              {/* <View style={reScheduleDemo ? styles.kidNameContainerDisabled : styles.kidNameContainer}>
                                {
                                    currentKid &&
                                    <View style={{ flexDirection: 'row', margin: 12 }}>
                                        <Image style={{ height: 30, width: 30, resizeMode: "stretch" }} source={{ uri: currentKid.photo }} />
                                        <Text style={[CommonStyles.text_14_Regular, { alignSelf: 'center', marginStart: 5 }]}>{currentKid.name}</Text>
                                    </View>
                                }

                            </View> */}
            </View>
            <View style={{marginTop: 5}}>
              <Text style={[CommonStyles.text_11_bold, {marginStart: 15}]}>
                When
              </Text>
              {this.state.selectDateError && (
                <Text style={styles.errorMessage}>Please select date</Text>
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
                    style={{
                      fontSize: normalize(14),
                      alignSelf: 'center',
                      marginStart: 5,
                      color: COLOR.TEXT_COLOR_HINT,
                      fontFamily: Constants.Montserrat_Regular,
                    }}>
                    {this.state.selectedDateText}
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    marginEnd: 15,
                  }}>
                  <Icon
                    size={25}
                    name="angle-down"
                    color={COLOR.TEXT_COLOR_BLUE}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={{marginTop: 10}}>
              <Text style={[CommonStyles.text_11_bold, {marginStart: 15}]}>
                Morning
              </Text>
              {mrngTimeSlotList.length > 0 ? (
                <FlatList
                  columnWrapperStyle={{justifyContent: 'flex-start'}}
                  data={mrngTimeSlotList}
                  renderItem={this.renderMorningTime}
                  horizontal={false}
                  keyExtractor={item => item.id}
                  numColumns={3}
                />
              ) : (
                <Text
                  style={{
                    fontFamily: Constants.Montserrat_Regular,
                    marginStart: 10,
                    marginTop: 10,
                    fontSize: 15,
                    color: COLOR.TEXT_COLOR_HINT,
                  }}>
                  No slots available
                </Text>
              )}
            </View>
            <View style={{marginTop: 10}}>
              <Text style={[CommonStyles.text_11_bold, {marginStart: 15}]}>
                Afternoon
              </Text>
              {afternoonTimeSlotList.length > 0 ? (
                <FlatList
                  columnWrapperStyle={{justifyContent: 'flex-start'}}
                  data={afternoonTimeSlotList}
                  renderItem={this.renderMorningTime}
                  horizontal={false}
                  keyExtractor={item => item.id}
                  numColumns={3}
                />
              ) : (
                <Text
                  style={{
                    fontFamily: Constants.Montserrat_Regular,
                    marginStart: 10,
                    marginTop: 10,
                    fontSize: 15,
                    color: COLOR.TEXT_COLOR_HINT,
                  }}>
                  No slots available
                </Text>
              )}
            </View>
            <View style={{marginTop: 10}}>
              <Text style={[CommonStyles.text_11_bold, {marginStart: 15}]}>
                Evening
              </Text>
              {eveningTimeSlotList.length > 0 ? (
                <FlatList
                  columnWrapperStyle={{justifyContent: 'flex-start'}}
                  data={eveningTimeSlotList}
                  renderItem={this.renderMorningTime}
                  horizontal={false}
                  keyExtractor={item => item.id}
                  numColumns={3}
                />
              ) : (
                <Text
                  style={{
                    fontFamily: Constants.Montserrat_Regular,
                    marginStart: 10,
                    marginTop: 10,
                    fontSize: 15,
                    color: COLOR.TEXT_COLOR_HINT,
                  }}>
                  No slots available
                </Text>
              )}
            </View>
            <View style={{marginTop: 15, marginBottom: 15}}>
              <Text style={[CommonStyles.text_11_bold, {marginStart: 15}]}>
                Night
              </Text>
              {nightTimeSlotList.length > 0 ? (
                <FlatList
                  columnWrapperStyle={{justifyContent: 'flex-start'}}
                  data={nightTimeSlotList}
                  renderItem={this.renderMorningTime}
                  horizontal={false}
                  keyExtractor={item => item.id}
                  numColumns={3}
                />
              ) : (
                <Text
                  style={{
                    fontFamily: Constants.Montserrat_Regular,
                    marginStart: 10,
                    marginTop: 10,
                    fontSize: 15,
                    color: COLOR.TEXT_COLOR_HINT,
                  }}>
                  No slots available
                </Text>
              )}
            </View>
            <View style={{marginTop: 15}}>
              <CustomGradientButton
                myRef={input => {
                  this.btn_add_kid = input;
                }}
                style={CommonStyles.green_button_gradient}
                children={reScheduleDemo ? 'Reschedule Demo' : 'Schedule demo'}
                onPress={this.onBookDemo}
              />
            </View>

            {/* <DateTimePickerModal
                            isVisible={mBirthDateDialog}
                            mode="date"
                            minimumDate={getMaxDateFromToday(1)}
                            maximumDate={getMaxDateFromToday(7)}
                            onConfirm={this.onDOBDatePicked}
                            onCancel={this.closeDatePicker}

                            
                        /> */}
            {mBirthDateDialog && (
              <EModal transparent={true}>
                <ChooseGridDateComponent
                  onDOBDatePicked={this.onDOBDatePicked}
                  closeDatePicker={this.closeDatePicker}
                  currentIndex={this.state.currentSelectedDateIndex}
                />
              </EModal>
            )}
          </View>

          {this.props.gradeResponse && this.state.onSelectedGrade && (
            <Modal isVisible={this.state.onSelectedGrade} transparent={true}>
              <View>{this._renderGradeDatas()}</View>
            </Modal>
          )}

          <Modal isVisible={this.state.demoConfirmed} transparent={false}>
            <View style={{flex: 1}}>
              <View style={{flex: 0.5}}>
                <LottieView source={lottie_success} autoPlay loop={false} />
              </View>

              <View style={{flex: 0.25}}>
                <Text
                  style={[
                    CommonStyles.text_18_bold,
                    {color: COLOR.WHITE, textAlign: 'center'},
                  ]}>
                  Demo Booked
                </Text>
                <Text
                  style={[
                    CommonStyles.text_18_bold,
                    {color: COLOR.WHITE, textAlign: 'center'},
                  ]}>
                  Successfully
                </Text>
              </View>
              <View style={{flex: 0.25}}>
                <CustomGradientButton
                  myRef={input => {
                    this.reschedule = input;
                  }}
                  style={styles.rescheduleButton}
                  children={'Take me to Home'}
                  onPress={this.takeMeToHome}
                />
              </View>
            </View>
          </Modal>

          {/* <Modal isVisible={this.state.updateMobileNumberDialog} transparent={true}>
                        <UpdateNameMobileComponent parent_details={this.props.dashboardResponse.parent_details[0]} cancelMobileNumberUpdate={this.cancelMobileNumberUpdate} callBackMobileNumberUpdate={this.callBackMobileNumberUpdate} />
                    </Modal> */}
          {/* 
                    <Modal isVisible={this.state.updateMobileNumberDialog} transparent={true}>
                        <UpdateNameMobileComponent parent_details={{ mobile: "8197713454", first_name: "", email: "" }} cancelMobileNumberUpdate={this.cancelMobileNumberUpdate} callBackMobileNumberUpdate={this.callBackMobileNumberUpdate} />
                    </Modal> */}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state.dashboard,
    loading: state.dashboard.loading,
    dashboardResponse: state.dashboard.dashboard_response,
    demoSlotStatus: state.dashboard.demo_slot_status,
    bookDemoStatus: state.dashboard.register_book_demo_status,
    bookDemoResponse: state.dashboard.register_book_demo_response,
    gradeResponse: state.authenticate.response,
  };
};

const mapDispatchToProps = {
  getDemoSlots,
  doBookingDemo,
  doReScheduleDemo,
  getGradeDatas,
  registerWithBookDemo,
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  textHeader: {
    fontSize: 15,
    textAlign: 'left',
    color: COLOR.TEXT_COLOR_BLUE,
    marginTop: 5,
    marginStart: 15,
    marginBottom: 5,
    fontFamily: Constants.Montserrat_Semi_Bold,
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
  textLighter: {
    fontSize: 12,
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 5,
    color: COLOR.TEXT_COLOR_BLUE,
    fontFamily: 'Montserrat-Regular',
  },
  gridRow: {
    height: 60,
    flex: 0.4,
    justifyContent: 'space-between',
    backgroundColor: COLOR.WHITE,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLOR.BORDER_COLOR_GREY,
    margin: 5,
  },
  gridRowSelected: {
    height: 60,
    flex: 0.4,
    justifyContent: 'space-between',
    backgroundColor: '#325EE0',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLOR.BORDER_COLOR_GREY,
    margin: 5,
  },
  gridRowContent: {
    height: 60,
    flex: 0.4,
    justifyContent: 'space-between',
    backgroundColor: COLOR.WHITE,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E2E4EE',
    margin: 5,
  },
  gridRowDisabled: {
    height: 60,
    flex: 0.4,
    justifyContent: 'space-between',
    backgroundColor: COLOR.WHITE,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#F3F4F8',
    margin: 5,
  },
  gridText: {
    padding: 20,
    fontSize: normalize(12),
    alignSelf: 'center',
    color: COLOR.BLACK,
    fontFamily: Constants.Montserrat_Regular,
  },
  errorMessage: {
    color: COLOR.RED,
  },
  gridTextSelected: {
    padding: 20,
    fontSize: normalize(12),
    alignSelf: 'center',
    color: COLOR.WHITE,
    fontFamily: Constants.Montserrat_Regular,
  },
  gridTextDisabled: {
    padding: 20,
    fontSize: normalize(12),
    alignSelf: 'center',
    color: '#AFAFAF',
    fontFamily: Constants.Montserrat_Regular,
  },
  gridTextContent: {
    padding: 10,
    fontSize: normalize(12),
    alignSelf: 'center',
    color: '#353639',
    fontFamily: Constants.Montserrat_Regular,
  },
  gridLabelContainer: {
    color: 'red',
    fontSize: 10,
    zIndex: 50,
    backgroundColor: COLOR.WHITE,
    bottom: -10,
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 2,
    paddingBottom: 2,
    alignSelf: 'center',
    position: 'absolute',
    fontFamily: Constants.Montserrat_Regular,
  },

  kidNameContainer: {
    flexDirection: 'row',
    borderColor: COLOR.BORDER_COLOR_GREY,
    borderWidth: 2,
    borderRadius: 15,
    margin: 10,
  },
  kidNameContainerDisabled: {
    flexDirection: 'row',
    borderColor: '#E2E4EE',
    borderWidth: 2,
    borderRadius: 15,
    margin: 10,
    opacity: 0.5,
  },
  textSubHeader: {
    fontSize: 12,
    textAlign: 'left',
    margin: 5,
    color: COLOR.TEXT_COLOR_BLACK,
    fontFamily: 'Montserrat-SemiBold',
  },
  kidNameTextContianer: {},
  kidNameTextContianerDiasbled: {},

  rescheduleButton: {
    alignItems: 'center',
    marginStart: 20,
    marginEnd: 20,
    marginTop: 20,
    paddingTop: 15,

    paddingBottom: 15,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookDemoScreenPostOtp);
