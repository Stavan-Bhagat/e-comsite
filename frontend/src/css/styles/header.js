import { styled } from '@mui/system';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Popper,
  Paper,
  MenuList,
  MenuItem,
  Grow,
  ClickAwayListener,
  Button,
  Modal,
  FormControl,
  InputBase,
} from '@mui/material';

export const CustomAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
}));

export const CustomToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

export const Logo = styled('img')({
  width: 40,
  height: 40,
  marginRight: 16,
});

export const SearchInput = styled(InputBase)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: '2px 8px',
  borderRadius: 4,
  marginRight: theme.spacing(2),
}));

export const CustomButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.secondary.main,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

export const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const MenuPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  boxShadow: theme.shadows[5],
}));

export const StyledPopper = styled(Popper)(({ theme }) => ({
  zIndex: theme.zIndex.modal,
}));

export const SearchForm = styled(FormControl)({
  display: 'flex',
  alignItems: 'center',
});
