import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import LawyersListScreen from '../../screens/main/LawyersListScreen';
import LawyerProfileScreen from '../../screens/authorized/LawyerProfileScreen';
import {defaultNavOptions} from '../defaultNavOptions';
const Stack = createNativeStackNavigator();
const routes = [
  {
    name: 'LawyersList',
    component: LawyersListScreen,
  },
  {
    name: 'LawyerProfile',
    component: LawyerProfileScreen,
  },
];

export default LawyersListStack = () => (
  <Stack.Navigator
    screenOptions={({ navigation, route }) =>
      defaultNavOptions(navigation, route)
    }
  >
    {routes.map((item, index) => {
      return (
        <Stack.Screen key={index} name={item.name} component={item.component} />
      );
    })}
  </Stack.Navigator>
);
