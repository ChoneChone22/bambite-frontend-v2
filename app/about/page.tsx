// About Page
"use client";

import Image from "next/image";
import AboutNavigation from "@/components/AboutNavigation";

export default function AboutPage() {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Section 1 - with about-bg.webp - ONLY intro text */}
      <section className="relative w-full min-h-screen">
        {/* Background for Section 1 */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/about-assets/about-bg.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Texture Overlays for Section 1 */}
        <div className="absolute contents inset-0">
          <div className="absolute h-full left-[0.03%] mix-blend-soft-light opacity-80 right-[0.02%] top-0">
            <Image
              src="/product-assets/metal-overlay.webp"
              alt=""
              fill
              sizes="100vw"
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            />
          </div>
          <div className="absolute flex h-full items-center justify-center left-[-0.02%] mix-blend-soft-light right-[0.01%] top-0">
            <div className="flex-none h-full -scale-y-100 w-full">
              <div className="opacity-30 relative size-full">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                >
                  <Image
                    src="/product-assets/grunge-overlay.webp"
                    alt=""
                    fill
                    sizes="100vw"
                    className="absolute max-w-none object-cover size-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content for Section 1 - ONLY intro text */}
        <div className="relative z-10 min-h-screen flex items-end justify-center px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 md:pb-24">
          <div className="w-full max-w-[900px] text-center">
            <p className="font-['Chillax_Variable',sans-serif] font-medium leading-[1.2] not-italic text-[28px] text-white">
              In a future where human race extinct and the start of new species,
              Bam, a curious blue creature, discovered something ancient and
              magical.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 - with bg-2.webp - ALL other content */}
      <section className="relative block w-full overflow-hidden m-0 p-0">
        {/* Background for Section 2 */}
        <div className="absolute left-0 right-0 w-full top-0 bottom-0">
          <Image
            src="/about-assets/bg-2.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Texture Overlays for Section 2 */}
        <div className="absolute contents inset-0">
          <div className="absolute h-full left-[0.03%] mix-blend-soft-light opacity-80 right-[0.02%] top-0">
            <Image
              src="/product-assets/metal-overlay.webp"
              alt=""
              fill
              sizes="100vw"
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            />
          </div>
          <div className="absolute flex h-full items-center justify-center left-[-0.02%] mix-blend-soft-light right-[0.01%] top-0">
            <div className="flex-none h-full -scale-y-100 w-full">
              <div className="opacity-30 relative size-full">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                >
                  <Image
                    src="/product-assets/grunge-overlay.webp"
                    alt=""
                    fill
                    sizes="100vw"
                    className="absolute max-w-none object-cover size-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content for Section 2 - ALL content */}
        <div className="relative z-10 pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1400px] mx-auto">
            <div className="space-y-12 sm:space-y-16 md:space-y-20">
              {/* Circle Window - ONLY in Section 2 */}
              <div className="flex justify-center">
                <div className="relative w-[95%] max-w-[95vw] h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] xl:h-[750px]">
                  <Image
                    src="/about-assets/circle-window.webp"
                    alt=""
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Logo and "This's how BamBite has started." side by side */}
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
                {/* "This's how BamBite has started." */}
                <div className="flex-1">
                  <p
                    className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] font-semibold from-[#181e24] leading-[0.92] not-italic relative text-[40px] sm:text-[48px] md:text-[52px] lg:text-[56px] to-[#293f55] tracking-[-1.28px]"
                    style={{ WebkitTextFillColor: "transparent" }}
                  >
                    <span className="block">This&apos;s how BamBite</span>
                    <span className="block">has started.</span>
                  </p>
                </div>

                {/* Logo - uses about-logo.webp */}
                <div className="relative w-[200px] h-[100px] sm:w-[250px] sm:h-[125px] lg:w-[300px] lg:h-[150px] shrink-0">
                  <Image
                    src="/about-assets/about-logo.webp"
                    alt="About Bambite"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Main Story Text */}
              <div className="w-full flex justify-end">
                <div className="w-full max-w-[609px]">
                  <p className="font-['Chillax_Variable',sans-serif] font-medium leading-[1.2] not-italic text-[28px] text-[#273b4f]">
                    What begins in Bam&apos;s world - his discoveries, his
                    creativity, his joyful little recipes - is now being shared
                    with you. Every dish is an invitation to connect, to feel
                    comfort, and to experience new flavours carried from his
                    home to yours, wherever you are. No matter how much the
                    world changes, Bam believes one thing will always stay the
                    same: food is happiness, comfort, and connection. BamBite
                    exists to connect cultures, generations, and moments through
                    the simple happiness of great food.
                  </p>
                </div>
              </div>

              {/* Values Section - Combined Component */}
              <div className="w-full flex justify-center">
                <div className="flex flex-col gap-8 lg:gap-8 w-full max-w-[1250px]">
                  {/* Value 1 */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-8">
                    <div className="flex flex-col gap-10 lg:gap-[40px] lg:w-[701px]">
                      <p
                        className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] font-semibold from-[#181e24] leading-[0.92] not-italic relative text-[50px] sm:text-[58px] md:text-[66px] lg:text-[90px] to-[#293f55] tracking-[-1.8px]"
                        style={{ WebkitTextFillColor: "transparent" }}
                      >
                        Carefree Spirit, True to Bam
                      </p>
                      <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] text-[17px] text-[#273b4f] w-[225.602px]">
                        BamBite stay true to ourselves, designed to brighten
                        your day, lift your mood, and remind you not to take
                        life too seriously. Bam&apos;s spirit guides us -
                        carefree, happy, optimistic. We believe food should be
                        fun, uplifting, and full of personality
                      </p>
                    </div>
                    <p className="font-['Space_Mono',sans-serif] font-bold leading-[0.92] not-italic text-[72px] sm:text-[84px] md:text-[90px] lg:text-[96px] text-[#8fa5ae] tracking-[-1.92px] shrink-0 whitespace-nowrap">
                      01
                    </p>
                  </div>

                  {/* Value 2 */}
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">
                    <div className="hidden lg:block lg:flex-1" />
                    <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-[32px] lg:w-[755px]">
                      <div className="flex items-start justify-center shrink-0">
                        <p className="font-['Space_Mono',sans-serif] font-bold leading-[0.92] not-italic text-[72px] sm:text-[84px] md:text-[90px] lg:text-[96px] text-[#8fa5ae] tracking-[-1.92px] whitespace-nowrap">
                          02
                        </p>
                      </div>
                      <div className="flex flex-col gap-[26px] flex-1">
                        <p
                          className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] font-semibold from-[#181e24] leading-[0.92] not-italic relative text-[50px] sm:text-[58px] md:text-[66px] lg:text-[90px] to-[#293f55] tracking-[-1.8px]"
                          style={{ WebkitTextFillColor: "transparent" }}
                        >
                          Connection through Food
                        </p>
                        <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] text-[17px] text-[#273b4f] w-[225.602px]">
                          We bring people together through shared flavors and
                          stories. Food is how we bring worlds, cultures, and
                          generations together. Every dish is crafted to make
                          people feel closer—no matter where they come from.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Value 3 */}
                  <div className="flex flex-col gap-8 lg:gap-[32px] lg:w-[608px]">
                    <p className="font-['Space_Mono',sans-serif] font-bold leading-[0.92] not-italic text-[72px] sm:text-[84px] md:text-[90px] lg:text-[96px] text-[#8fa5ae] tracking-[-1.92px]">
                      03
                    </p>
                    <p
                      className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] font-semibold from-[#181e24] leading-[0.92] not-italic relative text-[50px] sm:text-[58px] md:text-[66px] lg:text-[90px] to-[#293f55] tracking-[-1.8px]"
                      style={{ WebkitTextFillColor: "transparent" }}
                    >
                      Innovation with Purpose
                    </p>
                    <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] text-[17px] text-[#273b4f] w-[334px]">
                      We reimagine tradition with curiosity without losing
                      original souls.Through research, experimentation, and
                      design, even when reinventing recipes, we stay true to the
                      core: real ingredients, real flavors, real stories, and
                      craft better experiences, elevate flavors, and keep
                      culinary heritage alive in new ways that surprise and
                      delight.
                    </p>
                  </div>

                  {/* Value 4 */}
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">
                    <div className="hidden lg:block lg:flex-1" />
                    <div className="flex flex-col gap-9 lg:gap-[36px] lg:items-end lg:w-[621px]">
                      <div className="flex flex-col gap-7 lg:gap-[28px] lg:w-[337.746px] lg:items-start">
                        <p className="font-['Space_Mono',sans-serif] font-bold leading-[0.92] not-italic text-[72px] sm:text-[84px] md:text-[90px] lg:text-[96px] text-[#8fa5ae] tracking-[-1.92px] w-full">
                          04
                        </p>
                        <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] text-[17px] text-[#273b4f] w-full">
                          From ingredient sourcing to packaging and shelf-life,
                          BamBite ensures every bite meets the same high
                          standard of taste, safety, and design, wherever
                          it&apos;s enjoyed.
                        </p>
                      </div>
                      <p
                        className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] font-semibold from-[#181e24] leading-[0.92] not-italic relative text-[50px] sm:text-[58px] md:text-[66px] lg:text-[90px] to-[#293f55] tracking-[-1.8px]"
                        style={{ WebkitTextFillColor: "transparent" }}
                      >
                        Quality with Consistency
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - with about-bg-2.webp - Vision only */}
      <section className="relative block w-full min-h-screen overflow-hidden m-0 p-0 -mt-[8px]">
        {/* Background for Section 3 */}
        <div className="absolute left-0 right-0 w-full top-[-8px] h-[calc(100%+16px)]">
          <Image
            src="/about-assets/about-bg-2.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover lg:object-contain"
            priority
          />
        </div>

        {/* Texture Overlays for Section 3 */}
        <div className="absolute contents inset-0">
          <div className="absolute h-full left-[0.03%] mix-blend-soft-light opacity-80 right-[0.02%] top-0">
            <Image
              src="/product-assets/metal-overlay.webp"
              alt=""
              fill
              sizes="100vw"
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            />
          </div>
          <div className="absolute flex h-full items-center justify-center left-[-0.02%] mix-blend-soft-light right-[0.01%] top-0">
            <div className="flex-none h-full -scale-y-100 w-full">
              <div className="opacity-30 relative size-full">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                >
                  <Image
                    src="/product-assets/grunge-overlay.webp"
                    alt=""
                    fill
                    sizes="100vw"
                    className="absolute max-w-none object-cover size-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content for Section 3 - Vision only */}
        <div className="relative z-10 min-h-screen flex items-end pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1400px] mx-auto w-full">
            <div className="w-full max-w-[800px] space-y-4 sm:space-y-6">
              <p className="font-['Space_Mono',sans-serif] font-bold leading-none text-[11px] text-[#273b4f] uppercase">
                Vision
              </p>
              <p
                className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] font-semibold from-[#f9f9f9] leading-none not-italic relative text-[40px] to-[#a6b5c0] tracking-[-0.8px]"
                style={{ WebkitTextFillColor: "transparent" }}
              >
                To revive the joy of Asian traditional treats that connect
                people together, while reinventing for the modern world, keeping
                culture alive through fun, flavor, and imagination
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - with bg-4.webp - Location content */}
      <section className="relative block w-full overflow-hidden m-0 p-0 -mt-[8px]">
        {/* Background for Section 4 */}
        <div className="absolute left-0 right-0 w-full top-[-8px] h-[calc(100%+16px)]">
          <Image
            src="/about-assets/bg-4.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Texture Overlays for Section 4 */}
        <div className="absolute contents inset-0">
          <div className="absolute h-full left-[0.03%] mix-blend-soft-light opacity-80 right-[0.02%] top-0">
            <Image
              src="/product-assets/metal-overlay.webp"
              alt=""
              fill
              sizes="100vw"
              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            />
          </div>
          <div className="absolute flex h-full items-center justify-center left-[-0.02%] mix-blend-soft-light right-[0.01%] top-0">
            <div className="flex-none h-full -scale-y-100 w-full">
              <div className="opacity-30 relative size-full">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none"
                >
                  <Image
                    src="/product-assets/grunge-overlay.webp"
                    alt=""
                    fill
                    sizes="100vw"
                    className="absolute max-w-none object-cover size-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content for Section 4 - Location content */}
        <div className="relative z-10 pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1400px] mx-auto">
            <div className="space-y-12 sm:space-y-16 md:space-y-20">
              {/* "Now, Bam's in BKK at these locations" Heading */}
              <div className="w-full">
                <p
                  className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] font-semibold from-[#f9f9f9] leading-[0.92] not-italic relative text-[64px] to-[#a6b5c0] tracking-[-1.28px]"
                  style={{ WebkitTextFillColor: "transparent" }}
                >
                  <span className="block">Now, Bam&apos;s in BKK</span>
                  <span className="block   ">at these locations</span>
                </p>
              </div>

              {/* "my hideouts" Subheading */}
              <div className="w-full">
                <p className="font-['Stick_No_Bills',sans-serif] leading-[0.82] text-[40px] sm:text-[50px] md:text-[60px] lg:text-[66px] text-[#ffa953]">
                  my hideouts
                </p>
              </div>

              {/* Location Windows with Map Images */}
              <div className="flex flex-col items-center gap-8 lg:gap-12 w-full">
                {/* Pair 1: Location Window 1 + Map 1 */}
                <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12 w-full max-w-[1600px]">
                  <div className="relative w-full max-w-[700px] h-[300px] sm:h-[400px] lg:h-[500px]">
                    <Image
                      src="/about-assets/location-window-1.webp"
                      alt="Location 1"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* Mobile Map 1 */}
                  <div className="lg:hidden relative w-full max-w-[600px] h-[180px] sm:h-[240px]">
                    <Image
                      src="/about-assets/mobile-map1.png"
                      alt="Map 1 Mobile"
                      fill
                      className="object-contain"
                    />
                    {/* Location Info Overlay - Right Side */}
                    <div className="absolute right-[28%] top-[30%] h-full flex flex-col gap-3 p-3 pointer-events-none">
                      <p
                        className="text-[12px] font-['Chillax_Variable',sans-serif] font-semibold leading-[0.82] bg-clip-text bg-gradient-to-b from-[#f9f9f9] to-[#a6b5c0]"
                        style={{ WebkitTextFillColor: "transparent" }}
                      >
                        Pathuwan
                      </p>
                      <p className="text-[6px] font-['DM_Sans',sans-serif] font-normal leading-[1] text-white/55">
                        Location
                      </p>
                      <p className="text-[5px] font-['Space_Mono',sans-serif] font-bold leading-none text-white uppercase">
                        See on map
                      </p>
                    </div>
                  </div>
                  {/* Desktop Map 1 */}
                  <div className="hidden lg:flex lg:relative lg:w-full lg:max-w-[600px] lg:h-[300px]">
                    <Image
                      src="/about-assets/map-1.webp"
                      alt="Map 1"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Pair 2: Location Window 2 + Map 2 */}
                <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12 w-full max-w-[1600px]">
                  <div className="relative w-full max-w-[700px] h-[300px] sm:h-[400px] lg:h-[500px]">
                    <Image
                      src="/about-assets/location-window-2.webp"
                      alt="Location 2"
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* Mobile Map 2 */}
                  <div className="lg:hidden relative w-full max-w-[600px] h-[180px] sm:h-[240px]">
                    <Image
                      src="/about-assets/mobile-map1.png"
                      alt="Map 2 Mobile"
                      fill
                      className="object-contain"
                    />
                    {/* Location Info Overlay - Right Side */}
                    <div className="absolute right-[28%] top-[30%] h-full flex flex-col gap-3 p-3 pointer-events-none">
                      <p
                        className="text-[12px] font-['Chillax_Variable',sans-serif] font-semibold leading-[0.82] bg-clip-text bg-gradient-to-b from-[#f9f9f9] to-[#a6b5c0]"
                        style={{ WebkitTextFillColor: "transparent" }}
                      >
                        Pathuwan
                      </p>
                      <p className="text-[6px] font-['DM_Sans',sans-serif] font-normal leading-[1] text-white/55">
                        Location
                      </p>
                      <p className="text-[5px] font-['Space_Mono',sans-serif] font-bold leading-none text-white uppercase">
                        See on map
                      </p>
                    </div>
                  </div>
                  {/* Desktop Map 2 */}
                  <div className="hidden lg:flex lg:relative lg:w-full lg:max-w-[600px] lg:h-[300px]">
                    <Image
                      src="/about-assets/map-2.webp"
                      alt="Map 2"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <AboutNavigation />
    </div>
  );
}
