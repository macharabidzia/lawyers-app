import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Card from '../UI/Card';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
const uri = {
  uri:
    'https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png',
};
const HorizontalCard = ({ item, onPress, style }) => {
  return (
    <Card style={styles.horizontalUserCard}>
      <TouchableOpacity
        index={item.id}
        item={item}
        onPress={onPress}
        style={[style, styles.horizontalUserCard_touchContainer]}
      >
        <View style={styles.horizontalUserCard_touchContainer_wrapper}>
          <Ionicons
            name={Platform.OS === ' android' ? 'md-star' : 'ios-star'}
            size={10}
            color={'gold'}
            style={styles.horizontalUserCard_touchContainer_wrapper_icon}
          />
          <View
            style={
              styles.horizontalUserCard_touchContainer_wrapper_imageContainer
            }
          >
            <Image
              source={uri}
              style={
                styles.horizontalUserCard_touchContainer_wrapper_imageContainer_image
              }
            />
          </View>
          <View
            style={
              styles.horizontalUserCard_touchContainer_wrapper_textContainer
            }
          >
            <Text
              style={
                styles.horizontalUserCard_touchContainer_wrapper_textContainer_name
              }
            >
              Nugzar Chxaidze
            </Text>
            <Text
              style={
                styles.horizontalUserCard_touchContainer_wrapper_textContainer_city
              }
            >
              Tbilisi
            </Text>
          </View>
          <View
            style={
              styles.horizontalUserCard_touchContainer_wrapper_iconContainer
            }
          >
            <Ionicons
              name={
                Platform.OS === ' android'
                  ? 'md-arrow-forward'
                  : 'ios-arrow-forward'
              }
              size={23}
              color={Colors.darkGray}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};
const styles = StyleSheet.create({
  horizontalUserCard: {
    width: '95%',
    flex: 1,
    height: 80,
    marginVertical: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  horizontalUserCard_touchContainer: { width: '100%', height: '100%' },
  horizontalUserCard_touchContainer_wrapper: {
    paddingHorizontal: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontalUserCard_touchContainer_wrapper_icon: { marginBottom: 40 },
  horizontalUserCard_touchContainer_wrapper_imageContainer: {
    width: 40,
    height: 40,
  },
  horizontalUserCard_touchContainer_wrapper_imageContainer_image: {
    height: '100%',
    width: '100%',
    borderRadius: 40,
  },
  horizontalUserCard_touchContainer_wrapper_textContainer: {
    marginLeft: 15,
  },
  horizontalUserCard_touchContainer_wrapper_textContainer_name: {
    marginBottom: 5,
  },
  horizontalUserCard_touchContainer_wrapper_textContainer_city: {
    fontSize: 8,
  },
  horizontalUserCard_touchContainer_wrapper_iconContainer: {
    alignItems: 'flex-end',
    flex: 1,
  },
});
export default HorizontalCard;
