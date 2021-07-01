import React, { useState, useEffect } from "react";
// Use dispatch, Use selector
import { useDispatch, useSelector } from "react-redux";
// Stock actions
import * as stockActions from "../../actions/stock.action";
// Login actions
import * as loginActions from '../../actions/login.action';

import { APP_URL_IMAGE } from "../../ActionTypes";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable, { MTableToolbar } from "material-table";

import Button from '@material-ui/core/Button';

// Link react router dom
import { Link } from "react-router-dom";

import { Typography, Grid } from "@material-ui/core";

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// Dialog
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
}));

export default function Stock(props) {

  const classes = useStyles();

  const stockReducer = useSelector(({ stockReducer }) => stockReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(stockActions.getProducts());
  }, [dispatch]);

  const customColumns = [
    {
      title: "Id",
      field: "id",
      render: (item) => <Typography key={ item._id }>{ item._id }</Typography>,
    },
    {
      title: "Name",
      field: "name",
      render: (item) => <Typography>{ item.name }</Typography>,
    },
    {
      title: "Image",
      field: "image",
      render: (item) => (
        <img src={ APP_URL_IMAGE + item.image } style={{ width: "30%" }} />
      ),
    },
    {
      title: "Price",
      field: "price",
      type: "numeric",
      render: (item) => <Typography>{ item.price }</Typography>,
    },
    {
      title: "Stock",
      field: "stock",
      type: "numeric",
      render: (item) => <Typography>{ item.stock }</Typography>,
    }
  ];

  const customActions = [
    {
      icon: "edit",
      tooltip: "Edit Product",
      onClick: (event, item) => props.history.push("/stockEdit/"+item._id)
    },
    {
      icon: "delete",
      tooltip: "Delete Product",
      onClick: (event, item) => {handleDialogOpen(item)},
    }
  ]

  // # Function open and confirm dialog
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState([null]);

  //  Handle Dialog Open
  const handleDialogOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  //  Handle Dialog Close
  const handleDialogClose = () => {
    setOpen(false);
  };

  //  Show Confirm Dialog
  const showConfirmDialog = () => {
    return selectedItem ? (
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"คุณต้องการลบหรือไม่?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{selectedItem.name}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            ไม่
          </Button>
          
          <Button variant="contained" onClick={() => { 
            dispatch(stockActions.deleteProductById(selectedItem._id));
            handleDialogOpen(false);
          }} 
          color="primary" autoFocus>
            ใช่
          </Button>

        </DialogActions>
      </Dialog>
    ) : null;
  };

  return (
    <>
      <section className={classes.root}>

        <Container className={classes.main}>
    
        <MaterialTable 
          columns={customColumns}
          data={stockReducer.result ? stockReducer.result : []}
          actions={customActions}
          title="Stock Management"
          
          options={{actionsColumnIndex: -1}}
          components={{
            Toolbar: props => (
              <>
                <MTableToolbar {...props} />
                <div style={{padding: '0px 10px'}}>
                  <Button component={Link} to="/stockCreate" variant="contained" color="primary" fullWidth>CREATE</Button>
                </div>
              </>
            )
          }}
          >
        </MaterialTable>

        {/* Show confirm dialog function */}
        {showConfirmDialog()}
         
        <Button style={{ marginTop: 8 }} color="default" className={classes.button} startIcon={<ExitToAppIcon/>} onClick={() => {
          dispatch(loginActions.logout(props));
        }}>
        Logout
        </Button>

        </Container>
      </section>
    </>

  );
}
