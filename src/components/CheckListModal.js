import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

const CheckListModal = (props) => {
  const [todoData, setTodoData] = useState();
  const [todoLength, setTodoLength] = useState();

  const getTodo = async () => {
    const getTodo = await AsyncStorage.getItem("todo");
    const getTodoData = JSON.parse(getTodo);
    if (getTodoData !== undefined) {
      setTodoData(getTodoData);
      setTodoLength(getTodoData.length);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <SafeAreaView className='flex-1'>
      <Text>Check List modal</Text>
      <View className='flex flex-row justify-end pr-2'>
        <TouchableOpacity onPress={props.closeModal}>
          <Icon name='close' size={24} />
        </TouchableOpacity>
      </View>
      <View>
        <Text>Total todo: {todoLength}</Text>
      </View>
      <View>
        <FlatList
          data={todoData}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <View>
              <Text>
                {item.title} {item.color}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default CheckListModal;
