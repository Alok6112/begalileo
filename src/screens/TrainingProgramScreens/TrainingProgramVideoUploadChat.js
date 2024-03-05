import React, {useState} from 'react';

import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';

// import {RNCamera} from 'react-native-camera';

import {CAMERA_FLIP} from '../../assets/images';

import Video from 'react-native-video';

class TrainingProgramVideoUploadChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red',
      finalRecorderedVideo: [],
      cameraAngel: 'back',
      hideCameraSwitchBtn: false,
    };

    this.camera = React.createRef(null);
  }

  async startRecording() {
    this.setState({recording: true, hideCameraSwitchBtn: true});
    // default to mp4 for android as codec is not set

    const {uri, codec = 'mp4'} = await this.camera.recordAsync({
      quality: RNCamera.Constants.VideoQuality['4:3'],
    });
    // {
    //   quality: RNCamera.Constants.VideoQuality["4:3"],
    // }

    this.setState({recording: false, processing: true});

    const type = `video/${codec}`;

    const finalObject = {
      fileName: Platform.OS === 'ios' ? 'video.mov' : 'video.mp4',
      type,
      uri,
    };

    // console.log("finalObject to upload", finalObject);

    this.props.uploadedRecordedFile(finalObject);

    //{"duration": 6.565, "fileName": "IMG_0513.mov", "fileSize": 20901587, "height": 2160, "type": "video/quicktime", "uri": "file:///var/mobile/Containers/Data/Application/B62A32F0-3116-465F-A5A5-84B2D4905ADD/tmp/IMG_0513.mov", "width": 3840}

    this.setState({
      finalRecorderedVideo: [{...this.state.finalRecorderedVideo, finalObject}],
    });
  }

  stopRecording() {
    this.camera.stopRecording();

    console.log('Stop Recording Video');

    this.setState({processing: false, hideCameraSwitchBtn: false});
  }

  flipCamera() {
    if (this.state.cameraAngel == 'back') {
      this.setState({
        cameraAngel: 'front',
      });
    } else {
      this.setState({
        cameraAngel: 'back',
      });
    }
  }

  render() {
    const {recording, processing} = this.state;

    // {
    //   console.log("props", this.props.uploadedRecordedFile);
    // }

    // let button = (
    //   <TouchableOpacity
    //     onPress={this.startRecording.bind(this)}
    //     style={styles.capture}
    //   >
    //     <Text style={{ fontSize: 14 }}> RECORD </Text>
    //   </TouchableOpacity>
    // );

    // if (recording) {
    //   button = (
    //     <TouchableOpacity
    //       onPress={this.stopRecording.bind(this)}
    //       style={styles.capture}
    //     >
    //       <Text style={{ fontSize: 14 }}> STOP </Text>
    //     </TouchableOpacity>
    //   );
    // }

    // if (processing) {
    //   button = (
    //     <View style={styles.capture}>
    //       <ActivityIndicator animating size={18} />
    //     </View>
    //   );
    // }

    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={this.state.cameraAngel}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={
            'We need your permission to use your camera phone'
          }
          androidCameraPermissionOptions={true}
          androidRecordAudioPermissionOptions={true}
          defaultVideoQuality={RNCamera.Constants.VideoQuality['4:3']}
          autoFocus={RNCamera.Constants.AutoFocus.on}
        />

        <View style={styles.recordBtn}>
          {!this.state.hideCameraSwitchBtn && (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => this.flipCamera()}>
                <Image
                  style={{maxWidth: 55, maxHeight: 55}}
                  source={CAMERA_FLIP}></Image>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.recordBtnMain}>
            {!recording ? (
              <TouchableOpacity
                onPress={this.startRecording.bind(this)}
                style={styles.capture}>
                <Text
                  style={{
                    fontSize: 18,
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                  }}>
                  RECORD
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={this.stopRecording.bind(this)}
                style={styles.capture}>
                <Text
                  style={{
                    fontSize: 18,
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                  }}>
                  STOP
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },

  preview: {
    width: '100%',
    height: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  recordBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  recordBtnMain: {
    width: 100,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  capture: {
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    color: 'white',
  },
});

export default TrainingProgramVideoUploadChat;
