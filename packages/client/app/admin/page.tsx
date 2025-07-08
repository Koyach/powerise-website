'use client';

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import {
  Dashboard,
  Article,
  People,
  Settings,
  ExitToApp,
  AccountCircle,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../src/store/authStore';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const menuItems = [
    {
      title: 'お知らせ管理',
      description: 'お知らせの作成・編集・削除',
      icon: <Article fontSize="large" />,
      color: 'primary',
      href: '/admin/news',
    },
    {
      title: 'ユーザー管理',
      description: 'ユーザーアカウントの管理',
      icon: <People fontSize="large" />,
      color: 'secondary',
      href: '/admin/users',
    },
    {
      title: 'サイト設定',
      description: 'サイト全体の設定管理',
      icon: <Settings fontSize="large" />,
      color: 'info',
      href: '/admin/settings',
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* 管理者用ヘッダー */}
      <AppBar position="static">
        <Toolbar>
          <Dashboard sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            POWERISE 管理システム
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccountCircle />
              <Typography variant="body2">
                {user?.email}
              </Typography>
            </Box>
            <Button
              color="inherit"
              startIcon={<ExitToApp />}
              onClick={handleLogout}
            >
              ログアウト
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* メインコンテンツ */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* ウェルカムセクション */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            ダッシュボード
          </Typography>
          <Typography variant="body1" color="text.secondary">
            管理者機能にアクセスできます。
          </Typography>
        </Box>

        {/* ユーザー情報カード */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}>
                <AccountCircle sx={{ fontSize: 40 }} />
              </Avatar>
              <Box>
                <Typography variant="h6">
                  管理者アカウント
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.email}
                </Typography>
                <Chip
                  label="ログイン中"
                  color="success"
                  size="small"
                  sx={{ mt: 1 }}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* 管理メニュー */}
        <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
          管理メニュー
        </Typography>
        
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {menuItems.map((item, index) => (
            <Box key={index}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
                onClick={() => router.push(item.href)}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Box
                    sx={{
                      color: `${item.color}.main`,
                      mb: 2,
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                                 </CardContent>
               </Card>
             </Box>
           ))}
        </Box>

        {/* システム情報 */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
            システム情報
          </Typography>
          <Card>
                         <CardContent>
               <Box
                 sx={{
                   display: 'grid',
                   gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                   gap: 2,
                 }}
               >
                 <Box>
                   <Typography variant="body2" color="text.secondary">
                     最終ログイン
                   </Typography>
                   <Typography variant="body1">
                     {new Date().toLocaleString('ja-JP')}
                   </Typography>
                 </Box>
                 <Box>
                   <Typography variant="body2" color="text.secondary">
                     システムバージョン
                   </Typography>
                   <Typography variant="body1">
                     v1.0.0
                   </Typography>
                 </Box>
               </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
} 