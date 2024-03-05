import { TextInput } from "react-native";
import React, { Component } from "react";

class BorderedTextInput extends Component {
  onFocusInput = () => {
    console.log("Props", this.props);
  };

  render() {
    const { style, props, ref } = this.props;
    return <TextInput {...props} style={style} onFocus={this.onFocusInput} />;
  }
}

export default BorderedTextInput;
