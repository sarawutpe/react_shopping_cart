import { httpClient } from "../httpclient/HttpClient";
import { REGISTER_FETCING, REGiSTER_SUCCESS, REGISTER_FAILED, SERVER } from '../ActionTypes';

export const setStateToFetching = () => ({
    type: REGISTER_FETCING,
})

export const setStateToSuccess = (payload) => ({
    type: REGiSTER_SUCCESS,
    payload
})

export const setStateToFailed = () => ({
    type: REGISTER_FAILED,
})

// Register
export const Register = (payload) => {
    return async (dispatch) => {
        try {
            dispatch(setStateToFetching());
            const result = await httpClient.post(SERVER.REGISTER_URL, payload);
            dispatch(setStateToSuccess(result.data[1].message));
        } catch (error) {
            dispatch(setStateToFailed());
        }
    }
}