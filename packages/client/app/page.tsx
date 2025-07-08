'use client';

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  useTheme,
} from '@mui/material';

export default function HomePage() {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* ヒーローセクション */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            mb: 3,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          エネルギーとインフラの力で
          <br />
          持続可能な社会を
        </Typography>
        <Typography
          variant="h5"
          component="p"
          sx={{
            mb: 4,
            color: theme.palette.text.secondary,
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          パワライズは革新的なソリューションを通じて、
          エネルギーとインフラの未来を創造します。
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
            }}
          >
            事業内容を見る
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
            }}
          >
            お問い合わせ
          </Button>
        </Box>
      </Box>

      {/* 特徴セクション */}
      <Box sx={{ mb: 8 }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            mb: 6,
            textAlign: 'center',
            color: theme.palette.primary.main,
          }}
        >
          私たちの強み
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
          }}
        >
          {[
            {
              title: 'エネルギー事業',
              description: '再生可能エネルギーの開発・運営を通じて、クリーンで持続可能なエネルギー供給を実現します。',
            },
            {
              title: 'インフラ事業',
              description: '最新技術を活用したインフラソリューションで、社会基盤の強化と効率化を支援します。',
            },
            {
              title: '環境ソリューション',
              description: '環境負荷の軽減と資源の有効活用を促進する総合的なソリューションを提供します。',
            },
          ].map((item, index) => (
            <Card
              key={index}
              sx={{
                flex: 1,
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{
                    mb: 2,
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.8,
                    color: theme.palette.text.secondary,
                  }}
                >
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* CTA セクション */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          borderRadius: 3,
          p: 6,
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" component="h2" sx={{ mb: 2 }}>
          お気軽にご相談ください
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
          持続可能な未来の実現に向けて、一緒に取り組みませんか？
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: 'white',
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            '&:hover': {
              backgroundColor: theme.palette.secondary.dark,
            },
          }}
        >
          お問い合わせはこちら
        </Button>
      </Box>
    </Container>
  );
}
