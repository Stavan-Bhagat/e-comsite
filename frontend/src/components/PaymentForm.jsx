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
import { styled } from '@mui/material/styles';
import image from '../images/success.gif';
import { clearCart } from '../redux/Slice/cartSlice';
import { clearBuyNowProduct } from '../redux/Slice/buyNowSlice';
import axiosInstance from '../utils/axios';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  background: 'linear-gradient(135deg, #f5a623, #f76c6c, #f9d423, #3a7bd5)',
}));

const CardDetailsBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  border: '1px solid #ccc',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white',
  marginTop: theme.spacing(1),
}));

const StyleDialogContent = styled('div')(({ theme }) => ({
  width: 'fit-content',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const Image = styled('img')({
  maxWidth: '100%',
  height: 'auto',
});

const FormTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
}));

const FormContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const PaymentForm = ({ totalAmount, orderDetails }) => {
  const userId = useSelector((state) => state?.auth?.user?._id);
  const buyNowProduct = useSelector((state) => state.buyNow.product);
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const baseURL = process.env.REACT_APP_BASEURL;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await axiosInstance.post(
          `/fusion/product/create-payment-intent`,
          {
            amount: totalAmount,
          }
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
        totalAmount,
        paymentData,
        userId,
      };

      try {
        console.log('merge', mergedData);
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
    if (buyNowProduct) {
      dispatch(clearBuyNowProduct());
    } else {
      dispatch(clearCart());
    }

    navigate('/');
  };

  return (
    <StyledPaper>
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <FormTitle component="span" variant="h6">
            Card Details
          </FormTitle>
          <FormTitle component="span" variant="h6" style={{ float: 'inline-end' }}>
            STRIPE
          </FormTitle>
          <CardDetailsBox>
            <CardElement id="cardElement" />
          </CardDetailsBox>
        </FormContainer>
        {formError && (
          <Box mb={3}>
            <Alert severity="error">{formError}</Alert>
          </Box>
        )}
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
        style={{ borderRadius: '2%' }}
      >
        <DialogTitle id="alert-dialog-title">Order Placed Successfully</DialogTitle>
        <DialogContent>
          <styleDialogContent>
            <Image src={image} alt="success" />
          </styleDialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </StyledPaper>
  );
};

PaymentForm.propTypes = {
  totalAmount: PropTypes.number.isRequired,
  orderDetails: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        productName: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        sellingPrice: PropTypes.number.isRequired,
      })
    ).isRequired,
    totalAmount: PropTypes.number.isRequired,
  }).isRequired,
};
export default PaymentForm;
