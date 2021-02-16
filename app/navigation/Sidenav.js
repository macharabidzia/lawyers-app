import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Card from '../components/UI/Card';
import { Ionicons } from '@expo/vector-icons';
import { TextStyle } from '../constants/GlobalStyles';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Colors from '../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/userActions';
import MenuListItem from '../components/UI/MenuListItem';

const Sidenav = (props) => {
  // const { onLogOut } = props;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const imageSource = userInfo
    ? 'https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png'
    : 'https://www.xovi.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png';
  const onLogOut = () => {
    dispatch(logout());
  };
  const excludes = {};

  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    if (typeof userInfo === 'undefined') {
      console.log(excludes['ClientsList']);
      setRoutes(props.state.routes.filter((item) => !excludes[item.name]));
    }
  }, [userInfo]);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.sidenav}>
      <View style={styles.header}>
        <View style={styles.header_container}>
          <Card style={styles.header_container_settingsCard}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Settings')}
            >
              <Ionicons name={'md-settings'} size={15} color="black" />
            </TouchableOpacity>
          </Card>
          <Text style={TextStyle}>Settings</Text>
        </View>

        <View style={styles.header_imageContainer}>
          <Image
            source={{ uri: imageSource }}
            style={styles.header_imageContainer_image}
          />
        </View>
        <View style={styles.header_container}>
          <Card style={styles.header_container_authCard}>
            <TouchableOpacity
              onPress={
                userInfo ? onLogOut : () => props.navigation.navigate('Login')
              }
            >
              <Ionicons name={'md-exit'} size={15} color="black" />
            </TouchableOpacity>
          </Card>
          <Text style={TextStyle}>{userInfo ? 'Log out' : 'Log In'}</Text>
        </View>
      </View>
      {userInfo && (
        <View style={styles.location}>
          <View style={styles.location_container}>
            <Ionicons name={'md-pin'} size={13} />
            <Text style={styles.location_container_text}>&nbsp; Tbilisi</Text>
          </View>
        </View>
      )}
      {routes.map((item, index) => {
        return (
          <MenuListItem
            onPress={() => props.navigation.navigate(item.name)}
            key={index}
            text={item.name}
          />
        );
      })}
    </DrawerContentScrollView>
  );
};
const styles = StyleSheet.create({
  sidenav: {
    margin: 0,
    padding: 0,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  header_container: { alignItems: 'center', justifyContent: 'center' },
  header_container_settingsCard: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 5,
  },
  header_imageContainer: {
    borderWidth: 1,
    // borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 50,
    alignContent: 'center',
    marginHorizontal: 30,
  },
  header_imageContainer_image: { height: 80, width: 80, borderRadius: 40 },
  header_container_authCard: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 5,
  },
  location: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  location_container: {
    flexDirection: 'row',
  },
  location_container_text: {
    paddingBottom: 7,
    color: Colors.deepGray,
    ...TextStyle,
  },
  drawerItem: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    backgroundColor: 'black',
    margin: 0,
    padding: 0,
  },
});
export default Sidenav;
