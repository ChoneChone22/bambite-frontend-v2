// Multi-layer background component matching Figma design

import Image from "next/image";
import { ReactNode } from "react";

type MenuBackgroundProps = {
  children?: ReactNode;
  className?: string;
};

export default function MenuBackground({
  children,
  className = "",
}: MenuBackgroundProps) {
  return (
    <div className={`relative w-full min-h-screen bg-white ${className}`}>
      {/* Base gradient background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgb(206, 216, 219) 0%, rgb(173, 189, 190) 100%), linear-gradient(90deg, rgb(245, 245, 245) 0%, rgb(245, 245, 245) 100%)",
        }}
      />

      {/* Texture overlays */}
      <div className="absolute inset-0">
        {/* Metal 1 overlay */}
        <div className="absolute inset-0 mix-blend-soft-light opacity-80">
          <Image
            src="/background-assets/metal-overlay-bg.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover pointer-events-none"
            priority
          />
        </div>

        {/* Grunge overlay */}
        <div className="absolute flex inset-0 items-center justify-center mix-blend-soft-light">
          <div className="flex-none h-full scale-y-[-100%] w-full">
            <div className="opacity-30 relative size-full">
              <Image
                src="/background-assets/grunge-overlay-bg.webp"
                alt=""
                fill
                sizes="100vw"
                className="object-cover pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute flex inset-0 items-center justify-center mix-blend-soft-light">
          <div className="flex-none h-full rotate-[180deg] scale-y-[-100%] w-full">
            <div
              className="opacity-80 size-full"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(128, 128, 128, 0.6) 0%, rgb(128, 128, 128) 19.684%, rgba(128, 128, 128, 0.3) 70.46%, rgb(128, 128, 128) 100%)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      {children && (
        <div className="relative z-10 w-full h-full">{children}</div>
      )}
    </div>
  );
}

