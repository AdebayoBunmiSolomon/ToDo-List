import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import SelectImage from "react-native-vector-icons/AntDesign";
import Images from "../Images/Images";
import { CheckBox } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const Main = ({ navigation }) => {
  const currentYear = new Date().getFullYear();
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [check, setCheck] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const userData = {
    userName: name,
    staySignedIn: check,
    userImage: image,
  };

  const nameFocus = () => {
    setIsNameFocused(true);
  };

  const nameBlur = () => {
    setIsNameFocused(false);
  };

  const removeUserData = async () => {
    await AsyncStorage.removeItem("check");
    await AsyncStorage.removeItem("name");
  };

  const storeUserData = async () => {
    setCheck(false);
    setName("");
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
  };

  const getUserData = async () => {
    const gottenUserData = await AsyncStorage.getItem("userData");
    const parsedUserData = JSON.parse(gottenUserData);
    let userName;
    let staySignedIn;
    let userImage;
    if (parsedUserData !== null) {
      userName = parsedUserData.userName;
      staySignedIn = parsedUserData.staySignedIn;
      userImage = parsedUserData.userImage;
      if (staySignedIn === true) {
        setCheck(staySignedIn);
        setName(userName);
        setImage(userImage);
      } else {
        setCheck(check);
        setName("");
        setImage(null);
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    //console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const clickProceed = () => {
    if (image === null) {
      Alert.alert("Note", "No Image is selected", [
        {
          text: "select image",
          onPress: () => pickImage(),
        },
        {
          text: "Cancel",
          onPress: () => null,
        },
      ]);
      return;
    }

    if (!name.trim()) {
      Alert.alert("Error", "Please enter a name to proceed");
    } else {
      if (!check) {
        Alert.alert("Note", "Your data will not be saved.");
        removeUserData();
        getUserData();
        navigation.dispatch(
          StackActions.replace("ToDo", {
            user: "jane",
          })
        );
      } else {
        Alert.alert("Note", "Your data will be saved.");
        storeUserData();
        navigation.dispatch(
          StackActions.replace("ToDo", {
            user: "jane",
          })
        );
      }
    }

    console.log(name);
  };

  const dismissKeyBoard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView className="flex-1 bg-white">
      <TouchableWithoutFeedback onPress={dismissKeyBoard}>
        <View>
          {/* To-do and created by */}
          <View className="flex flex-col mt-12 ml-2">
            <View>
              <Text className="text-slate-400 font-medium text-3xl">
                My TO<Text className="text-amber-400">-DO</Text>
              </Text>
            </View>
            <View>
              <Text className="text-amber-500 font-medium text-sm italic">
                Created By Bunmi
              </Text>
            </View>
          </View>
          <View className="flex flex-row justify-end pr-10">
            <View className="flex flex-col space-y-2">
              <View className="flex flex-row justify-center">
                {image === null ? (
                  <Image
                    source={Images.img4}
                    className="h-[100px] w-[100px] rounded-full mt-24 pr-10 ml-10"
                  />
                ) : (
                  <Image
                    source={{ uri: image }}
                    className="h-[100px] w-[100px] rounded-full mt-24 ml-10"
                  />
                )}
              </View>
              <TouchableOpacity
                className="bg-slate-400 h-7 w-[120%] rounded-lg duration-500 justify-center items-center"
                onPress={pickImage}
              >
                <Text className=" text-white font-medium text-xs">
                  Select Image <SelectImage name="folderopen" size={15} />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Name, text input, button, and year opf creation */}
          <View className="flex flex-col mt-10 space-y-1">
            <View className="flex flex-row pl-5">
              <Text className="font-medium text-sm text-amber-400">
                Enter a name to continue...
              </Text>
            </View>
            <View className="flex flex-row justify-center">
              <TextInput
                placeholder="Enter here"
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-[90%] border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-amber-400 focus:ring-amber-400 focus:ring-1 sm:text-sm"
                onFocus={nameFocus}
                onBlur={nameBlur}
                value={name}
                onChangeText={(name) => setName(name)}
              />
            </View>
            <View className="flex flex-row justify-start pt-2">
              <CheckBox
                title="Stay signed in and save data?"
                checkedColor="#ffbf00"
                checked={check}
                onPress={() => setCheck(!check)}
              />
            </View>
            <View className="flex flex-row justify-center">
              <TouchableOpacity
                className="bg-amber-400 h-11 w-[90%] rounded-lg duration-500 justify-center items-center"
                onPress={clickProceed}
              >
                <Text className=" text-white font-medium text-base">
                  Proceed <Icon name="arrow-forward-circle" size={18} />
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex flex-row justify-end pr-5 pt-1">
              <Text className="text-black italic text-xs font-medium">
                Copyright &copy;, {currentYear}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default Main;
