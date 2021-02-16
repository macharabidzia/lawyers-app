import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Card from '../UI/Card';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { TextStyle } from '../../constants/GlobalStyles';
import { CITIES } from '../../constants/Variables';
const uri = {
  uri:
    'https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png',
};
const UserCard = ({ user }) => (
  <Card style={styles.user}>
    <View style={styles.user_iconContainer}>
      <Ionicons
        style={styles.user_iconContainer_icon}
        name="ios-star"
        size={20}
        color={Colors.mango}
      ></Ionicons>
    </View>
    <View>
      <View style={styles.user_imageContainer}>
        <Image source={uri} style={styles.user_imageContainer_image} />
      </View>
      <View style={styles.user_textContainer}>
        <View style={styles.user_textContainer_wrapper}>
          <Text style={styles.user_textContainer_wrapper_text}>
            {user.item.firstname + ' ' + user.item.lastname}
          </Text>
        </View>
        <Text style={styles.user_textContainer_cityText}>
          {CITIES[user.item.city].label}
        </Text>
      </View>
    </View>
  </Card>
);
const styles = StyleSheet.create({
  user: {
    marginVertical: 10,
    backgroundColor: '#FAFBFF',
    marginHorizontal: 10,
    backgroundColor: Colors.white,
    width: 150,
  },
  user_iconContainer: { marginLeft: 10, marginTop: 4 },
  user_imageContainer: {
    alignItems: 'center',
  },
  user_imageContainer_image: {
    height: 70,
    width: 70,
    borderRadius: 40,
  },
  user_textContainer: { width: '100%' },
  user_textContainer_wrapper: { paddingHorizontal: 10, width: '100%' },
  user_textContainer_wrapper_text: {
    ...TextStyle,
    fontSize: 12,
    marginVertical: 5,
    textAlign: 'center',
  },
  user_textContainer_cityText: {
    ...TextStyle,
    fontSize: 12,
    textAlign: 'center',
  },
});
export default UserCard;
