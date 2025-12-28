// Hero Info Panel component
"use client";

import Image from "next/image";
import Link from "next/link";
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
    <div className="absolute left-1/2 md:left-[calc(62.5%+17.75px)] top-[400px] sm:top-[450px] md:top-[475px] translate-x-[-50%] md:translate-x-0 z-10 w-[340px] sm:w-[380px] md:w-[400px] lg:w-[444px]">
      <BluePlate
        width="100%"
        height="185px"
        decorativeText={decorativeText}
        showScrews={true}
        showBreakLine={true}
        showDecorativeText={true}
        className="w-full"
      >
        {/* Title text - split into two lines, positioned on the left with gradient */}
        <div className="absolute left-[20px] sm:left-[25px] md:left-[30px] top-[30px] sm:top-[35px] md:top-[40px] z-10">
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

