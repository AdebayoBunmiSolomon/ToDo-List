import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

const Loader = ({ loaderText }) => {
  return (
    <View className='mt-[80%]'>
      <ActivityIndicator size={"large"} color={"#0000ff"} />
      <View className='flex flex-row justify-center mt-10'>
        <Text className='text-xl font-bold'>{loaderText}</Text>
      </View>
    </View>
  );
};

export default Loader;
