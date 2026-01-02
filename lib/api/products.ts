// Product API Service
import axios from "axios";

// API Response Types - API returns categories in this format
export type ApiCategoryValue =
  | "NOODLE"
  | "FRIED_RICE"
  | "MAIN_DISH"
  | "SOUP"
  | "SALAD_SIDE_DISH"
  | "SIDE_DISH"
  | "APPETIZER";

// Frontend display category names
export type ProductCategory =
  | "Noodle"
  | "Fried Rice"
  | "Main Dish"
  | "Soup"
  | "Salad (Side Dish)"
  | "Side Dish"
  | "Appetizer";

export interface ApiProduct {
  id: string;
  name: string;
  description: string | null;
  category: ApiCategoryValue; // API returns categories in uppercase with underscores
  ingredients: string | null;
  price: string; // Decimal string from API
  stockQuantity: number;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  status: "success" | "error";
  data: ApiProduct[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface ErrorResponse {
  status: "error";
  message: string;
}

// Query Parameters
export interface GetProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  category?: ApiCategoryValue; // Filter by category
}

// Get base URL from environment variable or use default
const getBaseUrl = () => {
  // Check if we're in browser (client-side)
  if (typeof window !== "undefined") {
    // Use relative URL for same-origin requests, or set NEXT_PUBLIC_API_URL
    // If NEXT_PUBLIC_API_URL is set, use it; otherwise use relative path
    return process.env.NEXT_PUBLIC_API_URL || "";
  }
  // Server-side: use full URL or environment variable
  return process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "";
};

// Create axios instance
const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

/**
 * Get all products with optional filters
 */
export async function getProducts(
  params?: GetProductsParams
): Promise<ProductsResponse> {
  try {
    const baseURL = getBaseUrl();
    // If baseURL already includes /api/v1, use /products, otherwise use /api/v1/products
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
      // Log error details (always log errors for debugging)
      const errorDetails = {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        baseURL: error.config?.baseURL,
      };

      // Only log full details in development
      if (process.env.NODE_ENV === "development") {
        console.error("API Error Details:", {
          ...errorDetails,
          data: error.response?.data,
        });
      } else {
        console.error("API Error:", errorDetails);
      }

      // Provide user-friendly error message
      const errorMessage =
        error.response?.data?.message ||
        (error.code === "ECONNABORTED"
          ? "Request timeout. Please try again."
          : error.message) ||
        `Failed to fetch products: ${
          error.response?.status || "Network Error"
        }`;

      throw new Error(errorMessage);
    }
    console.error("Unknown error:", error);
    throw error;
  }
}

/**
 * Get a single product by ID
 * Note: This endpoint is not in the provided docs, but we'll create a helper
 * that filters from getAllProducts or you can add a GET /products/:id endpoint
 */
export async function getProductById(id: string): Promise<ApiProduct | null> {
  try {
    const baseURL = getBaseUrl();
    // If baseURL already includes /api/v1, use /products/:id, otherwise use /api/v1/products/:id
    const endpoint =
      baseURL && baseURL.includes("/api/v1")
        ? `/products/${id}`
        : `/api/v1/products/${id}`;

    // If backend has GET /products/:id endpoint, use it:
    // const response = await apiClient.get<{ status: string; data: ApiProduct }>(endpoint);
    // return response.data.data;

    // Try to fetch by ID endpoint first
    try {
      const response = await apiClient.get<{
        status: string;
        data: ApiProduct;
      }>(endpoint);
      if (response.data.status === "success" && response.data.data) {
        return response.data.data;
      }
    } catch {
      // If endpoint doesn't exist, fall back to fetching all and filtering
      // This is not ideal for production but works as a fallback
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "GET /products/:id endpoint not available, using fallback method"
        );
      }
    }

    // Fallback: fetch all and filter (not ideal for production)
    const response = await getProducts({ limit: 1000 });
    const product = response.data.find((p) => p.id === id);
    return product || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
