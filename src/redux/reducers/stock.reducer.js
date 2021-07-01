import { STOCK_FETCHING, STOCK_SUCCESS, STOCK_FAILED } from "../ActionTypes";

const initialState = {
  isFetching: false,
  isError: false,
  result: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case STOCK_FETCHING:
      return { ...state, isFetching: true, isError: false, result: null };
    case STOCK_SUCCESS:
      return { ...state, isFetching: false, isError: false, result: payload };
    case STOCK_FAILED:
      return { ...state, isFetching: null, isError: true, result: null };
    default:
      return state;
  }
};
