import React, {useEffect, useState, useRef} from 'react';
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
  TouchableWithoutFeedback,
  Linking,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import {showMessage} from 'react-native-flash-message';
import {VIDEO_ICON, VIDEO_PLAY_ICON} from '../../assets/images';
import * as Constants from '../../components/helpers/Constants';

import axios from 'axios';

import {BASE_URL} from '../../config/configs';
import {launchImageLibrary} from 'react-native-image-picker';

import {COLOR, CommonStyles, cardBoxShadowStyle} from '../../config/styles';
import {
  LIVE_CLASS_CARD_THUMB,
  CARD_BTN_ARROW,
  TRAINING_WEEK_1,
  TRAINING_WEEK_2,
  TRAINING_WEEK_3,
  TRAINING_WEEK_4,
  ASKQUERY,
} from '../../assets/images';

import {formatDateInString} from '../../UTILS/CommonUtils';

import {normalize, Card} from 'react-native-elements';
import {SCREEN_WIDTH} from '../../config/configs';
import {SCREEN_HEIGHT} from '../../config/configs';

import TrainingProgramVideoUploadChat from './TrainingProgramVideoUploadChat';
import {getParamNavigationV5} from '../../components/helpers/navigationV5Data';

function TrainingProgramHomeScreen(props) {
  const [activityData, setActivityData] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [queryText, setQueryText] = useState('');
  const [openTextBox, setOpenTextBox] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [refreshForUploadRedirect, setRefreshForUploadRedirect] =
    useState(false);
  const [showRecordModal, setShowRecordModal] = useState(false);

  const [fileResponseVideo, setFileResponseVideo] = useState([]);
  const [videoLoadingLoader, setVideoLoadingLoader] = useState(false);
  const [uploadButtonsDisable, setUploadButtonsDisable] = useState(false);

  const [showVideoRecordPreview, setVideoRecordPreview] = useState(false);

  const scrollViewRef = useRef();

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 170 : 100;
  useEffect(() => {
    let data = getParamNavigationV5(props, 'skillData', null);
    let student_id = getParamNavigationV5(props, 'student_id', null);
    let chatCondition = getParamNavigationV5(props, 'openChat', null);
    let shareLifeSkills = getParamNavigationV5(props, 'shareLifeSkills', null);

    console.log('chatCondition', chatCondition);
    console.log('shareLifeSkills', shareLifeSkills);

    if (chatCondition) {
      setOpenTextBox(!openTextBox);
    }

    if (shareLifeSkills) {
      setRefreshForUploadRedirect(!refreshForUploadRedirect);
    }

    // console.log("data training program skills", data);
    const [_, ...second] = [...data];
    setActivityData(second);
    setStudentId(student_id);
  }, []);

  const goToTraingDetailsWeekWise = item => {
    console.log('activity_id', item.activity_id);
    props.navigation.navigate(Constants.TRAINING_PROGRAM_SCREEN_WEEK, {
      allData: item,
      student_id: studentId,
      activity_id: item?.activity_id,
    });
  };

  useEffect(() => {
    if (allMessages.length == 0) {
      getSkillChatsConversation(studentId);
    }
  }, [openTextBox]);

  useEffect(() => {
    if (activityData) {
      filterInProgressSkills(activityData);
    }
  }, [refreshForUploadRedirect]);

  const openQueryTextInput = () => {
    setOpenTextBox(!openTextBox);
    setIsFocused(false);
  };

  const filterInProgressSkills = activityData => {
    let filteredData = activityData?.filter(item => {
      if (item.status == 'active' || item.status == 'completed') {
        return true;
      } else {
        return false;
      }
    });

    if (filteredData.length > 0) {
      goToTraingDetailsWeekWise(filteredData[0]);
    }

    // console.log("filteredData", filteredData);
  };

  const getSkillChatsConversation = studentId => {
    axios
      .get(`${BASE_URL}core_skills/view_chats2`, {
        params: {
          student_id: studentId,
        },
      })
      .then(res => {
        if (res.data.status) {
          setAllMessages(res.data.data);
          setRefresh(!refresh);
          // setOpenTextBox(true);
          setQueryText('');
        }
      })
      .catch(error => {
        console.log(error.message, 'error');
      });
  };

  const setSkillQuestionsQuery = async (core_skill_id, student_id, message) => {
    axios
      .get(`${BASE_URL}core_skills/store_core_skill_chat`, {
        params: {
          student_id: student_id,
          core_skill_id: core_skill_id,
          question: message,
        },
      })
      .then(res => {
        if (res.data.status) {
          getSkillChatsConversation(studentId);
          showMessage({
            message: 'Your Question is submitted',
            type: 'success',
          });
        }
        console.log('checking query message send or not', res.data);
      })
      .catch(error => {
        console.log(error.message, 'error');
      });
  };

  const sendQueryBtn = () => {
    let core_skill_id = activityData[0].skill_id;
    let student_id = studentId;
    let message = queryText;
    setSkillQuestionsQuery(core_skill_id, student_id, message);
    // setOpenTextBox(false);
  };

  const handleFocus = () => {
    console.log('hello');
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const openVideoResponse = uri => {
    console.log('Uri', uri);

    props.navigation.navigate(Constants.TRAINING_PROGRAM_NOTIFICATION_VIDEO, {
      navigation: props.navigation,
      video_url: uri,
      fromScreen: 'ChatVideoReply',
    });
  };

  const showTrainingProgram = (item, index) => {
    return (
      <View style={{marginTop: normalize(10)}}>
        <View
          style={[
            item.status == 'active' ? CommonStyles.boxShadow : '',
            {
              backgroundColor:
                item.status == 'active'
                  ? '#f7bc36'
                  : 'completed'
                  ? ''
                  : COLOR.WHITE,
              margin: normalize(10),
              borderRadius: normalize(24),
            },
          ]}>
          <View style={{flexDirection: 'column'}}>
            <View
              style={{
                display: 'flex',
                width: '100%',
                height: 50,
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <View style={{marginLeft: normalize(20)}}>
                <Text
                  style={[
                    CommonStyles.text_12_bold,
                    {
                      flexShrink: 1,
                      color: COLOR.Blue,
                      marginTop: normalize(8),
                      padding: normalize(3),
                      textAlign: 'center',
                    },
                  ]}>
                  {formatDateInString(item.start_date)}
                </Text>
              </View>

              <View
                style={{
                  marginLeft: 'auto',
                  display: 'flex',
                  marginRight: normalize(20),
                }}>
                <Text
                  style={[
                    CommonStyles.text_12_bold,
                    {
                      flexShrink: 1,
                      color: COLOR.TEXT_COLOR_BLACK,
                      marginTop: normalize(8),
                      padding: normalize(3),
                      textAlign: 'center',
                    },
                  ]}>
                  {formatDateInString(item.end_date)}
                </Text>
              </View>
            </View>
            <Text
              style={[
                CommonStyles.text_16_bold,
                {
                  flexShrink: 1,
                  color: COLOR.TEXT_COLOR_BLACK,
                  marginTop: normalize(8),
                  padding: normalize(3),
                  textAlign: 'center',
                },
              ]}>
              {item.skill_name}
            </Text>
            <View
              style={{
                height: normalize(110),
                marginStart: normalize(5),
                marginTop: normalize(5),
              }}>
              <View
                style={{
                  height: normalize(102),
                  width: '100%',
                  borderRadius: 20,
                  // backgroundColor: COLOR.LOGIN_BANNER_BG,
                  overflow: 'hidden',
                  marginBottom: normalize(30),
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {index == 0 ? (
                  <Image
                    style={{
                      height: normalize(147),
                      width: normalize(210),
                      // resizeMode: "contain",
                      // position: "absolute",
                      bottom: 0,
                      right: 0,
                    }}
                    source={TRAINING_WEEK_1}
                  />
                ) : index == 1 ? (
                  <Image
                    style={{
                      height: normalize(147),
                      width: normalize(210),
                      // height: normalize(78),
                      // width: normalize(100),
                      // resizeMode: "contain",
                      // position: "absolute",
                      bottom: 0,
                      right: 0,
                    }}
                    source={TRAINING_WEEK_2}
                  />
                ) : index == 2 ? (
                  <Image
                    style={{
                      height: normalize(147),
                      width: normalize(210),
                      // height: normalize(78),
                      // width: normalize(100),
                      // resizeMode: "contain",
                      // position: "absolute",
                      bottom: 0,
                      right: 0,
                    }}
                    source={TRAINING_WEEK_3}
                  />
                ) : (
                  <Image
                    style={{
                      height: normalize(147),
                      width: normalize(210),
                      // height: normalize(78),
                      // width: normalize(100),
                      // resizeMode: "contain",
                      // position: "absolute",
                      bottom: 0,
                      right: 0,
                    }}
                    source={TRAINING_WEEK_4}
                  />
                )}
              </View>
            </View>
            <View style={{flex: 1, marginStart: normalize(16)}}>
              {/* <Text style={[CommonStyles.text_8_bold, { color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(16) }]}>Upcoming Trial Class</Text> */}
              <Text
                style={[
                  CommonStyles.text_18_bold,
                  {
                    flexShrink: 1,
                    color: COLOR.TEXT_COLOR_BLACK,
                    marginTop: normalize(8),
                    padding: normalize(3),
                    textAlign: 'center',
                  },
                ]}>
                Week - {item.week}
              </Text>

              <Text
                style={[
                  CommonStyles.text_12_bold,
                  {
                    flexShrink: 1,
                    color: COLOR.TEXT_COLOR_BLACK,
                    marginTop: normalize(8),
                    padding: normalize(3),
                    textAlign: 'center',
                  },
                ]}>
                Your mission for this week
              </Text>

              <Text
                style={[
                  CommonStyles.text_14_bold,
                  {
                    flexShrink: 1,
                    color: COLOR.TEXT_COLOR_BLACK,
                    marginTop: normalize(8),
                    padding: normalize(3),
                    textAlign: 'center',
                  },
                ]}>
                {item.activity_name}
              </Text>
              {item.status == 'active' ? (
                <Text
                  style={[
                    CommonStyles.text_14_bold,
                    {
                      flexShrink: 1,
                      color: COLOR.TEXT_COLOR_BLUE,
                      marginTop: normalize(8),
                      padding: normalize(3),
                      textAlign: 'center',
                    },
                  ]}>
                  In progress
                </Text>
              ) : item.status == 'completed' ? (
                <Text
                  style={[
                    CommonStyles.text_14_bold,
                    {
                      flexShrink: 1,
                      color: COLOR.TEXT_COLOR_GREEN,
                      marginTop: normalize(8),
                      padding: normalize(3),
                      textAlign: 'center',
                    },
                  ]}>
                  Completed
                </Text>
              ) : (
                <Text
                  style={[
                    CommonStyles.text_8_bold,
                    {
                      flexShrink: 1,
                      color: COLOR.TEXT_COLOR_BLACK,
                      marginTop: normalize(8),
                      padding: normalize(3),
                      textAlign: 'center',
                    },
                  ]}>
                  Yet to Start
                </Text>
              )}

              <TouchableOpacity
                disabled={
                  item.status == 'active' || item.status == 'completed'
                    ? false
                    : true
                }
                onPress={() => goToTraingDetailsWeekWise(item)}
                style={{
                  flexDirection: 'row',
                  marginTop: normalize(24),
                  marginEnd: normalize(10),
                  marginBottom: normalize(10),
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={[
                    CommonStyles.text_12_bold,
                    {
                      color: COLOR.TEXT_COLOR_BLUE,
                      marginStart: normalize(8),
                      alignSelf: 'center',
                    },
                  ]}>
                  View Details
                </Text>
                <Image
                  style={{
                    height: normalize(28),
                    width: normalize(28),
                    resizeMode: 'contain',
                  }}
                  source={CARD_BTN_ARROW}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  function renderAllMessages() {
    return allMessages?.map(item => {
      return (
        <>
          <View
            style={{
              width: '100%',
              minHeight: 50,
              height: 'auto',
              // borderColor: COLOR.BLUE_LINk,
              borderRadius: 10,
              padding: 5,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'white',
              marginTop: normalize(10),
              opacity: 0.9,
              backgroundColor: 'lightblue',
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                width: '100%',
              }}>
              <View style={{marginLeft: normalize(10)}}>
                <Text
                  style={[CommonStyles.text_14_bold, {alignSelf: 'center'}]}>
                  You
                </Text>
              </View>
              <View
                style={{
                  marginLeft: 'auto',
                  marginRight: normalize(10),
                }}>
                <Text
                  style={[CommonStyles.text_12_bold, {alignSelf: 'center'}]}>
                  {item.created_at}
                </Text>
              </View>
            </View>
            <View style={{marginLeft: normalize(10)}}>
              <Text style={[CommonStyles.text_12_bold]}>{item.question}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 5,
              }}>
              <View style={{marginLeft: normalize(10)}}>
                {item.video_question != '' && (
                  <View
                    style={{
                      marginLeft: normalize(10),
                      height: 30,
                      marginBottom: normalize(10),
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => openVideoResponse(item.video_question)}>
                      <Image
                        style={{maxWidth: 35, maxHeight: 35}}
                        source={VIDEO_PLAY_ICON}></Image>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
          {item.response || item.video_response != '' ? (
            <View
              style={{
                width: '100%',
                minHeight: 60,
                height: 'auto',

                // borderColor: COLOR.BLUE_LINk,
                borderRadius: 10,
                padding: 5,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                marginTop: normalize(10),
                opacity: 1,
                backgroundColor: 'lightblue',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  width: '100%',
                }}>
                <View
                  style={{
                    marginLeft: normalize(5),
                  }}>
                  <Text
                    style={[CommonStyles.text_12_bold, {alignSelf: 'center'}]}>
                    {'Sean Swarner' + ' & ' + 'Coaches'}
                  </Text>
                </View>
                <View
                  style={{
                    marginLeft: 'auto',
                    marginRight: normalize(10),
                  }}>
                  <Text
                    style={[CommonStyles.text_12_bold, {alignSelf: 'center'}]}>
                    {item.responded_at}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 2,
                }}>
                <View style={{marginLeft: normalize(10)}}>
                  <Text style={[CommonStyles.text_12_bold]}>
                    {item.response || ''}
                  </Text>
                </View>
                <View style={{marginLeft: normalize(10)}}>
                  {item.video_response != '' && (
                    <View
                      style={{
                        marginLeft: normalize(10),
                        height: 30,
                        marginBottom: normalize(10),
                      }}>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => openVideoResponse(item.video_response)}>
                        <Image
                          style={{maxWidth: 35, maxHeight: 35}}
                          source={VIDEO_PLAY_ICON}></Image>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            </View>
          ) : (
            <></>
          )}
        </>
      );
    });
  }

  const openRecordVideoCamera = () => {
    props.navigation.navigate(Constants.TRAINING_PROGRAM_VIDEO_UPLOAD_CHAT);
  };

  const handleDocumentSelectionVideos = async () => {
    setVideoLoadingLoader(true);
    try {
      const response = await launchImageLibrary({
        title: 'Video Picker',
        mediaType: 'video',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      });

      let finalData = response.assets[0];

      console.log('finalData', finalData);
      setVideoLoadingLoader(false);

      let updateData = [...fileResponseVideo, finalData];

      setFileResponseVideo([...updateData]);
      setShowRecordModal(false);
    } catch (err) {
      console.warn(err);
    }
  };

  const openRecordScreenModal = () => {
    setShowRecordModal(true);
  };

  const handleFileDelete = (index, type) => {
    if (type == 'video') {
      var x = [...fileResponseVideo];
      x.splice(index, 1);
      setFileResponseVideo([...x]);
    }
  };

  const uploadSelectedVideo = async () => {
    setUploadButtonsDisable(true);
    setVideoLoadingLoader(true);

    let core_skill_id = activityData[0].skill_id;
    let student_id = studentId;

    // console.log("core_skill_id", core_skill_id);

    var formadata = new FormData();
    formadata.append('core_skill_id', core_skill_id);
    formadata.append('student_id', student_id);

    console.log('FileResponse', fileResponseVideo);

    fileResponseVideo.forEach(file => {
      formadata.append('video_question', {
        uri: file.uri,
        type: `${file.type}`,
        name: `${file.fileName}`,
      });
    });

    console.log('Formdata', JSON.stringify(formadata));

    await UploadVideoToServer(formadata)
      .then(res => {
        console.log('Res', res);
        if (res.data.status) {
          showMessage({
            message: 'Files uploaded successfully',
            type: 'success',
          });
          // Alert.alert("Files uploaded successfully");
          setFileResponseVideo([]);
          getSkillChatsConversation(studentId);
          // setUpdateDataAgain(!updateDataAgain);
          setUploadButtonsDisable(false);
          setVideoLoadingLoader(false);
        } else {
          showMessage({
            message: res.data.message,
            type: 'danger',
          });

          // Alert.alert(res.data.message);
          setUploadButtonsDisable(false);
          setVideoLoadingLoader(false);
        }
        console.log('res', res.data);
      })
      .catch(err => {
        console.log('error', err.message);
        setUploadButtonsDisable(false);
        setVideoLoadingLoader(false);
      });
  };

  const UploadVideoToServer = async data => {
    let config = {
      method: 'post',
      url: `${BASE_URL}core_skills/store_core_skill_chat`,
      data: data,
      headers: {'Content-Type': 'multipart/form-data'},
    };
    return axios(config);
  };

  const openRecordVideoPreview = () => {
    setVideoRecordPreview(true);
  };

  const uploadedRecordedFile = file => {
    // console.log("File to upload parent component", file);
    let updateData = [...fileResponseVideo, file];
    setFileResponseVideo([...updateData]);
    setVideoRecordPreview(false);
    setOpenTextBox(true);
    setShowRecordModal(false);
  };

  const closeRecordModelFn = () => {
    setShowRecordModal(false);
    setVideoLoadingLoader(false);
  };

  return (
    <>
      {!showVideoRecordPreview ? (
        <>
          <TouchableWithoutFeedback onPress={() => setOpenTextBox(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>

          <ScrollView style={{flex: 1}}>
            <View style={{display: 'flex'}}>
              <View style={{flexBasis: '90%'}}>
                {activityData != '' ? (
                  activityData?.map((item, i) => {
                    return <View>{showTrainingProgram(item, i)}</View>;
                  })
                ) : (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 10,
                      // backgroundColor: COLOR.BG_FAQ_GRERY,
                    }}>
                    <Text>No Data Present</Text>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>

          <View>
            {openTextBox && (
              <KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset={keyboardVerticalOffset}>
                <View
                  style={{
                    width: SCREEN_WIDTH - 30,
                    height: 520,
                    marginHorizontal: 10,
                    marginVertical: 10,
                    // borderWidth: 1,
                    borderColor: 'grey',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 10,
                    backgroundColor: 'white',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: normalize(5),
                    }}>
                    <Text style={[CommonStyles.text_14_bold]}>
                      Your Conversations with the Coaches
                    </Text>
                  </View>
                  <View
                    style={{
                      width: SCREEN_WIDTH - 50,
                      height: 370,
                      marginHorizontal: 10,
                      marginVertical: 10,
                      // borderWidth: 1,
                      borderRadius: 10,
                      borderColor: 'grey',
                      marginRight: normalize(10),
                      padding: normalize(5),
                    }}>
                    <ScrollView
                      ref={scrollViewRef}
                      onContentSizeChange={() =>
                        scrollViewRef.current.scrollToEnd({animated: true})
                      }>
                      {renderAllMessages()}
                    </ScrollView>
                  </View>
                  <View
                    style={{
                      width: SCREEN_WIDTH - 50,
                      height: 100,
                      marginHorizontal: 10,
                      marginVertical: 10,
                      // borderWidth: 1,
                      borderColor: isFocused ? 'green' : 'grey',
                      borderRadius: 20,
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: 'white',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderWidth: 1,
                    }}>
                    <View>
                      <View
                        style={{
                          width: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '30%',
                          padding: 2,
                          marginLeft: normalize(10),
                        }}>
                        <Text>
                          You can send text message or video question here!
                        </Text>
                      </View>

                      <View style={{display: 'flex', flexDirection: 'row'}}>
                        {fileResponseVideo.length > 0 ? (
                          <View
                            style={{
                              width: '60%',
                              borderWidth: 1,
                              borderColor: 'lightgrey',
                              height: '60%',
                              borderRadius: 10,
                              marginLeft: normalize(5),
                              marginTop: normalize(10),
                            }}>
                            {fileResponseVideo.map((file, index) => (
                              <View style={styles.fileSelectedName}>
                                {/* {console.log("file", file)} */}
                                <Text
                                  key={index.toString()}
                                  numberOfLines={1}
                                  ellipsizeMode={'middle'}>
                                  {file.fileName || ''}
                                </Text>

                                <Pressable
                                  style={{marginLeft: normalize(10)}}
                                  onPress={() =>
                                    handleFileDelete(index, 'video')
                                  }>
                                  <AnimatedLottieView
                                    style={{width: 25, height: 25}}
                                    autoPlay
                                    loop
                                    source={{
                                      uri: 'https://assets4.lottiefiles.com/packages/lf20_drreyhno.json',
                                    }}
                                  />
                                </Pressable>
                              </View>
                            ))}
                          </View>
                        ) : (
                          <View
                            style={{
                              width: '60%',
                              borderWidth: 1,
                              borderColor: 'lightgrey',
                              height: '60%',
                              borderRadius: 10,
                              marginLeft: normalize(5),
                              marginTop: normalize(10),
                            }}>
                            <TextInput
                              style={{padding: 5}}
                              onFocus={() => handleFocus()}
                              onBlur={() => handleBlur()}
                              placeholder="Enter your Query here!"
                              onChangeText={newText => setQueryText(newText)}
                              defaultValue={queryText}
                            />
                          </View>
                        )}
                        {fileResponseVideo.length == 0 && (
                          <View
                            style={{
                              width: '18%',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <TouchableOpacity
                              activeOpacity={0.5}
                              onPress={() => openRecordScreenModal()}>
                              <Image
                                style={{maxWidth: 50, maxHeight: 50}}
                                source={VIDEO_ICON}></Image>
                            </TouchableOpacity>
                          </View>
                        )}
                        {fileResponseVideo.length > 0 ? (
                          !videoLoadingLoader ? (
                            <View
                              style={{
                                width: Platform.OS == 'ios' ? '40%' : '30%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft:
                                  Platform.OS == 'ios'
                                    ? normalize(1)
                                    : normalize(10),
                              }}>
                              <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => uploadSelectedVideo()}
                                disabled={uploadButtonsDisable ? true : false}>
                                <Text
                                  style={[
                                    CommonStyles.text_12__semi_bold,
                                    {
                                      borderWidth: 1,
                                      padding: 10,
                                      borderRadius: 10,
                                    },
                                  ]}>
                                  Send Video
                                </Text>
                              </TouchableOpacity>
                            </View>
                          ) : (
                            <View
                              style={{
                                width: '30%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: normalize(10),
                              }}>
                              <ActivityIndicator animating size={18} />
                            </View>
                          )
                        ) : (
                          <View
                            style={{
                              width: '20%',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <TouchableOpacity
                              activeOpacity={0.5}
                              onPress={sendQueryBtn}>
                              <Text
                                style={[
                                  CommonStyles.text_12__semi_bold,
                                  {
                                    borderWidth: 1,
                                    padding: 10,
                                    borderRadius: 10,
                                  },
                                ]}>
                                Send
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              </KeyboardAvoidingView>
            )}
          </View>

          <View>
            <Modal
              animationType={'slide'}
              transparent={true}
              visible={showRecordModal}
              // onRequestClose={this.closeModal}
            >
              <View
                style={{
                  width: 300,
                  height: fileResponseVideo.length == 0 ? 180 : 300,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'lightblue',
                  backgroundColor: 'white',
                  position: 'absolute',
                  top: 200,
                  left: 50,
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    display: 'flex',
                    width: '100%',
                    height: 20,
                    alignItems: 'flex-end',
                    marginBottom: normalize(20),
                    marginRight: normalize(5),
                  }}>
                  <View
                    style={{
                      borderWidth: 1,
                      padding: 1,
                      borderRadius: 5,
                      backgroundColor: 'red',
                    }}>
                    <TouchableOpacity onPress={() => closeRecordModelFn()}>
                      <Text style={{color: 'white', textAlign: 'center'}}>
                        Close
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <Text>Note: Do not upload videos more then 10Mb</Text>
                </View>
                {videoLoadingLoader && (
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: normalize(15),
                    }}>
                    <ActivityIndicator animating size={18} />
                  </View>
                )}
                {/* {fileResponseVideo.length > 0 &&
                  !videoLoadingLoader &&
                  fileResponseVideo.map((file, index) => (
                    <View style={styles.fileSelectedName}>
                     
                      <Text
                        key={index.toString()}
                        numberOfLines={1}
                        ellipsizeMode={"middle"}
                      >
                        {file.fileName || ""}
                      </Text>

                      <Pressable
                        style={{ marginLeft: normalize(10) }}
                        onPress={() => handleFileDelete(index, "video")}
                      >
                        <AnimatedLottieView
                          style={{ width: 25, height: 25 }}
                          autoPlay
                          loop
                          source={{
                            uri: "https://assets4.lottiefiles.com/packages/lf20_drreyhno.json",
                          }}
                        />
                      </Pressable>
                    </View>
                  ))} */}
                {!videoLoadingLoader && (
                  <View style={styles.uploadOptions}>
                    <View>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => handleDocumentSelectionVideos()}>
                        <Text
                          style={[
                            CommonStyles.text_12__semi_bold,
                            {
                              borderWidth: 1,
                              padding: 10,
                              borderRadius: 10,
                            },
                          ]}>
                          Gallery
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => openRecordVideoPreview()}>
                        <Text
                          style={[
                            CommonStyles.text_12__semi_bold,
                            {
                              borderWidth: 1,
                              padding: 10,
                              borderRadius: 10,
                            },
                          ]}>
                          Record
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                {/* {fileResponseVideo.length > 0 && (
                  <View style={styles.uploadBtn}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => uploadSelectedVideo()}
                      disabled={uploadButtonsDisable ? true : false}
                      opacity={uploadButtonsDisable ? 0.2 : 1}
                      style={{
                        backgroundColor: "lightgreen",
                        borderRadius: 10,
                      }}
                    >
                      <Text
                        style={[
                          CommonStyles.text_12__semi_bold,
                          {
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 10,
                          },
                        ]}
                      >
                        Upload
                      </Text>
                    </TouchableOpacity>
                  </View>
                )} */}
              </View>
            </Modal>
          </View>

          <View
            style={{
              width: 180,
              height: 50,
              flexBasis: '10%',
              alignSelf: 'flex-end',
              marginHorizontal: 20,
              display: 'flex',
              flexDirection: 'row',
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={[CommonStyles.text_12_bold]}>Ask Your Coach</Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: normalize(10),
                marginRight: normalize(10),
                marginHorizontal: normalize(10),
              }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={openQueryTextInput}>
                <Image
                  style={{
                    height: normalize(50),
                    width: normalize(50),
                    bottom: 0,
                    right: 0,
                  }}
                  source={ASKQUERY}
                />
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <View style={styles.recordScreenView}>
          <TrainingProgramVideoUploadChat
            uploadedRecordedFile={uploadedRecordedFile}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  uploadOptions: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'space-around',
    marginTop: normalize(20),
  },

  uploadBtn: {
    display: 'flex',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(30),
  },

  fileSelectedName: {
    width: '90%',
    height: 50,
    // borderWidth: 1,
    // marginTop: normalize(10),
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  recordScreenView: {
    width: '100%',
    height: '100%',
    borderColor: 'black',
    padding: 5,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default TrainingProgramHomeScreen;
