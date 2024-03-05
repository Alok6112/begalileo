import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import MathView, { MathText } from 'react-native-math-view';

const QuestionPartBuilder = ({data}) =>{

  const [questionNameContent , setQuestionNameContent ] = useState([])
  
  function segregateString(inputString) {
    inputString = inputString.replaceAll('<br/>','\n')
    inputString = inputString.replaceAll('<br>','\n')
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
  function testHtmlContent(ele){
   return /<\/?[a-z][\s\S]*>/i.test(ele)
  }

  function findTheIndexesOfContinousImgs (output){

    let newArr = [],imgArr=[]

    console.log("Before",output);
    for(let i=0;i<output.length;i++){
        if(testHtmlContent(output[i]) &&  output[i].includes("<img")){
            imgArr.push(output[i])

        }else{
            if(imgArr.length != 0){
                newArr.push(imgArr)
                imgArr=[]
            }
                
            if(testHtmlContent(output[i]) && output[i].includes("mq-selectable") ){
                
                newArr.push(output[i])
                newArr.push(output[i+1])
                newArr.push(output[i+2])
                i+=2;

            }else if( testHtmlContent(output[i]) && !output[i].includes("mq-selectable")){
                   
                newArr.push(output[i+1])
                i+=2;
            }else{
                newArr.push(output[i])
            }
               
            
            
            
        }
    }

    console.log("After",newArr);
   return newArr

  }

  useEffect(()=>{
    let output = segregateString(data)

    output = output.filter((e)=> e=="" ? 0 : 1 )
    output = findTheIndexesOfContinousImgs(output)
    setQuestionNameContent([...output])
  },[])



  return   <View>
  {
      questionNameContent.map((item,i)=>{
         
          if(testHtmlContent(item) && !item.includes("mq-selectable")){
              if(typeof item != "string"){
              return <View style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>   
               {  item?.map((ele,i)=>{
                      let arr = ele.match(`src\s*=\s*"(.+?)"`)
                      return<View style={{width:150,height:150}}>
                      <Image
                        source={{ uri: arr[1]}}
                        style={{
                          height: "100%",
                          width: "100%",
                        }}
                      />
                    </View>
                  })
              }
              </View>
              }
          }
          if(questionNameContent[i+1]?.includes("mq-selectable")){
              console.log("Heyyyy",questionNameContent[i+2].substring(1, questionNameContent[i+2].length-1) );
                  let latex = questionNameContent[i+2].substring(1, questionNameContent[i+2].length-1);
                  return <View> 
                  <Text style={{fontSize:20}}>{item} 
                  {<MathView
                  config={{inline:false,ex: 10, em: 10 }}
                  style={{color:"black"}}
                  math={`${latex}`}
                  /> } {questionNameContent[i+4]?.trim("")} </Text>
                  </View>
          }
          else{
              if( questionNameContent[i]?.includes("mq-selectable") || questionNameContent[i-1]?.includes("mq-selectable") || questionNameContent[i-2]?.includes("mq-selectable") || questionNameContent[i-3]?.includes("mq-selectable")){
                  return
              }
              if(item.trim("") != ""){
                  return <View>
                      <Text style={{fontSize:20}}>{item.trim("")}</Text>
                  </View>
              }
          }
      })
  }
</View>
}

export default QuestionPartBuilder;