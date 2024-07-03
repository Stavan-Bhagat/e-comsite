import { Container, Avatar } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { styled } from '@mui/material/styles';

export const StyleContainer = styled(Container)(({ theme }) => ({
  height: '100vh',
}));

export const ChatbotIcon = styled(Avatar)(({ theme }) => ({
  position: 'sticky',
  zIndex: theme.zIndex.drawer + 1,
}));

export const ChatbotIon = styled(SmartToyIcon)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f5a623, #f76c6c, #f9d423, #3a7bd5)',
}));
