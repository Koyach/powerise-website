'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  Grid,
  Paper,
  CircularProgress,
  useTheme,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  Send,
  CheckCircle,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { inquiriesApi, handleApiError } from '../../src/lib/api';
import { InquiryCategory, InquiryCategoryLabels, InquiryFormData } from '../../src/types/api';

export default function ContactPage() {
  const theme = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormData>();

  const onSubmit = async (data: InquiryFormData) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const response = await inquiriesApi.createInquiry({
        name: data.name,
        email: data.email,
        company: data.company || undefined,
        phone: data.phone || undefined,
        subject: data.subject,
        message: data.message,
        category: data.category,
      });

      if (response.success) {
        setSubmitSuccess(true);
        reset();
      } else {
        throw new Error(response.error || 'お問い合わせの送信に失敗しました');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setSubmitError(handleApiError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSubmitSuccess(false);
    setSubmitError(null);
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
          お問い合わせ
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.secondary,
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          パワライズに関するご質問やご相談は、こちらからお気軽にお問い合わせください
        </Typography>
      </Box>

      <Grid container spacing={6}>
        {/* 問い合わせフォーム */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
                お問い合わせフォーム
              </Typography>

              <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={3}>
                  {/* お名前 */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...register('name', {
                        required: 'お名前を入力してください',
                        minLength: {
                          value: 2,
                          message: 'お名前は2文字以上で入力してください',
                        },
                      })}
                      fullWidth
                      label="お名前"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      required
                    />
                  </Grid>

                  {/* メールアドレス */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...register('email', {
                        required: 'メールアドレスを入力してください',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: '正しいメールアドレスを入力してください',
                        },
                      })}
                      fullWidth
                      label="メールアドレス"
                      type="email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      required
                    />
                  </Grid>

                  {/* 会社名 */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...register('company')}
                      fullWidth
                      label="会社名・団体名"
                    />
                  </Grid>

                  {/* 電話番号 */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...register('phone', {
                        pattern: {
                          value: /^[0-9-+().\s]+$/,
                          message: '正しい電話番号を入力してください',
                        },
                      })}
                      fullWidth
                      label="電話番号"
                      type="tel"
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                    />
                  </Grid>

                  {/* お問い合わせ種別 */}
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required error={!!errors.category}>
                      <InputLabel>お問い合わせ種別</InputLabel>
                      <Select
                        {...register('category', {
                          required: 'お問い合わせ種別を選択してください',
                        })}
                        label="お問い合わせ種別"
                        defaultValue=""
                      >
                        {Object.entries(InquiryCategoryLabels).map(([key, label]) => (
                          <MenuItem key={key} value={key}>
                            {label}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.category && (
                        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                          {errors.category.message}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>

                  {/* 件名 */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...register('subject', {
                        required: '件名を入力してください',
                        minLength: {
                          value: 5,
                          message: '件名は5文字以上で入力してください',
                        },
                      })}
                      fullWidth
                      label="件名"
                      error={!!errors.subject}
                      helperText={errors.subject?.message}
                      required
                    />
                  </Grid>

                  {/* お問い合わせ内容 */}
                  <Grid item xs={12}>
                    <TextField
                      {...register('message', {
                        required: 'お問い合わせ内容を入力してください',
                        minLength: {
                          value: 10,
                          message: 'お問い合わせ内容は10文字以上で入力してください',
                        },
                      })}
                      fullWidth
                      label="お問い合わせ内容"
                      multiline
                      rows={6}
                      error={!!errors.message}
                      helperText={errors.message?.message}
                      required
                    />
                  </Grid>

                  {/* 送信ボタン */}
                  <Grid item xs={12}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        startIcon={isSubmitting ? <CircularProgress size={20} /> : <Send />}
                        disabled={isSubmitting}
                        sx={{
                          px: 4,
                          py: 1.5,
                          fontSize: '1.1rem',
                        }}
                      >
                        {isSubmitting ? '送信中...' : 'お問い合わせを送信'}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 連絡先情報 */}
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
              連絡先情報
            </Typography>

            <Paper sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Email sx={{ mr: 2, color: theme.palette.primary.main }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    メール
                  </Typography>
                  <Typography variant="body1">
                    info@powerise.com
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Phone sx={{ mr: 2, color: theme.palette.primary.main }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    電話番号
                  </Typography>
                  <Typography variant="body1">
                    03-1234-5678
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <LocationOn sx={{ mr: 2, color: theme.palette.primary.main }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    所在地
                  </Typography>
                  <Typography variant="body1">
                    〒100-0001<br />
                    東京都千代田区千代田1-1-1<br />
                    パワライズビル 10F
                  </Typography>
                </Box>
              </Box>
            </Paper>

            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                営業時間
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                平日: 9:00 - 18:00
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                土日祝日: 休業
              </Typography>
              <Typography variant="caption" color="text.secondary">
                ※お問い合わせフォームは24時間受付しております
              </Typography>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      {/* 成功・エラー通知 */}
      <Snackbar
        open={submitSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          icon={<CheckCircle />}
          sx={{ width: '100%' }}
        >
          お問い合わせを受け付けました。担当者よりご連絡いたします。
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!submitError}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: '100%' }}
        >
          {submitError}
        </Alert>
      </Snackbar>
    </Container>
  );
} 