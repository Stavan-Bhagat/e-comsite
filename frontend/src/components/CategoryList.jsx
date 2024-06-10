import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Box, CardContent, CardMedia, Typography, Skeleton } from '@mui/material';
import { fetchCategoryProducts } from '../utils/services/product.service';
import '../css/homeBody.css';
import genz from '../images/sale.jpg';

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCategoryProduct = async () => {
    setLoading(true);
    try {
      const response = await fetchCategoryProducts();
      setCategoryProduct(response.data.slice(0, 12));
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
    setLoading(false);
  };

  const handleChange = (category) => {
    navigate(`/product/search/product/${category}`);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <Container sx={{ padding: 2 }}>
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={400} />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {categoryProduct.map((category) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={category._id}>
                  <Box
                    onClick={() => handleChange(category.category)}
                    sx={{
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15 )',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={category.productImage[0]}
                      alt={category.productName}
                      sx={{ padding: '10%' }}
                    />
                    <CardContent sx={{ padding: 0 }}>
                      <Typography
                        className="text-center"
                        sx={{
                          fontFamily: 'IBM Plex Serif,serif,',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          px: '5%',
                        }}
                      >
                        {category.category}
                      </Typography>
                    </CardContent>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="100%"
                image={genz}
                alt="Descriptive text for the image"
                sx={{ objectFit: 'cover', height: '100%', width: '100%' }}
              />
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CategoryList;
