import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Colors from '../../constants/Colors';
import { AntDesign } from '@expo/vector-icons';
const InputListItem = ({ text, primary }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.item_value}>{text}</Text>
      <View style={styles.item_container}>
        {primary ? (
          <Text style={styles.item_cotainer_text}>PRIMARY</Text>
        ) : (
          <TouchableOpacity>
            <Text style={styles.item_cotainer_text}>Set as Primary</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity>
          <AntDesign
            name="minuscircle"
            size={20}
            color={Colors.white}
            style={{ marginHorizontal: 10 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.primary,
    paddingVertical: 5,
    borderRadius: 7,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item_value: { color: '#fff', marginLeft: 4 },
  item_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item_cotainer_text: { color: Colors.lightBlue },
  item_container_icon: { marginHorizontal: 10 },
});
export default InputListItem;
