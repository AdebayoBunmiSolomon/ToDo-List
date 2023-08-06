import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Images from "../Images/Images";
import Icon from "react-native-vector-icons/Entypo";
import FeatherIcon from "react-native-vector-icons/Feather";
import AddListModal from "../components/AddListModal";
import CheckListModal from "../components/CheckListModal";
import SettingsModal from "../components/SettingsModal";

const ToDo = () => {
  const [name, setName] = useState("");

  const [addTodoVisible, setAddTodoVisible] = useState(false);
  const [checkListVisible, setCheckListVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [image, setImage] = useState(null);

  const date = new Date();
  const curHrs = date.getHours();
  const [greeting, setGreeting] = useState("");

  const getGreeting = () => {
    if (curHrs >= 0 && curHrs < 12) {
      setGreeting("Good Morning");
    } else if (curHrs >= 12 && curHrs < 16) {
      setGreeting("Good Afternoon");
    } else if (curHrs >= 16) {
      setGreeting("Good Evening");
    }
  };

  const getUserData = async () => {
    const gottenUserData = await AsyncStorage.getItem("userData");
    const parsedUserData = JSON.parse(gottenUserData);
    let userName;
    let userImage;
    if (parsedUserData === null) {
      setName("please set up a name");
      setImage(null);
    } else {
      userName = parsedUserData.userName;
      userImage = parsedUserData.userImage;
      setName(userName);
      setImage(userImage);
    }
  };

  useEffect(() => {
    getUserData();
    getGreeting();
  }, [name]);

  return (
    <View className="flex-1 bg-white">
      {/*Add list modal*/}
      <Modal
        animationType="slide"
        visible={addTodoVisible}
        onRequestClose={() => setAddTodoVisible(!addTodoVisible)}
      >
        <AddListModal closeModal={() => setAddTodoVisible(!addTodoVisible)} />
      </Modal>
      {/*Check list modal*/}
      <Modal
        animationType="slide"
        visible={checkListVisible}
        onRequestClose={() => setCheckListVisible(!checkListVisible)}
      >
        <CheckListModal
          closeModal={() => setCheckListVisible(!checkListVisible)}
        />
      </Modal>
      {/*Settings modal*/}
      <Modal
        animationType="slide"
        visible={settingsVisible}
        onRequestClose={() => setSettingsVisible(!settingsVisible)}
      >
        <SettingsModal
          closeModal={() => setSettingsVisible(!settingsVisible)}
        />
      </Modal>
      <View className="flex flex-row mt-12 pl-2 items-center">
        <View>
          {image === null ? (
            <Image
              source={Images.img4}
              className="h-[70px] w-[70px] rounded-full"
            />
          ) : (
            <Image
              source={{ uri: image }}
              className="h-[70px] w-[70px] rounded-full"
            />
          )}
        </View>
        <View className="flex flex-col">
          <View className="flex flex-row">
            <Text className="font-medium text-2xl">
              <Text className="font-bold text-2xl">Todo</Text> Lists{" "}
            </Text>
            <Image
              source={Images.img1}
              className="h-[30px] w-[30px] rounded-full"
            />
          </View>
          <Text className="font-medium text-sm text-amber-400">
            {greeting},{" "}
            <Text className="font-medium text-sm text-slate-400">{name}</Text>
          </Text>
        </View>
      </View>
      {/* Icons set for each module*/}
      <View className="flex flex-col space-y-6 mt-28">
        {/*add list */}
        <View className="flex flex-row justify-center">
          <TouchableOpacity
            className="border border-indigo-600 p-3 rounded-md duration-700"
            onPress={() => setAddTodoVisible(!addTodoVisible)}
          >
            <Text className="text-indigo-600">
              <Icon name="circle-with-plus" size={40} />
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row justify-center">
          <Text className="font-medium text-sm text-indigo-600">Add list</Text>
        </View>

        {/*check list */}
        <View className="flex flex-row justify-center">
          <TouchableOpacity
            className="border border-sky-500 p-3 rounded-md duration-700"
            onPress={() => setCheckListVisible(!checkListVisible)}
          >
            <Text className="text-sky-500">
              <Icon name="edit" size={40} />
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row justify-center">
          <Text className="font-medium text-sm text-sky-500">Check list</Text>
        </View>

        {/*settings */}
        <View className="flex flex-row justify-center">
          <TouchableOpacity
            className="border border-purple-700 p-3 rounded-md duration-700"
            onPress={() => setSettingsVisible(!settingsVisible)}
          >
            <Text className="text-purple-700">
              <FeatherIcon name="settings" size={40} />
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row justify-center">
          <Text className="font-medium text-sm text-purple-700">Settings</Text>
        </View>
      </View>
    </View>
  );
};

export default ToDo;
