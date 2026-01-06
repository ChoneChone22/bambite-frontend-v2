// Contact Info Section component
"use client";

import Image from "next/image";

export default function ContactInfoSection() {
  return (
    <div className="content-stretch flex flex-col gap-12 md:gap-10 lg:gap-12 items-start relative shrink-0 w-full">
      {/* Mail */}
      <div className="content-stretch flex flex-col gap-5 md:gap-4 lg:gap-5 items-start relative shrink-0 w-full">
        <p className="font-['Space_Mono',sans-serif] font-bold leading-none not-italic relative shrink-0 text-[13px] text-[#1e6cad] uppercase w-full">
          Mail
        </p>
        <div className="content-stretch flex flex-col gap-3 items-start relative shrink-0 w-full">
          <p
            className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] from-[#1b232a] leading-[0.89] not-italic relative shrink-0 text-[24px] md:text-[24px] lg:text-[28px] to-[#315273] w-full"
            style={{ WebkitTextFillColor: "transparent" }}
          >
            BamBite@Totals-Inc.com
          </p>
          <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] md:text-[14px] text-[rgba(21,32,43,0.55)] w-full">
            We&apos;ll respond shortly during office hours.
          </p>
        </div>
      </div>

      {/* Phone */}
      <div className="content-stretch flex flex-col gap-5 md:gap-4 lg:gap-5 items-start relative shrink-0 w-full">
        <p className="font-['Space_Mono',sans-serif] font-bold leading-none not-italic relative shrink-0 text-[13px] text-[#1e6cad] uppercase w-full">
          Phone
        </p>
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
          <p
            className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] from-[#1b232a] leading-[0.89] not-italic relative shrink-0 text-[24px] md:text-[24px] lg:text-[28px] to-[#315273] w-full"
            style={{ WebkitTextFillColor: "transparent" }}
          >
            +65 987 654 341
          </p>
        </div>
      </div>

      {/* Locations */}
      <div className="content-stretch flex flex-col gap-5 md:gap-4 lg:gap-5 items-start relative shrink-0 w-full">
        <p className="font-['Space_Mono',sans-serif] font-bold leading-none not-italic relative shrink-0 text-[13px] text-[#1e6cad] uppercase w-full">
          Locations
        </p>
        <div className="content-stretch flex flex-col gap-8 md:gap-8 lg:gap-8 items-start relative shrink-0 w-full">
          <div className="content-stretch flex flex-col gap-3 items-start relative shrink-0 w-full">
            <p
              className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] from-[#1b232a] leading-[0.89] not-italic relative shrink-0 text-[24px] md:text-[24px] lg:text-[28px] to-[#315273] w-full"
              style={{ WebkitTextFillColor: "transparent" }}
            >
              Patuwan
            </p>
            <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] md:text-[14px] text-[#273b4f] w-full">
              173-175 Rongmueng Soi 4, Patumwan, Bangkok, Thailand
            </p>
          </div>
          <div className="content-stretch flex flex-col gap-3 items-start relative shrink-0 w-full">
            <p
              className="bg-clip-text bg-gradient-to-b font-['Chillax_Variable',sans-serif] from-[#1b232a] leading-[0.89] not-italic relative shrink-0 text-[24px] md:text-[24px] lg:text-[28px] to-[#315273] w-full"
              style={{ WebkitTextFillColor: "transparent" }}
            >
              Udonsuk
            </p>
            <p className="font-['DM_Sans',sans-serif] font-normal leading-[1.2] relative shrink-0 text-[14px] md:text-[14px] text-[#273b4f] w-full">
              173-175 Rongmueng Soi 4, Patumwan, Bangkok, Thailand
            </p>
          </div>
        </div>
      </div>

      {/* Socials */}
      <div className="content-stretch flex flex-col gap-5 md:gap-4 lg:gap-5 items-start relative shrink-0 w-full">
        <p className="font-['Space_Mono',sans-serif] font-bold leading-none not-italic relative shrink-0 text-[13px] text-[#1e6cad] uppercase w-full">
          Socials
        </p>
        <div className="content-stretch flex gap-3 items-start relative shrink-0 w-full">
          {/* Facebook Icon */}
          <div className="relative size-[45px]">
            <Image
              src="/footer-assets/facebook.webp"
              alt="Facebook"
              fill
              className="object-contain"
            />
          </div>

          {/* TikTok Icon */}
          <div className="relative size-[45px]">
            <Image
              src="/footer-assets/tiktok.webp"
              alt="TikTok"
              fill
              className="object-contain"
            />
          </div>

          {/* Instagram Icon */}
          <div className="relative size-[45px]">
            <Image
              src="/footer-assets/instagram.webp"
              alt="Instagram"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
