import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import * as Constants from '../../../../components/helpers/Constants';
import AppHeader from '../Components/AppHeader';
import axios from 'axios';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {SendMessage, RecieveMessage} from '../Firebase/Message';
import firebase from '../Firebase/firebaseConfig';
import ImgToBase64 from 'react-native-image-base64';
import {launchImageLibrary} from 'react-native-image-picker';
import {getLocalData} from '../../../../components/helpers/AsyncMethods';
import {BASE_URL} from '../../../../config/configs';
import {EventRegister} from 'react-native-event-listeners';
import {getParamNavigationV5} from '../../../../components/helpers/navigationV5Data';
class Chat extends Component {
  constructor(props) {
    super(props);
    this.databaseRef = null; // Initialize the reference
    this.dataSnapshotListener = null; //

    this.state = {
      message: '',
      guestUid: '',
      currentUid: '',
      allMessages: [],
      image: '',
      keyboardHeight: 0,
      doNotMountEvent: true,
      fcmToken: '',
      senderName: '',
      keyboardVerticalOffset: 0,
    };
  }

  getLocalSmData = async () => {
    let id = await getLocalData(Constants.SM_user_id);

    return id;
  };

  getAllChatHistory = (currentUid, guestUid) => {
    try {
      this.databaseRef = firebase
        .database()
        .ref('messages')
        .child(guestUid)
        .child(currentUid);

      this.dataSnapshotListener = this.databaseRef.on('value', dataSnapshot => {
        let data = dataSnapshot.val();

        if (data != null) {
          const keys = Object.keys(data);
          this.updatingData(guestUid, currentUid, keys);
        }
        let message = [];
        dataSnapshot.forEach(data => {
          message.push({
            sendBy: data.val().messege.sender,
            recieveBy: data.val().messege.reciever,
            msg: data.val().messege.msg,
            image: data.val().messege.image,
            date: data.val().messege.date,
            time: data.val().messege.time,
          });
        });

        this.setState({allMessages: message.reverse()});
      });
    } catch (error) {
      console.log('error', error);
      // alert(error.message);
    }
  };

  updatingData = (guestUid, currentUid, data) => {
    for (let i = 0; i < data.length; i++) {
      firebase
        .database()
        .ref('messages')
        .child(guestUid) //72422 // sm
        .child(currentUid) // sm // 72422
        .child(data[i])
        .child('messege')
        .update({read: true})
        .then(() => {});
    }
  };

  async componentDidMount() {
    console.log('chat screen mount');

    EventRegister.emit('chatScreenMouted', true);

    let currentUid;

    if (getParamNavigationV5(this.props, 'currentUid', null) != undefined) {
      currentUid = getParamNavigationV5(this.props, 'currentUid', null);
    } else {
      currentUid = await this.getLocalSmData();
    }

    // const guestUid = this.props?.navigation?.state?.params?.guestUid;
    const guestUid = getParamNavigationV5(this.props, 'guestUid', null);

    this.setState({currentUid: currentUid, guestUid: guestUid});
    this.getAllChatHistory(currentUid, guestUid);
    firebase
      .database()
      .ref('fcmTokens')
      .on('value', async dataSnapshot => {
        if (dataSnapshot != null) {
          dataSnapshot.forEach(child => {
            if (
              child.val().UserId ==
              this.props?.navigation?.state?.params?.fcmTokenId
            ) {
              this.setState({
                fcmToken: child.val().fcmToken,
              });
            }
          });
        }
      });
  }

  componentWillUnmount() {
    this.setState({
      doNotMountEvent: true,
    });

    if (this.dataSnapshotListener) {
      this.databaseRef.off('value', this.dataSnapshotListener);
    }
    EventRegister.emit('chatScreenMouted', false);
  }

  openGallery() {
    launchImageLibrary('photo', response => {
      if (!response.didCancel) {
        ImgToBase64.getBase64String(response.assets[0].uri)
          .then(async base64String => {
            let source = 'data:image/jpeg;base64,' + base64String;

            SendMessage(
              this.state.currentUid,
              this.state.guestUid,
              '',
              source,
              false,
            )
              .then(res => {
                this.setState({loader: false});
              })
              .catch(err => {
                console.log(err);
              });

            RecieveMessage(
              this.state.currentUid,
              this.state.guestUid,
              '',
              source,
            )
              .then(res => {
                this.setState({loader: false});
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => this.setState({loader: false}));
      }
    });
  }
  sendingNotifications = async message => {
    var data = JSON.stringify({
      to: this.state.fcmToken,
      notification: {
        body: message,
        title: `Message from ${this.props?.navigation?.state?.params?.currentUserName}`,
      },
      data: {
        student_id: this.props?.navigation?.state?.params?.guestUid,
        type: 'ChatNotifications',
        sm_id: this.state.currentUid,
        sm_name: this.props?.navigation?.state?.params?.currentUserName,
        priority: 'high',
      },
    });
    await this.AxiosConfig(data)
      .then(res => {
        console.log('res oj notifications', res.data);
      })
      .catch(function (error) {
        console.log(error, 'error from api');
      });
  };
  AxiosConfig = async data => {
    let config = {
      method: 'post',
      url: 'https://fcm.googleapis.com/fcm/send',
      headers: {
        Authorization: `key=AAAACwfnqCY:APA91bFZJVZ1yc3VjD3wDsud8DBz6WOmF3qPQPEDymrRpyqI1IXKZ81wNG50XSS-1mj2jQq7OqjgN1IYdGTPdrsWJCi4uM-qBaO9gb5C9Hjv2nOePrnpAY099aj_EIm_8Yyxm5g38IY-`,
        'Content-Type': 'application/json',
      },

      data: data,
    };
    return axios(config);
  };
  sendMessage = async () => {
    if (this.state.message) {
      SendMessage(
        this.state.currentUid,
        this.state.guestUid,
        this.state.message,
        '',
        false,
      )
        .then(res => {
          this.sendingNotifications(this.state.message);
          this.setState({message: ''});
        })
        .catch(err => {
          alert(err);
        });

      RecieveMessage(
        this.state.currentUid,
        this.state.guestUid,
        this.state.message,
        '',
      )
        .then(res => {
          this.setState({message: ''});
        })
        .catch(err => {
          alert(err);
        });
    }
  };

  render() {
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 20 : 0;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={keyboardVerticalOffset}>
          <View style={{flex: 1, backgroundColor: '#F6F9FA'}}>
            <AppHeader
              role={this.props?.navigation?.state?.params?.role}
              title={this.props?.navigation?.state?.params?.UserName}
              navigation={this.props?.navigation}
            />

            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              inverted
              style={{marginBottom: 70, borderColor: 'white', padding: 5}}
              data={this.state.allMessages}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item}) => (
                <View
                  style={{
                    marginVertical: 5,
                    maxWidth: Dimensions.get('window').width / 2 + 10,

                    alignSelf:
                      this.state.currentUid === item.sendBy
                        ? 'flex-end'
                        : 'flex-start',

                    width: '100%',
                  }}>
                  <View
                    style={{
                      backgroundColor:
                        this.state.currentUid === item.sendBy
                          ? '#EBF0F1'
                          : '#86CD7F',
                      borderBottomRightRadius: 20,
                      borderBottomLeftRadius: 20,

                      padding: 20,
                      borderTopLeftRadius:
                        this.state.currentUid === item.sendBy ? 20 : 0,
                      borderTopRightRadius:
                        this.state.currentUid === item.sendBy ? 0 : 20,
                      width: '100%',
                    }}>
                    {item.image === '' ? (
                      <View>
                        <Text
                          style={{
                            fontSize: 16,

                            color: '#566573',
                            fontFamily: Constants.Montserrat_Semi_Bold,
                            padding: 5,
                          }}>
                          {item.msg}
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            color:
                              this.state.currentUid === item.sendBy &&
                              item.image == ''
                                ? '#ABB2B9'
                                : '#A9A9A9',
                            alignSelf: 'flex-end',
                          }}>
                          {item.time}
                        </Text>
                      </View>
                    ) : (
                      <View>
                        <Image
                          source={{uri: item.image}}
                          style={{
                            width: '100%',
                            height: 100,
                            borderRadius: 5,
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 10,
                            color:
                              this.state.currentUid === item.sendBy
                                ? '#ABB2B9'
                                : '#A9A9A9',
                            alignSelf: 'flex-end',
                          }}>
                          {item.time}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              )}
            />

            <View
              style={{
                bottom: 5,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                borderWidth: 1,
                width: '95%',
                alignSelf: 'center',

                borderBottomLeftRadius: 30,

                borderTopLeftRadius: 30,
                borderBottomRightRadius: 30,
                borderColor: 'lightgray',
                paddingHorizontal: 20,
              }}>
              <TouchableOpacity
                style={{
                  width: '10%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 5,
                }}
                onPress={() => this.openGallery()}>
                <Icons name="camera" size={30} color="black" />
              </TouchableOpacity>
              <View style={{width: '75%', justifyContent: 'center'}}>
                <TextInput
                  style={{height: 60}}
                  value={this.state.message}
                  onChangeText={text => this.setState({message: text})}
                  placeholder="Type Your Message Here"
                  placeholderTextColor="#ABB2B9"
                />
              </View>
              <TouchableOpacity
                style={{
                  width: '20%',

                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 5,

                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,

                  borderTopLeftRadius: 20,
                  padding: 10,
                  backgroundColor: '#3B71F7',
                }}
                onPress={() => this.sendMessage()}>
                <Icons name="send" size={25} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

export default Chat;
