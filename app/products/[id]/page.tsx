// Product Details Page - Production Ready with Real Backend Data
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

// Product option type (mapped from API)
type ProductOption = {
  id: string;
  name: string; // e.g., "size", "spice_level"
  displayName: string; // e.g., "Size", "Spice Level"
  values: string[]; // e.g., ["small", "large"] or ["mild", "medium", "hot", "extra hot"]
  displayType: "buttons" | "dropdown"; // "buttons" for ≤2, "dropdown" for >2
};

// Product data type for details page
type ProductData = {
  id: string;
  title: string;
  titleThai: string | null;
  price: number;
  currency: string;
  description: string;
  ingredients: string | null;
  images: string[];
  options: ProductOption[]; // Dynamic options from backend
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

        // Debug logging in development
        if (process.env.NODE_ENV === "development") {
          console.log("🔍 Product data:", {
            id: apiProduct.id,
            name: apiProduct.name,
            thaiName: apiProduct.thaiName,
            hasProductOptions: apiProduct.productOptions?.length || 0,
          });
          console.log("🔍 Product Options:", apiProduct.productOptions);
        }

        // Map options from API
        let mappedOptions: ProductOption[] = [];

        // Extract options from productOptions (many-to-many join table)
        if (apiProduct.productOptions && apiProduct.productOptions.length > 0) {
          if (process.env.NODE_ENV === "development") {
            console.log("✅ Extracting options from productOptions array");
          }

          // Extract the nested option objects from the join table
          mappedOptions = apiProduct.productOptions.map((productOption) => ({
            id: productOption.option.id,
            name: productOption.option.name,
            displayName: productOption.option.displayName,
            values: productOption.option.optionLists,
            // Use buttons for ≤2 options, dropdown for >2
            displayType:
              productOption.option.optionLists.length <= 2
                ? "buttons"
                : "dropdown",
          }));

          if (process.env.NODE_ENV === "development") {
            console.log("✅ Mapped options:", mappedOptions);
          }
        } else if (process.env.NODE_ENV === "development") {
          console.log("ℹ️ No options available: Product has no productOptions");
        }

        // Map API product to ProductData
        const mappedProduct: ProductData = {
          id: apiProduct.id,
          title: apiProduct.name,
          titleThai: apiProduct.thaiName || null,
          price: parseFloat(apiProduct.price.toString()),
          currency: "THB",
          description: apiProduct.description || "",
          ingredients: apiProduct.ingredients || null,
          images:
            apiProduct.images && apiProduct.images.length > 0
              ? apiProduct.images
              : ["/product-images/product-1.webp"], // Fallback image
          options: mappedOptions,
          faqs: [
            {
              id: "1",
              question: "What is this dish?",
              answer:
                apiProduct.description || "A delicious treat from BamBite.",
            },
            ...(apiProduct.ingredients
              ? [
                  {
                    id: "2",
                    question: "What are the ingredients?",
                    answer: apiProduct.ingredients,
                  },
                ]
              : []),
          ],
        };

        setProduct(mappedProduct);

        // Fetch related products (from same category)
        const response = await getProducts({
          category: apiProduct.category.id,
          limit: 10,
        });
        if (response.status === "success" && response.data) {
          const allProducts = mapApiProductsToProducts(response.data);
          // Filter out current product and get up to 3 related products
          const related = allProducts.filter((p) => p.id !== id).slice(0, 3);
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

  const handleAddToCart = (
    quantity: number,
    selectedOptions: Record<string, string>
  ) => {
    console.log("Add to cart:", { quantity, selectedOptions, productId: id });
    // Implement cart logic here
  };

  const handleBuyNow = (
    quantity: number,
    selectedOptions: Record<string, string>
  ) => {
    console.log("Buy now:", { quantity, selectedOptions, productId: id });
    // Implement checkout logic here
  };

  if (loading) {
    return (
      <ProductDetailsBackground>
        <div className="min-h-screen w-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white/70 text-lg">Loading product...</p>
          </div>
        </div>
      </ProductDetailsBackground>
    );
  }

  if (error || !product) {
    return (
      <ProductDetailsBackground>
        <div className="min-h-screen w-full flex items-center justify-center px-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md">
            <p className="font-medium mb-2">Error Loading Product</p>
            <p className="text-sm">{error || "Product not found"}</p>
          </div>
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
                ingredients={product.ingredients}
                image={product.images?.[0]}
                options={product.options}
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
