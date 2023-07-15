import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import TodoListModal from "./TodoListModal";
("");

const Tasks = ({ list }) => {
  const completedCount = list.todos.filter((todo) => todo.completed).length;
  const remaining = list.todos.length - completedCount;
  const [todoListVisible, setTodoListVisible] = useState(false);
  return (
    <View>
      <Modal
        animationType="slide"
        visible={todoListVisible}
        onRequestClose={() => setTodoListVisible(!todoListVisible)}
      >
        <TodoListModal closeModal={() => setTodoListVisible(!todoListVisible)} list={list}/>
      </Modal>

      <TouchableOpacity
        style={{ backgroundColor: list.color }}
        className=" px-[16px] py-[32px] rounded-lg w-[200px] items-center mx-[12px]"
        onPress={() => setTodoListVisible(!todoListVisible)}
      >
        <Text className="font-medium text-2xl text-white">{list.name}</Text>
        <View>
          {/* Remaining */}
          <View className="flex flex-col mt-6">
            <View className="flex flex-row justify-center">
              <Text className="text-5xl font-thin text-white">
                {completedCount}
              </Text>
            </View>
            <View className="flex flex-row justify-center">
              <Text className="text-sm font-medium text-white">Remaining</Text>
            </View>
          </View>
          {/* Completed */}
          <View className="flex flex-col mt-2">
            <View className="flex flex-row justify-center">
              <Text className="text-5xl font-thin text-white">{remaining}</Text>
            </View>
            <View className="flex flex-row justify-center">
              <Text className="text-sm font-medium text-white">Completed</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Tasks;
