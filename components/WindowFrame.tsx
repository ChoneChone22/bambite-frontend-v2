"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

type WindowFrameProps = {
  sceneImage?: string;
  onAnimDone?: () => void;
  startTrigger: boolean;
};

export default function WindowFrame({
  sceneImage = "/home-assets/window-frame-assets/forest-scene.webp",
  onAnimDone,
  startTrigger,
}: WindowFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms for desktop (disabled on mobile when locked)
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0, 1, 1, 0.8, 0.4]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.75, 1],
    [0.7, 1.05, 1, 0.95, 0.85]
  );

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (startTrigger) {
      setShouldAnimate(true);
    }
  }, [startTrigger]);

  // Production-ready animation variants
  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 60,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.5 : 1.5,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth animation
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const sceneVariants = {
    hidden: { opacity: 0, scale: 1.2 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 1,
        ease: "easeOut",
      },
    },
  };

  const glowVariants = {
    animate: {
      opacity: shouldReduceMotion ? 0.3 : [0.2, 0.5, 0.2],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Use different styles based on device and animation state
  // On mobile during animation, don't apply scroll-based transforms
  const dynamicStyle = isMobile && shouldAnimate
    ? { 
        width: "min(900px, 90vw)", 
        height: "min(500px, 50vh)",
      }
    : !isMobile
    ? { 
        width: "min(900px, 90vw)", 
        height: "min(500px, 50vh)", 
        opacity, 
        scale 
      }
    : { 
        width: "min(900px, 90vw)", 
        height: "min(500px, 50vh)",
      };

  return (
    <motion.div
      ref={containerRef}
      className="relative flex items-center justify-center will-change-transform"
      style={dynamicStyle}
      variants={containerVariants}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      onAnimationComplete={() => {
        if (shouldAnimate && onAnimDone) {
          // Give user time to see the completed animation before unlocking
          // Longer delay on mobile to ensure smooth experience
          const delay = isMobile ? 800 : 500;
          setTimeout(onAnimDone, delay);
        }
      }}
    >
      {/* Outer Ring */}
      <motion.div 
        className="absolute inset-0"
        variants={itemVariants}
      >
        <Image
          src="/home-assets/window-frame-assets/outter-ring.svg"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Main Window Frame */}
      <motion.div 
        className="absolute inset-[5%]"
        variants={itemVariants}
      >
        <Image
          src="/home-assets/window-frame-assets/window-frame.svg"
          alt=""
          fill
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Scene */}
      <motion.div 
        className="absolute inset-[10%] overflow-hidden rounded-md"
        variants={sceneVariants}
      >
        <Image 
          src={sceneImage} 
          alt="Scene" 
          fill 
          className="object-cover" 
          priority
        />
      </motion.div>

      {/* Glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none will-change-opacity"
        variants={glowVariants}
        animate="animate"
      >
        <Image
          src="/home-assets/window-frame-assets/glow-light.webp"
          alt=""
          fill
          className="object-contain"
        />
      </motion.div>
    </motion.div>
  );
}
