import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

import { View, Text, StyleSheet, Image } from "react-native";

// import Drawing from "./drawing/index";

const Whiteboard = forwardRef((props, ref) => {
  const [pdfImage, setPdfImage] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [whiteBoardLinesfinal, setWhiteboardlines] = useState([]);

  useImperativeHandle(ref, () => ({
    onRemoteLineUpdate(whiteBoardLines) {
      console.log("White board incoming remote line");
      console.log("Whiteboard lines whiteboard component", whiteBoardLines);

      checkAndUpdateWriting(whiteBoardLines);
    },
    onPageNumberUpdate(pageNumber) {
      remoteChangePageNumber(pageNumber);
    },
  }));

  function checkAndUpdateWriting(whiteBoardLines) {
    console.log(whiteBoardLines.points, "ggggggg");

    setWhiteboardlines([...whiteBoardLinesfinal, whiteBoardLines.points]);
  }

  function remoteChangePageNumber(index) {
    setCurrentIndex(parseInt(index));
  }

  useEffect(() => {
    if (props.selPdfUrl != undefined) {
      setPdfImage(props.selPdfUrl);
    }
    setCurrentIndex(props.selPdfIndex);
  }, [pdfImage]);

  console.log("Pdf Image", pdfImage.length);

  useEffect(() => {}, [currentIndex, pdfImage]);

  const sendWhiteboardLines = (e) => {
    props.onSendWhiteBoardLines(e);
  };

  return (
    <View style={styles.whiteboardContainer}>
      {/* <Drawing
        whiteBoardLines={whiteBoardLinesfinal}
        sendLines={sendWhiteboardLines}
      /> */}
      {/* <Image
        style={{ height: "100%", width: "100%", resizeMode: "contain" }}
        source={{
          uri: pdfImage[currentIndex],
        }}
      /> */}
    </View>
  );
});

export default Whiteboard;

const styles = StyleSheet.create({
  whiteboardContainer: {
    flex: 1,
  },
});
