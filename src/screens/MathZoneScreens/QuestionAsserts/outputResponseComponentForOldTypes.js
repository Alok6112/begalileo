import React, { useState } from "react";
import {
  Button,
  Pressable,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import HtmlViwer from "./HtmlRender";
import { WebView } from "react-native-webview";
import {
  MATH_ZONE_QUESTION,
  MATH_ZONE_LIVE_CLASS_QUESTION,
  MATH_ZONE_FLAGGED_QUESTION,
  MATH_ZONE_HOME_WORK_QUESTION,
} from "../../../components/helpers/Constants";

function SolutionComponentOldTypes({
  isCorrect,
  solution,
  isMathquill,
  isOldType,
  type,
  screenType,
}) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const question = {
    html:
      isOldType == true
        ? `
  <span style='font-size: 20px; font-weight: bold'>
    ${solution.solution}
  </span>
  `
        : `
<span style='font-size: 20px; font-weight: bold'>
  ${solution}
</span>
`,
  };

  const outputResponse = `<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Document</title>
  
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.css" />
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.js"></script>
 
<script src="src/index.js"></script>
<style>
  .fraction {
    display: inline-block;
    vertical-align: middle; 
    margin: 0 0.2em 0.4ex;
    text-align: center;
     font-size: 20px; 
}

.fraction > span {
    display: block;
    padding-top: 0.15em;
}
.lr-arrow{font-size:22px;position:relative;}
.lr-arrow span{  position: absolute;top: -19px;left: 0px;font-size: 30px;}
.carry-over1{list-style-type:none;float: left;margin: 0px;margin-left:50px !important;}
.carry-over1 li{list-style-type: none;float: left;letter-spacing: 2px;margin: 0px 0px 0px 10px;font-size: 11px;font-weight: bold;}
.carry-over1 li:nth-child(2){margin-left: 20px;}
.carry-over1 li:nth-child(3){margin-left: 49px;}
.carry-over1 li:nth-child(4){margin-left: 14px;}
.challenge-msg{width: 130px;
               text-align: center;
               float: right;
               margin: 5px 14px 14px 14px;}
.fraction span.fdn {border-top: thin solid black;}
.fraction span.bar {display: none;}
.bottom-underlined {
border-bottom: thin solid black;
}
.top-underlined {
border-top: thin solid black;
}
.ext-bottom-underlined{border-bottom: thin solid;padding-left:38px;}
.two-digit-carry{letter-spacing:0px !important;}
.num1 .two-digit-carry{left:5px !important;}
.triple-left {left: -110px;}
.forth-left {left: -145px;}
.double-left{left:-73px;}
.font-bracket{font-family: MathJax_Size4;}
.carry-over{
    font-size: 12px;
    margin-right: 10px;
}
.carry-over-multiply{
    font-size: 12px;
    margin-right: 20px;
}
.ordinal {
  position: relative;
  top: -18px;
}
.bottom-no{
 margin-top: 28px;
display: inline-block;
}
.top-no{
  position: relative;
  top: -32px;
}
  #r_rect_corner {
       margin: -2px;
   border-radius: 6px;
   border: 1px solid #666;
   padding: 7px;
   width: 26px;
   height: 15px;  
       background-color:#C0C0C0;
}
.arith-add li{list-style-type:none;}
.arith-add{float:left;}
.arith-add h3,.arith-add h4{text-align:center;}
.arith-add{border: 1px solid;}
.arith-add-operations{position: relative;padding: 16px 0px 10px 25%;width: 80px;}
.arith-add-operations .arith-add-sign{position: absolute;font-size: 24px;font-weight: bold;left: 20%;bottom: 25%;}
.arith-add-row1 li,.arith-add-row2 li,.arith-add-row3 li{float: left;font-size: 24px;letter-spacing: 5px;}
.arith-add-row1,.arith-add-row2,.arith-add-row3{width: 100%;display: block;overflow: hidden;}
.arith-add-operations .arith-add-row2{border-bottom:1px solid;}
.arithmatic-operations .arith-add .arith-add-heads,.arithmatic-operations .arith-add .arith-add-sub-heads{padding: 5px;border-bottom: 1px solid;}
.MathJax .math span {
    font-family: 'GothamRnd-Book' !important;
    font-size: 20px;
  }
.font-bracket33{font-size: 33px;font-family: MathJax_Size3;}
.font-bracket25{font-size: 25px;font-family: MathJax_Size3;}
.font-bracket30{font-size: 30px;font-family: MathJax_Size3;}
.font-bracket28{font-size: 28px;font-family: MathJax_Size3;}
.font-bracket12{font-size: 12px;font-family: MathJax_Size3;}
.font-bracket21{font-size: 21px;font-family: MathJax_Size3;}
.font-bracket26{font-size: 26px;font-family: MathJax_Size3;}
.font-bracket23{font-size: 21px;font-family: MathJax_Size3;}
.font-bracket40{font-size: 40px;font-family: MathJax_Size3;}
.font-bracket15{font-size: 15px;font-family: MathJax_Size3;}
.font-bracket11{font-size: 11px;font-family: MathJax_Size3;}
.font-bracket10{font-size: 10px;font-family: MathJax_Size3;}
.font-bracket20{font-size: 20px;font-family: MathJax_Size3;}
.font-bracket6{font-size: 6px;font-family: MathJax_Size3;}
.font-bracket17{font-size: 17px;font-family: MathJax_Size3;}
  
/**********  Ckeditor table with tr border  *********/

tr.ck-top-border td { border-top: thin solid black; }
tr.ck-bottom-border td { border-bottom: thin solid black; }
.table-cellspacing{border-spacing:0px;}
  .MathJax_Display { 
    text-align: left ! important; 
    margin-top: 0px ! important;
    margin-left: 0px ! important;
  } 
.faction .power-font {font-size: 15px;}
.abs-cont{position: absolute;top: 6px;left: 12px;padding: 5px 12px 0px 10px;}
.abs-cont:before{content: "";display: block;position: absolute;top: 4px;left: 9px;right: 10px;bottom: 2px;border-top: 1px solid;}
.bracket-size-q{font-size:30px;}
.abs-cont-quos{position: absolute;top: -13px;left: 22px;}
.rel-q{position: relative;display: inline-block;margin: 19px 47px 2px 10px;font-size:20px;}
.right-spac{float:right;}
.font-bracket1 {font-size: 25px;}
.std-size{font-family: 'opensans';letter-spacing: 20px;padding-right: 20px;margin-left: 25px;position: relative;}
.right-spac .num1{display: inline-block;float: left;padding:4px;position: relative;letter-spacing: 18px;}
.num1 .carry{position: absolute;top: -5px;font-size: 11px;left:8px;}
.right-spac:nth-of-type(1) .num1{padding-top: 15px;}
.math-func{position: absolute;left: -23px;bottom: -3px;font-weight: bold;font-size: 25px;}
.left{left:-37px}
.top-no{
  position: relative;
  top: -32px;
}

.top {
  position: relative;
  top: -15px;
}

.top1 {
  position: relative;
  top: -25px;
}
sup {font-size:xx-small; vertical-align:super;}


.radical {
  position: relative;
  font-size: 42px;
  vertical-align: middle;
}
.radical1 {
  position: relative;
  font-size: 77px;
  vertical-align: middle;
}
.n-root {
  position: absolute;
  top: 7px;
  left: 7px;
  font-size: 33%;
}
.radicand { 
    padding: 8px 2px 2px 0px;
    border-top: thin black solid;
}
.radicand1 { 
    padding: 35px 2px 2px 0px;
    border-top: thin black solid;
}



.fraction-root {
    display: inline-block;
    vertical-align: middle; 
    margin: 0 0.2em 0.4ex;
    text-align: center;
}


.fraction-root-one {
    display: inline-block;
    vertical-align: middle; 
    margin: 0 0.2em 0.4ex;
    text-align: center;
}

.top-no{
    position: relative;
    top: -32px;
}
.faction .power-font {font-size: 15px;}
.fraction.power-font{font-size:15px;line-height:16px;}
.abs-cont:before{content: "";display: block;position: absolute;top: 4px;left: 9px;right: 10px;bottom: 2px;border-top: 1px solid;}
.bracket-size-q{font-size:30px;}
.abs-cont{position: absolute;top: 6px;left: 12px;padding: 5px 12px 0px 10px;}
.abs-cont-quos{position: absolute;top: -13px;left: 22px;}
.rel-q{position: relative;display: inline-block;margin: 19px 47px 2px 10px;font-size:20px;}

.fraction-root-two {
    display: inline-block;
    vertical-align: middle; 
    margin: 0 0.2em 0.4ex;
    text-align: center;
}

.fraction-root-three {
    display: inline-block;
    vertical-align: middle; 
    margin: 0 0.2em 0.4ex;
    text-align: center;
}



/*Added for VIII_MAT802*/
.font-bracket{font-family: MathJax_Size4;}
.top-no{position: relative;top: -32px;}
.top {position: relative; top: -18px;}
.top1 {position: relative;top: -25px;}
.faction .power-font {font-size: 15px;}
.radical {position: relative;font-size: 42px;vertical-align: middle;}
.radicand {padding: 11px 2px 2px 0px;border-top: thin solid;}
.radicand2 {padding: 15px 2px 2px 0px;border-top: thin black solid;}
.font-bracket{font-family: MathJax_Size4;}
sup {font-size:xx-small; vertical-align:super;}


.fraction-root > span {
    display: block;

font-size: 14px;
}
.fraction-root span.fdn {border-top: thin solid black;}
.fraction-root span.bar {display: none;}

.nth-radical {
  position: relative;
  font-size: 21px;
  vertical-align: middle;
}
.nth-root {
  position: absolute;
  top: 3px;
  left: 5px;
  font-size: 33%;
}
/*added for grade 10 math*/
.fraction1 {
    display: inline-block;
    vertical-align: middle; 
    margin: 0 0.2em 0.4ex;
    text-align: center;
    font-size: 10px;
}

.fraction1 > span {
    display: block;
    padding-top: 0.15em;
}
.fraction1 span.fdn {border-top: thin solid black;}
.fraction1 span.bar {display: none;}
.bottom-underlined {
border-bottom: thin solid black;
}

.top-underlined {border-top: thin solid black;}

.top-underlined-root {display:inline-block;border-top: 2px solid #4d4d4d;}
.inner-root1{margin-top:3px;}
.inner-root2{margin-top:3px;}
.root-border{font-size:25px;}
.root-border1,.no-student_cls{font-size:24px;}
.root-border2{font-size:21px;}
.inner-root3{margin-top:3px;}

.faction1 .power-font1 {font-size: 10px;}
.nth-root {
  position: absolute;
  top: 2px;
  left: 2px;
  font-size: 50%;
}
.nth-radical .nth-root,.radical .n-root{line-height:0px;font-size:10px;}
.nth-radical .nth-root{left:3px;}
.strikethrough {
 position: relative;
}
.main-math-function,.separation-math-function{position:relative;overflow:hidden;float:left;}
.top-underlined-frac {
   border-top: thin solid black;
   padding-top: 10px;
}
.border-abs {
    position: absolute;
    width: 50%;
    height: 12px;
    border: 1px solid gray;
    left: 18%;
    border-top: none;
    bottom: 4px;
}
.separation-math-function{font-size:25px;letter-spacing: 3px;clear:both;}
.rel-numbers{position:relative;float:left;padding-bottom: 20px;}
.strikethrough:before {
 position: absolute;
 content: "";
 left: 0;
 top: 50%;
 right: 0;
 border-top: 1px solid;
 border-color: inherit;

 -webkit-transform:rotate(-15deg);
 -moz-transform:rotate(-20deg);
 -ms-transform:rotate(-20deg);
 -o-transform:rotate(-20deg);
 transform:rotate(-20deg);
}

.top-underlined-root-number {display:inline-block;border-top: 2px solid #4d4d4d;}
.inner-root-number-1{margin-top:5px;}
.inner-root-number-2{margin-top:3px;}
.root-border-number{font-size:39px;}
.root-border-number-1{font-size:34px;}
.root-border-number-2{font-size:26px;}

.root-border-number-double{font-size:51px;}



.nth-root-different {
    
    position: absolute;
    top: -10px;
    left: 4px;
    font-size: 45%;
}
 .class9_fraction{display: inline;float: left;margin-top: 50px;margin-bottom: 50px;}
  .frac_float{float:left;}
  .frac_float .font-bracket{font-size:15px;}
  .font-bracket{line-height:65px;}
  
  
  .radicand1 { 
    padding: 32px 2px 2px 0px;
    border-top: thin black solid;
}


.radicand1 { 
    padding: 32px 2px 2px 0px;
    border-top: thin black solid;
}
span.radicand .fraction-root{line-height:100%;}


.top-underlined-root {display:inline-block;border-top: 2px solid #4d4d4d;}
.inner-root1{margin-top:3px;}
.inner-root2{margin-top:3px;}
.root-border{font-size:40px;}
.root-border1{font-size:34px;}
.root-border2{font-size:26px;}


.top {
  position: relative;
  top: -15px;

}
.font-bracket1 {font-size: 25px;}

.nth-radical{position:relative;}
.nth-radical .nth-root-new{line-height:8px;}
.nth-radical .nth-root,.radical .n-root,.top .fraction{line-height:0px;font-size:10px;}
.nth-radical .nth-root{left:3px;}
 .practice-new-quiz sup {
    vertical-align: 15px !important;
    top: 7px;
}
sup .fraction,sup .fraction-root,.top .fraction{position:relative;left:-2px;}
sup .fraction .fup,sup .fraction .fdn,sup .fraction-root .fup,sup .fraction .bar,sup .fraction-root .fup,sup .fraction-root .bar,sup .fraction-root .fdn,.top .fraction .fup,.top .fraction .bar,.top .fraction .fdn{position:absolute;font-size:xx-small;}
sup .fraction .fup,sup .fraction-root .fup,.top .fraction .fup{top:-2px;}
sup .fraction .fdn,sup .fraction-root .fdn,.top .fraction .fdn{top: 2px;padding-top: 6px;}

.nth-root-new {
    position: absolute;
    top: 0px;
    left: 1px;
    font-size: 35%;
}

.top-new {
  position: relative;
  top: -12px;
  font-size: 11px;
}
.top2 {
  position: relative;
  top: -20px;
  font-size: 11px;
}
.nth-root-new1 {
    position: absolute;
      top: 1px;
    left: -24px;
    font-size: 46%;
    white-space: nowrap;
    line-height: 0px;
}

.nth-root-new2 {
    position: absolute;
    top: -14px;
    left: -88px;
    font-size: 52%;
    line-height: 0px;
    white-space: nowrap;
}
.nth-root-new3 {
    position: absolute;
    top: 2px;
    left: 8px;
    font-size: 35%;
}
.top-underlined-root-new{margin-top:3px;display:inline-block;border-top: 1px solid #4d4d4d;}
  </style>
</head>
<body>
   ${solution}
</body>
</html>


<script type="text/javascript">
var MQ = MathQuill.getInterface(2);
var Mfd;

let arr = document.getElementsByClassName('mq-selectable')
let arr1 = [...arr]
for (let i = 0; i < arr1.length; i++) {
  
    arr[i].innerHTML = insertStaticMathMl(arr[i].innerHTML).outerHTML

}


function insertStaticMathMl(data) {
    data = data.slice(1,data.length-1)
   var problemSpan = document.createElement('span')
   // problemSpan.innerHTML = data
   problemSpan.innerHTML = data
   //problemSpan.className = "mq-replacable"
   problemSpan.id = Math.floor(Math.random() * 1000) + 1
   MQ.StaticMath(problemSpan)
   return problemSpan;
}

(function(){
    var body =  document.body,
    html = document.documentElement;

    var height = Math.max(
        body.scrollHeight, html.scrollHeight,
        body.offsetHeight, html.offsetHeight,
        body.clientHeight, html.clientHeight
    );

    const data = JSON.stringify({height, type:'dimensions'})
    window.ReactNativeWebView.postMessage(data);
})()

</script>`;

  const runBeforeFirst = `
window.isNativeApp = true;
true; // note: this is required, or you'll sometimes get silent failures
`;

  return (
    <View style={{ marginLeft: 20 }}>
      {screenType == MATH_ZONE_LIVE_CLASS_QUESTION ? (
        <View
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <View style={{ position: "relative", left: "74.5%" }}>
            <Pressable onPress={toggleModal}>
              <View
                style={{
                  height: 30,
                  width: 95,
                  borderWidth: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {isModalVisible ? (
                  <Text>Hide Details</Text>
                ) : (
                  <Text>View Details</Text>
                )}
              </View>
            </Pressable>
          </View>
          <View style={{ borderWidth: 1, minHeight: 100, width: "90%" }}>
            {isCorrect ? (
              <View
                style={{
                  height: 100,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#CCEEA5",
                }}
              >
                <Text style={{ marginLeft: 5 }}>Well Done</Text>
              </View>
            ) : (
              <View
                style={{
                  height: 100,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#fae0e0",
                }}
              >
                <Text style={{ marginLeft: 5 }}>Incorrect</Text>
              </View>
            )}
            {isModalVisible ? (
              <View
                style={[
                  {
                    backgroundColor: "white",
                    borderColor: "black",
                    // minHeight: deviceHeight / 3,
                    // width : SCREEN_WIDTH/ 1.6
                  },
                  styles.modalContainer,
                ]}
              >
                <ScrollView>
                  <View>
                    <View style={{ marginTop: 10, marginLeft: 5 }}>
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#ff6447",
                          textDecorationLine: "underline",
                        }}
                      >
                        Solution:
                      </Text>
                    </View>

                    <View>
                      {type == "multiselect" && isOldType ? (
                        <View>
                          {solution.map((item, index) => {
                            return (
                              <>
                                {item.solution != "" ? (
                                  <HtmlViwer
                                    source={{
                                      html: `
                                                        <span style='font-size: 20px; font-weight: bold'>
                                                        ${item.solution}
                                                        </span>
                                                        `,
                                    }}
                                  />
                                ) : (
                                  <></>
                                )}
                                {item.solution_image != "" ? (
                                  <View
                                    style={{
                                      minWidth: 300,
                                      height: 200,
                                      margin: 10,
                                    }}
                                  >
                                    <Image
                                      source={{ uri: item.solution_image }}
                                      style={{
                                        minWidth: 400,
                                        height: 200,
                                        margin: 10,
                                      }}
                                    />
                                  </View>
                                ) : (
                                  <></>
                                )}
                              </>
                            );
                          })}
                        </View>
                      ) : isOldType ? (
                        <View>
                          {<HtmlViwer source={question} />}
                          {solution.solution_image != "" ? (
                            <View
                              style={{ minWidth: 300, height: 200, margin: 10 }}
                            >
                              <Image
                                source={{ uri: solution.solution_image }}
                                resizeMode={"contain"}
                                style={{
                                  aspectRatio: 2,
                                  height: "100%",
                                  width: "100%",
                                }}
                              />
                            </View>
                          ) : (
                            <></>
                          )}
                        </View>
                      ) : isMathquill == true ? (
                        <View style={{ minHeight: 100 }}>
                          <WebView
                            originWhitelist={["*"]}
                            source={{ html: outputResponse }}
                            javaScriptEnabled
                            injectedJavaScriptBeforeContentLoaded={
                              runBeforeFirst
                            }
                          />
                        </View>
                      ) : (
                        <HtmlViwer source={question} />
                      )}
                    </View>
                  </View>
                </ScrollView>
              </View>
            ) : (
              <></>
            )}
          </View>
        </View>
      ) : (
        <></>
      )}

      {screenType == MATH_ZONE_FLAGGED_QUESTION ||
      screenType == MATH_ZONE_HOME_WORK_QUESTION ? (
        <View
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <View style={{ minHeight: 100, width: "90%" }}>
            <View
              style={[
                {
                  backgroundColor: "white",
                  borderColor: "black",
                  // minHeight: deviceHeight / 3,
                  // width : SCREEN_WIDTH/ 1.6
                },
                styles.modalContainer,
              ]}
            >
              <ScrollView>
                <View>
                  <View style={{ marginTop: 10, marginLeft: 5 }}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#ff6447",
                        textDecorationLine: "underline",
                      }}
                    >
                      Solution:
                    </Text>
                  </View>

                  <View>
                    {type == "multiselect" && isOldType ? (
                      <View>
                        {solution.map((item, index) => {
                          return (
                            <>
                              {item.solution != "" ? (
                                <HtmlViwer
                                  source={{
                                    html: `
                                                        <span style='font-size: 20px; font-weight: bold'>
                                                        ${item.solution}
                                                        </span>
                                                        `,
                                  }}
                                />
                              ) : (
                                <></>
                              )}
                              {item.solution_image != "" ? (
                                <View
                                  style={{
                                    minWidth: 300,
                                    height: 200,
                                    margin: 10,
                                  }}
                                >
                                  <Image
                                    source={{ uri: item.solution_image }}
                                    style={{
                                      minWidth: 400,
                                      height: 200,
                                      margin: 10,
                                    }}
                                  />
                                </View>
                              ) : (
                                <></>
                              )}
                            </>
                          );
                        })}
                      </View>
                    ) : isOldType ? (
                      <View>
                        {<HtmlViwer source={question} />}
                        {solution.solution_image != "" ? (
                          <View
                            style={{ minWidth: 300, height: 200, margin: 10 }}
                          >
                            <Image
                              source={{ uri: solution.solution_image }}
                              resizeMode={"contain"}
                              style={{
                                aspectRatio: 2,
                                height: "100%",
                                width: "100%",
                              }}
                            />
                          </View>
                        ) : (
                          <></>
                        )}
                      </View>
                    ) : isMathquill == true ? (
                      <View style={{ minHeight: 100 }}>
                        <WebView
                          originWhitelist={["*"]}
                          source={{ html: outputResponse }}
                          javaScriptEnabled
                          injectedJavaScriptBeforeContentLoaded={runBeforeFirst}
                        />
                      </View>
                    ) : (
                      <HtmlViwer source={question} />
                    )}
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 4,
    // borderColor: "#C0C0C0",
    // borderWidth: 2,
    // marginHorizontal: 40,
    // marginVertical: 120,
    maxHeight: 300,
  },
});

export default SolutionComponentOldTypes;
