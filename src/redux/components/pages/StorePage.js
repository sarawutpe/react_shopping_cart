import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Cart actions
import * as cartActions from "../../actions/cart.action";
// Stock actions
import * as stockActions from "../../actions/stock.action";
import { APP_URL_IMAGE } from "../../ActionTypes";

// Static pages
import Header from '../fragments/Header';
import Footer from '../fragments/Footer';

// Matertial UI
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
// Add to cart icons
import Box from "@material-ui/core/Box";
// LinearProgress
import LinearProgress from '@material-ui/core/LinearProgress';

import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },

  circularProgress: {
    display: 'flex',
    justifyContent: 'center'

  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function StorePage(props) {
  const classes = useStyles();
  // Stock reducer
  const stockReducer = useSelector(({stockReducer}) => stockReducer);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(stockActions.getProducts());
  }, []);

  return (
    <>
      <section className={classes.root}>
      <Header />

      <Container className={classes.main}>
        <Box display="flex" justifyContent="flex-end" m={1}>
          <Button component={Link} to="/register">Register</Button>
          <Button component={Link} to="/login">Login</Button>
        </Box>

        {/* Loading... */}
        { stockReducer.isFetching && <LinearProgress /> }

        <Grid container spacing={4}>
          { stockReducer.result && stockReducer.result.map((product) => 
          (
          <Grid item key={product._id} md={3} sm={6} xs={12}>
            <Card className={classes.card}>
              {/* image */}
              <CardMedia className={classes.cardMedia} image={APP_URL_IMAGE + product.image} />

              {/* name */}
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                {product.name}
                </Typography>

                {/* stock */}
                <Typography>มีสินค้าทั้งหมด {product.stock}</Typography>

                {/* price */}
                <Typography variant="h6">฿{product.price}</Typography>
              </CardContent>

              <CardActions style={{ justifyContent: "center" }}>
                {/* Begin add to cart */}
                <Box display="flex" flexDirection="row">
                  <Box pb={1}>
                    <Button color="primary" onClick={() => {dispatch(cartActions.addProductToCart(product))}}>
                      เพิ่มไปยังรถเข็น
                    </Button>
                  </Box>
                </Box>
                {/* End add to cart */}
              </CardActions>
            </Card>
          </Grid>
          ))}
        </Grid>
          
      </Container>

      <Footer />

      </section>
      
    </>
  );
}
