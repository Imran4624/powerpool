// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Charts, Workers, Payments, Settings } from "@screens";
import { useSelector } from "react-redux";
import { MyTheme } from "../utils";

const Stack = createNativeStackNavigator();

export const RouterComponents = () => {

  const state = useSelector(state => state)
  // console.log('state', state)

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          statusBarColor: MyTheme.primary,
          statusBarStyle: "light",
        }}
      >
        <Stack.Screen name="Charts" component={Charts} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
