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
import Header from '../components/Header';
import { MESSAGES } from '../constant/messages.constant';
import { styled } from '@mui/material/styles';
import themeSlice from '../redux/Slice/themeSlice';

// Styled Components
const StyledContainer = styled(Container)({
  paddingTop: '5rem',
});

const StyledTitle = styled(Typography)({
  textAlign: 'center',
  marginBottom: '2rem',
  fontFamily: 'Playfair Display, serif',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textTransform: 'uppercase',
});

const ProductImageWrapper = styled(Box)({
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  height: 'auto',
});

const ThumbnailImage = styled(Box)({
  marginBottom: { xs: '0', md: '1rem' },
  marginRight: { xs: '1rem', md: '0' },
  '& img': {
    width: '100%',
    height: 'auto',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
});

const MainImageContainer = styled(Box)({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& img': {
    width: '100%',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

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
        dispatch(addToCart(product));
        navigate('/product/cart/');
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
        {/* <StyledTitle variant="h4">Product Details</StyledTitle> */}
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
