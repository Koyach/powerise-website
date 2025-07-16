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
      main: '#1B365D', // より深く落ち着いたネイビー
      light: '#4A6B8A',
      dark: '#0F1F2E',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#5BA4CF', // より落ち着いたスカイブルー
      light: '#87C1E0',
      dark: '#3A7AA0',
      contrastText: '#FFFFFF',
    },
    accent: {
      main: '#78C000',
      light: '#88D000',
      dark: '#669900',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#2C3E50', // より濃いグレー（デザイン要件の「濃いグレー」）
      secondary: '#5A6C7D', // より知的な印象のグレー
      disabled: '#9FB6CE',
    },
    background: {
      default: '#FFFFFF', // クリーンな白背景
      paper: '#FAFBFC', // ほんのりグレーがかった白
    },
    grey: {
      50: '#F8F9FA',
      100: '#E9ECEF',
      200: '#DEE2E6',
      300: '#CED4DA',
      400: '#ADB5BD',
      500: '#6C757D',
      600: '#495057',
      700: '#343A40',
      800: '#212529',
      900: '#1B365D',
    },
  },
  typography: {
    // ゴシック体に統一（日本語向け）
    fontFamily: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic Medium", "Meiryo", "MS Gothic", sans-serif',
    h1: {
      fontFamily: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic Medium", "Meiryo", "MS Gothic", sans-serif',
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      marginBottom: '2rem',
    },
    h2: {
      fontFamily: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic Medium", "Meiryo", "MS Gothic", sans-serif',
      fontWeight: 600,
      fontSize: '2.25rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      marginBottom: '1.5rem',
    },
    h3: {
      fontFamily: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic Medium", "Meiryo", "MS Gothic", sans-serif',
      fontWeight: 600,
      fontSize: '1.875rem',
      lineHeight: 1.3,
      marginBottom: '1.25rem',
    },
    h4: {
      fontFamily: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic Medium", "Meiryo", "MS Gothic", sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.35,
      marginBottom: '1rem',
    },
    h5: {
      fontFamily: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic Medium", "Meiryo", "MS Gothic", sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
      marginBottom: '0.75rem',
    },
    h6: {
      fontFamily: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic Medium", "Meiryo", "MS Gothic", sans-serif',
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.45,
      marginBottom: '0.5rem',
    },
    body1: {
      fontFamily: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic Medium", "Meiryo", "MS Gothic", sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.8, // より広めの行間でゆったりとした印象
      letterSpacing: '0.02em',
    },
    body2: {
      fontFamily: '"Hiragino Kaku Gothic ProN", "Hiragino Sans", "Yu Gothic Medium", "Meiryo", "MS Gothic", sans-serif',
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.7,
      letterSpacing: '0.01em',
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
    borderRadius: 6, // より控えめな角丸
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: 'none',
          fontWeight: 500,
          padding: '12px 32px', // より豊富なパディング
          boxShadow: 'none',
          minHeight: 48,
          '&:hover': {
            boxShadow: '0 4px 20px rgba(27, 54, 93, 0.15)',
            transform: 'translateY(-1px)',
            transition: 'all 0.2s ease-in-out',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #1B365D 0%, #2A4A73 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #0F1F2E 0%, #1B365D 100%)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            backgroundColor: 'rgba(27, 54, 93, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 24px rgba(27, 54, 93, 0.08)',
          border: '1px solid rgba(27, 54, 93, 0.08)',
          padding: 8, // 内部余白を追加
          '&:hover': {
            boxShadow: '0 8px 40px rgba(27, 54, 93, 0.12)',
            transform: 'translateY(-2px)',
            transition: 'all 0.3s ease-in-out',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '32px !important', // より豊富なカード内パディング
          '&:last-child': {
            paddingBottom: '32px !important',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #1B365D 0%, #2A4A73 100%)',
          boxShadow: '0 2px 20px rgba(27, 54, 93, 0.15)',
          backdropFilter: 'blur(8px)',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '32px !important', // より豊富な左右余白
          paddingRight: '32px !important',
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
          minHeight: '80px !important', // より高いヘッダー
          padding: '0 !important',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          marginBottom: 0, // デフォルトのマージンをリセット
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
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