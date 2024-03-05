import React, {useEffect, useState, Component, useRef} from 'react';

import * as Constants from '../../../../components/helpers/Constants';

import axios from 'axios';
import {
  updateStudentFeedback,
  callTechSupport,
} from '../../../../actions/dashboard';
import {SvgXml} from 'react-native-svg';
import Good from '../../assets/Images/Good.svg';
import VeryGood from '../../assets/Images/Very-good.svg';
import NotGood from '../../assets/Images/Not-good.svg';
import Whiteboardtwo from '../Whiteboard/Whiteboardtwo';
import openChat from '../../assets/Images/StartChat.svg';
import closeChat from '../../assets/Images/Close-chat.svg';
import sendBtn from '../../assets/Images/Send-btn.svg';
import starBtn from '../../assets/Images/Star.svg';
import smileyBtn from '../../assets/Images/Smiley.svg';
import clappingBtn from '../../assets/Images/Clapping.svg';
import thumsUpBtn from '../../assets/Images/ThumbsUp.svg';
import Orientation from 'react-native-orientation';
import MathZoneQuiz from '../MathZoneScreens/MathZoneQuiz';
import ScratchChild from '../Scratch/ScratchChild';
import ScratchLesson from '../Scratch/ScratchLessons';
import Coding from '../Coding/Coding';
import NavbarLiveClass from '../Navbar/NavbarLiveClass';
import VideoDemo from '../Video/VideoTwo';
import SpeedMath from '../SpeedMath/SpeedMath';
import Miscellaneous from '../Miscellaneous/Miscellaneous';
import MainActivity from '../StudentActivity/MainActivity';

import positiveComments from '../FeedbackJson/positiveComments.json';
import issuesComments from '../FeedbackJson/issuesComments.json';

import TeacherScreenShareView from '../TeacherScreenShareView/TeacherScreenShareView';

import {connect} from 'react-redux';
import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo,
} from 'react-native-twilio-video-webrtc';
import Modal from 'react-native-modal';

import {
  lottie_star,
  smileyStudent,
  clapStudent,
  thumsUp,
} from '../../../../assets/lottieAssets';

import LottieView from 'lottie-react-native';

import {COLOR, CommonStyles} from '../../../../config/styles';
import {
  BASE_URL,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../../../config/configs';

import {showMessage} from 'react-native-flash-message';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Slider,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {normalize} from 'react-native-elements';
import {TextInput} from 'react-native-paper';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

function VideoRoom(props) {
  const [selected, setSelected] = useState(1);
  const [forceRefresh, setForceRefresh] = useState(true);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState('');
  const [selectedPdfIndex, setSeletedPdfIndex] = useState(0);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
  const [currentScreenName, setCurrentScreenName] = useState('AllScreen');
  const [nowPlayingVideoTime, setNowPlayingVideoTime] = useState(1);
  const [quizQuestions, setQuizQuestions] = useState({});
  const [currentDataTrackTime, setCurrentDataTrackTime] = useState('');
  const [userIdOfStudent, setUserId] = useState(0);
  const [liveClassIdOfStudent, setLiveClassId] = useState(0);
  const [env, setEnv] = useState('');
  const [newCodingPlan, setNewCodingPlan] = useState('');
  const [classtype, setClassType] = useState('');
  const [showNewCodings, setShowNewCodings] = useState('');
  const [demoStatusCheck, setDemoStatusCheck] = useState(false);
  const [codeFrameUrl, setCodeFrameUrl] = useState('');
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [videoRoom, setVideoRoom] = useState({});
  const [status, setStatus] = useState('connected');
  const [videoTracks, setVideoTracks] = useState(new Map());
  const [screenShareTracks, setScreenShareTracks] = useState(new Map());
  const [starcliked, setStarClicked] = useState(false);
  const [starclikedStudent, setStarClikedStudent] = useState(null);
  const [smileyclicked, setSmileyClicked] = useState(false);
  const [smileyclikedStudent, setSmileyClikedStudent] = useState(null);
  const [clappingclicked, setClappingClicked] = useState(false);
  const [clappingclikedStudent, setClappingClikedStudent] = useState(null);
  const [thumbsUpclicked, setThumbsUpClicked] = useState(false);
  const [thumbsUpclikedStudent, setThumbsUpClikedStudent] = useState(null);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [isChecked, setisChecked] = useState({});
  const [issueModal, setIssueModal] = useState(false);
  const [positiveCommentModal, setPositiveCommentModal] = useState(false);
  const [feedbackValue, setFeedbackValue] = useState(0);
  const [studentStar, setStudentStar] = useState({});
  const [studentSmiley, setStudentSmiley] = useState({});
  const [studentClapping, setStudentClapping] = useState({});
  const [studentThumbsUp, setStudentThumbsUp] = useState({});
  const [forceRefreshVideo, setForceRefreshVideo] = useState(true);
  const [speedMathLevel, setSelectedSpeedMathLevel] = useState('');
  const [speedMathGameId, setSpeedMathGameId] = useState(0);
  const [speedMathGameMode, setSpeedMathGameMode] = useState('computer');
  const [miscellaneousId, setMiscellaneousId] = useState(0);
  const [flagQuestionLevel, setFlagQuestionLevel] = useState('');
  const [selectedConceptId, setSelectedConceptId] = useState(0);
  const [selectedTagId, setSelectedTagId] = useState(0);
  const [showFlagQuestion, setShowFlagQuestion] = useState(false);
  const [currentFlagQuestion, setCurrentFlagQuestion] = useState(0);
  const [currentHomeWorkQuestion, setCurrentHomeWorkQuestion] = useState(0);
  const [displayHomeWorkQuestion, setDisplayHomeWorkQuestion] = useState(false);
  const [homeworkTagQuizId, setHomeworkTagQuizId] = useState(0);
  const [homeWorkId, setHomeWorkId] = useState(0);

  const [localParticipantIdentity, setLocalParticipantIdentity] = useState('');
  const [videoPlayState, setPlayState] = useState('');
  const [newMessageCounter, setNewMessageCounter] = useState(0);
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
  const [chatMessageArray, setChatMessageArray] = useState([]);
  const [textareaValue, setTextAreaValue] = useState('');
  const [participantCount, setParticipantCount] = useState(0);
  const [isSharing, setIsSharing] = useState(false);
  const [conceptName, setConceptName] = useState(0);
  const [conceptTag, setConceptTag] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [localParticipantNetworkQuality, setLocalParticipantNetworkQuality] =
    useState(0);
  const [flagQuestionConceptList, setFlagQuestionConceptList] = useState([]);
  const [flagQuestionMarksAsCompleted, setFlagQuestionMarksAsCompleted] =
    useState(false);

  const [remoteParticipantsIds, setRemoteParticipantsIds] = useState([]);
  const [remoteParticipantsIdsConnected, setRemoteParticipantsConnected] =
    useState([]);

  const [allScreenWidth, setAllScreenWidth] = useState(0);
  const [allScreenHeight, setAllScreenHeight] = useState(0);
  const [flexBasisRation, setFlexBasisRatio] = useState('%');

  const [selectedStudentActivity, setSelectedStudentActivity] = useState('');
  const [isCheckInActivity, setIsCheckInActivity] = useState(false);
  const [showActivityNotification, setShowActivityNotification] =
    useState(false);
  const [mounting, setMounting] = useState(false);

  const [showAffirmationStories, setShowAffirmationStories] = useState(false);

  const [
    shapeActivityTutorWhiteboardPoint,
    setShapesActivityTutorsWhiteBoardPoint,
  ] = useState([]);

  const [renderShapeChallenge, setRenderShapeChallenge] = useState(false);

  const [affirmationStoryIndex, selectedAffirmationIndex] = useState(0);

  const [checkOutAffirmationNextBtn, setCheckoutAffirmationNextBtn] =
    useState(0);

  const [teacherActivityResponseSave, setTeacherActivityResponseSave] =
    useState(false);

  const [affirmationPagePreviewImage, setIsAffirmationPreviewImage] =
    useState(false);

  const [cicoApiData, setCicoApiData] = useState({});

  const [noErrorProduced, setNoErrorProduced] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [endActivity, setEndActivity] = useState(false);

  const twilioRef = useRef(null);
  const endCallRef = useRef(null);
  const canvasScreenElement = useRef(null);
  const lessonScratchElement = useRef(null);
  const videoScreenElement = useRef(null);
  const speedMathScreenElement = useRef(null);
  const quizScreenElement = useRef(null);

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 340 : 0;

  useEffect(() => {
    let token = props.token;

    if (token != undefined) {
      twilioRef.current?.connect({
        accessToken: token,
        enableNetworkQualityReporting: true,
        enabled: true,
        // encodingParameters: {
        //   enableH264Codec: true,
        //   audioBitrate: 16,
        //   videoBitrate: 1200,
        // },
      });
    }
  }, []);

  const studentName = identity => {
    if (identity == 'tutor' || identity == 'tech') {
      return identity;
    } else {
      const identityData = identity.split('-');
      return identityData[1];
    }
  };

  const _onEndButtonPress = () => {
    setFeedbackModal(!feedbackModal);
  };

  const _onMuteButtonPress = () => {
    twilioRef.current
      .setLocalAudioEnabled(!isAudioEnabled)
      .then(isEnabled => setIsAudioEnabled(isEnabled));
  };

  const setAudioState = e => {
    let Identity = videoRoom.localParticipant.identity;
    if (e === true) {
      twilioRef.current.sendString('UnMuteStudent|' + Identity);
    } else {
      twilioRef.current.sendString('MuteStudent|' + Identity);
    }
    setIsAudioEnabled(e);
  };

  chatMessageUpdate = (id, msg) => {
    const newelement = {
      identity: id,
      message: msg,
    };
    setChatMessageArray([...chatMessageArray, newelement]);
    if (id == videoRoom.localParticipant.identity) {
      setTextAreaValue('');
    } else {
      if (!isChatBoxOpen) {
        setNewMessageCounter(newMessageCounter + 1);
      }
    }
  };

  const _onShareButtonPressed = async identity => {
    if (videoRoom?.localParticipant.identity == identity) {
      await twilioRef.current.toggleScreenSharing(!isSharing);
      setIsSharing(!isSharing);
      if (isSharing == true) {
        props.handleUpdate(false);
        let id = setTimeout(() => {
          clearTimeout(id);
          props.handleUpdate(true);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    // setVideoRoom(props.data);
    getFlagQuestionConceptList();
  }, []);

  useEffect(() => {
    let studid = props.studid;
    let liveId = props.liveId;

    let env = props?.env;
    let classtype = props?.classtype;
    let newCodingPlan = props?.newCodingPlan;
    let showNewCodings = props?.showNewCodings;
    let demoStatus = props?.demoStatus;
    let codeUrlFormat =
      BASE_URL + '/online_classes/coding_links?live_class_id=' + liveId;

    setDemoStatusCheck(demoStatus);
    setUserId(studid);
    setLiveClassId(liveId);
    setEnv(env);
    setClassType(classtype);
    setNewCodingPlan(newCodingPlan);
    setShowNewCodings(showNewCodings);
    setCodeFrameUrl(codeUrlFormat);
  }, []);

  useEffect(() => {
    if (videoRoom != null) {
      setLocalParticipantIdentity(videoRoom?.localParticipant?.identity);
    }
    setForceRefresh(true);
  }, [selected, localParticipantIdentity, videoRoom]);

  const getFlagQuestionConceptListApi = async liveClassID => {
    let url = `${BASE_URL}/app_teachers/flagged_concepts?live_class_id=
    ${liveClassID}`;

    const response = await fetch(url).catch(ae => {});

    const json = await response.json();

    if (json != undefined) {
      return json;
    }
  };

  const getFlagQuestionConceptList = async () => {
    let liveId = props.liveId;

    const data = await getFlagQuestionConceptListApi(liveId);

    setFlagQuestionConceptList(data?.flagged_concepts_data || []);
  };

  setDemoFlag = () => {
    if (demoStatusCheck) {
      return true;
    } else {
      return false;
    }
  };

  onDataTrackMessageReceived = e => {
    if (currentDataTrackTime == '') {
      setCurrentDataTrackTime(Date.now());
      handleIncomingData(e.message);
    } else {
      var seconds = (Date.now() - currentDataTrackTime) / 1000;
      if (seconds > 1) {
        setCurrentDataTrackTime(Date.now());
        handleIncomingData(e.message);
      } else {
        if (e.message.startsWith('CanvasLines')) {
          onCanvasLineIncoming(e.message);
        }
      }
    }
  };

  const refreshWhiteBoard = pdfImages => {
    setSelected(3),
      setSelectedPdfUrl(pdfImages),
      setSeletedPdfIndex(0),
      setCurrentScreenName('Lessons');
  };

  const onSetFlagQuestionState = ({
    subId,
    level,
    conceptName,
    conceptId,
    tagId,
    tagName,
    showFlagQuestion,
  }) => {
    setSelected(10);
    setMiscellaneousId(subId);
    setFlagQuestionLevel(level);
    setConceptName(conceptName);
    setConceptTag(tagName);
    setSelectedConceptId(conceptId);
    setSelectedTagId(tagId);
    setShowFlagQuestion(showFlagQuestion);
    setCurrentFlagQuestion(0);
  };

  const handleIncomingData = data => {
    console.log('data', data);
    if (data.startsWith('CurrentState')) {
      let dataArray = data.split('|');
      let state = dataArray[2];

      if (state == 1) {
        setForceRefresh(false);
        let id = setTimeout(() => {
          clearTimeout(id);
          setForceRefresh(true);
        }, 10);

        setSelected(1);
        setCurrentScreenName('AllScreen');
      }
      if (state == 2) {
        setForceRefresh(false);
        let id = setTimeout(() => {
          clearTimeout(id);
          setForceRefresh(true);
        }, 10);
        setCurrentScreenName('MyScreen');
        setSelected(2);
      }
      if (state == 3) {
        let dataArray = data.split('|');

        if (dataArray[3] == 'ShowcurrentPen') {
          let IMAGE_ARRAY = JSON.parse(dataArray[4]);
          let pdfIndex = dataArray[5];

          setSelected(3),
            setSelectedPdfUrl(IMAGE_ARRAY),
            setSeletedPdfIndex(pdfIndex),
            setCurrentScreenName('Lessons');

          return;
        }

        if (dataArray[3] == 'WhiteBoard') {
          setCurrentScreenName('Lessons');

          refreshWhiteBoard(IMAGE_ARRAY);
        }
        return;
      }

      if (state == 4) {
        let dataArray = data.split('|');
        let videoUrl = dataArray[3];
        let currentTime = dataArray[4];

        if (currentTime != undefined) {
          setSelected(4), setSelectedVideoUrl(videoUrl);
          setNowPlayingVideoTime(currentTime);
          setCurrentScreenName('PlayVideo');
        } else {
          setSelected(4), setSelectedVideoUrl(videoUrl);
          setCurrentScreenName('PlayVideo');
        }
      }

      if (state == 5) {
        let dataArray = data.split('|');

        let identity = dataArray[1].toString();
        let message = dataArray[3].toString();

        if (message == 'speedmathopen') {
          setTimeout(() => {
            if (videoRoom.localParticipant.identity == identity) {
              Alert.alert('Speed Math is Running, Please wait!');
            }
          }, 1000);
        } else {
        }
      }
    }

    if (data == 'AllScreen') {
      setCurrentScreenName('AllScreen');
      setForceRefresh(false);
      let id = setTimeout(() => {
        clearTimeout(id);
        setForceRefresh(true);
      }, 10);
      setSelected(1);
      //setIsSharing(!isSharing);
    }

    if (data == 'MyScreen') {
      setCurrentScreenName('MyScreen');
      setForceRefresh(false);
      let id = setTimeout(() => {
        clearTimeout(id);
        setForceRefresh(true);
      }, 10);
      setSelected(2);
      //setIsSharing(!isSharing);
    }
    if (data.startsWith('MuteStudent')) {
      var studentIdentity = data.replace('MuteStudent|', '');

      if (isAudioEnabled) {
        setAudioState(false);

        _onMuteButtonPress();
      }
    }
    if (data.startsWith('UnMuteStudent')) {
      var studentIdentity = data.replace('UnMuteStudent|', '');
      if (!isAudioEnabled) {
        setAudioState(true);
        _onMuteButtonPress();
      }
    }

    if (data.startsWith('StarReceived')) {
      var studentGotStar = data.replace('StarReceived|', '');
      onStarReceived(studentGotStar);
    }
    if (data.startsWith('SmileyReceived')) {
      var studentGotSmiley = data.replace('SmileyReceived|', '');
      onSmileyReceived(studentGotSmiley);
    }
    if (data.startsWith('ClappingReceived')) {
      var studentGotClapping = data.replace('ClappingReceived|', '');
      onClappingReceived(studentGotClapping);
    }
    if (data.startsWith('ThumbsUpReceived')) {
      var studentGotThumbsUp = data.replace('ThumbsUpReceived|', '');
      onThumbsUpReceived(studentGotThumbsUp);
    }

    if (data.startsWith('WhiteBoard')) {
      try {
        var DELIMETER_ARRAY = data.split('|');
        var IMAGE_ARRAY = JSON.parse(DELIMETER_ARRAY[1]);
        var pageINdex =
          DELIMETER_ARRAY[2] == undefined ? 0 : DELIMETER_ARRAY[2];

        if (selected != 3) {
          setSelected(3),
            setSelectedPdfUrl(IMAGE_ARRAY),
            setSeletedPdfIndex(pageINdex),
            setCurrentScreenName('Lessons');
        } else {
          setCurrentScreenName('Lessons');
          setForceRefresh(false);
          let id = setTimeout(() => {
            clearTimeout(id);
            setForceRefresh(true);
          }, 10);
          refreshWhiteBoard(IMAGE_ARRAY);
        }
      } catch (e) {
        setSelected(1);
        setCurrentScreenName('Whiteboard');
        setForceRefresh(false);
        let id = setTimeout(() => {
          clearTimeout(id);
          setForceRefresh(true);
        }, 10);
        refreshWhiteBoard(undefined);
      }
    }

    if (data.startsWith('LessonScratch')) {
      try {
        var DELIMETER_ARRAY = data.split('|');
        var IMAGE_ARRAY = JSON.parse(DELIMETER_ARRAY[1]);
        var pageINdex =
          DELIMETER_ARRAY[2] == undefined ? 0 : DELIMETER_ARRAY[2];

        if (selected != 3) {
          setSelected(9),
            setSelectedPdfUrl(IMAGE_ARRAY),
            setSeletedPdfIndex(pageINdex),
            setCurrentScreenName('Lessons');
        } else {
          setCurrentScreenName('Lessons Scratch');
          setForceRefresh(false);
          let id = setTimeout(() => {
            clearTimeout(id);
            setForceRefresh(true);
          }, 10);
          refreshWhiteBoard(IMAGE_ARRAY);
        }
      } catch (e) {
        setSelected(1);
        setCurrentScreenName('Whiteboard');
        setForceRefresh(false);
        let id = setTimeout(() => {
          clearTimeout(id);
          setForceRefresh(true);
        }, 10);
        refreshWhiteBoard(undefined);
      }
    }

    if (data.startsWith('ChangeLessonPage')) {
      var pageNumber = data.replace('ChangeLessonPage|', '');
      if (selected == 9) {
        if (lessonScratchElement.current != null)
          lessonScratchElement.current.onPageNumberUpdate(pageNumber);
      } else if (selected == 11) {
        selectedAffirmationIndex(pageNumber);
      } else {
        if (canvasScreenElement.current != null)
          canvasScreenElement.current.onPageNumberUpdate(pageNumber);
      }
    }

    if (data.startsWith('PlayVideo')) {
      setSelected(4), setSelectedVideoUrl(data.replace('PlayVideo|', ''));
      setCurrentScreenName('PlayVideo');
    }

    if (data.startsWith('ChangeVideoState')) {
      var videoState = data.replace('ChangeVideoState|', '');
      var studentIdentity = videoRoom.localParticipant.identity;
      if (videoState == 'play') {
        onMuteReceived(studentIdentity);
      } else {
        onUnMuteReceived(studentIdentity);
      }

      if (videoScreenElement.current != null) {
        if (videoState === 'play') {
          if (isAudioEnabled) {
            setAudioState(false);
            _onMuteButtonPress();
          }
        } else {
          if (!isAudioEnabled) {
            setAudioState(true);
            _onMuteButtonPress();
          }
        }
        videoScreenElement.current.updateVideoState(videoState);
      }
    }

    if (data.startsWith('ResumeVideo')) {
      var dataArray = data.split('|');
    }

    if (data.startsWith('ChatMessage')) {
      var dataArray = data.split('|');

      chatMessageUpdate(dataArray[1], dataArray[2]);
    }

    if (data.startsWith('ShareScreen')) {
      let dataArray = data.split('|');
      let identity = dataArray[1];
      _onShareButtonPressed(identity);
    }

    if (data.startsWith('SpeedMath')) {
      if (videoRoom.localParticipant.identity != 'parent') {
        var dataArray = data.split('|');

        setSelected(5);
        setSelectedSpeedMathLevel(dataArray[1]);

        setSpeedMathGameId(dataArray[2]);
        setSpeedMathGameMode(dataArray[3]);
        setCurrentScreenName('SpeedMath');
      } else {
      }
    }

    if (data.startsWith('SpeedMathClose')) {
      // this.closeChatBox();
      var dataArray = data.split('|');
      setSelected(1);
    }

    if (data.startsWith('CanvasLines')) {
      onCanvasLineIncoming(data);
    }

    if (data.startsWith('GraphImage')) {
      let graphImageStatus = data.replace('GraphImage|', '');

      if (canvasScreenElement.current != null)
        canvasScreenElement.current.onGraphImageClick(graphImageStatus);
    }

    if (data.startsWith('ClearCanvas')) {
      if (selected == 6) {
        if (quizScreenElement.current != null) {
          quizScreenElement.current.onClearCanvas();
        }
      } else {
        if (canvasScreenElement.current != null) {
          canvasScreenElement.current.onClearCanvas();
        }
      }
    }

    if (data.startsWith('PlayQuiz')) {
      setCurrentScreenName('MathZone');
      let arr = data.split('|');
      arr.shift();
      let temp = JSON.parse(arr.join('|'));
      let temp2 = {...temp};
      setConceptName(temp2.conceptName);
      setConceptTag(temp2.conceptTag);
      setQuizCompleted(temp2.quizObj?.quiz_completed);

      let specialParticipant = ['liveadmin', 'tech'];
      if (
        specialParticipant.includes(
          String(videoRoom?.localParticipant?.identity.trim()),
        )
      ) {
        try {
        } catch (e) {}
      }
      temp2 = {...temp2, mounting: false};
      setQuizQuestions({...temp2});

      setSelected(6);

      let id = setTimeout(() => {
        temp2 = {...temp2, mounting: true};
        setQuizQuestions({...temp2});
        clearTimeout(id);
      }, 0);
    }

    if (data.startsWith('RoughBoardScreen')) {
      let boardStatus = data.replace('RoughBoardScreen|', '');
      if (quizScreenElement.current != null)
        quizScreenElement.current.onRemoteShowRoughBoard(boardStatus);
    }

    if (data.startsWith('ScratchScreen')) {
      setSelected(8);
      setCurrentScreenName('Scratch Screen');
    }

    if (data.startsWith('CodingScreen')) {
      if (classtype === 'math_coding') {
        if (setDemoFlag()) {
          if (showNewCodings) {
            setSelected(8);
            setCurrentScreenName('Scratch Screen');
          } else {
            setSelected(7);
            setCurrentScreenName('Coding');
          }
        } else {
          setSelected(8);
          setCurrentScreenName('Scratch Screen');
        }
      } else {
        setSelected(7);
        setCurrentScreenName('Coding');
      }
    }

    if (data.startsWith('FlagQuestion')) {
      let arr = data.split('|');
      arr.shift();
      let obj = arr.join('|');
      obj = JSON.parse(obj);

      console.log('Flagged Question Object', obj);

      onSetFlagQuestionState({...obj});

      // setForceRefresh(false);
      // let id = setTimeout(() => {
      //   clearTimeout(id);
      //   setForceRefresh(true);
      // }, 10);
    }

    if (data.startsWith('ChangeQuestionFlagQuestion')) {
      let arr = data.split('|');

      arr.shift();
      let obj = arr.join('|');
      obj = JSON.parse(obj);

      setSelected(10);
      setCurrentFlagQuestion(obj?.value || 0);
      setFlagQuestionMarksAsCompleted(obj?.fetchAgain);
    }

    if (data.startsWith('ViewHomeWorkQuestion')) {
      let arr = data.split('|');
      arr.shift();
      arr = arr.join('|');
      let obj = JSON.parse(arr);

      setSelected(10);
      setMiscellaneousId(obj?.miscellaneousId);
      setCurrentHomeWorkQuestion(obj?.currentQuestion || 0);
      setDisplayHomeWorkQuestion(
        obj?.displayHomeWorkQuestion === true ? true : false,
      );
      setHomeworkTagQuizId(obj?.quizId);
      setHomeWorkId(obj?.homeWorkId);
    }

    if (data.startsWith('MainActivity')) {
      // let arr = data.split("|");
      // arr.shift();
      // let obj = arr.join("|");
      // obj = JSON.parse(obj);
      // setSelected(obj?.selected);
      // setIsCheckInActivity(obj?.isCheckInActivity);
      // setSelectedStudentActivity(obj?.selectedActivity);
      // setShowActivityNotification(obj?.showActivityNotification);
      // setCicoApiData(obj?.cicoApiData);
      // setMounting(false);
      // let id = setTimeout(() => {
      //   setMounting(true);
      //   clearTimeout(id);
      // }, 0);
    }

    if (data.startsWith('ShowAffirmationStories')) {
      let arr = data.split('|');
      arr.shift();
      arr = arr.join('|');
      let obj = JSON.parse(arr);
      setSelected(11);
      setShowAffirmationStories(obj?.showAffirmationStories);
    }

    if (data.startsWith('ShapeActivityWhiteboardPoints')) {
      let arr = data.split('|');
      arr.shift();
      arr = arr.join('|');
      let obj = JSON.parse(arr);

      setShapesActivityTutorsWhiteBoardPoint(obj.coordinates);
      setRenderShapeChallenge(!renderShapeChallenge);
    }

    if (data.startsWith('CheckoutAffirmationNextButton')) {
      let arr = data.split('|');

      arr.shift();
      let obj = JSON.parse(arr[0]);

      console.log('obj', obj.val);

      setCheckoutAffirmationNextBtn(obj.val || 0);
    }

    if (data.startsWith('TeacherActivityResponseSaved')) {
      setTeacherActivityResponseSave(true);
    }

    if (data.startsWith('showAffirmationPreviewImageStudent')) {
      let arr = data.split('|');
      setIsAffirmationPreviewImage(arr[1] == 'true' ? true : false);
    }

    if (data.startsWith('EndActivityRequest')) {
      setEndActivity(true);
    }
  };

  const onCanvasLineIncoming = data => {
    var whiteBoardLines = data.replace('CanvasLines|', '');

    if (selected == 9) {
      if (lessonScratchElement.current != null) {
        lessonScratchElement.current.onRemoteLineUpdate(
          JSON.parse(whiteBoardLines),
        );
      }
    } else if (selected == 6) {
      if (quizScreenElement.current != null)
        quizScreenElement?.current?.onRemoteLineUpdate(
          JSON.parse(whiteBoardLines),
        );
    } else {
      if (canvasScreenElement.current != null)
        canvasScreenElement.current.onRemoteLineUpdate(
          JSON.parse(whiteBoardLines),
        );
    }
  };

  const onMuteReceived = studentIdentity => {
    if (videoRoom.localParticipant.identity == studentIdentity) {
    }
  };

  const onUnMuteReceived = studentIdentity => {
    if (videoRoom.localParticipant.identity == studentIdentity) {
    }
  };

  const _SubmitFeedback = () => {
    let feedBackText = '';
    let comments = '';
    if (feedbackValue == 0) {
      feedBackText = 'Very Good';
    } else if (feedbackValue == 1) {
      feedBackText = 'Good';
    } else if (feedbackValue == 2) {
      feedBackText = 'Very Bad';
    }

    const champObject = Object.entries(isChecked);

    champObject.forEach(([key, value]) => {
      if (value) {
        comments = comments + key + ' ,';
      }
    });

    let userId = props.studid;
    let liveClassID = props.liveId;

    props.updateStudentFeedback(liveClassID, userId, feedBackText, comments);

    twilioRef.current.disconnect();
    props.navigation.navigate(Constants.Dashboard, {});
    const initial = Orientation.getInitialOrientation();
    Orientation.lockToPortrait();
  };

  const handleChangeTextarea = event => {
    setTextAreaValue(event);
  };

  const _SkipThisStep = () => {
    twilioRef.current.disconnect();
    props.navigation.navigate(Constants.Dashboard, {});
  };

  const onStarReceived = studentIdentity => {
    if (videoRoom.localParticipant.identity == studentIdentity) {
    }
    addStarToStudent(studentIdentity);
    starAnimate(studentIdentity);
  };

  const onSmileyReceived = studentIdentity => {
    if (videoRoom.localParticipant.identity == studentIdentity) {
    }
    addSmileyToStudent(studentIdentity);
    smileyAnimate(studentIdentity);
  };

  const onClappingReceived = studentIdentity => {
    if (videoRoom.localParticipant.identity == studentIdentity) {
    }
    addClappingToStudent(studentIdentity);
    clappingAnimate(studentIdentity);
  };

  const onThumbsUpReceived = studentIdentity => {
    if (videoRoom.localParticipant.identity == studentIdentity) {
    }
    addThumbsUpToStudent(studentIdentity);
    thumbsUpAnimate(studentIdentity);
  };
  const thumbsUpAnimate = studentIdentity => {
    setThumbsUpClicked(true);
    setThumbsUpClikedStudent(studentIdentity);
    setTimeout(() => {
      setThumbsUpClicked(false);
      setThumbsUpClikedStudent(null);
    }, 5000);
  };

  const clappingAnimate = studentIdentity => {
    setClappingClicked(true);
    setClappingClikedStudent(studentIdentity);
    setTimeout(() => {
      setClappingClicked(false);
      setClappingClikedStudent(null);
    }, 5000);
  };

  const smileyAnimate = studentIdentity => {
    setSmileyClicked(true);
    setSmileyClikedStudent(studentIdentity);
    setTimeout(() => {
      setSmileyClicked(false);
      setSmileyClikedStudent(null);
    }, 5000);
  };

  const starAnimate = studentIdentity => {
    setStarClicked(true);
    setStarClikedStudent(studentIdentity);
    setTimeout(() => {
      setStarClicked(false);
      setStarClikedStudent(null);
    }, 5000);
  };

  const checkIssues = event => {
    setisChecked({...isChecked, [event]: !isChecked[event]});
  };

  const addStarToStudent = studentIdentity => {
    const dyanmic_star_var = studentIdentity + '_star';
    let totalStar = (studentStar[dyanmic_star_var] || 0) + 1;
    setStudentStar({...studentStar, [dyanmic_star_var]: totalStar});
  };

  const addSmileyToStudent = studentIdentity => {
    const dyanmic_smiley_var = studentIdentity + '_smiley';
    let totalSmiley = (studentSmiley[dyanmic_smiley_var] || 0) + 1;
    setStudentSmiley({...studentSmiley, [dyanmic_smiley_var]: totalSmiley});
  };

  const addClappingToStudent = studentIdentity => {
    const dyanmic_clapping_var = studentIdentity + '_clapping';
    let totalClapping = (studentClapping[dyanmic_clapping_var] || 0) + 1;
    setStudentClapping({
      ...studentClapping,
      [dyanmic_clapping_var]: totalClapping,
    });
  };

  const addThumbsUpToStudent = studentIdentity => {
    const dyanmic_thumbsUp_var = studentIdentity + '_thumbsUp';
    let totalThumbsUp = (studentThumbsUp[dyanmic_thumbsUp_var] || 0) + 1;
    setStudentThumbsUp({
      ...studentThumbsUp,
      [dyanmic_thumbsUp_var]: totalThumbsUp,
    });
  };

  const _DoneFeedbackFirstStep = () => {
    if (feedbackValue == 2) {
      setFeedbackModal(false);
      setIssueModal(true);
    } else {
      setPositiveCommentModal(true);
      setFeedbackModal(false);
    }
  };

  const _GoBackFeedbackForm = () => {
    setFeedbackModal(false);
    setIssueModal(false);
    setPositiveCommentModal(false);
  };

  const changeVideoState = e => {
    setPlayState(e);
  };

  const onNetworkQualityLevelsChanged = e => {
    setLocalParticipantNetworkQuality(e.quality);
  };

  const openChatButton = () => {
    setNewMessageCounter(0);
    setIsChatBoxOpen(true);
  };

  const handleKeyDown = e => {
    if (e.nativeEvent.key == 'Enter') {
    }
  };

  const onDropChatMessage = (Identity, message) => {
    twilioRef.current.sendString('ChatMessage|' + Identity + '|' + message);
    Keyboard.dismiss();
  };

  const dropChatMessage = () => {
    setTextAreaValue('');
    chatMessageUpdate(videoRoom.localParticipant.identity, textareaValue);
    onDropChatMessage(videoRoom.localParticipant.identity, textareaValue);
  };

  const closeChatButton = () => {
    setIsChatBoxOpen(false);
  };

  const onFocusIn = inputRef => {
    inputRef.setNativeProps({
      borderColor: COLOR.LIGHT_BORDER_GREEN,
    });
  };

  const onFocusOut = inputRef => {
    inputRef.setNativeProps({
      borderColor: COLOR.LIGHT_BORDER_COLOR,
    });
  };

  const onUpdateLiveSpeedMathScore = (userId, identity, userScore) => {
    let speedMessage =
      'LiveScoreSpeedMath|' + userId + '|' + identity + '|' + userScore;

    twilioRef.current.sendString(speedMessage);
  };

  // const participantAlreadyConnected = (participant) => {
  //   let localParticipantId = videoRoom?.localParticipant?.identity;
  //   console.log("videoTracks", videoTracks);
  //   let remoteParticipants = [];
  //   videoRoom?.participants?.forEach((item) => {
  //     if (item?.identity != localParticipantId) {
  //       remoteParticipants.push(item?.identity);
  //     }
  //   });
  //   setRemoteParticipantsIds(remoteParticipants);
  // };

  // const removeParticipantAfterDisConnect = (participant) => {
  //   let localParticipantId = videoRoom?.localParticipant?.identity;
  //   let remoteParticipants = [];

  //   let remoteParticipantsIdss = remoteParticipantsIds.filter((item) =>
  //     item != participant ? 1 : 0
  //   );

  //   setRemoteParticipantsIds(remoteParticipantsIdss);
  // };

  const smPresent = iden => {
    if (iden == 'sm' || iden == 'audit' || iden == 'smmanager') {
      return true;
    } else {
      return false;
    }
  };

  const updateParticipantRemove = identity => {
    let removeItem = remoteParticipantsIdsConnected?.filter(item =>
      item != identity ? 1 : 0,
    );

    setRemoteParticipantsConnected(removeItem);
  };

  const updateParticipantAdded = identity => {
    if (remoteParticipantsIdsConnected.includes(identity)) {
      return;
    } else {
      setRemoteParticipantsConnected([
        ...remoteParticipantsIdsConnected,
        identity,
      ]);
    }
  };

  const _onRoomDidConnect = e => {
    setVideoRoom(e);
  };

  const _onParticipantAddedVideoTrack = ({participant, track}) => {
    let arr = participant.identity.split('-');

    if (smPresent(arr[0])) {
      console.log('returning as participant is sm');
      return;
    }

    if (track?.trackName == 'screen_tutor') {
      setScreenShareTracks(
        new Map([
          ...screenShareTracks,
          [
            track.trackSid,
            {
              participantSid: participant.sid,
              videoTrackSid: track.trackSid,
              participantIdentity: participant.identity,
            },
          ],
        ]),
      );
      console.log('returning from screen share fn');
      return;
    }

    let updateRemoteParticipant = updateParticipantAdded(participant?.identity);

    if (track?.trackName == 'screen_tutor') {
      console.log('returning from screen share fn');
      return;
    }

    setVideoTracks(
      new Map([
        ...videoTracks,
        [
          track.trackSid,
          {
            participantSid: participant.sid,
            videoTrackSid: track.trackSid,
            participantIdentity: participant.identity,
          },
        ],
      ]),
    );

    // setParticipantCount(participantCount + 1);
  };

  const _onParticipantRemovedVideoTrack = ({participant, track}) => {
    let arr = participant.identity.split('-');

    if (smPresent(arr[0])) {
      console.log('returning as participant is sm');
      return;
    }
    if (track?.trackName == 'screen_tutor') {
      let screenTracksLocal = screenShareTracks;
      screenTracksLocal.clear();
      return;
    }

    let updateRemoteParticipant = updateParticipantRemove(
      participant?.identity,
    );

    //let checkFirst = removeParticipantAfterDisConnect(participant);
    const videoTracksLocal = videoTracks;
    videoTracksLocal.delete(track.trackSid);
    // setParticipantCount(participantCount - 1);
    setVideoTracks(videoTracksLocal);
  };

  const _onRoomDidDisconnect = ({error}) => {
    setErrorMessage(error);
    setNoErrorProduced(true);
  };

  const _onRoomDidFailToConnect = error => {
    setStatus('disconnected');
  };

  const getTextData = element => {
    let mess = element.message;

    return mess.replace('\n', '');
  };

  const sendWhiteBoardLines = allLines => {
    if (selected == 6) {
      let message = 'CanvasLines|' + JSON.stringify(allLines);
      twilioRef.current.sendString(message);
    } else {
      let message =
        'CanvasLines|' + JSON.stringify(allLines[allLines.length - 1]);
      twilioRef.current.sendString(message);
    }
  };

  const sendStudentImageIndex = index => {
    let message = 'FeelingChartSelectedImg|' + index;
    twilioRef.current.sendString(message);
  };

  const sendShapeChallengeImage = () => {
    let obj = {
      identity: localParticipantIdentity,
      image: 'dkdkdkddk',
    };
    var message = 'SendShapeActivityImage|' + JSON.stringify(obj);
    twilioRef.current.sendString(message);
  };

  const sendAffirmationIndex = index => {
    let obj = {
      identity: localParticipantIdentity,
      value: index,
    };

    let message = 'AffirmationSelectedValue|' + JSON.stringify(obj);
    twilioRef.current.sendString(message);
  };

  const sendRemoteWhiteboardActivity = data => {
    // console.log("data", data[data.length - 1]);
    let obj = {
      identity: localParticipantIdentity,
      coordinates: [null, data],
    };

    console.log('obj', obj);
    let message = 'ShapeActivityWhiteboardPoints|' + JSON.stringify(obj);
    twilioRef.current.sendString(message);
  };

  const onCallTechSupport = async () => {
    let studid = props.studid;
    let liveId = props.liveId;
    await props.callTechSupport(liveId, studid);
    const response = await props?.callTechnicalSupportResponse;
    console.log('response', response);
    showMessage({
      message: response?.message,
      type: 'success',
    });
  };

  const raiseHand = () => {
    let identity = videoRoom.localParticipant.identity;

    let raiseHandMessage = 'RaiseHand|' + identity;

    twilioRef.current.sendString(raiseHandMessage);
  };

  const changeAllScreenHeight = () => {
    let length = remoteParticipantsIdsConnected?.length;
    let finalWidth = 0;
    let finalHeight = 0;
    let flexBasis = '';
    if (length == 0) {
      finalHeight = 590;
      finalWidth = 900;
      flexBasis = '100%';
    } else if (length == 1) {
      finalHeight = 590;
      finalWidth = 480;
      flexBasis = '100%';
    } else {
      finalHeight = 290;
      finalWidth = 480;
      flexBasis = '50%';
    }
    setAllScreenHeight(finalHeight);
    setAllScreenWidth(finalWidth);
    setFlexBasisRatio(flexBasis);
  };

  useEffect(() => {
    changeAllScreenHeight();
  }, [remoteParticipantsIdsConnected.length]);

  return (
    <>
      {!noErrorProduced ? (
        <View style={styles.container}>
          <View style={styles.containersecond}>
            {screenShareTracks.size > 0 && (
              <View style={{zIndex: 99}}>
                <TeacherScreenShareView screenShareTracks={screenShareTracks} />
              </View>
            )}
            <View style={styles.navbarAndTutor}>
              <View style={styles.navbarAndTutorFirst}>
                <NavbarLiveClass
                  _onEndButtonPress={_onEndButtonPress}
                  _onMuteButtonPress={_onMuteButtonPress}
                  isAudioEnabled={isAudioEnabled}
                  setAudioState={setAudioState}
                  ref={endCallRef}
                  onCallTechSupport={onCallTechSupport}
                  raiseHand={raiseHand}
                  currentScreenName={currentScreenName}
                />

                {feedbackModal && (
                  <Modal style={styles.feedbackModal} isVisible={feedbackModal}>
                    <View>
                      <Text
                        style={[
                          CommonStyles.text_14_bold,
                          {textAlign: 'center'},
                        ]}>
                        Rate your Class
                      </Text>
                      <Text
                        style={[
                          CommonStyles.text_14_semi_bold,
                          {textAlign: 'center'},
                        ]}>
                        How was today's class
                      </Text>
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 20,
                          marginBottom: 10,
                        }}>
                        {feedbackValue == 0 ? (
                          <SvgXml width="200" height="200" xml={VeryGood} />
                        ) : feedbackValue == 1 ? (
                          <SvgXml width="200" height="200" xml={Good} />
                        ) : (
                          <SvgXml width="200" height="200" xml={NotGood} />
                        )}

                        <View
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 100,
                          }}>
                          <Slider
                            style={{width: 300}}
                            step={1}
                            minimumValue={0}
                            maximumValue={2}
                            value={feedbackValue}
                            onValueChange={val => setFeedbackValue(val)}
                          />
                          {feedbackValue == 0 ? (
                            <Text
                              style={[
                                styles.feedbacktext,
                                CommonStyles.text_14_Regular,
                              ]}>
                              Very Good
                            </Text>
                          ) : feedbackValue == 1 ? (
                            <Text
                              style={[
                                styles.feedbacktext,
                                CommonStyles.text_14_Regular,
                              ]}>
                              Good
                            </Text>
                          ) : (
                            <Text
                              style={[
                                styles.feedbacktext,
                                CommonStyles.text_14_Regular,
                              ]}>
                              Not Good
                            </Text>
                          )}
                        </View>
                      </View>
                      <View style={{marginTop: 20}}>
                        <Button title="Done" onPress={_DoneFeedbackFirstStep} />
                        <Button title="Back" onPress={_GoBackFeedbackForm} />
                      </View>
                    </View>
                  </Modal>
                )}

                {positiveCommentModal && (
                  <Modal
                    isVisible={positiveCommentModal}
                    style={styles.feedbackModal}>
                    <View style={{flex: 1}}>
                      <Text
                        style={[
                          CommonStyles.text_14_bold,
                          {textAlign: 'center', marginTop: 10},
                        ]}>
                        Rate your Class
                      </Text>
                      <Text
                        style={[
                          CommonStyles.text_14_semi_bold,
                          {textAlign: 'center', marginTop: 20},
                        ]}>
                        Thank you {'\n'}
                        What did you like?
                      </Text>

                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {positiveComments.map(obj => {
                          return (
                            <View
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                marginTop: 50,
                                marginBottom: 20,
                                marginRight: 10,
                              }}
                              key={obj.id}>
                              <View
                                style={{
                                  borderWidth: 1,
                                  borderColor: '#000',
                                  height: 22,
                                  width: 22,
                                  borderRadius: 11,
                                  marginRight: 5,
                                }}>
                                <CheckBox
                                  disabled={false}
                                  name={obj.name}
                                  id={'issue-' + obj.id}
                                  checked={isChecked[obj.name]}
                                  onChange={e => checkIssues(obj.name)}
                                  hideBox
                                  style={{height: 20, width: 20}}
                                />
                              </View>

                              <Text>{obj.name}</Text>
                            </View>
                          );
                        })}
                      </View>
                      <Button
                        title="Submit Feeback"
                        onPress={_SubmitFeedback}
                      />
                      <Button title="Skip this step" onPress={_SkipThisStep} />
                    </View>
                  </Modal>
                )}

                {issueModal && (
                  <Modal isVisible={issueModal} style={styles.feedbackModal}>
                    <View style={{flex: 1}}>
                      <Text
                        style={[
                          CommonStyles.text_14_bold,
                          {textAlign: 'center', marginTop: 20},
                        ]}>
                        Rate your Class
                      </Text>
                      <Text
                        style={[
                          CommonStyles.text_14_semi_bold,
                          {textAlign: 'center', marginTop: 30},
                        ]}>
                        What {'\n'}
                        Went Wrong?
                      </Text>

                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: 0,
                          height: 150,
                          flexWrap: 'wrap',
                        }}>
                        {issuesComments.map(obj => {
                          return (
                            <View
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                                marginTop: 5,
                                marginBottom: 10,
                                marginRight: 10,
                              }}
                              key={obj.id}>
                              <View
                                style={{
                                  borderWidth: 1,
                                  borderColor: '#000',
                                  height: 22,
                                  width: 22,
                                  borderRadius: 11,
                                  marginRight: 5,
                                }}>
                                <CheckBox
                                  disabled={false}
                                  name={obj.name}
                                  id={'issue-' + obj.id}
                                  checked={isChecked[obj.name]}
                                  onChange={e => checkIssues(obj.name)}
                                  hideBox
                                  style={{height: 20, width: 20}}
                                />
                              </View>

                              <Text>{obj.name}</Text>
                            </View>
                          );
                        })}
                      </View>
                      <View style={{marginTop: 20}}>
                        <Button
                          title="Submit Feeback"
                          onPress={_SubmitFeedback}
                        />
                      </View>
                      <View style={{marginTop: 20}}>
                        <Button
                          title="Skip this step"
                          onPress={_SkipThisStep}
                        />
                      </View>
                    </View>
                  </Modal>
                )}
              </View>

              {selected == 1 ? (
                <View style={styles.navbarAndTutorSecond}>
                  {(status === 'connected' || status === 'connecting') && (
                    <View style={styles.callContainer}>
                      {forceRefresh && (
                        <View style={styles.allScreenFlex}>
                          <View
                            style={[
                              styles.allScreenFlexParticipant,
                              {flexBasis: flexBasisRation},
                            ]}>
                            {Array.from(
                              videoTracks,
                              ([trackSid, trackIdentifier]) => {
                                let identity =
                                  videoTracks.get(trackSid).participantIdentity;

                                return identity == 'tutor' ? (
                                  <View>
                                    <TwilioVideoParticipantView
                                      style={[
                                        styles.remoteVideoForAllScreen,
                                        {
                                          width: allScreenWidth,
                                          height: allScreenHeight,
                                        },
                                      ]}
                                      key={trackSid}
                                      trackIdentifier={trackIdentifier}
                                    />
                                  </View>
                                ) : null;
                              },
                            )}
                          </View>

                          <View
                            style={[
                              styles.allScreenFlexParticipant,
                              {flexBasis: flexBasisRation},
                            ]}>
                            {starcliked &&
                            starclikedStudent == localParticipantIdentity ? (
                              <View style={styles.allScreenEmotigons}>
                                <LottieView
                                  source={lottie_star}
                                  autoPlay
                                  loop
                                />
                              </View>
                            ) : null}

                            {smileyclicked &&
                            smileyclikedStudent == localParticipantIdentity ? (
                              <View style={styles.allScreenEmotigons}>
                                <LottieView
                                  source={smileyStudent}
                                  autoPlay
                                  loop
                                />
                              </View>
                            ) : null}

                            {clappingclicked &&
                            clappingclikedStudent ==
                              localParticipantIdentity ? (
                              <View style={styles.allScreenEmotigons}>
                                <LottieView
                                  source={clapStudent}
                                  autoPlay
                                  loop
                                />
                              </View>
                            ) : null}

                            {thumbsUpclicked &&
                            thumbsUpclikedStudent ==
                              localParticipantIdentity ? (
                              <View style={styles.allScreenEmotigons}>
                                <LottieView source={thumsUp} autoPlay loop />
                              </View>
                            ) : null}

                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignContent: 'center',
                                width: '100%',
                                justifyContent: 'space-evenly',
                                zIndex: 99,
                                position: 'absolute',
                              }}>
                              <View>
                                <View style={styles.otherActivities}>
                                  <View
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      justifyContent: 'space-around',

                                      width: 50,
                                    }}>
                                    <SvgXml
                                      width="20"
                                      height="20"
                                      xml={starBtn}
                                    />
                                    {studentStar[
                                      `${localParticipantIdentity}_star`
                                    ] == undefined ? (
                                      <Text
                                        style={[
                                          CommonStyles.text_14_bold,
                                          {textAlign: 'center'},
                                        ]}>
                                        0
                                      </Text>
                                    ) : (
                                      <Text
                                        style={[
                                          CommonStyles.text_14_bold,
                                          {textAlign: 'center'},
                                        ]}>
                                        {
                                          studentStar[
                                            `${localParticipantIdentity}_star`
                                          ]
                                        }
                                      </Text>
                                    )}
                                  </View>
                                </View>
                              </View>
                              <View>
                                <View style={styles.otherActivities}>
                                  <View
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      justifyContent: 'space-around',

                                      width: 50,
                                    }}>
                                    <SvgXml
                                      width="20"
                                      height="20"
                                      xml={smileyBtn}
                                    />
                                    {studentSmiley[
                                      `${localParticipantIdentity}_smiley`
                                    ] == undefined ? (
                                      <Text
                                        style={[
                                          CommonStyles.text_14_bold,
                                          {textAlign: 'center'},
                                        ]}>
                                        0
                                      </Text>
                                    ) : (
                                      <Text
                                        style={[
                                          CommonStyles.text_14_bold,
                                          {textAlign: 'center'},
                                        ]}>
                                        {
                                          studentSmiley[
                                            `${localParticipantIdentity}_smiley`
                                          ]
                                        }
                                      </Text>
                                    )}
                                  </View>
                                </View>
                              </View>
                              <View>
                                <View style={styles.otherActivities}>
                                  <View
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      justifyContent: 'space-around',

                                      width: 50,
                                    }}>
                                    <SvgXml
                                      width="20"
                                      height="20"
                                      xml={clappingBtn}
                                    />
                                    {studentClapping[
                                      `${localParticipantIdentity}_clapping`
                                    ] == undefined ? (
                                      <Text
                                        style={[
                                          CommonStyles.text_14_bold,
                                          {textAlign: 'center'},
                                        ]}>
                                        0
                                      </Text>
                                    ) : (
                                      <Text
                                        style={[
                                          CommonStyles.text_14_bold,
                                          {textAlign: 'center'},
                                        ]}>
                                        {
                                          studentClapping[
                                            `${localParticipantIdentity}_clapping`
                                          ]
                                        }
                                      </Text>
                                    )}
                                  </View>
                                </View>
                              </View>
                              <View>
                                <View style={styles.otherActivities}>
                                  <View
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                      justifyContent: 'space-around',

                                      width: 50,
                                    }}>
                                    <SvgXml
                                      width="20"
                                      height="20"
                                      xml={thumsUpBtn}
                                    />
                                    {studentThumbsUp[
                                      `${localParticipantIdentity}_thumbsUp`
                                    ] == undefined ? (
                                      <Text
                                        style={[
                                          CommonStyles.text_14_bold,
                                          {textAlign: 'center'},
                                        ]}>
                                        0
                                      </Text>
                                    ) : (
                                      <Text
                                        style={[
                                          CommonStyles.text_14_bold,
                                          {textAlign: 'center'},
                                        ]}>
                                        {
                                          studentThumbsUp[
                                            `${localParticipantIdentity}_thumbsUp`
                                          ]
                                        }
                                      </Text>
                                    )}
                                  </View>
                                </View>
                              </View>
                            </View>
                            {!isSharing ? (
                              <TwilioVideoLocalView
                                enabled={true}
                                style={[
                                  styles.remoteVideoForAllScreen,
                                  {
                                    width: allScreenWidth,
                                    height: allScreenHeight,
                                  },
                                ]}
                              />
                            ) : (
                              <View
                                style={[
                                  styles.remoteVideoForAllScreenScreenShare,
                                  {
                                    width: allScreenWidth,
                                    height: allScreenHeight,
                                  },
                                ]}>
                                <Text
                                  style={[
                                    CommonStyles.text_14_bold,
                                    {textAlign: 'center'},
                                  ]}>
                                  {studentName(localParticipantIdentity)}
                                </Text>
                              </View>
                            )}
                          </View>
                          <View
                            style={[
                              styles.allScreenFlexParticipant,
                              {flexBasis: flexBasisRation},
                            ]}>
                            {Array.from(
                              videoTracks,
                              ([trackSid, trackIdentifier]) => {
                                let identity =
                                  videoTracks.get(trackSid).participantIdentity;

                                return identity != localParticipantIdentity &&
                                  identity != 'tutor' &&
                                  identity != 'tech' ? (
                                  <View>
                                    {starcliked &&
                                    starclikedStudent == identity ? (
                                      <View style={styles.allScreenEmotigons}>
                                        <LottieView
                                          source={lottie_star}
                                          autoPlay
                                          loop
                                        />
                                      </View>
                                    ) : null}

                                    {smileyclicked &&
                                    smileyclikedStudent == identity ? (
                                      <View style={styles.allScreenEmotigons}>
                                        <LottieView
                                          source={smileyStudent}
                                          autoPlay
                                          loop
                                        />
                                      </View>
                                    ) : null}

                                    {clappingclicked &&
                                    clappingclikedStudent == identity ? (
                                      <View style={styles.allScreenEmotigons}>
                                        <LottieView
                                          source={clapStudent}
                                          autoPlay
                                          loop
                                        />
                                      </View>
                                    ) : null}

                                    {thumbsUpclicked &&
                                    thumbsUpclikedStudent == identity ? (
                                      <View style={styles.allScreenEmotigons}>
                                        <LottieView
                                          source={thumsUp}
                                          autoPlay
                                          loop
                                        />
                                      </View>
                                    ) : null}

                                    <View
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignContent: 'center',
                                        width: '100%',
                                        justifyContent: 'space-evenly',
                                        zIndex: 99,
                                        position: 'absolute',
                                      }}>
                                      <View>
                                        <View style={styles.otherActivities}>
                                          <View
                                            style={{
                                              display: 'flex',
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              justifyContent: 'space-around',

                                              width: 50,
                                            }}>
                                            <SvgXml
                                              width="20"
                                              height="20"
                                              xml={starBtn}
                                            />
                                            {studentStar[`${identity}_star`] ==
                                            undefined ? (
                                              <Text
                                                style={[
                                                  CommonStyles.text_14_bold,
                                                  {textAlign: 'center'},
                                                ]}>
                                                0
                                              </Text>
                                            ) : (
                                              <Text
                                                style={[
                                                  CommonStyles.text_14_bold,
                                                  {textAlign: 'center'},
                                                ]}>
                                                {
                                                  studentStar[
                                                    `${identity}_star`
                                                  ]
                                                }
                                              </Text>
                                            )}
                                          </View>
                                        </View>
                                      </View>
                                      <View>
                                        <View style={styles.otherActivities}>
                                          <View
                                            style={{
                                              display: 'flex',
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              justifyContent: 'space-around',

                                              width: 50,
                                            }}>
                                            <SvgXml
                                              width="20"
                                              height="20"
                                              xml={smileyBtn}
                                            />
                                            {studentSmiley[
                                              `${identity}_smiley`
                                            ] == undefined ? (
                                              <Text
                                                style={[
                                                  CommonStyles.text_14_bold,
                                                  {textAlign: 'center'},
                                                ]}>
                                                0
                                              </Text>
                                            ) : (
                                              <Text
                                                style={[
                                                  CommonStyles.text_14_bold,
                                                  {textAlign: 'center'},
                                                ]}>
                                                {
                                                  studentSmiley[
                                                    `${identity}_smiley`
                                                  ]
                                                }
                                              </Text>
                                            )}
                                          </View>
                                        </View>
                                      </View>
                                      <View>
                                        <View style={styles.otherActivities}>
                                          <View
                                            style={{
                                              display: 'flex',
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              justifyContent: 'space-around',

                                              width: 50,
                                            }}>
                                            <SvgXml
                                              width="20"
                                              height="20"
                                              xml={clappingBtn}
                                            />
                                            {studentClapping[
                                              `${identity}_clapping`
                                            ] == undefined ? (
                                              <Text
                                                style={[
                                                  CommonStyles.text_14_bold,
                                                  {textAlign: 'center'},
                                                ]}>
                                                0
                                              </Text>
                                            ) : (
                                              <Text
                                                style={[
                                                  CommonStyles.text_14_bold,
                                                  {textAlign: 'center'},
                                                ]}>
                                                {
                                                  studentClapping[
                                                    `${identity}_clapping`
                                                  ]
                                                }
                                              </Text>
                                            )}
                                          </View>
                                        </View>
                                      </View>
                                      <View>
                                        <View style={styles.otherActivities}>
                                          <View
                                            style={{
                                              display: 'flex',
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              justifyContent: 'space-around',

                                              width: 50,
                                            }}>
                                            <SvgXml
                                              width="20"
                                              height="20"
                                              xml={thumsUpBtn}
                                            />
                                            {studentThumbsUp[
                                              `${identity}_thumbsUp`
                                            ] == undefined ? (
                                              <Text
                                                style={[
                                                  CommonStyles.text_14_bold,
                                                  {textAlign: 'center'},
                                                ]}>
                                                0
                                              </Text>
                                            ) : (
                                              <Text
                                                style={[
                                                  CommonStyles.text_14_bold,
                                                  {textAlign: 'center'},
                                                ]}>
                                                {
                                                  studentThumbsUp[
                                                    `${identity}_thumbsUp`
                                                  ]
                                                }
                                              </Text>
                                            )}
                                          </View>
                                        </View>
                                      </View>
                                    </View>
                                    <TwilioVideoParticipantView
                                      style={[
                                        styles.remoteVideoForAllScreen,
                                        {
                                          width: allScreenWidth,
                                          height: allScreenHeight,
                                        },
                                      ]}
                                      key={trackSid}
                                      trackIdentifier={trackIdentifier}
                                    />
                                  </View>
                                ) : null;
                              },
                            )}
                          </View>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              ) : selected == 2 ? (
                <View style={styles.navbarAndTutorSecond}>
                  {(status === 'connected' || status === 'connecting') && (
                    <View style={styles.callContainer}>
                      {forceRefresh && (
                        <View style={styles.remoteGrid}>
                          {Array.from(
                            videoTracks,
                            ([trackSid, trackIdentifier]) => {
                              let identity =
                                videoTracks.get(trackSid).participantIdentity;

                              return identity == 'tutor' ? (
                                <View>
                                  <TwilioVideoParticipantView
                                    style={styles.remoteVideo}
                                    key={trackSid}
                                    trackIdentifier={trackIdentifier}
                                  />
                                </View>
                              ) : null;
                            },
                          )}
                        </View>
                      )}
                    </View>
                  )}
                </View>
              ) : selected == 3 ? (
                <View style={styles.navbarAndTutorSecond}>
                  {forceRefresh && (
                    <Whiteboardtwo
                      ref={canvasScreenElement}
                      selPdfUrl={selectedPdfUrl}
                      selPdfIndex={selectedPdfIndex}
                      purpose={twilioRef}
                      onSendWhiteBoardLines={sendWhiteBoardLines}
                    />
                  )}
                </View>
              ) : selected == 4 ? (
                <View style={styles.navbarAndTutorSecond}>
                  {forceRefreshVideo && (
                    <VideoDemo
                      videoPlayState={videoPlayState}
                      ref={videoScreenElement}
                      changeVideoState={changeVideoState}
                      selVideoUrl={selectedVideoUrl}
                      selVideoTime={nowPlayingVideoTime}
                    />
                  )}
                </View>
              ) : selected == 5 ? (
                <View style={styles.navbarAndTutorSecond}>
                  <SpeedMath
                    videoRoom={videoRoom}
                    ref={speedMathScreenElement}
                    gameMode={speedMathGameMode}
                    gameId={speedMathGameId}
                    level={speedMathLevel}
                    userId={userIdOfStudent}
                    liveClassID={liveClassIdOfStudent}
                    identity={videoRoom.localParticipant.identity}
                    onUpdateLiveSpeedMathScore={onUpdateLiveSpeedMathScore}
                  />
                </View>
              ) : quizQuestions?.mounting && selected == 6 ? (
                <View style={styles.navbarAndTutorSecond}>
                  <MathZoneQuiz
                    ref={quizScreenElement}
                    videoRoom={videoRoom}
                    quizQuestions={quizQuestions}
                    userIdOfStudent={userIdOfStudent}
                    liveClassIdOfStudent={liveClassIdOfStudent}
                    conceptName={conceptName}
                    conceptTag={conceptTag}
                    quizCompleted={quizCompleted}
                    onSendWhiteBoardLines={sendWhiteBoardLines}
                  />
                </View>
              ) : selected == 7 ? (
                <View style={styles.navbarAndTutorSecond}>
                  <Coding
                    videoRoom={videoRoom}
                    identity={videoRoom.localParticipant.identity}
                    codeFrameUrl={codeFrameUrl}
                  />
                </View>
              ) : selected == 8 ? (
                <View style={styles.navbarAndTutorSecond}>
                  <ScratchChild
                    videoRoom={videoRoom}
                    identity={videoRoom.localParticipant.identity}
                    userIdOfStudent={userIdOfStudent}
                    liveClassIdOfStudent={liveClassIdOfStudent}
                    env={env}
                    navigation={props.navigation}
                  />
                </View>
              ) : selected == 9 ? (
                <View style={styles.navbarAndTutorSecond}>
                  <ScratchLesson
                    ref={lessonScratchElement}
                    selPdfUrl={selectedPdfUrl}
                    selPdfIndex={selectedPdfIndex}
                    purpose={twilioRef}
                    onSendWhiteBoardLines={sendWhiteBoardLines}
                  />
                </View>
              ) : selected == 10 ? (
                <View style={styles.navbarAndTutorSecond}>
                  <Miscellaneous
                    identity={videoRoom.localParticipant.identity}
                    miscellaneousId={miscellaneousId}
                    flagQuestionLevel={flagQuestionLevel}
                    conceptName={conceptName}
                    conceptTag={conceptTag}
                    selectedConceptId={selectedConceptId}
                    selectedTagId={selectedTagId}
                    flagQuestionConceptList={flagQuestionConceptList}
                    showFlagQuestion={showFlagQuestion}
                    liveClassId={liveClassIdOfStudent}
                    flagQuestionMarksAsCompleted={
                      flagQuestionMarksAsCompleted || false
                    }
                    currentFlagQuestion={currentFlagQuestion}
                    homeWorkCurrentQuestion={currentHomeWorkQuestion}
                    quizId={homeworkTagQuizId}
                    homeWorkId={homeWorkId}
                    displayHomeWorkQuestion={displayHomeWorkQuestion || false}
                    userId={userIdOfStudent}
                    fetchFlaggedQuestionList={getFlagQuestionConceptList}
                  />
                </View>
              ) : mounting && selected == 11 ? (
                <View style={styles.navbarAndTutorSecond}>
                  {/* <MainActivity
                    identity={videoRoom.localParticipant.identity}
                    type={selectedStudentActivity}
                    isCheckInActivity={isCheckInActivity}
                    showActivityNotification={showActivityNotification}
                    liveClassId={liveClassIdOfStudent}
                    studentId={userIdOfStudent}
                    onsendStudentImageIndex={sendStudentImageIndex}
                    sendAffirmationIndex={sendAffirmationIndex}
                    showAffirmationStories={showAffirmationStories}
                    sendRemoteWhiteboardActivity={sendRemoteWhiteboardActivity}
                    shapeActivityTutorWhiteboardPoint={
                      shapeActivityTutorWhiteboardPoint || []
                    }
                    renderShapeChallenge={renderShapeChallenge}
                    affirmationStoryIndex={affirmationStoryIndex || 0}
                    checkOutAffirmationNextBtn={checkOutAffirmationNextBtn || 0}
                    isAudioEnabled={isAudioEnabled}
                    sendShapeChallengeImage={sendShapeChallengeImage}
                    teacherActivityResponseSave={teacherActivityResponseSave}
                    affirmationPagePreviewImage={affirmationPagePreviewImage}
                    endActivity={endActivity}
                    cicoApiData={cicoApiData}
                  /> */}
                </View>
              ) : null}
            </View>

            {selected == 1 ? (
              <>
                <View
                  style={{
                    position: 'absolute',
                    flex: 1,
                    width: '100%',
                    zIndex: 2,
                    bottom: 1,
                  }}>
                  <View style={{top: 40}}>
                    <View
                      style={{
                        alignItems: 'flex-end',
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}>
                      {isChatBoxOpen && (
                        <KeyboardAvoidingView
                          behavior="position"
                          keyboardVerticalOffset={keyboardVerticalOffset}>
                          <View style={styles.chatBoxMain}>
                            <View style={styles.chatBoxMainHeader}>
                              <View style={styles.chatBoxMainHeaderFirst}>
                                <View
                                  style={{
                                    marginLeft: 10,
                                  }}>
                                  <Text>Chat</Text>
                                </View>
                                <View style={{marginRight: 10}}>
                                  <TouchableOpacity onPress={closeChatButton}>
                                    <SvgXml
                                      style={{justifyContent: 'flex-end'}}
                                      width="20"
                                      height="20"
                                      xml={closeChat}
                                    />
                                  </TouchableOpacity>
                                </View>
                              </View>

                              <View style={styles.chatBoxMainHeaderSecond}>
                                <ScrollView
                                  ref={ref => {
                                    scrollView_ref = ref;
                                  }}
                                  contentContainerStyle={{
                                    flexGrow: 1,
                                    justifyContent: 'space-between',
                                    backgroundColor: COLOR.WHITE,
                                  }}
                                  onContentSizeChange={() =>
                                    scrollView_ref.scrollToEnd({
                                      animated: true,
                                    })
                                  }>
                                  {chatMessageArray.map(dataElement => {
                                    return (
                                      <View style={styles.chatMessage}>
                                        <View
                                          style={styles.chatMessageSenderName}>
                                          <Text>
                                            {' '}
                                            {studentName(
                                              dataElement.identity,
                                            ) == 'tutor'
                                              ? 'Coach'
                                              : studentName(
                                                  dataElement.identity,
                                                )}{' '}
                                          </Text>
                                        </View>

                                        <View
                                          style={
                                            styles.chatMessageSenderMessage
                                          }>
                                          <Text
                                            style={{
                                              color: 'black',
                                              marginLeft: 5,
                                            }}>
                                            {getTextData(dataElement)}
                                          </Text>
                                        </View>
                                      </View>
                                    );
                                  })}
                                </ScrollView>
                              </View>
                            </View>

                            <View style={styles.chatBoxMainFooter}>
                              <View style={styles.chatBoxMainFooterInput}>
                                <TextInput
                                  ref={input => {
                                    message_input = input;
                                  }}
                                  onFocus={() => onFocusIn(message_input)}
                                  onBlur={() => onFocusOut(message_input)}
                                  style={styles.inputBoxStyling}
                                  placeholder="Enter Message"
                                  onChangeText={e => handleChangeTextarea(e)}
                                  value={textareaValue}
                                />
                              </View>

                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <TouchableOpacity
                                  onPress={dropChatMessage}
                                  onKeyPress={handleKeyDown}>
                                  <SvgXml
                                    style={{
                                      marginRight: 10,
                                      marginBottom: 1,
                                      marginTop: 10,
                                    }}
                                    width="35"
                                    height="35"
                                    xml={sendBtn}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </KeyboardAvoidingView>
                      )}
                    </View>
                  </View>
                  <View>
                    {newMessageCounter > 0 ? (
                      <View
                        style={{
                          backgroundColor: '#F24A4A',
                          color: 'white',
                          position: 'absolute',
                          right: 15,
                          padding: 4,
                          width: 22,
                          height: 22,
                          fontSize: 10,
                          borderRadius: 15,
                          zIndex: 1,
                          top: 7,
                        }}>
                        <Text style={{textAlign: 'center'}}>
                          {newMessageCounter}
                        </Text>
                      </View>
                    ) : (
                      <View>
                        <Text>{''}</Text>
                      </View>
                    )}

                    <View
                      style={{
                        alignItems: 'flex-end',
                        top: 10,
                      }}>
                      <TouchableOpacity onPress={openChatButton}>
                        <SvgXml
                          style={{justifyContent: 'flex-end'}}
                          width="100"
                          height="100"
                          xml={openChat}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </>
            ) : selected == 2 ? (
              <View>
                <View style={styles.remoteParticipantViewUI}>
                  <View style={styles.remoteParticipantViewUIMain}>
                    <View style={styles.remoteParticipantMaps}>
                      {!isSharing ? (
                        <TwilioVideoLocalView
                          enabled={true}
                          style={styles.localVideo}
                        />
                      ) : (
                        <View style={styles.remoteParticipantMaps}>
                          <View
                            style={[
                              styles.localVideoRemote,
                              {
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                backgroundColor: 'yellow',
                              },
                            ]}>
                            <Text
                              style={[
                                CommonStyles.text_14_bold,
                                {textAlign: 'center'},
                              ]}>
                              {studentName(localParticipantIdentity)}
                            </Text>
                          </View>
                        </View>
                      )}

                      {starcliked &&
                      starclikedStudent == localParticipantIdentity ? (
                        <View style={styles.localVideotwo}>
                          <LottieView source={lottie_star} autoPlay loop />
                        </View>
                      ) : null}

                      {smileyclicked &&
                      smileyclikedStudent == localParticipantIdentity ? (
                        <View style={styles.localVideotwo}>
                          <LottieView source={smileyStudent} autoPlay loop />
                        </View>
                      ) : null}

                      {clappingclicked &&
                      clappingclikedStudent == localParticipantIdentity ? (
                        <View style={styles.localVideotwo}>
                          <LottieView source={clapStudent} autoPlay loop />
                        </View>
                      ) : null}

                      {thumbsUpclicked &&
                      thumbsUpclikedStudent == localParticipantIdentity ? (
                        <View style={styles.localVideotwo}>
                          <LottieView source={thumsUp} autoPlay loop />
                        </View>
                      ) : null}

                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignContent: 'center',
                          width: '100%',
                          justifyContent: 'space-evenly',
                        }}>
                        <View>
                          <View style={styles.otherActivities}>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around',

                                width: 50,
                              }}>
                              <SvgXml width="20" height="20" xml={starBtn} />
                              {studentStar[
                                `${localParticipantIdentity}_star`
                              ] == undefined ? (
                                <Text
                                  style={[
                                    CommonStyles.text_14_bold,
                                    {textAlign: 'center'},
                                  ]}>
                                  0
                                </Text>
                              ) : (
                                <Text
                                  style={[
                                    CommonStyles.text_14_bold,
                                    {textAlign: 'center'},
                                  ]}>
                                  {
                                    studentStar[
                                      `${localParticipantIdentity}_star`
                                    ]
                                  }
                                </Text>
                              )}
                            </View>
                          </View>
                        </View>
                        <View>
                          <View style={styles.otherActivities}>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around',

                                width: 50,
                              }}>
                              <SvgXml width="20" height="20" xml={smileyBtn} />
                              {studentSmiley[
                                `${localParticipantIdentity}_smiley`
                              ] == undefined ? (
                                <Text
                                  style={[
                                    CommonStyles.text_14_bold,
                                    {textAlign: 'center'},
                                  ]}>
                                  0
                                </Text>
                              ) : (
                                <Text
                                  style={[
                                    CommonStyles.text_14_bold,
                                    {textAlign: 'center'},
                                  ]}>
                                  {
                                    studentSmiley[
                                      `${localParticipantIdentity}_smiley`
                                    ]
                                  }
                                </Text>
                              )}
                            </View>
                          </View>
                        </View>
                        <View>
                          <View style={styles.otherActivities}>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around',

                                width: 50,
                              }}>
                              <SvgXml
                                width="20"
                                height="20"
                                xml={clappingBtn}
                              />
                              {studentClapping[
                                `${localParticipantIdentity}_clapping`
                              ] == undefined ? (
                                <Text
                                  style={[
                                    CommonStyles.text_14_bold,
                                    {textAlign: 'center'},
                                  ]}>
                                  0
                                </Text>
                              ) : (
                                <Text
                                  style={[
                                    CommonStyles.text_14_bold,
                                    {textAlign: 'center'},
                                  ]}>
                                  {
                                    studentClapping[
                                      `${localParticipantIdentity}_clapping`
                                    ]
                                  }
                                </Text>
                              )}
                            </View>
                          </View>
                        </View>
                        <View>
                          <View style={styles.otherActivities}>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around',

                                width: 50,
                              }}>
                              <SvgXml width="20" height="20" xml={thumsUpBtn} />
                              {studentThumbsUp[
                                `${localParticipantIdentity}_thumbsUp`
                              ] == undefined ? (
                                <Text
                                  style={[
                                    CommonStyles.text_14_bold,
                                    {textAlign: 'center'},
                                  ]}>
                                  0
                                </Text>
                              ) : (
                                <Text
                                  style={[
                                    CommonStyles.text_14_bold,
                                    {textAlign: 'center'},
                                  ]}>
                                  {
                                    studentThumbsUp[
                                      `${localParticipantIdentity}_thumbsUp`
                                    ]
                                  }
                                </Text>
                              )}
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View>
                      {Array.from(
                        videoTracks,
                        ([trackSid, trackIdentifier]) => {
                          let identity =
                            videoTracks.get(trackSid).participantIdentity;
                          return identity == 'tech' ? (
                            <>
                              <View style={styles.remoteParticipantMaps}>
                                <View
                                  style={[
                                    styles.localVideoRemote,
                                    {
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      textAlign: 'center',
                                    },
                                  ]}>
                                  <Text style={CommonStyles.text_14_bold}>
                                    Tech
                                  </Text>
                                </View>
                              </View>
                            </>
                          ) : null;
                        },
                      )}
                    </View>

                    <View>
                      {Array.from(
                        videoTracks,
                        ([trackSid, trackIdentifier]) => {
                          let identity =
                            videoTracks.get(trackSid).participantIdentity;
                          return identity != 'tutor' && identity != 'tech' ? (
                            <>
                              <View style={styles.remoteParticipantMaps}>
                                <TwilioVideoParticipantView
                                  style={styles.localVideoRemote}
                                  key={trackSid}
                                  trackIdentifier={trackIdentifier}
                                />
                                {starcliked && starclikedStudent == identity ? (
                                  <View style={styles.localVideotwo}>
                                    <LottieView
                                      source={lottie_star}
                                      autoPlay
                                      loop
                                    />
                                  </View>
                                ) : null}

                                {smileyclicked &&
                                smileyclikedStudent == identity ? (
                                  <View style={styles.localVideotwo}>
                                    <LottieView
                                      source={smileyStudent}
                                      autoPlay
                                      loop
                                    />
                                  </View>
                                ) : null}

                                {clappingclicked &&
                                clappingclikedStudent == identity ? (
                                  <View style={styles.localVideotwo}>
                                    <LottieView
                                      source={clapStudent}
                                      autoPlay
                                      loop
                                    />
                                  </View>
                                ) : null}

                                {thumbsUpclicked &&
                                thumbsUpclikedStudent == identity ? (
                                  <View style={styles.localVideotwo}>
                                    <LottieView
                                      source={thumsUp}
                                      autoPlay
                                      loop
                                    />
                                  </View>
                                ) : null}

                                <View
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignContent: 'center',
                                    width: '100%',
                                    justifyContent: 'space-evenly',
                                  }}>
                                  <View>
                                    <View style={styles.otherActivities}>
                                      <View
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          justifyContent: 'space-around',

                                          width: 50,
                                        }}>
                                        <SvgXml
                                          width="20"
                                          height="20"
                                          xml={starBtn}
                                        />
                                        {studentStar[`${identity}_star`] ==
                                        undefined ? (
                                          <Text
                                            style={[
                                              CommonStyles.text_14_bold,
                                              {textAlign: 'center'},
                                            ]}>
                                            0
                                          </Text>
                                        ) : (
                                          <Text
                                            style={[
                                              CommonStyles.text_14_bold,
                                              {textAlign: 'center'},
                                            ]}>
                                            {studentStar[`${identity}_star`]}
                                          </Text>
                                        )}
                                      </View>
                                    </View>
                                  </View>
                                  <View>
                                    <View style={styles.otherActivities}>
                                      <View
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          justifyContent: 'space-around',

                                          width: 50,
                                        }}>
                                        <SvgXml
                                          width="20"
                                          height="20"
                                          xml={smileyBtn}
                                        />
                                        {studentSmiley[`${identity}_smiley`] ==
                                        undefined ? (
                                          <Text
                                            style={[
                                              CommonStyles.text_14_bold,
                                              {textAlign: 'center'},
                                            ]}>
                                            0
                                          </Text>
                                        ) : (
                                          <Text
                                            style={[
                                              CommonStyles.text_14_bold,
                                              {textAlign: 'center'},
                                            ]}>
                                            {
                                              studentSmiley[
                                                `${identity}_smiley`
                                              ]
                                            }
                                          </Text>
                                        )}
                                      </View>
                                    </View>
                                  </View>
                                  <View>
                                    <View style={styles.otherActivities}>
                                      <View
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          justifyContent: 'space-around',

                                          width: 50,
                                        }}>
                                        <SvgXml
                                          width="20"
                                          height="20"
                                          xml={clappingBtn}
                                        />
                                        {studentClapping[
                                          `${identity}_clapping`
                                        ] == undefined ? (
                                          <Text
                                            style={[
                                              CommonStyles.text_14_bold,
                                              {textAlign: 'center'},
                                            ]}>
                                            0
                                          </Text>
                                        ) : (
                                          <Text
                                            style={[
                                              CommonStyles.text_14_bold,
                                              {textAlign: 'center'},
                                            ]}>
                                            {
                                              studentClapping[
                                                `${identity}_clapping`
                                              ]
                                            }
                                          </Text>
                                        )}
                                      </View>
                                    </View>
                                  </View>
                                  <View>
                                    <View style={styles.otherActivities}>
                                      <View
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          justifyContent: 'space-around',

                                          width: 50,
                                        }}>
                                        <SvgXml
                                          width="20"
                                          height="20"
                                          xml={thumsUpBtn}
                                        />
                                        {studentThumbsUp[
                                          `${identity}_thumbsUp`
                                        ] == undefined ? (
                                          <Text
                                            style={[
                                              CommonStyles.text_14_bold,
                                              {textAlign: 'center'},
                                            ]}>
                                            0
                                          </Text>
                                        ) : (
                                          <Text
                                            style={[
                                              CommonStyles.text_14_bold,
                                              {textAlign: 'center'},
                                            ]}>
                                            {
                                              studentThumbsUp[
                                                `${identity}_thumbsUp`
                                              ]
                                            }
                                          </Text>
                                        )}
                                      </View>
                                    </View>
                                  </View>
                                </View>
                              </View>
                            </>
                          ) : null;
                        },
                      )}
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    position: 'absolute',
                    flex: 1,
                    width: '100%',
                    zIndex: 2,
                    bottom: 1,
                  }}>
                  <View style={{top: 40}}>
                    <View
                      style={{
                        alignItems: 'flex-end',
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}>
                      {isChatBoxOpen && (
                        <KeyboardAvoidingView
                          behavior="position"
                          keyboardVerticalOffset={keyboardVerticalOffset}>
                          <View style={styles.chatBoxMain}>
                            <View style={styles.chatBoxMainHeader}>
                              <View style={styles.chatBoxMainHeaderFirst}>
                                <View
                                  style={{
                                    marginLeft: 10,
                                  }}>
                                  <Text>Chat</Text>
                                </View>
                                <View style={{marginRight: 10}}>
                                  <TouchableOpacity onPress={closeChatButton}>
                                    <SvgXml
                                      style={{justifyContent: 'flex-end'}}
                                      width="20"
                                      height="20"
                                      xml={closeChat}
                                    />
                                  </TouchableOpacity>
                                </View>
                              </View>

                              <View style={styles.chatBoxMainHeaderSecond}>
                                <ScrollView
                                  ref={ref => {
                                    scrollView_ref = ref;
                                  }}
                                  contentContainerStyle={{
                                    flexGrow: 1,
                                    justifyContent: 'space-between',
                                    backgroundColor: COLOR.WHITE,
                                  }}
                                  onContentSizeChange={() =>
                                    scrollView_ref.scrollToEnd({
                                      animated: true,
                                    })
                                  }>
                                  {chatMessageArray.map(dataElement => {
                                    return (
                                      <View style={styles.chatMessage}>
                                        <View
                                          style={styles.chatMessageSenderName}>
                                          <Text>
                                            {' '}
                                            {studentName(
                                              dataElement.identity,
                                            ) == 'tutor'
                                              ? 'Coach'
                                              : studentName(
                                                  dataElement.identity,
                                                )}{' '}
                                          </Text>
                                        </View>

                                        <View
                                          style={
                                            styles.chatMessageSenderMessage
                                          }>
                                          <Text
                                            style={{
                                              color: 'black',
                                              marginLeft: 5,
                                            }}>
                                            {getTextData(dataElement)}
                                          </Text>
                                        </View>
                                      </View>
                                    );
                                  })}
                                </ScrollView>
                              </View>
                            </View>

                            <View style={styles.chatBoxMainFooter}>
                              <View style={styles.chatBoxMainFooterInput}>
                                <TextInput
                                  ref={input => {
                                    message_input = input;
                                  }}
                                  onFocus={() => onFocusIn(message_input)}
                                  onBlur={() => onFocusOut(message_input)}
                                  style={styles.inputBoxStyling}
                                  placeholder="Enter Message"
                                  onChangeText={e => handleChangeTextarea(e)}
                                  value={textareaValue}
                                />
                              </View>

                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <TouchableOpacity
                                  onPress={dropChatMessage}
                                  onKeyPress={handleKeyDown}>
                                  <SvgXml
                                    style={{
                                      marginRight: 10,
                                      marginBottom: 1,
                                      marginTop: 10,
                                    }}
                                    width="35"
                                    height="35"
                                    xml={sendBtn}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </KeyboardAvoidingView>
                      )}
                    </View>
                  </View>
                  <View>
                    {newMessageCounter > 0 ? (
                      <View
                        style={{
                          backgroundColor: '#F24A4A',
                          color: 'white',
                          position: 'absolute',
                          right: 15,
                          padding: 4,
                          width: 22,
                          height: 22,
                          fontSize: 10,
                          borderRadius: 15,
                          zIndex: 1,
                          top: 7,
                        }}>
                        <Text style={{textAlign: 'center'}}>
                          {newMessageCounter}
                        </Text>
                      </View>
                    ) : (
                      <View>
                        <Text>{''}</Text>
                      </View>
                    )}

                    <View
                      style={{
                        alignItems: 'flex-end',
                        top: 10,
                      }}>
                      <TouchableOpacity onPress={openChatButton}>
                        <SvgXml
                          style={{justifyContent: 'flex-end'}}
                          width="100"
                          height="100"
                          xml={openChat}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <View style={styles.remoteParticipantViewUI}>
                  <View style={styles.remoteParticipantViewUIMain}>
                    <View style={styles.remoteParticipantMaps}>
                      {Array.from(
                        videoTracks,
                        ([trackSid, trackIdentifier]) => {
                          let identity =
                            videoTracks.get(trackSid).participantIdentity;

                          return identity == 'tutor' ? (
                            <View>
                              {forceRefresh && (
                                <TwilioVideoParticipantView
                                  style={styles.localVideo}
                                  key={trackSid}
                                  trackIdentifier={trackIdentifier}
                                />
                              )}
                            </View>
                          ) : null;
                        },
                      )}
                    </View>
                    <View style={styles.remoteParticipantMaps}>
                      {!isSharing ? (
                        <TwilioVideoLocalView
                          enabled={true}
                          style={styles.localVideo}
                        />
                      ) : (
                        <View style={styles.remoteParticipantMaps}>
                          <View
                            style={[
                              styles.localVideoRemote,
                              {
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                backgroundColor: 'yellow',
                              },
                            ]}>
                            <Text
                              style={[
                                CommonStyles.text_14_bold,
                                {textAlign: 'center'},
                              ]}>
                              {studentName(localParticipantIdentity)}
                            </Text>
                          </View>
                        </View>
                      )}

                      {starcliked &&
                      starclikedStudent == localParticipantIdentity ? (
                        <View style={styles.localVideotwo}>
                          <LottieView source={lottie_star} autoPlay loop />
                        </View>
                      ) : null}

                      {smileyclicked &&
                      smileyclikedStudent == localParticipantIdentity ? (
                        <View style={styles.localVideotwo}>
                          <LottieView source={smileyStudent} autoPlay loop />
                        </View>
                      ) : null}

                      {clappingclicked &&
                      clappingclikedStudent == localParticipantIdentity ? (
                        <View style={styles.localVideotwo}>
                          <LottieView source={clapStudent} autoPlay loop />
                        </View>
                      ) : null}

                      {thumbsUpclicked &&
                      thumbsUpclikedStudent == localParticipantIdentity ? (
                        <View style={styles.localVideotwo}>
                          <LottieView source={thumsUp} autoPlay loop />
                        </View>
                      ) : null}
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignContent: 'center',
                          width: '100%',
                          justifyContent: 'space-evenly',
                        }}>
                        <View>
                          <View style={styles.otherActivities}>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around',

                                width: 50,
                              }}>
                              <SvgXml width="20" height="20" xml={starBtn} />
                              {studentStar[
                                `${localParticipantIdentity}_star`
                              ] == undefined ? (
                                <Text
                                  style={[
                                    CommonStyles.text_14_bold,
                                    {textAlign: 'center'},
                                  ]}>
                                  0
                                </Text>
                              ) : (
                                <Text
                                  style={[
                                    CommonStyles.text_14_bold,
                                    {textAlign: 'center'},
                                  ]}>
                                  {
                                    studentStar[
                                      `${localParticipantIdentity}_star`
                                    ]
                                  }
                                </Text>
                              )}
                            </View>
                          </View>
                        </View>
                        <View>
                          <View style={styles.otherActivities}>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around',

                                width: 50,
                              }}>
                              <SvgXml width="20" height="20" xml={smileyBtn} />
                              {studentSmiley[
                                `${localParticipantIdentity}_smiley`
                              ] == undefined ? (
                                <Text
                                  style={[
                                    CommonStyles.text_14_bold,
                                    {textAlign: 'center'},
                                  ]}>
                                  0
                                </Text>
                              ) : (
                                <Text
                                  style={[
                                    CommonStyles.text_14_bold,
                                    {textAlign: 'center'},
                                  ]}>
                                  {
                                    studentSmiley[
                                      `${localParticipantIdentity}_smiley`
                                    ]
                                  }
                                </Text>
                              )}
                            </View>
                          </View>
                        </View>
                        <View>
                          <View style={styles.otherActivities}>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around',

                                width: 50,
                              }}>
                              <SvgXml
                                width="20"
                                height="20"
                                xml={clappingBtn}
                              />
                              {studentClapping[
                                `${localParticipantIdentity}_clapping`
                              ] == undefined ? (
                                <Text
                                  style={[
                                    CommonStyles.text_14_bold,
                                    {textAlign: 'center'},
                                  ]}>
                                  0
                                </Text>
                              ) : (
                                <Text
                                  style={[
                                    CommonStyles.text_14_bold,
                                    {textAlign: 'center'},
                                  ]}>
                                  {
                                    studentClapping[
                                      `${localParticipantIdentity}_clapping`
                                    ]
                                  }
                                </Text>
                              )}
                            </View>
                          </View>
                        </View>
                        <View>
                          <View style={styles.otherActivities}>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around',

                                width: 50,
                              }}>
                              <SvgXml width="20" height="20" xml={thumsUpBtn} />
                              {studentThumbsUp[
                                `${localParticipantIdentity}_thumbsUp`
                              ] == undefined ? (
                                <Text
                                  style={[
                                    CommonStyles.text_14_bold,
                                    {textAlign: 'center'},
                                  ]}>
                                  0
                                </Text>
                              ) : (
                                <Text
                                  style={[
                                    CommonStyles.text_14_bold,
                                    {textAlign: 'center'},
                                  ]}>
                                  {
                                    studentThumbsUp[
                                      `${localParticipantIdentity}_thumbsUp`
                                    ]
                                  }
                                </Text>
                              )}
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View>
                      {Array.from(
                        videoTracks,
                        ([trackSid, trackIdentifier]) => {
                          let identity =
                            videoTracks.get(trackSid).participantIdentity;
                          return identity == 'tech' ? (
                            <>
                              <View style={styles.remoteParticipantMaps}>
                                <View
                                  style={[
                                    styles.localVideoRemote,
                                    {
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      textAlign: 'center',
                                    },
                                  ]}>
                                  <Text style={CommonStyles.text_14_bold}>
                                    Tech
                                  </Text>
                                </View>
                              </View>
                            </>
                          ) : null;
                        },
                      )}
                    </View>
                    <View>
                      {Array.from(
                        videoTracks,
                        ([trackSid, trackIdentifier]) => {
                          let identity =
                            videoTracks.get(trackSid).participantIdentity;
                          return identity != 'tutor' && identity != 'tech' ? (
                            <>
                              <View style={styles.remoteParticipantMaps}>
                                <TwilioVideoParticipantView
                                  style={styles.localVideoRemote}
                                  key={trackSid}
                                  trackIdentifier={trackIdentifier}
                                />
                                {starcliked && starclikedStudent == identity ? (
                                  <View style={styles.localVideotwo}>
                                    <LottieView
                                      source={lottie_star}
                                      autoPlay
                                      loop
                                    />
                                  </View>
                                ) : null}

                                {smileyclicked &&
                                smileyclikedStudent == identity ? (
                                  <View style={styles.localVideotwo}>
                                    <LottieView
                                      source={smileyStudent}
                                      autoPlay
                                      loop
                                    />
                                  </View>
                                ) : null}

                                {clappingclicked &&
                                clappingclikedStudent == identity ? (
                                  <View style={styles.localVideotwo}>
                                    <LottieView
                                      source={clapStudent}
                                      autoPlay
                                      loop
                                    />
                                  </View>
                                ) : null}

                                {thumbsUpclicked &&
                                thumbsUpclikedStudent == identity ? (
                                  <View style={styles.localVideotwo}>
                                    <LottieView
                                      source={thumsUp}
                                      autoPlay
                                      loop
                                    />
                                  </View>
                                ) : null}

                                <View
                                  style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignContent: 'center',
                                    width: '100%',
                                    justifyContent: 'space-evenly',
                                  }}>
                                  <View>
                                    <View style={styles.otherActivities}>
                                      <View
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          justifyContent: 'space-around',

                                          width: 50,
                                        }}>
                                        <SvgXml
                                          width="20"
                                          height="20"
                                          xml={starBtn}
                                        />
                                        {studentStar[`${identity}_star`] ==
                                        undefined ? (
                                          <Text
                                            style={[
                                              CommonStyles.text_14_bold,
                                              {textAlign: 'center'},
                                            ]}>
                                            0
                                          </Text>
                                        ) : (
                                          <Text
                                            style={[
                                              CommonStyles.text_14_bold,
                                              {textAlign: 'center'},
                                            ]}>
                                            {studentStar[`${identity}_star`]}
                                          </Text>
                                        )}
                                      </View>
                                    </View>
                                  </View>
                                  <View>
                                    <View style={styles.otherActivities}>
                                      <View
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          justifyContent: 'space-around',

                                          width: 50,
                                        }}>
                                        <SvgXml
                                          width="20"
                                          height="20"
                                          xml={smileyBtn}
                                        />
                                        {studentSmiley[`${identity}_smiley`] ==
                                        undefined ? (
                                          <Text
                                            style={[
                                              CommonStyles.text_14_bold,
                                              {textAlign: 'center'},
                                            ]}>
                                            0
                                          </Text>
                                        ) : (
                                          <Text
                                            style={[
                                              CommonStyles.text_14_bold,
                                              {textAlign: 'center'},
                                            ]}>
                                            {
                                              studentSmiley[
                                                `${identity}_smiley`
                                              ]
                                            }
                                          </Text>
                                        )}
                                      </View>
                                    </View>
                                  </View>
                                  <View>
                                    <View style={styles.otherActivities}>
                                      <View
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          justifyContent: 'space-around',

                                          width: 50,
                                        }}>
                                        <SvgXml
                                          width="20"
                                          height="20"
                                          xml={clappingBtn}
                                        />
                                        {studentClapping[
                                          `${identity}_clapping`
                                        ] == undefined ? (
                                          <Text
                                            style={[
                                              CommonStyles.text_14_bold,
                                              {textAlign: 'center'},
                                            ]}>
                                            0
                                          </Text>
                                        ) : (
                                          <Text
                                            style={[
                                              CommonStyles.text_14_bold,
                                              {textAlign: 'center'},
                                            ]}>
                                            {
                                              studentClapping[
                                                `${identity}_clapping`
                                              ]
                                            }
                                          </Text>
                                        )}
                                      </View>
                                    </View>
                                  </View>
                                  <View>
                                    <View style={styles.otherActivities}>
                                      <View
                                        style={{
                                          display: 'flex',
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          justifyContent: 'space-around',

                                          width: 50,
                                        }}>
                                        <SvgXml
                                          width="20"
                                          height="20"
                                          xml={thumsUpBtn}
                                        />
                                        {studentThumbsUp[
                                          `${identity}_thumbsUp`
                                        ] == undefined ? (
                                          <Text
                                            style={[
                                              CommonStyles.text_14_bold,
                                              {textAlign: 'center'},
                                            ]}>
                                            0
                                          </Text>
                                        ) : (
                                          <Text
                                            style={[
                                              CommonStyles.text_14_bold,
                                              {textAlign: 'center'},
                                            ]}>
                                            {
                                              studentThumbsUp[
                                                `${identity}_thumbsUp`
                                              ]
                                            }
                                          </Text>
                                        )}
                                      </View>
                                    </View>
                                  </View>
                                </View>
                              </View>
                            </>
                          ) : null;
                        },
                      )}
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    position: 'absolute',
                    flex: 1,
                    width: '100%',
                    zIndex: 2,
                    bottom: 1,
                  }}>
                  <View style={{top: 40}}>
                    <View
                      style={{
                        alignItems: 'flex-end',
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}>
                      {isChatBoxOpen && (
                        <KeyboardAvoidingView
                          behavior="position"
                          keyboardVerticalOffset={keyboardVerticalOffset}>
                          <View style={styles.chatBoxMain}>
                            <View style={styles.chatBoxMainHeader}>
                              <View style={styles.chatBoxMainHeaderFirst}>
                                <View
                                  style={{
                                    marginLeft: 10,
                                  }}>
                                  <Text>Chat</Text>
                                </View>
                                <View style={{marginRight: 10}}>
                                  <TouchableOpacity onPress={closeChatButton}>
                                    <SvgXml
                                      style={{justifyContent: 'flex-end'}}
                                      width="20"
                                      height="20"
                                      xml={closeChat}
                                    />
                                  </TouchableOpacity>
                                </View>
                              </View>

                              <View style={styles.chatBoxMainHeaderSecond}>
                                <ScrollView
                                  ref={ref => {
                                    scrollView_ref = ref;
                                  }}
                                  contentContainerStyle={{
                                    flexGrow: 1,
                                    justifyContent: 'space-between',
                                    backgroundColor: COLOR.WHITE,
                                  }}
                                  onContentSizeChange={() =>
                                    scrollView_ref.scrollToEnd({
                                      animated: true,
                                    })
                                  }>
                                  {chatMessageArray.map(dataElement => {
                                    return (
                                      <View style={styles.chatMessage}>
                                        <View
                                          style={styles.chatMessageSenderName}>
                                          <Text>
                                            {' '}
                                            {studentName(
                                              dataElement.identity,
                                            ) == 'tutor'
                                              ? 'Coach'
                                              : studentName(
                                                  dataElement.identity,
                                                )}{' '}
                                          </Text>
                                        </View>

                                        <View
                                          style={
                                            styles.chatMessageSenderMessage
                                          }>
                                          <Text
                                            style={{
                                              color: 'black',
                                              marginLeft: 5,
                                            }}>
                                            {getTextData(dataElement)}
                                          </Text>
                                        </View>
                                      </View>
                                    );
                                  })}
                                </ScrollView>
                              </View>
                            </View>

                            <View style={styles.chatBoxMainFooter}>
                              <View style={styles.chatBoxMainFooterInput}>
                                <TextInput
                                  ref={input => {
                                    message_input = input;
                                  }}
                                  onFocus={() => onFocusIn(message_input)}
                                  onBlur={() => onFocusOut(message_input)}
                                  style={styles.inputBoxStyling}
                                  placeholder="Enter Message"
                                  onChangeText={e => handleChangeTextarea(e)}
                                  value={textareaValue}
                                />
                              </View>

                              <View
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <TouchableOpacity
                                  onPress={dropChatMessage}
                                  onKeyPress={handleKeyDown}>
                                  <SvgXml
                                    style={{
                                      marginRight: 10,
                                      marginBottom: 1,
                                      marginTop: 10,
                                    }}
                                    width="35"
                                    height="35"
                                    xml={sendBtn}
                                  />
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </KeyboardAvoidingView>
                      )}
                    </View>
                  </View>
                  <View>
                    {newMessageCounter > 0 ? (
                      <View
                        style={{
                          backgroundColor: '#F24A4A',
                          color: 'white',
                          position: 'absolute',
                          right: 15,
                          padding: 4,
                          width: 22,
                          height: 22,
                          fontSize: 10,
                          borderRadius: 15,
                          zIndex: 1,
                          top: 7,
                        }}>
                        <Text style={{textAlign: 'center'}}>
                          {newMessageCounter}
                        </Text>
                      </View>
                    ) : (
                      <View>
                        <Text>{''}</Text>
                      </View>
                    )}

                    <View
                      style={{
                        alignItems: 'flex-end',
                        top: 10,
                      }}>
                      <TouchableOpacity onPress={openChatButton}>
                        <SvgXml
                          style={{justifyContent: 'flex-end'}}
                          width="100"
                          height="100"
                          xml={openChat}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
          <TwilioVideo
            ref={twilioRef}
            onRoomDidConnect={_onRoomDidConnect}
            onNetworkQualityLevelsChanged={onNetworkQualityLevelsChanged}
            onDataTrackMessageReceived={onDataTrackMessageReceived}
            onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
            onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
            onRoomDidDisconnect={_onRoomDidDisconnect}
            onRoomDidFailToConnect={_onRoomDidFailToConnect}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <ErrorBoundary
            error={errorMessage}
            liveClassID={liveClassIdOfStudent}
            studentID={userIdOfStudent}
            navigation={props?.navigation}
          />
        </View>
      )}
    </>
  );
}

const mapStateToProps = state => {
  return {
    state: state.dashboard,
    loading: state.dashboard.loading,
    callTechnicalSupportStatus: state.dashboard.call_technical_support_status,
    callTechnicalSupportResponse:
      state.dashboard.call_technical_support_response,
  };
};

const mapDispatchToProps = {
  updateStudentFeedback,
  callTechSupport,
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoRoom);

const styles = StyleSheet.create({
  feedbackModal: {
    position: 'absolute',
    top: 10,
    left: 190,
    width: 570,
    height: 520,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },

  remoteParticipantMaps: {
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLOR.LIGHT_BORDER_COLOR,
    marginTop: 5,
  },

  containersecond: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
    flexDirection: 'row',
  },

  navbarAndTutor: {
    flex: 3,
    flexDirection: 'column',
  },

  remoteParticipantViewUI: {
    flex: 1,
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 5,
    margin: 'auto',
    padding: 5,
  },

  remoteParticipantViewUIMain: {
    height: SCREEN_HEIGHT / 2,
    width: 250,
  },

  remoteParticipantViewUIMainSecond: {
    flex: 1,
  },

  otherActivities: {
    position: 'relative',
    height: 24,
    top: 5,
    width: 80,
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  navbarAndTutorFirst: {
    flex: 0.8,
    marginTop: 5,
  },

  navbarAndTutorSecond: {
    flex: 4.8,
    zIndex: -1,
    height: 100,
    borderWidth: 1,
    borderColor: COLOR.LIGHT_BORDER_COLOR,
    borderRadius: 10,
    marginLeft: 5,
    marginBottom: 10,
  },

  callContainer: {
    flex: 1,
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 40,
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginRight: 70,
    marginLeft: 70,
    marginTop: 50,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  button: {
    marginTop: 100,
  },

  localVideo: {
    position: 'relative',
    width: 205,
    height: 180,
    overflow: 'hidden',
    marginTop: 2,
    alignSelf: 'center',
    resizeMode: 'contain',
    borderRadius: 5,
    padding: 5,
    marginLeft: 2,
    borderColor: COLOR.LIGHT_BORDER_COLOR,
    transform: [{rotateX: '0deg'}, {rotateY: '0deg'}],
  },

  localVideoRemote: {
    width: 205,
    height: 180,
    overflow: 'hidden',
    marginTop: 1,

    alignSelf: 'center',
    resizeMode: 'contain',
    padding: 10,
    marginLeft: 2,
    borderRadius: 5,
    borderColor: COLOR.LIGHT_BORDER_COLOR,
  },

  localVideotwo: {
    width: 150,
    height: 150,
    overflow: 'hidden',
    marginTop: 5,
    alignSelf: 'center',
    resizeMode: 'contain',
    position: 'absolute',
  },

  localVideoOnButtonEnabled: {
    bottom: '40%',
    width: '35%',
    left: '64%',
    height: '25%',
    zIndex: 2,
    borderWidth: 1,
    borderColor: 'coral',
  },
  localVideoOnButtonDisabled: {
    bottom: '30%',
    width: '35%',
    left: '64%',
    height: '25%',
    zIndex: 2,
  },
  remoteGrid: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: -1,
    position: 'relative',
  },

  allScreenFlex: {
    display: 'flex',
    flex: 1,
    //flexDirection: "row",
    //justifyContent: "space-evenly",
    padding: normalize(10),
    flexWrap: 'wrap',
  },

  allScreenFlexParticipant: {
    flexBasis: '50%',
    flexGrow: 1,
    marginLeft: normalize(10),
  },

  allScreenEmotigons: {
    position: 'absolute',
    top: 50,
    left: 30,
    alignItems: 'center',
    zIndex: 99,
    width: 400,
    height: 300,
    display: 'flex',
    justifyContent: 'center',
  },

  remoteVideoForAllScreen: {
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
    borderRadius: 20,
    marginBottom: normalize(5),
  },

  remoteVideoForAllScreenScreenShare: {
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
    borderRadius: 20,
    marginBottom: normalize(5),
    borderWidth: 1,
    borderColor: 'lightgrey',
    backgroundColor: 'yellow',
  },
  participantVideoContainer: {
    width: SCREEN_WIDTH - 20,
    height: SCREEN_HEIGHT / 2.5,
    alignSelf: 'center',
    borderColor: COLOR.BORDER_COLOR_GREY,
    overflow: 'hidden',
    borderRadius: 20,
    borderWidth: 5,
    marginVertical: 10,
    zIndex: 1,
  },
  remoteVideo: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: 650,
    height: SCREEN_HEIGHT / 1.5,
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
  },

  optionsContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    zIndex: 2,
  },
  optionButton: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100 / 2,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacing: {
    padding: 10,
  },
  inputLabel: {
    fontSize: 18,
  },
  buttonContainer: {
    height: normalize(45),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: wp('90%'),
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: '#1E3378',
    width: wp('90%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 10,
  },
  Buttontext: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
  },
  inputBox: {
    borderBottomColor: '#cccccc',
    fontSize: 16,
    width: wp('95%'),
    borderBottomWidth: 1,
  },

  chatBoxMain: {
    backgroundColor: 'white',
    height: 320,
    width: 280,
    borderWidth: 1,
    borderColor: COLOR.LIGHT_BORDER_COLOR,
    marginBottom: 10,
    borderRadius: 20,
    display: 'flex',
  },

  chatBoxMainHeader: {
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  chatBoxMainFooter: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  chatBoxMainFooterInput: {
    flex: 1,
  },

  chatBoxMainHeaderFirst: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  chatBoxMainHeaderSecond: {
    flex: 3,
    width: '100%',
    height: 40,
    marginBottom: 30,
  },

  chatMessage: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    marginTop: 5,
    padding: 5,
    marginBottom: 10,
  },

  chatMessageSenderName: {
    width: '100%',
    height: 20,
    borderRadius: 10,
  },

  chatMessageSenderMessage: {
    width: '100%',
    height: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLOR.LIGHT_BORDER_COLOR,
    backgroundColor: '#D0F5BE',
  },

  inputBoxStyling: {
    justifyContent: 'flex-start',
    flex: 1,
    padding: 15,
    height: 50,
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderColor: COLOR.LIGHT_BORDER_COLOR,
    backgroundColor: COLOR.WHITE,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 10,
  },
});
