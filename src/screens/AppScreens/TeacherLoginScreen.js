import {View, Text, SafeAreaView} from 'react-native';
import React, {useState, useEffect} from 'react';

import StudentDetails from '../TeacherDashboard/StudentDetails';
import TeacherDetails from '../TeacherDashboard/TeacherDetails';
import {normalize} from 'react-native-elements';

import {getLocalData} from '../../components/helpers/AsyncMethods';

import * as Constants from '../../components/helpers/Constants';

export default function TeacherLoginScreen(props) {
  const [teacherName, setTeacherName] = useState('');
  useEffect(() => {
    getTeacherName();
  }, [teacherName]);

  const getTeacherName = async () => {
    let name = await getLocalData(Constants.ParentFirstName);
    setTeacherName(JSON.parse(name));
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
      <View style={{flexBasis: '5%', width: '100%'}}>
        <TeacherDetails props={props} teacherName={teacherName} />
      </View>
      <View style={{flexBasis: '95%', width: '100%', marginTop: normalize(20)}}>
        <StudentDetails props={props} teacherName={teacherName} />
      </View>
    </View>
  );
}
