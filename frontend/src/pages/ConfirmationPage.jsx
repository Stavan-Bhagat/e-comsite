import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Container, Typography, Grid, Box, Divider, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import PaymentForm from '../components/PaymentForm';
import { MESSAGES } from '../constant/messages.constant';
import thanksImage from '../images/confirmation.2jpg.jpg';
// Styled Components
const StyledContainer = styled(Container)({
  padding: '2rem',
  marginTop: '2rem',
});

const StyledTitle = styled(Typography)({
  textAlign: 'center',
  marginBottom: '2rem',
  fontSize: '2rem',
  fontWeight: 'bold',
});

const StyledBillingPaper = styled(Paper)({
  padding: '2rem',
  // boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  background: '#fff',
});

const StyledOrderDetails = styled(Box)({
  marginBottom: '1rem',
});

const StyledItemDetails = styled(Box)({
  marginBottom: '0.5rem',
  padding: '0.5rem',
  background: '#f0f0f0',
  borderRadius: '4px',
});

const StyledTotalAmount = styled(Typography)({
  marginTop: '1rem',
  fontWeight: 'bold',
  fontSize: '1.2rem',
});

const ConfirmationPage = () => {
  const orderDetails = useSelector((state) => state.order.orderDetails);
  const cartData = useSelector((state) => state.cart.items);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!orderDetails || !cartData.length) {
      enqueueSnackbar(MESSAGES.ERROR.NO_ORDER_DETAILS, { variant: 'warning' });
    }
  }, [orderDetails, cartData, enqueueSnackbar]);

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
    <StyledContainer>
      <StyledTitle variant="h4" gutterBottom>
        {MESSAGES.INFO.ORDER_CONFIRMATION}
      </StyledTitle>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <StyledBillingPaper>
            <Typography variant="h6" gutterBottom>
              Bill To:
            </Typography>
            <StyledOrderDetails>
              <Typography variant="body1">
                <strong>Name:</strong> {orderDetails?.name}
              </Typography>
              <Typography variant="body1">
                <strong>Address:</strong> {orderDetails?.address}
              </Typography>
            </StyledOrderDetails>
            <Divider sx={{ my: '1rem' }} />
            <Typography variant="h6" gutterBottom>
              Order Details:
            </Typography>
            {cartData.map((item) => (
              <StyledItemDetails key={item._id}>
                <Typography variant="body1">
                  <strong>Product:</strong> {item.productName}
                </Typography>
                <Typography variant="body1">
                  <strong>Quantity:</strong> {item.quantity}
                </Typography>
                <Typography variant="body1">
                  <strong>Price:</strong> ${item.sellingPrice}
                </Typography>
              </StyledItemDetails>
            ))}
            <StyledTotalAmount variant="h5">
              Total Amount: ${totalAmount.toFixed(2)}
            </StyledTotalAmount>
          </StyledBillingPaper>
        </Grid>
        <Grid item xs={6}>
          <PaymentForm totalAmount={totalAmount} orderDetails={orderDetails} cartData={cartData} />
        </Grid>
        <Grid item xs={6}>
          <Box
            component="img"
            src={thanksImage}
            alt="Thanks"
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default ConfirmationPage;
