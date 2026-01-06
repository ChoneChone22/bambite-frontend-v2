// Window Frame component for "My Home to Yours" section
"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type WindowFrameProps = {
  sceneImage?: string;
  label?: string;
  className?: string;
};

export default function WindowFrame({
  sceneImage = "/home-assets/window-frame-assets/forest-scene.webp",
  label = "BAm's spaceship 320",
  className = "",
}: WindowFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Main container transforms
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
  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [25, 0, -8, -20]
  );
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -150]);

  // Layer-specific parallax
  const sceneScale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    [1.2, 1, 1.05, 1.1]
  );
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0, 0.3, 0.5, 0.2]
  );
  const frameRotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, -2, -5]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative flex items-center justify-center ${className}`}
      style={{
        width: "994.565px",
        height: "534.047px",
        transform: "scale(0.80) translateX(80px)",
        opacity,
        scale,
        rotateY,
        y,
        transformStyle: "preserve-3d",
        perspective: "1500px",
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2,
      }}
    >
      {/* Outer Ring */}
      <motion.div
        className="absolute h-[534.047px] w-[994.565px] hidden lg:block"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-[-0.36%_-0.19%_-0.45%_-0.19%]">
          <Image
            src="/home-assets/window-frame-assets/outter-ring.svg"
            alt=""
            fill
            sizes="995px"
            className="block max-w-none"
          />
        </div>
      </motion.div>

      {/* Window Frame Border */}
      <motion.div
        className="absolute h-[485.975px] w-[946.492px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block"
        style={{ marginTop: "12px", rotate: frameRotate }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-[-0.2%_-0.1%]">
          <Image
            src="/home-assets/window-frame-assets/window-frame.svg"
            alt=""
            fill
            sizes="946px"
            className="block max-w-none"
          />
        </div>
      </motion.div>

      {/* Scene Image */}
      <motion.div
        className="absolute h-[474.881px] w-[928.535px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block"
        style={{ marginTop: "15px", scale: sceneScale }}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={sceneImage}
          alt="Forest scene"
          fill
          sizes="929px"
          className="block max-w-none object-cover"
        />
      </motion.div>

      {/* Glow Light Effect */}
      <motion.div
        className="absolute h-[536.196px] w-[994.563px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block"
        style={{ marginTop: "-8px", opacity: glowOpacity }}
        animate={{
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-[-31.56%_-17.01%]">
          <Image
            src="/home-assets/window-frame-assets/glow-light.webp"
            alt=""
            fill
            sizes="995px"
            className="block max-w-none object-cover"
          />
        </div>
      </motion.div>

      {/* Label */}
      <motion.p
        className="absolute bg-clip-text bg-gradient-to-b font-['Space_Mono',sans-serif] from-[#ffffff] leading-none left-1/2 -translate-x-1/2 not-italic opacity-70 text-[11px] sm:text-[12px] md:text-[13px] to-[#999999] top-[calc(50%+161px)] uppercase w-[83.455px] hidden lg:block"
        style={{ WebkitTextFillColor: "transparent" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {label}
      </motion.p>

      {/* Vertical separator lines */}
      <motion.div
        className="absolute h-[151.752px] left-[calc(50%+330px)] top-[0.57px] w-[3.019px] hidden lg:block"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-[0_-99.37%_0_0]">
          <Image
            src="/career-assets/group-188.svg"
            alt=""
            fill
            sizes="3px"
            className="block max-w-none size-full"
          />
        </div>
      </motion.div>
      <motion.div
        className="absolute h-[151.752px] left-[calc(50%+697px)] top-[0.57px] w-[3.019px] hidden lg:block"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-[0_-99.37%_0_0]">
          <Image
            src="/career-assets/group-188.svg"
            alt=""
            fill
            sizes="3px"
            className="block max-w-none size-full"
          />
        </div>
      </motion.div>
      <motion.div
        className="absolute h-[153.489px] left-[calc(50%+328px)] top-[684.51px] w-[3.019px] hidden lg:block"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-[0_-99.37%_0_0]">
          <Image
            src="/career-assets/group-187.svg"
            alt=""
            fill
            sizes="3px"
            className="block max-w-none size-full"
          />
        </div>
      </motion.div>
      <motion.div
        className="absolute h-[153.489px] left-[calc(50%+697px)] top-[684.51px] w-[3.019px] hidden lg:block"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.6, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-[0_-99.37%_0_0]">
          <Image
            src="/career-assets/group-187.svg"
            alt=""
            fill
            sizes="3px"
            className="block max-w-none size-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
