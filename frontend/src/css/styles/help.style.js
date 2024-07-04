import { Container, Avatar ,Typography} from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { styled } from '@mui/material/styles';

export const StyleContainer = styled(Container)(({ theme }) => ({
  height: '100vh',
}));

export const ChatbotIcon = styled(Avatar)(({ theme }) => ({
  position: 'fixed',
  right:'3rem',
  bottom:'3rem',
  cursor: 'pointer',
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: theme.shadows[4],
  // float:'right'
}));

export const ChatbotIon = styled(SmartToyIcon)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f5a623, #f76c6c, #f9d423, #3a7bd5)',
}));

export const HeaderTitle = styled(Typography)({
  fontFamily: 'Playfair Display, serif',
  fontWeight: 'bold',
  padding:'1rem',
  fontSize: '1.5rem',
});