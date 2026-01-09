// Centralized API Types for Bambite User Frontend
// Based on Bambite E-commerce API v2.7.0

/**
 * Category entity - now an object instead of string enum
 */
export interface ApiCategory {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  _count?: {
    products: number;
  };
}

/**
 * Option entity for products
 */
export interface ApiOption {
  id: string;
  name: string; // e.g., "size", "spice_level"
  displayName: string; // e.g., "Size", "Spice Level"
  optionLists: string[]; // e.g., ["small", "medium", "large"]
  createdAt: string;
  updatedAt: string;
  _count?: {
    products: number;
  };
}

/**
 * Product-Option join table entity (many-to-many relationship)
 */
export interface ApiProductOption {
  id: string;
  productId: string;
  optionId: string;
  createdAt: string;
  option: ApiOption; // Nested option object
}

/**
 * Product entity from API
 */
export interface ApiProduct {
  id: string;
  name: string;
  thaiName?: string | null; // NEW - optional Thai name
  description: string;
  category: ApiCategory; // Object, not string
  ingredients?: string | null;
  price: number;
  stockQuantity: number;
  images: string[];
  productOptions?: ApiProductOption[]; // Many-to-many join table with nested options
  createdAt: string;
  updatedAt: string;
}

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
}

/**
 * Products API response
 */
export type ProductsResponse = ApiResponse<ApiProduct[]>;

/**
 * Single product API response
 */
export type ProductResponse = ApiResponse<ApiProduct>;

/**
 * Categories API response
 */
export type CategoriesResponse = ApiResponse<ApiCategory[]>;

/**
 * Paginated API response
 */
export interface PaginatedApiResponse<T> {
  status: 'success' | 'error';
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Generic API error response
 */
export interface ApiErrorResponse {
  status: 'error';
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

/**
 * Rate limit error (429)
 */
export interface RateLimitError extends ApiErrorResponse {
  retryAfter?: number; // Seconds until retry is allowed
}

/**
 * Place Tag entity for job posts
 */
export interface ApiPlaceTag {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

/**
 * Job Post entity from API (actual backend structure)
 */
export interface ApiJobPost {
  id: string;
  title: string;
  placeTagId: string;
  placeTag: ApiPlaceTag; // Populated in response
  tasks: {
    title: string;
    descriptions: string[];
  };
  requiredQualifications: {
    title: string;
    descriptions: string[];
  };
  jobDetails: {
    workingHours: string;
    contract: boolean;
    salary: string;
    closeDate: string; // ISO 8601 date string
  };
  createdAt: string;
  updatedAt: string;
}

/**
 * Job Application payload for submission
 */
export interface JobApplicationPayload {
  jobPostId: string;
  name: string;
  email: string;
  joiningReason?: string;
  additionalQuestion?: string;
  coverLetter?: string;
  uploadedFile?: File; // PDF file, max 3MB
}

/**
 * Job Application response
 */
export type JobApplicationResponse = ApiResponse<{
  application: {
    id: string;
    jobPostId: string;
    name: string;
    email: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
  };
}>;

/**
 * Contact form payload
 */
export interface ContactFormPayload {
  name: string;
  email: string;
  reason: 'general_inquiry' | 'product_question' | 'collaboration' | 'feedback' | 'other';
  message: string;
}

/**
 * Contact form response
 */
export type ContactFormResponse = ApiResponse<{
  contact: {
    id: string;
    name: string;
    email: string;
    reason: string;
    message: string;
    createdAt: string;
  };
}>;
