/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-new */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import io from 'socket.io-client';
import { addNotification } from '../redux/Slice/notificationSlice';
import notification from '../images/notification.svg';
import { MESSAGES } from '../constant/messages.constant';

const SOCKET_SERVER_URL = process.env.REACT_APP_SOCKET_SERVER_URL;

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
        enqueueSnackbar(MESSAGES.ERROR.FAILED_NOTIFICATION_PERMISSION, { variant: 'error' });
      }
    };

    if (!('Notification' in window)) {
      enqueueSnackbar(MESSAGES.INFO.NOTIFICATION_NOT_SUPPORT, { variant: 'info' });
    } else {
      requestNotificationPermission();
    }

    const socket = io(`${SOCKET_SERVER_URL}`, { transports:['websocket'] });

    if (userId) {
      socket.emit('joinRoom', userId);
    }
    if (isAdmin) {
      socket.emit('joinRoom', 'adminRoom');
    }
    socket.on(`orderCreated:${userId}`, (orderNotification) => {
      try {
        dispatch(addNotification(orderNotification.order));
        enqueueSnackbar(MESSAGES.INFO.ORDER.ORDER_PLACED, { variant: 'success' });

        if (Notification.permission === 'granted') {
          const options = {
            body: `Order ID: ${orderNotification.order._id}`,
            icon: '../images/notification.svg',
          };
          new Notification(
            `${MESSAGES.INFO.ORDER.ORDER_CONFIRMED}: ${orderNotification.order._id}`,
            options
          );
        }
      } catch (error) {
        enqueueSnackbar(MESSAGES.INFO.FAILED_NOTIFICATION_PERMISSION, { variant: 'error' });
      }
    });

    if (isAdmin) {
      socket.on('orderCreated', (orderNotification) => {
        try {
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
          enqueueSnackbar(MESSAGES.INFO.FAILED_NOTIFICATION, { variant: 'error' });
        }
      });
    }

    socket.on('newProduct', (productNotification) => {
      try {
        const newProduct = { ...productNotification.product, type: 'product' };
        dispatch(addNotification(newProduct));

        enqueueSnackbar(MESSAGES.INFO.PRODUCT_ADDED, { variant: 'info' });

        if (Notification.permission === 'granted') {
          const options = {
            body: `Product: ${productNotification.productName}`,
            icon: { notification },
          };
          new Notification(MESSAGES.INFO.PRODUCT_ADDED, options);
        }
      } catch (error) {
        enqueueSnackbar(MESSAGES.INFO.FAILED_NOTIFICATION, { variant: 'error' });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [notificationPermission, enqueueSnackbar, dispatch, userId, isAdmin]);

  return null;
};

export default NotificationComponent;
