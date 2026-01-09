// Product API Service - Production Ready
// Updated to support new category structure and error handling
import axios, { AxiosError } from "axios";
import type {
  ApiProduct,
  ProductsResponse,
  ProductResponse,
  CategoriesResponse,
  ApiErrorResponse,
  RateLimitError,
} from "../types/api.types";

// Get base URL from environment variable or use default
const getBaseUrl = () => {
  // Check if we're in browser (client-side)
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL || "";
  }
  // Server-side: use full URL or environment variable
  return process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "";
};

// Create axios instance with production-ready configuration
const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // 15 seconds timeout for production
  withCredentials: false, // Enable if backend requires credentials
});

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    // Enhanced error logging for production debugging
    if (process.env.NODE_ENV === "development") {
      console.error("API Error:", {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
      });
    }
    return Promise.reject(error);
  }
);

/**
 * Query Parameters for getting products
 */
export interface GetProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  category?: string; // NOW: accepts categoryId (UUID) instead of enum
}

/**
 * Get all products with optional filters
 * @throws {Error} When request fails or timeout occurs
 */
export async function getProducts(
  params?: GetProductsParams
): Promise<ProductsResponse> {
  try {
    const baseURL = getBaseUrl();
    const endpoint =
      baseURL && baseURL.includes("/api/v1") ? "/products" : "/api/v1/products";

    // Only log in development
    if (process.env.NODE_ENV === "development") {
      console.log("Fetching products from:", baseURL + endpoint);
      console.log("With params:", params);
    }

    const response = await apiClient.get<ProductsResponse>(endpoint, {
      params,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiErrorResponse>;

      // Handle rate limiting (though products endpoint shouldn't have it)
      if (axiosError.response?.status === 429) {
        const rateLimitError = axiosError.response.data as RateLimitError;
        throw new Error(
          rateLimitError.message || "Too many requests. Please try again later."
        );
      }

      // User-friendly error messages
      const errorMessage =
        axiosError.response?.data?.message ||
        (axiosError.code === "ECONNABORTED"
          ? "Request timeout. Please check your connection."
          : axiosError.code === "ERR_NETWORK"
          ? "Network error. Please check your internet connection."
          : axiosError.message) ||
        `Failed to fetch products: ${
          axiosError.response?.status || "Unknown Error"
        }`;

      throw new Error(errorMessage);
    }

    // Unknown error type
    console.error("Unknown error fetching products:", error);
    throw new Error("An unexpected error occurred while fetching products.");
  }
}

/**
 * Get a single product by ID
 * @param id - Product UUID
 * @returns Product or null if not found
 */
export async function getProductById(id: string): Promise<ApiProduct | null> {
  try {
    const baseURL = getBaseUrl();
    const endpoint =
      baseURL && baseURL.includes("/api/v1")
        ? `/products/${id}`
        : `/api/v1/products/${id}`;

    const response = await apiClient.get<ProductResponse>(endpoint);

    if (response.data.status === "success" && response.data.data) {
      return response.data.data;
    }

    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiErrorResponse>;

      // 404 is expected for non-existent products
      if (axiosError.response?.status === 404) {
        return null;
      }

      // Log other errors
      console.error("Error fetching product by ID:", {
        id,
        status: axiosError.response?.status,
        message: axiosError.response?.data?.message || axiosError.message,
      });
    } else {
      console.error("Unknown error fetching product by ID:", error);
    }

    return null;
  }
}

/**
 * Get active categories for filtering
 * @returns Array of active categories
 */
export async function getActiveCategories(): Promise<CategoriesResponse> {
  try {
    const baseURL = getBaseUrl();
    const endpoint =
      baseURL && baseURL.includes("/api/v1")
        ? "/categories/active"
        : "/api/v1/categories/active";

    if (process.env.NODE_ENV === "development") {
      console.log("Fetching active categories from:", baseURL + endpoint);
    }

    const response = await apiClient.get<CategoriesResponse>(endpoint);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiErrorResponse>;

      const errorMessage =
        axiosError.response?.data?.message ||
        "Failed to fetch categories. Using fallback.";

      if (process.env.NODE_ENV === "development") {
        console.warn("Categories fetch failed:", errorMessage);
      }

      // Return empty success response as fallback
      return {
        status: "success",
        data: [],
      };
    }

    // Return empty success response as fallback
    return {
      status: "success",
      data: [],
    };
  }
}

// Export types for convenience
export type { ApiProduct, ProductsResponse };
