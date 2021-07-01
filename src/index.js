import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Redux Begin
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './redux/reducers/index.reducer';

// Redux End
const store = createStore(reducers, applyMiddleware(thunk, logger));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
