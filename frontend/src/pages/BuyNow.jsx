import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { placeOrder } from "../redux/Slice/orderSlice";

const BuyNowPage = () => {
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    // Add more shipping details fields as needed
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePlaceOrder = () => {
    dispatch(placeOrder(shippingDetails));
    setShippingDetails({
      name: "",
      address: "",
      // Reset other shipping details fields as needed
    });
    history.push("/confirmation"); // Redirect to confirmation page
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Buy Now
      </Typography>
      <TextField
        name="name"
        label="Name"
        value={shippingDetails.name}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="address"
        label="Address"
        value={shippingDetails.address}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      {/* Add more input fields for other shipping details */}
      <Button
        variant="contained"
        color="primary"
        onClick={handlePlaceOrder}
        fullWidth
        size="large"
      >
        Place Order
      </Button>
    </Container>
  );
};

export default BuyNowPage;
