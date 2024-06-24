import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Badge,
  Paper,
  MenuItem,
  Avatar,
  InputBase,
  IconButton,
  Menu,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { logout } from '../redux/Slice/authSlice';
import { addCartData } from '../utils/services/cart.service';
import { clearCart } from '../redux/Slice/cartSlice';
import { searchSuggestionProduct, searchProduct } from '../utils/services/product.service';
import Profile from './Profile';
import AdminPanel from '../pages/AdminPanel';
import NotificationModal from './NotificationModal';
import logo from '../images/logo.webp';
import { MESSAGES } from '../constant/messages.constant';
import ThemeToggle from '../css/theme/themeToggle';
import {
  LogoImage,
  LoginButton,
  UserIconButton,
  SearchModal,
  SuggestionList,
  SuggestionItem,
  StyledAppBar,
  StyledToolbar,
  Logo,
  StylePaper,
  LogoText,
  IconButtonStyled,
} from '../css/styles/headerStyle';

const Header = () => {
  const user = useSelector((state) => state?.auth.user);
  const cart = useSelector((state) => state?.cart.items);
  const isAuthenticated = useSelector((state) => state?.auth.isAuthenticated);
  const unreadCount = useSelector((state) => state?.notifications?.unreadCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [profile, setProfile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const anchorRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePanel = () => {
    setIsDrawerOpen(true);
    navigate('/admin-panel');
  };

  const handleHome = () => {
    setIsDrawerOpen(false);
    navigate('/');
  };

  const handleLogout = async () => {
    await addCartData(user._id, cart);
    dispatch(logout());
    dispatch(clearCart());
    navigate('/');
  };

  const handleCart = () => {
    navigate('/product/cart');
  };

  const handleProfile = () => {
    setProfile((prev) => !prev);
    setAnchorEl(null);
  };

  const handleSearchIconClick = () => {
    setShowModal(true);
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearch(query);

    if (query.length > 3) {
      try {
        const response = await searchSuggestionProduct(query);
        setSuggestions(Array.isArray(response.products) ? response.products : []);
      } catch (error) {
        enqueueSnackbar(MESSAGES.ERROR.NOT_FOUND, { variant: 'error' });
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await searchProduct(search);
      const { type, term } = response;
      if (response.data.length > 0) {
        navigate(`/product/search/${type}/${term}`);
      } else {
        enqueueSnackbar(MESSAGES.ERROR.NOT_FOUND, { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(`${MESSAGES.ERROR.FETCH_FAILED}: ${error.message}`, { variant: 'error' });
    }
    setShowModal(false);
  };

  const handleSuggestionClick = async (suggestion) => {
    try {
      const response = await searchProduct(suggestion.productName);
      const { type, term } = response;
      navigate(`/product/search/${type}/${term}`);
    } catch (error) {
      enqueueSnackbar(`${MESSAGES.ERROR.FETCH_FAILED} : ${error.message}`, { variant: 'error' });
    }
    setShowModal(false);
  };

  return (
    <>
      <StyledAppBar position="fixed">
        <StyledToolbar>
          <Logo onClick={() => navigate('/')} component="a">
            <LogoImage src={logo} alt="Logo" />
            <LogoText variant="h6">Fusion</LogoText>
          </Logo>
          <Box display="flex" alignItems="center">
            <UserIconButton onClick={handleSearchIconClick}>
              <IconButtonStyled>
                <SearchIcon />
              </IconButtonStyled>
            </UserIconButton>
            {!isAuthenticated && (
              <LoginButton variant="outlined" onClick={() => navigate('/login')}>
                <PersonIcon /> Login
              </LoginButton>
            )}
            {user?._id && (
              <Box>
                {user?.imageUrl ? (
                  <Avatar
                    alt="User Avatar"
                    src={user.imageUrl}
                    ref={anchorRef}
                    onClick={handleProfile}
                  />
                ) : (
                  <LoginButton variant="outlined" ref={anchorRef} onClick={handleClick}>
                    <AccountIcon /> User
                  </LoginButton>
                )}
              </Box>
            )}
            <IconButtonStyled onClick={() => setModalOpen(true)}>
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon className="text-warning" />
              </Badge>
            </IconButtonStyled>
            <IconButtonStyled aria-label="cart" onClick={handleCart}>
              <Badge badgeContent={cart.length}>
                <ShoppingCartIcon />
              </Badge>
            </IconButtonStyled>
            <IconButtonStyled aria-label="More" onClick={handleClick}>
              <MoreVertIcon />
            </IconButtonStyled>
          </Box>
        </StyledToolbar>
      </StyledAppBar>

      <SearchModal open={showModal} onClose={() => setShowModal(false)}>
        <Paper elevation={3}>
          <Box p={2}>
            <Typography variant="h6">Search Products</Typography>
            <Box mt={2}>
              <form onSubmit={handleSearchSubmit}>
                <StylePaper component="div">
                  <InputBase
                    placeholder="Search"
                    value={search}
                    onChange={handleSearchChange}
                    autoFocus
                    style={{ marginLeft: 8, flex: 1 }}
                  />
                  <IconButton type="submit" aria-label="search" onClick={handleSearchSubmit}>
                    <SearchIcon />
                  </IconButton>
                </StylePaper>
              </form>
            </Box>
            {suggestions.length > 0 && (
              <SuggestionList>
                {suggestions.map((suggestion) => (
                  <SuggestionItem
                    key={suggestion._id}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.productName}
                  </SuggestionItem>
                ))}
              </SuggestionList>
            )}
          </Box>
        </Paper>
      </SearchModal>

      <NotificationModal open={modalOpen} handleClose={() => setModalOpen(false)} />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {location.pathname === '/admin-panel' ? (
          <MenuItem onClick={handleHome}>Home</MenuItem>
        ) : (
          user?.role === 'Admin' && <MenuItem onClick={handlePanel}>Admin Panel</MenuItem>
        )}
        <MenuItem>
          <ThemeToggle />
        </MenuItem>
        {isAuthenticated && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
      </Menu>

      {profile && <Profile />}
      {isDrawerOpen && <AdminPanel />}
    </>
  );
};

export default Header;
