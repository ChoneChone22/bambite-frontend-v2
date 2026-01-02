// Order Success Page
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MenuBackground from "@/components/MenuBackground";
import { useCart } from "@/contexts/CartContext";

export default function OrderSuccessPage() {
  const router = useRouter();
  const { items, getTotal } = useCart();
  const [orderNumber, setOrderNumber] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [paidDate, setPaidDate] = useState("");

  // Generate order details only on client side to avoid hydration mismatch
  useEffect(() => {
    // Use setTimeout to avoid synchronous setState in effect
    const timer = setTimeout(() => {
      // Generate a random order number
      setOrderNumber(Math.floor(Math.random() * 1000000000000000000).toString());

      const now = new Date();
      setOrderDate(
        now.toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );

      // Add a few seconds to the order date
      const paid = new Date(now.getTime() + 3 * 1000);
      setPaidDate(
        paid.toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Clear cart after showing order success (optional - you might want to keep it)
  // useEffect(() => {
  //   clearCart();
  // }, [clearCart]);

  const subtotal = getTotal();
  const discount = 20; // Example discount
  const deliveryFee = 20; // Example delivery fee
  const total = subtotal - discount + deliveryFee;
  const paymentMethod = "QR PromptPay"; // This should come from payment page

  const handleGoToMenu = () => {
    router.push("/menu");
  };

  return (
    <MenuBackground>
      <div className="min-h-screen w-full relative">
        {/* Main Content */}
        <div className="relative z-10 pt-20 sm:pt-24 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-6xl mx-auto">
            {/* Success Message Section */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start mb-12 lg:mb-16">
              <div className="flex flex-col gap-[17px] items-start w-full lg:w-[467px]">
                <p
                  className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] font-semibold from-[#1b232a] leading-[0.82] not-italic relative shrink-0 text-[48px] sm:text-[56px] md:text-[64px] to-[#315273] w-full"
                  style={{ WebkitTextFillColor: "transparent" }}
                >
                  Order Successful
                </p>
                <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[15px] sm:text-[16px] md:text-[17px] text-[#273b4f] w-full">
                  The chef is start cooking now. Get your order in approximately
                  3 hours.
                </p>
                <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[12px] text-[rgba(21,32,43,0.55)] w-full">
                  We&apos;ll send order confirmation receipt to your inbox
                  shortly.
                </p>
              </div>
              <div className="hidden lg:block h-[300px] sm:h-[350px] md:h-[390px] relative shrink-0 w-full lg:w-[421px]">
                <img
                  src="/payment-assets/bambite-order-success.webp"
                  alt="Success"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Order Detail Section */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-[32px] items-start mb-12">
              {/* Left Section - Items */}
              <div className="flex flex-col gap-[27px] items-start w-full lg:flex-1">
                <p
                  className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] font-semibold from-[#1b232a] leading-[0.89] not-italic relative shrink-0 text-[28px] sm:text-[30px] md:text-[32px] to-[#315273] w-full"
                  style={{ WebkitTextFillColor: "transparent" }}
                >
                  Order Detail
                </p>
                <div className="flex flex-col gap-[20px] items-start w-full">
                  <p
                    className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] font-semibold from-[#1b232a] leading-[0.82] not-italic relative shrink-0 text-[18px] sm:text-[20px] to-[#315273] w-full"
                    style={{ WebkitTextFillColor: "transparent" }}
                  >
                    Items
                  </p>
                  <div className="flex flex-col gap-[18px] items-start w-full">
                    {items.length === 0 ? (
                      <p className="text-[#273b4f]">No items in order.</p>
                    ) : (
                      items.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-[23px] items-center w-full"
                        >
                          {/* Product Image */}
                          <div className="h-[120px] sm:h-[140px] md:h-[151px] relative shrink-0 w-[120px] rounded-lg overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              sizes="120px"
                              className="object-cover"
                            />
                          </div>

                          {/* Product Info */}
                          <div className="flex flex-col gap-[6px] items-start flex-1">
                            <p
                              className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] font-semibold from-[#1b232a] leading-[0.82] not-italic relative shrink-0 text-[18px] sm:text-[20px] to-[#315273] w-full"
                              style={{ WebkitTextFillColor: "transparent" }}
                            >
                              {item.title}
                            </p>
                            {item.size && (
                              <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[rgba(21,32,43,0.55)] w-full">
                                Size: {item.size}
                              </p>
                            )}
                            <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[rgba(21,32,43,0.55)] w-full">
                              {item.quantity} x {item.price} THB
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Right Section - Order Summary */}
              <div className="flex flex-col gap-[48px] items-start w-full lg:w-[334px]">
                {/* Order Summary */}
                <div className="flex flex-col gap-[20px] items-start w-full">
                  <p
                    className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] font-semibold from-[#1b232a] leading-[0.82] not-italic relative shrink-0 text-[18px] sm:text-[20px] to-[#315273] w-full"
                    style={{ WebkitTextFillColor: "transparent" }}
                  >
                    Order Summary
                  </p>
                  <div className="flex flex-col gap-[12px] items-start w-full">
                    <div className="flex font-['DM_Sans',sans-serif] font-normal items-center justify-between leading-[1.2] relative shrink-0 text-[14px] text-[#273b4f] text-nowrap w-full">
                      <p className="relative shrink-0">Subtotal</p>
                      <p className="relative shrink-0 text-right">
                        {subtotal} THB
                      </p>
                    </div>
                    <div className="flex font-['DM_Sans',sans-serif] font-normal items-center justify-between leading-[1.2] relative shrink-0 text-[14px] text-[#273b4f] text-nowrap w-full">
                      <p className="relative shrink-0">Discount</p>
                      <p className="relative shrink-0 text-right">
                        -{discount} THB
                      </p>
                    </div>
                    <div className="flex font-['DM_Sans',sans-serif] font-normal items-center justify-between leading-[1.2] relative shrink-0 text-[14px] text-[#273b4f] text-nowrap w-full">
                      <p className="relative shrink-0">Delivery Fee</p>
                      <p className="relative shrink-0 text-right">
                        {deliveryFee} THB
                      </p>
                    </div>
                    <div className="flex font-['DM_Sans',sans-serif] font-semibold items-center justify-between leading-[1.2] relative shrink-0 text-[14px] text-[#273b4f] text-nowrap w-full">
                      <p className="relative shrink-0">Total</p>
                      <p className="relative shrink-0 text-right">
                        {total} THB
                      </p>
                    </div>
                  </div>
                </div>

                {/* Paid by */}
                <div className="flex flex-col gap-[20px] items-start w-full">
                  <p
                    className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] font-semibold from-[#1b232a] leading-[0.82] not-italic relative shrink-0 text-[18px] sm:text-[20px] to-[#315273] w-full"
                    style={{ WebkitTextFillColor: "transparent" }}
                  >
                    Paid by
                  </p>
                  <div className="flex font-['DM_Sans',sans-serif] font-normal items-center justify-between leading-[1.2] relative shrink-0 text-[14px] text-[#273b4f] text-nowrap w-full">
                    <p className="relative shrink-0">{paymentMethod}</p>
                    <p className="relative shrink-0 text-right">{total} THB</p>
                  </div>
                </div>

                {/* Order Details */}
                <div className="flex flex-col gap-[12px] items-start w-full">
                  <div className="flex font-['DM_Sans',sans-serif] font-normal items-center justify-between leading-[1.2] relative shrink-0 text-[14px] text-[#273b4f] text-nowrap w-full">
                    <p className="relative shrink-0">Order No.</p>
                    <p className="relative shrink-0 text-right">
                      {orderNumber || "..."}
                    </p>
                  </div>
                  <div className="flex font-['DM_Sans',sans-serif] font-normal items-center justify-between leading-[1.2] relative shrink-0 text-[14px] text-[#273b4f] text-nowrap w-full">
                    <p className="relative shrink-0">Placed on</p>
                    <p className="relative shrink-0 text-right">
                      {orderDate || "..."}
                    </p>
                  </div>
                  <div className="flex font-['DM_Sans',sans-serif] font-normal items-center justify-between leading-[1.2] relative shrink-0 text-[14px] text-[#273b4f] text-nowrap w-full">
                    <p className="relative shrink-0">Paid on</p>
                    <p className="relative shrink-0 text-right">
                      {paidDate || "..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Go back to menu button */}
            <div className="flex items-center justify-center w-full mb-8">
              <div className="flex-none rotate-180 w-full max-w-[426px]">
                <button
                  onClick={handleGoToMenu}
                  className="bg-gradient-to-b border border-[#193551] border-solid content-stretch flex from-[#074980] h-[58px] items-center relative to-[#172743] w-full rounded-lg overflow-hidden group"
                >
                  {/* Texture overlays */}
                  <div className="absolute contents inset-[-0.5px_calc(-0.08%-0.5px)_calc(0%-0.5px)_-0.5px]">
                    <div className="absolute inset-[0_-0.08%_0_0.57%] mix-blend-overlay opacity-30">
                      <Image
                        src="/product-assets/metal-overlay.webp"
                        alt=""
                        fill
                        sizes="426px"
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
                            sizes="426px"
                            className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="absolute flex inset-[0_-0.08%_0_0] items-center justify-center mix-blend-soft-light">
                      <div className="flex-none h-[58px] rotate-180 scale-y-[-100%] w-full">
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
                    <div className="basis-0 flex grow items-center justify-center min-h-px min-w-px relative shrink-0">
                      <div className="flex-none rotate-180 w-full">
                        <div className="content-stretch flex gap-[16px] items-center relative w-full">
                          <p className="font-['Space_Mono',sans-serif] font-bold leading-none not-italic relative shrink-0 text-[12.583px] text-[rgba(255,255,255,0.9)] text-nowrap uppercase">
                            Go back to menu
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-[-0.5px] pointer-events-none shadow-[inset_3.77px_3.77px_1.153px_0px_rgba(226,239,255,0.12)]" />
                </button>
              </div>
            </div>

            {/* Footer Copyright */}
            <div className="flex items-start w-full">
              <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] text-[12px] text-[rgba(21,32,43,0.55)] w-full max-w-[518px]">
                © BamBite, 2026. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MenuBackground>
  );
}
