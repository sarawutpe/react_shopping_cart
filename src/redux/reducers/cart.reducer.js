import { PRODUCT_FETCHING, PRODUCT_ADD, PRODUCT_REMOVE, PRODUCT_ONE_REMOVE, PRODUCT_FAILED } from "../ActionTypes";

const initialState = {
  isFetching: false,
  isError: false,
  result: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCT_FETCHING:
      return { ...state, isFetching: true};

    case PRODUCT_ADD: {
      const exist = state.result.find((p) => p._id === payload._id); 
      if (exist) {
        return { ...state, result: (state.result.map((p) => p._id === payload._id ? { ...exist, quantity: exist.quantity + 1 } : p)) };
      } else {
        return { ...state, result: [...state.result, { ...payload, quantity: 1 }] };
      }
    }

    case PRODUCT_REMOVE: {
      const exist = state.result.find((p) => p._id === payload._id);
      if (exist.quantity === 1) {
        return { ...state, result: (state.result.filter((p) => p._id !== payload._id)) };
      } else {
        return { ...state, result: (state.result.map((p) => p._id === payload._id ? { ...exist, quantity: exist.quantity -1} : p)) }
      }
    }

    case PRODUCT_ONE_REMOVE: {
      const exist = state.result.find((p) => p._id === payload._id);
      if (exist) {
        return { ...state, result: (state.result.filter((p) => p._id !== payload._id)) };
      }
    }

    case PRODUCT_FAILED:
      return { ...state, isError: true};
      
    default:
      return state;
  }
};
