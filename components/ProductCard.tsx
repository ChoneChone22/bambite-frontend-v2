// ProductCard component for Food Menu page
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

// Inline Break Line Component (replaces break-line.svg)
function BreakLine() {
  return (
    <svg
      width="55.645"
      height="1.919"
      viewBox="0 0 55.645 1.919"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        y1="0.9595"
        x2="55.645"
        y2="0.9595"
        stroke="#182E44"
        strokeWidth="1.91881"
      />
      <line
        opacity="0.2"
        y1="2.87803"
        x2="55.645"
        y2="2.87803"
        stroke="white"
        strokeWidth="1.91881"
      />
    </svg>
  );
}

type ProductCardProps = {
  id: string;
  image: string;
  title: string;
  titleThai: string;
  price: number;
  description: string;
  initialQuantity?: number;
  onAddToCart?: (quantity: number) => void;
  size?: "default" | "small";
};

export default function ProductCard({
  id,
  image,
  title,
  titleThai,
  price,
  description,
  initialQuantity = 1,
  onAddToCart,
  size = "default",
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const { addItem, closeCart } = useCart();
  const router = useRouter();

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
    // Add to cart context - add all quantity at once
    addItem({
      id,
      title,
      titleThai,
      price,
      image,
    });
    // If quantity > 1, add additional items
    for (let i = 1; i < quantity; i++) {
      addItem({
        id,
        title,
        titleThai,
        price,
        image,
      });
    }
    // Close cart drawer immediately (addItem opens it automatically)
    closeCart();
    // Also call optional callback if provided
    if (onAddToCart) {
      onAddToCart(quantity);
    }
    // Redirect to coming-soon page
    router.push("/coming-soon");
  };

  const isSmall = size === "small";
  const maxWidth = isSmall ? "max-w-[280px]" : "max-w-[335px]";
  // Mobile: 193.948px, Desktop: larger
  const topHeight = isSmall
    ? "h-[180px] sm:h-[250px] md:h-[280px] lg:h-[320px]"
    : "max-[400px]:h-[156px] h-[194px] sm:h-[280px] md:h-[340px] lg:h-[380px]";
  const topPaddingX = isSmall
    ? "px-2 sm:px-5 md:px-[26px]"
    : "max-[400px]:px-[8px] px-[10px] sm:px-6 md:px-[31px]";
  const topPaddingY = isSmall
    ? "py-2 sm:py-4 md:py-[20px]"
    : "max-[400px]:py-[10px] py-[12px] sm:py-5 md:py-[24px]";
  const titleSize = isSmall
    ? "text-[14px] sm:text-[16px] md:text-[18px]"
    : "max-[400px]:text-[13px] text-[16px] sm:text-[18px] md:text-[20px]";
  const titleThaiSize = isSmall
    ? "text-[10px] sm:text-[12px] md:text-[13px]"
    : "max-[400px]:text-[10px] text-[12px] sm:text-[14px] md:text-[15px]";
  const priceSize = isSmall
    ? "text-[9px] sm:text-[12px] md:text-[14px]"
    : "max-[400px]:text-[8px] text-[10px] sm:text-[14px] md:text-[16px] lg:text-[17.975px]";
  const descSize = isSmall
    ? "text-[9px] sm:text-[10px] md:text-[11px]"
    : "max-[400px]:text-[8px] text-[10px] sm:text-[11px] md:text-[12px] lg:text-[12.583px]";
  // Mobile: 29.603px, Desktop: larger
  const bottomHeight = isSmall
    ? "h-[36px] sm:h-[42px] md:h-[46px] lg:h-[50px]"
    : "max-[400px]:h-[24px] h-[30px] sm:h-[46px] md:h-[54px] lg:h-[58px]";

  return (
    <Link
      href={`/products/${id}`}
      className={`content-stretch flex flex-col items-center relative size-full w-full ${maxWidth} mx-auto no-underline`}
    >
      {/* Top Section - Orange Plate - Responsive height */}
      <div
        className={`content-stretch flex flex-col gap-[8px] ${topHeight} items-start justify-end ${topPaddingX} ${topPaddingY} relative shrink-0 w-full`}
      >
        {/* Orange plate background (this IS the product image) - Responsive sizing */}
        <div className="absolute flex h-full items-center justify-center left-1/2 top-0 translate-x-[-50%] w-full max-w-[336.001px]">
          <div className="flex-none rotate-[180deg] scale-y-[-100%] w-full h-full">
            <div className="h-full relative w-full">
              <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 336px"
                className="block max-w-none size-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Product content overlay */}
        <div className="content-stretch flex flex-col gap-1 sm:gap-3 md:gap-4 lg:gap-[19px] items-start relative shrink-0 w-full z-10">
          {/* Title and Price */}
          <div className="content-stretch flex gap-1 sm:gap-2 md:gap-3 lg:gap-[13px] items-center relative shrink-0 w-full">
            <div className="basis-0 content-stretch flex flex-col gap-1 sm:gap-[11px] grow items-start leading-[0.82] min-h-px min-w-px relative shrink-0 text-white">
              <p
                className={`font-['Chillax_Variable',sans-serif] not-italic relative shrink-0 ${titleSize} w-full font-semibold text-white`}
              >
                {title}
              </p>
              {/* titleThai commented out - API doesn't provide it */}
              {titleThai && (
                <p
                  className={`font-['Noto_Sans_Thai_Looped',sans-serif] font-medium relative shrink-0 ${titleThaiSize} w-full text-white`}
                >
                  {titleThai}
                </p>
              )}
            </div>
            <div className="bg-[#b9c7d6] content-stretch flex items-center justify-center p-1 sm:p-[4px] md:p-[5.19px] relative rounded-[3.595px] shrink-0">
              <p
                className={`font-['DM_Sans',sans-serif] leading-[0.82] not-italic relative shrink-0 text-[#181e24] ${priceSize} text-nowrap text-right font-medium`}
              >
                {price}THB
              </p>
            </div>
          </div>

          {/* Description - Hidden on mobile, visible on desktop */}
          <p
            className={`font-['DM_Sans',sans-serif] font-medium leading-[1.2] opacity-60 relative shrink-0 ${descSize} text-white w-full hidden md:block`}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Bottom Section - Blue Plate - Responsive height */}
      <div className="flex items-center justify-center relative shrink-0 w-full">
        <div className="flex-none rotate-[180deg] w-full">
          <div
            className={`bg-gradient-to-b content-stretch flex from-[#074980] ${bottomHeight} items-center relative to-[#172743] w-full overflow-hidden`}
            style={{
              clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 30%)",
              border: "5px solid #193551",
            }}
          >
            {/* Texture overlays */}
            <div className="absolute contents inset-[-0.5px_calc(-0.08%-0.5px)_-0.5px_-0.5px]">
              {/* Metal overlay */}
              <div className="absolute inset-[0_-0.08%_0_0.57%] mix-blend-overlay opacity-30">
                <Image
                  src="/product-assets/metal-overlay.webp"
                  alt=""
                  fill
                  sizes="336px"
                  className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none"
                />
              </div>
              {/* Grunge overlay */}
              <div className="absolute flex inset-[0_-0.08%_0_0] items-center justify-center mix-blend-lighten">
                <div className="flex-none h-[58px] scale-y-[-100%] w-full">
                  <div className="opacity-[0.34] relative size-full">
                    <Image
                      src="/product-assets/grunge-overlay.webp"
                      alt=""
                      fill
                      sizes="336px"
                      className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none"
                    />
                  </div>
                </div>
              </div>
              {/* Gradient overlay */}
              <div className="absolute flex inset-[0_-0.08%_0_0] items-center justify-center mix-blend-soft-light">
                <div className="flex-none h-[58px] rotate-[180deg] scale-y-[-100%] w-full">
                  <div
                    className="opacity-30 size-full"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(128, 128, 128, 0.6) 0%, rgb(128, 128, 128) 19.684%, rgba(128, 128, 128, 0.3) 70.46%, rgb(128, 128, 128) 100%)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Content area - Responsive padding and gap */}
            <div className="basis-0 content-stretch flex gap-1 sm:gap-3 md:gap-4 lg:gap-[24px] grow h-full items-center min-h-px min-w-px pl-1 sm:pl-2 md:pl-3 lg:pl-[12px] pr-2 sm:pr-3 md:pr-4 lg:pr-[20px] py-0 relative shrink-0 z-10">
              {/* Shopping cart icon button */}
              <div className="flex items-center justify-center relative shrink-0">
                <div className="flex-none rotate-[180deg]">
                  <button
                    className="content-stretch flex items-center p-[3px] sm:p-[6px] relative rounded-[8px] hover:bg-white/10 transition-colors"
                    aria-label="Shopping cart"
                  >
                    <div className="overflow-clip relative shrink-0 size-[16px] sm:size-[20px] md:size-[24px]">
                      <Image
                        src="/product-assets/shopping-cart-icon.svg"
                        alt=""
                        width={24}
                        height={24}
                        className="block max-w-none size-full"
                      />
                    </div>
                  </button>
                </div>
              </div>

              {/* Add to cart button */}
              <div className="basis-0 flex grow items-center justify-center min-h-px min-w-px relative shrink-0">
                <div className="flex-none rotate-[180deg] w-full">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddToCart();
                    }}
                    className="content-stretch flex gap-[16px] items-center relative w-full justify-center hover:opacity-90 transition-opacity"
                  >
                    <p className="font-['Space_Mono',monospace] leading-none not-italic relative shrink-0 text-[6px] sm:text-[10px] md:text-[11px] lg:text-[12.583px] text-white text-nowrap uppercase font-bold">
                      add to cart
                    </p>
                  </button>
                </div>
              </div>
            </div>

            {/* Break line separator */}
            <div className="flex h-[28px] sm:h-[44px] md:h-[50px] lg:h-[55.645px] items-center justify-center relative shrink-0 w-[1px] sm:w-[1.5px] md:w-[1.919px] z-10">
              <div className="flex-none rotate-[90deg]">
                <BreakLine />
              </div>
            </div>

            {/* Quantity selector - Responsive padding */}
            <div className="content-stretch flex gap-[2px] sm:gap-1 md:gap-2 lg:gap-[8px] h-full items-center justify-center px-1 sm:px-2 md:px-3 lg:px-[14px] py-[2px] sm:py-1 md:py-2 lg:py-[8px] relative shrink-0 z-10">
              {/* Plus button */}
              <div className="flex items-center justify-center relative shrink-0">
                <div className="flex-none rotate-[180deg]">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleIncrement();
                    }}
                    className="content-stretch flex items-center justify-center p-[2px] sm:p-[3px] md:p-[5px] relative rounded-[3px] hover:bg-white/10 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <p className="font-['Space_Mono',monospace] leading-none not-italic relative text-[14px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-nowrap text-white uppercase font-bold">
                      +
                    </p>
                  </button>
                </div>
              </div>

              {/* Quantity display */}
              <div className="flex items-center justify-center relative shrink-0">
                <div className="flex-none rotate-[180deg]">
                  <p className="font-['Space_Mono',monospace] leading-none not-italic relative text-[7px] sm:text-[10px] md:text-[12px] lg:text-[13px] text-nowrap text-white uppercase font-bold">
                    {quantity}
                  </p>
                </div>
              </div>

              {/* Minus button */}
              <div className="flex items-center justify-center relative shrink-0">
                <div className="flex-none rotate-[180deg]">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDecrement();
                    }}
                    className="content-stretch flex items-center justify-center p-[2px] sm:p-[3px] md:p-[5px] relative rounded-[3px] hover:bg-white/10 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <p className="font-['Space_Mono',monospace] leading-none not-italic relative text-[14px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-nowrap text-white uppercase font-bold">
                      -
                    </p>
                  </button>
                </div>
              </div>
            </div>

            {/* Inset shadow */}
            <div className="absolute inset-[-0.5px] pointer-events-none shadow-[inset_3.77px_3.77px_1.153px_0px_rgba(226,239,255,0.15)]" />
          </div>
        </div>
      </div>
    </Link>
  );
}
