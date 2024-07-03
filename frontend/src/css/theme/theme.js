import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
  },
  boxShadow: {
    main: 'rgba(81, 104, 83, 0.3)',
    secondary: 'rgba(255, 255, 255, 0.5)',
  },

});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bb86fc',
    },
    secondary: {
      main: '#03dac6',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#b0b0b0',
    },
    border: {
      main: '#9575cd',
      secondary: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',

    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
  },
  boxShadow: {
    main: 'rgba(255, 255, 255, 0.5)',
    secondary: 'rgba(81, 104, 83, 0.3)',
  },

});

export { lightTheme, darkTheme };
