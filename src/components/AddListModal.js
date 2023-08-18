import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const AddListModal = (props) => {
  const [listName, setListName] = useState("");
  const date = Date();
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

  //set data format to store in async storage
  const todoList = [
    {
      title: listName.toLocaleLowerCase().replace(/^\s+|\s+$/gm, ""),
      color: color,
      date: date,
    },
  ];

  const addTodo = async () => {
    //await AsyncStorage.removeItem("todo");

    //get todo data if exist and create todo
    const getTodo = await AsyncStorage.getItem("todo");
    const getTodoData = JSON.parse(getTodo);

    //Check if input field is empty
    if (!listName.trim()) {
      Alert.alert("MeTodo", "Empty list name");
    } else {
      //Check if data exist in AsyncStorage to create first todo...
      if (getTodoData === null) {
        await AsyncStorage.setItem("todo", JSON.stringify(todoList));
        Alert.alert("MeTodo", "First todo added successfully", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        Keyboard.dismiss();
        setListName("");
        console.log("First todo added successfully");
      } else {
        //Check if text field is empty
        if (!listName.trim()) {
          Alert.alert("MeTodo", "Empty list name");
        } else {
          //Get todo data format
          const getTodoDataFormat = getTodoData;
          const todoTitle = getTodoDataFormat.map((item) => item.title);
          console.log(todoTitle);

          let formattedInput = listName
            .toLocaleLowerCase()
            .replace(/^\s+|\s+$/gm, "");

          //Loop through list and assign index to each list
          for (let i = 0; i < todoTitle.length; i++) {
            //Check if list matches text input
            if (todoTitle[i] === formattedInput) {
              Alert.alert("Todo Says", "List name already exists");
              Keyboard.dismiss();
              console.log("List name already exists");
              setListName("");
              console.log(date.toLocaleUpperCase());
              return i;
            }
          }
          //Push new todo to array list if list does not exist
          getTodoDataFormat.push({
            color: color,
            title: listName.toLocaleLowerCase().replace(/^\s+|\s+$/gm, ""),
            date: date,
          });
          //clear storage array object and add new todo array object to storage
          await AsyncStorage.setItem("todo", JSON.stringify(getTodoDataFormat));
          const newGetTodo = await AsyncStorage.getItem("todo");
          const newGetTodoData = JSON.parse(newGetTodo);
          console.log(newGetTodoData);
          Alert.alert("Todo Says", "New todo added successfully", [
            {
              text: "OK",
              onPress: () => console.log("OK Pressed"),
            },
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
            },
          ]);
          setListName("");
          console.log("New todo added successfully");
        }
      }
    }
  };

  return (
    <SafeAreaView className='flex-1'>
      <KeyboardAvoidingView behavior='padding'>
        <View className='flex flex-row justify-end pr-2'>
          <TouchableOpacity onPress={props.closeModal}>
            <Icon name='close' size={24} />
          </TouchableOpacity>
        </View>
        <View className='flex justify-center items-center my-auto'>
          <Text className='font-bold text-2xl text-slate-400'>
            Create Todo List
          </Text>
          <TextInput
            placeholder='List name?'
            className='border border-slate-400 w-[300px] rounded-lg h-[50px] pl-1 mt-4'
            value={listName}
            onChangeText={(listName) => setListName(listName)}
          />
          <View className='flex flex-row justify-center space-x-4 mt-4'>
            {backGroundColors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[{ backgroundColor: color }]}
                onPress={() => setColor(color)}
                className='w-[30px] h-[30px] rounded-md'
              />
            ))}
          </View>
          <TouchableOpacity
            className=' h-11 w-[300px] rounded-lg duration-500 justify-center items-center mt-4'
            style={[{ backgroundColor: color }]}
            onPress={addTodo}>
            <Text className=' text-white font-medium text-base'>
              Create Todo <Icon name='pluscircle' size={15} />
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddListModal;
