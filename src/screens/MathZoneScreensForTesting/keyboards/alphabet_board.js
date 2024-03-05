import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MathView, { MathText } from 'react-native-math-view';
import { Portal } from 'react-native-paper';

const AlphabetKeyboard = ({setInputValue,dismissKeyboard}) => {

  const handlePress = (value) => {
    setInputValue(value)
  };

  const handleDelete = () => {
    setInputValue("del")
  };

  const handleClear = () => {
   console.log("to clear the test");
  };


  return (
    // <Portal>
    // <View  style={{  position:"absolute",width:"100%",bottom:0,backgroundColor:"yellow",zIndex:9999999}}>

      <View style={{padding:10,backgroundColor:"#cfd2d5",height:150,minWidth:"100%"}}>

        <View style={[styles.row,{height:"30%"}]}>

            <TouchableOpacity style={styles.square} onPress={() => handlePress('q')}>
            <Text style={styles.bold}>q</Text>
            </TouchableOpacity>

            <TouchableOpacity  style={styles.square} onPress={() => handlePress('w')}>
            <Text style={styles.bold}>w</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.square} onPress={() => handlePress('e')}>
            <Text style={styles.bold}>e</Text>
            </TouchableOpacity>
        
            <TouchableOpacity style={styles.square} onPress={() => handlePress('r')}>
            <Text style={styles.bold}>r</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.square} onPress={() => handlePress('t')}>
            <Text style={styles.bold}>t</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.square} onPress={() => handlePress('y')}>
            <Text style={styles.bold}>y</Text>
            </TouchableOpacity>
        
            <TouchableOpacity style={styles.square} onPress={() => handlePress('u')}>
            <Text style={styles.bold}>u</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.square} onPress={() => handlePress('i')}>
            <Text style={styles.bold}>i</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.square} onPress={() => handlePress('o')}>
            <Text style={styles.bold}>o</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.square} onPress={() => handlePress('p')}>
            <Text style={styles.bold}>p</Text>
            </TouchableOpacity>

            <TouchableOpacity  style={[styles.square,{backgroundColor:"#abb3bb"}]} onPress={handleDelete}>
            {/* <Text>Delete</Text> */}
            <Image source={require("./../Asserts/backspace_ios.jpeg")}
                    style={{
                        height:"60%",
                        width:"100%",
                        resizeMode:"contain",
                        aspectRatio:1
                    }}
            />
            </TouchableOpacity>

        </View>
      
        <View style={[styles.row,{height:"30%"}]}>

            <TouchableOpacity  style={styles.square} onPress={() => handlePress('a')}>
            <Text style={styles.bold}>a</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.square} onPress={() => handlePress('s')}>
            <Text style={styles.bold}>s</Text>
            </TouchableOpacity>
        
            <TouchableOpacity style={styles.square} onPress={() => handlePress('d')}>
            <Text style={styles.bold}>d</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.square} onPress={() => handlePress('f')}>
            <Text style={styles.bold}>f</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.square} onPress={() => handlePress('g')}>
            <Text style={styles.bold}>g</Text>
            </TouchableOpacity>
        
            <TouchableOpacity style={styles.square} onPress={() => handlePress('h')}>
            <Text style={styles.bold}>h</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.square} onPress={() => handlePress('j')}>
            <Text style={styles.bold}>j</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.square} onPress={() => handlePress('k')}>
            <Text style={styles.bold}>k</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.square} onPress={() => handlePress('l')}>
            <Text style={styles.bold}>l</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.square,{backgroundColor:"#087dfd",width:"14%"}]} onPress={()=>handlePress('clr')}>
            <Text style={[styles.bold,{color:"white"}]}>Clear</Text>
            </TouchableOpacity>

        </View>

        <View style={[styles.row,{height:"30%"}]}>

            <TouchableOpacity style={styles.square} onPress={() => handlePress('z')}>
            <Text style={styles.bold}>z</Text>
            </TouchableOpacity>
           
            <TouchableOpacity style={styles.square} onPress={() => handlePress('x')}>
            <Text style={styles.bold}>x</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.square} onPress={() => handlePress('c')}>
            <Text style={styles.bold}>c</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.square} onPress={() => handlePress('v')}>
            <Text style={styles.bold}>v</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.square,{width:"28%"}]} onPress={()=>handlePress('')}>
            <Text style={styles.bold}>space</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.square} onPress={() => handlePress('b')}>
            <Text style={styles.bold}>b</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.square} onPress={() => handlePress('n')}>
            <Text style={styles.bold}>n</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.square} onPress={() => handlePress('m')}>
            <Text style={styles.bold}>m</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.square} onPress={() => handlePress('<')}>
            <Text style={styles.bold}>{lessThan}</Text>
            </TouchableOpacity>

            <TouchableOpacity  style={styles.square} onPress={() => handlePress('>')}>
            <Text style={styles.bold}>{greaterThan}</Text>
            </TouchableOpacity> */}

            <TouchableOpacity  style={[styles.square,{backgroundColor:"#abb3bb"}]} onPress={()=>{dismissKeyboard()}}>
            <Image source={require("./../Asserts/keyboardhide.png")}
                style={{
                    height:"100%",
                    width:"80%",
                    resizeMode:"contain",
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
    // fontWeight: "bold",
    fontSize:20
  }

};

export default AlphabetKeyboard;