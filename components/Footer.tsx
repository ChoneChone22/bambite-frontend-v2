// Footer component - Simplified with footer-bg.png background
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative w-full min-h-[821px] overflow-x-hidden bg-[#202730]">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/footer-assets/footer-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Footer Logo - Top Left */}
      <div className="relative z-10 mt-12 ml-[168px] lg:mt-16 lg:ml-[184px]">
        <div className="relative w-[200px] h-[100px] lg:w-[250px] lg:h-[125px]">
          <Image
            src="/footer-assets/footer-logo.png"
            alt="Bambite Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Footer Content - Positioned at bottom right */}
      <div className="absolute bottom-[82px] right-[282px] lg:bottom-[98px] lg:right-[298px] z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start lg:items-start">
          {/* Links Column */}
          <div>
            <p className="font-['Space_Mono',monospace] font-bold leading-none not-italic text-[#75b2eb] text-[13px] text-nowrap uppercase mb-4">
              Links
            </p>
            <div className="flex flex-col gap-[14px] text-white">
              <p className="font-['Chillax_Variable',sans-serif] font-semibold leading-[0.82] not-italic text-[20px]">
                Products
              </p>
              <p className="font-['Chillax_Variable',sans-serif] font-semibold leading-[0.82] not-italic text-[20px]">
                About
              </p>
              <p className="font-['Chillax_Variable',sans-serif] font-semibold leading-[0.82] not-italic text-[20px]">
                Blog
              </p>
              <p className="font-['Chillax_Variable',sans-serif] font-semibold leading-[0.82] not-italic text-[20px]">
                Contact
              </p>
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <p className="font-['Space_Mono',monospace] font-bold leading-none not-italic text-[#75b2eb] text-[13px] text-nowrap uppercase mb-4">
              Contact
            </p>
            <div className="flex flex-col gap-[12px] text-white">
              <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] text-[14px] text-nowrap">
                Address
              </p>
              <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] text-[14px] text-nowrap">
                +65 987 654 341
              </p>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex gap-[12px] items-center mt-8">
          {/* Facebook Icon */}
          <div className="relative size-[58px]">
            <Image
              src="/footer-assets/facebook.png"
              alt="Facebook"
              fill
              className="object-contain"
            />
          </div>

          {/* TikTok Icon */}
          <div className="relative size-[58px]">
            <Image
              src="/footer-assets/tiktok.png"
              alt="TikTok"
              fill
              className="object-contain"
            />
          </div>

          {/* Instagram Icon */}
          <div className="relative size-[58px]">
            <Image
              src="/footer-assets/instagram.png"
              alt="Instagram"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-8 font-['DM_Sans',sans-serif] leading-[1.18] opacity-50 text-[11px] text-white">
          2025 Bambite. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
