/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Header from '../components/Header';
import AllUsers from '../components/AllUsers';
import AllProducts from '../components/AllProducts';
import OrderDetails from '../components/OrderDetails';

const AdminPanel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const sidebarItems = [
    { text: 'All Users', icon: <PeopleIcon /> },
    { text: 'All Products', icon: <ShoppingBasketIcon /> },
    { text: 'Order Details', icon: <ReceiptIcon /> },
  ];

  const renderSidebar = () => (
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
        <Drawer
          variant="permanent"
          open
          sx={{
            width: '240px',
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: '240px',
              boxSizing: 'border-box',
              zIndex: 1201,
              paddingTop: '4%',
            },
          }}
        >
          {renderSidebar()}
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {renderContent()}
            </Grid>
          </Grid>
        </Box>
        <IconButton
          color="primary"
          edge="start"
          onClick={() => setDrawerOpen(!isDrawerOpen)}
          sx={{
            display: { sm: 'none' },
            position: 'fixed',
            top: '16px',
            left: '16px',
            zIndex: 1300,
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          variant="temporary"
          open={isDrawerOpen}
          onClose={() => setDrawerOpen(false)}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': { width: '240px', zIndex: 1300 },
          }}
        >
          {renderSidebar()}
        </Drawer>
      </Box>
    </>
  );
};

export default AdminPanel;
