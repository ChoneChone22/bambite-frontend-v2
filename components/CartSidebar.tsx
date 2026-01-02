// Cart Sidebar component
"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import CartItem from "./CartItem";

export default function CartSidebar() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, getTotal } =
    useCart();

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const total = getTotal();

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[466px] bg-[#d1e3ea] z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="content-stretch flex h-full flex-col items-center pl-0 pr-[24px] py-[24px] w-full overflow-hidden">
          <div className="basis-0 content-stretch flex flex-col gap-[26px] grow items-start min-h-px min-w-px pb-0 pt-[20px] px-[20px] relative shrink-0 w-full overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={closeCart}
              className="content-stretch flex gap-[5px] items-center px-0 py-[8px] relative shrink-0 hover:opacity-80 transition-opacity self-start"
              aria-label="Close cart"
            >
              <p className="font-['Space_Mono',sans-serif] font-bold leading-none not-italic relative shrink-0 text-[11px] sm:text-[13px] text-[#273b4f] text-nowrap uppercase">
                Close
              </p>
            </button>

            {/* Cart Items */}
            <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
              {items.length === 0 ? (
                <div className="text-center w-full py-12">
                  <p
                    className="bg-clip-text bg-gradient-to-b font-['DM_Sans',sans-serif] font-normal from-[#1b232a] leading-[1.2] relative to-[#315273] text-[16px]"
                    style={{ WebkitTextFillColor: "transparent" }}
                  >
                    Your cart is empty
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={removeItem}
                    onQuantityChange={updateQuantity}
                  />
                ))
              )}
            </div>
          </div>

          {/* Footer with Subtotal and Checkout */}
          {items.length > 0 && (
            <div className="bg-[#d1e3ea] content-stretch flex flex-col gap-[24px] items-center p-[20px] relative shrink-0 w-full">
              {/* Subtotal */}
              <div className="content-stretch flex font-['DM_Sans',sans-serif] font-semibold items-center justify-between leading-[1.2] relative shrink-0 text-[15px] sm:text-[17px] text-nowrap w-full">
                <p
                  className="bg-clip-text bg-gradient-to-b from-[#1b232a] relative shrink-0 to-[#315273]"
                  style={{ WebkitTextFillColor: "transparent" }}
                >
                  Subtotal
                </p>
                <p
                  className="bg-clip-text bg-gradient-to-b from-[#1b232a] relative shrink-0 to-[#315273]"
                  style={{ WebkitTextFillColor: "transparent" }}
                >
                  {total} THB
                </p>
              </div>

              {/* Checkout Button */}
              <div className="flex items-center justify-center relative shrink-0 w-full">
                <div className="flex-none rotate-[180deg] w-full">
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="bg-gradient-to-b border border-[#193551] border-solid content-stretch flex from-[#074980] h-[58px] items-center relative to-[#172743] w-full overflow-hidden rounded-lg block"
                  >
                    {/* Texture overlays */}
                    <div className="absolute contents inset-[-0.5px_calc(-0.08%-0.5px)_calc(0%-0.5px)_-0.5px]">
                      <div className="absolute inset-[0_-0.08%_0_0.57%] mix-blend-overlay opacity-30">
                        <Image
                          src="/product-assets/metal-overlay.webp"
                          alt=""
                          fill
                          sizes="466px"
                          className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                        />
                      </div>
                      <div className="absolute flex inset-[0_-0.08%_0_0] items-center justify-center mix-blend-lighten">
                        <div className="flex-none h-[58px] scale-y-[-100%] w-full">
                          <div className="opacity-[0.34] relative size-full">
                            <Image
                              src="/product-assets/grunge-overlay.webp"
                              alt=""
                              fill
                              sizes="466px"
                              className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="absolute flex inset-[0_-0.08%_0_0] items-center justify-center mix-blend-soft-light">
                        <div className="flex-none h-[58px] rotate-[180deg] scale-y-[-100%] w-full">
                          <div
                            className="opacity-30 size-full"
                            style={{
                              backgroundImage:
                                "linear-gradient(rgba(128, 128, 128, 0.6) 0%, rgb(128, 128, 128) 19.684%, rgba(128, 128, 128, 0.3) 70.46%, rgb(128, 128, 128) 100%)",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Button Content */}
                    <div className="basis-0 content-stretch flex gap-[24px] grow h-[58px] items-center min-h-px min-w-px pl-[12px] pr-[20px] py-0 relative shrink-0 z-10">
                      <div className="flex items-center justify-center relative shrink-0">
                        <div className="flex-none rotate-[180deg]">
                          <div className="content-stretch flex items-center p-[6px] relative rounded-[8px]">
                            <div className="relative shrink-0 size-[24px]">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="text-white"
                              >
                                <path
                                  d="M9 18L15 12L9 6"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="basis-0 flex grow items-center justify-center min-h-px min-w-px relative shrink-0">
                        <div className="flex-none rotate-[180deg] w-full">
                          <div className="content-stretch flex font-['Space_Mono',sans-serif] gap-[16px] items-center leading-none not-italic relative text-[11px] sm:text-[12px] md:text-[12.583px] text-nowrap uppercase w-full">
                            <p className="relative shrink-0 text-[rgba(255,255,255,0.9)]">
                              Check out
                            </p>
                            <p className="relative shrink-0 text-white">
                              {total} THB
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-[-0.5px] pointer-events-none shadow-[inset_3.77px_3.77px_1.153px_0px_rgba(226,239,255,0.12)]" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

