import React from "react";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";

export default function HtmlViwer({source,widthOfPIc,isQuestion,isColumnView,isBlack,isWhite}) {
  const columView = isQuestion ?{
    html: `
<div style=' text-align:center; display: flex; flex-direction: row;flex-wrap: wrap; justify-content: center; align-Items:center; font-style: normal;font-size: 18px; font-weight: 700; color:#233584'>
  ${source.html}
</div></body>`
} : {
      html: `
  <div style=' text-align:center; display: flex; flex-direction: row;flex-wrap: wrap;'>
    ${source.html}
  </div>`
  };

  const question = isBlack ?{
      html: `
  <span style='font-size: 20px; color: black; font-weight: bold'>
    ${source.html}
  </span>
  `
  }: isWhite ? {
    html: `
<span style='font-size: 20px; color: white; font-weight: bold'>
  ${source.html}
</span>
`
}:{
      html: `
  <span style=' font-size: 20px; color: #233584; font-weight: bold'>
    ${source.html}
  </span>
  `
  }

// console.log("isColumnView",isColumnView);
// console.log("isQuestion",isQuestion);
  //console.log(mainSource);
  const { width } = useWindowDimensions();
  return (
    <RenderHtml
      contentWidth={widthOfPIc ? widthOfPIc : width}
      //source={mainSource}
      //source={source}
      source={ isColumnView == true ?columView : isQuestion == true ? question : source}
    />
  );
}
