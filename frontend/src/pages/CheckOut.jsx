// src/components/BuyNowPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../redux/Slice/orderSlice';

const CheckOut = () => {
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
  });

  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.sellingPrice * item.quantity, 0)
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePlaceOrder = () => {
    const orderDetails = {
      ...shippingDetails,
      items: cartItems,
      totalAmount,
    };

    dispatch(placeOrder(orderDetails));
    setShippingDetails({
      name: '',
      address: '',
    });

    navigate('/confirmation');
  };

  return (
    <Container
      sx={{
        width: '40%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box>
        <Typography variant="h4" gutterBottom>
          Checkout
        </Typography>
        <TextField
          name="name"
          label="Name"
          value={shippingDetails.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="address"
          label="Address"
          value={shippingDetails.address}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handlePlaceOrder}
          fullWidth
          size="large"
        >
          Place Order
        </Button>
      </Box>
    </Container>
  );
};

export default CheckOut;
