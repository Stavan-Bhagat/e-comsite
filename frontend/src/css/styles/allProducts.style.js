import { styled } from '@mui/material/styles';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Modal,
  FormControl,
} from '@mui/material';

export const StyledContainer = styled(Box)({
  padding: '1rem',
  maxWidth: '1200px',
});

export const StyledHeader = styled(Typography)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
  fontFamily: 'Playfair Display, serif',
  fontWeight: 'bold',
  fontSize: '1.5rem',
});

export const StyleTypography = styled(Typography)({
  fontSize: '0.875rem',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  maxWidth: '100%',
});
export const OverflowTypography = styled(Typography)({
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});

export const StyledButton = styled(Button)({
  marginLeft: 'auto',
});

export const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: '20rem',
  boxShadow: `1px 1px 1px  ${theme.boxShadow.main}`,
}));

export const StyledCardContent = styled(CardContent)({
  textAlign: 'center',
});

export const StyledCardMedia = styled(CardMedia)({
  height: '8.75rem',
});

export const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledModalContent = styled(Box)(({ theme }) => ({
  background: '#f5f5f5',
  borderRadius: '0.5rem',
  padding: '1rem',
  width: '80%',
  maxWidth: '37.5rem',
  backgroundColor: theme.palette.background.default,
}));

export const StyledForm = styled('form')(({ theme }) => ({
  display: 'grid',
  gap: '1rem',
  backgroundColor: theme.palette.background.default,
}));

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.paper,
}));

export const StyledGrid = styled(Grid)({
  marginTop: '1rem',
});

export const StyledPaginationContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '1rem',
});

export const AddProductButton = styled(Button)(({ theme }) => ({}));
