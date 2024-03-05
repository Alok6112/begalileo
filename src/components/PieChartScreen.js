import React, { Component } from "react";
import { View, Text } from "react-native";
import { PieChart, Grid, XAxis } from "react-native-svg-charts";
import { Dimensions } from "react-native";
import { COLOR, PIE_CHART_COLORS, CommonStyles } from "../config/styles";
import { normalize } from "react-native-elements";
import PieChartCircle from "../components/PieChartCircle";

const screenWidth = Dimensions.get("window").width;
let dataPercent = [];
class PieChartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      subjects: ["Math Zone", "Logic Zone", "Game Zone"],
    };
  }

  getPercentValues = (itemData) => {
    var x = itemData[0];
    var y = itemData[1];
    var z = itemData[2];
    var xPercent = 0;
    var zPercent = 0;
    var yPercent = 0;

    var total = x + y + z;
    console.log("Time Spent values");
    console.log(x + "-" + y + "-" + z + "-" + total);
    if (x != 0) xPercent = (x / total) * 100;
    if (y != 0) yPercent = (y / total) * 100;
    if (z != 0) zPercent = (z / total) * 100;

    if (xPercent % 1 > 0.5) dataPercent[0] = Math.ceil(xPercent);
    else dataPercent[0] = Math.floor(xPercent);
    if (yPercent % 1 > 0.5) dataPercent[1] = Math.ceil(yPercent);
    else dataPercent[1] = Math.floor(yPercent);
    if (zPercent % 1 > 0.5) dataPercent[2] = Math.ceil(zPercent);
    else dataPercent[2] = Math.floor(zPercent);
  };

  componentDidMount() {
    console.log("Pie Chart Screen");
    console.log(this.props.accuracyData);
    var mathZone = 0;
    var logicZone = 0;
    var gameZone = 0;
    var testZone = 0;
    var datas = [];
    var timeSpentData = this.props.accuracyData;
    console.log("TimeSpent ", this.props.accuracyData);

    mathZone += timeSpentData.overall_math_time_percent;
    logicZone += timeSpentData.overall_logic_time_percent;
    gameZone += timeSpentData.overall_game_time_percent;
    testZone += timeSpentData.overall_pre_post_time_percent;

    //for testing
    // mathZone = 40.0;
    // logicZone = 25.0;
    // gameZone = 25.0;
    // testZone = 10.0;
    // testZone += timeSpentData.overall_pre_post_time_percent;

    // this.props.accuracyData.map((element, index) => {
    //     mathZone += element.overall_math_time_percent;
    //     logicZone += element.overall_logic_time_percent;
    //     gameZone += element.overall_game_time_percent;
    //     testZone += element.overall_pre_post_time_percent;

    // })

    // datas[0] = mathZone;
    // datas[1] = logicZone;
    // datas[2] = gameZone;
    var totalLength = 4;
    datas[0] = mathZone;
    datas[1] = logicZone;
    datas[2] = gameZone;
    // datas[3] = testZone;

    this.getPercentValues(datas);

    this.setState({
      data: datas,
    });
  }

  mappedDatas() {
    const { data } = this.state;
    return this.state.subjects.map((item, index) => {
      return (
        <View
          style={{ flexDirection: "row", flex: 1, marginTop: normalize(8) }}
          key={index}
        >
          <View
            style={[
              CommonStyles.circleRoundBlack,
              { alignSelf: "center", backgroundColor: PIE_CHART_COLORS[index] },
            ]}
          />

          <Text
            style={[
              CommonStyles.text_12_Regular,
              { marginStart: normalize(8) },
            ]}
          >
            {item + " - " + dataPercent[index] + "%"}
          </Text>
        </View>
      );
    });
  }

  render() {
    const fill = COLOR.WHITE;

    const { data } = this.state;
    const randomColor = () =>
      ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
        0,
        7
      );

    const pieData = data.map((value, index) => ({
      value,
      svg: { fill: PIE_CHART_COLORS[index] },
      key: `pie-${index}`,
    }));

    const Labels = ({ slices }) => {
      return slices.map((slice, index) => {
        const { labelCentroid, pieCentroid, data } = slice;
        console.log("Slice");
        console.log(data);
        return (
          <PieChartCircle
            slice={slice}
            value={dataPercent[index]}
            index={index}
          />
        );
      });
    };

    return (
      <View>
        <PieChart
          style={{ height: 200 }}
          data={pieData}
          innerRadius={20}
          outerRadius={55}
          labelRadius={80}
        >
          <Labels />
        </PieChart>
        <View style={{ marginTop: normalize(25) }}>{this.mappedDatas()}</View>
      </View>
    );
  }
}

export default PieChartScreen;
