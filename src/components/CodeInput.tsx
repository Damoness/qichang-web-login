import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";
import BaseComponent from "../BaseComponent";
import ThemeConstants from "../constants/ThemeConstants";

type Props = {
  onChangeText?: (text: string) => void;
  //autoFocus?:boolean;
};

export default class CodeInput extends BaseComponent<Props> {
  _codeInput: TextInput | null = null;

  focus() {
    this._codeInput && this._codeInput.focus();
  }

  render() {
    const { fontColorC4, fontColorC3 } = ThemeConstants[this.context];

    return (
      <TextInput
        placeholder="输入验证码"
        placeholderTextColor={fontColorC4}
        keyboardType={"phone-pad"}
        maxLength={4}
        ref={(ref) => (this._codeInput = ref)}
        style={{ width: 100, height: 40, color: fontColorC3 }}
        onChangeText={this.props.onChangeText}
      />
    );
  }
}
