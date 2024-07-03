import { styled } from '@mui/material/styles';
import { Container, Grid, Box } from '@mui/material';

export const StyledEmptyCartMessage = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  textAlign: 'center',
  padding: theme.spacing(2),
}));

export const StyledCartContainer = styled(Container)(({ theme }) => ({

  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

export const StyledCartItem = styled(Grid)(({ theme }) => ({

  borderBottom: `1px solid ${theme.palette.divider}`,
  marginLeft: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: {
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export const StyledProductImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  maxWidth: theme.spacing(12.5),
  objectFit: 'cover',
  [theme.breakpoints.down('sm')]: {
    maxWidth: theme.spacing(10),
  },
}));

export const StyledQuantityInput = styled('input')(({ theme }) => ({
  width: theme.spacing(7.5),
  marginRight: theme.spacing(1.25),
  padding: theme.spacing(0.5),
  textAlign: 'center',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.down('sm')]: {
    width: theme.spacing(6.25),
    padding: theme.spacing(0.25),
  },
}));
