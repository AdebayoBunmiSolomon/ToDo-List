import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import UserIcon from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/AntDesign";
import ModeIcon from "react-native-vector-icons/Ionicons";
import ClearAllTodo from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import Images from "../Images/Images";
import { TextInput } from "react-native-gesture-handler";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { DevSettings } from "react-native";
import Loader from "./Loader";

const SettingsModal = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [settings, setSettings] = useState({
    imageUri: null,
    userName: "please set up a name",
  });
  const [themeIcon, setThemeIcon] = useState("partly-sunny-outline");

  const getUserSettings = async () => {
    setIsLoading(true);
    const getUserData = await AsyncStorage.getItem("userData");
    const getParsedUserData = JSON.parse(getUserData);
    let userName;
    let Image;
    if (getParsedUserData !== null) {
      Image = getParsedUserData.userImage;
      userName = getParsedUserData.userName;
      setSettings({
        imageUri: Image,
        userName: userName,
      });
      setName(userName);
      setIsLoading(false);
    } else {
      setSettings({
        imageUri: null,
        userName: "please setup a name",
      });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSettings({
        imageUri: result.assets[0].uri,
      });
    }
  };

  const changeAsyncStorageUsername = async () => {
    let image = settings.imageUri;
    const userData = {
      userName: name,
      staySignedIn: true,
      userImage: image,
    };
    //console.log(userData);
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
    Alert.alert(
      "General Settings",
      "User data changed successfully. Restart app to see changes",
      [
        {
          text: "Ok",
          onPress: () => console.log("Ok pressed"),
        },
        {
          text: "Close",
          onPress: () => console.log("Close pressed"),
        },
      ]
    );
  };

  const resetAppToDefault = async () => {
    Alert.alert(
      "Program settings",
      "Please note that initiating this process will clear all app data, and app will restart.",
      [
        {
          text: "Continue".toLocaleLowerCase(),
          onPress: async () => {
            await AsyncStorage.clear();
            DevSettings.reload();
            Alert.alert(
              "Program settings",
              "Reset successful. App will restart now",
              [
                {
                  text: "Ok".toLocaleLowerCase(),
                  onPress: () => {
                    console.log("Ok pressed");
                  },
                },
              ]
            );
          },
        },
        {
          text: "Abort".toLocaleLowerCase(),
          onPress: () => {
            console.log("Abort pressed");
          },
        },
      ]
    );
  };

  const changeTheme = async () => {
    Alert.alert("Info", "Coming soon to your screens", [
      {
        text: "Ok",
        onPress: () => {
          console.log("Ok Pressed");
        },
      },
    ]);
  };

  const clearAllTodo = () => {
    Alert.alert(
      "Programs Settings",
      "Are you sure you want to clear all todo?",
      [
        {
          text: "Clear all",
          onPress: async () => {
            await AsyncStorage.removeItem("todo");
            Alert.alert("General settings", "Todo cleared successfully");
          },
        },
        {
          text: "Cancel",
          onPress: console.log("Cancel pressed"),
        },
      ]
    );
  };

  const changeUserName = () => {
    if (!name.trim()) {
      Alert.alert("General Settings", "Username field cannot be blank");
      return name;
    } else {
      Alert.alert(
        "General Settings",
        "Are you sure you want to change name or image",
        [
          {
            text: "Yes",
            onPress: () => changeAsyncStorageUsername(),
          },
          {
            text: "No",
            onPress: () => console.log("No pressed"),
          },
        ]
      );
    }
  };
  useEffect(() => {
    getUserSettings();
  }, []);

  return (
    <SafeAreaView className='flex-1'>
      <View className='flex flex-row justify-between bg-amber-400'>
        <View className='pt-1 pl-2'>
          <Text className='font-bold text-2xl text-white'>Settings</Text>
        </View>
        <View className='pt-2 pr-2'>
          <TouchableOpacity
            onPress={props.closeModal}
            className='w-10 h-10 justify-center items-center bg-white rounded-full'>
            <Text className='text-black'>
              <Icon name='close' size={20} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {isLoading === true ? (
        <Loader loaderText={"Please hold on a moment"} />
      ) : (
        <ScrollView style={styles.scrollView}>
          <View className='h-[280px] bg-amber-400 rounded-bl-[70px] rounded-br-[70px]'>
            <View className='flex flex-row justify-center mt-5'>
              {settings.imageUri === null ? (
                <Image
                  source={Images.img4}
                  className='h-[150px] w-[150px] rounded-full'
                />
              ) : (
                <Image
                  source={{ uri: settings.imageUri }}
                  className='h-[150px] w-[150px] rounded-full'
                />
              )}
            </View>
            <View className='flex flex-row justify-center mt-5'>
              <TouchableOpacity
                className='bg-white h-11 w-[40%] rounded-lg duration-500 justify-center items-center'
                onPress={pickImage}>
                <Text className='text-sm font-bold text-slate-400'>
                  Change avatar
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text className='text-[15px] font-bold mt-3 pl-4'>
              General / User settings
            </Text>
            <View className='bg-slate-300 h-[150px] w-[330px] m-auto rounded-lg'>
              {/*Username input */}

              <Text className='ml-[12px] text-[12px] font-medium mt-3'>
                change username
              </Text>
              <View className='flex flex-row justify-between'>
                <View>
                  <TextInput
                    value={name}
                    onChangeText={(name) => setName(name)}
                    className='bg-white w-[245px] h-10 border border-slate-300 rounded-md pl-2 pr-3 shadow-sm focus:outline-none focus:border-amber-400 focus:ring-amber-400 focus:ring-1 sm:text-sm ml-2'
                  />
                </View>
                <View>
                  <TouchableOpacity
                    className='h-10 w-16 bg-amber-400 rounded-lg justify-center items-center mr-2'
                    onPress={changeUserName}>
                    <Text className='text-black'>
                      <UserIcon name='user-edit' size={20} />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/*Message header input */}
              <Text className='ml-[12px] text-[12px] font-medium mt-2'>
                click to change theme [dark / light]
              </Text>
              <View className='flex flex-row justify-center'>
                <View>
                  <TouchableOpacity
                    className='h-10 w-[310px] bg-amber-400 rounded-lg justify-center items-center'
                    onPress={changeTheme}>
                    <Text className='text-black text-sm font-medium'>
                      Change theme&nbsp;&nbsp;&nbsp;{" "}
                      <ModeIcon name={themeIcon} size={20} />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/*Program settings */}
          <View>
            <Text className='text-[15px] font-bold mt-3 pl-4'>
              Program settings
            </Text>
            <View className='bg-slate-300 h-[150px] w-[330px] m-auto rounded-lg'>
              {/*Clear all todo */}
              <View className='flex flex-row justify-center mt-7'>
                <View>
                  <TouchableOpacity
                    className='h-10 w-[310px] bg-amber-400 rounded-lg justify-center items-center'
                    onPress={clearAllTodo}>
                    <Text className='text-black text-sm font-medium'>
                      Clear all todo&nbsp;&nbsp;&nbsp;{" "}
                      <ClearAllTodo name='delete' size={20} />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {/*Message header input */}
              <View className='flex flex-row justify-center mt-3'>
                <View>
                  <TouchableOpacity
                    className='h-10 w-[310px] bg-amber-400 rounded-lg justify-center items-center'
                    onPress={resetAppToDefault}>
                    <Text className='text-black text-sm font-medium'>
                      Reset app to default&nbsp;&nbsp;&nbsp;{" "}
                      <ClearAllTodo name='sync' size={20} />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 42,
  },
});

export default SettingsModal;
