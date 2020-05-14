import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ViewStyle,
} from "react-native";

import { Tip } from "beeshell";
import PhoneInput from "./components/PhoneInput";
import CodeButton from "./components/CodeButton";
import VerificationViewModal from "./components/VerificationViewModal";
import Utils from "./Utils";
import Color from "./constants/Color";
import BaseComponent from "./BaseComponent";
import ThemeConstants from "./constants/ThemeConstants";
import NetApi from "./NetApi";
import BottomModal from "./components/BottomModal/BottomModal";

const PromptView = ({ show }: { show: boolean }) => (
  <Text
    style={{
      color: "#FE4428",
      fontSize: 12,
      position: "absolute",
      top: 3,
      left: 0,
    }}
  >
    {show ? "手机号格式有误" : ""}
  </Text>
);

type onPress = () => void;
//登录按钮
const SignInButton = ({
  onPress,
  disabled,
}: {
  onPress: onPress;
  disabled: boolean;
}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    style={{
      height: 50,
      paddingHorizontal: 20,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 25,
      overflow: "hidden",
      backgroundColor: disabled
        ? Utils.colorWithAlpha(Color.master, 0.6)
        : Color.master,
    }}
    disabled={disabled}
    onPress={onPress}
  >
    <Text style={styles.signInText}>快速登录</Text>
  </TouchableOpacity>
);

type Props = {
  style?: ViewStyle;
  onPressQuit: () => void;
  onSignInSuccess: (userInfo: any) => void;

  onPressUserAgreement?: () => void; //点击用户协议
};

type State = {
  phone: string;
  code: string;
};

export default class SignInScreen extends BaseComponent<Props, State> {
  _codeInput: any;
  _verificationViewModal: any;
  _userAgreementModal: BottomModal | null = null;

  countDown?: (num: number) => void;

  constructor(props: Props) {
    super(props);

    // client_id=7e015d8ce32370079895&
    // redirect_uri=http://localhost:8080/oauth/redirect
    //http://localhost:8080/oauth/redirect?code=859310e7cecc9196f4af

    this.state = {
      phone: "",
      code: "",
    };
  }

  phoneIsValid = (phone: string): boolean => {
    let phoneReg = /^(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;

    return phoneReg.test(phone);
  };

  codeIsValid = (code: string) => {
    return code.length === 4;
  };

  render() {
    const {
      backgroundColorC20,
      lineColorC5,
      fontColorC0,
      fontColorC4,
      fontColorC2,
    } = ThemeConstants[this.context];

    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: 40,
          paddingTop: 90,
          paddingBottom: 40,
          backgroundColor: backgroundColorC20,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={[styles.title, { color: fontColorC0 }]}>
            手机快捷登录
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 60,
              //backgroundColor:'blue'
            }}
          >
            <PromptView
              show={
                this.state.phone.length == 11 &&
                !this.phoneIsValid(this.state.phone)
              }
            />

            <Text style={[styles.prefixText, { color: fontColorC0 }]}>+86</Text>

            <View
              style={{
                width: 1,
                height: 20,
                backgroundColor: "#F2F2F2",
                marginHorizontal: 15,
              }}
            />

            <PhoneInput
              onChangeText={(text) => {
                this.setState({
                  phone: text,
                });
              }}
            />
          </View>

          <View style={[styles.lineView, { backgroundColor: lineColorC5 }]} />

          <View
            style={{
              flexDirection: "row",
              height: 60,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              placeholder="输入验证码"
              placeholderTextColor={fontColorC4}
              selectionColor={"#EE5B53"}
              keyboardType={"phone-pad"}
              maxLength={4}
              ref={(ref) => (this._codeInput = ref)}
              style={{
                height: 40,
                flex: 1,
                fontSize: 16,
                color: fontColorC2,
                outline: "none",
              }}
              onChangeText={(code) => {
                this.setState({ code });
              }}
            />

            <CodeButton
              disabled={!this.phoneIsValid(this.state.phone)}
              onPress={async (countDown) => {
                this.countDown = countDown;
                this._verificationViewModal.open();
              }}
            />
          </View>

          <View style={[styles.lineView, { backgroundColor: lineColorC5 }]} />

          <Text style={[styles.hintText, { color: fontColorC4 }]}>
            {`登陆/注册即视为已阅读并同意`}
            <Text
              onPress={() => {
                this._userAgreementModal && this._userAgreementModal.open();
              }}
              style={{ color: fontColorC2 }}
            >
              {"《汽场买车隐私协议》"}
            </Text>
          </Text>

          <SignInButton
            disabled={
              !(
                this.phoneIsValid(this.state.phone) &&
                this.codeIsValid(this.state.code)
              )
            }
            onPress={async () => {
              let result = await NetApi.loginWithPhone(
                this.state.phone,
                this.state.code
              );
              if (result.code == 200 && result.data) {
                this.props.onSignInSuccess(result.data);
              } else {
                Tip.show(result.msg);
              }
            }}
          />
        </View>

        <VerificationViewModal
          ref={(ref) => (this._verificationViewModal = ref)}
          phone={this.state.phone}
          onVerificationSuccess={() => {
            this.countDown && this.countDown(60); //开始倒计时
            this._codeInput.focus(); //
          }}
        />

        <BottomModal
          ref={(ref) => (this._userAgreementModal = ref)}
          fullScreen={true}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "black",
                fontSize: 18,
                marginVertical: 20,
                textAlign: "center",
              }}
            >
              汽场买车隐私协议
            </Text>
            <iframe
              style={{ height: "100%", width: "100%", border: 0 }}
              src={"http://www.bxmauto.com/web/user_notice.html"}
            />
          </View>
        </BottomModal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    marginBottom: 20,
  },
  prefixText: {
    fontSize: 16,
  },
  hintText: {
    fontSize: 12,
    marginTop: 16,
    marginBottom: 40,
  },
  signInText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  lineView: {
    height: StyleSheet.hairlineWidth,
  },
});
