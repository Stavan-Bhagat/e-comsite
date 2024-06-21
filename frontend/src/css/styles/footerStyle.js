import { styled } from '@mui/material/styles';
import { Box, Typography, Link, Container, Grid } from '@mui/material';

export const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4, 0),
}));

export const FooterTitle = styled(Typography)({
  marginBottom: '15px',
  fontSize: '18px',
  fontWeight: 600,
});

export const FooterLink = styled(Link)({
  marginBottom: '8px',
  color: '#6c757d',
  textDecoration: 'none',
  '&:hover': {
    color: '#0056b3',
  },
});

export const FooterIconLink = styled(Link)({
  marginRight: '10px',
  color: '#6c757d',
  '&:last-child': {
    marginRight: 0,
  },
  '&:hover': {
    color: '#0056b3',
  },
});

export const FooterText = styled(Typography)({
  marginBottom: '8px',
  color: '#6c757d',
});
