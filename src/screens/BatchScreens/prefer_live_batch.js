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
  Alert,
  VirtualizedList,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import {COLOR, CommonStyles} from '../../config/styles';
import {IC_PROFILE_PIC, IC_BOOK_DEMO_BG} from '../../assets/images';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker';
import {showMessage, hideMessage} from 'react-native-flash-message';
import CustomGradientButton from '../../components/CustomGradientButton';
import {DatePickerDialog} from 'react-native-datepicker-dialog';
import moment from 'moment';
import {getDemoSlots, doBookingLiveClass} from '../../actions/dashboard';
import {normalize} from 'react-native-elements';
import {getLocalData} from '../../components/helpers/AsyncMethods';
import * as Config from '../../config/configs';
import {getParamNavigationV5} from '../../components/helpers/navigationV5Data';

class PreferLiveBatchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      showDatePciker: false,
      selectedDateText: 'Choose Date',
      itemPressed: null,
      selectDateError: false,
      selectDateErrorMessage: '',
      timeSlotsList: [],
      allKidsList: [],
      currentKid: null,
    };
  }

  componentDidMount() {
    console.log('Book Demo Did Mount aaaaaaa');

    if (this.props.state.dashboard_status) {
      this.setState({
        allKidsList: this.props.state.dashboard_response.students,
        currentKid: this.props.state.current_selected_kid,
      });
    }
    let todayDate = new Date();

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

  getTimeSlotsFromDate = () => {
    this.setState({
      demoSlotStatus: false,
    });
    getLocalData(Constants.ParentUserId).then(parentId => {
      this.props.getDemoSlots(parentId, this.state.selectedDate);
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.demoSlotStatus !== this.props.demoSlotStatus) {
      if (this.props.demoSlotStatus) {
        const response = this.props.state.response;
        this.setState({
          timeSlotsList: response.demo_slots,
        });
      }
    }
    if (
      prevProps.book_live_class_status !== this.props.book_live_class_status
    ) {
      console.log('inside book demo status');
      if (this.props.book_live_class_status) {
        this.liveClassBookingConfiramtion();
      }
    }
  }

  liveClassBookingConfiramtion = () => {
    Alert.alert(
      'Your request for the preferred slot batch has been sent.',
      '',
      [{text: 'Okay', onPress: () => this.goToHome()}],
      {cancelable: false},
    );
  };

  goToHome = () => {
    this.props.navigation.replace(Constants.MainScreen);
  };

  static getDerivedStateFromProps(nextProps, state) {
    return null;
  }

  onItemTimeSelected(itemId) {
    console.log(itemId);
    this.setState({
      itemPressed: itemId,
    });
  }

  showDatePicker = () => {
    // let tommorow = moment(new Date).add(1, 'day')
    this.refs.dobDialog.open({
      date: new Date(),
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

  onDOBDatePicked = date => {
    //Here you will get the selected date

    this.setState(
      {
        dobDate: date,
        selectedDateText: moment(date).format('DD-MMM-YYYY'),
        selectedDate: moment(date).format('YYYY-MM-DD'),
      },
      () => {
        this.getTimeSlotsFromDate();
      },
    );
  };

  scheduleDemo = () => {
    if (this.state.selectedDateText === 'Choose Date') {
      this.setState({
        selectDateError: true,
      });
      return;
    } else {
      this.setState({
        selectDateError: false,
      });
    }

    if (this.state.itemPressed == null) {
      showMessage({
        message: 'Please select time slot',
        type: 'danger',
      });
      return;
    }
    console.log('Student ID : ' + this.state.currentKid.student_id);
    console.log('Slot: ' + this.state.itemPressed);
    console.log('day : ' + this.state.selectedDate);
    this.props.doBookingLiveClass(
      this.state.currentKid.student_id,
      this.state.itemPressed,
      this.state.selectedDate,
    );
    //this.props.navigation.navigate("DemoConfirmation");
  };

  render() {
    const {
      isCancelConfirmationDemoVisible,
      timeSlotsList,
      allKidsList,
      currentKid,
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
        <ScrollView removeClippedSubviews={false} style={{flex: 1}}>
          {loading && (
            <ActivityIndicator
              size="large"
              color="black"
              style={CommonStyles.loadingIndicatior}
            />
          )}

          <View style={{flex: 1}}>
            <View style={{marginTop: 15}}>
              <Text
                style={[
                  CommonStyles.text_18_bold,
                  {color: COLOR.TEXT_COLOR_BLUE},
                ]}>
                {reScheduleDemo
                  ? 'ReSchedule a live class batch'
                  : 'Choose Live Class Batch'}
              </Text>
            </View>

            <View style={{marginTop: 15}}>
              <Text style={[CommonStyles.text_11_bold, {marginStart: 15}]}>
                For
              </Text>

              <View
                style={
                  reScheduleDemo
                    ? styles.kidNameContainerDisabled
                    : styles.kidNameContainer
                }>
                {currentKid && (
                  <View style={{flexDirection: 'row', margin: 12}}>
                    <Image
                      style={{height: 30, width: 30, resizeMode: 'stretch'}}
                      source={{uri: Config.BASE_URL + currentKid.photo}}
                    />
                    <Text
                      style={[
                        CommonStyles.text_14_Regular,
                        {alignSelf: 'center', marginStart: 5},
                      ]}>
                      {currentKid.name}
                    </Text>
                  </View>
                )}

                {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginEnd: 15 }}>
                                    <Icon

                                        size={25}
                                        name='angle-down'
                                        color={COLOR.TEXT_COLOR_BLUE} />
                                </View> */}
              </View>
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
              {/* <Text style={[CommonStyles.text_11_bold, { marginStart: 15, }]}>Morning</Text> */}
              <FlatList
                data={timeSlotsList}
                renderItem={this.renderMorningTime}
                keyExtractor={item => item.id}
                numColumns={3}
              />
            </View>
            {/* <View style={{ marginTop: 10 }}>
                            <Text style={[CommonStyles.text_11_bold, { marginStart: 15, }]}>Afternoon</Text>
                            <FlatList

                                data={AFTERNOON_TIME_DATA}
                                renderItem={this.renderMorningTime}
                                keyExtractor={item => item.id}
                                numColumns={3}
                            />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={[CommonStyles.text_11_bold, { marginStart: 15, }]}>Evening</Text>

                            <FlatList

                                columnWrapperStyle={{ justifyContent: 'flex-start' }}
                                data={EVENING_TIME_DATA}
                                renderItem={this.renderMorningTime}
                                horizontal={false}
                                keyExtractor={item => item.id}
                                numColumns={3}
                            />

                        </View>
                        <View style={{ marginTop: 15, marginBottom: 15 }}>
                            <Text style={[CommonStyles.text_11_bold, { marginStart: 15, }]}>Night</Text>
                            <Text style={{ fontFamily: Constants.Montserrat_Regular, marginStart: 10, marginTop: 10, fontSize: 15, color: COLOR.TEXT_COLOR_HINT }}>No slots available</Text>
                            <FlatList
                                columnWrapperStyle={{ justifyContent: 'flex-start' }}
                                data={NIGHT_TIME_DATA}
                                renderItem={this.renderMorningTime}
                                horizontal={false}
                                keyExtractor={item => item.id}
                                numColumns={3}
                            />

                        </View> */}
            <View style={{marginTop: 15}}>
              <CustomGradientButton
                myRef={input => {
                  this.btn_add_kid = input;
                }}
                style={CommonStyles.green_button_gradient}
                children={
                  reScheduleDemo ? 'Reschedule Demo' : 'Schedule Live Class'
                }
                onPress={this.scheduleDemo}
              />
            </View>
            <DatePickerDialog
              ref="dobDialog"
              onDatePicked={this.onDOBDatePicked.bind(this)}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state.dashboard,
    loading: state.dashboard.loading,
    book_live_class_status: state.dashboard.book_live_class_status,
    book_live_class_response: state.dashboard.book_live_class_response,
    demoSlotStatus: state.dashboard.demo_slot_status,
  };
};

const mapDispatchToProps = {
  getDemoSlots,
  doBookingLiveClass,
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    justifyContent: 'flex-start',
    marginStart: 10,
    marginEnd: 10,
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
    fontSize: normalize(14),
    alignSelf: 'center',
    color: COLOR.BLACK,
    fontFamily: Constants.Montserrat_Regular,
  },
  errorMessage: {
    color: COLOR.RED,
  },
  gridTextSelected: {
    padding: 20,
    fontSize: normalize(14),
    alignSelf: 'center',
    color: COLOR.WHITE,
    fontFamily: Constants.Montserrat_Regular,
  },
  gridTextDisabled: {
    padding: 20,
    fontSize: normalize(14),
    alignSelf: 'center',
    color: '#AFAFAF',
    fontFamily: Constants.Montserrat_Regular,
  },
  gridTextContent: {
    padding: 10,
    fontSize: normalize(14),
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
  kidNameTextContianer: {},
  kidNameTextContianerDiasbled: {},
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PreferLiveBatchScreen);
