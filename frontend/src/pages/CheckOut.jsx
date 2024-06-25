import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { placeOrder } from '../redux/Slice/orderSlice';
import { MESSAGES } from '../constant/messages.constant';

const CheckOut = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const buyNowProduct = useSelector((state) => state.buyNow.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      address: '',
    },
  });

  useEffect(() => {
    if (!cartItems.length && !buyNowProduct) {
      navigate('/');
    }
  }, [cartItems, buyNowProduct, navigate]);

  const calculateTotal = () => {
    if (buyNowProduct) {
      return buyNowProduct.sellingPrice;
    }
    return cartItems.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);
  };

  const totalAmount = calculateTotal();

  const onSubmit = (data) => {
    const orderDetails = {
      ...data,
      items: buyNowProduct ? [buyNowProduct] : cartItems,
      totalAmount,
    };
    dispatch(placeOrder(orderDetails));
    navigate('/confirmation');
  };

  if (!cartItems.length && !buyNowProduct) {
    return (
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: 4,
        }}
      >
        <Typography variant="h5" color="error">
          {MESSAGES.ERROR.NO_ORDER_DETAILS}
        </Typography>
      </Container>
    );
  }

  return (
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 4,
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 600 }}>
        <Typography variant="h4" gutterBottom align="center">
          Checkout
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{ required: MESSAGES.FORMS.VALIDATION.NAME_REQUIRED }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            rules={{ required: MESSAGES.FORMS.VALIDATION.ADDRESS_REQUIRED }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address"
                fullWidth
                margin="normal"
                error={!!errors.address}
                helperText={errors.address ? errors.address.message : ''}
              />
            )}
          />

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button variant="contained" color="primary" type="submit" size="large">
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default CheckOut;
