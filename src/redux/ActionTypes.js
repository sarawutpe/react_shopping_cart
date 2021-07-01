// ### Action pages ### //
// Register
export const REGISTER_FETCING = "REGISTER_FETCING";
export const REGiSTER_SUCCESS = "REGiSTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

// Login
export const LOGIN_FETCING = "LOGIN_FETCING";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

// Logout
export const LOGOUT = "LOGOUT";

// Stock
export const STOCK_FETCHING = "STOCK_FETCHING";
export const STOCK_SUCCESS = "STOCK_SUCCESS";
export const STOCK_FAILED = "STOCK_FAILED";
export const STOCK_CLEAR = "STOCK_CLEAR";

// Cart
export const PRODUCT_FETCHING = "PRODUCT_FETCHING";
export const PRODUCT_ADD = "PRODUCT_ADD";
export const PRODUCT_REMOVE = "PRODUCT_REMOVE";
export const PRODUCT_ONE_REMOVE = "PRODUCT_ONE_REMOVE";
export const PRODUCT_FAILED = "PRODUCT_FAILED";

// Order
export const TRANSACTION_FETCHING = "TRANSACTION_FETCHING";
export const TRANSACTION_SUCCESS = "TRANSACTION_SUCCESS";
export const TRANSACTION_FAILED = "TRANSACTION_FAILED";

// ### HTTP interceptor ### //
export const APP_URL = "http://localhost:8085";
export const APP_URL_API = "http://localhost:8085/api/v2";
export const APP_URL_IMAGE = "http://localhost:8085/uploaded/images/";

export const SERVER = { 
    LOING_URL: `authen/login`,
    REGISTER_URL: `authen/register`,
    PRODUCT_URL: `stock/product`,
    TRANSACTION_URL: `transaction/order`, 
}

// HTTP error code
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

// HTTP message
export const NETWORK_CONNECTION_MESSAGE = "NETWORK_CONNECTION_MESSAGE";


