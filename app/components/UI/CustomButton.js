import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { TextStyleBold } from '../../constants/GlobalStyles';
const CustomButton = (props) => {
  const onPress = () => {
    props.onPress();
  };
  return (
    <TouchableOpacity style={props.style} onPress={onPress}>
      <View>
        <Text style={[styles.button_textStyle, props.textStyle]}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#013C77',
    padding: 10,
  },
  button_textStyle: {
    ...TextStyleBold,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
export default CustomButton;
