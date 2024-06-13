/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
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
import image from '../images/successfinal.gif';
import { clearCart } from '../redux/Slice/cartSlice';
import axiosInstance from '../utils/axios';

const PaymentForm = ({ totalAmount, orderDetails, cartData }) => {
  const userId = useSelector((state) => state?.user?._id);
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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
      } catch (error) {
        setError('Failed to fetch client secret');
      }
    };

    fetchClientSecret();
  }, [totalAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      setError(error.message);
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
      } catch (error) {
        setError(`Failed to place the order: ${error.response?.data?.message || error.message}`);
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
        {error && (
          <Box mb={3}>
            <Alert severity="error">{error}</Alert>
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
          <div className="w-75 h-75">
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

export default PaymentForm;
