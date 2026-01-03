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
  title = "Tradition meets New Imagination",
  description = "The authentic taste added with modern twists, creativity & the joys of Bam's little souls.",
  ctaText = "SEE MENU",
  ctaLink = "/menu",
}: HeroSectionProps) {
  return (
    <HomeBackground>
      {/* Container with responsive layout */}
      <div className="w-full h-full min-h-screen md:min-h-0 flex flex-col justify-end md:justify-start md:items-end px-4 sm:px-6 lg:px-8 xl:px-12 pb-12 md:pb-0">
        <div className="flex flex-col w-full md:w-auto md:mt-40 lg:mt-56 xl:mt-64">
          {/* Mobile Layout: Stacked vertically */}
          <div className="flex md:hidden flex-col items-center w-full ">
            {/* Hero Info Panel */}
            <HeroInfoPanel
              title={title}
              description={description}
              ctaText={ctaText}
              ctaLink={ctaLink}
            />

            {/* Description and See Detail Button - Side by Side */}
            <div className="w-full max-w-[363px] flex items-stretch">
              {/* Description Box - Left side */}
              <div className="flex-1 bg-[#3d4450] border-[2px] border-[#2a3442] p-4">
                <p className="font-['DM_Sans',sans-serif] text-white text-[11px] leading-[1.5] opacity-75 font-normal">
                  {description}
                </p>
              </div>

              {/* See Detail Button - Right side, matches description height */}
              <div className="shrink-0 w-[90px]">
                <OrangeSeeDetailButton
                  href={ctaLink}
                  text="See Detail"
                  size="small"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Desktop Layout: Original design */}
          <div className="hidden md:flex flex-col">
            {/* Row 1: Hero Info Panel + Vertical Bar */}
            <div className="flex flex-col lg:flex-row items-start">
              <HeroInfoPanel
                title={title}
                description={description}
                ctaText={ctaText}
                ctaLink={ctaLink}
              />
              <VerticalBarSection />
            </div>

            {/* Row 2: See Detail Button + Description Text Box */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center">
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
      </div>
    </HomeBackground>
  );
}
