import { styled } from '@mui/material/styles';
import { Box, Card, Avatar, IconButton, Button, Paper, Typography } from '@mui/material';

export const StyledContainer = styled(Box)(({theme})=>({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '90vh',
  position: 'relative',
  backgroundColor:theme.palette.background.paper,
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: `0px 1px 1px 1px ${theme.boxShadow.main}`,
  backgroundColor:theme.palette.background.paper,
}));

export const StyledAvatar = styled(Avatar)({
  width: 120,
  height: 120,
});

export const StyledIconButton = styled(IconButton)({
  marginLeft: '0.5rem',
});

export const StyledForm = styled('form')({
  width: '100%',
  // backgroundColor:theme.boxShadow.main,

});

export const StyledButton = styled(Button)({
  marginRight: '0.5rem',
});

export const StyledBackdrop = styled(Paper)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '40%',
  backdropFilter: 'blur(5px)',
  zIndex: 1,
});

export const StyledLoadingMessage = styled(Typography)({
  marginTop: '1rem',
  color: '#fff',
});
