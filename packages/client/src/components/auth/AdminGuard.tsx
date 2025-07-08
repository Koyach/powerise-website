'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuthStore } from '../../store/authStore';

interface AdminGuardProps {
  children: React.ReactNode;
}

export const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    // ローディングが完了し、ユーザーが存在しない場合はログインページにリダイレクト
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // ローディング中の表示
  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        gap={2}
      >
        <CircularProgress size={40} />
        <Typography variant="body1" color="text.secondary">
          認証状態を確認中...
        </Typography>
      </Box>
    );
  }

  // ユーザーが存在しない場合は何も表示しない（リダイレクト中）
  if (!user) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        gap={2}
      >
        <CircularProgress size={40} />
        <Typography variant="body1" color="text.secondary">
          ログインページにリダイレクト中...
        </Typography>
      </Box>
    );
  }

  // ユーザーが存在する場合のみ子コンポーネントをレンダリング
  return <>{children}</>;
}; 