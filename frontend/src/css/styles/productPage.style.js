import { styled } from '@mui/material/styles';
import { Container, Typography, Box } from '@mui/material';

export const StyledContainer = styled(Container)({
  paddingTop: '2rem',
});

export const StyledTitle = styled(Typography)({
  textAlign: 'center',
  marginBottom: '2rem',
  fontFamily: 'Playfair Display, serif',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  textTransform: 'uppercase',
});

export const ProductImageWrapper = styled(Box)({
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  height: 'auto',
});

export const ThumbnailImage = styled(Box)({
  marginBottom: { xs: '0', md: '1rem' },
  marginRight: { xs: '1rem', md: '0' },
  '& img': {
    width: '100%',
    height: 'auto',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
});

export const MainImageContainer = styled(Box)({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& img': {
    width: '100%',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});
