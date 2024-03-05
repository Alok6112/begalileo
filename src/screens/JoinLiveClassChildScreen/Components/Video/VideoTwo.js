import React from "react";

import { View, Text, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import Video from "react-native-video";
class VideoDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoUrl: "",
      playing: false,
      muteForSafari: true,
      currentTime: 0,
    };

    this.video = React.createRef();

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }

  getVideo = (elem) => {
    this.video = elem;
  };

  componentDidMount = () => {
    console.log("Current Video Time", this.props.selVideoTime);
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.selVideoTime != this.props.selVideoTime) {
      this.setState({
        currentTime: +this.props.selVideoTime,
      });
      this.play();
    }
  };

  play() {
    console.log("Play Video", this.video.setNativeProps({ paused: false }));
  }

  pause() {
    console.log("Pause Video", this.video.setNativeProps({ paused: true }));
  }

  updateVideoState = (state) => {
   
    if (state === "play") {
      this.play();
    } else {
      this.pause();
    }
  };

  playVideo = () => {
    console.log("play");
    // console.log("This video", this.video.setNativeProps({ paused: false }));

    this.video.setNativeProps({ paused: false });
  };

  pauseVideo = () => {
    console.log("pause");
    // console.log("This video", this.video.setNativeProps({ paused: true }));

    this.video.setNativeProps({ paused: true });
  };

  render = () => {
    return (
      <View>
        <Video
          ref={this.getVideo}
          source={{
            uri: this.props.selVideoUrl,
          }}
          style={{ height: "100%", width: "100%", resizeMode: "contain" }}
          paused
          currentTime={this.state.currentTime}
        />
      </View>
    );
  };
}

export default VideoDemo;
