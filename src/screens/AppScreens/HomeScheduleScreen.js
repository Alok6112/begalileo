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
import SearchingRecordComponent from '../../components/SearchingRecordComponent';
import {COLOR, CommonStyles} from '../../config/styles';
import {IC_PROFILE_PIC, IMG_SARTHAK, IMG_SHAKSHI} from '../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import {addToCart} from '../../actions/dashboard';
import Icon from 'react-native-vector-icons/FontAwesome';
import {normalize, Card} from 'react-native-elements';
import {getStudentClasses, getDashboardItems} from '../../actions/dashboard';
import {getLocalData} from '../../components/helpers/AsyncMethods';
import DashboardHeader from '../../components/DashboardHeader';
import NoRecordFoundComponent from '../../components/NoRecordFoundComponent';
import LiveClassSchedule from '../ScheduleScreens/LiveClassSchedule';
import CurriculamSchedule from '../ScheduleScreens/CurriculamSchedule';

class HomeScheduleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiveTabSelected: true,
      allKidsList: [],
    };
  }

  componentDidMount() {
    this.focusSubscription = this.props.navigation.addListener(
      'focus',
      this.handleFocus,
    );

    if (this.props.state.dashboard_status) {
      this.setState({
        allKidsList: this.props.state.dashboard_response.students,
      });
    }
    this.getStudentClasses();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.student_class_response != this.props.student_class_response) {
      if (this.props.student_class_status) {
      }
    }
    if (prevProps.currentSelectedKid != undefined) {
      if (
        this.props.currentSelectedKid != undefined &&
        this.props.currentSelectedKid.student_id !==
          prevProps.currentSelectedKid.student_id
      ) {
        this.getStudentClasses();
      }
    }
  }

  componentWillUnmount() {
    this.focusSubscription();
  }

  handleFocus = () => {
    this.getStudentClasses();
  };

  checkDashboardItems = () => {
    getLocalData(Constants.ParentUserId).then(parentId => {
      this.props.getDashboardItems(
        parentId,
        'India',
        this.props.currentSelectedKid.student_id,
      );
    });
  };

  getStudentClasses = () => {
    // this.props.getStudentClasses(53187);
    // this.props.getStudentClasses(54938);
    this.props.getStudentClasses(this.props.currentSelectedKid.student_id);
  };

  onTabSelected = () => {
    if (this.state.isLiveTabSelected)
      this.setState({
        isLiveTabSelected: false,
      });
    else
      this.setState({
        isLiveTabSelected: true,
      });
  };

  render() {
    const {isLiveTabSelected, allKidsList} = this.state;
    const {
      loading,
      currentSelectedKid,
      student_class_status,
      student_class_response,
    } = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLOR.BG_FAQ_GRERY,
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1}}>
            {/* <NavigationEvents onDidFocus={() => this.onComponentFocus()} /> */}

            <DashboardHeader
              headerTitle="Schedule"
              headerDescription="See your Kids schedule"
              allKidsList={allKidsList}
              navigation={this.props.navigation}
              paidStudentName={
                this.props?.currentSelectedKid?.account_type === 'paid'
                  ? this.props.currentSelectedKid.name
                  : ''
              }
            />

            {student_class_status && (
              <View
                style={{
                  backgroundColor: COLOR.WHITE,
                  marginTop: normalize(20),
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginStart: normalize(10),
                    marginTop: normalize(20),
                    marginBottom: normalize(20),
                  }}>
                  <TouchableOpacity
                    onPress={this.onTabSelected}
                    style={
                      isLiveTabSelected
                        ? styles.tabItemSelected
                        : styles.tabItem
                    }>
                    <Text
                      style={[CommonStyles.text_12_bold, styles.tabItemText]}>
                      Live Class
                    </Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity onPress={this.onTabSelected} style={[{ marginStart: normalize(25) }, isLiveTabSelected ? styles.tabItem : styles.tabItemSelected]}>
                                        <Text style={[CommonStyles.text_12_bold, styles.tabItemText]}>Curriculam</Text>
                                    </TouchableOpacity> */}
                </View>
              </View>
            )}

            {loading && (
              <SearchingRecordComponent
                title="Searching..."
                sub_title="Fetching class details"
              />
            )}
            {student_class_status && (
              <View style={{flex: 1}}>
                {isLiveTabSelected ? (
                  <LiveClassSchedule navigation={this.props.navigation} />
                ) : (
                  <CurriculamSchedule />
                )}
              </View>
            )}
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
    currentSelectedKid: state.dashboard.current_selected_kid,
    student_class_response: state.dashboard.student_class_response,
    student_class_status: state.dashboard.student_class_status,
  };
};

const mapDispatchToProps = {
  getStudentClasses,
  getDashboardItems,
};

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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScheduleScreen);
