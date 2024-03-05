import React, { useState, useRef, useEffect } from "react";
import {
  useWindowDimensions,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import { WebView } from "react-native-webview";
import DOMParser from "react-native-html-parser";
import HtmlViwer from "../QuestionAsserts/HtmlRender";
import ModalTesterForCkEditor from "../QuestionAsserts/scrollableModalForCkeditor";
import {
  MATH_ZONE_QUESTION,
  MATH_ZONE_LIVE_CLASS_QUESTION,
  MATH_ZONE_FLAGGED_QUESTION,
  MATH_ZONE_HOME_WORK_QUESTION,
} from "../../../components/helpers/Constants";
import MathQuillHtmlRender from "../QuestionAsserts/MathQuillHtmlRender";
import SolutionComponentForCkEditor from "../QuestionAsserts/outputResponseComponentForCkeditor";
import QuestionPartBuilder from "../QuestionAsserts/questionPartBuilder";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const MyWebViewMathquill = ({
  content,
  question_id,
  submitResponse,
  data,
  screenType,
  isResponse,
  handleStudentAnswerCorrect
}) => {
  console.log("ios");
  let temp1 = false;
  let std_answer_response;
  const parser = new DOMParser.DOMParser();
  const parsed = parser.parseFromString(content, "text/html");
  console.log("ios", content);
  const [correctChoice, setCorrectChoice] = useState();

  const handleChoices = (val) => {
    console.log("val", val);
    setSelectedValue(val);
  };

  useEffect(() => {
    let arr = question.choice_data;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].correct) {
        console.log(arr[i]);
        setCorrectChoice(arr[i]);
      }
    }
  }, []);

  let html;
  if (isResponse) {
    html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
        <title>Document</title>
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.js"></script>



        <style>
        body{
            font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 150%;
    color:#233584
        }

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
        #mathToolbarContainer {
            width: 300px;
            height: auto;
            padding-bottom: 1rem;
            display: flex;
            flex-direction: column;
            background-color: gray;
            border-radius: 7px;
            /* position: fixed; */
            position: absolute;
            /* top: 0px; */
            z-index: 1;
        }

        /* mathToolbarContainer */
        #mathToolbar {
            width: 300px;
            margin: 0 1rem;
            display: grid;
            position: relative;
            gap: 1rem;
            grid-template-columns: repeat(6, 31px);
            clear: both;
        }

        #mathToolbar>div {
            word-break: break;
            ;
            height: 30px;
            font-size: 10px;
            display: flex;
            justify-content: center;
            align-items: center;

            cursor: pointer;

        }

        .testing {
            color: none;
        }

        #tooltipTopBar {
            color: white;
            font-size: large;
            font-weight: bold;
            float: right;
            margin-right: 10px;
            margin-bottom: 5px;
            cursor: pointer;
            
        }

        #symbolsWidthHeight {
            min-width: 30px;
            min-height: 31px;
        }
    </style>
    </head>
    <body>
        <div id="check" style="margin-top:30px">${parsed}</div>
    </body>
    </html>
    
    
    <script type="text/javascript">
    
        var MQ = MathQuill.getInterface(2);
        var Mfd;
        let symbolsArray = [
            "\\\\frac",
            "\\cdot",
            "\\div",
            "\\\\times",
            "\\sqrt",
            "^",
            "\\le",
            "\\ge",
            "|",
            "prod",
            "\\\\nthroot",
            "_",
        ];
    
        let arr = document.getElementsByClassName('mathquill-rendered-math')
        let res;
    
        //console.log("Check",arr);
    
        for (let i = 0; i < arr.length; i++) {
            // console.log(arr[i].className.includes('mathquill-editable'));
            if (arr[i].className.includes('mathquill-editable')) {
                arr[i].innerHTML = insertDyanamicMathMl(arr[i].innerHTML).outerHTML
                arr[i].addEventListener('click', setClickedDiv)
            } else {
                arr[i].innerHTML = insertStaticMathMl(arr[i].innerHTML).outerHTML
            }
    
        }
    
    
        function insertStaticMathMl(data) {
            var problemSpan = document.createElement('span')
            // problemSpan.innerHTML = data
            problemSpan.innerHTML = data
            problemSpan.className = "mq-replacable"
            problemSpan.id = Math.floor(Math.random() * 1000) + 1
            MQ.StaticMath(problemSpan)
            return problemSpan;
        }
    
    
        function insertDyanamicMathMl(data) {
    
            var problemSpan = document.createElement('span')
            problemSpan.id = Math.floor(Math.random() * 1000) + 1
            problemSpan.setAttribute('contenteditable', "true");
            problemSpan.style.minWidth = '20px';
            var mathField = MQ.MathField(problemSpan, {
                spaceBehavesLikeTab: true
            })
            return problemSpan;
        }
    
    
            setHeight()

            function setHeight(){
                var body =  document.body,
                html = document.documentElement;
        
                var height = Math.max(
                    body.scrollHeight, html.scrollHeight,
                    body.offsetHeight, html.offsetHeight,
                    body.clientHeight, html.clientHeight
                );
                const data = JSON.stringify({height, type:'dimensions'})
                window.ReactNativeWebView.postMessage(data);
            }

            window.addEventListener("message", message => {
        
                if(message.data == 'validate'){
                    let isCorrect = finalResponses();
                    res = document.getElementById("check").innerHTML;
                    const obj = {
                    isCorrect:isCorrect,
                    student_answer_response:JSON.stringify(res)
                    }
        
                    const data = JSON.stringify({obj, type:'check'})
                    window.ReactNativeWebView.postMessage(data);
                }else{
                //  alert("No")
                }
                
                
                
            });
        
    </script>`;
  } else {
    html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
        <title>Document</title>
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.js"></script>



        <style>
        body{
            font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 150%;
    color:#233584;
        }

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
        #mathToolbarContainer {
            width: 300px;
            height: auto;
            padding-bottom: 1rem;
            display: flex;
            flex-direction: column;
            background-color: gray;
            border-radius: 7px;
            /* position: fixed; */
            position: absolute;
            /* top: 0px; */
            z-index: 1;
        }

        /* mathToolbarContainer */
        #mathToolbar {
            width: 300px;
            margin: 0 1rem;
            display: grid;
            position: relative;
            gap: 1rem;
            grid-template-columns: repeat(6, 31px);
            clear: both;
        }

        #mathToolbar>div {
            word-break: break;
            ;
            height: 30px;
            font-size: 10px;
            display: flex;
            justify-content: center;
            align-items: center;

            cursor: pointer;

        }

        .testing {
            color: none;
        }

        #tooltipTopBar {
            color: white;
            font-size: large;
            font-weight: bold;
            float: right;
            margin-right: 10px;
            margin-bottom: 5px;
            cursor: pointer;
            
        }

        #symbolsWidthHeight {
            min-width: 30px;
            min-height: 31px;
        }
    </style>
    </head>
    <body>
        <div id="check">${parsed}</div>
        <div id="mathToolbarContainer">
        <div className="tooltip-wrapper">
            <div className="tooltip-top-bar" id="tooltipTopBar">
                <span className="tooltip-handle">&nbsp;</span>
                <span onclick="Close()">
                    X
                </span>
            </div>
            <div id="mathToolbar"> 

                <div className="btn mathsign fractions_cls" title="\frac{ }{ }" onclick="getLatex(event,'\\frac{ }{ }',0)">
                    <img src="https://begalileo-assets.s3.ap-south-1.amazonaws.com/Madhu-mathzone-pics/5.png" className="fraction"
                        id="symbolsWidthHeight" />
                </div>

                <div className="btn mathsign" title="\cdot" onclick="getLatex(event,'\\cdot',1)">
                    <img src="https://begalileo-assets.s3.ap-south-1.amazonaws.com/Madhu-mathzone-pics/1.png" className="dot1" id="symbolsWidthHeight" />
                </div>

                <div className="btn mathsign" title="\div" onclick="getLatex(event,'\\div',2)">
                    <img src="https://begalileo-assets.s3.ap-south-1.amazonaws.com/Madhu-mathzone-pics/4.png" className="divide" id="symbolsWidthHeight" />
                </div>

                <div className="btn mathsign" title="\times" onclick="getLatex(event,'\\times',3)">
                    <img src="https://begalileo-assets.s3.ap-south-1.amazonaws.com/Madhu-mathzone-pics/11.png" id="symbolsWidthHeight" />
                </div>

                <div className="btn mathsign mathquill_cursor_cls" title="\sqrt{}" onclick="getLatex(event,'\\sqrt{}',4)">
                    <img src="https://begalileo-assets.s3.ap-south-1.amazonaws.com/Madhu-mathzone-pics/10.png" className="sqroot"
                    id="symbolsWidthHeight" />
                </div>

                <div className="btn mathsign mathquill_cursor_cls" title="^{ }" onclick="getLatex(event,'^{ }',5)">
                    <img src="https://begalileo-assets.s3.ap-south-1.amazonaws.com/Madhu-mathzone-pics/12.png" className="exponent"
                    id="symbolsWidthHeight" />
                </div>

                <div className="btn mathsign" title="\le" onclick="getLatex(event,'\\le',6)">
                    <img src="https://begalileo-assets.s3.ap-south-1.amazonaws.com/Madhu-mathzone-pics/6.png" className="lessthanequal"
                    id="symbolsWidthHeight" />
                </div>

                <div className="btn mathsign" title="\ge" onclick="getLatex(event,'\\ge',7)">
                    <img src="https://begalileo-assets.s3.ap-south-1.amazonaws.com/Madhu-mathzone-pics/7.png" className="greaterthanequal"
                    id="symbolsWidthHeight" />
                </div>

                <div className="btn mathsign mathquill_cursor_cls" title="\left|\right|" onclick="getLatex(event,'\\left|\\right|',8)">
                    <img src="https://begalileo-assets.s3.ap-south-1.amazonaws.com/Madhu-mathzone-pics/3.png" className="absolute"
                    id="symbolsWidthHeight" />
                </div>

                <div className="btn mathsign" title="\prod" onclick="getLatex(event,'\\prod',9)">
                    <img src="https://begalileo-assets.s3.ap-south-1.amazonaws.com/Madhu-mathzone-pics/9.png" className="pi" id="symbolsWidthHeight" />
                </div>

                <div className="btn mathsign mathquill_cursor_cls" title="\nthroot{}{}" onclick="getLatex(event,'\\nthroot{}{}',10)">
                    <img src="https://begalileo-assets.s3.ap-south-1.amazonaws.com/Madhu-mathzone-pics/8.png" className="nthroot"
                    id="symbolsWidthHeight" />
                </div>

                <div className="btn mathsign mathquill_cursor_cls" title="_{ }" onclick="getLatex(event,'_{ }',11)">
                    <img src="https://begalileo-assets.s3.ap-south-1.amazonaws.com/Madhu-mathzone-pics/2.png" className="xbase" id="symbolsWidthHeight" />
                </div>
                
            </div>
        </div>
    </div>

    
    

    </body>
    </html>
    
    
    <script type="text/javascript">

    
        let typeRadioOut = [], typeCheckboxOut = [], typeInputOut = [], typeSlectOut = [];
        let typeRadioIn = [], typeCheckboxIn = [], typeInputIn = [], typeSlectIn = [];
    
        var MQ = MathQuill.getInterface(2);
        var Mfd;
        let symbolsArray = [
            "\\\\frac",
            "\\cdot",
            "\\div",
            "\\\\times",
            "\\sqrt",
            "^",
            "\\le",
            "\\ge",
            "|",
            "prod",
            "\\\\nthroot",
            "_",
        ];
    
        let arr = document.getElementsByClassName('mathquill-rendered-math')
        let res;
    
        //console.log("Check",arr);
    
        for (let i = 0; i < arr.length; i++) {
            // console.log(arr[i].className.includes('mathquill-editable'));
            if (arr[i].className.includes('mathquill-editable')) {
                arr[i].innerHTML = insertDyanamicMathMl(arr[i].innerHTML).outerHTML
                arr[i].addEventListener('click', setClickedDiv)
            } else {
                arr[i].innerHTML = insertStaticMathMl(arr[i].innerHTML).outerHTML
            }
    
        }
    
    
        //document.getElementById('mathToolbarContainer').style.visibility = "hidden";
        document.getElementById('mathToolbarContainer').style.display = "none";
        // document.getElementsByClassName('simple-keyboard')[0].style.visibility = "hidden"
    
        let elementClicked;



    
        function getLatex(e, latex, i) {
            e.preventDefault()
            console.log("yes", latex);
            // mathField.cmd(symbolsArray[i])
            // mathField.focus()
            // Mfd.latex(latex)
            Mfd = MQ.MathField(elementClicked)
            Mfd.cmd(symbolsArray[i])
            Mfd.moveToRightEnd()
            Mfd.focus()
    
        }
    
    
        function setClickedDiv(event) {
            event.preventDefault();
            var e = event.target;
            while (!e.classList.contains('mathquill-editable')) {
                e = e.parentElement;
            }
            elementClicked = e;
            let toolTipElement = document.getElementById('mathToolbarContainer');
    
    
            //toolTipElement.style.visibility = "visible";
            toolTipElement.style.display = "flex";
        //  document.getElementsByClassName('simple-keyboard')[0].style.visibility = "visible"
    
    
            var rect = elementClicked.getBoundingClientRect();
            var heightOfToolTip = toolTipElement.getBoundingClientRect().height;
            var widthOfToolTip = toolTipElement.getBoundingClientRect().width;
    
            toolTipElement.style.top = rect.top - heightOfToolTip - 5 + "px";
            toolTipElement.style.left = rect.left - (widthOfToolTip / 8) + 'px';
    
            setHeight();
    
        }
    
    
        function insertStaticMathMl(data) {
            var problemSpan = document.createElement('span')
            // problemSpan.innerHTML = data
            problemSpan.innerHTML = data
            problemSpan.className = "mq-replacable"
            problemSpan.id = Math.floor(Math.random() * 1000) + 1
            MQ.StaticMath(problemSpan)
            return problemSpan;
        }
    
    
        function insertDyanamicMathMl(data) {
    
            var problemSpan = document.createElement('span')
            problemSpan.id = Math.floor(Math.random() * 1000) + 1
            problemSpan.setAttribute('contenteditable', "true");
            problemSpan.style.minWidth = '20px';
            var mathField = MQ.MathField(problemSpan, {
                spaceBehavesLikeTab: true
            })
            return problemSpan;
        }
    
    
        function Close() {
            console.log("Close button is clicked");
            //document.getElementById('mathToolbarContainer').style.visibility = "hidden";
            document.getElementById('mathToolbarContainer').style.display = "none";
            // document.getElementsByClassName('simple-keyboard')[0].style.visibility = "hidden"
            setHeight()
        }
    
        
        
    
    
        function finalResponses() {
            console.log("Final responses");
            let elements = document.getElementsByTagName("input")
            
            let selectElements = document.getElementsByTagName("select")

            typeRadioOut = [],typeInputOut=[],typeCheckboxOut=[],typeSlectOut=[]

            let i = 0;
            while (i < elements.length) {
                //console.log(elements[i]);
                if (elements[i].type == 'radio') {
                    
                    typeRadioOut.push(elements[i].checked)
                    if(elements[i].checked == true){
                        elements[i].checked = "checked"
                        document.getElementsByTagName("input")[i].setAttribute('checked',"checked");
                    }
                    elements[i].disabled=true
                } else if (elements[i].type == 'text') {
                    elements[i].disabled=true
                    document.getElementsByTagName("input")[i].setAttribute('value',elements[i].value.trim());
                    typeInputOut.push(elements[i].value.trim())

                } else if (elements[i].type == 'checkbox') {
                    
                    typeCheckboxOut.push(elements[i].checked)
                    if(elements[i].checked == true){
                        elements[i].checked = "checked"
                        document.getElementsByTagName("input")[i].setAttribute('checked',"checked");
                    }
                    elements[i].disabled=true
                }
    
                i++;
            }
    
    
            //to get selected input fileds
            i = 0;
            while (i < selectElements.length) {
    
                let j = 0;
    
                while (j < selectElements[i].options.length) {
                    if (selectElements[i].options[j].selected) {
                    
                        typeSlectOut.push(selectElements[i].options[j].innerHTML)
                        selectElements[i].options[j].selected = "selected"
                        document.getElementsByTagName("select")[i].options[j].setAttribute('selected',"selected");
                        selectElements[i].disabled = true
                    }
                    j++;
                }
    
                i++;
            }
    
    
            let isCorrect = validate();
            return isCorrect
            
            
        }
    
        function validate() {
    
            let flagForValidation = true;
            
            for (let i = 0; i < arr.length; i++) {
    
                if (arr[i].className.includes('mathquill-editable')) {
                    Mfd = MQ.MathField(arr[i])
                    let defaultStr = arr[i].title
                    let studentStr =  Mfd.latex().slice()
    
                    let str1 =  defaultStr.replaceAll(/\\\\/g, '')
                    let str2 = studentStr.replaceAll(/\\\\/g, '')
                    str1 = str1.split(" ").join("").trim()
                    str2 = str2.split(" ").join("").trim()

                    if(str1 !=  str2){
                        flagForValidation = false;
                        return flagForValidation;
                    }
                    
                }
    
            }
    
    
            let i = 0;
            while (i < typeRadioOut.length) {
                if (typeRadioOut[i] !== typeRadioIn[i]) {
                    flagForValidation = false
                    return flagForValidation;
                }
    
                i++;
            }
    
            i = 0;
            while (i < typeCheckboxOut.length) {
                if (typeCheckboxOut[i] !== typeCheckboxIn[i]) {
                    flagForValidation = false
                    return flagForValidation;
                }
                i++;
            }
    
            i = 0;
            while (i < typeInputOut.length) {
                if (typeInputOut[i] !== typeInputIn[i]) {
                    flagForValidation = false
                    return flagForValidation;
                }
                i++;
            }
    
            i = 0;
            while (i < typeSlectOut.length) {
                if (typeSlectOut[i] !== typeSlectIn[i]) {
                    flagForValidation = false
                    return flagForValidation;
                }
                i++;
            }
    
            
            return flagForValidation;
    
        }
    
    
    
        let elements = document.getElementsByTagName("input")
            let selectElements = document.getElementsByTagName("select")
    
            //to reset selected input fileds
            let i = 0;
            while (i < selectElements.length) {
    
                let j = 0;
    
                while (j < selectElements[i].options.length) {
                    if (selectElements[i].options[j].selected) {
                        typeSlectIn.push(selectElements[i].options[j].innerHTML)
                        // selectElements[i].options[j].removeAttribute("selected")
                        selectElements[i].options[j].selected = ""
                    }
                    j++;
                }
    
                i++;
            }
    
            //to reset the radio, checkbox and input fileds 
            i = 0;
            while (i < elements.length) {
    
    
                if (elements[i].type == 'radio') {
    
                    typeRadioIn.push(elements[i].checked)
                    if (elements[i].checked) {
                        //elements[i].removeAttribute("checked")
                        elements[i].checked=""
                    }
    
                } else if (elements[i].type == 'text') {
    
                    typeInputIn.push(elements[i].value)
                    if (elements[i].value) {
                        elements[i].value = ""
                    }
    
                } else if (elements[i].type == 'checkbox') {
    
                    typeCheckboxIn.push(elements[i].checked)
                    if (elements[i].checked) {
                        // elements[i].removeAttribute("checked")
                        elements[i].checked=""
                    }
                }
    
                i++;
            }
            setHeight()

            function setHeight(){
                var body =  document.body,
                html = document.documentElement;
        
                var height = Math.max(
                    body.scrollHeight, html.scrollHeight,
                    body.offsetHeight, html.offsetHeight,
                    body.clientHeight, html.clientHeight
                );
                const data = JSON.stringify({height, type:'dimensions'})
                window.ReactNativeWebView.postMessage(data);
            }

            window.addEventListener("message", message => {
        
                if(message.data == 'validate'){
                    let isCorrect = finalResponses();
                    res = document.getElementById("check").innerHTML;
                    //alert(res)
                    const obj = {
                    isCorrect:isCorrect,
                    student_answer_response:JSON.stringify(res)
                    }
        
                    const data = JSON.stringify({obj, type:'check'})
                    window.ReactNativeWebView.postMessage(data);
                }else{
                //  alert("No")
                }
                
                
                
            });
        
    </script>`;
  }

  const runBeforeFirst = `
      window.isNativeApp = true;
      true; // note: this is required, or you'll sometimes get silent failures
  `;

  const question = data.question_data[0];
  const [student_response, setStudentResponse] = useState(
    data.question_data[0]
  );

  const [isValidated, setIsValidated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [solution, setSolution] = useState("");
  const [studentAnswerResponse, setStudentAnswerResponse] = useState("");
  const [studentAnswerChoice, setStudentAnswerChoice] = useState("");
  const webviewRef = useRef();

  function sendDataToWebView() {
    webviewRef.current.postMessage("data");
  }

  function validateInWebView() {
    if (question.choice_data == "" || question.choice_data.length == 0) {
      webviewRef.current.postMessage("validate");
    } else {
      // if(selectedValue == null || selectedValue == "null"){

      //     alert("please choose the option")
      // }else{
      webviewRef.current.postMessage("validate");
      // }
    }
  }

  const [webViewHeight, setWebViewHeight] = useState(0);
  const handleWebViewMessage = (event) => {
    console.log("Inside habdle");
    const postMessage = JSON.parse(event?.nativeEvent?.data);
    //console.log("In handleWebViewMessage", postMessage);
    if (postMessage.type == "dimensions") {
      const { height } = postMessage;
      console.log("height", height);
      setWebViewHeight(height);
    } else {
      console.log(postMessage.obj);
      console.log("Start");
      console.log(JSON.parse(postMessage.obj.student_answer_response));
      console.log("End");

      let temp ;
      if (question.choice_data.length != 0) {
        setStudentAnswerChoice(selectedValue.choice_id);
        setIsCorrect(selectedValue.correct && postMessage.obj.isCorrect);
        temp = selectedValue.correct && postMessage.obj.isCorrect
      } else {
        setIsCorrect(postMessage.obj.isCorrect);
        temp = postMessage.obj.isCorrect
      }

      setStudentAnswerResponse(
        JSON.parse(postMessage.obj.student_answer_response)
      );
      setIsValidated(true);
      
      if( screenType == MATH_ZONE_QUESTION){
        handleStudentAnswerCorrect(temp)
      }

      if (screenType == MATH_ZONE_LIVE_CLASS_QUESTION) {
        submitResponse(
          question_id,
          JSON.parse(postMessage.obj.student_answer_response),
          selectedValue.choice_id,
        temp
        );
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.outterSection}>
        <View style={{ width: "80%" }}>
          <View style={{ height: webViewHeight }}>
            <WebView
              originWhitelist={["*"]}
              source={{ html: html }}
              containerStyle={{ alignContent: "center" }}
              javaScriptEnabled
              nestedScrollEnabled
              injectedJavaScriptBeforeContentLoaded={runBeforeFirst}
              onMessage={handleWebViewMessage}
              ref={webviewRef}
            />
          </View>

          {question.after_question_text != null ? (
            <View style={{ marginTop: 10 }}>
              <HtmlViwer
                source={{ html: question.after_question_text }}
                isQuestion={true}
              />
            </View>
          ) : (
            <></>
          )}
        </View>

        {screenType == MATH_ZONE_QUESTION ? (
          <View style={styles.submitButtonSection}>
            {isValidated ? (
              <Pressable
                style={styles.buttonStyle}
                onPress={() => {
                  submitResponse(
                    question_id,
                    studentAnswerResponse,
                    selectedValue.choice_id,
                    isCorrect
                  );
                  setIsValidated(false);
                  setIsCorrect(false);
                }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  Submit
                </Text>
              </Pressable>
            ) : (
              <Pressable
                style={styles.buttonStyle}
                onPress={() => {
                  //validate();
                  validateInWebView();
                  // setIsValidated(true);
                }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  Solve
                </Text>
              </Pressable>
            )}
          </View>
        ) : (
          <></>
        )}

        {screenType == MATH_ZONE_LIVE_CLASS_QUESTION ? (
          <View style={styles.submitButtonSection}>
            {isValidated ? (
              <View
                style={{
                  height: 30,
                  width: 100,
                  borderWidth: 1,
                  borderColor: "white",
                  backgroundColor: "white",
                }}
              >
                <Text style={{ fontWeight: "bold", color: "black" }}>
                  please wait..
                </Text>
              </View>
            ) : (
              <Pressable
                style={styles.buttonStyle}
                onPress={() => {
                  validateInWebView();
                }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  Solve
                </Text>
              </Pressable>
            )}
          </View>
        ) : (
          <></>
        )}

        {screenType == MATH_ZONE_FLAGGED_QUESTION ? (
          <View style={styles.submitButtonSection}>
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {
                setIsValidated(true);
                setIsCorrect(true);
              }}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>
                Show Soln
              </Text>
            </Pressable>
          </View>
        ) : (
          <></>
        )}

        {screenType == MATH_ZONE_HOME_WORK_QUESTION ? (
          <View style={styles.submitButtonSection}>
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {
                setIsValidated(true);
                setIsCorrect(true);
              }}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>Solve</Text>
            </Pressable>
          </View>
        ) : (
          <></>
        )}
      </View>
      {question.choice_data.length != 0 ? (
        <ChoicesSection
          choices={question.choice_data}
          handleChoices={handleChoices}
        />
      ) : (
        <></>
      )}

      {screenType == MATH_ZONE_QUESTION && isValidated && (
        <ModalTesterForCkEditor isCorrect={isCorrect} solution={parsed} />
      )}

      {(screenType == MATH_ZONE_LIVE_CLASS_QUESTION ||
        screenType == MATH_ZONE_FLAGGED_QUESTION) &&
        isValidated && (
          <SolutionComponentForCkEditor
            isCorrect={isCorrect}
            solution={parsed}
            isMathquill={true}
            screenType={screenType}
          />
        )}
    </ScrollView>
    // <View style={{ height: webViewHeight, borderWidth: 1 }}>
    //   <WebView
    //     originWhitelist={["*"]}
    //     source={{ html: html }}
    //     containerStyle={{ alignContent: "center" }}
    //     javaScriptEnabled
    //     nestedScrollEnabled
    //     injectedJavaScriptBeforeContentLoaded={runBeforeFirst}
    //     onMessage={handleWebViewMessage}
    //   />
    // </View>
  );
};

const ChoicesSection = ({ choices, handleChoices }) => {
  // console.log(choices);
  let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];

  const [optionClicked, setOptionClicked] = useState("");

  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 10,
        }}
      >
        {choices?.map((e, i) => {
          // console.log("IN", e);
          return (
            <Pressable
              //   style={val.value.length > 24 ?{width:"100%"}:{ width:'50%'}}
              style={[styles.option]}
              onPress={() => {
                setOptionClicked(letters[i]);
                handleChoices(e);
              }}
            >
              <View
                style={
                  optionClicked != letters[i]
                    ? styles.circle
                    : [styles.circle, { backgroundColor: "#2fb8bb" }]
                }
              >
                <Text
                  style={
                    optionClicked != letters[i]
                      ? { fontWeight: "bold" }
                      : { fontWeight: "bold", color: "white" }
                  }
                >
                  {letters[i]}
                </Text>
              </View>
              {e.choice_image != "" ? (
                <View style={{ height: 100, width: 100 }}>
                  <Image
                    source={{ uri: e.choice_image }}
                    style={{
                      aspectRatio: 1,
                      height: "100%",
                      width: "100%",
                      resizeMode: "contain",
                    }}
                  />
                </View>
              ) : (
                <View style={{ width: "90%" }}>
                  {/* <MathQuillHtmlRender content={e.choices} isQuestion={true} /> */}
                  <QuestionPartBuilder data={e.choices}/>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    height: 30,
    width: 75,
    backgroundColor: "#3E46FF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonSection: {
    width: "20%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  outterSection: {
    display: "flex",
    flexDirection: "row",
    // margin: 10,
    marginTop: 0,
    justifyContent: "space-between",
    minHeight: 200,
  },

  centeredContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  palette: {
    flexDirection: "row",
    // justifyContent: 'space-evenly',
  },
  draggableBox: {
    width: 100,
    height: 50,
    borderRadius: 30,
    margin: 0,
  },
  receiving: {
    borderColor: "red",
    borderWidth: 5,
  },

  magenta: {
    backgroundColor: "#ffaaff",
  },
  dragging: {
    opacity: 0,
  },
  hoverDragging: {
    borderColor: "magenta",
    borderWidth: 2,
  },

  option: {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    //  padding: 5,
    // minWidth: windowWidth / 3,
    width: "90%",
    borderWidth: 2,
    borderColor: "#D0D4E1",
    borderRadius: 12,
  },
  circle: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    margin: 5,
    padding: 5,
    height: 30,
    width: 30,
    borderRadius: 15,
  },
});

export default MyWebViewMathquill;
