import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import Login from './screens/Login';
import Signup from './screens/SignUp';
import Home from './screens/Home';
import { ThemeProvider } from 'react-native-elements';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login" headerMode="none">
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="signup" component={Signup} />
          <Stack.Screen name="home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
