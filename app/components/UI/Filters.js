import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Card from './Card';
const Item = ({ item, onPress, style }) => {
  return (
    <View>
      <Card
        style={
          item.isSelected ? styles.cardActiveFilter : styles.cardInactiveFilter
        }
      >
        <TouchableOpacity
          index={item.id}
          item={item}
          onPress={onPress}
          style={[styles.item, style]}
        >
          <Text
            color={item.isSelected ? 'black' : '#D9D9D9'}
            style={styles.title}
          >
            {item.val}
          </Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

const Filters = ({ initialFiltersData }) => {
  const [filters, setFilters] = useState(initialFiltersData);
  const changeFilter = (item) => {
    let itms = filters.map((filter) => {
      filter.isSelected = false;
      if (filter.id === item.id) {
        filter.isSelected = !filter.isSelected;
      }
      return filter;
    });
    setFilters(itms);
  };
  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => changeFilter(item)}
        style={{ marginLeft: 4 }}
      />
    );
  };

  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: 'row', alignItems: 'center' }}
        data={filters}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
  },
  title: {},
  cardInactiveFilter: {
    margin: 10,
    backgroundColor: 'transparent',
    borderColor: '#D9D9D9',
    elevation: 0,
    borderWidth: 1,
    padding: 5,
  },
  cardActiveFilter: {
    padding: 5,
    margin: 10,
    borderWidth: 1,
    borderColor: 'transparent',
  },
});
export default Filters;
