import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  KeyboardAvoidingView,
  Image,
  Modal,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AnimatedLottieView from 'lottie-react-native';
import {BASE_URL, SCREEN_WIDTH} from '../../config/configs';
import axios from 'axios';
import {CommonStyles, COLOR} from '../../config/styles';
import {normalize} from 'react-native-elements';
import * as Constants from '../../components/helpers/Constants';

import {showMessage} from 'react-native-flash-message';

import {VIDEO_ICON, VIDEO_PLAY_ICON} from '../../assets/images';
import TrainingProgramVideoUploadChat from '../../screens/TrainingProgramScreens/TrainingProgramVideoUploadChat';
import {getParamNavigationV5} from '../../components/helpers/navigationV5Data';
export default function StudentChats(props) {
  const [studentId, setStudentId] = useState();
  const [teacherId, setTeacherId] = useState();
  const [messages, setMessages] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [queryText, setQueryText] = useState([]);
  const [updateDataAgain, setUpdateDataAgain] = useState(false);

  const [unAnsweredMessages, setUnAnsweredMessages] = useState([]);
  const [showFilteredData, setShowFilteredData] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const [showRecordModal, setShowRecordModal] = useState(false);

  const [fileResponseVideo, setFileResponseVideo] = useState([]);
  const [videoLoadingLoader, setVideoLoadingLoader] = useState(false);
  const [uploadButtonsDisable, setUploadButtonsDisable] = useState(false);

  const [showVideoRecordPreview, setVideoRecordPreview] = useState(false);

  const [chatIdForVideoUpload, setChatIdForVideoUpload] = useState();
  const [coordinates, setCoordinates] = useState([]);
  const [chatViewIndex, setChatViewIndex] = useState();

  const scrollViewRef = useRef();

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 200 : 100;

  useEffect(() => {
    let student_id = getParamNavigationV5(props, 'student_id', null);
    let teacher_id = getParamNavigationV5(props, 'teacher_id', null);

    setStudentId(student_id);
    setTeacherId(teacher_id);
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  const sendReply = message_id => {
    let student_id = studentId;
    let teacher_id = teacherId;
    let core_skill_chat_id = message_id;

    let requiredQuery = queryText.filter(item =>
      item.id == message_id ? 1 : 0,
    );

    let response = requiredQuery[0].text;
    console.log('student_id', student_id);
    console.log('teacher_id', teacher_id);
    console.log('core_skill_chat_id', core_skill_chat_id);
    console.log('response', response);

    sendResponseToParticularMessage(
      student_id,
      teacher_id,
      core_skill_chat_id,
      response,
    );
  };

  useEffect(() => {
    if (studentId) {
      getStudentChatHistory(studentId);
    }
  }, [studentId, updateDataAgain]);

  const sendResponseToParticularMessage = async (
    student_id,
    teacher_id,
    core_skill_chat_id,
    response,
  ) => {
    axios
      .get(`${BASE_URL}core_skills/store_core_skill_chat_response`, {
        params: {
          student_id: student_id,
          teacher_id: teacher_id,
          core_skill_chat_id: core_skill_chat_id,
          response: response,
        },
      })
      .then(res => {
        if (res.data.status) {
          showMessage({
            message: 'Your response is submitted',
            type: 'success',
          });

          setUpdateDataAgain(!updateDataAgain);
          setCoordinates([]);
        } else {
          showMessage({
            message: res.data.message,
            type: 'danger',
          });
        }
      })
      .catch(error => {
        console.log(error.message, 'error');
      });
  };

  const getStudentChatHistory = studentId => {
    axios
      .get(`${BASE_URL}core_skills/show_student_core_skill_details`, {
        params: {
          student_id: studentId,
        },
      })
      .then(res => {
        if (res.data.status) {
          setMessages(res.data.chat_data);
        }
      })
      .catch(error => {
        console.log(error.message, 'error');
      });
  };

  useEffect(() => {
    console.log('showFilteredData', showFilteredData);
    setUnAnsweredMessages([]);
  }, [showFilteredData]);

  const openVideoResponse = uri => {
    console.log('Uri', uri);

    props.navigation.navigate(Constants.TRAINING_PROGRAM_NOTIFICATION_VIDEO, {
      navigation: props.navigation,
      video_url: uri,
      fromScreen: 'ChatVideoReply',
    });
  };

  const openRecordScreenModal = (id, index) => {
    setChatIdForVideoUpload(id);
    setChatViewIndex(index);
    setShowRecordModal(true);
  };

  const saveCoordinates = obj => {
    setCoordinates([...coordinates, obj]);
  };

  const renderAllMessages = () => {
    return messages?.map((chat, index) => {
      return (
        <View
          style={styles.chatInnerView}
          onLayout={event => {
            const {y} = event.nativeEvent.layout;
            const obj = {
              index,
              y,
            };

            saveCoordinates(obj);
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              width: '100%',
              padding: 5,
            }}>
            <View
              style={{
                marginLeft: normalize(10),
                display: 'flex',
                flexWrap: 'wrap',
                minHeight: 50,
                height: 'auto',
                width: '65%',
              }}>
              <Text
                style={[
                  CommonStyles.text_12_bold,
                  {alignSelf: 'center', color: 'blue'},
                ]}>
                {'Q.' + ' ' + chat.question}
              </Text>
            </View>

            <View
              style={{
                marginLeft: 'auto',
                marginRight: normalize(10),
                width: '35%',
              }}>
              <Text
                style={[
                  CommonStyles.text_12_bold,
                  {
                    alignSelf: 'center',
                    marginLeft: normalize(10),
                    color: 'blue',
                  },
                ]}>
                {chat.created_at}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 5,
            }}>
            <View style={{marginLeft: normalize(10)}}>
              {chat.video_question != '' && (
                <View
                  style={{
                    marginLeft: normalize(10),
                    height: 30,
                    marginBottom: normalize(10),
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => openVideoResponse(chat.video_question)}>
                    <Image
                      style={{maxWidth: 35, maxHeight: 35}}
                      source={VIDEO_PLAY_ICON}></Image>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View style={{marginRight: normalize(10)}}>
              {chat.video_response != '' && (
                <View
                  style={{
                    marginLeft: normalize(10),
                    height: 30,
                    marginBottom: normalize(10),
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => openVideoResponse(chat.video_response)}>
                    <Image
                      style={{maxWidth: 35, maxHeight: 35}}
                      source={VIDEO_PLAY_ICON}></Image>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          <View
            style={{
              width: '100%',
              padding: 5,
            }}>
            {chat.teacher_response != '' ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  width: '100%',
                  padding: 5,
                }}>
                <View
                  style={{
                    marginLeft: normalize(10),
                    display: 'flex',
                    flexWrap: 'wrap',
                    minHeight: 50,
                    height: 'auto',
                    width: '65%',
                  }}>
                  <Text
                    style={[
                      CommonStyles.text_12_bold,
                      {alignSelf: 'center', color: 'blue'},
                    ]}>
                    {'A.' + ' ' + chat.teacher_response}
                  </Text>
                </View>
                <View
                  style={{
                    marginLeft: 'auto',
                    width: '35%',
                  }}>
                  <Text style={[CommonStyles.text_12_bold, {color: 'blue'}]}>
                    {chat.responded_at}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={[styles.chatInputBoxOuter]}>
                {fileResponseVideo.length > 0 &&
                chat.id == chatIdForVideoUpload ? (
                  <View
                    style={{
                      width: '60%',
                      // borderWidth: 1,
                      borderColor: 'lightgrey',
                      height: '60%',
                      borderRadius: 10,
                      marginLeft: normalize(5),
                      // marginTop: normalize(10),
                    }}>
                    {fileResponseVideo.map((file, index) => (
                      <View style={styles.fileSelectedName}>
                        <Text
                          key={index.toString()}
                          numberOfLines={1}
                          ellipsizeMode={'middle'}>
                          {file.fileName || ''}
                        </Text>

                        <Pressable
                          style={{marginLeft: normalize(10)}}
                          onPress={() => handleFileDelete(index, 'video')}>
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
                      height: '80%',
                      borderRadius: 10,
                      marginLeft: normalize(5),
                      marginTop: normalize(5),
                    }}>
                    <TextInput
                      // style={{ padding: 5 }}
                      style={{
                        height: 50,
                        padding: 10,
                      }}
                      onFocus={() => handleFocus()}
                      onBlur={() => handleBlur()}
                      placeholder="Enter your Query here!"
                      onChangeText={newText => {
                        let updatedText = [...queryText];

                        let isAlreadyThere = queryText?.filter(item =>
                          item.id == chat.id ? 1 : 0,
                        );

                        if (isAlreadyThere.length != 0) {
                          updatedText = updatedText.map(item => {
                            if (item.id == chat.id) {
                              item.text = newText;

                              return item;
                            } else {
                              return item;
                            }
                          });

                          setQueryText([...updatedText]);
                        } else {
                          setQueryText([
                            ...queryText,
                            {id: chat.id, text: newText},
                          ]);
                        }
                      }}
                      defaultValue={queryText.id == chat.id && queryText.text}
                    />
                  </View>
                )}
                {fileResponseVideo.length == 0 ? (
                  <View
                    style={{
                      width: '18%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => openRecordScreenModal(chat.id, index)}>
                      <Image
                        style={{maxWidth: 40, maxHeight: 40}}
                        source={VIDEO_ICON}></Image>
                    </TouchableOpacity>
                  </View>
                ) : chat.id != chatIdForVideoUpload ? (
                  <View
                    style={{
                      width: '18%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => openRecordScreenModal(chat.id, index)}>
                      <Image
                        style={{maxWidth: 40, maxHeight: 40}}
                        source={VIDEO_ICON}></Image>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <></>
                )}

                {fileResponseVideo.length > 0 &&
                chat.id == chatIdForVideoUpload ? (
                  !videoLoadingLoader ? (
                    <View
                      style={{
                        width: '30%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: normalize(10),
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
                              padding: 5,
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
                      height: 30,
                      marginTop: normalize(7),
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => sendReply(chat.id)}>
                      <Text
                        style={[
                          CommonStyles.text_12__semi_bold,
                          {
                            borderWidth: 1,
                            borderColor: 'lightblue',
                            padding: 3,
                            borderRadius: 10,
                            alignSelf: 'center',
                            color: 'green',
                          },
                        ]}>
                        Send
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      );
    });
  };

  const renderFilterMessages = () => {
    return unAnsweredMessages?.map(chat => {
      return (
        <View style={styles.chatInnerView}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              width: '100%',
              padding: 5,
            }}>
            <View
              style={{
                marginLeft: normalize(10),
                display: 'flex',
                flexWrap: 'wrap',
                minHeight: 50,
                height: 'auto',
                width: '65%',
              }}>
              <Text
                style={[
                  CommonStyles.text_12_bold,
                  {alignSelf: 'center', color: 'blue'},
                ]}>
                {'Q.' + ' ' + chat.question}
              </Text>
            </View>
            <View
              style={{
                marginLeft: 'auto',
                marginRight: normalize(10),
                width: '35%',
              }}>
              <Text
                style={[
                  CommonStyles.text_12_bold,
                  {
                    alignSelf: 'center',
                    marginLeft: normalize(10),
                    color: 'blue',
                  },
                ]}>
                {chat.created_at}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 5,
            }}>
            <View style={{marginLeft: normalize(10)}}>
              {chat.video_question != '' && (
                <View
                  style={{
                    marginLeft: normalize(10),
                    height: 30,
                    marginBottom: normalize(10),
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => openVideoResponse(chat.video_question)}>
                    <Image
                      style={{maxWidth: 35, maxHeight: 35}}
                      source={VIDEO_PLAY_ICON}></Image>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View style={{marginRight: normalize(10)}}>
              {chat.video_response != '' && (
                <View
                  style={{
                    marginLeft: normalize(10),
                    height: 30,
                    marginBottom: normalize(10),
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => openVideoResponse(chat.video_response)}>
                    <Image
                      style={{maxWidth: 35, maxHeight: 35}}
                      source={VIDEO_PLAY_ICON}></Image>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          <View
            style={{
              width: '100%',
              padding: 5,
            }}>
            {chat.teacher_response != '' ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  width: '100%',
                  padding: 5,
                }}>
                <View
                  style={{
                    marginLeft: normalize(10),
                    display: 'flex',
                    flexWrap: 'wrap',
                    minHeight: 50,
                    height: 'auto',
                    width: '65%',
                  }}>
                  <Text
                    style={[
                      CommonStyles.text_12_bold,
                      {alignSelf: 'center', color: 'blue'},
                    ]}>
                    {'A.' + ' ' + chat.teacher_response}
                  </Text>
                </View>
                <View
                  style={{
                    marginLeft: 'auto',
                    width: '35%',
                  }}>
                  <Text style={[CommonStyles.text_12_bold, {color: 'blue'}]}>
                    {chat.responded_at}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={[styles.chatInputBoxOuter]}>
                {fileResponseVideo.length > 0 &&
                chat.id == chatIdForVideoUpload ? (
                  <View
                    style={{
                      width: '60%',
                      // borderWidth: 1,
                      borderColor: 'lightgrey',
                      height: '60%',
                      borderRadius: 10,
                      marginLeft: normalize(5),
                      // marginTop: normalize(10),
                    }}>
                    {fileResponseVideo.map((file, index) => (
                      <View style={styles.fileSelectedName}>
                        <Text
                          key={index.toString()}
                          numberOfLines={1}
                          ellipsizeMode={'middle'}>
                          {file.fileName || ''}
                        </Text>

                        <Pressable
                          style={{marginLeft: normalize(10)}}
                          onPress={() => handleFileDelete(index, 'video')}>
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
                      height: '80%',
                      borderRadius: 10,
                      marginLeft: normalize(5),
                      marginTop: normalize(5),
                    }}>
                    <TextInput
                      // style={{ padding: 5 }}
                      style={{
                        height: 50,
                        padding: 10,
                      }}
                      onFocus={() => handleFocus()}
                      onBlur={() => handleBlur()}
                      placeholder="Enter your Query here!"
                      onChangeText={newText => {
                        let updatedText = [...queryText];

                        let isAlreadyThere = queryText?.filter(item =>
                          item.id == chat.id ? 1 : 0,
                        );

                        if (isAlreadyThere.length != 0) {
                          updatedText = updatedText.map(item => {
                            if (item.id == chat.id) {
                              item.text = newText;

                              return item;
                            } else {
                              return item;
                            }
                          });

                          setQueryText([...updatedText]);
                        } else {
                          setQueryText([
                            ...queryText,
                            {id: chat.id, text: newText},
                          ]);
                        }
                      }}
                      defaultValue={queryText.id == chat.id && queryText.text}
                    />
                  </View>
                )}
                {fileResponseVideo.length == 0 ? (
                  <View
                    style={{
                      width: '18%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => openRecordScreenModal(chat.id)}>
                      <Image
                        style={{maxWidth: 40, maxHeight: 40}}
                        source={VIDEO_ICON}></Image>
                    </TouchableOpacity>
                  </View>
                ) : chat.id != chatIdForVideoUpload ? (
                  <View
                    style={{
                      width: '18%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => openRecordScreenModal(chat.id)}>
                      <Image
                        style={{maxWidth: 40, maxHeight: 40}}
                        source={VIDEO_ICON}></Image>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <></>
                )}

                {fileResponseVideo.length > 0 &&
                chat.id == chatIdForVideoUpload ? (
                  !videoLoadingLoader ? (
                    <View
                      style={{
                        width: '30%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: normalize(10),
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
                              padding: 5,
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
                      height: 30,
                      marginTop: normalize(7),
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => sendReply(chat.id)}>
                      <Text
                        style={[
                          CommonStyles.text_12__semi_bold,
                          {
                            borderWidth: 1,
                            borderColor: 'lightblue',
                            padding: 3,
                            borderRadius: 10,
                            alignSelf: 'center',
                            color: 'green',
                          },
                        ]}>
                        Send
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      );
    });
  };

  const ViewAllUnansweredQuery = () => {
    setCoordinates([]);
    let data = messages?.filter(item => {
      if (item.teacher_response == '') {
        return item;
      } else {
        return false;
      }
    });

    setUnAnsweredMessages(data);
  };

  const ViewAllQuery = () => {
    setShowFilteredData(!showFilteredData);
  };

  const uploadSelectedVideo = async () => {
    console.log('upload video');
    setUploadButtonsDisable(true);
    setVideoLoadingLoader(true);

    let student_id = studentId;
    let teacher_id = teacherId;
    let core_skill_chat_id = chatIdForVideoUpload;
    var formadata = new FormData();
    formadata.append('student_id', student_id);
    formadata.append('teacher_id', teacher_id);
    formadata.append('core_skill_chat_id', core_skill_chat_id);

    console.log('FileResponse', fileResponseVideo);

    fileResponseVideo.forEach(file => {
      formadata.append('video_response', {
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
            message: 'File uploaded successfully',
            type: 'success',
          });

          setFileResponseVideo([]);
          setUpdateDataAgain(!updateDataAgain);
          setUploadButtonsDisable(false);
          setVideoLoadingLoader(false);
          setCoordinates([]);
        } else {
          showMessage({
            message: res.data.message,
            type: 'danger',
          });

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
      url: `${BASE_URL}core_skills/store_core_skill_chat_response`,
      data: data,
      headers: {'Content-Type': 'multipart/form-data'},
    };
    return axios(config);
  };

  const openRecordVideoPreview = () => {
    setVideoRecordPreview(true);
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

  const handleFileDelete = (index, type) => {
    if (type == 'video') {
      var x = [...fileResponseVideo];
      x.splice(index, 1);
      setFileResponseVideo([...x]);
    }
  };

  const scrollToParticularElement = async () => {
    let yPossition = coordinates.filter(item => {
      console.log('item index', item.index);
      if (item.index == chatViewIndex) {
        return item.y;
      }
    });

    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        y: yPossition[0]?.y,
        animated: true,
      });
    }, 20);

    setCoordinates([]);
  };

  const uploadedRecordedFile = file => {
    console.log('File to upload parent component', file);
    let updateData = [...fileResponseVideo, file];
    setFileResponseVideo([...updateData]);
    setVideoRecordPreview(false);
    setShowRecordModal(false);
    scrollToParticularElement();
  };

  const closeRecordModelFn = () => {
    setShowRecordModal(false);
    setVideoLoadingLoader(false);
  };

  return (
    <>
      {!showVideoRecordPreview ? (
        <View style={styles.mainContainer}>
          <View style={styles.filterButton}>
            <View style={styles.filterButtonInsideButtons}>
              <TouchableOpacity onPress={ViewAllQuery}>
                <Text style={[CommonStyles.text_12_bold, {color: 'blue'}]}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.filterButtonInsideButtons}>
              <TouchableOpacity onPress={ViewAllUnansweredQuery}>
                <Text style={[CommonStyles.text_12_bold, {color: 'blue'}]}>
                  View Unanswered
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <KeyboardAwareScrollView>
            <View style={styles.chatOutView}>
              <ScrollView
                ref={scrollViewRef}
                //   onContentSizeChange={() =>
                //     scrollViewRef.current.scrollToEnd({ animated: true })
                //   }
              >
                {messages.length >= 1 && unAnsweredMessages.length == 0
                  ? renderAllMessages()
                  : renderFilterMessages()}
              </ScrollView>
            </View>
          </KeyboardAwareScrollView>

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
        </View>
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
  mainContainer: {
    display: 'flex',
    flex: 1,
    borderColor: 'black',
  },

  chatOutView: {
    display: 'flex',
    marginHorizontal: normalize(10),
    marginVertical: normalize(10),
    width: SCREEN_WIDTH - 30,
    height: 600,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'lightblue',
    backgroundColor: 'white',
  },

  chatInnerView: {
    display: 'flex',
    width: SCREEN_WIDTH - 55,
    height: 'auto',
    minHeight: 60,
    borderWidth: 1,
    borderColor: 'lightblue',
    marginHorizontal: normalize(10),
    marginVertical: normalize(10),
    borderRadius: 10,
    flexDirection: 'column',
  },

  chatInputBoxOuter: {
    width: '100%',
    height: 50,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'lightblue',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },

  filterButton: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: normalize(10),
    marginVertical: normalize(10),
    width: SCREEN_WIDTH - 30,
    height: 50,
  },

  filterButtonInsideButtons: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    borderColor: 'lightblue',
    backgroundColor: 'white',
  },
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
});
