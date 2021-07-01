import { httpClient } from "../httpclient/HttpClient";
import { LOGIN_FETCING, LOGIN_SUCCESS, LOGIN_FAILED, SERVER, LOGOUT } from '../ActionTypes';

export const setStateToFetching = () => ({
    type: LOGIN_FETCING,
})

export const setStateToSuccess = (payload) => ({
    type: LOGIN_SUCCESS,
    payload
})

export const setStateToFailed = () => ({
    type: LOGIN_FAILED,
})

export const setStateToLogout = () => ({
    type: LOGOUT
})

// Login
export const Login = (payload, props) => {
    return async (dispatch) => {
        try {
            dispatch(setStateToFetching());
            const result = await httpClient.post(SERVER.LOING_URL, payload);
            if (result.data[0].status === "OK") {
                localStorage.setItem("LOGIN_STATUS", "OK");
                dispatch(setStateToSuccess(result.data[1].message));

                // delay 0.5s
                setTimeout(() => {
                props.history.push("/stock");
                }, 500);
            }
        } catch (error) {
            dispatch(setStateToFailed());
        }
    }
}

// Logout
export const logout = (props) => {
    return (dispatch) => {
        localStorage.removeItem("LOGIN_STATUS");
        dispatch(setStateToLogout());

        // delay 0.5s
        setTimeout(() => {
            props.history.push("/stock");
        }, 500);
    }
}

