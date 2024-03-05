import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLOR, CommonStyles } from "../../../../config/styles";

function QuestionTimer({ callBack, onGameTimerStartStop, identity }) {
  const [counter, setCounter] = useState(60);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);

    if (counter === 0) {
      if (typeof onGameTimerStartStop === "function") onGameStop();
      callBack();
    }
  }, [counter]);

  function onGameStop() {
    setTimeout(() => onGameTimerStartStop(identity, "stop"), 3000);
  }

  return (
    <React.Fragment>
      <View
        style={{
          width: 50,
          height: 50,

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={[CommonStyles.text_18_bold]}>{counter}</Text>
        </View>
      </View>
    </React.Fragment>
  );
}

export default QuestionTimer;
