import {View, Text, StyleSheet, Button, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import ViewShot from 'react-native-view-shot';

export default function AffirmationActivity() {
  const [data, setData] = useState('');
  const ref = useRef();
  const takeScreenShot = () => {
    console.log('i am here');
    ref.current
      .capture()
      .then(async uri => {
        console.log('uri', uri);
        const response = await fetch(uri);
        const blob = await response.blob();

        let result = URL.createObjectURL(blob);

        setData(result);

        alert('Took screenshot');
      })
      .catch(err => {
        console.log('err', err.message);
      });
  };

  useEffect(() => {
    setData('');
  }, []);
  return (
    <View style={{flex: 1}}>
      <Text>AffirmationActivity</Text>
      <View style={styles.container}>
        <ViewShot
          ref={ref}
          captureMode="mount"
          options={{
            fileName: 'file-name', // screenshot image name
            format: 'jpg', // image extention
            quality: 1, // image quality
          }}>
          <Image
            style={{height: 100, width: 100}}
            source={{
              uri: 'https://check-in-activity.s3.ap-south-1.amazonaws.com/triangle.png',
            }}></Image>
        </ViewShot>
      </View>

      <View>
        <Image style={{height: 200, width: 200}} source={{uri: data}}></Image>
      </View>

      <Button
        style={{borderWidth: 1}}
        title="Share QR Code"
        onPress={takeScreenShot}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
