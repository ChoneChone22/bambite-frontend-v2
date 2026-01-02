// Checkout Page
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CheckoutBackground from "@/components/CheckoutBackground";
import CheckoutOrderSummary from "@/components/CheckoutOrderSummary";
import CheckoutFormInput from "@/components/CheckoutFormInput";
import CityDropdown from "@/components/CityDropdown";
import PaymentMethodSelector from "@/components/PaymentMethodSelector";
import { useCart } from "@/contexts/CartContext";

type PaymentMethod = "qr" | "card";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal } = useCart();
  const [formData, setFormData] = useState({
    recipientName: "",
    phoneNumber: "+66",
    houseNo: "",
    city: "",
    district: "",
    subdistrict: "",
    postcode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("qr");
  const [cardData, setCardData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle checkout submission
    console.log("Checkout submitted:", { formData, paymentMethod, cardData });
    // Redirect to payment page
    router.push("/payment");
  };

  const total = getTotal();

  if (items.length === 0) {
    return (
      <CheckoutBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-[#273b4f] text-xl mb-4">Your cart is empty</p>
            <Link href="/menu" className="text-[#1e6cad] hover:underline">
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
              {/* Left Section - Checkout Form */}
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
                        className="font-['Space_Mono',sans-serif] font-bold leading-none not-italic relative shrink-0 text-[13px] text-[#273b4f] text-nowrap uppercase"
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

                  {/* Form */}
                  <form
                    onSubmit={handleSubmit}
                    className="content-stretch flex flex-col gap-8 sm:gap-12 md:gap-[20px] items-start relative shrink-0 w-full"
                  >
                    {/* Recipient Information */}
                    <div className="content-stretch flex flex-col gap-6 sm:gap-8 md:gap-[20px] items-start relative shrink-0 w-full">
                      <CheckoutFormInput
                        label="Recipient's Name"
                        placeholder="Name"
                        required
                        value={formData.recipientName}
                        onChange={(value) =>
                          setFormData({ ...formData, recipientName: value })
                        }
                      />
                      <CheckoutFormInput
                        label="Phone Number"
                        placeholder="+66"
                        required
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(value) =>
                          setFormData({ ...formData, phoneNumber: value })
                        }
                      />
                    </div>

                    {/* Delivery Address */}
                    <div className="content-stretch flex flex-col gap-6 sm:gap-8 md:gap-[24px] items-start relative shrink-0 w-full">
                      <p
                        className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] from-[#1b232a] leading-[0.82] not-italic relative shrink-0 text-[18px] sm:text-[20px] text-nowrap to-[#315273]"
                        style={{ WebkitTextFillColor: "transparent" }}
                      >
                        Delivery Address
                      </p>
                      <div className="content-stretch flex flex-col gap-6 sm:gap-8 md:gap-[20px] items-start relative shrink-0 w-full">
                        <CheckoutFormInput
                          label="House No., Street Name"
                          placeholder=""
                          required
                          value={formData.houseNo}
                          onChange={(value) =>
                            setFormData({ ...formData, houseNo: value })
                          }
                        />
                        <div className="content-stretch flex flex-col sm:flex-row gap-4 sm:gap-[20px] items-start relative shrink-0 w-full">
                          <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
                            <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] text-[#273b4f] w-full">
                              City *
                            </p>
                            <CityDropdown
                              value={formData.city}
                              onChange={(value) =>
                                setFormData({ ...formData, city: value })
                              }
                            />
                          </div>
                          <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
                            <CheckoutFormInput
                              label="District"
                              placeholder="Search district"
                              required
                              value={formData.district}
                              onChange={(value) =>
                                setFormData({ ...formData, district: value })
                              }
                            />
                          </div>
                        </div>
                        <div className="content-stretch flex flex-col sm:flex-row gap-4 sm:gap-[20px] items-start relative shrink-0 w-full">
                          <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
                            <CheckoutFormInput
                              label="Subdistrict"
                              placeholder="Search subdistrict"
                              required
                              value={formData.subdistrict}
                              onChange={(value) =>
                                setFormData({ ...formData, subdistrict: value })
                              }
                            />
                          </div>
                          <div className="basis-0 content-stretch flex flex-col gap-[8px] grow items-start justify-center min-h-px min-w-px relative shrink-0">
                            <CheckoutFormInput
                              label="Postcode"
                              placeholder=""
                              required
                              value={formData.postcode}
                              onChange={(value) =>
                                setFormData({ ...formData, postcode: value })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <PaymentMethodSelector
                      selectedMethod={paymentMethod}
                      onMethodChange={setPaymentMethod}
                      onCardDataChange={setCardData}
                    />

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
                            type="submit"
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
                                      {total} THB
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
                  </form>
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
        <div className="relative z-10 pb-8 px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] text-[12px] text-[rgba(21,32,43,0.55)] w-full lg:w-[518px]">
              © BamBite, 2026. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </CheckoutBackground>
  );
}
