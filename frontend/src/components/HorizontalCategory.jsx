// /* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Container, Grid, Box, Typography, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { fetchProductsByCategory } from '../utils/services/product.service';
import { MESSAGES } from '../constant/messages.constant';

const HorizontalCategory = ({ category }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProductsFromCategory = async () => {
    setLoading(true);
    try {
      const response = await fetchProductsByCategory(category);
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
    fetchProductsFromCategory();
  }, [category]);

  return (
    <Box className="bg-light">
      <Container className="text-center" style={{ padding: '1%' }} fluid>
        <Typography
          gutterBottom
          sx={{
            fontFamily: 'Playfair Display,serif',
            fontWeight: 'bold',
            fontSize: '1.5rem',
          }}
        >
          Best Of Electronics
        </Typography>

        <Container
          sx={{
            mx: 'auto',
            padding: 2,
            background: 'white',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            height: '80%',
            width: '90%',
          }}
        >
          <Grid container spacing={2}>
            {loading
              ? Array.from(new Array(8)).map((_, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Skeleton variant="rectangular" width="100%" height={200} />

                    <Skeleton width="60%" />

                    <Skeleton width="40%" />
                  </Grid>
                ))
              : products.map((product) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                    <Link
                      to={`/product/${product._id}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <Box
                        sx={{
                          padding: 2,
                          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                          },
                        }}
                      >
                        <img
                          src={product.productImage[0]}
                          alt={product.productName}
                          style={{ width: '100%', height: 'auto' }}
                        />
                        <Typography
                          sx={{
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            fontWeight: 'bold',
                            fontFamily: 'Hedvig Letters Serif,serif',
                          }}
                        >
                          {product.productName}
                        </Typography>
                        <Typography variant="h6" color="secondary">
                          <CurrencyRupeeIcon fontSize="small" />
                          {product.sellingPrice}
                          <Typography
                            component="span"
                            sx={{
                              textDecoration: 'line-through',
                              marginLeft: 2,
                              color: '#e53935',
                            }}
                          >
                            {product.price}
                          </Typography>
                        </Typography>
                      </Box>
                    </Link>
                  </Grid>
                ))}
          </Grid>
        </Container>
      </Container>
    </Box>
  );
};

HorizontalCategory.propTypes = {
  category: PropTypes.string.isRequired,
};

export default HorizontalCategory;
