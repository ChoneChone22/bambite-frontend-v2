// Footer component - Simplified with footer-bg.webp background
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full min-h-[821px] overflow-x-hidden bg-[#202730]">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/footer-assets/footer-bg.webp"
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
            src="/footer-assets/footer-logo.webp"
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
              <Link
                href="/menu"
                className="font-['Chillax_Variable',sans-serif] font-semibold leading-[0.82] not-italic text-[20px] hover:opacity-80 transition-opacity"
              >
                Products
              </Link>
              <Link
                href="/about"
                className="font-['Chillax_Variable',sans-serif] font-semibold leading-[0.82] not-italic text-[20px] hover:opacity-80 transition-opacity"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="font-['Chillax_Variable',sans-serif] font-semibold leading-[0.82] not-italic text-[20px] hover:opacity-80 transition-opacity"
              >
                Contact
              </Link>
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
          {/* Facebook */}
          <Link
            href="https://www.facebook.com/share/1A1Wvjcu43/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="relative size-[58px] hover:opacity-80 transition-opacity"
          >
            <Image
              src="/footer-assets/facebook.webp"
              alt="Facebook"
              fill
              className="object-contain"
            />
          </Link>

          {/* TikTok */}
          <Link
            href="https://www.tiktok.com/@bambite25?_r=1&_t=ZS-92g00es6bgN"
            target="_blank"
            rel="noopener noreferrer"
            className="relative size-[58px] hover:opacity-80 transition-opacity"
          >
            <Image
              src="/footer-assets/tiktok.webp"
              alt="TikTok"
              fill
              className="object-contain"
            />
          </Link>

          {/* Instagram */}
          <Link
            href="https://www.instagram.com/bambiteburst?igsh=MTk1cDRieXN3ZTAzbg=="
            target="_blank"
            rel="noopener noreferrer"
            className="relative size-[58px] hover:opacity-80 transition-opacity"
          >
            <Image
              src="/footer-assets/instagram.webp"
              alt="Instagram"
              fill
              className="object-contain"
            />
          </Link>
        </div>

        {/* Copyright */}
        <p className="mt-8 font-['DM_Sans',sans-serif] leading-[1.18] opacity-50 text-[11px] text-white">
          2025 Bambite. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
