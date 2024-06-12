/* eslint-disable no-unused-vars */
/* eslint-disable no-new */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import socketIOClient from 'socket.io-client';
import { addNotification } from '../redux/Slice/notificationSlice';

const SOCKET_SERVER_URL = 'http://localhost:5000';

const NotificationComponent = () => {
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        if (Notification.permission === 'default') {
          const permission = await Notification.requestPermission();
          setNotificationPermission(permission);
        }
      } catch (error) {
        console.error('Notification permission request failed:', error);
        enqueueSnackbar('Failed to request notification permission.', { variant: 'error' });
      }
    };

    if (!('Notification' in window)) {
      enqueueSnackbar('Browser does not support notifications.', { variant: 'info' });
    } else {
      requestNotificationPermission();
    }

    const socket = socketIOClient(SOCKET_SERVER_URL);

    socket.on('newProduct', (notification) => {
      try {
        dispatch(addNotification(notification.createdProduct));
        enqueueSnackbar(notification.message, { variant: 'info' });

        if (Notification.permission === 'granted') {
          const options = {
            body: `ProductName: ${notification.createdProduct.productName}`,
            icon: '/path/to/notification-icon.svg',
          };
          new Notification(
            `New product added: ${notification.createdProduct.productName}`,
            options
          );
        }
      } catch (error) {
        console.error('Error handling new product notification:', error);
        enqueueSnackbar('Error handling new product notification.', { variant: 'error' });
      }
    });
    socket.on('orderConfirmed', (orderNotification) => {
      try {
        dispatch(addNotification(orderNotification.orderDetails));
        enqueueSnackbar('Your order has been placed successfully!', { variant: 'success' });

        if (Notification.permission === 'granted') {
          const options = {
            body: `Order ID: ${orderNotification.orderDetails.orderId}`,
            icon: '/path/to/notification-icon.svg',
          };
          new Notification(`Order Confirmed: ${orderNotification.orderDetails.orderId}`, options);
        }
      } catch (error) {
        console.error('Error handling order confirmation notification:', error);
        enqueueSnackbar('Error handling order confirmation notification.', { variant: 'error' });
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [notificationPermission, enqueueSnackbar, dispatch]);

  return null;
};

export default NotificationComponent;
