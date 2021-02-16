import React, { useReducer, useEffect, useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
  Text,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import { login } from '../../store/actions/userActions';
import CustomTitle from '../../components/UI/Title';
import CustomButton from '../../components/UI/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import { AuthStyles, TextStyle } from '../../constants/GlobalStyles';
import formReducer, { FORM_INPUT_UPDATE } from '../../utils/formReducer';

const LoginScreen = (props) => {
  const iconPrefix = Platform.OS === ' android' ? 'md-' : 'ios-';

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.navigation.navigate('Home');
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    dispatch(
      login(formState.inputValues.email, formState.inputValues.password)
    );
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
    <KeyboardAvoidingView style={styles.screen} keyboardVerticalOffset={30}>
      <View style={styles.screen_container}>
        <CustomTitle />

        <Card style={styles.screen_container_card}>
          <ScrollView>
            <Text style={AuthStyles.headingText}>Enter your account</Text>
            <View style={styles.screen_card_inputContainer}>
              <Input
                id="email"
                placeholder="Email"
                keyboardType="default"
                required
                autoCapitalize="none"
                onInputChange={inputChangeHandler}
                initialValue=""
                style={AuthStyles.input}
              >
                <Ionicons
                  style={AuthStyles.searchIcon}
                  name={iconPrefix + 'mail'}
                  size={20}
                  color={Colors.darkGray}
                />
              </Input>
            </View>

            <View style={styles.screen_card_inputContainer}>
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
                  style={AuthStyles.searchIcon}
                  name={iconPrefix + 'lock'}
                  size={20}
                  color={Colors.darkGray}
                />
              </Input>
            </View>
            <View style={styles.buttonContainer}>
              {loading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <View>
                  <View style={{ marginBottom: 10 }}>
                    <CustomButton
                      title="Log In"
                      textStyle={{ color: Colors.white }}
                      style={AuthStyles.button}
                      onPress={submitHandler}
                    />
                  </View>
                  <CustomButton
                    title="Don't have an account? Register"
                    textStyle={{ color: Colors.primary, ...TextStyle }}
                    onPress={() => {
                      props.navigation.navigate('Register');
                    }}
                  />
                </View>
              )}
            </View>
          </ScrollView>
          </Card>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1 },
  screen_container_card: {
    flex: 1,
    paddingHorizontal: 10,
    width: '90%',
    maxHeight: 300,
    maxWidth: 400,
  },
  screen_card_inputContainer: {
    marginVertical: 5,
  },
  screen_container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  buttonContainer: {
    padding: 10,
  },
});
export default LoginScreen;
