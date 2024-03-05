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
  Platform,
  AsyncStorage,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import {COLOR, CommonStyles} from '../../config/styles';
import {IC_PROFILE_PIC, IMG_SARTHAK, IMG_SHAKSHI} from '../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import {
  getDashboardItems,
  getCartItemList,
  updateCurrentKid,
  updateDeviceInfo,
  updateCurrentUserRole,
} from '../../actions/dashboard';
import {normalize, Card} from 'react-native-elements';
import {getLocalData} from '../../components/helpers/AsyncMethods';
import SubscriptionTabs from '../../components/subscription_tab';
import AddCartFloatingButton from '../../components/AddCartFloatingButton';
import PaidUserDashboard from '../dashboard/paid_user_dashboard';
import MainUserDashboard from '../dashboard/MainUserDashboard';
import DashboardHeader from '../../components/DashboardHeader';
import {showMessage, hideMessage} from 'react-native-flash-message';
import LottieView from 'lottie-react-native';
import {
  lottie_child_view,
  lottie_mango_family,
  lottie_color_wheel,
} from '../../assets/lottieAssets';
import messaging from '@react-native-firebase/messaging';
import * as Sentry from '@sentry/react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../config/configs';

class HomeMainScreen extends Component {
  constructor(props) {
    super(props);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.lottieRef = React.createRef();
    this.state = {
      fullScreenAnimView: false,
      fullScreenChildSwapAnim: false,
      triggerToggle: false,
    };
  }
  state = {
    allKidsList: [],
    isPaidUser: false,
    mathBoxOrderId: 0,
    parentName: '',
  };

  componentDidMount() {
    //const currentDSN = Sentry.getCurrentHub().getClient().getOptions().dsn;

    Sentry.setUser({
      id: 'test-id-0',
      email: 'testing@testing.test',
      username: 'USER-TEST',
      specialField: 'special user field',
      specialFieldNumber: 418,
    });

    Sentry.setTag('SINGLE-TAG', 'SINGLE TAG TEST');
    Sentry.setTag('SINGLE-TAG', 'SINGLE TAG TEST');

    Sentry.setContext('TEST-CONTEXT', {
      stringTest: 'Hello',
      numberTest: 404,
      objectTest: {
        foo: 'bar',
      },
      arrayTest: ['foo', 'bar', 400],
      nullTest: null,
      undefinedTest: undefined,
    });

    Sentry.addBreadcrumb({
      level: Sentry.Severity.Info,
      message: `TEST-BREADCRUMB-INFO: DATE STRING`,
    });

    Sentry.captureMessage('Hai Capotured message');

    if (Platform.OS == 'android')
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    if (this.props.state.dashboard_status) {
      this.setState({
        allKidsList: this.props.state.dashboard_response.students,
      });
    }

    getLocalData(Constants.ParentFirstName).then(name => {
      this.setState({
        parentName: JSON.parse(name),
      });
    });

    getLocalData(Constants.ParentTimeZone).then(timeZone => {});

    this.getCartItems();
    this.requestUserPermission();
    this.updateDeviceToken();
  }

  componentWillUnmount() {
    if (Platform.OS == 'android')
      BackHandler.removeEventListener(
        'hardwareBackPress',
        this.handleBackButton,
      );
  }

  handleBackButton() {
    //ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
  }

  requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
    }
  };

  updateDeviceToken = async () => {
    var parentUserId = await getLocalData(Constants.ParentUserId);
    var parentTimeZone = await getLocalData(Constants.ParentTimeZone);
    // getLocalData(Constants.ParentUserId).then((name) => {
    //     console.log("Firebase Device Token");
    //     console.log(name);
    //     console.log("ZZZZ");

    // })

    messaging()
      .getToken()
      .then(token => {
        console.log('token fcm', token);
        this.props.updateDeviceInfo(
          parentUserId,
          token,
          JSON.parse(parentTimeZone),
          Platform.OS,
        );
      });
  };

  getCartItems = () => {
    if (this.props.dashboardStatus) {
      this.props.getCartItemList(
        this.props.dashboardResponse.parent_details[0].id,
        this.props.dashboardResponse.parent_details[0].country,
      );
    }

    // getLocalData(Constants.ParentUserId).then((parentId) => {
    //     console.log(" Cart Items QQQ Parent Id " + parentId);
    //     this.props.getCartItemList(parentId, "")
    // })
  };

  componentDidUpdate(prevProps) {
    if (prevProps.currentSelectedKid != undefined) {
      if (
        this.props.currentSelectedKid != null &&
        this.props.currentSelectedKid.student_id !==
          prevProps.currentSelectedKid.student_id
      ) {
        this.setState(
          {
            fullScreenChildSwapAnim: true,
          },
          () => this.playMainAnimation(),
        );
        this.checkDashboardItems();
        this.getCartItems();
      }
    }

    if (prevProps.get_cart_list_status != this.props.get_cart_list_status) {
      if (this.props.get_cart_list_status) {
        this.setState({
          mathBoxOrderId: this.props.get_cart_list_response.mathbox_order_id,
        });
      }
    }

    if (prevProps.dashboardResponse != this.props.dashboardResponse) {
      if (this.props.dashboardStatus) {
        this.setState({
          allKidsList: this.props.state.dashboard_response.students,
        });
        this.refreshCurrentSelectedKid();
        this.forceUpdate();
      }
    }
    if (prevProps.current_selected_role != this.props.current_selected_role) {
      if (prevProps.current_selected_role != undefined) {
        console.log('Role changes', prevProps.current_selected_role);
        this.setState(
          {
            fullScreenAnimView: true,
          },
          () => this.playMainAnimation(),
        );
      }
    }
  }

  playMainAnimation = () => {
    console.log(this.lottieRef.current);

    this.lottieRef.current?.play();
  };

  refreshCurrentSelectedKid = () => {
    if (this.props.currentSelectedKid == null) return;

    this.props.dashboardResponse.students.map(item => {
      if (item.student_id == this.props.currentSelectedKid.student_id) {
        this.props.updateCurrentKid(item);
      }
    });
  };

  checkDashboardItems = () => {
    // AsyncStorage.multiGet([Constants.ParentUserId, Constants.ParentFirstName, Constants.ParentLastName, Constants.ParentCountryName, Constants.ParentCurrency]).then(response => {
    //     console.log("WWWWWWWW");
    //     console.log(JSON.parse(response[0][1]));
    //     console.log(JSON.parse(response[1][1]));
    //     console.log(JSON.parse(response[2][1]));
    //     console.log(JSON.parse(response[3][1]));
    //     console.log(JSON.parse(response[4][1]));
    // })
    // AsyncStorage.multiGet([Constants.ParentUserId, Constants.ParentCountryName]).then(response => {
    //     console.log("AAAAAAAAAAA", response);
    //     console.log(JSON.parse(response[0][1]));
    //     console.log(JSON.parse(response[1][1]));
    // }).catch(err => {
    //     console.log("Get Multi Err ", err);
    // })

    getLocalData(Constants.ParentUserId).then(parentId => {
      this.props.getDashboardItems(
        parentId,
        'India',
        this.props.currentSelectedKid.student_id,
      );
    });
  };

  goToFaq = () => {
    this.props.navigation.navigate(Constants.FaqScreen);
  };

  goToBookADemo = () => {
    this.props.navigation.navigate(Constants.BookDemoScreen);
  };
  goToDemoDetails = () => {
    this.props.navigation.navigate(Constants.BookDemoScreen);
  };

  goToViewCurriculum = () => {
    this.props.navigation.navigate(Constants.ViewCurriculum);
  };

  goToCartList = () => {
    if (this.props.cartItems != undefined && this.props.cartItems.length > 0)
      this.props.navigation.navigate(Constants.CartListScreen);
    else
      showMessage({
        message: 'Your cart is empty',
        type: 'success',
      });
  };

  onComponentFocus = () => {
    this.checkDashboardItems();
  };

  getHeaderTitle = () => {
    if (this.state.parentName != null) return 'Hi ' + this.state.parentName;
    else return 'Hi';
  };

  triggerfn = e => {
    this.setState({
      triggerToggle: e,
    });
  };

  checkPaidStudentName = name => {
    this.setState({
      paidStudentName: name,
    });
  };

  render() {
    const {allKidsList, isPaidUser} = this.state;
    const {loading, dashboardResponse} = this.props;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLOR.WHITE,
        }}>
        {/* <NavigationEvents onDidFocus={() => this.onComponentFocus()} /> */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <DashboardHeader
              headerTitle={this.getHeaderTitle()}
              headerDescription="See your Kids activity..."
              allKidsList={allKidsList}
              navigation={this.props.navigation}
              triggerToggle={this.state.triggerToggle}
              paidStudentName={this.state.paidStudentName}
            />
            {dashboardResponse && (
              <View>
                {
                  <MainUserDashboard
                    {...this.props}
                    triggerfn={this.triggerfn}
                    checkPaidStudentName={this.checkPaidStudentName}
                  />
                }
              </View>
            )}
          </View>
        </ScrollView>

        {this.state.fullScreenAnimView && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
              backgroundColor: COLOR.WHITE,
              justifyContent: 'space-evenly',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={[
                  CommonStyles.text_14_bold,
                  {marginTop: 100, color: COLOR.TEXT_COLOR_BLUE},
                ]}>
                Switching to {this.props.current_selected_role} view
              </Text>
              <LottieView
                ref={this.lottieRef}
                source={lottie_child_view}
                autoPlay={true}
                speed={3}
                loop={false}
                onAnimationFinish={() =>
                  this.setState({
                    fullScreenAnimView: false,
                  })
                }
              />
            </View>
          </View>
        )}
        {this.state.fullScreenChildSwapAnim && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
              backgroundColor: COLOR.WHITE,
              justifyContent: 'space-evenly',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={[
                  CommonStyles.text_14_bold,
                  {marginTop: 100, color: COLOR.TEXT_COLOR_BLUE},
                ]}>
                Opening {this.props.currentSelectedKid.name}'s view
              </Text>
              <LottieView
                ref={this.lottieRef}
                source={lottie_color_wheel}
                autoPlay={true}
                loop={false}
                speed={3}
                onAnimationFinish={() =>
                  this.setState({
                    fullScreenChildSwapAnim: false,
                  })
                }
              />
            </View>
          </View>
        )}

        <AddCartFloatingButton onCartClick={this.goToCartList} />
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    state: state.dashboard,
    loading: state.dashboard.loading,
    cartItems: state.dashboard.cartItems,
    dashboardStatus: state.dashboard.dashboard_status,
    dashboardResponse: state.dashboard.dashboard_response,
    user_detail_response: state.dashboard.user_detail_response,
    currentSelectedKid: state.dashboard.current_selected_kid,
    addCartStatus: state.dashboard.add_cart_status,
    get_cart_list_response: state.dashboard.get_cart_list_response,
    get_cart_list_status: state.dashboard.get_cart_list_status,
    current_selected_role: state.dashboard.current_selected_role,
  };
};

const mapDispatchToProps = {
  getDashboardItems,
  getCartItemList,
  updateDeviceInfo,
  updateCurrentKid,
  updateCurrentUserRole,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeMainScreen);
