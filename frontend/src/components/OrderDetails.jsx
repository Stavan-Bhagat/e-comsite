import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { fetchAllOrders } from "../utils/service";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetchAllOrders();
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleToggleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Order Details
      </Typography>
      <List>
        {orders.map((order) => (
          <Box key={order._id} mb={2} border={1} borderRadius={4} padding={2}>
            <ListItem>
              <ListItemText
                primary={`Order ID: ${order._id}`}
                secondary={`Name: ${order.name} | Address: ${order.address} | Total Amount: $${order.totalAmount}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => handleToggleExpand(order._id)}
                >
                  {expandedOrderId === order._id ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            {expandedOrderId === order._id && (
              <Box mt={2}>
                <Typography variant="h6">Items</Typography>
                {order.items.map((item, index) => (
                  <Box key={index} mb={1} paddingLeft={2}>
                    <Typography>Product: {item.productName}</Typography>
                    <Typography>Quantity: {item.quantity}</Typography>
                    <Typography>Price: ${item.sellingPrice}</Typography>
                    <Divider />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        ))}
      </List>
    </Container>
  );
};

export default OrderDetails;
