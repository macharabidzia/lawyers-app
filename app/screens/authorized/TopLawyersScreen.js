import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Filters from '../../components/UI/Filters';

import Colors from '../../constants/Colors';
import UserCard from '../../components/main/UserCard';
const dt1 = [
  {
    id: '1',
    firstname: 'Giorgi',
    lastname: 'Matcharashvili',
    isSelected: true,
    city: 0,
  },
  {
    id: '2',
    firstname: 'Guram',
    lastname: 'Xasia',
    isSelected: false,
    city: 0,
  },
  {
    id: '3',
    firstname: 'Giorgi ',
    lastname: 'Natchkebia',
    isSelected: false,
    city: 0,
  },
  {
    id: '4',
    firstname: 'Giorgi',
    lastname: 'Gabedava',
    isSelected: false,
    city: 0,
  },
  {
    id: '6',
    firstname: 'Guja',
    lastname: 'machavariani',
    isSelected: false,
    city: 0,
  },
];
const dt2 = [
  { id: '1', val: 'All Lawyers', isSelected: true },
  { id: '2', val: 'Blood Law', isSelected: false },
  { id: '3', val: 'Social Law', isSelected: false },
  { id: '4', val: 'Administrative Law', isSelected: false },
  { id: '6', val: 'Human Law', isSelected: false },
];
const TopLawyersScreen = (props) => {
  const renderItem = (item) => {
    return <UserCard user={item} />;
  };
  return (
    <View style={styles.screen}>
      <Text style={styles.screen_title}>Top Lawyers</Text>
      <Filters initialFiltersData={dt2} />
      <FlatList
        data={dt1}
        contentContainerStyle={styles.screen_list}
        renderItem={renderItem}
        numColumns={3}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.backgroundColor,
  },
  screen_title: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 10,
    marginLeft: 10,
  },
});

export default TopLawyersScreen;
