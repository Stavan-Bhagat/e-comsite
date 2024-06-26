import { styled } from '@mui/material/styles';
import { Box, Typography, Grid, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';

export const CategoryHeader = styled(Typography)({
  fontFamily: 'Playfair Display, serif',
  fontWeight: 'bold',
  fontSize: '1.5rem',
});
export const OuterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '1rem',
}));

export const ProductContainer = styled(Box)(({ theme }) => ({
  margin: 'auto',
  padding: '2rem',
  backgroundColor: theme.palette.background.default,
  width: '70%',
}));

export const ProductBox = styled(Box)({
  padding: '2rem',
  border: '1px solid #bdbdbd',
  borderTop: 0,
  borderLeft: 0,
  borderRadius: '5%',
});

export const ProductImage = styled('img')({
  width: '100%',
  height: 'auto',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

export const ProductName = styled(Typography)({
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  fontFamily: 'Hedvig Letters Serif, serif',
});

export const ProductPrice = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  color: '#009688',
  marginTop: '8px',
});

export const StrikedPrice = styled('span')({
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
