import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Card from '../UI/Card';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { TextStyle } from '../../constants/GlobalStyles';
const SpecializationBox = ({ data, color }) => {
  return (
    <Card style={[styles.specialization, { backgroundColor: color }]}>
      <View style={styles.specialization_wrapper}>
        <Ionicons name="ios-search" size={20} color={Colors.white}></Ionicons>
        <View style={styles.specialization_wrapper_textContainer}>
          <Text style={styles.specialization_wrapper_textContainer_text}>
            {data.specialization}
          </Text>
          <Text style={styles.specialization_wrapper_textContainer_text}>
            {data.title}
          </Text>
        </View>
      </View>
      <View style={styles.specialization_overlay}>
        <Image source={data.img} style={styles.specialization_overlay_image} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  specialization: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    position: 'relative',
  },
  specialization_wrapper: { flex: 1, padding: 10 },
  specialization_wrapper_textContainer: { marginTop: 20 },
  specialization_wrapper_textContainer_text: {
    ...TextStyle,
    color: Colors.white,
  },
  specialization_overlay: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
  },
  specialization_overlay_image: {
    height: '100%',
    width: 150,
    borderRadius: 30,
  },
});
export default SpecializationBox;
