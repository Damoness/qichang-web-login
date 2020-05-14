import React, { Component, PureComponent } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { baseURL } from "../NetApi";

type Props = {
  phone: string;
  onPressCancel: () => void;
  onPressConfirm: (code: string) => void;
};

type State = {
  code: string;
};

export default class VerificationView extends Component<Props> {
  // state={
  //     code:''
  // }

  code = "";

  render() {
    const { onPressCancel, onPressConfirm, phone } = this.props;

    const url = `${baseURL}/public/vc?phone=${phone}&temp=${Math.random()}`;

    console.log("render VerificationView:", url);

    return (
      <View
        style={{
          height: 260,
          width: 265,
          backgroundColor: "#FFFFFF",
          alignItems: "center",
          borderRadius: 13,
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 16, color: "black", fontWeight: "bold" }}>
            请完成安全验证
          </Text>
        </View>
        <Image
          source={{ uri: url, cache: "reload" }}
          style={{ width: 215, height: 84 }}
        />
        <TextInput
          placeholder="输入验证码"
          placeholderTextColor="#888888"
          keyboardType="number-pad"
          style={{
            height: 40,
            marginTop: 7,
            marginBottom: 20,
            backgroundColor: "#F4F5F6",
            width: 215,
            paddingLeft: 16,
            color: "black",
          }}
          autoFocus={true}
          onChangeText={(code) => {
            this.code = code;
          }}
        />
        <View
          style={{
            flexDirection: "row",
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: "#E8E8E8",
            height: 44,
            width:'100%'
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            onPress={onPressCancel}
          >
            <Text style={{ color: "#007AFF", fontSize: 17 }}>取消</Text>
          </TouchableOpacity>
          <View
            style={{
              width: StyleSheet.hairlineWidth,
              backgroundColor: "#E8E8E8",
            }}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            onPress={() => onPressConfirm(this.code)}
          >
            <Text style={{ color: "#007AFF", fontSize: 17 }}>确定</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
