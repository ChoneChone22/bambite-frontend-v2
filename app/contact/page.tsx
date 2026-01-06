// Contact Page
"use client";

import { useState } from "react";
import ContactBackground from "@/components/ContactBackground";
import ContactFormInput from "@/components/ContactFormInput";
import ContactInfoSection from "@/components/ContactInfoSection";
import Image from "next/image";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    // TODO: Add API call to submit form
  };

  const contactReasons = [
    "General Inquiry",
    "Product Question",
    "Collaboration",
    "Feedback",
    "Other",
  ];

  return (
    <ContactBackground>
      <div className="relative w-full min-h-screen overflow-x-hidden">
        {/* Main Content */}
        <div className="relative z-10 pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-6 sm:pb-8 md:pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1400px] mx-auto md:ml-8 lg:ml-16 mt-6 sm:mt-8 md:mt-10 lg:mt-12">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-12">
              {/* Left Section - Form */}
              <div className="w-full lg:w-[518px] flex-shrink-0">
                <div className="content-stretch flex flex-col gap-10 sm:gap-12 md:gap-16 lg:gap-20 items-end overflow-x-clip overflow-y-auto px-0 py-3 sm:py-4 md:py-6">
                  {/* Intro Text */}
                  <div className="h-auto relative shrink-0 w-full">
                    <p className="font-['Chillax_Variable',sans-serif] font-medium leading-[1.2] not-italic text-[28px] md:text-[28px] text-[#273b4f] w-full flex items-start gap-1">
                      <span className="inline-flex h-[9px] w-[24px] relative top-[1px]">
                        <span className="flex-none rotate-90">
                          <span className="gap-[13px] grid-cols-[repeat(1,_fit-content(100%))] grid-rows-[repeat(2,_fit-content(100%))] inline-grid relative">
                            <span className="[grid-area:1_/_1] flex h-[19px] items-center justify-center relative shrink-0 w-[9px]">
                              <span className="flex-none rotate-[63.724deg] skew-x-[31.302deg]">
                                <span className="bg-[#1e6cad] rounded-[1.4px] size-[10.7px] block" />
                              </span>
                            </span>
                            <span className="[grid-area:2_/_1] flex h-[19px] items-center justify-center relative shrink-0 w-[9px]">
                              <span className="flex-none rotate-[63.724deg] skew-x-[31.302deg]">
                                <span className="bg-[#1e6cad] rounded-[1.4px] size-[10.7px] block" />
                              </span>
                            </span>
                          </span>
                        </span>
                      </span>
                      <span>
                        We&apos;re Here for You. Questions about our products,
                        locations, or collaborations? Send us a message and our
                        support team — guided by smart tech and warm hearts —
                        will respond shortly. The future of flavour starts with
                        a conversation.
                      </span>
                    </p>
                  </div>

                  {/* Form Section */}
                  <div className="content-stretch flex flex-col gap-8 md:gap-8 items-start relative shrink-0 w-full">
                    <p
                      className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] from-[#1b232a] leading-[0.89] not-italic relative shrink-0 text-[32px] md:text-[32px] to-[#315273] w-full"
                      style={{ WebkitTextFillColor: "transparent" }}
                    >
                      Reach us here
                    </p>

                    <form
                      onSubmit={handleSubmit}
                      className="content-stretch flex flex-col gap-4 md:gap-4 items-start relative shrink-0 w-full"
                    >
                      <ContactFormInput
                        label="Name"
                        placeholder="Name"
                        required
                        type="text"
                        value={formData.name}
                        onChange={(value) =>
                          setFormData({ ...formData, name: value })
                        }
                      />

                      <ContactFormInput
                        label="Email"
                        placeholder="Email"
                        required
                        type="email"
                        value={formData.email}
                        onChange={(value) =>
                          setFormData({ ...formData, email: value })
                        }
                      />

                      <ContactFormInput
                        label="Reason of contact"
                        placeholder="Select reason of contact"
                        required
                        type="select"
                        options={contactReasons}
                        value={formData.reason}
                        onChange={(value) =>
                          setFormData({ ...formData, reason: value })
                        }
                      />

                      <ContactFormInput
                        label="Message"
                        placeholder="Message"
                        type="textarea"
                        value={formData.message}
                        onChange={(value) =>
                          setFormData({ ...formData, message: value })
                        }
                      />

                      <button
                        type="submit"
                        className="bg-gradient-to-b border border-[#193551] border-solid content-stretch flex from-[#074980] h-[48px] items-center relative to-[#172743] rounded-lg px-5 mt-3"
                      >
                        <div className="absolute contents inset-[-0.5px_-0.5px_calc(0%-0.5px)_-0.5px]">
                          <div className="absolute inset-[0_0_0_0.57%] mix-blend-overlay opacity-30">
                            <Image
                              src="/product-assets/metal-overlay.webp"
                              alt=""
                              fill
                              sizes="200px"
                              className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                            />
                          </div>
                        </div>
                        <p className="font-['Space_Mono',sans-serif] font-bold leading-none not-italic relative text-[12px] text-white uppercase z-10">
                          Send Message
                        </p>
                      </button>
                    </form>
                  </div>

                  {/* Contact Info Section */}
                  <ContactInfoSection />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Illustration Section (uses page background) */}
        <div className="relative z-10 mt-12 px-4 sm:px-6 lg:hidden">
          <div className="relative flex items-end justify-between gap-4">
            <p className="font-['Post_No_Bills_Colombo_SemiBold',sans-serif] leading-[0.82] text-[140px] sm:text-[160px] text-[#8fa5ae] opacity-60 whitespace-nowrap -translate-y-1">
              C3
            </p>
            <Image
              src="/contact-assets/character-image.webp"
              alt="Bambite mascot"
              width={340}
              height={360}
              className="w-[78%] max-w-[340px] h-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="relative z-10 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1400px] mx-auto md:ml-8 lg:ml-16">
            <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] text-[12px] text-[rgba(21,32,43,0.55)] w-full lg:w-[518px]">
              © BamBite, 2026. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </ContactBackground>
  );
}
