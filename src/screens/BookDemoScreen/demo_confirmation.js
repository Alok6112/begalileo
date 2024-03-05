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
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import {COLOR, CommonStyles} from '../../config/styles';
import {cancelPreferredSlot} from '../../actions/dashboard';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  IC_RESCHEDULE_DEMO,
  IC_CANCEL_DEMO,
  IC_TEACHER,
  IC_DEMO_CONFIRM_SUCCESS,
  CARD_BTN_ARROW,
} from '../../assets/images';
import SvgUri from 'react-native-svg-uri';
import {normalize, Card} from 'react-native-elements';
import CustomGradientButton from '../../components/CustomGradientButton';
import Modal from 'react-native-modal';
import {CommonActions} from '@react-navigation/native';
import {getParamNavigationV5} from '../../components/helpers/navigationV5Data';

class DemoConfirmation extends Component {
  state = {
    isCancelConfirmationDemoVisible: false,
  };

  componentDidMount() {
    if (this.props.bookDemoStatus) {
      this.setState({
        demoDate: this.props.state.book_demo_response.day,
        demoTime: this.props.state.book_demo_response.time,
      });
    }
  }

  componentDidUpdate(prevProps) {
    console.log(
      prevProps.cancelSlotStatus + '---' + this.props.cancelSlotStatus,
    );

    if (prevProps.cancelSlotStatus != this.props.cancelSlotStatus) {
      if (this.props.cancelSlotStatus) {
        console.log('Slot cancelled Successfully');
        this.props.navigation.navigate(Constants.Dashboard);
      }
    }
  }

  rescheduleDemo = () => {
    console.log(
      'demo Time',
      this.props.state.book_demo_response.preferred_slot_id,
    );
    this.props.navigation.navigate(Constants.BookDemoScreen, {
      reScheduleDemo: true,
      scheduledDate: this.state.demoDate,
      demoStatus: 'booked',
      scheduledTime: this.state.demoTime.replace(':00', ''),
      preferred_slot_id: this.props.state.book_demo_response.preferred_slot_id,
    });
  };

  backToHome = () => {
    // this.props.navigation.navigate(Constants.MainScreen)
    const navigateAction = CommonActions.reset({
      index: 0,
      routes: [{name: Constants.MainScreen}],
    });
    this.props.navigation.dispatch(navigateAction);
  };
  showTeacherDetails = () => {
    this.props.navigation.navigate(Constants.TeacherProfile);
  };

  cancleConfiramtiondemo = () => {
    console.log('Cancel  Confirmation');
    if (this.state.isCancelConfirmationDemoVisible) {
      console.log('Cancel  Yes');
      this.setState({
        isCancelConfirmationDemoVisible: false,
      });
    } else {
      console.log('Cancel  No');
      this.setState({
        isCancelConfirmationDemoVisible: true,
      });
    }
  };
  cancelDemo = () => {
    this.setState({
      isCancelConfirmationDemoVisible: false,
    });

    const slotId = getParamNavigationV5(this.props, 'demo_slot_id', 0);
    const demoStudentId = getParamNavigationV5(
      this.props,
      'demo_student_id',
      0,
    );
    this.props.cancelPreferredSlot(demoStudentId, slotId);
  };
  render() {
    const {isCancelConfirmationDemoVisible} = this.state;
    const {loading} = this.props;

    const isDemoConfirmed = getParamNavigationV5(
      this.props,
      'isDemoConfirmed',
      false,
    );
    return (
      <View style={styles.mainContainer}>
        {loading && (
          <ActivityIndicator
            size="large"
            color="black"
            style={CommonStyles.loadingIndicatior}
          />
        )}

        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <View>
            <View
              style={{marginTop: normalize(20), marginStart: normalize(12)}}>
              <Text style={CommonStyles.text_18_bold}>
                {isDemoConfirmed
                  ? 'Your demo is scheduled \n on time'
                  : 'Demo class booked \nsuccessfully'}
              </Text>
            </View>
            <Modal isVisible={isCancelConfirmationDemoVisible}>
              <View
                style={{
                  backgroundColor: COLOR.WHITE,
                  marginTop: normalize(10),
                  borderRadius: normalize(12),
                }}>
                <View>
                  <Text
                    style={{
                      color: COLOR.BLACK,
                      fontFamily: Constants.Montserrat_Regular,
                      fontSize: normalize(14),
                      padding: normalize(30),
                      textAlign: 'center',
                    }}>
                    Are you sure you want to cancel the demo?
                  </Text>
                  <View
                    style={{
                      borderColor: COLOR.LIGHT_BORDER_COLOR,
                      borderWidth: 1,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      alignSelf: 'stretch',
                    }}>
                    <TouchableOpacity
                      style={{
                        color: COLOR.BLACK,
                        flex: 1,
                        fontFamily: Constants.Montserrat_Regular,
                        padding: normalize(15),
                      }}
                      onPress={this.cancelDemo}>
                      <Text
                        style={{
                          fontFamily: Constants.Montserrat_Regular,
                          textAlign: 'center',
                          fontSize: normalize(14),
                        }}>
                        Yes
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        color: COLOR.BLACK,
                        flex: 1,
                        fontFamily: Constants.Montserrat_Regular,
                        padding: normalize(15),
                      }}
                      onPress={this.cancleConfiramtiondemo}>
                      <Text
                        style={{
                          fontFamily: Constants.Montserrat_Regular,
                          textAlign: 'center',
                          fontSize: normalize(14),
                        }}>
                        No
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <View style={{alignItems: 'center'}}>
              <Image
                style={{
                  marginTop: normalize(40),
                  height: normalize(80),
                  width: normalize(80),
                  resizeMode: 'stretch',
                }}
                source={IC_DEMO_CONFIRM_SUCCESS}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: normalize(32),
                marginStart: normalize(20),
                justifyContent: 'space-evenly',
              }}>
              <View style={{flexDirection: 'column'}}>
                <Text style={CommonStyles.text_11_bold}>Time</Text>
                <Text
                  style={[
                    CommonStyles.text_18_regular,
                    {marginTop: normalize(4)},
                  ]}>
                  {this.state.demoDate}
                  {'\n'}
                  {this.state.demoTime}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  flex: 1,
                  alignItems: 'center',
                }}>
                <Text style={CommonStyles.text_11_bold}>Duration</Text>
                <TouchableOpacity onPress={this.cancleConfiramtiondemo}>
                  <Text
                    style={[
                      CommonStyles.text_18_regular,
                      {marginTop: normalize(4)},
                    ]}>
                    1 hr
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {isDemoConfirmed ? (
              <View>
                <Text
                  style={[
                    CommonStyles.text_12_regular,
                    {
                      marginStart: normalize(20),
                      marginTop: normalize(8),
                      color: COLOR.TEXT_COLOR_ORANGE,
                    },
                  ]}>
                  3 Days left
                </Text>

                <Card
                  containerStyle={{
                    marginTop: normalize(40),
                    marginStart: normalize(20),
                    marginEnd: normalize(20),
                    borderRadius: normalize(24),
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        marginStart: normalize(5),
                        marginTop: normalize(5),
                      }}>
                      <Image
                        style={{
                          alignSelf: 'center',
                          height: normalize(70),
                          width: normalize(70),
                          borderRadius: 20,
                          resizeMode: 'stretch',
                        }}
                        source={IC_TEACHER}
                      />
                    </View>
                    <View style={{flex: 1, marginStart: normalize(16)}}>
                      <Text
                        style={[
                          CommonStyles.text_8_bold,
                          {
                            color: COLOR.TEXT_ALPHA_GREY,
                            marginTop: normalize(16),
                          },
                        ]}>
                        Tutor
                      </Text>
                      <Text
                        style={[
                          CommonStyles.text_12_bold,
                          {
                            flexShrink: 1,
                            color: COLOR.TEXT_COLOR_BLACK,
                            marginTop: normalize(8),
                          },
                        ]}>
                        Ananya Joshi
                      </Text>
                      <View style={{marginTop: normalize(4)}}>
                        <Text
                          style={[
                            CommonStyles.text_12_Regular,
                            {color: COLOR.TEXT_ALPHA_GREY},
                          ]}>
                          Education - B.A. Bed
                        </Text>
                        <Text
                          style={[
                            CommonStyles.text_12_Regular,
                            {color: COLOR.TEXT_ALPHA_GREY},
                          ]}>
                          Tutoring Experience - 9 yr
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={this.showTeacherDetails}
                        style={{
                          flexDirection: 'row',
                          marginTop: normalize(24),
                          marginEnd: normalize(10),
                          marginBottom: normalize(10),
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={[
                            CommonStyles.text_12_bold,
                            {
                              color: COLOR.TEXT_COLOR_BLUE,
                              marginStart: normalize(8),
                              alignSelf: 'center',
                            },
                          ]}>
                          View Tutor’s Profile
                        </Text>
                        <Image
                          style={{
                            height: normalize(28),
                            width: normalize(28),
                            resizeMode: 'contain',
                          }}
                          source={CARD_BTN_ARROW}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Card>
              </View>
            ) : (
              <View></View>
            )}

            <View
              style={{marginTop: normalize(32), marginStart: normalize(20)}}>
              <Text style={CommonStyles.text_12_bold}>Things to note</Text>
              <Text style={[CommonStyles.textBody_1, styles.thingsToNoteText]}>
                Please join the class at least a few minutes before the
                schdeuled time.
              </Text>
              <Text style={[CommonStyles.textBody_1, styles.thingsToNoteText]}>
                Our Tech support team will call you for a check before the
                class.
              </Text>

              <Text style={[CommonStyles.textBody_1, styles.thingsToNoteText]}>
                <Text>You can cancel the demo booking</Text>
                <Text style={{fontWeight: 'bold'}}> till 2 hours </Text>
                <Text> before the scheduled time.</Text>
              </Text>
            </View>
            {isDemoConfirmed ? (
              <View />
            ) : (
              <View
                style={{
                  marginTop: normalize(20),
                  marginStart: normalize(30),
                  marginEnd: normalize(30),
                }}>
                <CustomGradientButton
                  myRef={input => {
                    this.btn_add_kid = input;
                  }}
                  style={CommonStyles.green_button_gradient}
                  children="Back to home"
                  onPress={this.backToHome}
                />
              </View>
            )}

            {!isDemoConfirmed && (
              <TouchableOpacity
                onPress={this.rescheduleDemo}
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginTop: normalize(20),
                }}>
                <Image
                  style={{
                    height: normalize(16),
                    width: normalize(16),
                    resizeMode: 'stretch',
                  }}
                  source={IC_RESCHEDULE_DEMO}
                />
                <Text
                  style={[
                    CommonStyles.text_14_bold,
                    {
                      marginStart: normalize(9),
                      alignSelf: 'center',
                      color: COLOR.TEXT_COLOR_GREEN,
                    },
                  ]}>
                  Reschedule Demo
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={this.cancleConfiramtiondemo}
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: normalize(20),
              }}>
              <Image
                style={{
                  height: normalize(16),
                  width: normalize(16),
                  resizeMode: 'stretch',
                }}
                source={IC_CANCEL_DEMO}
              />
              <Text
                style={[
                  CommonStyles.text_14_bold,
                  {
                    marginStart: normalize(9),
                    alignSelf: 'center',
                    color: COLOR.TEXT_COLOR_GREEN,
                  },
                ]}>
                Cancel Demo
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state.dashboard,
    bookDemoStatus: state.dashboard.book_demo_status,
    loading: state.dashboard.loading,
    cancelSlotStatus: state.dashboard.cancel_slot_status,
  };
};

const mapDispatchToProps = {
  cancelPreferredSlot,
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    justifyContent: 'flex-start',
    marginStart: 10,
    marginEnd: 10,
  },
  thingsToNoteText: {
    color: 'rgba(53, 54, 57, 0.7)',
    marginTop: normalize(12),
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(DemoConfirmation);
