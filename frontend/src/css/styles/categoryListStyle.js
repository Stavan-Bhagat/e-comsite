import { styled } from '@mui/material/styles';
import { Box, CardMedia, CardContent, Typography } from '@mui/material';

export const CategoryCard = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: `1px 1px 1px ${theme.boxShadow.main}`,
  },
  boxShadow: `1px 1px 1px  ${theme.boxShadow.main}`,

  borderEndEndRadius: 3,
}));

export const CategoryImage = styled(CardMedia)({
  padding: '10%',
});

export const CategoryTitle = styled(Typography)({
  paddingLeft: '5%',
  paddingRight: '5%',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  fontFamily: 'Roboto, serif',
});

export const CategoryCardContent = styled(CardContent)({
  padding: 0,
});

// ------------------------------

export const ProductCard = styled(Box)(({ theme }) => ({
  maxWidth: '175px',
  width: '100%',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
  },
}));

export const ProductCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const ProductImage = styled(CardMedia)(({ theme }) => ({
  height: '100px',
}));
