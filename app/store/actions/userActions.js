import axios from 'axios';
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_LOGOUT,
  USER_LAWYERS_TOP_LIST_REQUEST,
  USER_LAWYERS_TOP_LIST_SUCCESS,
  USER_LAWYERS_TOP_LIST_FAIL,
} from '../constants/userConstants';
import { saveDataToStorage } from '../../utils/asyncStorageFunctions';
import AsyncStorage from '@react-native-community/async-storage';
export const authenticate = (data) => async (dispatch) => {
  dispatch({
    type: USER_LOGIN_SUCCESS,
    payload: data,
  });
};
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    console.log(config);
    const { data } = await axios.post(
      'http://192.168.100.5:5000/api/users/login',
      { email, password },
      config
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(100) * 1000
    );
    await saveDataToStorage(data.token, data._id, expirationDate);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    const { data } = await axios.post(
      'http://192.168.100.5:5000/api/users',
      userData,
      config
    );
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    const expirationDate = new Date(
      new Date().getTime() + parseInt(100) * 1000
    );
    await saveDataToStorage(data.token, data._id, expirationDate);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users/${id}`, config);
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTopLawyers = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LAWYERS_TOP_LIST_REQUEST });

    const { data } = await axios.get(
      'http://192.168.100.5:5000/api/users/lawyers/top'
    );
    dispatch({ type: USER_LAWYERS_TOP_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LAWYERS_TOP_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  await AsyncStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  // dispatch({ type: USER_DETAILS_RESET });
  // dispatch({ type: USER_LIST_RESET });
};
export const getLogin = () => async (dispatch) => {
  const data = await AsyncStorage.getItem('userInfo');
  if (data) {
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  }

  // dispatch({ type: USER_DETAILS_RESET });
  // dispatch({ type: USER_LIST_RESET });
};
