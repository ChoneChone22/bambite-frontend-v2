// Mobile Navbar component
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import MobileMenuOverlay from "./MobileMenuOverlay";

export default function NavbarMobile() {
  const { toggleCart, items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[9999] w-full px-4 pt-6 pb-4 flex items-center justify-between gap-4">
        {/* Menu Button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="flex-shrink-0"
          aria-label="Open menu"
        >
          <div className="relative w-[52px] h-[50px]">
            <Image
              src="/mobile-menu.png"
              alt="Menu"
              fill
              className="object-contain"
              priority
            />
          </div>
        </button>

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <div className="relative w-[177px] h-[40px]">
            <Image
              src="/mobile-logo.png"
              alt="Bambite Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Cart Button */}
        <button
          onClick={toggleCart}
          className="flex-shrink-0 bg-[rgba(255,255,255,0.15)] rounded-lg p-1.5 relative"
        >
          <div className="relative w-[24px] h-[24px]">
            <Image
              src="/mobile-cart.png"
              alt="Cart"
              fill
              className="object-contain"
            />
          </div>
          {itemCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-[#ff8a00] rounded-full w-5 h-5 flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">
                {itemCount}
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <MobileMenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}
