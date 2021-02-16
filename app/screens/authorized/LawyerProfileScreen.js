import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import CustomButton from '../../components/UI/CustomButton';
import LawyerProfileCard from '../../components/main/LawyerProfileCard';

const uri = {
  uri:
    'https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png',
};
const item = {
  id: '1',
  firstname: 'Giorgi',
  lastname: 'Matcharashvili',
  isSelected: true,
  city: "Tbilisi",
  description: `is simply dummy text of the printing and typesetting industry. Lorem
  Ipsum has been the industry's standard dummy text ever since the
  1500s, when an unknown printer took a galley of type and scrambled it
  to make a type specimen book. It has survived not only five centuries,
  but also the leap into electronic typesetting, remaining essentially
  unchanged. It was popularised in the 1960s with the release of
  Letraset sheets containing Lorem Ipsum passages, and more recently
  with desktop publishing software like Aldus PageMaker including
  versions of Lorem Ipsum.`,
};

const LawyerProfileScreen = (props) => {
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.screen_header}>
        <Image source={uri} style={styles.screen_header_image} />
      </View>
      <View style={styles.screen_cardContainer}>
        <View style={styles.screen_cardContainer__elipsis}></View>
        <View style={styles.screen_cardContainer_about}>
          <View>
            <Text style={styles.screen_cardContainer_about_name}>
              Nugzar Tavadze
            </Text>
            <View style={styles.screen_cardContainer_about_iconContainer}>
              <FontAwesome5
                name="handshake"
                size={15}
                color={Colors.deepGray}
              />

              <Text style={styles.screen_cardContainer_about_spec}>
                Social Law
              </Text>
            </View>
          </View>
          <CustomButton
            title="See Number"
            onPress={() => {}}
            style={styles.screen_cardContainer_about_button}
          />
        </View>

        <Card style={styles.screen_cardContainer_card}>
          <View style={styles.screen_cardContainer_card_row}>
            <View style={styles.screen_cardContainer_card_iconContainer}>
              <Ionicons
                name={Platform.OS === ' android' ? 'md-mail' : 'ios-mail'}
                size={30}
                color={Colors.lightBlue}
              />
              <Text style={styles.screen_cardContainer_card_iconContainer_text}>
                Mail
              </Text>
            </View>
            <View style={styles.screen_cardContainer_card_iconContainer}>
              <Ionicons
                name={Platform.OS === ' android' ? 'md-people' : 'ios-people'}
                size={30}
                color={Colors.lightBlue}
              />
              <Text style={styles.screen_cardContainer_card_iconContainer_text}>
                City N
              </Text>
            </View>
            <View style={styles.screen_cardContainer_card_iconContainer}>
              <Ionicons
                name={Platform.OS === ' android' ? 'md-pin' : 'ios-pin'}
                size={30}
                color={Colors.lightBlue}
              />
              <Text style={styles.screen_cardContainer_card_iconContainer_text}>
                Location
              </Text>
            </View>
          </View>
          <CustomButton
            onPress={() => {}}
            style={styles.screen_cardContainer_card_button}
            title="Show Number"
          />
        </Card>
        <LawyerProfileCard item={item} style={{ marginLeft: 4 }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.backgroundColor },
  screen_header: { width: '100%', height: 250 },
  screen_header_image: {
    height: '100%',
    width: '100%',
  },
  screen_cardContainer: {
    flex: 1,
  },
  screen_cardContainer__elipsis: {
    position: 'absolute',
    width: '100%',
    height: 50,
    backgroundColor: Colors.backgroundColor,
    top: -30,
    zIndex: 1,
    borderRadius: 13,
  },
  screen_cardContainer_about: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
    marginHorizontal: 12,
    marginVertical: 15,
  },
  screen_cardContainer_about_iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  screen_cardContainer_card: {
    height: 180,
    marginHorizontal: 10,
    justifyContent: 'center',
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  screen_cardContainer_card_row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkGray,
    paddingBottom: 10,
  },
  screen_cardContainer_card_iconContainer: { alignItems: 'center' },
  screen_cardContainer_card_iconContainer_text: { color: Colors.deepGray },
  screen_cardContainer_about_name: { fontSize: 15 },
  screen_cardContainer_about_spec: { color: Colors.deepGray },
  screen_cardContainer_about_button: {
    borderRadius: 15,
    borderLeftColor: '#fff',
    backgroundColor: Colors.mango,
    width: 120,
    paddingVertical: 10,
  },

  screen_cardContainer_card_button: {
    width: '100%',
    height: 50,
    marginTop: 10,
    backgroundColor: Colors.lightGray,
    borderRadius: 15,
    justifyContent: 'center',
  },
});
export default LawyerProfileScreen;
