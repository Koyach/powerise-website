'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link as MuiLink,
  Divider,
  useTheme,
} from '@mui/material';
import Link from 'next/link';

const footerLinks = {
  company: {
    title: '会社情報',
    links: [
      { label: '会社概要', href: '/about' },
      { label: '経営理念', href: '/about/philosophy' },
      { label: '沿革', href: '/about/history' },
      { label: 'アクセス', href: '/about/access' },
    ],
  },
  services: {
    title: '事業内容',
    links: [
      { label: 'エネルギー事業', href: '/services/energy' },
      { label: 'インフラ事業', href: '/services/infrastructure' },
      { label: '環境ソリューション', href: '/services/environment' },
      { label: 'コンサルティング', href: '/services/consulting' },
    ],
  },
  support: {
    title: 'サポート',
    links: [
      { label: 'お知らせ', href: '/news' },
      { label: 'よくある質問', href: '/faq' },
      { label: 'お問い合わせ', href: '/contact' },
      { label: 'プライバシーポリシー', href: '/privacy' },
    ],
  },
};

export const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#FAFAFA',
        borderTop: '1px solid rgba(44, 62, 80, 0.08)',
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ py: 12 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 8, md: 12 },
            }}
          >
            {/* ロゴとコンパニー情報 */}
            <Box sx={{ flex: { xs: '1', md: '2' } }}>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  mb: 4,
                  color: theme.palette.text.primary,
                }}
              >
                POWERISE
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 4, 
                  lineHeight: 1.8,
                  color: theme.palette.text.primary,
                }}
              >
                エネルギーとインフラの力で、
                <br />
                持続可能な社会の実現を目指します。
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: theme.palette.text.secondary,
                  lineHeight: 1.8,
                }}
              >
                一般社団法人パワライズ
                <br />
                〒100-0001 東京都千代田区千代田1-1-1
                <br />
                TEL: 03-1234-5678
              </Typography>
            </Box>

            {/* フッターリンク */}
            <Box
              sx={{
                flex: '3',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 6, sm: 8 },
              }}
            >
              {Object.entries(footerLinks).map(([key, section]) => (
                <Box key={key} sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      mb: 3,
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {section.title}
                  </Typography>
                  <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                    {section.links.map((link) => (
                      <Box component="li" key={link.href} sx={{ mb: 2 }}>
                        <MuiLink
                          component={Link}
                          href={link.href}
                          color="inherit"
                          underline="none"
                          sx={{
                            fontSize: '0.875rem',
                            color: theme.palette.text.secondary,
                            transition: 'color 0.2s',
                            '&:hover': {
                              color: theme.palette.secondary.main,
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          {link.label}
                        </MuiLink>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(44, 62, 80, 0.08)' }} />

        {/* コピーライト */}
        <Box
          sx={{
            py: 6,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: theme.palette.text.secondary,
            }}
          >
            © 2024 POWERISE Corporation. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <MuiLink
              component={Link}
              href="/privacy"
              color="inherit"
              underline="none"
              sx={{
                fontSize: '0.875rem',
                color: theme.palette.text.secondary,
                '&:hover': { 
                  color: theme.palette.secondary.main,
                  textDecoration: 'underline',
                },
              }}
            >
              プライバシーポリシー
            </MuiLink>
            <MuiLink
              component={Link}
              href="/terms"
              color="inherit"
              underline="none"
              sx={{
                fontSize: '0.875rem',
                color: theme.palette.text.secondary,
                '&:hover': { 
                  color: theme.palette.secondary.main,
                  textDecoration: 'underline',
                },
              }}
            >
              利用規約
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}; 