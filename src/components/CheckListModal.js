import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import TasksList from "./TasksList";
import Svg from "react-native-svg";
import { Spinner, NativeBaseProvider, HStack } from "native-base";

const CheckListModal = (props) => {
  const [todoData, setTodoData] = useState();
  const [todoLength, setTodoLength] = useState();
  const [taskLoading, setIsTaskLoading] = useState(false);
  let getTodos;
  let getTodoData;

  const getTodo = async () => {
    await AsyncStorage.removeItem("todo");
    getTodos = await AsyncStorage.getItem("todo");
    getTodoData = JSON.parse(getTodos);
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
    <SafeAreaView className="flex-1">
      <Text className="pl-2 font-bold text-2xl text-slate-400">
        Check List modal
      </Text>
      <View className="flex flex-row justify-end pr-2">
        <TouchableOpacity onPress={props.closeModal}>
          <Icon name="close" size={24} />
        </TouchableOpacity>
      </View>
      <View>
        {taskLoading === false ? (
          <View className="mt-[80%]">
            <NativeBaseProvider>
              <HStack justifyContent="center">
                <Spinner color="warning.500" size="lg" />
              </HStack>
            </NativeBaseProvider>
            <View className="flex flex-row justify-center mt-10">
              <Text className="text-xl font-bold">Please add a todo list</Text>
            </View>
          </View>
        ) : (
          <TasksList Tasks={todoData} Length={todoLength} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CheckListModal;
