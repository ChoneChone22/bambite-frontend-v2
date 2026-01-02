// Product Mapper - Maps API response to frontend Product type
import { ApiProduct, ApiCategoryValue, ProductCategory } from "../api/products";
import { Product } from "@/components/MenuSection";

/**
 * Map API category value (NOODLE, FRIED_RICE, etc.) to frontend category display name
 */
function mapApiCategoryToFrontendCategory(apiCategory: ApiCategoryValue): Product["category"] {
  const categoryMap: Record<ApiCategoryValue, Product["category"]> = {
    NOODLE: "Noodle",
    FRIED_RICE: "Fried Rice",
    MAIN_DISH: "Main Dish",
    SOUP: "Soup",
    SALAD_SIDE_DISH: "Salad (Side Dish)",
    SIDE_DISH: "Side Dish",
    APPETIZER: "Appetizer",
  };
  return categoryMap[apiCategory] || "Noodle";
}

/**
 * Map frontend category display name to API category value
 */
export function mapFrontendCategoryToApiCategory(frontendCategory: Product["category"]): ApiCategoryValue {
  const categoryMap: Record<Product["category"], ApiCategoryValue> = {
    "Noodle": "NOODLE",
    "Fried Rice": "FRIED_RICE",
    "Main Dish": "MAIN_DISH",
    "Soup": "SOUP",
    "Salad (Side Dish)": "SALAD_SIDE_DISH",
    "Side Dish": "SIDE_DISH",
    "Appetizer": "APPETIZER",
  };
  return categoryMap[frontendCategory] || "NOODLE";
}

/**
 * Convert API product to frontend Product type
 */
export function mapApiProductToProduct(apiProduct: ApiProduct): Product {
  return {
    id: apiProduct.id,
    title: apiProduct.name,
    // titleThai: apiProduct.name, // API doesn't have titleThai, commented out for now
    titleThai: "", // Empty string since API doesn't provide titleThai
    price: parseFloat(apiProduct.price),
    description: apiProduct.description || "",
    image: apiProduct.imageUrls?.[0] || "/product-images/product-1.webp",
    category: mapApiCategoryToFrontendCategory(apiProduct.category),
  };
}

/**
 * Convert multiple API products to frontend Product array
 */
export function mapApiProductsToProducts(apiProducts: ApiProduct[]): Product[] {
  return apiProducts.map(mapApiProductToProduct);
}

