import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import * as Constants from "../../components/helpers/Constants";
import { COLOR, CommonStyles } from "../../config/styles";
import {
  IC_PROFILE_PIC,
  IC_BOOK_DEMO_BG,
  LIVE_CLASS_CARD_THUMB,
  ICON_CLOCK,
  CARD_BTN_ARROW,
} from "../../assets/images";
import LinearGradient from "react-native-linear-gradient";
import { addToCart } from "../../actions/dashboard";
import Icon from "react-native-vector-icons/FontAwesome";
import { normalize, Card } from "react-native-elements";

class ChooseLiveBatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      batchLiveDatas: [
        {
          id: 0,
          number: 1,
          first_day: "Tuesday",
          first_day_time: "4 pm",
          second_day: "Thursday",
          second_day_time: "4 pm",
          seats_left: 7,
        },
        {
          id: 1,
          number: 2,
          first_day: "Tuesday",
          first_day_time: "4 pm",
          second_day: "Thursday",
          second_day_time: "4 pm",
          seats_left: 2,
        },
        {
          id: 2,
          number: 3,
          first_day: "Tuesday",
          first_day_time: "4 pm",
          second_day: "Thursday",
          second_day_time: "4 pm",
          seats_left: 1,
        },
        {
          id: 3,
          number: 4,
          first_day: "Tuesday",
          first_day_time: "4 pm",
          second_day: "Thursday",
          second_day_time: "4 pm",
          seats_left: 7,
        },
        {
          id: 4,
          number: 5,
          first_day: "Tuesday",
          first_day_time: "4 pm",
          second_day: "Thursday",
          second_day_time: "4 pm",
          seats_left: 7,
        },
        {
          id: 5,
          number: 6,
          first_day: "Tuesday",
          first_day_time: "4 pm",
          second_day: "Thursday",
          second_day_time: "4 pm",
          seats_left: 3,
        },
        {
          id: 6,
          number: 7,
          first_day: "Tuesday",
          first_day_time: "4 pm",
          second_day: "Thursday",
          second_day_time: "4 pm",
          seats_left: 7,
        },
        {
          id: 7,
          number: 8,
          first_day: "Tuesday",
          first_day_time: "4 pm",
          second_day: "Thursday",
          second_day_time: "4 pm",
          seats_left: 1,
        },
      ],
    };
  }

  renderLiveBatchdatas = (item) => (
    <View
      style={[
        CommonStyles.shadowContainer_border_20,
        {
          flex: 1,
          backgroundColor: COLOR.WHITE,
          marginTop: normalize(12),
          marginBottom: normalize(12),
          marginStart: normalize(5),
          marginEnd: normalize(5),
        },
      ]}
    >
      <View
        style={{
          marginStart: normalize(10),
          marginTop: normalize(16),
          marginBottom: normalize(16),
          marginEnd: normalize(10),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <Text style={[CommonStyles.text_11_bold]}>Batch {item.number}</Text>
          {item.seats_left < 3 ? (
            <Text
              style={[
                CommonStyles.text_9_regular,
                { color: COLOR.TEXT_COLOR_ORANGE },
              ]}
            >
              {item.seats_left} seats left
            </Text>
          ) : (
            <View />
          )}
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: normalize(8),
          }}
        >
          <Text
            style={[
              CommonStyles.text_14_Regular,
              { color: COLOR.TEXT_ALPHA_GREY, textAlign: "left" },
            ]}
          >
            {item.first_day}
          </Text>
          <Text
            style={[
              CommonStyles.text_14_Regular,
              { color: COLOR.TEXT_ALPHA_GREY },
            ]}
          >
            {item.first_day_time}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: normalize(1),
          }}
        >
          <Text
            style={[
              CommonStyles.text_14_Regular,
              { color: COLOR.TEXT_ALPHA_GREY, textAlign: "left" },
            ]}
          >
            {item.second_day}
          </Text>
          <Text
            style={[
              CommonStyles.text_14_Regular,
              { color: COLOR.TEXT_ALPHA_GREY },
            ]}
          >
            {item.second_day_time}
          </Text>
        </View>
      </View>
    </View>
  );

  render() {
    const { batchLiveDatas } = this.state;

    const batchLiveDatas2 = [
      {
        id: 0,
        number: 1,
        first_day: "Tuesday",
        first_day_time: "4 pm",
        second_day: "Thursday",
        second_day_time: "4 pm",
        seats_left: 7,
      },
      {
        id: 1,
        number: 2,
        first_day: "Tuesday",
        first_day_time: "4 pm",
        second_day: "Thursday",
        second_day_time: "4 pm",
        seats_left: 2,
      },
      {
        id: 2,
        number: 3,
        first_day: "Tuesday",
        first_day_time: "4 pm",
        second_day: "Thursday",
        second_day_time: "4 pm",
        seats_left: 1,
      },
      {
        id: 3,
        number: 4,
        first_day: "Tuesday",
        first_day_time: "4 pm",
        second_day: "Thursday",
        second_day_time: "4 pm",
        seats_left: 7,
      },
      {
        id: 4,
        number: 5,
        first_day: "Tuesday",
        first_day_time: "4 pm",
        second_day: "Thursday",
        second_day_time: "4 pm",
        seats_left: 7,
      },
      {
        id: 5,
        number: 6,
        first_day: "Tuesday",
        first_day_time: "4 pm",
        second_day: "Thursday",
        second_day_time: "4 pm",
        seats_left: 3,
      },
      {
        id: 6,
        number: 7,
        first_day: "Tuesday",
        first_day_time: "4 pm",
        second_day: "Thursday",
        second_day_time: "4 pm",
        seats_left: 7,
      },
      {
        id: 7,
        number: 8,
        first_day: "Tuesday",
        first_day_time: "4 pm",
        second_day: "Thursday",
        second_day_time: "4 pm",
        seats_left: 1,
      },
    ];

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: COLOR.PRIMARY_BG,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={false}
          style={{
            flex: 1,
            marginStart: normalize(20),
            marginEnd: normalize(20),
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={[
                CommonStyles.text_18_semi_bold,
                { color: COLOR.TEXT_COLOR_BLUE, marginTop: normalize(20) },
              ]}
            >
              Choose Live Class Batch
            </Text>
            <Text
              style={[
                CommonStyles.text_12_Regular,
                { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(4) },
              ]}
            >
              2 days a week
            </Text>

            <View>
              {/* <FlatList
                            data={batchLiveDatas2}
                            renderItem={({ item }) => <Text>{item.id}</Text>}
                            keyExtractor={item => item.id}
                            numColumns={2}

                        />  */}
              <FlatList
                data={batchLiveDatas2}
                renderItem={({ item }) => this.renderLiveBatchdatas(item)}
                keyExtractor={(item) => item.id}
                numColumns={2}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ChooseLiveBatch;
