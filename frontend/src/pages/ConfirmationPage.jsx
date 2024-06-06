import React from "react";
import { useSelector } from "react-redux";
import { Container, Typography, Box, Divider, Button } from "@mui/material";
import axiosInstance from "../utils/axios";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/Slice/cartSlice";
import { useNavigate } from "react-router";

const ConfirmationPage = () => {
  const orderDetails = useSelector((state) => state.order.orderDetails);
  const Cartdata = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!orderDetails || !Cartdata) {
    return (
      <Container>
        <Typography variant="h5" gutterBottom>
          No order details available.
        </Typography>
      </Container>
    );
  }

  const calculateTotal = () => {
    return Cartdata.reduce((total, item) => total + (item.sellingPrice || 0) * (item.quantity || 0), 0);
  };

  const onSubmit = async () => {
    const mergedData = {
      ...orderDetails,
      items: Cartdata,
      totalAmount: calculateTotal(),
    };

    try {
      const response = await axiosInstance.post(`/order/add-Order`, mergedData);
      if (response.status === 201) {
        alert("Order placed successfully");
        dispatch(clearCart());
        navigate("/");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order");
    }
  };

  return (
    <Container
      sx={{
        width: "40%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
          {Cartdata?.map((item, index) => (
            <Box key={index} mb={1}>
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
      </Box>
    </Container>
  );
};

export default ConfirmationPage;
