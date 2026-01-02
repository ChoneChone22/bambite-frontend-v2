// New Taste Section component
"use client";

import Image from "next/image";
import ProductCard from "./ProductCard";
import { Product } from "./MenuSection";

type NewTasteSectionProps = {
  products: Product[];
};

export default function NewTasteSection({ products }: NewTasteSectionProps) {
  return (
    <div className="relative w-full min-h-[800px] sm:min-h-[1000px] md:min-h-[1200px] lg:min-h-[1458px] bg-gradient-to-b from-[#ced8db] to-[#adbdbd] overflow-hidden">
      {/* Base texture background */}
      <div className="absolute h-full left-0 top-0 w-full hidden lg:block">
        <div
          className="absolute h-[1458.246px] left-[0.04%] mix-blend-soft-light opacity-80 right-0 top-[851.93px]"
          style={{
            backgroundImage:
              "linear-gradient(rgb(206, 216, 219) 0%, rgb(173, 189, 190) 100%), linear-gradient(90deg, rgb(245, 245, 245) 0%, rgb(245, 245, 245) 100%)",
          }}
        >
          <Image
            src="/product-assets/metal-overlay.webp"
            alt=""
            fill
            sizes="100vw"
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          />
        </div>
      </div>

      {/* Texture overlays */}
      <div className="absolute contents left-0 right-0 top-0 hidden lg:block">
        <div className="absolute h-full left-[0.04%] mix-blend-soft-light opacity-80 right-0 top-0">
          <Image
            src="/product-assets/metal-overlay.webp"
            alt=""
            fill
            sizes="100vw"
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          />
        </div>
        <div className="absolute flex h-full items-center justify-center left-0 mix-blend-soft-light right-[0.53%] top-0">
          <div className="flex-none h-full -scale-y-100 w-[1521.967px]">
            <div className="opacity-30 relative size-full">
              <Image
                src="/product-assets/grunge-overlay.webp"
                alt=""
                fill
                sizes="100vw"
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              />
            </div>
          </div>
        </div>
        <div className="absolute flex h-full items-center justify-center left-0 mix-blend-soft-light right-[0.52%] top-0">
          <div className="flex-none h-full rotate-180 -scale-y-100 w-[1521.967px]">
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

      {/* Decorative Vector */}
      <div className="absolute h-[19.417px] left-[calc(37.5%+59px)] top-[20px] w-[264.506px] hidden lg:block">
        <Image
          src="/decorative-assets/vector-205.svg"
          alt=""
          fill
          sizes="265px"
          className="block max-w-none"
        />
      </div>

      {/* Decorative "C4" text */}
      <p className="absolute font-['Post_No_Bills_Colombo',sans-serif] leading-[0.82] left-[calc(12.5%-99.2px)] not-italic text-[120px] sm:text-[160px] md:text-[200px] lg:text-[258.329px] text-[#8fa5ae] text-nowrap top-[50%] translate-y-[-50%] opacity-20 sm:opacity-30 md:opacity-40 lg:opacity-100 hidden md:block">
        C4
      </p>

      {/* Vertical separator line */}
      <div className="absolute h-full left-[calc(12.5%+42.3px)] top-0 w-[2.018px] hidden lg:block">
        <div className="absolute inset-[0_-99.13%_0_0]">
          <Image
            src="/career-assets/group-181.svg"
            alt=""
            fill
            sizes="2px"
            className="block max-w-none size-full"
          />
        </div>
      </div>

      {/* Section Title */}
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-24 pb-8 px-4 sm:px-6 lg:px-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center">
            {/* First line: NEW Taste */}
            <div
              className="bg-clip-text bg-gradient-to-b font-[var(--font-chillax-semibold)] from-[#181e24] leading-[0.82] not-italic text-[48px] sm:text-[56px] md:text-[64px] lg:text-[69.339px] to-[#293f55] mb-0"
              style={{ WebkitTextFillColor: "transparent" }}
            >
              <p className="mb-0">NEW Taste</p>
            </div>
            {/* Second line: NEW + World */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
              <span
                className="bg-clip-text bg-gradient-to-b font-[var(--font-chillax-semibold)] from-[#181e24] leading-[0.82] not-italic text-[48px] sm:text-[56px] md:text-[64px] lg:text-[69.339px] to-[#293f55]"
                style={{ WebkitTextFillColor: "transparent" }}
              >
                NEW
              </span>
              <span className="font-[var(--font-chillax-semibold)] leading-[0.82] not-italic text-[50px] sm:text-[70px] md:text-[85px] lg:text-[100.746px] text-[#cc934e] text-center text-nowrap uppercase">
                World
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="relative z-10 pb-16 px-4 sm:px-6 lg:px-0">
        <div className="max-w-[1400px] mx-auto">
          {/* First Row: 3 products + 1 empty space */}
          <div className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-5 mb-4 sm:mb-5 md:mb-6">
            {products.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-center w-full"
              >
                <div className="w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px]">
                  <ProductCard
                    id={product.id}
                    image={product.image}
                    title={product.title}
                    titleThai={product.titleThai}
                    price={product.price}
                    description={product.description}
                  />
                </div>
              </div>
            ))}
            {/* Empty space after first row products */}
            <div className="flex items-center justify-center w-full">
              {/* Empty space - transparent, same width as product card */}
            </div>
          </div>

          {/* Second Row: 1 empty space + 3 products */}
          <div className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {/* Empty space before second row products */}
            <div className="flex items-center justify-center w-full">
              {/* Empty space - transparent, same width as product card */}
            </div>
            {products.slice(3, 6).map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-center w-full"
              >
                <div className="w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px]">
                  <ProductCard
                    id={product.id}
                    image={product.image}
                    title={product.title}
                    titleThai={product.titleThai}
                    price={product.price}
                    description={product.description}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative text elements - hidden on mobile for cleaner look */}
      <div className="absolute flex h-[79.667px] items-center justify-center left-[calc(50%+101.69px)] bottom-[200px] translate-x-[-50%] w-[173.279px] hidden lg:block">
        <div className="flex-none rotate-[341deg]">
          <p className="font-['Scribo_Pro',sans-serif] leading-[0.82] not-italic relative text-[#ff9e3e] text-[20px] sm:text-[24px] md:text-[29.142px] text-center text-nowrap uppercase">
            Everything new
          </p>
        </div>
      </div>

      <div className="absolute flex h-[43.397px] items-center justify-center left-[calc(81.25%+76.24px)] top-[40%] translate-x-[-50%] w-[137.056px] hidden lg:block">
        <div className="flex-none rotate-[351.629deg]">
          <p className="font-['Scribo_Pro',sans-serif] leading-[0.82] not-italic relative text-[#bb7b37] text-[20px] sm:text-[24px] md:text-[29.142px] text-center text-nowrap uppercase">
            Delicious xP
          </p>
        </div>
      </div>
    </div>
  );
}
