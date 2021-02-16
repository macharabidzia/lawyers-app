import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { defaultNavOptions } from '../defaultNavOptions';
import ClientsListScreen from '../../screens/authorized/ClientsListScreen';
import ClientScreen from '../../screens/authorized/ClientScreen';
const Stack = createNativeStackNavigator();
const routes = [
  {
    name: 'ClientsList',
    component: ClientsListScreen,
  },
  {
    name: 'ClientScreen',
    component: ClientScreen,
  },
];

export default ClientsListStack = () => (
  <Stack.Navigator
    screenOptions={({ navigation, route }) =>
      defaultNavOptions(navigation, route)
    }
  >
    {routes.map((item, index) => {
      return <Stack.Screen key={index} {...item} />;
    })}
  </Stack.Navigator>
);
