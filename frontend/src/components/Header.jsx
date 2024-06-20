/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-shadow */
import React, { useState, useRef, useEffect } from 'react';
import { Navbar, Nav, Modal, Button, FormControl, Form } from 'react-bootstrap';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import IconButton from '@mui/material/IconButton';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useSnackbar } from 'notistack';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { logout } from '../redux/Slice/authSlice';
import { addCartData } from '../utils/services/cart.service';
import { clearCart } from '../redux/Slice/cartSlice';
import { searchSuggestionProduct, searchProduct } from '../utils/services/product.service';
import Profile from './Profile';
// eslint-disable-next-line import/no-cycle
import AdminPanel from '../pages/AdminPanel';
import NotificationModal from './NotificationModal';
import logo from '../images/logo.webp';

const Header = () => {
  const user = useSelector((state) => state?.auth.user);
  const cart = useSelector((state) => state?.cart.items);
  console.log('cartbhai', cart);
  const isAuthenticated = useSelector((state) => state?.auth.isAuthenticated);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const anchorRef = useRef(null);
  const prevOpen = useRef(open);
  const [modalOpen, setModalOpen] = useState(false);
  const unreadCount = useSelector((state) => state?.notifications?.unreadCount);
  const { enqueueSnackbar } = useSnackbar();

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
        enqueueSnackbar('Product Not found', { variant: 'error' });
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
        enqueueSnackbar(`Product Not Found`, { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar(`Error fetching products: ${error.message}`, { variant: 'error' });
    }
    setShowModal(false);
  };

  const handleSuggestionClick = async (suggestion) => {
    try {
      const response = await searchProduct(suggestion.productName);
      const { type, term } = response;
      navigate(`/product/search/${type}/${term}`);
    } catch (error) {
      enqueueSnackbar(`Error Fetching product: ${error.message}`, { variant: 'error' });
    }
    setShowModal(false);
  };

  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        style={{ paddingLeft: '20px', paddingRight: '20px', zIndex: 9999 }}
      >
        <Navbar.Brand
          href="/"
          className="text-primary "
          style={{ fontWeight: 'bold', fontFamily: 'IBM Plex Serif ' }}
        >
          <img src={logo} alt="Logo" style={{ width: '40px', height: '40px' }} /> Fusion
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ alignItems: 'center' }}>
            <IconButton onClick={handleSearchIconClick}>
              <SearchIcon />
            </IconButton>
            {!isAuthenticated && (
              <Button
                variant="outline-primary"
                onClick={() => navigate('/login')}
                style={{ marginRight: '15px' }}
              >
                <PersonIcon /> Login
              </Button>
            )}
            {user?._id && (
              <div>
                {user?.imageUrl ? (
                  <Avatar
                    alt="User Avatar"
                    src={user.imageUrl}
                    ref={anchorRef}
                    onClick={handleToggle}
                  />
                ) : (
                  <Button
                    variant="outline-primary"
                    ref={anchorRef}
                    onClick={handleToggle}
                    style={{ marginRight: '15px' }}
                  >
                    <AccountIcon /> User
                  </Button>
                )}
              </div>
            )}
            <IconButton onClick={() => setModalOpen(true)}>
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsIcon className="text-warning" />
              </Badge>
            </IconButton>
            <NotificationModal open={modalOpen} handleClose={() => setModalOpen(false)} />
            <IconButton aria-label="cart" onClick={handleCart}>
              <Badge badgeContent={cart.length}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Search Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSearchSubmit}>
            <FormControl
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleSearchChange}
              style={{ marginBottom: '15px' }}
            />
            <Button variant="outline-success" onClick={handleSearchSubmit}>
              Search
            </Button>
          </Form>
          {suggestions.length > 0 && (
            <ul>
              {suggestions.map((suggestion) => (
                <li key={suggestion._id} style={{ listStyleType: 'none', margin: '4px 0' }}>
                  <button
                    onClick={() => handleSuggestionClick(suggestion)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleSuggestionClick(suggestion);
                      }
                    }}
                    style={{
                      cursor: 'pointer',
                      padding: '8px',
                      width: '100%',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      textAlign: 'left',
                      background: 'none',
                    }}
                  >
                    {suggestion.productName}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Modal.Body>
      </Modal>
      <NotificationModal open={modalOpen} handleClose={() => setModalOpen(false)} />
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
        sx={{ zIndex: '999' }}
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
