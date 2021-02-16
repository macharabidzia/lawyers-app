import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MenuListItem = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Foundation
        name="lock"
        size={15}
        color={Colors.primary}
        style={styles.item_icon}
      />
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  item: {
    flex: 1,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_icon: { marginRight: 15 },
});
export default MenuListItem;
