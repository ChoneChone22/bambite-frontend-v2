// Figma-based Navbar V2 implementation
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

// Decorative wing tip component (replaces vector-196 and vector-197)
function WingTip({ mirrored = false }: { mirrored?: boolean }) {
  // Clip-path creates a trapezoid: narrow at top/bottom, wider in middle
  // Based on vector-196: M0 34.3991L0.114406 0H35.762L35.6477 70.0467L0 34.3991Z
  // Points: (0, 34.3991), (0.114406, 0), (35.762, 0), (35.6477, 70.0467), (0, 34.3991)
  // Converted to percentages: (0%, 49.1%), (0.32%, 0%), (100%, 0%), (99.68%, 100%), (0%, 49.1%)
  // Left side: point on left at middle, narrow top, wide right, narrow bottom, back to left point
  // Right side (mirrored): point on right at middle, narrow top, wide left, narrow bottom, back to right point
  // Original path creates: left point (0% 49.1%) -> narrow top-left (0.32% 0%) -> wide top-right (100% 0%) -> narrow bottom-right (99.68% 100%) -> back to left point
  // Mirrored: right point (100% 49.1%) -> narrow top-right (99.68% 0%) -> wide top-left (0.32% 0%) -> narrow bottom-left (0.32% 100%) -> back to right point
  const clipPath = mirrored
    ? "polygon(100% 49.1%, 99.68% 0%, 0.32% 0%, 0.32% 100%, 100% 49.1%)"
    : "polygon(0% 49.1%, 0.32% 0%, 100% 0%, 99.68% 100%, 0% 49.1%)";

  return (
    <div
      className="h-[70.047px] relative shrink-0 w-0 sm:w-[20px] md:w-[35.762px] hidden sm:block"
      style={{
        filter: mirrored
          ? "drop-shadow(3px 0px 0.317px rgba(226, 239, 255, 0.15)) drop-shadow(0px 4px 8px rgba(255, 138, 0, 0.3)) drop-shadow(0px 2px 4px rgba(255, 138, 0, 0.2))"
          : "drop-shadow(-3px 0px 0.317px rgba(226, 239, 255, 0.15)) drop-shadow(0px 4px 8px rgba(255, 138, 0, 0.3)) drop-shadow(0px 2px 4px rgba(255, 138, 0, 0.2))",
      }}
    >
      <div
        className="w-full h-full bg-[#181e24]"
        style={{
          clipPath: clipPath,
        }}
      />
    </div>
  );
}

// Connector triangle component (replaces frame-265 and frame-266)
function ConnectorTriangle({ mirrored = false }: { mirrored?: boolean }) {
  // Based on frame-265: M18.9612 70.2015V63.9612L0 45V70.2015H18.9612Z
  // Points: (18.9612, 70.2015), (18.9612, 63.9612), (0, 45), (0, 70.2015), (18.9612, 70.2015)
  // Converted to percentages: (100%, 100%), (100%, 91.1%), (0%, 64.1%), (0%, 100%), (100%, 100%)
  // Left side (non-mirrored): right edge vertical, left edge angled
  // Right side (mirrored): left edge vertical, right edge angled (sloping down from top-right to bottom-right)
  const clipPath = mirrored
    ? "polygon(0% 91.1%, 100% 64.1%, 100% 100%, 0% 100%)"
    : "polygon(100% 100%, 100% 91.1%, 0% 64.1%, 0% 100%)";

  return (
    <div
      className="h-[70px] relative shrink-0 w-0 sm:w-[12px] md:w-[19px] hidden sm:block"
      style={{
        filter: mirrored
          ? "drop-shadow(1px -3px 0.317px rgba(226, 239, 255, 0.15)) drop-shadow(0px 4px 8px rgba(255, 138, 0, 0.3)) drop-shadow(0px 2px 4px rgba(255, 138, 0, 0.2))"
          : "drop-shadow(-1px -3px 0.317px rgba(226, 239, 255, 0.15)) drop-shadow(0px 4px 8px rgba(255, 138, 0, 0.3)) drop-shadow(0px 2px 4px rgba(255, 138, 0, 0.2))",
      }}
    >
      <div
        className="w-full h-full bg-[#181e24]"
        style={{
          clipPath: clipPath,
        }}
      />
    </div>
  );
}

type NavItemProps = {
  className?: string;
  navLabel?: string;
  no?: string;
  iconBack?: boolean;
  status?: "Default" | "Active";
  href?: string;
  onClick?: () => void;
};

function NavItem({
  className,
  navLabel = "About",
  no = "01",
  iconBack = false,
  status = "Default",
  href,
  onClick,
}: NavItemProps) {
  const pathname = usePathname();
  const isActive = href && pathname === href;

  const content = (
    <>
      <p className="font-['Space_Mono',monospace] leading-none not-italic relative shrink-0 text-[#b9c7d6] text-[10px] sm:text-[11px] md:text-[12px] text-nowrap uppercase whitespace-nowrap">
        {no}
      </p>
      <div className="flex gap-[4px] sm:gap-[6px] md:gap-[8px] items-center justify-center relative shrink-0">
        <p className="font-['Chillax_Variable',sans-serif] leading-[0.82] not-italic relative shrink-0 text-[#b9c7d6] text-[12px] sm:text-[14px] md:text-[20px] text-nowrap font-semibold whitespace-nowrap">
          {navLabel}
        </p>
        {(status === "Active" || isActive) && (
          <div className="absolute h-[6.902px] left-1/2 top-[19.55px] translate-x-[-50%] w-[73.373px] hidden sm:block">
            <div className="absolute inset-0">
              <Image
                src="/navbar-assets/vector-215.svg"
                alt=""
                width={73}
                height={7}
                className="block max-w-none size-full"
                style={{ stroke: "rgba(72, 154, 220, 1)" }}
              />
            </div>
          </div>
        )}
      </div>
      {iconBack && (
        <div className="relative shrink-0 size-[16px] sm:size-[18px] md:size-[20px]">
          <Image
            src="/navbar-assets/shopping-cart.svg"
            alt="Shopping Cart"
            width={20}
            height={20}
            className="block max-w-none size-full"
          />
        </div>
      )}
    </>
  );

  const baseClassName =
    "flex gap-[3px] sm:gap-[5px] md:gap-[7px] items-start px-0 py-[7px] relative shrink-0 whitespace-nowrap";

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${
          className || baseClassName
        } cursor-pointer hover:opacity-80 transition-opacity`}
      >
        {content}
      </button>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        className={`${
          className || baseClassName
        } cursor-pointer hover:opacity-80 transition-opacity`}
      >
        {content}
      </Link>
    );
  }

  return <div className={className || baseClassName}>{content}</div>;
}

type GlobalNavV2Props = {
  className?: string;
  onBackground?: "OnDark" | "OnBackground3";
};

function GlobalNavV2({ className, onBackground = "OnDark" }: GlobalNavV2Props) {
  const { toggleCart } = useCart();

  return (
    <div
      className={`flex flex-nowrap items-center justify-center w-full min-w-0 mx-auto h-[70.047px] ${
        className || ""
      }`}
    >
      {/* Left Section: About, Career, Contact */}
      <div
        className="flex flex-nowrap h-[70.047px] items-center min-w-0 relative shrink-0"
        style={{
          filter:
            "drop-shadow(0px 4px 12px rgba(255, 138, 0, 0.25)) drop-shadow(0px 2px 6px rgba(255, 138, 0, 0.15))",
        }}
      >
        {/* Left decorative element - hidden on mobile */}
        <WingTip mirrored={false} />

        {/* Left nav items container */}
        <div className="bg-[#181e24] flex flex-col h-full items-start justify-center min-w-0 px-[4px] sm:px-[8px] md:px-[25px] py-[22px] relative shrink-0">
          <div className="flex flex-nowrap gap-[4px] sm:gap-[8px] md:gap-[40px] items-center relative shrink-0">
            <NavItem navLabel="About" no="C1" href="/about" />
            <NavItem navLabel="Career" no="C2" href="/career" />
            <NavItem navLabel="Contact" no="C3" href="/contact" />
          </div>
          <div className="absolute inset-0 pointer-events-none shadow-[inset_-1px_-3px_0.635px_0px_rgba(226,239,255,0.15)]" />
        </div>

        {/* Left end decorative element - hidden on mobile */}
        <ConnectorTriangle mirrored={false} />
      </div>

      {/* Center Logo */}
      <div className="flex flex-col items-center justify-center pb-0 pt-[13px] px-[4px] sm:px-[8px] md:px-0 relative shrink-0 w-[100px] sm:w-[140px] md:w-[254.186px] min-w-[100px] max-w-[254px] overflow-visible">
        <Link
          href="/"
          className="flex items-center justify-center w-full h-full hover:opacity-80 transition-opacity overflow-visible"
        >
          <Image
            src="/bambite-logo-blue.webp"
            alt="Bambite Logo"
            width={254}
            height={100}
            className="object-contain w-full h-auto"
            priority
          />
        </Link>
      </div>

      {/* Right Section: Dishes, Cart */}
      <div
        className="flex flex-nowrap h-[70.047px] items-center min-w-0 relative shrink-0"
        style={{
          filter:
            "drop-shadow(0px 4px 12px rgba(255, 138, 0, 0.25)) drop-shadow(0px 2px 6px rgba(255, 138, 0, 0.15))",
        }}
      >
        {/* Right start decorative element - hidden on mobile */}
        <ConnectorTriangle mirrored={true} />

        {/* Right nav items container */}
        <div className="bg-[#181e24] flex flex-col h-full items-end justify-center min-w-0 px-[4px] sm:px-[8px] md:px-[25px] py-[22px] relative shrink-0">
          <div className="flex flex-nowrap gap-[4px] sm:gap-[8px] md:gap-[40px] items-center relative shrink-0">
            {/* Empty space where Story link was */}
            <div className="flex gap-[3px] sm:gap-[5px] md:gap-[7px] items-start px-0 py-[7px] relative shrink-0 whitespace-nowrap">
              <p className="font-['Space_Mono',monospace] leading-none not-italic relative shrink-0 text-[#b9c7d6] text-[10px] sm:text-[11px] md:text-[12px] text-nowrap uppercase whitespace-nowrap opacity-0">
                C6
              </p>
              <div className="flex gap-[4px] sm:gap-[6px] md:gap-[8px] items-center justify-center relative shrink-0">
                <p className="font-['Chillax_Variable',sans-serif] leading-[0.82] not-italic relative shrink-0 text-[#b9c7d6] text-[12px] sm:text-[14px] md:text-[20px] text-nowrap font-semibold whitespace-nowrap opacity-0">
                  Story
                </p>
              </div>
            </div>
            <NavItem navLabel="Dishes" no="C4" href="/menu" />
            <NavItem
              iconBack={true}
              navLabel="Cart"
              no="C5"
              onClick={toggleCart}
            />
          </div>
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_-3px_0.635px_0px_rgba(226,239,255,0.15)]" />
        </div>

        {/* Right end decorative element - hidden on mobile */}
        <WingTip mirrored={true} />
      </div>
    </div>
  );
}

export default function NavbarV2() {
  return (
    <nav className="w-full fixed top-0 left-0 right-0 z-50 overflow-visible">
      <div className="w-full max-w-[1440px] mx-auto">
        <GlobalNavV2 className="w-full" />
      </div>
    </nav>
  );
}
