import React, {Component} from 'react';
import Icons from 'react-native-vector-icons/AntDesign';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';
import * as Constants from '../../../../components/helpers/Constants';

import firebase from '../Firebase/firebaseConfig';

// import Spinner from 'react-native-loading-spinner-overlay';
import AppHeader from '../Components/AppHeader';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {UpdateUserImage} from '../Firebase/Users';
// import ImgToBase64 from 'react-native-image-base64';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import Entypo from 'react-native-vector-icons/Entypo';
import {getLocalData} from '../../../../components/helpers/AsyncMethods';
import {EventRegister} from 'react-native-event-listeners';
import {BASE_URL} from '../../../../config/configs';
class ChatDashBoard extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.refreshListener = null;
    this.state = {
      allUsers: [],
      loader: false,
      imageUrl: '',
      loggedInUserName: '',
      authUser: false,
      modalVisible: false,
      userAddEmail: '',
      isRefreshing: false,
      smUuid: null,
      searchStudent: '',
      unReadFireabaseMessageCount: 0,
      refreshState: false,
      refreshFlatList: true,
      callOneTime: true,
      fcmToken: '',
      allStudentsData: [],
    };
  }

  componentDidMount() {
    this.props.callBackToTurnOffPendingMessageIcon();

    this.refreshListener = () => {
      this.onRefresh();
    };
    this.setState({allStudentsData: this.props.defaultBatchData});

    EventRegister.addEventListener(
      'refreshSmDashboardScreen',
      this.refreshListener,
    );

    this._isMounted = true;
    getLocalData(Constants.SM_email).then(res => {
      let email = res.trim().split('');
      email.shift();
      email.pop();

      firebase
        .auth()
        .signInWithEmailAndPassword(email.join(''), email.join(''))
        .then(async data => {
          this.mainScreen();
        })
        .catch(err => {
          console.log('error while login in firebase', err);
        });
    });
  }

  customfn = () => {
    this.setState({
      callOneTime: false,
    });

    this.mainScreen();

    setTimeout(() => {
      this.setState({
        callOneTime: true,
      });
    }, 3000);
  };

  componentWillUnmount() {
    this._isMounted = false;
    EventRegister.removeEventListener(
      'refreshSmDashboardScreen',
      this.refreshListener,
    );
  }
  onRefresh = () => {
    this.setState({isRefreshing: true});
    this.mainScreen();
  };
  searchStudentFuntion = student => {
    if (student != undefined) {
      const re = RegExp(
        `.*${student.toString().toLowerCase().split('').join('.*')}.*`,
      );
      const matches = this.state.allUsers.filter(v =>
        v.userName.toString().toLowerCase().match(re),
      );
      this.setState({
        filterUser: true,
        filterUserList: matches,
      });
    }

    return this.state.allUsers;
  };
  checkUnreadMessage = async studentId => {
    let smuserId = await getLocalData(Constants.SM_user_id);
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

    this.setState({unReadFireabaseMessageCount: finalCount});

    if (finalCount > 0) {
      this.props.setNumberOfChatsPending(true);
    } else {
      this.props.setNumberOfChatsPending(false);
    }
    return finalCount;
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.unReadFireabaseMessageCount !=
      this.state.unReadFireabaseMessageCount
    ) {
      if (this.state.callOneTime) {
        this.customfn();
      }
    }
  }

  mainScreen = async () => {
    try {
      // this.setState({ loader: true });
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
                    this.setState({
                      loggedInUserName: child.val().name,
                      imageUrl: child.val().image,
                    });
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
                              await this.checkUnreadMessage(
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
                      this.setState({
                        allUsers: users.sort(
                          (a, b) => b.properDate - a.properDate,
                        ),
                        isRefreshing: false,
                        loader: false,
                      });
                    });

                    return resolve(users);
                  }
                });
              }
            }
            this.setState({loader: false});
          }).then(users => {
            this.setState({
              allUsers: users.sort((a, b) => b.properDate - a.properDate),
              isRefreshing: false,
              loader: false,
            });
          });

          this.setState({loader: false, isRefreshing: false});
        });
    } catch (error) {
      alert(error);
      this.setState({loader: false, isRefreshing: false});
    }
  };
  // gettingParentId = (studentName) => {
  // let resultData=  getLocalData(Constants.SM_user_id).then((res) => {
  //     axios
  //       .get(
  //         `${BASE_URL}app_mathbox/batch_list?user_id=${Number(
  //           res
  //         )}&teacher_name=""&batch_id=""&parent_email=""&student_name=${studentName}`
  //       )
  //       .then((res) => {
  //         if (res.data.status) {
  //           // console.log("res of getting id", JSON.stringify(res.data));
  //           return res.data

  //         } else if (!res.data.status) {
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error.message, "error");
  //       });
  //   });
  //   return resultData
  // };
  fetchData = async studentName => {
    try {
      const res = await getLocalData(Constants.SM_user_id);

      const response = await axios.get(
        `${BASE_URL}app_mathbox/batch_list?user_id=${Number(
          res,
        )}&teacher_name=""&batch_id=""&parent_email=""&student_name=${studentName}`,
      );

      if (response.data.status) {
        return response.data;
      } else {
        // Handle the case where the status is not as expected
        return null;
      }
    } catch (error) {
      console.log(error.message, 'error');
      throw error; // Rethrow the error for further handling
    }
  };

  getParentIdFromUsersTableFirebase = item => {
    return new Promise((resolve, reject) => {
      try {
        firebase
          .database()
          .ref('users')
          .child(item.UserId)
          .orderByKey()
          .on('value', datasnapshot => {
            let data = datasnapshot.val();
            const parentId = data.parent_id;
            resolve(parentId);
          });
      } catch (error) {
        reject(error);
      }
    });
  };

  makingReadMessageToFalse = async (UserName, guestUid, item) => {
    let parentId = await this.getParentIdFromUsersTableFirebase(item);
    if (parentId != undefined) {
      this.props.navigation.navigate(Constants.ChatScreen, {
        UserName: UserName,
        guestUid: guestUid,
        fcmTokenId: parentId,
        currentUserName: this.state.loggedInUserName,
        role: 'SM Manager',
      });
    } else {
      this.props.navigation.navigate(Constants.ChatScreen, {
        UserName: UserName,
        guestUid: guestUid,
        fcmTokenId: null,
        currentUserName: this.state.loggedInUserName,
        role: 'SM Manager',
      });
    }
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
        <AppHeader
          title="Messages"
          navigation={this.props.navigation}
          onPress={() => this.logOut()}
        />

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'white',
            height: 50,
            borderRadius: 50,
            margin: 10,
            alignItems: 'center',
            paddingLeft: 15,
            width: '95%',
            alignSelf: 'center',
          }}>
          <Icons
            style={{marginRight: 20}}
            name="search1"
            color="green"
            size={20}
          />
          <TextInput
            onChangeText={e => this.searchStudentFuntion(e)}
            placeholder="Search Student"
            placeholderTextColor="lightgray"
            style={{
              width: '90%',
              height: '100%',
              fontFamily: Constants.Montserrat_Regular,
            }}
          />
        </View>
        {this.state.loader && <ActivityIndicator color="white" size={30} />}
        {this.state.refreshFlatList && (
          <FlatList
            onRefresh={this.onRefresh}
            refreshing={this.state.isRefreshing}
            alwaysBounceVertical={false}
            data={
              this.state.filterUser
                ? this.state.filterUserList
                : this.state.allUsers
            }
            style={{padding: 5}}
            keyExtractor={(_, index) => index.toString()}
            ListHeaderComponent={
              <View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 20,
                      marginTop: 10,
                      fontWeight: 'bold',
                    }}>
                    {this.state.loggedInUserName}
                  </Text>
                </View>
              </View>
            }
            renderItem={({item}) =>
              item.lastMessage.length != 0 && (
                <View>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      marginBottom: 20,
                      marginTop: 20,
                    }}
                    onPress={() =>
                      this.makingReadMessageToFalse(
                        item.userName,
                        item.UserId,
                        item,
                      )
                    }>
                    <View
                      style={{
                        width: '15%',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={{
                          uri:
                            item.imageUrl === ''
                              ? 'https://banner2.cleanpng.com/20180625/req/kisspng-computer-icons-avatar-business-computer-software-user-avatar-5b3097fcae25c3.3909949015299112927133.jpg'
                              : item.imageUrl,
                        }}
                        style={{height: 50, width: 50, borderRadius: 25}}
                      />
                    </View>
                    <View
                      style={{
                        width: '65%',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        marginLeft: 10,
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 16,
                          fontWeight: 'bold',
                        }}>
                        {item.userName}
                      </Text>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 12,
                          fontFamily:
                            item.unreadMessageCount > 0
                              ? Constants.Montserrat_Bold
                              : Constants.Montserrat_Regular,
                        }}>
                        {item.lastMessage}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '20%',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        marginRight: 20,
                      }}>
                      {item.unreadMessageCount > 0 && (
                        <View
                          style={{
                            backgroundColor: 'white',
                            height: 25,
                            width: 25,
                            marginBottom: 5,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 13,
                          }}>
                          <Text>{item.unreadMessageCount}</Text>
                        </View>
                      )}
                      <Text
                        style={{
                          color: 'gray',
                          fontSize: 13,
                          fontWeight: '400',
                        }}>
                        {item.lastTime}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{borderWidth: 0.5, borderColor: '#fff'}} />
                </View>
              )
            }
          />
        )}
        {/* <Spinner visible={this.state.loader} /> */}
      </SafeAreaView>
    );
  }
}

export default ChatDashBoard;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    height: 200,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
