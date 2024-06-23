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
import { Container } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Header from '../components/Header';
import AllUsers from '../components/AllUsers';
import AllProducts from '../components/AllProducts';
import OrderDetails from '../components/OrderDetails';
import { useTheme } from '@mui/material/styles';
import { StyledDrawer, StyledIconButton, StyledContainer } from '../css/styles/adminPanel.style';
import { MESSAGES } from '../constant/messages.constant';

const AdminPanel = () => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    setDrawerOpen(false);
  };

  const sidebarItems = [
    { text: MESSAGES.CONSTANT_NAME.USERS, icon: <PeopleIcon /> },
    { text: MESSAGES.CONSTANT_NAME.PRODUCTS, icon: <ShoppingBasketIcon /> },
    { text: MESSAGES.CONSTANT_NAME.ORDERS, icon: <ReceiptIcon /> },
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

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Header />
      <Container>
        <Box sx={{ display: 'flex' }}>
          {/* Permanent Drawer */}
          <StyledDrawer>{renderSidebar()}</StyledDrawer>

          {/* Main Content */}
          <StyledContainer component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {renderContent()}
              </Grid>
            </Grid>
          </StyledContainer>

          {/* Mobile Drawer Toggle */}
          <StyledIconButton color="primary" edge="start" onClick={toggleDrawer}>
            <MenuIcon />
          </StyledIconButton>

          {/* Temporary Drawer for Mobile */}
          <StyledDrawer
            variant="temporary"
            open={drawerOpen}
            onClose={toggleDrawer}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {renderSidebar()}
          </StyledDrawer>
        </Box>
      </Container>
    </>
  );
};

export default AdminPanel;
