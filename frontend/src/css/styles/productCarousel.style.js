import { styled } from '@mui/system';
import { Typography, Card, CardContent, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

export const StyledContainer = styled('div')({
  margin: 'auto',
});

export const StyledCard = styled(Card)({
  margin: '10px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  },
});

export const StyledCardImage = styled('img')({
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
});

export const StyledCardContent = styled(CardContent)({
  textAlign: 'center',
});

export const StyledProductName = styled(Typography)({
  fontWeight: 'bold',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  fontFamily: 'Hedvig Letters Serif, serif',
});

export const StyledProductPrice = styled(Typography)({
  display: 'inline-block',
  margin: '5px 0',
});

export const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
});

export const StyledCarousel = styled(Carousel)({
  // Add any carousel-specific styles here if needed
});
