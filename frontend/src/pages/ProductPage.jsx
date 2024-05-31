import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Button, Snackbar } from "@mui/material";
import { Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../utils/service";
import fallbackImage from "../images/ai.jpeg";
import { Skeleton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { addToCart } from "../redux/Slice/cartSlice";
import Header from "../components/Header";

const ProductPage = () => {
  const { id } = useParams();
  const cartData = useSelector((state) => state.cart.items);
  console.log("cartdata", cartData);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [clickImage, setClickImage] = useState(null);
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchedProduct = async (id) => {
    setLoading(true);
    try {
      const response = await fetchProduct(id);
      if (response.data && response.data.length > 0) {
        setProduct(response.data[0]);
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error("Failed to fetch product", error);
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
    setToast(true);
  };
  const handleBuyNow = (id) => {
    const isProductInCart = cartData.find((item) => item._id === id);

    if (isProductInCart) {
      navigate("/product/cart/");
    } else {
      dispatch(addToCart(product));
      navigate("/product/cart/");
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
          <Grid item xs={6}>
            <Skeleton variant="rectangular" height="90vh" />
          </Grid>
          <Grid item xs={6}>
            <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (!product) {
    return <Typography>No product found.</Typography>;
  }

  return (
    <>
      <Header />
      <Container>
        <Typography variant="h5">Product Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ height: "90vh", display: "flex" }}>
              <Box
                sx={{
                  height: "100%",
                  width: "20%",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  display: "flex",
                  marginRight: "1rem",
                }}
                component="div"
              >
                {product.productImage.map((image, index) => (
                  <Box
                    key={index}
                    sx={{ marginBottom: "1rem" }}
                    component="div"
                    onMouseEnter={() => handleImage(image)}
                  >
                    <img
                      src={image}
                      alt={product.productName}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Box>
                ))}
              </Box>
              <img
                src={
                  product.productImage && product.productImage[0]
                    ? clickImage || product.productImage[0]
                    : fallbackImage
                }
                alt={product.productName}
                style={{ width: "80%", height: "auto" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = fallbackImage;
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ height: "90vh" }}>
              <Typography variant="h4">{product.productName}</Typography>
              <Typography variant="h6">${product.price}</Typography>
              <Typography variant="body1">{product.description}</Typography>
              <Box sx={{ mt: 2, mb: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="medium"
                  fullWidth
                  sx={{
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "scale(1.01)",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
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
                    color: "black",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "scale(1.01)",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
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
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={toast}
          onClose={handleClose}
          autoHideDuration={2000}
          message="Added to cart"
          key={"bottomright"}
          className="bg-success"
        />
      </Container>
    </>
  );
};

export default ProductPage;
