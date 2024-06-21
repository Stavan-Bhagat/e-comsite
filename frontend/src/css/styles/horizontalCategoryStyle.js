// horizontalCategoryStyles.js

import styled from 'styled-components';
import { Box, Typography, Grid, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';

export const CategoryHeader = styled(Typography)({
  fontFamily: 'Playfair Display, serif',
  fontWeight: 'bold',
  fontSize: '1.5rem',
});

export const ProductContainer = styled(Box)({
  margin: 'auto',
  padding: '2rem',
  background: 'white',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  height: '80%',
  width: '90%',
});

export const ProductBox = styled(Box)({
  padding: '2rem',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
  },
});

export const ProductImage = styled.img({
  width: '100%',
  height: 'auto',
});

export const ProductName = styled(Typography)({
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  fontWeight: 'bold',
  fontFamily: 'Hedvig Letters Serif, serif',
});

export const ProductPrice = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  color: '#009688',
  marginTop: '8px',
});

export const StrikedPrice = styled.span({
  textDecoration: 'line-through',
  marginLeft: '2px',
  color: '#e53935',
});

export const SkeletonGridItem = styled(Grid)({
  margin: 'auto',
});

export const SkeletonRectangular = styled(Skeleton)({
  width: '100%',
  height: '200px',
});

export const SkeletonText = styled(Skeleton)(({ width }) => ({
  width: width,
}));

export const ProductLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': {
    textDecoration: 'none',
    color: 'inherit',
  },
});
