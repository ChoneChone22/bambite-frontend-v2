// FilterPanel component for Food Menu page

"use client";

import Image from "next/image";

type FilterPanelProps = {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

export default function FilterPanel({
  categories,
  activeCategory,
  onCategoryChange,
}: FilterPanelProps) {
  return (
    <div className="relative size-full w-full sm:w-[282.088px] h-auto sm:h-[369.524px] min-h-[300px] sm:min-h-[369.524px]">
      {/* Background rectangle */}
      <div className="absolute h-full left-0 top-0 w-full sm:w-[282.088px] sm:h-[369.524px]">
        <Image
          src="/filter-assets/rectangle-311.svg"
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 282px"
          className="block max-w-none size-full object-cover"
        />
      </div>

      {/* Border rectangle */}
      {/* <div className="absolute h-full sm:h-[395.524px] left-[-13px] top-[-13px] w-[calc(100%+26px)] sm:w-[308.088px]">
        <div className="absolute inset-[0_0_-0.76%_0]">
          <Image
            src="/filter-assets/rectangle-312.svg"
            alt=""
            fill
            sizes="(max-width: 640px) calc(100vw + 26px), 308px"
            className="block max-w-none size-full object-cover"
            style={{ stroke: "rgba(143, 165, 174, 1)" }}
          />
        </div>
      </div> */}

      {/* Filter title */}
      <p className="absolute font-['Space_Mono',monospace] leading-none left-[20px] sm:left-[30.64px] not-italic opacity-90 text-[13px] text-white top-[24px] sm:top-[36.26px] uppercase font-bold z-10">
        Filter
      </p>

      {/* Category list */}
      <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-[20px] sm:left-[30.64px] top-[60px] sm:top-[74.27px] w-auto sm:w-[84.74px] z-10">
        {categories.map((category) => {
          const isActive =
            category.toLowerCase() === activeCategory.toLowerCase();
          return (
            <div
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`content-stretch flex gap-[6px] items-center relative shadow-[0px_0px_4px_0px_rgba(226,239,255,0.31)] shrink-0 w-full cursor-pointer transition-opacity hover:opacity-80 ${
                isActive ? "" : "opacity-50"
              }`}
            >
              {isActive && (
                <div className="h-[10.899px] relative shrink-0 w-[16.74px]">
                  <div className="absolute inset-[-4.95%_-3.91%_-4.95%_0]">
                    <Image
                      src="/filter-assets/arrow-icon.svg"
                      alt=""
                      width={17}
                      height={11}
                      className="block max-w-none size-full"
                    />
                  </div>
                </div>
              )}
              <p
                className={`font-['Space_Mono',monospace] leading-none relative shrink-0 text-[13px] text-nowrap uppercase font-bold ${
                  isActive
                    ? "text-[#489adc] opacity-90"
                    : "text-white opacity-50"
                }`}
              >
                {category}
              </p>
            </div>
          );
        })}
      </div>

      {/* Decorative wave pattern at bottom - Hidden on mobile */}
      <div className="hidden sm:block absolute left-[66.17px] top-[334.8px] w-[184.285px] h-[9.699px] relative z-10">
        {/* First row - 20 dots */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`row1-${i}`}
            className="absolute bg-[#5c5c5c] size-[4.85px]"
            style={{ left: `${i * 9.76}px`, top: "0px" }}
          />
        ))}
        {/* Second row - 19 dots, offset */}
        {Array.from({ length: 19 }).map((_, i) => (
          <div
            key={`row2-${i}`}
            className="absolute bg-[#5c5c5c] size-[4.85px]"
            style={{ left: `${4.88 + i * 9.76}px`, top: "4.85px" }}
          />
        ))}
      </div>
    </div>
  );
}
