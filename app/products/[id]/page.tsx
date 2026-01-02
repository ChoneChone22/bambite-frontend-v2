// Product Details Page
"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import ProductDetailsBackground from "@/components/ProductDetailsBackground";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductDetailsPanel from "@/components/ProductDetailsPanel";
import RelatedProductsSection from "@/components/RelatedProductsSection";
import { Product } from "@/components/MenuSection";
import { getProductById, getProducts } from "@/lib/api/products";
import { mapApiProductsToProducts } from "@/lib/utils/productMapper";

// Product data type for details page
type ProductData = {
  id: string;
  title: string;
  titleThai: string;
  price: number;
  currency: string;
  description: string;
  images: string[];
  sizes: { id: string; label: string }[];
  faqs: { id: string; question: string; answer: string }[];
};

export default function ProductDetailsPage() {
  const params = useParams();
  const id = (params?.id as string) || "";
  const [product, setProduct] = useState<ProductData | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the product
        const apiProduct = await getProductById(id);
        if (!apiProduct) {
          setError("Product not found");
          setLoading(false);
          return;
        }

        // Map API product to ProductData
        const mappedProduct: ProductData = {
          id: apiProduct.id,
          title: apiProduct.name,
          // titleThai: apiProduct.name, // API doesn't have titleThai, commented out for now
          titleThai: "", // Empty string since API doesn't provide titleThai
          price: parseFloat(apiProduct.price),
          currency: "THB",
          description: apiProduct.description || "",
          images: apiProduct.imageUrls.length > 0 
            ? apiProduct.imageUrls 
            : ["/product-images/product-1.webp"], // Fallback image
          sizes: [
            { id: "small", label: "Small" },
            { id: "big", label: "Big" },
          ], // Default sizes - adjust if API provides sizes
          faqs: [
            {
              id: "1",
              question: "What is Bam's bites?",
              answer: apiProduct.description || "A delicious treat from BamBite.",
            },
          ], // Default FAQ - adjust if API provides FAQs
        };

        setProduct(mappedProduct);

        // Fetch related products (other products from same category or all products)
        const response = await getProducts({ limit: 10 });
        if (response.status === "success") {
          const allProducts = mapApiProductsToProducts(response.data);
          // Filter out current product and get up to 3 related products
          const related = allProducts
            .filter((p) => p.id !== id)
            .slice(0, 3);
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductData();
    }
  }, [id]);

  const handleAddToCart = (quantity: number, sizeId: string) => {
    console.log("Add to cart:", { quantity, sizeId, productId: id });
    // Implement cart logic here
  };

  const handleBuyNow = (quantity: number, sizeId: string) => {
    console.log("Buy now:", { quantity, sizeId, productId: id });
    // Implement checkout logic here
  };

  if (loading) {
    return (
      <ProductDetailsBackground>
        <div className="min-h-screen w-full flex items-center justify-center">
          <div className="text-white text-xl">Loading product...</div>
        </div>
      </ProductDetailsBackground>
    );
  }

  if (error || !product) {
    return (
      <ProductDetailsBackground>
        <div className="min-h-screen w-full flex items-center justify-center">
          <div className="text-white text-xl">{error || "Product not found"}</div>
        </div>
      </ProductDetailsBackground>
    );
  }

  return (
    <ProductDetailsBackground>
      <div className="min-h-screen w-full">
        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 pb-4 sm:pb-6 md:pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-start">
            {/* Left Column - Image Gallery */}
            <div className="w-full">
              <ProductImageGallery
                images={product.images}
                productName={product.title}
              />
            </div>

            {/* Right Column - Product Details */}
            <div className="w-full flex justify-center lg:justify-start">
              <ProductDetailsPanel
                productId={product.id}
                title={product.title}
                titleThai={product.titleThai}
                price={product.price}
                currency={product.currency}
                description={product.description}
                image={product.images?.[0]}
                sizes={product.sizes}
                faqs={product.faqs}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
              />
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <RelatedProductsSection products={relatedProducts} />
      </div>
    </ProductDetailsBackground>
  );
}
