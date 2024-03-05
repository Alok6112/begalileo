import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import MathView, { MathText } from "react-native-math-view";
import { decode } from "html-entities";

const QuestionPartBuilder = ({
  data,
  isWhite,
  imgSize,
  isOutputModel,
  aspectRatio,
  type,
}) => {
  const [questionNameContent, setQuestionNameContent] = useState([]);
  console.log("question data in QuestionPartBuilder", data);
  function segregateString(inputString) {
    console.log("inputString from useeffect",inputString)
    inputString = inputString.replaceAll(
      "<div><br></div>",
      "<div>nextlineKey</div>"
    );
    inputString = inputString.replaceAll("<br/>", "\n");
    inputString = inputString.replaceAll("<br>", "\n");
    inputString = inputString.replaceAll("</br>", "\n");

    inputString = inputString.replaceAll("&nbsp;", " ");
    inputString = inputString.replaceAll("&nbsp", " ");

    inputString = inputString.replaceAll("&amp;", "&");
    inputString = inputString.replaceAll("&lt;", "<");
    inputString = inputString.replaceAll("&gt;", ">");
    // inputString = inputString.replaceAll('&quot;','"')

    if (type == "matchObjectVerticalKeying") {
      inputString = inputString.replaceAll("<div>", "<div>nextlineKey");
      inputString = inputString.replace("<div>nextlineKey", "<div>");
    }

    // Regular expression to match HTML tags
    const htmlRegex = /<[^>]+>/g;

    // Split the input string into an array of blocks based on HTML tags
    const blocks = inputString.split(htmlRegex);

    // Extract the HTML tags and intersperse them with the blocks
    const htmlTags = inputString.match(htmlRegex);

    const result = [];
    for (let i = 0; i < blocks.length; i++) {
      result.push(blocks[i]);
      if (i < htmlTags?.length) {
        result.push(htmlTags[i]);
      }
    }

    return result;
  }

  //its to test html content or not
  function testHtmlContent(ele) {
    return /<\/?[a-z][\s\S]*>/i.test(ele);
  }

  function findTheIndexesOfContinousImgs(output) {
    let newArr = [],
      imgArr = [];

    for (let i = 0; i < output.length; i++) {
      if (testHtmlContent(output[i]) && output[i].includes("<img")) {
        imgArr.push(output[i]);
      } else {
        if (imgArr.length != 0) {
          if (imgArr.length >= 2) {
            newArr.push("nextlineKey");
          }
          newArr.push(imgArr);
          imgArr = [];
          i -= 1;
          continue;
        }

        if (testHtmlContent(output[i]) && output[i].includes("mq-selectable")) {
          newArr.push(output[i]);
          newArr.push(output[i + 1]);
          newArr.push(output[i + 2]);
          i += 2;
        } else if (
          testHtmlContent(output[i]) &&
          !output[i].includes("mq-selectable")
        ) {
          if (!output[i + 1]?.includes("<img") && !testHtmlContent(output[i])) {
            newArr.push(output[i + 1]);
            i += 1;
          }
        } else {
          newArr.push(output[i]);
        }
      }
    }

    if (imgArr.length != 0) {
      newArr.push(imgArr);
      imgArr = [];
    }

    return newArr;
  }

  useEffect(() => {
    let output = segregateString(" " + data);
    //this extra space is for to know if the mathquill doesn't have before string then to render mathquill in the logic i+1 is checking for mathquill there or not
    console.log("output in uneffect",output)
    output = output.filter((e) => (e == " " ? 0 : 1));
    output = output.filter((e) => (e == "" ? 0 : 1));
   
    output = findTheIndexesOfContinousImgs(output);

    output.map((item, i) => {
      console.log(i, item);
    });
    setQuestionNameContent([" ", ...output]);
  }, [data]);
  return (
    // <View>
    //   <Text>Testing</Text>
    // </View>
    <View
      style={
        isOutputModel == true
          ? {}
          : { display: "flex", flexDirection: "row", flexWrap: "wrap" }
      }
    >
      {questionNameContent.map((item, i) => {
        if (testHtmlContent(item) && !item.includes("mq-selectable")) {
          if (typeof item != "string") {
            return (
              <View>
                <View
                  style={
                    item?.length > 1
                      ? {
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                        }
                      : { width: "auto" }
                  }
                >
                  {item?.map((ele, i) => {
                    let arr = ele.match(`src\s*=\s*"(.+?)"`);
                    return (
                      <View
                        style={{
                          width: "auto",
                          height:
                            type == "matchobjectshorizontal" && item?.length > 1
                              ? 50
                              : imgSize
                              ? imgSize
                              : 150,
                          margin: 1,
                        }}
                      >
                        <Image
                          source={{ uri: arr[1] }}
                          style={{
                            height: "100%",
                            width: "100%",

                            aspectRatio: aspectRatio
                              ? aspectRatio
                              : type == "horizontalPicture" && item?.length == 1
                              ? 2
                              : 1,
                            resizeMode: "contain",
                          }}
                        />
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          }
        }

        if (questionNameContent[i + 1]?.includes("mq-selectable")) {
          let latex = questionNameContent[i + 2].substring(
            1,
            questionNameContent[i + 2].length - 1
          );
          latex = latex.replaceAll("_", "\\_");
          if (questionNameContent[i]?.includes("nextlineKey")) {
            return (
              <View style={{ width: "100%" }}>
                <MathView
                  config={{ inline: false, ex: 7, em: 7 }}
                  style={{ color: isWhite ? "white" : "black" }}
                  math={`${latex}`}
                />
                <Text>{questionNameContent[i + 4]?.trim("")}</Text>
              </View>
            );
          }
          return (
            <View>
              <Text style={{ fontSize: 20 }}>
                {" "}
                {item.trim(" ")}
                {
                  <MathView
                    config={{ inline: false, ex: 7, em: 7 }}
                    style={{ color: isWhite ? "white" : "black" }}
                    math={`${latex}`}
                  />
                }
                {questionNameContent[i + 4]?.trim("")}
              </Text>
            </View>
          );
        }

        // if(questionNameContent[i]?.includes("mq-selectable")){

        //         let latex = questionNameContent[i+1].substring(1, questionNameContent[i+1].length-1);
        //         latex = latex.replaceAll("_", "\\_");
        //         return <View>
        //         <Text style={{fontSize:20}}>
        //         {<MathView
        //         config={{inline:false,ex: 7, em: 7 }}
        //         style={{color: isWhite ? "white" :"black"}}
        //         math={`${latex}`}
        //         /> }{questionNameContent[i+3]?.trim("")}</Text>
        //         </View>
        // }
        else {
          if (
            questionNameContent[i]?.includes("mq-selectable") ||
            questionNameContent[i - 1]?.includes("mq-selectable") ||
            questionNameContent[i - 2]?.includes("mq-selectable") ||
            questionNameContent[i - 3]?.includes("mq-selectable")
          ) {
            return;
          }
          if (questionNameContent[i]?.includes("nextlineKey")) {
            return <View style={{ width: "100%" }}></View>;
          }
          if (item != "" && item != " ") {
            return (
              <View style={{ alignSelf: "flex-start" }}>
                <Text
                  style={{ fontSize: 20, color: isWhite ? "white" : "black" }}
                >
                  {decode(item.trim(" "))}
                </Text>
              </View>
            );
          }
        }
      })}
    </View>
  );
};

export default QuestionPartBuilder;
