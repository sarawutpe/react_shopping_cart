import React from "react";
// Frontend Pages
import Login from "./redux/components/pages/Login";
import Register from "./redux/components/pages/Register";
import StorePage from "./redux/components/pages/StorePage";
import CartPage from "./redux/components/pages/CartPage";
import Checkout from './redux/components/pages/Checkout';
// Backend Pages
import Stock from "./redux/components/pages/Stock";
import StockCreate from './redux/components/pages/StockCreate';
import StockEdit from './redux/components/pages/StockEdit';

// React router dom
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// Material UI
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

// Secured route
const SecuredRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      // ternary condition
      (localStorage.getItem("LOGIN_STATUS") === "OK") ? ( <Component {...props} /> ) : ( <Redirect to="/login" /> )
    }
  />
);

// Custom theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main : "#135ab8"
    }
  }
})

export default function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
          <Switch>
            <Route exact={true} path="/" component={StorePage} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/cart" component={CartPage} />
            <Route path="/checkout" component={Checkout} />

            {/* <SecuredRoute path="/stock" component={Stock} /> */}
            <SecuredRoute path="/stockCreate" component={StockCreate} />
            <SecuredRoute path="/stockEdit/:id" component={StockEdit} />

          </Switch>
      </BrowserRouter>
    </ThemeProvider>
    </>
  );
}
