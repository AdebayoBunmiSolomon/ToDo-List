import React from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";

const TasksList = ({ Tasks, Length }) => {
  const todoData = Tasks;
  const todoLength = Length;
  return (
    <View>
      <View className="ml-2 ">
        <Text className="font-bold text-xl text-black">
          Total todo: {todoLength}
        </Text>
      </View>
      <View className="h-[650px] w-[340px] mt-2 ml-2">
        <FlatList
          renderScrollComponent={false}
          data={todoData}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex flex-row pt-2 mt-3 h-20 rounded-xl"
              style={[{ backgroundColor: item.color }]}
            >
              <View>
                <TouchableOpacity className="h-10 w-10 rounded-lg bg-slate-50 ml-2 mt-3"></TouchableOpacity>
              </View>
              <View>
                <Text
                  className="pt-5 text-[15px] font-medium pl-2"
                  style={[{ color: "white" }]}
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default TasksList;
