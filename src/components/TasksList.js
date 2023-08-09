import React, { useState } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  Animated,
  Touchable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import More from "./More";
// import Swipeable from "react-native-gesture-handler/Swipeable";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TasksList = ({ Tasks, Length }) => {
  const [selected, setIsSelected] = useState(false);
  const [todoTitle, setIsTodoTitle] = useState("");
  const [itemColor, setItemColor] = useState("");

  const todoData = Tasks;
  const todoLength = Length;

  const deleteItem = async (selectedTodoTitle) => {
    const getTodo = await AsyncStorage.getItem("todo");
    const getTodoData = JSON.parse(getTodo);
    const getTodoDataFormat = getTodoData;
    const todoTitle = getTodoDataFormat.map((item) => item.title);
    let i;
    let copyOfGottenData;
    let indexOfTodoTitle;
    for (i = 0; i < todoTitle.length; i++) {
      if (todoTitle[i] === selectedTodoTitle) {
        indexOfTodoTitle = getTodoDataFormat.indexOf(getTodoData[i]);
        copyOfGottenData = getTodoDataFormat.slice(indexOfTodoTitle);
        //console.log(copyOfGottenData);
        // copyOfGottenData = getTodoDataFormat.slice(todoTitle[i]);
        return i;
      }

      console.log("spliced data is", copyOfGottenData);
    }
    // const todoItem = todoData;
    // todoItem.splice(itemIndex, 1);
    // console.log(newTodo);
    //setItemIndex("");
    //console.log(selectedTodoTitle);
  };

  const truncateText = (str) => {
    return str.length > 25 ? str.substring(0, 20) + "....more" : str;
  };

  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return (
      <TouchableOpacity onPress={deleteItem}>
        <View className='justify-center items-center bg-red-400 w-[100px] mt-3 h-20 rounded-lg'>
          <Animated.Text
            className='text-white text-sm font-bold'
            style={{ transform: [{ scale: scale }] }}>
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View className='ml-2 '>
        <Text className='font-bold text-xl text-black'>
          Total todo: {todoLength}
        </Text>
      </View>
      <View className='h-[650px] w-[95vw] mt-2 ml-2'>
        <FlatList
          renderScrollComponent={false}
          data={todoData}
          keyExtractor={(item) => item.title}
          renderItem={({ item, index }) => (
            <GestureHandlerRootView>
              <Swipeable renderLeftActions={leftSwipe} on>
                <TouchableOpacity
                  className='flex flex-row pt-2 mt-3 h-20 rounded-xl'
                  style={[{ backgroundColor: item.color }]}
                  onPress={(e) => {
                    e.preventDefault();
                    setIsTodoTitle(String(item.title));
                    setItemColor(String(item.color));
                    setIsSelected(true);
                  }}>
                  <View>
                    <TouchableOpacity
                      className='h-10 w-10 rounded-lg justify-center items-center bg-slate-50 ml-2 mt-3'
                      onPress={() => {
                        setIsTodoTitle(String(item.title));
                        deleteItem(todoTitle);
                      }}>
                      <Text style={[{ color: item.color }]}>
                        <Icon name='notebook-minus' size={32} />
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View className='flex flex-col space-y-1'>
                    <View>
                      <Text
                        className='pt-3 text-[20px] font-medium pl-2'
                        style={[{ color: "white" }]}>
                        {truncateText(String(item.title))}
                      </Text>
                    </View>
                    <View className='flex flex-row ml-[20%] pt-1'>
                      <Text className='text-[12px] font-extrabold text-slate-200'>
                        Created:
                      </Text>
                      <Text className='text-[10px] font-medium text-white pt-[1.5px]'>
                        {" "}
                        {item.date}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Swipeable>
            </GestureHandlerRootView>
          )}
        />
      </View>
      <View>
        <Modal
          visible={selected}
          onRequestClose={() => setIsSelected(!selected)}
          animationType='fade'
          transparent={true}>
          <More
            moreText={todoTitle}
            hideModal={() => setIsSelected(!selected)}
            buttonColor={itemColor}
          />
        </Modal>
      </View>
    </View>
  );
};

export default TasksList;
