import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
  Divider,
  Grid,
  Card,
  CardContent,
  InputBase,
  Paper,
  Pagination,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { fetchOrders } from '../utils/services/order.service';
import Header from '../components/Header';
import { debounce } from 'lodash';
import { useSnackbar } from 'notistack';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: '#9c27b0',
  color: '#f3e5f5',
  boxShadow: `1px 1px 0px 1px ${theme.boxShadow.main}`,
}));

const StyledCardContent = styled(CardContent)({
  '& .MuiTypography-root': {
    marginBottom: '1rem',
  },
});

const StyledInputBase = styled(InputBase)({
  marginLeft: '1rem',
  flex: 1,
});

const StyleContainer = styled(Container)({
  marginTop: '2rem',
});
const StyledIconButton = styled(IconButton)({});

const StyledListItem = styled(ListItem)({
  borderRadius: '4px',
  padding: '1%',
  marginBottom: '1%',
});

const UserPanel = () => {
  const user = useSelector((state) => state?.auth?.user);
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleToggleExpand = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const delayedFetchOrders = debounce(async () => {
      try {
        const response = await fetchOrders(searchQuery, currentPage, {
          role: user.role,
          _id: user._id,
        });
        const { orders, totalPages } = response;
        setOrders(orders);
        setTotalPages(totalPages);
      } catch (error) {
        enqueueSnackbar(`Failed to fetch orders: ${error.message}`, {
          variant: 'error',
        });
      }
    }, 500);

    delayedFetchOrders();

    return () => delayedFetchOrders.cancel();
  }, [searchQuery, currentPage, user, enqueueSnackbar]);

  return (
    <>
      <Header />
      <StyleContainer>
        <Paper
          component="form"
          sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}
        >
          <StyledInputBase
            placeholder="Search by Username or Product Name"
            inputProps={{ 'aria-label': 'search by username or product name' }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <StyledIconButton type="button" aria-label="search">
            <SearchIcon />
          </StyledIconButton>
        </Paper>
        <List>
          {orders.map((order) => (
            <Box key={order._id} mb={2} border={1} borderRadius={4} padding={2}>
              <StyledListItem>
                <ListItemText
                  primary={`Order ID: ${order._id}`}
                  secondary={`Name: ${order.name} | Address: ${order.address} | Total Amount: $${order.totalAmount}`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleToggleExpand(order._id)}>
                    {expandedOrderId === order._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </ListItemSecondaryAction>
              </StyledListItem>
              {expandedOrderId === order._id && (
                <Box mt={2}>
                  <Typography variant="h6">Items</Typography>
                  {order.items.map((item) => (
                    <Grid container key={item.productName}>
                      <Grid item sm={1} md={1}>
                        <Avatar
                          variant="circle"
                          alt={`Product Image ${item.productName}`}
                          src={item.productImage[0]}
                        />
                      </Grid>
                      <Grid item sm={11} md={11}>
                        <Typography>Product: {item.productName}</Typography>
                        <Typography>Quantity: {item.quantity}</Typography>
                        <Typography>Price: ${item.sellingPrice}</Typography>
                        <Divider />
                      </Grid>
                    </Grid>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </List>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
        />
      </StyleContainer>
    </>
  );
};

export default UserPanel;
