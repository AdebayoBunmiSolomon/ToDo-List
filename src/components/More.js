import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const More = ({ moreText, hideModal, buttonColor }) => {
  const text = moreText;
  return (
    <View>
      <TouchableOpacity
        className='flex bg-[#00000075] top-0 w-screen h-screen justify-center items-center'
        onPress={() => hideModal()}>
        <View className=' bg-[#FFFFFF] w-[70%] h-[30%] justify-center items-center rounded-lg'>
          <View className='mt-[4px]'>
            <Text className='text-xl font-medium text-slate-400'>
              Your todo says:
            </Text>
          </View>
          <Text className=' text-sm font-bold mt-8'>{text}</Text>
          <View className='flex flex-row space-x-10 mt-7'>
            <View>
              <TouchableOpacity onPress={() => hideModal()}>
                <Text
                  className='text-xl font-medium'
                  style={[{ color: buttonColor }]}>
                  Ok
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => hideModal()}>
                <Text className='text-xl font-medium text-slate-400'>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default More;
