import React from "react";
// React useSelector useDispatch from redux
import { useSelector, useDispatch } from 'react-redux'; 
// Register actions
import * as loginActions from '../../actions/login.action';

// # Material UI
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
import { Link } from 'react-router-dom';
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  // Login reducer
  const loginReducer = useSelector(({loginReducer}) => loginReducer);
  // Use dispatch
  const dispatch = useDispatch();
  
  // Use make styles
  const classes = useStyles();

  return (
    <>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Formik 
        initialValues={{ username: 'admin', password: '1234' }}

        validate={values => {
          const errors = {};
          if (!values.username) errors.username = "Required";
          if (!values.password) errors.password = "Required";
          return errors;
        }}
        
        onSubmit = {(values, { setSubmitting }) => {
            setSubmitting(true);
          dispatch(loginActions.Login(values,props)).then(() => {
            setSubmitting(false);
          })
          
        }}
        >

          {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit} className={classes.form} >
            <TextField variant="outlined" type="text" name="username" onChange={handleChange} value={values.username} error={errors.username && touched.username && errors.username} helperText={errors.username && touched.username && errors.username} margin="normal" label="Username" fullWidth />
            <TextField variant="outlined" type="password" name="password" onChange={handleChange} value={values.password} error={errors.password && touched.password && errors.password} helperText={errors.password && touched.password && errors.password} margin="normal" label="Password" fullWidth />
            {/* Alert success */}
            {loginReducer.result && (
              <Grid item xs={12}>
                <Alert severity="success">ล็อกอินสำเร็จ</Alert>
              </Grid>
            )}
            {/* End */}
            {/* Alert error */}
            {loginReducer.isError && (
              <Grid item xs={12}>
                <Alert severity="error">ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง</Alert>
              </Grid>
            )}
            {/* End */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isSubmitting}
            >
              Sign In
            </Button>


            <Box display="flex" justifyContent="space-between">
            <Box>
              <Link to="/">Home</Link>
            </Box>
            <Box>
              <Link to="/register">Don't have an account? Register</Link>
            </Box>
          </Box>

          </form>
          )}
        </Formik>

      </div>
    </Container>


    </>
  );
}
