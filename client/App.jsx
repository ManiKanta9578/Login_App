import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignupScreen from "./src/screen/SignupScreen";
import RecoveryScreen from "./src/screen/RecoveryScreen";
import ResetScreen from "./src/screen/ResetScreen";
import Username from "./src/screen/Username";
import Password from "./src/screen/Password";
import Profile from "./src/screen/Profile";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="username" component={Username} />
        <Stack.Screen name="password" component={Password} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Recovery" component={RecoveryScreen} />
        <Stack.Screen name="Reset" component={ResetScreen} />
        <Stack.Screen name="profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
