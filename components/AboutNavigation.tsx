"use client";

import Image from "next/image";
import Link from "next/link";

interface NavItem {
  id: number;
  label: string;
  href: string;
  code: string;
}

const navItems: NavItem[] = [
  { id: 0, label: "Home", href: "/", code: "C0" },
  { id: 1, label: "About", href: "/about", code: "C1" },
  { id: 2, label: "Career", href: "/career", code: "C2" },
  { id: 3, label: "Contact", href: "/contact", code: "C3" },
  { id: 4, label: "Dishes", href: "/menu", code: "C4" },
];

export default function AboutNavigation() {
  return (
    <section className="w-full">
      {/* Mobile Layout - Grid (shown below lg) */}
      <div className="lg:hidden grid grid-cols-6 gap-0 w-full">
        {/* First row: 3 items, each taking 2 columns */}
        {navItems.slice(0, 3).map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="col-span-2 relative group overflow-hidden flex flex-col justify-between aspect-[137/266]"
          >
            {/* Background Image */}
            <Image
              src="/about-assets/about-nav-bg.jpg"
              alt=""
              fill
              className="absolute inset-0 object-cover w-full h-full -z-10"
            />

            {/* Metal Texture Overlay */}
            <div className="absolute inset-0 border border-[#596a71] border-solid mix-blend-overlay opacity-70 -z-10" />

            {/* Responsive Padding and Content */}
            <div className="flex flex-col justify-between h-full p-[8%]">
              {/* Large Gradient Text Code */}
              <p
                className="text-[8vw] md:text-[6vw] lg:text-[172px] font-postnobills-colombo leading-[0.82] text-nowrap bg-clip-text bg-gradient-to-b from-[#c2c4cb] via-[#43444c] via-[59.549%] to-[#7d8289] to-[84.397%]"
                style={{ WebkitTextFillColor: "transparent" }}
              >
                {item.code}
              </p>

              {/* Navigation Text and Arrow */}
              <div className="flex justify-between items-center w-full">
                <p className="text-[10px] md:text-xs lg:text-[32px] font-['Chillax_Variable',sans-serif] font-semibold leading-[0.95] text-white/90">
                  {item.label}
                </p>
                <svg
                  className="w-[10px] h-[10px] md:w-3 md:h-3 lg:w-[32px] lg:h-[32px] text-white flex-shrink-0"
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M8 16h16M20 8l8 8-8 8" />
                </svg>
              </div>
            </div>
          </Link>
        ))}

        {/* Second row: 2 items, each taking 3 columns */}
        {navItems.slice(3).map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="col-span-3 relative group overflow-hidden flex flex-col justify-between aspect-[137/266]"
          >
            {/* Background Image */}
            <Image
              src="/about-assets/about-nav-bg.jpg"
              alt=""
              fill
              className="absolute inset-0 object-cover w-full h-full -z-10"
            />

            {/* Metal Texture Overlay */}
            <div className="absolute inset-0 border border-[#596a71] border-solid mix-blend-overlay opacity-70 -z-10" />

            {/* Responsive Padding and Content */}
            <div className="flex flex-col justify-between h-full p-[8%]">
              {/* Large Gradient Text Code */}
              <p
                className="text-[8vw] md:text-[6vw] lg:text-[172px] font-postnobills-colombo leading-[0.82] text-nowrap bg-clip-text bg-gradient-to-b from-[#c2c4cb] via-[#43444c] via-[59.549%] to-[#7d8289] to-[84.397%]"
                style={{ WebkitTextFillColor: "transparent" }}
              >
                {item.code}
              </p>

              {/* Navigation Text and Arrow */}
              <div className="flex justify-between items-center w-full">
                <p className="text-[10px] md:text-xs lg:text-[32px] font-['Chillax_Variable',sans-serif] font-semibold leading-[0.95] text-white/90">
                  {item.label}
                </p>
                <svg
                  className="w-[10px] h-[10px] md:w-3 md:h-3 lg:w-[32px] lg:h-[32px] text-white flex-shrink-0"
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M8 16h16M20 8l8 8-8 8" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop Layout - Horizontal Scroll (shown on lg and above) */}
      <div className="hidden lg:flex w-full overflow-x-auto">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex-shrink-0 w-[306px] h-[594px] relative group overflow-hidden flex flex-col justify-between pt-[64px] px-[32px] pb-0"
          >
            {/* Background Image */}
            <Image
              src="/about-assets/about-nav-bg.jpg"
              alt=""
              fill
              className="absolute inset-0 object-cover w-full h-full -z-10"
            />

            {/* Metal Texture Overlay */}
            <div className="absolute inset-0 border border-[#596a71] border-solid mix-blend-overlay opacity-70 -z-10" />

            {/* Large Gradient Text Code */}
            <p
              className="text-[172px] font-postnobills-colombo leading-[0.82] text-nowrap bg-clip-text bg-gradient-to-b from-[#c2c4cb] via-[#43444c] via-[59.549%] to-[#7d8289] to-[84.397%]"
              style={{ WebkitTextFillColor: "transparent" }}
            >
              {item.code}
            </p>

            {/* Navigation Text and Arrow */}
            <div className="flex justify-between items-center w-full py-[48px] px-0">
              <p className="text-[32px] font-['Chillax_Variable',sans-serif] font-semibold leading-[0.95] text-white/90">
                {item.label}
              </p>
              <svg
                className="w-[32px] h-[32px] text-white flex-shrink-0"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M8 16h16M20 8l8 8-8 8" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
