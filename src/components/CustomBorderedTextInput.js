import { TextInput } from "react-native";
import React, { Component } from "react";

const CustomBorderedTextInput = (props) => {
  const { ref } = props;
  let textInput = null;

  onFocusInput = () => {
    textInput.current.focus();
  };

  return (
    <TextInput
      {...props}
      ref={(input) => {
        textInput = input;
      }}
      onFocus={onFocusInput}
    />
  );
};
export default CustomBorderedTextInput;
