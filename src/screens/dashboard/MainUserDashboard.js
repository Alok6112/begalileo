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
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import {COLOR, CommonStyles} from '../../config/styles';
import {AVATAR_TEACHER} from '../../assets/images';
import Icon from 'react-native-vector-icons/FontAwesome';
import {normalize, Card} from 'react-native-elements';

import NewUserScreen from './NewUserScreen';
import PaidUserScreen from './PaidUserScreen';

class MainUserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceDetails: [],
      parentName: '',
      currentKid: null,
      isPaidUser: false,
      checkingInitialState: undefined,
    };
  }

  componentDidMount() {
    console.log('componentDidMount h1h1h1h1h1h1h main user screen');
    this.renderDashboardData();
  }

  getCurrentSelectedKidData = () => {
    if (this.props.dashboardResponse != undefined) {
      this.props.dashboardResponse.students.map(item => {
        if (item.selected_student) {
          this.setState({
            currentKid: item,
          });
        }
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.addCartStatus != this.props.addCartStatus) {
      if (this.props.addCartStatus) {
        console.log('Add Cart Status');
      }
    }

    if (prevProps.currentSelectedKid != this.props.currentSelectedKid) {
      // console.log(this.props.currentSelectedKid.name);
      // this.renderDashboardData();
    }
    if (prevProps.dashboardStatus != this.props.dashboardStatus) {
      this.renderDashboardData();
    }
  }

  renderDashboardData = () => {
    var selectedStudent = null;
    if (this.props.dashboardStatus) {
      this.props.dashboardResponse.students.map(item => {
        if (item.selected_student) {
          selectedStudent = item;
        }
      });
    }

    if (selectedStudent != null) {
      if (selectedStudent.paid_status) {
        this.props?.checkPaidStudentName(selectedStudent?.name);

        this.setState({
          isPaidUser: true,
          checkingInitialState: true,
        });
      } else {
        this.setState({
          isPaidUser: false,
          checkingInitialState: false,
        });
      }
    }
  };

  onTeacherProfile = item => {
    this.props.navigation.navigate(Constants.TeacherProfile, {
      teacherData: item,
    });
  };

  onPressCompleteProfile = () => {
    this.props.navigation.navigate(Constants.MoreProfileScreen);
  };

  teacherCard = data => {
    return data.map(item => {
      return (
        <View
          style={{
            marginTop: normalize(10),
            marginBottom: normalize(10),
            backgroundColor: COLOR.WHITE,
            padding: normalize(10),
            borderRadius: normalize(15),
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{
                height: normalize(70),
                width: normalize(70),
                alignSelf: 'center',
                resizeMode: 'contain',
                marginStart: normalize(8),
                marginTop: normalize(8),
              }}
              source={AVATAR_TEACHER}
            />
            <View
              style={{
                marginTop: normalize(8),
                marginStart: normalize(10),
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  CommonStyles.text_8_bold,
                  {color: COLOR.TEXT_ALPHA_GREY},
                ]}>
                Teacher
              </Text>
              <Text
                style={[CommonStyles.text_14_Regular, {color: COLOR.BLACK}]}>
                {item.name == '' ? 'Name not found' : item.name}
              </Text>
              <TouchableOpacity onPress={() => this.onTeacherProfile(item)}>
                <Text
                  style={[
                    CommonStyles.text_12__semi_bold,
                    {
                      color: COLOR.TEXT_COLOR_BLUE,
                      paddingVertical: normalize(14),
                    },
                  ]}>
                  View Tutor's Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    });
  };

  checkProfileCompleteness = () => {
    var profile_not_completed = false;
    console.log(
      'Profile Completed',
      this.props.dashboardResponse.parent_details[0],
    );
    let details = this.props.dashboardResponse.parent_details[0];
    if (details.first_name == '') profile_not_completed = true;

    if (details.email == '') profile_not_completed = true;
    if (details.mobile == '') profile_not_completed = true;

    return profile_not_completed;
  };

  render() {
    const {currentSelectedKid} = this.props;
    const {currentKid, isPaidUser, checkingInitialState} = this.state;

    return (
      <View>
        {isPaidUser && checkingInitialState ? (
          <View>
            <PaidUserScreen
              navigation={this.props.navigation}
              triggerfn={this.props?.triggerfn}
            />
          </View>
        ) : checkingInitialState !== undefined ? (
          <NewUserScreen navigation={this.props.navigation} />
        ) : (
          <></>
        )}
        <View style={{backgroundColor: COLOR.BG_FAQ_GRERY}}>
          {currentSelectedKid && this.teacherCard(currentSelectedKid.teachers)}
        </View>

        {/* {
                    currentSelectedKid &&
                        currentSelectedKid.paid_status ?
                        <PaidUserScreen navigation={this.props.navigation} />
                        :
                        <NewUserScreen navigation={this.props.navigation} />
                }  */}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state.dashboard,
    addCartStatus: state.dashboard.add_cart_status,
    get_cart_list_response: state.dashboard.get_cart_list_response,
    get_cart_list_status: state.dashboard.get_cart_list_status,
    dashboardResponse: state.dashboard.dashboard_response,
    dashboardStatus: state.dashboard.dashboard_status,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MainUserDashboard);
