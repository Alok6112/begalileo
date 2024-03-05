import React from 'react';

import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';

import {useEffect, useState} from 'react';
import {normalize} from 'react-native-elements';

import TrainingImagesComp from './TrainingImagesComp';
import TrainingPdfsComp from './TrainingPdfsComp';
import TrainingVideosComp from './TrainingVideosComp';
import TrainingDocsComp from './TrainingDocsComp';
import {getParamNavigationV5} from '../../components/helpers/navigationV5Data';

export default function TrainingProgramWeekGallery(props) {
  const [images, setImages] = useState([]);
  const [pdfs, setPdfs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [docs, setDocs] = useState([]);

  const [DocsArr, setDocsArr] = useState([]);

  useEffect(() => {
    let imagesData = getParamNavigationV5(props, 'imagesData', null);
    let pdfsData = getParamNavigationV5(props, 'pdfsData', null);
    let videosData = getParamNavigationV5(props, 'videosData', null);
    let docsData = getParamNavigationV5(props, 'docsData', null);

    setImages(imagesData);
    setPdfs(pdfsData);
    setVideos(videosData);
    setDocs(docsData);
    filterDocs(docsData);
  }, []);

  const filterDocs = data => {
    let arr = [];
    data?.map(item => {
      arr.push(item.url);
    });

    setDocsArr(arr);
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{backgroundColor: 'white'}}>
        {images != null ? (
          <TrainingImagesComp data={images} />
        ) : pdfs != null ? (
          <TrainingPdfsComp data={pdfs} />
        ) : videos != null ? (
          <TrainingVideosComp data={videos} />
        ) : (
          <TrainingDocsComp data={DocsArr} />
        )}
      </View>
    </ScrollView>
  );
}
