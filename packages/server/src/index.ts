import 'dotenv/config'; // Load environment variables first
import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import { db } from './lib/firebase'; // Import Firebase instances
import { authMiddleware, adminMiddleware } from './middlewares/authMiddleware';

// Types and enums
enum NewsCategory {
  ENERGY = 'ENERGY',
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  ENVIRONMENT = 'ENVIRONMENT',
  CONSULTING = 'CONSULTING',
  COMPANY = 'COMPANY',
  GENERAL = 'GENERAL'
}

enum ContentStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}

enum InquiryCategory {
  ENERGY_SERVICES = 'ENERGY_SERVICES',
  INFRASTRUCTURE_SERVICES = 'INFRASTRUCTURE_SERVICES',
  ENVIRONMENT_CONSULTING = 'ENVIRONMENT_CONSULTING',
  GENERAL_INQUIRY = 'GENERAL_INQUIRY',
  PARTNERSHIP = 'PARTNERSHIP',
  SUPPORT = 'SUPPORT'
}

enum InquiryStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  RESPONDED = 'RESPONDED',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED'
}

// Validation schemas
const createNewsSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(250),
  content: z.string().min(1),
  excerpt: z.string().max(500).optional(),
  featuredImage: z.string().max(500).optional(),
  category: z.nativeEnum(NewsCategory),
  status: z.nativeEnum(ContentStatus),
  publishedAt: z.string().datetime().optional(),
  tags: z.array(z.string()).optional(),
  metaTitle: z.string().max(200).optional(),
  metaDescription: z.string().max(300).optional(),
});

const createInquirySchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(100),
  company: z.string().max(200).optional(),
  phone: z.string().max(20).optional(),
  subject: z.string().min(1).max(200),
  message: z.string().min(1),
  category: z.nativeEnum(InquiryCategory),
});

const newsListQuerySchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(10),
  offset: z.coerce.number().min(0).default(0),
  category: z.nativeEnum(NewsCategory).optional(),
  status: z.nativeEnum(ContentStatus).optional(),
});

// Create Express app
const app: express.Application = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Powerise API Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    firebase: {
      firestore: db ? 'connected' : 'not connected',
    },
  });
});

// Public API info endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to Powerise API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: {
        test: '/api/auth/test (requires authentication)',
        admin: '/api/auth/admin (requires admin privileges)',
      },
      news: {
        published: '/api/news/published (public)',
        bySlug: '/api/news/slug/:slug (public)',
        admin: '/api/news (admin only)',
        create: 'POST /api/news (admin only)',
      },
      inquiries: {
        create: 'POST /api/inquiries (public)',
        list: '/api/inquiries (admin only)',
      },
    },
  });
});

// News API Routes
// Public routes
app.get('/api/news/published', async (req, res) => {
  try {
    const query = newsListQuerySchema.parse(req.query);
    
    // Mock data - replace with Firebase Data Connect implementation
    const mockNews = [
      {
        id: '1',
        title: 'エネルギー事業の新展開',
        slug: 'energy-business-expansion',
        excerpt: '持続可能なエネルギーソリューションの新たな取り組みを開始しました。',
        featuredImage: '/images/energy-expansion.jpg',
        category: NewsCategory.ENERGY,
        publishedAt: new Date().toISOString(),
        views: 120,
        author: {
          displayName: '山田太郎'
        }
      },
      {
        id: '2',
        title: 'インフラ技術の革新',
        slug: 'infrastructure-innovation',
        excerpt: '最新のインフラ技術により、より効率的なシステムを構築しています。',
        featuredImage: '/images/infrastructure-innovation.jpg',
        category: NewsCategory.INFRASTRUCTURE,
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        views: 89,
        author: {
          displayName: '田中次郎'
        }
      }
    ];

    let filteredNews = mockNews;
    if (query.category) {
      filteredNews = mockNews.filter(news => news.category === query.category);
    }

    res.json({
      success: true,
      data: {
        items: filteredNews.slice(query.offset, query.offset + query.limit),
        total: filteredNews.length,
        limit: query.limit,
        offset: query.offset,
        hasMore: (query.offset + query.limit) < filteredNews.length
      }
    });
  } catch (error) {
    console.error('Error fetching published news:', error);
    res.status(400).json({
      success: false,
      error: 'Invalid query parameters'
    });
  }
});

app.get('/api/news/slug/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    // Mock data - replace with Firebase Data Connect implementation
    const mockNewsItems: Record<string, any> = {
      'energy-business-expansion': {
        id: '1',
        title: 'エネルギー事業の新展開',
        slug: 'energy-business-expansion',
        content: '<h2>持続可能なエネルギーの未来</h2><p>パワライズは、革新的なエネルギーソリューションの開発を通じて、持続可能な社会の実現に貢献しています。</p><p>新たな取り組みとして、太陽光発電システムの効率化技術の研究開発を進めており、従来比30%の効率向上を実現しました。</p>',
        excerpt: '持続可能なエネルギーソリューションの新たな取り組みを開始しました。',
        featuredImage: '/images/energy-expansion.jpg',
        category: NewsCategory.ENERGY,
        publishedAt: new Date().toISOString(),
        views: 121,
        metaTitle: 'エネルギー事業の新展開 | POWERISE',
        metaDescription: '持続可能なエネルギーソリューションの新たな取り組みについて詳しくご紹介します。',
        author: {
          displayName: '山田太郎'
        }
      },
      'infrastructure-innovation': {
        id: '2',
        title: 'インフラ技術の革新',
        slug: 'infrastructure-innovation',
        content: '<h2>次世代インフラ技術の開発</h2><p>最新のIoT技術とAIを活用した次世代インフラシステムの開発を進めています。</p>',
        excerpt: '最新のインフラ技術により、より効率的なシステムを構築しています。',
        featuredImage: '/images/infrastructure-innovation.jpg',
        category: NewsCategory.INFRASTRUCTURE,
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        views: 90,
        metaTitle: 'インフラ技術の革新 | POWERISE',
        metaDescription: '最新のインフラ技術による効率的なシステム構築について詳しくご紹介します。',
        author: {
          displayName: '田中次郎'
        }
      }
    };

    const newsItem = mockNewsItems[slug];
    if (!newsItem) {
      res.status(404).json({
        success: false,
        error: 'News article not found'
      });
      return;
    }

    // Increment view count (in real implementation, update database)
    newsItem.views += 1;

    res.json({
      success: true,
      data: newsItem
    });
  } catch (error) {
    console.error('Error fetching news by slug:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Admin news routes
app.get('/api/news', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const query = newsListQuerySchema.parse(req.query);
    
    // Mock admin data with all statuses
    const mockAdminNews = [
      {
        id: '1',
        title: 'エネルギー事業の新展開',
        slug: 'energy-business-expansion',
        excerpt: '持続可能なエネルギーソリューションの新たな取り組みを開始しました。',
        featuredImage: '/images/energy-expansion.jpg',
        category: NewsCategory.ENERGY,
        status: ContentStatus.PUBLISHED,
        publishedAt: new Date().toISOString(),
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        updatedAt: new Date().toISOString(),
        views: 121,
        author: {
          id: 'user1',
          displayName: '山田太郎',
          email: 'yamada@powerise.com'
        }
      },
      {
        id: '3',
        title: '環境コンサルティング新サービス',
        slug: 'environment-consulting-service',
        excerpt: '企業の環境負荷削減をサポートする新しいコンサルティングサービスを開始。',
        featuredImage: '/images/environment-consulting.jpg',
        category: NewsCategory.CONSULTING,
        status: ContentStatus.DRAFT,
        publishedAt: null,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 3600000).toISOString(),
        views: 0,
        author: {
          id: 'user2',
          displayName: '佐藤花子',
          email: 'sato@powerise.com'
        }
      }
    ];

    let filteredNews = mockAdminNews;
    if (query.status) {
      filteredNews = mockAdminNews.filter(news => news.status === query.status);
    }
    if (query.category) {
      filteredNews = filteredNews.filter(news => news.category === query.category);
    }

    res.json({
      success: true,
      data: {
        items: filteredNews.slice(query.offset, query.offset + query.limit),
        total: filteredNews.length,
        limit: query.limit,
        offset: query.offset,
        hasMore: (query.offset + query.limit) < filteredNews.length
      }
    });
  } catch (error) {
    console.error('Error fetching admin news:', error);
    res.status(400).json({
      success: false,
      error: 'Invalid query parameters'
    });
  }
});

app.post('/api/news', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const newsData = createNewsSchema.parse(req.body);
    
    // Mock creation - replace with Firebase Data Connect implementation
    const newNews = {
      id: Date.now().toString(),
      ...newsData,
      tags: newsData.tags ? JSON.stringify(newsData.tags) : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      authorId: req.user?.uid || 'unknown',
      views: 0
    };

    res.status(201).json({
      success: true,
      data: newNews,
      message: 'News article created successfully'
    });
  } catch (error) {
    console.error('Error creating news:', error);
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
});

// Inquiries API Routes
app.post('/api/inquiries', async (req, res) => {
  try {
    const inquiryData = createInquirySchema.parse(req.body);
    
    // Mock creation - replace with Firebase Data Connect implementation
    const newInquiry = {
      id: Date.now().toString(),
      ...inquiryData,
      status: InquiryStatus.NEW,
      priority: 'MEDIUM',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    res.status(201).json({
      success: true,
      data: newInquiry,
      message: 'お問い合わせを受け付けました。担当者よりご連絡いたします。'
    });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: 'Validation error',
        details: error.errors
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  }
});

app.get('/api/inquiries', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;
    
    // Mock data - replace with Firebase Data Connect implementation
    const mockInquiries = [
      {
        id: '1',
        name: '田中太郎',
        email: 'tanaka@example.com',
        company: '株式会社サンプル',
        phone: '03-1234-5678',
        subject: 'エネルギーソリューションについて',
        category: InquiryCategory.ENERGY_SERVICES,
        status: InquiryStatus.NEW,
        priority: 'HIGH',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: '山田花子',
        email: 'yamada@example.com',
        company: null,
        phone: null,
        subject: '一般的なお問い合わせ',
        category: InquiryCategory.GENERAL_INQUIRY,
        status: InquiryStatus.IN_PROGRESS,
        priority: 'MEDIUM',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 3600000).toISOString(),
        assignedTo: {
          id: 'admin1',
          displayName: '管理者太郎',
          email: 'admin@powerise.com'
        }
      }
    ];

    res.json({
      success: true,
      data: {
        items: mockInquiries.slice(offset, offset + limit),
        total: mockInquiries.length,
        limit,
        offset,
        hasMore: (offset + limit) < mockInquiries.length
      }
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Protected routes for testing authentication
app.get('/api/auth/test', authMiddleware, (req, res) => {
  res.json({
    message: 'Authentication successful',
    user: {
      uid: req.user?.uid,
      email: req.user?.email,
      emailVerified: req.user?.email_verified,
    },
    timestamp: new Date().toISOString(),
  });
});

// Admin-only routes for testing admin middleware
app.get('/api/auth/admin', authMiddleware, adminMiddleware, (req, res) => {
  res.json({
    message: 'Admin access successful',
    user: {
      uid: req.user?.uid,
      email: req.user?.email,
      admin: req.user?.admin,
    },
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.all('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString(),
  });
});

// Global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error handler:', err);
  
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Powerise API Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📖 API Info: http://localhost:${PORT}/api`);
  console.log(`📰 News API: http://localhost:${PORT}/api/news/published`);
  console.log(`💬 Inquiries API: http://localhost:${PORT}/api/inquiries`);
  console.log(`🔐 Auth test: http://localhost:${PORT}/api/auth/test`);
  console.log(`👨‍💼 Admin test: http://localhost:${PORT}/api/auth/admin`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('💤 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('💤 SIGINT received, shutting down gracefully');
  process.exit(0);
});

export default app; 