/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Container, Grid, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { fetchProductsByCategory } from '../utils/services/product.service';

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
      enqueueSnackbar(`Failed to fetch the product. Please try again later. ${error.message}`, {
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
    <>
      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <Container fluid>
          <Grid container spacing={2}>
            {products.map((product) => (
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
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                      },
                    }}
                  >
                    <img
                      src={product.productImage[0]}
                      alt={product.productName}
                      style={{ width: '100%', height: 'auto' }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {product.productName}
                    </Typography>
                    <Typography variant="h6" color="secondary">
                      <CurrencyRupeeIcon fontSize="small" />
                      {product.sellingPrice}
                      <Typography
                        component="span"
                        sx={{ textDecoration: 'line-through', marginLeft: 2 }}
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
      )}
    </>
  );
};

HorizontalCategory.propTypes = {
  category: PropTypes.string.isRequired,
};

export default HorizontalCategory;
