import { httpClient } from "../httpclient/HttpClient";
import { TRANSACTION_FETCHING, TRANSACTION_SUCCESS, TRANSACTION_FAILED, SERVER } from '../ActionTypes';

export const setStateToFetching = () => ({
    type: TRANSACTION_FETCHING,
})

export const setStateToSuccess = (payload) => ({
    type: TRANSACTION_SUCCESS,
    payload
})

export const setStateToFailed = () => ({
    type: TRANSACTION_FAILED,
})

export const addOrder = (payload) => {
    return async (dispatch) => {
      try {
          dispatch(setStateToFetching());
          const result = await httpClient.post(SERVER.TRANSACTION_URL, payload);
          dispatch(setStateToSuccess(result.data[1].message));
      } catch (error) {
          dispatch(setStateToFailed());
      }
    };
  };
