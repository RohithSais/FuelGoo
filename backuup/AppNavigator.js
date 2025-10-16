// src/navigation/AppNavigator.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import all of our screens
import LoginScreen from '../screens/LoginScreen.js';
import RegisterScreen from '../screens/RegisterScreen.js';
import PhoneLoginScreen from '../screens/PhoneLoginScreen.js';
import HomeScreen from '../screens/HomeScreen.js';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;