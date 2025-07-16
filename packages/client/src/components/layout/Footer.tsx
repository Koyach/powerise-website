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
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ py: 6 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 4, md: 6 },
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
                  mb: 2,
                }}
              >
                POWERISE
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.8 }}>
                エネルギーとインフラの力で、<br />
                持続可能な社会の実現を目指します。
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
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
                gap: { xs: 4, sm: 6 },
              }}
            >
              {Object.entries(footerLinks).map(([key, section]) => (
                <Box key={key} sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      mb: 2,
                      fontSize: '1rem',
                      fontWeight: 600,
                    }}
                  >
                    {section.title}
                  </Typography>
                  <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                    {section.links.map((link) => (
                      <Box component="li" key={link.href} sx={{ mb: 1 }}>
                        <MuiLink
                          component={Link}
                          href={link.href}
                          color="inherit"
                          underline="none"
                          sx={{
                            fontSize: '0.875rem',
                            opacity: 0.8,
                            transition: 'opacity 0.2s',
                            '&:hover': {
                              opacity: 1,
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

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />

        {/* コピーライト */}
        <Box
          sx={{
            py: 3,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © 2024 POWERISE Corporation. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <MuiLink
              component={Link}
              href="/privacy"
              color="inherit"
              underline="none"
              sx={{
                fontSize: '0.875rem',
                opacity: 0.7,
                '&:hover': { opacity: 1 },
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
                opacity: 0.7,
                '&:hover': { opacity: 1 },
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