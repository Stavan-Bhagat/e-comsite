import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Badge,
  Paper,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Avatar,
  Button,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/SearchOutlined';
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
  SearchInput,
  SuggestionList,
  SuggestionItem,
  StyledAppBar,
  StyledToolbar,
  Logo,
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
  const [open, setOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const anchorRef = useRef(null);
  const prevOpen = useRef(open);
  const [modalOpen, setModalOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prevVal) => !prevVal);
  };

  const handlePanel = () => {
    setIsDrawerOpen(true);
    navigate('/admin-panel');
  };

  const handleHome = () => {
    setIsDrawerOpen(false);
    navigate('/');
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

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
    setOpen(false);
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
                    onClick={handleToggle}
                  />
                ) : (
                  <LoginButton variant="outlined" ref={anchorRef} onClick={handleToggle}>
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
          </Box>
        </StyledToolbar>
      </StyledAppBar>

      <SearchModal open={showModal} onClose={() => setShowModal(false)}>
        <Paper elevation={3}>
          <Box p={2}>
            <Typography variant="h6">Search Products</Typography>
            <Box mt={2}>
              <form onSubmit={handleSearchSubmit}>
                <SearchInput
                  placeholder="Search"
                  value={search}
                  onChange={handleSearchChange}
                  autoFocus
                />
                <Box mt={2} display="flex" justifyContent="flex-end">
                  <Button variant="outlined" onClick={handleSearchSubmit}>
                    Search
                  </Button>
                </Box>
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
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-end"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-end' ? 'right top' : 'right bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="composition-menu" onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  {location.pathname === '/admin-panel' ? (
                    <MenuItem onClick={handleHome}>Home</MenuItem>
                  ) : (
                    user?.role === 'Admin' && <MenuItem onClick={handlePanel}>Admin Panel</MenuItem>
                  )}
                  <MenuItem>
                    <ThemeToggle />
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      {profile && <Profile />}
      {isDrawerOpen && <AdminPanel />}
    </>
  );
};

export default Header;
