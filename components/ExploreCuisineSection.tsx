// Explore All New Cuisine Section component
"use client";

import Image from "next/image";
import Link from "next/link";

type ExploreCuisineSectionProps = {
  title?: string;
  image?: string;
  decorativeText?: string;
};

export default function ExploreCuisineSection({
  title = "Explore All New Cuisine",
  image = "/home-assets/hero/explore.webp",
  decorativeText = "Everything new",
}: ExploreCuisineSectionProps) {
  return (
    <div className="relative w-full min-h-[508px]">
      {/* Background image with overlay */}
      <div className="absolute h-[508.262px] left-0 top-0 w-full">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            className="absolute max-w-none object-cover size-full"
          />
          <div className="absolute bg-[rgba(0,0,0,0.1)] inset-0" />
        </div>
      </div>

      {/* Decorative vector line */}
      <div className="absolute flex h-[19.417px] items-center justify-center left-1/2 top-0 translate-x-[-50%] w-[1480.904px] hidden lg:block">
        <div className="flex-none -scale-y-100">
          <div className="h-[19.417px] relative w-[1480.904px]">
            <Image
              src="/decorative-assets/vector-207.svg"
              alt=""
              fill
              sizes="1481px"
              className="block max-w-none size-full"
            />
          </div>
        </div>
      </div>

      {/* Vertical separator line */}
      <div className="absolute flex h-[2.019px] items-center justify-center left-0 top-0 w-[1539.902px] hidden lg:block">
        <div className="flex-none rotate-90">
          <div className="h-[1539.902px] relative w-[2.019px]">
            <div className="absolute inset-[0_-99.05%_0_0]">
              <Image
                src="/career-assets/group-180.svg"
                alt=""
                fill
                sizes="2px"
                className="block max-w-none size-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content - Clickable container */}
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-24 pb-16 px-4 sm:px-6 lg:px-0 min-h-[508px] flex items-center overflow-visible">
        <div className="max-w-7xl mx-auto w-full">
          <Link
            href="/menu"
            className="relative inline-block cursor-pointer transition-opacity duration-300 hover:opacity-90 ml-[300px] sm:ml-[320px] lg:ml-[350px]"
            aria-label="Explore all new cuisine - Go to menu"
          >
            <h2 className="font-chillax-semibold leading-[0.95] not-italic text-[32px] sm:text-[44px] md:text-[52px] lg:text-[69.339px] text-white mb-8 sm:mb-12">
              {title.includes("New Cuisine") ? (
                <>
                  {title.replace(" New Cuisine", "")}
                  <br />
                  New Cuisine
                </>
              ) : (
                <>
                  Explore All
                  <br />
                  New Cuisine
                </>
              )}
            </h2>

            {/* Arrow icon - positioned to the right in its original location */}
            <div className="absolute top-1/2 left-[calc(100%+80px)] -translate-y-1/2 h-[108.284px] w-[119.52px] hidden lg:block">
              <Image
                src="/footer-assets/group-184.svg"
                alt=""
                fill
                sizes="120px"
                className="block max-w-none size-full"
                data-node-id="609:7874"
              />
            </div>
          </Link>
        </div>
      </div>

      {/* "Everything new" decorative text - hidden on mobile for cleaner look */}
      <div className="absolute flex h-[79.667px] items-center justify-center left-[calc(50%+101.69px)] bottom-[100px] translate-x-[-50%] w-[173.279px] hidden lg:block">
        <div className="flex-none rotate-[341deg]">
          <p
            className="font-indie-flower leading-[0.82] not-italic relative text-[#ff9e3e] text-[10px] sm:text-[14px] md:text-[20px] text-center text-nowrap uppercase"
            data-node-id="609:8244"
          >
            {decorativeText}
          </p>
        </div>
      </div>
    </div>
  );
}
