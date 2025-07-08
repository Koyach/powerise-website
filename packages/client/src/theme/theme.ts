import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
  }

  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#003366',
      light: '#335577',
      dark: '#001122',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#00AEEF',
      light: '#33BEEF',
      dark: '#0088CC',
      contrastText: '#FFFFFF',
    },
    accent: {
      main: '#78C000',
      light: '#88D000',
      dark: '#669900',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
      disabled: '#999999',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F7FA',
    },
    grey: {
      50: '#F5F7FA',
      100: '#E8EEF5',
      200: '#D1DCE8',
      300: '#B8C9DB',
      400: '#9FB6CE',
      500: '#86A3C1',
      600: '#6D90B4',
      700: '#547DA7',
      800: '#3B6A9A',
      900: '#22578D',
    },
  },
  typography: {
    fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontFamily: 'Montserrat, Roboto, "Helvetica Neue", Arial, sans-serif',
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: 'Montserrat, Roboto, "Helvetica Neue", Arial, sans-serif',
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: 'Montserrat, Roboto, "Helvetica Neue", Arial, sans-serif',
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: 'Montserrat, Roboto, "Helvetica Neue", Arial, sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontFamily: 'Montserrat, Roboto, "Helvetica Neue", Arial, sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontFamily: 'Montserrat, Roboto, "Helvetica Neue", Arial, sans-serif',
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body1: {
      fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
      fontWeight: 500,
      fontSize: '0.875rem',
      textTransform: 'none',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #003366 0%, #004488 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #002244 0%, #003366 100%)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          border: '1px solid #E8EEF5',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #003366 0%, #004488 100%)',
          boxShadow: '0 2px 12px rgba(0, 51, 102, 0.2)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
}); 