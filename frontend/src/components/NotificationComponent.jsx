/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-new */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import socketIOClient from 'socket.io-client';
import { addNotification } from '../redux/Slice/notificationSlice';
import notification from '../images/notification.svg';

const SOCKET_SERVER_URL = process.env.REACT_APP_BASEURL;

const NotificationComponent = () => {
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state?.auth?.user?._id);
  const isAdmin = useSelector((state) => state?.auth?.user?.role === 'Admin');

  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        if (Notification.permission === 'default') {
          const permission = await Notification.requestPermission();
          setNotificationPermission(permission);
        }
      } catch (error) {
        enqueueSnackbar('Failed to request notification permission.', { variant: 'error' });
      }
    };

    if (!('Notification' in window)) {
      enqueueSnackbar('Browser does not support notifications.', { variant: 'info' });
    } else {
      requestNotificationPermission();
    }

    const socket = socketIOClient(SOCKET_SERVER_URL);

    if (userId) {
      socket.emit('joinRoom', userId);
    }
    if (isAdmin) {
      socket.emit('joinRoom', 'adminRoom');
    }

    socket.on(`orderCreated:${userId}`, (orderNotification) => {
      try {
        dispatch(addNotification(orderNotification.order));
        enqueueSnackbar('Your order has been placed successfully!', { variant: 'success' });

        if (Notification.permission === 'granted') {
          const options = {
            body: `Order ID: ${orderNotification.order._id}`,
            icon: '../', // Ensure this path is correct
          };
          new Notification(`Order Confirmed: ${orderNotification.order._id}`, options);
        }
      } catch (error) {
        console.error('Error handling order confirmation notification:', error);
        enqueueSnackbar('Error handling order confirmation notification.', { variant: 'error' });
      }
    });

    if (isAdmin) {
      socket.on('orderCreated', (orderNotification) => {
        try {
          console.log('Admin order notification:', orderNotification);
          dispatch(addNotification(orderNotification.order));
          enqueueSnackbar(`New order placed by ${orderNotification.order.name}`, {
            variant: 'info',
          });

          if (Notification.permission === 'granted') {
            const options = {
              body: `Order ID: ${orderNotification.order._id}`,
              icon: { notification },
            };
            new Notification(`New Order: ${orderNotification.order._id}`, options);
          }
        } catch (error) {
          enqueueSnackbar('Error handling new order notification.', { variant: 'error' });
        }
      });
    }

    socket.on('newProduct', (productNotification) => {
      try {
        const newProduct = { ...productNotification.product, type: 'product' };
        dispatch(addNotification(newProduct));

        enqueueSnackbar('New product added!', { variant: 'info' });

        if (Notification.permission === 'granted') {
          const options = {
            body: `Product: ${productNotification.productName}`,
            icon: { notification },
          };
          new Notification('New Product Added', options);
        }
      } catch (error) {
        enqueueSnackbar('Error handling new product notification.', { variant: 'error' });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [notificationPermission, enqueueSnackbar, dispatch, userId, isAdmin]);

  return null;
};

export default NotificationComponent;
