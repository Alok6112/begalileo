import React, {Component} from 'react';

import {View, Text, StyleSheet, StatusBar, Image, Animated} from 'react-native';
import {CommonStyles, COLOR} from '../config/styles';
import {
  LOGO_BGL_WITH_CAPTION,
  LOGO_BGL_WITH_CAPTION_2,
  LOGO_BGL_WITH_CAPTION_3,
} from '../assets/images';
import {getLocalData, storeLocalData} from '../components/helpers/AsyncMethods';
import * as Constants from '../components/helpers/Constants';

import AsyncStorage from '@react-native-community/async-storage';
class Splash extends Component {
  constructor() {
    super();
    this.images = [
      LOGO_BGL_WITH_CAPTION,
      LOGO_BGL_WITH_CAPTION_2,
      LOGO_BGL_WITH_CAPTION_3,
    ];
    this.state = {
      wallPaperCounter: 0,
      opacity: new Animated.Value(1),
      entryOpacity: 1,
      index: 0,
      isAnimCompleted: false,
      appVersion: 'V1.176',
    };
  }
  componentDidMount() {
    this._storeData();
    // Check whether an initial notification is available
  }
  _storeData = async () => {
    try {
      await AsyncStorage.setItem('appVersionKey', this.state.appVersion);
    } catch (error) {
      // Error saving data
    }
  };

  onLoad = () => {
    if (!this.state.isAnimCompleted) {
      console.log('Loading animation');
      if (this.state.index == 0) {
        Animated.timing(this.state.opacity, {
          toValue: 0.1,
          duration: 2000,
          useNativeDriver: true,
        }).start(() => {
          this.setState({
            index: 2,
          });
        });
      } else {
        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }).start(() => this.checkIsUserLogged());
      }
    }
  };

  changeWallPaper = () => {
    this.setState({
      wallPaperCounter: this.state.wallPaperCounter + 1,
    });
  };

  animateWallPaper = () => {
    var intervalTimer = setInterval(() => {
      console.log('annimating');
      if (this.state.wallPaperCounter < 3) this.changeWallPaper();
      else {
        console.log('Stop interval');
        clearInterval(intervalTimer);
        // this.checkIsUserLogged();
      }
    }, 1500);
  };

  renderWallPaper = () => {
    if (this.state.wallPaperCounter == 0) {
      return <Image style={styles.image} source={LOGO_BGL_WITH_CAPTION} />;
    } else if (this.state.wallPaperCounter == 1) {
      return <Image style={styles.image} source={LOGO_BGL_WITH_CAPTION_2} />;
    } else {
      return (
        <Image style={styles.round_image} source={LOGO_BGL_WITH_CAPTION_3} />
      );
    }
  };

  checkIsUserLogged = async () => {
    this.setState({
      isAnimCompleted: true,
    });
    const localData = await getLocalData(Constants.IS_LOGGED_IN);
    console.log('localData', localData);
    const checkUserRole = await getLocalData(Constants.UserLoginRole);

    const Sm_Role = await getLocalData(Constants.SM_role);
    console.log('Sm_Role', typeof JSON.parse(Sm_Role));
    const finalUserRole = JSON.parse(checkUserRole);

    if (JSON.parse(localData) && finalUserRole == 'lifeskillcoach') {
      this.props.navigation.navigate(Constants.TeacherLoginScreen);
    } else if (
      (JSON.parse(localData) && JSON.parse(Sm_Role) == 'sm') ||
      (JSON.parse(localData) && JSON.parse(Sm_Role) == 'sm_manager')
    ) {
      console.log('inside sm and sm manager');
      this.props.navigation.navigate(Constants.SM_dashBoard);
    } else if (JSON.parse(localData)) {
      console.log('inside parent section');
      this.props.navigation.navigate(Constants.MainScreen);
    } else {
      console.log('inside login page');
      this.props.navigation.navigate(Constants.Login);
    }
  };

  render() {
    return (
      <View
        style={[
          CommonStyles.container,
          {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLOR.PRIMARY_BG,
          },
        ]}>
        <StatusBar backgroundColor={COLOR.PRIMARY_BG} barStyle="dark-content" />
        <Animated.Image
          onLoad={this.onLoad}
          source={this.images[this.state.index]}
          style={[
            {
              opacity: this.state.opacity,
            },
            styles.image,
          ]}
        />

        <Text
          style={{
            alignItems: 'flex-start',
            alignSelf: 'flex-start',
            color: COLOR.BLACK,
          }}>
          {this.state.appVersion}
        </Text>
      </View>
    );
  }
}

// const Splash = () => (
//     <View
//         style={[
//             CommonStyles.container,
//             { justifyContent: "center", alignItems: "center", backgroundColor: COLOR.PRIMARY_BG }
//         ]}
//     >
//         <StatusBar backgroundColor={COLOR.PRIMARY_BG} barStyle="dark-content" />
//         <Image style={styles.image} source={LOGO_BGL_WITH_CAPTION}/>
//     </View>
// );

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '80%',
    height: '20%',

    resizeMode: 'contain',
  },
  round_image: {
    flex: 1,
    width: '35%',
    height: '35%',

    resizeMode: 'contain',
  },
});

export default Splash;
