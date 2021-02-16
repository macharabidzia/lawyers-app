import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import LawyerCard from '../../components/UI/LawyerCard';
import MenuListItem from '../../components/UI/MenuListItem';
let list = [
  {
    text: 'Change Password',
    icon: 'icn',
  },
  {
    text: 'Phone Parameters',
    icon: 'icn',
  },
  {
    text: 'Change Language',
    icon: 'icn',
  },
  {
    text: 'Privacy Policy',
    icon: 'icn',
  },
];
const SettingsScreen = (props) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
    }
  }, [dispatch, userInfo]);
  return (
    <ScrollView style={styles.screen}>
      {userInfo && userInfo.firstname && (
        <View style={styles.screen_cardContainer}>
          <LawyerCard
            onIconClick={() => props.navigation.navigate('EditLawyerProfile')}
            style={styles.screen_cardContainer_card}
            user={userInfo}
          />
        </View>
      )}
      <View style={styles.screen_card__elipsis}></View>
      <Card style={styles.screen_card}>
        {list.map((item, index) => (
          <MenuListItem key={index} text={item.text} />
        ))}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { backgroundColor: Colors.backgroundColor },
  screen_cardContainer: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
  },
  screen_cardContainer_card: { backgroundColor: Colors.primary },
  screen_card__elipsis: {
    position: 'absolute',
    width: '100%',
    height: 30,
    backgroundColor: Colors.backgroundColor,
    borderRadius: 13,
    top: 90,
  },
  screen_card: {
    borderRadius: 0,
    backgroundColor: Colors.backgroundColor,
    elevation: 0,
  },
  screen_card_item: {
    flex: 1,
    borderBottomColor: Colors.darkGray,
    borderBottomWidth: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  screen_card_item_icon: { marginRight: 15 },
  optionButton: {
    borderRadius: 15,
    borderLeftColor: '#fff',
    backgroundColor: Colors.mango,
    width: 120,
    paddingVertical: 10,
  },
  submitButton: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.lightGray,
    borderRadius: 15,
  },
});
export default SettingsScreen;
