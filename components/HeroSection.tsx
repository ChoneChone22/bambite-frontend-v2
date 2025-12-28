// Hero Section component
"use client";

import Image from "next/image";
import HomeBackground from "./HomeBackground";
import HeroInfoPanel from "./HeroInfoPanel";
import OrangeSeeDetailButton from "./OrangeSeeDetailButton";
import DescriptionTextBox from "./DescriptionTextBox";
import VerticalBar from "./VerticalBar";

type HeroSectionProps = {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
};

export default function HeroSection({
  title = "Made to melt your stress",
  description = "Arcu pretium morbi nisi felis gravida aenean feugiat. Luctus nec laoreet egestas vulputate. Fringilla varius aliquam dolor sed molestie.",
  ctaText = "SEE MENU",
  ctaLink = "/menu",
}: HeroSectionProps) {
  return (
    <HomeBackground>
      <div className="relative w-full min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:min-h-[853px]">
        {/* Title is now inside HeroInfoPanel, so we remove this separate title */}

        {/* Orange "See Detail" Button - Mobile responsive */}
        <div className="relative lg:absolute z-10 px-4 sm:px-6 lg:px-0 pt-8 lg:pt-0 lg:left-[calc(62.5%+17.75px)] lg:top-[660px] flex items-center justify-center lg:block xl:left-[calc(62.5%+17.75px)]">
          <OrangeSeeDetailButton
            href={ctaLink}
            text="See Detail"
            size="small"
            className="sm:!w-[95px] sm:!h-[95px] lg:!w-[107px] lg:!h-[107px]"
          />
        </div>

        {/* Hero Info Panel */}
        <HeroInfoPanel
          title={title}
          description={description}
          ctaText={ctaText}
          ctaLink={ctaLink}
        />

        {/* Description Text Box - Mobile responsive */}
        <div className="relative lg:absolute z-10 px-4 sm:px-6 lg:px-0 pt-8 lg:pt-0 lg:left-[calc(68.75%+29.96px)] lg:top-[660px] lg:w-[400.169px] xl:left-[calc(68.75%+29.96px)]">
          <div className="w-full max-w-[400.169px] mx-auto lg:mx-0">
            <DescriptionTextBox
              text={description}
              width="100%"
              showSilverPlate={true}
            />
          </div>
        </div>

        {/* Decorative elements - Group 174 (Right Arrow) and Group 175 (Left Arrow) */}
        <div className="absolute h-[23.465px] left-[calc(93.75%+5.92px)] top-[504.92px] w-[20.425px] hidden md:block z-10">
          <div className="relative w-full h-full">
            <Image
              src="/footer-assets/group-174.svg"
              alt=""
              width={20}
              height={23}
              className="block max-w-none w-full h-full object-contain"
              style={{ opacity: 0.4 }}
            />
          </div>
        </div>
        <div className="absolute flex h-[23.465px] items-center justify-center left-[calc(93.75%+5.92px)] top-[598.38px] w-[20.425px] md:block z-10">
          <div className="flex-none rotate-180 -scale-y-100 w-full h-full">
            <div className="relative w-full h-full">
              <Image
                src="/footer-assets/group-175.svg"
                alt=""
                width={20}
                height={23}
                className="block max-w-none w-full h-full object-contain"
                style={{ opacity: 0.4 }}
              />
            </div>
          </div>
        </div>
        <div className="absolute h-[2px] left-[calc(93.75%-13.9px)] top-[567.6px] w-[61.527px] hidden md:block z-10">
          <div className="absolute inset-[-100%_0_0_0]">
            <Image
              src="/footer-assets/break.svg"
              alt=""
              fill
              sizes="62px"
              className="block max-w-none w-full h-full"
            />
          </div>
        </div>

        {/* Vertical decorative bar */}
        <div className="absolute left-[calc(93.75%-16.65px)] top-[475.2px] hidden md:block z-10">
          {/* <VerticalBar /> */}
        </div>
      </div>
    </HomeBackground>
  );
}
