import React, { useState } from "react";
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

const Cart = () => {
  // Example cart data, replace with your actual cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      productName: "Product 1",
      price: 100,
      quantity: 1,
      productImage: "https://via.placeholder.com/150", // Placeholder image
    },
    {
      id: 2,
      productName: "Product 2",
      price: 200,
      quantity: 2,
      productImage: "https://via.placeholder.com/150", // Placeholder image
    },
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    // Implement checkout functionality
    alert("Proceeding to checkout...");
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Divider />
      <Grid container spacing={2}>
        {cartItems.map((item) => (
          <Grid container item spacing={2} key={item.id}>
            <Grid item xs={3}>
              <Image src={item.productImage} alt={item.productName} fluid />
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6">{item.productName}</Typography>
              <Typography variant="body1">Price: ${item.price}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1">Quantity:</Typography>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value))
                }
                style={{ width: "60px", marginRight: "10px" }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6">
                ${item.price * item.quantity}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={() => handleRemoveItem(item.id)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Divider />
      <Box mt={2}>
        <Typography variant="h5">Total: ${calculateTotal()}</Typography>
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
  );
};

export default Cart;
