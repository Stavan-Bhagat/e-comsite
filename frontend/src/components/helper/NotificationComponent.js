import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import AddAlertIcon from "@mui/icons-material/AddAlert";

const SOCKET_SERVER_URL = "http://localhost:5000";
const NotificationComponent = () => {
  const [products, setProducts] = useState([]);

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
      setProducts((prevProducts) => [...prevProducts, newProduct]);

      if (Notification.permission === "granted") {
        new Notification(`New product added: ${newProduct.name}`, {
          body: `Description: ${newProduct.description}`,
          icon: <AddAlertIcon />,
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationComponent;
