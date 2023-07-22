import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const SubTodoList = ({ todos }) => {
  const todoList = todos;
  const [textColor, setTextColor] = useState("text-slate-400");

  return (
    <View className="px-5 py-5 h-[300px]">
      <FlatList
        data={todoList}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View className="flex flex-row">
            <TouchableOpacity>
              <Text className="text-slate-400 p-[16px]">
                <Icon
                  name={item.completed === true ? "square" : "square-o"}
                  size={24}
                  style={{ width: 32 }}
                />
              </Text>
            </TouchableOpacity>
            <Text
              className={
                item.completed === true
                  ? `p-[16px] font-bold text-[16px] text-slate-400`
                  : `p-[16px] font-bold text-[16px] text-black`
              }
              style={{
                textDecorationLine:
                  item.completed === true ? "line-through" : "none",
              }}
            >
              {item.title}
            </Text>
          </View>
        )}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
};

export default SubTodoList;
