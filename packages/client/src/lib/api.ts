// API Client for Powerise Frontend

import {
  ApiResponse,
  News,
  Inquiry,
  CreateNewsRequest,
  CreateInquiryRequest,
  NewsListParams,
  InquiryListParams,
  NewsListResponse,
  NewsDetailResponse,
  CreateNewsResponse,
  InquiryListResponse,
  CreateInquiryResponse,
  PaginatedResponse
} from '../types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// API Error class
export class ApiError extends Error {
  public status: number;
  public data?: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// Helper function for making API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Add Authorization header if user is authenticated
  const auth = getAuthHeader();
  if (auth) {
    defaultHeaders.Authorization = auth;
  }

  const config: RequestInit = {
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.error || 'API request failed',
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Handle network errors, parsing errors, etc.
    throw new ApiError(
      0,
      error instanceof Error ? error.message : 'Network error'
    );
  }
}

// Get auth header (will be implemented with Firebase Auth)
function getAuthHeader(): string | null {
  // TODO: Implement Firebase Auth token retrieval
  // For now, return null - auth will be added when Firebase Auth is integrated
  return null;
}

// News API methods
export const newsApi = {
  // Get published news (public)
  getPublishedNews: async (params: NewsListParams = {}): Promise<NewsListResponse> => {
    const searchParams = new URLSearchParams();
    
    if (params.limit !== undefined) searchParams.append('limit', params.limit.toString());
    if (params.offset !== undefined) searchParams.append('offset', params.offset.toString());
    if (params.category) searchParams.append('category', params.category);
    
    const query = searchParams.toString();
    const endpoint = `/api/news/published${query ? `?${query}` : ''}`;
    
    return apiRequest<NewsListResponse>(endpoint);
  },

  // Get news by slug (public)
  getNewsBySlug: async (slug: string): Promise<NewsDetailResponse> => {
    return apiRequest<NewsDetailResponse>(`/api/news/slug/${slug}`);
  },

  // Get all news (admin only)
  getAllNews: async (params: NewsListParams = {}): Promise<NewsListResponse> => {
    const searchParams = new URLSearchParams();
    
    if (params.limit !== undefined) searchParams.append('limit', params.limit.toString());
    if (params.offset !== undefined) searchParams.append('offset', params.offset.toString());
    if (params.category) searchParams.append('category', params.category);
    if (params.status) searchParams.append('status', params.status);
    
    const query = searchParams.toString();
    const endpoint = `/api/news${query ? `?${query}` : ''}`;
    
    return apiRequest<NewsListResponse>(endpoint);
  },

  // Create news (admin only)
  createNews: async (newsData: CreateNewsRequest): Promise<CreateNewsResponse> => {
    return apiRequest<CreateNewsResponse>('/api/news', {
      method: 'POST',
      body: JSON.stringify(newsData),
    });
  },

  // Update news (admin only)
  updateNews: async (id: string, newsData: Partial<CreateNewsRequest>): Promise<CreateNewsResponse> => {
    return apiRequest<CreateNewsResponse>(`/api/news/${id}`, {
      method: 'PUT',
      body: JSON.stringify(newsData),
    });
  },

  // Delete news (admin only)
  deleteNews: async (id: string): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`/api/news/${id}`, {
      method: 'DELETE',
    });
  },
};

// Inquiries API methods
export const inquiriesApi = {
  // Create inquiry (public)
  createInquiry: async (inquiryData: CreateInquiryRequest): Promise<CreateInquiryResponse> => {
    return apiRequest<CreateInquiryResponse>('/api/inquiries', {
      method: 'POST',
      body: JSON.stringify(inquiryData),
    });
  },

  // Get all inquiries (admin only)
  getAllInquiries: async (params: InquiryListParams = {}): Promise<InquiryListResponse> => {
    const searchParams = new URLSearchParams();
    
    if (params.limit !== undefined) searchParams.append('limit', params.limit.toString());
    if (params.offset !== undefined) searchParams.append('offset', params.offset.toString());
    if (params.status) searchParams.append('status', params.status);
    if (params.category) searchParams.append('category', params.category);
    
    const query = searchParams.toString();
    const endpoint = `/api/inquiries${query ? `?${query}` : ''}`;
    
    return apiRequest<InquiryListResponse>(endpoint);
  },

  // Update inquiry status (admin only)
  updateInquiryStatus: async (
    id: string,
    updates: {
      status?: string;
      priority?: string;
      assignedToId?: string;
      adminNotes?: string;
    }
  ): Promise<ApiResponse<Inquiry>> => {
    return apiRequest<ApiResponse<Inquiry>>(`/api/inquiries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  // Delete inquiry (admin only)
  deleteInquiry: async (id: string): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>(`/api/inquiries/${id}`, {
      method: 'DELETE',
    });
  },
};

// Auth API methods (for testing)
export const authApi = {
  // Test authentication
  testAuth: async (): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>('/api/auth/test');
  },

  // Test admin access
  testAdmin: async (): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>('/api/auth/admin');
  },
};

// Health check
export const healthApi = {
  check: async (): Promise<ApiResponse> => {
    return apiRequest<ApiResponse>('/health');
  },
};

// Error handling utilities
export const handleApiError = (error: unknown): string => {
  if (error instanceof ApiError) {
    // Handle specific status codes
    switch (error.status) {
      case 400:
        return error.data?.details?.length 
          ? `入力エラー: ${error.data.details.map((d: any) => d.message).join(', ')}`
          : '入力内容に問題があります。';
      case 401:
        return 'ログインが必要です。';
      case 403:
        return 'アクセス権限がありません。';
      case 404:
        return 'リソースが見つかりません。';
      case 500:
        return 'サーバーエラーが発生しました。';
      default:
        return error.message || '予期しないエラーが発生しました。';
    }
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return '予期しないエラーが発生しました。';
};

// React Query/SWR keys for caching
export const queryKeys = {
  news: {
    published: (params?: NewsListParams) => ['news', 'published', params] as const,
    bySlug: (slug: string) => ['news', 'slug', slug] as const,
    admin: (params?: NewsListParams) => ['news', 'admin', params] as const,
  },
  inquiries: {
    admin: (params?: InquiryListParams) => ['inquiries', 'admin', params] as const,
  },
  auth: {
    test: () => ['auth', 'test'] as const,
    admin: () => ['auth', 'admin'] as const,
  },
  health: () => ['health'] as const,
}; 