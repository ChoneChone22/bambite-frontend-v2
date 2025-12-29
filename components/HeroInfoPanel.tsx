// Hero Info Panel component
"use client";

import BluePlate from "./BluePlate";
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
      <BluePlate
        width="100%"
        height="185px"
        decorativeText={decorativeText}
        showScrews={true}
        showBreakLine={true}
        showDecorativeText={true}
        className="w-full"
      >
        {/* Title text - split into two lines, using simple padding */}
        <div className="relative z-10 p-5 sm:p-6 md:p-8">
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
      </BluePlate>
    </div>
  );
}
