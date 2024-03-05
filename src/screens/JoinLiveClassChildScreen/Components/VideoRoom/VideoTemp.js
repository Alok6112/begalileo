import React, {useEffect, useState} from 'react';

import {View, Text} from 'react-native';
import VideoRoom from './VideoRoom';
import {getParamNavigationV5} from '../../../../components/helpers/navigationV5Data';

export default function VideoTemp(props) {
  const [update, setUpdate] = useState(true);
  const handleUpdate = value => {
    setUpdate(value);
  };

  let data = getParamNavigationV5(props, 'videoRoom', null);
  let token = getParamNavigationV5(props, 'token', null);
  let navigation = getParamNavigationV5(props, 'navigation', null);
  let studid = getParamNavigationV5(props, 'studid', null);
  let liveId = getParamNavigationV5(props, 'liveId', null);
  let env = getParamNavigationV5(props, 'env', '');
  let classtype = getParamNavigationV5(props, 'classtype', '');
  let newCodingPlan = getParamNavigationV5(props, 'newCodingPlan', false);
  let showNewCodings = getParamNavigationV5(props, 'showNewCodings', false);
  let demoStatus = getParamNavigationV5(props, 'demoStatus', false);

  return (
    <View style={{display: 'flex', flex: 1}}>
      {update && (
        <VideoRoom
          data={data}
          token={token}
          handleUpdate={handleUpdate}
          navigation={navigation}
          studid={studid}
          liveId={liveId}
          env={env}
          classtype={classtype}
          demoStatus={demoStatus}
          newCodingPlan={newCodingPlan}
          showNewCodings={showNewCodings}
        />
      )}
    </View>
  );
}
