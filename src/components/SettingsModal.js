import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const SettingsModal = (props) => {
  return (
    <SafeAreaView className='flex-1'>
      <Text>Settings modal</Text>
      <View className='flex flex-row justify-end pr-2'>
        <TouchableOpacity onPress={props.closeModal}>
          <Icon name='close' size={24} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SettingsModal;
