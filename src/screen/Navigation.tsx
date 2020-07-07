import * as React from "react";
import { AntDesign } from "@expo/vector-icons";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import LoginScreen from "./LoginScreen";
import MainScreen from "./MainScreen";
import useAppState from "../hook/useAppState";
import SplashScreen from "./SplashScreen";
import AppState from "../model/app-state";
import AccountScreen from "./AccountScreen";

type ScreenOptions = ({
  route,
}: {
  route: RouteProp<Record<string, object | undefined>, string>;
}) => BottomTabNavigationOptions;

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions: ScreenOptions = ({ route }) => ({
  tabBarIcon: ({ color, size }) => {
    const iconName = route.name === "Home" ? "areachart" : "setting";

    return <AntDesign name={iconName} size={size} color={color} />;
  },
});

function MainDrawer() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={screenOptions}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={MainScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default function Navigation(): JSX.Element | null {
  const [state] = useAppState();

  return state.appState === AppState.notStarted ? (
    <SplashScreen />
  ) : (
    <NavigationContainer>
      <Stack.Navigator>
        {state.appState === AppState.login ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Home" component={MainDrawer} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
