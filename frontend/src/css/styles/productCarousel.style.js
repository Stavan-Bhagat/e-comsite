import { styled } from '@mui/material/styles';
import { Typography, Card, CardContent, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const Arrow = styled('div')(({ theme, position }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  borderRadius: '50%',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
  ...(position === 'left' && { left: '10px' }),
  ...(position === 'right' && { right: '10px' }),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const CustomLeftArrow = ({ onClick }) => (
  <Arrow onClick={onClick} position="left">
    <ArrowBackIosIcon fontSize="small" />
  </Arrow>
);

export const CustomRightArrow = ({ onClick }) => (
  <Arrow onClick={onClick} position="right">
    <ArrowForwardIosIcon fontSize="small" />
  </Arrow>
);

export const StyledContainer = styled('div')({
  zIndex:'1100',
  margin: 'auto',
  padding: '1rem',
});

export const StyledCard = styled(Card)(({ theme }) => ({
  zIndex:'100',
  margin: '3%',
  borderRadius: '10px',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: `1px 1px 1px ${theme.boxShadow.main}`,
  },
  boxShadow: `1px 1px 1px  ${theme.boxShadow.main}`,
}));

export const StyledCardImage = styled('img')({
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
});

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  textAlign: 'center',
  backgroundColor: theme.palette.background.default,
}));
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
