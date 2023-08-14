import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import More from "./More";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TasksList = ({ Tasks, Length }) => {
  const [selected, setIsSelected] = useState(false);
  //For more modal info about todo
  const [todoTitle, setIsTodoTitle] = useState("");
  const [itemColor, setItemColor] = useState("");

  const date = Date();

  //For setting todo data used for swipeable
  const [todoData, setTodoData] = useState();
  const [todoLength, setTodoLength] = useState();
  let row = [];
  let prevOpenedRow;

  //Get todo data on opening modal
  const getTodo = () => {
    setTodoData(Tasks);
    setTodoLength(Length);
  };

  //Refresh todo item after removing a single item
  const refreshTodo = async () => {
    const getTodos = await AsyncStorage.getItem("todo");
    if (getTodos !== null) {
      const getTodoData = JSON.parse(getTodos);
      setTodoData(getTodoData);
      setTodoLength(getTodoData.length);
    }
  };

  //Delete an item from list
  const deleteItem = async ({ item, index }) => {
    console.log(item, index);
    let a = todoData;
    a.splice(index, 1);
    console.log(a);
    setTodoData([...a]);
    await AsyncStorage.setItem("todo", JSON.stringify(todoData));
    refreshTodo();
  };

  const truncateText = (str) => {
    return str.length > 25 ? str.substring(0, 20) + "....more" : str;
  };

  useEffect(() => {
    getTodo();
  }, [Tasks, Length]);

  const renderItem = ({ item, index }, onClick) => {
    //Close row of any swiped item in the list if another item is opened or swiped
    const closeRow = (index) => {
      console.log("closerow");
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[index];
    };

    //To render delete button in each list item
    const renderLeftActions = (progress, dragX, onClick) => {
      return (
        <TouchableOpacity onPress={onClick}>
          <View className='justify-center items-center bg-red-400 w-[100px] mt-1 h-20 rounded-lg'>
            <Animated.Text className='text-white text-sm font-bold'>
              Delete
            </Animated.Text>
          </View>
        </TouchableOpacity>
      );
    };

    //Render the swipeable effect on the list item
    return (
      <GestureHandlerRootView>
        <Swipeable
          renderLeftActions={(progress, dragX) =>
            renderLeftActions(progress, dragX, onClick)
          }
          onSwipeableOpen={() => closeRow(index)}
          ref={(ref) => (row[index] = ref)}
          rightOpenValue={-100}>
          <TouchableOpacity
            className='flex flex-row pt-2 mt-1 h-20 rounded-xl'
            style={[{ backgroundColor: item.color }]}
            onPress={(e) => {
              e.preventDefault();
              setIsTodoTitle(String(item.title));
              setItemColor(String(item.color));
              setIsSelected(true);
            }}>
            <View>
              <TouchableOpacity className='h-10 w-10 rounded-lg justify-center items-center bg-slate-50 ml-2 mt-3'>
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
    );
  };

  return (
    <View>
      <View className='ml-2 mt-4'>
        <Text className='font-bold text-sm text-black'>
          Total todo: {todoLength}
        </Text>
      </View>
      <View className='h-[650px] w-[95vw] ml-2'>
        <FlatList
          renderScrollComponent={false}
          data={
            todoData &&
            todoData.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
          }
          //data={todoData.sort((a, b) => a.title.localeCompare(b.title))}
          keyExtractor={(item) => item.date}
          renderItem={(item) =>
            renderItem(item, () => {
              console.log("Pressed", item);
              deleteItem(item);
            })
          }
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

const styles = StyleSheet.create({
  deleteButton: {
    color: "red",
  },
});

export default TasksList;
