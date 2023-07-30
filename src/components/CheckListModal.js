import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const CheckListModal = (props) => {
  return (
    <View>
      <Text>Check List modal</Text>
      <View className="flex flex-row justify-end pr-2">
        <TouchableOpacity onPress={props.closeModal}>
          <Icon name="close" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckListModal;
