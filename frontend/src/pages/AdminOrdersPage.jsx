/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Collapse,
  IconButton,
  Box,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { MESSAGES } from '../constant/messages.constant';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders');
      setOrders(response.data);
    } catch (error) {
      enqueueSnackbar(`${MESSAGES.ERROR.FETCH_ORDERS_FAILED} ${error.message}`, {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Admin Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <OrderRow key={order._id} order={order} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const OrderRow = ({ order }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{order._id}</TableCell>
        <TableCell>{order.name}</TableCell>
        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
        <TableCell>${order.totalAmount / 100}</TableCell>
        <TableCell>{order.paymentInfo.status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Order Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.sellingPrice / 100}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Typography variant="subtitle1" gutterBottom component="div">
                Address: {order.address}
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="div">
                Payment Info:
              </Typography>
              <Table size="small" aria-label="payment-info">
                <TableBody>
                  <TableRow>
                    <TableCell>Amount</TableCell>
                    <TableCell>${order.paymentInfo.amount / 100}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Currency</TableCell>
                    <TableCell>{order.paymentInfo.currency.toUpperCase()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Payment Method</TableCell>
                    <TableCell>{order.paymentInfo.paymentMethod}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Payment Intent ID</TableCell>
                    <TableCell>{order.paymentInfo.paymentIntentId}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default AdminOrdersPage;
