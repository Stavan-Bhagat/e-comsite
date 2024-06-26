import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import 'react-multi-carousel/lib/styles.css';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { fetchProductsByCategory } from '../utils/services/product.service';
import { MESSAGES } from '../constant/messages.constant';
import { Typography, Container, Skeleton } from '@mui/material';
import {
  StyledContainer,
  StyledCard,
  StyledCardImage,
  StyledCardContent,
  StyledProductName,
  StyledProductPrice,
  StyledLink,
  StyledCarousel,
  responsive,
  CustomLeftArrow,
  CustomRightArrow,
} from '../css/styles/productCarousel.style';

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
    <StyledContainer>
      <Typography
        variant="h6"
        gutterBottom
        align="center"
        sx={{ fontFamily: 'Playfair Display, serif', fontWeight: 'bold', fontSize: '1.5rem' }}
      >
        Popular {category}
      </Typography>
      <Container>
        <StyledCarousel
          showDots
          responsive={responsive}
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
        >
          {loading
            ? Array.from(new Array(5)).map((_, index) => (
                <StyledCard key={`Skeleton${index + 1}`}>
                  <Skeleton variant="rectangular" width="100%" height={200} />
                  <StyledCardContent>
                    <Skeleton width="60%" />
                    <Skeleton width="40%" />
                  </StyledCardContent>
                </StyledCard>
              ))
            : products.map((item) => (
                <StyledLink to={`/product/${item._id}`} key={item._id}>
                  <StyledCard>
                    <StyledCardImage src={item.productImage[0]} alt={item.productName} />
                    <StyledCardContent>
                      <StyledProductName>{item.productName}</StyledProductName>
                      <StyledProductPrice variant="body1" color="textSecondary" component="span">
                        From
                      </StyledProductPrice>
                      <StyledProductPrice variant="body2" color="primary" component="span">
                        <CurrencyRupeeIcon fontSize="small" />
                        {item.price}
                      </StyledProductPrice>
                    </StyledCardContent>
                  </StyledCard>
                </StyledLink>
              ))}
        </StyledCarousel>
      </Container>
    </StyledContainer>
  );
};

ProductCarousel.propTypes = {
  category: PropTypes.string.isRequired,
};

export default ProductCarousel;
