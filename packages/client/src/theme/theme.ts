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
      main: '#2C3E50', // ダークグレー（メインテキスト色）
      light: '#5A6C7D',
      dark: '#1A252F',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#4A90B8', // 落ち着いた青色（アクセント用）
      light: '#6BA3C7',
      dark: '#357299',
      contrastText: '#FFFFFF',
    },
    accent: {
      main: '#5BA4CF', // より明るい青（ボタンなど）
      light: '#78B5D6',
      dark: '#4A90B8',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#2C3E50', // ダークグレー（メインテキスト）
      secondary: '#5A6C7D', // ミディアムグレー（サブテキスト）
      disabled: '#9FB6CE',
    },
    background: {
      default: '#FFFFFF', // 純白
      paper: '#FFFFFF', // カードも純白
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#2C3E50',
    },
    divider: 'rgba(44, 62, 80, 0.08)',
  },
  typography: {
    // よりシンプルなフォント設定
    fontFamily: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic Medium", "Meiryo", "MS Gothic", sans-serif',
    h1: {
      fontFamily: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic Medium", "Meiryo", "MS Gothic", sans-serif',
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      color: '#2C3E50',
    },
    h2: {
      fontFamily: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic Medium", "Meiryo", "MS Gothic", sans-serif',
      fontWeight: 600,
      fontSize: '2.25rem',
      lineHeight: 1.3,
      color: '#2C3E50',
    },
    h3: {
      fontFamily: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic Medium", "Meiryo", "MS Gothic", sans-serif',
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.4,
      color: '#2C3E50',
    },
    h4: {
      fontFamily: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic Medium", "Meiryo", "MS Gothic", sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      color: '#2C3E50',
    },
    h5: {
      fontFamily: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic Medium", "Meiryo", "MS Gothic", sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.5,
      color: '#2C3E50',
    },
    h6: {
      fontFamily: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic Medium", "Meiryo", "MS Gothic", sans-serif',
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.5,
      color: '#2C3E50',
    },
    body1: {
      fontFamily: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic Medium", "Meiryo", "MS Gothic", sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.9, // より広い行間
      letterSpacing: '0.02em',
      color: '#2C3E50',
    },
    body2: {
      fontFamily: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic Medium", "Meiryo", "MS Gothic", sans-serif',
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.8,
      letterSpacing: '0.01em',
      color: '#5A6C7D',
    },
    button: {
      fontFamily: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic Medium", "Meiryo", "MS Gothic", sans-serif',
      fontWeight: 500,
      fontSize: '0.9rem',
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 4, // より控えめな角丸
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 500,
          padding: '16px 40px', // より大きなパディング
          boxShadow: 'none',
          minHeight: 48,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: 'none',
            transform: 'none',
          },
        },
        contained: {
          backgroundColor: '#4A90B8',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#357299',
          },
        },
        outlined: {
          borderWidth: 1,
          borderColor: '#4A90B8',
          color: '#4A90B8',
          '&:hover': {
            borderWidth: 1,
            backgroundColor: 'rgba(74, 144, 184, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          border: '1px solid rgba(44, 62, 80, 0.08)',
          backgroundColor: '#FFFFFF',
          '&:hover': {
            boxShadow: '0 4px 24px rgba(44, 62, 80, 0.08)',
            transform: 'translateY(-2px)',
            transition: 'all 0.3s ease-in-out',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '48px !important', // 非常に豊富なパディング
          '&:last-child': {
            paddingBottom: '48px !important',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#2C3E50',
          boxShadow: '0 1px 3px rgba(44, 62, 80, 0.08)',
          borderBottom: '1px solid rgba(44, 62, 80, 0.08)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '48px !important', // 非常に豊富な左右余白
          paddingRight: '48px !important',
          '@media (max-width: 600px)': {
            paddingLeft: '24px !important',
            paddingRight: '24px !important',
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '80px !important',
          padding: '0 !important',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          marginBottom: 0,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(44, 62, 80, 0.08)',
        },
      },
    },
  },
}); 