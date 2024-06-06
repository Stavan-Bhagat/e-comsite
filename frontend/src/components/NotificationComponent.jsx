import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AddAlertIcon from "@mui/icons-material/AddAlert";

const SOCKET_SERVER_URL = "http://localhost:5000";
const NotificationComponent = () => {
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications.");
    } else if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        }
      });
    }

    const socket = socketIOClient(SOCKET_SERVER_URL);
    socket.on("newProduct", (newProduct) => {
      setProduct((prevProducts) => [...prevProducts, newProduct]);

      if (Notification.permission === "granted") {
        new Notification(`New product added: ${newProduct.productName}`, {
          body: `Description: ${newProduct.description}`,
          icon: <AddAlertIcon />,
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
        New product added: {product && product.name}
        <br />
        Description: {product && product.description}
      </MuiAlert>
    </Snackbar>
  );
};

export default NotificationComponent;
