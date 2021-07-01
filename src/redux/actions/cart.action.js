import { httpClient } from "../httpclient/HttpClient";
import { PRODUCT_FETCHING, PRODUCT_ADD, PRODUCT_REMOVE, PRODUCT_ONE_REMOVE, PRODUCT_FAILED } from "../ActionTypes";

export const setStateToFetching = () => ({
  type: PRODUCT_FETCHING
})

export const setStateToAddProduct = (payload) => ({
  type: PRODUCT_ADD,
  payload
});

export const setStateToRemoveProduct = (payload) => ({
  type: PRODUCT_REMOVE,
  payload
})

export const setStateToRemoveOneProduct = (payload) => ({
  type: PRODUCT_ONE_REMOVE,
  payload
})

export const setStateToFailed = () => ({
  type: PRODUCT_FAILED
})

// Add product to cart
export const addProductToCart = (payload) => {
  return (dispatch) => {
    try {
        dispatch(setStateToAddProduct(payload));
    } catch (error) {
        dispatch(setStateToFailed());
    }
  };
};

// Remove product from cart
export const removeProductFromCart = (payload) => {
  return (dispatch) => {
    try {
        dispatch(setStateToRemoveProduct(payload));
    } catch (error) {
        dispatch(setStateToFailed());
    }
  };
};

// Remove one product from cart
export const removeOneProductFromCart = (payload) => {
  return (dispatch) => {
    try {
      dispatch(setStateToRemoveOneProduct(payload));
    } catch (error) {
      dispatch(setStateToFailed());
    }
  }
}