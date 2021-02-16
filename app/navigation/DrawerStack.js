import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Sidenav from './Sidenav';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import HomeStack from './stacks/HomeStack';
import LawyersListStack from './stacks/LawyersListStack';
import ClientsListStack from './stacks/ClientsListStack';
const Drawer = createDrawerNavigator();

const data = [
  {
    name: 'Home',
    iconName: 'md-home',
    stack: HomeStack,
  },
  {
    name: 'LawyersList',
    iconName: 'md-home',
    stack: LawyersListStack,
  },
  {
    name: 'ClientsList',
    iconName: 'md-home',
    stack: ClientsListStack,
  },
  
];

const DrawerStack = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <Sidenav {...props} />}>
      {data.map((item, index) => {
        return (
          <Drawer.Screen
            name={item.name}
            key={index}
            options={{
              headerShown: false,
              drawerIcon: ({ focused, size }) => (
                <Ionicons
                  style={styles.icon}
                  name={item.iconName}
                  size={17}
                  color={Colors.primary}
                />
              ),
            }}
            component={item.stack}
          />
        );
      })}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
export default DrawerStack;
