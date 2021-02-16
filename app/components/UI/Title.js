import React from 'react';
import Colors from '../../constants/Colors';
import { StyleSheet, Text, View } from 'react-native';
import { TextStyleBold } from '../../constants/GlobalStyles';

const CustomTitle = ({ color }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.your}>Your</Text>
      <Text
        style={{...TextStyleBold, ...styles.advocat, color: color ? color : Colors.primary }}
      >
        Advocat
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 20,

  },
  your: {
    fontSize: 20,
    color: '#00B2E2',
    textTransform: 'uppercase',
  },
  advocat: {
    fontSize: 20,
    textTransform: 'uppercase',
  },
});
export default CustomTitle;
