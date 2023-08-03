import React, { useState } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import More from "./More";

const TasksList = ({ Tasks, Length }) => {
  const [selected, setIsSelected] = useState(false);
  const [todoTitle, setIsTodoTitle] = useState("");
  const [itemColor, setItemColor] = useState("");

  const todoData = Tasks;
  const todoLength = Length;

  const truncateText = (str) => {
    return str.length > 25 ? str.substring(0, 20) + "....more" : str;
  };

  return (
    <View>
      <View className="ml-2 ">
        <Text className="font-bold text-xl text-black">
          Total todo: {todoLength}
        </Text>
      </View>
      <View className="h-[650px] w-[95vw] mt-2 ml-2">
        <FlatList
          renderScrollComponent={false}
          data={todoData}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex flex-row pt-2 mt-3 h-20 rounded-xl"
              style={[{ backgroundColor: item.color }]}
              onPress={(e) => {
                e.preventDefault();
                setIsTodoTitle(String(item.title));
                setItemColor(String(item.color));
                setIsSelected(true);
              }}
            >
              <View>
                <TouchableOpacity className="h-10 w-10 rounded-lg justify-center items-center bg-slate-50 ml-2 mt-3">
                  <Text style={[{ color: item.color }]}>
                    <Icon name="notebook-minus" size={32} />
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text
                  className="pt-5 text-[20px] font-medium pl-2"
                  style={[{ color: "white" }]}
                >
                  {truncateText(String(item.title))}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View>
        <Modal
          visible={selected}
          onRequestClose={() => setIsSelected(!selected)}
          animationType="slide"
          transparent={true}
        >
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
