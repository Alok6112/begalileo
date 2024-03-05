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
} from "react-native";
import { connect } from "react-redux";
import * as Constants from "../../components/helpers/Constants";
import { COLOR, CommonStyles } from "../../config/styles";
import {
  IC_BATCH_SELECTION,
  IC_MIDAS_SELECTION,
  CARD_BTN_ARROW,
  LIVE_CLASS_TODAY,
  ICON_CLOCK,
  IC_SCHEDULE,
  IC_ACCURACY,
  IC_TIME_SPENT,
  IC_BADGE_SAMPLE_1,
  IC_BADGE_SAMPLE_2,
  IC_ACTIVITY,
  LIVE_CLASS_CARD_THUMB,
} from "../../assets/images";
import LinearGradient from "react-native-linear-gradient";
import { addToCart } from "../../actions/dashboard";
import Icon from "react-native-vector-icons/FontAwesome";
import { normalize, Card } from "react-native-elements";
import * as Progress from "react-native-progress";
import SvgUri from "react-native-svg-uri";
import SubscriptionTabs from "../../components/subscription_tab";
import AddCartFloatingButton from "../../components/AddCartFloatingButton";

class PaidUserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  onChooseBatchClick = () => {
    this.props.navigation.navigate(Constants.PreferLiveBatchScreen);
  };

  checkLiveClassStatus = () => {
    console.log("Check Live Class Status");

    const { currentSelectedKid, dashboardResponse } = this.props;
    return dashboardResponse.students.map((item) => {
      if (item.student_id == currentSelectedKid.student_id) {
        if (!item.live_batch_status) {
          return (
            <View
              style={[
                CommonStyles.shadowContainer_border_20,
                {
                  marginStart: normalize(2),
                  marginEnd: normalize(2),
                  borderRadius: normalize(20),
                  marginTop: normalize(20),
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginStart: normalize(5),
                  marginTop: normalize(16),
                  marginBottom: normalize(16),
                }}
              >
                <Image
                  style={{
                    height: normalize(100),
                    margin: normalize(5),
                    width: normalize(100),
                    resizeMode: "stretch",
                  }}
                  source={IC_BATCH_SELECTION}
                />

                <View
                  style={{
                    flex: 1,
                    marginTop: normalize(20),
                    marginBottom: normalize(20),
                    marginEnd: normalize(5),
                    marginStart: normalize(10),
                  }}
                >
                  <Text
                    style={[
                      CommonStyles.text_8_regular,
                      { color: COLOR.TEXT_ALPHA_GREY },
                    ]}
                  >
                    LIVE CLASS
                  </Text>
                  <Text
                    style={[
                      CommonStyles.text_12_bold,
                      { marginTop: normalize(8) },
                    ]}
                  >
                    Choose Live class batch
                  </Text>
                  {/* <Text style={[CommonStyles.text_12_Regular, { color: COLOR.TEXT_COLOR_ORANGE, marginTop: normalize(8) }]}>Pending</Text> */}
                  <TouchableOpacity
                    style={{ flexDirection: "row", marginTop: normalize(20) }}
                    onPress={this.onChooseBatchClick}
                  >
                    <Text
                      style={[
                        CommonStyles.text_12_bold,
                        {
                          flex: 1,
                          color: COLOR.TEXT_COLOR_BLUE,
                          alignSelf: "center",
                        },
                      ]}
                    >
                      Choose Batch
                    </Text>
                    <Image
                      style={{
                        height: normalize(28),
                        alignSelf: "center",
                        width: normalize(28),
                        resizeMode: "stretch",
                      }}
                      source={CARD_BTN_ARROW}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }
      }
    });
  };

  render() {
    return (
      <View>
        <View style={{ marginTop: normalize(20) }}>
          <Text style={[CommonStyles.text_18_semi_bold]}>
            Good things ahead!
          </Text>
          <Text
            style={[
              CommonStyles.text_14_Regular,
              { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(8) },
            ]}
          >
            Now *** is just 1 step away from online learning
          </Text>
          {this.props.currentSelectedKid && this.checkLiveClassStatus()}

          <View
            style={[
              CommonStyles.shadowContainer_border_20,
              {
                marginStart: normalize(2),
                marginEnd: normalize(2),
                marginTop: normalize(20),
                borderRadius: normalize(20),
              },
            ]}
          >
            <View
              style={{
                flexDirection: "row",
                marginStart: normalize(5),
                marginTop: normalize(16),
                marginBottom: normalize(2),
              }}
            >
              <Image
                style={{
                  height: normalize(100),
                  margin: normalize(5),
                  width: normalize(100),
                  resizeMode: "stretch",
                }}
                source={IC_MIDAS_SELECTION}
              />

              <View
                style={{
                  flex: 1,
                  marginTop: normalize(20),
                  marginBottom: normalize(20),
                  marginEnd: normalize(5),
                  marginStart: normalize(10),
                }}
              >
                <Text
                  style={[
                    CommonStyles.text_8_regular,
                    { color: COLOR.TEXT_ALPHA_GREY },
                  ]}
                >
                  Midas
                </Text>
                <Text
                  style={[
                    CommonStyles.text_12_bold,
                    { marginTop: normalize(8) },
                  ]}
                >
                  *** needs to give MIDAS test to begin
                </Text>
                <Text
                  style={[
                    CommonStyles.text_12_Regular,
                    { color: COLOR.TEXT_COLOR_ORANGE, marginTop: normalize(8) },
                  ]}
                >
                  This is a mandatory test
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginBottom: normalize(16) }}>
              <Text
                style={[
                  CommonStyles.text_12_bold,
                  {
                    flex: 1,
                    textAlign: "center",
                    color: COLOR.TEXT_COLOR_BLUE,
                    alignSelf: "center",
                  },
                ]}
              >
                Attend Test
              </Text>
              <Image
                style={{
                  height: normalize(28),
                  alignSelf: "center",
                  width: normalize(28),
                  resizeMode: "stretch",
                }}
                source={CARD_BTN_ARROW}
              />
            </View>
          </View>
        </View>

        <View style={{ marginTop: normalize(20) }}>
          <Text style={[CommonStyles.text_18_semi_bold]}>Live Class</Text>
          <Text
            style={[
              CommonStyles.text_14_Regular,
              { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(8) },
            ]}
          >
            Today
          </Text>
          <View
            style={[
              CommonStyles.shadowContainer_border_20,
              {
                marginTop: normalize(20),
                marginStart: normalize(1),
                marginEnd: normalize(1),
              },
            ]}
          >
            <View
              style={{
                flex: 1,
                height: 150,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,

                overflow: "hidden",
              }}
            >
              <Image
                style={{
                  height: normalize(150),
                  alignSelf: "center",
                  resizeMode: "contain",
                }}
                source={LIVE_CLASS_TODAY}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "flex-start",
                marginTop: normalize(16),
                marginStart: normalize(16),
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    CommonStyles.text_8_regular,
                    { color: COLOR.TEXT_ALPHA_GREY },
                  ]}
                >
                  MATH CONCEPT
                </Text>
                <Text
                  style={[
                    CommonStyles.text_14_bold,
                    { marginTop: normalize(2) },
                  ]}
                >
                  Count Forward within 10
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={[
                    CommonStyles.text_8_regular,
                    { color: COLOR.TEXT_ALPHA_GREY },
                  ]}
                >
                  THINK and REASON
                </Text>
                <Text
                  style={[
                    CommonStyles.text_14_bold,
                    { marginTop: normalize(2) },
                  ]}
                >
                  Patterns and Numbers
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: normalize(20),
                marginStart: normalize(16),
              }}
            >
              <Image
                style={{
                  height: normalize(16),
                  width: normalize(16),
                  resizeMode: "contain",
                }}
                source={ICON_CLOCK}
              />
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  { color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(8) },
                ]}
              >
                Starting in
              </Text>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  { color: COLOR.TEXT_COLOR_ORANGE, marginStart: normalize(5) },
                ]}
              >
                00:04:32
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginBottom: normalize(16),
                marginTop: normalize(25),
                marginStart: normalize(16),
              }}
            >
              <Text
                style={[
                  CommonStyles.text_12_bold,
                  {
                    flex: 1,
                    color: COLOR.TEXT_COLOR_BLUE,
                    alignSelf: "center",
                  },
                ]}
              >
                Join Class
              </Text>
              <Image
                style={{
                  height: normalize(28),
                  alignSelf: "center",
                  width: normalize(28),
                  marginEnd: normalize(16),
                  resizeMode: "contain",
                }}
                source={CARD_BTN_ARROW}
              />
            </View>
          </View>
        </View>

        <View style={{ marginTop: normalize(16) }}>
          <Text style={[CommonStyles.text_14_bold]}>Upcoming Live Class</Text>
          <View style={{ flexDirection: "row", marginTop: normalize(20) }}>
            <View>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  { color: COLOR.TEXT_ALPHA_GREY },
                ]}
              >
                M
              </Text>
              <Text style={[CommonStyles.text_12_bold]}>12</Text>
            </View>
            <View
              style={[
                CommonStyles.shadowContainer_border_20,
                {
                  backgroundColor: COLOR.WHITE,
                  flex: 1,
                  marginStart: normalize(25),
                },
              ]}
            >
              <View
                style={{ marginStart: normalize(16), marginTop: normalize(16) }}
              >
                <Text
                  style={
                    (CommonStyles.text_8_regular,
                    { color: COLOR.TEXT_ALPHA_GREY })
                  }
                >
                  Math Concept
                </Text>
                <Text
                  style={[
                    CommonStyles.text_14_bold,
                    { marginTop: normalize(2) },
                  ]}
                >
                  Count Forward within 10
                </Text>
              </View>
              <View
                style={{
                  height: normalize(1),
                  backgroundColor: COLOR.BORDER_COLOR_GREY,
                  marginTop: normalize(8),
                }}
              />
              <View
                style={{
                  marginStart: normalize(16),
                  marginTop: normalize(8),
                  marginBottom: normalize(16),
                }}
              >
                <Text
                  style={
                    (CommonStyles.text_8_regular,
                    { color: COLOR.TEXT_ALPHA_GREY })
                  }
                >
                  THINK and REASON
                </Text>
                <Text
                  style={[
                    CommonStyles.text_14_bold,
                    { marginTop: normalize(2) },
                  ]}
                >
                  Patterns and Numbers
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: normalize(20),
              alignSelf: "center",
            }}
          >
            <Image
              style={{
                height: normalize(16),
                width: normalize(16),
                alignSelf: "center",
                resizeMode: "contain",
              }}
              source={IC_SCHEDULE}
            />
            <Text
              style={[
                CommonStyles.text_12_bold,
                { color: COLOR.TEXT_COLOR_GREEN, marginStart: normalize(8) },
              ]}
            >
              View Live Class Schedule
            </Text>
          </View>
        </View>

        <View
          style={[
            CommonStyles.shadowContainer_border_20,
            {
              marginTop: normalize(20),
              marginStart: normalize(2),
              marginEnd: normalize(2),
            },
          ]}
        >
          <Image
            style={{
              height: normalize(32),
              width: normalize(32),
              marginTop: normalize(16),
              marginStart: normalize(16),
              resizeMode: "contain",
            }}
            source={IC_ACCURACY}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "flex-start",
              marginTop: normalize(8),
              marginBottom: normalize(16),
              marginStart: normalize(16),
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={[CommonStyles.text_14_bold]}>Accuracy</Text>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  { marginTop: normalize(2) },
                ]}
              >
                Average of correct answers given by kid
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <Text style={[CommonStyles.text_32_regular]}>79</Text>
                <Text style={[CommonStyles.text_12_Regular, {}]}>%</Text>
                <Icon
                  style={{ marginStart: normalize(8) }}
                  size={15}
                  name="arrow-up"
                  color={COLOR.TEXT_COLOR_GREEN}
                />
              </View>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  { marginTop: normalize(2) },
                ]}
              >
                Last 7 days
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            CommonStyles.shadowContainer_border_20,
            {
              marginTop: normalize(20),
              marginStart: normalize(2),
              marginEnd: normalize(2),
            },
          ]}
        >
          <Image
            style={{
              height: normalize(32),
              width: normalize(32),
              marginTop: normalize(16),
              marginStart: normalize(16),
              resizeMode: "contain",
            }}
            source={IC_TIME_SPENT}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "flex-start",
              marginTop: normalize(8),
              marginBottom: normalize(16),
              marginStart: normalize(16),
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={[CommonStyles.text_14_bold]}>Time Spent</Text>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  { marginTop: normalize(2) },
                ]}
              >
                Total time spend by kid
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <Text style={[CommonStyles.text_32_regular]}>7:30</Text>
                <Text style={[CommonStyles.text_12_Regular, {}]}>hrs</Text>
                <Icon
                  style={{ marginStart: normalize(8) }}
                  size={15}
                  name="arrow-down"
                  color={COLOR.TEXT_COLOR_GREEN}
                />
              </View>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  { marginTop: normalize(2) },
                ]}
              >
                Last 7 days
              </Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: normalize(16) }}>
          <Text style={[CommonStyles.text_14_bold]}>Recent Activity</Text>
          <View style={{ flexDirection: "row", marginTop: normalize(20) }}>
            <View>
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  { color: COLOR.TEXT_ALPHA_GREY },
                ]}
              >
                M
              </Text>
              <Text style={[CommonStyles.text_12_bold]}>12</Text>
            </View>
            <View
              style={{
                flex: 1,
                marginStart: normalize(20),
                marginEnd: normalize(2),
              }}
            >
              <View>
                <Text
                  style={[
                    CommonStyles.text_8_regular,
                    { color: COLOR.TEXT_ALPHA_GREY },
                  ]}
                >
                  Math Concept
                </Text>
                <View
                  style={[
                    CommonStyles.shadowContainer_border_20,
                    { backgroundColor: COLOR.WHITE, marginTop: normalize(8) },
                  ]}
                >
                  <View style={{ margin: normalize(16) }}>
                    <Text style={[CommonStyles.text_14_bold]}>
                      Count with Counters within 10
                    </Text>
                    <Text
                      style={[
                        CommonStyles.text_12_Regular,
                        {
                          color: COLOR.TEXT_ALPHA_GREY,
                          marginTop: normalize(2),
                        },
                      ]}
                    >
                      From Numbers upto 10
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: normalize(8),
                        alignItems: "center",
                      }}
                    >
                      <Icon
                        style={{ marginStart: normalize(8) }}
                        size={15}
                        name="check"
                        color={COLOR.TEXT_COLOR_GREEN}
                      />
                      <Text
                        style={[
                          CommonStyles.text_12_Regular,
                          {
                            color: COLOR.TEXT_ALPHA_GREY,
                            marginStart: normalize(5),
                          },
                        ]}
                      >
                        7
                      </Text>
                      <Icon
                        style={{ marginStart: normalize(8) }}
                        size={15}
                        name="times"
                        color={COLOR.RED}
                      />

                      <Text
                        style={[
                          CommonStyles.text_12_Regular,
                          {
                            color: COLOR.TEXT_ALPHA_GREY,
                            marginStart: normalize(5),
                          },
                        ]}
                      >
                        3
                      </Text>
                      <Text
                        style={[
                          CommonStyles.text_12_Regular,
                          {
                            color: COLOR.TEXT_ALPHA_GREY,
                            marginStart: normalize(10),
                          },
                        ]}
                      >
                        00 : 37 hrs
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={{ marginTop: normalize(20) }}>
                <Text
                  style={[
                    CommonStyles.text_8_regular,
                    { color: COLOR.TEXT_ALPHA_GREY },
                  ]}
                >
                  THINK and REASON
                </Text>
                <View
                  style={[
                    CommonStyles.shadowContainer_border_20,
                    { backgroundColor: COLOR.WHITE, marginTop: normalize(8) },
                  ]}
                >
                  <View style={{ margin: normalize(16) }}>
                    <Text style={[CommonStyles.text_14_bold]}>
                      Patterns and Numbers
                    </Text>
                    <Text
                      style={[
                        CommonStyles.text_12_Regular,
                        {
                          color: COLOR.TEXT_ALPHA_GREY,
                          marginTop: normalize(2),
                        },
                      ]}
                    >
                      From Analogical Thinking
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: normalize(8),
                        alignItems: "center",
                      }}
                    >
                      <Icon
                        style={{ marginStart: normalize(8) }}
                        size={15}
                        name="check"
                        color={COLOR.TEXT_COLOR_GREEN}
                      />
                      <Text
                        style={[
                          CommonStyles.text_12_Regular,
                          {
                            color: COLOR.TEXT_ALPHA_GREY,
                            marginStart: normalize(5),
                          },
                        ]}
                      >
                        17
                      </Text>
                      <Icon
                        style={{ marginStart: normalize(8) }}
                        size={15}
                        name="times"
                        color={COLOR.RED}
                      />

                      <Text
                        style={[
                          CommonStyles.text_12_Regular,
                          {
                            color: COLOR.TEXT_ALPHA_GREY,
                            marginStart: normalize(5),
                          },
                        ]}
                      >
                        3
                      </Text>
                      <Text
                        style={[
                          CommonStyles.text_12_Regular,
                          {
                            color: COLOR.TEXT_ALPHA_GREY,
                            marginStart: normalize(10),
                          },
                        ]}
                      >
                        00 : 37 hrs
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ marginTop: normalize(20) }}>
                <Text
                  style={[
                    CommonStyles.text_8_regular,
                    { color: COLOR.TEXT_ALPHA_GREY },
                  ]}
                >
                  BADGES WON
                </Text>
                <View
                  style={[
                    CommonStyles.shadowContainer_border_20,
                    { backgroundColor: COLOR.WHITE, marginTop: normalize(8) },
                  ]}
                >
                  <View style={{ flexDirection: "row", margin: normalize(16) }}>
                    <Image
                      style={{
                        height: normalize(88),
                        width: normalize(88),
                        alignSelf: "center",
                        resizeMode: "contain",
                      }}
                      source={IC_BADGE_SAMPLE_1}
                    />
                    <Image
                      style={{
                        height: normalize(88),
                        width: normalize(88),
                        alignSelf: "center",
                        resizeMode: "contain",
                      }}
                      source={IC_BADGE_SAMPLE_2}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: normalize(20),
              alignSelf: "center",
            }}
          >
            <Image
              style={{
                height: normalize(16),
                width: normalize(16),
                alignSelf: "center",
                resizeMode: "contain",
              }}
              source={IC_ACTIVITY}
            />
            <Text
              style={[
                CommonStyles.text_12_bold,
                { color: COLOR.TEXT_COLOR_GREEN, marginStart: normalize(8) },
              ]}
            >
              View All Activites
            </Text>
          </View>

          <View
            style={{ marginTop: normalize(20), marginBottom: normalize(20) }}
          >
            <Text style={[CommonStyles.text_14_bold]}>Currently Learning</Text>
            <View
              style={[
                CommonStyles.shadowContainer_border_20,
                {
                  marginTop: normalize(20),
                  marginStart: normalize(1),
                  marginEnd: normalize(1),
                },
              ]}
            >
              <View style={{ margin: normalize(16) }}>
                <Text
                  style={[
                    CommonStyles.text_8_bold,
                    { color: COLOR.TEXT_ALPHA_GREY },
                  ]}
                >
                  MATH CONCEPT
                </Text>
                <Text
                  style={[
                    CommonStyles.text_14_bold,
                    { marginTop: normalize(2) },
                  ]}
                >
                  Numbers upto 10
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: normalize(8),
                    justifyContent: "space-evenly",
                  }}
                >
                  <Text
                    style={[
                      CommonStyles.text_12_Regular,
                      { color: COLOR.TEXT_ALPHA_GREY },
                    ]}
                  >
                    6 Sub Concepts
                  </Text>
                  <Text
                    style={[
                      CommonStyles.text_12_Regular,
                      { color: COLOR.TEXT_ALPHA_GREY },
                    ]}
                  >
                    1 Concept Test
                  </Text>
                </View>
                <View style={{ marginTop: normalize(20) }}>
                  <Progress.Bar
                    progress={0.5}
                    width={normalize(230)}
                    color={COLOR.TEXT_COLOR_GREEN}
                  />
                  <Text
                    style={[
                      CommonStyles.text_9_regular,
                      { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(8) },
                    ]}
                  >
                    50% Completed
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.dashboard,
    addCartStatus: state.dashboard.add_cart_status,
    get_cart_list_response: state.dashboard.get_cart_list_response,
    get_cart_list_status: state.dashboard.get_cart_list_status,
    dashboardResponse: state.dashboard.dashboard_response,
    currentSelectedKid: state.dashboard.current_selected_kid,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PaidUserDashboard);
