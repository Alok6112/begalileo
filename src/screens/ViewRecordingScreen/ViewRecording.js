import React, {Component} from 'react';
import {Pressable} from 'react-native';
import {Text, View, Dimensions, StyleSheet, Modal, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-snap-carousel'; // Version can be specified in package.json
import YouTube from 'react-native-youtube';
import YoutubePlayer from 'react-native-youtube-iframe';
import {COLOR, CommonStyles} from '../../config/styles';
import {scrollInterpolator, animatedStyles} from '../../UTILS/animations';
import Video from 'react-native-video';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../config/configs';
import Orientation from 'react-native-orientation';
import {CustomBackButton} from '../../components';
import {getParamNavigationV5} from '../../components/helpers/navigationV5Data';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
//const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
const ITEM_HEIGHT = 350;

export default class ViewRecording extends Component {
  state = {
    index: 0,
    playUrl: '',
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var vUrl = getParamNavigationV5(this.props, 'videoUrl', '');
    console.log('video Url', vUrl);
    this.setState({
      playUrl: vUrl,
    });
    // const initial = Orientation.getInitialOrientation();

    // Orientation.lockToLandscapeLeft()
  }
  componentWillUnmount() {
    // const initial = Orientation.getInitialOrientation();
    // Orientation.lockToPortrait()
  }
  onPressBack = () => {
    const {goBack} = this.props.navigation;
    console.log('ON BACK PRESS');
    goBack();
  };

  render() {
    const {playUrl} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: COLOR.BLACK}}>
        <View style={{marginStart: 10, marginTop: 10}}>
          <CustomBackButton onPress={this.onPressBack} />
        </View>

        {playUrl != '' && (
          <Video
            source={{uri: playUrl}}
            controls
            style={{
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
              borderWidth: 1,
            }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 20,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: COLOR.BLACK,
  },
  itemLabel: {
    color: COLOR.WHITE,
    textAlign: 'center',
  },
  subItemLabel: {
    color: COLOR.WHITE,
    textAlign: 'center',
    marginVertical: 2,
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
