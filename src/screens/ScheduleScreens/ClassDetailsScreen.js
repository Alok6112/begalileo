import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {connect} from 'react-redux';
import * as Constants from '../../components/helpers/Constants';
import {COLOR, CommonStyles} from '../../config/styles';
import {
  IC_HOMEWORK,
  IC_DOWN_ENTER,
  IC_UP_ENTER,
  IC_CLOSE_BLUE,
  ICON_PDF,
} from '../../assets/images';
import {uploadWorkBook} from '../../actions/dashboard';
import LinearGradient from 'react-native-linear-gradient';
import {addToCart} from '../../actions/dashboard';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  cancelClass,
  geteUpcomingRescheduleSlots,
  doUpdateRescheduleClass,
} from '../../actions/dashboard';
import {normalize, Card} from 'react-native-elements';
import {CustomBackButton} from '../../components';
import CustomGradientButton from '../../components/CustomGradientButton';
import RadioForm, {
  RadioButtonInput,
  RadioButton,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {
  checkClassValidityBeforeCancel,
  checkCurrentTimeIsValidToPeak,
  getDisplayTimeHours,
  secondsToHms,
  timeInHourFormat,
} from '../../components/helpers';
import {launchImageLibrary} from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import ComponentReschedule from '../../components/ComponentReschedule';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {getParamNavigationV5} from '../../components/helpers/navigationV5Data';
const workBookStatusPrefix = 'workbook_status_';

const options = {
  title: 'Select Avatar',
  multiple: false,
  maxWidth: 300,
  maxHeight: 300,
  quality: 0.5,
  customButtons: [{name: 'Workbook', title: 'Choose Photo from Gallery'}],

  cropping: true,
  includeBase64: true,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class ClassDetailsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classType: '',
      classData: {},
      mMathConcept: false,
      mThinkNReason: false,
      mworkBook: false,
      workBookUpload: [],
      rescheduleVisible: false,
      mWorkBookStatus: null,
      mSelectedWorkBookImage: null,
      mShowUploadChoice: false,
      mSelectedItem: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.classCancelResponse != this.props.classCancelResponse) {
      if (
        this.props.classCancelResponse &&
        this.props.classCancelResponse.status
      ) {
        this.props.navigation.goBack();
      }
    }

    if (prevProps.rescheduleSlotStatus != this.props.rescheduleSlotStatus) {
      if (this.props.rescheduleSlotStatus != null) {
        if (this.props.rescheduleSlotStatus) {
          this.showRescheduleSlots();
        } else {
          showMessage({
            message: this.props.rescheduleSlotResponse.message,
            type: 'danger',
          });
        }
      }
    }

    if (
      prevProps.rescheduleUpcomingStatus != this.props.rescheduleUpcomingStatus
    ) {
      if (this.props.rescheduleUpcomingStatus != null) {
        if (this.props.rescheduleUpcomingStatus) {
          this.closeRescheduleClass();
          this.onPressBack();
        } else {
          showMessage({
            message: this.props.rescheduleUpcomingResponse.message,
            type: 'danger',
          });
        }
      }
    }
  }

  componentDidMount() {
    const {navigation} = this.props;

    var classType = getParamNavigationV5(this.props, 'classType', '');
    var classData = getParamNavigationV5(this.props, 'classData', '');
    this.setState({
      classType: classType,
      classData: classData,
    });
  }

  onPressBack = () => {
    const {goBack} = this.props.navigation;

    goBack();
  };

  showAssignedHomeWork = homeWorkData => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: normalize(40),
            alignContent: 'center',
          }}>
          <Image
            style={{
              height: normalize(15),
              width: normalize(15),
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
            source={IC_HOMEWORK}
          />
          <Text
            style={[
              CommonStyles.text_14_semi_bold,
              {alignSelf: 'center', marginStart: normalize(16)},
            ]}>
            Assigned Homework
          </Text>
        </View>
        <View style={{marginTop: normalize(30)}}>
          {homeWorkData.math_zone_data.length > 0 &&
            this.showMathConcept(homeWorkData.math_zone_data)}
          {/* <View
            style={{
              marginTop: normalize(20),
              marginBottom: normalize(20),
              backgroundColor: COLOR.BORDER_COLOR_GREY,
              height: 1,
            }}
          />
          {this.showThinkNReasonConcept(homeWorkData.logic_zone_data)} */}
          <View
            style={{
              marginTop: normalize(20),
              marginBottom: normalize(20),
              backgroundColor: COLOR.BORDER_COLOR_GREY,
              height: 1,
            }}
          />
          {this.showWorkBook(homeWorkData.workbook_data)}
        </View>
      </View>
    );
  };

  onClickAssignedHomeWork = tag => {
    console.log('Work tag', tag);
    if (tag == 0) {
      this.setState(prevState => ({
        mMathConcept: !prevState.mMathConcept,
      }));
    }
    if (tag == 1) {
      this.setState(prevState => ({
        mThinkNReason: !prevState.mThinkNReason,
      }));
    }
    if (tag == 2) {
      console.log('Work Book ', this.state.mworkBook);
      this.setState(prevState => ({
        mworkBook: !prevState.mworkBook,
      }));
    }
  };

  getHomeWorkProgress = data => {
    if (data == 'Completed')
      return (
        <Text
          style={[
            CommonStyles.text_9_bold,
            {
              color: COLOR.TEXT_COLOR_GREEN,
              backgroundColor: COLOR.COMPLETED_GREEN,
              paddingHorizontal: normalize(8),
              overflow: 'hidden',
              borderRadius: 10,
            },
          ]}>
          {data}
        </Text>
      );
    else if (data == 'In Progress')
      return (
        <Text
          style={[
            CommonStyles.text_9_bold,
            {
              color: COLOR.ORANGE,
              backgroundColor: COLOR.INPROGRESS_YELLOW,
              paddingHorizontal: normalize(8),
              overflow: 'hidden',
              borderRadius: 10,
            },
          ]}>
          {data}
        </Text>
      );
    else
      return (
        <Text
          style={[
            CommonStyles.text_9_bold,
            {
              paddingHorizontal: normalize(8),
              overflow: 'hidden',
              borderRadius: 10,
            },
          ]}>
          {data}
        </Text>
      );
  };

  showMathConcept = mathData => {
    const {mMathConcept} = this.state;

    return (
      <View>
        <TouchableOpacity
          onPress={() => this.onClickAssignedHomeWork(0)}
          style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[CommonStyles.text_12_bold]}>Math Concept</Text>
          <Image
            style={{
              height: normalize(10),
              width: normalize(10),
              marginStart: normalize(20),
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
            source={mMathConcept ? IC_UP_ENTER : IC_DOWN_ENTER}
          />
        </TouchableOpacity>
        {mMathConcept && (
          <View>
            {mathData.map(item => {
              return (
                <View style={{marginTop: normalize(20)}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={[CommonStyles.text_11_bold]}>
                      {item.topic_name}
                    </Text>
                    {this.getHomeWorkProgress(item.status)}
                  </View>
                  <Text style={[CommonStyles.text_12_Regular]}>
                    {item.sub_topic_name}
                  </Text>
                  <Text style={[CommonStyles.text_9_semi_bold]}>
                    Due Date : {item.due_date}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
      </View>
    );
  };

  showThinkNReasonConcept = thinkReasonData => {
    const {mThinkNReason} = this.state;
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.onClickAssignedHomeWork(1)}
          style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[CommonStyles.text_12_bold]}>Think and Reason</Text>

          <Image
            style={{
              height: normalize(10),
              width: normalize(10),
              marginStart: normalize(20),
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
            source={mThinkNReason ? IC_UP_ENTER : IC_DOWN_ENTER}
          />
        </TouchableOpacity>
        {mThinkNReason && (
          <View>
            {mThinkNReason.length ? (
              thinkReasonData.map(item => {
                return (
                  <View style={{marginTop: normalize(20)}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={[CommonStyles.text_11_bold]}>
                        {item.topic_name}
                      </Text>
                      {this.getHomeWorkProgress(item.status)}
                    </View>
                    <Text style={[CommonStyles.text_12_Regular]}>
                      {item.sub_topic_name}
                    </Text>
                    <Text style={[CommonStyles.text_9_semi_bold]}>
                      Due Date : {item.due_date}
                    </Text>
                  </View>
                );
              })
            ) : (
              <Text style={[CommonStyles.text_12_Regular, {margin: 5}]}>
                Homework not assigned
              </Text>
            )}
          </View>
        )}
      </View>
    );
  };

  onPressWorkBookRadio = (topicId, index) => {
    this.setState({
      [workBookStatusPrefix + topicId]:
        workBookStatusPrefix + topicId + '_' + index,
    });
  };

  showImagePopUp = item => {
    console.log('Image Clicked');
    console.log(item);
    this.setState({
      mSelectedWorkBookImage: item,
    });
  };

  showWorkBook = workBookData => {
    const {mworkBook, workBookUpload, mSelectedWorkBookImage} = this.state;
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.onClickAssignedHomeWork(2)}
          style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[CommonStyles.text_12_bold]}>Workbook</Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                CommonStyles.text_9_bold,
                {
                  color: COLOR.TEXT_ALPHA_GREY,
                  paddingHorizontal: normalize(8),
                  overflow: 'hidden',
                  borderRadius: 10,
                },
              ]}>
              Update Status
            </Text>
            <Image
              style={{
                height: normalize(10),
                width: normalize(10),
                marginStart: normalize(20),
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
              source={mworkBook ? IC_UP_ENTER : IC_DOWN_ENTER}
            />
          </View>
        </TouchableOpacity>
        {mworkBook && (
          <View>
            {workBookData.length < 1 && (
              <View>
                <Text style={[CommonStyles.text_12_Regular, {margin: 5}]}>
                  Workbook not assigned
                </Text>
              </View>
            )}

            {workBookData.map(item => {
              if (item.teacher_uploaded) {
                return (
                  <View>
                    <Text style={[CommonStyles.text_11_Regular, {margin: 10}]}>
                      Homework uploaded
                    </Text>
                  </View>
                );
              }
              var radio_props = [
                {label: 'Not Started', value: 0},
                {label: 'In Progress', value: 1},
                {label: 'Completed', value: 2},
              ];
              return (
                <View>
                  <View style={{marginTop: normalize(20)}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={[CommonStyles.text_11_bold]}>
                        {item.name}
                      </Text>
                      {/* {
                                                    this.getHomeWorkProgress(item.status)
                                                } */}
                    </View>
                    {/* <Text style={[CommonStyles.text_12_Regular]}>{item.sub_topic_name}</Text> */}
                    <Text style={[CommonStyles.text_9_semi_bold]}>
                      Due Date : {item.due_date}
                    </Text>
                  </View>

                  {/* <View style={{ marginBottom: normalize(20) }}>
                    <Text
                      style={[
                        CommonStyles.text_11_bold,
                        { color: COLOR.BLACK, marginTop: normalize(20) },
                      ]}
                    >
                      Update Status
                    </Text>
                    <RadioForm animation={true}>
                      {radio_props.map((obj, i) => (
                        <View>
                         
                          <RadioButton labelHorizontal={true} key={i}>
                           
                            <RadioButtonInput
                              obj={obj}
                              index={i}
                              isSelected={
                                this.state[
                                  workBookStatusPrefix + item.sub_topic_id
                                ] ==
                                workBookStatusPrefix +
                                  item.sub_topic_id +
                                  "_" +
                                  i
                              }
                              onPress={() => {
                                this.onPressWorkBookRadio(item.sub_topic_id, i);
                              }}
                              borderWidth={1}
                              buttonInnerColor={COLOR.TEXT_COLOR_GREEN}
                              buttonOuterColor={
                                this.state.value3Index === i
                                  ? "#2196f3"
                                  : "#000"
                              }
                              buttonSize={10}
                              buttonOuterSize={20}
                              buttonStyle={{}}
                              buttonWrapStyle={{
                                marginLeft: 10,
                                marginTop: normalize(10),
                              }}
                            />

                            <RadioButtonLabel
                              obj={obj}
                              index={i}
                              labelHorizontal={true}
                              onPress={() => {
                                this.onPressWorkBookRadio(item.sub_topic_id, i);
                              }}
                              labelStyle={{
                                fontSize: normalize(12),
                                fontFamily: Constants.Montserrat_Regular,
                                color: COLOR.TEXT_COLOR_BLACK,
                              }}
                              labelWrapStyle={{ marginTop: normalize(10) }}
                            />
                          </RadioButton>
                        </View>
                      ))}
                    </RadioForm>
                    <View>
                      <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        style={{
                          flexDirection: "row",
                          marginVertical: normalize(10),
                        }}
                      >
                        {workBookUpload.map((book) => {
                          return (
                            <View>
                              <TouchableOpacity
                                onPress={() => this.showImagePopUp(book)}
                                style={{ margin: 5 }}
                              >
                                {book.isImage ? (
                                  <Image
                                    source={book.src}
                                    style={{
                                      height: 100,
                                      width: 100,
                                      borderRadius: 10,
                                    }}
                                  />
                                ) : (
                                  <Image
                                    source={ICON_PDF}
                                    style={{
                                      height: 100,
                                      width: 100,
                                      borderRadius: 10,
                                    }}
                                  />
                                )}
                              </TouchableOpacity>
                            </View>
                          );
                        })}
                      </ScrollView>

                      {this.state[workBookStatusPrefix + item.sub_topic_id] ==
                        workBookStatusPrefix + item.sub_topic_id + "_2" && (
                        <TouchableOpacity
                          onPress={() => this.onClickUploadWorkBook(item)}
                          style={{
                            flexWrap: "wrap",
                            marginVertical: normalize(10),
                          }}
                        >
                          <Text
                            style={[
                              CommonStyles.text_12_bold,
                              {
                                color: COLOR.WHITE,
                                backgroundColor: COLOR.TEXT_COLOR_GREEN,
                                justifyContent: "center",
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                borderRadius: 10,
                                overflow: "hidden",
                              },
                            ]}
                          >
                            Upload Workbook
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View> */}
                </View>
              );
            })}
          </View>
        )}
        {mSelectedWorkBookImage && (
          <Modal transparent={true}>
            <View
              style={{
                flex: 1,
                backgroundColor: COLOR.BG_ALPHA_BLACK,
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Image
                source={mSelectedWorkBookImage.src}
                style={{height: '70%', width: '100%', resizeMode: 'contain'}}
              />
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    mSelectedWorkBookImage: null,
                  });
                }}>
                <Text
                  style={[
                    CommonStyles.text_12_bold,
                    {
                      backgroundColor: COLOR.RED,
                      paddingHorizontal: 20,
                      paddingVertical: 10,
                      borderRadius: 20,
                      color: COLOR.WHITE,
                      marginVertical: normalize(10),
                      alignSelf: 'center',
                      overflow: 'hidden',
                    },
                  ]}>
                  Delete
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  marginTop: 30,
                  marginEnd: 30,
                  top: 0,
                  right: 0,
                }}
                onPress={() => {
                  this.setState({
                    mSelectedWorkBookImage: null,
                  });
                }}>
                <Image
                  source={IC_CLOSE_BLUE}
                  style={{height: 50, width: 50, resizeMode: 'cover'}}
                />
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </View>
    );
  };

  closeUploadChoice = () => {
    this.setState({
      mShowUploadChoice: false,
    });
  };

  selectPdfWorkBook = async () => {
    const now = Date.now();
    this.closeUploadChoice();
    const {mSelectedItem} = this.state;
    this.setState({
      mShowUploadChoice: false,
    });
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      console.log(
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
      const source = {uri: res.uri};

      var pdfItem = {
        id: mSelectedItem.homework_id,
        isImage: false,
        src: source,
      };
      var fileName = now + '_workbook' + '.pdf';
      this.props.uploadWorkBook(
        mSelectedItem.homework_id,
        source,
        'application/pdf',
        fileName,
      );

      this.setState({
        workBookUpload: [...this.state.workBookUpload, pdfItem],
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  selectImageWorkBook = () => {
    const now = Date.now();
    this.closeUploadChoice();
    const {mSelectedItem} = this.state;
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response);
        const source = {uri: response.assets[0].uri};

        var imageItem = {
          id: mSelectedItem.homework_id,
          isImage: true,
          src: source,
        };
        var fileName = now + '_image' + '.jpg';
        this.props.uploadWorkBook(
          mSelectedItem.homework_id,
          source,
          'image/jpeg',
          fileName,
        );

        this.setState({
          workBookUpload: [...this.state.workBookUpload, imageItem],
        });
      }
    });
  };

  onClickUploadWorkBook = async item => {
    this.setState(
      {
        mSelectedItem: item,
        mShowUploadChoice: true,
      },
      () => this.selectPdfWorkBook(),
    );
  };

  showPracticeDetails = (item, tag) => {
    if (item.length == 0)
      return (
        <View style={{margin: 20, alignItems: 'center'}}>
          <Text
            style={[
              CommonStyles.text_14_Regular,
              {color: COLOR.TEXT_ALPHA_GREY, marginStart: normalize(5)},
            ]}>
            {tag} Practice not done
          </Text>
        </View>
      );

    return (
      <View style={{marginTop: normalize(10)}}>
        <Text
          style={[CommonStyles.text_8_bold, {color: COLOR.TEXT_ALPHA_GREY}]}>
          {tag}
        </Text>
        {item.map(data => {
          return (
            <View>
              <Text style={[CommonStyles.text_14_bold]}>{data.tag_name}</Text>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: normalize(2),
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon
                    style={{marginStart: normalize(2)}}
                    size={15}
                    name="check"
                    color={COLOR.TEXT_COLOR_GREEN}
                  />
                  <Text
                    style={[
                      CommonStyles.text_12_Regular,
                      {
                        color: COLOR.TEXT_ALPHA_GREY,
                        marginStart: normalize(5),
                      },
                    ]}>
                    {data.correct}
                  </Text>
                  <Icon
                    style={{marginStart: normalize(8)}}
                    size={15}
                    name="times"
                    color={COLOR.RED}
                  />

                  <Text
                    style={[
                      CommonStyles.text_12_Regular,
                      {
                        color: COLOR.TEXT_ALPHA_GREY,
                        marginStart: normalize(5),
                      },
                    ]}>
                    {data.incorrect}
                  </Text>
                </View>

                <Text
                  style={[
                    CommonStyles.text_12_Regular,
                    {
                      color: COLOR.TEXT_ALPHA_GREY,
                      marginStart: normalize(10),
                    },
                  ]}>
                  {timeInHourFormat(data.timespent)}
                </Text>
              </View>
              <View
                style={{
                  height: 2,
                  marginVertical: normalize(12),
                  backgroundColor: COLOR.BORDER_COLOR_GREY,
                }}
              />
            </View>
          );
        })}
      </View>
    );
  };

  showUpcomingClassDetail = () => {
    return (
      <View style={{margin: normalize(10)}}>
        <TouchableOpacity onPress={this.onClickCancelClass}>
          <Text
            style={[
              CommonStyles.text_12_bold,
              {color: COLOR.TEXT_COLOR_GREEN, marginTop: normalize(20)},
            ]}>
            Cancel Class
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onClickRescheduleClass}>
          <Text
            style={[
              CommonStyles.text_12_bold,
              {color: COLOR.TEXT_COLOR_GREEN, marginTop: normalize(20)},
            ]}>
            Reschedule Class
          </Text>
        </TouchableOpacity>
        <View>
          <Text
            style={[
              CommonStyles.text_12_bold,
              {color: COLOR.TEXT_COLOR_BLACK, marginTop: normalize(40)},
            ]}>
            Things to note
          </Text>
          <Text
            style={[
              CommonStyles.text_12_regular,
              {color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(16)},
            ]}>
            Join the call at least a minute or two before the scheduled meeting
            time.
          </Text>
          <Text
            style={[
              CommonStyles.text_12_regular,
              {color: COLOR.TEXT_ALPHA_GREY, marginTop: normalize(16)},
            ]}>
            Have a designated note taker.
          </Text>
          {/* <Text
            style={[
              CommonStyles.text_12_regular,
              { color: COLOR.TEXT_COLOR_ORANGE, marginTop: normalize(16) },
            ]}
          >
            You can cancel the class before 24 hours of confirmed time.{" "}
          </Text> */}
        </View>
      </View>
    );
  };

  onCancelClassConfirmation = flag => {
    if (flag) {
      this.props.cancelClass(
        this.props.dashboardResponse.parent_id,
        this.state.classData.live_class_id,
        this.props.currentSelectedKid.student_id,
        'student_with_cancel',
      );
    } else {
      this.props.cancelClass(
        this.props.dashboardResponse.parent_id,
        this.state.classData.live_class_id,
        this.props.currentSelectedKid.student_id,
      );
    }
  };

  showRescheduleSlots = () => {
    this.setState({
      rescheduleVisible: true,
    });
  };

  updateRescheduleClass = (new_date, slot_id) => {
    this.props.doUpdateRescheduleClass(
      this.props.dashboardResponse.parent_id,
      this.props.currentSelectedKid.student_id,
      this.state.classData.live_class_id,
      new_date,
      slot_id,
    );
  };

  onRescheduleClassConfirmation = flag => {
    if (flag) {
      this.props.geteUpcomingRescheduleSlots(
        this.props.dashboardResponse.parent_id,
        this.props.currentSelectedKid.student_id,
        this.state.classData.live_class_id,
        'student_with_cancel',
      );
    } else {
      this.props.geteUpcomingRescheduleSlots(
        this.props.dashboardResponse.parent_id,
        this.props.currentSelectedKid.student_id,
        this.state.classData.live_class_id,
      );
    }
  };

  onClickCancelClass = () => {
    if (
      checkClassValidityBeforeCancel(
        this.state.classData.class_start_date,
        this.state.classData.time,
      )
    ) {
      Alert.alert(
        'Are you sure you want to cancel the class? Please note that if the cancellation is made within two hours of the class start time or after the class start time, 30 minutes will be deducted from your subscribed class hours.',
        '',
        [
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => this.onCancelClassConfirmation(true)},
        ],
        {cancelable: false},
      );

      console.log('Its true');
    } else {
      Alert.alert(
        'Are you sure want to cancel the class?',
        '',
        [
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => this.onCancelClassConfirmation(false)},
        ],
        {cancelable: false},
      );

      console.log('its false');
    }
  };

  onClickRescheduleClass = () => {
    if (
      checkClassValidityBeforeCancel(
        this.state.classData.class_start_date,
        this.state.classData.time,
      )
    ) {
      Alert.alert(
        'Are you sure you want to reschedule the class? Please note that if the reschedule is made within two hours of the class start time or after the class start time, 30 minutes will be deducted from your subscribed class hours.',
        '',
        [
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => this.onRescheduleClassConfirmation(true),
          },
        ],
        {cancelable: false},
      );

      console.log('Its true');
    } else {
      Alert.alert(
        'Are you sure want to reschedule the class?',
        '',
        [
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => this.onRescheduleClassConfirmation(false),
          },
        ],
        {cancelable: false},
      );
    }
  };

  closeRescheduleClass = () => {
    this.setState({
      rescheduleVisible: false,
    });
  };

  render() {
    const {classData, classType, mShowUploadChoice, rescheduleVisible} =
      this.state;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: rescheduleVisible ? COLOR.GRAY : COLOR.WHITE,
        }}>
        {this.props.loading && (
          <ActivityIndicator
            size="large"
            color="black"
            style={CommonStyles.activityIndicatorStyle}
          />
        )}

        <ScrollView
          ref={ref => {
            this.scrollView = ref;
          }}>
          <View
            style={{
              marginStart: normalize(20),
              marginEnd: normalize(20),
              marginTop: normalize(10),
              marginBottom: normalize(20),
            }}>
            <CustomBackButton onPress={this.onPressBack} />

            {classData && (
              <View>
                <Text
                  style={[
                    CommonStyles.text_18_semi_bold,
                    {color: COLOR.TEXT_COLOR_BLUE, marginTop: normalize(12)},
                  ]}>
                  {this.state.classType.slice(0, -2)}
                </Text>
                {classType != Constants.UPCOMING_CLASSES &&
                  classData.math_quizzes &&
                  this.showPracticeDetails(
                    classData.math_quizzes,
                    'Math Concept',
                  )}
                {classType != Constants.UPCOMING_CLASSES &&
                  classData.logical_quizzes &&
                  this.showPracticeDetails(
                    classData.logical_quizzes,
                    'Think and Reason',
                  )}

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: normalize(32),
                    marginStart: normalize(20),
                    justifyContent: 'space-evenly',
                  }}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={CommonStyles.text_11_bold}>Time</Text>
                    <Text
                      style={[
                        CommonStyles.text_18_regular,
                        {marginTop: normalize(4)},
                      ]}>
                      {classData.start_date}
                      {'\n'}
                      {classData.time}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      flex: 1,
                      alignItems: 'center',
                    }}>
                    <Text style={CommonStyles.text_11_bold}>Teacher</Text>
                    <TouchableOpacity onPress={this.cancleConfiramtiondemo}>
                      <Text
                        style={[
                          CommonStyles.text_18_regular,
                          {marginTop: normalize(4)},
                        ]}>
                        {classData.teacher}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {classType != Constants.UPCOMING_CLASSES &&
                  classData.homework_assigned &&
                  this.showAssignedHomeWork(classData)}
                {classType == Constants.UPCOMING_CLASSES &&
                  this.showUpcomingClassDetail()}
              </View>
            )}
          </View>
        </ScrollView>
        {mShowUploadChoice && (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              height: 300,
              width: '100%',
              backgroundColor: COLOR.BG_ALPHA_BLACK,
            }}>
            <View style={{flex: 1, justifyContent: 'space-evenly'}}>
              <TouchableOpacity
                onPress={this.selectImageWorkBook}
                style={{
                  alignSelf: 'baseline',
                  marginTop: normalize(10),
                  backgroundColor: COLOR.ORANGE,
                  paddingVertical: normalize(10),
                  paddingHorizontal: normalize(40),
                  alignSelf: 'center',
                  borderRadius: normalize(20),
                }}>
                <Text style={[CommonStyles.text_12_bold, {color: COLOR.WHITE}]}>
                  Upload Image
                </Text>
              </TouchableOpacity>
              <Text
                style={[
                  CommonStyles.text_18_regular,
                  {alignSelf: 'center', color: COLOR.WHITE},
                ]}>
                Or
              </Text>
              <TouchableOpacity
                onPress={this.selectPdfWorkBook}
                style={{
                  alignSelf: 'baseline',
                  marginBottom: normalize(10),
                  backgroundColor: COLOR.ORANGE,
                  paddingVertical: normalize(10),
                  paddingHorizontal: normalize(40),
                  alignSelf: 'center',
                  borderRadius: normalize(20),
                }}>
                <Text style={[CommonStyles.text_12_bold, {color: COLOR.WHITE}]}>
                  Upload PDF
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {this.props.rescheduleSlotStatus && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={rescheduleVisible}>
            <View
              style={{
                height: '80%',
                width: '100%',
                borderTopLeftRadius: normalize(10),
                borderTopRightRadius: normalize(10),
                backgroundColor: COLOR.WHITE,
                position: 'absolute',
                bottom: 0,
              }}>
              <TouchableOpacity onPress={this.closeRescheduleClass}>
                <Image
                  source={IC_CLOSE_BLUE}
                  style={{
                    height: 40,
                    width: 40,
                    resizeMode: 'contain',
                    justifyContent: 'flex-end',
                    alignSelf: 'flex-end',
                  }}
                />
              </TouchableOpacity>

              <ComponentReschedule
                rescheduleSlots={this.props.rescheduleSlotResponse.slot_details}
                callBackUpdate={this.updateRescheduleClass}
              />
            </View>
          </Modal>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state.authenticate,
    loading: state.dashboard.loading,
    currentSelectedKid: state.dashboard.current_selected_kid,
    student_class_response: state.dashboard.student_class_response,
    student_class_status: state.dashboard.student_class_status,
    dashboardStatus: state.dashboard.dashboard_status,
    dashboardResponse: state.dashboard.dashboard_response,
    classCancelStatus: state.dashboard.class_cancel_status,
    classCancelResponse: state.dashboard.class_cancel_response,
    rescheduleSlotStatus: state.dashboard.reschedule_slot_status,
    rescheduleSlotResponse: state.dashboard.reschedule_slot_response,
    rescheduleUpcomingStatus: state.dashboard.reschedule_upcoming_status,
    rescheduleUpcomingResponse: state.dashboard.reschedule_upcoming_response,
  };
};

const mapDispatchToProps = {
  uploadWorkBook,
  cancelClass,
  geteUpcomingRescheduleSlots,
  doUpdateRescheduleClass,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassDetailsScreen);
