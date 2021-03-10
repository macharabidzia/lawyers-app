import React, { useReducer, useEffect, useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Alert,
  Text,
} from 'react-native';
import {
  Ionicons,
  Feather,
  AntDesign,
  FontAwesome,
  MaterialIcons,
} from '@expo/vector-icons';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import { useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomTitle from '../../components/UI/Title';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import CustomButton from '../../components/UI/CustomButton';
import Dropdown from '../../components/UI/Dropdown';
import { AuthStyles, TextStyle } from '../../constants/GlobalStyles';
import DoubleButton from '../../components/UI/DoubleButton';
import { register } from '../../store/actions/userActions';
import {
  SPECIALIZATION_DROPDOWN_LIST,
  CITIES,
} from '../../constants/Variables';
import formReducer, {
  FORM_INPUT_UPDATE,
  FORM_UPDATE_SINGLE_VALUE,
} from '../../utils/formReducer';
import uploadFileHandler from '../../utils/uploadFileHandler';

const RegisterScreen = (props) => {
  const inputIconSize = 20;
  const iconNamePrefix = Platform.OS === ' android' ? 'md-' : 'ios-';

  const [isLawyer, setIsLawyer] = useState(true);

  const [error, setError] = useState();

  const [city, setCity] = useState(1);
  const [specialization, setSpecialization] = useState(1);
  const [file, setFile] = useState();

  const firstButtonName = 'Lawyer',
    secondButtonName = 'Client';
  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      idnumber: '',
      phone: '',
      ciityN: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });
  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occured', error, [{ text: 'Okay' }]);
    }
  }, [error]);
  const authHandler = async () => {
    if (!formState.formIsValid) {
      setError('Form not valid');
      return;
    }
    let image = '';
    if (isLawyer) {
      if (file && formState.inputValues.ciityN && formState.inputValues) {
        image = await uploadFileHandler(file);
      } else {
        setError('Please enter lawyer information');
        return;
      }
    }
    const userData = {
      idImage: image,
      city,
      specialization,
      isLawyer,
      ...formState.inputValues,
    };
    dispatch(register(userData));
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.1,
    });

    if (!result.cancelled) {
      setFile(result);
    }
  };

  const resetLawyerData = () => {
    dispatchFormState({
      type: FORM_UPDATE_SINGLE_VALUE,
      input: 'ciityN',
      value: '',
    });
    setSpecialization('');
    setFile();
  };
  const handleDoubleButtonChange = (value) => {
    if (!value) {
      resetLawyerData();
    } else {
      setSpecialization(1);
    }
    setIsLawyer(value);
  };
  return (
    <KeyboardAvoidingView
      style={AuthStyles.screen}
      keyboardVerticalOffset={70}
      behavior="height"
    >
      <View style={styles.gradient}>
        <CustomTitle />
        <Card style={styles.authContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Text style={AuthStyles.headingText}>Create Account</Text>
            </View>
            <View style={styles.nameContainer}>
              <View style={styles.fillAvailableSpace}>
                <Input
                  id="firstname"
                  placeholder="Name"
                  keyboardType="default"
                  required
                  autoCapitalize="none"
                  // errorText="please enter a valid email address"
                  onInputChange={inputChangeHandler}
                  initialValue=""
                  style={AuthStyles.input}
                >
                  <Feather
                    style={AuthStyles.searchIcon}
                    name="user"
                    size={inputIconSize}
                    color={Colors.darkGray}
                  />
                </Input>
              </View>
              <View style={styles.fillAvailableSpace}>
                <Input
                  id="lastname"
                  placeholder="Surname"
                  keyboardType="default"
                  required
                  autoCapitalize="none"
                  // errorText="please enter a valid email address"
                  onInputChange={inputChangeHandler}
                  initialValue=""
                  style={AuthStyles.input}
                >
                  <Feather
                    style={AuthStyles.searchIcon}
                    name="user"
                    size={inputIconSize}
                    color={Colors.darkGray}
                  />
                </Input>
              </View>
            </View>
            <View style={styles.fillAvailableSpace}>
              <Input
                id="email"
                placeholder="Email"
                keyboardType="default"
                required
                autoCapitalize="none"
                // errorText="please enter a valid email address"
                onInputChange={inputChangeHandler}
                initialValue=""
                style={AuthStyles.input}
              >
                <Ionicons
                  name={iconNamePrefix + 'mail'}
                  size={inputIconSize}
                  color={Colors.darkGray}
                  style={AuthStyles.searchIcon}
                />
              </Input>
            </View>
            <View style={styles.fillAvailableSpace}>
              <Input
                id="password"
                placeholder="Password"
                keyboardType="default"
                secureTextEntry
                required
                minLength={5}
                onInputChange={inputChangeHandler}
                initialValue=""
                style={AuthStyles.input}
              >
                <Ionicons
                  name={iconNamePrefix + 'lock'}
                  size={inputIconSize}
                  color={Colors.darkGray}
                  style={AuthStyles.searchIcon}
                />
              </Input>
            </View>
            <View style={styles.fillAvailableSpace}>
              <Input
                id="idnumber"
                placeholder="Enter your id number"
                keyboardType="default"
                secureTextEntry
                required
                minLength={5}
                errorText="please enter a valid password"
                onInputChange={inputChangeHandler}
                initialValue=""
                style={AuthStyles.input}
              >
                <AntDesign
                  style={AuthStyles.searchIcon}
                  name="idcard"
                  size={inputIconSize}
                  color={Colors.darkGray}
                />
              </Input>
            </View>
            <View style={styles.input}>
              <Dropdown
                selectedValue={city}
                onValueChange={(value, key) => setCity(value)}
                data={CITIES}
              />
            </View>
            <View style={styles.fillAvailableSpace}>
              <Input
                id="phone"
                placeholder="Phone Number"
                keyboardType="number-pad"
                secureTextEntry
                required
                minLength={5}
                errorText="please enter a valid password"
                onInputChange={inputChangeHandler}
                initialValue=""
                style={AuthStyles.input}
              >
                <FontAwesome
                  name="phone"
                  size={inputIconSize}
                  color={Colors.darkGray}
                  style={AuthStyles.searchIcon}
                />
              </Input>
            </View>
            <View style={styles.middleSectionWrapper}>
              <View style={{ marginBottom: 20 }}>
                <Text style={{ ...TextStyle }}>Register as :</Text>
              </View>
              <DoubleButton
                onSelectValue={handleDoubleButtonChange}
                firstButtonActive={isLawyer}
                firstButtonName={firstButtonName}
                secondButtonName={secondButtonName}
                defaultColor={Colors.default}
              />
            </View>
            {isLawyer ? (
              <View>
                <View style={styles.lawyerInputsContainer}>
                  <View style={styles.dashedInput}>
                    <TouchableOpacity
                      style={styles.centeredView}
                      onPress={pickImage}
                    >
                      <AntDesign
                        name="idcard"
                        size={50}
                        color={Colors.default}
                      />

                      <Text style={{ ...TextStyle, color: Colors.primary }}>
                        {!file
                          ? 'Upload front side of your id-card'
                          : 'Successfully Uploaded'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.fillAvailableSpace}>
                  <Input
                    id="ciityN"
                    placeholder="City N"
                    keyboardType="default"
                    required
                    autoCapitalize="none"
                    // errorText="please enter a valid email address"
                    onInputChange={inputChangeHandler}
                    initialValue=""
                    style={styles.input}
                  >
                    <MaterialIcons
                      name="gavel"
                      size={20}
                      color={Colors.darkGray}
                      style={AuthStyles.searchIcon}
                    />
                  </Input>
                </View>
                <Dropdown
                  selectedValue={specialization}
                  onValueChange={(value, key) => setSpecialization(value)}
                  data={SPECIALIZATION_DROPDOWN_LIST}
                />
              </View>
            ) : (
              <View></View>
            )}
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Sign Up"
                textStyle={{ color: Colors.white }}
                style={{
                  ...AuthStyles.button,
                  backgroundColor: Colors.primary,
                }}
                onPress={authHandler}
              />
            </View>
          </ScrollView>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    paddingHorizontal: 10,
    width: '95%',
    maxHeight: 600,
    maxWidth: 400,
  },
  dashedInput: {
    borderRadius: 15,
    borderStyle: 'dashed',
    borderColor: Colors.mango,
    borderWidth: 2,
  },
  centeredView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lawyerInputsContainer: {
    height: 150,
    padding: 10,
    width: '100%',
  },
  middleSectionWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  nameContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },

  fillAvailableSpace: {
    flex: 1,
    marginVertical: 8,
    marginHorizontal: 5,
  },
});
export default RegisterScreen;
