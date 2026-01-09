// Contact Page - Production Ready with Rate Limiting
"use client";

import { useState } from "react";
import ContactBackground from "@/components/ContactBackground";
import ContactFormInput from "@/components/ContactFormInput";
import ContactInfoSection from "@/components/ContactInfoSection";
import Image from "next/image";
import { submitContactForm } from "@/lib/api/contact";
import type { ContactFormPayload } from "@/lib/api/contact";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "" as ContactFormPayload["reason"] | "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rateLimitInfo, setRateLimitInfo] = useState<{
    isLimited: boolean;
    retryAfter?: number;
  }>({ isLimited: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset states
    setError(null);
    setSuccess(false);
    setRateLimitInfo({ isLimited: false });

    // Basic validation
    if (!formData.name || !formData.email || !formData.reason || !formData.message) {
      setError("Please fill in all required fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setSubmitting(true);

      // Submit to API
      const response = await submitContactForm({
        name: formData.name,
        email: formData.email,
        reason: formData.reason as ContactFormPayload["reason"],
        message: formData.message,
      });

      if (response.status === "success") {
        setSuccess(true);
        // Reset form
        setFormData({
          name: "",
          email: "",
          reason: "",
          message: "",
        });

        // Clear success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (err) {
      const error = err as Error & { code?: string; retryAfter?: number };

      // Handle rate limiting
      if (error.code === "RATE_LIMIT_EXCEEDED") {
        setRateLimitInfo({
          isLimited: true,
          retryAfter: error.retryAfter,
        });
        setError(error.message);
      } else {
        setError(error.message || "Failed to send message. Please try again.");
      }

      console.error("Contact form error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Map display names to API enum values
  const contactReasons = [
    { label: "General Inquiry", value: "general_inquiry" as const },
    { label: "Product Question", value: "product_question" as const },
    { label: "Collaboration", value: "collaboration" as const },
    { label: "Feedback", value: "feedback" as const },
    { label: "Other", value: "other" as const },
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

                    {/* Success Message */}
                    {success && (
                      <div className="w-full p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                        <p className="font-medium">Message sent successfully!</p>
                        <p className="text-sm mt-1">
                          We&apos;ll get back to you as soon as possible.
                        </p>
                      </div>
                    )}

                    {/* Error Message */}
                    {error && (
                      <div className="w-full p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        <p className="font-medium">Error</p>
                        <p className="text-sm mt-1">{error}</p>
                        {rateLimitInfo.isLimited && rateLimitInfo.retryAfter && (
                          <p className="text-xs mt-2 opacity-75">
                            Please wait {rateLimitInfo.retryAfter} minute
                            {rateLimitInfo.retryAfter > 1 ? "s" : ""} before
                            trying again.
                          </p>
                        )}
                      </div>
                    )}

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
                        disabled={submitting}
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
                        disabled={submitting}
                      />

                      <ContactFormInput
                        label="Reason of contact"
                        placeholder="Select reason of contact"
                        required
                        type="select"
                        options={contactReasons}
                        value={formData.reason || ""}
                        onChange={(value) =>
                          setFormData({ ...formData, reason: value as ContactFormPayload["reason"] })
                        }
                        disabled={submitting}
                      />

                      <ContactFormInput
                        label="Message"
                        placeholder="Message"
                        type="textarea"
                        required
                        value={formData.message}
                        onChange={(value) =>
                          setFormData({ ...formData, message: value })
                        }
                        disabled={submitting}
                      />

                      <button
                        type="submit"
                        disabled={submitting || rateLimitInfo.isLimited}
                        className="bg-gradient-to-b border border-[#193551] border-solid content-stretch flex from-[#074980] h-[48px] items-center relative to-[#172743] rounded-lg px-5 mt-3 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
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
                          {submitting
                            ? "Sending..."
                            : rateLimitInfo.isLimited
                            ? "Rate Limited"
                            : "Send Message"}
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

        {/* Mobile Bottom Illustration Section */}
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
