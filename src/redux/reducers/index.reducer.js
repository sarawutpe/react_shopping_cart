import { combineReducers } from 'redux';
import registerReducer from '../reducers/register.reducer';
import loginReducer from '../reducers/login.reducer';
import stockReducer from '../reducers/stock.reducer';
import cartReducer from '../reducers/cart.reducer';
import transactionReducer from '../reducers/transaction.reducer';

export default combineReducers({
    registerReducer,
    loginReducer,
    cartReducer,
    transactionReducer,
    stockReducer
});