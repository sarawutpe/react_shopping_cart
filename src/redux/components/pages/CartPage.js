import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as cartActions from "../../actions/cart.action";

// Static pages
import Header from '../fragments/Header';
import Footer from '../fragments/Footer';

// # Action Types
import { APP_URL_IMAGE } from "../../ActionTypes";
// # Matertial UI
// Make styles
import { makeStyles } from "@material-ui/core/styles";
// Table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
// Button
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
// Dialog
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
// Box
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import { Link } from 'react-router-dom';

import Container from "@material-ui/core/Container";

// Make styles
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

  }));

export default function CartPage() {
   // Cart reducer
   const cartReducer = useSelector(({cartReducer}) => cartReducer);
   const dispatch = useDispatch();
 
   
   // Function total payment
   const totalPayment = cartReducer.result.reduce(
     (total, p) => total + p.price * p.quantity,
     0
   );
 
   // Check cart empty
   const checkCartEmpty = () => {
     if (cartReducer.result.length === 0) {
       return <Typography align="center" style={{ padding: 32 }}>ไม่มีสินค้าในตะกร้า</Typography>
     };
   };
 
   
   // # Function open and confirm dialog
   const [open, setOpen] = useState(false);
   const [selectedItem, setSelectedItem] = useState([null]);
 
 
   //  Handle Dialog Open
   function handleDialogOpen(product) {
     setSelectedItem(product);
     setOpen(true);
   }
 
   //  Handle Dialog Close
   function handleDialogClose() {
     setOpen(false);
   }
 
 
   //  Show Confirm Dialog
  const showConfirmDialog = () => {
     return selectedItem ? (
       <Dialog
         open={open}
         onClose={handleDialogClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
       >
         <DialogTitle id="alert-dialog-title">{"คุณต้องการลบหรือไม่?"}</DialogTitle>
         <DialogContent>
           <DialogContentText id="alert-dialog-description">{selectedItem.name}</DialogContentText>
         </DialogContent>
         <DialogActions>
           <Button onClick={handleDialogClose} color="primary">
             ไม่
             </Button>
           <Button variant="contained" onClick={() => {
              dispatch(cartActions.setStateToRemoveProduct(selectedItem));
              handleDialogClose(); 
           }} 
           color="primary" autoFocus>
             ใช่
           </Button>
         </DialogActions>
       </Dialog>
     ) : null;
   };

  const classes = useStyles();

  return (
    <>
   
    <section className={classes.root}>
    <Header />

    <Container className={classes.main}>
      
    <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">สินค้า</TableCell>
              <TableCell align="center">สต็อก</TableCell>
              <TableCell align="center">ราคาต่อชิ้น</TableCell>
              <TableCell align="center">จำนวน</TableCell>
              <TableCell align="center">ราคารวม</TableCell>
              <TableCell align="center">แอคชั่น</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartReducer.result &&
              cartReducer.result.map((product) => (
                <TableRow key={product._id}>
                  <TableCell component="th" scope="row">
                    <Box display="flex">
                      <Box>
                        <img
                            src={APP_URL_IMAGE + product.image}
                            style={{ width: 80 }}
                            alt={product.image}
                          />
                      </Box>
                      <Box alignSelf="center">
                          <span>{product.name}</span>
                      </Box>                  
                    </Box>
                  </TableCell>
                  <TableCell align="center">{product.stock}</TableCell>
                  <TableCell align="center">{product.price}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup aria-label="outlined primary button group">
                      <Button
                        onClick={() => {
                          if (product.quantity > 1) {
                            dispatch(cartActions.removeProductFromCart(product));
                          } else {
                            handleDialogOpen(product);
                          } 
                        }}
                      >
                        -
                      </Button>
                      <Button>{product.quantity}</Button>
                      <Button onClick={() => dispatch(cartActions.addProductToCart(product))}>
                        +
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                  <TableCell align="center">{product.price * product.quantity}</TableCell>
                  <TableCell align="center">
                    <Typography
                      style={{ cursor: "pointer" }}
                      className={classes.linkHoverPointer}
                      onClick={() => dispatch(cartActions.removeOneProductFromCart(product))}
                    >
                      ลบ
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* Total payment UI */}
        { cartReducer.result[0] && (
          <Box display="flex" justifyContent="flex-end" alignItems="center" p={2}>
            <hr />
            <Box p={1}>
              <p>
                รวมค่าสินค้า ({cartReducer.result.length} สินค้า): ฿{totalPayment}
              </p>
            </Box>
            <Box p={1}>
              <Button component={Link} to="/checkout" variant="contained">สั่งสินค้า</Button>
            </Box>
          </Box>
        )}
        
        {/* Show confirm dialog function */}
        {showConfirmDialog()}

        {/* Check cart empty function */}
        {checkCartEmpty()}
      </TableContainer> 
           
    </Container>

      <Footer />

    </section>
    </>
  );
}