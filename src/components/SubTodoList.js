import React from "react";
import { View, Text, FlatList } from "react-native";

const SubTodoList = ({ todos }) => {
  const todoList = todos;
  return (
    <View>
      <FlatList
        data={todoList}
        keyExtractor={(items) => items.title}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
};

export default SubTodoList;
