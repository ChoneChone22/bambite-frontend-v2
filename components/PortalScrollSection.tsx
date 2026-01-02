// Portal Scroll-Through Animation Component
"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
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
  ctaText = "INTERESTED? MORE OF ME",
  ctaLink = "/about",
  mascotImage = "/home-assets/hero/mascot-3d.webp",
  backgroundImage = "/home-assets/hero/compressed_hi-section-bg.webp",
}: PortalScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useMotionValue(0);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const sectionTop = rect.top;

      // Section has reached the top of viewport
      if (sectionTop <= 0 && sectionTop > -50 && !animationComplete) {
        // Lock scroll position
        window.scrollTo(0, lastScrollY);
      } else if (!animationComplete) {
        lastScrollY = window.scrollY;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const progress = scrollProgress.get();

      // Section is at top and animation not complete
      if (sectionTop <= 0 && sectionTop > -50 && !animationComplete) {
        e.preventDefault();

        const delta = e.deltaY / 1500;
        const newProgress = Math.min(1, Math.max(0, progress + delta));
        scrollProgress.set(newProgress);

        // Mark as complete when reaches 1
        if (newProgress >= 0.99) {
          setAnimationComplete(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [scrollProgress, animationComplete]);

  // Transform scroll progress to scale (1 → 4) for window frame
  const scale = useTransform(scrollProgress, [0, 1], [1, 4]);

  // Slower zoom for jungle background (0.8 → 1.0) - completes zoom earlier
  const jungleScale = useTransform(scrollProgress, [0, 0.25], [0.87, 1.2]);

  // Fade out the window frame as we zoom
  const frameOpacity = useTransform(scrollProgress, [0, 0.5, 0.8], [1, 0.5, 0]);

  // Fade in the content after zoom completes
  const contentOpacity = useTransform(
    scrollProgress,
    [0.6, 0.85, 1],
    [0, 0, 1]
  );
  const contentY = useTransform(scrollProgress, [0.6, 1], [50, 0]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Main container - fills full viewport */}
      <div className="relative h-full w-full overflow-hidden">
        {/* Background Scene - Jungle background behind window */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center origin-center"
          style={{
            scale: jungleScale,
            willChange: "transform",
          }}
        >
          {/* Jungle Background Image - Shows through the window */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/home-assets/window-frame-assets/jungle-bg.webp"
              alt="Jungle background scene"
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
            scale,
            willChange: "transform",
          }}
        >
          {/* Inside-lab window frame overlay */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/home-assets/window-frame-assets/Inside-lab.webp"
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
            opacity: contentOpacity,
            y: contentY,
            willChange: "opacity, transform",
          }}
        >
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pointer-events-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left side - Mascot */}
              <div className="order-2 lg:order-1">
                <div className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[789.168px] w-full overflow-visible">
                  <div
                    className="absolute inset-x-0"
                    style={{
                      bottom: "-100px",
                      top: "-600px",
                      height: "calc(100% + 700px)",
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
