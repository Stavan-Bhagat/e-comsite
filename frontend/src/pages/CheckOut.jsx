import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Paper, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { placeOrder } from '../redux/Slice/orderSlice';
import { MESSAGES } from '../constant/messages.constant';

const capitalizeFirstLetter = (string) => {
  return string.replace(/\b\w/g, (char) => char.toUpperCase());
};

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
      street: '',
      city: '',
      state: '',
      postalCode: '',
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
    const capitalizedData = {
      ...data,
      name: capitalizeFirstLetter(data.name),
      street: capitalizeFirstLetter(data.street),
      city: capitalizeFirstLetter(data.city),
      state: capitalizeFirstLetter(data.state),
      postalCode: data.postalCode,
    };

    const orderDetails = {
      ...capitalizedData,
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
            name="street"
            control={control}
            rules={{ required: MESSAGES.FORMS.VALIDATION.STREET_REQUIRED }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Street"
                fullWidth
                margin="normal"
                error={!!errors.street}
                helperText={errors.street ? errors.street.message : ''}
              />
            )}
          />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="city"
                control={control}
                rules={{ required: MESSAGES.FORMS.VALIDATION.CITY_REQUIRED }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="City"
                    fullWidth
                    margin="normal"
                    error={!!errors.city}
                    helperText={errors.city ? errors.city.message : ''}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="state"
                control={control}
                rules={{ required: MESSAGES.FORMS.VALIDATION.STATE_REQUIRED }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="State"
                    fullWidth
                    margin="normal"
                    error={!!errors.state}
                    helperText={errors.state ? errors.state.message : ''}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Controller
            name="postalCode"
            control={control}
            rules={{ required: MESSAGES.FORMS.VALIDATION.POSTAL_CODE_REQUIRED }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Postal Code"
                fullWidth
                margin="normal"
                error={!!errors.postalCode}
                helperText={errors.postalCode ? errors.postalCode.message : ''}
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
