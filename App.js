import Main from "./src/Pages/Main";
import Splash from "./src/Pages/Splash";
import ToDo from "./src/Pages/ToDo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRef, useState, useEffect } from "react";
import { AppState } from "react-native";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Splash' component={Splash} />
      <Stack.Screen
        name='Main'
        component={Main}
        options={{
          presentation: "modal",
          animationTypeForReplace: "push",
          animation: "slide_from_right",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name='ToDo'
        component={ToDo}
        options={{
          presentation: "modal",
          animationTypeForReplace: "push",
          animation: "fade",
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const exitApp = (status) => {
    if (status === "background") {
      console.log("App is minimized");
    }
    return status;
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
      exitApp(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
