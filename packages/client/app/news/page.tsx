'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  CircularProgress,
  Alert,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { newsApi, handleApiError } from '../../src/lib/api';
import { News, NewsCategory, NewsCategoryLabels } from '../../src/types/api';

const NEWS_PER_PAGE = 9;

export default function NewsPage() {
  const theme = useTheme();
  const router = useRouter();
  
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchNews = async (page: number = 1, selectedCategory?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        limit: NEWS_PER_PAGE,
        offset: (page - 1) * NEWS_PER_PAGE,
        ...(selectedCategory && selectedCategory !== '' ? { category: selectedCategory } : {})
      };
      
      const response = await newsApi.getPublishedNews(params);
      
      if (response.success && response.data) {
        setNews(response.data.items);
        setTotalItems(response.data.total);
        setTotalPages(Math.ceil(response.data.total / NEWS_PER_PAGE));
      } else {
        throw new Error(response.error || 'ニュースの取得に失敗しました');
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(1, category);
    setCurrentPage(1);
  }, [category]);

  const handleCategoryChange = (event: any) => {
    setCategory(event.target.value);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    fetchNews(page, category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsClick = (slug: string) => {
    router.push(`/news/${slug}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* ヘッダーセクション */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            mb: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          ニュース・お知らせ
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.secondary,
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          パワライズの最新情報やプロジェクトの進捗をお知らせします
        </Typography>
      </Box>

      {/* フィルターセクション */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          {totalItems > 0 && `${totalItems}件のニュースがあります`}
        </Typography>
        
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>カテゴリー</InputLabel>
          <Select
            value={category}
            onChange={handleCategoryChange}
            label="カテゴリー"
          >
            <MenuItem value="">すべて</MenuItem>
            {Object.entries(NewsCategoryLabels).map(([key, label]) => (
              <MenuItem key={key} value={key}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* エラー表示 */}
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {/* ローディング表示 */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} />
        </Box>
      )}

      {/* ニュース一覧 */}
      {!loading && !error && (
        <>
          {news.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                該当するニュースがありません
              </Typography>
            </Box>
          ) : (
                         <Grid container spacing={4}>
               {news.map((article) => (
                 <Grid item xs={12} sm={6} md={4} key={article.id}>
                  <Card
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.shadows[8],
                      },
                    }}
                    onClick={() => handleNewsClick(article.slug)}
                  >
                    {article.featuredImage && (
                      <CardMedia
                        component="img"
                        height="200"
                        image={article.featuredImage}
                        alt={article.title}
                        sx={{
                          objectFit: 'cover',
                        }}
                      />
                    )}
                    <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ mb: 2 }}>
                        <Chip
                          label={NewsCategoryLabels[article.category]}
                          size="small"
                          color="primary"
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(article.publishedAt || '')}
                        </Typography>
                      </Box>
                      
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          mb: 2,
                          fontWeight: 600,
                          lineHeight: 1.3,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {article.title}
                      </Typography>
                      
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          flexGrow: 1,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          lineHeight: 1.6,
                        }}
                      >
                        {article.excerpt}
                      </Typography>

                      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          {article.author.displayName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {article.views} views
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* ページネーション */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
} 