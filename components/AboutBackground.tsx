// About Background component
"use client";

import Image from "next/image";
import { ReactNode } from "react";

type AboutBackgroundProps = {
  children?: ReactNode;
  className?: string;
};

export default function AboutBackground({
  children,
  className = "",
}: AboutBackgroundProps) {
  return (
    <div
      className={`relative w-full min-h-screen bg-white overflow-hidden ${className}`}
    >
      {/* Main Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/about-assets/about-bg.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Secondary Background Layer (if needed) */}
      {false && (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/about-assets/about-bg-2.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-50"
          />
        </div>
      )}

      {/* Texture Overlays */}
      <div className="absolute contents inset-0">
        <div className="absolute h-full left-[0.03%] mix-blend-soft-light opacity-80 right-[0.02%] top-0">
          <Image
            src="/product-assets/metal-overlay.webp"
            alt=""
            fill
            sizes="100vw"
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          />
        </div>
        <div className="absolute flex h-full items-center justify-center left-[-0.02%] mix-blend-soft-light right-[0.01%] top-0">
          <div className="flex-none h-full -scale-y-100 w-full">
            <div className="opacity-30 relative size-full">
              <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                <Image
                  src="/product-assets/grunge-overlay.webp"
                  alt=""
                  fill
                  sizes="100vw"
                  className="absolute max-w-none object-cover size-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-full items-center justify-center left-[-0.02%] mix-blend-soft-light right-[0.01%] top-0">
          <div className="flex-none h-full rotate-180 -scale-y-100 w-full">
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
      <div className="relative z-10">{children}</div>
    </div>
  );
}

