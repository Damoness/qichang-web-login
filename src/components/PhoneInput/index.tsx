import React from "react";
import { View, TextInput, Image, TouchableOpacity } from "react-native";
import BaseComponent from "../../BaseComponent";
import ThemeConstants from "../../constants/ThemeConstants";

type Props = {
  onChangeText?: (text: string) => void;
  autoFocus?: boolean;
};

type State = {
  phone: string;
};
export default class PhoneInput extends BaseComponent<Props, State> {
  static defaultProps = {
    autoFocus: true,
  };

  state = {
    phone: "",
  };

  render() {
    const { fontColorC4, fontColorC1 } = ThemeConstants[this.context];

    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
        }}
      >
        <TextInput
          autoFocus={this.props.autoFocus}
          style={{ height: 40, flex: 1, fontSize: 16, color: fontColorC1,borderWidth:0,borderColor:'transparent',outline: 'none'}}
          placeholder="输入手机号"
          placeholderTextColor={fontColorC4}
          selectionColor={"#EE5B53"}
          keyboardType={"phone-pad"}
          maxLength={11}
          underlineColorAndroid={"transparent"}
          value={this.state.phone}
          onChangeText={(text) => {
            this.setState({ phone: text });
            this.props.onChangeText && this.props.onChangeText(text);
          }}
        />
        {this.state.phone.length > 0 && (
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={() => {
              this.setState({ phone: "" });
              if (this.props.onChangeText) this.props.onChangeText("");
            }}
          >
            <Image source={require("./login_delete.png")} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
