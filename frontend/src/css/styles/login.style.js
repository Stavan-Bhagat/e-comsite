import { styled } from '@mui/material/styles';
import { Box, Container, Grid } from '@mui/material';

export const StyledContainer = styled(Container)({
  padding: '1rem',
  margin: 'auto',
  padding: '1%',
  overflow: 'hidden',
  height: '90vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const StyledImage = styled(Box)({
  objectFit: 'cover',
  height: '100%',
  width: '100%',
});

export const StyledModalContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginX: 7,
});
export const StyledGrid = styled(Grid)(({ theme }) => ({
  //   boxShadow: `0px 1px 1px 1px ${theme.boxShadow.main}`,
  border: `1px solid ${theme.boxShadow.main}`,
  borderTop: 0,
  padding: '2%',
}));
