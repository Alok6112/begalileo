import React, { useState, useRef , useContext} from "react";
import { View ,Text, StyleSheet} from "react-native";
import WebView from "react-native-webview";
import MathquillKeyboard from "./keyboards/mathquill_board";
import ownMathquillInputContext from "../../useContext/ownMathquillInputContext";
import NumericKeyboard from "./keyboards/numeric_board";
import AlphabetKeyboard from "./keyboards/alphabet_board";
import Swiper from "react-native-swiper";
import { Portal } from 'react-native-paper';

const OwnTextInput = ({myId,handleInputs,val, isValidated}) =>{

    const [html,setHtml] = useState(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
        <title>Document</title>
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    
    
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.js"></script>
    
    </head>
    <style>
    /*
 * MathQuill v0.10.1               http://mathquill.com
 * by Han, Jeanine, and Mary  maintainers@mathquill.com
 *
 * This Source Code Form is subject to the terms of the
 * Mozilla Public License, v. 2.0. If a copy of the MPL
 * was not distributed with this file, You can obtain
 * one at http://mozilla.org/MPL/2.0/.
 */
/* @font-face {
  font-family: Symbola;
  src: url(font/Symbola.eot);
  src: local("Symbola Regular"), local("Symbola"), url(font/Symbola.woff2) format("woff2"), url(font/Symbola.woff) format("woff"), url(font/Symbola.ttf) format("truetype"), url(font/Symbola.otf) format("opentype"), url(font/Symbola.svg#Symbola) format("svg");
} */
.mq-editable-field {
  display: -moz-inline-box;
  display: inline-block;
}
.mq-editable-field .mq-cursor {
  border-left: 1px solid black;
  margin-left: -1px;
  position: relative;
  z-index: 1;
  padding: 0;
  display: -moz-inline-box;
  display: inline-block;
}
.mq-editable-field .mq-cursor.mq-blink {
  visibility: hidden;
}
.mq-editable-field,
.mq-math-mode .mq-editable-field {
  border: 1px solid gray; 
}
.mq-editable-field.mq-focused,
.mq-math-mode .mq-editable-field.mq-focused {
  -webkit-box-shadow: #8bd 0 0 1px 2px, inset #6ae 0 0 2px 0;
  -moz-box-shadow: #8bd 0 0 1px 2px, inset #6ae 0 0 2px 0;
  box-shadow: #8bd 0 0 1px 2px, inset #6ae 0 0 2px 0;
  border-color: #709AC0;
  border-radius: 1px;
}
.mq-math-mode .mq-editable-field {
  margin: 1px;
}
.mq-editable-field .mq-latex-command-input {
  color: inherit;
  font-family: "Courier New", monospace;
  border: 1px solid gray;
  padding-right: 1px;
  margin-right: 1px;
  margin-left: 2px;
}
.mq-editable-field .mq-latex-command-input.mq-empty {
  background: transparent;
}
.mq-editable-field .mq-latex-command-input.mq-hasCursor {
  border-color: ActiveBorder;
}
.mq-editable-field.mq-empty:after,
.mq-editable-field.mq-text-mode:after,
.mq-math-mode .mq-empty:after {
  visibility: hidden;
  content: 'c';
}
.mq-editable-field .mq-cursor:only-child:after,
.mq-editable-field .mq-textarea + .mq-cursor:last-child:after {
  visibility: hidden;
  content: 'c';
}
.mq-editable-field .mq-text-mode .mq-cursor:only-child:after {
  content: '';
}
.mq-editable-field.mq-text-mode {
  overflow-x: auto;
  overflow-y: hidden;
}
.mq-root-block,
.mq-math-mode .mq-root-block {
  display: -moz-inline-box;
  display: inline-block;
  width: 100%;
  padding: 2px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  vertical-align: middle;
}
.mq-math-mode {
  font-variant: normal;
  font-weight: normal;
  font-style: normal;
  font-size: 115%;
  line-height: 1;
  display: -moz-inline-box;
  display: inline-block;
}
.mq-math-mode .mq-non-leaf,
.mq-math-mode .mq-scaled {
  display: -moz-inline-box;
  display: inline-block;
}
.mq-math-mode var,
.mq-math-mode .mq-text-mode,
.mq-math-mode .mq-nonSymbola {
  font-family: "Times New Roman", Symbola, serif;
  line-height: .9;
}
.mq-math-mode * {
  font-size: inherit;
  line-height: inherit;
  margin: 0;
  padding: 0;
  border-color: black;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  box-sizing: border-box;
}
.mq-math-mode .mq-empty {
  background: #ccc;
}
.mq-math-mode .mq-empty.mq-root-block {
  background: transparent;
}
.mq-math-mode.mq-empty {
  background: transparent;
}
.mq-math-mode .mq-text-mode {
  display: inline-block;
}
.mq-math-mode .mq-text-mode.mq-hasCursor {
  box-shadow: inset darkgray 0 .1em .2em;
  padding: 0 .1em;
  margin: 0 -0.1em;
  min-width: 1ex;
}
.mq-math-mode .mq-font {
  font: 1em "Times New Roman", Symbola, serif;
}
.mq-math-mode .mq-font * {
  font-family: inherit;
  font-style: inherit;
}
.mq-math-mode b,
.mq-math-mode b.mq-font {
  font-weight: bolder;
}
.mq-math-mode var,
.mq-math-mode i,
.mq-math-mode i.mq-font {
  font-style: italic;
}
.mq-math-mode var.mq-f {
  margin-right: 0.2em;
  margin-left: 0.1em;
}
.mq-math-mode .mq-roman var.mq-f {
  margin: 0;
}
.mq-math-mode big {
  font-size: 200%;
}
.mq-math-mode .mq-int > big {
  display: inline-block;
  -webkit-transform: scaleX(0.7);
  -moz-transform: scaleX(0.7);
  -ms-transform: scaleX(0.7);
  -o-transform: scaleX(0.7);
  transform: scaleX(0.7);
  vertical-align: -0.16em;
}
.mq-math-mode .mq-int > .mq-supsub {
  font-size: 80%;
  vertical-align: -1.1em;
  padding-right: .2em;
}
.mq-math-mode .mq-int > .mq-supsub > .mq-sup > .mq-sup-inner {
  vertical-align: 1.3em;
}
.mq-math-mode .mq-int > .mq-supsub > .mq-sub {
  margin-left: -0.35em;
}
.mq-math-mode .mq-roman {
  font-style: normal;
}
.mq-math-mode .mq-sans-serif {
  font-family: sans-serif, Symbola, serif;
}
.mq-math-mode .mq-monospace {
  font-family: monospace, Symbola, serif;
}
.mq-math-mode .mq-overline {
  border-top: 1px solid black;
  margin-top: 1px;
}
.mq-math-mode .mq-underline {
  border-bottom: 1px solid black;
  margin-bottom: 1px;
}
.mq-math-mode .mq-binary-operator {
  padding: 0 0.2em;
  display: -moz-inline-box;
  display: inline-block;
}
.mq-math-mode .mq-supsub {
  text-align: left;
  font-size: 90%;
  vertical-align: -0.5em;
}
.mq-math-mode .mq-supsub.mq-sup-only {
  vertical-align: .5em;
}
.mq-math-mode .mq-supsub.mq-sup-only .mq-sup {
  display: inline-block;
  vertical-align: text-bottom;
}
.mq-math-mode .mq-supsub .mq-sup {
  display: block;
}
.mq-math-mode .mq-supsub .mq-sub {
  display: block;
  float: left;
}
.mq-math-mode .mq-supsub .mq-binary-operator {
  padding: 0 .1em;
}
.mq-math-mode .mq-supsub .mq-fraction {
  font-size: 70%;
}
.mq-math-mode sup.mq-nthroot {
  font-size: 80%;
  vertical-align: 0.8em;
  margin-right: -0.6em;
  margin-left: .2em;
  min-width: .5em;
}
.mq-math-mode .mq-paren {
  padding: 0 .1em;
  vertical-align: top;
  -webkit-transform-origin: center .06em;
  -moz-transform-origin: center .06em;
  -ms-transform-origin: center .06em;
  -o-transform-origin: center .06em;
  transform-origin: center .06em;
}
.mq-math-mode .mq-paren.mq-ghost {
  color: silver;
}
.mq-math-mode .mq-paren + span {
  margin-top: .1em;
  margin-bottom: .1em;
}
.mq-math-mode .mq-array {
  vertical-align: middle;
  text-align: center;
}
.mq-math-mode .mq-array > span {
  display: block;
}
.mq-math-mode .mq-operator-name {
  font-family: Symbola, "Times New Roman", serif;
  line-height: .9;
  font-style: normal;
}
.mq-math-mode var.mq-operator-name.mq-first {
  padding-left: .2em;
}
.mq-math-mode var.mq-operator-name.mq-last,
.mq-math-mode .mq-supsub.mq-after-operator-name {
  padding-right: .2em;
}
.mq-math-mode .mq-fraction {
  font-size: 90%;
  text-align: center;
  vertical-align: -0.4em;
  padding: 0 .2em;
}
.mq-math-mode .mq-fraction,
.mq-math-mode .mq-large-operator,
.mq-math-mode x:-moz-any-link {
  display: -moz-groupbox;
}
.mq-math-mode .mq-fraction,
.mq-math-mode .mq-large-operator,
.mq-math-mode x:-moz-any-link,
.mq-math-mode x:default {
  display: inline-block;
}
.mq-math-mode .mq-numerator,
.mq-math-mode .mq-denominator {
  display: block;
}
.mq-math-mode .mq-numerator {
  padding: 0 0.1em;
}
.mq-math-mode .mq-denominator {
  border-top: 1px solid;
  float: right;
  width: 100%;
  padding: 0.1em;
}
.mq-math-mode .mq-sqrt-prefix {
  padding-top: 0;
  position: relative;
  top: 0.1em;
  vertical-align: top;
  -webkit-transform-origin: top;
  -moz-transform-origin: top;
  -ms-transform-origin: top;
  -o-transform-origin: top;
  transform-origin: top;
}
.mq-math-mode .mq-sqrt-stem {
  border-top: 1px solid;
  margin-top: 1px;
  padding-left: .15em;
  padding-right: .2em;
  margin-right: .1em;
  padding-top: 1px;
}
.mq-math-mode .mq-vector-prefix {
  display: block;
  text-align: center;
  line-height: .25em;
  margin-bottom: -0.1em;
  font-size: 0.75em;
}
.mq-math-mode .mq-vector-stem {
  display: block;
}
.mq-math-mode .mq-large-operator {
  vertical-align: -0.2em;
  padding: .2em;
  text-align: center;
}
.mq-math-mode .mq-large-operator .mq-from,
.mq-math-mode .mq-large-operator big,
.mq-math-mode .mq-large-operator .mq-to {
  display: block;
}
.mq-math-mode .mq-large-operator .mq-from,
.mq-math-mode .mq-large-operator .mq-to {
  font-size: 80%;
}
.mq-math-mode .mq-large-operator .mq-from {
  float: right;
  /* take out of normal flow to manipulate baseline */
  width: 100%;
}
.mq-math-mode,
.mq-math-mode .mq-editable-field {
  cursor: text;
  font-family: Symbola, "Times New Roman", serif;
}
.mq-math-mode .mq-overarrow {
  border-top: 1px solid black;
  margin-top: 1px;
  padding-top: 0.2em;
}
.mq-math-mode .mq-overarrow:before {
  display: block;
  position: relative;
  top: -0.34em;
  font-size: 0.5em;
  line-height: 0em;
  content: '\\27A4';
  text-align: right;
}
.mq-math-mode .mq-overarrow.mq-arrow-left:before {
  -moz-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  filter: FlipH;
  -ms-filter: "FlipH";
}
.mq-math-mode .mq-selection,
.mq-editable-field .mq-selection,
.mq-math-mode .mq-selection .mq-non-leaf,
.mq-editable-field .mq-selection .mq-non-leaf,
.mq-math-mode .mq-selection .mq-scaled,
.mq-editable-field .mq-selection .mq-scaled {
  background: #B4D5FE !important;
  background: Highlight !important;
  color: HighlightText;
  border-color: HighlightText;
}
.mq-math-mode .mq-selection .mq-matrixed,
.mq-editable-field .mq-selection .mq-matrixed {
  background: #39F !important;
}
.mq-math-mode .mq-selection .mq-matrixed-container,
.mq-editable-field .mq-selection .mq-matrixed-container {
  filter: progid:DXImageTransform.Microsoft.Chroma(color='#3399FF') !important;
}
.mq-math-mode .mq-selection.mq-blur,
.mq-editable-field .mq-selection.mq-blur,
.mq-math-mode .mq-selection.mq-blur .mq-non-leaf,
.mq-editable-field .mq-selection.mq-blur .mq-non-leaf,
.mq-math-mode .mq-selection.mq-blur .mq-scaled,
.mq-editable-field .mq-selection.mq-blur .mq-scaled,
.mq-math-mode .mq-selection.mq-blur .mq-matrixed,
.mq-editable-field .mq-selection.mq-blur .mq-matrixed {
  background: #D4D4D4 !important;
  color: black;
  border-color: black;
}
.mq-math-mode .mq-selection.mq-blur .mq-matrixed-container,
.mq-editable-field .mq-selection.mq-blur .mq-matrixed-container {
  filter: progid:DXImageTransform.Microsoft.Chroma(color='#D4D4D4') !important;
}
.mq-editable-field .mq-textarea,
.mq-math-mode .mq-textarea {
  position: relative;
  -webkit-user-select: text;
  -moz-user-select: text;
  user-select: text;
}
.mq-editable-field .mq-textarea *,
.mq-math-mode .mq-textarea *,
.mq-editable-field .mq-selectable,
.mq-math-mode .mq-selectable {
  -webkit-user-select: text;
  -moz-user-select: text;
  user-select: text;
  position: absolute;
  clip: rect(1em 1em 1em 1em);
  -webkit-transform: scale(0);
  -moz-transform: scale(0);
  -ms-transform: scale(0);
  -o-transform: scale(0);
  transform: scale(0);
  resize: none;
  width: 1px;
  height: 1px;
}
.mq-math-mode .mq-matrixed {
  background: white;
  display: -moz-inline-box;
  display: inline-block;
}
.mq-math-mode .mq-matrixed-container {
  filter: progid:DXImageTransform.Microsoft.Chroma(color='white');
  margin-top: -0.1em;
}

</style>
    <body style='margin:0;padding:0;'>
        <span inputmode='none' id="own_math" style="min-height: 50px;height: fit-content; border-radius: 5px;font-size: 20px;font-weight: bold;justify-content: center;display:flex;justify-content: center;align-items: center;min-width: 80px;max-width: 300px;width: fit-content;padding:0 8px;"></span>
    </body>
    <script>
         var MQ = MathQuill.getInterface(2);
         let elementClicked = document.getElementById("own_math")
        //  makeBlur()
        //  document.getElementById("own_math").blur()
        //  let own_math = document.getElementById("own_math")
        //  own_math.addEventListener('click', setClickedDiv)
        //  own_math.innerHTML =  insertDyanamicMathMl("").outerHTML

    
        function insertDyanamicMathMl(data) {
            var problemSpan = document.createElement('span')
            problemSpan.id = Math.floor(Math.random() * 1000) + 1
            problemSpan.setAttribute('inputmode', "none");
            var mathField = MQ.MathField(problemSpan, {
                spaceBehavesLikeTab: true
            })
            return problemSpan;
        }

        window.addEventListener("message", message => {

            if(message.data == 'validate'){
              Mfd = MQ.MathField(elementClicked)

                const obj = {
                latex_value:Mfd.latex()
                }
    
                const data = JSON.stringify({obj, type:'latex_data'})
                window.ReactNativeWebView.postMessage(data);
            }else if(message.data == 'focusOut'){
                makeBlur()
            }else if(JSON.parse(message.data).type == 'keyvalues'){
           
             Mfd = MQ.MathField(elementClicked)
             if(JSON.parse(message.data).data == "del"){
                Mfd.keystroke("Backspace");
             }else if(JSON.parse(message.data).data == "clr"){
              Mfd.latex("")
            }else if(JSON.parse(message.data).data == "space"){
                // alert("space")
                // Mfd.keystroke(" ");
                Mfd.cmd(" ")
            }
           else{
                Mfd.cmd(JSON.parse(message.data).data )
                // Mfd.moveToRightEnd()
                Mfd.keystroke("Left");
                Mfd.keystroke("Right");
                // alert(Mfd.latex())
           }

             setTimeout(()=>{ setHeight()

              Mfd = MQ.MathField(elementClicked)
              const obj = {
                latex_value:Mfd.latex()
                }
    
                const data = JSON.stringify({obj, type:'latex_data'})
                window.ReactNativeWebView.postMessage(data); 
            },0)
            }
            
        });

        let own_math = document.getElementById("own_math")
        var isFocusCheck =  false

            $('#own_math').on('click', function() {
                makeBlur()
                setTimeout(()=>{
                    const data = JSON.stringify({ isFocused:true, type:'isFocus'})
                    window.ReactNativeWebView.postMessage(data);
                    isFocusCheck = true
                    makeFocus()
                   
                },10)
               
            });

            $('#own_math').on('focusin', function() {
              // makeBlur()
                const data = JSON.stringify({ isFocused:true, type:'isFocus'})
                window.ReactNativeWebView.postMessage(data);
                isFocusCheck = true
            });

            $('#own_math').on('focusout', function() {
              if(!isFocusCheck){
                const data = JSON.stringify({ isFocused:false, type:'isFocus'})
                window.ReactNativeWebView.postMessage(data);
                isFocusCheck = false
              }
            });

            function makeBlur(){
                const mqContainer = document.getElementById('own_math');
                const mqInstance = MathQuill.getInterface(2).MathField(mqContainer);
                mqInstance.blur();
            }

            function makeFocus(){
                const mqContainer = document.getElementById('own_math');
                const mqInstance = MathQuill.getInterface(2).MathField(mqContainer);
                // mqInstance.focus();
                mqInstance.keystroke("Left");
                mqInstance.keystroke("Right");
                // document.getElementById('own_math').focus()
            }

            function setHeight(){
                var body =  document.body,
                html = document.documentElement;
        
                var height = document.getElementById("own_math").offsetHeight
                var width = document.getElementById("own_math").offsetWidth
                
                const data = JSON.stringify({height,width, type:'dimensions'})
                window.ReactNativeWebView.postMessage(data);
            }

            setHeight()
     
    </script>
    </html>`)

    const runBeforeFirst = `
      window.isNativeApp = true;
      true; // note: this is required, or you'll sometimes get silent failures
  `;

  const [webViewHeight, setWebViewHeight] = useState(0);
  const [webViewWidth, setWebViewWidth] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue,setInputValue] = useState("")
  const webviewRef = useRef();


  function sendDataToWebView(val) {
    webviewRef.current.postMessage( JSON.stringify( {type:"keyvalues",data:val} ) );
  }

  const handleWebViewMessage = (event) => {
    // console.log("Inside habdle");
    const postMessage = JSON.parse(event?.nativeEvent?.data);
    // console.log("In handleWebViewMessage", postMessage);
    if (postMessage.type == "isFocus") {
      if(postMessage.isFocused){
        handleFocus()
      }
      else{
        handleBlur()
      }
      } 
    if (postMessage.type == "dimensions") {
      const { height,width } = postMessage;
      setWebViewHeight(height);
      setWebViewWidth(width);
    } 
    if(postMessage.type == "latex_data"){
      console.log("latex_data",postMessage.obj);
      let latex_data = `${postMessage.obj.latex_value}`
      console.log("latex_data manupulation",latex_data.replace("\\ ", " "));
      // setInputValue(latex_data)
      handleInputs(latex_data.replace("\\ ", " "),val)
    }
  };

  const handleFocus = () => {
    if(!isFocused)
    setIsFocused(true);
    setFocusedElementIdForMathQuill(myId)
  };

  const handleBlur = () => {

    if(isFocused)
    setIsFocused(false);

    setTimeout(()=>{
      webviewRef.current.postMessage("validate");
    },100)
  
    return
  };

  const dismissKeyboard = () => {
    handleBlur()
    webviewRef.current.postMessage("focusOut");
    setFocusedElementIdForMathQuill(-1)
    
  };


  const handleInputValues = (val) =>{
    setInputValue(val)
    sendDataToWebView(val)
  }

  const {focusedElementIdForMathQuill, setFocusedElementIdForMathQuill} = useContext(ownMathquillInputContext);

  if(focusedElementIdForMathQuill != -1){
    if(isFocused && myId !== focusedElementIdForMathQuill)
    dismissKeyboard();
  }

    return<View> 
    <View style={{height:webViewHeight,width:webViewWidth}}>
            <WebView
              originWhitelist={["*"]}
              source={{ html: html }}
              containerStyle={{ borderWidth:1,borderRadius:5,borderColor:isFocused?"rgb(24, 101, 242)":"black"}}
              javaScriptEnabled
            //   nestedScrollEnabled
              injectedJavaScriptBeforeContentLoaded={runBeforeFirst}
              onMessage={handleWebViewMessage}
              scrollEnabled={false}
              ref={webviewRef}
            />

          <Portal>
          {isFocused &&  <View style={{  position:"absolute",width:"100%",bottom:0,backgroundColor:"yellow",zIndex:9999999}}>
              <Swiper style={{height:150,backgroundColor:"white"}}  showsButtons={false}   controlsProps={{
     dotsTouchable: false,
     dotsWrapperStyle: { marginBottom: 50 },
     }}>
              {isFocused && <MathquillKeyboard setInputValue={handleInputValues} dismissKeyboard={dismissKeyboard}/>   } 
              {/* {isFocused && <NumericKeyboard setInputValue={handleInputValues} dismissKeyboard={dismissKeyboard}/> } */}
              {isFocused && <AlphabetKeyboard setInputValue={handleInputValues} dismissKeyboard={dismissKeyboard}/>   } 
              </Swiper>
            </View>
          }
          </Portal>
    </View>

    </View>
    
}

const styles = StyleSheet.create({
    centeredView: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 22,
        height:200,
        borderWidth:1,
        // width:"100%",
        // position:"absolute",
        // bottom:0
      },
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:200
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:200,
    borderWidth:1
  },
  
});

export default OwnTextInput;



// let html1 = `<!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta http-equiv="X-UA-Compatible" content="IE=edge">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
//         <title>Document</title>
        
//         <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    
    
//         <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
//         <script src="https://cdnjs.cloudflare.com/ajax/libs/mathquill/0.10.1/mathquill.js"></script>
    
//     </head>
//     <style>
//     /*
//  * MathQuill v0.10.1               http://mathquill.com
//  * by Han, Jeanine, and Mary  maintainers@mathquill.com
//  *
//  * This Source Code Form is subject to the terms of the
//  * Mozilla Public License, v. 2.0. If a copy of the MPL
//  * was not distributed with this file, You can obtain
//  * one at http://mozilla.org/MPL/2.0/.
//  */
// /* @font-face {
//   font-family: Symbola;
//   src: url(font/Symbola.eot);
//   src: local("Symbola Regular"), local("Symbola"), url(font/Symbola.woff2) format("woff2"), url(font/Symbola.woff) format("woff"), url(font/Symbola.ttf) format("truetype"), url(font/Symbola.otf) format("opentype"), url(font/Symbola.svg#Symbola) format("svg");
// } */
// .mq-editable-field {
//   display: -moz-inline-box;
//   display: inline-block;
// }
// .mq-editable-field .mq-cursor {
//   border-left: 1px solid black;
//   margin-left: -1px;
//   position: relative;
//   z-index: 1;
//   padding: 0;
//   display: -moz-inline-box;
//   display: inline-block;
// }
// .mq-editable-field .mq-cursor.mq-blink {
//   visibility: hidden;
// }
// .mq-editable-field,
// .mq-math-mode .mq-editable-field {
//   border: 1px solid gray; 
// }
// .mq-editable-field.mq-focused,
// .mq-math-mode .mq-editable-field.mq-focused {
//   -webkit-box-shadow: #8bd 0 0 1px 2px, inset #6ae 0 0 2px 0;
//   -moz-box-shadow: #8bd 0 0 1px 2px, inset #6ae 0 0 2px 0;
//   box-shadow: #8bd 0 0 1px 2px, inset #6ae 0 0 2px 0;
//   border-color: #709AC0;
//   border-radius: 1px;
// }
// .mq-math-mode .mq-editable-field {
//   margin: 1px;
// }
// .mq-editable-field .mq-latex-command-input {
//   color: inherit;
//   font-family: "Courier New", monospace;
//   border: 1px solid gray;
//   padding-right: 1px;
//   margin-right: 1px;
//   margin-left: 2px;
// }
// .mq-editable-field .mq-latex-command-input.mq-empty {
//   background: transparent;
// }
// .mq-editable-field .mq-latex-command-input.mq-hasCursor {
//   border-color: ActiveBorder;
// }
// .mq-editable-field.mq-empty:after,
// .mq-editable-field.mq-text-mode:after,
// .mq-math-mode .mq-empty:after {
//   visibility: hidden;
//   content: 'c';
// }
// .mq-editable-field .mq-cursor:only-child:after,
// .mq-editable-field .mq-textarea + .mq-cursor:last-child:after {
//   visibility: hidden;
//   content: 'c';
// }
// .mq-editable-field .mq-text-mode .mq-cursor:only-child:after {
//   content: '';
// }
// .mq-editable-field.mq-text-mode {
//   overflow-x: auto;
//   overflow-y: hidden;
// }
// .mq-root-block,
// .mq-math-mode .mq-root-block {
//   display: -moz-inline-box;
//   display: inline-block;
//   width: 100%;
//   padding: 2px;
//   -webkit-box-sizing: border-box;
//   -moz-box-sizing: border-box;
//   box-sizing: border-box;
//   white-space: nowrap;
//   overflow: hidden;
//   vertical-align: middle;
// }
// .mq-math-mode {
//   font-variant: normal;
//   font-weight: normal;
//   font-style: normal;
//   font-size: 115%;
//   line-height: 1;
//   display: -moz-inline-box;
//   display: inline-block;
// }
// .mq-math-mode .mq-non-leaf,
// .mq-math-mode .mq-scaled {
//   display: -moz-inline-box;
//   display: inline-block;
// }
// .mq-math-mode var,
// .mq-math-mode .mq-text-mode,
// .mq-math-mode .mq-nonSymbola {
//   font-family: "Times New Roman", Symbola, serif;
//   line-height: .9;
// }
// .mq-math-mode * {
//   font-size: inherit;
//   line-height: inherit;
//   margin: 0;
//   padding: 0;
//   border-color: black;
//   -webkit-user-select: none;
//   -moz-user-select: none;
//   user-select: none;
//   box-sizing: border-box;
// }
// .mq-math-mode .mq-empty {
//   background: #ccc;
// }
// .mq-math-mode .mq-empty.mq-root-block {
//   background: transparent;
// }
// .mq-math-mode.mq-empty {
//   background: transparent;
// }
// .mq-math-mode .mq-text-mode {
//   display: inline-block;
// }
// .mq-math-mode .mq-text-mode.mq-hasCursor {
//   box-shadow: inset darkgray 0 .1em .2em;
//   padding: 0 .1em;
//   margin: 0 -0.1em;
//   min-width: 1ex;
// }
// .mq-math-mode .mq-font {
//   font: 1em "Times New Roman", Symbola, serif;
// }
// .mq-math-mode .mq-font * {
//   font-family: inherit;
//   font-style: inherit;
// }
// .mq-math-mode b,
// .mq-math-mode b.mq-font {
//   font-weight: bolder;
// }
// .mq-math-mode var,
// .mq-math-mode i,
// .mq-math-mode i.mq-font {
//   font-style: italic;
// }
// .mq-math-mode var.mq-f {
//   margin-right: 0.2em;
//   margin-left: 0.1em;
// }
// .mq-math-mode .mq-roman var.mq-f {
//   margin: 0;
// }
// .mq-math-mode big {
//   font-size: 200%;
// }
// .mq-math-mode .mq-int > big {
//   display: inline-block;
//   -webkit-transform: scaleX(0.7);
//   -moz-transform: scaleX(0.7);
//   -ms-transform: scaleX(0.7);
//   -o-transform: scaleX(0.7);
//   transform: scaleX(0.7);
//   vertical-align: -0.16em;
// }
// .mq-math-mode .mq-int > .mq-supsub {
//   font-size: 80%;
//   vertical-align: -1.1em;
//   padding-right: .2em;
// }
// .mq-math-mode .mq-int > .mq-supsub > .mq-sup > .mq-sup-inner {
//   vertical-align: 1.3em;
// }
// .mq-math-mode .mq-int > .mq-supsub > .mq-sub {
//   margin-left: -0.35em;
// }
// .mq-math-mode .mq-roman {
//   font-style: normal;
// }
// .mq-math-mode .mq-sans-serif {
//   font-family: sans-serif, Symbola, serif;
// }
// .mq-math-mode .mq-monospace {
//   font-family: monospace, Symbola, serif;
// }
// .mq-math-mode .mq-overline {
//   border-top: 1px solid black;
//   margin-top: 1px;
// }
// .mq-math-mode .mq-underline {
//   border-bottom: 1px solid black;
//   margin-bottom: 1px;
// }
// .mq-math-mode .mq-binary-operator {
//   padding: 0 0.2em;
//   display: -moz-inline-box;
//   display: inline-block;
// }
// .mq-math-mode .mq-supsub {
//   text-align: left;
//   font-size: 90%;
//   vertical-align: -0.5em;
// }
// .mq-math-mode .mq-supsub.mq-sup-only {
//   vertical-align: .5em;
// }
// .mq-math-mode .mq-supsub.mq-sup-only .mq-sup {
//   display: inline-block;
//   vertical-align: text-bottom;
// }
// .mq-math-mode .mq-supsub .mq-sup {
//   display: block;
// }
// .mq-math-mode .mq-supsub .mq-sub {
//   display: block;
//   float: left;
// }
// .mq-math-mode .mq-supsub .mq-binary-operator {
//   padding: 0 .1em;
// }
// .mq-math-mode .mq-supsub .mq-fraction {
//   font-size: 70%;
// }
// .mq-math-mode sup.mq-nthroot {
//   font-size: 80%;
//   vertical-align: 0.8em;
//   margin-right: -0.6em;
//   margin-left: .2em;
//   min-width: .5em;
// }
// .mq-math-mode .mq-paren {
//   padding: 0 .1em;
//   vertical-align: top;
//   -webkit-transform-origin: center .06em;
//   -moz-transform-origin: center .06em;
//   -ms-transform-origin: center .06em;
//   -o-transform-origin: center .06em;
//   transform-origin: center .06em;
// }
// .mq-math-mode .mq-paren.mq-ghost {
//   color: silver;
// }
// .mq-math-mode .mq-paren + span {
//   margin-top: .1em;
//   margin-bottom: .1em;
// }
// .mq-math-mode .mq-array {
//   vertical-align: middle;
//   text-align: center;
// }
// .mq-math-mode .mq-array > span {
//   display: block;
// }
// .mq-math-mode .mq-operator-name {
//   font-family: Symbola, "Times New Roman", serif;
//   line-height: .9;
//   font-style: normal;
// }
// .mq-math-mode var.mq-operator-name.mq-first {
//   padding-left: .2em;
// }
// .mq-math-mode var.mq-operator-name.mq-last,
// .mq-math-mode .mq-supsub.mq-after-operator-name {
//   padding-right: .2em;
// }
// .mq-math-mode .mq-fraction {
//   font-size: 90%;
//   text-align: center;
//   vertical-align: -0.4em;
//   padding: 0 .2em;
// }
// .mq-math-mode .mq-fraction,
// .mq-math-mode .mq-large-operator,
// .mq-math-mode x:-moz-any-link {
//   display: -moz-groupbox;
// }
// .mq-math-mode .mq-fraction,
// .mq-math-mode .mq-large-operator,
// .mq-math-mode x:-moz-any-link,
// .mq-math-mode x:default {
//   display: inline-block;
// }
// .mq-math-mode .mq-numerator,
// .mq-math-mode .mq-denominator {
//   display: block;
// }
// .mq-math-mode .mq-numerator {
//   padding: 0 0.1em;
// }
// .mq-math-mode .mq-denominator {
//   border-top: 1px solid;
//   float: right;
//   width: 100%;
//   padding: 0.1em;
// }
// .mq-math-mode .mq-sqrt-prefix {
//   padding-top: 0;
//   position: relative;
//   top: 0.1em;
//   vertical-align: top;
//   -webkit-transform-origin: top;
//   -moz-transform-origin: top;
//   -ms-transform-origin: top;
//   -o-transform-origin: top;
//   transform-origin: top;
// }
// .mq-math-mode .mq-sqrt-stem {
//   border-top: 1px solid;
//   margin-top: 1px;
//   padding-left: .15em;
//   padding-right: .2em;
//   margin-right: .1em;
//   padding-top: 1px;
// }
// .mq-math-mode .mq-vector-prefix {
//   display: block;
//   text-align: center;
//   line-height: .25em;
//   margin-bottom: -0.1em;
//   font-size: 0.75em;
// }
// .mq-math-mode .mq-vector-stem {
//   display: block;
// }
// .mq-math-mode .mq-large-operator {
//   vertical-align: -0.2em;
//   padding: .2em;
//   text-align: center;
// }
// .mq-math-mode .mq-large-operator .mq-from,
// .mq-math-mode .mq-large-operator big,
// .mq-math-mode .mq-large-operator .mq-to {
//   display: block;
// }
// .mq-math-mode .mq-large-operator .mq-from,
// .mq-math-mode .mq-large-operator .mq-to {
//   font-size: 80%;
// }
// .mq-math-mode .mq-large-operator .mq-from {
//   float: right;
//   /* take out of normal flow to manipulate baseline */
//   width: 100%;
// }
// .mq-math-mode,
// .mq-math-mode .mq-editable-field {
//   cursor: text;
//   font-family: Symbola, "Times New Roman", serif;
// }
// .mq-math-mode .mq-overarrow {
//   border-top: 1px solid black;
//   margin-top: 1px;
//   padding-top: 0.2em;
// }
// .mq-math-mode .mq-overarrow:before {
//   display: block;
//   position: relative;
//   top: -0.34em;
//   font-size: 0.5em;
//   line-height: 0em;
//   content: '\\27A4';
//   text-align: right;
// }
// .mq-math-mode .mq-overarrow.mq-arrow-left:before {
//   -moz-transform: scaleX(-1);
//   -o-transform: scaleX(-1);
//   -webkit-transform: scaleX(-1);
//   transform: scaleX(-1);
//   filter: FlipH;
//   -ms-filter: "FlipH";
// }
// .mq-math-mode .mq-selection,
// .mq-editable-field .mq-selection,
// .mq-math-mode .mq-selection .mq-non-leaf,
// .mq-editable-field .mq-selection .mq-non-leaf,
// .mq-math-mode .mq-selection .mq-scaled,
// .mq-editable-field .mq-selection .mq-scaled {
//   background: #B4D5FE !important;
//   background: Highlight !important;
//   color: HighlightText;
//   border-color: HighlightText;
// }
// .mq-math-mode .mq-selection .mq-matrixed,
// .mq-editable-field .mq-selection .mq-matrixed {
//   background: #39F !important;
// }
// .mq-math-mode .mq-selection .mq-matrixed-container,
// .mq-editable-field .mq-selection .mq-matrixed-container {
//   filter: progid:DXImageTransform.Microsoft.Chroma(color='#3399FF') !important;
// }
// .mq-math-mode .mq-selection.mq-blur,
// .mq-editable-field .mq-selection.mq-blur,
// .mq-math-mode .mq-selection.mq-blur .mq-non-leaf,
// .mq-editable-field .mq-selection.mq-blur .mq-non-leaf,
// .mq-math-mode .mq-selection.mq-blur .mq-scaled,
// .mq-editable-field .mq-selection.mq-blur .mq-scaled,
// .mq-math-mode .mq-selection.mq-blur .mq-matrixed,
// .mq-editable-field .mq-selection.mq-blur .mq-matrixed {
//   background: #D4D4D4 !important;
//   color: black;
//   border-color: black;
// }
// .mq-math-mode .mq-selection.mq-blur .mq-matrixed-container,
// .mq-editable-field .mq-selection.mq-blur .mq-matrixed-container {
//   filter: progid:DXImageTransform.Microsoft.Chroma(color='#D4D4D4') !important;
// }
// .mq-editable-field .mq-textarea,
// .mq-math-mode .mq-textarea {
//   position: relative;
//   -webkit-user-select: text;
//   -moz-user-select: text;
//   user-select: text;
// }
// .mq-editable-field .mq-textarea *,
// .mq-math-mode .mq-textarea *,
// .mq-editable-field .mq-selectable,
// .mq-math-mode .mq-selectable {
//   -webkit-user-select: text;
//   -moz-user-select: text;
//   user-select: text;
//   position: absolute;
//   clip: rect(1em 1em 1em 1em);
//   -webkit-transform: scale(0);
//   -moz-transform: scale(0);
//   -ms-transform: scale(0);
//   -o-transform: scale(0);
//   transform: scale(0);
//   resize: none;
//   width: 1px;
//   height: 1px;
// }
// .mq-math-mode .mq-matrixed {
//   background: white;
//   display: -moz-inline-box;
//   display: inline-block;
// }
// .mq-math-mode .mq-matrixed-container {
//   filter: progid:DXImageTransform.Microsoft.Chroma(color='white');
//   margin-top: -0.1em;
// }

// </style>
//     <body>
//         <div id="own_math" contenteditable="true"  style="min-height: 50px;height: fit-content; border-radius: 5px;font-size: 20px;font-weight: bold;border: 1px solid black;justify-content: center;display:flex;justify-content: center;align-items: center;min-width: 80px;width: fit-content;padding:0 8px;"></div>
//     </body>
//     <script>
//          var MQ = MathQuill.getInterface(2);
//          let elementClicked = document.getElementById("own_math")
    
//         //  let own_math = document.getElementById("own_math")
//         //  own_math.addEventListener('click', setClickedDiv)
//         //  own_math.innerHTML =  insertDyanamicMathMl("").outerHTML

    
//         function insertDyanamicMathMl(data) {
//             var problemSpan = document.createElement('span')
//             problemSpan.id = Math.floor(Math.random() * 1000) + 1
//             problemSpan.setAttribute('contenteditable', "true");
//             problemSpan.style.minWidth = '20px';
//             problemSpan.style.border = "none"
//             var mathField = MQ.MathField(problemSpan, {
//                 spaceBehavesLikeTab: true
//             })
//             return problemSpan;
//         }
    
    
//         function getLatex(e, latex, i) {
//             alert(i)
//             //  e.preventDefault()
//              console.log("yes", latex);
//              // mathField.cmd(symbolsArray[i])
//              // mathField.focus()
//              // Mfd.latex(latex)
//              Mfd = MQ.MathField(elementClicked)
//             //  Mfd.cmd(symbolsArray[i])
//             Mfd.cmd(i)
//              Mfd.moveToRightEnd()
//              Mfd.focus()
//          }
    
//         function setClickedDiv(event) {
//              event.preventDefault();
//              var e = event.target;
//             //  while (!e.classList.contains('mathquill-editable')) {
//             //      e = e.parentElement;
//             //  }
//              elementClicked = e;
    
//         }

//         window.addEventListener("message", message => {
//             if(message.data == 'validate'){
//                 let isCorrect = finalResponses();
//                 res = document.getElementById("check").innerHTML;
//                 //alert(res)
//                 const obj = {
//                 isCorrect:isCorrect,
//                 student_answer_response:JSON.stringify(res)
//                 }
    
//                 const data = JSON.stringify({obj, type:'check'})
//                 window.ReactNativeWebView.postMessage(data);
//             }else if(JSON.parse(message.data).type == 'keyvalues'){
//             //  alert(JSON.parse(message.data).data )
//             //  getlatex("","",JSON.parse(message.data).data )
//              Mfd = MQ.MathField(elementClicked)
//              if(JSON.parse(message.data).data == "del"){
//                 Mfd.keystroke("Backspace");
//              }else{
//                 Mfd.cmd(JSON.parse(message.data).data )
//                 Mfd.moveToRightEnd()
//                 Mfd.focus()
//              }

//             }
            
//         });

//         let own_math = document.getElementById("own_math")
        
//             own_math.addEventListener('blur', ()=>{
                
//                 var isFocused = (document.activeElement === own_math);
//                 alert(isFocused)
//                 const data = JSON.stringify({isFocused:false, type:'isFocus'})
                
//                 if(!isFocused)
//                 window.ReactNativeWebView.postMessage(data);
//             })
    
//             own_math.addEventListener('focus', ()=>{
//                 const data = JSON.stringify({ isFocused:true, type:'isFocus'})
//                     window.ReactNativeWebView.postMessage(data);
//             })
     
//     </script>
//     </html>`