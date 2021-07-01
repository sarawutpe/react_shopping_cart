import { httpClient } from "../httpclient/HttpClient";
import {
  STOCK_FETCHING,
  STOCK_SUCCESS,
  STOCK_FAILED,
  SERVER,
} from "../ActionTypes";

// Sent action to reducers
// Fetching
export const setStateToFetching = () => ({
  type: STOCK_FETCHING,
});

// Success
export const setStateToSuccess = (payload) => ({
  type: STOCK_SUCCESS,
  payload,
});

// Failed
export const setStateToFailed = () => ({
  type: STOCK_FAILED,
});

// #### Components call ####

// CREATE
// Add products
export const addProduct = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setStateToFetching());
      const result = await httpClient.post(SERVER.PRODUCT_URL, payload);
      dispatch(setStateToSuccess(result.data[1].message));
    } catch (error) {
      dispatch(setStateToFailed());
    }
  }
}

// READ
// Load product function
async function loadProduct(dispatch) {
  try {
    const result = await httpClient.get(SERVER.PRODUCT_URL);
    dispatch(setStateToSuccess(result.data[1].message));
  } catch (error) {
    dispatch(setStateToFailed());
  }
}

// Get all products
export const getProducts = () => {
  return async (dispatch) => {
    try {
      dispatch(setStateToFetching());
      await loadProduct(dispatch);
    } catch (error) {
      return error;
    }
  };
};

// Get product by Id
export const getProductById = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setStateToFetching());
      const result = await httpClient.get(`${SERVER.PRODUCT_URL}/${payload}`);
      dispatch(setStateToSuccess(result.data[1].message));
    } catch (error) {
      dispatch(setStateToFailed());
    }
  }
}

// UPDATE
// Update product by Id
export const updateProductById = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setStateToFetching());
      const result = await httpClient.put(SERVER.PRODUCT_URL, payload);
      dispatch(setStateToSuccess(result.data[1].message));
    } catch (error) {
      dispatch(setStateToFailed());
    }
  }
}


// DELETE
// Delete product by Id
export const deleteProductById = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setStateToFetching());
      const result= await httpClient.delete(`${SERVER.PRODUCT_URL}/${payload}`);
      await loadProduct(dispatch);
      dispatch(setStateToSuccess(result.data[1].message));
    } catch (error) {
      dispatch(setStateToFailed());
    }
  }
}

