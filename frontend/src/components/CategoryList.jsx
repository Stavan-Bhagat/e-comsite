import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Box, CardMedia, Skeleton } from '@mui/material';
import { fetchCategoryProducts } from '../utils/services/product.service';
import {
  CategoryCard,
  CategoryImage,
  CategoryTitle,
  CategoryCardContent,
} from '../css/styles/categoryListStyle';
import genz from '../images/shopping1.jpg';

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
      console.error('Error fetching category products:', error);
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
    <Container maxWidth="lg" sx={{ marginTop: '6%' }}>
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={400} />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {categoryProduct.map((category) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={category._id}>
                  <CategoryCard onClick={() => handleChange(category.category)}>
                    <CategoryImage
                      component="img"
                      height="140"
                      image={category.productImage[0]}
                      alt={category.productName}
                    />
                    <CategoryCardContent>
                      <CategoryTitle align="center" variant="body1">
                        {category.category}
                      </CategoryTitle>
                    </CategoryCardContent>
                  </CategoryCard>
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
                alt="Image description"
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
