// Gradient Text Component
// Extracted from Figma node 609-7790
"use client";

import { designTokens } from "@/constants/designTokens";

type GradientTextProps = {
  text: string;
  fontSize?: string;
  className?: string;
  gradientFrom?: string;
  gradientTo?: string;
};

export default function GradientText({
  text,
  fontSize = designTokens.typography.chillax.fontSize,
  className = "",
  gradientFrom = designTokens.colors.gradientText.from,
  gradientTo = designTokens.colors.gradientText.to,
}: GradientTextProps) {
  return (
    <p
      className={`bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] font-semibold leading-[0.82] not-italic relative ${className}`}
      style={{
        fontSize,
        WebkitTextFillColor: "transparent",
        backgroundImage: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
      }}
    >
      {text}
    </p>
  );
}


