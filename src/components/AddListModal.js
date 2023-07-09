import React, { useState } from "react";
import { tempData } from "./TempData";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const AddListModal = (props) => {
  const [listName, setListName] = useState("");
  const backGroundColors = [
    "#FFCA28",
    "#24A6D9",
    "#595BD9",
    "#8022D9",
    "#D159D8",
    "#D85963",
    "#D88559",
  ];
  const [color, setColor] = useState(backGroundColors[0]);

  const createTodo = () => {
    tempData.push({
      name: listName,
      color: color,
      todos: [],
    });
    setListName("");
    props.closeModal();
  };

  return (
    <KeyboardAvoidingView className="flex-1" behavior="padding">
      <View className="flex flex-row justify-end pr-2">
        <TouchableOpacity onPress={props.closeModal}>
          <Icon name="close" size={24} />
        </TouchableOpacity>
      </View>
      <View className="flex justify-center items-center my-auto">
        <Text className="font-bold text-2xl text-slate-400">
          Create Todo List
        </Text>
        <TextInput
          placeholder="List name?"
          className="border border-slate-400 w-[300px] rounded-lg h-[50px] pl-1 mt-4"
          value={listName}
          onChangeText={(listName) => setListName(listName)}
        />
        <View className="flex flex-row justify-center space-x-4 mt-4">
          {backGroundColors.map((color) => (
            <TouchableOpacity
              key={color}
              style={[{ backgroundColor: color }]}
              onPress={() => setColor(color)}
              className="w-[30px] h-[30px] rounded-md"
            />
          ))}
        </View>
        <TouchableOpacity
          className=" h-11 w-[300px] rounded-lg duration-500 justify-center items-center mt-4"
          style={[{ backgroundColor: color }]}
          onPress={createTodo}
        >
          <Text className=" text-white font-medium text-base">
            Create Todo <Icon name="pluscircle" size={15} />
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddListModal;
