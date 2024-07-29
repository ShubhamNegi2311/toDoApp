import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CreateToDoScreen from '../screens/create_todo';
import HomeScreen from '../screens/home';
import {MainAppScreensType} from './types';

const Stack = createNativeStackNavigator<MainAppScreensType>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={HomeScreen}
          name={'HomeScreen'}
          options={{headerTitle: 'To Do'}}
        />
        <Stack.Screen
          component={CreateToDoScreen}
          name={'CreateToDoScreen'}
          options={{headerTitle: 'Create To Do'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
