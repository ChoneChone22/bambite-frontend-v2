// Options API Service
import axios, { AxiosError } from "axios";
import type { ApiOption, ApiResponse, ApiErrorResponse } from "../types/api.types";

// Get base URL from environment variable or use default
const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_URL || "";
  }
  return process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "";
};

// Create axios instance
const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
  withCredentials: false,
});

export interface OptionsResponse extends ApiResponse<ApiOption[]> {}

/**
 * Get all options
 * Note: Backend requires admin auth, so this might fail on public pages
 * The backend should ideally populate options in the product response
 * @returns Array of all options or empty array if unauthorized
 */
export async function getOptions(): Promise<OptionsResponse> {
  try {
    const baseURL = getBaseUrl();
    const endpoint =
      baseURL && baseURL.includes("/api/v1") ? "/options" : "/api/v1/options";

    if (process.env.NODE_ENV === "development") {
      console.log("Fetching options from:", baseURL + endpoint);
    }

    const response = await apiClient.get<OptionsResponse>(endpoint);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiErrorResponse>;

      // Handle authentication errors (401/403) - expected on public pages
      if (
        axiosError.response?.status === 401 ||
        axiosError.response?.status === 403
      ) {
        if (process.env.NODE_ENV === "development") {
          console.warn(
            "⚠️ Options endpoint requires authentication. " +
            "Options should be included in the product response by the backend."
          );
        }
        // Return empty array - options should come from product response
        return {
          status: "success",
          data: [],
        };
      }

      const errorMessage =
        axiosError.response?.data?.message ||
        "Failed to fetch options. Using fallback.";

      if (process.env.NODE_ENV === "development") {
        console.warn("Options fetch failed:", errorMessage);
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

/**
 * Get a single option by ID
 * @param id - Option UUID
 * @returns Option or null if not found
 */
export async function getOptionById(id: string): Promise<ApiOption | null> {
  try {
    const baseURL = getBaseUrl();
    const endpoint =
      baseURL && baseURL.includes("/api/v1")
        ? `/options/${id}`
        : `/api/v1/options/${id}`;

    const response = await apiClient.get<ApiResponse<ApiOption>>(endpoint);

    if (response.data.status === "success" && response.data.data) {
      return response.data.data;
    }

    return null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiErrorResponse>;

      if (axiosError.response?.status === 404) {
        return null;
      }

      console.error("Error fetching option by ID:", {
        id,
        status: axiosError.response?.status,
        message: axiosError.response?.data?.message || axiosError.message,
      });
    } else {
      console.error("Unknown error fetching option by ID:", error);
    }

    return null;
  }
}

export type { ApiOption };

