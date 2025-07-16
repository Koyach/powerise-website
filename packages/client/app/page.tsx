'use client';

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';

export default function HomePage() {
  const theme = useTheme();

  return (
    <>
      {/* ヒーローセクション */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, rgba(27, 54, 93, 0.03) 0%, rgba(91, 164, 207, 0.05) 100%)',
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 16 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                mb: 4,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                lineHeight: { xs: 1.2, md: 1.1 },
                fontWeight: 700,
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
                mb: 6,
                color: theme.palette.text.secondary,
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                lineHeight: 1.7,
                fontWeight: 400,
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              パワライズは革新的なソリューションを通じて、
              <br className="hidden sm:block" />
              エネルギーとインフラの未来を創造します。
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  minWidth: 200,
                  boxShadow: '0 4px 20px rgba(27, 54, 93, 0.2)',
                }}
              >
                事業内容を見る
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  minWidth: 200,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                  },
                }}
              >
                お問い合わせ
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* 特徴セクション */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                mb: 3,
                color: theme.palette.primary.main,
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                fontWeight: 600,
              }}
            >
              私たちの強み
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 600,
                mx: 'auto',
                fontSize: '1.1rem',
                lineHeight: 1.8,
              }}
            >
              持続可能な社会の実現に向けて、
              <br className="hidden sm:block" />
              3つの主要事業領域で革新的なソリューションを提供しています。
            </Typography>
          </Box>
          
                    <Box 
            sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 4,
            }}
          >
            {[
              {
                title: 'エネルギー事業',
                description: '再生可能エネルギーの開発・運営を通じて、クリーンで持続可能なエネルギー供給を実現します。革新的な技術と豊富な経験により、効率的で環境に優しいエネルギーソリューションを提供いたします。',
              },
              {
                title: 'インフラ事業',
                description: '最新技術を活用したインフラソリューションで、社会基盤の強化と効率化を支援します。スマートシティの実現に向けて、次世代のインフラストラクチャを構築いたします。',
              },
              {
                title: '環境ソリューション',
                description: '環境負荷の軽減と資源の有効活用を促進する総合的なソリューションを提供します。持続可能な発展を支える環境技術で、地球の未来に貢献いたします。',
              },
            ].map((item, index) => (
              <Card
                key={index}
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 48px rgba(27, 54, 93, 0.15)',
                  },
                }}
              >
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      mb: 3,
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                      fontSize: '1.25rem',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.8,
                      color: theme.palette.text.primary,
                      flexGrow: 1,
                    }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA セクション */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          py: { xs: 8, md: 10 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <Typography 
              variant="h3" 
              component="h2" 
              sx={{ 
                mb: 3, 
                color: 'white',
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                fontWeight: 600,
              }}
            >
              お気軽にご相談ください
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 5, 
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: { xs: '1rem', sm: '1.125rem' },
                lineHeight: 1.7,
                maxWidth: 500,
                mx: 'auto',
              }}
            >
              持続可能な未来の実現に向けて、
              <br className="hidden sm:block" />
              一緒に取り組みませんか？
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: 'white',
                px: 6,
                py: 2.5,
                fontSize: '1.1rem',
                minWidth: 240,
                boxShadow: '0 4px 20px rgba(91, 164, 207, 0.3)',
                '&:hover': {
                  backgroundColor: theme.palette.secondary.dark,
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 32px rgba(91, 164, 207, 0.4)',
                },
              }}
            >
              お問い合わせはこちら
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
