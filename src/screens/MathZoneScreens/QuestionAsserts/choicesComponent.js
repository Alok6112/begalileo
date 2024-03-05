import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import HtmlViwer from './HtmlRender';
import MathQuillHtmlRender from './MathQuillHtmlRender';
import QuestionPartBuilder from './questionPartBuilder';


const windowWidth = Dimensions.get('window').width;

const ChoicesSection = ({choices, handleChoices, isResponse, studentAnswer,isValidated}) => {
  let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

  const [optionClicked, setOptionClicked] = useState('');

  function convertHTML(str) {
    if(str == "&lt;" ){
      return "<"
    }else if(str == "&gt;" ){
      return ">"
    }else{
      return str
    }
  }


  function testHtmlContent(ele){
    return /<\/?[a-z][\s\S]*>/i.test(ele)
   }

  return (
    <View>
      <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap',marginTop:10}}>
        {choices?.map((e, i) => {
          return (isResponse == true ? 
          <View  style={[styles.option]}>
            <View
            style={
              studentAnswer != e
                ? styles.circle
                : [styles.circle, {backgroundColor:"#2fb8bb"}]
            }>
            <Text
              style={
                optionClicked != letters[i]
                  ? {fontWeight: 'bold'}
                  : {fontWeight: 'bold', color: 'white'}
              }>
              {letters[i]}
            </Text>
            </View>
            <View style={{margin: 5, padding: 5}}>
            {/* <Text>{convertHTML(e)}</Text> */}
            {/* <HtmlViwer source={{html: convertHTML(e)}}/> */}
            <QuestionPartBuilder data={convertHTML(e)} imgSize={60}/>
            {/* <View style={{width:'100%'}}><MathQuillHtmlRender content={question.question_text} isQuestion={true}/></View> */}
            </View>
          </View> :  
          <Pressable
          // style={[styles.option,{backgroundColor:"#EDEFFC"}]}
          style={
            optionClicked != letters[i]
              ? [styles.option,{width: e.includes("mq-selectable") ? e.length > 150 ?"100%":"40%" : testHtmlContent(e) && !e.includes("<img") ? e.length >70 ?"100%" :"40%" : e.length > 20 ?"100%":"40%"}]
              : [styles.option, {backgroundColor:"#EDEFFC",width: e.includes("mq-selectable") ? e.length > 150 ?"100%":"40%" : testHtmlContent(e) && !e.includes("<img") ? e.length > 70 ?"100%" :"40%" : e.length > 20 ?"100%":"40%"}]
          }
          onPress={() => {
            
            if(!isValidated){
              setOptionClicked(letters[i]);
              handleChoices(e);
            }
           
          }}>
          <View
            style={
              optionClicked != letters[i]
                ? styles.circle
                : [styles.circle, {backgroundColor:"#2fb8bb"}]
            }>
            <Text
              style={
                optionClicked != letters[i]
                  ? {fontWeight: 'bold'}
                  : {fontWeight: 'bold', color: 'white'}
              }>
              {letters[i]}
            </Text>
          </View>
          <View style={{margin: 5}}>
            {/* <Text>{convertHTML(e)}</Text> */}
            {/* <HtmlViwer source={{html: convertHTML(e)}}/> */}
            <QuestionPartBuilder data={convertHTML(e)} imgSize={60}/>
            {/* <View style={{width:'100%'}}><MathQuillHtmlRender content={convertHTML(e)} isQuestion={true}/></View> */}
          </View>
          </Pressable>
          )

        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  option: {
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    margin: 5,
    padding: 5,
  //  minWidth: windowWidth /4,
  //  width:"100%",
  //  minWidth:"40%",
   borderWidth:2,
   borderColor:"#D0D4E1",
   borderRadius: 12,
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    margin: 5,
    padding: 5,
    height: 30,
    width: 30,
    borderRadius: 15,
  },
});

export default ChoicesSection;
