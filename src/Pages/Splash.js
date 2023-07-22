import { StackActions } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = ({ navigation }) => {
  const [count, setCount] = useState(0);
  const [imgClass, setImgClass] = useState("text-slate-400");
  let timer;

  const getUserData = async () => {
    //AsyncStorage.clear();
    const user = await AsyncStorage.getItem("name");
    const result = JSON.parse(user);
    console.log(result);
    if (result === null) {
      navigation.dispatch(
        StackActions.replace("Main", {
          user: "jane",
        })
      );
    } else {
      navigation.dispatch(
        StackActions.replace("ToDo", {
          user: "jane",
        })
      );
    }
  };

  useEffect(() => {
    timer = setInterval(() => {
      setCount(count + 1);
      if (count === 5) {
        setImgClass("text-black");
      } else if (count === 10) {
        setImgClass("text-white");
      } else if (count === 15) {
        setImgClass("text-slate-400");
        setCount(0);
        // navigation.dispatch(
        //   StackActions.replace("Main", {
        //     user: "jane",
        //   })
        // );
        getUserData();
      }
    }, 1100);
    return () => clearInterval(timer);
  });
  return (
    <View className="flex-1 flex-coL space-y-2 justify-center items-center bg-amber-400">
      <View>
        <Text className={` ${imgClass} duration-700`}>
          <Icon name="notebook-plus" size={100} />
        </Text>
      </View>
      <View>
        <Text className="text-white font-medium text-3xl">
          TO-DO <Text className="text-slate-400">MeApp</Text>
        </Text>
      </View>
      <View>
        <Text className="text-white font-medium text-sm italic">
          <Text className="text-slate-400">Be on track,</Text> with me!!!
        </Text>
      </View>
    </View>
  );
};

export default Splash;
