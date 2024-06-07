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
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [dialogMessage, setDialogMessage] = useState('');
  const [notificationPermission, setNotificationPermission] = useState(Notification.permission);
  const [newProduct, setNewProduct] = useState(null);
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

    socket.on('newProduct', (newProductData) => {
      setNewProduct(newProductData);
      setProducts((prevProducts) => [...prevProducts, newProductData]);
      setDialogMessage(
        `New product added: ${newProductData.productName}\nBrand: ${newProductData.brandName}`
      );
      setOpenDialog(true);

      if (Notification.permission === 'granted') {
        const options = {
          body: `ProductName: ${newProductData.productName}`,
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
    <div>
      {products.map((product) => (
        <div key={product._id}>
          <h2>{product.productName}</h2>
          <p>Brand: {product.brandName}</p>
          {product.productImage && (
            <img
              src={product.productImage[0]}
              alt={product.productName}
              style={{ width: '100px', height: '100px' }}
            />
          )}
        </div>
      ))}
      {openDialog && (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>New Product Notification</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogMessage}</DialogContentText>
            {newProduct.imageUrl && (
              <img
                src={newProduct.productImage[0]}
                alt={newProduct.productName}
                style={{ width: '100%', height: 'auto' }}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default NotificationComponent;
