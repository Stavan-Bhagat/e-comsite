import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import { Image } from 'react-bootstrap';
import { fetchCategoryProducts } from '../utils/services/product.service';

const CategoryList = () => {
  const [categoryProduct, SetCategoryProduct] = useState([]);
  const [loading, SetLoading] = useState(false);
  const navigate = useNavigate();
  const fetchCategoryProduct = async () => {
    SetLoading(true);
    const response = await fetchCategoryProducts();
    SetLoading(false);
    SetCategoryProduct(response.data);
  };
  const handleChange = (category) => {
    navigate(`/product/search/${category}`);
  };
  useEffect(() => {
    fetchCategoryProduct();
  }, []);
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {loading ? (
        <CircularProgress centered />
      ) : (
        <Container
          fluid
          gap={2}
          style={{
            display: 'flex',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            paddingTop: '2rem',
            gap: '1rem',
          }}
        >
          {' '}
          {categoryProduct.map((category) => (
            <Box key={category._id} onClick={() => handleChange(category.category)}>
              <Image
                src={category.productImage[0]}
                alt={category.productName}
                className="round-image"
              />
              <Typography variant="h6" align="center">
                {category.category}
              </Typography>
            </Box>
          ))}
        </Container>
      )}
    </>
  );
};
export default CategoryList;
