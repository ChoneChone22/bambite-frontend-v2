// Home Background component for hero section
"use client";

import Image from "next/image";
import { ReactNode } from "react";

type HomeBackgroundProps = {
  children?: ReactNode;
  className?: string;
};

export default function HomeBackground({
  children,
  className = "",
}: HomeBackgroundProps) {
  return (
    <div
      className={`relative w-full min-h-[853px] overflow-hidden ${className}`}
    >
      {/* Single background image */}
      <div className="absolute h-[853.168px] left-0 top-0 w-full">
        <Image
          src="/home-assets/hero/Home-Hero-img.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover pointer-events-none"
          priority
        />
      </div>

      {/* Dark gradient overlay at top */}
      <div className="absolute bg-gradient-to-t from-[rgba(102,102,102,0)] h-[160px] left-0 mix-blend-multiply to-[rgba(0,0,0,0.42)] top-0 w-full" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
