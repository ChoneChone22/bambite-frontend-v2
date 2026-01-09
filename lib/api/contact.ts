// Contact API Service - Production Ready with Rate Limiting
import axios, { AxiosError } from "axios";
import type {
  ContactFormPayload,
  ContactFormResponse,
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
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

/**
 * Submit contact form
 * Rate limit: 5 requests per 15 minutes per IP
 * @throws {RateLimitError} When rate limit is exceeded (429)
 * @throws {Error} For other API errors
 */
export async function submitContactForm(
  payload: ContactFormPayload
): Promise<ContactFormResponse> {
  try {
    const baseURL = getBaseUrl();
    const endpoint =
      baseURL && baseURL.includes("/api/v1") ? "/contacts" : "/api/v1/contacts";

    if (process.env.NODE_ENV === "development") {
      console.log("Submitting contact form to:", baseURL + endpoint);
    }

    const response = await apiClient.post<ContactFormResponse>(
      endpoint,
      payload
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
          `Too many contact form submissions. Please try again in ${retryAfter} minutes.`;

        const error = new Error(errorMessage) as Error & {
          code: string;
          retryAfter: number;
        };
        error.code = "RATE_LIMIT_EXCEEDED";
        error.retryAfter = retryAfter;
        throw error;
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
          : "Failed to submit contact form. Please try again.");

      throw new Error(errorMessage);
    }

    console.error("Unknown error submitting contact form:", error);
    throw new Error("An unexpected error occurred. Please try again.");
  }
}

// Export types
export type { ContactFormPayload, ContactFormResponse };

