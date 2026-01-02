// Product Image Gallery component
"use client";

import Image from "next/image";
import { useState } from "react";

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
    <div className="content-stretch flex gap-[14px] items-start w-full">
      {/* Thumbnail strip - Hidden on mobile, visible on larger screens */}
      <div className="hidden md:flex content-stretch flex-col gap-[10px] items-start relative shrink-0 w-[65px]">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={`h-[80px] relative shrink-0 w-full transition-opacity ${
              selectedImageIndex === index ? "opacity-100" : "opacity-60 hover:opacity-80"
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

      {/* Main image display */}
      <div className="h-[240px] sm:h-[300px] md:h-[380px] lg:h-[480px] relative shrink-0 w-full md:w-[380px]">
        <Image
          src={mainImage}
          alt={productName}
          fill
          sizes="(max-width: 768px) 100vw, 380px"
          className="object-cover rounded-lg"
          priority
        />
      </div>
    </div>
  );
}

