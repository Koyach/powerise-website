'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Chip,
  Button,
  Avatar,
  Divider,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link,
  useTheme,
} from '@mui/material';
import {
  ArrowBack,
  Share,
  Visibility,
  Person,
  CalendarToday,
} from '@mui/icons-material';
import { useRouter, useParams } from 'next/navigation';
import { newsApi, handleApiError } from '../../../src/lib/api';
import { News, NewsCategoryLabels } from '../../../src/types/api';

export default function NewsDetailPage() {
  const theme = useTheme();
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  
  const [article, setArticle] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchArticle(slug);
    }
  }, [slug]);

  const fetchArticle = async (articleSlug: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await newsApi.getNewsBySlug(articleSlug);
      
      if (response.success && response.data) {
        setArticle(response.data);
      } else {
        throw new Error(response.error || '記事の取得に失敗しました');
      }
    } catch (err) {
      console.error('Error fetching article:', err);
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/news');
  };

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt || '',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Sharing failed:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // TODO: Show toast notification
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          variant="outlined"
        >
          ニュース一覧に戻る
        </Button>
      </Container>
    );
  }

  if (!article) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="warning" sx={{ mb: 4 }}>
          記事が見つかりません
        </Alert>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          variant="outlined"
        >
          ニュース一覧に戻る
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* ブレッドクラム */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          color="inherit"
          href="/"
          sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          ホーム
        </Link>
        <Link
          color="inherit"
          href="/news"
          sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
        >
          ニュース
        </Link>
        <Typography color="text.primary">
          {article.title}
        </Typography>
      </Breadcrumbs>

      {/* 戻るボタンとシェアボタン */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          variant="outlined"
          size="small"
        >
          一覧に戻る
        </Button>
        <Button
          startIcon={<Share />}
          onClick={handleShare}
          variant="outlined"
          size="small"
        >
          シェア
        </Button>
      </Box>

      {/* 記事ヘッダー */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ mb: 2 }}>
          <Chip
            label={NewsCategoryLabels[article.category]}
            color="primary"
            sx={{ mb: 1 }}
          />
        </Box>
        
        <Typography
          variant="h3"
          component="h1"
          sx={{
            mb: 3,
            fontWeight: 600,
            lineHeight: 1.2,
            color: theme.palette.text.primary,
          }}
        >
          {article.title}
        </Typography>

        {article.excerpt && (
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              color: theme.palette.text.secondary,
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            {article.excerpt}
          </Typography>
        )}

        {/* 記事メタ情報 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 3,
            mb: 3,
            color: theme.palette.text.secondary,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Person fontSize="small" />
            <Typography variant="body2">
              {article.author.displayName}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarToday fontSize="small" />
            <Typography variant="body2">
              {formatDate(article.publishedAt || '')}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Visibility fontSize="small" />
            <Typography variant="body2">
              {article.views} views
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* 記事の画像 */}
      {article.featuredImage && (
        <Box sx={{ mb: 4 }}>
          <Box
            component="img"
            src={article.featuredImage}
            alt={article.title}
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: 400,
              objectFit: 'cover',
              borderRadius: 2,
              boxShadow: theme.shadows[4],
            }}
          />
        </Box>
      )}

      <Divider sx={{ mb: 4 }} />

      {/* 記事本文 */}
      <Box
        sx={{
          '& h1, & h2, & h3, & h4, & h5, & h6': {
            color: theme.palette.primary.main,
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(2),
            fontWeight: 600,
          },
          '& h2': {
            fontSize: '1.75rem',
            borderBottom: `2px solid ${theme.palette.primary.main}`,
            paddingBottom: theme.spacing(1),
          },
          '& p': {
            marginBottom: theme.spacing(2),
            lineHeight: 1.8,
            fontSize: '1.1rem',
          },
          '& img': {
            maxWidth: '100%',
            height: 'auto',
            borderRadius: theme.spacing(1),
            margin: theme.spacing(2, 0),
          },
          '& ul, & ol': {
            paddingLeft: theme.spacing(3),
            marginBottom: theme.spacing(2),
          },
          '& li': {
            marginBottom: theme.spacing(0.5),
            lineHeight: 1.6,
          },
          '& blockquote': {
            borderLeft: `4px solid ${theme.palette.primary.main}`,
            paddingLeft: theme.spacing(2),
            margin: theme.spacing(2, 0),
            fontStyle: 'italic',
            color: theme.palette.text.secondary,
          },
          '& code': {
            backgroundColor: theme.palette.grey[100],
            padding: theme.spacing(0.2, 0.5),
            borderRadius: theme.spacing(0.5),
            fontSize: '0.9em',
          },
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: article.content || '' }} />
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* 記事フッター */}
      <Box sx={{ textAlign: 'center' }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          variant="contained"
          size="large"
          sx={{ px: 4 }}
        >
          ニュース一覧に戻る
        </Button>
      </Box>
    </Container>
  );
} 