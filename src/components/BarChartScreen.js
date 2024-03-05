import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AreaChart, Path, XAxis, YAxis } from "react-native-svg-charts";
import { Dimensions } from "react-native";
import {
  COLOR,
  BAR_CHART_COLORS,
  BAR_CHART_COLOR_LINES,
} from "../config/styles";
import { normalize } from "react-native-elements";
import * as shape from "d3-shape";
import { LineChart } from "react-native-chart-kit";
import { getDisplayFormattedMonthDay } from "./helpers/CustomUtilMethods";
const screenWidth = Dimensions.get("window").width;

class BarChartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: [[], []],
      xAxisData: [],
      xAxisDataValue: [],
    };
  }

  componentDidMount() {
    console.log("Bar Chart Screen");
    console.log(this.props.accuracyData);
    var data1 = [];
    var data2 = [];
    var xData = [];
    var xDataVal = [];
    var totalArray = [];
    this.props.accuracyData.map((element, index) => {
      data1[index] = element.math_zone_accuracy;
      data2[index] = element.logic_zone_accuracy;
      (xData[index] = index), (xDataVal[index] = element.day);
    });
    console.log("DAta 1", data1);
    console.log("DAta 2", data2);
    console.log("X data", xData);
    totalArray[0] = data1;
    totalArray[1] = data2;

    this.setState({
      datas: totalArray,
      xAxisData: xData,
      xAxisDataValue: xDataVal,
    });
  }

  getXAxisData = (index) => <Text>SUN</Text>;

  getXvalue = (index) => {
    let displayValue = getDisplayFormattedMonthDay(
      this.state.xAxisDataValue[index]
    );
    console.log("X AXIS", displayValue);
    return displayValue;
  };

  graphList = () => {
    const { datas, xAxisData, colors, colorLines } = this.state;

    return datas.map((element, index) => {
      console.log("Element ", element);
      const Line = ({ line }) => (
        <Path
          key={"line "}
          d={line}
          stroke={BAR_CHART_COLOR_LINES[index]}
          fill={"none"}
        />
      );
      return (
        <AreaChart
          key={index}
          style={StyleSheet.absoluteFill}
          data={element}
          svg={{ fill: BAR_CHART_COLORS[index] }}
          contentInset={{ top: 30, bottom: 0 }}
          curve={shape.curveNatural}
        >
          <Line />
          <XAxis
            style={{ marginHorizontal: -10 }}
            data={xAxisData}
            formatLabel={(value, index) => this.getXvalue(index)}
            contentInset={{ left: 20, right: 20 }}
            svg={{ fontSize: 10, fill: "black", fontWeight: "bold" }}
          />
        </AreaChart>
      );
    });
  };

  render() {
    const { datas } = this.state;

    const keys = ["apples", "bananas", "cherries", "dates"];

    return (
      <View style={{ height: 200, marginTop: 20 }}>
        {this.graphList()}
        {/* <AreaChart
                    style={{ flex: 1 }}
                    data={data}
                    svg={{ fill: 'rgba(255, 220, 93, 0.5)' }}
                    contentInset={{ top: 20, bottom: 20 }}
                    curve={shape.curveNatural}
                >
                    <Line />
                </AreaChart>

                <AreaChart
                    style={StyleSheet.absoluteFill}
                    data={data2}
                    svg={{ fill: 'rgba(154, 214, 227, 0.5)' }}
                    contentInset={{ top: 20, bottom: 20 }}
                    curve={shape.curveNatural}
                /> */}
      </View>
    );
  }
}

export default BarChartScreen;
