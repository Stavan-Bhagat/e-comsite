import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, CircularProgress, Box } from '@mui/material';
import PropTypes from 'prop-types';
import Carousel from 'react-multi-carousel';
import { useSnackbar } from 'notistack';
import 'react-multi-carousel/lib/styles.css';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Link } from 'react-router-dom';
import { fetchProductsByCategory } from '../utils/services/product.service';
import { styles } from '../css/multiCarousel';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ProductCarousel = ({ category }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProductsFromCategory = async (categoryType) => {
    setLoading(true);
    try {
      const response = await fetchProductsByCategory(categoryType);
      setProducts(response.data);
    } catch (error) {
      enqueueSnackbar(`Failed to fetch the product. Please try again later. ${error.message}`, {
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsFromCategory(category);
  }, [category]);

  return (
    <>
      <Typography variant="h6">Popular {category}</Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height={200}>
          <CircularProgress />
        </Box>
      ) : (
        <Carousel showDots responsive={responsive}>
          {products.map((item) => (
            <Link
              to={`/product/${item._id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
              key={item._id}
            >
              <Card style={styles.card}>
                <img src={item.productImage[0]} alt={item.name} style={styles.productImage} />
                <CardContent style={styles.cardContent}>
                  <Typography style={styles.productName} variant="body1">
                    {item.productName}
                  </Typography>
                  <Typography
                    style={styles.productPrice}
                    variant="body1"
                    color="black"
                    component="span"
                  >
                    From
                  </Typography>
                  <Typography
                    style={styles.productPrice}
                    variant="body2"
                    color="primary"
                    component="span"
                  >
                    <CurrencyRupeeIcon fontSize="small" />
                    {item.price}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Carousel>
      )}
    </>
  );
};

ProductCarousel.propTypes = {
  category: PropTypes.string.isRequired,
};

export default ProductCarousel;
