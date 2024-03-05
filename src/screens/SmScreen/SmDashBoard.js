import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {logOutUser, deleteUserAccount} from '../../actions/authenticate';
import {CommonActions} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import React, {useEffect, useRef, useState} from 'react';
import * as Constants from '../../components/helpers/Constants';
import {getLocalData} from '../../components/helpers/AsyncMethods';
import {SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import axios from 'axios';
import {BASE_URL} from '../../config/configs';
import AsyncStorage from '@react-native-community/async-storage';
import SmTable from './smTable';
import Icons from 'react-native-vector-icons/AntDesign';
import firebase from '../SmScreen/AppChat/Firebase/firebaseConfig';
import 'firebase/compat/database';
import ChatDashBoard from './AppChat/Screens/DashboardScreen';
import {EventRegister} from 'react-native-event-listeners';
import {DeleteFcmToken} from './AppChat/Firebase/Users';
import {showNotification} from '../../components/helpers/AndroidNotificationHandler';

export default function SmDashBoard({navigation}) {
  const [studentName, setStudentName] = useState('');
  const [teachersName, setTeachersName] = useState('');
  const [batchId, setBatchId] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [searchResponse, setSearchResponse] = useState(null);
  const [searchResponseShow, setSearchResponseShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSearchState, setShowSearchState] = useState('Search Students');
  const [batchIdFromResponse, setBatchIdFromResponse] = useState(0);
  const [borderColour, setBorderColour] = useState('');
  const textinputref = useRef();
  const [numberOfChatsPending, setNumberOfChatsPending] = useState(null);
  const dataRef = useRef();
  const mountedChatRef = useRef(false);
  const [defaultBatchData, setDefaultBatchData] = useState(true);
  const [defaultBatchDetailsState, setDefaultBatchDetailsState] =
    useState(true);
  const [smUserId, setSmUserId] = useState(0);
  const [finalMessageCount, setFinalMessageCount] = useState(0);
  const firebaseListenerRef = useRef(null);

  const requestNotificationPermission = async () => {
    try {
      await messaging().requestPermission();
      console.log('Notification permission granted');
    } catch (error) {
      console.log('Notification permission denied', error);
    }
  };
  const onNotificationReceived = notification => {
    if (dataRef.current != undefined) {
      navigation.navigate(Constants.ChatScreen, {
        UserName: dataRef.current['sm_name'],
        guestUid: dataRef.current['sm_id'],
        fcmTokenId: dataRef.current['sm_id'],
        currentUid: dataRef.current['student_id'],
        role: 'Student',
      });
    }
  };

  const localNotification = () => {
    console.log('localNotification called');
    firebaseListenerRef.current = messaging().onMessage(async remoteMessage => {
      dataRef.current = remoteMessage.data;

      if (mountedChatRef.current) {
        console.log('returning as chat screen is alredy mouted');
        return;
      } else {
        if (remoteMessage.data?.type == 'ChatNotifications') {
          if (Platform.OS == 'ios') {
            PushNotificationIOS.presentLocalNotification({
              alertBody: remoteMessage?.notification?.body,
              alertTitle: remoteMessage?.notification?.title,
            });
          } else {
            showNotification(
              remoteMessage?.notification?.title,
              remoteMessage?.notification?.body,
            );
          }
        }
      }
    });
    return firebaseListenerRef;
  };

  useEffect(() => {
    const eventListener = EventRegister.addEventListener(
      'chatScreenMouted',
      flagValue => {
        console.log('Received flag value:', flagValue);

        // Use the flagValue here
        if (flagValue) {
          mountedChatRef.current = true;
          setDontShowNotificationOnChatScreen(true);

          // Do something when the flag is true
        } else {
          mountedChatRef.current = false;
          setDontShowNotificationOnChatScreen(false);

          // Do something when the flag is false
        }
      },
    );

    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  }, [dontShowNotificatioOnChatScreen]);

  useEffect(() => {
    localNotification();
    PushNotificationIOS.addEventListener(
      'localNotification',
      onNotificationReceived,
    );

    return () => {
      console.log(
        'firebaseListenerRef componentWillUnmount SmDashboard',
        firebaseListenerRef.current,
      );
      if (firebaseListenerRef.current) {
        firebaseListenerRef.current();
      }
    };
  }, []);

  const logOut = () => {
    Alert.alert(
      'Are you sure want to Log out?',
      '',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => onLogOutConfirmation()},
      ],
      {cancelable: false},
    );
  };
  const onLogOutConfirmation = async () => {
    DeleteFcmToken(smUserId);
    PushNotificationIOS.removeEventListener('localNotification');
    const items = [
      [Constants.IS_LOGGED_IN, JSON.stringify(false)],
      [Constants.SM_user_id, ''],
      [Constants.SM_email, ''],
      [Constants.SM_role, ''],
    ];
    AsyncStorage.multiSet(items).then(() => {
      logOutUser();
      goToLogin();
    });
  };
  const goToLogin = () => {
    const navigateAction = CommonActions.reset({
      index: 0,
      routes: [{name: Constants.Splash}],
    });

    navigation.dispatch(navigateAction);
  };
  const onFocusEvent = () => {
    setBorderColour('red');
  };
  const onBlurEvent = () => {
    setBorderColour('#D8DADC');
  };

  const gettingSmDetails = () => {
    setLoading(true);
    if (
      studentName == '' &&
      teachersName == '' &&
      parentEmail == '' &&
      batchId == ''
    ) {
      setLoading(false);
      return;
    }

    getLocalData(Constants.SM_user_id).then(res => {
      axios
        .get(
          `${BASE_URL}app_mathbox/batch_list?user_id=${Number(
            res,
          )}&teacher_name=${teachersName}&batch_id=${Number(
            batchId,
          )}&parent_email=${parentEmail}&student_name=${studentName}`,
        )
        .then(res => {
          if (res.data.status) {
            setSearchResponse(res.data.batch_data);
            setLoading(false);
            setSearchResponseShow(true);
            setDefaultBatchDetailsState(false);
          } else if (!res.data.status) {
            showMessage({
              message: res.data.message,
              type: 'danger',
            });
            setLoading(false);
          } else {
          }
        })
        .catch(error => {
          console.log(error.message, 'error');
        });
    });
  };

  const handleShowSearch = title => {
    setShowSearchState(title);
  };

  useEffect(() => {
    if (finalMessageCount > 0) {
      setNumberOfChatsPending(true);
    }
  }, [finalMessageCount]);

  useEffect(() => {
    requestNotificationPermission();
    getLocalData(Constants.SM_user_id).then(res => {
      setSmUserId(res);
      getRecentBatches(res);
    });
    EventRegister.emit('refreshSmDashboardScreen', true);
  }, []);

  useEffect(() => {
    getLocalData(Constants.SM_email).then(res => {
      let email = res.trim().split('');
      email.shift();
      email.pop();

      firebase
        .auth()
        .signInWithEmailAndPassword(email.join(''), email.join(''))
        .then(async data => {
          mainScreen();
        })
        .catch(err => {
          console.log('error while login in firebase', err);
        });
    });
  }, []);

  const mainScreen = async () => {
    try {
      firebase
        .database()
        .ref('users')
        .on('value', async datasnapshot => {
          let smuserId = await getLocalData(Constants.SM_user_id);

          new Promise((resolve, reject) => {
            let users = [];
            let lastMessage = '';
            let lastDate = '';
            let lastTime = '';
            let properDate = '';
            let unreadMessageCount = 0;

            if (datasnapshot != null) {
              if (datasnapshot.val()) {
                datasnapshot.forEach(child => {
                  if (child.val().UserId == smuserId) {
                    // this.setState({
                    //   loggedInUserName: child.val().name,
                    //   imageUrl: child.val().image,
                    // });
                  } else {
                    let newUser = {
                      UserId: '',
                      userName: '',
                      userProPic: '',
                      lastMessage: '',
                      lastDate: '',
                      lastTime: '',
                      properDate: '',
                      unreadMessageCount: 0,
                    };

                    new Promise((resolve, reject) => {
                      firebase
                        .database()
                        .ref('messages')
                        .child(smuserId)
                        .child(child.val().UserId)
                        .orderByKey()
                        .limitToLast(1)
                        .on('value', dataSnapshots => {
                          newUser.UserId = child.val().UserId;
                          newUser.userName = child.val().name;
                          newUser.userProPic = child.val().image;

                          if (dataSnapshots.val()) {
                            dataSnapshots.forEach(async (child, index) => {
                              await checkUnreadMessage(
                                child.val()?.messege?.sender,
                                smuserId,
                              ).then(res => {
                                newUser.lastMessage =
                                  child.val()?.messege?.image !== ''
                                    ? 'Photo'
                                    : child.val().messege.msg;
                                newUser.lastTime = child.val().messege.time;
                                newUser.lastDate = child.val().messege.date;
                                newUser.properDate =
                                  child.val().messege.date +
                                  ' ' +
                                  child.val().messege.time;
                                newUser.unreadMessageCount = res;
                                return resolve(newUser);
                              });
                            });
                          } else {
                            lastMessage = '';
                            lastDate = '';
                            lastTime = '';
                            properDate = '';
                            return resolve(newUser);
                          }
                        });
                    }).then(newUser => {
                      users.push({
                        userName: newUser.userName,
                        UserId: newUser.UserId,
                        imageUrl: newUser.userProPic,
                        lastMessage: newUser.lastMessage,
                        lastTime: newUser.lastTime,
                        lastDate: newUser.lastDate,
                        properDate: newUser.lastDate
                          ? new Date(newUser.properDate)
                          : null,
                        unreadMessageCount: newUser.unreadMessageCount,
                      });
                      // this.setState({
                      //   allUsers: users.sort(
                      //     (a, b) => b.properDate - a.properDate
                      //   ),
                      //   isRefreshing: false,
                      //   loader: false,
                      // });
                      // this.onRefresh()
                    });

                    return resolve(users);
                  }
                });
              }
            }
          }).then(users => {
            // this.setState({
            //   allUsers: users.sort((a, b) => b.properDate - a.properDate),
            //   isRefreshing: false,
            //   loader: false,
            // });
          });
          // this.setState({ loader: false, isRefreshing: false });
        });
    } catch (error) {
      alert(error);
      // this.setState({ loader: false, isRefreshing: false });
    }
  };

  checkUnreadMessage = async (studentId, smuserId) => {
    let finalCount = 0;

    firebase
      .database()
      .ref('messages')
      .child(studentId)
      .child(smuserId)
      .orderByKey()
      .on('value', dataSnapshots => {
        let count = 0;

        if (dataSnapshots != null) {
          if (dataSnapshots.val()) {
            dataSnapshots.forEach(child => {
              if (
                !child.val()?.messege?.read &&
                child.val()?.messege?.reciever == smuserId
              ) {
                count++;
              }
            });
          }
        }

        finalCount = count;
      });

    setFinalMessageCount(finalCount);
    setTimeout(() => {
      setFinalMessageCount(finalCount);
    }, 500);
  };

  const getRecentBatches = smId => {
    axios
      .get(`${BASE_URL}app_mathbox/recent_batches?sm_id=${smId}`)
      .then(res => {
        setDefaultBatchData(res.data.batch_data);
      });
  };

  const callBackToTurnOffPendingMessageIcon = () => {
    setNumberOfChatsPending(false);
  };

  //   var data = JSON.stringify({
  //     to: "db5vvku2qEcViSuLJnbanl:APA91bGoUJ4d3ViZ1QB5O_xpiJWShuzUGWu8crln_YX_1GH9JZc6w1SLpO54I8euhgkNrzFEnUXk2GE18FyopTgAoSoP49A58MrRcvdypXzEszOR9Cw0kPcAL1QFj4uszNE0LeB9lfdx",
  //     notification: {
  //       body: "Coach Response",
  //       title: "beGalileo",
  //     },
  //   });
  //   await AxiosConfig(data)
  //     .then((res) => {
  //       console.log("Response of not", res.data);
  //     })
  //     .catch((err) => {
  //       console.log("error of not", err);
  //     });
  // };
  // const AxiosConfig = async (data) => {
  //   let config = {
  //     method: "post",
  //     url: "https://fcm.googleapis.com/fcm/send",
  //     headers: {
  //       Authorization: `key=AAAAoiIdwtI:APA91bHBTNjuIFZKrHGyJ2GT9eRZCuU9X63-E-AR4f_KTfEcGSJ9o-AVBGF8ojuJ9P1RSFEIItuOPALlMazanwbQTURclL40834_vUhG77floTwy5vj6Mu-PZ_6FoF2WvmToyxd20_Yg`,
  //       "Content-Type": "application/json",
  //     },

  //     data: data,
  //   };
  //   return axios(config);
  // };
  return (
    <SafeAreaView style={{height: '100%', backgroundColor: '#E0E3E5'}}>
      {loading && (
        <ActivityIndicator
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
          size="large"
          color="black"
        />
      )}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          alignSelf: 'center',
          padding: 15,
          backgroundColor: '#3E73A7',
          height: 70,
          alignItems: 'center',

          paddingHorizontal: 30,
        }}>
        <View
          style={{
            width: '50%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => handleShowSearch('Search Students')}>
            <Text
              style={{
                fontWeight:
                  showSearchState == 'Search Students' ? 'bold' : '300',
                color: '#DADDE0',
              }}>
              Search Students
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '50%',

            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={() => handleShowSearch('My Chats')}>
            <Text
              style={{
                fontWeight: showSearchState == 'My Chats' ? 'bold' : '300',
                color: '#DADDE0',
              }}>
              My Chats
            </Text>
          </TouchableOpacity>
          {numberOfChatsPending && (
            <View
              style={{
                height: 6,
                width: 6,
                borderRadius: 5,
                backgroundColor: 'red',
                marginLeft: 10,
              }}></View>
          )}
        </View>
      </View>
      {showSearchState == 'Search Students' && (
        <View>
          <View>
            <TextInput
              onFocus={() => onFocusEvent()}
              onBlur={() => onBlurEvent()}
              onChangeText={e => setStudentName(e)}
              placeholder="Search by Student Name"
              style={[styles.textinput]}
            />
            <TextInput
              onFocus={() => onFocusEvent()}
              onBlur={() => onBlurEvent()}
              onChangeText={e => setTeachersName(e)}
              placeholder="Search by Teacher Name"
              style={[styles.textinput]}
            />
            <TextInput
              onFocus={() => onFocusEvent()}
              onBlur={() => onBlurEvent()}
              onChangeText={e => setBatchId(e)}
              placeholder="Search by Batch ID"
              style={[styles.textinput]}
            />
            <TextInput
              onFocus={() => onFocusEvent()}
              onBlur={() => onBlurEvent()}
              onChangeText={e => setParentEmail(e)}
              placeholder="Search by Parent Email"
              style={[styles.textinput]}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',

              alignItems: 'center',
              width: '80%',

              alignSelf: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setDefaultBatchDetailsState(true);
                    setSearchResponseShow(false);
                    setLoading(false);
                  }, 60);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',

                  marginTop: 10,
                  alignSelf: 'center',
                  borderRadius: 5,
                  padding: 10,
                  backgroundColor: '#F7816C',
                }}>
                <Text style={{color: '#DADDE0'}}>Reset</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => gettingSmDetails()}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',

                  marginTop: 10,
                  alignSelf: 'center',
                  borderRadius: 5,
                  padding: 10,
                  backgroundColor: '#3E73A7',
                }}>
                <Text style={{color: '#DADDE0'}}>Search</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            {!loading && searchResponseShow && (
              <SmTable
                navigation={navigation}
                searchResponse={searchResponse}
              />
            )}
          </View>
          <View>
            {!loading && defaultBatchDetailsState && (
              <SmTable
                navigation={navigation}
                searchResponse={defaultBatchData}
              />
            )}
          </View>
        </View>
      )}
      {showSearchState == 'My Chats' && (
        <ChatDashBoard
          defaultBatchData={defaultBatchData}
          setNumberOfChatsPending={setNumberOfChatsPending}
          navigation={navigation}
          callBackToTurnOffPendingMessageIcon={
            callBackToTurnOffPendingMessageIcon
          }
        />
      )}
      <TouchableOpacity
        onPress={() => logOut()}
        style={{
          position: 'absolute',
          bottom: 10,
          alignSelf: 'flex-end',
          left: 20,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icons color="red" name="logout" size={30} />
        <Text
          style={{
            fontFamily: Constants.Montserrat_Regular,
            fontSize: 10,
            color: 'red',
          }}>
          LogOut
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textinput: {
    borderWidth: 1,
    padding: 5,
    width: '80%',

    borderRadius: 5,
    margin: 5,
    alignSelf: 'center',
    height: 40,
  },
});
