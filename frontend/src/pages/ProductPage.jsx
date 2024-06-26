import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Button, Snackbar } from '@mui/material';
import { useSnackbar } from 'notistack';
import { Container } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { fetchProduct } from '../utils/services/product.service';
import fallbackImage from '../images/ai.jpeg';
import { addToCart } from '../redux/Slice/cartSlice';
import { setBuyNowProduct } from '../redux/Slice/buyNowSlice';
import Header from '../components/Header';
import { MESSAGES } from '../constant/messages.constant';
import {
  StyledContainer,
  StyledTitle,
  ProductImageWrapper,
  ThumbnailImage,
  MainImageContainer,
} from '../css/styles/productPage.style';

const ProductPage = () => {
  const { id } = useParams();
  const cartData = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [clickImage, setClickImage] = useState(null);
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
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

    fetchedProduct(id);
  }, [id, enqueueSnackbar]);

  const handleClose = () => {
    setToast(false);
  };

  const handleImage = (image) => {
    setClickImage(image);
  };

  const handleCart = () => {
    if (product) {
      dispatch(addToCart(product));
      setToast(true);
    }
  };

  const handleBuyNow = (_id) => {
    const isProductInCart = cartData.find((item) => item._id === _id);
    if (isProductInCart) {
      navigate('/product/cart/');
    } else {
      if (product) {
        const productWithQuantity = { ...product, quantity: 1 };
        dispatch(setBuyNowProduct(productWithQuantity));
        navigate(`/checkout`);
      }
    }
  };

  if (loading) {
    return (
      <StyledContainer>
        <Typography variant="h5">Product Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2 }}>
              <Typography variant="body1">Loading...</Typography>
            </Box>
          </Grid>
        </Grid>
      </StyledContainer>
    );
  }

  if (!product) {
    return (
      <StyledContainer>
        <Typography variant="h5">Product Details</Typography>
        <Box sx={{ p: 2 }}>
          <Typography variant="body1">Product not found.</Typography>
        </Box>
      </StyledContainer>
    );
  }

  const { productImage, productName, sellingPrice, description } = product;
  const [firstImage] = productImage || [];
  const imageToDisplay = clickImage || firstImage || fallbackImage;

  return (
    <>
      <Header />
      <StyledContainer>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ProductImageWrapper>
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
                  <ThumbnailImage
                    key={image}
                    onMouseEnter={() => handleImage(image)}
                    onClick={() => handleImage(image)}
                  >
                    <img src={image} alt={productName} />
                  </ThumbnailImage>
                ))}
              </Box>
              <MainImageContainer>
                <img
                  src={imageToDisplay}
                  alt={productName}
                  onError={(event) => {
                    const target = event.target;
                    target.onerror = null;
                    target.src = fallbackImage;
                  }}
                />
              </MainImageContainer>
            </ProductImageWrapper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2 }}>
              <Typography
                gutterBottom
                variant="h5"
                sx={{ fontFamily: 'Hedvig Letters Serif, serif' }}
              >
                {productName}
              </Typography>
              <Typography variant="h6" gutterBottom>
                ₹{sellingPrice}
              </Typography>
              <Typography variant="body1" sx={{ fontFamily: 'sans-serif' }}>
                {description}
              </Typography>

              <Box sx={{ mt: 2, mb: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="medium"
                  fullWidth
                  onClick={handleCart}
                >
                  <AddShoppingCartIcon />
                  <Typography ml={1}>Add to Cart</Typography>
                </Button>
              </Box>
              <Button
                variant="outlined"
                sx={{ mt: 2, mb: 2 }}
                fullWidth
                onClick={() => handleBuyNow(product._id)}
              >
                Buy Now
              </Button>
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
      </StyledContainer>
    </>
  );
};

export default ProductPage;
