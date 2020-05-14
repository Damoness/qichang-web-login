import React, { Component } from "react";
import { Dimensions, Image, TouchableOpacity } from "react-native";
import { SlideModal } from "beeshell";
import { SafeAreaView } from "react-navigation";
const screenHeight = "android"
  ? Dimensions.get("screen").height
  : Dimensions.get("screen").height;

type Props = {
  backgroundColor?: string;
  fullScreen: boolean;
  hideMask?: boolean; //隐藏遮罩
  onPressClose?: () => void;
};
export default class BottomModal extends Component<Props> {
  state = {
    contentHeight: screenHeight,
  };

  static defaultProps = {
    fullScreen: false,
  };

  _slideModel: any;

  open() {
    this._slideModel.open();
  }

  close() {
    this._slideModel.close();
  }

  render() {
    const {
      children,
      backgroundColor = "white",
      hideMask = false,
    } = this.props;

    return (
      <SlideModal
        fullScreenPatch={[true, true, true]}
        ref={(ref) => (this._slideModel = ref)}
        cancelable={true}
        screenHeight={screenHeight}
        styles={{
          backdrop: [{ backgroundColor: "rgba(0, 0, 0, 0.4)" }],
          container: {
            top: hideMask ? screenHeight - this.state.contentHeight : 0,
          },
          content: {
            width: "100%",
            height: this.props.fullScreen ? "95%" : undefined,
            backgroundColor: "white",
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
          },
        }}
      >
        <SafeAreaView
          style={{ backgroundColor: backgroundColor, flex: 1 }}
          forceInset={{ bottom: "always", top: "never" }}
          onLayout={({
            nativeEvent: {
              layout: { height, width },
            },
          }) => {
            this.setState({
              contentHeight: height,
            });
          }}
        >
          {children}
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              paddingRight: 15,
              paddingTop: 20,
            }}
            onPress={() => {
              if (this.props.onPressClose) {
                this.props.onPressClose();
              }
              this.close();
            }}
          >
            <Image
              source={require("./pop-upwindows_delete.png")}
              style={{ height: 15, width: 21 }}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </SlideModal>
    );
  }
}
