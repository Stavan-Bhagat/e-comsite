import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Skeleton, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import { useSnackbar } from 'notistack';
import 'react-multi-carousel/lib/styles.css';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Link } from 'react-router-dom';
import { fetchProductsByCategory } from '../utils/services/product.service';
import { MESSAGES } from '../constant/messages.constant';

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

const styles = {
  card: {
    margin: '10px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    },
  },
  productImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
  },
  cardContent: {
    textAlign: 'center',
  },
  productName: {
    fontWeight: 'bold',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  productPrice: {
    display: 'inline-block',
    margin: '5px 0',
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
      enqueueSnackbar(`${MESSAGES.ERROR.FETCH_FAILED} ${error.message}`, {
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
    <Box my={4}>
      <Typography
        variant="h6"
        gutterBottom
        className="text-center"
        sx={{ fontFamily: 'Playfair Display,serif', fontWeight: 'bold', fontSize: '1.5rem' }}
      >
        Popular {category}
      </Typography>
      {loading ? (
        <Container sx={{ margin: 'auto' }}>
          <Carousel showDots responsive={responsive}>
            {Array.from(new Array(5)).map((_, index) => (
              <Card sx={styles.card} key={`Skeleton${index + 1}`}>
                <Skeleton variant="rectangular" width="100%" height={200} />
                <CardContent style={styles.cardContent}>
                  <Skeleton width="60%" />
                  <Skeleton width="40%" />
                </CardContent>
              </Card>
            ))}
          </Carousel>
        </Container>
      ) : (
        <Container sx={{ margin: 'auto' }}>
          <Carousel showDots responsive={responsive}>
            {products.map((item) => (
              <Link
                to={`/product/${item._id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
                key={item._id}
              >
                <Card sx={styles.card} className="product-card">
                  <img
                    src={item.productImage[0]}
                    alt={item.productName}
                    style={styles.productImage}
                  />
                  <CardContent style={styles.cardContent}>
                    <Typography
                      style={styles.productName}
                      sx={{ fontFamily: 'Hedvig Letters Serif' }}
                    >
                      {item.productName}
                    </Typography>
                    <Typography
                      style={styles.productPrice}
                      variant="body1"
                      color="textSecondary"
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
        </Container>
      )}
    </Box>
  );
};

ProductCarousel.propTypes = {
  category: PropTypes.string.isRequired,
};

export default ProductCarousel;
