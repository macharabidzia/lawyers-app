import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Input from '../../components/UI/Input';
import { useSelector } from 'react-redux';
import { AuthStyles } from '../../constants/GlobalStyles';
import { SPECIALIZATION_DROPDOWN_LIST } from '../../constants/Variables';
import Dropdown from '../../components/UI/Dropdown';
import formReducer, { FORM_INPUT_UPDATE } from '../../utils/formReducer';
import InputListItem from '../../components/authorized/InputListItem';
import AddToListbutton from '../../components/authorized/AddToListbutton';
const EditLawyerProfileScreen = (props) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [phoneNumbers, setPhoneNumbers] = useState(userInfo.phoneNumbers);
  const laws = ['Human Law', 'Marshal Law', 'Uran Law'];
  const [specialization, setSpecialization] = useState();
  const uri = {
    uri:
      'https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png',
  };
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      phone: '',
      city: 1,
      additionalLocation: '',
      about: '',
      specialization: '',
    },
    inputValidities: {
      password: false,
    },
    formIsValid: false,
  });
  useEffect(() => {}, [userLogin]);

  const addAditionalPhoneNumber = () => {
    if (formState.inputValidities.phone && phoneNumbers.length < 3) {
      // array of phone numbers as strings
      const numbersArray = phoneNumbers.map((item) => item.number);
      // Set removes duplicates and if unique adds to the list
      setPhoneNumbers(
        [...new Set(numbersArray).add(formState.inputValues.phone)].map(
          (item, index) =>
            Object.create({
              number: item,
              primary: phoneNumbers[index]
                ? phoneNumbers[index].primary
                : false,
            })
        )
      );
    }
  };

  const deletePhoneHandler = () => {
    setPhoneNumbers([...phoneNumbers]);
  };
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.screen_header}>
        <View style={styles.screen_header_borderFix}></View>
        <View style={styles.screen_header_container}>
          <View style={styles.screen_header_container_imageContainer}>
            <Image
              source={uri}
              style={styles.screen_header_container_imageContainer_image}
            />
            <View
              style={
                styles.screen_header_container_imageContainer_iconContainer
              }
            >
              <TouchableOpacity>
                <Ionicons
                  name={Platform.OS === ' android' ? 'md-camera' : 'ios-camera'}
                  size={15}
                  color={Colors.white}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.screen_header_container_textContainer}>
            <Text style={styles.screen_header_container_textContainer_name}>
              {userInfo.firstname + ' ' + userInfo.lastname}
            </Text>
            <Text style={styles.screen_header_container_textContainer_spec}>
              Social Law
            </Text>
          </View>
        </View>
      </View>
      <Card style={styles.screen_card}>
        <View style={styles.screen_card_inputContainer}>
          <Text style={styles.screen_card_inputContainer_label}>
            Phone Number
          </Text>
          <Input
            id="phone"
            placeholder="Enter your phone number"
            keyboardType="default"
            required
            minLength={5}
            errorText="please enter a valid password"
            style={AuthStyles.input}
            onInputChange={inputChangeHandler}
          />
        </View>
        <View style={styles.screen_card_inputContainer}>
          <AddToListbutton
            onPress={addAditionalPhoneNumber}
            text="Add aditional Phone Number"
          />
          <View style={styles.screen_card_inputContainer_list}>
            {phoneNumbers.map((phoneNumber, key) => (
              <InputListItem
                key={key}
                primary={phoneNumber.primary}
                text={phoneNumber.number}
              />
            ))}
          </View>
        </View>
        <View style={styles.screen_card_inputContainer}>
          <Text style={styles.screen_card_inputContainer_label}>Location</Text>
          <Dropdown
            selectedValue={specialization}
            onValueChange={(value, key) => setSpecialization(value)}
            data={SPECIALIZATION_DROPDOWN_LIST}
          />
        </View>
        <View style={styles.screen_card_inputContainer}>
          <AddToListbutton
            onPress={addAditionalPhoneNumber}
            text="Add Aditional Location"
          />
        </View>
        <View style={styles.screen_card_inputContainer}>
          <Text style={styles.screen_card_inputContainer_label}>About Me</Text>
          <Input
            id="description"
            placeholder="Tell more about yourself"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            multiline={true}
            numberOfLines={8}
            errorText="please enter a valid password"
            onInputChange={inputChangeHandler}
            initialValue=""
            style={styles.screen_card_inputContainer_textArea}
          />
        </View>
        {userInfo.isLawyer && (
          <>
            <View style={styles.screen_card_inputContainer}>
              <Text style={styles.screen_card_inputContainer_label}>
                Additional Specialization
              </Text>
              <Dropdown
                selectedValue={specialization}
                onValueChange={(value, key) => setSpecialization(value)}
                data={SPECIALIZATION_DROPDOWN_LIST}
              />
            </View>
            <View style={styles.screen_card_inputContainer}>
              <AddToListbutton
                onPress={addAditionalPhoneNumber}
                text="Add Aditional Specialization"
              />
              <View style={styles.screen_card_inputContainer_list}>
                {laws.map((law, key) => (
                  <InputListItem key={key} text={law} />
                ))}
              </View>
            </View>
          </>
        )}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { backgroundColor: Colors.backgroundColor },
  screen_header: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    height: 230,
    alignItems: 'center',
  },
  screen_header_borderFix: {
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
  screen_header_container_imageContainer_iconContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    right: 0,
    bottom: 0,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  screen_header_container_textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  screen_header_container_textContainer_name: { color: Colors.white },
  screen_header_container_textContainer_spec: {
    color: Colors.darkGray,
  },
  screen_card: {
    borderRadius: 0,
    backgroundColor: Colors.backgroundColor,
    elevation: 0,
    paddingBottom: 30,
    marginHorizontal: 15,
  },
  screen_card_inputContainer_label: {
    marginBottom: 10,
    marginLeft: 3,
  },

  screen_card_inputContainer_textArea: {
    textAlignVertical: 'top',
    padding: 10,
  },
  screen_card_inputContainer: {
    flex: 1,
    marginVertical: 10,
  },
  screen_card_inputContainer_list: { marginVertical: 5 },
  screen_card_inputContainer_pickerContainer: {
    backgroundColor: Colors.default,
    borderRadius: 13,
  },
});
export default EditLawyerProfileScreen;
