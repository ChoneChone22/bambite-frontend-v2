// Coming Soon Page
"use client";

import Image from "next/image";
import Link from "next/link";
import MenuBackground from "@/components/MenuBackground";

export default function ComingSoonPage() {
  return (
    <MenuBackground>
      <div className="min-h-screen w-full relative flex items-center justify-center">
        <div className="relative z-10 text-center px-4 sm:px-6">
          {/* Title */}
          <h1
            className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] font-semibold from-[#181e24] leading-[0.92] not-italic relative text-[90px] to-[#293f55] tracking-[-1.8px] mb-12 sm:mb-16"
            style={{ WebkitTextFillColor: "transparent" }}
          >
            Buy now
          </h1>

          {/* Social Media Pairs */}
          <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 flex-wrap max-w-full overflow-hidden px-4">
            {/* Facebook Pair */}
            <div className="flex flex-col items-center gap-3 sm:gap-4 shrink-0">
              <div className="relative w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px]">
                <Image
                  src="/Bambite-Facebook.png"
                  alt="Bambite Facebook"
                  fill
                  className="object-contain"
                />
              </div>
              <Link
                href="https://www.facebook.com/share/1A1Wvjcu43/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="relative size-[48px] sm:size-[52px] md:size-[58px] hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/footer-assets/facebook.webp"
                  alt="Facebook"
                  fill
                  className="object-contain"
                />
              </Link>
            </div>

            {/* Instagram Pair */}
            <div className="flex flex-col items-center gap-3 sm:gap-4 shrink-0">
              <div className="relative w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px]">
                <Image
                  src="/Bambite-Instagram.png"
                  alt="Bambite Instagram"
                  fill
                  className="object-contain"
                />
              </div>
              <Link
                href="https://www.instagram.com/bambiteburst?igsh=MTk1cDRieXN3ZTAzbg=="
                target="_blank"
                rel="noopener noreferrer"
                className="relative size-[48px] sm:size-[52px] md:size-[58px] hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/footer-assets/instagram.webp"
                  alt="Instagram"
                  fill
                  className="object-contain"
                />
              </Link>
            </div>

            {/* TikTok Pair */}
            <div className="flex flex-col items-center gap-3 sm:gap-4 shrink-0">
              <div className="relative w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px]">
                <Image
                  src="/Bambite-Tiktok.png"
                  alt="Bambite TikTok"
                  fill
                  className="object-contain"
                />
              </div>
              <Link
                href="https://www.tiktok.com/@bambite25?_r=1&_t=ZS-92g00es6bgN"
                target="_blank"
                rel="noopener noreferrer"
                className="relative size-[48px] sm:size-[52px] md:size-[58px] hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/footer-assets/tiktok.webp"
                  alt="TikTok"
                  fill
                  className="object-contain"
                />
              </Link>
            </div>

            {/* LINE Pair */}
            <div className="flex flex-col items-center gap-3 sm:gap-4 shrink-0">
              <div className="relative w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px]">
                <Image
                  src="/Bambite-Line.png"
                  alt="Bambite LINE"
                  fill
                  className="object-contain"
                />
              </div>
              <Link
                href="https://lin.ee/YH3hdl5"
                target="_blank"
                rel="noopener noreferrer"
                className="relative size-[48px] sm:size-[52px] md:size-[58px] hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/line-logo.webp"
                  alt="LINE"
                  fill
                  className="object-contain"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MenuBackground>
  );
}
