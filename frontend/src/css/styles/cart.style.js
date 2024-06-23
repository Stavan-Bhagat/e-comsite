import { styled } from '@mui/material/styles';
import { Container, Grid, Box } from '@mui/material';

export const StyledEmptyCartMessage = styled(Box)({
  height: '90vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const StyledCartContainer = styled(Container)({
  padding: '2rem',
  marginTop: '3rem',
});

export const StyledCartItem = styled(Grid)(({ theme }) => ({
  borderBottom: '1px solid #ddd',
  paddingBottom: '1rem',
  marginBottom: '1rem',
  backgroundColor: theme.palette.background.paper,
}));

export const StyledProductImage = styled('img')({
  width: '100px',
  height: '100px',
  objectFit: 'cover',
});

export const StyledQuantityInput = styled('input')({
  width: '60px',
  marginRight: '10px',
  padding: '0.5rem',
  textAlign: 'center',
  border: '1px solid #ddd',
  borderRadius: '4px',
});
