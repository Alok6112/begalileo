import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {COLOR} from '../config/styles';
import {CommonStyles} from '../config/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGrad: {
    height: 50,
    width: 200,
    borderRadius: 10,
    position: 'absolute',
    bottom: 5,
  },
  buttonParent: {
    height: 50,
    width: 200,
    borderRadius: 10,
    backgroundColor: '#024e51',
  },
});

function Custom3dButton() {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => console.log('btn pressed')}>
        <View style={styles.buttonParent}>
          <Text
            style={[
              CommonStyles.text_12_bold,
              {color: COLOR.WHITE, textAlignVertical: 'center'},
            ]}>
            START
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Custom3dButton;
