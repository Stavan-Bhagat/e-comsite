import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Container, Typography, Box, Divider, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router';
import PaymentForm from '../components/PaymentForm';
import receiptTexture from '../images/texture.jpg';
import { MESSAGES } from '../constant/messages.constant';

const ConfirmationPage = () => {
  const orderDetails = useSelector((state) => state.order.orderDetails);
  const cartData = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!orderDetails || !cartData.length) {
      enqueueSnackbar(MESSAGES.ERROR.NO_ORDER_DETAILS, { variant: 'warning' });
      navigate('/cart');
    }
  }, [orderDetails, cartData, navigate, enqueueSnackbar]);

  const calculateTotal = () => {
    return cartData.reduce(
      (total, item) => total + (item.sellingPrice || 0) * (item.quantity || 0),
      0
    );
  };

  const totalAmount = calculateTotal();

  if (!orderDetails || !cartData.length) {
    return null;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom className="text-center mb-3 bg-light text-black">
        {MESSAGES.INFO.ORDER_CONFIRMATION}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              padding: 3,
              boxShadow: 3,
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${receiptTexture})`,
            }}
            className="bg-light text-center"
          >
            <Typography variant="h6" gutterBottom>
              Billing Details
            </Typography>
            <Typography>Name: {orderDetails?.name}</Typography>
            <Typography>Address: {orderDetails?.address}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Order Details
            </Typography>
            {cartData.map((item) => (
              <Box key={item._id} mb={1}>
                <Typography>Product: {item.productName}</Typography>
                <Typography>Quantity: {item.quantity}</Typography>
                <Typography>Price: ${item.sellingPrice}</Typography>
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" gutterBottom>
              Total Amount: ${totalAmount}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <PaymentForm totalAmount={totalAmount} orderDetails={orderDetails} cartData={cartData} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ConfirmationPage;
