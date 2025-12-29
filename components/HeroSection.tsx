// Hero Section component
"use client";

import HomeBackground from "./HomeBackground";
import HeroInfoPanel from "./HeroInfoPanel";
import OrangeSeeDetailButton from "./OrangeSeeDetailButton";
import DescriptionTextBox from "./DescriptionTextBox";
import { designTokens } from "@/constants/designTokens";

type HeroSectionProps = {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
};

// Inline Vertical Bar Component (replaces external component)
function VerticalBarInline() {
  return (
    <div
      className="hidden md:block"
      style={{
        width: designTokens.sizes.verticalBar.width,
        height: designTokens.sizes.verticalBar.height,
        borderColor: designTokens.colors.borderDark,
        borderWidth: "3px",
        background: `linear-gradient(to bottom, ${designTokens.colors.gradientDark.from}, ${designTokens.colors.gradientDark.to})`,
      }}
    />
  );
}

// Inline Arrow Component (replaces group-174.svg and group-175.svg)
function ArrowIcon({ flipped = false }: { flipped?: boolean }) {
  return (
    <svg
      width="20.4254"
      height="23.4654"
      viewBox="0 0 20.4254 23.4654"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={flipped ? "rotate-180 scale-y-[-1]" : ""}
      style={{ opacity: 0.4 }}
    >
      <g>
        <path
          d="M8.65137 1.05629L19.1011 8.95797V14.5074L8.65137 22.4091"
          stroke="white"
          strokeWidth="2.64856"
        />
        <path d="M19.1421 11.7542H0" stroke="white" strokeWidth="2.64856" />
      </g>
    </svg>
  );
}

// Inline Break Line Component (replaces break.svg)
function BreakLine() {
  return (
    <svg
      width="61.5269"
      height="4"
      viewBox="0 0 61.5269 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line y1="1" x2="61.5269" y2="1" stroke="black" strokeWidth="2" />
      <line
        opacity="0.2"
        y1="3"
        x2="61.5269"
        y2="3"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
}

// Vertical Bar with Arrows Section
function VerticalBarSection() {
  return (
    <div
      className="hidden md:flex items-center relative"
      style={{ height: designTokens.sizes.verticalBar.height }}
    >
      {/* Vertical Bar as background */}
      <VerticalBarInline />

      {/* Arrows positioned on top of the bar */}
      <div
        className="absolute right-0 flex flex-col items-center justify-center gap-7"
        style={{ height: designTokens.sizes.verticalBar.height }}
      >
        <ArrowIcon />
        <BreakLine />
        <ArrowIcon flipped={true} />
      </div>
    </div>
  );
}

export default function HeroSection({
  title = "Made to melt your stress",
  description = "Arcu pretium morbi nisi felis gravida aenean feugiat. Luctus nec laoreet egestas vulputate. Fringilla varius aliquam dolor sed molestie.",
  ctaText = "SEE MENU",
  ctaLink = "/menu",
}: HeroSectionProps) {
  return (
    <HomeBackground>
      <div className="w-full min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:min-h-[853px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Flexbox Layout: 2 rows, properly aligned */}
        <div className="flex flex-col max-w-7xl mx-auto pt-8 sm:pt-12 md:pt-16 lg:pt-20 absolute right-5 top-64">
          {/* Row 1: Hero Info Panel (left) + Vertical Bar (right) - aligned at top */}
          <div className="flex flex-col lg:flex-row items-start">
            <HeroInfoPanel
              title={title}
              description={description}
              ctaText={ctaText}
              ctaLink={ctaLink}
            />
            <VerticalBarSection />
          </div>

          {/* Row 2: See Detail Button (left) + Description Text Box (right) - aligned at center */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center ">
            <div
              className="shrink-0"
              style={{
                width: designTokens.sizes.descriptionBox.height,
                height: designTokens.sizes.descriptionBox.height,
              }}
            >
              <OrangeSeeDetailButton
                href={ctaLink}
                text="See Detail"
                size="small"
                className="w-full h-full"
              />
            </div>
            <div className="w-full max-w-[400.169px]">
              <DescriptionTextBox
                text={description}
                width="100%"
                showSilverPlate={true}
              />
            </div>
          </div>
        </div>
      </div>
    </HomeBackground>
  );
}
