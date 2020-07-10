import { AntDesign } from "@expo/vector-icons";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import useAppState from "../hook/useAppState";
import AppState from "../model/app-state";
import AccountScreen from "./AccountScreen";
import LoginScreen from "./LoginScreen";
import MainScreen from "./MainScreen";
import SplashScreen from "./SplashScreen";
import ChartScreen from "./ChartScreen";

export type RootStackParamList = {
  Home: undefined;
  Chart: undefined;
  Login: undefined;
};

type ScreenOptions = ({
  route,
}: {
  route: RouteProp<Record<string, object | undefined>, string>;
}) => BottomTabNavigationOptions;

const Stack = createStackNavigator<RootStackParamList>();
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          {state.appState === AppState.login ? (
            <Stack.Screen name="Login" component={LoginScreen} />
          ) : (
            <React.Fragment>
              <Stack.Screen name="Home" component={MainDrawer} />
              <Stack.Screen name="Chart" component={ChartScreen} />
            </React.Fragment>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
}
