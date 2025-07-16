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
          backgroundColor: '#FFFFFF',
          pt: { xs: 12, md: 20 },
          pb: { xs: 16, md: 24 },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                mb: 6,
                color: theme.palette.text.primary,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                lineHeight: { xs: 1.3, md: 1.2 },
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
                mb: 10,
                color: theme.palette.text.secondary,
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                lineHeight: 1.8,
                fontWeight: 400,
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              パワライズは革新的なソリューションを通じて、
              <br />
              エネルギーとインフラの未来を創造します。
            </Typography>
            <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  px: 6,
                  py: 3,
                  fontSize: '1.1rem',
                  minWidth: 200,
                  fontWeight: 500,
                }}
              >
                事業内容を見る
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  px: 6,
                  py: 3,
                  fontSize: '1.1rem',
                  minWidth: 200,
                  fontWeight: 500,
                }}
              >
                お問い合わせ
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* 事業内容と業務イメージセクション */}
      <Box sx={{ 
        py: { xs: 12, md: 20 },
        backgroundColor: '#FFFFFF',
      }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: { xs: 8, md: 12 },
            }}
          >
            {/* 左側：事業内容説明 */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  color: theme.palette.secondary.main,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                01. Our Business
              </Typography>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  mb: 4,
                  color: theme.palette.text.primary,
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                  fontWeight: 600,
                  lineHeight: 1.3,
                }}
              >
                エネルギーと<br />インフラの専門家として
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 6,
                  color: theme.palette.text.primary,
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                }}
              >
                私たちは再生可能エネルギーの開発から最新のインフラソリューションまで、持続可能な社会基盤の構築に取り組んでいます。豊富な技術的知見と革新的なアプローチにより、お客様の課題解決と社会の発展に貢献いたします。
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.primary,
                  fontSize: '1rem',
                  lineHeight: 1.8,
                }}
              >
                データに基づく戦略的な分析と、現場での実践的な経験を組み合わせることで、真に価値あるソリューションを提供し続けています。
              </Typography>
            </Box>

            {/* 右側：業務イメージ写真プレースホルダー */}
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  width: '100%',
                  height: { xs: 300, md: 400 },
                  backgroundColor: '#F5F5F5',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid rgba(44, 62, 80, 0.08)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `
                      linear-gradient(45deg, transparent 40%, rgba(74, 144, 184, 0.1) 50%, transparent 60%),
                      repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 20px,
                        rgba(74, 144, 184, 0.05) 20px,
                        rgba(74, 144, 184, 0.05) 40px
                      )
                    `,
                  },
                }}
                className="business-image-placeholder"
              >
                <Box sx={{ textAlign: 'center', zIndex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      color: theme.palette.text.secondary,
                      fontSize: '0.9rem',
                      fontWeight: 500,
                    }}
                  >
                    業務シーンイメージ
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: '0.8rem',
                    }}
                  >
                    プロフェッショナルな分析・議論の様子
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* 会社の雰囲気スナップ写真セクション */}
      <Box sx={{ 
        py: { xs: 8, md: 12 },
        backgroundColor: '#FAFAFA',
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                color: theme.palette.secondary.main,
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Office & Daily Life
            </Typography>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                mb: 2,
                color: theme.palette.text.primary,
                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                fontWeight: 600,
              }}
            >
              私たちの日常
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 500,
                mx: 'auto',
                fontSize: '1rem',
                lineHeight: 1.8,
              }}
            >
              オフィスでの何気ない風景と、
              <br />
              チームの和やかな雰囲気をご紹介します。
            </Typography>
          </Box>

          {/* スナップ写真グリッド */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: { xs: 3, md: 4 },
              maxWidth: 900,
              mx: 'auto',
            }}
          >
            {[
              {
                title: 'チームミーティング',
                description: '活発な議論と笑顔',
              },
              {
                title: 'エントランス',
                description: '明るく開放的な空間',
              },
              {
                title: 'ワークスペース',
                description: '集中できる作業環境',
              },
              {
                title: 'ブレイクタイム',
                description: 'リラックスした休憩時間',
              },
            ].map((snapshot, index) => (
              <Box key={index}>
                <Box
                  sx={{
                    width: '100%',
                    height: { xs: 160, md: 180 },
                    backgroundColor: '#F8F9FA',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid rgba(74, 144, 184, 0.1)',
                    transition: 'all 0.3s ease-in-out',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 32px rgba(44, 62, 80, 0.12)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `
                        linear-gradient(${135 + index * 30}deg, 
                          rgba(74, 144, 184, 0.05) 0%, 
                          rgba(74, 144, 184, 0.02) 50%, 
                          transparent 100%
                        )
                      `,
                    },
                  }}
                  className="snapshot-placeholder"
                >
                  <Box sx={{ textAlign: 'center', zIndex: 1, p: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 1,
                        color: theme.palette.text.secondary,
                        fontSize: '0.8rem',
                        fontWeight: 500,
                      }}
                    >
                      {snapshot.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontSize: '0.7rem',
                        lineHeight: 1.4,
                      }}
                    >
                      {snapshot.description}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* 特徴セクション */}
      <Box sx={{ 
        py: { xs: 12, md: 20 },
        backgroundColor: '#FAFAFA',
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 12 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                mb: 4,
                color: theme.palette.text.primary,
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
              <br />
              3つの主要事業領域で革新的なソリューションを提供しています。
            </Typography>
          </Box>
          
          <Box 
            sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 6,
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
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      mb: 4,
                      color: theme.palette.text.primary,
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

      {/* 社員インタビュー・ポートレートセクション */}
      <Box sx={{ 
        py: { xs: 12, md: 20 },
        backgroundColor: '#FFFFFF',
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 12 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                mb: 4,
                color: theme.palette.text.primary,
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                fontWeight: 600,
              }}
            >
              働く人の声
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
              パワライズで働くメンバーの想いと、
              <br />
              日々の業務に対する情熱をご紹介します。
            </Typography>
          </Box>

          {/* 社員インタビュー */}
          <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
            {[
              {
                name: '田中 健一',
                position: 'エネルギー事業部 主任',
                quote: '再生可能エネルギーで、未来を変える仕事です。',
                description: '太陽光発電プロジェクトの企画・運営を担当しています。環境に優しいエネルギーを通じて社会に貢献できることに大きなやりがいを感じています。',
                direction: 'left',
              },
              {
                name: '佐藤 美咲',
                position: 'インフラ事業部 リーダー',
                quote: 'テクノロジーで社会基盤を支えています。',
                description: 'スマートシティプロジェクトの技術統括を行っています。最新技術と従来のインフラを融合させ、より効率的で持続可能な都市づくりに取り組んでいます。',
                direction: 'right',
              },
              {
                name: '山田 雄一',
                position: '環境ソリューション部 エンジニア',
                quote: 'データ分析で環境課題を解決します。',
                description: '環境データの分析と課題解決策の提案を担当しています。複雑な環境問題に対してデータに基づいたアプローチで取り組むことで、具体的な成果を生み出しています。',
                direction: 'left',
              },
            ].map((member, index) => (
              <Box 
                key={index}
                sx={{ 
                  mb: { xs: 12, md: 16 },
                  display: 'flex',
                  flexDirection: { 
                    xs: 'column', 
                    md: member.direction === 'left' ? 'row' : 'row-reverse' 
                  },
                  alignItems: 'center',
                  gap: { xs: 6, md: 8 },
                }}
              >
                {/* ポートレート写真プレースホルダー（傾けたスタイル） */}
                <Box sx={{ flex: '0 0 auto' }}>
                  <Box
                    sx={{
                      width: { xs: 200, md: 250 },
                      height: { xs: 240, md: 300 },
                      position: 'relative',
                      transform: member.direction === 'left' ? 'skew(-2deg, 1deg)' : 'skew(2deg, -1deg)',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: member.direction === 'left' ? 'skew(-1deg, 0.5deg) scale(1.02)' : 'skew(1deg, -0.5deg) scale(1.02)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#F8F9FA',
                        borderRadius: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        border: '2px solid rgba(74, 144, 184, 0.1)',
                        boxShadow: '0 8px 32px rgba(44, 62, 80, 0.08)',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `
                            radial-gradient(circle at 30% 30%, rgba(74, 144, 184, 0.1) 0%, transparent 50%),
                            linear-gradient(135deg, rgba(74, 144, 184, 0.05) 0%, transparent 100%)
                          `,
                        },
                      }}
                      className="portrait-placeholder"
                    >
                      <Box sx={{ textAlign: 'center', zIndex: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            mb: 1,
                            color: theme.palette.text.secondary,
                            fontSize: '0.8rem',
                            fontWeight: 500,
                          }}
                        >
                          社員ポートレート
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.text.secondary,
                            fontSize: '0.7rem',
                          }}
                        >
                          {member.name}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {/* インタビュー内容 */}
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h4"
                    component="h3"
                    sx={{
                      mb: 2,
                      color: theme.palette.text.primary,
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      fontWeight: 600,
                      lineHeight: 1.4,
                    }}
                  >
                    "{member.quote}"
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      color: theme.palette.text.primary,
                      fontSize: '1rem',
                      lineHeight: 1.8,
                    }}
                  >
                    {member.description}
                  </Typography>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 0.5,
                        color: theme.palette.text.primary,
                        fontSize: '1rem',
                        fontWeight: 600,
                      }}
                    >
                      {member.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontSize: '0.9rem',
                      }}
                    >
                      {member.position}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA セクション */}
      <Box
        sx={{
          backgroundColor: theme.palette.secondary.main,
          py: { xs: 12, md: 16 },
          position: 'relative',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <Typography 
              variant="h3" 
              component="h2" 
              sx={{ 
                mb: 4, 
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
                mb: 8, 
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: { xs: '1rem', sm: '1.125rem' },
                lineHeight: 1.8,
                maxWidth: 500,
                mx: 'auto',
              }}
            >
              持続可能な未来の実現に向けて、
              <br />
              一緒に取り組みませんか？
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#FFFFFF',
                color: theme.palette.secondary.main,
                px: 8,
                py: 3,
                fontSize: '1.1rem',
                minWidth: 240,
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: '#F5F5F5',
                  transform: 'translateY(-2px)',
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
