import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
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
  Avatar,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { fetchAllOrders } from '../utils/services/order.service';
import { MESSAGES } from '../constant/messages.constant';

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetchAllOrders();
        setOrders(response.data.orders);
      } catch (error) {
        enqueueSnackbar(`${MESSAGES.ERROR.FETCH_FAILED} ${error.message}`, {
          variant: 'error',
        });
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
                <IconButton edge="end" onClick={() => handleToggleExpand(order._id)}>
                  {expandedOrderId === order._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            {expandedOrderId === order._id && (
              <Box mt={2}>
                <Typography variant="h6">Items</Typography>
                {order.items.map((item) => (
                  <Box key={item._id} mb={2} display="flex" alignItems="center">
                    <Avatar
                      variant="square"
                      alt={`Product Image ${item.productName}`}
                      src={item.productImage[0]} // Assuming productImage is an array and you want the first image
                      sx={{ width: 100, height: 100, marginRight: 2 }}
                    />
                    <Box>
                      <Typography variant="subtitle1">{item.productName}</Typography>
                      <Typography>Quantity: {item.quantity}</Typography>
                      <Typography>Price: ${item.sellingPrice}</Typography>
                    </Box>
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
