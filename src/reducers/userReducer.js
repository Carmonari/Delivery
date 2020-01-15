import {GET_PROFILE} from '../actions/types';

const initialState = {
  infoUser: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        infoUser: action.payload,
      };
    default:
      return state;
  }
};
