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
import {getSubscriptionDetails} from '../../actions/dashboard';
import {
  IC_ARROW_RIGHT,
  IMG_SARTHAK,
  IC_RIGHT_ENTER,
  IC_MORE_PROFILE,
  IC_MORE_SUBSCRIPTIONS,
  IC_MORE_NOTIFICATIONS,
  IC_MORE_MY_KIDS,
  IC_MORE_LIVE_CLASS_BATCH,
  IC_MORE_CARD_DETAILS,
  IC_MORE_HELP,
  IMG_SHAKSHI,
} from '../../assets/images';
import {CustomBackButton} from '../../components';
import NoRecordFoundComponent from '../../components/NoRecordFoundComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import {normalize, Card} from 'react-native-elements';
import {getLocalData} from '../../components/helpers/AsyncMethods';
import CustomGradientButton from '../../components/CustomGradientButton';
import {BackHandler} from 'react-native';

class MoreMySubscriptions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  onPressBack = () => {
    const {goBack} = this.props.navigation;

    goBack();
  };

  componentDidMount() {
    this.getSubscriptionDetails();
  }
  getSubscriptionDetails = () => {
    getLocalData(Constants.ParentUserId).then(parentId => {
      this.props.getSubscriptionDetails(parentId);
    });
  };

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

  onViewDetailsClick = () => {
    this.props.navigation.navigate(Constants.SubscriptonDetailsScreen);
  };

  renderSubscriptionDetails = () => {
    return this.props.subscription_details_response.subscription_details.map(
      (dataElement, index) => (
        <View
          key={index}
          style={[CommonStyles.shadowContainer, {marginTop: normalize(20)}]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginStart: normalize(4),
              marginEnd: normalize(4),
              paddingTop: normalize(16),
            }}>
            <View
              style={{
                flex: 1,
                width: 0,
                flexGrow: 1,
              }}>
              <View style={{flexDirection: 'row', marginStart: normalize(5)}}>
                <Image
                  style={{
                    borderRadius: 100,
                    height: normalize(28),
                    width: normalize(28),
                    resizeMode: 'stretch',
                  }}
                  source={{uri: dataElement.photo}}
                />
                <Text
                  style={[
                    CommonStyles.text_12_bold,
                    {alignSelf: 'center', marginStart: normalize(6)},
                  ]}>
                  {dataElement.student_name}
                </Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                width: 0,
                flexGrow: 1,
                marginEnd: normalize(5),
              }}>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  {color: COLOR.TEXT_ALPHA_GREY, textAlign: 'right'},
                ]}>
                {dataElement.live_classes} Live Classes
              </Text>
            </View>
          </View>
          <View
            style={[CommonStyles.greyLineSeprator, {marginTop: normalize(8)}]}
          />
          <View style={{marginStart: normalize(10), marginEnd: normalize(10)}}>
            <View style={{marginTop: normalize(4), marginTop: normalize(12)}}>
              <Text style={[CommonStyles.text_16_semi_bold]}>
                {dataElement.duration} Months
              </Text>
              {dataElement.boxes > 0 && (
                <Text
                  style={[
                    CommonStyles.text_12_Regular,
                    {color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(4)},
                  ]}>
                  With {dataElement.boxes} Math boxes for {dataElement.duration}{' '}
                  months
                </Text>
              )}
            </View>
            <View
              style={{
                marginTop: normalize(4),
                marginTop: normalize(12),
                marginBottom: normalize(12),
              }}>
              <Text style={[CommonStyles.text_16_semi_bold]}>
                Subscribed On
              </Text>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  {color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(4)},
                ]}>
                {dataElement.subscription_start_date}
              </Text>
            </View>

            <View
              style={{
                marginTop: normalize(4),
                marginTop: normalize(12),
                marginBottom: normalize(12),
              }}>
              <Text style={[CommonStyles.text_16_semi_bold]}>
                {dataElement.expired ? 'Expired on' : 'Expires on'}
              </Text>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  {color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(4)},
                ]}>
                {dataElement.subscription_end_date}
              </Text>
            </View>
            <View
              style={{
                marginTop: normalize(4),
                marginTop: normalize(12),
                marginBottom: normalize(12),
              }}>
              <Text style={[CommonStyles.text_16_semi_bold]}>Price</Text>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  {color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(4)},
                ]}>
                {dataElement.currency} {dataElement.amount}
              </Text>
            </View>

            {/* <TouchableOpacity onPress={this.onViewDetailsClick} style={{ flexDirection: 'row', marginTop: normalize(16), justifyContent: 'space-between', marginBottom: normalize(16) }}>

                        <Text style={[CommonStyles.text_12__semi_bold, { color: COLOR.TEXT_COLOR_BLUE, alignSelf: 'center' }]}>View Details</Text>


                        <Image style={{ borderRadius: 100, height: normalize(28), width: normalize(28), resizeMode: "stretch" }} source={IC_ARROW_RIGHT} />

                    </TouchableOpacity> */}
          </View>
        </View>
      ),
    );
  };

  onBuySubscription = () => {
    this.props.navigation.navigate(Constants.ShowSubscriptions);
  };

  render() {
    const {
      subscription_details_status,
      subscription_details_response,
      loading,
    } = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLOR.PRIMARY_BG,
        }}>
        {loading && (
          <ActivityIndicator
            size="large"
            color="black"
            style={CommonStyles.loadingIndicatior}
          />
        )}
        <ScrollView>
          <View
            style={{
              marginStart: normalize(20),
              marginEnd: normalize(20),
              marginTop: normalize(10),
              marginBottom: normalize(20),
            }}>
            <CustomBackButton onPress={this.onPressBack} />
            <Text
              style={[
                CommonStyles.text_16_semi_bold,
                {color: COLOR.TEXT_COLOR_BLUE},
              ]}>
              My Subscriptions
            </Text>

            {subscription_details_status &&
            this.props.subscription_details_response.subscription_details !=
              null &&
            this.props.subscription_details_response.subscription_details
              .length > 0 ? (
              this.renderSubscriptionDetails()
            ) : (
              <View>
                <NoRecordFoundComponent
                  title="No subscriptions details found"
                  sub_title=""
                />
                <CustomGradientButton
                  myRef={input => {
                    this.btn_edit_student = input;
                  }}
                  style={styles.addKidButton}
                  children="Buy subscription"
                  onPress={this.onBuySubscription}
                />
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
    subscription_details_status: state.dashboard.subscription_details_status,
    subscription_details_response:
      state.dashboard.subscription_details_response,
    loading: state.dashboard.loading,
  };
};

const mapDispatchToProps = {
  getSubscriptionDetails,
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
  addKidButton: {
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
)(MoreMySubscriptions);
