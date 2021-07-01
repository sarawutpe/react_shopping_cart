import {
    LOGIN_FETCING,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT
  } from "../ActionTypes";
  
  const initialState = {
    isFetching: false,
    isError: false,
    result: null,
  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case LOGIN_FETCING:
        return { ...state, isFetching: true, isError: false, result: null };
      case LOGIN_SUCCESS:
        return { ...state, isFetching: false, isError: false, result: payload };
      case LOGIN_FAILED:
        return { ...state, isFetching: false, isError: true, result: null };
      case LOGOUT:
        return initialState;
      default:
        return state;
    }
  };
  