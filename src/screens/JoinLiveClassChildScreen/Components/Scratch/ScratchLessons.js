import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
} from "react";

import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  Text,
  ImageBackground,
  TextInput,
} from "react-native";

import { SketchCanvas } from "@terrylinla/react-native-sketch-canvas";
import RNSketchCanvas from "@terrylinla/react-native-sketch-canvas";
import GraphPaper from "../../assets/Images/Whiteboard/GRAPH_PAPER.png";
import { SvgXml } from "react-native-svg";
import BlackColor from "./Colors/Black.svg";
import Blue from "./Colors/Blue.svg";
import Brown from "./Colors/Brown.svg";
import Green from "./Colors/Green.svg";
import Pink from "./Colors/Pink.svg";
import Red from "./Colors/Red.svg";
import ColourPalette from "./Toolbar/Colour-palette.svg";
import Eraser from "./Toolbar/Eraser.svg";
import { COLOR } from "../../../../config/styles";

import Pensil from "./Toolbar/Pencil.svg";
//import Color from "./components/color";

const ScratchLesson = forwardRef((props, ref) => {
  const [pdfImage, setPdfImage] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [canvaslines, setCanvasLines] = useState([]);
  const [temp, setTemp] = useState([]);
  const [lines, setLines] = useState([]);
  const [stageLines, setStageLines] = useState([]);
  const [showGrpahImage, setGraphImage] = useState(false);
  const [colorPickerValueState, setColorpickerValue] = useState("red");
  const [colorPalette, setcolorPalette] = useState(false);
  const [showInputText, setShowInputText] = useState(false);
  const [activeTextToolbar, setActiveTextToolbar] = useState(false);
  const [textareaInput, setTextAreaInput] = useState("Hello there");

  const [whiteBoardLinesfinal, setWhiteboardlines] = useState([]);
  const [data, setData] = useState([
    {
      path: {
        id: 66096934,
        color: "red",
        width: 7,
        data: [
          "672,342",
          "655.5,342",
          "589,333.5",
          "567,330",
          "491,318",
          "411,314.5",
          "333,329.5",
          "278,371",
          "247.5,431.5",
          "234,525",
          "243.5,622.5",
          "291.5,757.5",
          "316,794",
          "397.5,855.5",
          "523.5,893",
          "776,893",
          "937.5,855.5",
          "1021,817.5",
        ],
      },
      size: { width: 1024, height: 1228 },
      drawer: null,
    },
  ]);

  const [text, setText] = useState([]);

  const [count, setCount] = useState(0);
  const [strokePensil, setStrokePensil] = useState(false);
  const [eraserOption, setEraserOption] = useState(false);
  const [penStrokeValue, setPensilStrokeValue] = useState(5);
  const [isClicked, setIsClicked] = useState();
  const [isClickedColor, setIsClickedColor] = useState(0);
  const [touchEnable, setTouchEnable] = useState(true);
  const [touchBox, setTouchBox] = useState(true);
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);

  const [startStraightLineState, setStartStraightLine] = useState(false);

  const eraserSizes = [
    {
      id: "1",
      name: "Black",
      image: "./Colors/Black.svg",
      size: "5",
    },
    {
      id: "2",
      name: "Red",
      image: "./Colors/Black.svg",
      size: "10",
    },
    {
      id: "3",
      name: "Green",
      image: "./Colors/Black.svg",
      size: "15",
    },
  ];

  const canvasRef = useRef(null);

  const colorsArr = [BlackColor, Blue, Pink, Red, Brown, Green];
  const strokePensilSize = ["Light", "Medium", "Dark"];

  const ipad =
    /Macintosh/.test(navigator.userAgent) && "ontouchend" in document;

  const handleColorPicker = (id) => {
    if (id == 0) {
      setColorpickerValue("black");
      setIsClickedColor(0);
    } else if (id == 1) {
      setColorpickerValue("blue");
      setIsClickedColor(1);
    } else if (id == 2) {
      setColorpickerValue("pink");
      setIsClickedColor(2);
    } else if (id == 3) {
      setColorpickerValue("red");
      setIsClickedColor(3);
    } else if (id == 4) {
      setColorpickerValue("brown");
      setIsClickedColor(4);
    } else {
      setColorpickerValue("green");
      setIsClickedColor(5);
    }
  };

  const handlePencilValue = (id) => {
    if (id == 0) {
      setPensilStrokeValue(3);
      setIsClicked(0);
    } else if (id == 1) {
      setPensilStrokeValue(4);
      setIsClicked(1);
    } else {
      setPensilStrokeValue(7);
      setIsClicked(2);
    }
  };

  const handleEraserOptionValue = (id) => {
    if (id == 0) {
      setColorpickerValue("#00000000");
      setPensilStrokeValue(3);
      setIsClicked(0);
    } else if (id == 1) {
      setColorpickerValue("#00000000");
      setPensilStrokeValue(4);
      setIsClicked(1);
    } else {
      setColorpickerValue("#00000000");
      setPensilStrokeValue(7);
      setIsClicked(2);
    }
  };

  const openColorPalette = () => {
    setcolorPalette(!colorPalette);
  };

  const openStrokePensil = () => {
    setStrokePensil(!strokePensil);
  };

  const openEraserBtn = () => {
    //setEraserOption(!eraserOption);

    setColorpickerValue("#00000000");
    setPensilStrokeValue(8);
  };

  const startStraightLine = () => {
    setStartStraightLine(true);
  };

  function isOdd(num) {
    return num % 2;
  }

  function getOffsetValue(number, percentToGet) {
    return (percentToGet / 100) * number;
  }

  function getXNewValuetwo(xOld) {
    var widthNew = 700;
    var widthOld = 1100;
    if (ipad) {
      widthNew = 700;
      widthOld = 1100;
    } else {
      widthNew = 1100;
      widthOld = 700;
    }

    var newValue = (xOld * widthNew) / widthOld;
    var offsetValue = getOffsetValue(newValue, 35);

    if (ipad) newValue += offsetValue;
    else newValue -= offsetValue;
    return newValue;
    //   widthNew = 700;
    //   widthOld = 1100;
    // }

    // var newValue = (xOld * widthNew) / widthOld;
    // var offsetValue = getOffsetValue(newValue, 7);

    // if (ipad) newValue += offsetValue;
    // else newValue -= offsetValue;

    // return newValue;
  }

  function getYNewValuetwo(yOld) {
    var heightNew = 450;
    var heightOld = 600;
    if (ipad) {
      heightNew = 450;
      heightOld = 600;
    } else {
      heightNew = 600;
      heightOld = 450;
    }
    var newValue = (yOld * heightNew) / heightOld;
    var offsetValue = getOffsetValue(newValue, 16);
    if (ipad) newValue -= offsetValue;
    else newValue += offsetValue;
    return newValue;
  }

  function getXNewValue(xOld) {
    var widthNew = 700;
    var widthOld = 1100;

    if (ipad) {
      widthNew = 700;
      widthOld = 1100;
    } else {
      widthNew = 1100;
      widthOld = 700;
    }

    var newValue = (xOld * widthNew) / widthOld;
    var offsetValue = getOffsetValue(newValue, 18);

    if (ipad) newValue += offsetValue;
    else newValue += offsetValue;
    return newValue;
    // if (ipad) {
    //   widthNew = 900;
    //   widthOld = 1100;
    // } else {
    //   widthNew = 1100;
    //   widthOld = 520;
    // }

    // var newValue = (xOld * widthNew) / widthOld;
    // var offsetValue = getOffsetValue(newValue, 5);

    // if (ipad) newValue -= offsetValue;
    // else newValue -= offsetValue;
    // console.log("New Value", newValue);
    // return newValue;
  }

  function getYNewValue(yOld) {
    var heightNew = 450;
    var heightOld = 600;
    if (ipad) {
      heightNew = 450;
      heightOld = 600;
    } else {
      heightNew = 600;
      heightOld = 450;
    }
    var newValue = (yOld * heightNew) / heightOld;
    var offsetValue = getOffsetValue(newValue, 30);
    if (ipad) newValue -= offsetValue;
    else newValue -= offsetValue;
    return newValue;
    // var heightNew = 650;
    // var heightOld = 600;
    // if (ipad) {
    //   heightNew = 650;
    //   heightOld = 600;
    // } else {
    //   heightNew = 600;
    //   heightOld = 650;
    // }
    // var newValue = (yOld * heightNew) / heightOld;
    // var offsetValue = getOffsetValue(newValue, 1);
    // if (ipad) newValue -= offsetValue;
    // else newValue -= offsetValue;
    // return newValue;
  }

  useImperativeHandle(ref, () => ({
    onRemoteLineUpdate(whiteBoardLines) {
      console.log("Whiteboard lines whiteboard component", whiteBoardLines);
      checkAndUpdateWriting(whiteBoardLines);
    },
    onPageNumberUpdate(pageNumber) {
      remoteChangePageNumber(pageNumber);
    },

    onGraphImageClick(status) {
      let isTrueSet = status == "true";
      setGraphImage(isTrueSet);
    },

    onClearCanvas() {
      handleClearCanvas();
    },

    onRemoteShowRoughBoard() {
      console.log("Its a quiz whiteboard");
    },
  }));

  function handleClearCanvas() {
    if (canvasRef.current != null) {
      canvasRef.current.clear();
    }
  }

  function checkAndUpdateWriting(whiteBoardLines) {
    // replaceChildPoint(whiteBoardLines.points);
    console.log(whiteBoardLines.tool, "ggggggg");

    if (whiteBoardLines.tool == "eraser") {
      replaceChildPointWithEraser(whiteBoardLines.points);
    }
    console.log("Whiteboard lines points", whiteBoardLines);
    if (whiteBoardLines.tool == "text") {
      renderChildText(whiteBoardLines);
    }

    if (whiteBoardLines.tool == "line") {
      renderChildStraightLine(whiteBoardLines.points);
    }
    if (whiteBoardLines.tool == "pen") {
      console.log("logggggggg", whiteBoardLines);
      replaceChildPoint(
        whiteBoardLines.points,
        whiteBoardLines.colorPickerValue
      );
    }
    setWhiteboardlines([...whiteBoardLinesfinal, whiteBoardLines]);
  }

  const renderChildText = (whiteBoardLines) => {
    console.log(whiteBoardLines, "asasasassaass");
    let obj = {
      text: "",
      font: "fonts/IndieFlower.ttf",
      fontSize: 30,
      position: { x: 0, y: 0 },
      anchor: { x: 0, y: 0 },
      coordinate: "Absolute",
      fontColor: "black",
    };

    obj.text = whiteBoardLines.value;
    obj.position.x = whiteBoardLines.x;
    obj.position.y = whiteBoardLines.y;

    setText([...text, obj]);
  };

  function remoteChangePageNumber(index) {
    canvasRef?.current?.clear();

    setCurrentIndex(parseInt(index));
  }

  const replaceChildPointWithEraser = (points) => {
    console.log("Points", points);
    var elevatedLines = [];
    points.forEach((element, index) => {
      var pointManipulation = 0;
      if (isOdd(index)) pointManipulation = getXNewValue(element);
      else pointManipulation = getYNewValue(element);
      elevatedLines.push(pointManipulation);
    });
    points = elevatedLines;

    setCount((prev) => prev + 1);

    let dummy = [];
    for (let i = 0; i < points.length - 1; i = i + 2) {
      let strData = String(points[i]) + "," + String(points[i + 1]);
      dummy.push(strData);
    }
    // console.log("str Arr", dummy);
    data[0].path.data = dummy;
    data[0].path.id = data[0].path.id + count;
    data[0].path.color = "#00000000";
    setData(data);

    if (data.length !== 0) {
      for (let index = 0; index < data.length; index++) {
        canvasRef?.current.addPath(data[index]);
      }
    }
  };

  const replaceChildPoint = (points, color) => {
    // console.log("Points", count);
    console.log("Points", points);
    var elevatedLines = [];
    points.forEach((element, index) => {
      var pointManipulation = 0;
      if (isOdd(index)) pointManipulation = getXNewValue(element);
      else pointManipulation = getYNewValue(element);
      elevatedLines.push(pointManipulation);
    });
    points = elevatedLines;

    setCount((prev) => prev + 1);

    let dummy = [];
    for (let i = 0; i < points.length - 1; i = i + 2) {
      let strData = String(points[i]) + "," + String(points[i + 1]);
      dummy.push(strData);
    }
    // console.log("str Arr", dummy);
    data[0].path.data = dummy;
    data[0].path.id = data[0].path.id + count;
    data[0].path.color = color;
    setData(data);

    if (data.length !== 0) {
      for (let index = 0; index < data.length; index++) {
        canvasRef?.current.addPath(data[index]);
      }
    }
  };

  const renderChildStraightLine = (points) => {
    var elevatedLines = [];
    points.forEach((element, index) => {
      var pointManipulation = 0;
      if (isOdd(index)) pointManipulation = getXNewValue(element);
      else pointManipulation = getYNewValue(element);
      elevatedLines.push(pointManipulation);
    });
    points = elevatedLines;

    setCount((prev) => prev + 1);

    let dummy = [];
    for (let i = 0; i < points.length - 1; i = i + 2) {
      let strData = String(points[i]) + "," + String(points[i + 1]);
      dummy.push(strData);
    }
    // console.log("str Arr", dummy);
    data[0].path.data = dummy;
    data[0].path.id = data[0].path.id + count;
    //data[0].path.color = color;
    setData(data);

    if (data.length !== 0) {
      for (let index = 0; index < data.length; index++) {
        canvasRef?.current.addPath(data[index]);
      }
    }
  };

  useEffect(() => {
    console.log("Props selPdfUrl", props.selPdfUrl);
    if (props.selPdfUrl != undefined) {
      setPdfImage(props.selPdfUrl);
    }
    setCurrentIndex(props.selPdfIndex);
  }, [pdfImage]);

  useEffect(() => {
    console.log("canvas ref", canvasRef?.drawLine);
  }, [currentIndex, pdfImage]);

  const handleMouseDown = (x, y) => {
    let tool = "pen";
    let colorPickerValue = colorPickerValueState;
    let penStroke = penStrokeValue;
    var allLines = [
      ...stageLines,
      {
        tool,
        penStroke,
        colorPickerValue,

        points: [x, y],
      },
    ];

    setLines(allLines);
    console.log("All lines", allLines);
    let newStageLines = [...stageLines];
    setStageLines(newStageLines);
  };

  const handleMouseMove = (x, y) => {
    //let lastLine = lines[lines.length - 1];

    let lastLine = lines[0].points.push(x);
    lines[0].points.push(y);
    //setLines([lastLine]);

    //console.log("checjjfnj", lastLine);
  };

  const handleMouseLeave = () => {
    console.log("Mouse leave", lines);
    var elevatedLines = [];
    lines[0].points.forEach((element, index) => {
      var pointManipulation = 0;
      if (isOdd(index)) pointManipulation = getXNewValuetwo(element);
      else pointManipulation = getYNewValuetwo(element);
      elevatedLines.push(pointManipulation);
    });
    // lines.points = elevatedLines;
    lines[0].points = elevatedLines;

    if (colorPickerValueState == "#00000000") {
      lines[0].tool = "eraser";
      lines[0].colorPickerValue = "red";
    } else {
      console.log("Normal flow");
    }

    // if (colorPickerValueState == "#00000000") {
    //   lines[0].tool = "eraser";
    // } else {
    //   console.log("Normal flow");
    // }

    console.log(lines, "after");

    props.onSendWhiteBoardLines(lines);
    // let lines = canvasRef.current.getPaths();
    // setCanvasLines([...canvaslines, lines]);
  };

  const userIdentify = (e) => {
    console.log("User Identify", e);
  };

  const clearAll = () => {
    console.log("Canvas ref", canvasRef.current.clear());
    setTemp("");
  };

  const sendWhiteboardlines = () => {
    // let arr = [
    //   {
    //     colorPickerValue: "red",
    //     penStroke: 5,
    //     points: [
    //       602.5751643514133, 251, 602.5751643514133, 251, 603.5752372345233,
    //       251, 604.5753101176334, 251, 605.5753830007434, 251,
    //       607.5755287669635, 251, 608.5756016500736, 251, 609.5756745331837,
    //       252, 610.5757474162938, 253, 610.5757474162938, 254,
    //       610.5757474162938, 255, 611.5758202994039, 257, 611.5758202994039,
    //       259, 611.5758202994039, 261, 611.5758202994039, 264,
    //       611.5758202994039, 266, 611.5758202994039, 268, 611.5758202994039,
    //       270, 610.5757474162938, 271, 609.5756745331837, 272,
    //       608.5756016500736, 273, 607.5755287669635, 274, 606.5754558838535,
    //       274, 605.5753830007434, 274, 604.5753101176334, 274,
    //       602.5751643514133, 274, 601.5750914683032, 274, 600.5750185851931,
    //       274, 598.574872818973, 274, 597.5747999358629, 273, 596.5747270527528,
    //       273, 596.5747270527528, 272, 595.5746541696427, 271,
    //       595.5746541696427, 270, 595.5746541696427, 269, 595.5746541696427,
    //       267, 594.5745812865326, 265, 594.5745812865326, 263,
    //       594.5745812865326, 260, 594.5745812865326, 258, 594.5745812865326,
    //       256, 594.5745812865326, 254, 595.5746541696427, 252,
    //       596.5747270527528, 250, 597.5747999358629, 249, 597.5747999358629,
    //       247, 598.574872818973, 246, 599.574945702083, 246, 599.574945702083,
    //       246, 600.5750185851931, 246, 600.5750185851931, 246,
    //       600.5750185851931, 246,
    //     ],
    //     tool: "pen",
    //   },
    // ];

    console.log("Lines", lines);
    props.onSendWhiteBoardLines(arr);
  };

  const handleData = (e) => {
    console.log(e, "eeeee");
  };

  // const openTextInput = () => {
  //   setTouchBox(!touchBox);
  // };

  // const handleTextBoxPosition = (e) => {
  //   setXPosition(e.pageX);
  //   setYPosition(e.pageY);

  // };

  // const handleTextArea = (e) => {
  //   setTextAreaInput(e);
  // };

  // const sendTextInput = () => {
  //   var item = [
  //     {
  //       tool: "text",
  //       value: textareaInput,
  //       x: xPosition,
  //       y: yPosition,
  //     },
  //   ];
  //   console.log("Item", item);
  //   props.onSendWhiteBoardLines(item);
  // };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SafeAreaView
        style={{
          // flex: 1,
          // backgroundColor: "black",
          height: 650,
          width: 700,
          // backgroundColor: "black",
        }}
      >
        <View
          style={{
            position: "absolute",
            zIndex: 99,
            width: 38,
            height: 38,
            borderRadius: 10,
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              position: "absolute",
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={openColorPalette}>
              <SvgXml style={{ width: 100, height: 100 }} xml={ColourPalette} />
            </TouchableOpacity>
          </View>
          {colorPalette && (
            <View
              style={{
                display: "flex",
                flex: 1,
                zIndex: 9,
                position: "absolute",
                top: 50,
                borderWidth: 1,
                borderColor: COLOR.BORDER_COLOR_GREY,
                borderRadius: 10,
                backgroundColor: COLOR.WHITE,
              }}
            >
              {colorsArr.map((obj, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      width: 50,
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity onPress={() => handleColorPicker(i)}>
                      <SvgXml
                        style={
                          isClickedColor == i
                            ? styles.boldColorPalette
                            : styles.colorPaletteNormal
                        }
                        xml={obj}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )}
        </View>
        <View
          style={{
            position: "absolute",
            zIndex: 99,
            width: 38,
            height: 38,
            borderRadius: 10,
            marginLeft: 55,
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              position: "absolute",
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={openStrokePensil}>
              <SvgXml style={{ width: 100, height: 100 }} xml={Pensil} />
            </TouchableOpacity>
          </View>
          {strokePensil && (
            <View
              style={{
                display: "flex",
                flex: 1,
                zIndex: 9,
                position: "absolute",
                top: 50,
                borderWidth: 1,
                borderColor: COLOR.BORDER_COLOR_GREY,
                borderRadius: 10,
                backgroundColor: COLOR.WHITE,
              }}
            >
              {strokePensilSize.map((obj, i) => {
                return (
                  <View
                    key={i}
                    style={{
                      width: 80,
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity onPress={() => handlePencilValue(i)}>
                      <Text style={isClicked == i ? styles.boldText : "none"}>
                        {obj}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          )}
        </View>
        <View
          style={{
            position: "absolute",
            zIndex: 99,
            width: 38,
            height: 38,
            marginLeft: 105,
            borderRadius: 10,
            marginTop: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              position: "absolute",
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={openEraserBtn}>
              <SvgXml style={{ width: 100, height: 100 }} xml={Eraser} />
            </TouchableOpacity>
          </View>
          {/* {eraserOption && (
              <View
                style={{
                  display: "flex",
                  flex: 1,
                  zIndex: 9,
                  position: "absolute",
                  top: 50,
                  borderWidth: 1,
                  borderColor: COLOR.BORDER_COLOR_GREY,
                  borderRadius: 10,
                  backgroundColor: COLOR.WHITE,
                }}
              >
                {eraserSizes?.forEach((obj, i) => {
                  return (
                    <View
                      key={i}
                      style={{
                        width: 80,
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "black",
                      }}
                    >
                      {console.log(i, obj.size, obj.image, "iddddd")}
                      <TouchableOpacity
                        onPress={() => handleEraserOptionValue(obj.size)}
                      >
                        <Text style={isClicked == i ? styles.boldText : "none"}>
                          {i}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            )} */}
        </View>

        {/* <View
          style={{
            position: "absolute",
            zIndex: 99,
            width: 50,
            height: 50,
  
            marginLeft: 105,
          }}
        >
          <View
            style={{
              position: "absolute",
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={openTextInput}>
              <Text>Text Input</Text>
            </TouchableOpacity>
          </View>
        </View> */}
        {/* <View
          style={{
            position: "absolute",
            zIndex: 99,
            width: 50,
            height: 50,
  
            marginLeft: 155,
          }}
        >
          <View
            style={{
              position: "absolute",
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={sendTextInput}>
              <Text>Send Text Input</Text>
            </TouchableOpacity>
          </View>
        </View> */}

        {showGrpahImage && (
          <Image
            style={{
              height: "100%",
              width: "100%",
              resizeMode: "contain",
              position: "absolute",
            }}
            source={GraphPaper}
          />
        )}

        <Image
          style={{
            // height: "100%",
            // width: "100%",
            height: 650,
            width: 700,
            // backgroundColor: "black",
            resizeMode: "contain",
            position: "absolute",
          }}
          source={{
            uri: pdfImage[currentIndex],
          }}
        />

        {/* {touchBox && (
          <>
            <View
              style={{
                width: "100%",
                height: "100%",
              }}
              onTouchStart={(e) => {
                handleTextBoxPosition(e.nativeEvent);
              }}
            ></View>
  
            <View
              style={{
                position: "absolute",
                borderWidth: 1,
                top: yPosition - 130,
                left: xPosition + 20,
                padding: 10,
              }}
            >
              <TextInput
                style={{ width: 200, height: 100 }}
                placeholder="Enter Text hear"
                onChangeText={(e) => handleTextArea(e)}
                // onKeyDown={(e) => onEnterPress(e)}
              ></TextInput>
            </View>
          </>
        )} */}

        <SketchCanvas
          ref={canvasRef}
          style={{
            flex: 1,
            height: 650,
            width: 700,
            // height: "100%",
            // width: "100%",

            //position: "absolute",
          }}
          strokeColor={colorPickerValueState}
          strokeWidth={penStrokeValue}
          text={text}
          onStrokeStart={handleMouseDown}
          onStrokeChanged={handleMouseMove}
          onStrokeEnd={handleMouseLeave}
          user={userIdentify}
          addPath={handleData}
          includeImage={true}
        />

        {/* <RNSketchCanvas
          text={[
            {
              text: "Hello",
              font: "fonts/IndieFlower.ttf",
              fontSize: 30,
              position: { x: 0, y: 0 },
              anchor: { x: 0, y: 0 },
              coordinate: "Absolute",
              fontColor: "red",
            },
          ]}
          style={{
            // position: "absolute",
            backgroundColor: "black",
            flex: 1,
            height: "100%",
            width: "100%",
          }}
          ref={canvasRef}
          containerStyle={{ backgroundColor: "transparent", flex: 1 }}
          canvasStyle={{ backgroundColor: "transparent", flex: 1 }}
          defaultStrokeIndex={0}
          defaultStrokeWidth={5}
          onStrokeStart={handleMouseDown}
          onStrokeChanged={handleMouseMove}
          onStrokeEnd={handleMouseLeave}
          closeComponent={
            <View style={styles.functionButton}>
              <Text style={{ color: "white" }}>Close</Text>
            </View>
          }
          undoComponent={
            <View style={styles.functionButton}>
              <Text style={{ color: "white" }}>Undo</Text>
            </View>
          }
          clearComponent={
            <View style={styles.functionButton}>
              <Text style={{ color: "white" }}>Clear</Text>
            </View>
          }
          eraseComponent={
            <View style={styles.functionButton}>
              <Text style={{ color: "white" }}>Eraser</Text>
            </View>
          }
          strokeComponent={(color) => (
            <View
              style={[{ backgroundColor: color }, styles.strokeColorButton]}
            />
          )}
          strokeSelectedComponent={(color, index, changed) => {
            return (
              <View
                style={[
                  { backgroundColor: color, borderWidth: 2 },
                  styles.strokeColorButton,
                ]}
              />
            );
          }}
          strokeWidthComponent={(w) => {
            return (
              <View style={styles.strokeWidthButton}>
                <View
                  style={{
                    backgroundColor: "white",
                    marginHorizontal: 2.5,
                    width: Math.sqrt(w / 3) * 10,
                    height: Math.sqrt(w / 3) * 10,
                    borderRadius: (Math.sqrt(w / 3) * 10) / 2,
                  }}
                />
              </View>
            );
          }}
        /> */}
      </SafeAreaView>
    </View>
  );
});

export default ScratchLesson;

const styles = StyleSheet.create({
  whiteboardContainer: {
    flex: 1,
  },

  strokeColorButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#39579A",
  },
  functionButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    height: 30,
    width: 60,
    backgroundColor: "#39579A",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },

  boldText: {
    color: COLOR.BLUE_LINk,
    fontSize: 18,
  },

  boldColorPalette: {
    borderWidth: 2,
    borderColor: COLOR.BORDER_COLOR_GREY,
    backgroundColor: "black",
    width: 120,
    height: 120,
  },

  colorPaletteNormal: {
    width: 100,
    height: 100,
  },
});
