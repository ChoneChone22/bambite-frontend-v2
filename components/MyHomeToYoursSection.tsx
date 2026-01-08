// My Home to Yours Section component
"use client";

import Image from "next/image";
import WindowFrame from "./WindowFrame";
import { useRef, useEffect, useState, useCallback } from "react";

type MyHomeToYoursSectionProps = {
  title?: string;
  subtitle?: string;
  sceneImage?: string;
};

export default function MyHomeToYoursSection({
  title = "My Home to Yours",
  subtitle = "You're about to discover more",
  sceneImage = "/home-assets/window-frame-assets/forest-scene.webp",
}: MyHomeToYoursSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isLockedRef = useRef(false);
  const lastScrollYRef = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  );
  const [windowAnimDone, setWindowAnimDone] = useState(false);

  // Callback to be passed to WindowFrame to notify when animation is done
  const handleWindowAnimDone = useCallback(() => {
    setWindowAnimDone(true);
    isLockedRef.current = false;
  }, []);

  useEffect(() => {
    // Only apply on mobile
    const isMobile = () => window.innerWidth <= 440;

    const handleScroll = () => {
      if (!containerRef.current || !isMobile()) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const isFullyVisible =
        rect.top >= -50 && rect.top <= 50 && rect.bottom >= windowHeight - 50;
      if (isFullyVisible && !windowAnimDone) {
        isLockedRef.current = true;
        window.scrollTo(0, lastScrollYRef.current);
      } else {
        lastScrollYRef.current = window.scrollY;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current || !isMobile()) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const isFullyVisible =
        rect.top >= -50 && rect.top <= 50 && rect.bottom >= windowHeight - 50;
      if (!isFullyVisible) return;
      if (!windowAnimDone) {
        isLockedRef.current = true;
        e.preventDefault();
      }
    };

    // Prevent touch scroll on mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || !isMobile()) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const isFullyVisible =
        rect.top >= -50 && rect.top <= 50 && rect.bottom >= windowHeight - 50;
      if (isFullyVisible && !windowAnimDone) {
        isLockedRef.current = true;
        e.preventDefault();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: false });
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [windowAnimDone]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[600px] sm:min-h-[700px] lg:min-h-[854px] overflow-hidden bg-[#123659]"
    >
      {/* Blue plate background */}
      <div className="absolute bottom-0 h-[70vh] sm:h-[75vh] lg:h-[838px] left-0 overflow-clip w-full hidden lg:block">
        <div className="absolute h-full left-0 top-0 w-full max-w-[1440px]">
          <div className="absolute flex inset-0 items-center justify-center">
            <div className="flex-none h-full rotate-180 -scale-y-100 w-full">
              <div className="relative size-full">
                <div className="absolute inset-[-0.19%_-0.08%]">
                  <Image
                    src="/home-assets/window-frame-assets/blue-plate-bg.svg"
                    alt=""
                    fill
                    sizes="(max-width: 1440px) 100vw, 1440px"
                    className="block max-w-none size-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Texture overlays */}
          <div className="absolute contents inset-[0_-0.08%_0_0]">
            <div className="absolute inset-[0_-0.08%_0_0.57%] mix-blend-overlay opacity-30">
              <Image
                src="/product-assets/metal-overlay.webp"
                alt=""
                fill
                sizes="(max-width: 1440px) 100vw, 1440px"
                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
              />
            </div>
            <div className="absolute flex inset-[0_-0.08%_0_0] items-center justify-center mix-blend-lighten">
              <div className="flex-none h-full -scale-y-100 w-full">
                <div className="opacity-[0.34] relative size-full">
                  <Image
                    src="/product-assets/grunge-overlay.webp"
                    alt=""
                    fill
                    sizes="(max-width: 1440px) 100vw, 1440px"
                    className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                  />
                </div>
              </div>
            </div>
            <div className="absolute flex inset-[0_-0.08%_0_0] items-center justify-center mix-blend-soft-light">
              <div className="flex-none h-full rotate-180 -scale-y-100 w-full">
                <div
                  className="opacity-30 size-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(128, 128, 128, 0.6) 0%, rgb(128, 128, 128) 19.684%, rgba(128, 128, 128, 0.3) 70.46%, rgb(128, 128, 128) 100%)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Window Frame - Desktop only */}
          <div className="absolute -right-40 top-1/2 -translate-y-1/2 hidden lg:block">
            <WindowFrame sceneImage={sceneImage} />
          </div>
          {/* Window Frame - Mobile (lock scroll until animation done) */}
          <div className="block lg:hidden w-full flex justify-center items-center">
            <WindowFrame
              sceneImage={sceneImage}
              onAnimDone={handleWindowAnimDone}
            />
          </div>

          {/* Decorative image on left */}
          <div className="absolute h-[33vh] sm:h-[35vh] lg:h-[476.508px] left-[32.6%] -top-14 w-[20vw] max-w-[287.212px] hidden lg:block">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <Image
                src="/home-assets/window-frame-assets/image-221.webp"
                alt=""
                fill
                sizes="(max-width: 1440px) 20vw, 287px"
                className="absolute h-[122.7%] left-[-10.55%] max-w-none top-[-16.58%] w-[112.64%]"
              />
            </div>
          </div>

          {/* Decorative image on right */}
          <div className="absolute -right-28 top-1 w-[20vw] max-w-[287.212px] hidden lg:block pointer-events-none">
            <div className="relative w-full" style={{ aspectRatio: "auto" }}>
              <Image
                src="/home-assets/window-frame-assets/vine3-hello.webp"
                alt=""
                width={287}
                height={477}
                className="w-full h-auto object-contain scale-x-[-1]"
                style={{ maxHeight: "476.508px" }}
              />
            </div>
          </div>

          {/* Decorative group on left */}
          <div className="absolute h-[30vh] sm:h-[32vh] lg:h-[426.48px] left-[-14.7%] top-[23vh] sm:top-[22vh] lg:top-[194.18px] w-[48vw] max-w-[691.227px] hidden lg:block">
            <div className="absolute inset-[-0.53%_0_-0.53%_-0.33%]">
              <Image
                src="/footer-assets/group-140.svg"
                alt=""
                fill
                sizes="(max-width: 1440px) 48vw, 691px"
                className="block max-w-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-24 pb-16 px-4 sm:px-6 lg:px-0 min-h-[600px] sm:min-h-[700px] lg:min-h-[854px] flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          {/* Title */}
          <p
            className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] from-[#f9f9f9] leading-[0.82] not-italic text-[40px] sm:text-[60px] md:text-[75px] lg:text-[90px] xl:text-[100px] text-left to-[#a6b5c0] w-full max-w-[316.736px] mb-6 sm:mb-8"
            style={{ WebkitTextFillColor: "transparent" }}
          >
            {title}
          </p>

          {/* Subtitle */}
          <div className="flex h-[80px] sm:h-[90px] lg:h-[101.539px] items-center justify-center w-[150px] sm:w-[160px] lg:w-[178.245px] ml-[265px] mb-6 sm:mb-8">
            <div className="flex-none rotate-[340.939deg]">
              <div className="font-['Scribo_Pro',sans-serif] leading-[0.82] not-italic relative text-[#ffa953] text-[14px] sm:text-[22px] md:text-[14px] lg:text-[14px] xl:text-[14] text-center text-nowrap uppercase">
                <p className="mb-0">
                  {subtitle.split(" ").slice(0, 3).join(" ")}
                </p>
                <p>{subtitle.split(" ").slice(3).join(" ")}</p>
              </div>
            </div>
          </div>

          {/* Decorative "D3" text */}
          <p className="absolute font-['Post_No_Bills_Colombo',sans-serif] leading-[0.82] not-italic right-[-15vw] sm:right-[-12vw] lg:right-[-202px] text-[#b9c7d6] text-[120px] sm:text-[160px] md:text-[200px] lg:text-[230px] xl:text-[258.329px] text-nowrap top-[25vh] sm:top-[28vh] lg:top-[313.12px] translate-x-[100%] hidden lg:block">
            D3
          </p>
        </div>
      </div>
    </div>
  );
}
