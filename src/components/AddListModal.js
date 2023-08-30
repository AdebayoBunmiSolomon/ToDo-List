import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  Keyboard,
  Platform,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import uuid from "react-native-uuid";

const AddListModal = (props) => {
  const [notifyHrs, setNotifyHrs] = useState("");
  const [notifyMin, setNotifyMin] = useState("");
  const [listName, setListName] = useState("");
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const date = Date();
  const backGroundColors = [
    "#FFCA28",
    "#24A6D9",
    "#595BD9",
    "#8022D9",
    "#D159D8",
    "#D85963",
    "#D88559",
  ];
  const [color, setColor] = useState(backGroundColors[0]);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationResponseReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const cancelLocalNotification = async () => {
    await Notifications.cancelScheduledNotificationAsync({
      id: `${id}`,
    });
  };

  const schedulePushNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        autoDismiss: false,
        title: "MeToDo Reminder",
        vibrate: false,
        body: listName,
        data: {
          data: "data goes here",
        },
      },
      trigger: {
        hour: Number(notifyHrs),
        minute: Number(notifyMin),
        repeats: true,
      },
    });
  };

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
        //sound: "notify_sound.wav",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push Notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push notification");
    }
    return token;
  };

  //set data format to store in async storage
  const todoList = [
    {
      title: listName.toLocaleLowerCase().replace(/^\s+|\s+$/gm, ""),
      color: color,
      date: date,
      notifyId: uuid.v4(),
    },
  ];

  const addTodo = async () => {
    //await AsyncStorage.removeItem("todo");

    //get todo data if exist and create todo
    const getTodo = await AsyncStorage.getItem("todo");
    const getTodoData = JSON.parse(getTodo);

    //Check if input field is empty
    if (!listName.trim()) {
      Alert.alert("MeTodo", "Empty list name");
    } else {
      //Check if hrs or secs is empty or not...
      if (!notifyHrs.trim() || !notifyMin.trim()) {
        Alert.alert("MeTodo", "Reminder hrs or sec not set", [
          {
            text: "Ok",
            onPress: () => console.log("Ok pressed"),
          },
        ]);
        return;
      }
      //Check if data exist in AsyncStorage to create first todo...
      if (getTodoData === null) {
        await AsyncStorage.setItem("todo", JSON.stringify(todoList));
        schedulePushNotification();
        Alert.alert("MeTodo", "First todo added successfully", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        Keyboard.dismiss();
        setListName("");
        setNotifyHrs("");
        setNotifyMin("");
        console.log("First todo added successfully");
      } else {
        //Check if text field is empty
        if (!listName.trim()) {
          Alert.alert("MeTodo", "Empty list name");
        } else {
          //Get todo data format
          const getTodoDataFormat = getTodoData;
          const todoTitle = getTodoDataFormat.map((item) => item.title);
          console.log(todoTitle);

          let formattedInput = listName
            .toLocaleLowerCase()
            .replace(/^\s+|\s+$/gm, "");

          //Loop through list and assign index to each list
          for (let i = 0; i < todoTitle.length; i++) {
            //Check if list matches text input
            if (todoTitle[i] === formattedInput) {
              Alert.alert("Todo Says", "List name already exists");
              Keyboard.dismiss();
              console.log("List name already exists");
              setListName("");
              setNotifyHrs("");
              setNotifyMin("");
              return i;
            }
          }
          //Push new todo to array list if list does not exist
          getTodoDataFormat.push({
            color: color,
            title: listName.toLocaleLowerCase().replace(/^\s+|\s+$/gm, ""),
            date: date,
            notifyId: uuid.v4(),
          });
          //clear storage array object and add new todo array object to storage
          await AsyncStorage.setItem("todo", JSON.stringify(getTodoDataFormat));
          schedulePushNotification();
          const newGetTodo = await AsyncStorage.getItem("todo");
          const newGetTodoData = JSON.parse(newGetTodo);
          console.log(newGetTodoData);
          Alert.alert("Todo Says", "New todo added successfully", [
            {
              text: "OK",
              onPress: () => console.log("OK Pressed"),
            },
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
            },
          ]);
          setListName("");
          setNotifyHrs("");
          setNotifyMin("");
          console.log("New todo added successfully");
        }
      }
    }
  };

  return (
    <SafeAreaView className=''>
      <KeyboardAvoidingView behavior='padding'>
        <View className='flex flex-row justify-end pr-2'>
          <TouchableOpacity onPress={props.closeModal}>
            <Icon name='close' size={24} />
          </TouchableOpacity>
        </View>
        <View className='flex justify-center items-center my-auto'>
          <Text className='font-bold text-2xl text-slate-400'>
            Create Todo List
          </Text>
          <TextInput
            placeholder='List name?'
            className='border border-slate-400 w-[95vw] rounded-lg h-[50px] pl-1 mt-4'
            value={listName}
            onChangeText={(listName) => setListName(listName)}
          />
          <View className='mt-2 pl'>
            <Text className='text-sm font-medium text-black'>Set reminder</Text>
          </View>
          <View className='flex flex-row justify-center items-center space-x-2'>
            <View>
              <TextInput
                placeholder='hrs'
                className='border border-slate-400 w-[46vw] rounded-lg h-[50px] pl-1 mt-0'
                keyboardType='numeric'
                value={notifyHrs}
                onChangeText={(hrs) => setNotifyHrs(hrs)}
                maxLength={2}
              />
            </View>
            <View>
              <TextInput
                placeholder='mins'
                className='border border-slate-400 w-[46vw] rounded-lg h-[50px] pl-1 mt-0'
                keyboardType='number-pad'
                value={notifyMin}
                onChangeText={(min) => setNotifyMin(min)}
                maxLength={2}
              />
            </View>
          </View>
          <View className='flex flex-row justify-center space-x-3 mt-4'>
            {backGroundColors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[{ backgroundColor: color }]}
                onPress={() => setColor(color)}
                className='w-[40px] h-[40px] rounded-md'
              />
            ))}
          </View>
          <TouchableOpacity
            className=' h-11 w-[95vw] rounded-lg duration-500 justify-center items-center mt-4'
            style={[{ backgroundColor: color }]}
            onPress={async () => {
              await addTodo();
              //await schedulePushNotification();
              //console.log(notifyMin);
            }}>
            <Text className=' text-white font-medium text-base'>
              Create Todo <Icon name='pluscircle' size={15} />
            </Text>
          </TouchableOpacity>
        </View>
        <View className='flex flex-row justify-center ml-2 mt-2'>
          <Text>
            Note: use 24hrs for pm e.g. 04:00pm, use 16:0. {"\n"}
            Note: use 12hrs for am e.g. 08:00am, use 8:0. {"\n"}
            Note: Do not add 0 to single digit hrs or mins e.g. 08:01, use 8:1.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddListModal;
