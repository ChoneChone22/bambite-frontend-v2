// Circle Window component
"use client";

import Image from "next/image";
import { ReactNode } from "react";

type CircleWindowProps = {
  children?: ReactNode;
  className?: string;
};

export default function CircleWindow({
  children,
  className = "",
}: CircleWindowProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Circle Window Frame */}
      <div className="relative w-full h-full">
        <Image
          src="/about-assets/circle-window.webp"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
        />
      </div>

      {/* Content inside window */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}

