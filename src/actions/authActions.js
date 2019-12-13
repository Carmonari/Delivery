import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import {GET_ERRORS, SET_CURRENT_USER, CLEAR_ERRORS, FORGOT_USER} from './types';

//Login - get user token
export const loginUser = userData => async dispatch => {
  try {
    let res = await axios.post(
      'http://10.0.2.2:5000/api/users/login',
      userData,
    );
    //Save to localstorage
    const {token} = res.data;
    //set token to ls
    await AsyncStorage.setItem('jwtToken', token);
    //Set token to auth header
    setAuthToken(token);
    //Decode token to get user data
    const decode = jwt_decode(token);
    //set current user
    await dispatch(setCurrentUser(decode));
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

//Set current in user
export const setCurrentUser = decode => {
  return {
    type: SET_CURRENT_USER,
    payload: decode,
  };
};

//Log user out
export const logoutUser = () => async dispatch => {
  //Remove token from localStorage
  await AsyncStorage.removeItem('jwtToken');
  //Remove auth header for future requests
  setAuthToken(false);
  //set current user to {} wich will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

//Forgot pass
export const forgotPass = (forgot, history) => async dispatch => {
  try {
    dispatch(clearErrors());
    let res = await axios.post('http://10.0.2.2:5000/api/users/forgot', forgot);
    dispatch({
      type: FORGOT_USER,
      payload: res.data,
    });
    history.push('/');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

//Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
