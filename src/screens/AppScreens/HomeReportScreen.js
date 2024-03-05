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
  Modal,
} from 'react-native';
import {connect} from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import {
  COLOR,
  CommonStyles,
  BAR_CHART_COLORS,
  BAR_CHART_COLOR_LINES,
} from '../../config/styles';
import {
  IC_CLOSE_BLUE,
  IC_DOWN_ENTER,
  IC_ACCURACY,
  IC_TIME_SPENT,
  IC_STARS_EARN,
  IC_BADGES_EARNED_1,
  IC_BADGES_EARNED_2,
  IC_BANNER_1,
} from '../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import {addToCart} from '../../actions/dashboard';
import Icon from 'react-native-vector-icons/FontAwesome';
import {timeInHourFormat} from '../../components/helpers/CustomUtilMethods';
import {
  getDashboardItems,
  getStudentReportData,
  getStudentActivity,
} from '../../actions/dashboard';
import {CustomBackButton} from '../../components';
import {normalize, Card} from 'react-native-elements';
import DashboardHeader from '../../components/DashboardHeader';
import PieChartScreen from '../../components/PieChartScreen';
import BarChartScreen from '../../components/BarChartScreen';
import ComponentActivityItem from '../../components/ComponentActivityItem';
import ComponentSpeedMathListItem from '../../components/ComponentSpeedMathListItem';
import {ReportListDateItem} from '../../components';
import NoRecordFoundComponent from '../../components/NoRecordFoundComponent';
import SearchingRecordComponent from '../../components/SearchingRecordComponent';
import {getLocalData} from '../../components/helpers/AsyncMethods';
import {List} from 'react-native-paper';
import AcitivityReportList from '../ReportScreens/AcitivityReportList';
import ReportFilterBottomDialog from '../../components/ReportFilterBottomDialog';
import ReportDaySelector from '../../components/ReportDaySelector';
import NoRecordDemoComponent from '../../components/NoRecordDemoComponent';

const listFilterDays = [7, 30, 60];

class HomeReportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAccuracyChart: false,
      showTimeSpentChart: false,
      currentSelectedKid: [],
      filterExpanded: false,
      currentFilterDays: 7,
      accuracyChartData: [
        {
          name: 'Math Topic',
          datas_7: [50, 15, 40, 27, 30, 12, 20, 46, 25, 78, 45, 23, 65, 33, 80],
        },
        {
          name: 'Think and reason',
          datas_7: [50, 15, 40, 27, 30, 12, 20, 46, 25, 78, 45, 23, 65, 33, 80],
        },
      ],
    };
  }

  componentDidMount() {
    console.log('Report Screen component mount');
    this.checkReportDatas();
    this.checkActivtiyDatas();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentSelectedKid != undefined) {
      if (this.props.currentSelectedKid != null) {
        if (
          this.props.currentSelectedKid.student_id !==
          prevProps.currentSelectedKid.student_id
        ) {
          //   this.checkDashboardItems();
          this.checkReportDatas();
          this.checkActivtiyDatas();
        }
      }
    }
  }
  checkDashboardItems = () => {
    getLocalData(Constants.ParentUserId).then(parentId => {
      console.log('Parent Id ' + parentId);
      this.props.getDashboardItems(
        parentId,
        'India',
        this.props.currentSelectedKid.student_id,
      );
    });
  };

  checkReportDatas = () => {
    //this.props.getStudentReportData(53499, 7);
    console.log(
      'Checking Report Datas : ' + this.props.currentSelectedKid.student_id,
      this.state.currentFilterDays,
    );
    this.props.getStudentReportData(
      this.props.currentSelectedKid.student_id,
      this.state.currentFilterDays,
    );
  };

  checkActivtiyDatas = () => {
    console.log('Checking Activity Datas');
    this.props.getStudentActivity(
      this.props.dashboardResponse.parent_id,
      this.props.currentSelectedKid.student_id,
      7,
    );

    //  this.props.getStudentActivity(50606, 53499, 7);
  };

  changeAccuracyChartView = () => {
    console.log('Show Chart');
    if (this.state.showAccuracyChart) {
      this.setState({
        showAccuracyChart: false,
      });
    } else {
      this.setState({
        showAccuracyChart: true,
      });
    }
  };
  changeTimeSpentChartView = () => {
    if (this.state.showTimeSpentChart) {
      this.setState({
        showTimeSpentChart: false,
      });
    } else {
      this.setState({
        showTimeSpentChart: true,
      });
    }
  };

  onPressStarEarned = starsColl => {
    this.props.navigation.navigate(Constants.StarBadgeReportScreen, {
      showStar: true,
      collectedStars: starsColl,
    });
  };

  onPressBadgeEarned = () => {
    this.props.navigation.navigate(Constants.StarBadgeReportScreen, {
      showStar: false,
    });
  };

  onPressViewAllActivity = () => {
    this.props.navigation.navigate(Constants.OverallActivitiesScreen);
  };

  onPressFilter = () => {
    this.setState({
      filterExpanded: !this.state.filterExpanded,
    });
  };

  filterDatas = e => {
    console.log('Filter days ' + e);
    this.setState(
      {
        filterExpanded: false,
        currentFilterDays: e,
      },
      this.checkReportDatas,
    );
  };

  closeFilterDays = () => {
    this.setState({
      filterExpanded: false,
    });
  };

  showFilterList = () => {
    const {currentFilterDays} = this.state;

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginStart: 20,
          marginEnd: 20,
        }}>
        <TouchableOpacity
          onPress={() => this.filterDatas(7)}
          style={
            currentFilterDays == 7 ? styles.dayButtonSelected : styles.dayButton
          }>
          <Text
            style={[
              CommonStyles.text_12__semi_bold,
              {color: currentFilterDays == 7 ? COLOR.WHITE : COLOR.BLUE_LINk},
            ]}>
            7 Days
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.filterDatas(30)}
          style={
            currentFilterDays == 30
              ? styles.dayButtonSelected
              : styles.dayButton
          }>
          <Text
            style={[
              CommonStyles.text_12__semi_bold,
              {
                color: currentFilterDays == 30 ? COLOR.WHITE : COLOR.BLUE_LINk,
              },
            ]}>
            30 Days
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.filterDatas(60)}
          style={
            currentFilterDays == 60
              ? styles.dayButtonSelected
              : styles.dayButton
          }>
          <Text
            style={[
              CommonStyles.text_12__semi_bold,
              {
                color: currentFilterDays == 60 ? COLOR.WHITE : COLOR.BLUE_LINk,
              },
            ]}>
            60 Days
          </Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <View>
        <List.Accordion
          title={'Last ' + currentFilterDays + ' days'}
          left={props => <List.Icon {...props} icon="calendar" />}
          expanded={this.state.filterExpanded}
          onPress={this.onPressFilter}>
          {listFilterDays.map(item => {
            var title = 'Last ' + item + ' days';
            if (item != currentFilterDays)
              return (
                <List.Item
                  title={title}
                  onPress={() => this.filterDatas(item)}
                />
              );
          })}
        </List.Accordion>
      </View>
    );
  };

  showTimeSpentCard = () => {
    const {currentSelectedKid, studentReportStatus, studentReportResponse} =
      this.props;
    const {showTimeSpentChart} = this.state;
    return (
      <TouchableOpacity
        onPress={this.changeTimeSpentChartView}
        style={[
          CommonStyles.boxShadow,
          {
            backgroundColor: COLOR.WHITE,
            marginTop: normalize(20),
            marginHorizontal: 10,
            borderRadius: 20,
          },
        ]}>
        <Image
          style={{
            height: normalize(32),
            width: normalize(32),
            marginTop: normalize(16),
            marginStart: normalize(16),
            resizeMode: 'contain',
          }}
          source={IC_TIME_SPENT}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
            marginTop: normalize(8),
            marginStart: normalize(16),
          }}>
          <View style={{flex: 1}}>
            <Text style={[CommonStyles.text_14_bold]}>Time Spent</Text>
            {studentReportStatus &&
            timeInHourFormat(studentReportResponse.total_time_spent) == '0' ? (
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  {marginTop: normalize(2)},
                ]}>
                No time spent...
              </Text>
            ) : (
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  {marginTop: normalize(2)},
                ]}>
                Total time spend
              </Text>
            )}
          </View>
          {studentReportStatus &&
            timeInHourFormat(studentReportResponse.total_time_spent) != '0' && (
              <View style={{flex: 1, alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                  <Text style={[CommonStyles.text_16_regular]}>
                    {timeInHourFormat(studentReportResponse.total_time_spent)}
                  </Text>
                </View>
                {/* <Text style={[CommonStyles.text_12_Regular, { marginTop: normalize(2) }]}>Last 7 days</Text> */}
              </View>
            )}
        </View>
        <View style={{marginTop: normalize(12), marginBottom: normalize(20)}}>
          {showTimeSpentChart ? (
            <View
              style={{marginStart: normalize(16), marginEnd: normalize(16)}}>
              <View style={[CommonStyles.greyLineSeprator]} />

              <View style={{paddingVertical: normalize(20)}}>
                {studentReportStatus && (
                  <PieChartScreen
                    accuracyData={
                      this.props.studentReportResponse.percentage_data
                    }
                  />
                )}
              </View>
            </View>
          ) : (
            <View />
          )}
          {studentReportStatus &&
            timeInHourFormat(studentReportResponse.total_time_spent) != '0' && (
              <TouchableOpacity
                onPress={this.changeTimeSpentChartView}
                style={{padding: normalize(20)}}>
                {showTimeSpentChart ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                      size={22}
                      name="angle-up"
                      color={COLOR.TEXT_COLOR_BLUE}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                      size={22}
                      name="angle-down"
                      color={COLOR.TEXT_COLOR_BLUE}
                    />
                  </View>
                )}
              </TouchableOpacity>
            )}
        </View>
      </TouchableOpacity>
    );
  };

  showAccuracyCard = () => {
    const {currentSelectedKid, studentReportStatus, studentReportResponse} =
      this.props;
    const {showAccuracyChart} = this.state;
    return (
      <TouchableOpacity
        onPress={this.changeAccuracyChartView}
        style={[
          CommonStyles.boxShadow,
          {
            backgroundColor: COLOR.WHITE,
            marginHorizontal: 10,
            borderRadius: 20,
          },
        ]}>
        <Image
          style={{
            height: normalize(32),
            width: normalize(32),
            marginTop: normalize(16),
            marginStart: normalize(16),
            resizeMode: 'contain',
          }}
          source={IC_ACCURACY}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
            marginTop: normalize(8),
            marginStart: normalize(16),
            marginBottom: normalize(8),
          }}>
          <View style={{flex: 1}}>
            <Text style={[CommonStyles.text_14_bold]}>Accuracy</Text>
            <Text
              style={[CommonStyles.text_12_Regular, {marginTop: normalize(5)}]}>
              Average of correct answers given by kid
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
              {studentReportStatus ? (
                <Text style={[CommonStyles.text_18_regular]}>
                  {studentReportResponse.total_accuracy.toFixed(2)}
                </Text>
              ) : (
                <Text style={[CommonStyles.text_18_regular]}>
                  {currentSelectedKid.activity_details.accuracy.toFixed(2)}
                </Text>
              )}

              <Text style={[CommonStyles.text_12_Regular, {}]}> %</Text>
              {/* <Icon
                                style={{ marginStart: normalize(8) }}
                                size={15}
                                name='arrow-up'
                                color={COLOR.TEXT_COLOR_GREEN} /> */}
            </View>
            {/* <Text style={[CommonStyles.text_12_Regular, { marginTop: normalize(2) }]}>Last 7 days</Text> */}
          </View>
        </View>
        <View style={{marginTop: normalize(12), marginBottom: normalize(20)}}>
          {showAccuracyChart ? (
            <View
              o
              style={{marginStart: normalize(16), marginEnd: normalize(16)}}>
              <View style={[CommonStyles.greyLineSeprator]} />

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: normalize(20),
                  justifyContent: 'space-between',
                }}>
                <View>
                  {/* {
                                        this.showAccuracyChartData()
                                    } */}
                  <Text
                    style={[
                      CommonStyles.text_9_regular,
                      {color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2)},
                    ]}></Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          height: normalize(4),
                          width: normalize(16),
                          backgroundColor: BAR_CHART_COLOR_LINES[0],
                          alignSelf: 'center',
                          borderRadius: normalize(20),
                        }}
                      />
                      <Text
                        style={[
                          CommonStyles.text_12_regular,
                          {alignSelf: 'center', marginStart: normalize(8)},
                        ]}>
                        Math topic
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          height: normalize(4),
                          width: normalize(16),
                          backgroundColor: BAR_CHART_COLOR_LINES[1],
                          alignSelf: 'center',
                          borderRadius: normalize(20),
                        }}
                      />
                      <Text
                        style={[
                          CommonStyles.text_12_regular,
                          {marginStart: normalize(8)},
                        ]}>
                        Think and reason
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{marginTop: normalize(5)}}>
                {this.props.studentReportStatus && (
                  <BarChartScreen
                    accuracyData={this.props.studentReportResponse.report_data}
                  />
                )}
              </View>
            </View>
          ) : (
            <View />
          )}
          {studentReportStatus && studentReportResponse.total_accuracy > 0 && (
            <TouchableOpacity
              onPress={this.changeAccuracyChartView}
              style={{padding: normalize(10)}}>
              {showAccuracyChart ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    size={22}
                    name="angle-up"
                    color={COLOR.TEXT_COLOR_BLUE}
                  />
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    size={22}
                    name="angle-down"
                    color={COLOR.TEXT_COLOR_BLUE}
                  />
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  mathZone = mathZoneData => {
    return (
      <View style={{marginTop: 12}}>
        <Text
          style={[CommonStyles.text_8_regular, {color: COLOR.TEXT_ALPHA_GREY}]}>
          Math Zone
        </Text>
        <View
          style={[
            CommonStyles.shadowContainer_border_20,
            {backgroundColor: COLOR.WHITE, marginTop: normalize(8)},
          ]}>
          {mathZoneData.map(item => {
            return (
              <View style={{margin: normalize(16)}}>
                <Text style={[CommonStyles.text_14_bold]}>{item.tag}</Text>
                <Text
                  style={[
                    CommonStyles.text_12_Regular,
                    {color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2)},
                  ]}>
                  {item.sub_concept}
                </Text>
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
                    {item.correct}
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
                    {item.incorrect}
                  </Text>
                  <Text
                    style={[
                      CommonStyles.text_12_Regular,
                      {
                        color: COLOR.TEXT_ALPHA_GREY,
                        marginStart: normalize(10),
                      },
                    ]}>
                    {item.timespent} hrs
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  logicZone = logicZoneData => {
    return (
      <View style={{marginTop: 12}}>
        <Text
          style={[CommonStyles.text_8_regular, {color: COLOR.TEXT_ALPHA_GREY}]}>
          Logic Zone
        </Text>
        <View
          style={[
            CommonStyles.shadowContainer_border_20,
            {backgroundColor: COLOR.WHITE, marginTop: normalize(8)},
          ]}>
          {logicZoneData.map(item => {
            return (
              <View style={{margin: normalize(16)}}>
                <Text style={[CommonStyles.text_14_bold]}>{item.tag}</Text>
                <Text
                  style={[
                    CommonStyles.text_12_Regular,
                    {color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2)},
                  ]}>
                  {item.sub_concept}
                </Text>
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
                    {item.correct}
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
                    {item.incorrect}
                  </Text>
                  <Text
                    style={[
                      CommonStyles.text_12_Regular,
                      {
                        color: COLOR.TEXT_ALPHA_GREY,
                        marginStart: normalize(10),
                      },
                    ]}>
                    {item.timespent} hrs
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  lastPracticeDetails = lastPracticeData => {
    return (
      <View>
        {lastPracticeData.home_practice_details.length > 0 && (
          <View style={{marginTop: 12}}>
            <Text
              style={[
                CommonStyles.text_8_regular,
                {color: COLOR.TEXT_ALPHA_GREY},
              ]}>
              Home Practice
            </Text>
            <View
              style={[
                CommonStyles.shadowContainer_border_20,
                {backgroundColor: COLOR.WHITE, marginTop: normalize(8)},
              ]}>
              {lastPracticeData.home_practice_details.map(item => {
                return (
                  <View style={{margin: normalize(16)}}>
                    <Text style={[CommonStyles.text_14_bold]}>
                      {item.tag_name}
                    </Text>
                    <Text
                      style={[
                        CommonStyles.text_12_Regular,
                        {
                          color: COLOR.TEXT_ALPHA_GREY,
                          marginTop: normalize(2),
                        },
                      ]}>
                      {item.sub_concept_name}
                    </Text>
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
                        {item.correct}
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
                        {item.total - item.correct}
                      </Text>
                      {/* <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(10) }]}>{item.timespent} hrs</Text> */}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {lastPracticeData.class_practice_details.length > 0 && (
          <View style={{marginTop: 12}}>
            <Text
              style={[
                CommonStyles.text_8_regular,
                {color: COLOR.TEXT_ALPHA_GREY},
              ]}>
              Class Practice
            </Text>
            <View
              style={[
                CommonStyles.shadowContainer_border_20,
                {backgroundColor: COLOR.WHITE, marginTop: normalize(8)},
              ]}>
              {lastPracticeData.class_practice_details.map(item => {
                return (
                  <View style={{margin: normalize(16)}}>
                    <Text style={[CommonStyles.text_14_bold]}>
                      {item.tag_name}
                    </Text>
                    <Text
                      style={[
                        CommonStyles.text_12_Regular,
                        {
                          color: COLOR.TEXT_ALPHA_GREY,
                          marginTop: normalize(2),
                        },
                      ]}>
                      {item.sub_concept_name}
                    </Text>
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
                        {item.correct}
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
                        {item.total - item.correct}
                      </Text>
                      {/* <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(10) }]}>{item.timespent} hrs</Text> */}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </View>
    );
  };

  recentActivity = () => {
    const {currentSelectedKid} = this.props;
    return (
      <View style={{marginTop: normalize(16)}}>
        <Text style={[CommonStyles.text_14_bold]}>Recent Activity</Text>

        {this.lastPracticeDetails(currentSelectedKid.activity_details)}
        {currentSelectedKid.activity_details.mathzone.length > 0 &&
          this.mathZone(currentSelectedKid.activity_details.mathzone)}
        {currentSelectedKid.activity_details.logical_zone.length > 0 &&
          this.logicZone(currentSelectedKid.activity_details.logical_zone)}

        {/* <View style={{ flexDirection: 'row', marginTop: normalize(20), alignSelf: 'center' }}>
                    <Image style={{ height: normalize(16), width: normalize(16), alignSelf: 'center', resizeMode: 'contain' }} source={IC_ACTIVITY} />
                    <Text style={[CommonStyles.text_12_bold, { color: COLOR.TEXT_COLOR_GREEN, marginStart: normalize(8) }]}>View All Activites</Text>
                </View>


                <View style={{ marginTop: normalize(20), marginBottom: normalize(20) }}>
                    <Text style={[CommonStyles.text_14_bold]}>
                        Currently Learning
                    </Text>
                    <View style={[CommonStyles.shadowContainer_border_20, { marginTop: normalize(20), marginStart: normalize(1), marginEnd: normalize(1) }]}>
                        <View style={{ margin: normalize(16) }}>
                            <Text style={[CommonStyles.text_8_bold, { color: COLOR.TEXT_ALPHA_GREY }]}>MATH CONCEPT</Text>
                            <Text style={[CommonStyles.text_14_bold, { marginTop: normalize(2) }]}>Numbers upto 10</Text>

                            <View style={{ flexDirection: 'row', marginTop: normalize(8), justifyContent: 'space-evenly' }}>
                                <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY }]}>6 Sub Concepts</Text>
                                <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_ALPHA_GREY }]}>1 Concept Test</Text>
                            </View>
                            <View style={{ marginTop: normalize(20) }}>
                                <Progress.Bar progress={0.5} width={normalize(230)} color={COLOR.TEXT_COLOR_GREEN} />
                                <Text style={[CommonStyles.text_9_regular, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(8) }]}>50% Completed</Text>
                            </View>

                        </View>

                    </View>

                </View> */}
      </View>
    );
  };

  textNoRecordMessage = () => {};

  noReportSubTitle = () => {
    return 'For last ' + this.state.currentFilterDays + ' days';
  };

  showAllReportDatas = () => {
    const {currentSelectedKid, studentActivityStatus, studentReportResponse} =
      this.props;
    console.log('Student Report Response', studentReportResponse);
    return (
      <View style={{flex: 1}}>
        {studentReportResponse.total_time_spent == '00:00:00' &&
        studentReportResponse.total_accuracy == 0.0 ? (
          <NoRecordFoundComponent
            title="No Report is generated "
            sub_title={this.noReportSubTitle()}
          />
        ) : (
          <View>
            <View
              style={{
                paddingVertical: normalize(10),
                borderRadius: normalize(20),
                marginTop: normalize(10),
              }}>
              {this.showAccuracyCard()}
              {this.showTimeSpentCard()}
            </View>

            {/* {
                            this.recentActivity()
                        } */}
          </View>
        )}
      </View>
    );
  };

  renderStarAndBadge = () => {
    const {studentReportResponse} = this.props;
    return (
      <View
        style={{
          height: normalize(48),
          flexDirection: 'row',
          marginTop: normalize(20),
          marginHorizontal: 20,
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity
          disabled={false}
          onPress={() => this.onPressStarEarned(studentReportResponse.stars)}
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: COLOR.BG_YELLOW,
            borderRadius: normalize(24),
            justifyContent: 'space-between',
          }}>
          <Image
            style={{
              height: normalize(24),
              width: normalize(24),
              resizeMode: 'contain',
              margin: normalize(13),
            }}
            source={IC_STARS_EARN}
          />
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[CommonStyles.text_12_bold]}>
              {studentReportResponse.stars}
            </Text>
            <Text
              style={[
                CommonStyles.text_12_Regular,
                {color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(8)},
              ]}>
              Stars
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={false}
          onPress={this.onPressBadgeEarned}
          style={{
            flex: 1,
            flexDirection: 'row',
            backgroundColor: COLOR.BG_PURPLE,
            borderRadius: normalize(24),
            justifyContent: 'space-between',
            marginStart: normalize(10),
          }}>
          <View style={{flexDirection: 'row', margin: normalize(13)}}>
            <Image
              style={{
                height: normalize(24),
                width: normalize(24),
                resizeMode: 'contain',
                position: 'absolute',
              }}
              source={IC_BADGES_EARNED_1}
            />
            <Image
              style={{
                height: normalize(24),
                width: normalize(24),
                resizeMode: 'contain',
                marginStart: normalize(10),
              }}
              source={IC_BADGES_EARNED_2}
            />
          </View>

          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[CommonStyles.text_12_bold]}>
              {studentReportResponse.badges}
            </Text>
            <Text
              style={[
                CommonStyles.text_12_Regular,
                {color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(8)},
              ]}>
              Badges
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  listAcitivityItem = activityData => {
    console.log('activityData', activityData);
    return activityData.map(item => {
      return item.home_concepts.length > 0 ||
        item.class_concepts.length > 0 ||
        item.home_think_n_reasons.length > 0 ||
        item.class_think_n_reasons.length > 0 ||
        item.speedmath.length > 0 ? (
        <View style={{flexDirection: 'row', marginTop: normalize(20)}}>
          <ReportListDateItem itemDay={item.day} />
          <View
            style={{
              flex: 1,
              marginStart: normalize(20),
              marginEnd: normalize(2),
            }}>
            {(item.home_concepts.length > 0 ||
              item.class_concepts.length > 0) && (
              <Text
                style={[
                  CommonStyles.text_8_regular,
                  {color: COLOR.TEXT_ALPHA_GREY},
                ]}>
                Math Concept
              </Text>
            )}

            {item.home_concepts.length > 0 && (
              <View>
                {item.home_concepts.map(homeConceptData => {
                  return (
                    <ComponentActivityItem conceptData={homeConceptData} />
                  );
                })}
              </View>
            )}

            {item.class_concepts.length > 0 && (
              <View>
                {item.class_concepts.map(homeConceptData => {
                  return (
                    <ComponentActivityItem conceptData={homeConceptData} />
                  );
                })}
              </View>
            )}

            {(item.home_think_n_reasons.length > 0 ||
              item.class_think_n_reasons.length > 0) && (
              <Text
                style={[
                  CommonStyles.text_8_regular,
                  {color: COLOR.TEXT_ALPHA_GREY},
                ]}>
                Think and Reason
              </Text>
            )}

            {item.home_think_n_reasons.length > 0 && (
              <View>
                {item.home_think_n_reasons.map(reasonData => {
                  return <ComponentActivityItem conceptData={reasonData} />;
                })}
              </View>
            )}

            {item.class_think_n_reasons.length > 0 && (
              <View>
                {item.class_think_n_reasons.map(reasonData => {
                  return <ComponentActivityItem conceptData={reasonData} />;
                })}
              </View>
            )}
            {item.speedmath.length > 0 && (
              <Text
                style={[
                  CommonStyles.text_8_regular,
                  {color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(5)},
                ]}>
                Speed Math
              </Text>
            )}
            {item.speedmath.length > 0 && (
              <View>
                {item.speedmath.map(speedMathData => {
                  return (
                    <ComponentSpeedMathListItem conceptData={speedMathData} />
                  );
                })}
              </View>
            )}
          </View>
        </View>
      ) : (
        <View></View>
      );
    });
  };

  recentAcitivityScreeen = () => {
    const activityDatas = this.props.studentActivityReport;

    return (
      <View
        style={{
          backgroundColor: COLOR.WHITE,
          borderRadius: normalize(24),
          marginTop: normalize(40),
        }}>
        <View
          style={{
            marginTop: normalize(32),
            marginStart: normalize(20),
            marginEnd: normalize(20),
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[CommonStyles.text_14_bold]}>7 Days Activity</Text>
              <Text
                style={[
                  CommonStyles.text_12_regular,
                  {color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(8)},
                ]}>
                (7)
              </Text>
            </View>
            <TouchableOpacity onPress={this.onPressViewAllActivity}>
              <Text
                style={[
                  CommonStyles.text_12_bold,
                  {alignSelf: 'center', color: COLOR.TEXT_COLOR_GREEN},
                ]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', marginTop: normalize(20)}}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={[CommonStyles.text_18_bold]}>
                {activityDatas.problems_solved}
              </Text>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  {color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2)},
                ]}>
                Problems Answered
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={[CommonStyles.text_18_bold]}>
                {activityDatas.correct}
              </Text>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  {color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2)},
                ]}>
                Correct Answers
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={[CommonStyles.text_18_bold]}>
                {activityDatas.incorrect}
              </Text>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  {color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2)},
                ]}>
                Incorrect Answers
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: normalize(16),
            marginStart: normalize(20),
            marginEnd: normalize(20),
            marginBottom: normalize(20),
          }}>
          <AcitivityReportList />
          {/* {

                        this.listAcitivityItem(activityDatas.activity_data)
                    } */}
        </View>
      </View>
    );
  };
  onPressBack = () => {
    const {goBack} = this.props.navigation;
    console.log('ON BACK PRESS');
    goBack();
  };

  onBuySubscription = () => {
    this.props.navigation.navigate(Constants.ShowSubscriptions);
  };

  render() {
    const {
      currentSelectedKid,
      studentReportStatus,
      studentActivityStatus,
      studentActivityReport,
      loading,
    } = this.props;
    const {
      showTimeSpentChart,
      showAccuracyChart,
      accuracyChartData,
      filterExpanded,
    } = this.state;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLOR.BG_FAQ_GRERY,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            {/* <CustomBackButton onPress={this.onPressBack} /> */}
            <DashboardHeader
              headerTitle="Report"
              headerDescription="See your kids progress"
              navigation={this.props.navigation}
              paidStudentName={
                this.props?.currentSelectedKid?.account_type === 'paid'
                  ? this.props?.currentSelectedKid.name
                  : ''
              }
            />
            {!loading &&
              studentReportStatus &&
              currentSelectedKid != null &&
              currentSelectedKid.paid_status && (
                <View style={{flex: 1}}>
                  {this.renderStarAndBadge()}
                  {this.props.current_selected_role == Constants.PARENT &&
                    this.showFilterList()}
                  {this.props.current_selected_role == Constants.PARENT &&
                    this.showAllReportDatas()}
                </View>
              )}
            {/* {
                            !loading && studentReportStatus && currentSelectedKid.paid_status &&
                            this.showFilterList()
                        }

                        {
                            !loading && studentReportStatus && currentSelectedKid.paid_status &&

                            this.showAllReportDatas()

                        } */}
            {!loading &&
              currentSelectedKid != null &&
              !currentSelectedKid.paid_status && (
                <View style={{flex: 1}}>
                  <NoRecordDemoComponent
                    title="Report unavailble for Demo user"
                    sub_title="Please subscribe for subscription"
                    onBuySubscription={this.onBuySubscription}
                  />
                </View>
              )}

            {loading && (
              <SearchingRecordComponent
                title="Searching..."
                sub_title="Fetching reports"
              />
            )}

            {!loading &&
              studentActivityStatus &&
              this.props.current_selected_role == Constants.PARENT &&
              studentActivityReport.problems_solved > 1 &&
              this.recentAcitivityScreeen()}

            {filterExpanded && (
              <Modal
                animationType="slide"
                transparent={true}
                visible={filterExpanded}>
                <View
                  style={{
                    height: '40%',
                    width: '100%',
                    borderTopLeftRadius: normalize(10),
                    borderTopRightRadius: normalize(10),
                    backgroundColor: COLOR.BORDER_COLOR_GREEN,
                    position: 'absolute',
                    bottom: 0,
                  }}>
                  <TouchableOpacity onPress={this.closeFilterDays}>
                    <Image
                      source={IC_CLOSE_BLUE}
                      style={{
                        marginTop: 10,
                        marginEnd: 10,
                        height: 40,
                        width: 40,
                        resizeMode: 'contain',
                        justifyContent: 'flex-end',
                        alignSelf: 'flex-end',
                      }}
                    />
                  </TouchableOpacity>

                  <ReportDaySelector onPressFilterDays={this.filterDatas} />
                </View>
              </Modal>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.dashboard.student_report_response);
  return {
    state: state.dashboard,
    loading: state.dashboard.loading,
    cartItems: state.dashboard.cartItems,
    dashboardResponse: state.dashboard.dashboard_response,
    studentReportStatus: state.dashboard.student_report_status,
    studentReportResponse: state.dashboard.student_report_response,
    currentSelectedKid: state.dashboard.current_selected_kid,
    studentActivityStatus: state.dashboard.student_activity_report_status,
    studentActivityReport: state.dashboard.student_activity_report_response,
    current_selected_role: state.dashboard.current_selected_role,
  };
};

const mapDispatchToProps = {
  getDashboardItems,
  getStudentReportData,
  getStudentActivity,
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
  dayButton: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: COLOR.WHITE,
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(12),
    borderRadius: normalize(24),
    textAlign: 'center',
  },
  dayButtonSelected: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: COLOR.BORDER_COLOR_GREEN,
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(20),
    borderRadius: normalize(24),
    textAlign: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeReportScreen);
