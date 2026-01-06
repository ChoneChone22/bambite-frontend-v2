// Portal Scroll-Through Animation Component
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface PortalScrollSectionProps {
  // Window/Portal props
  windowSceneImage?: string;
  windowLabel?: string;

  // Background scene (Hi I'm Bam) props
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  mascotImage?: string;
  backgroundImage?: string;
}

export default function PortalScrollSection({
  windowSceneImage = "/home-assets/window-frame-assets/forest-scene.webp",
  windowLabel = "BAm's spaceship 320",
  title = "Hi, I'm Bam",
  description = "Welcome from my imaginative little world. This is a place where Tradition meets tech, Old flavours meet new imagination, Every bite becomes a joyful adventure. It's my way of connecting generations, cultures, and even worlds through flavour and fun.",
  ctaText = "MORE ABOUT BAMBITE",
  ctaLink = "/about",
  mascotImage = "/home-assets/hero/mascot-3d.webp",
  backgroundImage = "/home-assets/hero/compressed_hi-section-bg.webp",
}: PortalScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useMotionValue(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [delayComplete, setDelayComplete] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const delayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isLockedRef = useRef(false); // Single source of truth for lock state

  // Track screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1024);
      setIsMobile(width <= 440);
    };

    // Check on mount
    checkScreenSize();

    // Check on resize
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (!containerRef.current || (!isDesktop && !isMobile)) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Section is "fully visible" when it occupies the entire viewport:
      // - Top is at or very close to viewport top (within small buffer)
      // - Section height equals or exceeds viewport height (it's h-screen, so this is always true)
      // - Bottom is at or below viewport bottom
      const isFullyVisible =
        rect.top >= -50 && rect.top <= 50 && rect.bottom >= windowHeight - 50;

      // Lock scroll only when section is fully visible AND lock is engaged
      if (isFullyVisible && isLockedRef.current) {
        window.scrollTo(0, lastScrollY);
      } else {
        lastScrollY = window.scrollY;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current || (!isDesktop && !isMobile)) return;

      const rect = containerRef.current.getBoundingClientRect();
      const progress = scrollProgress.get();
      const windowHeight = window.innerHeight;

      // Section must be FULLY VISIBLE on screen to trigger animation:
      // - rect.top should be at viewport top (0, with small buffer for fast scroll)
      // - rect.bottom should be at/below viewport bottom (section fills screen)
      // Since section is h-screen (100vh), when top=0, bottom automatically = windowHeight
      const isFullyVisible =
        rect.top >= -50 && rect.top <= 50 && rect.bottom >= windowHeight - 50;

      // If section is not fully visible, allow normal scroll
      if (!isFullyVisible) return;

      // Check exit conditions first
      const canExitForward = e.deltaY > 0 && progress >= 0.99 && delayComplete;
      const canExitBackward =
        e.deltaY < 0 && progress === 0 && !isLockedRef.current;

      if (canExitForward) {
        // Allow scroll to next section
        isLockedRef.current = false;
        return;
      }

      if (canExitBackward) {
        // Allow scroll to previous section
        return;
      }

      // If we're here, lock the section and animate
      e.preventDefault();
      isLockedRef.current = true;

      // Bidirectional animation based on scroll direction
      const delta = e.deltaY / 1500;
      const newProgress = Math.min(1, Math.max(0, progress + delta));
      scrollProgress.set(newProgress);

      // Clear pending delay timer
      if (delayTimerRef.current) {
        clearTimeout(delayTimerRef.current);
        delayTimerRef.current = null;
      }

      // Reset completion states when scrolling backward
      if (newProgress < 0.99) {
        setAnimationComplete(false);
        setDelayComplete(false);
      }

      // Unlock when reaching start (backward completion)
      if (newProgress === 0) {
        isLockedRef.current = false;
      }

      // Start delay timer when reaching end (forward completion)
      if (newProgress >= 0.99 && !animationComplete) {
        setAnimationComplete(true);
        delayTimerRef.current = setTimeout(() => {
          setDelayComplete(true);
        }, 600);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      // Clean up timer on unmount
      if (delayTimerRef.current) {
        clearTimeout(delayTimerRef.current);
      }
    };
  }, [scrollProgress, animationComplete, delayComplete, isDesktop, isMobile]);

  // Desktop: Transform scroll progress to scale (1 → 4) for window frame
  const scale = useTransform(scrollProgress, [0, 1], [1, 4]);

  // Desktop: Slower zoom for jungle background (0.87 → 1.2) - completes zoom earlier
  const jungleScale = useTransform(scrollProgress, [0, 0.25], [0.87, 1.2]);

  // Desktop: Fade out the window frame as we zoom
  const frameOpacity = useTransform(scrollProgress, [0, 0.5, 0.8], [1, 0.5, 0]);

  // Desktop: Fade in the content right after jungle completes and window fades
  const contentOpacity = useTransform(
    scrollProgress,
    [0.3, 0.5, 0.7],
    [0, 0, 1]
  );
  const contentY = useTransform(scrollProgress, [0.3, 0.7], [50, 0]);

  // Mobile: Scroll-based animations (no scroll-lock)
  const { scrollYProgress: mobileScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Mobile: Zoom animations
  const mobileJungleScale = useTransform(
    mobileScrollProgress,
    [0, 0.3, 0.5],
    [0.9, 1.1, 1.15]
  );
  const mobileWindowScale = useTransform(
    mobileScrollProgress,
    [0.2, 0.5, 0.8],
    [1, 1.8, 2.5]
  );
  const mobileWindowOpacity = useTransform(
    mobileScrollProgress,
    [0.5, 0.7, 0.9],
    [1, 0.6, 0]
  );

  // Mobile: Content fade in (starts after window completely fades out)
  const mobileContentOpacity = useTransform(
    mobileScrollProgress,
    [0.9, 0.95, 1],
    [0, 0.5, 1]
  );
  const mobileContentY = useTransform(mobileScrollProgress, [0.9, 1], [40, 0]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-auto min-h-[700px] lg:h-screen bg-[#0a0f1a] overflow-hidden"
      style={{ margin: 0, padding: 0, display: "block" }}
    >
      {/* Main container - fills full viewport on desktop, auto height on mobile */}
      <div
        className="relative min-h-[700px] lg:h-full w-full overflow-hidden"
        style={{ margin: 0, padding: 0 }}
      >
        {/* Background Scene - Jungle background behind window */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center origin-center"
          style={{
            scale: isMobile ? mobileJungleScale : jungleScale,
            willChange: "transform",
          }}
        >
          {/* Jungle Background Image - Shows through the window */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={
                isMobile
                  ? "/home-assets/window-frame-assets/mobile-scence.png"
                  : "/home-assets/window-frame-assets/jungle-bg.webp"
              }
              alt="Background scene"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Window Frame (Foreground) - Inside-lab with window frame */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center origin-center"
          style={{
            scale: isMobile ? mobileWindowScale : scale,
            opacity: isMobile ? mobileWindowOpacity : 1,
            willChange: "transform",
          }}
          aria-label="Window frame overlay"
        >
          {/* Inside-lab window frame overlay */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={
                isMobile
                  ? "/home-assets/window-frame-assets/mobile-window.webp"
                  : "/home-assets/window-frame-assets/Inside-lab.webp"
              }
              alt="Window frame"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Content that fades in after portal zoom */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          style={{
            opacity: isMobile ? mobileContentOpacity : contentOpacity,
            y: isMobile ? mobileContentY : contentY,
            willChange: "opacity, transform",
          }}
        >
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pointer-events-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 items-center max-w-[1800px] mx-auto">
              {/* Left side - Mascot */}
              <div className="order-2 lg:order-1">
                <div className="relative h-[550px] sm:h-[650px] md:h-[750px] lg:h-[850px] xl:h-[900px] 2xl:h-[950px] w-full overflow-visible ml-8 sm:ml-12 lg:ml-16 xl:ml-20 2xl:ml-24">
                  <div
                    className="absolute inset-x-0"
                    style={{
                      bottom: "-100px",
                      top: "-900px",
                      height: "calc(100% + 900px)",
                    }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={mascotImage}
                        alt="Bam mascot"
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-contain"
                        style={{ objectPosition: "bottom center" }}
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Text and CTA */}
              <div className="order-1 lg:order-2">
                <div className="max-w-[200px] lg:max-w-[280px] mx-auto">
                  <h2 className="font-['Chillax_Variable',sans-serif] leading-[0.82] not-italic text-[60px] sm:text-[80px] md:text-[90px] lg:text-[100px] text-center text-white mb-6 sm:mb-8 break-words">
                    {title}
                  </h2>
                </div>

                {/* Decorative text - Indie Flower Font */}
                <div className="font-indie-flower leading-[0.82] not-italic text-[#ffa953] text-[24px] sm:text-[26px] md:text-[28px] lg:text-[29.142px] text-center mb-6">
                  <p className="mb-0">You&apos;re about to</p>
                  <p>discover more</p>
                </div>

                <p className="font-['DM_Sans',sans-serif] font-medium leading-[1.2] opacity-80 text-[12px] sm:text-[13px] md:text-[14px] text-center text-white mb-8 sm:mb-10 w-full max-w-[320.835px] mx-auto">
                  {description}
                </p>

                {/* CTA Button */}
                <div className="flex items-center justify-center">
                  <Link
                    href={ctaLink}
                    className="flex h-[50px] sm:h-[56px] md:h-[62px] items-center relative w-full max-w-[321px] group"
                  >
                    {/* Main Button Body */}
                    <div
                      className="h-full relative w-full bg-gradient-to-b from-[#074980] to-[#172743] overflow-hidden"
                      style={{
                        clipPath:
                          "polygon(0% 0%, 100% 0%, 100% 75%, 92% 100%, 0% 100%)",
                        border: "2px solid #193551",
                      }}
                    >
                      {/* Texture overlays */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 mix-blend-overlay opacity-30">
                          <Image
                            src="/product-assets/metal-overlay.webp"
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 mix-blend-lighten opacity-30">
                          <Image
                            src="/product-assets/grunge-overlay.webp"
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>

                      {/* Button Content */}
                      <div className="relative z-10 flex items-center h-full px-6 sm:px-8">
                        <p className="font-['Space_Mono',sans-serif] font-bold leading-none text-[11px] sm:text-[12px] md:text-[13px] lg:text-[13.484px] text-white uppercase group-hover:opacity-90 transition-opacity">
                          {ctaText}
                        </p>
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
        </motion.div>
      </div>
    </div>
  );
}
