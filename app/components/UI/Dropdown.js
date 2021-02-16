import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { Picker } from '@react-native-community/picker';
const Dropdown = (props) => {
  const { data } = props;
  return (
    <View style={[styles.dropdown_wrapper, props.pickerStyle]}>
      <Picker {...props}>
        {data.map((item, index) => {
          return (
            <Picker.Item
              color={Colors.darkGray}
              key={index}
              label={item.label}
              value={item.value}
            />
          );
        })}
      </Picker>
    </View>
  );
};
const styles = StyleSheet.create({
  dropdown_wrapper: {
    backgroundColor: Colors.default,
    borderRadius: 13,
  },
});
export default Dropdown;
