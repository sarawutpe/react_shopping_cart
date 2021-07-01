import React from "react";
import { useSelector } from 'react-redux';

// React router dom
import { useHistory } from "react-router-dom"

// Material UI

import { makeStyles } from '@material-ui/core/styles';

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
  logo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  
  cartLogo: {
    marginRight: theme.spacing(2),
  },
  linkPointer: {
    cursor: "pointer"
  }

}));

const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);

export default function Header() {
    const classes = useStyles();

    // Cart reducer
    const cartReducer = useSelector(({cartReducer}) => cartReducer);
    const history = useHistory();

  return (
    <>
      <CssBaseline />

      <AppBar position="relative" >
        <div className={classes.logo}>
            <Typography className={classes.linkPointer} onClick={() => history.push("/")}  variant="h6" color="inherit" noWrap>
              React Shopping Cart
            </Typography>

           
            <Box>
              <IconButton aria-label="cart" style={{ color: "#fff" }} onClick={() => history.push("/cart")}>
                <StyledBadge badgeContent={cartReducer.result.length}>
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </Box>    

        </div>

            



      </AppBar>

    </>
  );
}
