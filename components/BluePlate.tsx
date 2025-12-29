// Blue Plate Component
// Extracted from Figma node 609-7775
"use client";

import Image from "next/image";
import { designTokens } from "@/constants/designTokens";

type BluePlateProps = {
  width?: string;
  height?: string;
  className?: string;
  children?: React.ReactNode;
  showScrews?: boolean;
  showBreakLine?: boolean;
  showDecorativeText?: boolean;
  decorativeText?: string;
  decorativeTextColor?: string;
};

export default function BluePlate({
  width = "444px",
  height = "185px",
  className = "",
  children,
  showScrews = true,
  showBreakLine = true,
  showDecorativeText = true,
  decorativeText = "all of them",
  decorativeTextColor = "#ffa953",
}: BluePlateProps) {
  // Mask asset for texture overlays
  const maskAsset = "/footer-assets/blue-plate-mask.svg";

  // Convert width/height to responsive values for 13.6" MacBook Air
  const isResponsive = width === "100%";
  const responsiveWidth = isResponsive ? "100%" : width;
  const responsiveHeight = height;

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: responsiveWidth,
        height: responsiveHeight,
        minHeight: responsiveHeight,
      }}
    >
      {/* Blue plate background */}
      <div className="absolute flex inset-0 items-center justify-center">
        <div className="flex-none rotate-180 -scale-y-100 w-full h-full">
          <div className="relative size-full">
            <div className="absolute inset-[-0.87%_-0.36%]">
              <Image
                src="/footer-assets/rectangle-122-blue.svg"
                alt=""
                fill
                sizes={isResponsive ? "100vw" : width}
                className="block max-w-none w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Texture overlays with masks */}
      <div className="absolute contents inset-0">
        <div className="absolute contents inset-[0_-0.08%_0_0]">
          {/* Metal 1 overlay with mask */}
          <div
            className="absolute mix-blend-overlay pointer-events-none"
            style={{
              inset: designTokens.effects.bluePlate.metalOverlay.inset,
              opacity: designTokens.effects.bluePlate.metalOverlay.opacity,
              WebkitMaskImage: `url('${maskAsset}')`,
              maskImage: `url('${maskAsset}')`,
              WebkitMaskPosition:
                designTokens.effects.bluePlate.metalOverlay.maskPosition,
              maskPosition:
                designTokens.effects.bluePlate.metalOverlay.maskPosition,
              WebkitMaskSize:
                designTokens.effects.bluePlate.metalOverlay.maskSize,
              maskSize: designTokens.effects.bluePlate.metalOverlay.maskSize,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          >
            <Image
              src="/product-assets/metal-overlay.png"
              alt=""
              fill
              sizes={isResponsive ? "100vw" : width}
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            />
          </div>

          {/* Grunge overlay with mask */}
          <div className="absolute flex inset-[0_-0.08%_0_0] items-center justify-center mix-blend-lighten">
            <div className="flex-none -scale-y-100 w-full h-full">
              <div
                className="relative size-full pointer-events-none"
                style={{
                  opacity: designTokens.effects.bluePlate.grungeOverlay.opacity,
                  WebkitMaskImage: `url('${maskAsset}')`,
                  maskImage: `url('${maskAsset}')`,
                  WebkitMaskPosition:
                    designTokens.effects.bluePlate.grungeOverlay.maskPosition,
                  maskPosition:
                    designTokens.effects.bluePlate.grungeOverlay.maskPosition,
                  WebkitMaskSize:
                    designTokens.effects.bluePlate.grungeOverlay.maskSize,
                  maskSize:
                    designTokens.effects.bluePlate.grungeOverlay.maskSize,
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                }}
              >
                <Image
                  src="/product-assets/grunge-overlay.png"
                  alt=""
                  fill
                  sizes={isResponsive ? "100vw" : width}
                  className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                />
              </div>
            </div>
          </div>

          {/* Gradient overlay with mask */}
          <div className="absolute flex inset-[0_-0.08%_0_0] items-center justify-center mix-blend-soft-light">
            <div className="flex-none rotate-180 -scale-y-100 w-full h-full">
              <div
                className="size-full pointer-events-none"
                style={{
                  opacity:
                    designTokens.effects.bluePlate.gradientOverlay.opacity,
                  backgroundImage: designTokens.colors.gradientOverlay,
                  WebkitMaskImage: `url('${maskAsset}')`,
                  maskImage: `url('${maskAsset}')`,
                  WebkitMaskPosition:
                    designTokens.effects.bluePlate.gradientOverlay.maskPosition,
                  maskPosition:
                    designTokens.effects.bluePlate.gradientOverlay.maskPosition,
                  WebkitMaskSize:
                    designTokens.effects.bluePlate.gradientOverlay.maskSize,
                  maskSize:
                    designTokens.effects.bluePlate.gradientOverlay.maskSize,
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Children content */}
      {children}

      {/* Socket Screws */}
      {showScrews && (
        <>
          <div
            className="absolute size-[15.399px] z-10"
            style={{
              bottom: designTokens.positions.bluePlate.socketScrew1.bottom,
              right: designTokens.positions.bluePlate.socketScrew1.right,
            }}
          >
            <BluePlateSocketScrew />
          </div>
          <div
            className="absolute size-[15.399px] z-10"
            style={{
              top: designTokens.positions.bluePlate.socketScrew2.top,
              right: designTokens.positions.bluePlate.socketScrew2.right,
            }}
          >
            <BluePlateSocketScrew />
          </div>
        </>
      )}

      {/* Break line */}
      {showBreakLine && (
        <div
          className="absolute z-10"
          style={{
            left: designTokens.positions.bluePlate.breakLine.left,
            top: designTokens.positions.bluePlate.breakLine.top,
            width: designTokens.sizes.breakLine.width,
            height: designTokens.sizes.breakLine.height,
          }}
        >
          <Image
            src="/footer-assets/frame-180.svg"
            alt=""
            width={32}
            height={8}
            className="block max-w-none w-full h-full"
          />
        </div>
      )}

      {/* Decorative rotated text */}
      {showDecorativeText && (
        <div
          className="absolute flex items-center justify-center z-10"
          style={{
            left: designTokens.positions.bluePlate.decorativeText.left,
            top: designTokens.positions.bluePlate.decorativeText.top,
            width: designTokens.sizes.decorativeText.width,
            height: designTokens.sizes.decorativeText.height,
            transform: "translateX(-50%)",
          }}
        >
          <div
            className="flex-none"
            style={{
              transform: `rotate(${designTokens.positions.bluePlate.decorativeText.rotation})`,
            }}
          >
            <p
              className="leading-[0.82] not-italic relative text-center text-nowrap uppercase"
              style={{
                fontFamily: designTokens.typography.scriboPro.fontFamily,
                fontSize: designTokens.typography.scriboPro.fontSize,
                lineHeight: designTokens.typography.scriboPro.lineHeight,
                color: decorativeTextColor,
              }}
            >
              {decorativeText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Blue Plate Socket Screw Component (exact specs from Figma)
function BluePlateSocketScrew() {
  return (
    <div className="absolute contents inset-0">
      {/* Outer screw */}
      <div className="absolute flex inset-0 items-center justify-center">
        <div className="flex-none scale-y-[-100%] size-[22.525px]">
          <div
            className="relative rounded-bl-[640.999px] rounded-tl-[640.999px] size-full"
            style={{
              backgroundColor: designTokens.colors.socketBlue,
              boxShadow: designTokens.effects.socketScrew.emboss,
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: `${designTokens.effects.socketScrew.innerShadow1}, ${designTokens.effects.socketScrew.innerShadow2}`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Inner icon */}
      <div className="absolute flex inset-[18.92%_18.93%_18.93%_18.91%] items-center justify-center">
        <div className="flex-none rotate-180 -scale-y-100 size-[14.001px]">
          <div className="relative size-full">
            <div className="absolute inset-[-13.41%_-33.52%_-53.63%_-33.52%]">
              <Image
                src="/footer-assets/screw-icon-blue.svg"
                alt=""
                fill
                className="block max-w-none size-full"
                sizes="14px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
