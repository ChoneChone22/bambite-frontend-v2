// Product Mapper - Maps API response to frontend Product type
// Updated for new category structure (object instead of string)
import type { ApiProduct, ApiCategory } from "../types/api.types";
import type { Product } from "@/components/MenuSection";

/**
 * Convert API product to frontend Product type
 * UPDATED: Category is now an object with id, name, status
 */
export function mapApiProductToProduct(apiProduct: ApiProduct): Product {
  return {
    id: apiProduct.id,
    title: apiProduct.name,
    titleThai: apiProduct.thaiName || "", // NEW: Thai name support from API
    price: apiProduct.price,
    description: apiProduct.description || "",
    image: apiProduct.images?.[0] || "/product-images/product-1.webp",
    category: apiProduct.category.name as Product["category"], // Use category.name
  };
}

/**
 * Convert multiple API products to frontend Product array
 */
export function mapApiProductsToProducts(apiProducts: ApiProduct[]): Product[] {
  return apiProducts.map(mapApiProductToProduct);
}

/**
 * Get category ID from category object
 * Useful for filtering by category
 */
export function getCategoryId(category: ApiCategory): string {
  return category.id;
}

/**
 * Check if category is active
 */
export function isCategoryActive(category: ApiCategory): boolean {
  return category.status === "active";
}

/**
 * Map category name to display-friendly format
 * Handles edge cases and ensures consistency
 */
export function formatCategoryName(categoryName: string): string {
  // Already formatted from API, but we can add custom formatting if needed
  return categoryName;
}
