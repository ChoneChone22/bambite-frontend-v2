// Product Image Gallery component
"use client";

import Image from "next/image";
import { useState } from "react";
import { designTokens } from "@/constants/designTokens";

type ProductImageGalleryProps = {
  images: string[];
  productName: string;
};

export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const mainImage = images[selectedImageIndex] || images[0];

  return (
    <div className="w-full">
      {/* Desktop Layout: Vertical thumbnails on left + main image */}
      <div className="hidden md:flex content-stretch gap-[14px] items-start w-full">
        {/* Thumbnail strip - Vertical on desktop */}
        <div className="flex content-stretch flex-col gap-[10px] items-start relative shrink-0 w-[65px]">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`h-[80px] relative shrink-0 w-full transition-opacity ${
                selectedImageIndex === index
                  ? "opacity-100"
                  : "opacity-60 hover:opacity-80"
              }`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                sizes="65px"
                className="object-cover rounded"
              />
              {selectedImageIndex === index && (
                <div className="absolute inset-[-7.76%_-10.87%_-9.49%_-10.87%] border-2 border-white rounded" />
              )}
            </button>
          ))}
        </div>

        {/* Main image display - Desktop */}
        <div className="h-[380px] lg:h-[480px] relative shrink-0 w-[380px]">
          {/* Decorative frame border effect */}
          <div className="absolute inset-[-3.76%_-4.93%_-4.06%_-4.93%] pointer-events-none z-10">
            <div
              className="w-full h-full rounded-lg border-4 border-[#2a2a2a] opacity-40"
              style={{
                boxShadow:
                  "inset 0 0 20px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.2)",
              }}
            />
          </div>
          <Image
            src={mainImage}
            alt={productName}
            fill
            sizes="380px"
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </div>

      {/* Mobile Layout: Main image on top + horizontal thumbnails below */}
      <div className="md:hidden flex flex-col gap-4 w-full">
        {/* Main image display - Mobile with clipped corners frame */}
        <div className="h-[340px] sm:h-[400px] relative w-full">
          {/* Outer frame with clipped corners effect */}
          <div className="absolute inset-0 w-full h-full">
            <div
              className="w-full h-full bg-gradient-to-br from-[#3a3a3a] to-[#1a1a1a] opacity-30"
              style={{
                clipPath: `polygon(
                  30px 0, 
                  100% 0, 
                  100% calc(100% - 30px), 
                  calc(100% - 30px) 100%, 
                  0 100%, 
                  0 30px
                )`,
              }}
            />
          </div>
          {/* Main image with clipped corners */}
          <div
            className="relative w-full h-full overflow-hidden"
            style={{
              clipPath: `polygon(
                30px 0, 
                100% 0, 
                100% calc(100% - 30px), 
                calc(100% - 30px) 100%, 
                0 100%, 
                0 30px
              )`,
            }}
          >
            <Image
              src={mainImage}
              alt={productName}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Horizontal thumbnail strip - Mobile */}
        <div className="flex gap-[10.36px] items-start overflow-x-auto scrollbar-hide px-1">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`h-[80.077px] relative shrink-0 w-[63.541px] transition-opacity ${
                selectedImageIndex === index
                  ? "opacity-100"
                  : "opacity-60 hover:opacity-80"
              }`}
            >
              {/* Thumbnail with clipped corners */}
              <div
                className="relative w-full h-full overflow-hidden"
                style={{
                  clipPath: `polygon(
                    8px 0, 
                    100% 0, 
                    100% calc(100% - 8px), 
                    calc(100% - 8px) 100%, 
                    0 100%, 
                    0 8px
                  )`,
                }}
              >
                <Image
                  src={image}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              {selectedImageIndex === index && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    clipPath: `polygon(
                      8px 0, 
                      100% 0, 
                      100% calc(100% - 8px), 
                      calc(100% - 8px) 100%, 
                      0 100%, 
                      0 8px
                    )`,
                    boxShadow: "0 0 40px 35px rgba(255, 139, 50, 0.6)",
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
