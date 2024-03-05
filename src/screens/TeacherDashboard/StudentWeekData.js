import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';

import {normalize, Card, ButtonGroup} from 'react-native-elements';
import {IMAGE_ICON, VIDEO_ICON, PDF_ICON} from '../../assets/images';

import {COLOR, CommonStyles} from '../../config/styles';

import * as Constants from '../../components/helpers/Constants';
import {getParamNavigationV5} from '../../components/helpers/navigationV5Data';

export default function StudentWeekData(props) {
  console.log('props', props.navigation.navigate);
  const [dataWeek, setDataWeek] = useState([]);
  const [imagesWeek, setImagesWeek] = useState([]);
  const [videosWeek, setVideosWeek] = useState([]);
  const [docsWeek, setDocsWeek] = useState([]);

  useEffect(() => {
    let data = getParamNavigationV5(props, 'allData', null);

    console.log('Data', data);

    setDataWeek(data);
  }, []);

  useEffect(() => {
    filterData(dataWeek);
  }, [dataWeek]);

  const filterData = data => {
    setImagesWeek(data.photos);
    setVideosWeek(data.videos);
    setDocsWeek(data.documents);
  };

  console.log('imagesWeek', imagesWeek);
  console.log('videosWeek', videosWeek);
  console.log('docsWeek', docsWeek);

  const openVideos = () => {
    props.navigation.navigate(Constants.TRAINING_PROGRAM_GALLERY, {
      videosData: videosWeek,
    });
  };

  const openImages = () => {
    props.navigation.navigate(Constants.TRAINING_PROGRAM_GALLERY, {
      imagesData: imagesWeek,
    });
  };

  const openDocs = () => {
    props.navigation.navigate(Constants.TRAINING_PROGRAM_GALLERY, {
      docsData: docsWeek,
    });
  };

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.allFilesViewSingle, {marginTop: normalize(25)}]}>
        <TouchableOpacity onPress={() => openImages()}>
          <Image style={{width: 60, height: 60}} source={IMAGE_ICON}></Image>
          <Text style={[CommonStyles.text_12__semi_bold]}>Images</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.allFilesViewSingle, {marginTop: normalize(25)}]}>
        <TouchableOpacity onPress={() => openVideos()}>
          <Image style={{width: 60, height: 60}} source={VIDEO_ICON}></Image>
          <Text style={[CommonStyles.text_12__semi_bold]}>Videos</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.allFilesViewSingle, {marginTop: normalize(25)}]}>
        <TouchableOpacity onPress={() => openDocs()}>
          <Image style={{width: 60, height: 60}} source={PDF_ICON}></Image>
          <Text style={[CommonStyles.text_12__semi_bold]}>Docs</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  allFilesView: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: normalize(10),
  },

  allFilesViewSingle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: normalize(10),
  },
});
