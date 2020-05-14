import React from "react";
import { Text } from "react-native";

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

export default PromptView;
