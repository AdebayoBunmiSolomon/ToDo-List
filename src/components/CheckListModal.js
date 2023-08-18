import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";
import TasksList from "./TasksList";
import Loader from "./Loader";

const CheckListModal = (props) => {
  const [todoData, setTodoData] = useState();
  const [todoLength, setTodoLength] = useState();
  const [taskLoading, setIsTaskLoading] = useState(false);
  let getTodos;
  let getTodoData;

  const getTodo = async () => {
    // await AsyncStorage.removeItem("todo");
    getTodos = await AsyncStorage.getItem("todo");
    getTodoData = JSON.parse(getTodos);
    setIsTaskLoading(false);
    if (getTodoData !== null) {
      setIsTaskLoading(true);
      setTodoData(getTodoData);
      setTodoLength(getTodoData.length);
    } else {
      setIsTaskLoading(false);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <SafeAreaView className='flex-1'>
      <View className='flex flex-row justify-between'>
        <View>
          <Text className='pl-2 font-bold text-2xl text-slate-400'>
            Check list
          </Text>
        </View>
        <View className='pr-2'>
          <TouchableOpacity onPress={props.closeModal}>
            <Icon name='close' size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {taskLoading === false ? (
          <Loader loaderText={"Please add a todo list"} />
        ) : (
          <TasksList Tasks={todoData} Length={todoLength} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CheckListModal;
