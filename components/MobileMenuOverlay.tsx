// Mobile Menu Overlay component - Figma Design Implementation
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

type MobileMenuOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenuOverlay({
  isOpen,
  onClose,
}: MobileMenuOverlayProps) {
  const pathname = usePathname();
  const { toggleCart } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable body scroll when menu closes
      document.body.style.overflow = "unset";
      // Keep animating state for exit animation
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Don't render if not open and not animating
  if (!isOpen && !isAnimating) return null;

  const handleCartClick = () => {
    onClose();
    // Small delay to let menu close animation finish
    setTimeout(() => {
      toggleCart();
    }, 300);
  };

  const leftNavItems = [
    { label: "Home", href: "/", no: "C0" },
    { label: "About", href: "/about", no: "C1" },
    { label: "Career", href: "/career", no: "C2" },
    { label: "Contact", href: "/contact", no: "C3" },
  ];

  const rightNavItems = [
    { label: "Dishes", href: "/menu", no: "C4" },
    { label: "Cart", href: null, no: "C5", isCart: true },
  ];

  return (
    <div
      className={`fixed inset-0 z-[10000] transition-all duration-500 ease-in-out ${
        isOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-full pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      {/* Dark background overlay */}
      <div
        className="absolute inset-0 bg-[rgba(0,0,0,0.3)]"
        aria-hidden="true"
      />

      {/* Menu panel - 87% height (leaving 13% at bottom) */}
      <div className="absolute top-0 left-0 right-0 h-[87vh] bg-[#181e24] overflow-hidden">
        {/* Header Section */}
        <div className="fixed top-0 left-0 right-0 z-[10001] w-full px-4 pt-6 pb-4 flex items-center justify-between gap-4">
          {/* Close Button - Left (same position as menu button) */}
          <button
            onClick={onClose}
            className="flex-shrink-0 hover:opacity-80 transition-opacity"
            aria-label="Close menu"
          >
            <div className="relative w-[52px] h-[50px]">
              <Image
                src="/mobile-close.png"
                alt=""
                fill
                className="object-contain"
                priority
              />
            </div>
          </button>

          {/* Logo - Center */}
          <Link
            href="/"
            onClick={onClose}
            className="flex-shrink-0 hover:opacity-90 transition-opacity"
          >
            <div className="relative w-[177px] h-[40px]">
              <Image
                src="/bambite-logo-white.webp"
                alt="Bambite"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Spacer for alignment */}
          <div className="w-[52px]" aria-hidden="true" />
        </div>

        {/* Hero Heading - "My Home to Yours" */}
        <div className="px-6 mt-24 mb-24">
          <h2
            className="font-chillax-semibold leading-[0.82] not-italic text-[64px] text-[#193551]"
            style={{
              maxWidth: "216px",
            }}
          >
            My Home to Yours
          </h2>
        </div>

        {/* Navigation Grid - Two Columns */}
        <nav className="px-6" aria-label="Main navigation">
          <div className="grid grid-cols-2 gap-x-8">
            {/* Left Column */}
            <div className="flex flex-col gap-3">
              {leftNavItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <div
                    key={item.no}
                    className="transition-all duration-300"
                    style={{
                      transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? "translateY(0)" : "translateY(-10px)",
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="flex items-start gap-2 py-2 group"
                    >
                      <span className="font-['Space_Mono',monospace] text-[15.59px] leading-none text-[#b9c7d6] uppercase shrink-0">
                        {item.no}
                      </span>
                      <span
                        className={`font-['Chillax_Variable',sans-serif] font-semibold text-[25.98px] leading-[0.82] transition-colors ${
                          isActive
                            ? "text-[#ff8a00]"
                            : "text-[#b9c7d6] group-hover:text-white"
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-3">
              {rightNavItems.map((item, index) => {
                const isActive = !item.isCart && pathname === item.href;
                return (
                  <div
                    key={item.no}
                    className="transition-all duration-300"
                    style={{
                      transitionDelay: isOpen
                        ? `${(index + leftNavItems.length) * 50}ms`
                        : "0ms",
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? "translateY(0)" : "translateY(-10px)",
                    }}
                  >
                    {item.isCart ? (
                      <button
                        onClick={handleCartClick}
                        className="flex items-start gap-2 py-2 group text-left w-full"
                      >
                        <span className="font-['Space_Mono',monospace] text-[15.59px] leading-none text-[#b9c7d6] uppercase shrink-0">
                          {item.no}
                        </span>
                        <span className="font-['Chillax_Variable',sans-serif] font-semibold text-[25.98px] leading-[0.82] text-[#b9c7d6] group-hover:text-white transition-colors">
                          {item.label}
                        </span>
                      </button>
                    ) : (
                      <Link
                        href={item.href!}
                        onClick={onClose}
                        className="flex items-start gap-2 py-2 group"
                      >
                        <span className="font-['Space_Mono',monospace] text-[15.59px] leading-none text-[#b9c7d6] uppercase shrink-0">
                          {item.no}
                        </span>
                        <span
                          className={`font-['Chillax_Variable',sans-serif] font-semibold text-[25.98px] leading-[0.82] transition-colors ${
                            isActive
                              ? "text-[#ff8a00]"
                              : "text-[#b9c7d6] group-hover:text-white"
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </nav>
      </div>

      {/* Bottom Decorative Border with polygon shape - positioned after the menu panel */}
      <div className="absolute top-[86vh] left-0 right-0 h-7 flex items-center justify-center">
        <div className="w-full max-w-[387px] h-[20px]">
          <div
            className="w-full h-full bg-[#181E24]"
            style={{
              // Top-left, Top-right, Bottom-right, Bottom-left
              clipPath: "polygon(0% 0%, 100% 0%, 94% 100%, 6% 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
