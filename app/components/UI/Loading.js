import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';

const Loading = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
  },
});
export default Loading;
