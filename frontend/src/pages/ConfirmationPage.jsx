/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Container, Typography, Box, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import axiosInstance from '../utils/axios';
import { clearCart } from '../redux/Slice/cartSlice';
// import PaymentForm from '../components/PaymentForm';

const ConfirmationPage = () => {
  const orderDetails = useSelector((state) => state.order.orderDetails);
  const cartData = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!orderDetails || !cartData.length) {
      enqueueSnackbar('No order details available.', { variant: 'warning' });
      navigate('/cart');
    }
  }, [orderDetails, cartData, navigate, enqueueSnackbar]);

  const calculateTotal = () => {
    return cartData.reduce(
      (total, item) => total + (item.sellingPrice || 0) * (item.quantity || 0),
      0
    );
  };

  const totalAmount = calculateTotal(); // Calculate total amount

  const onSubmit = async () => {
    const mergedData = {
      ...orderDetails,
      items: cartData,
      totalAmount, // Pass totalAmount
    };

    try {
      // const response = await axiosInstance.post('/order/add-Order', mergedData);
      // if (response.status === 201) {
      //   enqueueSnackbar('Order placed successfully.', { variant: 'success' });
      //   dispatch(clearCart());
      //   navigate('/');
      // }
      navigate('/paymentform');
    } catch (error) {
      enqueueSnackbar(
        `Failed to place the order: ${error.response?.data?.message || error.message}`,
        {
          variant: 'error',
        }
      );
    }
  };

  if (!orderDetails || !cartData.length) {
    return null;
  }

  return (
    <Container
      sx={{ width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box>
        <Typography variant="h4" gutterBottom>
          Order Confirmation
        </Typography>
        <Box mb={2}>
          <Typography variant="h6">Billing Details</Typography>
          <Typography>Name: {orderDetails?.name}</Typography>
          <Typography>Address: {orderDetails?.address}</Typography>
        </Box>
        <Divider />
        <Box mb={2}>
          <Typography variant="h6">Order Details</Typography>
          {cartData.map((item) => (
            <Box key={item._id} mb={1}>
              <Typography>Product: {item.productName}</Typography>
              <Typography>Quantity: {item.quantity}</Typography>
              <Typography>Price: ${item.sellingPrice}</Typography>
            </Box>
          ))}
        </Box>
        <Divider />
        <Box mt={2}>
          <Typography variant="h5">Total Amount: ${totalAmount}</Typography>
        </Box>
        <Box mt={2}>
          <Button onClick={onSubmit} variant="contained" color="success">
            Place Order
          </Button>
        </Box>
        {/* <Box mt={2}>
          <Typography variant="h5">Payment</Typography>

          <PaymentForm totalAmount={totalAmount} />
        </Box> */}
      </Box>
    </Container>
  );
};

export default ConfirmationPage;
