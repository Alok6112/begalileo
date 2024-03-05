import React from "react";

import { View, Text, ImageBackground } from "react-native";

import { SvgXml } from "react-native-svg";
import SpeedMathBgImage from "../../assets/Images/Speedmath/SM-Background.svg";
import SpeedMathBackgroundImage from "../../assets/Images/Speedmath/SM-Image.svg";
import Header from "./Header";
import Timer from "./Timer";
import Questions from "./Questions";
import Result from "./Result";
import { normalize } from "react-native-elements";

// const ipad = /Macintosh/.test(navigator.userAgent) && "ontouchend" in document;

class SpeedMath extends React.Component {
  constructor(props) {
    super(props);
    this.questionComponent = React.createRef();
    this.state = {
      dynamicHeight: false,
      playMode: "computer",
      pageNo: 1,
      counter: 5,
      gameComputerScore: 0,
      gameUserScore: 0,
      gameId: 0,
      userAnswerData: [],
      liveClassId: 0,
      userId: 0,
      isGetResultBtnVisible: false,
      singleModeOfPlay: [
        {
          name: "sm-mode",
          id: "speedmath-comp",
          label: "Play with computer",
          value: "computer",
        },

        {
          name: "sm-mode",
          id: "speedmath-teacher",
          label: "Play with teacher",
          value: "teacher",
        },
      ],
      modeOfPlay: [
        {
          name: "sm-mode",
          id: "speedmath-friend",
          label: "Play with friends",
          value: "globe",
        },
        {
          name: "sm-mode",
          id: "speedmath-teacher",
          label: "Play with teacher",
          value: "teacher",
        },
      ],
      questions: [
        {
          id: 1,
          questionText: "2 + 8 = ?",
          studentAnswer: "10",
          correctAnswer: "10",
        },
        {
          id: 2,
          questionText: "1 + 3 = ?",
          studentAnswer: "4",
          correctAnswer: "4",
        },
        {
          id: 3,
          questionText: "4 + 2 = ?",
          studentAnswer: "6",
          correctAnswer: "6",
        },
      ],

      students: [
        {
          student_id: 1,
          image: "/static/media/Speedmath/Kid1.svg",
          answers: [
            {
              question_id: 1,
              correctAnswer: "correct",
              image: "/static/media/Speedmath/Wrong-Ans.svg",
            },
            {
              question_id: 2,
              correctAnswer: "wrong",
              image: "/static/media/Speedmath/Correct-Ans.svg",
            },
            {
              question_id: 3,
              correctAnswer: "wrong",
              image: "/static/media/Speedmath/Wrong-Ans.svg",
            },
          ],
        },
        {
          student_id: 2,
          image: "/static/media/Speedmath/Kid2.svg",
          answers: [
            {
              question_id: 1,
              correctAnswer: "correct",
              image: "/static/media/Speedmath/Correct-Ans.svg",
            },
            {
              question_id: 2,
              correctAnswer: "wrong",
              image: "/static/media/Speedmath/Wrong-Ans.svg",
            },
            {
              question_id: 3,
              correctAnswer: "wrong",
              image: "/static/media/Speedmath/Wrong-Ans.svg",
            },
          ],
        },
        {
          student_id: 3,
          image: "/static/media/Speedmath/Kid3.svg",
          answers: [
            {
              question_id: 1,
              correctAnswer: "correct",
              image: "/static/media/Speedmath/Correct-Ans.svg",
            },
            {
              question_id: 2,
              correctAnswer: "wrong",
              image: "/static/media/Speedmath/Wrong-Ans.svg",
            },
            {
              question_id: 3,
              correctAnswer: "wrong",
              image: "/static/media/Speedmath/Correct-Ans.svg",
            },
          ],
        },
      ],
    };

    this.handlePlayMode = this.handlePlayMode.bind(this);
    this.submitSpeedMath = this.submitSpeedMath.bind(this);
  }

  isTutorCheck = (localParticipant) => {
    return localParticipant == "tutor" || localParticipant == "tech";
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.gameId != this.props.gameId) {
      this.setState({
        gameId: this.props.gameId,
      });
    }
    if (prevProps.gameMode != this.props.gameMode) {
      this.setState({
        playMode: this.props.gameMode,
      });
    }
  };

  componentDidMount() {
    // let lcd = "491";
    // let ud = "370";
    let userLiveClassId = this.props.userId;
    let liveClassIdStudent = this.props.liveClassID;

    console.log("UserId", userLiveClassId);
    console.log("LiveClassId", liveClassIdStudent);

    var sGameId = this.props.gameId;
    var sGameMode = this.props.gameMode;

    console.log(sGameId, "Game id");
    this.setState({
      liveClassId: liveClassIdStudent,
      userId: userLiveClassId,
      gameId: sGameId,
      playMode: sGameMode,
    });

    if (!this.isTutorCheck(this.props.identity)) {
      this.setState({
        pageNo: 2,
      });
    }
    // this.dynamicHeightControl();
  }

  dynamicHeightControl = () => {
    setTimeout(
      function () {
        this.setState({ dynamicHeight: !this.state.dynamicHeight });
      }.bind(this),
      2000
    );
  };

  handlePlayMode = (event) => {
    console.log(event);
    this.setState({
      playMode: event.target.value,
    });
  };

  update = (value) => {
    return () => {
      this.setState({
        counter: value,
      });
    };
  };

  setPageNo = (num) => {
    this.setState({
      pageNo: num,
    });
  };

  isTutorCheck = (localParticipant) => {
    return localParticipant == "tutor" || localParticipant == "tech";
  };

  startSpeedMathGame = async (level_id, live_class_id, play_with) =>
    axios.get(baseURL + "app_students/start_game", {
      params: {
        level_id,
        live_class_id,
        play_with,
      },
    });

  submitSpeedMath = (event) => {
    if (this.state.playMode === "") {
      alert("Please choose the play mode");
    } else {
      startSpeedMathGame(
        this.props.level,
        this.state.liveClassId,
        this.state.playMode
      ).then((res) => {
        console.log("checking data", res);
        // if (res.data.status) {
        //   this.setState({
        //     pageNo: 2,
        //     gameId: res.data.game_id,
        //   });
        //   this.props.runSpeedMath(
        //     res.data.game_id,
        //     this.state.playMode,
        //     this.props.level
        //   );
        //   this.setState({
        //     isGetResultBtnVisible: false,
        //   });
        //   this.props.currentChildgameid(this.state.gameId);
        // }
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    // if (prevProps.baseURL != this.props.baseURL) {
    //   this.dynamicHeightControl();
    // }
    let identity = this.props.videoRoom.localParticipant.identity;
    let elem = "reset";

    // if (isTutorCheck(identity)) {
    //   if (prevProps.level != this.props.level) {
    //     this.setState({
    //       pageNo: 1,
    //     });

    //     this.props.changeStatefunction();
    //   }
    // }
  }

  onTimerEnd = () => {
    this.setState({
      pageNo: 3,
    });
  };

  showQuestionLayout = () => {};

  onGameTimerEnd = (answerData, computerScore, userScore, gameId) => {
    this.setState(
      {
        userAnswerData: answerData,
        gameComputerScore: computerScore,
        gameUserScore: userScore,
        gameId: gameId,
      },
      () => {
        this.openResultPage();
      }
    );
  };

  openResultPage = () => {
    console.log(
      "COS",
      this.state.gameComputerScore,
      this.state.gameId,
      this.state.liveClassId,
      this.state.userId
    );
    this.setState({
      pageNo: 4,
    });
  };

  getQuestionComponent = () => {
    if (this.isTutorCheck(this.props.identity)) {
      if (this.state.playMode == "teacher")
        return (
          <Questions
            ref={this.questionComponent}
            gameId={this.state.gameId}
            identity={this.props.identity}
            levelId={this.props.level}
            liveClassId={this.state.liveClassId}
            userId={this.state.userId}
            setPageNo={this.setPageNo}
            playMode={this.state.playMode}
            onGameTimerEnd={this.onGameTimerEnd}
            onGameTimerStartStop={this.props.onGameTimerStartStop}
            onUpdateLiveSpeedMathScore={this.props.onUpdateLiveSpeedMathScore}
          />
        );
      else return this.gameInProgress();
    } else {
      return (
        <>
          <Questions
            ref={this.questionComponent}
            gameId={this.state.gameId}
            identity={this.props.identity}
            levelId={this.props.level}
            liveClassId={this.state.liveClassId}
            userId={this.state.userId}
            setPageNo={this.setPageNo}
            playMode={this.state.playMode}
            onGameTimerEnd={this.onGameTimerEnd}
            onGameTimerStartStop={this.props.onGameTimerStartStop}
            onUpdateLiveSpeedMathScore={this.props.onUpdateLiveSpeedMathScore}
          />
        </>
      );
    }
  };

  showGlobeResultTeacher = () => {
    console.log("Globe Teacehr");
    setTimeout(this.openResultPage, 5000);
  };

  showGetResultButton = () => {
    console.log("Hello get result button");
    this.setState({
      isGetResultBtnVisible: true,
    });
  };

  onGameProgressTimerEnd = () => {
    setTimeout(this.showGetResultButton, 10000);
    console.log(this.state.gameId, " --- ", this.state.playMode);
    if (!isTutorCheck(this.props.identity) && this.state.playMode != "globe")
      this.openResultPage();
  };

  gameInProgress = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          fontWeight: "bold",
        }}
      >
        <Container>
          <Row>
            <h2 style={{ color: "#233584", fontWeight: "bold" }}>
              Game in Progress
            </h2>
          </Row>

          {this.state.isGetResultBtnVisible && (
            <Row>
              <br />
              <Button onClick={this.openResultPage} variant="warning">
                Get Result
              </Button>
            </Row>
          )}

          <Row>
            {this.props.speedMathScoreDataItem.map((item) => {
              return (
                <Container>
                  <Row>
                    <Col>
                      <h2 style={{ color: "#233584", fontWeight: "bold" }}>
                        {studentName(item.name)} - {item.score}
                      </h2>
                    </Col>
                  </Row>
                </Container>
              );
            })}
          </Row>

          <QuestionTimer callBack={this.onGameProgressTimerEnd} />
        </Container>
      </div>
    );
  };

  render() {
    const { level, classId, rparticipants } = this.props;
    const { dynamicHeight } = this.state;

    return (
      <React.Fragment>
        <View style={{ flex: 1, height: normalize(500) }}>
          <View>
            <SvgXml
              height="100%"
              width="100%"
              viewBox="0 0 0"
              xml={SpeedMathBackgroundImage}
            />
            <SvgXml
              height="100%"
              width="100%"
              viewBox="0 0 0"
              style={{ position: "absolute" }}
              xml={SpeedMathBgImage}
            />
          </View>

          {this.state.pageNo === 2 ? (
            <Timer
              pageNo={this.state.pageNo}
              setPageNo={this.setPageNo}
              callBack={this.onTimerEnd}
            />
          ) : null}

          {this.state.pageNo === 3 ? this.getQuestionComponent() : <></>}

          {this.state.pageNo === 4 ? (
            <Result
              questions={this.state.questions}
              students={this.state.students}
              userAnswerData={this.state.userAnswerData}
              computerScore={this.state.gameComputerScore}
              gameId={this.state.gameId}
              mode={this.state.playMode}
              identity={this.props.identity}
              liveClassId={this.state.liveClassId}
              playerId={this.state.userId}
              levelId={this.props.level}
            />
          ) : null}
        </View>
      </React.Fragment>
    );
  }
}

export default SpeedMath;
