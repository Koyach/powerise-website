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
    <Box sx={{ width: 250 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.href} component={Link} href={item.href}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar sx={{ minHeight: 72 }}>
            {/* ロゴ */}
            <Typography
              variant="h5"
              component={Link}
              href="/"
              sx={{
                flexGrow: isMobile ? 1 : 0,
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                mr: 4,
              }}
            >
              POWERISE
            </Typography>

            {/* デスクトップナビゲーション */}
            {!isMobile && (
              <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
                {navigationItems.map((item) => (
                  <Button
                    key={item.href}
                    component={Link}
                    href={item.href}
                    color="inherit"
                    sx={{
                      textTransform: 'none',
                      fontWeight: 500,
                      px: 3,
                      py: 1,
                      borderRadius: 1,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* 認証ボタン（デスクトップ） */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {user ? (
                  <>
                    <Button
                      component={Link}
                      href="/admin"
                      startIcon={<AdminPanelSettingsIcon />}
                      variant="outlined"
                      sx={{
                        color: 'white',
                        borderColor: 'white',
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
                      sx={{ color: 'white' }}
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
                    sx={{
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'white',
                      },
                    }}
                  >
                    ログイン
                  </Button>
                )}
                <Button
                  component={Link}
                  href="/contact"
                  variant="contained"
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    color: 'white',
                    '&:hover': {
                      backgroundColor: theme.palette.secondary.dark,
                    },
                  }}
                >
                  お問い合わせ
                </Button>
              </Box>
            )}

            {/* モバイルメニューボタン */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="メニューを開く"
                edge="end"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* モバイルドロワー */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}; 