import Main from "./src/Pages/Main";
import Splash from "./src/Pages/Splash";
import ToDo from "./src/Pages/ToDo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          presentation: "modal",
          animationTypeForReplace: "push",
          animation: "slide_from_right",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="ToDo"
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
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
