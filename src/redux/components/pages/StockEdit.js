import React, { useEffect } from "react";
// Use dispatch, Use selector
import { useDispatch, useSelector } from "react-redux";
// Stock actions
import * as stockActions from "../../actions/stock.action";
// Fromik
import { Formik } from "formik";
// React router
import { Link } from 'react-router-dom';
// Action types
import { APP_URL_IMAGE } from "../../ActionTypes";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from '@material-ui/core/Paper';

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
  paper: {
    padding: theme.spacing(2)
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  btn: {
    '& > *': {
      marginRight: theme.spacing(2),
    },
  },
}));

export default function StockEdit(props) {
  // Use styles
  const classes = useStyles();

  // Stock reducer
  const stockReducer = useSelector(({ stockReducer }) => stockReducer);

  // Use dispatch
  const dispatch = useDispatch();

  // Use effect
  useEffect(() => {
  const id = props.match.params.id;
  dispatch(stockActions.getProductById(id))

  }, [dispatch, props.match.params.id])

  function previewImage(values) {
      if (values.file_obj) {
          // For preview
          return <img src={values.file_obj} style={{ width: 200, height: 150 }} />
      } else if (values.image) {
          // For upload
          return <img src={APP_URL_IMAGE+'/'+values.image} style={{ width: 200, height: 150 }} />;
      }
  }

  return (
    <>
      <section className={classes.root}>

        <Container className={classes.main}>
        <Paper className={classes.paper} elevation={2}>
        <Typography variant="h6" style={{ paddingLeft: 8 }}>Stock Edit</Typography>  
        
          <Formik
            enableReinitialize={true}
            
            initialValues={stockReducer.result ? stockReducer.result : { name: ' ', price: ' ', stock: ' ' }}

            validate={(values) => {
              const errors = {};
              if (!values.name) errors.name = "Required";
              if (!values.price) errors.price = "Required";
              if (!values.stock) errors.stock = "Required";
              return errors;
            }}

            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              // Create Form Data
              const formData = new FormData();
              formData.append("_id", values._id);
              formData.append("name", values.name);
              formData.append("price", values.price);
              formData.append("stock", values.stock);

              // image file not empty
              if (values.file) {
                formData.append("image", values.file);
              }

              dispatch(stockActions.updateProductById(formData)).then(() => {
                setSubmitting(false);
                props.history.push("/stock");
              });
            }}
            >
            {({ values, errors, touched, handleChange, handleSubmit, isSubmitting, setFieldValue,}) => 
              (
              <form onSubmit={handleSubmit}>
                <FormControl className={classes.form}>
                  <TextField
                    type="text"
                    name="name"
                    label="Name"
                    onChange={handleChange}
                    value={values.name}
                    error={errors.name && touched.name && errors.name}
                    helperText={errors.name && touched.name && errors.name}
                  />
                </FormControl>

                <FormControl className={classes.form}>
                  <TextField
                    type="text"
                    name="price"
                    label="Price"
                    onChange={handleChange}
                    value={values.price}
                    error={errors.price && touched.price && errors.price}
                    helperText={errors.price && touched.price && errors.price}
                  />
                </FormControl>

                <FormControl className={classes.form}>
                  <TextField
                    type="text"
                    name="stock"
                    label="Stock"
                    onChange={handleChange}
                    value={values.stock}
                    error={errors.stock && touched.stock && errors.stock}
                    helperText={errors.stock && touched.name && errors.stock}
                  />
                </FormControl>

                <FormControl className={classes.form}>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => {
                      e.preventDefault();
                      // For upload
                      setFieldValue("file", e.target.files[0]);
                      // For preview
                      setFieldValue(
                        "file_obj",URL.createObjectURL(e.target.files[0])
                      );
                    }}
                  />
                </FormControl>

                <FormControl className={classes.form}>
                {/* values.file_obj ? values.file_obj (<img src={values.file_obj} style={{ width: "50%" }} */}
                  {/* Preview image */}
                {previewImage(values)}
                </FormControl>

                <ButtonGroup className={classes.btn}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Edit
                </Button>
                <Button
                  component={Link}
                  to="/stock"
                  variant="contained"
                  color="default"
                >
                  Cancel
                </Button>
                </ButtonGroup>
              </form>
              )}
          </Formik>

      </Paper>
        </Container>
    </section>
    </>
  
      
  );
}
