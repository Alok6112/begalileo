import React, { Component } from "react";
import { Circle, Line, G, Text } from "react-native-svg";
import { COLOR, PIE_CHART_COLORS, CommonStyles } from "../config/styles";

const PieChartCircle = ({ slice, value, index }) => {
  const { labelCentroid, pieCentroid, data } = slice;
  return (
    <G key={index}>
      <Line
        x1={labelCentroid[0]}
        y1={labelCentroid[1]}
        x2={pieCentroid[0]}
        y2={pieCentroid[1]}
        stroke={data.svg.fill}
      />

      <Circle
        cx={labelCentroid[0]}
        cy={labelCentroid[1]}
        r={15}
        fill={data.svg.fill}
      />

      <Text
        fill={COLOR.WHITE}
        stroke={COLOR.WHITE}
        fontSize="12"
        fontWeight="bold"
        x={labelCentroid[0]}
        y={labelCentroid[1] + 5}
        textAnchor="middle"
      >
        {value}
      </Text>
    </G>
  );
};

export default PieChartCircle;
