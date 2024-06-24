import { styled } from '@mui/material/styles';
import { Typography, Box, Card } from '@mui/material';

export const CategoryHeader = styled(Typography)({
  fontFamily: 'Playfair Display, serif',
  fontWeight: 'bold',
  fontSize: '1.5rem',
});

export const OuterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: '1rem',
}));

export const sidebarContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  //   padding: '1rem',
  //   marginTop: '7%',
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: '20rem',
  boxShadow: `1px 1px 1px  ${theme.boxShadow.main}`,
}));
