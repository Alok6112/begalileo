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
  IC_PROFILE_PIC,
  IMG_SARTHAK,
  IMG_SHAKSHI,
  IC_VIEW_REPORT,
  IC_TICK,
} from "../../assets/images";
import LinearGradient from "react-native-linear-gradient";
import { addToCart } from "../../actions/dashboard";
import Icon from "react-native-vector-icons/FontAwesome";
import { normalize, Card } from "react-native-elements";
const MONTH_SEL = "MONTH_SEL_";
const CONCEPT_SEL = "CONCEPT_SEL_";

class CurriculamSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthlyData: [
        {
          title: "Month 1 begins",
          isActive: false,
          isDone: true,
          data: [
            {
              title: "Midas",
              isReport: true,
              data: [],
            },
            {
              title: "Numbers upto 10",
              header: "MATH CONCEPT",
              isReport: false,
              data: [
                {
                  title: "Count Forward within 10",
                  progress: 20,
                  isReport: true,
                },
                {
                  title: "Count with Counters within 10",
                  progress: 20,
                  isReport: true,
                },
                {
                  title: "Count with Objects within 10",
                  progress: 20,
                  isReport: true,
                },
                {
                  title: "Represent Numbers within 10",
                  progress: 45,
                  isReport: false,
                },
              ],
            },
            {
              title: "Think and Reason",
              header: "Analogical Thinking",
              isReport: true,
              data: [
                {
                  title: "Count Forward within 10",
                  progress: 20,
                  isReport: true,
                },
                {
                  title: "Count Forward within 10",
                  progress: 20,
                  isReport: true,
                },
                {
                  title: "Count Forward within 10",
                  progress: 20,
                  isReport: true,
                },
              ],
            },
          ],
        },
        {
          title: "Month 2 begins",
          isActive: true,
          isDone: false,
          data: [
            {
              title: "Midas",
              isReport: true,
              data: [],
            },
            {
              title: "Midas",
              header: "MATH CONCEPT",
              isReport: true,
              data: [
                {
                  title: "Count Forward within 10",
                  progress: 20,
                  isReport: true,
                },
                {
                  title: "Count Forward within 10",
                  progress: 20,
                  isReport: true,
                },
                {
                  title: "Count Forward within 10",
                  progress: 20,
                  isReport: true,
                },
              ],
            },
          ],
        },
        {
          title: "Month 3 begins",
          isActive: false,
          isDone: false,
          data: [
            {
              title: "Midas",
              isReport: true,
              data: [],
            },
            {
              title: "Midas",
              header: "MATH CONCEPT",
              isReport: true,
              data: [
                {
                  title: "Count Forward within 10",
                  progress: 20,
                  isReport: true,
                },
                {
                  title: "Count Forward within 10",
                  progress: 20,
                  isReport: true,
                },
                {
                  title: "Count Forward within 10",
                  progress: 20,
                  isReport: true,
                },
              ],
            },
          ],
        },
        {
          title: "Month 4 begins",
          isActive: false,
          isDone: false,
          data: [
            {
              title: "Midas",
              isReport: true,
              data: [],
            },
            {
              title: "Midas",
              header: "MATH CONCEPT",
              isReport: true,
              data: [
                {
                  title: "Count Forward within 10",
                  progress: 20,
                  isReport: true,
                },
                {
                  title: "Count Forward within 10",
                  progress: 20,
                  isReport: true,
                },
                {
                  title: "Count Forward within 10",
                  progress: 20,
                  isReport: true,
                },
              ],
            },
          ],
        },
        {
          title: "Month 5 begins",
          isActive: false,
          isDone: false,
          data: [
            {
              title: "Midas",
              isReport: true,
              data: [],
            },
            {
              title: "Midas",
              header: "MATH CONCEPT",
              isReport: true,
              data: [
                {
                  title: "Count Forward within 10",
                  progress: 20,
                  isReport: true,
                },
                {
                  title: "Count Forward within 10",
                  progress: 20,
                  isReport: true,
                },
                {
                  title: "Count Forward within 10",
                  progress: 20,
                  isReport: true,
                },
              ],
            },
          ],
        },
      ],
    };
  }

  conceptChildListData = (dataElement) => {
    return dataElement.map((element, index) => {
      return (
        <View
          key={index}
          style={{
            flexDirection: "row",
            marginTop: normalize(20),
            marginStart: normalize(20),
          }}
        >
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: COLOR.BG_FAQ_GRERY,
              borderRadius: 20,
            }}
          >
            <Text style={[CommonStyles.text_14_bold]}>
              {element.title}
              {element.progress}
            </Text>
          </View>

          <Image
            style={{
              height: normalize(15),
              width: normalize(15),
              resizeMode: "contain",
              marginStart: normalize(8),
              alignSelf: "center",
            }}
            source={IC_VIEW_REPORT}
          />
        </View>
      );
    });
  };

  monthlyChildListData = (dataElement, isActive) => {
    return dataElement.map((element, index) => {
      return (
        <View style={{ flexDirection: "row", marginStart: -3 }}>
          {isActive ? (
            <View
              style={{ backgroundColor: COLOR.LIGHT_BORDER_GREEN, width: 3 }}
            />
          ) : (
            <View
              style={{ backgroundColor: COLOR.BORDER_COLOR_GREY, width: 3 }}
            />
          )}

          <View key={index} style={{ marginTop: normalize(10) }}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => this.onPressConcept(index)}>
                {element.header && (
                  <Text
                    style={[
                      CommonStyles.text_8_regular,
                      { color: COLOR.TEXT_ALPHA_GREY, marginStart: 20 },
                    ]}
                  >
                    {element.header}
                  </Text>
                )}

                <View style={{ flexDirection: "row" }}>
                  {isActive && (
                    <Image
                      style={{
                        paddingVertical: 10,
                        height: normalize(10),
                        width: normalize(10),
                        resizeMode: "contain",
                        alignSelf: "center",
                        marginStart: -8,
                        backgroundColor: COLOR.WHITE,
                      }}
                      source={IC_TICK}
                    />
                  )}

                  <Text
                    style={[
                      CommonStyles.text_14_bold,
                      { marginTop: normalize(8), marginStart: 20 },
                    ]}
                  >
                    {element.title}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {element.isReport && (
              <View
                style={{
                  flexDirection: "row",
                  marginTop: normalize(8),
                  marginStart: 20,
                }}
              >
                <Image
                  style={{
                    height: normalize(15),
                    width: normalize(15),
                    resizeMode: "contain",
                    alignSelf: "center",
                  }}
                  source={IC_VIEW_REPORT}
                />
                <Text
                  style={[
                    CommonStyles.text_12_regular,
                    {
                      color: COLOR.TEXT_COLOR_GREEN,
                      marginStart: normalize(10),
                    },
                  ]}
                >
                  View Report
                </Text>
              </View>
            )}

            <View style={{ flexDirection: "row" }}>
              <View
                style={{ backgroundColor: COLOR.BORDER_COLOR_GREY, width: 3 }}
              />
              <View>
                {this.state.selectedConcept == CONCEPT_SEL + index ? (
                  this.conceptChildListData(element.data)
                ) : (
                  <View />
                )}
              </View>
            </View>
          </View>
        </View>
      );
    });
  };

  onPressConcept = (index) => {
    if (this.state.selectedConcept == CONCEPT_SEL + index) {
      this.setState({
        selectedConcept: "",
      });
    } else {
      this.setState({
        selectedConcept: CONCEPT_SEL + index,
      });
    }
  };

  onPressMonth = (index) => {
    if (this.state.selectedMonth == MONTH_SEL + index) {
      this.setState({
        selectedMonth: "",
      });
    } else {
      this.setState({
        selectedMonth: MONTH_SEL + index,
      });
    }
  };

  monthlyListData = () => {
    return this.state.monthlyData.map((element, index) => {
      return (
        <View style={{ flexDirection: "row" }}>
          {element.isDone || element.isActive ? (
            <View
              style={{ backgroundColor: COLOR.LIGHT_BORDER_GREEN, width: 3 }}
            />
          ) : (
            <View
              style={{ backgroundColor: COLOR.BORDER_COLOR_GREY, width: 3 }}
            />
          )}

          <View key={index}>
            <TouchableOpacity
              style={{ marginTop: normalize(10), marginStart: normalize(16) }}
              onPress={() => {
                this.onPressMonth(index);
              }}
            >
              <Text
                style={[
                  CommonStyles.text_12_Regular,
                  { color: COLOR.TEXT_ALPHA_GREY },
                ]}
              >
                {element.title}
              </Text>
            </TouchableOpacity>

            <View>
              {this.state.selectedMonth == MONTH_SEL + index ? (
                this.monthlyChildListData(
                  element.data,
                  element.isActive || element.isDone
                )
              ) : (
                <View />
              )}
            </View>
          </View>
        </View>
      );
    });
  };

  render() {
    return (
      <View style={{ flex: 1, paddingStart: 20, backgroundColor: COLOR.WHITE }}>
        <View>{this.monthlyListData()}</View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.authenticate,
  };
};

const mapDispatchToProps = {};

const styles = StyleSheet.create({
  tabItem: {
    paddingBottom: normalize(8),
  },
  tabItemSelected: {
    paddingBottom: normalize(8),
    borderBottomColor: COLOR.TAB_BOTTOM_BLUE,
    borderBottomWidth: 2,
  },
  tabItemText: {
    color: COLOR.TEXT_COLOR_BLACK,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CurriculamSchedule);
