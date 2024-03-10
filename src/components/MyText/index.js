import { View, Text, Pressable, Image } from "react-native";
import React, { Children } from "react";
import { styles } from "./styles";
import { MyTheme } from "../../utils";

export const MyText = (props) => {
  return (
    <Text style={[{ color: MyTheme.blackText }, props.style,]}>{props.children}</Text>
  );
};
