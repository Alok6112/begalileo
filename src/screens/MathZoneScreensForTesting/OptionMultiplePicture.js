import React, { useEffect, useState, useRef } from "react";
import { View, ScrollView, TextInput } from "react-native";
import MathView, { MathText } from 'react-native-math-view';

import QuestionPartBuilder from "./helpers/questionPartBuilder";
import MathquillKeyboard from "./keyboards/mathquill_board";
import NumericKeyboard from "./keyboards/numeric_board";
import OwnTextInput from "./OwnTextInput";


const OptionMultiplePicturesQuestions = ({ data }) => {
    console.log("INSIDE", data);
    
    return (
        <View>
            {/* <View>
                <MathQuillHtmlRender
                    content={data.questionName}
                    isQuestion={true}
                />
            </View> */}

            <View style={{ borderWidth: 0 }}>
                <QuestionPartBuilder data={data.questionName} />
            </View>

     <OwnTextInput  myId={0}/>
     <OwnTextInput  myId={1}/>
     <OwnTextInput  myId={2}/>
  {/* <View onStartShouldSetResponder={(evt) => {
      evt.persist()
      alert("Tapped outside")
      if (this.childrenIds && this.childrenIds.length) {
        if (this.childrenIds.includes(evt.target)) {
          return
        }
        console.log("Tapped outside")
        alert("Tapped outside")
      }
    }}>
  
  </View> */}
    

     {/* <TextInput style={{height:50,width:100,borderWidth:1,borderRadius:5,backgroundColor:"white"}}
     keyboardType="numeric"/> */}
   
  
    </View>
    );
};

export default OptionMultiplePicturesQuestions;




// import React, { useState } from 'react';
// import { View } from 'react-native';
// import MathQuillKeypad from "./MathInput";

// const OptionMultiplePicturesQuestions = () => {
//   const [expression, setExpression] = useState('');

//   const handleExpressionChange = (newExpression) => {
//     setExpression(newExpression);
//   };

//   return (
//     <View>
//       <MathQuillKeypad onChange={handleExpressionChange} />
//     </View>
//   );
// };

// export default OptionMultiplePicturesQuestions;