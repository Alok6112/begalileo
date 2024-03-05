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
import {
  getStudentCategoryClasses,
  getStudentCategoryClassesWithFilter,
  getStudentCategoryClassesWithDate,
} from '../../actions/dashboard';
import {IC_FILTER} from '../../assets/images';
import * as Config from '../../config/configs';
import {normalize, Card} from 'react-native-elements';
import {CustomBackButton} from '../../components';
import {
  getDisplayTimeHours,
  secondsToHms,
  getClassesDateFormat,
} from '../../components/helpers';
import NoRecordFoundComponent from '../../components/NoRecordFoundComponent';
import ReportFilterBottomDialog from '../../components/ReportFilterBottomDialog';
import moment from 'moment';
import {getParamNavigationV5} from '../../components/helpers/navigationV5Data';

class ClassListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classType: '',
      classList: [],
      showFilter: false,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.focusSubsription = navigation.addListener('focus', this.handleFocus);
    var classType = getParamNavigationV5(this.props, 'classType', '');
    console.log('classType', classType);
    this.setState({
      classType: classType,
    });
    // this.getStudentClasses(classType)
  }

  componentWillUnmount() {
    this.focusSubsription();
  }

  handleFocus = () => {
    this.getStudentClasses(this.state.classType);
  };

  onPressViewRecording = url => {
    this.props.navigation.navigate(Constants.VIEW_CLASS_RECORDING, {
      videoUrl: url,
    });
  };

  getClassType = classType => {
    if (classType == Constants.COMPLETED_CLASSES) return 'completed';
    else if (classType == Constants.INCOMPLETE_CLASSES) return 'incomplete';
    else if (classType == Constants.UPCOMING_CLASSES) return 'upcoming';
  };

  // onComponentFocus = () => {
  //   console.log('On Component Focus Class List Screen');
  //   this.getStudentClasses(this.state.classType);
  // };

  getStudentClasses = mClassType => {
    this.props.getStudentCategoryClasses(
      this.props.currentSelectedKid.student_id,
      this.getClassType(mClassType),
    );
  };

  onPressBack = () => {
    const {goBack} = this.props.navigation;

    goBack();
  };

  onPressClassItem = (clType, clData) => {
    this.props.navigation.navigate(Constants.ClassDetailsScreen, {
      classType: clType,
      classData: clData,
    });
  };

  showUpComingClasses = upComingClasses => {
    return (
      <View
        style={{
          backgroundColor: COLOR.WHITE,
          paddingStart: normalize(10),
          paddingEnd: normalize(10),
          paddingBottom: normalize(20),
          borderBottomStartRadius: 24,
          borderBottomEndRadius: 24,
        }}>
        {/* <Text style={[CommonStyles.text_14_bold, { marginBottom: normalize(10) }]}>UpComing Classes</Text>
                <TouchableOpacity onPress={() => this.onPressViewAll(Constants.UPCOMING_CLASSES, upComingClasses)} style={{ paddingStart: normalize(10), paddingEnd: normalize(10) }}>
                    <Text style={[CommonStyles.text_12__semi_bold, { color: COLOR.TEXT_COLOR_GREEN }]}>View All</Text>
                </TouchableOpacity> */}
        {upComingClasses.map((item, index) => {
          var classDate = getClassesDateFormat(item.start_date);
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
                <View style={{margin: normalize(16)}}>
                  <Text style={[CommonStyles.text_14_bold]}>{item.time}</Text>
                  <Text
                    style={[
                      CommonStyles.text_12_Regular,
                      {color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2)},
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

  showCompletedClasses = (completedClasses, classType) => {
    console.log('HHHHHHH ', classType);
    console.log(completedClasses);

    return (
      <View
        style={{
          backgroundColor: COLOR.WHITE,
          borderRadius: 24,
          paddingHorizontal: normalize(10),
          paddingVertical: normalize(5),
        }}>
        {completedClasses?.map((item, index) => {
          var classDate = getClassesDateFormat(item?.start_date);
          return (
            <TouchableOpacity
              onPress={() => this.onPressClassItem(classType, item)}
              style={{flexDirection: 'row', marginTop: normalize(10)}}>
              <View>
                <Text
                  style={[
                    CommonStyles.text_12_Regular,
                    {color: COLOR.TEXT_ALPHA_GREY},
                  ]}>
                  {item?.day.substring(0, 2)}
                </Text>
                <Text style={[CommonStyles.text_12_bold]}>
                  {item?.start_date.substring(0, 2)}
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
                <View style={{margin: normalize(16)}}>
                  <View>
                    {item?.class_lesson != '' && (
                      <Text
                        style={[
                          CommonStyles.text_14_bold,
                          {color: COLOR.TEXT_ALPHA_GREY},
                        ]}>
                        {item?.class_lesson}
                      </Text>
                    )}
                  </View>
                  <Text style={[CommonStyles.text_14_bold]}>{item?.time}</Text>
                  <Text
                    style={[
                      CommonStyles.text_12_Regular,
                      {color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2)},
                    ]}>
                    Teacher : {item?.teacher}
                  </Text>
                  {item?.recording_links?.length > 0 && (
                    <Pressable
                      onPress={() =>
                        this.onPressViewRecording(item?.recording_links[0])
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

              {
                // item.practice_details && item.practice_details.length > 0 ?
                // <View style={[CommonStyles.shadowContainer_border_20, { backgroundColor: COLOR.WHITE, flex: 1, marginStart: normalize(10) }]}>
                //     {
                //         item.practice_details.map((data) => {
                //             return (
                //                 <View style={{ margin: normalize(16) }}>
                //                     <Text style={[CommonStyles.text_14_bold]}>{data.tag_name}</Text>
                //                     {/* <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>{data.tag_name}</Text> */}
                //                     <View style={{ flexDirection: 'row', marginTop: normalize(8), alignItems: 'center' }}>
                //                         <Icon
                //                             style={{ marginStart: normalize(8) }}
                //                             size={15}
                //                             name='check'
                //                             color={COLOR.TEXT_COLOR_GREEN} />
                //                         <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>{data.correct}</Text>
                //                         <Icon
                //                             style={{ marginStart: normalize(8) }}
                //                             size={15}
                //                             name='times'
                //                             color={COLOR.RED} />
                //                         <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5) }]}>{data.incorrect}</Text>
                //                         <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(10) }]}>{secondsToHms(data.timespent)}</Text>
                //                     </View>
                //                 </View>
                //             )
                //         })
                //     }
                // </View> :
                // <View style={[CommonStyles.shadowContainer_border_20, { backgroundColor: COLOR.WHITE, flex: 1, marginStart: normalize(10) }]}>
                //     <View style={{ margin: normalize(16) }}>
                //         <Text style={[CommonStyles.text_14_bold]}>{item.time}</Text>
                //         <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2) }]}>Teacher : {item.teacher}</Text>
                //     </View>
                // </View>
              }
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  onClickApplyFilter = (fromDate, tillDate) => {
    console.log('From Date ' + fromDate);
    console.log('To Date : ' + tillDate);
    var start_date = moment(fromDate).format('DD-MM-YYYY');
    var end_date = moment(tillDate).format('DD-MM-YYYY');
    console.log(start_date, end_date);
    this.props.getStudentCategoryClassesWithDate(
      this.props.currentSelectedKid.student_id,
      this.getClassType(this.state.classType),
      start_date,
      end_date,
    );
    this.onCloseFilter();
  };

  onClickFilterDays = daysToFilter => {
    this.props.getStudentCategoryClassesWithFilter(
      this.props.currentSelectedKid.student_id,
      this.getClassType(this.state.classType),
      daysToFilter,
    );
    this.onCloseFilter();
  };

  resetFilters = () => {
    this.props.getStudentCategoryClasses(
      this.props.currentSelectedKid.student_id,
      this.getClassType(this.state.classType),
    );
    this.onCloseFilter();
  };

  onCloseFilter = () => {
    this.setState({
      showFilter: false,
    });
  };

  showFilterDialog = () => {
    this.setState({
      showFilter: true,
    });
  };

  showNoRecordFound = () => {
    return (
      <View
        style={{
          height: '100%',
          backgroundColor: COLOR.RED,
          justifyContent: 'center',
        }}>
        <Text
          style={[
            CommonStyles.text_12_bold,
            {color: COLOR.BLACK, alignSelf: 'center'},
          ]}>
          No Record Found..
        </Text>
      </View>
    );
  };

  render() {
    const {classList, classType, showFilter} = this.state;
    const {
      loading,
      student_category_class_response,
      student_category_class_status,
    } = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLOR.WHITE,
        }}>
        {/* <NavigationEvents onDidFocus={() => this.onComponentFocus()} /> */}
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View
            style={{
              marginStart: normalize(20),
              marginEnd: normalize(20),
              marginTop: normalize(10),
              marginBottom: normalize(20),
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <CustomBackButton onPress={this.onPressBack} />

              <TouchableOpacity
                onPress={this.showFilterDialog}
                style={{padding: 10}}>
                <Image
                  style={{
                    height: normalize(20),
                    width: normalize(20),
                    resizeMode: 'contain',
                    alignSelf: 'center',
                  }}
                  source={IC_FILTER}
                />
              </TouchableOpacity>
            </View>

            <Text
              style={[
                CommonStyles.text_18_semi_bold,
                {color: COLOR.TEXT_COLOR_BLUE, marginTop: normalize(2)},
              ]}>
              {classType.slice(0, -2)}
            </Text>
            {student_category_class_status && (
              <View>
                {classType == Constants.UPCOMING_CLASSES &&
                  student_category_class_response.upcoming_classes &&
                  this.showUpComingClasses(
                    student_category_class_response.upcoming_classes,
                  )}
                {classType == Constants.COMPLETED_CLASSES &&
                  student_category_class_response.completed_classes &&
                  this.showCompletedClasses(
                    student_category_class_response.completed_classes,
                    classType,
                  )}
                {classType == Constants.INCOMPLETE_CLASSES &&
                  student_category_class_response.incomplete_classes &&
                  this.showCompletedClasses(
                    student_category_class_response.incomplete_classes,
                    classType,
                  )}
              </View>
            )}
          </View>
        </ScrollView>

        {loading && (
          <ActivityIndicator
            size="large"
            color="black"
            style={CommonStyles.loadingIndicatior}
          />
        )}
        {classType == Constants.COMPLETED_CLASSES &&
          student_category_class_status &&
          student_category_class_response.completed_classes &&
          student_category_class_response.completed_classes.length < 1 && (
            <View
              style={{
                position: 'absolute',
                top: 200,
                bottom: 0,
                left: 0,
                right: 0,
              }}>
              <NoRecordFoundComponent title={'No Classes Found'} />
            </View>
          )}
        {classType == Constants.INCOMPLETE_CLASSES &&
          student_category_class_status &&
          student_category_class_response.completed_classes &&
          student_category_class_response.incomplete_classes.length < 1 && (
            <View
              style={{
                position: 'absolute',
                top: 200,
                bottom: 0,
                left: 0,
                right: 0,
              }}>
              <NoRecordFoundComponent title={'No Classes Found'} />
            </View>
          )}
        {classType == Constants.UPCOMING_CLASSES &&
          student_category_class_status &&
          student_category_class_response.completed_classes &&
          student_category_class_response.upcoming_classes.length < 1 && (
            <View
              style={{
                position: 'absolute',
                top: 200,
                bottom: 0,
                left: 0,
                right: 0,
              }}>
              <NoRecordFoundComponent title={'No Classes Found'} />
            </View>
          )}
        {showFilter && (
          <ReportFilterBottomDialog
            classType={classType}
            onCloseFilter={this.onCloseFilter}
            onClickApplyFilter={this.onClickApplyFilter}
            onClickFilterDays={this.onClickFilterDays}
            resetFilters={this.resetFilters}
          />
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
    student_category_class_response:
      state.dashboard.student_category_class_response,
    student_category_class_status:
      state.dashboard.student_category_class_status,
  };
};

const mapDispatchToProps = {
  getStudentCategoryClasses,
  getStudentCategoryClassesWithDate,
  getStudentCategoryClassesWithFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassListScreen);
