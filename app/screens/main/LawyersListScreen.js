import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import DoubleButton from '../../components/UI/DoubleButton';
import Filters from '../../components/UI/Filters';
import Card from '../../components/UI/Card';
import HorizontalCard from '../../components/main/HorizontalCard';
import Colors from '../../constants/Colors';
import { useSelector } from 'react-redux';
// const keyword = match.params.keyword;
// const pageNumber = match.params.pageNumber || 1;
const DUMMYDATA = [
  { id: '1', val: 'Giorgi Chxaidze', isSelected: true },
  { id: '2', val: 'Nugzar Chkhondideli', isSelected: false },
  { id: '3', val: 'Biorgi Bagedava', isSelected: false },
  { id: '4', val: 'Emzar Emzarashvili', isSelected: false },
  { id: '5', val: 'Joni Jonishvili', isSelected: false },
  { id: '7', val: 'Guram Guramishvili', isSelected: false },
  { id: '8', val: 'Lado Gudiashvili', isSelected: false },
];
const INITIAL_FILTERS_DATA = [
  { id: '1', val: 'All Lawyers', isSelected: true },
  { id: '2', val: 'Blood Law', isSelected: false },
  { id: '3', val: 'Social Law', isSelected: false },
  { id: '4', val: 'Administrative Law', isSelected: false },
  { id: '6', val: 'Human Law', isSelected: false },
];
const LawyersListScreen = (props) => {
  const firstButtonName = 'Find Lawyers',
    secondButtonName = 'Lawyers List';

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleDoubleButtonChange = (value) => {
    if (value !== false) props.navigation.navigate('Home');
  };

  const renderItem = ({ item }) => {
    return (
      <HorizontalCard
        item={item}
        onPress={() =>
          userInfo
            ? props.navigation.navigate('LawyerProfile')
            : Alert.alert('error', 'You should authorize to view this page')
        }
        style={{ marginLeft: 4 }}
      />
    );
  };

  return (
    <View style={styles.lawyersList}>
      <Card style={styles.lawyersList_card}>
        <DoubleButton
          firstButtonActive={false}
          firstButtonName={firstButtonName}
          secondButtonName={secondButtonName}
          onSelectValue={handleDoubleButtonChange}
          defaultColor={Colors.white}
        />
      </Card>
      <Filters initialFiltersData={INITIAL_FILTERS_DATA} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={DUMMYDATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  lawyersList: { backgroundColor: Colors.backgroundColor, flex: 1 },
  lawyersList_card: {
    width: '95%',
    backgroundColor: 'transparent',
    borderRadius: 15,
    marginVertical: 15,
    alignSelf: 'center',
    height: 45,
  },
});

export default LawyersListScreen;
