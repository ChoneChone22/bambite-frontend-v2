"use client";

import Image from "next/image";
import WindowFrame from "./WindowFrame";
import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

export default function MyHomeToYoursSection({
  title = "My Home to Yours",
  subtitle = "You're about to discover more",
  sceneImage = "/home-assets/window-frame-assets/forest-scene.webp",
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // NUCLEAR OPTION: Lock body scroll when animating
  useEffect(() => {
    if (!isMobile || !isAnimating || animationComplete) return;

    const scrollY = window.scrollY;
    
    // Lock body
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    
    // Lock html
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.position = "fixed";
    document.documentElement.style.width = "100%";

    return () => {
      // Unlock
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      
      document.documentElement.style.overflow = "";
      document.documentElement.style.position = "";
      document.documentElement.style.width = "";
      
      window.scrollTo(0, scrollY);
    };
  }, [isMobile, isAnimating, animationComplete]);

  // Handle animation completion
  const handleAnimationComplete = useCallback(() => {
    setAnimationComplete(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  }, []);

  // Detect when section enters viewport
  useEffect(() => {
    if (!isMobile || animationComplete) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.8 && !isAnimating) {
          setIsAnimating(true);
        }
      },
      { 
        threshold: [0.8],
        rootMargin: "0px",
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isMobile, isAnimating, animationComplete]);

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.6,
        delay: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full min-h-screen flex items-center justify-center bg-[#123659] overflow-hidden"
      >
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/home-assets/window-frame-assets/blue-plate-bg.svg"
            alt=""
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center justify-center min-h-screen">
          <div className="w-full text-left mb-8 md:mb-12">
            <motion.h2
              className="font-['Chillax_Variable'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white uppercase leading-none"
              variants={titleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
            >
              {title}
            </motion.h2>
            <motion.p
              className="font-['Scribo_Pro'] text-[#ffa953] text-lg sm:text-xl md:text-2xl mt-2 md:mt-4 italic"
              variants={subtitleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
            >
              {subtitle}
            </motion.p>
          </div>

          <WindowFrame
            sceneImage={sceneImage}
            onAnimDone={handleAnimationComplete}
            startTrigger={isMobile ? isAnimating : true}
          />
        </div>
      </div>

      {/* AGGRESSIVE FULLSCREEN BLOCKER */}
      <AnimatePresence>
        {isMobile && isAnimating && !animationComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999]"
            style={{
              backgroundColor: "transparent",
            }}
            onWheel={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onTouchMove={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onScroll={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
