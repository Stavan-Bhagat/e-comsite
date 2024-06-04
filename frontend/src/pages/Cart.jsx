// src/components/Cart.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import { Image } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../redux/Slice/cartSlice";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartamount = useSelector((state) => state.cart.totalAmount);
  console.log("citem", cartamount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id) => {
    console.log(id);
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    // alert("Proceeding to checkout...");
    navigate("/checkout");
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.sellingPrice || 0) * (item.quantity || 0),
      0
    );
  };

  return (
    <>
      <Header />
      {cartItems.length === 0 ? (
        <Box
          sx={{
            height: "90vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Please Add a Product
          <ProductionQuantityLimitsIcon className="text-danger" />
        </Box>
      ) : (
        <Container>
          <Typography variant="h4" gutterBottom>
            Shopping Cart
          </Typography>
          <Divider />
          <Grid container spacing={2}>
            {cartItems.map((item) => (
              <Grid container item spacing={2} key={item._id}>
                <Grid item xs={3}>
                  <Image
                    src={item.productImage[0]}
                    alt={item.productName}
                    style={{ width: 100 }}
                    fluid
                  />
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="h6">{item.productName}</Typography>
                  <Typography variant="body1">
                    Price: ${item.sellingPrice}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1">Quantity:</Typography>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(item._id, parseInt(e.target.value))
                    }
                    style={{ width: "60px", marginRight: "10px" }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h6">
                    ${item.sellingPrice * item.quantity}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <IconButton onClick={() => handleRemoveItem(item._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Divider />
          <Box mt={2}>
            <Typography variant="h5">
              Total: ${calculateTotal().toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
              sx={{ mt: 2 }}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Cart;
