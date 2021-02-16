import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import Card from '../UI/Card';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
const uri = {
  uri:
    'https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png',
};
const LawyerProfileCard = ({ item }) => {
  const { description, firstname, lastname, city } = item;
  return (
    <View style={styles.container}>
      <Card style={styles.container_card}>
        <View style={styles.container_card_row}>
          <Ionicons
            name={Platform.OS === ' android' ? 'md-star' : 'ios-star'}
            size={15}
            color={'gold'}
          />
          <View style={styles.container_card_row_imageContainer}>
            <Image
              source={uri}
              style={styles.container_card_row_imageContainer_image}
            />
          </View>
          <View style={styles.container_card_row_textContainer}>
            <Text style={styles.container_card_row_textContainer_name}>
              {firstname + ' ' + lastname}
            </Text>
            <Text style={styles.container_card_row_textContainer_city}>
              {city}
            </Text>
          </View>
        </View>
        <Text style={styles.container_card_description}>{description}</Text>
      </Card>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    marginHorizontal: 5,
  },
  container_card: {
    paddingHorizontal: 7,
  },
  container_card_row: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
  },
  container_card_row_imageContainer: { width: 40, height: 40 },
  container_card_row_imageContainer_image: {
    height: '100%',
    width: '100%',
    borderRadius: 40,
  },
  container_card_row_textContainer: {
    marginLeft: 15,
  },
  container_card_row_textContainer_name: { marginBottom: 5 },
  container_card_row_textContainer_city: {
    fontSize: 10,
    color: Colors.deepGray,
  },
  container_card_description: {
    flex: 1,
    flexWrap: 'wrap',
    color: Colors.deepGray,
    paddingHorizontal: 5,
    marginVertical: 10,
  },
});

export default LawyerProfileCard;
