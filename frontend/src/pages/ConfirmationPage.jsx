import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Container, Typography, Box, Divider, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import axiosInstance from '../utils/axios';
import { clearCart } from '../redux/Slice/cartSlice';
import PaymentForm from '../components/PaymentForm';

const ConfirmationPage = () => {
  const orderDetails = useSelector((state) => state.order.orderDetails);
  const cartData = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  if (!orderDetails || !cartData) {
    return (
      <Container>
        <Typography variant="h5" gutterBottom>
          No order details available.
        </Typography>
      </Container>
    );
  }

  const calculateTotal = () => {
    return cartData.reduce(
      (total, item) => total + (item.sellingPrice || 0) * (item.quantity || 0),
      0
    );
  };

  const onSubmit = async () => {
    const mergedData = {
      ...orderDetails,
      items: cartData,
      totalAmount: calculateTotal(),
    };

    try {
      const response = await axiosInstance.post(`/order/add-Order`, mergedData);
      if (response.status === 201) {
        enqueueSnackbar(`Order placed successfully.`, {
          variant: 'info',
        });
        dispatch(clearCart());
        navigate('/');
      }
    } catch (error) {
      enqueueSnackbar(`Failed to place the order.`, {
        variant: 'info',
      });
    }
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
          {cartData?.map((item) => (
            <Box key={item._id} mb={1}>
              <Typography>Product: {item.productName}</Typography>
              <Typography>Quantity: {item.quantity}</Typography>
              <Typography>Price: ${item.sellingPrice}</Typography>
            </Box>
          ))}
        </Box>
        <Divider />
        <Box mt={2}>
          <Typography variant="h5">Total Amount: ${calculateTotal()}</Typography>
        </Box>
        <Box>
          <Button onClick={onSubmit} variant="contained" color="success">
            Place Order
          </Button>
        </Box>
        {/* Payment form */}
        <Box mt={2}>
          <Typography variant="h5">Payment</Typography>
          <PaymentForm />
        </Box>
      </Box>
    </Container>
  );
};

export default ConfirmationPage;
