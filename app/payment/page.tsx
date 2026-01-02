// Payment Page
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CheckoutBackground from "@/components/CheckoutBackground";
import CheckoutOrderSummary from "@/components/CheckoutOrderSummary";
import PaymentSuccessModal from "@/components/PaymentSuccessModal";
import { useCart } from "@/contexts/CartContext";

function PaymentPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items, getTotal } = useCart();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"qr" | "card">("qr");

  // Check if payment was successful from query params
  useEffect(() => {
    const success = searchParams?.get("success");
    if (success === "true") {
      // Use setTimeout to avoid synchronous setState in effect
      const timer = setTimeout(() => {
        setShowSuccessModal(true);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (items.length === 0 && !showSuccessModal) {
    return (
      <CheckoutBackground>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-[#273b4f] text-xl mb-4">Your cart is empty</p>
            <Link
              href="/menu"
              className="text-[#1e6cad] hover:underline inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </CheckoutBackground>
    );
  }

  return (
    <CheckoutBackground>
      <div className="relative w-full min-h-screen">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute left-4 sm:left-12 top-[158px] content-stretch flex items-center p-[6px] rounded-[8px] hover:bg-gray-200 transition-colors z-50 cursor-pointer"
        >
          <div className="relative shrink-0 size-[36px] pointer-events-none">
            <div className="absolute flex inset-[15.3%_21.23%_17.98%_19.08%] items-center justify-center pointer-events-none">
              <div className="flex-none h-[32px] -scale-y-100 w-[29px] pointer-events-none">
                <div className="relative size-full pointer-events-none">
                  <div className="absolute inset-[-6.6%_-9.24%_-6.6%_0] pointer-events-none">
                    <Image
                      src="/checkout-assets/back-icon.svg"
                      alt="Back"
                      width={29}
                      height={32}
                      className="block max-w-none size-full pointer-events-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </button>

        {/* Main Content */}
        <div className="relative z-10 pt-[177.5px] pb-16 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:justify-center">
              {/* Left Section - Payment Form */}
              <div className="w-full lg:w-[518px] flex-shrink-0 order-2 lg:order-1">
                <div className="content-stretch flex flex-col gap-12 sm:gap-16 md:gap-[48px] items-start">
                  {/* Title and Breadcrumbs */}
                  <div className="content-stretch flex flex-col gap-[13px] items-start relative shrink-0 w-full">
                    <p
                      className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] from-[#1b232a] leading-none not-italic relative shrink-0 text-[32px] sm:text-[36px] md:text-[40px] to-[#315273] tracking-[-0.8px] w-full"
                      style={{ WebkitTextFillColor: "transparent" }}
                    >
                      Check out
                    </p>
                    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
                      <button
                        type="button"
                        onClick={() => router.push("/checkout")}
                        className="font-['Space_Mono',sans-serif] font-bold leading-none not-italic relative shrink-0 text-[13px] text-[#273b4f] text-nowrap uppercase hover:opacity-80 transition-opacity"
                      >
                        Order information
                      </button>
                      <div className="h-[8.902px] relative shrink-0 w-[4.451px]">
                        <div className="absolute inset-[-7.94%_-31.77%_-7.94%_-15.89%]">
                          <Image
                            src="/checkout-assets/arrow-right-icon.svg"
                            alt=""
                            width={4}
                            height={9}
                            className="block max-w-none size-full"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        disabled
                        className="font-['Space_Mono',sans-serif] font-bold leading-none not-italic opacity-60 relative shrink-0 text-[13px] text-[#273b4f] text-nowrap uppercase"
                      >
                        Payment
                      </button>
                    </div>
                  </div>

                  {/* Payment Method Selection */}
                  <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                    <p className="font-['Chillax_Variable',sans-serif] font-semibold leading-[0.82] not-italic relative shrink-0 text-[18px] sm:text-[20px] text-[#273b4f] w-full">
                      Select Payment Method
                    </p>

                    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full">
                      {/* QR PromptPay Option */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("qr")}
                        className={`border border-solid content-stretch flex gap-[13px] items-center p-4 relative rounded-[8px] shrink-0 w-full transition-colors ${
                          paymentMethod === "qr"
                            ? "border-[rgba(25,53,81,0.9)] bg-[#e6eef2]"
                            : "border-[rgba(39,59,79,0.15)] bg-white hover:bg-gray-50"
                        }`}
                      >
                        <div className="h-[24px] relative shrink-0 w-[23.958px]">
                          <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <Image
                              src="/checkout-assets/qr-icon.webp"
                              alt="QR Code"
                              fill
                              sizes="24px"
                              className="absolute left-[-53.49%] max-w-none size-[204.07%] top-[-53.73%]"
                            />
                          </div>
                        </div>
                        <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[#273b4f] text-nowrap">
                          QR PromptPay
                        </p>
                      </button>

                      {/* Credit/Debit Card Option */}
                      <div
                        className={`border border-solid content-stretch flex flex-col gap-[13px] items-start justify-center p-4 relative rounded-[8px] shrink-0 w-full ${
                          paymentMethod === "card"
                            ? "border-[rgba(25,53,81,0.9)] bg-[#e6eef2]"
                            : "border-[rgba(39,59,79,0.15)] bg-white"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setPaymentMethod("card")}
                          className="content-stretch flex gap-[13px] items-center relative shrink-0 w-full text-left"
                        >
                          <div className="overflow-clip relative shrink-0 size-[24px]">
                            <div className="absolute inset-[20.09%_8.88%]">
                              <div className="absolute inset-[-6.97%_-5.07%]">
                                <Image
                                  src="/checkout-assets/credit-card-icon.svg"
                                  alt="Credit Card"
                                  width={24}
                                  height={24}
                                  className="block max-w-none size-full"
                                />
                              </div>
                            </div>
                          </div>
                          <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[#273b4f] text-nowrap">
                            Credit/Debit Card
                          </p>
                        </button>

                        {paymentMethod === "card" && (
                          <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                            <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
                              <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[#273b4f] w-full">
                                Name *
                              </p>
                              <div className="content-stretch flex flex-col gap-0 h-[40px] items-start relative rounded-[6px] shrink-0 w-full">
                                <div className="basis-0 bg-white border border-[#d1d5db] border-solid content-stretch flex grow items-center min-h-px min-w-px px-4 py-[14px] relative rounded-[4px] shrink-0 w-full">
                                  <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    className="basis-0 font-['DM_Sans',sans-serif] font-normal grow h-[20px] leading-[1.2] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[#273b4f] bg-transparent border-none outline-none w-full placeholder:text-[#6a7282]"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
                              <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[#273b4f] w-full">
                                Card Number *
                              </p>
                              <div className="content-stretch flex flex-col gap-0 h-[40px] items-start relative rounded-[6px] shrink-0 w-full">
                                <div className="basis-0 bg-white border border-[#d1d5db] border-solid content-stretch flex grow items-center min-h-px min-w-px px-4 py-[14px] relative rounded-[4px] shrink-0 w-full">
                                  <input
                                    type="text"
                                    placeholder="Card Number"
                                    required
                                    className="basis-0 font-['DM_Sans',sans-serif] font-normal grow h-[20px] leading-[1.2] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[#273b4f] bg-transparent border-none outline-none w-full placeholder:text-[#6a7282]"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
                              <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
                                <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[#273b4f] w-full">
                                  MM/YY *
                                </p>
                                <div className="content-stretch flex flex-col gap-0 h-[40px] items-start relative rounded-[6px] shrink-0 w-full">
                                  <div className="basis-0 bg-white border border-[#d1d5db] border-solid content-stretch flex grow items-center min-h-px min-w-px px-4 py-[14px] relative rounded-[4px] shrink-0 w-full">
                                    <input
                                      type="text"
                                      placeholder="MM/YY"
                                      required
                                      className="basis-0 font-['DM_Sans',sans-serif] font-normal grow h-[20px] leading-[1.2] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[#273b4f] bg-transparent border-none outline-none w-full placeholder:text-[#6a7282]"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
                                <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[#273b4f] w-full">
                                  CVC *
                                </p>
                                <div className="content-stretch flex flex-col gap-0 h-[40px] items-start relative rounded-[6px] shrink-0 w-full">
                                  <div className="basis-0 bg-white border border-[#d1d5db] border-solid content-stretch flex grow items-center min-h-px min-w-px px-4 py-[14px] relative rounded-[4px] shrink-0 w-full">
                                    <input
                                      type="text"
                                      placeholder="CVC"
                                      required
                                      className="basis-0 font-['DM_Sans',sans-serif] font-normal grow h-[20px] leading-[1.2] min-h-px min-w-px overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-[#273b4f] bg-transparent border-none outline-none w-full placeholder:text-[#6a7282]"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Terms and Order Button */}
                  <div className="content-stretch flex flex-col gap-6 sm:gap-8 md:gap-[21px] items-start relative shrink-0 w-full">
                    <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[12px] text-[#1e6cad] w-full">
                      <span>By clicking &apos;Order&apos;, you accept </span>
                      <a
                        href="https://www.eshopworld.com/terms-and-conditions-of-sale-th/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="[text-underline-position:from-font] cursor-pointer decoration-solid underline hover:text-[#1a5a9a]"
                      >
                        Terms and Conditions
                      </a>
                    </p>
                    <div className="flex items-center justify-center relative shrink-0 w-full">
                      <div className="flex-none rotate-180 w-full">
                        <button
                          type="button"
                          onClick={() => {
                            // Simulate payment processing
                            router.push("/payment?success=true");
                          }}
                          className="bg-gradient-to-b border border-[#193551] border-solid content-stretch flex from-[#074980] h-[58px] items-center relative to-[#172743] w-full rounded-lg overflow-hidden group"
                        >
                          {/* Texture overlays */}
                          <div className="absolute contents inset-[-0.5px_calc(-0.08%-0.5px)_calc(0%-0.5px)_-0.5px]">
                            <div className="absolute inset-[0_-0.08%_0_0.57%] mix-blend-overlay opacity-30">
                              <Image
                                src="/product-assets/metal-overlay.webp"
                                alt=""
                                fill
                                sizes="518px"
                                className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                              />
                            </div>
                            <div className="absolute flex inset-[0_-0.08%_0_0] items-center justify-center mix-blend-lighten">
                              <div className="flex-none h-[58px] -scale-y-100 w-full">
                                <div className="opacity-[0.34] relative size-full">
                                  <Image
                                    src="/product-assets/grunge-overlay.webp"
                                    alt=""
                                    fill
                                    sizes="518px"
                                    className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="absolute flex inset-[0_-0.08%_0_0] items-center justify-center mix-blend-soft-light">
                              <div className="flex-none h-[58px] rotate-180 -scale-y-100 w-full">
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
                              <div className="flex-none rotate-180">
                                <div className="content-stretch flex items-center p-[6px] relative rounded-[8px]">
                                  <div className="relative shrink-0 size-[24px]">
                                    <div className="absolute inset-[15.3%_21.23%_17.98%_19.08%]">
                                      <div className="absolute inset-[-6.6%_-9.24%_-6.6%_0]">
                                        <Image
                                          src="/checkout-assets/arrow-right-icon.svg"
                                          alt=""
                                          width={24}
                                          height={24}
                                          className="block max-w-none size-full"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="basis-0 flex grow items-center justify-center min-h-px min-w-px relative shrink-0">
                              <div className="flex-none rotate-180 w-full">
                                <div className="content-stretch flex font-['Space_Mono',sans-serif] font-bold gap-[16px] items-center leading-none not-italic relative text-[12.583px] text-nowrap uppercase w-full">
                                  <p className="relative shrink-0 text-[rgba(255,255,255,0.9)]">
                                    Place Order
                                  </p>
                                  <p className="relative shrink-0 text-white">
                                    {getTotal()} THB
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="absolute inset-[-0.5px] pointer-events-none shadow-[inset_3.77px_3.77px_1.153px_0px_rgba(226,239,255,0.12)]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Order Summary */}
              <div className="w-full lg:w-[338px] flex-shrink-0 order-1 lg:order-2">
                <CheckoutOrderSummary />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="relative z-10 pb-8 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="max-w-6xl mx-auto">
            <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] text-[12px] text-[rgba(21,32,43,0.55)] w-full lg:w-[518px]">
              © BamBite, 2026. All rights reserved.
            </p>
          </div>
        </div>

        {/* Payment Success Modal */}
        {showSuccessModal && <PaymentSuccessModal />}
      </div>
    </CheckoutBackground>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentPageContent />
    </Suspense>
  );
}

