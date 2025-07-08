// API Types for Powerise Frontend

// Enums matching backend
export enum NewsCategory {
  ENERGY = 'ENERGY',
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  ENVIRONMENT = 'ENVIRONMENT',
  CONSULTING = 'CONSULTING',
  COMPANY = 'COMPANY',
  GENERAL = 'GENERAL'
}

export enum ContentStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}

export enum InquiryCategory {
  ENERGY_SERVICES = 'ENERGY_SERVICES',
  INFRASTRUCTURE_SERVICES = 'INFRASTRUCTURE_SERVICES',
  ENVIRONMENT_CONSULTING = 'ENVIRONMENT_CONSULTING',
  GENERAL_INQUIRY = 'GENERAL_INQUIRY',
  PARTNERSHIP = 'PARTNERSHIP',
  SUPPORT = 'SUPPORT'
}

export enum InquiryStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  RESPONDED = 'RESPONDED',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED'
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

// Data interfaces
export interface User {
  id: string;
  email: string;
  displayName?: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Author {
  id?: string;
  displayName: string;
  email?: string;
}

export interface News {
  id: string;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  featuredImage?: string;
  category: NewsCategory;
  status?: ContentStatus;
  publishedAt: string | null;
  createdAt?: string;
  updatedAt?: string;
  views: number;
  tags?: string;
  metaTitle?: string;
  metaDescription?: string;
  author: Author;
  authorId?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message?: string;
  category: InquiryCategory;
  status: InquiryStatus;
  priority: string;
  createdAt: string;
  updatedAt: string;
  respondedAt?: string;
  adminNotes?: string;
  assignedTo?: User;
  assignedToId?: string;
}

// Request types
export interface CreateNewsRequest {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  category: NewsCategory;
  status: ContentStatus;
  publishedAt?: string;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
}

export interface UpdateNewsRequest extends CreateNewsRequest {
  id: string;
}

export interface CreateInquiryRequest {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  category: InquiryCategory;
}

// Query parameters
export interface NewsListParams {
  limit?: number;
  offset?: number;
  category?: NewsCategory;
  status?: ContentStatus;
}

export interface InquiryListParams {
  limit?: number;
  offset?: number;
  status?: InquiryStatus;
  category?: InquiryCategory;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  details?: any[];
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

// API endpoint responses
export type NewsListResponse = ApiResponse<PaginatedResponse<News>>;
export type NewsDetailResponse = ApiResponse<News>;
export type CreateNewsResponse = ApiResponse<News>;

export type InquiryListResponse = ApiResponse<PaginatedResponse<Inquiry>>;
export type CreateInquiryResponse = ApiResponse<Inquiry>;

// Form types
export interface NewsFormData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  category: NewsCategory;
  status: ContentStatus;
  publishedAt: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
  category: InquiryCategory;
}

// Category labels for UI
export const NewsCategoryLabels: Record<NewsCategory, string> = {
  [NewsCategory.ENERGY]: 'エネルギー',
  [NewsCategory.INFRASTRUCTURE]: 'インフラ',
  [NewsCategory.ENVIRONMENT]: '環境',
  [NewsCategory.CONSULTING]: 'コンサルティング',
  [NewsCategory.COMPANY]: '会社情報',
  [NewsCategory.GENERAL]: '一般'
};

export const InquiryCategoryLabels: Record<InquiryCategory, string> = {
  [InquiryCategory.ENERGY_SERVICES]: 'エネルギーサービス',
  [InquiryCategory.INFRASTRUCTURE_SERVICES]: 'インフラサービス',
  [InquiryCategory.ENVIRONMENT_CONSULTING]: '環境コンサルティング',
  [InquiryCategory.GENERAL_INQUIRY]: '一般的なお問い合わせ',
  [InquiryCategory.PARTNERSHIP]: 'パートナーシップ',
  [InquiryCategory.SUPPORT]: 'サポート'
};

export const ContentStatusLabels: Record<ContentStatus, string> = {
  [ContentStatus.DRAFT]: '下書き',
  [ContentStatus.PUBLISHED]: '公開済み',
  [ContentStatus.ARCHIVED]: 'アーカイブ'
};

export const InquiryStatusLabels: Record<InquiryStatus, string> = {
  [InquiryStatus.NEW]: '新規',
  [InquiryStatus.IN_PROGRESS]: '対応中',
  [InquiryStatus.RESPONDED]: '回答済み',
  [InquiryStatus.RESOLVED]: '解決済み',
  [InquiryStatus.CLOSED]: 'クローズ'
}; 