import React, {Component} from 'react';
import {useState, useEffect} from 'react';

import {DataTable} from 'react-native-paper';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {connect} from 'react-redux';
import {IC_BUY_NOW, IC_ADD_TO_CART} from '../../assets/images';
import * as Constants from '../../components/helpers/Constants';
import CustomGradientButtonIcon from '../../components/CustomGradientButtonIcon';
import {COLOR, CommonStyles} from '../../config/styles';
import {CustomBackButton} from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import {normalize, Card} from 'react-native-elements';
import SubscriptionTabs from '../../components/subscription_tab';
import {SCREEN_WIDTH} from '../../config/configs';

import {getStudentActivityLogs, getEmotionData} from '../../actions/dashboard';
import {
  IC_STARS_EARN,
  IC_BADGES_EARNED_1,
  CARD_BTN_ARROW,
} from '../../assets/images';

import {happy_star_emotion} from '../../assets/lottieAssets';
import LottieView from 'lottie-react-native';
import {getParamNavigationV5} from '../../components/helpers/navigationV5Data';

const RenewSubscriptionChildPreview = props => {
  const [mDuration, setmDuration] = useState(null);

  const emotionsArr =
    props.emotionDataResponse?.emotions &&
    props.emotionDataResponse?.emotions.length > 0
      ? props.emotionDataResponse?.emotions[
          props.emotionDataResponse?.emotions.length - 1
        ]
      : {};

  useEffect(() => {
    let dur = getParamNavigationV5(props, 'duration', null);
    setmDuration(dur);

    try {
      if (props.currentSelectedKid.student_id != '') {
        props.getStudentActivityLogs(props?.currentSelectedKid?.student_id);
        props.getEmotionData(props?.currentSelectedKid?.student_id);
      }
    } catch (error) {
      console.log('error', error);
    }

    console.log(
      'stundentActivityLogResponse',
      props?.stundentActivityLogResponse,
    );

    // this.props.getEmotionData(this.props.currentSelectedKid.student_id)
  }, []);

  const onPressBack = () => {
    const {goBack} = props.navigation;
    console.log('Go Back From Renew');
    goBack();
  };

  onClickRenewSubscription = mDuration => {
    console.log('mduration', mDuration);
    props.navigation.navigate(Constants.RenewSubscription, {
      duration: mDuration,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'space-between',
          backgroundColor: COLOR.WHITE,
          marginStart: 10,
          marginEnd: 10,
        }}>
        <View style={{marginTop: normalize(10)}}>
          <CustomBackButton onPress={onPressBack} />
        </View>
        <View style={styles.performanceCard}>
          <Text
            style={[
              CommonStyles.text_18_bold,
              {
                textAlign: 'center',
                marginTop: 10,
                marginBottom: normalize(20),
                marginStart: normalize(16),
                marginTop: normalize(16),
              },
            ]}>
            Child performance record data
          </Text>

          <View
            style={[CommonStyles.boxShadow, styles.singleCard, {height: 120}]}>
            <View style={styles.singleCardInnerStyle}>
              <Text
                style={[CommonStyles.text_16_semi_bold, {textAlign: 'center'}]}>
                Midas Test
              </Text>
              {props.stundentActivityLogResponse?.midas_data &&
              props.stundentActivityLogResponse?.midas_data.length !== 0 ? (
                <View style={{marginTop: 15}}>
                  <Text
                    style={[
                      CommonStyles.text_14_Regular,
                      {justifyContent: 'center', textAlign: 'center'},
                    ]}>
                    {props.stundentActivityLogResponse?.midas_data[0]?.correct}{' '}
                    Of {props.stundentActivityLogResponse?.midas_data[0]?.total}
                  </Text>
                </View>
              ) : (
                <View style={{marginTop: 15}}>
                  <Text
                    style={[
                      CommonStyles.text_11_Regular,
                      {textAlign: 'center'},
                    ]}>
                    No Available Data
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View
            style={[
              CommonStyles.boxShadow,
              styles.singleCard,
              {height: 'auto'},
            ]}>
            <View style={[styles.singleCardInnerStyleOther, {height: 'auto'}]}>
              {props?.stundentActivityLogResponse &&
              props.stundentActivityLogResponse?.pre_post_test_data ? (
                <>
                  <DataTable>
                    <View
                      style={{
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                      }}>
                      <DataTable.Header>
                        <DataTable.Title>
                          <Text style={[CommonStyles.text_14_semi_bold]}>
                            Concepts
                          </Text>
                        </DataTable.Title>
                        <DataTable.Title style={{justifyContent: 'center'}}>
                          <Text style={[CommonStyles.text_14_semi_bold]}>
                            Pre-Test
                          </Text>
                        </DataTable.Title>
                        <DataTable.Title style={{justifyContent: 'center'}}>
                          <Text style={[CommonStyles.text_14_semi_bold]}>
                            Post-Test
                          </Text>
                        </DataTable.Title>
                      </DataTable.Header>
                    </View>
                    {props.stundentActivityLogResponse &&
                      props.stundentActivityLogResponse?.pre_post_test_data.map(
                        (e, item) => {
                          return (
                            <View key={item}>
                              <DataTable.Row>
                                <DataTable.Cell>
                                  {e.sub_concept_name}
                                </DataTable.Cell>
                                <DataTable.Cell
                                  numeric
                                  style={{
                                    justifyContent: 'center',
                                  }}>
                                  <Text>{e.pre_test_score + '%'}</Text>
                                </DataTable.Cell>
                                <DataTable.Cell
                                  numeric
                                  style={{
                                    justifyContent: 'center',
                                  }}>
                                  {e.post_test_score !== 'NA' ? (
                                    <Text>{e.post_test_score + '%'}</Text>
                                  ) : (
                                    <Text>{e.post_test_score}</Text>
                                  )}
                                </DataTable.Cell>
                              </DataTable.Row>
                            </View>
                          );
                        },
                      )}
                  </DataTable>
                </>
              ) : (
                <View>
                  <Text
                    style={[
                      CommonStyles.text_11_Regular,
                      {textAlign: 'center'},
                    ]}>
                    No data Available
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={[CommonStyles.boxShadow, styles.singleCard]}>
            <View style={styles.singleCardInnerStyleOther}>
              <View
                style={{
                  flex: 2,
                }}>
                <Image
                  style={{
                    height: normalize(70),
                    width: normalize(70),
                    alignSelf: 'center',
                    resizeMode: 'contain',
                    marginStart: normalize(8),
                    marginTop: normalize(8),
                  }}
                  source={IC_STARS_EARN}
                />
                {props?.stundentActivityLogResponse &&
                props.stundentActivityLogResponse?.stars !== undefined ? (
                  <View>
                    <Text
                      style={[
                        CommonStyles.text_14_semi_bold,
                        {textAlign: 'center', marginTop: 25},
                      ]}>
                      {props.stundentActivityLogResponse?.stars}
                    </Text>
                  </View>
                ) : (
                  <View style={{marginTop: 30}}>
                    <Text
                      style={[
                        CommonStyles.text_12_bold,
                        {textAlign: 'center'},
                      ]}>
                      NA
                    </Text>
                  </View>
                )}
              </View>
              <View
                style={{
                  flex: 2,
                }}>
                <Image
                  style={{
                    height: normalize(70),
                    width: normalize(70),
                    alignSelf: 'center',
                    resizeMode: 'contain',
                    marginStart: normalize(8),
                    marginTop: normalize(8),
                  }}
                  source={IC_BADGES_EARNED_1}
                />
                {console.log(
                  props.stundentActivityLogResponse?.badges,
                  'check',
                )}
                {props?.stundentActivityLogResponse &&
                props.stundentActivityLogResponse?.badges !== undefined ? (
                  <View>
                    <Text
                      style={[
                        CommonStyles.text_14_semi_bold,
                        {textAlign: 'center', marginTop: 25},
                      ]}>
                      {props.stundentActivityLogResponse?.badges}
                    </Text>
                  </View>
                ) : (
                  <View style={{marginTop: 30}}>
                    <Text
                      style={[
                        CommonStyles.text_12_bold,
                        {textAlign: 'center'},
                      ]}>
                      NA
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          <View
            style={[CommonStyles.boxShadow, styles.singleCard, {height: 260}]}>
            <View
              style={[
                styles.singleCardInnerStyleOther,
                {flexDirection: 'column', height: 240},
              ]}>
              <View
                style={{
                  flex: 2,
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    flex: 2.5,

                    flexDirection: 'column',

                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}>
                  <Text style={[CommonStyles.text_14_bold]}>
                    Happy Moments Captured
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1.5,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}>
                  <LottieView source={happy_star_emotion} autoPlay loop />
                </View>
              </View>
              {Object.keys(emotionsArr).length === 0 ? (
                <View>
                  <Text
                    style={[
                      CommonStyles.text_11_Regular,
                      {textAlign: 'center'},
                    ]}>
                    No Available Data
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                  }}>
                  {emotionsArr?.emotions?.map((e, i) => {
                    let imagedata = e;

                    return (
                      <View
                        style={{
                          flex: 3,
                          padding: 10,
                        }}>
                        <Image
                          source={{
                            uri: imagedata,
                          }}
                          style={styles.imageGridStyle}
                        />
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          </View>
          <TouchableOpacity
            onPress={() => onClickRenewSubscription(mDuration)}
            style={{
              flexDirection: 'row',
              marginStart: normalize(20),
              marginEnd: normalize(20),
              marginBottom: normalize(20),
              justifyContent: 'space-between',
            }}>
            <Text
              style={[
                CommonStyles.text_12_bold,
                {color: COLOR.TEXT_COLOR_BLUE, alignSelf: 'center'},
              ]}>
              Renew
            </Text>
            <Image
              style={{
                height: normalize(28),
                alignSelf: 'center',
                width: normalize(28),
                resizeMode: 'stretch',
              }}
              source={CARD_BTN_ARROW}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },

  performanceCard: {
    flex: 1,
    marginStart: 10,
    marginEnd: 10,
  },
  singleCard: {
    display: 'flex',
    backgroundColor: COLOR.WHITE,
    flexDirection: 'column',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
    height: 200,
  },

  singleCardInnerStyle: {
    display: 'flex',
    height: 160,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    marginTop: 10,
    textAlign: 'center',
  },

  singleCardInnerStyleOther: {
    display: 'flex',
    flexDirection: 'row',
    height: 160,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    marginTop: 10,
    textAlign: 'center',
  },

  HeadStyle: {
    height: 50,
    alignContent: 'center',
    backgroundColor: '#ffe0f0',
  },

  imageGridStyle: {
    width: 110,
    height: 110,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 2,
    borderRadius: 10,
  },
});

const mapStateToProps = state => {
  return {
    currentSelectedKid: state.dashboard.current_selected_kid,
    studentActivityLogStatus: state.dashboard.student_activity_logs_status,
    stundentActivityLogResponse: state.dashboard.student_activity_logs_response,

    emotionDataStatus: state.dashboard.emotion_data_status,
    emotionDataResponse: state.dashboard.emotion_data_response,
  };
};

const mapDispatchToProps = {
  getStudentActivityLogs,
  getEmotionData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RenewSubscriptionChildPreview);
