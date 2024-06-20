import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  CircularProgress,
  Box,
  Typography,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from '@mui/material';
import image from '../images/success.gif';
import { clearCart } from '../redux/Slice/cartSlice';
import axiosInstance from '../utils/axios';

const PaymentForm = ({ totalAmount, orderDetails, cartData }) => {
  const userId = useSelector((state) => state?.auth?.user?._id);
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await axios.post(
          'http://localhost:5000/fusion/product/create-payment-intent',
          { amount: totalAmount }
        );
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        setFormError('Failed to fetch client secret');
      }
    };

    fetchClientSecret();
  }, [totalAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (stripeError) {
      setFormError(stripeError.message);
      setLoading(false);
    } else {
      const paymentData = {
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        paymentIntentId: paymentIntent.id,
        status: paymentIntent.status,
        paymentMethod: paymentIntent.payment_method,
        created: paymentIntent.created,
      };

      const mergedData = {
        ...orderDetails,
        items: cartData,
        totalAmount,
        paymentData,
        userId,
      };

      try {
        const response = await axiosInstance.post('fusion/order/add-order', mergedData);
        if (response.status === 201) {
          setOpen(true);
        }
      } catch (err) {
        setFormError(`Failed to place the order: ${err.response?.data?.message || err.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    dispatch(clearCart());
    navigate('/');
  };

  return (
    <Paper
      sx={{
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        background: 'linear-gradient(135deg, #f5a623, #f76c6c, #f9d423, #3a7bd5)',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box mb={3}>
          <Typography component="span" variant="h6" sx={{ color: '#ffffff' }}>
            Card Details
          </Typography>
          <Typography component="span" variant="h6" sx={{ float: 'inline-end', color: '#ffffff' }}>
            STRIPE
          </Typography>
          <Box
            sx={{
              padding: 2,
              border: '1px solid #ccc',
              borderRadius: 2,
              backgroundColor: 'white',
              marginTop: 1,
            }}
          >
            <CardElement id="cardElement" />
          </Box>
        </Box>
        {formError && (
          <Box mb={3}>
            <Alert severity="error">{formError}</Alert>
          </Box>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!stripe || !elements || loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? 'Processing...' : 'Pay'}
          </Button>
        </Box>
      </form>

      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ borderRadius: '2%' }}
      >
        <DialogTitle id="alert-dialog-title">Order Placed Successfully</DialogTitle>
        <DialogContent>
          <div className="w-50 h-50">
            <img src={image} alt="success" />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

PaymentForm.propTypes = {
  totalAmount: PropTypes.number.isRequired,
  orderDetails: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  cartData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};
export default PaymentForm;
