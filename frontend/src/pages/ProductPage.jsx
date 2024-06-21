import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Button, Snackbar, Skeleton } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Container } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { fetchProduct } from '../utils/services/product.service';
import fallbackImage from '../images/ai.jpeg';
import { addToCart } from '../redux/Slice/cartSlice';
import Header from '../components/Header';
import { MESSAGES } from '../constant/messages.constant';

const ProductPage = () => {
  const { id } = useParams();
  const cartData = useSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [clickImage, setClickImage] = useState(null);
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const fetchedProduct = async (_id) => {
    setLoading(true);
    try {
      const response = await fetchProduct(_id);

      if (response.data) {
        setProduct(response.data);
      } else {
        setProduct(null);
      }
    } catch (error) {
      enqueueSnackbar(`${MESSAGES.ERROR.FETCH_ORDERS_FAILED} ${error.message}`, {
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setToast(false);
  };

  const handleImage = (image) => {
    setClickImage(image);
  };

  const handleCart = () => {
    dispatch(addToCart(product));
    console.log('cart', product);
    setToast(true);
  };

  const handleBuyNow = (_id) => {
    const isProductInCart = cartData.find((item) => item._id === _id);

    if (isProductInCart) {
      navigate('/product/cart/');
    } else {
      dispatch(addToCart(product));
      navigate('/product/cart/');
    }
  };

  useEffect(() => {
    fetchedProduct(id);
  }, [id]);

  if (loading) {
    return (
      <Container>
        <Typography variant="h5">Product Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height="90vh" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (!product) {
    return <Typography>No product found.</Typography>;
  }

  const { productImage, productName, sellingPrice, description } = product;
  const [firstImage] = productImage || [];
  const imageToDisplay = clickImage || firstImage || fallbackImage;

  return (
    <>
      <Header />
      <Container className="p-5">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: 'auto' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'row', md: 'column' },
                  width: { xs: '100%', md: '20%' },
                  marginRight: { md: '1rem' },
                  overflowX: { xs: 'scroll', md: 'unset' },
                }}
              >
                {productImage.map((image) => (
                  <Box
                    key={image}
                    sx={{
                      marginBottom: { xs: '0', md: '1rem' },
                      marginRight: { xs: '1rem', md: '0' },
                    }}
                    onMouseEnter={() => handleImage(image)}
                  >
                    <img src={image} alt={productName} style={{ width: '100%', height: 'auto' }} />
                  </Box>
                ))}
              </Box>
              <Box
                sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <img
                  src={imageToDisplay}
                  alt={productName}
                  style={{ width: '100%', height: 'auto' }}
                  onError={(event) => {
                    const target = event.target;
                    target.onerror = null;
                    target.src = fallbackImage;
                  }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ height: 'auto' }}>
              <Typography variant="h4" sx={{ fontFamily: 'Roboto Condensed' }}>
                {productName}
              </Typography>
              <Typography variant="h6">${sellingPrice}</Typography>
              <Typography variant="body1" sx={{ fontFamily: 'sans-serif' }}>
                {description}
              </Typography>
              <Box sx={{ mt: 2, mb: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="medium"
                  fullWidth
                  sx={{
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'scale(1.01)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                  onClick={handleCart}
                >
                  <AddShoppingCartIcon />
                  <Typography sx={{ ml: 1 }}>Add to Cart</Typography>
                </Button>
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  sx={{
                    color: 'black',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'scale(1.01)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                  fullWidth
                  onClick={() => handleBuyNow(product._id)}
                >
                  Buy Now
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={toast}
          onClose={handleClose}
          autoHideDuration={2000}
          message="Added to cart"
          key="bottomright"
        />
      </Container>
    </>
  );
};

export default ProductPage;
