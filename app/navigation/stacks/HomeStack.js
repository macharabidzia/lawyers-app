import React from 'react';
import HomeScreen from '../../screens/main/HomeScreen';
import LoginScreen from '../../screens/user/LoginScreen';
import RegisterScreen from '../../screens/user/RegisterScreen';
import SettingsScreen from '../../screens/authorized/SettingsScreen';
import EditLawyerProfileScreen from '../../screens/authorized/EditLawyerProfileScreen';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import TopLawyersScreen from '../../screens/authorized/TopLawyersScreen';
import { defaultNavOptions } from '../defaultNavOptions';

const Stack = createNativeStackNavigator();

const routes = [
  {
    name: 'Home',
    component: HomeScreen,
  },
  {
    name: 'Login',
    component: LoginScreen,
  },
  {
    name: 'Register',
    component: RegisterScreen,
  },
  {
    name: 'Settings',
    component: SettingsScreen,
  },
  {
    name: 'EditLawyerProfile',
    component: EditLawyerProfileScreen,
  },
  {
    name: 'TopLawyers',
    component: TopLawyersScreen,
  },
];

export default HomeStack = ({ navigation, route }) => (
  <Stack.Navigator
    screenOptions={({ navigation, route }) =>
      defaultNavOptions(navigation, route)
    }
  >
    {routes.map((route, index) => {
      return <Stack.Screen key={index} {...route} />;
    })}
  </Stack.Navigator>
);
