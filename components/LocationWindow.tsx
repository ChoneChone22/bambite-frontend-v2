// Location Window component
"use client";

import Image from "next/image";
import { ReactNode } from "react";

type LocationWindowProps = {
  variant?: 1 | 2;
  children?: ReactNode;
  className?: string;
};

export default function LocationWindow({
  variant = 1,
  children,
  className = "",
}: LocationWindowProps) {
  const imageSrc =
    variant === 1
      ? "/about-assets/location-window-1.webp"
      : "/about-assets/location-window-2.webp";

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Location Window Frame */}
      <div className="relative w-full h-full">
        <Image
          src={imageSrc}
          alt={`Location window ${variant}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
        />
      </div>

      {/* Content inside window */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {children}
        </div>
      )}
    </div>
  );
}

