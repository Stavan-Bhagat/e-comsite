import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: '20%',
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: '20%',
    boxSizing: 'border-box',
    paddingTop: theme.spacing(8),
  },
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  display: { sm: 'none' },
  position: 'fixed',
  top: theme.spacing(2),
  left: theme.spacing(2),
  zIndex: theme.zIndex.drawer + 1,
}));

export const StyledContainer = styled(Box)({
  marginTop: '5%',
});
