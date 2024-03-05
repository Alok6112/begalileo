import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Platform,
} from 'react-native';
import {COLOR, CommonStyles} from '../config/styles';
import {lottie_laptop_class, lottie_writing} from '../assets/lottieAssets';
import LottieView from 'lottie-react-native';
import {SCREEN_WIDTH} from '../config/configs';
import * as Constants from '../components/helpers/Constants';
import {getParamNavigationV5} from '../components/helpers/navigationV5Data';

let parent_id = 0;
class PostOtpBookDemo extends Component {
  constructor(props) {
    super(props);
  }

  goToParentProfile = () => {
    const propParentMobile = getParamNavigationV5(
      this.props,
      'parentMobileNumber',
      '',
    );
    const propParentEmail = getParamNavigationV5(this.props, 'parentEmail', '');
    const propParentFirstName = getParamNavigationV5(
      this.props,
      'parentFirstName',
      '',
    );
    const propParentLastName = getParamNavigationV5(
      this.props,
      'parentLastName',
      '',
    );
    const propParentTimeZone = getParamNavigationV5(
      this.props,
      'parentTimeZone',
      '',
    );
    parent_id = getParamNavigationV5(this.props, 'parentId', 0);

    if (
      propParentEmail != '' &&
      propParentMobile != 'null' &&
      propParentMobile != ''
    ) {
      this.props.navigation.navigate(Constants.AddKidDetail, {
        fromParent: true,
      });
    } else {
      this.props.navigation.navigate(Constants.ParentProfile, {
        parentId: parent_id,
        parentNumber: propParentMobile,
        parentTimeZone: propParentTimeZone,
        parentFirstName: propParentFirstName,
        parentLastName: propParentLastName,
        parentEmail: propParentEmail,
        parentNumber: propParentMobile,
      });
    }
  };

  goToBookADemo = () => {
    const propParentMobile = getParamNavigationV5(
      this.props,
      'parentNumber',
      '',
    );
    const propParentEmail = getParamNavigationV5(this.props, 'parentEmail', '');
    const propParentFirstName = getParamNavigationV5(
      this.props,
      'parentFirstName',
      '',
    );
    const propParentLastName = getParamNavigationV5(
      this.props,
      'parentLastName',
      '',
    );
    const propParentTimeZone = getParamNavigationV5(
      this.props,
      'parentTimeZone',
      '',
    );
    parent_id = getParamNavigationV5(this.props, 'parentId', 0);

    this.props.navigation.push(Constants.BOOK_DEMO_SCREEN_POST_OTP, {
      parentId: parent_id,
      parentNumber: propParentMobile,
      parentTimeZone: propParentTimeZone,
      parentFirstName: propParentFirstName,
      parentLastName: propParentLastName,
      parentEmail: propParentEmail,
    });
  };
  goToAddKidDetail = () => {
    this.props.navigation.navigate(Constants.AddKidDetail, {
      fromParent: true,
      fromScreen: Constants.POST_OTP_BOOK_DEMO,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              height: 180,
              width: SCREEN_WIDTH,
              justifyContent: 'center',
            }}>
            <LottieView source={lottie_laptop_class} autoPlay loop />
          </View>
          <TouchableOpacity
            onPress={this.goToBookADemo}
            style={[
              styles.button,
              {backgroundColor: COLOR.BORDER_COLOR_GREEN},
            ]}>
            <Text style={[CommonStyles.text_12_bold, {color: COLOR.WHITE}]}>
              Book a free demo
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1}}>
          <View
            style={{
              height: 180,
              width: SCREEN_WIDTH,
              justifyContent: 'center',
            }}>
            <LottieView source={lottie_writing} autoPlay loop />
          </View>
          <TouchableOpacity
            onPress={this.goToAddKidDetail}
            style={[styles.button, {backgroundColor: COLOR.BLUE_LINk}]}>
            <Text style={[CommonStyles.text_12_bold, {color: COLOR.WHITE}]}>
              Buy subscription
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.5, justifyContent: 'center'}}>
          <TouchableOpacity onPress={this.goToParentProfile}>
            <Text
              style={[
                CommonStyles.text_12__semi_bold,
                {
                  color: COLOR.BLUE_LINk,
                  textDecorationLine: 'underline',
                  textAlign: 'center',
                  fontStyle: 'italic',
                },
              ]}>
              Proceed to profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

PostOtpBookDemo.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  button: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    marginHorizontal: 40,
    borderRadius: 20,
  },
});

export default PostOtpBookDemo;
