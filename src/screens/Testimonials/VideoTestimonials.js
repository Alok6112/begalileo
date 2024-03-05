import React, { Component } from "react";
import { Pressable } from "react-native";
import { Text, View, Dimensions, StyleSheet, Modal, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Carousel from "react-native-snap-carousel"; // Version can be specified in package.json
import YouTube from "react-native-youtube";
import YoutubePlayer from "react-native-youtube-iframe";
import { COLOR, CommonStyles } from "../../config/styles";
import { scrollInterpolator, animatedStyles } from "../../UTILS/animations";

const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
//const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);
const ITEM_HEIGHT = 350;

export default class VideoTestimonials extends Component {
  state = {
    index: 0,
    videoModalVisible: false,
    selectedVideoId: "W0c4z_QvQHo",
    entries: [
      {
        name: "Mr. Vishal Asthana",
        title: "Parent of Vedant Asthana",
        country: "UAE",
        grade: "Grade 3",
        imgUrl: "https://img.youtube.com/vi/W0c4z_QvQHo/0.jpg",
        video_id: "W0c4z_QvQHo",
      },
      {
        name: "Mr. Anwar",
        title: "Parent of Ayaan",
        country: "UAE",
        grade: "Grade 1",
        imgUrl: "https://img.youtube.com/vi/mxdXN8lX16I/0.jpg",
        video_id: "mxdXN8lX16I",
      },

      {
        name: "Juan Viktor",
        title: "American K12",
        country: "Phillipines",
        grade: "Grade 9",
        imgUrl: "https://img.youtube.com/vi/hRbauYgDS7o/0.jpg",
        video_id: "hRbauYgDS7o",
      },
      {
        name: "DIANA",
        title: "beGalileo Student",
        country: "UAE",
        grade: "Grade 9",
        imgUrl: "https://img.youtube.com/vi/HiG1vE4VtHQ/0.jpg",
        video_id: "HiG1vE4VtHQ",
      },
    ],
  };

  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }

  _renderItem({ item }) {
    return (
      <Pressable
        onPress={() => {
          this.setState({
            selectedVideoId: item.video_id,
            videoModalVisible: true,
          });
        }}
        style={styles.itemContainer}
      >
        <View>
          <View style={{ justifyContent: "center" }}>
            <Text style={[CommonStyles.text_11_semi_bold, styles.itemLabel]}>
              {item.name}, {item.country}
            </Text>
            <Text style={[CommonStyles.text_11_semi_bold, styles.subItemLabel]}>
              {item.title}
            </Text>
            <Text style={[CommonStyles.text_11_semi_bold, styles.subItemLabel]}>
              {item.grade}
            </Text>
          </View>
          <View>
            <Image
              style={{ height: 200, width: ITEM_WIDTH }}
              source={{ uri: item.imgUrl }}
            />
          </View>
        </View>

        {/* <YoutubePlayer
                    apiKey='AIzaSyAAMKt_7W5x1dU9ErP3tkhOqkYZXpjlYhU'
                    height={300}
                    play={true}
                    videoId={"iee2TATGMyI"}
                /> */}
        {/* <YouTube
           
                    videoId={item.video_id} 
                    play={false}
                     apiKey='AIzaSyAAMKt_7W5x1dU9ErP3tkhOqkYZXpjlYhU'
                    inLine={false} // control whether the video should play in fullscreen or inline
                    loop // control whether the video should loop when ended
                    onReady={e => this.setState({ isReady: true })}
                    onChangeState={e => this.setState({ status: e.state })}
                    onChangeQuality={e => this.setState({ quality: e.quality })}
                    fullscreen={true}
                    onError={e => this.setState({ error: e.error })}
                    style={{ alignSelf: 'stretch', height: 150, marginTop: 10 }}

                /> */}
      </Pressable>
    );
  }

  render() {
    return (
      <View style={{ marginBottom: 50 }}>
        <Modal
          style={{}}
          animationType="slide"
          transparent={false}
          visible={this.state.videoModalVisible}
          onRequestClose={() => {
            this.setState({
              videoModalVisible: false,
            });
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: COLOR.BLACK,
            }}
          >
            <Text>YouTube Video</Text>

            <YoutubePlayer
              apiKey="AIzaSyAAMKt_7W5x1dU9ErP3tkhOqkYZXpjlYhU"
              height={300}
              play={true}
              videoId={this.state.selectedVideoId}
            />
            <Pressable
              onPress={() => {
                this.setState({
                  videoModalVisible: false,
                });
              }}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Icon name="close" size={30} color={COLOR.WHITE} />
            </Pressable>

            {/* <YouTube

                            videoId="mxdXN8lX16I"
                            play={false}
                            apiKey='AIzaSyAAMKt_7W5x1dU9ErP3tkhOqkYZXpjlYhU'
                            inLine={false} // control whether the video should play in fullscreen or inline
                            loop // control whether the video should loop when ended
                            onReady={e => this.setState({ isReady: true })}
                            onChangeState={e => this.setState({ status: e.state })}
                            onChangeQuality={e => this.setState({ quality: e.quality })}
                            fullscreen={true}
                            onError={e => this.setState({ error: e.error })}
                            style={{ alignSelf: 'stretch', height: 150, marginTop: 10 }}

                        /> */}
          </View>
        </Modal>
        <Carousel
          ref={(c) => (this.carousel = c)}
          data={this.state.entries}
          renderItem={this._renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          containerCustomStyle={styles.carouselContainer}
          inactiveSlideShift={0}
          onSnapToItem={(index) => this.setState({ index })}
          onScrollEndDrag={(event) => {
            console.log("On Scroll End");
          }}
          // onScroll={(event)=>{
          //     console.log("Fired Scrolled")
          // }}
          //   scrollInterpolator={scrollInterpolator}
          //   slideInterpolatedStyle={animatedStyles}
          useScrollView={true}
        />
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
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: COLOR.BLACK,
  },
  itemLabel: {
    color: COLOR.WHITE,
    textAlign: "center",
  },
  subItemLabel: {
    color: COLOR.WHITE,
    textAlign: "center",
    marginVertical: 2,
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
