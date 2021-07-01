import React from "react";
// React useSelector useDispatch from redux
import { useSelector, useDispatch } from 'react-redux'; 
// Register actions
import * as registerActions from '../../actions/register.action';
// Material UI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// Link react router dom
import { Link } from "react-router-dom";
// Alert
import Alert from "@material-ui/lab/Alert";
// Fromik
import { Formik } from 'formik';

// Make styles
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  // Register reducer
  const registerReducer = useSelector(({registerReducer}) => registerReducer);
  // Use dispatch
  const dispatch = useDispatch();

  // Use styles from makeStyles();
  const classes = useStyles();
  return (
    <>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">Sign up</Typography>
        {/* Begin Formik */}
        <Formik 
        initialValues={{ username: '', fullname: '', email: '', password: '', confirm_password: '' }}

        validate={values => {
            const errors = {};
          // username
          if (!values.username) {
            errors.username = "Required";
          }
          // fullname
          if (!values.fullname) {
            errors.fullname = "Required";
          }
          // email
          if (!values.email ) {
            errors.email = "Required";
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
          }
          // password
          if (!values.password) {
            errors.password = "Required";
          } 
          // confirm password
          if (!values.confirm_password) {
            errors.confirm_password = "Required";
          }
          // password not match
          if (values.password && values.confirm_password && values.password !== values.confirm_password) {
            errors.password = "Password not match";
            errors.confirm_password = "Password not match";
          }
          return errors; 
        }}
        // Click submit register form
        onSubmit = {(values, { setSubmitting }) => {
            setSubmitting(true);
            dispatch(registerActions.Register(values)).then(() => {
            setSubmitting(false);
          });
        }} 
        >

        {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => 
        (
          <form onSubmit={handleSubmit} className={classes.form} >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField variant="outlined" type="text" name="username" onChange={handleChange} value={values.username} error={errors.username && touched.username && errors.username} helperText={errors.username && touched.username && errors.username} label="Username" fullWidth  />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" type="text" name="fullname" onChange={handleChange} value={values.fullname} error={errors.fullname && touched.fullname && errors.fullname} helperText={errors.fullname && touched.fullname && errors.fullname} label="Full Name" fullWidth  />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" type="text" name="email" onChange={handleChange} value={values.email} error={errors.email && touched.email && errors.email} helperText={errors.email && touched.email && errors.email} label="Email Address" fullWidth  />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" type="password" name="password" onChange={handleChange} value={values.password} error={errors.password && touched.password && errors.password} helperText={errors.password && touched.password && errors.password} label="Password" fullWidth  />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" type="password" name="confirm_password" onChange={handleChange} value={values.confirm_password} error={errors.confirm_password && touched.confirm_password && errors.confirm_password} helperText={errors.confirm_password && touched.confirm_password && errors.confirm_password} label="Confirm Password" fullWidth  />
            </Grid>
            {/* Alert success */}
            {registerReducer.result && (
              <Grid item xs={12}>
                <Alert severity="success">ลงทะเบียนสำเร็จ</Alert>
              </Grid>
            )}
            {/* End */}
            {/* Alert error */}
            {registerReducer.isError && (
              <Grid item xs={12}>
                  <Alert severity="error">บัญชีนี้มีอยู่แล้วในระบบ</Alert>
              </Grid>
            )}
            {/* End */}
          </Grid>
          <Button variant="contained" color="primary" type="submit" fullWidth className={classes.submit} disabled={isSubmitting}>
            Sign Up
          </Button>

          <Box display="flex" justifyContent="space-between">
            <Box>
              <Link to="/">Home</Link>
            </Box>
            <Box>
              <Link to="/login">Already have an account? Login</Link>
            </Box>
          </Box>
          
        </form>
        )}
        </Formik>
        {/* End Formik */}
      </div>
    </Container>
    </>
  );
}
