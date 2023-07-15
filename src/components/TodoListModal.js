import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import SubTodoList from "./SubTodoList";

const TodoListModal = (props) => {
  const name = props.list.name;
  const color = props.list.color;
  const todos = props.list.todos;

  const completed = todos.filter((todo) => todo.completed).length;
  const taskCount = todos.length;

  return (
    <SafeAreaView className="flex-1" behavior="padding">
      <View className="flex flex-row justify-end pr-2">
        <TouchableOpacity onPress={props.closeModal}>
          <Icon name="close" size={24} />
        </TouchableOpacity>
      </View>
      <View className="justify-end ml-10">
        <View className="border-b-4" style={[{ borderBottomColor: color }]}>
          <Text className="font-extrabold text-2xl">{name}</Text>
          <Text className="font-bold text-sm text-slate-400 mb-4">
            {completed} of {taskCount} tasks
          </Text>
        </View>
      </View>
      <View>
        <SubTodoList todos={todos} />
        <KeyboardAvoidingView behavior="padding">
          <View className="flex flex-row space-x-[-14px]">
            <View className="px-5">
              <TextInput className="h-[48px] border border-slate-400 rounded-md w-[270px] pl-2" />
            </View>
            <View>
              <TouchableOpacity
                style={{ backgroundColor: color }}
                className="justify-center items-center h-[48px] w-[50px] rounded-md"
              >
                <Text className="text-white">
                  <Icon name="plus" size={16} />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default TodoListModal;
