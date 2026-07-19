import { createTheme } from '@mui/material/styles';

// Shared typography so both themes stay perfectly synced
const typography = {
  fontFamily: '"Inter", monospace',
  h1: { fontWeight: 800 },
  h3: { color: '#8ECAE6' },
};

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#023047', // Primary Deep Navy
      paper: '#000102',   // Secondary Darker Blue 
    },
    primary: {
      main: '#006D77',    // Deep Teal //'#006D77'
    },
    secondary: {
      main: '#8ECAE6',    //  Sky Blue
    },
    warning: {
      main: '#FFDD87',    // Gold accent
    },
    info: {
      main: '#006D77',//'#062726', // Dark Forest/Teal
    },
    text: {
      primary: '#ffffff',
      secondary: '#8ECAE6',
    },
  },
  typography,
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f0f4f8', // Soft slate-gray base for light mode
      paper: 'rgba(255, 255, 255, 0.7)', // Frosted white for cards
    },
    primary: {
      main: '#062726'//'#006D77',    // Using the Teal for better contrast on light mode
    },
    secondary: {
      main: '#8ECAE6',    
    },
    warning: {
      main: '#FFDD87',    
    },
    info: {
      main: '#062726',    
    },
    text: {
      primary: '#023047', // Dark navy text for readability
      secondary: '#006D77',
    },
  },
  typography,
});