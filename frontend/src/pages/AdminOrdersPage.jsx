import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders');
      setOrders(response.data);
    } catch (error) {
      enqueueSnackbar(`Failed to fetch the data. Please try again later. ${error.message}`, {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <Typography variant="h4">Admin Orders</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Order Date</TableCell>
            <TableCell>Total Amount</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>{order.orderId}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
              <TableCell>${order.totalAmount}</TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminOrdersPage;
