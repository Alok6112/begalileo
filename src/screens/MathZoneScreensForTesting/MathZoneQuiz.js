import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, ScrollView, Text, View, Image, TouchableWithoutFeedback ,Keyboard , InteractionManager} from "react-native";
import { SCREEN_HEIGHT } from "../../config/configs";
import { SCREEN_WIDTH } from "../../config/configs";
import MathquillKeyboard from "./keyboards/mathquill_board";
import OptionMultiplePicturesQuestions from "./OptionMultiplePicture"
import ownMathquillInputContext from "../../useContext/ownMathquillInputContext";
const MathZoneQuizTesting = (props) => {

    // const [data , setData] = useState({"operation":"addition","type":"options_multiple_pictures","questionName":"Madhu has 4 green apples and 3 red apples.\n\n<img src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/Fruits/Apple.png\"><img src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/Fruits/Apple.png\"><img src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/Fruits/Apple.png\"><img src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/Fruits/9.png\"><img src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/Fruits/9.png\"><img src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/Fruits/9.png\"><img src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/Fruits/9.png\">\nHow many apples are there with him?\nThe fractions for red apples to the total number of apples.\n<span class=\"mq-selectable\">$\\frac{3}{7}$</span>jkjkkjjkjkj<br/><div>Last sentance.</div>","row":1,"col":4,"questionContent":[[{"row":1,"col":1,"value":"7 apples","selected":"true"},{"row":1,"col":2,"value":"4<img src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/Fruits/9.png\" style=\"margin: 3px; white-space: pre-wrap; width: auto !important;\"> and 3 <img src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/Fruits/Apple.png\" style=\"margin: 3px; white-space: pre-wrap; width: auto !important;\">","selected":"false"},{"row":1,"col":3,"value":"<img src=\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/Fruits/Apple.png\" style=\"margin: 3px; white-space: pre-wrap; width: auto !important;\">","selected":"false"},{"row":1,"col":4,"value":"<span class=\"mq-selectable\">$\\frac{3}{7}$</span> ","selected":"false"}]],"solution":{"model":[{"val":"Madhu has 7 apples."},{"val":"The fraction for red apples to green apples is <span class=\"mq-selectable\">$\\frac{3}{4}$</span> ."}],"sidebyside":[],"srows":null,"scols":null},"answer":"true"})
    // const [data1, setData1] = useState({"status":true,"question_no":1,"total":10,"question_data":[{"question_id":78885,"operation":"addition","question_text":"{\"operation\":\"addition\",\"type\":\"options_multiple_pictures\",\"questionName\":\"Choose the simplified answer.\\n\u003cspan class=\\\"mq-selectable\\\"\u003e$\\\\frac{3^2\\\\times5^3}{10^2\\\\times6^2}$\u003c/span\u003e\\n \",\"row\":1,\"col\":4,\"questionContent\":[[{\"row\":1,\"col\":1,\"value\":\"\u003cspan class=\\\"mq-selectable\\\"\u003e$\\\\frac{9}{16}$\u003c/span\u003e \",\"selected\":\"false\"},{\"row\":1,\"col\":2,\"value\":\"\u003cspan class=\\\"mq-selectable\\\"\u003e$\\\\frac{5}{4}$\u003c/span\u003e \",\"selected\":\"false\"},{\"row\":1,\"col\":3,\"value\":\"\u003cspan class=\\\"mq-selectable\\\"\u003e$\\\\frac{5}{16}$\u003c/span\u003e \",\"selected\":\"true\"},{\"row\":1,\"col\":4,\"value\":\"\u003cspan class=\\\"mq-selectable\\\"\u003e$\\\\frac{9}{100}$\u003c/span\u003e \",\"selected\":\"false\"}]],\"solution\":{\"model\":[{\"val\":\"\u003cspan class=\\\"mq-selectable\\\"\u003e$\\\\frac{5}{16}$\u003c/span\u003e \"},{\"val\":\"\u003cspan class=\\\"mq-selectable\\\"\u003e$\\\\frac{3^2\\\\times5^3}{10^2\\\\times6^2}=\\\\frac{9\\\\times125}{100\\\\times36}=\\\\frac{5}{16}$\u003c/span\u003e \"}]},\"answer\":\"true\"}","question_type":"options_multiple_pictures","upload_file_name":"","level":"level1","fib_text":null,"fib_before_text":null,"after_question_text":null,"choice_data":[],"orc_oprc_data":[],"ol_data":[]}],"lice_class_id":4,"tag_id":1870,"level":"level1","live_class_practice_id":null,"message":"Quiz started successfully"})
    const [data1, setData1] = useState({"status":true,"question_no":1,"total":10,"question_data":[{"question_id":100374,"operation":"addition","question_text":"{\"operation\":\"addition\",\"type\":\"horizontal_fill_ups_multi_row\",\"rows\":\"2\",\"cols\":\"2\",\"questionName\":\"For the given triangle, fill in the blanks, when sin U = \u003cspan class=\\\"mq-selectable\\\"\u003e$\\\\frac{21}{29}$\u003c/span\u003e.\\n\u003cimg src=\\\"https://s3.ap-south-1.amazonaws.com/begalileo-assets/09_trigonometricratios/TR_13.png\\\"\u003e \",\"questionContent\":[{\"row\":0,\"col\":0,\"value\":\"sin W =\",\"isMissed\":\"false\"},{\"row\":0,\"col\":1,\"value\":\"\u003cspan class=\\\"mq-selectable\\\"\u003e$\\\\frac{20}{29}$\u003c/span\u003e \",\"isMissed\":\"true\"},{\"row\":1,\"col\":0,\"value\":\"sin U =\",\"isMissed\":\"false\"},{\"row\":1,\"col\":1,\"value\":\"\u003cspan class=\\\"mq-selectable\\\"\u003e$\\\\frac{21}{29}$\u003c/span\u003e \",\"isMissed\":\"true\"}],\"solution\":{\"model\":[{\"val\":\"By Pythagoras theorem,\"},{\"val\":\"\u003cspan class=\\\"mq-selectable\\\"\u003e$\\\\text{UW}^2=\\\\text{UV}^2+\\\\text{VW}^2$\u003c/span\u003e\\n \u003cspan class=\\\"mq-selectable\\\"\u003e$29^2=\\\\text{UV}^2+21^2$\u003c/span\u003e \\n\u003cspan class=\\\"mq-selectable\\\"\u003e$841=\\\\text{UV}^2+441$\u003c/span\u003e \\n\u003cspan class=\\\"mq-selectable\\\"\u003e$841-441=\\\\text{UV}^2$\u003c/span\u003e \\n\u003cspan class=\\\"mq-selectable\\\"\u003e$400=\\\\text{UV}^2$\u003c/span\u003e \\n\u003cspan class=\\\"mq-selectable\\\"\u003e$\\\\text{UV}=20$\u003c/span\u003e \"},{\"val\":\"Then,\"},{\"val\":\"\u003cspan class=\\\"mq-selectable\\\"\u003e$\\\\text{sin W}=\\\\frac{\\\\text{side opposite to W}}{\\\\text{hypotenuse}}=\\\\frac{\\\\text{UV}}{\\\\text{UW}}=\\\\frac{20}{29}$\u003c/span\u003e \"},{\"val\":\"\u003cspan class=\\\"mq-selectable\\\"\u003e$\\\\text{sin U}=\\\\frac{\\\\text{side opposite to U}}{\\\\text{hypotenuse}}=\\\\frac{\\\\text{VW}}{\\\\text{UW}}=\\\\frac{21}{29}$\u003c/span\u003e \"},{\"val\":\"Hence,\\nsin W = \u003cspan class=\\\"mq-selectable\\\"\u003e$\\\\frac{20}{29}$\u003c/span\u003e and sin U = \u003cspan class=\\\"mq-selectable\\\"\u003e$\\\\frac{21}{29}$\u003c/span\u003e .\"}],\"sidebyside\":[],\"srows\":null,\"scols\":null},\"choices\":[\"\u003cspan class=\\\"mq-selectable\\\"\u003e$\\\\frac{20}{29}$\u003c/span\u003e \",\"\u003cspan class=\\\"mq-selectable\\\"\u003e$\\\\frac{21}{29}$\u003c/span\u003e \"],\"choiceType\":\"keying\",\"choiceCount\":2}","question_type":"horizontal_fill_ups_multi_row","upload_file_name":"","level":"level2","fib_text":null,"fib_before_text":null,"after_question_text":null,"choice_data":[],"orc_oprc_data":[],"ol_data":[]}],"lice_class_id":4,"tag_id":2334,"level":"level2","live_class_practice_id":null,"message":"Quiz started successfully"})
    // const [data,setData] = useState({"operation":"addition","type":"horizontal_fill_ups","rows":"1","cols":"1","questionName":"Find the value of the expression.<div><br></div><div><br></div><span class=\"mq-selectable\">$\\left(\\left(\\frac{-3}{5}\\right)\\times\\frac{1}{4}\\right)\\div\\left(\\left(\\frac{-1}{8}\\right)+\\frac{3}{5}\\right)$</span> ","questionContent":[{"row":0,"col":0,"value":"<span class=\"mq-selectable\">$\\frac{-6}{19}$</span>","isMissed":"true"}],"solution":{"model":[{"val":"<span class=\"mq-selectable\">$$</span> <span class=\"mq-selectable\">$$</span> <span class=\"mq-selectable\">$\\left(\\left(\\frac{-3}{5}\\right)\\times\\frac{1}{4}\\right)\\div\\left(\\left(\\frac{-1}{8}\\right)+\\frac{3}{5}\\right)$</span> "},{"val":"<span class=\"mq-selectable\">$\\left(\\frac{-3}{20}\\right)\\div\\left(\\frac{-5}{40}+\\frac{24}{40}\\right)$</span> "},{"val":"<span class=\"mq-selectable\">$\\left(\\frac{-3}{20}\\right)\\times\\left(\\frac{40}{19}\\right)=\\frac{-6}{19}$</span> "}],"sidebyside":[],"srows":null,"scols":null},"choices":["<span class=\"mq-selectable\">$\\frac{-6}{19}$</span>"],"choiceType":"keying","choiceCount":1})
    const [data,setData] = useState(JSON.parse(data1.question_data[0].question_text))
    const [isAvailable, setIsAvailable] = useState(true)
    useEffect(()=>{
        // setData({"status":true,"question_no":1,"total":10,"question_data":[{"question_id":69878,"operation":"addition","question_text":"{\"operation\":\"addition\",\"type\":\"horizontal_fill_ups\",\"rows\":\"1\",\"cols\":\"1\",\"questionName\":\"Find the value of the expression.\u003cdiv\u003e\u003cbr\u003e\u003c/div\u003e\u003cdiv\u003e\u003cbr\u003e\u003c/div\u003e\u003cspan class=\\\"mq-selectable\\\"\u003e$\\\\left(\\\\left(\\\\frac{-3}{5}\\\\right)\\\\times\\\\frac{1}{4}\\\\right)\\\\div\\\\left(\\\\left(\\\\frac{-1}{8}\\\\right)+\\\\frac{3}{5}\\\\right)$\u003c/span\u003e \",\"questionContent\":[{\"row\":0,\"col\":0,\"value\":\"\u003cspan class=\\\"mq-selectable\\\"\u003e$\\\\frac{-6}{19}$\u003c/span\u003e\",\"isMissed\":\"true\"}],\"solution\":{\"model\":[{\"val\":\"\u003cspan class=\\\"mq-selectable\\\"\u003e$$\u003c/span\u003e \u003cspan class=\\\"mq-selectable\\\"\u003e$$\u003c/span\u003e \u003cspan class=\\\"mq-selectable\\\"\u003e$\\\\left(\\\\left(\\\\frac{-3}{5}\\\\right)\\\\times\\\\frac{1}{4}\\\\right)\\\\div\\\\left(\\\\left(\\\\frac{-1}{8}\\\\right)+\\\\frac{3}{5}\\\\right)$\u003c/span\u003e \"},{\"val\":\"\u003cspan class=\\\"mq-selectable\\\"\u003e$\\\\left(\\\\frac{-3}{20}\\\\right)\\\\div\\\\left(\\\\frac{-5}{40}+\\\\frac{24}{40}\\\\right)$\u003c/span\u003e \"},{\"val\":\"\u003cspan class=\\\"mq-selectable\\\"\u003e$\\\\left(\\\\frac{-3}{20}\\\\right)\\\\times\\\\left(\\\\frac{40}{19}\\\\right)=\\\\frac{-6}{19}$\u003c/span\u003e \"}],\"sidebyside\":[],\"srows\":null,\"scols\":null},\"choices\":[\"\u003cspan class=\\\"mq-selectable\\\"\u003e$\\\\frac{-6}{19}$\u003c/span\u003e\"],\"choiceType\":\"keying\",\"choiceCount\":1}","question_type":"horizontal_fill_ups","upload_file_name":"","level":"level3","fib_text":null,"fib_before_text":null,"after_question_text":null,"choice_data":[],"orc_oprc_data":[],"ol_data":[]}],"lice_class_id":4,"tag_id":1363,"level":"level3","live_class_practice_id":null,"message":"Quiz started successfully"})
        console.log('JSON DATA',data1.question_data[0].question_text);
        //setData(data1.question_data[0].question_text)
        setIsAvailable(true);
        console.log(data);
        console.log(isAvailable);
    },[])

    // const [focusedElementIdForMathQuill, setFocusedElementIdForMathQuill] = useState(-1);

   
  return (
  // <ownMathquillInputContext.Provider value={{ focusedElementIdForMathQuill, setFocusedElementIdForMathQuill }}>
  <View>
     {/* <Text>
        {focusedElementIdForMathQuill}
     </Text> */}
    {
        isAvailable ==  true && data != undefined?  <OptionMultiplePicturesQuestions data={data}/> :<></>
    }
   
  </View>
  // </ownMathquillInputContext.Provider>
  );
};

export default MathZoneQuizTesting;