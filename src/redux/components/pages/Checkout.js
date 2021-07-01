import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
// React redux
import { useDispatch, useSelector } from "react-redux";

// static pages
import Header from "../fragments/Header";
import Footer from "../fragments/Footer";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import * as transactionActions from '../../actions/transaction.action';
import Container from '@material-ui/core/Container';

import Alert from '@material-ui/lab/Alert';

// Fromik
import { Formik } from "formik";


const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function Checkout() {
  const steps = ["Shipping address", "Payment details"];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return renderAddressForm();
      case 1:
        return renderPaymentForm();
      case 2:
        return renderCompletedForm();
      default:
        throw new Error("Unknown step");
    }
  }

  // Shipping address
  const [shippingAddress, setshippingAddress] = useState({})

  // Address form
  const renderAddressForm = () => {
    return (
      <>
        <Formik
          initialValues={{ fullname: '', phone_number: '', address: '', city: '', state: '', zipcode: '', country: 'THAILAND' }}

          validate={values => {
            const errors = {};
            if (!values.fullname) errors.fullname = "Required";
            if (!values.phone_number) errors.phone_number = "Required";
            if (!values.address) errors.address = "Required";
            if (!values.city) errors.city = "Required";
            if (!values.state) errors.state = "Required";
            if (!values.zipcode) errors.zipcode = "Required";
            if (!values.country) errors.country = "Required";
            return errors
          }}

          onSubmit = {values => {
            setshippingAddress(values);
            handleNext();
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit}) => 
          (
             <form onSubmit={handleSubmit}>
              <Typography variant="h6" gutterBottom>
                Shipping address
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    name="fullname"
                    onChange={handleChange}
                    value={values.fullname}
                    error={errors.fullname && touched.fullname && errors.fullname}
                    helperText={errors.fullname && touched.fullname && errors.fullname}
                    label="ชื่อ-นามสกุล"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="phone_number"
                    onChange={handleChange}
                    value={values.phone_number}
                    error={errors.phone_number && touched.phone_number && errors.phone_number}
                    helperText={errors.phone_number && touched.phone_number && errors.phone_number}
                    label="หมายเลขโทรศัพท์"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="address"
                    onChange={handleChange}
                    value={values.address}
                    error={errors.address && touched.address && errors.address}
                    helperText={errors.address && touched.address && errors.address}
                    label="ที่อยู่"
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField 
                  name="city" 
                  onChange={handleChange}
                  value={values.city}
                  error={errors.city && touched.city && errors.city}
                  helperText={errors.city && touched.city && errors.city}
                  label="จังหวัด" 
                  fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                  name="state" 
                  onChange={handleChange}
                  value={values.state}
                  error={errors.state && touched.state && errors.state}
                  helperText={errors.state && touched.state && errors.state}
                  label="อำเภอ" 
                  fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                  name="zipcode"
                  onChange={handleChange}
                  value={values.zipcode}
                  error={errors.zipcode && touched.zipcode && errors.zipcode}
                  helperText={errors.zipcode && touched.zipcode && errors.zipcode}
                  label="รหัสไปรษณีย์"
                  fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                  name="country" 
                  onChange={handleChange}
                  value={values.country}
                  error={errors.country && touched.country && errors.country}
                  helperText={errors.country && touched.country && errors.country}
                  label="ประเทศ" 
                  fullWidth />
                </Grid>

               
                <Grid item xs={12}>
                  <div className={classes.buttons}>
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                        Next
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </form>
            
          )}
        </Formik>
      </>
    );
  };

 
  // Payment form
  const renderPaymentForm = () => {
    // Total payment
    const totalPayment = cartReducer.result.reduce((total, p) => total + p.price * p.quantity,0);

    // Paypal create order
    const createOrder = (data, actions) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: totalPayment,
            },
          },
        ],
      });
    };
  
    // Paypal on approve
    const onApprove = (data, actions) => {
      return actions.order.capture().then((details) => {
            // Order Details
            const orderDetails = JSON.stringify(
              cartReducer.result.map(
                (cart) => " รหัสสินค้า " + cart._id + " จำนวน " + cart.quantity
              )
            );
            // Add to db
            dispatch(transactionActions.addOrder({ address: JSON.stringify(shippingAddress), order: orderDetails, paid: true }));
            
            // settimeout 1s
            setTimeout(() => {
              handleNext();
            }, 1000)
      })
    };

    // Paypal on error
    const onError = (err) => {
      console.log(err);
    }
    
    return (
      <>
      {/* Begin Review Section */}
      <Typography variant="h6" gutterBottom>
        Review your order 
        </Typography>

        { cartReducer.result[0] && cartReducer.result.map((p) => {
          return (
          <>
          <Grid key={p._id} container spacing={3} >
            <Grid item xs={2}>
              <Typography>
                { p.quantity+'X' }
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>
                { p.name }
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography align="right">
                { p.price * p.quantity }
              </Typography>
            </Grid>
          </Grid>
          </>
          )
        })}

        { cartReducer.result[0] && (
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Typography>
                รวมทั้งหมด
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography align="right">
                  { totalPayment }
              </Typography>
            </Grid>
        </Grid>
        ) }
        
        {/* End Review Section */}

        {/* Begin Payment Section */}
        <Typography variant="h6" style={{marginTop: 10}}>
          Payment method
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
              <PayPalButton
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
                onError={(data, actions) => onError(data, actions)}
              />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.buttons}>
              <Button onClick={handleBack} className={classes.button}>
                Back
              </Button>
            </div>
          </Grid>  
        </Grid>
        {/* End Payment Section */}
      </>
    );
  };

  // Transaction reducer
  const transactionReducer = useSelector(({transactionReducer}) => transactionReducer);
  const renderCompletedForm = () => {
    return(
      <>
        <Typography variant="h6" gutterBottom>
          Payment status:
        </Typography>

        <Alert severity="success">Success</Alert>

        <Typography style={{ marginTop: 10 }}>
          {"Thank you for your order."}
        </Typography>

        <Typography style={{ marginTop: 10 }}>
          { `Your Order number is ${transactionReducer.result._id ? transactionReducer.result._id : []}`}
        </Typography>
      </>
    )
  }

  const classes = useStyles();
  const cartReducer = useSelector(({ cartReducer }) => cartReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    // Order
  

    // console.log(orderDetails);
  }, [dispatch]);

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
     <section className={classes.root}>
     <Header/>

      <Container className={classes.main}>
        
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
          </Paper>
        </main>

      </Container>

      <Footer/>
      </section>
    </>
  );
}
