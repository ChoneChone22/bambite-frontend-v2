// Food Menu Page - Production Ready
// Updated to use dynamic categories and new API structure

"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import MenuBackground from "@/components/MenuBackground";
import FilterPanel from "@/components/FilterPanel";
import { Product } from "@/components/MenuSection";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { getProducts, getActiveCategories } from "@/lib/api/products";
import { mapApiProductsToProducts } from "@/lib/utils/productMapper";
import type { ApiCategory } from "@/lib/types/api.types";

export default function FoodMenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch active categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const response = await getActiveCategories();

        if (response.status === "success" && response.data) {
          setCategories(response.data);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        // Continue with empty categories - fallback behavior
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products from API
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Build API params
      const apiParams = {
        limit: 100, // Fetch up to 100 products
        ...(activeCategoryId && { category: activeCategoryId }), // Use categoryId for filtering
      };

      const response = await getProducts(apiParams);

      if (response.status === "success" && response.data) {
        const mappedProducts = mapApiProductsToProducts(response.data);
        setProducts(mappedProducts);
      } else {
        setError("Failed to load products");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to load products. Please check if the API is running and accessible.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [activeCategoryId]);

  // Fetch products when category changes
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);

    if (category === "All") {
      setActiveCategoryId(null);
    } else {
      // Find category ID from categories list
      const found = categories.find((cat) => cat.name === category);
      setActiveCategoryId(found?.id || null);
    }
  };

  // Build category list for display
  const displayCategories = [
    "All",
    ...categories.map((cat) => cat.name),
  ];

  return (
    <MenuBackground>
      <div className="min-h-screen w-full relative">
        {/* Vine Decoration - Top Left */}
        <div className="absolute -top-36 left-0 z-10 mt-12 ml-12 lg:mt-16 lg:ml-16">
          <div className="relative w-[160px] h-[240px] lg:w-[200px] lg:h-[320px]">
            <Image
              src="/product-assets/vine-food-menu.webp"
              alt="Vine decoration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Header */}
        <div className="relative z-10 pt-28 sm:pt-20 md:pt-24 pb-8 px-4 sm:px-6 lg:px-0">
          <div className="max-w-7xl mx-auto relative">
            {/* Mobile Header */}
            <div className="lg:hidden">
              <div className="flex items-start justify-between mb-6">
                <div className="font-chillax-semibold text-[#181e24] leading-[0.95]">
                  <p className="text-[48px] mb-0">BamBite</p>
                  <p className="text-[48px]">Menu</p>
                </div>
                <div className="font-['Post_No_Bills_Colombo_SemiBold',sans-serif] text-[#8fa5ae] text-[56px] sm:text-[64px] leading-none font-semibold mt-2">
                  C4
                </div>
              </div>
              <div className="text-center mb-6">
                <div className="flex items-center justify-center">
                  <div className="flex-none rotate-[341deg]">
                    <p className="font-indie-flower leading-[0.82] not-italic text-[#ff9e3e] text-[16px] text-nowrap uppercase">
                      All the best
                      <br />
                      in one place
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:block">
              <div
                className="bg-clip-text bg-gradient-to-b font-chillax-semibold from-[#181e24] leading-[0.82] not-italic text-[55px] to-[#293f55] ml-[350px]"
                style={{ WebkitTextFillColor: "transparent" }}
              >
                <p className="mb-0">BamBite</p>
                <p>Menu</p>
              </div>
              <div className="absolute left-[550px] top-[40px] flex-none">
                <div className="flex-none rotate-[341deg]">
                  <p className="font-indie-flower leading-[0.82] not-italic text-[#ff9e3e] text-[20px] text-nowrap uppercase">
                    All the best
                    <br />
                    in one place
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 relative z-10">
          {/* Mobile Horizontal Category Tabs */}
          <div className="lg:hidden mb-8">
            <div className="bg-[#181e24] rounded-lg py-6 px-8">
              {categoriesLoading ? (
                <div className="flex gap-6 overflow-x-auto scrollbar-hide">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-4 w-20 bg-white/10 rounded animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex gap-6 overflow-x-auto scrollbar-hide">
                  {displayCategories.map((category) => {
                    const isActive =
                      category.toLowerCase() === activeCategory.toLowerCase();
                    return (
                      <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className="flex items-center gap-2 whitespace-nowrap transition-opacity hover:opacity-80"
                      >
                        {isActive && (
                          <div className="relative w-[17px] h-[11px] flex-shrink-0">
                            <Image
                              src="/filter-assets/arrow-icon.svg"
                              alt=""
                              width={17}
                              height={11}
                            />
                          </div>
                        )}
                        <span
                          className={`font-['Space_Mono',monospace] text-[13px] font-bold uppercase ${
                            isActive
                              ? "text-[#489adc] opacity-90"
                              : "text-white opacity-50"
                          }`}
                        >
                          {category}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[282px_1fr] gap-8 lg:gap-12 pb-16">
            {/* Desktop Filter Panel */}
            <div className="hidden lg:block w-full lg:w-auto">
              {categoriesLoading ? (
                <div className="w-[282px] h-[400px] bg-[#181e24] rounded-lg p-6 flex flex-col gap-4">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-8 bg-white/10 rounded animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                <FilterPanel
                  categories={displayCategories}
                  activeCategory={activeCategory}
                  onCategoryChange={handleCategoryChange}
                />
              )}
            </div>

            {/* Products Grid */}
            <div className="w-full">
              {loading ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <p className="text-red-600 text-lg text-center">{error}</p>
                  <button
                    onClick={fetchProducts}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              ) : products.length === 0 ? (
                <div className="flex items-center justify-center py-20">
                  <p className="text-[#273b4f] text-lg">
                    No products found in this category
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      image={product.image}
                      title={product.title}
                      titleThai={product.titleThai}
                      price={product.price}
                      description={product.description}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MenuBackground>
  );
}
