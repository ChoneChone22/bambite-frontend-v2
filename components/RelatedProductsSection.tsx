// Related Products Section component
import Image from "next/image";
import ProductCard from "./ProductCard";
import { Product } from "./MenuSection";

type RelatedProductsSectionProps = {
  products: Product[];
  title?: string;
};

export default function RelatedProductsSection({
  products,
  title = "You may also like",
}: RelatedProductsSectionProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full bg-white">
      {/* Base gradient background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgb(206, 216, 219) 0%, rgb(173, 189, 190) 100%), linear-gradient(90deg, rgb(245, 245, 245) 0%, rgb(245, 245, 245) 100%)",
        }}
      />

      {/* Texture overlays */}
      <div className="absolute inset-0">
        {/* Metal 1 overlay */}
        <div className="absolute inset-0 mix-blend-soft-light opacity-80">
          <Image
            src="/background-assets/metal-overlay-bg.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover pointer-events-none"
            priority
          />
        </div>

        {/* Grunge overlay */}
        <div className="absolute flex inset-0 items-center justify-center mix-blend-soft-light">
          <div className="flex-none h-full scale-y-[-100%] w-full">
            <div className="opacity-30 relative size-full">
              <Image
                src="/background-assets/grunge-overlay-bg.webp"
                alt=""
                fill
                sizes="100vw"
                className="object-cover pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute flex inset-0 items-center justify-center mix-blend-soft-light">
          <div className="flex-none h-full rotate-[180deg] scale-y-[-100%] w-full">
            <div
              className="opacity-80 size-full"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(128, 128, 128, 0.6) 0%, rgb(128, 128, 128) 19.684%, rgba(128, 128, 128, 0.3) 70.46%, rgb(128, 128, 128) 100%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full py-4 sm:py-6 md:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] font-semibold from-[#1b232a] leading-none not-italic text-[32px] sm:text-[40px] md:text-[48px] to-[#315273] mb-4 sm:mb-6"
            style={{ WebkitTextFillColor: "transparent" }}
          >
            {title === "You may also like" ? (
              <>
                You may
                <br />
                also like
              </>
            ) : (
              title
            )}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                titleThai={product.titleThai}
                price={product.price}
                description={product.description}
                size="small"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
