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
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import {getStarBadgeReport} from '../../actions/dashboard';
import {CustomBackButton} from '../../components';
import {COLOR, CommonStyles} from '../../config/styles';
import {
  IC_STAR_SIDES,
  IC_STAR_CIRCLE,
  IC_CLAP_PLAIN,
  IC_BADGES_EARNED_1,
  IC_BADGES_EARNED_2,
  IC_UP_ENTER,
} from '../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import {addToCart} from '../../actions/dashboard';
import Icon from 'react-native-vector-icons/FontAwesome';
import {normalize, Card} from 'react-native-elements';
import {BackHandler} from 'react-native';
import {getParamNavigationV5} from '../../components/helpers/navigationV5Data';

class StarBadgeReportScreen extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      isStarSelected: true,
      totalStars: 0,
      allBadgeList: [
        {
          id: 0,
          badgeName: 'Guru',
          badgeDescription:
            'More than 10 questions answered correctly in practice session',
        },
        {
          id: 1,
          badgeName: 'Grand Master',
          badgeDescription:
            'More than 10 questions answered correctly in practice session',
        },
        {
          id: 0,
          badgeName: 'Guru',
          badgeDescription:
            'More than 10 questions answered correctly in practice session',
        },
        {
          id: 1,
          badgeName: 'Grand Master',
          badgeDescription:
            'More than 10 questions answered correctly in practice session',
        },
        {
          id: 0,
          badgeName: 'Guru',
          badgeDescription:
            'More than 10 questions answered correctly in practice session',
        },
        {
          id: 1,
          badgeName: 'Grand Master',
          badgeDescription:
            'More than 10 questions answered correctly in practice session',
        },
      ],
    };
  }

  componentDidMount() {
    var showStar = getParamNavigationV5(this.props, 'showStar', true);
    var collStars = getParamNavigationV5(this.props, 'collectedStars', 0);
    console.log(
      'Current Selected Kid',
      this.props.currentSelectedKid.student_id,
    );
    this.props.getStarBadgeReport(this.props.currentSelectedKid.student_id);
    this.setState({
      isStarSelected: showStar,
      totalStars: collStars,
    });
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

  onPressBack = () => {
    const {goBack} = this.props.navigation;

    goBack();
  };

  onTabSelected = () => {
    if (this.state.isStarSelected)
      this.setState({
        isStarSelected: false,
      });
    else
      this.setState({
        isStarSelected: true,
      });
  };

  starsEarned = () => (
    <View>
      <View style={{marginTop: normalize(20)}}>
        <View>
          <Image
            style={{
              width: normalize(112),
              height: normalize(112),
              alignSelf: 'center',
            }}
            source={IC_STAR_CIRCLE}
          />
          <Image
            style={{
              width: normalize(230),
              height: normalize(170),
              alignSelf: 'center',
              position: 'absolute',
            }}
            source={IC_STAR_SIDES}
          />
        </View>
        <View style={{alignSelf: 'center'}}>
          <Text style={[CommonStyles.text_18_semi_bold, {alignSelf: 'center'}]}>
            {this.props.star_badge_report_response.stars}
          </Text>
          <Text
            style={[
              CommonStyles.text_12_regular,
              {
                color: COLOR.TEXT_ALPHA_GREY,
                textAlign: 'center',
                marginTop: normalize(4),
              },
            ]}>
            Total stars{'\n'}received by{' '}
            {this.props.currentSelectedKid.first_name}
          </Text>
        </View>
        <View style={{marginTop: normalize(40)}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <View style={{alignItems: 'center'}}>
              <Text style={[CommonStyles.text_18_semi_bold]}>
                {this.props.star_badge_report_response.live_classes}
              </Text>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  {color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2)},
                ]}>
                Live Class
              </Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <Text style={[CommonStyles.text_18_semi_bold]}>
                {this.props.star_badge_report_response.practicing_concepts}
              </Text>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  {color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(2)},
                ]}>
                Practicing{'\n'}Concepts
              </Text>
            </View>
          </View>
          <View
            style={[CommonStyles.greyLineSeprator, {marginTop: normalize(20)}]}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: normalize(20),
            }}>
            <View style={{alignItems: 'center'}}>
              <Text style={[CommonStyles.text_18_semi_bold]}>
                {this.props.star_badge_report_response.tests}
              </Text>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  {
                    color: COLOR.TEXT_ALPHA_GREY,
                    marginTop: normalize(2),
                    textAlign: 'center',
                  },
                ]}>
                Concept{'\n'}Test
              </Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <Text style={[CommonStyles.text_18_semi_bold]}>
                {this.props.star_badge_report_response.speed_math}
              </Text>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  {
                    color: COLOR.TEXT_ALPHA_GREY,
                    marginTop: normalize(2),
                    textAlign: 'center',
                  },
                ]}>
                Speed{'\n'}Math
              </Text>
            </View>
          </View>
        </View>
        {/* <View style={{ flexDirection: 'row', marginTop: normalize(20), borderRadius: normalize(50), backgroundColor: COLOR.BG_ALPHA_BLUE, alignSelf: 'center', paddingStart: normalize(12), paddingEnd: normalize(12), paddingTop: normalize(9), paddingBottom: normalize(9) }}>

                    <Image style={{ height: normalize(20), width: normalize(23), resizeMode: 'contain' }} source={IC_CLAP_PLAIN} />
                    <Text style={[CommonStyles.text_12_bold, { color: COLOR.TAB_BOTTOM_BLUE, marginStart: normalize(4), alignSelf: 'center' }]}>Clap</Text>
                </View> */}
      </View>
    </View>
  );

  renderBadgeItem = item => {
    return (
      <View style={{flexDirection: 'row', marginTop: normalize(18)}}>
        <Image
          style={{
            height: normalize(60),
            width: normalize(60),
            marginHorizontal: normalize(5),
            resizeMode: 'contain',
          }}
          source={{
            uri: item.item.url,
          }}
        />
        <Text
          style={{
            position: 'absolute',

            height: 30,
            width: 30,
            marginTop: -10,
            backgroundColor: COLOR.RED,
            borderRadius: 15,
            borderWidth: 0.5,
            overflow: 'hidden',
            color: COLOR.WHITE,
            paddingTop: 5,
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {item.item.count}
        </Text>
      </View>
    );
  };

  noBadgeToDisplay = () => {
    return (
      <View>
        <Text style={[CommonStyles.text_16_bold, {}]}>No badges found</Text>
      </View>
    );
  };

  badgesEarned = () => (
    <View>
      {/* <View style={{ flexDirection: 'row' }}>
                <Text style={[CommonStyles.text_14_bold]}>Today</Text>
                <Text style={[CommonStyles.text_12_Regular, { marginStart: normalize(12), color: COLOR.TEXT_ALPHA_GREY }]}>(2)</Text>
            </View> */}
      {/* {
                this.props.star_badge_report_response.student_badges.map((data) => {
                    return (
                        <View style={{ flexDirection: 'row', marginTop: normalize(18) }}>
                            <Image style={{ height: normalize(98), width: normalize(98), resizeMode: 'contain' }} source={IC_BADGES_EARNED_1} />
                            <Image style={{ height: normalize(98), width: normalize(98), resizeMode: 'contain', marginStart: normalize(8) }} source={IC_BADGES_EARNED_2} />
                        </View>
                    )

                })
            } */}
      <FlatList
        horizontal={true}
        data={this.props.star_badge_report_response.student_badges}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => {
          return item.badge_id;
        }}
        ListEmptyComponent={this.noBadgeToDisplay}
        renderItem={this.renderBadgeItem}
      />

      <View style={{marginTop: normalize(20)}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[CommonStyles.text_14_bold]}>Available Badges List</Text>
          <Image
            style={{
              height: normalize(8),
              width: normalize(8),
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
            source={IC_UP_ENTER}
          />
        </View>
        <View
          style={[CommonStyles.greyLineSeprator, {marginTop: normalize(15)}]}
        />
        {this.props.star_badge_report_response.available_badges.map(
          (data, index) => this.allBadgesList(data, index),
        )}
      </View>
    </View>
  );

  allBadgesList = (data, index) => (
    <View key={index}>
      <View style={{flexDirection: 'row', marginTop: normalize(12)}}>
        <Image
          style={{
            height: normalize(60),
            width: normalize(60),
            resizeMode: 'contain',
          }}
          source={{
            uri: data.url,
          }}
        />
        <View style={{marginStart: normalize(15), alignSelf: 'center'}}>
          <Text style={[CommonStyles.text_12__semi_bold]}>{data.name}</Text>
          {/* <Text style={[CommonStyles.text_12_regular, { color: COLOR.TEXT_ALPHA_GREY, flexWrap: 'wrap' }]}>More than 10 questions answered correctly in practice session</Text> */}
        </View>
      </View>
      <View
        style={[CommonStyles.greyLineSeprator, {marginTop: normalize(12)}]}
      />
    </View>
  );

  render() {
    const {isStarSelected} = this.state;
    const {loading} = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLOR.WHITE,
        }}>
        <ScrollView>
          <View style={{marginStart: normalize(20), marginEnd: normalize(20)}}>
            <CustomBackButton onPress={this.onPressBack} />
            {loading && (
              <ActivityIndicator
                size="large"
                color="black"
                style={CommonStyles.activityIndicatorStyle}
              />
            )}

            <View style={{marginTop: normalize(15)}}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={this.onTabSelected}
                  style={
                    isStarSelected ? styles.tabItemSelected : styles.tabItem
                  }>
                  <Text style={[CommonStyles.text_12_bold, styles.tabItemText]}>
                    Stars
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.onTabSelected}
                  style={[
                    {marginStart: normalize(25)},
                    isStarSelected ? styles.tabItem : styles.tabItemSelected,
                  ]}>
                  <Text style={[CommonStyles.text_12_bold, styles.tabItemText]}>
                    Badges
                  </Text>
                </TouchableOpacity>
              </View>

              {this.props.star_badge_report_status && (
                <View
                  style={{marginTop: normalize(10), justifyContent: 'center'}}>
                  {isStarSelected ? this.starsEarned() : this.badgesEarned()}
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state.authenticate,
    star_badge_report_status: state.dashboard.star_badge_report_status,
    star_badge_report_response: state.dashboard.star_badge_report_response,
    currentSelectedKid: state.dashboard.current_selected_kid,
  };
};
const mapDispatchToProps = {
  getStarBadgeReport,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StarBadgeReportScreen);
