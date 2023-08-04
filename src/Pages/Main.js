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
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Images from "../Images/Images";
import { CheckBox } from "@rneui/themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackActions } from "@react-navigation/native";
// import { CheckBox } from "react-native-elements";

const Main = ({ navigation }) => {
  const currentYear = new Date().getFullYear();
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [check, setCheck] = useState(false);
  const [name, setName] = useState("");
  let signedIn;
  let storeName;
  let storageCheck;
  let userName;

  const nameFocus = () => {
    setIsNameFocused(true);
    // console.log(isNameFocused);
  };

  const nameBlur = () => {
    setIsNameFocused(false);
    // console.log(isNameFocused);
  };

  const removeUserData = async () => {
    await AsyncStorage.removeItem("check");
    await AsyncStorage.removeItem("name");
  };

  const storeUserData = async () => {
    setCheck(false);
    setName("");
    await AsyncStorage.setItem("check", JSON.stringify(check));
    await AsyncStorage.setItem("name", JSON.stringify(name));
  };

  const getUserData = async () => {
    storageCheck = await AsyncStorage.getItem("check");
    userName = await AsyncStorage.getItem("name");
    signedIn = JSON.parse(storageCheck);
    storeName = JSON.parse(userName);
    if (signedIn === true) {
      setName(storeName);
      setCheck(signedIn);
    } else {
      // setName("");
      // setCheck(check);
      removeUserData();
    }
    //console.log(signedIn + "Stored name is " + storeName);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const clickProceed = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter a name to proceed");
    } else {
      if (!check) {
        Alert.alert("Note", "Name is not saved.");
        removeUserData();
        getUserData();
        navigation.dispatch(
          StackActions.replace("ToDo", {
            user: "jane",
          })
        );
      } else {
        Alert.alert("Note", "Name is saved.");
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

  // const onChangeHandler = (e) => {
  //   setName(e.tar);
  // };

  return (
    <KeyboardAvoidingView className='flex-1 bg-white'>
      <TouchableWithoutFeedback onPress={dismissKeyBoard}>
        <View>
          {/* To-do and created by */}
          <View className='flex flex-col mt-12 ml-2'>
            <View>
              <Text className='text-slate-400 font-medium text-3xl'>
                My TO<Text className='text-amber-400'>-DO</Text>
              </Text>
            </View>
            <View>
              <Text className='text-amber-500 font-medium text-sm italic'>
                Created By Bunmi
              </Text>
            </View>
          </View>
          <View className='flex flex-row justify-center rounded-full'>
            <Image
              source={Images.img2}
              className='h-[100px] w-[100px] rounded-full mt-24'
            />
          </View>
          {/* Name, text input, button, and year opf creation */}
          <View className='flex flex-col mt-20 space-y-1'>
            <View className='flex flex-row pl-5'>
              <Text className='font-medium text-sm text-amber-400'>
                Enter a name to continue...
              </Text>
            </View>
            <View className='flex flex-row justify-center'>
              <TextInput
                placeholder='Enter here'
                className='placeholder:italic placeholder:text-slate-400 block bg-white w-[90%] border border-slate-300 rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-amber-400 focus:ring-amber-400 focus:ring-1 sm:text-sm'
                onFocus={nameFocus}
                onBlur={nameBlur}
                value={name}
                onChangeText={(name) => setName(name)}
              />
            </View>
            <View className='flex flex-row justify-start pt-2'>
              <CheckBox
                title='Stay signed in?'
                checkedColor='#ffbf00'
                checked={check}
                onPress={() => setCheck(!check)}
              />
            </View>
            <View className='flex flex-row justify-center'>
              <TouchableOpacity
                className='bg-amber-400 h-11 w-[90%] rounded-lg duration-500 justify-center items-center'
                onPress={clickProceed}>
                <Text className=' text-white font-medium text-base'>
                  Proceed <Icon name='arrow-forward-circle' size={18} />
                </Text>
              </TouchableOpacity>
            </View>
            <View className='flex flex-row justify-end pr-5 pt-1'>
              <Text className='text-black italic text-xs font-medium'>
                Copyright &copy;, {currentYear} {JSON.stringify(signedIn)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    borderColor: "green",
  },
});
export default Main;
