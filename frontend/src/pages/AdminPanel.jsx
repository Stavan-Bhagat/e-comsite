import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Box from '@mui/material/Box';
// eslint-disable-next-line import/no-cycle
import Header from '../components/Header';
import AllUsers from '../components/AllUsers';
import AllProducts from '../components/AllProducts';
import OrderDetails from '../components/OrderDetails';

const AdminPanel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const sidebarItems = [
    { text: 'All Users', icon: <PeopleIcon /> },
    { text: 'All Products', icon: <ShoppingBasketIcon /> },
    { text: 'Order Details', icon: <ReceiptIcon /> },
  ];

  const renderSidebar = () => {
    return (
      <List>
        {sidebarItems.map((item, index) => (
          <ListItemButton
            key={item.text}
            selected={selectedIndex === index}
            onClick={() => handleListItemClick(index)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    );
  };

  const renderContent = () => {
    switch (selectedIndex) {
      case 0:
        return <AllUsers />;
      case 1:
        return <AllProducts />;
      case 2:
        return <OrderDetails />;
      default:
        return <AllProducts />;
    }
  };

  return (
    <>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            width: '100%',
            maxWidth: '240px',
            flexShrink: 0,
            borderRight: '1px solid #ccc',
            boxSizing: 'border-box',
            padding: '16px',
          }}
        >
          {renderSidebar()}
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {renderContent()}
        </Box>
      </Box>
    </>
  );
};

export default AdminPanel;
