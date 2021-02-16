import React, { useEffect, useState } from 'react';
import { FlatList, Text, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Card from '../../components/UI/Card';
import Dropdown from '../../components/UI/Dropdown';
import { Ionicons } from '@expo/vector-icons';
import SpecializationBox from '../../components/main/SpecializationBox';
import UserCard from '../../components/main/UserCard';
import DoubleButton from '../../components/UI/DoubleButton';
import { TextStyleBold } from '../../constants/GlobalStyles';
import {
  CITIES,
  SPECIALIZATION_LIST,
  SPECIALIZATION_DROPDOWN_LIST,
} from '../../constants/Variables';
import { listTopLawyers } from '../../store/actions/userActions';
import Loading from '../../components/UI/Loading';
const HomeScreen = (props) => {
  const [city, setCity] = useState('batumi');
  const [specialization, setSpecialization] = useState('batumi');

  const firstButtonName = 'Find Lawyers',
    secondButtonName = 'Lawyers List';

  const dispatch = useDispatch();

  const userTopLawyers = useSelector((state) => state.userTopLawyers);
  const { loading, error, lawyers } = userTopLawyers;

  useEffect(() => {
    dispatch(listTopLawyers());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  const handleDoubleButtonChange = (value) => {
    if (value !== true) props.navigation.navigate('LawyersList');
  };

  return (
    <ScrollView style={styles.home}>
      <Card style={styles.home_card}>
        <DoubleButton
          firstButtonActive={true}
          firstButtonName={firstButtonName}
          secondButtonName={secondButtonName}
          onSelectValue={handleDoubleButtonChange}
          defaultColor={Colors.white}
        />
      </Card>

      <View style={styles.home_search}>
        <Card style={styles.home_search_card}>
          <Dropdown
            pickerStyle={styles.home_search_card_dropdown}
            selectedValue={city}
            onValueChange={(value, key) => setCity(value)}
            data={CITIES}
          />
          <Dropdown
            pickerStyle={styles.home_search_card_dropdown}
            selectedValue={specialization}
            onValueChange={(value, key) => setSpecialization(value)}
            data={SPECIALIZATION_DROPDOWN_LIST}
          />
          <TouchableOpacity
            style={styles.home_search_card_button}
            color={Colors.primary}
            onPress={() => {}}
          >
            <Text style={styles.home_search_card_button_text}>Search</Text>
          </TouchableOpacity>
        </Card>
      </View>

      <View style={styles.home_carousel}>
        <View style={styles.home_carousel_wrapper}>
          <Text style={styles.home_carousel_wrapper_text}>Top Lawyers</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('TopLawyers')}
          >
            <Ionicons
              style={styles.home_carousel_wrapper_icon}
              name="md-arrow-forward"
              size={20}
              color="#000"
            ></Ionicons>
          </TouchableOpacity>
        </View>
        {lawyers && lawyers.length > 0 && (
          <FlatList
            data={lawyers}
            keyExtractor={(item) => item._id.toString()}
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={styles.home_carousel_list}
            renderItem={(itemData) => <UserCard user={itemData} />}
          />
        )}
      </View>
      <View style={styles.home_specializations}>
        <Text style={styles.home_specializations_title}>Specialization</Text>
        {SPECIALIZATION_LIST.map((item) => (
          <SpecializationBox color={item.color} key={item.id} data={item} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  home: { flex: 1, backgroundColor: Colors.backgroundColor },

  home_card: {
    width: '95%',
    backgroundColor: 'transparent',
    borderRadius: 15,
    marginVertical: 15,
    alignSelf: 'center',
  },

  home_search: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
    flex: 1,
    marginBottom: 10,
    height: 230,
  },
  home_search_card: {
    width: '100%',
    flex: 1,
    maxWidth: 500,
    paddingVertical: 15,
  },
  home_search_card_dropdown: {
    borderWidth: 1,
    borderColor: Colors.mango,
    backgroundColor: Colors.white,
    margin: 10,
  },
  home_search_card_button: {
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#013C77',
    padding: 10,
    margin: 10,
  },
  home_search_card_button_text: { ...TextStyleBold, color: '#fff' },

  home_carousel: {
    backgroundColor: Colors.white,
    height: 200,
    paddingHorizontal: 10,
  },
  home_carousel_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FAFBFF',
  },
  home_carousel_wrapper_text: { ...TextStyleBold, textTransform: 'uppercase' },
  home_carousel_wrapper_icon: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  home_carousel_list: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  home_specializations: {
    width: '100%',
    flex: 1,
    backgroundColor: '#013C77',
    padding: 0,
    margin: 0,
  },
  home_specializations_title: {
    fontSize: 15,
    color: Colors.white,
    margin: 10,
    textTransform: 'uppercase',
    ...TextStyleBold,
  },
});
export default HomeScreen;
