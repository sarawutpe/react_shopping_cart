import { TRANSACTION_FETCHING, TRANSACTION_SUCCESS, TRANSACTION_FAILED } from '../ActionTypes';

const initialState = {
  isFetching: false,
  isError: false,
  result: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TRANSACTION_FETCHING:
      return { ...state, isFetching: true, isError: false, result: null };
    case TRANSACTION_SUCCESS:
        return { ...state, isFetching: false, isError: false, result: payload };
    case TRANSACTION_FAILED:
        return { ...state, isFetching: false, isError: true, result: null };
    default:
      return state;
  }
};
