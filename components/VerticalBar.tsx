// Vertical Decorative Bar Component
// Extracted from Figma node 609-7766
"use client";

import { designTokens } from "@/constants/designTokens";

type VerticalBarProps = {
  width?: string;
  height?: string;
  className?: string;
};

export default function VerticalBar({
  width = designTokens.sizes.verticalBar.width,
  height = designTokens.sizes.verticalBar.height,
  className = "",
}: VerticalBarProps) {
  return (
    <div
      className={`absolute bg-gradient-to-b border-solid ${className}`}
      style={{
        width,
        height,
        borderColor: designTokens.colors.borderDark,
        borderWidth: "3px",
        background: `linear-gradient(to bottom, ${designTokens.colors.gradientDark.from}, ${designTokens.colors.gradientDark.to})`,
      }}
    />
  );
}


