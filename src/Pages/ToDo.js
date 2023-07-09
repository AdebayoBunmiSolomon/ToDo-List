import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Images from "../Images/Images";
import Tasks from "../components/Tasks";
import { tempData } from "../components/TempData";
import Icon from "react-native-vector-icons/Entypo";
import AddListModal from "../components/AddListModal";

const ToDo = () => {
  const [name, setName] = useState("");
  let storedUserName;
  let userName;

  const [addTodoVisible, setAddTodoVisible] = useState(false);

  const date = new Date();
  const curHrs = date.getHours();
  const [greeting, setGreeting] = useState("");

  const getGreeting = () => {
    if (curHrs >= 0 && curHrs < 12) {
      // console.log("Good Morning");
      setGreeting("Good Morning");
    } else if (curHrs >= 12 && curHrs < 16) {
      // console.log("Good Afternon");
      setGreeting("Good Afternoon");
    } else if (curHrs >= 16) {
      // console.log("Good Evening");
      setGreeting("Good Evening");
    }
  };

  const getUserData = async () => {
    userName = await AsyncStorage.getItem("name");
    storedUserName = JSON.parse(userName);
    setName(storedUserName);
    console.log(storedUserName);
  };

  useEffect(() => {
    getUserData();
    getGreeting();
  }, [name]);

  return (
    <View className="flex-1 bg-white">
      <Modal
        animationType="slide"
        visible={addTodoVisible}
        onRequestClose={() => setAddTodoVisible(!addTodoVisible)}
      >
      <AddListModal closeModal={() => setAddTodoVisible(!addTodoVisible)}/>
      </Modal>
      <View className="flex flex-col mt-12 pl-2">
        <View className="flex flex-row">
          <Text className="font-medium text-2xl">
            <Text className="font-bold text-2xl">Todo</Text> Lists{" "}
          </Text>
          <Image
            source={Images.img2}
            className="h-[30px] w-[30px] rounded-full"
          />
        </View>
        <Text className="font-medium text-sm text-amber-400">
          {greeting},{" "}
          <Text className="font-medium text-sm text-slate-400">{name}</Text>
        </Text>
      </View>
      {/* Plus icon and addlist */}
      <View className="flex flex-col sapce-y-2 mt-28">
        <View className="flex flex-row justify-center">
          <TouchableOpacity
            className="border border-amber-400 p-3 rounded-md duration-700"
            onPress={() => setAddTodoVisible(!addTodoVisible)}
          >
            <Text className="text-amber-400">
              <Icon name="circle-with-plus" size={22} />
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex flex-row justify-center">
          <Text className="font-medium text-sm text-slate-400">Add List</Text>
        </View>
      </View>
      <View className="h-72 pl-0 mt-4">
        <FlatList
          data={tempData}
          keyExtractor={(items) => items.name}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <Tasks list={item} />}
        />
      </View>
    </View>
  );
};

export default ToDo;
