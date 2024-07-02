import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
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
  InputBase,
  Paper,
  Pagination,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SearchIcon from '@mui/icons-material/Search';
import { fetchOrders } from '../utils/services/order.service';
import { MESSAGES } from '../constant/messages.constant';
import { styled } from '@mui/material/styles';

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

const StyledIconButton = styled(IconButton)({});

const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '1rem',
});

const StyledListItem = styled(ListItem)({
  border: '1px solid #ccc',
  borderRadius: '4px',
  padding: '1%',
  marginBottom: '1%',
});

const OrderDetails = () => {
  const user = useSelector((state) => state?.auth?.user);
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalOrders, setTotalOrders] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [mostSoldProduct, setMostSoldProduct] = useState({ productName: '', count: 0 });
  const { enqueueSnackbar } = useSnackbar();

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  useEffect(() => {
    const delayedFetchOrders = debounce(async () => {
      try {
        const response = await fetchOrders(searchQuery, currentPage, {
          role: user.role,
          _id: user._id,
        });
        const { orders, totalOrders, totalPages, mostSoldProduct } = response;
        setOrders(orders);
        setTotalOrders(totalOrders);
        setTotalPages(totalPages);
        setMostSoldProduct(mostSoldProduct);
      } catch (error) {
        enqueueSnackbar(`${MESSAGES.ERROR.FETCH_FAILED} ${error.message}`, {
          variant: 'error',
        });
      }
    }, 500);

    delayedFetchOrders();

    return () => clearTimeout(delayedFetchOrders);
  }, [searchQuery, currentPage, enqueueSnackbar]);

  const handleToggleExpand = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Order Details
      </Typography>

      <Grid container spacing={4} mb={4}>
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <StyledCardContent>
              <Typography variant="h6" gutterBottom>
                Total Orders
              </Typography>
              <Typography variant="h5">{totalOrders}</Typography>
            </StyledCardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <StyledCardContent>
              <Typography variant="h6" gutterBottom>
                Total Sales Price
              </Typography>
              <Typography variant="h5">
                ₹{orders.reduce((acc, order) => acc + order.totalAmount, 0).toFixed(2)}
              </Typography>
            </StyledCardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StyledCard>
            <StyledCardContent>
              <Typography variant="h6" gutterBottom>
                Most Sold Product
              </Typography>
              <Typography variant="subtitle1">{mostSoldProduct.productName}</Typography>
              <Typography variant="subtitle2">Quantity Sold: {mostSoldProduct.count}</Typography>
            </StyledCardContent>
          </StyledCard>
        </Grid>
      </Grid>

      <Paper component="form" sx={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
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
            <ListItem>
              <ListItemText
                primary={`Order ID: ${order._id}`}
                secondary={`Name: ${order.name} | Address: ${order.address} | Total Amount:  ₹${order.totalAmount}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleToggleExpand(order._id)}>
                  {expandedOrderId === order._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            {expandedOrderId === order._id && (
              <Box mt={2}>
                <Typography variant="h6">Items</Typography>
                {order.items.map((item) => (
                  <Grid container>
                    <Grid sm={1} md={1}>
                      <Avatar
                        variant="circle"
                        alt={`Product Image ${item.productName}`}
                        src={item.productImage[0]}
                      />
                    </Grid>
                    <Grid sm={11} md={11}>
                      <Typography>Product: {item.productName}</Typography>
                      <Typography>Quantity: {item.quantity}</Typography>
                      <Typography>Price: ₹{item.sellingPrice}</Typography>
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
    </Container>
  );
};

export default OrderDetails;
