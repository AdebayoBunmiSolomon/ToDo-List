import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
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
      <View className="bg-amber-400">
        <SubTodoList todos={todos}/>
      </View>
    </SafeAreaView>
  );
};

export default TodoListModal;
