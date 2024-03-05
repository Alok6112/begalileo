import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Keyboard, Image } from 'react-native';
import { Portal } from 'react-native-paper';

const lessThan = '<'
const greaterThan ='>'
const NumericKeyboard = ({setInputValue,dismissKeyboard}) => {
  
  const handlePress = (value) => {
    setInputValue(value)
  };

  const handleDelete = () => {
    setInputValue("del")
  };


  return (
    // <Portal>
    // <View  style={{  position:"absolute",width:"100%",bottom:0,backgroundColor:"yellow",zIndex:9999999}}>
      <View style={{padding:10,backgroundColor:"#cfd2d5",height:150}}>
       
        <View style={[styles.row,{height:"45%"}]}>

            <TouchableOpacity style={styles.square} onPress={() => handlePress('1')}>
            <Text style={styles.bold}>1</Text>
            </TouchableOpacity>

            <TouchableOpacity  style={styles.square} onPress={() => handlePress('2')}>
            <Text style={styles.bold}>2</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.square} onPress={() => handlePress('3')}>
            <Text style={styles.bold}>3</Text>
            </TouchableOpacity>
        
            <TouchableOpacity style={styles.square} onPress={() => handlePress('4')}>
            <Text style={styles.bold}>4</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.square} onPress={() => handlePress('5')}>
            <Text style={styles.bold}>5</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.square} onPress={() => handlePress('6')}>
            <Text style={styles.bold}>6</Text>
            </TouchableOpacity>
        
            <TouchableOpacity style={styles.square} onPress={() => handlePress('7')}>
            <Text style={styles.bold}>7</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.square} onPress={() => handlePress('8')}>
            <Text style={styles.bold}>8</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.square} onPress={() => handlePress('9')}>
            <Text style={styles.bold}>9</Text>
            </TouchableOpacity>

            <TouchableOpacity  style={[styles.square,{backgroundColor:"#abb3bb"}]} onPress={handleDelete}>
            {/* <Text>Delete</Text> */}
            <Image source={require("./../Asserts/backspace_ios.jpeg")}
                    style={{
                        height:"65%",
                        width:"100%",
                        resizeMode:"contain",
                        aspectRatio:1
                    }}
            />
            </TouchableOpacity>

        </View>

        <View style={[styles.row,{height:"45%"}]}>

            <TouchableOpacity style={styles.square} onPress={() => handlePress('0')}>
            <Text style={styles.bold}>0</Text>
            </TouchableOpacity>
           
            <TouchableOpacity style={styles.square} onPress={() => handlePress('-')}>
            <Text style={styles.bold}>-</Text>
            </TouchableOpacity>

            <TouchableOpacity  style={styles.square} onPress={() => handlePress('.')}>
            <Text style={styles.bold}>.</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.square} onPress={() => handlePress('<')}>
            <Text style={styles.bold}>{lessThan}</Text>
            </TouchableOpacity>

            <TouchableOpacity  style={styles.square} onPress={() => handlePress('>')}>
            <Text style={styles.bold}>{greaterThan}</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={[styles.square,{width:"35%"}]} onPress={()=>handlePress(' ')}>
            <Text style={styles.bold}>space</Text>
            </TouchableOpacity>


            <TouchableOpacity style={[styles.square,{backgroundColor:"#087dfd",width:"14%"}]} onPress={()=>handlePress('clr')}>
            <Text style={[styles.bold,{color:"white"}]}>Clear</Text>
            </TouchableOpacity>

            <TouchableOpacity  style={[styles.square,{backgroundColor:"#abb3bb"}]} onPress={()=>{dismissKeyboard()}}>
            <Image source={require("./../Asserts/keyboardhide.png")}
                style={{
                    height:"100%",
                    width:"80%",
                    resizeMode:"cover",
                    aspectRatio:1
                }}
            />
            </TouchableOpacity>
        </View>
        
      </View>
      
    // </View>
    // </Portal>
  );
};

const styles = {
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // justifyContent: 'space-evenly',
    marginBottom: 5,
    alignItems:'center'
  },
  square:{
    // borderWidth:1,
    // padding:8,
    borderRadius:5,
    backgroundColor:"#fcfcfc",
    height:"90%",
    width:"7%",
    alignItems:'center',
    justifyContent:"center"
  },
  bold:{
    fontWeight: "bold"
  }

};

export default NumericKeyboard;