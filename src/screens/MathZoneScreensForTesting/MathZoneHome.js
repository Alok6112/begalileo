import React, {Component, useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {useSelector, useDispatch} from 'react-redux';
import {COLOR, CommonStyles} from '../../config/styles';
import CustomGradientButton from '../../components/CustomGradientButton';
import {BorderedTextInput, CustomBorderedTextInput} from '../../components';
import {normalize} from 'react-native-elements';
import {isValidEmail} from '../../components/helpers';
import {getMathZoneQuizzes} from '../../actions/dashboard';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {BASE_URL} from '../../config/configs';
import axios from 'axios';
import {Pressable} from 'react-native';
import * as Constants from '../../components/helpers/Constants';
import {BackHandler} from 'react-native';
import {getParamNavigationV5} from '../../components/helpers/navigationV5Data';

const MathZoneHomeTesting = props => {
  const dispatch = useDispatch();
  const mathQuizResponse = useSelector(
    state => state.dashboard.math_student_quiz_response,
  );
  useEffect(() => {
    const student_id = getParamNavigationV5(props, 'student_id', '');
    dispatch(getMathZoneQuizzes(student_id));
  }, []);

  useEffect(() => {}, [mathQuizResponse]);

  const exitApp = () => {
    console.log('Pressed here');
    props.navigation.goBack();
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      exitApp,
    );
    // cleanup
    return () => backHandler.removeEventListener('hardwareBackPress', exitApp);
  }, []);

  const onPressTagItem = tagItem => {
    const student_id = getParamNavigationV5(props, 'student_id', '');
    props.navigation.navigate(Constants.MATH_ZONE_QUIZ_SCREEN_TESTING, {
      student_id: student_id,
      tag_id: tagItem.tag_id,
      tag_name: tagItem.tag_name,
    });
  };

  const renderSubConceptItem = subConceptData => (
    <View style={styles.item}>
      <Text style={[CommonStyles.text_14_bold, {color: COLOR.BLUE_LINk}]}>
        {subConceptData.item.sub_concept_name}
      </Text>
      <View style={{marginTop: 5}}>
        {subConceptData.item.tags.map(tagData => {
          return (
            <View
              style={{
                flexDirection: 'row',
                margin: 15,
                justifyContent: 'space-between',
              }}>
              <Text
                style={[
                  CommonStyles.text_12__semi_bold,
                  {color: COLOR.TEXT_COLOR_BLUE, flex: 1, flexWrap: 'wrap'},
                ]}>
                {tagData.tag_name}
              </Text>
              <Pressable
                style={{
                  backgroundColor: COLOR.WHITE,
                  borderRadius: 20,
                  height: 30,
                  paddingHorizontal: 10,
                }}
                onPress={() => onPressTagItem(tagData)}>
                <Text
                  style={[
                    CommonStyles.text_12__semi_bold,
                    {color: COLOR.TEXT_COLOR_BLUE, textAlign: 'center'},
                  ]}>
                  Practice
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>
    </View>
  );

  return (
    <View style={{backgroundColor: COLOR.WHITE}}>
      {mathQuizResponse && mathQuizResponse.status && (
        <View>
          <FlatList
            data={mathQuizResponse.sub_concepts}
            renderItem={renderSubConceptItem}
            keyExtractor={item => item.sub_concept_id}
          />
          {/* {
                        renderSubConcepts(mathQuizResponse.sub_concepts)
                    } */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: COLOR.PIE_CHART_BLUE,
    borderRadius: 20,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default MathZoneHomeTesting;
