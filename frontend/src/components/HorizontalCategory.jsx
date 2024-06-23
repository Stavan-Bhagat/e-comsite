import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Container, Grid, Typography, Skeleton } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { fetchProductsByCategory } from '../utils/services/product.service';
import { MESSAGES } from '../constant/messages.constant';
import {
  CategoryHeader,
  ProductContainer,
  OuterContainer,
  ProductBox,
  ProductImage,
  ProductName,
  ProductPrice,
  StrikedPrice,
  SkeletonGridItem,
  SkeletonRectangular,
  SkeletonText,
  ProductLink,
} from '../css/styles/horizontalCategoryStyle';

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
    <OuterContainer fluid="true">
      <CategoryHeader
        gutterBottom
        variant="h5"
        align="center"
        sx={{ fontFamily: 'Playfair Display, serif', fontWeight: 'bold', fontSize: '1.5rem' }}
      >
        Best Of Electronics
      </CategoryHeader>

      <ProductContainer>
        <Grid container spacing={2}>
          {loading
            ? Array.from(new Array(8)).map((_, index) => (
                <SkeletonGridItem item xs={12} sm={6} md={4} lg={3} key={`skeleton${index + 1}`}>
                  <SkeletonRectangular variant="rectangular" />
                  <SkeletonText width="60%" />
                  <SkeletonText width="40%" />
                </SkeletonGridItem>
              ))
            : products.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                  <ProductLink to={`/product/${product._id}`}>
                    <ProductBox>
                      <ProductImage src={product.productImage[0]} alt={product.productName} />
                      <ProductName>{product.productName}</ProductName>
                      <ProductPrice>
                        <CurrencyRupeeIcon fontSize="small" />
                        {product.sellingPrice}
                        <StrikedPrice>{product.price}</StrikedPrice>
                      </ProductPrice>
                    </ProductBox>
                  </ProductLink>
                </Grid>
              ))}
        </Grid>
      </ProductContainer>
    </OuterContainer>
  );
};

HorizontalCategory.propTypes = {
  category: PropTypes.string.isRequired,
};

export default HorizontalCategory;
