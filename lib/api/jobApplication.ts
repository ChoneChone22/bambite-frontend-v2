// Job Application API Service - Production Ready with Rate Limiting
import axios, { AxiosError } from "axios";
import type {
  JobApplicationResponse,
  ApiErrorResponse,
  RateLimitError,
} from "../types/api.types";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL || "";
  }
  return process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "";
};

const apiClient = axios.create({
  baseURL: getBaseUrl(),
  timeout: 30000, // 30 seconds for file upload
});

/**
 * Submit job application with CV upload
 * Rate limit: 3 requests per 15 minutes per IP
 * @param formData - FormData containing application fields and CV file
 * @throws {RateLimitError} When rate limit is exceeded (429)
 * @throws {Error} For other API errors
 */
export async function submitJobApplication(
  formData: FormData
): Promise<JobApplicationResponse> {
  try {
    const baseURL = getBaseUrl();
    const endpoint =
      baseURL && baseURL.includes("/api/v1")
        ? "/apply-jobs"
        : "/api/v1/apply-jobs";

    if (process.env.NODE_ENV === "development") {
      console.log("Submitting job application to:", baseURL + endpoint);
    }

    const response = await apiClient.post<JobApplicationResponse>(
      endpoint,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiErrorResponse | RateLimitError>;

      // Handle rate limiting (429)
      if (axiosError.response?.status === 429) {
        const rateLimitData = axiosError.response.data as RateLimitError;
        const retryAfter = rateLimitData.retryAfter || 15; // Default 15 minutes

        const errorMessage =
          rateLimitData.message ||
          `Too many job applications submitted. Please try again in ${retryAfter} minutes.`;

        const error = new Error(errorMessage) as Error & {
          code: string;
          retryAfter: number;
        };
        error.code = "RATE_LIMIT_EXCEEDED";
        error.retryAfter = retryAfter;
        throw error;
      }

      // Handle file size/type errors (413, 415)
      if (axiosError.response?.status === 413) {
        throw new Error("File is too large. Maximum size is 3MB.");
      }

      if (axiosError.response?.status === 415) {
        throw new Error("Invalid file type. Please upload a PDF file.");
      }

      // Handle validation errors (400)
      if (axiosError.response?.status === 400) {
        const apiError = axiosError.response.data as ApiErrorResponse;
        throw new Error(
          apiError.message || "Invalid form data. Please check your inputs."
        );
      }

      // Handle other errors
      const errorMessage =
        axiosError.response?.data?.message ||
        (axiosError.code === "ECONNABORTED"
          ? "Request timeout. Please try again."
          : axiosError.code === "ERR_NETWORK"
          ? "Network error. Please check your connection."
          : "Failed to submit application. Please try again.");

      throw new Error(errorMessage);
    }

    console.error("Unknown error submitting job application:", error);
    throw new Error("An unexpected error occurred. Please try again.");
  }
}

// Export types
export type { JobApplicationResponse };

