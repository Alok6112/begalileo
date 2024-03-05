import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import ChoicesSection from "../QuestionAsserts/choicesComponent";
import HtmlViwer from "../QuestionAsserts/HtmlRender";
import ModalTester from "../QuestionAsserts/outputResponseModal";
import {
  MATH_ZONE_QUESTION,
  MATH_ZONE_LIVE_CLASS_QUESTION,
  MATH_ZONE_FLAGGED_QUESTION,
  MATH_ZONE_HOME_WORK_QUESTION,
} from "../../../components/helpers/Constants";
import SolutionComponent from "../QuestionAsserts/outputResponseComponent";
import QuestionPartBuilder from "../QuestionAsserts/questionPartBuilder";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

//console.log(res.data.question_data[0].question_type);
// let qus = res.data.question_data[0].question_text
// let finalData = JSON.parse(qus)
// console.log(finalData);
// console.log(windowWidth/ parseInt(finalData.cols));
// setColumnWidth((windowWidth/ parseInt(finalData.cols)))
// setQuestion(finalData)

const HorizontalPreviewClickQuestions = ({
  data,
  submitResponse,
  screenType,
  isResponse,
  handleStudentAnswerCorrect
}) => {
  console.log("HorizontalPreviewClickQuestions", data);
  //const question_id = data.question_data[0].question_id
  // data = {
  //   operation: 'addition',
  //   type: 'horizontalpreviewclick',
  //   rows: '2',
  //   cols: '9',
  //   questionName: 'Choose the correct division sentence for the given picture.',
  //   questionContent: [
  //     {
  //       row: 1,
  //       col: 1,
  //       value:
  //         '<img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Red-Square.png">',
  //     },
  //     {
  //       row: 1,
  //       col: 2,
  //       value:
  //         '<img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Red-Square.png">',
  //     },
  //     {
  //       row: 1,
  //       col: 3,
  //       value:
  //         '<img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Red-Square.png">',
  //     },
  //     {
  //       row: 1,
  //       col: 4,
  //       value:
  //         '<img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Red-Square.png">',
  //     },
  //     {
  //       row: 1,
  //       col: 5,
  //       value:
  //         '<img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Red-Square.png">',
  //     },
  //     {
  //       row: 1,
  //       col: 6,
  //       value:
  //         '<img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Red-Square.png">',
  //     },
  //     {
  //       row: 1,
  //       col: 7,
  //       value:
  //         '<img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Red-Square.png">',
  //     },
  //     {
  //       row: 1,
  //       col: 8,
  //       value:
  //         '<img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Red-Square.png">',
  //     },
  //     {
  //       row: 1,
  //       col: 9,
  //       value:
  //         '<img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Red-Square.png">',
  //     },
  //     {
  //       row: 2,
  //       col: 1,
  //       value:
  //         '<img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Red-Square.png">',
  //     },
  //     {
  //       row: 2,
  //       col: 2,
  //       value:
  //         '<img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Red-Square.png">',
  //     },
  //     {
  //       row: 2,
  //       col: 3,
  //       value:
  //         '<img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Red-Square.png">',
  //     },
  //     {
  //       row: 2,
  //       col: 4,
  //       value:
  //         '<img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Red-Square.png">',
  //     },
  //     {
  //       row: 2,
  //       col: 5,
  //       value:
  //         '<img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Red-Square.png">',
  //     },
  //     {
  //       row: 2,
  //       col: 6,
  //       value:
  //         '<img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Red-Square.png">',
  //     },
  //     {
  //       row: 2,
  //       col: 7,
  //       value:
  //         '<img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Red-Square.png">',
  //     },
  //     {
  //       row: 2,
  //       col: 8,
  //       value:
  //         '<img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Red-Square.png">',
  //     },
  //     {
  //       row: 2,
  //       col: 9,
  //       value:
  //         '<img src="https://s3.ap-south-1.amazonaws.com/begalileo-assets/GeometricalShapes/Red-Square.png">',
  //     },
  //   ],
  //   solution: {
  //     model: [
  //       {
  //         val: '18 ÷ 9 = 2',
  //       },
  //     ],
  //     sidebyside: [],
  //     srows: null,
  //     scols: null,
  //   },
  //   choices: ['6 ÷ 18 = 3', '18 ÷ 9 = 2', '18 ÷ 6 = 3', '18 ÷ 1 = 18'],
  //   choiceType: 'selectchoice',
  //   choiceCount: 4,
  //   answer: '18 ÷ 9 = 2',
  // };

  let temp1 = false;
  const question = JSON.parse(data.question_data[0].question_text);
  const [student_response, setStudentResponse] = useState(
    JSON.parse(data.question_data[0].question_text)
  );
  const question_id = data.question_data[0].question_id;

  const [isValidated, setIsValidated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [solution, setSolution] = useState("");
  const [rows, setRows] = useState([]);
  const [numbers, setNumbers] = useState(
    new Array(question.questionContent.length)
  );
  const [count, setCount] = useState(1);

  const picSource = {
    html: `
<div style='text-align:center;'>
${question.questionContent}
</div>`,
  };

  useEffect(() => {
    let arr = [];

    for (let i = 0; i < parseInt(question.rows); i++) {
      arr.push(i + 1);
    }

    setRows(arr);
  }, []);

  //const student_response = data;
  const validate = () => {
    if (selectedValue == null) {
      alert("Please choose the option");
      return;
    }

    if (question.answer == selectedValue) {
      temp1 = true;
      setIsCorrect(true);
    } else {
      temp1 = false;
      setIsCorrect(false);
    }

    setSolution(question.solution.model[0].val);
    //student response to send back
    student_response.studentAnswer = selectedValue;
    setStudentResponse(student_response);

    setIsValidated(true);
    
    if( screenType == MATH_ZONE_QUESTION){
      handleStudentAnswerCorrect(temp1)
    }

  };

  const handleChoices = (val) => {
    console.log("selected choice", val);
    setSelectedValue(val);
  };

  return (
    <View>
      <View style={styles.outterSection}>
        <View style={{ width: "80%" }}>
          <View style={{ display: "flex", marginTop: 10, marginBottom: 0 }}>
            {/* <HtmlViwer
              source={{ html: question.questionName }}
              isQuestion={true}
            /> */}
            <QuestionPartBuilder data={ question.questionName }/>
          </View>

          <View>
            {rows.map((row) => {
              return (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 10,
                    flexWrap: "wrap",
                  }}
                >
                  {question.questionContent.map((item, index) => {
                    if (row == item.row) {
                      return (
                        <View style={{display:"flex",alignItems:"center"}}>
                          <Text style={{ fontSize: 15, fontWeight: "600" }}>
                            {numbers[index]}
                          </Text>
                          <Pressable
                            onPress={() => {
                              let update = [...numbers];

                              if (
                                update[index] == undefined &&
                                count <= question.questionContent.length
                              ) {
                                update[index] = count;
                                setCount((prev) => prev + 1);
                                setNumbers([...update]);
                              }
                            }}
                          >
                            {/* <HtmlViwer source={{ html: item.value }} /> */}
                            <QuestionPartBuilder data={ item.value }  imgSize={50}/>
                          </Pressable>
                        </View>
                      );
                    }
                  })}
                </View>
              );
            })}
          </View>

          <ChoicesSection
            choices={question.choices}
            handleChoices={handleChoices}
            isResponse={isResponse}
            studentAnswer={student_response.studentAnswer}
            isValidated={isValidated}
          />
        </View>

        {screenType == MATH_ZONE_QUESTION ? (
          <View style={styles.submitButtonSection}>
            {isValidated ? (
              <Pressable
                style={styles.buttonStyle}
                onPress={() => {
                  // var formData = new FormData();
                  // formData.append('student_response', student_response);
                  // //  formData.append("student_answer", isClickedYesNo)
                  // submitResponse(question_id, formData)
                  // console.log(student_response);
                  submitResponse(question_id, student_response, isCorrect);
                  setIsValidated(false);
                  setIsCorrect(false);
                }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  Submit
                </Text>
              </Pressable>
            ) : (
              <Pressable
                style={styles.buttonStyle}
                onPress={() => {
                  validate();
                  // setIsValidated(true);
                }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  Solve
                </Text>
              </Pressable>
            )}
          </View>
        ) : (
          <></>
        )}

        {screenType == MATH_ZONE_LIVE_CLASS_QUESTION ? (
          <View style={styles.submitButtonSection}>
            {isValidated ? (
              <View
                style={{
                  height: 30,
                  width: 100,
                  borderWidth: 1,
                  borderColor: "white",
                  backgroundColor: "white",
                }}
              >
                <Text style={{ fontWeight: "bold", color: "black" }}>
                  please wait..
                </Text>
              </View>
            ) : (
              <Pressable
                style={styles.buttonStyle}
                onPress={() => {
                  validate();
                  setIsValidated(true);
                  // temp1 = isCorrect;
                  submitResponse(question_id, student_response, temp1);
                }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  Solve
                </Text>
              </Pressable>
            )}
          </View>
        ) : (
          <></>
        )}

        {screenType == MATH_ZONE_FLAGGED_QUESTION ? (
          <View style={styles.submitButtonSection}>
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {
                setSolution(question.solution.model[0].val);
                setIsValidated(true);
                setIsCorrect(true);
              }}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>
                Show Soln
              </Text>
            </Pressable>
          </View>
        ) : (
          <></>
        )}

        {screenType == MATH_ZONE_HOME_WORK_QUESTION ? (
          <View style={styles.submitButtonSection}>
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {
                setSolution(question.solution.model[0].val);
                setIsValidated(true);
                setIsCorrect(true);
              }}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>Solve</Text>
            </Pressable>
          </View>
        ) : (
          <></>
        )}
      </View>

      {screenType == MATH_ZONE_QUESTION && isValidated && (
        <ModalTester
          deviceHeight={windowHeight}
          isCorrect={isCorrect}
          solution={solution}
        />
      )}

      {(screenType == MATH_ZONE_LIVE_CLASS_QUESTION ||
        screenType == MATH_ZONE_FLAGGED_QUESTION) &&
        isValidated && (
          <SolutionComponent
            isCorrect={isCorrect}
            solution={solution}
            isMathquill={true}
            screenType={screenType}
          />
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    height: 30,
    width: 75,
    backgroundColor: "#3E46FF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonSection: {
    width: "20%",
    // marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  outterSection: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
    minHeight: windowHeight / 1.2,
  },
});

export default HorizontalPreviewClickQuestions;
