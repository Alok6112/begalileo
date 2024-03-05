import React, {useEffect, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import Video from 'react-native-video';
export default function VideoComponent(props) {
  const [playVideo, setPlayVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [currentTimes, setCurrentTime] = useState(1);
  const [finalCurrentTime, setFinalCurrentTime] = useState(1);
  const [pausedVideo, setPausedVideo] = useState(false);

  const videoRef = useRef();

  // const getVideo = (elem) => {
  //   videoRef = elem;
  // };

  useEffect(() => {
    if (props.videoPlayState != undefined) {
      if (props.videoPlayState === 'play') {
        console.log('VideoRef', videoRef);
        videoRef.current.setNativeProps;
      } else {
        videoRef.current.setNativeProps;
      }
    }
  }, []);

  useEffect(() => {
    if (props.selVideoUrl != undefined) {
      setVideoUrl(props.selVideoUrl);
    }
  }, []);

  function play() {
    console.log('Play');
    // this.setState({
    //   playing: true,
    // });
  }

  function pause() {
    console.log('Pause');
    // this.setState({
    //   playing: false,
    // });
  }

  updateVideoState = state => {
    if (state === 'play') {
      play();
    } else {
      pause();
    }
  };

  // const handleProgress = (progress) => {
  //   setCurrentTime(progress.currentTime);
  // };

  return (
    <View>
      <Text>Video Play</Text>
      {console.log('Video URl', videoUrl)}
      <Video
        source={{
          uri: videoUrl,
        }}
        ref={videoRef}
        style={{width: 450, height: 270, borderWidth: 1}}
        controls
        // paused={pausedVideo}
        // paused={playVideo ? false : true}
        // onProgress={(e) => setCurrentTime(e.currentTime)}
        // currentTime={finalCurrentTime}
        // onLoad={handleLoad}

        // onProgress={handleProgress}

        // currentTime={currentTimein}
      />
    </View>
  );
}
