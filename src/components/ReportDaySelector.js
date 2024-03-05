import React, {Component, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import * as Constants from './helpers/Constants';
import {COLOR, CommonStyles} from '../config/styles';
import {IC_DOWN_ENTER, IC_CLOSE_BLUE} from '../assets/images';
import * as Config from '../config/configs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {normalize, Card} from 'react-native-elements';
import {getLocalData} from '../components/helpers/AsyncMethods';
import CustomGradientButton from './CustomGradientButton';
import moment from 'moment';

const ReportDaySelector = ({onPressFilterDays}) => {
  useEffect(() => {}, []);

  return (
    <View>
      <View style={{justifyContent: 'space-evenly'}}>
        <Text style={[CommonStyles.text_11_semi_bold, {alignSelf: 'center'}]}>
          Show last
        </Text>
        <TouchableOpacity
          onPress={() => onPressFilterDays(7)}
          style={styles.dayButton}>
          <Text
            style={[CommonStyles.text_12__semi_bold, {color: COLOR.BLUE_LINk}]}>
            7 Days
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPressFilterDays(30)}
          style={styles.dayButton}>
          <Text
            style={[CommonStyles.text_12__semi_bold, {color: COLOR.BLUE_LINk}]}>
            30 Days
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPressFilterDays(60)}
          style={styles.dayButton}>
          <Text
            style={[CommonStyles.text_12__semi_bold, {color: COLOR.BLUE_LINk}]}>
            60 Days
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dayButton: {
    width: 200,
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: COLOR.LIGHT_BLUE,
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(12),
    borderRadius: normalize(24),
    textAlign: 'center',
  },
});

export default ReportDaySelector;
