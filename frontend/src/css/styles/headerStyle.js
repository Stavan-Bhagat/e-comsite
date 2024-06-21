import { styled } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Badge,
  Modal,
  InputBase,
  Button,
} from '@mui/material';

export const StyledNavbar = styled('nav')({
  paddingLeft: '2vw',
  paddingRight: '2vw',
});

export const LogoImage = styled('img')({
  width: '2.5vw',
  height: '2.5vw',
  maxWidth: '40px',
  maxHeight: '40px',
});

export const LoginButton = styled(Button)({
  marginRight: '1.5vw',
});

export const UserIconButton = styled(IconButton)({
  marginRight: '1.5vw',
});

export const StyledAppBar = styled(AppBar)({
  zIndex: '1100',
  backgroundColor: '#ffffff',
  padding: '0 2vw',
});

export const StyledToolbar = styled(Toolbar)({
  justifyContent: 'space-between',
});

export const Logo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
});

export const LogoText = styled(Typography)({
  marginLeft: '1vw',
  fontWeight: 'bold',
  fontFamily: 'IBM Plex Serif, serif',
  color: '#1976d2',
});

export const SearchModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const SearchInput = styled(InputBase)({
  width: '100%',
  padding: '0.8vw',
  border: '1px solid #bdbdbd',
  borderRadius: '0.4vw',
});

export const SuggestionList = styled(Box)({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  maxHeight: '200px',
  overflowY: 'auto',
  border: '1px solid #bdbdbd',
  borderRadius: '0.4vw',
});

export const SuggestionItem = styled(Box)({
  padding: '0.8vw',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
});

export const IconButtonStyled = styled(IconButton)({
  color: '#333',
});

export const StyledMenu = styled(Menu)({
  zIndex: '1200',
});
