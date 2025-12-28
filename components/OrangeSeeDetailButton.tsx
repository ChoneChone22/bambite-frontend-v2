// Orange "See Detail" Button Component
// Extracted from Figma node 609-7767
"use client";

import Image from "next/image";
import Link from "next/link";
import { designTokens } from "@/constants/designTokens";

type OrangeSeeDetailButtonProps = {
  href?: string;
  text?: string;
  size?: "small" | "default" | "large";
  className?: string;
  onClick?: () => void;
};

export default function OrangeSeeDetailButton({
  href,
  text = "See Detail",
  size = "default",
  className = "",
  onClick,
}: OrangeSeeDetailButtonProps) {
  // Responsive sizes
  const sizeMap = {
    small: "80px",
    default: "107px",
    large: "120px",
  };

  const textSizeMap = {
    small: "10px",
    default: "13px",
    large: "15px",
  };

  const widthMap = {
    small: "70px",
    default: "79px",
    large: "90px",
  };

  const buttonSize = sizeMap[size];
  const textSize = textSizeMap[size];
  const textWidth = widthMap[size];

  const content = (
    <div
      className={`relative ${className}`}
      style={{ width: buttonSize, height: buttonSize }}
    >
      {/* Orange plate background */}
      <div className="absolute left-0 size-full top-0">
        <div className="absolute flex inset-0 items-center justify-center">
          <div className="flex-none rotate-180 -scale-y-100 size-full">
            <div className="relative size-full">
              <div className="absolute inset-[-1.5%]">
                <Image
                  src="/footer-assets/rectangle-121-orange.svg"
                  alt=""
                  fill
                  sizes={`${buttonSize}`}
                  className="block max-w-none w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Texture overlays */}
        <div className="absolute contents inset-[0_-0.08%_0_0]">
          {/* Metal 1 overlay */}
          <div
            className="absolute mix-blend-overlay pointer-events-none"
            style={{
              inset: designTokens.effects.orangeButton.metalOverlay.inset,
              opacity: designTokens.effects.orangeButton.metalOverlay.opacity,
            }}
          >
            <Image
              src="/product-assets/metal-overlay.png"
              alt=""
              fill
              sizes={`${buttonSize}`}
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            />
          </div>

          {/* Grunge overlay */}
          <div
            className="absolute mix-blend-lighten pointer-events-none"
            style={{
              inset: designTokens.effects.orangeButton.grungeOverlay.inset,
              opacity: designTokens.effects.orangeButton.grungeOverlay.opacity,
            }}
          >
            <Image
              src="/product-assets/grunge-overlay.png"
              alt=""
              fill
              sizes={`${buttonSize}`}
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            />
          </div>

          {/* Gradient overlay */}
          <div className="absolute flex inset-[0_-0.08%_0_0] items-center justify-center mix-blend-soft-light">
            <div className="flex-none h-full rotate-180 -scale-y-100 w-full">
              <div
                className="size-full"
                style={{
                  opacity:
                    designTokens.effects.orangeButton.gradientOverlay.opacity,
                  backgroundImage: designTokens.colors.gradientOverlay,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Text */}
      <p
        className="absolute font-['Space_Mono',sans-serif] font-bold leading-none left-1/2 not-italic opacity-90 text-center text-white top-[calc(50%-13px)] translate-x-[-50%] uppercase z-10 group-hover:opacity-100 transition-opacity"
        style={{
          fontSize: textSize,
          width: textWidth,
        }}
      >
        {text}
      </p>
    </div>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`relative inline-block group cursor-pointer ${className}`}
      >
        {content}
      </button>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        className={`relative inline-block group cursor-pointer ${className}`}
      >
        {content}
      </Link>
    );
  }

  return <div className={`relative inline-block ${className}`}>{content}</div>;
}
