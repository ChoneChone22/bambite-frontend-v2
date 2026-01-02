// Home Page
"use client";

import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import NewTasteSection from "@/components/NewTasteSection";
import ExploreCuisineSection from "@/components/ExploreCuisineSection";
import PortalScrollSection from "@/components/PortalScrollSection";
import { Product } from "@/components/MenuSection";
import { getProducts } from "@/lib/api/products";
import { mapApiProductsToProducts } from "@/lib/utils/productMapper";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts({ limit: 6 }); // Fetch 6 products for home page
        if (response.status === "success") {
          const mappedProducts = mapApiProductsToProducts(response.data);
          // Ensure only maximum 6 products are shown
          setProducts(mappedProducts.slice(0, 6));
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        // Keep empty array on error, component will handle it
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="w-full">
      {/* Hero Section */}
      <HeroSection />

      {/* New Taste Section */}
      <NewTasteSection products={products} />

      {/* Explore All New Cuisine Section */}
      <ExploreCuisineSection />

      {/* Portal Scroll-Through Animation: My Home to Yours → Hi I'm Bam */}
      <PortalScrollSection />
    </main>
  );
}
