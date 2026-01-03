// Hero Info Panel component
"use client";

import Image from "next/image";
import GradientText from "./GradientText";

type HeroInfoPanelProps = {
  title: string;
  description: string;
  ctaText: string;
  ctaLink?: string;
  decorativeText?: string;
};

export default function HeroInfoPanel({
  title,
  description,
  ctaText,
  ctaLink = "/menu",
  decorativeText = "",
}: HeroInfoPanelProps) {
  // Split title into two lines: "Made to melt" and "your stress"
  const titleParts = title.split(" your ");
  const firstLine = titleParts[0] || "Made to melt";
  const secondLine = titleParts[1] ? `your ${titleParts[1]}` : "your stress";

  return (
    <div className="relative z-10 w-full max-w-[363px] md:max-w-[400px] lg:max-w-[444px] mx-auto md:mx-0">
      {/* Container with explicit aspect ratio and minimum height */}
      <div
        className="relative w-full min-h-[133px] md:min-h-[185px]"
        style={{ aspectRatio: "363/133" }}
      >
        {/* Blue plate background image - lowest layer */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/home-assets/hero/hero-section-blue-plate-bg.webp"
            alt="Blue plate background"
            fill
            sizes="(max-width: 768px) 363px, (max-width: 1024px) 400px, 444px"
            className="object-cover"
            priority
            quality={100}
          />
        </div>

        {/* Title text - middle layer */}
        <div className="absolute inset-0 flex items-center justify-start p-4 md:p-6 lg:p-8 z-10">
          <div className="w-full">
            <GradientText
              text={firstLine}
              fontSize="32px"
              className="mb-0 text-[18px] md:text-[36px] lg:text-[40px]"
            />
            <GradientText
              text={secondLine}
              fontSize="32px"
              className="mt-0 text-[18px] md:text-[36px] lg:text-[40px]"
            />
          </div>
        </div>

        {/* Character image - top layer on right side */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 md:-translate-y-1/4 w-[130px] h-[110px] md:w-[155px] md:h-[132px] z-20">
          <Image
            src="/home-assets/hero/bambite-char-hero.png"
            alt="Bam character"
            fill
            sizes="(max-width: 768px) 130px, 155px"
            className="object-contain object-right-bottom"
            priority
            quality={100}
          />
        </div>

        {/* Decorative text "all of them" - hidden on mobile, visible on desktop */}
        <div className="absolute right-[20%] top-[45%] z-15 hidden md:block">
          <p className="font-['Scribo_Pro',sans-serif] text-[#ffa953] text-[18px] lg:text-[20px] uppercase leading-[0.82] text-center rotate-[-19deg]">
            {decorativeText}
          </p>
        </div>
      </div>
    </div>
  );
}
