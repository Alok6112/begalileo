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

const Whiteboardtwo = forwardRef((props, ref) => {
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

  const openColorPalette = () => {
    setcolorPalette(!colorPalette);
  };

  const openStrokePensil = () => {
    //console.log("Hello");
    setStrokePensil(!strokePensil);
  };

  const openEraserBtn = () => {
    setColorpickerValue("#00000000");
    setPensilStrokeValue(8);
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
    console.log("xOld", xOld);
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
    console.log("xNew", newValue);
    return newValue;
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
  }

  useImperativeHandle(ref, () => ({
    onRemoteLineUpdate(whiteBoardLines) {
      console.log("Whiteboard comp lines", whiteBoardLines);
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
      setText([]);
    }
  }

  function checkAndUpdateWriting(whiteBoardLines) {
    if (whiteBoardLines.tool == "eraser") {
      replaceChildPointWithEraser(whiteBoardLines.points);
    }

    if (whiteBoardLines.tool == "text") {
      renderChildText(whiteBoardLines);
    }

    if (whiteBoardLines.tool == "line") {
      renderChildStraightLine(whiteBoardLines.points);
    }
    if (whiteBoardLines.tool == "pen") {
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

    if (whiteBoardLines.x > 100 && whiteBoardLines.x < 300) {
      whiteBoardLines.x = Math.abs(whiteBoardLines.x - 50);
    } else if (whiteBoardLines.x > 300 && whiteBoardLines.x < 500) {
      whiteBoardLines.x = Math.abs(whiteBoardLines.x - 50);
    } else if (whiteBoardLines.x > 500 && whiteBoardLines.x < 700) {
      whiteBoardLines.x = Math.abs(whiteBoardLines.x - 100);
    } else if (whiteBoardLines.x > 700 && whiteBoardLines.x < 800) {
      whiteBoardLines.x = Math.abs(whiteBoardLines.x - 180);
    } else {
      whiteBoardLines.x = Math.abs(whiteBoardLines.x - 250);
    }

    console.log("whiteBoardLines.x", whiteBoardLines.x);
    console.log("whiteBoardLines.y", whiteBoardLines.y);

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
    console.log("Points coming", points);
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
    console.log("Points to render", points);
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

    data[0].path.data = dummy;
    data[0].path.id = data[0].path.id + count;

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
    let lastLine = lines[0].points.push(x);
    lines[0].points.push(y);
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

    lines[0].points = elevatedLines;

    if (colorPickerValueState == "#00000000") {
      lines[0].tool = "eraser";
      lines[0].colorPickerValue = "red";
    } else {
      console.log("Normal flow");
    }

    props.onSendWhiteBoardLines(lines);
  };

  const userIdentify = (e) => {
    console.log("User Identify", e);
  };

  const clearAll = () => {
    console.log("Canvas ref", canvasRef.current.clear());
    setTemp("");
  };

  const handleData = (e) => {
    console.log(e, "eeeee");
  };

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
          height: 650,
          width: 700,
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
        </View>

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
            height: 650,
            width: 700,
            resizeMode: "contain",
            position: "absolute",
          }}
          source={{
            uri: pdfImage[currentIndex],
          }}
        />

        <SketchCanvas
          ref={canvasRef}
          style={{
            flex: 1,
            height: 650,
            width: 700,
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
      </SafeAreaView>
    </View>
  );
});

export default Whiteboardtwo;

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
