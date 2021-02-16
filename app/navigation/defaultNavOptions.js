import React from 'react';
import { Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/HeaderButton';
import Colors from '../constants/Colors';
export const defaultNavOptions = (navigation, route) => ({
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
    color: 'black',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  drawerConfig: {
    tintColor: Colors.darkBlue,
  },

  headerLeft: () => {
    if (
      route.name === 'TopLawyers' ||
      route.name === 'LawyerProfile' ||
      route.name === 'Login' ||
      route.name === 'Register' ||
      route.name === 'Settings' ||
      route.name === 'EditLawyerProfile'
    ) {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={
              Platform.OS === 'android' ? 'md-arrow-back' : 'ios-arrow-back'
            }
            onPress={() => {
              navigation.goBack();
            }}
          />
        </HeaderButtons>
      );
    } else {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    }
  },
  headerRight: () => {
    if (route.name === 'EditLawyerProfile') {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            onPress={() => {
              console.log('Saved');
            }}
          />
        </HeaderButtons>
      );
    }
    return (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Search"
          iconName={Platform.OS === 'android' ? 'md-search' : 'ios-search'}
          onPress={() => {}}
        />
        <Item
          title="More"
          iconName={Platform.OS === 'android' ? 'md-more' : 'ios-more'}
          onPress={() => {}}
        />
      </HeaderButtons>
    );
  },
  title: 'Your Lawyer',
  headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.primary,
});
