import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import * as Constants from '../../components/helpers/Constants';
import DocumentPicker from 'react-native-document-picker';
import AnimatedLottieView from 'lottie-react-native';
import {COLOR, CommonStyles, cardBoxShadowStyle} from '../../config/styles';

import {normalize, Card, ButtonGroup} from 'react-native-elements';

import {BASE_URL} from '../../config/configs';

import {IMAGE_ICON, VIDEO_ICON, PDF_ICON} from '../../assets/images';

import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {getParamNavigationV5} from '../../components/helpers/navigationV5Data';

function TrainingProgramWeekScreen(props) {
  const [fileResponseImage, setFileResponseImage] = useState([]);
  const [fileResponseVideo, setFileResponseVideo] = useState([]);
  const [fileResponseDocs, setFileResponseDocs] = useState([]);
  const [dataWeek, setDataWeek] = useState([]);
  const [imagesWeek, setImagesWeek] = useState([]);
  const [pdfsWeek, setPdfsWeek] = useState([]);
  const [videosWeek, setVideosWeek] = useState([]);
  const [docsWeek, setDocsWeek] = useState([]);

  const [updateDataAgain, setUpdateDataAgain] = useState(false);

  const [studentId, setStudentId] = useState('');
  const [activityId, setActivityId] = useState('');
  const [buttonsDisable, setButtonsDisable] = useState(false);

  useEffect(() => {
    let data = getParamNavigationV5(props, 'allData', null);
    let student_id = getParamNavigationV5(props, 'student_id', null);
    let activity_id = getParamNavigationV5(props, 'activity_id', null);

    setStudentId(student_id);
    setActivityId(activity_id);
    setDataWeek(data);
  }, []);

  const goToTraingDetailsWeekWise = () => {
    props.navigation.navigate(Constants.TRAINING_PROGRAM_SCREEN_WEEK);
  };

  const getSkillsData = async () => {
    axios
      .get(`${BASE_URL}app_mathbox/core_skills`, {
        params: {student_id: studentId},
      })
      .then(res => {
        if (res.data.status) {
          let data = res.data.skill_data;
          data.shift();

          let filterData = data.filter(item => {
            if (item.activity_id == activityId) {
              return item;
            }
          });
          let finalData = filterData[0];

          setDataWeek(finalData);
        }
      })
      .catch(error => {
        console.log(error.message, 'error');
      });
  };

  useEffect(() => {
    if (studentId && activityId) {
      console.log('again we can call to check');

      getSkillsData();
    }
  }, [updateDataAgain]);

  const SendingImageToServer = async data => {
    let config = {
      method: 'post',
      url: `${BASE_URL}/app_mathbox/upload_core_skills`,
      data: data,
      headers: {'Content-Type': 'multipart/form-data'},
    };
    return axios(config);
  };

  const handleDocumentSelectionDocs = async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      let updateData = [...fileResponseDocs, ...response];

      setFileResponseDocs([...updateData]);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleDocumentSelectionVideos = async () => {
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

      let updateData = [...fileResponseVideo, finalData];

      setFileResponseVideo([...updateData]);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleDocumentSelectionImages = async () => {
    try {
      const response = await launchImageLibrary({
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      });

      let finalData = response.assets[0];

      let updateData = [...fileResponseImage, finalData];

      setFileResponseImage([...updateData]);
    } catch (err) {
      console.warn(err);
    }
  };

  const handleFileDelete = (index, type) => {
    if (type == 'image') {
      var x = [...fileResponseImage];
      x.splice(index, 1);
      setFileResponseImage([...x]);
    } else if (type == 'video') {
      var x = [...fileResponseVideo];
      x.splice(index, 1);
      setFileResponseVideo([...x]);
    } else {
      var x = [...fileResponseDocs];
      x.splice(index, 1);
      setFileResponseDocs([...x]);
    }
  };

  const uploadFilesImages = async () => {
    setButtonsDisable(true);

    var formadata = new FormData();

    let user_core_skill_id = dataWeek?.user_core_skill_id;

    formadata.append('user_core_skill_id', user_core_skill_id);
    fileResponseImage.forEach(file => {
      console.log('file', file);
      formadata.append('attachments[]', {
        uri: file.uri,
        type: `${file.type}`,
        name: `${file.fileName}`,
      });
    });

    await SendingImageToServer(formadata)
      .then(res => {
        if (res.data.status) {
          showMessage({
            message: 'Files uploaded successfully',
            type: 'success',
          });

          setFileResponseImage([]);
          setUpdateDataAgain(!updateDataAgain);
          setButtonsDisable(false);
        } else {
          showMessage({
            message: res.data.message,
            type: 'danger',
          });

          setButtonsDisable(false);
        }
      })
      .catch(err => {
        console.log('error', err.message);
        setButtonsDisable(false);
      });
  };

  const uploadFilesVideos = async () => {
    setButtonsDisable(true);
    var formadata = new FormData();
    let user_core_skill_id = dataWeek?.user_core_skill_id;

    formadata.append('user_core_skill_id', user_core_skill_id);
    fileResponseVideo.forEach(file => {
      console.log('file', file);
      formadata.append('attachments[]', {
        uri: file.uri,
        type: `${file.type}`,
        name: `${file.fileName}`,
      });
    });

    console.log('Formdata', JSON.stringify(formadata));

    await SendingImageToServer(formadata)
      .then(res => {
        if (res.data.status) {
          showMessage({
            message: 'Files uploaded successfully',
            type: 'success',
          });

          setFileResponseVideo([]);
          setUpdateDataAgain(!updateDataAgain);
          setButtonsDisable(false);
        } else {
          showMessage({
            message: res.data.message,
            type: 'danger',
          });

          setButtonsDisable(false);
        }
        console.log('res', res.data);
      })
      .catch(err => {
        console.log('error', err.message);
        setButtonsDisable(false);
      });
  };

  const uploadFilesDocuments = async () => {
    console.log('I am clicked docs');

    setButtonsDisable(true);
    var formadata = new FormData();

    let user_core_skill_id = dataWeek?.user_core_skill_id;

    formadata.append('user_core_skill_id', user_core_skill_id);
    fileResponseDocs.forEach(file => {
      console.log('file', file);
      formadata.append('attachments[]', {
        uri: file.uri,
        type: `${file.type}`,
        name: `${file.name}`,
      });
    });

    await SendingImageToServer(formadata)
      .then(res => {
        if (res.data.status) {
          showMessage({
            message: 'Files uploaded successfully',
            type: 'success',
          });

          setFileResponseDocs([]);
          setUpdateDataAgain(!updateDataAgain);
          setButtonsDisable(false);
        } else {
          showMessage({
            message: res.data.message,
            type: 'danger',
          });

          setButtonsDisable(false);
        }
        console.log('res', res.data);
      })
      .catch(err => {
        console.log('error', err.message);
        setButtonsDisable(false);
      });
  };

  useEffect(() => {
    filterData(dataWeek);
  }, [dataWeek]);

  const filterData = data => {
    setImagesWeek(data.photos);
    setVideosWeek(data.videos);
    setDocsWeek(data.documents);
  };

  const openImages = () => {
    console.log('imagesWeek', imagesWeek);
    props.navigation.navigate(Constants.TRAINING_PROGRAM_GALLERY, {
      imagesData: imagesWeek,
    });
  };

  const openPdfs = () => {
    props.navigation.navigate(Constants.TRAINING_PROGRAM_GALLERY, {
      pdfsData: pdfsWeek,
    });
  };

  const openVideos = () => {
    props.navigation.navigate(Constants.TRAINING_PROGRAM_GALLERY, {
      videosData: videosWeek,
    });
  };

  const openDocs = () => {
    props.navigation.navigate(Constants.TRAINING_PROGRAM_GALLERY, {
      docsData: docsWeek,
    });
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        paddingLeft: normalize(5),
        paddingRight: normalize(5),
        marginLeft: normalize(5),
        marginRight: normalize(5),
        backgroundColor: 'white',
      }}>
      {buttonsDisable && (
        <ActivityIndicator
          size="large"
          color="black"
          style={CommonStyles.activityIndicatorStyle}
        />
      )}
      <View style={styles.mainItemsRender}>
        {dataWeek?.attachment_data?.length == 0 ? (
          <Text style={[CommonStyles.text_14_bold]}>
            No Items present right now
          </Text>
        ) : (
          <>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: normalize(5),
              }}>
              {dataWeek?.survey_link != '' ? (
                <View style={styles.allFilesViewSingle}>
                  <TouchableOpacity>
                    <Text
                      style={{color: 'blue'}}
                      onPress={() =>
                        Linking.openURL(dataWeek?.survey_link || '')
                      }>
                      Take Survey
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <></>
              )}
            </View>
            <>
              <TouchableOpacity
                style={styles.commonStyle}
                onPress={() => openImages()}>
                <Image
                  style={{maxWidth: 50, maxHeight: 50}}
                  source={IMAGE_ICON}></Image>
                <Text style={[CommonStyles.text_12__semi_bold]}>Photos</Text>
              </TouchableOpacity>

              <View style={styles.commonStyle}>
                {fileResponseImage.map((file, index) => (
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '40%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      key={index.toString()}
                      numberOfLines={1}
                      ellipsizeMode={'middle'}>
                      {file.fileName}
                    </Text>

                    <Pressable onPress={() => handleFileDelete(index, 'image')}>
                      <AnimatedLottieView
                        style={{width: 18, height: 18}}
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
              <Pressable
                name="uploaded_files"
                onPress={() => handleDocumentSelectionImages()}>
                <Text style={[CommonStyles.text_12_bold, {color: 'indigo'}]}>
                  Select Attachment 📑
                </Text>
              </Pressable>

              <Pressable
                style={styles.commonStyle}
                onPress={() => uploadFilesImages()}
                disabled={buttonsDisable ? true : false}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: COLOR.COMPLETED_GREEN,
                    borderRadius: 10,
                    backgroundColor: COLOR.BG_YELLOW,
                    width: 200,
                    height: 50,
                  }}>
                  <Text style={[CommonStyles.text_14_bold, {color: 'blue'}]}>
                    Upload Photos
                  </Text>
                </View>
              </Pressable>
            </>
            <>
              <TouchableOpacity
                style={styles.commonStyle}
                onPress={() => openVideos()}>
                <Image
                  style={{maxWidth: 50, maxHeight: 50}}
                  source={VIDEO_ICON}></Image>
                <Text style={[CommonStyles.text_12__semi_bold]}>Videos</Text>
              </TouchableOpacity>

              <View style={styles.commonStyle}>
                {fileResponseVideo.map((file, index) => (
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '40%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      key={index.toString()}
                      numberOfLines={1}
                      ellipsizeMode={'middle'}>
                      {file.fileName || ''}
                    </Text>

                    <Pressable onPress={() => handleFileDelete(index, 'video')}>
                      <AnimatedLottieView
                        style={{width: 18, height: 18}}
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
              <Pressable
                name="uploaded_files"
                onPress={() => handleDocumentSelectionVideos()}>
                <Text style={[CommonStyles.text_12_bold, {color: 'indigo'}]}>
                  Select Attachment 📑
                </Text>
              </Pressable>

              <Pressable
                style={styles.commonStyle}
                onPress={() => uploadFilesVideos()}
                disabled={buttonsDisable ? true : false}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: COLOR.COMPLETED_GREEN,
                    borderRadius: 10,
                    backgroundColor: COLOR.BG_YELLOW,
                    width: 200,
                    height: 50,
                  }}>
                  <Text style={[CommonStyles.text_14_bold, {color: 'blue'}]}>
                    Upload Videos
                  </Text>
                </View>
              </Pressable>
            </>

            <>
              <TouchableOpacity
                style={styles.commonStyle}
                onPress={() => openDocs()}>
                <Image
                  style={{maxWidth: 50, maxHeight: 50}}
                  source={PDF_ICON}></Image>
                <Text style={[CommonStyles.text_12__semi_bold]}>Docs</Text>
              </TouchableOpacity>

              <View style={styles.commonStyle}>
                {fileResponseDocs.map((file, index) => (
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '40%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      key={index.toString()}
                      numberOfLines={1}
                      ellipsizeMode={'middle'}>
                      {file.name || ''}
                    </Text>

                    <Pressable onPress={() => handleFileDelete(index, 'docs')}>
                      <AnimatedLottieView
                        style={{width: 18, height: 18}}
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
              <Pressable
                name="uploaded_files"
                onPress={() => handleDocumentSelectionDocs()}>
                <Text style={[CommonStyles.text_12_bold, {color: 'indigo'}]}>
                  Select Attachment 📑
                </Text>
              </Pressable>

              <Pressable
                style={styles.commonStyle}
                onPress={() => uploadFilesDocuments()}
                disabled={buttonsDisable ? true : false}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: COLOR.COMPLETED_GREEN,
                    borderRadius: 10,
                    backgroundColor: COLOR.BG_YELLOW,
                    width: 200,
                    height: 50,
                  }}>
                  <Text style={[CommonStyles.text_14_bold, {color: 'blue'}]}>
                    Upload Docs
                  </Text>
                </View>
              </Pressable>
            </>
          </>
        )}
      </View>
    </ScrollView>
  );
}

export default TrainingProgramWeekScreen;

const styles = StyleSheet.create({
  mainItemsRender: {
    width: '100%',
    height: 'auto',
    marginTop: normalize(10),
    padding: normalize(10),
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  uploadSection: {
    width: '100%',
    height: 50,
    // borderWidth: 1,
    borderRadius: 10,
    borderColor: COLOR.BORDER_COLOR_GREEN,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(20),
  },

  imageGrid: {
    width: 200,
    height: 130,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  allFilesView: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: normalize(10),

    borderColor: 'black',
  },

  allFilesViewSingle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(10),
  },

  commonStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(10),
  },
});
