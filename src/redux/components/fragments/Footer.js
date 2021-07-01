import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor: theme.palette.type === "light" ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}React Shopping Cart {new Date().getFullYear() + "."}
          </Typography>
        </Container>
      </footer>
    </>
  );
}
