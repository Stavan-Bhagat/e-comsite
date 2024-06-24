import { styled } from '@mui/material/styles';
import { Box, Card, Avatar, IconButton, Button, Paper, Typography } from '@mui/material';

export const StyledContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  position: 'relative',
  pb: '4rem',
  bgcolor: '#f5f5f5', // Changed background color to a light grey
});

export const StyledCard = styled(Card)({
  position: 'relative',
  zIndex: 2,
  backgroundColor: '#fff', // Changed background color to white
  boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)', // Added a shadow to the card
  padding: '2rem', // Added padding to the card
  borderRadius: '8px', // Added border radius to make the card corners rounded
});

export const StyledAvatar = styled(Avatar)({
  width: 120,
  height: 120,
});

export const StyledIconButton = styled(IconButton)({
  marginLeft: '0.5rem',
});

export const StyledForm = styled('form')({
  width: '100%',
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
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Made the backdrop slightly transparent white
});

export const StyledLoadingMessage = styled(Typography)({
  marginTop: '1rem',
  color: '#fff',
});
