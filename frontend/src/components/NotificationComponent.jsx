import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import socketIOClient from 'socket.io-client';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

const SOCKET_SERVER_URL = 'http://localhost:5000';

const NotificationComponent = () => {
  const [, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [dialogMessage, setDialogMessage] = useState('');
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);

  useEffect(() => {
    if (!('Notification' in window)) {
      enqueueSnackbar(`browser does not support notification.`, {
        variant: 'info',
      });
    } else if (notificationPermission === 'default') {
      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission);
      });
    }

    const socket = socketIOClient(SOCKET_SERVER_URL);

    socket.on('newProduct', (newProduct) => {
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      setDialogMessage(
        `New product added: ${newProduct.productName}\nDescription: ${newProduct.description}`
      );
      setOpenDialog(true);

      if (Notification.permission === 'granted') {
        const options = {
          body: `Description: ${newProduct.description}`,
          icon: '/home/stavan/Documents/aspire/e-comsite/frontend/src/images/notification.svg',
        };
        // eslint-disable-next-line no-new
        new Notification(`New product added: ${newProduct.productName}`, options);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [notificationPermission]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>New Product Notification</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotificationComponent;
