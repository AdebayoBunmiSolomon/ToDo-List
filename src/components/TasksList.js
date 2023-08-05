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

const TasksList = ({ Tasks, Length }) => {
  const [selected, setIsSelected] = useState(false);
  const [todoTitle, setIsTodoTitle] = useState("");
  const [itemColor, setItemColor] = useState("");
  const [itemIndex, setItemIndex] = useState();

  const todoData = Tasks;
  const todoLength = Length;

  const deleteItem = () => {
    const todoItem = todoData;
    todoItem.splice(itemIndex, 1);
    // console.log(newTodo);
    //setItemIndex("");
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
        <View className='justify-center items-center bg-red-400 w-[100px] mt-3 h-20 rounded-r-lg'>
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
              <Swipeable renderLeftActions={leftSwipe}>
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
                        setItemIndex(index);
                      }}>
                      <Text style={[{ color: item.color }]}>
                        <Icon name='notebook-minus' size={32} />
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Text
                      className='pt-5 text-[20px] font-medium pl-2'
                      style={[{ color: "white" }]}>
                      {truncateText(String(item.title))}
                    </Text>
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
