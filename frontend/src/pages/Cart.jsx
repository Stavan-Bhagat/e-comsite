import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Box, Typography, Button, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { removeFromCart, updateQuantity } from '../redux/Slice/cartSlice';
import {
  StyledEmptyCartMessage,
  StyledCartContainer,
  StyledCartItem,
  StyledProductImage,
  StyledQuantityInput,
} from '../css/styles/cart.style';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    navigate('/checkout');
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
        <StyledEmptyCartMessage>
          <Typography variant="h5" align="center">
            Please Add a Product
          </Typography>
          <ProductionQuantityLimitsIcon color="error" fontSize="large" />
        </StyledEmptyCartMessage>
      ) : (
        <StyledCartContainer>
          <Typography
            variant="h4"
            pb={2}
            gutterBottom
            sx={{ fontFamily: 'Playfair Display, serif', fontWeight: 'bold', fontSize: '1.5rem' }}
          >
            Shopping Cart
          </Typography>
          <Grid container mt={2} spacing={2}>
            {cartItems.map((item) => (
              <StyledCartItem container item spacing={2} key={item._id}>
                <Grid item xs={3}>
                  <StyledProductImage src={item.productImage[0]} alt={item.productName} />
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="buttton">{item.productName}</Typography>
                  <Typography variant="body2">Price: ${item.sellingPrice}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="body1">Quantity:</Typography>
                  <StyledQuantityInput
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value, 10))}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h6">${item.sellingPrice * item.quantity}</Typography>
                </Grid>
                <Grid item xs={1}>
                  <IconButton onClick={() => handleRemoveItem(item._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </StyledCartItem>
            ))}
          </Grid>
          <Box mt={1}>
            <Typography variant="h5">Total: ${calculateTotal().toFixed(2)}</Typography>
            <Button variant="contained" color="primary" onClick={handleCheckout} sx={{ mt: 2 }}>
              Proceed to Checkout
            </Button>
          </Box>
        </StyledCartContainer>
      )}
    </>
  );
};

export default Cart;
