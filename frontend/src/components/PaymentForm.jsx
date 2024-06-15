/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios'; // Import axios library
import axiosInstance from '../utils/axios';

const CheckoutForm = () => {
  const [totalPrice, setTotalPrice] = useState(100); // Define totalPrice state
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  useEffect(() => {
    const totalPrice = 121;
    const fetchClientSecret = async (totalPrice) => {
      try {
        const response = await axiosInstance.post(
          'http://localhost:5000/fusion/product/create-payment-intent',
          {
            amount: totalPrice * 100,
          }
        );
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error('Error fetching client secret:', error.message);
        setError('Failed to fetch client secret');
      }
    };

    fetchClientSecret(totalPrice);
  }, [totalPrice]);

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
      console.log('Payment successful', paymentIntent);
      navigate('/PaymentSuccess');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cardElement">Card Details</label>
          <CardElement id="cardElement" />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!stripe || !elements || loading}
        >
          {loading ? 'Processing...' : 'Pay'}
        </button>
      </form>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </div>
  );
};

export default CheckoutForm;
