import React, { useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../../components/UI/CustomButton';
const uri = {
  uri:
    'https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png',
};
const ClientScreen = (props) => {
  const phoneInputsInitial = [];
  const [phoneInputs, setPhoneInputs] = useState();
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.screen_header}>
        <View style={styles.screen_header_divider}></View>
        <View style={styles.screen_header_container}>
          <View style={styles.screen_header_container_imageContainer}>
            <Image
              source={uri}
              style={styles.screen_header_container_imageContainer_image}
            />
          </View>
          <View style={styles.screen_header_container_textContainer}>
            <Text style={styles.screen_header_container_textContainer_name}>
              Giorgi Shaveshovi
            </Text>
            <Text style={styles.screen_header_container_textContainer_city}>
              Tbilisi
            </Text>
          </View>
        </View>
      </View>

      <Card style={styles.screen_card}>
        <View style={styles.screen_card_rowItem}>
          <Ionicons
            name={
              Platform.OS === ' android'
                ? 'md-phone-portrait'
                : 'ios-phone-portrait'
            }
            size={23}
            color={Colors.darkGray}
          />
          <Text style={styles.screen_card_rowItem_number}>567 123 456</Text>
        </View>
        <View style={styles.screen_card_rowItem}>
          <Ionicons
            name={Platform.OS === ' android' ? 'md-mail' : 'ios-mail'}
            size={23}
            color={Colors.darkGray}
          />
          <Text style={styles.screen_card_rowItem_email}>
            macharabidzia@gmail.com
          </Text>
        </View>
        <CustomButton
          title="See Number"
          onPress={() => {}}
          style={styles.screen_card_button}
        />
      </Card>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.backgroundColor,
  },
  screen_header: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    height: 230,
    alignItems: 'center',
  },
  screen_header_divider: {
    position: 'absolute',
    width: '100%',
    height: 30,
    backgroundColor: Colors.backgroundColor,
    borderRadius: 13,
    bottom: -10,
  },
  screen_header_container: {
    marginTop: 30,
    alignItems: 'center',
  },
  screen_header_container_imageContainer: { width: 90, height: 90 },
  screen_header_container_imageContainer_image: {
    height: '100%',
    width: '100%',
    borderRadius: 45,
  },
  screen_header_container_textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  screen_header_container_textContainer_name: { color: Colors.white },
  screen_header_container_textContainer_city: { color: Colors.darkGray },
  screen_card: {
    borderRadius: 0,
    backgroundColor: Colors.backgroundColor,
    elevation: 0,
    paddingBottom: 30,
  },
  screen_card_rowItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.default,
    alignItems: 'center',
    padding: 10,
  },
  screen_card_rowItem_number: { marginLeft: 16 },
  screen_card_rowItem_email: { marginLeft: 10 },
  screen_card_button: {
    width: '80%',
    height: 50,
    backgroundColor: Colors.lightGray,
    borderRadius: 15,
    justifyContent: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
});
export default ClientScreen;
