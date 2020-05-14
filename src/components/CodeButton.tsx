import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

type State = {
  countDownNum: number; //倒计时数
  countingDown: boolean; //正在倒计时
};

type countDown = (num: number) => void;

type Props = {
  disabled: boolean;
  onPress: (countDown: countDown) => void;
};
export default class CodeButton extends Component<Props, State> {
  state = {
    countingDown: false,
    countDownNum: 0,
  };

  intervalId?: number;

  countDown = (num: number = 60) => {
    if (this.state.countingDown === false) {
      this.setState({
        countingDown: true,
        countDownNum: num,
      });

      this.intervalId = setInterval(() => {
        if (this.state.countDownNum === 0) {
          this.setState({
            countingDown: false,
          });
          this.intervalId && clearInterval(this.intervalId);
        } else {
          this.setState({
            countDownNum: this.state.countDownNum - 1,
          });
        }
      }, 1000);
    }
  };

  componentWillUnmount() {
    this.intervalId && clearInterval(this.intervalId);
  }

  render() {
    const { onPress, disabled } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          onPress(this.countDown);
        }}
        disabled={disabled || this.state.countingDown}
      >
        {this.state.countingDown ? (
          <Text style={styles.countDownText}>
            {this.state.countDownNum + "秒"}
          </Text>
        ) : (
          <Text
            style={{
              color: disabled ? "rgba(69, 140, 245, 0.6)" : "#458CF5",
              fontSize: 14,
            }}
          >
            获取验证码
          </Text>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  countDownText: {
    color: "#888888",
    fontSize: 14,
  },
});
