'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Link from 'next/link';
import { useAuthStore } from '../../store/authStore';

const navigationItems = [
  { label: 'ホーム', href: '/' },
  { label: 'お知らせ', href: '/news' },
  { label: '事業内容', href: '/services' },
  { label: '会社情報', href: '/about' },
  { label: 'お問い合わせ', href: '/contact' },
];

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 280, height: '100%', backgroundColor: 'white' }}>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 3,
          borderBottom: `1px solid ${theme.palette.grey[200]}`,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: theme.palette.primary.main,
          }}
        >
          Menu
        </Typography>
        <IconButton onClick={handleDrawerToggle} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Box sx={{ p: 2 }}>
        {navigationItems.map((item) => (
          <ListItem 
            key={item.href} 
            component={Link} 
            href={item.href}
            sx={{
              borderRadius: 2,
              mb: 1,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: theme.palette.primary.main + '08',
                transform: 'translateX(4px)',
              },
            }}
          >
            <ListItemText 
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: 500,
                color: theme.palette.text.primary,
              }}
            />
          </ListItem>
        ))}
        
        <Divider sx={{ my: 3 }} />
        
        {/* 認証ボタン（モバイル） */}
        <Box sx={{ px: 2 }}>
          {user ? (
            <>
              <Button
                component={Link}
                href="/admin"
                startIcon={<AdminPanelSettingsIcon />}
                fullWidth
                variant="outlined"
                sx={{ mb: 2, justifyContent: 'flex-start' }}
              >
                管理画面
              </Button>
              <Button
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                fullWidth
                sx={{ justifyContent: 'flex-start' }}
              >
                ログアウト
              </Button>
            </>
          ) : (
            <Button
              component={Link}
              href="/login"
              startIcon={<LoginIcon />}
              fullWidth
              variant="outlined"
              sx={{ justifyContent: 'flex-start' }}
            >
              ログイン
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            {/* 左端：会社名ロゴタイプ */}
            <Box component={Link} href="/" sx={{ textDecoration: 'none' }}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: 'white',
                    fontSize: { xs: '0.9rem', sm: '1.1rem' },
                    lineHeight: 1.2,
                    letterSpacing: '0.02em',
                  }}
                >
                  一般社団法人パワライズ
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: { xs: '0.7rem', sm: '0.8rem' },
                    fontWeight: 400,
                    letterSpacing: '0.1em',
                  }}
                >
                  POWERISE
                </Typography>
              </Box>
            </Box>

            {/* デスクトップナビゲーション（中央） */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {navigationItems.map((item) => (
                  <Button
                    key={item.href}
                    component={Link}
                    href={item.href}
                    color="inherit"
                    sx={{
                      textTransform: 'none',
                      fontWeight: 400,
                      px: 3,
                      py: 1.5,
                      borderRadius: 2,
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        transform: 'translateY(-1px)',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* 右端：メニューボタン（モバイル）または認証ボタン（デスクトップ） */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {!isMobile && (
                <>
                  {user ? (
                    <>
                      <Button
                        component={Link}
                        href="/admin"
                        startIcon={<AdminPanelSettingsIcon />}
                        variant="outlined"
                        size="small"
                        sx={{
                          color: 'white',
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            borderColor: 'white',
                          },
                        }}
                      >
                        管理画面
                      </Button>
                      <Button
                        onClick={handleLogout}
                        startIcon={<LogoutIcon />}
                        size="small"
                        sx={{ 
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          },
                        }}
                      >
                        ログアウト
                      </Button>
                    </>
                  ) : (
                    <Button
                      component={Link}
                      href="/login"
                      startIcon={<LoginIcon />}
                      variant="outlined"
                      size="small"
                      sx={{
                        color: 'white',
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          borderColor: 'white',
                        },
                      }}
                    >
                      ログイン
                    </Button>
                  )}
                </>
              )}
              
              {/* ハンバーガーメニューボタン */}
              <Button
                onClick={handleDrawerToggle}
                variant="outlined"
                size="small"
                startIcon={<MenuIcon />}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  minWidth: { xs: '80px', sm: '90px' },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'white',
                  },
                }}
              >
                Menu
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* モバイル・デスクトップ共通ドロワー */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
            boxShadow: '0 8px 40px rgba(27, 54, 93, 0.15)',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}; 