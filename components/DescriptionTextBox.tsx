// Description Text Box Component
// Extracted from Figma node 609-7791
"use client";

import Image from "next/image";
import { designTokens } from "@/constants/designTokens";

type DescriptionTextBoxProps = {
  text: string;
  width?: string;
  height?: string;
  className?: string;
  showSilverPlate?: boolean;
};

export default function DescriptionTextBox({
  text,
  width = "400.169px",
  height = "106.916px",
  className = "",
  showSilverPlate = true,
}: DescriptionTextBoxProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{ width, height: "auto", minHeight: height }}
    >
      {/* Main box background */}
      <div
        className="absolute inset-0 border-solid"
        style={{
          backgroundColor: designTokens.colors.darkBg,
          borderColor: designTokens.colors.borderDark,
          borderWidth: "3px",
        }}
      />

      {/* Description text - using simple padding */}
      <div className="relative p-6 sm:p-7 md:p-8">
        <p
          className="font-['DM_Sans',sans-serif] font-medium text-white"
          style={{
            fontSize: designTokens.typography.dmSans.fontSize,
            lineHeight: designTokens.typography.dmSans.lineHeight,
            opacity: 0.7,
            fontVariationSettings: designTokens.typography.dmSans.fontVariationSettings,
          }}
        >
          {text}
        </p>
      </div>

      {/* Silver plate decorative element */}
      {showSilverPlate && (
        <div
          className="absolute right-0 top-0"
          style={{
            width: designTokens.sizes.silverPlate.width,
            height: designTokens.sizes.silverPlate.height,
          }}
        >
          <div className="absolute flex inset-0 items-center justify-center">
            <div className="flex-none rotate-180 -scale-y-100" style={{ width: designTokens.sizes.silverPlate.width, height: designTokens.sizes.silverPlate.height }}>
              <div className="relative size-full">
                <div className="absolute inset-[-1.5%_-10.03%]">
                  <Image
                    src="/footer-assets/rectangle-123.svg"
                    alt=""
                    fill
                    sizes={designTokens.sizes.silverPlate.width}
                    className="block max-w-none w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Metal overlay on silver plate */}
          <div
            className="absolute mix-blend-overlay pointer-events-none"
            style={{
              inset: designTokens.effects.descriptionBox.silverPlate.metalOverlay.inset,
              opacity: designTokens.effects.descriptionBox.silverPlate.metalOverlay.opacity,
            }}
          >
            <Image
              src="/product-assets/metal-overlay.webp"
              alt=""
              fill
              sizes={designTokens.sizes.silverPlate.width}
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}


