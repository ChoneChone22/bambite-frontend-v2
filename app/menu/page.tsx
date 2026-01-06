// Food Menu Page

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import MenuBackground from "@/components/MenuBackground";
import FilterPanel from "@/components/FilterPanel";
import { Product } from "@/components/MenuSection";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api/products";
import {
  mapApiProductsToProducts,
  mapFrontendCategoryToApiCategory,
} from "@/lib/utils/productMapper";

type ProductCategory = Product["category"];

export default function FoodMenuPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    "All",
    "Noodle",
    "Fried Rice",
    "Main Dish",
    "Soup",
    "Salad (Side Dish)",
    "Side Dish",
    "Appetizer",
  ];

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build API params - include category filter if not "All"
        const apiParams: Parameters<typeof getProducts>[0] = {
          limit: 100, // Fetch up to 100 products
        };

        // Add category filter if a specific category is selected
        if (activeCategory !== "All") {
          apiParams.category = mapFrontendCategoryToApiCategory(
            activeCategory as ProductCategory
          );
        }

        const response = await getProducts(apiParams);
        if (response.status === "success") {
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
    };

    fetchProducts();
  }, [activeCategory]); // Re-fetch when category changes

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
              <div className="flex gap-6 overflow-x-auto scrollbar-hide">
                {categories.map((category) => {
                  const isActive =
                    category.toLowerCase() === activeCategory.toLowerCase();
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
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
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[282px_1fr] gap-8 lg:gap-12 pb-16">
            {/* Desktop Filter Panel */}
            <div className="hidden lg:block w-full lg:w-auto">
              <FilterPanel
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>

            {/* Products Grid */}
            <div className="w-full">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <p className="text-[#273b4f] text-lg">Loading products...</p>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-20">
                  <p className="text-red-600 text-lg">{error}</p>
                </div>
              ) : products.length === 0 ? (
                <div className="flex items-center justify-center py-20">
                  <p className="text-[#273b4f] text-lg">No products found</p>
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
