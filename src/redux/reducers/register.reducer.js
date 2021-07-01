import {
  REGISTER_FETCING,
  REGiSTER_SUCCESS,
  REGISTER_FAILED,
} from "../ActionTypes";

const initialState = {
  isFetching: false,
  isError: false,
  result: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_FETCING:
      return { ...state, isFetching: true, isError: false, result: null };
    case REGiSTER_SUCCESS:
      return { ...state, isFetching: false, isError: false, result: payload };
    case REGISTER_FAILED:
      return { ...state, isFetching: false, isError: true, result: null };
    default:
      return state;
  }
};
