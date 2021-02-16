import React from 'react';
import StartupScreen from '../screens/StartupScreen';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import DrawerStack from './DrawerStack';

const RootStack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
    >
      <RootStack.Screen name="Splash" component={StartupScreen} />
      <RootStack.Screen name="App" component={DrawerStack} />
    </RootStack.Navigator>
  );
};

export default MainNavigator;
