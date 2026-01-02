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
  decorativeText = "all of them",
}: HeroInfoPanelProps) {
  // Split title into two lines: "Made to melt" and "your stress"
  const titleParts = title.split(" your ");
  const firstLine = titleParts[0] || "Made to melt";
  const secondLine = titleParts[1] ? `your ${titleParts[1]}` : "your stress";

  return (
    <div className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] md:max-w-[400px] lg:max-w-[444px]">
      <div className="relative w-full aspect-[444/185]">
        {/* Blue plate background image */}
        <Image
          src="/home-assets/hero/hero-section-blue-plate-bg.webp"
          alt="Blue plate background"
          fill
          sizes="(max-width: 768px) 100vw, 444px"
          className="object-cover w-full h-full"
          priority
        />

        {/* Character image - positioned on the right side of blue plate */}
        <div className="absolute right-0 top-3/4 -translate-y-1/2 w-[35%] h-[85%] z-20">
          <Image
            src="/home-assets/hero/bambite-char-hero.png"
            alt="Bam character"
            fill
            sizes="(max-width: 768px) 100vw, 155px"
            className="object-contain object-right"
            priority
          />
        </div>

        {/* Title text - split into two lines, using simple padding */}
        <div className="absolute inset-0 flex items-center justify-start p-5 sm:p-6 md:p-8 z-10">
          <div>
            <GradientText
              text={firstLine}
              fontSize="28px"
              className="mb-0 sm:text-[32px] md:text-[36px] lg:text-[40px]"
            />
            <GradientText
              text={secondLine}
              fontSize="28px"
              className="mt-0 sm:text-[32px] md:text-[36px] lg:text-[40px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
