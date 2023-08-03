import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  //set data format to store in async storage
  const todoList = [
    {
      title: listName.toLocaleLowerCase().replace(/^\s+|\s+$/gm, ""),
      color: color,
    },
  ];

  const addTodo = async () => {
    //await AsyncStorage.clear();

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
          let i;
          let formattedInput = listName
            .toLocaleLowerCase()
            .replace(/^\s+|\s+$/gm, "");
          //Assign index to todo title
          for (const storedTittle of todoTitle) {
            console.log(storedTittle);
            //Validate or check if todo title already exists in Async storage
            if (formattedInput === storedTittle) {
              setListName("");
              Alert.alert("Me Todo", "Todo data already exist", [
                {
                  text: "OK",
                  onPress: () => console.log("Ok Pressed"),
                },
              ]);
              return;
            } else {
              //Push new todo to array list if list does not exist
              getTodoDataFormat.push({
                color: color,
                title: listName.toLocaleLowerCase().replace(/^\s+|\s+$/gm, ""),
              });
              //clear storage array object and add new todo array object to storage
              await AsyncStorage.setItem(
                "todo",
                JSON.stringify(getTodoDataFormat)
              );
              const newGetTodo = await AsyncStorage.getItem("todo");
              const newGetTodoData = JSON.parse(newGetTodo);
              console.log(newGetTodoData);
              Alert.alert("MeTodo", "New todo added successfully", [
                { text: "OK", onPress: () => console.log("OK Pressed") },
              ]);
              setListName("");
              console.log("New todo added successfully");
            }
          }
        }
      }
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView behavior="padding">
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
            onPress={addTodo}
          >
            <Text className=" text-white font-medium text-base">
              Create Todo <Icon name="pluscircle" size={15} />
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddListModal;
