// Job Posts API Service - Production Ready
// Based on Bambite E-commerce API v2.7.0 (Actual Backend Structure)
import axios, { AxiosError } from "axios";
import type { ApiResponse, ApiErrorResponse, ApiJobPost } from "../types/api.types";

/**
 * Job Posts API response (no pagination in actual API)
 */
export type JobPostsResponse = ApiResponse<ApiJobPost[]>;

/**
 * Single job post API response (wrapped in jobPost property)
 */
export type JobPostResponse = ApiResponse<{
  jobPost: ApiJobPost;
}>;

/**
 * Query parameters for getting job posts
 */
export interface GetJobPostsParams {
  placeTagId?: string; // Filter by place tag (location) UUID
  search?: string; // Search term to filter by title
}

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL || "";
  }
  return process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "";
};

const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (process.env.NODE_ENV === "development") {
      console.error("Job Posts API Error:", {
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
 * Get all job posts (public - no authentication required)
 * @param params - Optional query parameters (placeTagId, search)
 * @returns Promise<JobPostsResponse>
 * @throws {Error} When request fails
 */
export async function getJobPosts(
  params?: GetJobPostsParams
): Promise<JobPostsResponse> {
  try {
    const baseURL = getBaseUrl();
    const endpoint =
      baseURL && baseURL.includes("/api/v1")
        ? "/job-posts"
        : "/api/v1/job-posts";

    if (process.env.NODE_ENV === "development") {
      console.log("Fetching job posts from:", baseURL + endpoint);
      console.log("With params:", params);
    }

    const response = await apiClient.get<JobPostsResponse>(endpoint, {
      params: params,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiErrorResponse>;

      const errorMessage =
        axiosError.response?.data?.message ||
        (axiosError.code === "ECONNABORTED"
          ? "Request timeout. Please check your connection."
          : axiosError.code === "ERR_NETWORK"
          ? "Network error. Please check your internet connection."
          : "Failed to fetch job posts. Please try again later.");

      throw new Error(errorMessage);
    }

    console.error("Unknown error fetching job posts:", error);
    throw new Error("An unexpected error occurred while fetching job posts.");
  }
}

/**
 * Get a single job post by ID (public - no authentication required)
 * @param id - Job post UUID
 * @returns ApiJobPost or null if not found
 */
export async function getJobPostById(id: string): Promise<ApiJobPost | null> {
  try {
    const baseURL = getBaseUrl();
    const endpoint =
      baseURL && baseURL.includes("/api/v1")
        ? `/job-posts/${id}`
        : `/api/v1/job-posts/${id}`;

    const response = await apiClient.get<JobPostResponse>(endpoint);

    if (response.data.status === "success" && response.data.data?.jobPost) {
      return response.data.data.jobPost;
    }

    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiErrorResponse>;

      // 404 is expected for non-existent job posts
      if (axiosError.response?.status === 404) {
        return null;
      }

      console.error("Error fetching job post by ID:", {
        id,
        status: axiosError.response?.status,
        message: axiosError.response?.data?.message || axiosError.message,
      });
    } else {
      console.error("Unknown error fetching job post by ID:", error);
    }

    return null;
  }
}

/**
 * Map API job post to frontend Job type
 * This handles the transformation between backend and frontend structures
 * 
 * Backend structure (from Postman collection):
 * - title: string
 * - placeTag: { id, name, status } (location)
 * - tasks: { title, descriptions[] }
 * - requiredQualifications: { title, descriptions[] }
 * - jobDetails: { workingHours, contract (boolean), salary, closeDate }
 */
export function mapJobPostToFrontendJob(jobPost: ApiJobPost): {
  id: string;
  title: string;
  category: string;
  workingHours: string;
  contract: string;
  salary: string;
  closeDate: string;
} {
  // Format deadline date
  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return "Until filled";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return "Until filled";
    }
  };

  return {
    id: jobPost.id,
    title: jobPost.title,
    category: jobPost.placeTag?.name || "Location not specified", // Use place tag (location) as category
    workingHours: jobPost.jobDetails.workingHours || "Flexible",
    contract: jobPost.jobDetails.contract ? "Yes" : "No", // Convert boolean to string
    salary: jobPost.jobDetails.salary || "Negotiate",
    closeDate: formatDate(jobPost.jobDetails.closeDate),
  };
}

// Export types
export type { ApiJobPost as JobPost };
