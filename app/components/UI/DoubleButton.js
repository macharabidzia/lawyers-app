import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '../../constants/Colors';
import CustomButton from './CustomButton';
import { AuthStyles } from '../../constants/GlobalStyles';

const DoubleButton = (props) => {
  // const [selectedValue, setSelectedValue] = useState(props.activeButtonName);
  const {
    firstButtonActive,
    firstButtonName,
    secondButtonName,
    defaultColor,
  } = props;
  const passSelectedValueToParent = (value) => {
    props.onSelectValue(value);
  };

  return (
    <View style={{ ...styles.optionsContainer, backgroundColor: defaultColor }}>
      <View style={styles.fillAvailableSpace}>
        <CustomButton
          title={firstButtonName}
          textStyle={{
            color: Colors.primary,
          }}
          style={{
            ...AuthStyles.button,
            backgroundColor:
              firstButtonActive === true ? Colors.mango : defaultColor,
          }}
          onPress={() => passSelectedValueToParent(true)}
        />
      </View>
      <View style={styles.fillAvailableSpace}>
        <CustomButton
          title={secondButtonName}
          textStyle={{
            color: Colors.primary,
          }}
          style={{
            ...AuthStyles.button,
            backgroundColor:
              firstButtonActive === false ? Colors.mango : defaultColor,
          }}
          onPress={() => passSelectedValueToParent(false)}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 15,
    flex: 1,
  },
  optionButton: {
    flex: 1,
    borderRadius: 8,
    borderLeftColor: '#fff',
  },
  fillAvailableSpace: {
    flex: 1,
  },
});
export default DoubleButton;
