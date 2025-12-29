// Hi, I'm Bam Section component
"use client";

import Image from "next/image";
import Link from "next/link";

type HiImBamSectionProps = {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  mascotImage?: string;
  backgroundImage?: string;
};

export default function HiImBamSection({
  title = "Hi, I'm Bam",
  description = "Arcu pretium morbi nisi felis gravida aenean feugiat. Luctus nec laoreet egestas vulputate. Fringilla varius aliquam dolor sed molestie.",
  ctaText = "INTERESTED? MORE OF ME",
  ctaLink = "/about",
  mascotImage = "/home-assets/hero/mascot-3d.png",
  backgroundImage = "/home-assets/hero/forest-bg.png",
}: HiImBamSectionProps) {
  return (
    <div className="relative w-full min-h-[816px] overflow-clip">
      {/* Background image */}
      <div className="absolute h-[815.525px] left-0 top-0 w-full">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
        >
          <Image
            src={backgroundImage}
            alt="Forest background"
            fill
            sizes="100vw"
            className="absolute max-w-none object-cover size-full"
          />
          <div className="absolute bg-[rgba(0,0,0,0.2)] inset-0" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-24 pb-16 px-4 sm:px-6 lg:px-0">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Mascot */}
            <div className="order-2 lg:order-1">
              <div className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[789.168px] w-full">
                <Image
                  src={mascotImage}
                  alt="Bam mascot"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right side - Text and CTA */}
            <div className="order-1 lg:order-2">
              <h2 className="font-['Chillax_Variable',sans-serif] leading-[0.82] not-italic text-[60px] sm:text-[80px] md:text-[90px] lg:text-[100px] text-center lg:text-left text-white mb-6 sm:mb-8">
                {title}
              </h2>

              {/* Decorative text */}
              <div className="font-['Scribo_Pro',sans-serif] leading-[0.82] not-italic text-[#ffa953] text-[24px] sm:text-[26px] md:text-[28px] lg:text-[29.142px] text-center lg:text-left mb-6">
                <p className="mb-0">You&apos;re about to</p>
                <p>discover more</p>
              </div>

              <p className="font-['DM_Sans',sans-serif] font-medium leading-[1.2] opacity-80 text-[12px] sm:text-[13px] md:text-[14px] text-center lg:text-left text-white mb-8 sm:mb-10 w-full max-w-[320.835px] mx-auto lg:mx-0">
                {description}
              </p>

              {/* CTA Button */}
              <div className="flex items-center justify-center lg:justify-start">
                <Link
                  href={ctaLink}
                  className="flex h-[50px] sm:h-[56px] md:h-[62px] items-center relative w-full max-w-[321px] group"
                >
                  {/* Main Button Body */}
                  <div
                    className="h-full relative w-full bg-gradient-to-b from-[#074980] to-[#172743] overflow-hidden"
                    style={{
                      // This polygon creates the cut on the bottom-right
                      clipPath:
                        "polygon(0% 0%, 100% 0%, 100% 75%, 92% 100%, 0% 100%)",
                      border: "2px solid #193551",
                    }}
                  >
                    {/* 2. Texture overlays */}
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Metal/Grunge Texture */}
                      <div className="absolute inset-0 mix-blend-overlay opacity-30">
                        <Image
                          src="/product-assets/metal-overlay.png"
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Grunge Detail */}
                      <div className="absolute inset-0 mix-blend-lighten opacity-30">
                        <Image
                          src="/product-assets/grunge-overlay.png"
                          alt=""
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* 3. Button Content Wrapper */}
                    <div className="relative z-10 flex items-center h-full px-6 sm:px-8">
                      {/* Text */}
                      <p className="font-['Space_Mono',sans-serif] font-bold leading-none text-[11px] sm:text-[12px] md:text-[13px] lg:text-[13.484px] text-white uppercase group-hover:opacity-90 transition-opacity">
                        {ctaText}
                      </p>

                      {/* Decorative Arrow (Positioned to the right) */}
                      <div className="ml-auto">
                        <Image
                          src="/footer-assets/group-177.svg"
                          alt=""
                          width={20}
                          height={20}
                          className="block transition-transform group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
