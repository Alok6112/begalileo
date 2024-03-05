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
import { SvgXml } from "react-native-svg";
import BlackColor from "../Whiteboard/Colors/Black.svg";
import Blue from "../Whiteboard/Colors/Blue.svg";
import Brown from "../Whiteboard/Colors/Brown.svg";
import Green from "../Whiteboard/Colors/Green.svg";
import Pink from "../Whiteboard/Colors/Pink.svg";
import Red from "../Whiteboard/Colors/Red.svg";
import ColourPalette from "../Whiteboard/Toolbar/Colour-palette.svg";
import Eraser from "../Whiteboard/Toolbar/Eraser.svg";
import { COLOR } from "../../../../config/styles";

import Pensil from "../Whiteboard/Toolbar/Pencil.svg";

const WhiteboardQuiz = forwardRef((props, ref) => {
  const [pdfImage, setPdfImage] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [canvaslines, setCanvasLines] = useState([]);
  const [temp, setTemp] = useState([]);
  const [lines, setLines] = useState([]);
  const [stageLines, setStageLines] = useState([]);
  const [colorPickerValueState, setColorpickerValue] = useState("red");
  const [colorPalette, setcolorPalette] = useState(false);

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
  const [penStrokeValue, setPensilStrokeValue] = useState(5);
  const [isClicked, setIsClicked] = useState();
  const [isClickedColor, setIsClickedColor] = useState(0);

  const [whiteboardPoints, setWhiteboardPoints] = useState([]);

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
    // console.log("Hello");
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
      setLines("");
    }
  }

  function checkAndUpdateWriting(whiteBoardLines) {
    if (whiteBoardLines == undefined) {
      console.log("returning from fn");
      return;
    }
    setLines([...lines, whiteBoardLines]);

    if (whiteBoardLines.tool == "eraser") {
      replaceChildPointWithEraser(whiteBoardLines.points);
    }

    if (whiteBoardLines.tool == "text") {
      renderChildText(whiteBoardLines);
    }
    if (whiteBoardLines.tool == "pen") {
      replaceChildPoint(
        whiteBoardLines.points,
        whiteBoardLines.colorPickerValue
      );
    }
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

  const replaceChildPoint = (points, color) => {
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

  useEffect(() => {
    console.log("Props selPdfUrl", props.selPdfUrl);
    if (props.selPdfUrl != undefined) {
      setPdfImage(props.selPdfUrl);
    }
    setCurrentIndex(props.selPdfIndex);
  }, [pdfImage]);

  useEffect(() => {}, [currentIndex, pdfImage]);

  const handleMouseDown = (x, y) => {
    let tool = "pen";
    let colorPickerValue = colorPickerValueState;
    let penStroke = penStrokeValue;
    console.log("StageLines", stageLines);
    var allLines = [
      ...lines,
      {
        tool,
        penStroke,
        colorPickerValue,

        points: [x, y],
      },
    ];

    setLines(allLines);
  };

  const handleMouseMove = (x, y) => {
    let lastLine = lines[lines.length - 1].points.push(x);
    lines[lines.length - 1].points.push(y);
  };

  const handleMouseLeave = () => {
    var elevatedLines = [];
    lines[lines.length - 1].points.forEach((element, index) => {
      var pointManipulation = 0;
      if (isOdd(index)) pointManipulation = getXNewValuetwo(element);
      else pointManipulation = getYNewValuetwo(element);
      elevatedLines.push(pointManipulation);
    });

    lines[lines.length - 1].points = elevatedLines;

    if (colorPickerValueState == "#00000000") {
      lines[lines.length - 1].tool = "eraser";
      lines[lines.length - 1].colorPickerValue = "red";
    } else {
      console.log("Normal flow");
    }

    setLines(lines);

    props.onSendWhiteBoardLines(lines);
  };

  const userIdentify = (e) => {};

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
          backgroundColor: "rgba(52, 52, 52, 0.8)",
          position: "absolute",
          borderWidth: 1,
          borderColor: COLOR.BORDER_COLOR_GREY,
          backgroundColor: "rgba(52, 52, 52, 0.8)",
          zIndex: 99,
          height: 650,
          width: 700,
        }}
      >
        <View
          style={{
            position: "absolute",
            zIndex: 99,
            width: 50,
            height: 50,
          }}
        >
          <View
            style={{
              position: "absolute",
              width: 50,
              height: 50,
              borderRadius: 20,
              marginTop: 5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
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
            width: 50,
            height: 50,
            marginLeft: 55,
            marginTop: 5,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              position: "absolute",
              width: 50,
              height: 50,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
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
            width: 50,
            height: 50,
            marginLeft: 115,
            borderRadius: 20,
            marginTop: 5,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
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

export default WhiteboardQuiz;

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
