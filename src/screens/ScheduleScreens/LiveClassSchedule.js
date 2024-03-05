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
  IC_PROFILE_PIC,
  IMG_SARTHAK,
  IMG_SHAKSHI,
  LIVE_CLASS_TODAY,
  ICON_CLOCK,
  CARD_BTN_ARROW,
  IC_SCHEDULE,
} from '../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import {addToCart} from '../../actions/dashboard';
import {
  secondsToHms,
  timeInHourFormat,
  getClassesDateFormat,
} from '../../components/helpers';
import Icon from 'react-native-vector-icons/FontAwesome';
import {normalize, Card} from 'react-native-elements';
import DashboardHeader from '../../components/DashboardHeader';
import NoRecordFoundComponent from '../../components/NoRecordFoundComponent';
import NoRecordDemoComponent from '../../components/NoRecordDemoComponent';
import LottieView from 'lottie-react-native';
import {Pressable} from 'react-native';

class LiveClassSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  showUpComingClasses = upComingClasses => {
    return (
      <View
        style={{
          backgroundColor: COLOR.WHITE,
          paddingHorizontal: normalize(10),
          paddingVertical: normalize(20),
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: normalize(10),
            justifyContent: 'space-between',
          }}>
          <Text
            style={[CommonStyles.text_14_bold, {marginBottom: normalize(10)}]}>
            Upcoming Classes
          </Text>
          <TouchableOpacity
            onPress={() =>
              this.onPressViewAll(Constants.UPCOMING_CLASSES, upComingClasses)
            }
            style={{paddingStart: normalize(10), paddingEnd: normalize(10)}}>
            <Text
              style={[
                CommonStyles.text_12__semi_bold,
                {color: COLOR.TEXT_COLOR_GREEN},
              ]}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        {upComingClasses.map((item, index) => {
          var classDate = getClassesDateFormat(item.start_date);
          if (index < 3)
            return (
              <TouchableOpacity
                onPress={() =>
                  this.onPressClassItem(Constants.UPCOMING_CLASSES, item)
                }
                style={{flexDirection: 'row', marginTop: normalize(10)}}>
                <View>
                  <Text
                    style={[
                      CommonStyles.text_12_Regular,
                      {color: COLOR.TEXT_ALPHA_GREY},
                    ]}>
                    {item.day.substring(0, 2)}
                  </Text>
                  <Text style={[CommonStyles.text_12_bold]}>
                    {item.start_date.substring(0, 2)}
                  </Text>
                  <Text style={[CommonStyles.text_12_bold]}>
                    {classDate[1]}
                  </Text>
                </View>
                <View
                  style={[
                    CommonStyles.shadowContainer_border_20,
                    {
                      backgroundColor: COLOR.WHITE,
                      flex: 1,
                      marginStart: normalize(10),
                    },
                  ]}>
                  <View style={{margin: normalize(16)}}>
                    <Text style={[CommonStyles.text_14_bold]}>{item.time}</Text>
                    <Text
                      style={[
                        CommonStyles.text_12_Regular,
                        {
                          color: COLOR.TEXT_ALPHA_GREY,
                          marginTop: normalize(2),
                        },
                      ]}>
                      Teacher : {item.teacher}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
        })}
      </View>
    );
  };

  showInCompletedClasses = inCompleteClasses => {
    return (
      <View style={{backgroundColor: COLOR.RED, borderRadius: 24}}>
        <Text
          style={[CommonStyles.text_14_bold, {marginBottom: normalize(10)}]}>
          InComplete Classes
        </Text>
        {inCompleteClasses.map(item => {
          return (
            <View style={{flexDirection: 'row', marginTop: normalize(10)}}>
              <View>
                <Text
                  style={[
                    CommonStyles.text_12_Regular,
                    {color: COLOR.TEXT_ALPHA_GREY},
                  ]}>
                  {item.day.substring(0, 2)}
                </Text>
                <Text style={[CommonStyles.text_12_bold]}>
                  {item.start_date.substring(0, 2)}
                </Text>
              </View>

              <View
                style={[
                  CommonStyles.shadowContainer_border_20,
                  {
                    backgroundColor: COLOR.WHITE,
                    flex: 1,
                    marginStart: normalize(10),
                  },
                ]}>
                {item.practice_details.map(data => {
                  return (
                    <View style={{margin: normalize(16)}}>
                      <Text style={[CommonStyles.text_14_bold]}>
                        {data.tag_name}
                      </Text>
                      {/* <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>{data.tag_name}</Text> */}
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: normalize(8),
                          alignItems: 'center',
                        }}>
                        <Icon
                          style={{marginStart: normalize(8)}}
                          size={15}
                          name="check"
                          color={COLOR.TEXT_COLOR_GREEN}
                        />
                        <Text
                          style={[
                            CommonStyles.text_12_Regular,
                            {
                              color: COLOR.TEXT_ALPHA_GREY,
                              marginStart: normalize(5),
                            },
                          ]}>
                          {data.correct}
                        </Text>
                        <Icon
                          style={{marginStart: normalize(8)}}
                          size={15}
                          name="times"
                          color={COLOR.RED}
                        />

                        <Text
                          style={[
                            CommonStyles.text_12_Regular,
                            {
                              color: COLOR.TEXT_ALPHA_GREY,
                              marginStart: normalize(5),
                            },
                          ]}>
                          {data.incorrect}
                        </Text>
                        <Text
                          style={[
                            CommonStyles.text_12_Regular,
                            {
                              color: COLOR.TEXT_ALPHA_GREY,
                              marginStart: normalize(10),
                            },
                          ]}>
                          {timeInHourFormat(data.timespent)} hrs
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  onPressClassItem = (clType, clData) => {
    this.props.navigation.navigate(Constants.ClassDetailsScreen, {
      classType: clType,
      classData: clData,
    });
  };

  onPressViewAll = (clType, clList) => {
    console.log('On Press View All');
    console.log(clList);
    this.props.navigation.navigate(Constants.ClassListScreen, {
      classType: clType,
    });
  };

  onPressViewRecording = url => {
    this.props.navigation.navigate(Constants.VIEW_CLASS_RECORDING, {
      videoUrl: url,
    });
  };

  showCompletedClasses = (completedClasses, classType) => {
    return (
      <View
        style={{
          backgroundColor: COLOR.WHITE,
          borderRadius: 24,
          paddingHorizontal: normalize(10),
          paddingVertical: normalize(20),
          marginTop: normalize(20),
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: normalize(10),
            justifyContent: 'space-between',
          }}>
          <Text style={[CommonStyles.text_14_bold]}>{classType}</Text>
          <TouchableOpacity
            onPress={() => this.onPressViewAll(classType, completedClasses)}
            style={{paddingStart: normalize(10), paddingEnd: normalize(10)}}>
            <Text
              style={[
                CommonStyles.text_12__semi_bold,
                {color: COLOR.TEXT_COLOR_GREEN},
              ]}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        {completedClasses.map((item, index) => {
          var classDate = getClassesDateFormat(item.start_date);

          return (
            <TouchableOpacity
              onPress={() => this.onPressClassItem(classType, item)}
              style={{
                flexDirection: 'row',
                marginTop: normalize(10),
                overflow: 'visible',
              }}>
              <View>
                <Text
                  style={[
                    CommonStyles.text_12_Regular,
                    {color: COLOR.TEXT_ALPHA_GREY},
                  ]}>
                  {item.day.substring(0, 2)}
                </Text>
                <Text style={[CommonStyles.text_12_bold]}>
                  {item.start_date.substring(0, 2)}
                </Text>
                <Text style={[CommonStyles.text_12_bold]}>{classDate[1]}</Text>
              </View>
              <View
                style={[
                  CommonStyles.shadowContainer_border_20,
                  {
                    backgroundColor: COLOR.WHITE,
                    flex: 1,
                    marginStart: normalize(10),
                  },
                ]}>
                <View style={{margin: normalize(12)}}>
                  <Text style={[CommonStyles.text_14_bold]}>{item.time}</Text>
                  <Text
                    style={[
                      CommonStyles.text_12_Regular,
                      {color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2)},
                    ]}>
                    Teacher : {item.teacher}
                  </Text>
                  {item.homework_assigned && (
                    <View style={{marginTop: normalize(6)}}>
                      <Text
                        style={[
                          CommonStyles.text_12_Regular,
                          {color: COLOR.TEXT_COLOR_BLACK},
                        ]}>
                        Homework assigned
                      </Text>
                    </View>
                  )}

                  {classType == Constants.COMPLETED_CLASSES &&
                    item.recording_links.length > 0 && (
                      <Pressable
                        onPress={() =>
                          this.onPressViewRecording(item.recording_links[0])
                        }>
                        <Text
                          style={[
                            CommonStyles.text_8_bold,
                            {
                              marginVertical: 10,
                              textAlign: 'right',
                              color: COLOR.ORANGE,
                            },
                          ]}>
                          View Recording
                        </Text>
                      </Pressable>
                    )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  renderDataAvailablility = () => {
    const {student_class_status, student_class_response} = this.props;
    if (
      student_class_response.upcoming_classes.length == 0 &&
      student_class_response.completed_classes.length == 0 &&
      student_class_response.incomplete_classes.length == 0
    ) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: COLOR.WHITE,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <NoRecordFoundComponent
            title="There is no Live Class Schedule."
            sub_title=""
          />
        </View>
      );
    }
  };

  onBuySubscription = () => {
    this.props.navigation.navigate(Constants.ShowSubscriptions);
  };

  render() {
    const {
      student_class_status,
      student_class_response,
      loading,
      currentSelectedKid,
    } = this.props;
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        {student_class_status &&
          student_class_response.upcoming_classes.length > 0 &&
          this.showUpComingClasses(student_class_response.upcoming_classes)}
        {student_class_status &&
          student_class_response.completed_classes.length > 0 &&
          this.showCompletedClasses(
            student_class_response.completed_classes,
            Constants.COMPLETED_CLASSES,
          )}
        {/* {student_class_status &&
          student_class_response.incomplete_classes.length > 0 &&
          this.showCompletedClasses(
            student_class_response.incomplete_classes,
            Constants.INCOMPLETE_CLASSES
          )} */}

        {currentSelectedKid != null &&
          currentSelectedKid.paid_status &&
          student_class_status &&
          !loading &&
          student_class_response.upcoming_classes.length < 1 &&
          student_class_response.completed_classes.length < 1 &&
          student_class_response.incomplete_classes.length < 1 && (
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <NoRecordFoundComponent
                title={
                  'Your class allocation is pending action by backend team. Once done it will show up here'
                }
                sub_title={'No worries- it gets done within 8-12 hours'}
              />
            </View>
          )}

        {!loading &&
          currentSelectedKid != null &&
          !currentSelectedKid.paid_status && (
            <View style={{flex: 1}}>
              <NoRecordDemoComponent
                title="Class not availble for Demo user"
                sub_title="Please subscribe for live class"
                onBuySubscription={this.onBuySubscription}
              />
            </View>
          )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state.authenticate,
    loading: state.dashboard.loading,
    currentSelectedKid: state.dashboard.current_selected_kid,
    student_class_response: state.dashboard.student_class_response,
    student_class_status: state.dashboard.student_class_status,
  };
};

const mapDispatchToProps = {};

const styles = StyleSheet.create({
  tabItem: {
    paddingBottom: normalize(8),
  },
  tabItemSelected: {
    paddingBottom: normalize(8),
    borderBottomColor: COLOR.TAB_BOTTOM_BLUE,
    borderBottomWidth: 2,
  },
  tabItemText: {
    color: COLOR.TEXT_COLOR_BLACK,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LiveClassSchedule);
