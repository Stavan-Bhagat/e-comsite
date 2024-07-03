import { styled } from '@mui/system';
import { Box, Button, IconButton } from '@mui/material';

export const StyledModalContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '25rem',
  borderRadius: 2,
  boxShadow: 24,
  padding: '0.9rem',
  backgroundColor: theme.palette.background.paper,
}));

export const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.9rem',
});

export const StyledButton = styled(Button)({
  marginTop: '0.9rem',
});

export const StyledIconButton = styled(IconButton)({
  color: 'grey',
});
