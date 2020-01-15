import axios from 'axios';
import {GET_PROFILE, GET_ERRORS} from './types';
import {clearErrors} from './authActions';

//Get profile
export const getProfile = id => async dispatch => {
  try {
    let res = await axios.get(`http://10.0.2.2:4000/api/users/profile/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.payload.data,
    });
  }
};

//Edit profile
export const editProfile = (id, eProfile, history) => async dispatch => {
  try {
    dispatch(clearErrors);
    let res = await axios.patch(
      `http://10.0.2.2:4000/api/users/profile/${id}`,
      eProfile,
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    history.push('/perfil-info');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
