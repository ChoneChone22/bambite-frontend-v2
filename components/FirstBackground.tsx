import Image from "next/image";
import { ReactNode } from "react";

type FirstBackgroundProps = {
  imageUrl?: string;
  children?: ReactNode;
  className?: string;
};

export default function FirstBackground({
  imageUrl = "/home-first-section-bg.webp",
  children,
  className = "",
}: FirstBackgroundProps) {
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt="Background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Optional overlay for better content readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      {children && (
        <div className="relative z-10 w-full h-full">{children}</div>
      )}
    </div>
  );
}
