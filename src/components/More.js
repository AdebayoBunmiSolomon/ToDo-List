import React from "react";
import { View, Text } from "react-native";

const More = ({ moreText }) => {
  const text = moreText;
  return (
    <View>
      <Text>{text}</Text>
    </View>
  );
};

export default More;
