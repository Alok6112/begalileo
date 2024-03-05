import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

import Video from 'react-native-video';

import {normalize} from 'react-native-elements';
import {getParamNavigationV5} from '../../components/helpers/navigationV5Data';

export default function TrainingProgramVideoNotification(props) {
  let videoUrl = getParamNavigationV5(props, 'video_url', null);

  console.log('VideoUrl to render', videoUrl);
  return (
    <View style={{flex: 1}}>
      <View style={styles.videosMainContainer}>
        {videoUrl != null ? (
          <Video
            style={styles.videosGrid}
            source={{uri: videoUrl}}
            controls
            paused={false}
            fullscreen={true}
            resizeMode="cover"></Video>
        ) : (
          <View>
            <Text>No Videos Present at the moment</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  videosMainContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(5),
  },

  videosGrid: {
    width: '95%',
    height: '95%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 2,
    borderRadius: 10,
    marginTop: normalize(5),
    backgroundColor: 'white',
  },
});
