import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Filters from '../../components/UI/Filters';
import Colors from '../../constants/Colors';
import LawyerCard from '../../components/UI/LawyerCard';
const dt1 = [
  { id: '1', val: 'All Lawyers', isSelected: true },
  { id: '2', val: 'Blood Law', isSelected: false },
  { id: '3', val: 'Social Law', isSelected: false },
  { id: '4', val: 'Administrative Law', isSelected: false },
  { id: '6', val: 'Human Law', isSelected: false },
];
const dt2 = [
  { id: '1', val: 'All Lawyers', isSelected: true },
  { id: '2', val: 'Blood Law', isSelected: false },
  { id: '3', val: 'Social Law', isSelected: false },
  { id: '4', val: 'Administrative Law', isSelected: false },
  { id: '5', val: 'Human s', isSelected: false },
  { id: '7', val: 'Human s', isSelected: false },
  { id: '8', val: 'Human a', isSelected: false },
];
const SeenLawyersScreen = (props) => {
  const firstButtonName = 'Find Lawyers',
    secondButtonName = 'Lawyers List',
    activeButtonName = secondButtonName;
  const handleDoubleButtonChange = (value) => {
    if (value !== activeButtonName) props.navigation.navigate('Home');
  };

  return (
    <View style={styles.screen}>
      <Filters initialFiltersData={dt1} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dt2}
        renderItem={() => (
          <LawyerCard
            item={item}
            onPress={() => {}}
            style={styles.screen_card}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
SeenLawyersScreen.navigationOptions = (navData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingHorizontal: 10,
  },
  screen_card: { marginLeft: 4 },
});

export default SeenLawyersScreen;
