// src/components/ConfirmationPage.js
import React from "react";
import { useSelector } from "react-redux";
import { Container, Typography, Box, Divider, Button } from "@mui/material";

const ConfirmationPage = () => {
  //   const orderDetails = useSelector((state) => state.order.orderDetails);

  const orderDetails = {
    name: "John Doe",
    address: "123 Main St, Anytown, USA",
    items: [
      {
        productName: "Product 1",
        quantity: 2,
        sellingPrice: 25.99,
      },
      {
        productName: "Product 2",
        quantity: 1,
        sellingPrice: 49.99,
      },
    ],
    totalAmount: 101.97,
  };

  if (!orderDetails) {
    return (
      <Container>
        <Typography variant="h5" gutterBottom>
          No order details available.
        </Typography>
      </Container>
    );
  }

  const onSubmit = () => {
    alert("placed successfully");
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
          <Typography>Name: {orderDetails.name}</Typography>
          <Typography>Address: {orderDetails.address}</Typography>
        </Box>
        <Divider />
        <Box mb={2}>
          <Typography variant="h6">Order Details</Typography>
          {orderDetails.items?.map((item, index) => (
            <Box key={index} mb={1}>
              <Typography>Product: {item.productName}</Typography>
              <Typography>Quantity: {item.quantity}</Typography>
              <Typography>Price: ${item.sellingPrice}</Typography>
            </Box>
          ))}
        </Box>
        <Divider />
        <Box mt={2}>
          <Typography variant="h5">
            Total Amount: ${orderDetails.totalAmount}
          </Typography>
        </Box>
        <Box>
          <Button onClick={onSubmit} variant="contained" color="success">
            {" "}
            place Orders
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ConfirmationPage;
